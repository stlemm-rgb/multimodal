import { describe, expect, it } from 'vitest';
import {
  buildCaptureInstructions,
  buildProjectInstructions,
  buildSingleInstructions,
} from '../../src/core/instructions';
import type { PinAnnotation } from '../../src/core/types';

function pin(number: number, instruction: string): PinAnnotation {
  return { id: `pin-${number}`, type: 'pin', position: { x: 0, y: 0 }, number, instruction };
}

const intro =
  '첨부한 이미지의 빨간 번호를 보고 아래대로 고쳐 주세요. 이미지는 화면 번호 순서대로 붙였어요.';
describe('지시문', () => {
  it('번호를 숫자순으로 정리하고 원본은 바꾸지 않는다', () => {
    const pins = Object.freeze([
      Object.freeze(pin(10, '메뉴를 옮겨 주세요.')),
      Object.freeze(pin(2, '버튼을 크게 해 주세요.')),
    ]);
    expect(buildCaptureInstructions(pins)).toBe(
      '2. [점] 버튼을 크게 해 주세요.\n10. [점] 메뉴를 옮겨 주세요.',
    );
    expect(pins.map((item) => item.number)).toEqual([10, 2]);
  });

  it('빈 지시도 유지하며 여러 줄은 한 줄로 만든다', () => {
    expect(
      buildCaptureInstructions([pin(1, ' \n '), pin(3, '  버튼을\n  아래로\t옮겨 주세요.  ')]),
    ).toBe('1. [점] (설명 없음)\n3. [점] 버튼을 아래로 옮겨 주세요.');
  });

  it('빈 캡처 출력과 단일 화면 안내문', () => {
    expect(buildCaptureInstructions([])).toBe('');
    expect(buildSingleInstructions([])).toBe(intro);
    expect(buildSingleInstructions([pin(1, '크게')])).toBe(`${intro}\n\n[화면 1]\n1. [점] 크게`);
  });
  it('박스·화살표·메모를 포함하며 빈 화면을 건너뛰어도 화면 번호는 유지한다', () => {
    const annotations = [
      { id: 'n', type: 'note' as const, position: { x: 0, y: 0 }, text: '참고\n 화면' },
      {
        id: 'a',
        type: 'arrow' as const,
        start: { x: 0, y: 0 },
        end: { x: 50, y: 20 },
        number: 3,
        instruction: '옮기기',
      },
      {
        id: 'b',
        type: 'box' as const,
        position: { x: 0, y: 0 },
        width: 10,
        height: 10,
        number: 2,
        instruction: '',
      },
      pin(1, '크게'),
    ];
    const block =
      '[화면 2]\n1. [점] 크게\n2. [네모 영역] (설명 없음)\n3. [화살표] 옮기기\n메모: 참고 화면';
    expect(buildCaptureInstructions(annotations, 2)).toBe(block);
    expect(
      buildProjectInstructions([
        { annotations: [] },
        { annotations },
        { annotations: [] },
        { annotations: [pin(1, '작게')] },
      ]),
    ).toBe(`${intro}\n\n${block}\n\n[화면 4]\n1. [점] 작게`);
  });
});
