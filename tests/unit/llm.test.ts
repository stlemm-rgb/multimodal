import { describe, expect, it, vi } from 'vitest';
import { buildRefinePrompt } from '../../src/core/llm/prompt';
import { sendRefine } from '../../src/platform/llm';

describe('지시문 다듬기', () => {
  it('번호를 바꾸지 않고 정렬하며 원본은 유지한다', () => {
    const pins = [
      { number: 9, text: '  버튼을\n크게 ' },
      { number: 2, text: '메뉴를 위로' },
    ];
    const before = JSON.stringify(pins);
    const prompt = buildRefinePrompt({ images: [], pins, note: '  모바일 화면이에요  ' });
    expect(prompt.text).toContain('2. 메뉴를 위로\n9. 버튼을 크게');
    expect(prompt.text).toContain('메모:\n모바일 화면이에요');
    expect(prompt.system).toContain('한국어');
    expect(prompt.system).toContain('번호마다 한 줄');
    expect(JSON.stringify(pins)).toBe(before);
  });
  it('메모만 있거나 아무 글이 없어도 undefined를 넣지 않는다', () => {
    expect(buildRefinePrompt({ images: [], pins: [], note: '크게 만들어 주세요' }).text).toBe(
      '화면 수정 요청\n\n메모:\n크게 만들어 주세요',
    );
    expect(buildRefinePrompt({ images: [], pins: [] }).text).toBe('화면 수정 요청');
  });
  it('연결이 꺼져 있거나 키·모델이 없으면 네트워크를 호출하지 않는다', async () => {
    const fetch = vi.spyOn(globalThis, 'fetch');
    try {
      const settings = {
        enabled: false,
        provider: 'openai' as const,
        apiKey: 'test',
        model: 'user-model',
      };
      const request = { images: [], pins: [], note: '메모' };
      expect(await sendRefine(settings, request)).toMatchObject({ ok: false });
      expect(await sendRefine({ ...settings, enabled: true, apiKey: '' }, request)).toMatchObject({
        ok: false,
        reason: 'auth',
      });
      expect(await sendRefine({ ...settings, enabled: true, model: '' }, request)).toMatchObject({
        ok: false,
        reason: 'other',
      });
      expect(fetch).not.toHaveBeenCalled();
    } finally {
      fetch.mockRestore();
    }
  });
});
