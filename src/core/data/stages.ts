export interface Stage {
  id: string;
  title: string;
  goal: string;
  items: { id: string; text: string }[];
}

export const stages: readonly Stage[] = [
  {
    id: 'idea',
    title: '아이디어 정리',
    goal: '무엇을 누구를 위해 만들지 정해요.',
    items: [
      { id: 'idea-sentence', text: '만들 것을 한 문장으로 설명하기' },
      { id: 'idea-people', text: '누가 쓸지 정하기' },
      { id: 'idea-features', text: '꼭 필요한 기능 3개 고르기' },
    ],
  },
  {
    id: 'screens',
    title: '화면 목록',
    goal: '필요한 화면과 이동 순서를 정해요.',
    items: [
      { id: 'screens-list', text: '필요한 화면 이름 적기' },
      { id: 'screens-first', text: '처음 보여 줄 화면 정하기' },
      { id: 'screens-flow', text: '화면 사이 이동 순서 적기' },
    ],
  },
  {
    id: 'references',
    title: '참고 화면 모으기',
    goal: '비슷한 앱에서 참고할 모습을 찾아요.',
    items: [
      { id: 'references-captures', text: '참고할 캡처 3장 모으기' },
      { id: 'references-terms', text: '용어 사전에서 부품 이름 찾기' },
      { id: 'references-reason', text: '각 화면에서 가져올 점 적기' },
    ],
  },
  {
    id: 'mark',
    title: '표시하기',
    goal: '캡처에 번호·박스·움직임으로 설명해요.',
    items: [
      { id: 'mark-numbers', text: '설명할 곳마다 번호 붙이기' },
      { id: 'mark-lines', text: '번호마다 한 줄 설명 쓰기' },
      { id: 'mark-motion', text: '누르거나 움직일 곳 표시하기' },
    ],
  },
  {
    id: 'instruct',
    title: 'AI에게 지시하기',
    goal: '그림과 지시문을 AI에게 전달해요.',
    items: [
      { id: 'instruct-export', text: '그림과 지시문 내보내기' },
      { id: 'instruct-one', text: '한 번에 화면 하나씩 전달하기' },
      { id: 'instruct-result', text: 'AI가 만든 결과 받기' },
    ],
  },
  {
    id: 'review',
    title: '확인·고치기',
    goal: '결과를 보고 고칠 부분을 다시 알려 줘요.',
    items: [
      { id: 'review-phone', text: '휴대폰 화면 너비로 확인하기' },
      { id: 'review-capture', text: '결과를 캡처하고 고칠 곳 표시하기' },
      { id: 'review-retry', text: '수정을 요청하고 다시 확인하기' },
    ],
  },
  {
    id: 'launch',
    title: '출시 준비',
    goal: '다른 사람에게 보여 줄 준비를 해요.',
    items: [
      { id: 'launch-privacy', text: '개인정보가 보이지 않는지 확인하기' },
      { id: 'launch-name', text: '앱 이름과 아이콘 정하기' },
      { id: 'launch-friend', text: '친구 1명에게 써 보게 하기' },
    ],
  },
];
