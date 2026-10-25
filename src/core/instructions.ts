import type { PinAnnotation } from './types';

/** 빈 지시문은 빼고 번호순으로 정리한다. 원본 목록과 번호는 바꾸지 않는다. */
export function buildInstructions(pins: readonly PinAnnotation[]): string {
  return [...pins]
    .sort((a, b) => a.number - b.number)
    .map((pin) => ({ number: pin.number, text: pin.instruction.replace(/\s+/gu, ' ').trim() }))
    .filter((pin) => pin.text.length > 0)
    .map((pin) => `${pin.number}. ${pin.text}`)
    .join('\n');
}
