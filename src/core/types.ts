/** 좌표와 크기는 원본 이미지의 픽셀 단위다. */
export interface Point {
  x: number;
  y: number;
}

interface AnnotationBase {
  id: string;
}

export interface PinAnnotation extends AnnotationBase {
  type: 'pin';
  position: Point;
  number: number;
  instruction: string;
}

export interface BoxAnnotation extends AnnotationBase {
  type: 'box';
  position: Point;
  width: number;
  height: number;
}

export interface ArrowAnnotation extends AnnotationBase {
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
