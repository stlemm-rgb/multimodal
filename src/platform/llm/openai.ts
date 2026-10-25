import OpenAI from 'openai';
import { buildRefinePrompt } from '../../core/llm/prompt';
import type { LlmSettings, RefineRequest, RefineResult } from '../../core/llm/types';

export async function sendOpenAI(
  { apiKey, model }: LlmSettings,
  request: RefineRequest,
): Promise<RefineResult> {
  try {
    const client = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });
    const { system, text } = buildRefinePrompt(request);
    const res = await client.chat.completions.create({
      model,
      messages: [
        { role: 'system', content: system },
        {
          role: 'user',
          content: [
            ...request.images.map((image) => ({
              type: 'image_url' as const,
              image_url: { url: `data:${image.mime};base64,${image.base64}` },
            })),
            { type: 'text', text },
          ],
        },
      ],
    });
    const choice = res.choices[0];
    if (choice?.message.refusal || choice?.finish_reason === 'content_filter')
      return {
        ok: false,
        reason: 'refusal',
        message: 'AI가 이 요청에 답하지 못했어요. 메모를 바꿔 다시 시도해 주세요.',
      };
    const result = choice?.message.content;
    return result?.trim()
      ? { ok: true, text: result }
      : { ok: false, reason: 'other', message: '받은 글이 없어요. 다시 시도해 주세요.' };
  } catch (error) {
    if (error instanceof OpenAI.AuthenticationError)
      return { ok: false, reason: 'auth', message: 'API 키를 확인해 주세요.' };
    if (error instanceof OpenAI.RateLimitError || error instanceof OpenAI.APIConnectionError)
      return {
        ok: false,
        reason: 'network',
        message: '연결이 어렵거나 요청이 많아요. 잠시 뒤 다시 시도해 주세요.',
      };
    return {
      ok: false,
      reason: 'other',
      message: '요청을 처리하지 못했어요. 모델 이름과 계정 상태를 확인해 주세요.',
    };
  }
}
