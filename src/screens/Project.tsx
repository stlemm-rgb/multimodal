import { useCallback, useEffect, useRef, useState } from 'react';
import { attachCapture, type Capture, type Project as ProjectData } from '../core/project';
import { buildProjectInstructions, buildSingleInstructions } from '../core/instructions';
import type { ProjectStore } from '../core/storage';
import type { LlmSettings } from '../core/llm/types';
import Editor from '../editor/Editor';
import AnnotationCanvas from '../editor/AnnotationCanvas';
import { chooseFiles, imageSize, saveBlob } from '../platform/files';
import { copyImage, copyText } from '../platform/clipboard';
import { exportFileName, exportImage } from '../platform/exportImage';
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
  const [tool, setTool] = useState('선택');
  const [exporting, setExporting] = useState(false);
  const saveQueue = useRef(Promise.resolve());
  const changedCaptures = useRef(new Map<string, Capture>());
  const capture = captures.find((item) => item.id === selectedId) ?? captures[0];
  useEffect(() => {
    let active = true;
    void Promise.all(project.captureIds.map((id) => store.getCapture(id)))
      .then((result) => {
        if (active)
          setCaptures(
            result
              .filter((item): item is Capture => !!item)
              .map((item) => changedCaptures.current.get(item.id) ?? item),
          );
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
    } else if (['선택', '번호', '박스', '화살표', '메모'].includes(tool)) setTool(tool);
    else setSheet(tool);
  }
  function saveCapture(next: Capture) {
    changedCaptures.current.set(next.id, next);
    setCaptures((previous) => previous.map((item) => (item.id === next.id ? next : item)));
    saveQueue.current = saveQueue.current
      .then(() => store.saveCapture(next))
      .catch(() => {
        if (mounted.current) setError('표시를 저장하지 못했어요. 기기 저장 공간을 확인해 주세요.');
      });
  }
  const instructions = buildSingleInstructions(capture?.annotations ?? []);
  const missing =
    capture?.annotations.filter((item) => item.type !== 'note' && !item.instruction.trim()) ?? [];
  async function copyInstructions(all = false) {
    try {
      await copyText(all ? buildProjectInstructions(captures) : instructions);
      setMessage('복사했어요');
    } catch {
      setMessage('복사하지 못했어요. 글을 직접 선택해 복사해 주세요.');
    }
  }
  async function exportPng(copy: boolean) {
    if (!capture || exporting) return;
    setExporting(true);
    setMessage('');
    try {
      const source = await store.getImage(capture.imageKey);
      if (!source) throw new Error('사진을 찾지 못했어요.');
      const png = await exportImage(source, capture);
      if (copy)
        setMessage(
          (await copyImage(png))
            ? '복사했어요'
            : '이 브라우저는 그림 복사를 못 해요. PNG 저장을 써 주세요.',
        );
      else {
        saveBlob(png, exportFileName(project.name, project.captureIds.indexOf(capture.id) + 1));
        setMessage('저장했어요');
      }
    } catch {
      setMessage('그림을 만들지 못했어요. 다시 시도해 주세요.');
    } finally {
      setExporting(false);
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
            <AnnotationCanvas
              key={capture.id}
              capture={capture}
              store={store}
              tool={tool}
              disabled={busy}
              onChange={saveCapture}
            />
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
      <Toolbar disabled={busy} selected={tool} onSelect={selectTool} />
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
                {missing.map(
                  (item) =>
                    item.type !== 'note' && (
                      <p key={item.id} className="warning-message">
                        {item.number}번에 설명이 없어요
                      </p>
                    ),
                )}
                <p>PNG를 AI 대화창에 붙이고, 그다음 지시문을 붙여 넣으세요.</p>
                <button disabled={!capture || exporting} onClick={() => void exportPng(false)}>
                  이 화면 PNG 저장
                </button>
                <button disabled={!capture || exporting} onClick={() => void exportPng(true)}>
                  이 화면 PNG 복사
                </button>
                <button
                  disabled={!capture}
                  className="primary"
                  onClick={() => void copyInstructions()}
                >
                  이 화면 지시문 복사
                </button>
                <button onClick={() => void copyInstructions(true)}>
                  프로젝트 전체 지시문 복사
                </button>
                <pre className="text-preview">{instructions}</pre>
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
