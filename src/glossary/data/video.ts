import type { Dictionary } from './types';

export const video: Dictionary = {
  id: 'video',
  label: '영상',
  exampleTitle: 'AI에게는 이렇게 말하세요',
  forAi: true,
  categories: [{ id: 'edit', label: '자르기·잇기' }],
  terms: [
    {
      id: 'cut',
      category: 'edit',
      name: '컷',
      english: 'Cut',
      meaning: '영상을 끊김 없이 다음 장면으로 바로 넘기는 것이에요.',
      sayToAi: '소개 영상에서 말이 없는 부분은 컷(Cut)으로 잘라 내고 바로 다음 장면을 이어 주세요.',
    },
  ],
  confusions: [],
};
