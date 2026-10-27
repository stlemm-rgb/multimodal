import GlossaryBrowser from './GlossaryBrowser';
export default function Glossary() {
  return (
    <section aria-labelledby="glossary-title">
      <p className="eyebrow">이름을 몰라도 찾아요</p>
      <h1 id="glossary-title">용어 사전</h1>
      <p className="intro">
        화면(UI)·이미지·영상·개발 용어를 쉬운 말로 풀어 줘요. 원하는 것을 AI에게 쉽게 설명해 보세요.
      </p>
      <GlossaryBrowser />
    </section>
  );
}
