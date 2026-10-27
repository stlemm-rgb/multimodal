import './more.css';
import type { ReactNode } from 'react';
import { Phone, bars } from './PhonePreviews';

function Demo({
  id,
  motion = false,
  children,
}: {
  id: string;
  motion?: boolean;
  children: ReactNode;
}) {
  return (
    <Phone id={id} motion={motion}>
      <span className="preview-feature more-demo">{children}</span>
    </Phone>
  );
}

function BeforeAfter({ id, children }: { id: string; children: ReactNode }) {
  return (
    <Phone id={id}>
      <span className="preview-feature more-comparison">
        <span className="more-before">
          <small>전</small>
          <span className="more-sample">{children}</span>
        </span>
        <span className="more-after">
          <small>후</small>
          <span className="more-sample">{children}</span>
        </span>
      </span>
    </Phone>
  );
}

export function Sidebar() {
  return (
    <Demo id="sidebar">
      <span className="more-side">
        <b>메뉴</b>
        <span>홈</span>
        <span>글</span>
      </span>
      <span className="more-main">본문{bars}</span>
    </Demo>
  );
}
export function StickyHeader() {
  return (
    <Demo id="sticky-header" motion>
      <span className="more-scroll">
        {bars}
        {bars}
        {bars}
      </span>
      <b className="more-fixed">⌕ 검색</b>
    </Demo>
  );
}
export function HeroSection() {
  return (
    <Demo id="hero-section">
      <span className="more-hero-art">☕</span>
      <b>오늘 커피</b>
      <small>향긋하게</small>
      <span className="more-action">주문</span>
    </Demo>
  );
}
export function Pagination() {
  return (
    <Demo id="pagination">
      <span>{bars}</span>
      <span className="more-pages">
        <span>‹</span>
        <span>1</span>
        <b>2</b>
        <span>3</span>
        <span>›</span>
      </span>
    </Demo>
  );
}
export function Breadcrumb() {
  return (
    <Demo id="breadcrumb">
      <span className="more-path">
        <span>홈</span> › <span>옷</span> › <b>상의</b>
      </span>
      {bars}
    </Demo>
  );
}
export function TextField() {
  return (
    <Demo id="text-field">
      <b>이름</b>
      <span className="more-field">
        민지
        <span className="more-caret" />
      </span>
    </Demo>
  );
}
export function SearchField() {
  return (
    <Demo id="search-field">
      <span className="more-field">⌕ 커피</span>
      <span className="more-result">☕ 라테</span>
      <span className="more-result">☕ 모카</span>
    </Demo>
  );
}
export function Toggle() {
  return (
    <Demo id="toggle">
      <span className="more-row">
        꺼짐
        <span className="more-switch" />
      </span>
      <span className="more-row">
        켜짐
        <span className="more-switch more-on" />
      </span>
    </Demo>
  );
}
export function Checkbox() {
  return (
    <Demo id="checkbox">
      <span className="more-row">
        <span className="more-check more-selected">✓</span>산책
      </span>
      <span className="more-row">
        <span className="more-check more-selected">✓</span>독서
      </span>
      <span className="more-row">
        <span className="more-check" />
        청소
      </span>
    </Demo>
  );
}
export function RadioButton() {
  return (
    <Demo id="radio-button">
      <span className="more-row">
        <span className="more-radio" />
        작게
      </span>
      <span className="more-row">
        <span className="more-radio more-selected">●</span>보통
      </span>
      <span className="more-row">
        <span className="more-radio" />
        크게
      </span>
    </Demo>
  );
}
export function TextArea() {
  return (
    <Demo id="text-area">
      <b>메모</b>
      <span className="more-field">
        오늘은
        <br />
        산책을
        <br />
        했어요
        <span className="more-caret" />
      </span>
    </Demo>
  );
}
export function Slider() {
  return (
    <Demo id="slider" motion>
      <b>음량</b>
      <span className="more-track">
        <span className="more-thumb" />
      </span>
      <span className="more-range">
        <span>작게</span>
        <span>크게</span>
      </span>
    </Demo>
  );
}
export function SegmentedControl() {
  return (
    <Demo id="segmented-control">
      <span className="more-segments">
        <span>일간</span>
        <b>주간</b>
        <span>월간</span>
      </span>
      {bars}
    </Demo>
  );
}
export function NumberStepper() {
  return (
    <Demo id="number-stepper">
      <b>수량</b>
      <span className="more-stepper">
        <span>−</span>
        <b>3</b>
        <span>+</span>
      </span>
    </Demo>
  );
}
export function DatePicker() {
  return (
    <Demo id="date-picker">
      <span className="more-field">10월 7일</span>
      <span className="more-calendar">
        {Array.from({ length: 14 }, (_, i) => (
          <span key={i} className={i === 6 ? 'more-selected' : ''}>
            {i + 1}
          </span>
        ))}
      </span>
    </Demo>
  );
}
export function InlineError() {
  return (
    <Demo id="inline-error">
      <b>이름</b>
      <span className="more-field" />
      <small className="more-error">! 필수예요</small>
    </Demo>
  );
}
export function ProgressBar() {
  return (
    <Demo id="progress-bar" motion>
      <b>업로드</b>
      <span className="more-progress">
        <span />
      </span>
      <span className="more-range">
        <span>0%</span>
        <span>100%</span>
      </span>
    </Demo>
  );
}
export function Snackbar() {
  return (
    <Demo id="snackbar" motion>
      <span>삭제됨</span>
      <b>되돌리기</b>
    </Demo>
  );
}
export function LongPress() {
  return (
    <Demo id="long-press" motion>
      <span className="more-press-item">
        내 메모
        <span className="more-finger" />
      </span>
      <span className="more-context">
        <span>수정</span>
        <span>삭제</span>
      </span>
    </Demo>
  );
}
export function DragToReorder() {
  return (
    <Demo id="drag-to-reorder" motion>
      <span className="more-drag-item more-drag-first">
        ☰ 산책
        <span className="more-finger" />
      </span>
      <span className="more-drag-item more-drag-second">☰ 달리기</span>
      <span className="more-drag-item more-drag-third">☰ 스트레칭</span>
    </Demo>
  );
}

export function Padding() {
  return (
    <BeforeAfter id="padding">
      <span className="more-box">담기</span>
    </BeforeAfter>
  );
}
export function Margin() {
  return (
    <BeforeAfter id="margin">
      <span className="more-box">커피</span>
      <span className="more-box">차</span>
    </BeforeAfter>
  );
}
export function FontSize() {
  return (
    <BeforeAfter id="font-size">
      <span className="more-copy">메모</span>
    </BeforeAfter>
  );
}
export function Alignment() {
  return (
    <BeforeAfter id="alignment">
      <span className="more-copy">커피</span>
      <span className="more-copy">차</span>
      <span className="more-copy">우유</span>
    </BeforeAfter>
  );
}
export function BorderRadius() {
  return (
    <BeforeAfter id="border-radius">
      <span className="more-box">메뉴</span>
    </BeforeAfter>
  );
}
export function AccentColor() {
  return (
    <BeforeAfter id="accent-color">
      <span className="more-box">취소</span>
      <span className="more-box more-primary">결제</span>
    </BeforeAfter>
  );
}
export function FontWeight() {
  return (
    <BeforeAfter id="font-weight">
      <span className="more-title">제목</span>
      <span>본문</span>
    </BeforeAfter>
  );
}
export function Border() {
  return (
    <BeforeAfter id="border">
      <span className="more-box">이름</span>
    </BeforeAfter>
  );
}
export function Shadow() {
  return (
    <BeforeAfter id="shadow">
      <span className="more-box">약속</span>
    </BeforeAfter>
  );
}
export function LineHeight() {
  return (
    <BeforeAfter id="line-height">
      <span className="more-copy">
        오늘도
        <br />
        좋은 날<br />
        산책해요
      </span>
    </BeforeAfter>
  );
}
export function DarkMode() {
  return (
    <BeforeAfter id="dark-mode">
      <span className="more-box">메모{bars}</span>
    </BeforeAfter>
  );
}
export function Opacity() {
  return (
    <BeforeAfter id="opacity">
      <span className="more-map">
        길<br />
        공원
      </span>
      <span className="more-tint" />
    </BeforeAfter>
  );
}

export function BentoGrid() {
  return (
    <Demo id="bento-grid">
      <span className="more-bento">
        <b>추천</b>
        <span>커피</span>
        <span>차</span>
      </span>
    </Demo>
  );
}
export function ResponsiveLayout() {
  return (
    <Demo id="responsive-layout" motion>
      <span className="more-responsive">
        <span>1</span>
        <span>2</span>
        <span>3</span>
      </span>
    </Demo>
  );
}
export function CtaButton() {
  return (
    <Demo id="cta-button">
      <b>첫 시작</b>
      {bars}
      <span className="more-cta">시작하기</span>
      <small>둘러보기</small>
    </Demo>
  );
}
export function Tabs() {
  return (
    <Demo id="tabs">
      <span className="more-tabs">
        <b>설명</b>
        <span>후기</span>
      </span>
      <span className="more-tab-panel">상품 설명{bars}</span>
    </Demo>
  );
}
export function Overlay() {
  return (
    <Demo id="overlay">
      <span className="more-overlay-base">
        주문 목록{bars}
        {bars}
      </span>
      <span className="more-backdrop" />
      <span className="more-dialog">
        주문 확인<span>취소 확인</span>
      </span>
    </Demo>
  );
}
export function HoverEffect() {
  return (
    <Demo id="hover-effect" motion>
      <span className="more-hover-card">상품{bars}</span>
      <span className="more-pointer">↖</span>
    </Demo>
  );
}
export function ScrollReveal() {
  return (
    <Demo id="scroll-reveal" motion>
      <small>↓ 내리기</small>
      <span className="more-reveal-list">
        <span>첫 글{bars}</span>
        <span className="more-reveal-card">다음 글{bars}</span>
      </span>
    </Demo>
  );
}
export function StaggerAnimation() {
  return (
    <Demo id="stagger-animation" motion>
      <span className="more-stagger">
        <span>커피</span>
        <span>차</span>
        <span>우유</span>
      </span>
    </Demo>
  );
}
export function Transition() {
  return (
    <Demo id="transition" motion>
      <b>보기 선택</b>
      <span className="more-transition">주간</span>
    </Demo>
  );
}
export function Parallax() {
  return (
    <Demo id="parallax" motion>
      <span className="more-far">
        ☁ ☁
        <br />산 산
      </span>
      <span className="more-near">
        카페{bars}
        <small>↓ 내리기</small>
      </span>
    </Demo>
  );
}
export function ScrollSnap() {
  return (
    <Demo id="scroll-snap" motion>
      <small>넘겨 놓기</small>
      <span className="more-snap-window">
        <span className="more-snap-track">
          <span>사진 1</span>
          <span>사진 2</span>
          <span>사진 3</span>
        </span>
      </span>
      <span className="more-snap-guide" />
    </Demo>
  );
}
export function MicroInteraction() {
  return (
    <Demo id="micro-interaction" motion>
      <span className="more-heart">♥</span>
      <span className="more-tap">↑ 누르기</span>
    </Demo>
  );
}
export function Glassmorphism() {
  return (
    <BeforeAfter id="glassmorphism">
      <span className="more-glass-scene">
        ☕<br />
        카페
      </span>
      <span className="more-glass-pane">메뉴</span>
    </BeforeAfter>
  );
}
export function ReducedMotion() {
  return (
    <Phone id="reduced-motion">
      <span className="preview-feature more-comparison">
        <span className="more-before">
          <small>움직임 켬</small>
          <span className="more-sample more-motion-on">
            <span>↗ ♥ ↘</span>
            <span>커졌다</span>
            <span>돌아옴</span>
          </span>
        </span>
        <span className="more-after">
          <small>줄임</small>
          <span className="more-sample more-motion-off">
            <span>♥</span>
            <span>저장됨</span>
          </span>
        </span>
      </span>
    </Phone>
  );
}
