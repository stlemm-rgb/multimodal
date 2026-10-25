export interface GlossaryTerm {
  id: 'skeleton' | 'bottom-sheet';
  name: string;
  meaning: string;
  prompt: string;
}

export const terms: readonly GlossaryTerm[] = [
  {
    id: 'skeleton',
    name: '스켈레톤',
    meaning: '내용을 불러오는 동안, 글과 사진이 들어갈 자리를 먼저 보여 주는 모양이에요.',
    prompt: '내용을 불러오는 동안 사진과 글이 들어갈 자리에 회색 모양의 스켈레톤을 보여 주세요.',
  },
  {
    id: 'bottom-sheet',
    name: '바텀시트',
    meaning: '화면 아래에서 올라와 선택 항목이나 추가 내용을 보여 주는 작은 창이에요.',
    prompt: '공유 버튼을 누르면 화면 아래에서 공유 방법을 고르는 바텀시트가 올라오게 해 주세요.',
  },
];
