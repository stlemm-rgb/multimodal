import type { LlmSettings } from '../core/llm/types';

const key = 'multimodal.llm';
export const defaultSettings: LlmSettings = {
  enabled: false,
  provider: 'anthropic',
  apiKey: '',
  model: 'claude-opus-5-5',
};
export function readSettings(): LlmSettings {
  const raw = localStorage.getItem(key);
  if (!raw) return { ...defaultSettings };
  try {
    const value: unknown = JSON.parse(raw);
    if (!value || typeof value !== 'object') return { ...defaultSettings };
    const settings = value as Partial<LlmSettings>;
    const provider = settings.provider === 'openai' ? 'openai' : 'anthropic';
    return {
      enabled: settings.enabled === true,
      provider,
      apiKey: typeof settings.apiKey === 'string' ? settings.apiKey : '',
      model:
        typeof settings.model === 'string'
          ? settings.model
          : provider === 'anthropic'
            ? defaultSettings.model
            : '',
    };
  } catch {
    return { ...defaultSettings };
  }
}
export function writeSettings(settings: LlmSettings) {
  localStorage.setItem(key, JSON.stringify(settings));
}
export function clearSettings() {
  localStorage.removeItem(key);
}
