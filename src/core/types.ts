/** 좌표와 크기는 원본 이미지의 픽셀 단위다. */
export interface Point {
  x: number;
  y: number;
}

interface AnnotationBase {
  id: string;
}

interface Numbered {
  number: number;
  instruction: string;
  /** 번호 동그라미만 옮긴 거리. 없으면 제자리(점의 위치·박스 왼쪽 위·화살표 시작). */
  badgeOffset?: Point;
}

export interface PinAnnotation extends AnnotationBase, Numbered {
  type: 'pin';
  position: Point;
}

export interface BoxAnnotation extends AnnotationBase, Numbered {
  type: 'box';
  position: Point;
  width: number;
  height: number;
}

export interface ArrowAnnotation extends AnnotationBase, Numbered {
  type: 'arrow';
  start: Point;
  end: Point;
}

export interface NoteAnnotation extends AnnotationBase {
  type: 'note';
  position: Point;
  text: string;
}

export type Annotation = PinAnnotation | BoxAnnotation | ArrowAnnotation | NoteAnnotation;
