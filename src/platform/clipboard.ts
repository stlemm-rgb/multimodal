export async function copyText(text: string): Promise<void> {
  if (!navigator.clipboard?.writeText)
    throw new Error('이 브라우저에서는 복사할 수 없어요. 글을 길게 눌러 직접 복사해 주세요.');
  await navigator.clipboard.writeText(text);
}
