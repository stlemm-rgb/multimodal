/** 여러 사전이 함께 쓰는 형식. UI 사전만 미리보기 그림(kind)이 있다. */
export interface DictionaryTerm {
  id: string;
  name: string;
  english: string;
  category: string;
  meaning: string;
  /** 자세히 창의 예문. 제목은 사전의 exampleTitle. */
  sayToAi: string;
}
/** 자주 헷갈리는 두 용어. 차이는 "A는 …하고, B는 …해요." 한 줄. */
export interface Confusion {
  a: string;
  b: string;
  difference: string;
}
export interface Dictionary {
  id: string;
  /** 사전 바꾸기 버튼 글자. 짧게. */
  label: string;
  exampleTitle: string;
  /** 사전 맨 위 짧은 안내. */
  tip?: { title: string; example: string };
  /** 예문을 지시문에 넣을 수 있는가. */
  forAi: boolean;
  categories: readonly { id: string; label: string }[];
  terms: readonly DictionaryTerm[];
  confusions: readonly Confusion[];
}
