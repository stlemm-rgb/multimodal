import { stages, type Stage } from './data/stages';
import type { Project } from './project';

export function stageProgress(project: Project, stage: Stage) {
  const items = [...stage.items, ...(project.customItems[stage.id] ?? [])];
  const completed = items.filter((item) => project.checks[item.id]).length;
  return { completed, total: items.length, done: completed === items.length };
}
export function projectProgress(project: Project) {
  const progress = stages.map((stage) => stageProgress(project, stage));
  const firstIncomplete = progress.findIndex((stage) => !stage.done);
  return {
    completedStages: progress.filter((stage) => stage.done).length,
    totalStages: stages.length,
    completedItems: progress.reduce((sum, stage) => sum + stage.completed, 0),
    totalItems: progress.reduce((sum, stage) => sum + stage.total, 0),
    currentStage: firstIncomplete === -1 ? null : stages[firstIncomplete],
    currentIndex: firstIncomplete,
  };
}
