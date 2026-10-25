import { describe, expect, it } from 'vitest';
import { createHistory, push, undo, redo, canUndo, canRedo } from '../../src/core/history';

describe('실행 기록', () => {
  it('되돌리기·다시 실행 및 경계에서의 동작', () => {
    const first = createHistory('처음');
    expect(canUndo(first)).toBe(false);
    expect(canRedo(first)).toBe(false);
    expect(undo(first)).toBe(first);
    expect(redo(first)).toBe(first);
    const second = push(first, '다음');
    const back = undo(second);
    expect(back.present).toBe('처음');
    expect(canRedo(back)).toBe(true);
    expect(redo(back)).toEqual(second);
    expect(first).toEqual({ past: [], present: '처음', future: [] });
  });
  it('50단계만 남기고 새 작업 뒤에는 미래 기록을 비운다', () => {
    let history = createHistory(0);
    for (let i = 1; i <= 70; i++) history = push(history, i);
    expect(history.past).toHaveLength(50);
    for (let i = 0; i < 60; i++) history = undo(history);
    expect(history.present).toBe(20);
    expect(history.future).toHaveLength(50);
    history = push(redo(history), 100);
    expect(history.future).toEqual([]);
    expect(undo(history).present).toBe(21);
  });
});
