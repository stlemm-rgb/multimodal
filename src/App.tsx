import { useEffect, useState } from 'react';
import Editor from './editor/Editor';
import Glossary from './glossary/Glossary';

export default function App() {
  const [hash, setHash] = useState(window.location.hash);
  const isGlossary = hash === '#/glossary';

  useEffect(() => {
    const updateHash = () => setHash(window.location.hash);
    window.addEventListener('hashchange', updateHash);
    return () => window.removeEventListener('hashchange', updateHash);
  }, []);

  return (
    <div className="app-shell">
      <a
        className="skip-link"
        href="#main"
        onClick={(event) => {
          event.preventDefault();
          document.getElementById('main')?.focus();
        }}
      >
        본문으로 건너뛰기
      </a>
      <header className="site-header">
        <a className="brand" href="#/">
          화면으로 설명하기
        </a>
        <nav aria-label="주 메뉴">
          <a href="#/" aria-current={!isGlossary ? 'page' : undefined}>
            편집기
          </a>
          <a href="#/glossary" aria-current={isGlossary ? 'page' : undefined}>
            UI 용어 사전
          </a>
        </nav>
      </header>
      <main id="main" tabIndex={-1}>
        <div hidden={isGlossary}>
          <Editor active={!isGlossary} />
        </div>
        {isGlossary && <Glossary />}
      </main>
      <footer>사진은 이 브라우저 안에서만 다뤄요. 외부로 보내지 않아요.</footer>
    </div>
  );
}
