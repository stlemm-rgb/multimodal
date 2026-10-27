import type { Dictionary } from './types';

export const image: Dictionary = {
  id: 'image',
  label: '이미지',
  exampleTitle: 'AI에게는 이렇게 말하세요',
  forAi: true,
  categories: [{ id: 'size', label: '크기·비율' }],
  terms: [
    {
      id: 'aspect-ratio',
      category: 'size',
      name: '화면 비율',
      english: 'Aspect ratio',
      meaning: '가로와 세로 길이의 비예요. 16:9는 가로로 긴 모양이에요.',
      sayToAi: '상품 사진을 모두 정사각형 화면 비율(Aspect ratio) 1:1로 잘라서 보여 주세요.',
    },
  ],
  confusions: [],
};
