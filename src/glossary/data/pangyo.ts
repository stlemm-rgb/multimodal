import type { Dictionary } from './types';

/** IT 회사에서 쓰는 영어 섞인 말. 예문은 "들은 말 → 쉬운 말" 꼴. */
export const pangyo: Dictionary = {
  id: 'pangyo',
  label: '판교 사투리',
  exampleTitle: '쉬운 말로 바꾸면',
  forAi: false,
  categories: [{ id: 'meeting', label: '회의' }],
  terms: [
    {
      id: 'align',
      category: 'meeting',
      name: '얼라인',
      english: 'Align',
      meaning: '서로 생각이나 방향을 같게 맞추는 것이에요.',
      sayToAi: '"이번 주까지 얼라인 맞춰 주세요" → "이번 주까지 서로 생각을 맞춰 주세요"',
    },
  ],
  confusions: [],
};
