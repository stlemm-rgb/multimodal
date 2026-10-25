import { STORE_VERSION, type ProjectStore } from '../core/storage';
import type { Capture, Project } from '../core/project';
import { normalizeAnnotations } from '../core/annotations';

const tables = ['projects', 'captures', 'images'];
export function createIdbStore(): ProjectStore {
  let connection: Promise<IDBDatabase> | undefined;
  function open() {
    if (!connection) {
      connection = new Promise<IDBDatabase>((resolve, reject) => {
        const request = indexedDB.open('multimodal', STORE_VERSION);
        let blocked = false;
        request.onupgradeneeded = () => {
          const db = request.result;
          db.createObjectStore('projects', { keyPath: 'id' });
          db.createObjectStore('captures', { keyPath: 'id' }).createIndex('projectId', 'projectId');
          db.createObjectStore('images');
        };
        request.onsuccess = () => {
          const db = request.result;
          if (blocked) {
            db.close();
            return;
          }
          db.onversionchange = () => {
            db.close();
            connection = undefined;
          };
          resolve(db);
        };
        request.onerror = () => {
          connection = undefined;
          reject(request.error);
        };
        request.onblocked = () => {
          blocked = true;
          connection = undefined;
          reject(new Error('다른 탭을 닫고 다시 열어 주세요.'));
        };
      });
    }
    return connection;
  }
  async function read<T>(table: string, key?: string): Promise<T> {
    const db = await open();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(table, 'readonly');
      const store = tx.objectStore(table);
      const request = key === undefined ? store.getAll() : store.get(key);
      tx.oncomplete = () => resolve(request.result as T);
      tx.onabort = () => reject(tx.error ?? new Error('저장한 내용을 읽지 못했어요.'));
      tx.onerror = () => reject(tx.error);
    });
  }
  async function write(action: (tx: IDBTransaction) => void): Promise<void> {
    const db = await open();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(tables, 'readwrite');
      tx.oncomplete = () => resolve();
      tx.onabort = () => reject(tx.error ?? new Error('저장하지 못했어요.'));
      tx.onerror = () => reject(tx.error);
      try {
        action(tx);
      } catch (error) {
        tx.abort();
        reject(error);
      }
    });
  }
  return {
    listProjects: () => read<Project[]>('projects'),
    getProject: (id) => read<Project | undefined>('projects', id),
    saveProject: (project) =>
      write((tx) => {
        tx.objectStore('projects').put(project);
      }),
    deleteProject: (id) =>
      write((tx) => {
        tx.objectStore('projects').delete(id);
        const request = tx
          .objectStore('captures')
          .index('projectId')
          .openCursor(IDBKeyRange.only(id));
        request.onsuccess = () => {
          const cursor = request.result;
          if (!cursor) return;
          tx.objectStore('images').delete((cursor.value as Capture).imageKey);
          cursor.delete();
          cursor.continue();
        };
      }),
    getCapture: async (id) => {
      const capture = await read<Capture | undefined>('captures', id);
      return capture && { ...capture, annotations: normalizeAnnotations(capture.annotations) };
    },
    saveCapture: (capture) =>
      write((tx) => {
        tx.objectStore('captures').put(capture);
      }),
    deleteCapture: (id) =>
      write((tx) => {
        const request = tx.objectStore('captures').get(id);
        request.onsuccess = () => {
          const capture = request.result as Capture | undefined;
          if (!capture) return;
          tx.objectStore('captures').delete(id);
          tx.objectStore('images').delete(capture.imageKey);
          const owner = tx.objectStore('projects').get(capture.projectId);
          owner.onsuccess = () => {
            const project = owner.result as Project | undefined;
            if (project)
              tx.objectStore('projects').put({
                ...project,
                captureIds: project.captureIds.filter((key) => key !== id),
              });
          };
        };
      }),
    getImage: (key) => read<Blob | undefined>('images', key),
    saveImage: (key, image) =>
      write((tx) => {
        tx.objectStore('images').put(image, key);
      }),
    addCapture: (project, capture, image) =>
      write((tx) => {
        tx.objectStore('images').put(image, capture.imageKey);
        tx.objectStore('captures').put(capture);
        tx.objectStore('projects').put(project);
      }),
  };
}
