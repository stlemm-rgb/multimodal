import { categories, confusions, terms } from './terms';
import { image } from './image';
import { video } from './video';
import { coding } from './coding';
import type { Dictionary } from './types';

export const ui: Dictionary = {
  id: 'ui',
  label: 'UI',
  exampleTitle: 'AI에게는 이렇게 말하세요',
  forAi: true,
  tip: {
    title: '용어 + 원하는 동작 + 적용 조건으로 말하면 AI가 정확히 알아들어요.',
    example:
      '설정 버튼을 누르면 오른쪽에서 서랍 메뉴(Drawer)가 밀려 나오고, 바깥을 누르거나 ESC를 누르면 닫히게 해 주세요.',
  },
  categories,
  terms,
  confusions,
};
/** 사전 바꾸기 버튼 순서. */
export const dictionaries: readonly Dictionary[] = [ui, image, video, coding];
