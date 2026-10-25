import { useEffect, useRef, useState, type PointerEvent } from 'react';
import type { Capture } from '../core/project';
import type { Annotation, Point } from '../core/types';
import type { ProjectStore } from '../core/storage';
import {
  addAnnotation,
  moveAnnotation,
  nextNumber,
  removeAnnotation,
  updateInstruction,
  updateNoteText,
} from '../core/annotations';
import { canRedo, canUndo, createHistory, push, redo, undo, type History } from '../core/history';
import { markMetrics, noteLayout } from '../core/markStyle';
import CaptureImage from '../ui/CaptureImage';
import BottomSheet from '../ui/BottomSheet';
import { imagePoint } from './coords';
import Mark from './Mark';

type Gesture = {
  pointerId: number;
  start: Point;
  client: Point;
  id?: string;
  tool: string;
  base: Annotation[];
  moved: boolean;
};
export default function AnnotationCanvas({
  capture,
  store,
  tool,
  disabled,
  onChange,
}: {
  capture: Capture;
  store: ProjectStore;
  tool: string;
  disabled: boolean;
  onChange: (capture: Capture) => void;
}) {
  const [history, setHistory] = useState(() => createHistory(capture.annotations));
  const current = useRef(history);
  const [preview, setPreview] = useState<Annotation[] | null>(null);
  const [selected, setSelected] = useState('');
  const [editing, setEditing] = useState('');
  const newlyAdded = useRef('');
  const textEditRecorded = useRef(false);
  const gesture = useRef<Gesture | null>(null);
  const metrics = markMetrics(capture.width, capture.height);
  const annotations = preview ?? history.present;
  function apply(next: History<Annotation[]>) {
    if (next === current.current) return;
    current.current = next;
    setHistory(next);
    onChange({ ...capture, annotations: next.present });
  }
  function commit(next: Annotation[]) {
    apply(push(current.current, next));
  }
  useEffect(() => {
    function keydown(event: KeyboardEvent) {
      if (
        disabled ||
        gesture.current ||
        document.querySelector('dialog[open]') ||
        (event.target instanceof HTMLElement &&
          event.target.closest('input, textarea, select, [contenteditable="true"]'))
      )
        return;
      if (!(event.ctrlKey || event.metaKey) || event.altKey) return;
      const key = event.key.toLowerCase();
      if (key !== 'z' && key !== 'y') return;
      event.preventDefault();
      apply(key === 'y' || event.shiftKey ? redo(current.current) : undo(current.current));
    }
    window.addEventListener('keydown', keydown);
    return () => window.removeEventListener('keydown', keydown);
  });
  function point(event: PointerEvent<SVGSVGElement>) {
    return imagePoint(
      { x: event.clientX, y: event.clientY },
      event.currentTarget.getBoundingClientRect(),
      capture.width,
      capture.height,
    );
  }
  function draft(g: Gesture, end: Point): Annotation | undefined {
    const id = 'draft';
    const number = nextNumber(g.base);
    if (g.tool === '박스')
      return {
        id,
        type: 'box',
        position: { x: Math.min(g.start.x, end.x), y: Math.min(g.start.y, end.y) },
        width: Math.abs(end.x - g.start.x),
        height: Math.abs(end.y - g.start.y),
        number,
        instruction: '',
      };
    if (g.tool === '화살표')
      return { id, type: 'arrow', start: g.start, end, number, instruction: '' };
  }
  function cancel() {
    gesture.current = null;
    setPreview(null);
  }
  function down(event: PointerEvent<SVGSVGElement>) {
    if (disabled || gesture.current || !event.isPrimary || event.button !== 0) return;
    event.preventDefault();
    const id =
      tool === '선택'
        ? ((event.target as Element)
            .closest('[data-annotation-id]')
            ?.getAttribute('data-annotation-id') ?? undefined)
        : undefined;
    setSelected(id ?? '');
    gesture.current = {
      pointerId: event.pointerId,
      start: point(event),
      client: { x: event.clientX, y: event.clientY },
      id,
      tool,
      base: current.current.present,
      moved: false,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  }
  function move(event: PointerEvent<SVGSVGElement>) {
    const g = gesture.current;
    if (!g || g.pointerId !== event.pointerId) return;
    const end = point(event);
    g.moved ||= Math.hypot(event.clientX - g.client.x, event.clientY - g.client.y) > 3;
    if (g.id && g.moved)
      setPreview(moveAnnotation(g.base, g.id, end.x - g.start.x, end.y - g.start.y));
    else {
      const item = draft(g, end);
      if (item) setPreview([...g.base, item]);
    }
  }
  function up(event: PointerEvent<SVGSVGElement>) {
    const g = gesture.current;
    if (!g || g.pointerId !== event.pointerId) return;
    const end = point(event);
    cancel();
    event.currentTarget.releasePointerCapture(event.pointerId);
    if (g.tool === '선택') {
      if (g.id && g.moved)
        commit(moveAnnotation(g.base, g.id, end.x - g.start.x, end.y - g.start.y));
      else if (g.id) setEditing(g.id);
      return;
    }
    const id = crypto.randomUUID();
    let item: Annotation | undefined = draft(g, end);
    const threshold = Math.max(capture.width, capture.height) / 100;
    if (
      item?.type === 'box' &&
      (Math.max(item.width, item.height) < threshold || !item.width || !item.height)
    )
      return;
    if (item?.type === 'arrow' && Math.hypot(end.x - g.start.x, end.y - g.start.y) < threshold)
      return;
    if (g.tool === '번호')
      item = { id, type: 'pin', position: g.start, number: nextNumber(g.base), instruction: '' };
    if (g.tool === '메모') item = { id, type: 'note', position: g.start, text: '' };
    if (!item) return;
    commit(addAnnotation(g.base, { ...item, id }));
    newlyAdded.current = id;
    setSelected(id);
    setEditing(id);
  }
  const edited = history.present.find((item) => item.id === editing);
  return (
    <>
      <div className="history-bar">
        <button
          disabled={disabled || !canUndo(history)}
          onClick={() => apply(undo(current.current))}
        >
          ↶ 되돌리기
        </button>
        <button
          disabled={disabled || !canRedo(history)}
          onClick={() => apply(redo(current.current))}
        >
          ↷ 다시
        </button>
      </div>
      <div
        className="annotation-canvas"
        style={{
          width: `min(100%, ${capture.width}px, ${(58 * capture.width) / capture.height}vh)`,
          aspectRatio: `${capture.width} / ${capture.height}`,
        }}
      >
        <CaptureImage store={store} captureId={capture.id} alt="불러온 화면" />
        <svg
          aria-label="표시 그리기"
          viewBox={`0 0 ${capture.width} ${capture.height}`}
          onPointerDown={down}
          onPointerMove={move}
          onPointerUp={up}
          onPointerCancel={cancel}
          onLostPointerCapture={cancel}
        >
          {annotations.map((item) => (
            <g key={item.id} data-annotation-id={item.id} data-annotation-type={item.type}>
              {item.id === selected && <Selection item={item} metrics={metrics} />}
              <Mark item={item} metrics={metrics} />
              {item.type === 'box' && (
                <rect
                  x={item.position.x}
                  y={item.position.y}
                  width={item.width}
                  height={item.height}
                  fill="transparent"
                />
              )}
              {item.type === 'arrow' && (
                <line
                  x1={item.start.x}
                  y1={item.start.y}
                  x2={item.end.x}
                  y2={item.end.y}
                  stroke="transparent"
                  strokeWidth={metrics.radius * 2}
                />
              )}
            </g>
          ))}
        </svg>
      </div>
      <div className="annotation-list" aria-label="표시 목록">
        {history.present.map((item) => (
          <button
            key={item.id}
            aria-pressed={selected === item.id}
            onClick={() => {
              setSelected(item.id);
              setEditing(item.id);
            }}
          >
            {item.type === 'note'
              ? `메모: ${item.text || '(빈 메모)'}`
              : `${item.number <= 20 ? String.fromCodePoint(0x245f + item.number) : `${item.number}.`} ${item.instruction || '(설명 없음)'}`}
          </button>
        ))}
      </div>
      {edited && (
        <AnnotationSheet
          key={edited.id}
          item={edited}
          onTextChange={(text) => {
            if (text !== (edited.type === 'note' ? edited.text : edited.instruction)) {
              const next =
                edited.type === 'note'
                  ? updateNoteText(current.current.present, edited.id, text)
                  : updateInstruction(current.current.present, edited.id, text);
              // 새 표시와 첫 설명은 한 번에 되돌린다.
              if (newlyAdded.current === edited.id || textEditRecorded.current)
                apply({ ...current.current, present: next });
              else commit(next);
              textEditRecorded.current = true;
            }
          }}
          onClose={() => {
            newlyAdded.current = '';
            textEditRecorded.current = false;
            setEditing('');
          }}
          onDelete={() => {
            newlyAdded.current = '';
            textEditRecorded.current = false;
            commit(removeAnnotation(current.current.present, edited.id));
            setEditing('');
            setSelected('');
          }}
        />
      )}
    </>
  );
}
function AnnotationSheet({
  item,
  onTextChange,
  onClose,
  onDelete,
}: {
  item: Annotation;
  onTextChange: (text: string) => void;
  onClose: () => void;
  onDelete: () => void;
}) {
  const [text, setText] = useState(item.type === 'note' ? item.text : item.instruction);
  const input = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    input.current?.focus();
  }, []);
  return (
    <BottomSheet
      title={
        item.type === 'note'
          ? '화면에 어떤 글을 적을까요?'
          : `${item.number}번: 여기를 어떻게 바꿀까요?`
      }
      onClose={onClose}
    >
      <label>
        {item.type === 'note' ? '메모 글' : '지시문'}
        <textarea
          ref={input}
          rows={4}
          value={text}
          onChange={(event) => {
            setText(event.target.value);
            onTextChange(event.target.value);
          }}
          placeholder="예: 이 버튼을 더 크게, 파란색으로"
        />
      </label>
      <div className="actions">
        <button className="primary" onClick={onClose}>
          확인
        </button>
        <button onClick={onDelete}>지우기</button>
      </div>
    </BottomSheet>
  );
}
function Selection({
  item,
  metrics: m,
}: {
  item: Annotation;
  metrics: ReturnType<typeof markMetrics>;
}) {
  const p =
    item.type === 'arrow'
      ? { x: Math.min(item.start.x, item.end.x), y: Math.min(item.start.y, item.end.y) }
      : item.position;
  const size =
    item.type === 'note'
      ? noteLayout(item.text, m)
      : item.type === 'box'
        ? item
        : item.type === 'arrow'
          ? {
              width: Math.abs(item.end.x - item.start.x),
              height: Math.abs(item.end.y - item.start.y),
            }
          : { width: 0, height: 0 };
  return (
    <rect
      className="mark-selection"
      x={p.x - m.radius - m.lineWidth}
      y={p.y - m.radius - m.lineWidth}
      width={size.width + 2 * (m.radius + m.lineWidth)}
      height={size.height + 2 * (m.radius + m.lineWidth)}
      strokeWidth={m.lineWidth}
      strokeDasharray={`${m.lineWidth * 2} ${m.lineWidth * 2}`}
    />
  );
}
