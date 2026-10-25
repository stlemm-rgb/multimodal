import { describe, expect, it } from 'vitest';
import { buildInstructions } from '../../src/core/instructions';
import type { PinAnnotation } from '../../src/core/types';

function pin(number: number, instruction: string): PinAnnotation {
  return { id: `pin-${number}`, type: 'pin', position: { x: 0, y: 0 }, number, instruction };
}

describe('buildInstructions', () => {
  it('번호를 숫자순으로 정리하고 원본은 바꾸지 않는다', () => {
    const pins = Object.freeze([
      Object.freeze(pin(10, '메뉴를 옮겨 주세요.')),
      Object.freeze(pin(2, '버튼을 크게 해 주세요.')),
    ]);
    expect(buildInstructions(pins)).toBe('2. 버튼을 크게 해 주세요.\n10. 메뉴를 옮겨 주세요.');
    expect(pins.map((item) => item.number)).toEqual([10, 2]);
  });

  it('빈 내용은 빼고 원래 번호를 유지하며 여러 줄은 한 줄로 만든다', () => {
    expect(buildInstructions([pin(1, ' \n '), pin(3, '  버튼을\n  아래로\t옮겨 주세요.  ')])).toBe(
      '3. 버튼을 아래로 옮겨 주세요.',
    );
  });

  it('핀이 없거나 모두 빈 내용이면 빈 문자열을 만든다', () => {
    expect(buildInstructions([])).toBe('');
    expect(buildInstructions([pin(1, ''), pin(2, '  ')])).toBe('');
  });
});
