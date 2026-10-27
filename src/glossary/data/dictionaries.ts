import { categories, confusions, terms } from './terms';
import { image } from './image';
import { video } from './video';
import { coding } from './coding';
import { pangyo } from './pangyo';
import type { Dictionary } from './types';

export const ui: Dictionary = {
  id: 'ui',
  label: 'UI',
  exampleTitle: 'AI에게는 이렇게 말하세요',
  forAi: true,
  categories,
  terms,
  confusions,
};
/** 사전 바꾸기 버튼 순서. */
export const dictionaries: readonly Dictionary[] = [ui, image, video, coding, pangyo];
