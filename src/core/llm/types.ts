export type Provider = 'anthropic' | 'openai';
export interface LlmSettings {
  enabled: boolean;
  provider: Provider;
  apiKey: string;
  model: string;
}
export interface RefineRequest {
  images: { mime: string; base64: string }[];
  pins: { number: number; text: string }[];
  note?: string;
}
export type RefineResult =
  | { ok: true; text: string }
  | { ok: false; reason: 'refusal' | 'auth' | 'network' | 'other'; message: string };
