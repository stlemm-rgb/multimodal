/** still은 정지 그림, motion은 움직이는 미리보기다. 분류와는 따로다. */
export type TermKind = 'still' | 'motion';
export type TermCategory = 'layout' | 'component' | 'input' | 'feedback' | 'motion' | 'style';
/** 사전 탭 순서. */
export const categories: readonly { id: TermCategory; label: string }[] = [
  { id: 'layout', label: '화면 틀' },
  { id: 'component', label: '화면 부품' },
  { id: 'input', label: '입력' },
  { id: 'feedback', label: '알림·기다림' },
  { id: 'motion', label: '움직임·손짓' },
  { id: 'style', label: '모양·꾸밈' },
];
export interface Term {
  id: string;
  name: string;
  english: string;
  category: TermCategory;
  kind: TermKind;
  meaning: string;
  sayToAi: string;
}
export const terms: readonly Term[] = [
  {
    id: 'split-layout',
    category: 'layout',
    name: '분할 화면',
    english: 'Split layout',
    meaning: '한 화면을 여러 구역으로 나눠 보여 줘요.',
    sayToAi: '왼쪽에 목록, 오른쪽에 내용을 보여 주는 분할 화면(Split layout)을 만들어 주세요.',
    kind: 'still',
  },
  {
    id: 'card',
    category: 'component',
    name: '카드',
    english: 'Card',
    meaning: '관련 있는 사진과 글을 한 상자에 모아 보여 줘요.',
    sayToAi: '사진과 제목을 둥근 카드(Card) 하나에 모아 주세요.',
    kind: 'still',
  },
  {
    id: 'chip',
    category: 'component',
    name: '칩',
    english: 'Chip',
    meaning: '짧은 단어나 선택 항목을 작은 둥근 조각으로 보여 줘요.',
    sayToAi: '분류를 고를 수 있는 작은 칩(Chip)을 나란히 놓아 주세요.',
    kind: 'still',
  },
  {
    id: 'badge',
    category: 'feedback',
    name: '배지',
    english: 'Badge',
    meaning: '새 소식이나 개수를 작은 표시로 알려 줘요.',
    sayToAi: '알림 아이콘 위에 읽지 않은 개수를 배지(Badge)로 보여 주세요.',
    kind: 'still',
  },
  {
    id: 'tab-bar',
    category: 'layout',
    name: '탭 바',
    english: 'Tab bar',
    meaning: '여러 화면을 오갈 수 있는 버튼을 모은 막대예요.',
    sayToAi: '아래에 홈과 검색을 오가는 탭 바(Tab bar)를 넣어 주세요.',
    kind: 'still',
  },
  {
    id: 'app-bar',
    category: 'layout',
    name: '앱 바·위 막대',
    english: 'App bar',
    meaning: '화면 맨 위에 제목과 자주 쓰는 버튼을 모아 둬요.',
    sayToAi: '위쪽 앱 바(App bar)에 뒤로 가기와 화면 제목을 넣어 주세요.',
    kind: 'still',
  },
  {
    id: 'list',
    category: 'layout',
    name: '목록',
    english: 'List',
    meaning: '항목을 위에서 아래로 한 줄씩 보여 줘요.',
    sayToAi: '사진과 이름을 한 줄씩 세로 목록(List)으로 보여 주세요.',
    kind: 'still',
  },
  {
    id: 'grid',
    category: 'layout',
    name: '격자',
    english: 'Grid',
    meaning: '항목을 가로와 세로로 가지런히 놓아요.',
    sayToAi: '사진을 한 줄에 두 개씩 격자(Grid)로 배치해 주세요.',
    kind: 'still',
  },
  {
    id: 'avatar',
    category: 'component',
    name: '아바타',
    english: 'Avatar',
    meaning: '사용자를 나타내는 작은 사진이나 그림이에요.',
    sayToAi: '이름 옆에 동그란 사용자 사진인 아바타(Avatar)를 보여 주세요.',
    kind: 'still',
  },
  {
    id: 'divider',
    category: 'component',
    name: '구분선',
    english: 'Divider',
    meaning: '서로 다른 내용을 가는 선으로 나눠요.',
    sayToAi: '목록 항목 사이에 얇은 구분선(Divider)을 넣어 주세요.',
    kind: 'still',
  },
  {
    id: 'fab',
    category: 'component',
    name: '떠 있는 버튼',
    english: 'FAB',
    meaning: '화면 위에 떠 있는 가장 중요한 동작 버튼이에요.',
    sayToAi: '오른쪽 아래에 새 글을 쓰는 떠 있는 버튼(FAB)을 고정해 주세요.',
    kind: 'still',
  },
  {
    id: 'empty-state',
    category: 'feedback',
    name: '빈 화면 안내',
    english: 'Empty state',
    meaning: '아직 내용이 없을 때 이유와 다음 할 일을 알려 줘요.',
    sayToAi: '목록이 비었을 때 첫 항목을 추가하라는 빈 화면 안내(Empty state)를 보여 주세요.',
    kind: 'still',
  },
  {
    id: 'drawer',
    category: 'layout',
    name: '서랍 메뉴',
    english: 'Drawer',
    meaning: '화면 옆에서 밀려 나오는 메뉴예요.',
    sayToAi: '왼쪽 위 ☰ 버튼을 누르면 왼쪽에서 서랍 메뉴(Drawer)가 밀려 나오게 해 주세요.',
    kind: 'motion',
  },
  {
    id: 'bottom-sheet',
    category: 'component',
    name: '바텀시트',
    english: 'Bottom sheet',
    meaning: '화면 아래에서 올라와 선택할 내용을 보여 주는 창이에요.',
    sayToAi:
      '공유 버튼을 누르면 아래에서 공유 방법을 고르는 바텀시트(Bottom sheet)가 올라오게 해 주세요.',
    kind: 'motion',
  },
  {
    id: 'modal',
    category: 'component',
    name: '모달 창',
    english: 'Modal',
    meaning: '하던 일을 잠시 멈추고 확인하는 작은 창이에요.',
    sayToAi: '삭제 버튼을 누르면 가운데 모달 창(Modal)으로 한 번 더 확인해 주세요.',
    kind: 'motion',
  },
  {
    id: 'toast',
    category: 'feedback',
    name: '토스트 알림',
    english: 'Toast',
    meaning: '잠깐 나타났다가 사라지는 짧은 안내예요.',
    sayToAi: '저장하면 아래에 저장 완료 토스트 알림(Toast)을 잠깐 보여 주세요.',
    kind: 'motion',
  },
  {
    id: 'skeleton',
    category: 'feedback',
    name: '스켈레톤',
    english: 'Skeleton',
    meaning: '불러오는 동안 사진과 글이 들어갈 자리를 먼저 보여 줘요.',
    sayToAi:
      '내용을 불러오는 동안 회색 스켈레톤(Skeleton)을 보여 주고, 끝나면 실제 내용으로 바꿔 주세요.',
    kind: 'motion',
  },
  {
    id: 'carousel',
    category: 'component',
    name: '캐러셀',
    english: 'Carousel',
    meaning: '사진이나 카드를 옆으로 넘겨 보는 모양이에요.',
    sayToAi: '사진을 옆으로 넘겨 보는 캐러셀(Carousel)을 만들어 주세요.',
    kind: 'motion',
  },
  {
    id: 'accordion',
    category: 'component',
    name: '아코디언',
    english: 'Accordion',
    meaning: '제목을 누르면 아래 내용이 펼쳐졌다 접혀요.',
    sayToAi: '질문 제목을 누르면 답이 펼쳐지는 아코디언(Accordion)을 만들어 주세요.',
    kind: 'motion',
  },
  {
    id: 'dropdown',
    category: 'input',
    name: '드롭다운',
    english: 'Dropdown',
    meaning: '버튼 아래로 선택 목록이 펼쳐져요.',
    sayToAi: '정렬 버튼 아래에 최신순과 인기순을 고르는 드롭다운(Dropdown)을 열어 주세요.',
    kind: 'motion',
  },
  {
    id: 'tooltip',
    category: 'feedback',
    name: '툴팁',
    english: 'Tooltip',
    meaning: '버튼 옆에 짧은 설명이 나타나요.',
    sayToAi: '도움말 버튼을 누르면 옆에 짧은 설명 툴팁(Tooltip)을 보여 주세요.',
    kind: 'motion',
  },
  {
    id: 'pull-to-refresh',
    category: 'motion',
    name: '당겨서 새로고침',
    english: 'Pull to refresh',
    meaning: '목록을 아래로 당기면 새 내용을 불러와요.',
    sayToAi: '목록을 아래로 당겨서 새로고침(Pull to refresh)할 수 있게 해 주세요.',
    kind: 'motion',
  },
  {
    id: 'swipe-action',
    category: 'motion',
    name: '밀어서 동작',
    english: 'Swipe action',
    meaning: '항목을 옆으로 밀면 숨겨진 동작 버튼이 나와요.',
    sayToAi:
      '목록 항목을 왼쪽으로 밀면 삭제 버튼이 나오는 밀어서 동작(Swipe action)을 넣어 주세요.',
    kind: 'motion',
  },
  {
    id: 'spinner',
    category: 'feedback',
    name: '로딩 표시',
    english: 'Spinner',
    meaning: '빙글 도는 모양으로 기다리는 중임을 알려 줘요.',
    sayToAi: '내용을 불러오는 동안 빙글 도는 로딩 표시(Spinner)를 보여 주세요.',
    kind: 'motion',
  },
];

/** 자주 헷갈리는 두 용어. 차이는 "A는 …하고, B는 …해요." 한 줄. */
export interface Confusion {
  a: string;
  b: string;
  difference: string;
}
export const confusions: readonly Confusion[] = [
  {
    a: 'modal',
    b: 'bottom-sheet',
    difference: '모달은 화면 가운데에 뜨고, 바텀시트는 아래에서 올라와요.',
  },
  {
    a: 'chip',
    b: 'badge',
    difference: '칩은 눌러서 고르는 조각이고, 배지는 개수나 새 소식을 알리는 작은 표시예요.',
  },
  {
    a: 'tab-bar',
    b: 'drawer',
    difference: '탭 바는 늘 보이는 아래 버튼 줄이고, 서랍 메뉴는 버튼을 눌러야 옆에서 나와요.',
  },
];
