import type { Point } from './types';

export const markColors = {
  stroke: '#FF2D55',
  text: '#FFFFFF',
  note: '#FFE066',
  noteText: '#000000',
};
export const markFont = 'sans-serif';
export function markMetrics(imageWidth: number, imageHeight: number) {
  const long = Math.max(imageWidth, imageHeight);
  const radius = Math.max(14, long / 45);
  return {
    lineWidth: Math.max(3, long / 250),
    radius,
    fontSize: radius,
    noteFontSize: radius,
    padding: radius / 2,
    lineHeight: radius * 1.4,
    arrowSize: radius * 1.5,
  };
}
export function arrowHead(start: Point, end: Point, size: number): Point[] {
  const angle = Math.atan2(end.y - start.y, end.x - start.x);
  return [
    end,
    {
      x: end.x - size * Math.cos(angle - Math.PI / 6),
      y: end.y - size * Math.sin(angle - Math.PI / 6),
    },
    {
      x: end.x - size * Math.cos(angle + Math.PI / 6),
      y: end.y - size * Math.sin(angle + Math.PI / 6),
    },
  ];
}
/** 같은 줄 나눔과 폭을 SVG와 PNG에 적용한다. */
export function noteLayout(text: string, metrics: ReturnType<typeof markMetrics>) {
  const lines = text.split('\n');
  const units = (line: string) =>
    [...line].reduce((sum, char) => sum + (char.codePointAt(0)! > 255 ? 1 : 0.65), 0);
  return {
    lines,
    width: Math.max(1, ...lines.map(units)) * metrics.noteFontSize + metrics.padding * 2,
    height: lines.length * metrics.lineHeight + metrics.padding * 2,
  };
}
