const key = 'multimodal.showLabels';
export function readShowLabels(): boolean {
  try {
    return localStorage.getItem(key) !== 'false';
  } catch {
    return true;
  }
}
export function saveShowLabels(value: boolean): void {
  localStorage.setItem(key, String(value));
}
