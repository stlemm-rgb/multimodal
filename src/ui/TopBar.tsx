import type { ReactNode } from 'react';

export default function TopBar({
  title,
  back,
  action,
}: {
  title: string;
  back?: string;
  action?: ReactNode;
}) {
  return (
    <header className="top-bar">
      {back && (
        <a className="icon-button" href={back} aria-label={back === '#/' ? '홈으로' : '프로젝트로'}>
          ←
        </a>
      )}
      <h1>{title}</h1>
      {action}
    </header>
  );
}
