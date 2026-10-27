import { expect, test, type Page } from '@playwright/test';

const pngBase64 =
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=';
const png = { name: '화면.png', mimeType: 'image/png', buffer: Buffer.from(pngBase64, 'base64') };
const audits = new WeakMap<Page, { errors: string[]; external: string[] }>();

// Playwright가 각 시험마다 새 브라우저 컨텍스트를 만들어 저장소를 격리한다.
test.beforeEach(async ({ page }) => {
  const audit = { errors: [] as string[], external: [] as string[] };
  audits.set(page, audit);
  page.on('pageerror', (error) => audit.errors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') audit.errors.push(message.text());
  });
  page.on('request', (request) => {
    const url = new URL(request.url());
    if (['http:', 'https:'].includes(url.protocol) && url.hostname !== '127.0.0.1')
      audit.external.push(request.url());
  });
  await page.route(/^https?:\/\//, async (route) => {
    if (new URL(route.request().url()).hostname === '127.0.0.1') await route.continue();
    else await route.abort();
  });
});
test.afterEach(async ({ page }) => {
  expect(audits.get(page)?.errors).toEqual([]);
  expect(audits.get(page)?.external).toEqual([]);
});

async function expectNoOverflow(page: Page) {
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= document.documentElement.clientWidth,
    ),
  ).toBe(true);
}
async function newProject(page: Page) {
  await page.goto('/#/');
  await page.getByRole('button', { name: '새 프로젝트', exact: true }).click();
  await expect(page).toHaveURL(/#\/p\/[^/]+$/);
  await expect(page.getByRole('heading', { name: '캡처를 추가하세요' })).toBeVisible();
}
async function addImage(page: Page) {
  await page.getByLabel('이미지 파일 고르기', { exact: true }).setInputFiles(png);
  const preview = page.getByRole('img', { name: '불러온 화면', exact: true });
  await expect(preview).toBeVisible();
  await expect
    .poll(() => preview.evaluate((image) => (image as HTMLImageElement).naturalWidth))
    .toBe(1);
  await expect(page.getByRole('button', { name: '캡처 추가', exact: true })).toBeEnabled();
}

test('새 프로젝트의 캡처와 홈 썸네일은 새로고침 뒤에도 남는다', async ({ page }) => {
  await newProject(page);
  await expectNoOverflow(page);
  await addImage(page);
  const projectUrl = page.url();
  await page.getByRole('link', { name: '홈으로', exact: true }).click();
  await expect(page.getByRole('link', { name: '새 프로젝트 열기' })).toBeVisible();
  await expect(page.getByRole('img', { name: '새 프로젝트 첫 캡처' })).toBeVisible();
  await page.reload();
  await expect(page.getByRole('img', { name: '새 프로젝트 첫 캡처' })).toBeVisible();
  await expect(page.getByText('0/7 단계 · 0/21 항목 완료', { exact: true })).toBeVisible();
  await expectNoOverflow(page);
  await page.getByRole('link', { name: '새 프로젝트 열기' }).click();
  await expect(page).toHaveURL(projectUrl);
  await expect(page.getByRole('img', { name: '불러온 화면', exact: true })).toBeVisible();
  await page.reload();
  await expect(page.getByRole('img', { name: '불러온 화면', exact: true })).toBeVisible();
});

test('붙여넣기·끌어놓기로 캡처를 더하고 썸네일로 전환한다', async ({ page }) => {
  await newProject(page);
  await addImage(page);
  for (const [index, action] of (['paste', 'drop'] as const).entries()) {
    await page.evaluate(
      ({ base64, action }) => {
        const bytes = Uint8Array.from(atob(base64), (character) => character.charCodeAt(0));
        const transfer = new DataTransfer();
        transfer.items.add(new File([bytes], `${action}.png`, { type: 'image/png' }));
        if (action === 'paste')
          window.dispatchEvent(
            new ClipboardEvent('paste', {
              clipboardData: transfer,
              bubbles: true,
              cancelable: true,
            }),
          );
        else
          document
            .querySelector('.drop-zone')!
            .dispatchEvent(
              new DragEvent('drop', { dataTransfer: transfer, bubbles: true, cancelable: true }),
            );
      },
      { base64: pngBase64, action },
    );
    await expect(page.locator('figcaption')).toContainText(`캡처 ${index + 2}`);
    await expect(page.getByRole('button', { name: '캡처 추가', exact: true })).toBeEnabled();
  }
  await expect(page.getByRole('button', { name: /캡처 \d 보기/ })).toHaveCount(3);
  await page.getByRole('button', { name: '캡처 1 보기' }).click();
  await expect(page.locator('figcaption')).toContainText('캡처 1');
  await expectNoOverflow(page);
  await page.reload();
  await expect(page.getByRole('button', { name: /캡처 \d 보기/ })).toHaveCount(3);
});

test('단계 체크·내 항목을 저장하고 진행 숫자를 갱신한다', async ({ page }) => {
  await newProject(page);
  await page.getByRole('button', { name: '단계', exact: true }).click();
  await expect(page).toHaveURL(/\/guide$/);
  await page.getByRole('checkbox', { name: '만들 것을 한 문장으로 설명하기' }).check();
  await expect(page.getByText('0/7 단계 · 1/21 항목 완료', { exact: true })).toBeVisible();
  await page.getByLabel('아이디어 정리에 내 항목').fill('가족에게 아이디어 설명하기');
  await page.getByRole('button', { name: '내 항목 추가' }).click();
  await expect(page.getByRole('checkbox', { name: '가족에게 아이디어 설명하기' })).toBeVisible();
  await page.reload();
  await expect(
    page.getByRole('checkbox', { name: '만들 것을 한 문장으로 설명하기' }),
  ).toBeChecked();
  await expect(page.getByText('0/7 단계 · 1/22 항목 완료', { exact: true })).toBeVisible();
  for (const text of [
    '누가 쓸지 정하기',
    '꼭 필요한 기능 3개 고르기',
    '가족에게 아이디어 설명하기',
  ]) {
    const checkbox = page.getByRole('checkbox', { name: text, exact: true });
    await expect(checkbox).toBeEnabled();
    await checkbox.check();
    await expect(checkbox).toBeChecked();
  }
  await expect(page.getByText('1/7 단계 · 4/22 항목 완료', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: '가족에게 아이디어 설명하기 지우기' }).click();
  await expect(page.getByText('1/7 단계 · 3/21 항목 완료', { exact: true })).toBeVisible();
  await page.reload();
  await expect(page.getByRole('heading', { name: '지금 단계: 2. 화면 목록' })).toBeVisible();
  await page.getByRole('button', { name: /아이디어 정리/ }).click();
  await expect(page.getByRole('checkbox', { name: '가족에게 아이디어 설명하기' })).toHaveCount(0);
  await expectNoOverflow(page);
});

test('이름을 바꾸고 삭제 확인 시트로 캡처까지 삭제한다', async ({ page }) => {
  await newProject(page);
  await addImage(page);
  await page.getByRole('link', { name: '홈으로' }).click();
  await page.getByRole('button', { name: '새 프로젝트 메뉴' }).click();
  await page.getByRole('button', { name: '이름 바꾸기', exact: true }).click();
  await page.getByLabel('프로젝트 이름').fill('나의 첫 앱');
  await page.getByRole('button', { name: '저장', exact: true }).click();
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await page.reload();
  await expect(page.getByRole('link', { name: '나의 첫 앱 열기' })).toBeVisible();
  await page.getByRole('button', { name: '나의 첫 앱 메뉴' }).click();
  await page.getByRole('button', { name: '삭제', exact: true }).click();
  await page.getByRole('button', { name: '취소', exact: true }).click();
  await expect(page.getByRole('link', { name: '나의 첫 앱 열기' })).toBeVisible();
  await page.getByRole('button', { name: '나의 첫 앱 메뉴' }).click();
  await page.getByRole('button', { name: '삭제', exact: true }).click();
  await page.getByRole('button', { name: '삭제하기', exact: true }).click();
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await page.reload();
  await expect(page.getByRole('link', { name: '나의 첫 앱 열기' })).toHaveCount(0);
  const counts = await page.evaluate(async () => {
    const db = await new Promise<IDBDatabase>((resolve, reject) => {
      const request = indexedDB.open('multimodal');
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
    const counts = await Promise.all(
      ['projects', 'captures', 'images'].map(
        (table) =>
          new Promise<number>((resolve, reject) => {
            const request = db.transaction(table).objectStore(table).count();
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
          }),
      ),
    );
    db.close();
    return counts;
  });
  expect(counts).toEqual([0, 0, 0]);
});

test('AI는 기본 꺼짐이고 시트·설정·용어 사전을 외부 요청 없이 연다', async ({ page }) => {
  await newProject(page);
  await page.getByRole('button', { name: 'AI 다듬기', exact: true }).click();
  await expect(page.getByText('설정에서 AI 연결을 켜 주세요.', { exact: true })).toBeVisible();
  await expectNoOverflow(page);
  await page.getByRole('link', { name: '설정 가기' }).click();
  await expect(page.getByRole('switch', { name: 'AI 연결 켜기' })).not.toBeChecked();
  await expectNoOverflow(page);
  await page.getByRole('switch', { name: 'AI 연결 켜기' }).check();
  await page.getByLabel('API 키', { exact: true }).fill('test-key-never-sent');
  await page.getByRole('button', { name: '연결 시험', exact: true }).click();
  await expect(page.getByRole('dialog')).toContainText('사진 0장');
  await page.getByRole('button', { name: '취소', exact: true }).click();
  await page.reload();
  await expect(page.getByRole('switch', { name: 'AI 연결 켜기' })).toBeChecked();
  await expect(page.getByLabel('API 키', { exact: true })).toHaveAttribute('type', 'password');
  await page.getByRole('button', { name: '보기', exact: true }).click();
  await expect(page.getByLabel('API 키', { exact: true })).toHaveAttribute('type', 'text');
  await page.getByLabel('회사 고르기').selectOption('openai');
  await expect(page.getByLabel('모델 이름')).toHaveValue('');
  await expect(page.getByLabel('API 키', { exact: true })).toHaveValue('');
  await page.getByRole('button', { name: '키 지우기' }).click();
  await expect(page.getByRole('switch', { name: 'AI 연결 켜기' })).not.toBeChecked();
  await page.getByRole('link', { name: '용어 사전', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'UI 용어 사전', exact: true })).toBeVisible();
  await page.getByRole('tab', { name: /^알림·기다림/u }).click();
  await expect(page.getByRole('button', { name: '스켈레톤 Skeleton', exact: true })).toBeVisible();
  await page.getByRole('tab', { name: /^화면 부품/u }).click();
  await expect(
    page.getByRole('button', { name: '바텀시트 Bottom sheet', exact: true }),
  ).toBeVisible();
  await expectNoOverflow(page);
});

test('AI에 보낼 회사·현재 캡처 수·글을 확인하고 취소하면 전송하지 않는다', async ({ page }) => {
  await page.goto('/#/settings');
  await page.getByRole('switch', { name: 'AI 연결 켜기' }).check();
  await page.getByLabel('API 키', { exact: true }).fill('test-key-never-sent');
  await newProject(page);
  await addImage(page);
  await page.getByRole('button', { name: 'AI 다듬기', exact: true }).click();
  await page.getByLabel('AI에게 전할 메모').fill('첫 버튼을 크게 만들어 주세요.');
  await page.getByRole('button', { name: '보낼 내용 확인' }).click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toContainText('Claude (Anthropic)');
  await expect(dialog).toContainText('사진 1장');
  await expect(dialog.locator('pre')).toContainText('첫 버튼을 크게 만들어 주세요.');
  await expectNoOverflow(page);
  await page.getByRole('button', { name: '취소', exact: true }).click();
  await expect(dialog).toHaveCount(0);
});

test('시트는 포커스를 가두고 Esc·닫기·바깥 누르기로 닫힌다', async ({ page }) => {
  await newProject(page);
  const exportButton = page.getByRole('button', { name: '내보내기', exact: true });
  await exportButton.click();
  await page.getByRole('button', { name: '프로젝트 전체 지시문 복사', exact: true }).focus();
  await page.keyboard.press('Tab');
  await expect(page.getByRole('button', { name: '닫기', exact: true })).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  await expect(
    page.getByRole('button', { name: '프로젝트 전체 지시문 복사', exact: true }),
  ).toBeFocused();
  await expect(page.getByRole('button', { name: '이 화면 PNG 저장', exact: true })).toBeDisabled();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(exportButton).toBeFocused();
  await page.getByRole('button', { name: '움직임', exact: true }).click();
  await expect(page.getByRole('dialog')).toContainText('준비 중이에요.');
  await page.getByRole('button', { name: '닫기', exact: true }).click();
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await exportButton.click();
  await page.mouse.click(4, 4);
  await expect(page.getByRole('dialog')).toHaveCount(0);
});

async function addDrawingImage(page: Page) {
  const base64 = await page.evaluate(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 600;
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = '#eeeeee';
    ctx.fillRect(0, 0, 800, 600);
    return canvas.toDataURL('image/png').split(',')[1];
  });
  await page.getByLabel('이미지 파일 고르기', { exact: true }).setInputFiles({
    name: '그릴 화면.png',
    mimeType: 'image/png',
    buffer: Buffer.from(base64, 'base64'),
  });
  await expect(page.getByRole('img', { name: '불러온 화면', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: '캡처 추가', exact: true })).toBeEnabled();
}

async function draw(page: Page, tool: string, start: [number, number], end?: [number, number]) {
  await page.getByRole('button', { name: tool, exact: true }).click();
  const svg = page.getByLabel('표시 그리기', { exact: true });
  await svg.scrollIntoViewIfNeeded();
  const bounds = (await svg.boundingBox())!;
  await page.mouse.move(bounds.x + bounds.width * start[0], bounds.y + bounds.height * start[1]);
  await page.mouse.down();
  if (end)
    await page.mouse.move(bounds.x + bounds.width * end[0], bounds.y + bounds.height * end[1], {
      steps: 8,
    });
  await page.mouse.up();
}
async function describeMark(page: Page, text: string) {
  await expect(page.getByLabel('지시문', { exact: true })).toBeFocused();
  await page.getByLabel('지시문', { exact: true }).fill(text);
  await page.getByRole('button', { name: '확인', exact: true }).click();
}

test('표시 추가·이동·실행 취소·저장 유지와 PNG·지시문 내보내기', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await newProject(page);
  await addDrawingImage(page);
  await draw(page, '번호', [0.2, 0.2]);
  await describeMark(page, '버튼을 더 크게');
  await draw(page, '박스', [0.45, 0.3], [0.75, 0.55]);
  await describeMark(page, '파란색으로');
  await draw(page, '화살표', [0.3, 0.7], [0.75, 0.8]);
  await describeMark(page, '오른쪽으로 이동');
  const marks = page.locator('[data-annotation-id]');
  await expect(marks).toHaveCount(3);
  // 새 도형과 첫 설명을 한 번에 되돌린다.
  await page.getByRole('button', { name: '↶ 되돌리기', exact: true }).click();
  await expect(page.locator('[data-annotation-type="arrow"]')).toHaveCount(0);
  await page.getByRole('button', { name: '↷ 다시', exact: true }).click();
  await expect(marks).toHaveCount(3);
  await draw(page, '선택', [0.2, 0.2], [0.3, 0.25]);
  const pinCircle = page.locator('[data-annotation-type="pin"] circle');
  await expect.poll(async () => Number(await pinCircle.getAttribute('cx'))).toBeCloseTo(240, 2);
  await expect(page.getByRole('dialog')).toHaveCount(0);
  // 다른 도구를 골라도 번호를 끌면 옮겨지고, 누르면 기존 지시문이 열린다.
  await draw(page, '박스', [0.3, 0.25], [0.2, 0.25]);
  await expect(marks).toHaveCount(3);
  await expect.poll(async () => Number(await pinCircle.getAttribute('cx'))).toBeCloseTo(160, 2);
  await draw(page, '번호', [0.2, 0.25]);
  await expect(marks).toHaveCount(3);
  await expect(page.getByRole('dialog').getByRole('textbox')).toHaveValue('버튼을 더 크게');
  await page.getByRole('button', { name: '확인', exact: true }).click();
  await draw(page, '화살표', [0.2, 0.25], [0.3, 0.25]);
  await expect.poll(async () => Number(await pinCircle.getAttribute('cx'))).toBeCloseTo(240, 2);
  await page.reload();
  await expect(marks).toHaveCount(3);
  await expect.poll(async () => Number(await pinCircle.getAttribute('cx'))).toBeCloseTo(240, 2);
  await expect(page.getByRole('button', { name: '↶ 되돌리기', exact: true })).toBeDisabled();
  await page.getByRole('button', { name: '내보내기', exact: true }).click();
  await page.getByRole('button', { name: '이 화면 지시문 복사', exact: true }).click();
  const intro =
    '첨부한 이미지의 빨간 번호를 보고 아래대로 고쳐 주세요. 이미지는 화면 번호 순서대로 붙였어요.';
  await expect
    .poll(() =>
      page.evaluate(async () => (await navigator.clipboard.readText()).replace(/\r\n/g, '\n')),
    )
    .toBe(
      `${intro}\n\n[화면 1]\n1. [점] 버튼을 더 크게\n2. [네모 영역] 파란색으로\n3. [화살표] 오른쪽으로 이동`,
    );
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: '이 화면 PNG 저장', exact: true }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe('새 프로젝트_화면1.png');
  const stream = (await download.createReadStream())!;
  const chunks: Buffer[] = [];
  for await (const chunk of stream) chunks.push(Buffer.from(chunk));
  const bytes = Buffer.concat(chunks);
  expect([...bytes.subarray(0, 8)]).toEqual([137, 80, 78, 71, 13, 10, 26, 10]);
  // 원본 크기와 실제 빨간 표시가 PNG에 포함되는지도 확인한다.
  const exported = await page.evaluate(async (base64) => {
    const image = new Image();
    image.src = `data:image/png;base64,${base64}`;
    await image.decode();
    const canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    const ctx = canvas.getContext('2d')!;
    ctx.drawImage(image, 0, 0);
    return {
      width: image.width,
      height: image.height,
      pixel: [...ctx.getImageData(230, 150, 1, 1).data],
    };
  }, bytes.toString('base64'));
  expect(exported).toEqual({ width: 800, height: 600, pixel: [255, 45, 85, 255] });
  await page.getByRole('button', { name: '이 화면 PNG 복사', exact: true }).click();
  await expect(page.getByRole('status')).toHaveText('복사했어요');
  await expect
    .poll(() =>
      page.evaluate(async () => (await navigator.clipboard.read()).flatMap((item) => item.types)),
    )
    .toContain('image/png');
  await page.evaluate(() =>
    Object.defineProperty(navigator.clipboard, 'write', { value: undefined, configurable: true }),
  );
  await page.getByRole('button', { name: '이 화면 PNG 복사', exact: true }).click();
  await expect(page.getByRole('status')).toHaveText(
    '이 브라우저는 그림 복사를 못 해요. PNG 저장을 써 주세요.',
  );
  await expectNoOverflow(page);
});

test('번호를 더블 클릭하면 번호만 옮기고 점선으로 잇고 제자리로 돌린다', async ({ page }) => {
  await newProject(page);
  await addDrawingImage(page);
  await draw(page, '박스', [0.4, 0.4], [0.7, 0.7]);
  await describeMark(page, '여기를 작게');
  const box = page.locator('[data-annotation-type="box"]');
  const number = box.locator('text[font-weight="bold"]');
  const svg = page.getByLabel('표시 그리기', { exact: true });
  const bounds = (await svg.boundingBox())!;
  const at = (x: number, y: number) =>
    [bounds.x + bounds.width * x, bounds.y + bounds.height * y] as const;
  await page.mouse.dblclick(...at(0.4, 0.4));
  await expect(box.locator('.badge-mode')).toHaveCount(1);
  await page.waitForTimeout(600);
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await page.mouse.move(...at(0.4, 0.4));
  await page.mouse.down();
  await page.mouse.move(...at(0.2, 0.2), { steps: 8 });
  await page.mouse.up();
  await expect.poll(async () => Number(await number.getAttribute('x'))).toBeCloseTo(160, 0);
  expect(Number(await box.locator('rect[fill="none"]').getAttribute('x'))).toBeCloseTo(320, 0);
  await expect(box.locator('.badge-leader line')).toHaveCount(1);
  await page.mouse.click(...at(0.2, 0.2));
  await page.getByRole('button', { name: '번호 제자리로', exact: true }).click();
  await expect(box.locator('.badge-leader')).toHaveCount(0);
  await expect.poll(async () => Number(await number.getAttribute('x'))).toBeCloseTo(320, 0);
  await page.keyboard.press('Escape');
  await page.keyboard.press('Control+z');
  await expect(box.locator('.badge-leader line')).toHaveCount(1);
});

test('터치로 그리고 취소한 그리기는 버리며 입력 중인 글도 저장한다', async ({ page, context }) => {
  await newProject(page);
  await addDrawingImage(page);
  await page.getByRole('button', { name: '박스', exact: true }).click();
  const svg = page.getByLabel('표시 그리기', { exact: true });
  await svg.scrollIntoViewIfNeeded();
  const bounds = (await svg.boundingBox())!;
  const client = await context.newCDPSession(page);
  const start = { x: bounds.x + bounds.width * 0.3, y: bounds.y + bounds.height * 0.3 };
  const end = { x: bounds.x + bounds.width * 0.7, y: bounds.y + bounds.height * 0.7 };
  await client.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [start] });
  await client.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [end] });
  await client.send('Input.dispatchTouchEvent', { type: 'touchCancel', touchPoints: [] });
  await expect(page.locator('[data-annotation-id]')).toHaveCount(0);
  await client.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [start] });
  await client.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [end] });
  await client.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  await page.getByLabel('지시문', { exact: true }).fill('입력 중에도 저장');
  await page.keyboard.press('Control+z');
  await expect(page.locator('[data-annotation-id]')).toHaveCount(1);
  await page.getByLabel('지시문', { exact: true }).fill('입력 중에도 저장');
  await page.reload();
  await expect(page.getByRole('button', { name: '① 입력 중에도 저장', exact: true })).toBeVisible();
  await expectNoOverflow(page);
});

test('메모·지우기·빈 지시 안내·캡처 전환과 단축키', async ({ page }) => {
  await newProject(page);
  await addDrawingImage(page);
  await draw(page, '번호', [0.2, 0.2]);
  await describeMark(page, '첫 지시');
  await draw(page, '박스', [0.75, 0.55], [0.45, 0.3]);
  await page.getByRole('button', { name: '닫기', exact: true }).click();
  await draw(page, '메모', [0.1, 0.8]);
  await page.getByLabel('메모 글', { exact: true }).fill('참고\n두 번째 줄');
  await page.getByRole('button', { name: '확인', exact: true }).click();
  await expect(page.locator('[data-annotation-type="note"] text')).toHaveText([
    '참고',
    '두 번째 줄',
  ]);
  await page.getByRole('button', { name: '내보내기', exact: true }).click();
  await expect(page.getByText('2번에 설명이 없어요', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: '닫기', exact: true }).click();
  await page.getByRole('button', { name: '① 첫 지시', exact: true }).click();
  await page.getByRole('button', { name: '지우기', exact: true }).click();
  await expect(page.locator('[data-annotation-type="pin"]')).toHaveCount(0);
  await expect(page.locator('[data-annotation-type="box"] text')).toHaveText('1');
  await page.keyboard.press('Control+z');
  await expect(page.locator('[data-annotation-type="pin"]')).toHaveCount(1);
  await page.keyboard.press('Control+Shift+z');
  await expect(page.locator('[data-annotation-type="pin"]')).toHaveCount(0);
  await page.keyboard.press('Control+z');
  await page.keyboard.press('Control+y');
  await expect(page.locator('[data-annotation-type="pin"]')).toHaveCount(0);
  await addDrawingImage(page);
  await expect(page.locator('[data-annotation-id]')).toHaveCount(0);
  await page.getByRole('button', { name: '캡처 1 보기' }).click();
  await expect(page.locator('[data-annotation-id]')).toHaveCount(2);
  await expect(page.getByRole('button', { name: '↶ 되돌리기', exact: true })).toBeDisabled();
  await expectNoOverflow(page);
});

test('그림 글 토글은 저장되고 PNG에도 같은 라벨을 넣는다', async ({ page }) => {
  await newProject(page);
  await addDrawingImage(page);
  await draw(page, '번호', [0.2, 0.2]);
  await describeMark(page, '버튼을 더 크게');
  const label = page.locator('.instruction-label');
  await expect(label).toHaveText('버튼을 더 크게');
  const toggle = page.getByRole('button', { name: '그림에 글 보이기' });
  await toggle.click();
  await expect(label).toHaveCount(0);
  await page.reload();
  await expect(toggle).toHaveAttribute('aria-pressed', 'false');
  await toggle.click();
  await expect(label).toHaveText('버튼을 더 크게');
  const position = await label.evaluate((element) => {
    const matrix = (element as unknown as SVGGElement).transform.baseVal.consolidate()!.matrix;
    return { x: Math.floor(matrix.e + 10), y: Math.floor(matrix.f + 3) };
  });
  await page.getByRole('button', { name: '내보내기', exact: true }).click();
  const downloading = page.waitForEvent('download');
  await page.getByRole('button', { name: '이 화면 PNG 저장', exact: true }).click();
  const stream = (await (await downloading).createReadStream())!;
  const chunks: Buffer[] = [];
  for await (const chunk of stream) chunks.push(Buffer.from(chunk));
  const pixel = await page.evaluate(
    async ({ base64, position }) => {
      const image = new Image();
      image.src = `data:image/png;base64,${base64}`;
      await image.decode();
      const canvas = document.createElement('canvas');
      canvas.width = image.width;
      canvas.height = image.height;
      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(image, 0, 0);
      return [...ctx.getImageData(position.x, position.y, 1, 1).data];
    },
    { base64: Buffer.concat(chunks).toString('base64'), position },
  );
  expect(pixel).toEqual([255, 45, 85, 255]);
});

test('홈에서 두 항목을 연달아 체크하고 새로고침해도 진행이 남는다', async ({ page }) => {
  await newProject(page);
  await page.getByRole('link', { name: '홈으로', exact: true }).click();
  await expect(page.getByRole('heading', { name: '지금 단계: 1. 아이디어 정리' })).toBeVisible();
  await expect(page.getByRole('checkbox')).toHaveCount(2);
  // 완료한 항목은 즉시 목록에서 빠지므로 체크 상태 대신 진행 숫자를 확인한다.
  await page.getByRole('checkbox', { name: '만들 것을 한 문장으로 설명하기' }).click();
  await page.getByRole('checkbox', { name: '누가 쓸지 정하기' }).click();
  await expect(page.getByText('0/7 단계 · 2/21 항목 완료', { exact: true })).toBeVisible();
  await page.reload();
  await expect(page.getByText('0/7 단계 · 2/21 항목 완료', { exact: true })).toBeVisible();
  await expect(page.getByRole('checkbox')).toHaveCount(1);
  await page.getByRole('checkbox').click();
  await expect(page.getByRole('heading', { name: '지금 단계: 2. 화면 목록' })).toBeVisible();
  await expect(page.getByText('1/7 단계 · 3/21 항목 완료', { exact: true })).toBeVisible();
  await expectNoOverflow(page);
  await page.getByRole('link', { name: '전체 단계 보기' }).click();
  await expect(page).toHaveURL(/\/guide$/);
});

test('용어를 분류별로 보고 헷갈리는 말로 건너가며 문구를 복사한다', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/#/glossary');
  await expect(page.getByRole('tab')).toHaveCount(6);
  const layoutTab = page.getByRole('tab', { name: /^화면 틀 \(\d+\)$/u });
  await expect(layoutTab).toHaveAttribute('aria-selected', 'true');
  await expect(page.locator('.term-thumbnail')).toHaveCount(
    Number((await layoutTab.textContent())!.match(/\d+/u)![0]),
  );
  await expectNoOverflow(page);
  await layoutTab.press('End');
  await expect(page.getByRole('tab', { name: /^모양·꾸밈/u })).toBeFocused();
  await page.getByRole('tab', { name: /^화면 부품/u }).click();
  await page.getByRole('button', { name: '모달 창 Modal', exact: true }).click();
  await page.getByRole('dialog').getByRole('button', { name: '바텀시트', exact: true }).click();
  await expect(page.getByRole('dialog')).toContainText('화면 아래에서 올라와');
  await expect(page.getByRole('dialog')).toContainText('모달은 화면 가운데에 뜨고');
  await page.keyboard.press('Escape');
  await page.getByRole('tab', { name: /^화면 틀/u }).click();
  await page.getByRole('button', { name: '서랍 메뉴 Drawer', exact: true }).click();
  await expect(page.getByRole('dialog')).toContainText('화면 옆에서 밀려 나오는 메뉴예요.');
  await page.getByRole('button', { name: '문구 복사', exact: true }).click();
  await expect
    .poll(() => page.evaluate(() => navigator.clipboard.readText()))
    .toContain('서랍 메뉴(Drawer)');
  await expectNoOverflow(page);
  await page.keyboard.press('Escape');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.locator('.preview-drawer .motion-hint')).toBeVisible();
  expect(
    await page
      .locator('.preview-drawer .preview-feature')
      .evaluate((el) => getComputedStyle(el).animationName),
  ).toBe('none');
});

test('용어 패널의 문구를 고른 표시에 넣고 되돌린다', async ({ page }) => {
  await newProject(page);
  await addDrawingImage(page);
  await draw(page, '번호', [0.2, 0.2]);
  await describeMark(page, '첫 지시');
  const button = page.getByRole('button', { name: '용어', exact: true });
  await button.click();
  const canvasBefore = await page.getByRole('region', { name: '캡처 작업 공간' }).boundingBox();
  await expect(page.locator('.glossary-overlay')).toBeVisible();
  await page.getByRole('tab', { name: /^화면 부품/u }).click();
  await page.locator('.term-thumbnail').last().focus();
  await page.keyboard.press('Tab');
  await expect(page.getByRole('button', { name: '닫기', exact: true })).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(button).toBeFocused();
  await button.click();
  await page.mouse.click(2, 2);
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await button.click();
  // 서랍이 열려도 프로젝트 화면 크기는 그대로
  const canvasAfter = await page.getByRole('region', { name: '캡처 작업 공간' }).boundingBox();
  expect(canvasAfter!.width).toBe(canvasBefore!.width);
  // 밀려 나오는 움직임이 끝나면 서랍 오른쪽 끝이 화면 오른쪽 끝에 붙는다
  await expect
    .poll(async () => {
      const drawer = await page.locator('.glossary-overlay').boundingBox();
      return Math.round(drawer!.x + drawer!.width);
    })
    .toBe(page.viewportSize()!.width);
  await expectNoOverflow(page);
  await page.getByRole('tab', { name: /^화면 부품/u }).click();
  await page.getByRole('button', { name: '카드 Card', exact: true }).click();
  await page.getByRole('button', { name: '1번 지시에 넣기' }).focus();
  await page.keyboard.press('Tab');
  await expect(
    page.getByRole('dialog').last().getByRole('button', { name: '닫기', exact: true }),
  ).toBeFocused();
  await page.getByRole('button', { name: '1번 지시에 넣기' }).click();
  await expect(page.getByRole('status')).toHaveText('1번 지시에 넣었어요');
  await page.keyboard.press('Escape');
  await page.keyboard.press('Escape');
  await expect(page.locator('.annotation-list button')).toContainText(
    '첫 지시\n사진과 제목을 둥근 카드(Card) 하나에 모아 주세요.',
  );
  await page.getByRole('button', { name: '↶ 되돌리기', exact: true }).click();
  await expect(page.locator('.annotation-list button')).toHaveText('① 첫 지시');
  await expectNoOverflow(page);
});
