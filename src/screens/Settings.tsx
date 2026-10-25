import { useState } from 'react';
import type { LlmSettings } from '../core/llm/types';
import { defaultSettings, readSettings, writeSettings, clearSettings } from '../platform/settings';
import { sendRefine } from '../platform/llm';
import { buildRefinePrompt } from '../core/llm/prompt';
import BottomSheet from '../ui/BottomSheet';
import TopBar from '../ui/TopBar';
import Toast from '../ui/Toast';

const testRequest = {
  images: [],
  pins: [],
  note: '연결 확인용이에요. “연결됐어요”라고 짧게 답해 주세요.',
};
export default function Settings() {
  const [initial] = useState(() => {
    try {
      return { settings: readSettings(), error: '' };
    } catch {
      return {
        settings: { ...defaultSettings },
        error: '설정을 읽지 못했어요. 브라우저의 저장 권한을 확인해 주세요.',
      };
    }
  });
  const [settings, setSettings] = useState<LlmSettings>(initial.settings);
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState(initial.error);
  const [message, setMessage] = useState('');
  const [confirm, setConfirm] = useState(false);
  const [busy, setBusy] = useState(false);
  function update(next: LlmSettings) {
    setSettings(next);
    setError('');
    setMessage('');
    try {
      writeSettings(next);
    } catch {
      setError('설정을 저장하지 못했어요. 브라우저의 저장 권한을 확인해 주세요.');
    }
  }
  async function testConnection() {
    if (busy) return;
    setConfirm(false);
    setBusy(true);
    setMessage('연결을 확인하고 있어요…');
    const result = await sendRefine(settings, testRequest);
    setMessage(result.ok ? '연결됐어요.' : result.message);
    setBusy(false);
  }
  return (
    <>
      <TopBar title="설정" />
      <section className="settings-panel">
        <div className="section-heading">
          <h2>AI 연결</h2>
          <label className="switch">
            <input
              role="switch"
              type="checkbox"
              checked={settings.enabled}
              disabled={busy}
              onChange={(event) => update({ ...settings, enabled: event.target.checked })}
            />
            <span>AI 연결 켜기</span>
          </label>
        </div>
        <p className="muted">
          키는 이 기기에만 저장돼요. 켜면 보낼 때마다 확인한 뒤에만 사진과 글이 그 회사로 전송돼요.
        </p>
        <fieldset disabled={busy}>
          <legend className="visually-hidden">연결 정보</legend>
          <label>
            회사 고르기
            <select
              value={settings.provider}
              onChange={(event) =>
                update({
                  ...settings,
                  provider: event.target.value === 'openai' ? 'openai' : 'anthropic',
                  apiKey: '',
                  model: event.target.value === 'openai' ? '' : defaultSettings.model,
                })
              }
            >
              <option value="anthropic">Claude</option>
              <option value="openai">ChatGPT</option>
            </select>
          </label>
          <p className="muted">회사를 바꾸면 키를 다시 넣어 주세요.</p>
          <div>
            <label htmlFor="api-key">API 키</label>
            <p className="muted" id="api-key-help">
              AI 회사에서 받은 연결용 키예요.
            </p>
            <div className="key-input">
              <input
                id="api-key"
                aria-describedby="api-key-help"
                type={visible ? 'text' : 'password'}
                value={settings.apiKey}
                autoComplete="off"
                spellCheck={false}
                onChange={(event) => update({ ...settings, apiKey: event.target.value })}
              />
              <button type="button" aria-pressed={visible} onClick={() => setVisible(!visible)}>
                {visible ? '숨기기' : '보기'}
              </button>
            </div>
          </div>
          <label>
            모델 이름
            <input
              value={settings.model}
              placeholder="사용할 모델 이름을 넣어 주세요"
              onChange={(event) => update({ ...settings, model: event.target.value })}
            />
          </label>
          {settings.provider === 'openai' && (
            <p className="muted">사용할 모델 이름을 넣어 주세요.</p>
          )}
          <div className="actions">
            <button
              className="primary"
              disabled={
                !settings.enabled || !settings.apiKey.trim() || !settings.model.trim() || !!error
              }
              onClick={() => setConfirm(true)}
            >
              연결 시험
            </button>
            <button
              onClick={() => {
                try {
                  clearSettings();
                  setSettings({ ...defaultSettings });
                  setVisible(false);
                  setError('');
                  setMessage('키를 지우고 AI 연결을 껐어요.');
                } catch {
                  setError('키를 지우지 못했어요. 브라우저의 저장 권한을 확인해 주세요.');
                }
              }}
            >
              키 지우기
            </button>
          </div>
        </fieldset>
        {!settings.enabled && (
          <p className="muted">AI 연결이 꺼져 있어요. 다른 기능은 그대로 쓸 수 있어요.</p>
        )}
        {error && (
          <p role="alert" className="error-message">
            {error}
          </p>
        )}
        <Toast message={message} />
      </section>
      <section className="settings-panel">
        <h2>앱 정보</h2>
        <p>화면으로 설명하기</p>
        <p className="muted">
          캡처와 설명을 모아 어떤 AI에게든 전달하는 도구예요. 프로젝트는 지금 쓰는 브라우저에
          저장돼요.
        </p>
      </section>
      {confirm && (
        <BottomSheet title="연결 시험 전에 확인해 주세요" onClose={() => setConfirm(false)}>
          <p>
            {settings.provider === 'anthropic' ? 'Claude (Anthropic)' : 'ChatGPT (OpenAI)'}에 사진
            0장과 아래 글을 보내요.
          </p>
          <pre className="text-preview">{buildRefinePrompt(testRequest).text}</pre>
          <div className="actions">
            <button onClick={() => setConfirm(false)}>취소</button>
            <button className="primary" onClick={() => void testConnection()}>
              보내기
            </button>
          </div>
        </BottomSheet>
      )}
    </>
  );
}
