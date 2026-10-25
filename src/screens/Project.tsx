import { useCallback, useEffect, useRef, useState } from 'react';
import { attachCapture, type Capture, type Project as ProjectData } from '../core/project';
import { buildInstructions } from '../core/instructions';
import type { ProjectStore } from '../core/storage';
import type { LlmSettings } from '../core/llm/types';
import Editor from '../editor/Editor';
import { chooseFiles, imageSize } from '../platform/files';
import { copyText } from '../platform/clipboard';
import { readSettings } from '../platform/settings';
import BottomSheet from '../ui/BottomSheet';
import CaptureImage from '../ui/CaptureImage';
import Toolbar from '../ui/Toolbar';
import TopBar from '../ui/TopBar';
import Toast from '../ui/Toast';
import RefineSheet from './RefineSheet';

export default function Project({
  project,
  store,
  onSaved,
}: {
  project: ProjectData;
  store: ProjectStore;
  onSaved: (project: ProjectData) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const importing = useRef(false);
  const mounted = useRef(true);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);
  const [busy, setBusy] = useState(false);
  const [captures, setCaptures] = useState<Capture[]>([]);
  const [selectedId, setSelectedId] = useState('');
  const [error, setError] = useState('');
  const [sheet, setSheet] = useState<string | null>(null);
  const [settings, setSettings] = useState<LlmSettings | null>(null);
  const [aiCapture, setAiCapture] = useState<Capture>();
  const [message, setMessage] = useState('');
  const capture = captures.find((item) => item.id === selectedId) ?? captures[0];
  useEffect(() => {
    let active = true;
    void Promise.all(project.captureIds.map((id) => store.getCapture(id)))
      .then((result) => {
        if (active) setCaptures(result.filter((item): item is Capture => !!item));
      })
      .catch(() => {
        if (active) setError('캡처를 읽지 못했어요. 화면을 새로고침해 주세요.');
      });
    return () => {
      active = false;
    };
  }, [project.captureIds, store]);
  const importFiles = useCallback(
    (files: File[]) => {
      if (importing.current || !files.length) return;
      importing.current = true;
      setBusy(true);
      setError('');
      void (async () => {
        let current = project;
        try {
          for (const file of files) {
            const size = await imageSize(file);
            if (!mounted.current) break;
            const id = crypto.randomUUID();
            const now = new Date().toISOString();
            const next = attachCapture(current, id, now);
            const capture: Capture = {
              id,
              projectId: project.id,
              imageKey: id,
              mime: file.type,
              ...size,
              createdAt: now,
              annotations: [],
            };
            try {
              await store.addCapture(next, capture, file);
            } catch {
              throw new Error(
                '캡처를 저장하지 못했어요. 기기 저장 공간을 확인하고 다시 시도해 주세요.',
              );
            }
            current = next;
            onSaved(next);
            setCaptures((previous) => [...previous.filter((item) => item.id !== id), capture]);
            setSelectedId(id);
          }
        } catch (error) {
          setError(
            error instanceof Error
              ? error.message
              : '캡처를 저장하지 못했어요. 기기 저장 공간을 확인해 주세요.',
          );
        } finally {
          importing.current = false;
          setBusy(false);
        }
      })();
    },
    [project, store, onSaved],
  );
  function selectTool(tool: string) {
    setMessage('');
    if (tool === '캡처 추가') chooseFiles(inputRef.current);
    else if (tool === '단계') window.location.hash = `/p/${project.id}/guide`;
    else if (tool === 'AI 다듬기') {
      try {
        setSettings(readSettings());
        setAiCapture(capture);
        setSheet(tool);
      } catch {
        setError('AI 설정을 읽지 못했어요. 브라우저의 저장 권한을 확인해 주세요.');
      }
    } else setSheet(tool);
  }
  const instructions = buildInstructions(
    capture?.annotations.filter((item) => item.type === 'pin') ?? [],
  );
  async function copyInstructions() {
    if (!instructions) {
      setMessage('아직 번호별 지시문이 없어요. 번호 표시 기능은 준비 중이에요.');
      return;
    }
    try {
      await copyText(instructions);
      setMessage('지시문을 복사했어요.');
    } catch {
      setMessage('복사하지 못했어요. 글을 직접 선택해 복사해 주세요.');
    }
  }
  return (
    <div className="project-screen">
      <TopBar
        title={project.name}
        back="#/"
        action={
          <button
            className="primary"
            disabled={busy}
            onClick={() => {
              setSheet('내보내기');
              setMessage('');
            }}
          >
            내보내기
          </button>
        }
      />
      <Editor inputRef={inputRef} onFiles={importFiles} busy={busy}>
        {capture ? (
          <figure className="image-preview">
            <CaptureImage key={capture.id} store={store} captureId={capture.id} alt="불러온 화면" />
            <figcaption>
              캡처 {project.captureIds.indexOf(capture.id) + 1} · {capture.width} × {capture.height}
            </figcaption>
          </figure>
        ) : (
          <div className="empty-canvas">
            <span aria-hidden="true">▧</span>
            <h2>캡처를 추가하세요</h2>
            <p className="muted">
              이미지를 끌어 놓거나 Ctrl+V로 붙여 넣으세요.
              <br />
              Mac에서는 ⌘V를 눌러 주세요.
            </p>
            <button disabled={busy} onClick={() => chooseFiles(inputRef.current)}>
              이미지 파일 고르기
            </button>
          </div>
        )}
      </Editor>
      {busy && <p role="status">캡처를 저장하고 있어요…</p>}
      {error && (
        <p role="alert" className="error-message">
          {error}
        </p>
      )}
      {captures.length > 1 && (
        <div className="capture-strip" aria-label="캡처 목록">
          {captures.map((item, index) => (
            <button
              key={item.id}
              aria-label={`캡처 ${index + 1} 보기`}
              aria-pressed={capture?.id === item.id}
              onClick={() => setSelectedId(item.id)}
            >
              <CaptureImage store={store} captureId={item.id} alt={`캡처 ${index + 1}`} />
              <span>{index + 1}</span>
            </button>
          ))}
        </div>
      )}
      <p className="privacy-note">사진은 이 기기에 저장돼요. AI 전송은 확인한 뒤에만 해요.</p>
      <Toolbar disabled={busy} onSelect={selectTool} />
      {sheet === 'AI 다듬기' && settings ? (
        <RefineSheet
          settings={settings}
          store={store}
          capture={aiCapture}
          onClose={() => setSheet(null)}
        />
      ) : (
        sheet && (
          <BottomSheet title={sheet} onClose={() => setSheet(null)}>
            {sheet === '내보내기' ? (
              <>
                <button className="primary" onClick={() => void copyInstructions()}>
                  지시문 복사
                </button>
                {instructions ? (
                  <pre className="text-preview">{instructions}</pre>
                ) : (
                  <p className="muted">
                    아직 번호별 지시문이 없어요. 번호 표시 기능은 준비 중이에요.
                  </p>
                )}
                <button disabled>PNG 저장 · 준비 중</button>
                <Toast message={message} />
              </>
            ) : (
              <p>준비 중이에요. 곧 화면에 표시를 더할 수 있어요.</p>
            )}
          </BottomSheet>
        )
      )}
    </div>
  );
}
