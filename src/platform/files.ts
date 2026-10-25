// 파일·붙여넣기·이미지 URL 관련 브라우저 기능은 이 모듈을 거친다.
export const acceptedImages = 'image/png,image/jpeg,image/gif,image/webp';
export function chooseFiles(input: HTMLInputElement | null) {
  input?.click();
}
export function listenForImagePaste(onFiles: (files: File[]) => void) {
  const listener = (event: ClipboardEvent) => {
    if (document.querySelector('dialog[open]')) return;
    const files = Array.from(event.clipboardData?.items ?? [])
      .filter((item) => item.type.startsWith('image/'))
      .map((item) => item.getAsFile())
      .filter((file): file is File => file !== null);
    if (files.length) {
      event.preventDefault();
      onFiles(files);
    }
  };
  window.addEventListener('paste', listener);
  return () => window.removeEventListener('paste', listener);
}
export function createImageUrl(blob: Blob) {
  return URL.createObjectURL(blob);
}
export function releaseImageUrl(url: string) {
  URL.revokeObjectURL(url);
}
export function imageSize(blob: Blob): Promise<{ width: number; height: number }> {
  if (!acceptedImages.split(',').includes(blob.type))
    return Promise.reject(new Error('PNG, JPG, GIF, WebP 이미지 파일을 골라 주세요.'));
  return new Promise((resolve, reject) => {
    const image = new Image();
    const url = createImageUrl(blob);
    image.onload = () => {
      releaseImageUrl(url);
      resolve({ width: image.naturalWidth, height: image.naturalHeight });
    };
    image.onerror = () => {
      releaseImageUrl(url);
      reject(new Error('이미지를 열지 못했어요. 다른 이미지로 다시 골라 주세요.'));
    };
    image.src = url;
  });
}
export function readBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(',')[1]);
    reader.onerror = () => reject(new Error('사진을 읽지 못했어요. 다시 시도해 주세요.'));
    reader.readAsDataURL(blob);
  });
}
