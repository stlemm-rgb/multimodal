import Anthropic from '@anthropic-ai/sdk';
import { buildRefinePrompt } from '../../core/llm/prompt';
import type { LlmSettings, RefineRequest, RefineResult } from '../../core/llm/types';

export async function sendAnthropic(
  { apiKey, model }: LlmSettings,
  request: RefineRequest,
): Promise<RefineResult> {
  const { system, text } = buildRefinePrompt(request);
  try {
    const images = request.images.map((image) => {
      const mime = image.mime;
      if (
        mime !== 'image/png' &&
        mime !== 'image/jpeg' &&
        mime !== 'image/gif' &&
        mime !== 'image/webp'
      )
        throw new Error('지원하지 않는 이미지 형식이에요.');
      return { ...image, mime } as const;
    });
    const client = new Anthropic({ apiKey, dangerouslyAllowBrowser: true });
    const res = await client.beta.messages.create({
      model,
      max_tokens: 16000,
      betas: ['server-side-fallback-2026-07-01'],
      fallbacks: 'default',
      output_config: { effort: 'medium' },
      system,
      messages: [
        {
          role: 'user',
          content: [
            ...images.map((i) => ({
              type: 'image' as const,
              source: { type: 'base64' as const, media_type: i.mime, data: i.base64 },
            })),
            { type: 'text' as const, text },
          ],
        },
      ],
    });
    if (res.stop_reason === 'refusal')
      return {
        ok: false,
        reason: 'refusal',
        message: 'AI가 이 요청에 답하지 못했어요. 메모를 바꿔 다시 시도해 주세요.',
      };
    const result = res.content
      .filter((block) => block.type === 'text')
      .map((block) => block.text)
      .join('\n');
    return result.trim()
      ? { ok: true, text: result }
      : { ok: false, reason: 'other', message: '받은 글이 없어요. 다시 시도해 주세요.' };
  } catch (error) {
    if (error instanceof Anthropic.AuthenticationError)
      return { ok: false, reason: 'auth', message: 'API 키를 확인해 주세요.' };
    if (error instanceof Anthropic.RateLimitError || error instanceof Anthropic.APIConnectionError)
      return {
        ok: false,
        reason: 'network',
        message: '연결이 어렵거나 요청이 많아요. 잠시 뒤 다시 시도해 주세요.',
      };
    if (error instanceof Anthropic.APIError)
      return {
        ok: false,
        reason: 'other',
        message: '요청을 처리하지 못했어요. 모델 이름과 계정 상태를 확인해 주세요.',
      };
    return { ok: false, reason: 'other', message: 'AI 연결 중 문제가 생겼어요.' };
  }
}
