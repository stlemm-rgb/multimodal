import type { Confusion } from './types';
/** still은 정지 그림, motion은 움직이는 미리보기다. 분류와는 따로다. */
export type TermKind = 'still' | 'motion';
export type TermCategory = 'layout' | 'component' | 'input' | 'feedback' | 'motion' | 'style';
/** 사전 탭 순서. */
export const categories: readonly { id: TermCategory; label: string }[] = [
  { id: 'layout', label: '화면 틀' },
  { id: 'component', label: '화면 부품' },
  { id: 'input', label: '입력' },
  { id: 'feedback', label: '알림·기다림' },
  { id: 'motion', label: '움직임·효과' },
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
    sayToAi:
      '메모 목록과 본문을 분할 화면(Split layout)으로 나란히 보여 주고, 휴대폰에서는 한쪽씩 보이게 해 주세요.',
    kind: 'still',
  },
  {
    id: 'tab-bar',
    category: 'layout',
    name: '탭 바',
    english: 'Tab bar',
    meaning: '여러 화면을 오갈 수 있는 버튼을 모은 막대예요.',
    sayToAi:
      '아래 탭 바(Tab bar)를 누르면 홈과 검색 화면으로 이동하고, 현재 화면의 버튼은 강조해 주세요.',
    kind: 'still',
  },
  {
    id: 'app-bar',
    category: 'layout',
    name: '앱 바·위 막대',
    english: 'App bar',
    meaning: '화면 맨 위에 제목과 자주 쓰는 버튼을 모아 둬요.',
    sayToAi:
      '메모 위에 앱 바·위 막대(App bar)를 놓고, 메모를 열었을 때 제목과 뒤로 가기를 표시해 주세요.',
    kind: 'still',
  },
  {
    id: 'list',
    category: 'layout',
    name: '목록',
    english: 'List',
    meaning: '항목을 위에서 아래로 한 줄씩 보여 줘요.',
    sayToAi: '카페 메뉴를 세로 목록(List)으로 보여 주고, 메뉴를 누르면 주문창이 열리게 해 주세요.',
    kind: 'still',
  },
  {
    id: 'grid',
    category: 'layout',
    name: '격자',
    english: 'Grid',
    meaning: '항목을 가로와 세로로 가지런히 놓아요.',
    sayToAi: '상품 사진을 격자(Grid)로 배치하고, 휴대폰에서는 한 줄에 두 개씩 보이게 해 주세요.',
    kind: 'still',
  },
  {
    id: 'drawer',
    category: 'layout',
    name: '서랍 메뉴',
    english: 'Drawer',
    meaning: '화면 옆에서 밀려 나오는 메뉴예요.',
    sayToAi:
      '설정 버튼을 누르면 오른쪽에서 서랍 메뉴(Drawer)가 밀려 나오고, 바깥이나 ESC를 누르면 닫히게 해 주세요.',
    kind: 'motion',
  },
  {
    id: 'sidebar',
    category: 'layout',
    name: '사이드바',
    english: 'Sidebar',
    meaning: '화면 옆에 메뉴나 보조 내용을 담는 영역이에요.',
    sayToAi:
      '블로그 왼쪽에 사이드바(Sidebar)로 글 분류를 보여 주고, 휴대폰에서는 메뉴 버튼으로 접히게 해 주세요.',
    kind: 'still',
  },
  {
    id: 'sticky-header',
    category: 'layout',
    name: '고정 머리글',
    english: 'Sticky header',
    meaning: '내용을 내려도 머리글이 위쪽에 붙어 남아요.',
    sayToAi:
      '상품 목록을 내릴 때 고정 머리글(Sticky header)이 위에 붙게 하고, 검색창이 계속 보이게 해 주세요.',
    kind: 'motion',
  },
  {
    id: 'hero-section',
    category: 'layout',
    name: '첫 소개 영역',
    english: 'Hero section',
    meaning: '첫 화면에서 큰 제목과 그림으로 핵심을 소개해요.',
    sayToAi:
      '카페 첫 소개 영역(Hero section)에 대표 메뉴와 주문 버튼을 보여 주고, 휴대폰에서는 세로로 배치해 주세요.',
    kind: 'still',
  },
  {
    id: 'bento-grid',
    category: 'layout',
    name: '벤토 그리드',
    english: 'Bento grid',
    meaning: '도시락(벤토) 칸처럼 중요한 칸은 크게, 나머지는 작게 배치해요.',
    sayToAi:
      '카페 메뉴를 벤토 그리드(Bento grid)로 보여 주고, 추천 메뉴는 크게 나머지는 작게 배치해 주세요.',
    kind: 'still',
  },
  {
    id: 'responsive-layout',
    category: 'layout',
    name: '반응형 레이아웃',
    english: 'Responsive layout',
    meaning: '화면 폭에 맞춰 세 칸이 한 칸이 되는 식으로 배치가 바뀌어요.',
    sayToAi:
      '상품 목록에 반응형 레이아웃(Responsive layout)을 적용해 넓은 화면에서는 3열, 휴대폰에서는 1열로 표시해 주세요.',
    kind: 'motion',
  },
  {
    id: 'card',
    category: 'component',
    name: '카드',
    english: 'Card',
    meaning: '관련 있는 사진과 글을 한 상자에 모아 보여 줘요.',
    sayToAi: '상품 사진과 제목을 카드(Card)에 모으고, 누르면 상품 설명이 열리게 해 주세요.',
    kind: 'still',
  },
  {
    id: 'chip',
    category: 'component',
    name: '칩',
    english: 'Chip',
    meaning: '짧은 단어나 선택 항목을 작은 둥근 조각으로 보여 줘요.',
    sayToAi: '상품 분류를 칩(Chip)으로 나란히 놓고, 고른 칩은 색과 체크 표시로 구별되게 해 주세요.',
    kind: 'still',
  },
  {
    id: 'avatar',
    category: 'component',
    name: '아바타',
    english: 'Avatar',
    meaning: '사용자를 나타내는 작은 사진이나 그림이에요.',
    sayToAi:
      '댓글 이름 옆에 아바타(Avatar)를 보여 주고, 사진이 없으면 이름 첫 글자로 대체해 주세요.',
    kind: 'still',
  },
  {
    id: 'divider',
    category: 'component',
    name: '구분선',
    english: 'Divider',
    meaning: '서로 다른 내용을 가는 선으로 나눠요.',
    sayToAi: '카페 메뉴 사이에 구분선(Divider)을 넣고, 마지막 메뉴 아래에는 생략해 주세요.',
    kind: 'still',
  },
  {
    id: 'fab',
    category: 'component',
    name: '떠 있는 버튼',
    english: 'FAB',
    meaning: '화면 위에 떠 있는 가장 중요한 동작 버튼이에요.',
    sayToAi:
      '메모 목록 오른쪽 아래에 떠 있는 버튼(FAB)을 고정하고, 누르면 새 메모 입력창이 열리게 해 주세요.',
    kind: 'still',
  },
  {
    id: 'bottom-sheet',
    category: 'component',
    name: '바텀시트',
    english: 'Bottom sheet',
    meaning: '화면 아래에서 올라와 선택할 내용을 보여 주는 창이에요.',
    sayToAi:
      '주문 버튼을 누르면 바텀시트(Bottom sheet)가 아래에서 올라오고, 닫기를 누르면 내려가게 해 주세요.',
    kind: 'motion',
  },
  {
    id: 'modal',
    category: 'component',
    name: '모달 창',
    english: 'Modal',
    meaning: '하던 일을 잠시 멈추고 확인하는 작은 창이에요.',
    sayToAi:
      '메모 삭제 버튼을 누르면 가운데 모달 창(Modal)으로 확인하고, 취소하면 메모가 남게 해 주세요.',
    kind: 'motion',
  },
  {
    id: 'carousel',
    category: 'component',
    name: '캐러셀',
    english: 'Carousel',
    meaning: '사진이나 카드를 옆으로 넘겨 보는 모양이에요.',
    sayToAi:
      '상품 사진을 캐러셀(Carousel)로 옆으로 넘기게 하고, 자동으로 넘어가지는 않게 해 주세요.',
    kind: 'motion',
  },
  {
    id: 'accordion',
    category: 'component',
    name: '아코디언',
    english: 'Accordion',
    meaning: '제목을 누르면 아래 내용이 펼쳐졌다 접혀요.',
    sayToAi:
      '질문 제목을 누르면 아코디언(Accordion)으로 답이 아래에 펼쳐지고, 다시 누르면 접히게 해 주세요.',
    kind: 'motion',
  },
  {
    id: 'pagination',
    category: 'component',
    name: '페이지 번호',
    english: 'Pagination',
    meaning: '긴 목록을 여러 쪽으로 나누어 골라 보게 해요.',
    sayToAi:
      '블로그 글을 10개씩 나눠 페이지 번호(Pagination)를 표시하고, 번호를 누르면 해당 글 목록으로 교체해 주세요.',
    kind: 'still',
  },
  {
    id: 'breadcrumb',
    category: 'component',
    name: '현재 위치 경로',
    english: 'Breadcrumb',
    meaning: '상위 화면부터 현재 화면까지의 경로를 보여 줘요.',
    sayToAi:
      '상품 위에 현재 위치 경로(Breadcrumb)를 표시하고, 상위 분류를 누르면 그 분류로 이동하게 해 주세요.',
    kind: 'still',
  },
  {
    id: 'cta-button',
    category: 'component',
    name: 'CTA 버튼',
    english: 'Call to action',
    meaning: '사용자가 꼭 눌렀으면 하는 핵심 버튼이에요, 예를 들면 무료로 시작하기예요.',
    sayToAi:
      '첫 화면에 CTA 버튼(Call to action)을 크게 표시하고, 무료로 시작하기를 누르면 가입 화면으로 이동하게 해 주세요.',
    kind: 'still',
  },
  {
    id: 'tabs',
    category: 'component',
    name: '탭',
    english: 'Tabs',
    meaning: '같은 자리의 내용만 바꿔 보여 줘요, 화면 사이를 이동하는 아래 탭 바와는 달라요.',
    sayToAi:
      '상품 설명과 후기를 탭(Tabs)으로 나누고, 후기를 누르면 같은 자리에서 내용만 바뀌게 해 주세요.',
    kind: 'still',
  },
  {
    id: 'overlay',
    category: 'component',
    name: '오버레이',
    english: 'Overlay / Backdrop',
    meaning: '모달 뒤 화면을 반투명한 막으로 덮어 앞의 창에 집중하게 해요.',
    sayToAi:
      '주문 확인창이 열리면 뒤에 오버레이(Overlay / Backdrop)를 깔고, 막을 누르면 확인창이 닫히게 해 주세요.',
    kind: 'still',
  },
  {
    id: 'dropdown',
    category: 'input',
    name: '드롭다운',
    english: 'Dropdown',
    meaning: '버튼 아래로 선택 목록이 펼쳐져요.',
    sayToAi:
      '정렬 버튼을 누르면 드롭다운(Dropdown)이 아래로 열리고, 최신순을 고르면 닫히며 상품을 정렬해 주세요.',
    kind: 'motion',
  },
  {
    id: 'text-field',
    category: 'input',
    name: '글자 입력칸',
    english: 'Text field',
    meaning: '이름처럼 짧은 글을 직접 적는 칸이에요.',
    sayToAi:
      '주문 화면에 글자 입력칸(Text field)을 놓고, 이름은 한 줄로 20자까지 입력하게 해 주세요.',
    kind: 'still',
  },
  {
    id: 'search-field',
    category: 'input',
    name: '검색창',
    english: 'Search field',
    meaning: '찾을 말을 적어 원하는 내용을 찾는 칸이에요.',
    sayToAi:
      '쇼핑몰 위에 검색창(Search field)을 놓고, 검색어를 적고 Enter를 누르면 상품 목록이 바뀌게 해 주세요.',
    kind: 'still',
  },
  {
    id: 'toggle',
    category: 'input',
    name: '켜기·끄기 스위치',
    english: 'Toggle switch',
    meaning: '설정을 켜거나 끄는 두 상태 중 하나를 골라요.',
    sayToAi:
      '일정의 켜기·끄기 스위치(Toggle switch)를 누르면 알림 설정이 바뀌고, 켜짐 여부를 글로도 표시해 주세요.',
    kind: 'still',
  },
  {
    id: 'checkbox',
    category: 'input',
    name: '체크박스',
    english: 'Checkbox',
    meaning: '여러 항목을 각각 선택하거나 선택을 해제해요.',
    sayToAi:
      '할 일 옆에 체크박스(Checkbox)를 놓고, 누르면 완료 표시가 생기고 다시 누르면 해제되게 해 주세요.',
    kind: 'still',
  },
  {
    id: 'radio-button',
    category: 'input',
    name: '라디오 버튼',
    english: 'Radio button',
    meaning: '여러 선택지 중 하나만 고르게 하는 동그란 버튼이에요.',
    sayToAi:
      '음료 크기를 라디오 버튼(Radio button)으로 보여 주고, 하나를 고르면 이전 선택은 해제되게 해 주세요.',
    kind: 'still',
  },
  {
    id: 'text-area',
    category: 'input',
    name: '여러 줄 입력칸',
    english: 'Text area',
    meaning: '긴 설명을 줄바꿈하며 적을 수 있는 칸이에요.',
    sayToAi:
      '메모의 여러 줄 입력칸(Text area)에서 Enter를 누르면 줄이 바뀌고, 긴 글은 칸 안에서 스크롤되게 해 주세요.',
    kind: 'still',
  },
  {
    id: 'slider',
    category: 'input',
    name: '슬라이더',
    english: 'Slider',
    meaning: '손잡이를 밀어 크기나 밝기 같은 값을 조절해요.',
    sayToAi:
      '운동 안내 음량을 슬라이더(Slider)로 조절하고, 손잡이를 움직일 때 현재 값을 숫자로 표시해 주세요.',
    kind: 'motion',
  },
  {
    id: 'segmented-control',
    category: 'input',
    name: '나눔 선택 버튼',
    english: 'Segmented control',
    meaning: '붙어 있는 버튼 몇 개 중에서 하나를 골라요.',
    sayToAi:
      '일정 위에 나눔 선택 버튼(Segmented control)을 놓고, 주간을 누르면 이번 주 일정이 표시되게 해 주세요.',
    kind: 'still',
  },
  {
    id: 'number-stepper',
    category: 'input',
    name: '수량 조절 버튼',
    english: 'Number stepper',
    meaning: '빼기와 더하기 버튼으로 수량을 한 칸씩 바꿔요.',
    sayToAi:
      '장바구니 수량 조절 버튼(Number stepper)의 더하기를 누르면 한 개씩 늘리고, 빼기는 1개에서 멈추게 해 주세요.',
    kind: 'still',
  },
  {
    id: 'date-picker',
    category: 'input',
    name: '날짜 선택기',
    english: 'Date picker',
    meaning: '달력에서 원하는 날짜를 골라 입력해요.',
    sayToAi:
      '약속 날짜를 누르면 날짜 선택기(Date picker)가 열리고, 달력에서 날짜를 고르면 입력하고 닫히게 해 주세요.',
    kind: 'still',
  },
  {
    id: 'badge',
    category: 'feedback',
    name: '배지',
    english: 'Badge',
    meaning: '새 소식이나 개수를 작은 표시로 알려 줘요.',
    sayToAi: '읽지 않은 알림 수를 배지(Badge)로 표시하고, 모두 읽으면 사라지게 해 주세요.',
    kind: 'still',
  },
  {
    id: 'empty-state',
    category: 'feedback',
    name: '빈 화면 안내',
    english: 'Empty state',
    meaning: '아직 내용이 없을 때 이유와 다음 할 일을 알려 줘요.',
    sayToAi:
      '메모 목록이 비었을 때 빈 화면 안내(Empty state)로 첫 메모를 쓰는 버튼이 나타나게 해 주세요.',
    kind: 'still',
  },
  {
    id: 'toast',
    category: 'feedback',
    name: '토스트 알림',
    english: 'Toast',
    meaning: '잠깐 나타났다가 사라지는 짧은 안내예요.',
    sayToAi: '메모 저장 후 토스트 알림(Toast)으로 저장 완료를 표시하고, 3초 뒤 사라지게 해 주세요.',
    kind: 'motion',
  },
  {
    id: 'skeleton',
    category: 'feedback',
    name: '스켈레톤',
    english: 'Skeleton',
    meaning: '불러오는 동안 사진과 글이 들어갈 자리를 먼저 보여 줘요.',
    sayToAi:
      '상품을 불러오는 동안 스켈레톤(Skeleton)으로 사진과 글 자리를 보여 주고, 완료되면 상품으로 교체해 주세요.',
    kind: 'motion',
  },
  {
    id: 'tooltip',
    category: 'feedback',
    name: '툴팁',
    english: 'Tooltip',
    meaning: '버튼 옆에 짧은 설명이 나타나요.',
    sayToAi:
      '도움말에 마우스를 올리거나 키보드로 이동하면 툴팁(Tooltip)을 표시하고, 벗어나면 닫히게 해 주세요.',
    kind: 'motion',
  },
  {
    id: 'spinner',
    category: 'feedback',
    name: '로딩 표시',
    english: 'Spinner',
    meaning: '빙글 도는 모양으로 기다리는 중임을 알려 줘요.',
    sayToAi:
      '상품을 불러오는 동안 로딩 표시(Spinner)가 돌게 하고, 완료되거나 실패하면 결과를 안내해 주세요.',
    kind: 'motion',
  },
  {
    id: 'inline-error',
    category: 'feedback',
    name: '입력 오류 안내',
    english: 'Inline error',
    meaning: '잘못 적은 칸 가까이에서 고칠 내용을 알려 줘요.',
    sayToAi:
      '주문할 때 이름이 비어 있으면 입력 오류 안내(Inline error)를 칸 아래 표시하고, 이름을 적으면 사라지게 해 주세요.',
    kind: 'still',
  },
  {
    id: 'progress-bar',
    category: 'feedback',
    name: '진행 막대',
    english: 'Progress bar',
    meaning: '전체 작업 중 얼마나 끝났는지 막대로 보여 줘요.',
    sayToAi:
      '사진 업로드 중 진행 막대(Progress bar)를 완료 비율만큼 채우고, 끝나면 완료 문구가 나타나게 해 주세요.',
    kind: 'motion',
  },
  {
    id: 'snackbar',
    category: 'feedback',
    name: '스낵바',
    english: 'Snackbar',
    meaning: '짧은 알림과 되돌리기 같은 동작을 함께 보여 줘요.',
    sayToAi:
      '메모를 지우면 스낵바(Snackbar)에 되돌리기를 표시하고, 5초 안에 누르면 메모를 복원해 주세요.',
    kind: 'motion',
  },
  {
    id: 'pull-to-refresh',
    category: 'motion',
    name: '당겨서 새로고침',
    english: 'Pull to refresh',
    meaning: '목록을 아래로 당기면 새 내용을 불러와요.',
    sayToAi:
      '메모 목록 맨 위에서 당겨서 새로고침(Pull to refresh)을 하면 새 메모를 불러오고, 완료되면 표시가 사라지게 해 주세요.',
    kind: 'motion',
  },
  {
    id: 'swipe-action',
    category: 'motion',
    name: '밀어서 동작',
    english: 'Swipe action',
    meaning: '항목을 옆으로 밀면 숨겨진 동작 버튼이 나와요.',
    sayToAi:
      '메모를 왼쪽으로 밀면 밀어서 동작(Swipe action)으로 삭제 버튼을 보여 주고, 버튼을 눌렀을 때만 삭제해 주세요.',
    kind: 'motion',
  },
  {
    id: 'long-press',
    category: 'motion',
    name: '길게 누르기',
    english: 'Long press',
    meaning: '항목을 꾹 누르고 있으면 숨은 메뉴가 나와요.',
    sayToAi:
      '메모를 0.5초 누르면 길게 누르기(Long press)로 수정 메뉴가 나타나고, 바깥을 누르면 닫히게 해 주세요.',
    kind: 'motion',
  },
  {
    id: 'drag-to-reorder',
    category: 'motion',
    name: '끌어서 순서 바꾸기',
    english: 'Drag to reorder',
    meaning: '항목을 잡고 끌어 원하는 자리로 옮겨요.',
    sayToAi:
      '운동 목록에 끌어서 순서 바꾸기(Drag to reorder)를 넣고, 항목을 놓으면 새 순서가 저장되게 해 주세요.',
    kind: 'motion',
  },
  {
    id: 'hover-effect',
    category: 'motion',
    name: '호버 효과',
    english: 'Hover effect',
    meaning: '마우스를 올리면 색·크기·그림자가 바뀌어요.',
    sayToAi:
      '상품 카드에 마우스를 올리면 호버 효과(Hover effect)로 살짝 떠오르게 하고, 휴대폰에서는 생략해 주세요.',
    kind: 'motion',
  },
  {
    id: 'scroll-reveal',
    category: 'motion',
    name: '스크롤 리빌',
    english: 'Scroll reveal',
    meaning: '화면을 내리다 보면 내용이 자연스럽게 나타나요.',
    sayToAi:
      '블로그를 내릴 때 글 카드가 화면에 들어오면 스크롤 리빌(Scroll reveal)로 한 번만 서서히 나타나게 해 주세요.',
    kind: 'motion',
  },
  {
    id: 'stagger-animation',
    category: 'motion',
    name: '스태거 애니메이션',
    english: 'Stagger animation',
    meaning: '여러 항목이 시간차를 두고 차례로 나타나요.',
    sayToAi:
      '카페 메뉴를 처음 열면 스태거 애니메이션(Stagger animation)으로 카드가 0.1초 간격으로 차례로 나타나게 해 주세요.',
    kind: 'motion',
  },
  {
    id: 'transition',
    category: 'motion',
    name: '부드러운 전환',
    english: 'Transition',
    meaning: '색이나 크기 같은 상태가 뚝 바뀌지 않고 부드럽게 바뀌어요.',
    sayToAi:
      '일정 보기 버튼을 고르면 부드러운 전환(Transition)으로 배경색이 0.2초 동안 바뀌게 해 주세요.',
    kind: 'motion',
  },
  {
    id: 'parallax',
    category: 'motion',
    name: '패럴렉스',
    english: 'Parallax scrolling',
    meaning: '앞뒤가 다른 속도로 움직여 깊이감을 줘요, 어지럽지 않게 약하게 써요.',
    sayToAi:
      '소개를 내릴 때 패럴렉스(Parallax scrolling)로 배경만 조금 느리게 움직이고, 모션 감소 설정에서는 멈추게 해 주세요.',
    kind: 'motion',
  },
  {
    id: 'scroll-snap',
    category: 'motion',
    name: '스크롤 스냅',
    english: 'Scroll snap',
    meaning: '스크롤을 놓으면 가까운 칸에 딱 맞춰 멈춰요.',
    sayToAi:
      '상품 사진을 옆으로 넘기다 놓으면 스크롤 스냅(Scroll snap)으로 가장 가까운 사진이 가운데에 맞춰 멈추게 해 주세요.',
    kind: 'motion',
  },
  {
    id: 'micro-interaction',
    category: 'motion',
    name: '마이크로 인터랙션',
    english: 'Micro-interaction',
    meaning: '좋아요나 저장 같은 작은 행동에 바로 돌아오는 작은 움직임이에요.',
    sayToAi:
      '블로그 좋아요를 누르면 마이크로 인터랙션(Micro-interaction)으로 하트가 한 번 커졌다 돌아오게 해 주세요.',
    kind: 'motion',
  },
  {
    id: 'padding',
    category: 'style',
    name: '안쪽 여백',
    english: 'Padding',
    meaning: '상자 테두리와 안에 담긴 글 사이를 띄워요.',
    sayToAi:
      '장바구니 버튼의 글자가 가장자리에 붙지 않도록 안쪽 여백(Padding)을 넉넉하게 해 주세요.',
    kind: 'still',
  },
  {
    id: 'margin',
    category: 'style',
    name: '바깥 여백',
    english: 'Margin',
    meaning: '상자 바깥에 공간을 두어 다른 상자와 떨어뜨려요.',
    sayToAi: '쇼핑몰 상품 카드끼리 붙어 보이지 않도록 바깥 여백(Margin)을 넓게 해 주세요.',
    kind: 'still',
  },
  {
    id: 'font-size',
    category: 'style',
    name: '글자 크기',
    english: 'Font size',
    meaning: '글자를 크게 또는 작게 표시해요.',
    sayToAi: '메모 앱의 본문을 쉽게 읽도록 글자 크기(Font size)를 크게 해 주세요.',
    kind: 'still',
  },
  {
    id: 'alignment',
    category: 'style',
    name: '정렬',
    english: 'Alignment',
    meaning: '글이나 부품을 왼쪽·가운데·오른쪽 등에 맞춰요.',
    sayToAi: '쇼핑몰 상품 이름의 시작점이 같아지도록 정렬(Alignment)을 왼쪽으로 통일해 주세요.',
    kind: 'still',
  },
  {
    id: 'border-radius',
    category: 'style',
    name: '모서리 둥글기',
    english: 'Border radius',
    meaning: '상자나 버튼의 모서리를 둥글게 다듬어요.',
    sayToAi: '카페 메뉴 카드가 부드럽게 보이도록 모서리 둥글기(Border radius)를 크게 해 주세요.',
    kind: 'still',
  },
  {
    id: 'accent-color',
    category: 'style',
    name: '강조색',
    english: 'Accent color',
    meaning: '중요한 버튼이나 선택한 항목을 눈에 띄게 해요.',
    sayToAi: '카페 주문 화면의 결제 버튼을 쉽게 찾도록 강조색(Accent color)을 적용해 주세요.',
    kind: 'still',
  },
  {
    id: 'font-weight',
    category: 'style',
    name: '글자 굵기',
    english: 'Font weight',
    meaning: '글자의 획을 가늘게 또는 굵게 표시해요.',
    sayToAi:
      '블로그 글 제목이 본문보다 눈에 띄도록 제목의 글자 굵기(Font weight)를 굵게 해 주세요.',
    kind: 'still',
  },
  {
    id: 'border',
    category: 'style',
    name: '테두리',
    english: 'Border',
    meaning: '상자나 버튼의 가장자리를 선으로 둘러 표시해요.',
    sayToAi: '메모 앱의 입력칸이 배경과 구별되도록 테두리(Border)를 선명하게 해 주세요.',
    kind: 'still',
  },
  {
    id: 'shadow',
    category: 'style',
    name: '그림자',
    english: 'Shadow',
    meaning: '상자 뒤에 그늘을 넣어 떠 있는 듯 보이게 해요.',
    sayToAi: '일정 앱의 약속 확인 창이 배경에서 떠 보이도록 그림자(Shadow)를 추가해 주세요.',
    kind: 'still',
  },
  {
    id: 'line-height',
    category: 'style',
    name: '줄 간격',
    english: 'Line height',
    meaning: '여러 줄로 된 글의 줄 사이 높이를 조절해요.',
    sayToAi: '블로그의 긴 글을 편하게 읽도록 줄 간격(Line height)을 넉넉하게 해 주세요.',
    kind: 'still',
  },
  {
    id: 'dark-mode',
    category: 'style',
    name: '다크 모드',
    english: 'Dark mode',
    meaning: '어두운 배경과 밝은 글자로 화면을 표시해요.',
    sayToAi:
      '기기에서 어두운 화면을 켜면 메모 앱도 다크 모드(Dark mode)로 바꾸고, 밝은 글자가 보이게 해 주세요.',
    kind: 'still',
  },
  {
    id: 'opacity',
    category: 'style',
    name: '투명도',
    english: 'Opacity',
    meaning: '글이나 그림 너머로 배경이 얼마나 비칠지 정해요.',
    sayToAi: '운동 경로 위의 색칠된 영역 너머로 지도가 비치도록 투명도(Opacity)를 조절해 주세요.',
    kind: 'still',
  },
  {
    id: 'glassmorphism',
    category: 'style',
    name: '글래스모피즘',
    english: 'Glassmorphism',
    meaning: '뒤가 흐릿하게 비치는 유리 느낌이에요, 글자가 잘 안 보이지 않도록 주의해요.',
    sayToAi:
      '카페 사진 위 메뉴에 글래스모피즘(Glassmorphism)을 적용하고, 밝은 사진 위에서도 글자는 선명하게 해 주세요.',
    kind: 'still',
  },
  {
    id: 'reduced-motion',
    category: 'style',
    name: '모션 감소 설정',
    english: 'Reduced motion',
    meaning: '움직임을 줄여 달라고 사용자가 기기에 켜 둔 설정이에요, 앱도 이 설정을 지키게 해요.',
    sayToAi:
      '메모 앱은 기기의 모션 감소 설정(Reduced motion)이 켜지면 이동 효과를 멈추고, 저장 결과는 글로 표시해 주세요.',
    kind: 'still',
  },
];

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
  {
    a: 'padding',
    b: 'margin',
    difference: '안쪽 여백은 상자 안을 띄우고, 바깥 여백은 상자 밖을 띄워요.',
  },
  {
    a: 'font-size',
    b: 'font-weight',
    difference: '글자 크기는 글자의 크기를 바꾸고, 글자 굵기는 획의 두께를 바꿔요.',
  },
  {
    a: 'border',
    b: 'divider',
    difference: '테두리는 부품 가장자리를 두르고, 구분선은 내용 사이를 나눠요.',
  },
  {
    a: 'checkbox',
    b: 'radio-button',
    difference: '체크박스는 여러 항목을 고르게 하고, 라디오 버튼은 하나만 고르게 해요.',
  },
  {
    a: 'toggle',
    b: 'checkbox',
    difference: '스위치는 설정을 켜고 끄게 하고, 체크박스는 항목을 선택하게 해요.',
  },
  {
    a: 'text-field',
    b: 'text-area',
    difference: '글자 입력칸은 한 줄을 입력하게 하고, 여러 줄 입력칸은 줄바꿈을 허용해요.',
  },
  {
    a: 'tab-bar',
    b: 'segmented-control',
    difference: '탭 바는 화면 사이를 이동하게 하고, 나눔 선택 버튼은 한 값이나 보기를 고르게 해요.',
  },
  {
    a: 'drawer',
    b: 'sidebar',
    difference: '서랍 메뉴는 옆에서 열고 닫게 하고, 사이드바는 화면 옆 공간을 차지해요.',
  },
  {
    a: 'toast',
    b: 'snackbar',
    difference: '토스트는 짧은 결과를 안내하고, 스낵바는 되돌리기 같은 동작도 제공해요.',
  },
  {
    a: 'spinner',
    b: 'progress-bar',
    difference: '로딩 표시는 기다리는 중임을 알리고, 진행 막대는 얼마나 끝났는지 표시해요.',
  },
  {
    a: 'modal',
    b: 'drawer',
    difference:
      '모달은 화면 가운데에서 집중하게 하고, 서랍 메뉴는 옆에서 열려 하던 일을 덜 끊어요.',
  },
  {
    a: 'tabs',
    b: 'accordion',
    difference: '탭은 옆으로 바꿔 보고, 아코디언은 아래로 펼쳐 봐요.',
  },
  {
    a: 'tabs',
    b: 'tab-bar',
    difference: '탭은 화면 안의 내용을 바꾸고, 탭 바는 화면 사이를 이동해요.',
  },
];
