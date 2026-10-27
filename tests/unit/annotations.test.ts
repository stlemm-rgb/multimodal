import { describe, expect, it } from 'vitest';
import {
  addAnnotation,
  badgeMoved,
  badgePoint,
  moveAnnotation,
  moveBadge,
  nextNumber,
  normalizeAnnotations,
  removeAnnotation,
  resetBadge,
  updateInstruction,
  updateNoteText,
} from '../../src/core/annotations';
import type { Annotation } from '../../src/core/types';

const pin = {
  id: 'p',
  type: 'pin' as const,
  position: { x: 10, y: 20 },
  number: 1,
  instruction: '크게',
};
const box = {
  id: 'b',
  type: 'box' as const,
  position: { x: 30, y: 40 },
  width: 50,
  height: 60,
  number: 2,
  instruction: '',
};
const arrow = {
  id: 'a',
  type: 'arrow' as const,
  start: { x: 1, y: 2 },
  end: { x: 40, y: 50 },
  number: 3,
  instruction: '옮기기',
};
const note = { id: 'n', type: 'note' as const, position: { x: 0, y: 0 }, text: '참고' };
const list: readonly Annotation[] = Object.freeze([
  Object.freeze(pin),
  Object.freeze(box),
  Object.freeze(arrow),
  Object.freeze(note),
]);
describe('표시', () => {
  it('번호만 옮기면 원래 자리는 그대로이고, 표시를 옮기면 번호도 같이 가며, 제자리로 돌릴 수 있다', () => {
    const moved = moveBadge(list, 'b', 5, -10);
    const movedBox = moved[1] as typeof box;
    expect(movedBox.position).toEqual(box.position);
    expect(badgePoint(movedBox)).toEqual({ x: 35, y: 30 });
    expect(badgeMoved(movedBox)).toBe(true);
    expect(badgePoint(moveAnnotation(moved, 'b', 1, 1)[1] as typeof box)).toEqual({ x: 36, y: 31 });
    expect(badgePoint(moveBadge(list, 'a', 2, 2)[2] as typeof arrow)).toEqual({ x: 3, y: 4 });
    const reset = resetBadge(moved, 'b');
    expect(reset[1]).toEqual(box);
    expect(badgeMoved(reset[1] as typeof box)).toBe(false);
    expect(normalizeAnnotations(moved)[1]).toMatchObject({ badgeOffset: { x: 5, y: -10 } });
    expect(list[1]).not.toHaveProperty('badgeOffset');
  });
  it('번호를 공유하고 메모는 번호를 쓰지 않으며 최대 번호 다음으로 추가한다', () => {
    expect(nextNumber([])).toBe(1);
    expect(nextNumber(list)).toBe(4);
    const added = addAnnotation(list, { ...pin, id: 'p2' });
    expect(added[4]).toMatchObject({ number: 4 });
    expect(addAnnotation(added, { ...note, id: 'n2' })[5]).not.toHaveProperty('number');
    expect(list).toHaveLength(4);
    expect(nextNumber([{ ...pin, number: 7 }, box])).toBe(8);
  });
  it('삭제 뒤 만든 순서대로 번호를 매기며 메모를 유지한다', () => {
    expect(removeAnnotation(list, 'b')).toEqual([pin, { ...arrow, number: 2 }, note]);
    expect(removeAnnotation(list, 'n')).toEqual([pin, box, arrow]);
    expect(list[2]).toMatchObject({ number: 3 });
  });
  it('각 도형을 옮겨도 원본 좌표와 다른 표시는 유지한다', () => {
    for (const item of list) {
      const moved = moveAnnotation(list, item.id, 5, -10);
      const result = moved.find((entry) => entry.id === item.id)!;
      if (result.type === 'arrow')
        expect(result).toMatchObject({ start: { x: 6, y: -8 }, end: { x: 45, y: 40 } });
      else if (item.type !== 'arrow')
        expect(result).toMatchObject({
          position: { x: item.position.x + 5, y: item.position.y - 10 },
        });
      expect(moved).not.toBe(list);
    }
    expect(pin.position).toEqual({ x: 10, y: 20 });
    expect(arrow.end).toEqual({ x: 40, y: 50 });
  });
  it('글 수정은 해당 종류에만 적용하고 새 배열을 반환한다', () => {
    expect(updateInstruction(list, 'b', '파랑')[1]).toMatchObject({ instruction: '파랑' });
    expect(updateNoteText(list, 'n', '새 메모')[3]).toMatchObject({ text: '새 메모' });
    expect(updateInstruction(list, 'n', '무시')).toEqual(list);
    expect(updateNoteText(list, 'p', '무시')).toEqual(list);
    expect(moveAnnotation(list, 'missing', 1, 1)).not.toBe(list);
    expect(updateInstruction(list, 'missing', '')).not.toBe(list);
    expect(updateNoteText(list, 'missing', '')).not.toBe(list);
    expect(box.instruction).toBe('');
  });
  it('옛 박스·화살표에 번호와 빈 지시를 채우고 역방향 박스를 정규화한다', () => {
    const legacy = [
      { id: 'old-box', type: 'box' as const, position: { x: 50, y: 60 }, width: -30, height: -20 },
      note,
      { id: 'old-arrow', type: 'arrow' as const, start: { x: 0, y: 0 }, end: { x: 50, y: 50 } },
      pin,
    ];
    const normalized = normalizeAnnotations(legacy);
    expect(normalized[0]).toMatchObject({
      number: 1,
      instruction: '',
      position: { x: 20, y: 40 },
      width: 30,
      height: 20,
    });
    expect(normalized[2]).toMatchObject({ number: 2, instruction: '' });
    expect(normalized[3]).toMatchObject({ number: 3, instruction: '크게' });
    expect(legacy[0]).not.toHaveProperty('number');
    expect(normalizeAnnotations(normalized)).toEqual(normalized);
    expect(addAnnotation([], { ...box, width: -50, height: -60 })[0]).toMatchObject({
      position: { x: -20, y: -20 },
      width: 50,
      height: 60,
    });
    expect(addAnnotation([], { ...box, width: 0 })).toEqual([]);
  });
});
