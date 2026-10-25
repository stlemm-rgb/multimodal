export interface History<T> {
  past: T[];
  present: T;
  future: T[];
}
export function createHistory<T>(present: T): History<T> {
  return { past: [], present, future: [] };
}
export function canUndo<T>(history: History<T>): boolean {
  return history.past.length > 0;
}
export function canRedo<T>(history: History<T>): boolean {
  return history.future.length > 0;
}
export function push<T>(history: History<T>, present: T): History<T> {
  return { past: [...history.past, history.present].slice(-50), present, future: [] };
}
export function undo<T>(history: History<T>): History<T> {
  if (!canUndo(history)) return history;
  return {
    past: history.past.slice(0, -1),
    present: history.past[history.past.length - 1],
    future: [history.present, ...history.future],
  };
}
export function redo<T>(history: History<T>): History<T> {
  if (!canRedo(history)) return history;
  return {
    past: [...history.past, history.present].slice(-50),
    present: history.future[0],
    future: history.future.slice(1),
  };
}
