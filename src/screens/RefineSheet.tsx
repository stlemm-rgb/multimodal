import { useRef, useState } from 'react';
import type { Capture } from '../core/project';
import type { ProjectStore } from '../core/storage';
import type { LlmSettings, RefineResult } from '../core/llm/types';
import { buildRefinePrompt } from '../core/llm/prompt';
import { copyText } from '../platform/clipboard';
import { readBase64 } from '../platform/files';
import { sendRefine } from '../platform/llm';
import BottomSheet from '../ui/BottomSheet';
import Toast from '../ui/Toast';

export default function RefineSheet({
  settings,
  capture,
  store,
  onClose,
}: {
  settings: LlmSettings;
  capture?: Capture;
  store: ProjectStore;
  onClose: () => void;
}) {
  const [phase, setPhase] = useState<'edit' | 'confirm' | 'sending' | 'result'>('edit');
  const [note, setNote] = useState('');
  const [result, setResult] = useState<RefineResult | null>(null);
  const [message, setMessage] = useState('');
  const sending = useRef(false);
  const company = settings.provider === 'anthropic' ? 'Claude (Anthropic)' : 'ChatGPT (OpenAI)';
  const requestText = buildRefinePrompt({ images: [], pins: [], note }).text;
  async function send() {
    if (sending.current) return;
    sending.current = true;
    setPhase('sending');
    setMessage('');
    try {
      const images = [];
      if (capture) {
        const image = await store.getImage(capture.imageKey);
        if (!image) throw new Error('사진을 찾지 못했어요.');
        images.push({ mime: capture.mime, base64: await readBase64(image) });
      }
      setResult(await sendRefine(settings, { images, pins: [], note }));
    } catch {
      setResult({
        ok: false,
        reason: 'other',
        message: '사진을 읽지 못했어요. 캡처를 다시 추가해 주세요.',
      });
    } finally {
      sending.current = false;
      setPhase('result');
    }
  }
  async function copy() {
    if (!result?.ok) return;
    try {
      await copyText(result.text);
      setMessage('글을 복사했어요.');
    } catch {
      setMessage('복사하지 못했어요. 아래 글을 직접 선택해 복사해 주세요.');
    }
  }
  return (
    <BottomSheet
      title={
        phase === 'confirm'
          ? '보내기 전에 확인해 주세요'
          : phase === 'result'
            ? 'AI가 다듬은 글'
            : 'AI 다듬기'
      }
      onClose={onClose}
    >
      {!settings.enabled ? (
        <>
          <p>설정에서 AI 연결을 켜 주세요.</p>
          <a className="button primary" href="#/settings">
            설정 가기
          </a>
        </>
      ) : (
        <>
          {phase === 'edit' && (
            <>
              <p className="muted">
                바꾸고 싶은 점을 적어 주세요. 지금 캡처 {capture ? '1' : '0'}장과 함께 보낼 내용을
                확인할 수 있어요.
              </p>
              <label>
                AI에게 전할 메모
                <textarea
                  rows={5}
                  value={note}
                  onChange={(event) => setNote(event.target.value)}
                  placeholder="예: 아래 버튼을 더 크게 만들어 주세요."
                />
              </label>
              <button
                className="primary"
                disabled={!note.trim() && !capture}
                onClick={() => setPhase('confirm')}
              >
                보낼 내용 확인
              </button>
            </>
          )}
          {phase === 'confirm' && (
            <>
              <p>
                <strong>{company}</strong>에 사진 {capture ? '1' : '0'}장과 아래 글을 보내요.
              </p>
              <p className="muted">사진에 개인정보가 없는지 확인해 주세요.</p>
              <h3>보낼 글 미리보기</h3>
              <pre className="text-preview">{requestText}</pre>
              <div className="actions">
                <button onClick={onClose}>취소</button>
                <button onClick={() => setPhase('edit')}>메모 수정</button>
                <button className="primary" onClick={() => void send()}>
                  보내기
                </button>
              </div>
            </>
          )}
          {phase === 'sending' && <p role="status">{company}의 답을 기다리고 있어요…</p>}
          {phase === 'result' &&
            result &&
            (result.ok ? (
              <>
                <p className="muted">보내기 전 메모와 비교한 뒤 복사해 주세요.</p>
                <details>
                  <summary>내가 쓴 메모</summary>
                  <pre className="text-preview">{note || '메모 없이 캡처만 보냈어요.'}</pre>
                </details>
                <pre className="text-preview">{result.text}</pre>
                <button className="primary" onClick={() => void copy()}>
                  복사
                </button>
              </>
            ) : (
              <>
                <p role="alert" className="error-message">
                  {result.message}
                </p>
                <button onClick={() => setPhase('confirm')}>보낼 내용 다시 확인</button>
              </>
            ))}
          <Toast message={message} />
        </>
      )}
    </BottomSheet>
  );
}
