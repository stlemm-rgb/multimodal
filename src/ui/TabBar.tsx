export default function TabBar({ hash }: { hash: string }) {
  return (
    <nav className="tab-bar" aria-label="주 메뉴">
      {[
        ['#/', '⌂', '홈'],
        ['#/glossary', '▤', '용어 사전'],
        ['#/settings', '⚙', '설정'],
      ].map(([href, icon, label]) => (
        <a key={href} href={href} aria-current={hash === href ? 'page' : undefined}>
          <span aria-hidden="true">{icon}</span>
          {label}
        </a>
      ))}
    </nav>
  );
}
