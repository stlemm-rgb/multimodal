import { useCallback, useEffect, useState } from 'react';
import type { Project as ProjectData } from './core/project';
import type { ProjectStore } from './core/storage';
import Glossary from './glossary/Glossary';
import Home from './screens/Home';
import Project from './screens/Project';
import Guide from './screens/Guide';
import Settings from './screens/Settings';
import TabBar from './ui/TabBar';

export default function App({ store }: { store: ProjectStore }) {
  const [hash, setHash] = useState(window.location.hash || '#/');
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [retry, setRetry] = useState(0);
  useEffect(() => {
    const update = () => setHash(window.location.hash || '#/');
    window.addEventListener('hashchange', update);
    return () => window.removeEventListener('hashchange', update);
  }, []);
  useEffect(() => {
    let active = true;
    setLoading(true);
    setError('');
    void store
      .listProjects()
      .then((items) => {
        if (active) setProjects(items);
      })
      .catch(() => {
        if (active)
          setError('저장한 프로젝트를 읽지 못했어요. 브라우저의 저장 권한을 확인해 주세요.');
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [store, retry]);
  useEffect(() => {
    document.getElementById('main')?.focus();
    window.scrollTo(0, 0);
  }, [hash]);
  const onSaved = useCallback(
    (project: ProjectData) =>
      setProjects((items) => [...items.filter((item) => item.id !== project.id), project]),
    [],
  );
  const route = /^#\/p\/([^/]+)(\/guide)?$/.exec(hash);
  const project = route && projects.find((item) => item.id === route[1]);
  return (
    <div className="app-shell">
      <a
        className="skip-link"
        href="#main"
        onClick={(event) => {
          event.preventDefault();
          document.getElementById('main')?.focus();
        }}
      >
        본문으로 건너뛰기
      </a>
      <main id="main" tabIndex={-1}>
        {loading ? (
          <p role="status">프로젝트를 불러오고 있어요…</p>
        ) : error ? (
          <div>
            <p role="alert">{error}</p>
            <button onClick={() => setRetry(retry + 1)}>다시 시도</button>
          </div>
        ) : hash === '#/' ? (
          <Home
            store={store}
            projects={projects}
            onSaved={onSaved}
            onDeleted={(id) => setProjects((items) => items.filter((item) => item.id !== id))}
          />
        ) : hash === '#/glossary' ? (
          <div className="glossary-screen">
            <Glossary />
          </div>
        ) : hash === '#/settings' ? (
          <Settings />
        ) : project && route ? (
          route[2] ? (
            <Guide key={`${project.id}-guide`} project={project} store={store} onSaved={onSaved} />
          ) : (
            <Project key={project.id} project={project} store={store} onSaved={onSaved} />
          )
        ) : (
          <div className="empty-state">
            <h1>프로젝트를 찾지 못했어요</h1>
            <a className="button" href="#/">
              홈으로
            </a>
          </div>
        )}
      </main>
      {!route && <TabBar hash={hash} />}
    </div>
  );
}
