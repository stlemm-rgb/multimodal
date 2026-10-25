import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';

const pngBase64 =
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=';

async function expectNoOverflow(page: Page) {
  const dimensions = await page.evaluate(() => ({
    content: document.documentElement.scrollWidth,
    viewport: document.documentElement.clientWidth,
  }));
  expect(dimensions.content).toBeLessThanOrEqual(dimensions.viewport);
}

test('두 화면을 열고 이동하며 가로 넘침과 오류를 확인한다', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });

  await page.goto('/#/');
  await expect(page.getByRole('heading', { name: '설명할 화면을 가져오세요' })).toBeVisible();
  await expectNoOverflow(page);
  await page.getByRole('link', { name: 'UI 용어 사전', exact: true }).click();
  await expect(page).toHaveURL(/#\/glossary$/);
  await expect(page.getByRole('heading', { name: '스켈레톤', exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: '바텀시트', exact: true })).toBeVisible();
  await expectNoOverflow(page);
  await page.reload();
  await expect(page.getByRole('heading', { name: 'UI 용어 사전', exact: true })).toBeVisible();
  await page.getByRole('link', { name: '편집기', exact: true }).click();
  await expect(page.getByRole('heading', { name: '설명할 화면을 가져오세요' })).toBeVisible();
  await page.goBack();
  await expect(page.getByRole('heading', { name: 'UI 용어 사전', exact: true })).toBeVisible();
  expect(errors).toEqual([]);
});

test('파일 선택·붙여넣기·끌어놓기로 이미지를 불러온다', async ({ page }) => {
  await page.goto('/#/');
  await page.getByLabel('이미지 파일 고르기').setInputFiles({
    name: '화면.png',
    mimeType: 'image/png',
    buffer: Buffer.from(pngBase64, 'base64'),
  });
  const preview = page.getByRole('img', { name: '불러온 화면' });
  await expect(preview).toBeVisible();
  await expect
    .poll(() => preview.evaluate((image) => (image as HTMLImageElement).naturalWidth))
    .toBe(1);

  for (const action of ['paste', 'drop'] as const) {
    await page.evaluate(
      ({ base64, action }) => {
        const bytes = Uint8Array.from(atob(base64), (character) => character.charCodeAt(0));
        const transfer = new DataTransfer();
        transfer.items.add(new File([bytes], `${action}.png`, { type: 'image/png' }));
        if (action === 'paste') {
          window.dispatchEvent(
            new ClipboardEvent('paste', {
              clipboardData: transfer,
              bubbles: true,
              cancelable: true,
            }),
          );
        } else {
          document.querySelector('.drop-zone')!.dispatchEvent(
            new DragEvent('drop', {
              dataTransfer: transfer,
              bubbles: true,
              cancelable: true,
            }),
          );
        }
      },
      { base64: pngBase64, action },
    );
    await expect(page.locator('figcaption')).toHaveText(`${action}.png`);
    await expect
      .poll(() => preview.evaluate((image) => (image as HTMLImageElement).naturalWidth))
      .toBe(1);
  }
  await expectNoOverflow(page);
  await page.getByRole('link', { name: 'UI 용어 사전', exact: true }).click();
  await page.getByRole('link', { name: '편집기', exact: true }).click();
  await expect(preview).toBeVisible();
  await expect(page.locator('figcaption')).toHaveText('drop.png');
});
