import type { Annotation } from './types';
import type { Capture } from './project';

const introduction =
  '첨부한 이미지의 빨간 번호를 보고 아래대로 고쳐 주세요. 이미지는 화면 번호 순서대로 붙였어요.';
const oneLine = (text: string) => text.replace(/\s+/gu, ' ').trim();
export function buildCaptureInstructions(
  annotations: readonly Annotation[],
  screenIndex?: number,
): string {
  const labels = { pin: '점', box: '네모 영역', arrow: '화살표' };
  const numbered = annotations
    .filter((item) => item.type !== 'note')
    .sort((a, b) => a.number - b.number)
    .map(
      (item) =>
        `${item.number}. [${labels[item.type]}] ${oneLine(item.instruction) || '(설명 없음)'}`,
    );
  const notes = annotations
    .filter((item) => item.type === 'note')
    .map((item) => `메모: ${oneLine(item.text)}`);
  return [
    ...(screenIndex === undefined ? [] : [`[화면 ${screenIndex}]`]),
    ...numbered,
    ...notes,
  ].join('\n');
}
export function buildProjectInstructions(
  captures: readonly Pick<Capture, 'annotations'>[],
): string {
  const blocks = captures.flatMap((capture, index) =>
    capture.annotations.length ? [buildCaptureInstructions(capture.annotations, index + 1)] : [],
  );
  return [introduction, ...blocks].join('\n\n');
}
export function buildSingleInstructions(annotations: readonly Annotation[]): string {
  return buildProjectInstructions([{ annotations: [...annotations] }]);
}
