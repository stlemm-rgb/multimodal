import { describe, expect, it } from 'vitest';
import { arrowHead, markColors, markMetrics, noteLayout } from '../../src/core/markStyle';
import { imagePoint } from '../../src/editor/coords';
import { exportFileName } from '../../src/platform/exportImage';

describe('화면과 PNG의 공통 값', () => {
  it('최솟값 및 긴 변에 비례하는 선과 핀', () => {
    expect(markMetrics(100, 200)).toMatchObject({ lineWidth: 3, radius: 14 });
    expect(markMetrics(4500, 2000)).toMatchObject({ lineWidth: 18, radius: 100, fontSize: 100 });
    expect(markMetrics(4500, 2000)).toEqual(markMetrics(2000, 4500));
    expect(markColors).toMatchObject({ stroke: '#FF2D55', note: '#FFE066' });
  });
  it('화살촉은 끝에 붙고 진행 반대쪽에 대칭으로 놓인다', () => {
    const head = arrowHead({ x: 0, y: 0 }, { x: 100, y: 0 }, 20);
    expect(head[0]).toEqual({ x: 100, y: 0 });
    expect(head[1].x).toBeCloseTo(100 - 10 * Math.sqrt(3));
    expect(head[1].y).toBeCloseTo(10);
    expect(head[2].y).toBeCloseTo(-10);
    const vertical = arrowHead({ x: 0, y: 0 }, { x: 0, y: 100 }, 20);
    expect(vertical[1].y).toBeCloseTo(100 - 10 * Math.sqrt(3));
    expect(
      arrowHead({ x: 0, y: 0 }, { x: 0, y: 0 }, 20)
        .flatMap((p) => [p.x, p.y])
        .every(Number.isFinite),
    ).toBe(true);
  });
  it('메모 줄 나눔과 크기', () => {
    const m = markMetrics(100, 100);
    const layout = noteLayout('한글\n둘', m);
    expect(layout.lines).toEqual(['한글', '둘']);
    expect(layout.height).toBe(2 * m.lineHeight + 2 * m.padding);
    expect(layout.width).toBe(2 * m.noteFontSize + 2 * m.padding);
  });
  it('화면 좌표를 원본 좌표로 바꾸고 캔버스 바깥은 제한한다', () => {
    const rect = { left: 20, top: 30, width: 100, height: 200 };
    expect(imagePoint({ x: 70, y: 130 }, rect, 1000, 2000)).toEqual({ x: 500, y: 1000 });
    expect(imagePoint({ x: -5, y: 500 }, rect, 1000, 2000)).toEqual({ x: 0, y: 2000 });
  });
  it('파일 이름에서 사용할 수 없는 글자를 바꾼다', () => {
    expect(exportFileName('내 앱:/?*"<>|\\', 2)).toBe('내 앱__________화면2.png');
  });
});
