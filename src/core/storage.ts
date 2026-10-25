import type { Capture, Project } from './project';

export const STORE_VERSION = 1;
export interface ProjectStore {
  listProjects(): Promise<Project[]>;
  getProject(id: string): Promise<Project | undefined>;
  saveProject(project: Project): Promise<void>;
  deleteProject(id: string): Promise<void>;
  getCapture(id: string): Promise<Capture | undefined>;
  saveCapture(capture: Capture): Promise<void>;
  deleteCapture(id: string): Promise<void>;
  getImage(key: string): Promise<Blob | undefined>;
  saveImage(key: string, image: Blob): Promise<void>;
  // 이미지와 목록을 한 번에 저장해서 중간 실패로 깨진 캡처가 남지 않게 한다.
  addCapture(project: Project, capture: Capture, image: Blob): Promise<void>;
}
const copy = <T>(value: T): T => JSON.parse(JSON.stringify(value)) as T;

export function createMemoryStore(): ProjectStore {
  const projects = new Map<string, Project>();
  const captures = new Map<string, Capture>();
  const images = new Map<string, Blob>();
  return {
    async listProjects() {
      return [...projects.values()].map(copy);
    },
    async getProject(id) {
      const value = projects.get(id);
      return value && copy(value);
    },
    async saveProject(project) {
      projects.set(project.id, copy(project));
    },
    async deleteProject(id) {
      for (const capture of captures.values()) {
        if (capture.projectId === id) {
          images.delete(capture.imageKey);
          captures.delete(capture.id);
        }
      }
      projects.delete(id);
    },
    async getCapture(id) {
      const value = captures.get(id);
      return value && copy(value);
    },
    async saveCapture(capture) {
      captures.set(capture.id, copy(capture));
    },
    async deleteCapture(id) {
      const capture = captures.get(id);
      if (!capture) return;
      const project = projects.get(capture.projectId);
      if (project)
        projects.set(project.id, {
          ...project,
          captureIds: project.captureIds.filter((key) => key !== id),
        });
      images.delete(capture.imageKey);
      captures.delete(id);
    },
    async getImage(key) {
      return images.get(key);
    },
    async saveImage(key, image) {
      images.set(key, image);
    },
    async addCapture(project, capture, image) {
      projects.set(project.id, copy(project));
      captures.set(capture.id, copy(capture));
      images.set(capture.imageKey, image);
    },
  };
}
