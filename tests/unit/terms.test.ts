import { expect, it } from 'vitest';
import { categories, confusions, terms } from '../../src/glossary/data/terms';
import { previews } from '../../src/glossary/previews';
it('용어마다 고유한 ID, 분류, 설명, 미리보기가 있다', () => {
  const ids = terms.map((term) => term.id);
  expect(new Set(ids).size).toBe(terms.length);
  expect(Object.keys(previews).sort()).toEqual([...ids].sort());
  const categoryIds = categories.map((category) => category.id);
  for (const term of terms) {
    expect(term.id).toMatch(/^[a-z]+(?:-[a-z]+)*$/u);
    expect(categoryIds).toContain(term.category);
    for (const value of Object.values(term)) {
      expect(value.trim()).not.toBe('');
      expect(value).not.toContain('??');
    }
    expect(term.sayToAi).toContain(`(${term.english})`);
    expect(previews[term.id]).toBeTypeOf('function');
  }
});
it('헷갈리는 짝은 있는 용어 둘을 잇고 겹치지 않는다', () => {
  const ids = new Set(terms.map((term) => term.id));
  const pairs = confusions.map(({ a, b }) => [a, b].sort().join('|'));
  expect(new Set(pairs).size).toBe(confusions.length);
  for (const { a, b, difference } of confusions) {
    expect(ids.has(a) && ids.has(b) && a !== b).toBe(true);
    expect(difference.trim()).not.toBe('');
  }
});
