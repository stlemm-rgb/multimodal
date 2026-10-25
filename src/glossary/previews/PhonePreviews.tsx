import type { ReactNode } from 'react';
function Phone({
  id,
  motion = false,
  children,
}: {
  id: string;
  motion?: boolean;
  children: ReactNode;
}) {
  return (
    <span
      className={`preview-phone preview-${id} ${motion ? 'preview-motion' : ''}`}
      aria-hidden="true"
    >
      <span className="preview-top" />
      <span className="preview-content">
        <i />
        <i />
        <i />
      </span>
      {children}
      {motion && <span className="motion-hint">▶ 움직임</span>}
    </span>
  );
}
const bars = (
  <>
    <i />
    <i />
    <i />
  </>
);
export function SplitLayout() {
  return (
    <Phone id="split-layout">
      <span className="preview-feature">{bars}</span>
    </Phone>
  );
}
export function Card() {
  return (
    <Phone id="card">
      <span className="preview-feature">
        <b />
        {bars}
      </span>
    </Phone>
  );
}
export function Chip() {
  return (
    <Phone id="chip">
      <span className="preview-feature">
        <b>전체</b>
        <b>사진</b>
      </span>
    </Phone>
  );
}
export function Badge() {
  return (
    <Phone id="badge">
      <span className="preview-feature">3</span>
    </Phone>
  );
}
export function TabBar() {
  return (
    <Phone id="tab-bar">
      <span className="preview-feature">
        <b>⌂</b>
        <b>⌕</b>
        <b>○</b>
      </span>
    </Phone>
  );
}
export function AppBar() {
  return (
    <Phone id="app-bar">
      <span className="preview-feature">‹ 내 화면 ⋯</span>
    </Phone>
  );
}
export function List() {
  return (
    <Phone id="list">
      <span className="preview-feature">{bars}</span>
    </Phone>
  );
}
export function Grid() {
  return (
    <Phone id="grid">
      <span className="preview-feature">
        <i />
        <i />
        <i />
        <i />
      </span>
    </Phone>
  );
}
export function Avatar() {
  return (
    <Phone id="avatar">
      <span className="preview-feature">●</span>
    </Phone>
  );
}
export function Divider() {
  return (
    <Phone id="divider">
      <span className="preview-feature" />
    </Phone>
  );
}
export function Fab() {
  return (
    <Phone id="fab">
      <span className="preview-feature">＋</span>
    </Phone>
  );
}
export function EmptyState() {
  return (
    <Phone id="empty-state">
      <span className="preview-feature">
        ▧<small>아직 비어 있어요</small>
        <b>＋ 추가</b>
      </span>
    </Phone>
  );
}
export function Drawer() {
  return (
    <Phone id="drawer" motion>
      <span className="preview-feature">☰{bars}</span>
    </Phone>
  );
}
export function BottomSheetPreview() {
  return (
    <Phone id="bottom-sheet" motion>
      <span className="preview-feature">
        <b>공유 방법</b>
        {bars}
      </span>
    </Phone>
  );
}
export function Modal() {
  return (
    <Phone id="modal" motion>
      <span className="preview-feature">
        삭제할까요?<b>취소 확인</b>
      </span>
    </Phone>
  );
}
export function ToastPreview() {
  return (
    <Phone id="toast" motion>
      <span className="preview-feature">✓ 저장했어요</span>
    </Phone>
  );
}
export function Skeleton() {
  return (
    <Phone id="skeleton" motion>
      <span className="preview-loaded">
        ▧<small>사진과 이야기</small>
      </span>
      <span className="preview-feature">
        <b />
        {bars}
      </span>
    </Phone>
  );
}
export function Carousel() {
  return (
    <Phone id="carousel" motion>
      <span className="preview-feature">
        <b>1</b>
        <b>2</b>
        <b>3</b>
      </span>
    </Phone>
  );
}
export function Accordion() {
  return (
    <Phone id="accordion" motion>
      <span className="preview-feature">
        <b>자주 묻는 질문 ⌄</b>
        <span>{bars}</span>
        <b>다음 질문 ⌄</b>
      </span>
    </Phone>
  );
}
export function Dropdown() {
  return (
    <Phone id="dropdown" motion>
      <span className="preview-feature">
        <b>정렬 ⌄</b>
        <span>
          최신순
          <br />
          인기순
        </span>
      </span>
    </Phone>
  );
}
export function Tooltip() {
  return (
    <Phone id="tooltip" motion>
      <span className="preview-anchor">ⓘ</span>
      <span className="preview-feature">도움말이에요</span>
    </Phone>
  );
}
export function PullToRefresh() {
  return (
    <Phone id="pull-to-refresh" motion>
      <span className="preview-refresh">↻</span>
      <span className="preview-feature">{bars}</span>
    </Phone>
  );
}
export function SwipeAction() {
  return (
    <Phone id="swipe-action" motion>
      <span className="preview-delete">삭제</span>
      <span className="preview-feature">☰ 내 항목</span>
    </Phone>
  );
}
export function Spinner() {
  return (
    <Phone id="spinner" motion>
      <span className="preview-feature" />
    </Phone>
  );
}
