import { useRef, useState } from 'react';
import { stages } from '../core/data/stages';
import { addCustomItem, removeCustomItem, toggleCheck, type Project } from '../core/project';
import { projectProgress, stageProgress } from '../core/stages';
import type { ProjectStore } from '../core/storage';
import ProgressBar from '../ui/ProgressBar';
import TopBar from '../ui/TopBar';

export default function Guide({
  project,
  store,
  onSaved,
}: {
  project: Project;
  store: ProjectStore;
  onSaved: (project: Project) => void;
}) {
  const progress = projectProgress(project);
  const [expanded, setExpanded] = useState<string[]>([progress.currentStage?.id ?? stages[0].id]);
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [error, setError] = useState('');
  // 빠르게 연달아 눌러도 클릭을 버리지 않도록 화면은 바로 바꾸고 저장은 순서대로 줄 세운다.
  const saveQueue = useRef<Promise<void>>(Promise.resolve());
  function save(updated: Project, after?: () => void) {
    setError('');
    onSaved(updated);
    after?.();
    saveQueue.current = saveQueue.current.then(() =>
      store.saveProject(updated).catch(() => {
        setError('체크 내용을 저장하지 못했어요. 다시 시도해 주세요.');
      }),
    );
  }
  return (
    <>
      <TopBar title="단계 안내" back={`#/p/${project.id}`} />
      <section className="guide-summary">
        <p className="eyebrow">하나씩, 내 속도대로</p>
        <h2>
          {progress.currentStage
            ? `지금 단계: ${progress.currentIndex + 1}. ${progress.currentStage.title}`
            : '모든 단계를 마쳤어요!'}
        </h2>
        <ProgressBar
          value={progress.completedItems}
          total={progress.totalItems}
          label={`${progress.completedStages}/7 단계 · ${progress.completedItems}/${progress.totalItems} 항목 완료`}
        />
        <p className="muted">순서대로 하지 않아도 괜찮아요. 필요한 단계부터 펼쳐 보세요.</p>
      </section>
      {error && (
        <p role="alert" className="error-message">
          {error}
        </p>
      )}
      <div className="stage-list">
        {stages.map((stage, index) => {
          const status = stageProgress(project, stage);
          const open = expanded.includes(stage.id);
          return (
            <section
              className={`stage-card ${progress.currentStage?.id === stage.id ? 'current' : ''}`}
              key={stage.id}
            >
              <button
                className="stage-toggle"
                aria-expanded={open}
                aria-controls={`stage-${stage.id}`}
                onClick={() =>
                  setExpanded(
                    open ? expanded.filter((id) => id !== stage.id) : [...expanded, stage.id],
                  )
                }
              >
                <span className="stage-number">{status.done ? '✓' : index + 1}</span>
                <span>
                  {stage.title}
                  <small>
                    {status.completed}/{status.total} 항목
                  </small>
                </span>
                <span aria-hidden="true">{open ? '−' : '＋'}</span>
              </button>
              {open && (
                <div className="stage-content" id={`stage-${stage.id}`}>
                  <p className="muted">{stage.goal}</p>
                  {[...stage.items, ...(project.customItems[stage.id] ?? [])].map((item) => (
                    <div className="check-row" key={item.id}>
                      <label>
                        <input
                          type="checkbox"
                          checked={!!project.checks[item.id]}
                          onChange={() =>
                            save(toggleCheck(project, item.id, new Date().toISOString()))
                          }
                        />
                        <span>{item.text}</span>
                      </label>
                      {project.customItems[stage.id]?.some((custom) => custom.id === item.id) && (
                        <button
                          aria-label={`${item.text} 지우기`}
                          onClick={() =>
                            save(
                              removeCustomItem(
                                project,
                                stage.id,
                                item.id,
                                new Date().toISOString(),
                              ),
                            )
                          }
                        >
                          ×
                        </button>
                      )}
                    </div>
                  ))}
                  <form
                    className="custom-item"
                    onSubmit={(event) => {
                      event.preventDefault();
                      save(
                        addCustomItem(
                          project,
                          stage.id,
                          { id: `custom-${crypto.randomUUID()}`, text: drafts[stage.id] ?? '' },
                          new Date().toISOString(),
                        ),
                        () => setDrafts({ ...drafts, [stage.id]: '' }),
                      );
                    }}
                  >
                    <label>
                      {stage.title}에 내 항목
                      <input
                        placeholder="내가 확인할 일"
                        maxLength={200}
                        value={drafts[stage.id] ?? ''}
                        onChange={(event) =>
                          setDrafts({ ...drafts, [stage.id]: event.target.value })
                        }
                      />
                    </label>
                    <button disabled={!drafts[stage.id]?.trim()}>＋ 내 항목 추가</button>
                  </form>
                </div>
              )}
            </section>
          );
        })}
      </div>
    </>
  );
}
