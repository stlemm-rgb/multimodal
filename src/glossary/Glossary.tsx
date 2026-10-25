import GlossaryBrowser from './GlossaryBrowser';
export default function Glossary() {
  return (
    <section aria-labelledby="glossary-title">
      <p className="eyebrow">모양을 보고 이름을 찾아요</p>
      <h1 id="glossary-title">UI 용어 사전</h1>
      <p className="intro">
        UI는 화면의 버튼과 메뉴 같은 요소를 말해요. 원하는 모양을 AI에게 쉽게 설명해 보세요.
      </p>
      <GlossaryBrowser />
    </section>
  );
}
