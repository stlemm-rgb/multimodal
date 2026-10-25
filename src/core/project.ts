import type { Annotation } from './types';

export interface CustomItem {
  id: string;
  text: string;
}
export interface Project {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  captureIds: string[];
  checks: Record<string, boolean>;
  customItems: Record<string, CustomItem[]>;
}
export interface Capture {
  id: string;
  projectId: string;
  imageKey: string;
  mime: string;
  width: number;
  height: number;
  createdAt: string;
  annotations: Annotation[];
}

export function createProject(id: string, now: string, name = '새 프로젝트'): Project {
  return {
    id,
    name: name.trim() || '새 프로젝트',
    createdAt: now,
    updatedAt: now,
    captureIds: [],
    checks: {},
    customItems: {},
  };
}
export function renameProject(project: Project, name: string, now: string): Project {
  return { ...project, name: name.trim() || project.name, updatedAt: now };
}
export function toggleCheck(project: Project, itemId: string, now: string): Project {
  return {
    ...project,
    checks: { ...project.checks, [itemId]: !project.checks[itemId] },
    updatedAt: now,
  };
}
export function addCustomItem(
  project: Project,
  stageId: string,
  item: CustomItem,
  now: string,
): Project {
  if (
    !item.text.trim() ||
    Object.values(project.customItems)
      .flat()
      .some((entry) => entry.id === item.id)
  )
    return project;
  return {
    ...project,
    customItems: {
      ...project.customItems,
      [stageId]: [...(project.customItems[stageId] ?? []), { ...item, text: item.text.trim() }],
    },
    updatedAt: now,
  };
}
export function removeCustomItem(
  project: Project,
  stageId: string,
  itemId: string,
  now: string,
): Project {
  if (!(project.customItems[stageId] ?? []).some((item) => item.id === itemId)) return project;
  const checks = { ...project.checks };
  delete checks[itemId];
  return {
    ...project,
    checks,
    customItems: {
      ...project.customItems,
      [stageId]: project.customItems[stageId].filter((item) => item.id !== itemId),
    },
    updatedAt: now,
  };
}
export function attachCapture(project: Project, captureId: string, now: string): Project {
  return {
    ...project,
    captureIds: project.captureIds.includes(captureId)
      ? [...project.captureIds]
      : [...project.captureIds, captureId],
    updatedAt: now,
  };
}
