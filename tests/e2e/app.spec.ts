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
  await expect(page.getByText('0/7 단계', { exact: true })).toBeVisible();
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
  await expect(page.getByRole('heading', { name: '스켈레톤', exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: '바텀시트', exact: true })).toBeVisible();
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
  await page.getByRole('button', { name: '지시문 복사', exact: true }).focus();
  await page.keyboard.press('Tab');
  await expect(page.getByRole('button', { name: '닫기', exact: true })).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  await expect(page.getByRole('button', { name: '지시문 복사', exact: true })).toBeFocused();
  await page.getByRole('button', { name: '지시문 복사', exact: true }).click();
  await expect(page.getByRole('status')).toContainText('아직 번호별 지시문이 없어요.');
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(exportButton).toBeFocused();
  await page.getByRole('button', { name: '번호', exact: true }).click();
  await expect(page.getByRole('dialog')).toContainText('준비 중이에요.');
  await page.getByRole('button', { name: '닫기', exact: true }).click();
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await exportButton.click();
  await page.mouse.click(4, 4);
  await expect(page.getByRole('dialog')).toHaveCount(0);
});
