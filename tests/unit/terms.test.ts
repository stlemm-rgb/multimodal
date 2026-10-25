import { expect, it } from 'vitest';
import { terms } from '../../src/glossary/data/terms';
import { previews } from '../../src/glossary/previews';
it('그림 12개와 움직임 12개에 고유한 ID, 설명, 미리보기가 있다', () => {
  expect(terms.filter((term) => term.kind === 'still')).toHaveLength(12);
  expect(terms.filter((term) => term.kind === 'motion')).toHaveLength(12);
  expect(new Set(terms.map((term) => term.id)).size).toBe(24);
  expect(Object.keys(previews).sort()).toEqual(terms.map((term) => term.id).sort());
  for (const term of terms) {
    expect(term.id).toMatch(/^[a-z]+(?:-[a-z]+)*$/u);
    for (const value of Object.values(term)) {
      expect(value.trim()).not.toBe('');
      expect(value).not.toContain('??');
    }
    expect(term.sayToAi).toContain(`(${term.english})`);
    expect(previews[term.id]).toBeTypeOf('function');
  }
});
