import type { Capture } from '../core/project';
import { arrowHead, markColors, markFont, markMetrics, noteLayout } from '../core/markStyle';
import { createImageUrl, releaseImageUrl } from './files';

export function exportFileName(projectName: string, screenIndex: number): string {
  const name = [...projectName]
    .map((char) => (char.charCodeAt(0) < 32 || /[<>:"/\\|?*]/u.test(char) ? '_' : char))
    .join('')
    .replace(/[. ]+$/u, '_');
  return `${name || '프로젝트'}_화면${screenIndex}.png`;
}
export async function exportImage(
  blob: Blob,
  capture: Pick<Capture, 'width' | 'height' | 'annotations'>,
): Promise<Blob> {
  const url = createImageUrl(blob);
  try {
    const image = new Image();
    image.src = url;
    await image.decode();
    const scale = Math.min(1, 4096 / Math.max(capture.width, capture.height));
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.round(capture.width * scale));
    canvas.height = Math.max(1, Math.round(capture.height * scale));
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('그림을 만들지 못했어요.');
    ctx.scale(canvas.width / capture.width, canvas.height / capture.height);
    ctx.drawImage(image, 0, 0, capture.width, capture.height);
    const m = markMetrics(capture.width, capture.height);
    ctx.lineWidth = m.lineWidth;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    for (const item of capture.annotations) {
      if (item.type === 'note') {
        const layout = noteLayout(item.text, m);
        ctx.fillStyle = markColors.note;
        ctx.fillRect(item.position.x, item.position.y, layout.width, layout.height);
        ctx.fillStyle = markColors.noteText;
        ctx.font = `${m.noteFontSize}px ${markFont}`;
        ctx.textAlign = 'left';
        layout.lines.forEach((line, index) =>
          ctx.fillText(
            line,
            item.position.x + m.padding,
            item.position.y + m.padding + m.noteFontSize + index * m.lineHeight,
          ),
        );
        continue;
      }
      ctx.strokeStyle = markColors.stroke;
      ctx.fillStyle = markColors.stroke;
      if (item.type === 'box')
        ctx.strokeRect(item.position.x, item.position.y, item.width, item.height);
      if (item.type === 'arrow') {
        ctx.beginPath();
        ctx.moveTo(item.start.x, item.start.y);
        ctx.lineTo(item.end.x, item.end.y);
        ctx.stroke();
        const points = arrowHead(item.start, item.end, m.arrowSize);
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        points.slice(1).forEach((point) => ctx.lineTo(point.x, point.y));
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      }
      const point = item.type === 'arrow' ? item.start : item.position;
      ctx.beginPath();
      ctx.arc(point.x, point.y, m.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = markColors.text;
      ctx.font = `bold ${m.fontSize}px ${markFont}`;
      ctx.textAlign = 'center';
      ctx.fillText(String(item.number), point.x, point.y + m.fontSize * 0.35);
    }
    return await new Promise<Blob>((resolve, reject) =>
      canvas.toBlob(
        (result) => (result ? resolve(result) : reject(new Error('그림을 만들지 못했어요.'))),
        'image/png',
      ),
    );
  } finally {
    releaseImageUrl(url);
  }
}
