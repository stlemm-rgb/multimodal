import type { Point } from '../core/types';

export function imagePoint(
  client: Point,
  rect: { left: number; top: number; width: number; height: number },
  width: number,
  height: number,
): Point {
  return {
    x: Math.max(0, Math.min(width, ((client.x - rect.left) * width) / rect.width)),
    y: Math.max(0, Math.min(height, ((client.y - rect.top) * height) / rect.height)),
  };
}
