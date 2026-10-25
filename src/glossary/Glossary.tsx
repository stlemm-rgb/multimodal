import { terms } from './data/terms';

export default function Glossary() {
  return (
    <section aria-labelledby="glossary-title">
      <p className="eyebrow">모양을 보고 이름을 찾아요</p>
      <h1 id="glossary-title">UI 용어 사전</h1>
      <p className="intro">
        UI는 화면의 버튼과 메뉴 같은 요소를 말해요. 원하는 모양을 AI에게 쉽게 설명해 보세요.
      </p>
      <div className="term-grid">
        {terms.map((term) => (
          <article className="term-card" key={term.id}>
            <div
              className={`term-example ${term.id}`}
              role="img"
              aria-label={`${term.name} 모양 예시`}
            >
              {term.id === 'skeleton' ? (
                <div className="skeleton-card" aria-hidden="true">
                  <div className="skeleton-picture" />
                  <div className="skeleton-line" />
                  <div className="skeleton-line short" />
                </div>
              ) : (
                <div className="example-phone" aria-hidden="true">
                  <span className="example-background">내 사진</span>
                  <div className="example-sheet">
                    <span className="sheet-handle" />
                    <strong>공유 방법</strong>
                    <span className="example-option">링크 복사</span>
                    <span className="example-option">사진 저장</span>
                  </div>
                </div>
              )}
            </div>
            <h2>{term.name}</h2>
            <p>{term.meaning}</p>
            <div className="prompt-example">
              <h3>AI에게는 이렇게 말하세요</h3>
              <p>{term.prompt}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
