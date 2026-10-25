const tools = [
  ['＋', '캡처 추가'],
  ['①', '번호'],
  ['□', '박스'],
  ['↗', '화살표'],
  ['≡', '메모'],
  ['↝', '움직임'],
  ['✓', '단계'],
  ['✧', 'AI 다듬기'],
];
export default function Toolbar({
  onSelect,
  disabled,
}: {
  onSelect: (tool: string) => void;
  disabled?: boolean;
}) {
  return (
    <nav className="toolbar" aria-label="편집 도구">
      {tools.map(([icon, label]) => (
        <button key={label} disabled={disabled} onClick={() => onSelect(label)}>
          <span aria-hidden="true">{icon}</span>
          {label}
        </button>
      ))}
    </nav>
  );
}
