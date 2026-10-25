import { useRef, useState } from 'react';
import { createProject, renameProject, toggleCheck, type Project } from '../core/project';
import { projectProgress } from '../core/stages';
import type { ProjectStore } from '../core/storage';
import BottomSheet from '../ui/BottomSheet';
import CaptureImage from '../ui/CaptureImage';
import ProgressBar from '../ui/ProgressBar';
import TopBar from '../ui/TopBar';

interface Props {
  store: ProjectStore;
  projects: Project[];
  onSaved: (project: Project) => void;
  onDeleted: (id: string) => void;
}
export default function Home({ store, projects, onSaved, onDeleted }: Props) {
  const saveQueue = useRef(Promise.resolve());
  const latest = useRef(new Map<string, Project>());
  function check(project: Project, itemId: string) {
    const updated = toggleCheck(
      latest.current.get(project.id) ?? project,
      itemId,
      new Date().toISOString(),
    );
    latest.current.set(project.id, updated);
    onSaved(updated);
    setError('');
    saveQueue.current = saveQueue.current
      .then(() => store.saveProject(updated))
      .catch(() => setError('체크 내용을 저장하지 못했어요. 다시 시도해 주세요.'));
  }
  const [selected, setSelected] = useState<Project | null>(null);
  const [mode, setMode] = useState<'menu' | 'rename' | 'delete'>('menu');
  const [name, setName] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  async function create() {
    setBusy(true);
    setError('');
    try {
      const project = createProject(crypto.randomUUID(), new Date().toISOString());
      await store.saveProject(project);
      onSaved(project);
      window.location.hash = `/p/${project.id}`;
    } catch {
      setError('새 프로젝트를 저장하지 못했어요. 기기 저장 공간을 확인하고 다시 시도해 주세요.');
    } finally {
      setBusy(false);
    }
  }
  async function change() {
    if (!selected || busy) return;
    setBusy(true);
    setError('');
    try {
      await saveQueue.current;
      if (mode === 'delete') {
        await store.deleteProject(selected.id);
        latest.current.delete(selected.id);
        onDeleted(selected.id);
      } else {
        const updated = renameProject(selected, name, new Date().toISOString());
        await store.saveProject(updated);
        latest.current.set(updated.id, updated);
        onSaved(updated);
      }
      setSelected(null);
    } catch {
      setError('변경 내용을 저장하지 못했어요. 다시 시도해 주세요.');
    } finally {
      setBusy(false);
    }
  }
  return (
    <>
      <TopBar title="화면으로 설명하기" />
      <section className="home-intro">
        <p className="eyebrow">생각을 화면으로, 화면을 지시문으로</p>
        <button className="primary new-project" disabled={busy} onClick={() => void create()}>
          <span aria-hidden="true">＋</span> 새 프로젝트
        </button>
        <p className="muted">캡처를 모으고, 원하는 모습을 쉽게 설명해 보세요.</p>
      </section>
      {error && !selected && (
        <p role="alert" className="error-message">
          {error}
        </p>
      )}
      <div className="section-heading">
        <h2>내 프로젝트</h2>
        <span className="muted">{projects.length}개</span>
      </div>
      {projects.length === 0 && (
        <div className="empty-state">
          <span aria-hidden="true">▧</span>
          <h3>첫 화면을 함께 만들어 봐요</h3>
          <p>새 프로젝트를 누르면 시작할 수 있어요.</p>
        </div>
      )}
      <div className="project-grid">
        {[...projects]
          .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
          .map((project) => {
            const progress = projectProgress(project);
            return (
              <article className="project-card" key={project.id}>
                <a
                  className="project-open"
                  href={`#/p/${project.id}`}
                  aria-label={`${project.name} 열기`}
                >
                  <div className="project-thumbnail">
                    <CaptureImage
                      store={store}
                      captureId={project.captureIds[0]}
                      alt={`${project.name} 첫 캡처`}
                    />
                  </div>
                  <h3>{project.name}</h3>
                </a>
                <button
                  className="project-menu"
                  aria-label={`${project.name} 메뉴`}
                  onClick={() => {
                    setSelected(project);
                    setMode('menu');
                    setName(project.name);
                    setError('');
                  }}
                >
                  ⋯
                </button>
                <div className="project-meta">
                  <ProgressBar
                    value={progress.completedStages}
                    total={progress.totalStages}
                    label={`${progress.completedStages}/${progress.totalStages} 단계 · ${progress.completedItems}/${progress.totalItems} 항목 완료`}
                  />
                  <h4>
                    {progress.currentStage
                      ? `지금 단계: ${progress.currentIndex + 1}. ${progress.currentStage.title}`
                      : '모든 단계를 마쳤어요!'}
                  </h4>
                  {progress.currentStage &&
                    [
                      ...progress.currentStage.items,
                      ...(project.customItems[progress.currentStage.id] ?? []),
                    ]
                      .filter((item) => !project.checks[item.id])
                      .slice(0, 2)
                      .map((item) => (
                        <div className="check-row" key={item.id}>
                          <label>
                            <input
                              type="checkbox"
                              checked={false}
                              onChange={() => check(project, item.id)}
                            />
                            <span>{item.text}</span>
                          </label>
                        </div>
                      ))}
                  <a className="button" href={`#/p/${project.id}/guide`}>
                    전체 단계 보기
                  </a>
                  <time dateTime={project.updatedAt}>
                    {new Date(project.updatedAt).toLocaleDateString('ko-KR')} 수정
                  </time>
                </div>
              </article>
            );
          })}
      </div>
      {selected && (
        <BottomSheet
          title={
            mode === 'delete'
              ? '프로젝트를 삭제할까요?'
              : mode === 'rename'
                ? '이름 바꾸기'
                : selected.name
          }
          onClose={() => setSelected(null)}
        >
          {mode === 'menu' ? (
            <>
              <button onClick={() => setMode('rename')}>이름 바꾸기</button>
              <button onClick={() => setMode('delete')}>삭제</button>
            </>
          ) : (
            <form
              onSubmit={(event) => {
                event.preventDefault();
                void change();
              }}
            >
              {mode === 'rename' ? (
                <label>
                  프로젝트 이름
                  <input
                    value={name}
                    maxLength={80}
                    onChange={(event) => setName(event.target.value)}
                    required
                  />
                </label>
              ) : (
                <p>“{selected.name}”의 캡처와 단계 기록도 함께 지워져요. 되돌릴 수 없어요.</p>
              )}
              <div className="actions">
                <button type="button" disabled={busy} onClick={() => setSelected(null)}>
                  취소
                </button>
                <button className="primary" disabled={busy || (mode === 'rename' && !name.trim())}>
                  {busy ? '저장 중…' : mode === 'delete' ? '삭제하기' : '저장'}
                </button>
              </div>
            </form>
          )}
          {error && (
            <p role="alert" className="error-message">
              {error}
            </p>
          )}
        </BottomSheet>
      )}
    </>
  );
}
