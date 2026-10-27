import type { Dictionary } from './types';

export const coding: Dictionary = {
  id: 'coding',
  label: '코딩',
  exampleTitle: 'AI에게는 이렇게 말하세요',
  forAi: true,
  categories: [{ id: 'release', label: '만들기·올리기' }],
  terms: [
    {
      id: 'deploy',
      category: 'release',
      name: '배포',
      english: 'Deploy',
      meaning: '만든 앱을 다른 사람도 쓸 수 있게 인터넷에 올리는 일이에요.',
      sayToAi: '지금 고친 내용을 확인한 뒤 배포(Deploy)해서 휴대폰에서도 볼 수 있게 해 주세요.',
    },
  ],
  confusions: [],
};
