import { describe, expect, it } from 'vitest';
import { labelLayout, textUnits } from '../../src/core/labelLayout';
import type { Annotation, PinAnnotation } from '../../src/core/types';

const pin: PinAnnotation = {
  id: 'a',
  type: 'pin',
  number: 1,
  position: { x: 100, y: 100 },
  instruction: '버튼을 크게 바꿔 주세요',
};
describe('그림 위 지시문 배치', () => {
  it('한글·한자·전각과 영문·공백의 폭으로 줄을 나눈다', () => {
    expect(textUnits('가漢Ａa ')).toBeCloseTo(3.9);
    const result = labelLayout({ ...pin, instruction: '가'.repeat(30) }, 400, 300)!;
    expect(result.lines.length).toBe(3);
    expect(result.lines.join('')).toBe('가'.repeat(30));
    expect(result.width).toBeLessThanOrEqual(160);
    expect(labelLayout({ ...pin, instruction: '첫 줄\n둘째 줄' }, 800, 600)?.lines).toEqual([
      '첫 줄',
      '둘째 줄',
    ]);
  });
  it('세 줄을 넘으면 마지막 줄에 …를 붙이고 폭을 지킨다', () => {
    const result = labelLayout({ ...pin, instruction: '아주 긴 설명 '.repeat(50) }, 800, 600)!;
    expect(result.lines).toHaveLength(3);
    expect(result.lines[2]).toMatch(/…$/u);
    result.lines.forEach((line) =>
      expect(textUnits(line) * result.fontSize + 2 * result.padding).toBeLessThanOrEqual(320),
    );
  });
  it('오른쪽 끝 핀의 라벨을 왼쪽에 놓는다', () => {
    const result = labelLayout({ ...pin, position: { x: 790, y: 200 } }, 800, 600)!;
    expect(result.x + result.width).toBeLessThan(790);
  });
  it('박스 위 공간이 없으면 아래에 놓고 모든 라벨을 이미지 안으로 밀어 넣는다', () => {
    const box: Annotation = {
      ...pin,
      type: 'box',
      position: { x: 20, y: 0 },
      width: 100,
      height: 50,
    };
    expect(labelLayout(box, 800, 600)!.y).toBeGreaterThan(50);
    const items: Annotation[] = [
      pin,
      box,
      {
        id: 'b',
        type: 'arrow',
        start: { x: 10, y: 10 },
        end: { x: 800, y: 600 },
        instruction: '이쪽으로 옮겨 주세요',
        number: 2,
      },
    ];
    for (const item of items) {
      for (const [width, height] of [
        [800, 600],
        [30, 800],
        [1, 1],
      ]) {
        const result = labelLayout(item, width, height)!;
        expect(result.x).toBeGreaterThanOrEqual(0);
        expect(result.y).toBeGreaterThanOrEqual(0);
        expect(result.x + result.width).toBeLessThanOrEqual(width);
        expect(result.y + result.height).toBeLessThanOrEqual(height);
      }
    }
  });
  it('빈 지시문과 메모에는 라벨을 만들지 않는다', () => {
    expect(labelLayout({ ...pin, instruction: ' \n ' }, 800, 600)).toBeNull();
    expect(
      labelLayout({ id: 'n', type: 'note', position: pin.position, text: '메모' }, 800, 600),
    ).toBeNull();
  });
});
