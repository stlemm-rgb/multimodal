import type { Annotation } from './types';
import { markMetrics } from './markStyle';

export function textUnits(text: string): number {
  return [...text].reduce(
    (sum, char) =>
      sum +
      (/\s/u.test(char)
        ? 0.3
        : /[\u1100-\u11ff\u2e80-\ua4cf\uac00-\ud7af\uf900-\ufaff\uff01-\uff60\uffe0-\uffe6]/u.test(
              char,
            )
          ? 1
          : 0.6),
    0,
  );
}

/** DOM 없이 계산하며 SVG와 PNG에서 동일한 좌표와 줄을 사용한다. */
export function labelLayout(item: Annotation, imageWidth: number, imageHeight: number) {
  if (item.type === 'note' || !item.instruction.trim()) return null;
  const m = markMetrics(imageWidth, imageHeight);
  const maxWidth = Math.min(imageWidth, Math.max(imageWidth, imageHeight) * 0.4);
  const padding = Math.min(m.padding, maxWidth / 4, imageHeight / 8);
  const fontSize = Math.min(m.fontSize, maxWidth - padding * 2, (imageHeight - padding * 2) / 1.4);
  const lineHeight = fontSize * 1.4;
  const capacity = (maxWidth - padding * 2) / fontSize;
  const maxLines = Math.max(1, Math.min(3, Math.floor((imageHeight - padding * 2) / lineHeight)));
  const lines: string[] = [];
  let line = '';
  for (const char of item.instruction.trim().replace(/\r\n?/gu, '\n')) {
    if (char === '\n') {
      lines.push(line);
      line = '';
    } else {
      if (line && textUnits(line + char) > capacity) {
        lines.push(line);
        line = '';
      }
      line += char;
    }
  }
  lines.push(line);
  if (lines.length > maxLines) {
    lines.length = maxLines;
    let last = [...lines[maxLines - 1]];
    while (last.length && textUnits(last.join('') + '…') > capacity) last = last.slice(0, -1);
    lines[maxLines - 1] = last.join('') + '…';
  }
  const width = Math.min(maxWidth, Math.max(...lines.map(textUnits)) * fontSize + padding * 2);
  const height = lines.length * lineHeight + padding * 2;
  let x: number;
  let y: number;
  if (item.type === 'pin') {
    x = item.position.x + m.radius + m.padding;
    if (x + width > imageWidth) x = item.position.x - m.radius - m.padding - width;
    y = item.position.y - height / 2;
  } else if (item.type === 'box') {
    x = item.position.x;
    y = item.position.y - height - m.padding;
    if (y < 0) y = item.position.y + item.height + m.padding;
  } else {
    const angle = Math.atan2(item.end.y - item.start.y, item.end.x - item.start.x);
    x = item.end.x + Math.cos(angle) * m.radius - (Math.cos(angle) < 0 ? width : 0);
    y = item.end.y + Math.sin(angle) * m.radius - (Math.sin(angle) < 0 ? height : 0);
  }
  return {
    x: Math.max(0, Math.min(x, imageWidth - width)),
    y: Math.max(0, Math.min(y, imageHeight - height)),
    width,
    height,
    lines,
    fontSize,
    lineHeight,
    padding,
  };
}
