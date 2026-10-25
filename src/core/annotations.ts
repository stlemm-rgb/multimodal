import type { Annotation, ArrowAnnotation, BoxAnnotation } from './types';

type LegacyAnnotation =
  | Annotation
  | Omit<BoxAnnotation, 'number' | 'instruction'>
  | Omit<ArrowAnnotation, 'number' | 'instruction'>;
export type NewAnnotation = Annotation extends infer A
  ? A extends Annotation
    ? Omit<A, 'number'>
    : never
  : never;

export function nextNumber(list: readonly Annotation[]): number {
  return Math.max(0, ...list.map((item) => (item.type === 'note' ? 0 : item.number))) + 1;
}
/** 옛 데이터도 배열의 생성 순서대로 번호를 매긴다. 저장 버전은 유지한다. */
export function normalizeAnnotations(list: readonly LegacyAnnotation[]): Annotation[] {
  let number = 0;
  return list.map((item): Annotation => {
    if (item.type === 'note') return { ...item, position: { ...item.position } };
    const numbered = {
      ...item,
      number: ++number,
      instruction: 'instruction' in item ? item.instruction : '',
    };
    if (numbered.type === 'box')
      return {
        ...numbered,
        position: {
          x: numbered.position.x + Math.min(0, numbered.width),
          y: numbered.position.y + Math.min(0, numbered.height),
        },
        width: Math.abs(numbered.width),
        height: Math.abs(numbered.height),
      };
    if (numbered.type === 'arrow')
      return { ...numbered, start: { ...numbered.start }, end: { ...numbered.end } };
    return { ...numbered, position: { ...numbered.position } };
  });
}
export function addAnnotation(list: readonly Annotation[], item: NewAnnotation): Annotation[] {
  const added: Annotation =
    item.type === 'note' ? { ...item } : { ...item, number: nextNumber(list) };
  if (added.type === 'box') {
    added.position = {
      x: added.position.x + Math.min(0, added.width),
      y: added.position.y + Math.min(0, added.height),
    };
    added.width = Math.abs(added.width);
    added.height = Math.abs(added.height);
    if (!added.width || !added.height) return [...list];
  }
  return [...list, added];
}
export function updateInstruction(
  list: readonly Annotation[],
  id: string,
  instruction: string,
): Annotation[] {
  return list.map((item) =>
    item.id === id && item.type !== 'note' ? { ...item, instruction } : item,
  );
}
export function updateNoteText(
  list: readonly Annotation[],
  id: string,
  text: string,
): Annotation[] {
  return list.map((item) => (item.id === id && item.type === 'note' ? { ...item, text } : item));
}
export function moveAnnotation(
  list: readonly Annotation[],
  id: string,
  dx: number,
  dy: number,
): Annotation[] {
  return list.map((item) => {
    if (item.id !== id) return item;
    if (item.type === 'arrow')
      return {
        ...item,
        start: { x: item.start.x + dx, y: item.start.y + dy },
        end: { x: item.end.x + dx, y: item.end.y + dy },
      };
    return { ...item, position: { x: item.position.x + dx, y: item.position.y + dy } };
  });
}
export function removeAnnotation(list: readonly Annotation[], id: string): Annotation[] {
  return normalizeAnnotations(list.filter((item) => item.id !== id));
}
