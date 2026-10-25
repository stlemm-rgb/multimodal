import type { LlmSettings, RefineRequest, RefineResult } from '../../core/llm/types';

export async function sendRefine(
  settings: LlmSettings,
  request: RefineRequest,
): Promise<RefineResult> {
  if (!settings.enabled)
    return { ok: false, reason: 'other', message: '설정에서 AI 연결을 켜 주세요.' };
  if (!settings.apiKey.trim())
    return { ok: false, reason: 'auth', message: '설정에서 API 키를 넣어 주세요.' };
  if (!settings.model.trim())
    return { ok: false, reason: 'other', message: '설정에서 사용할 모델 이름을 넣어 주세요.' };
  try {
    if (settings.provider === 'anthropic') {
      const { sendAnthropic } = await import('./anthropic');
      return await sendAnthropic(settings, request);
    }
    const { sendOpenAI } = await import('./openai');
    return await sendOpenAI(settings, request);
  } catch {
    return {
      ok: false,
      reason: 'other',
      message: 'AI 연결을 준비하지 못했어요. 다시 시도해 주세요.',
    };
  }
}
