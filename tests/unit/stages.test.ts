import { describe, expect, it } from 'vitest';
import { stages } from '../../src/core/data/stages';
import { createProject, addCustomItem, removeCustomItem } from '../../src/core/project';
import { projectProgress, stageProgress } from '../../src/core/stages';

const now = '2026-10-25T00:00:00.000Z';
describe('7단계 진행 계산', () => {
  it('항목 id는 전체에서 유일하며 단계마다 3~4개다', () => {
    expect(stages).toHaveLength(7);
    const ids = stages.flatMap((stage) => stage.items.map((item) => item.id));
    expect(new Set(ids).size).toBe(ids.length);
    for (const stage of stages) {
      expect(stage.items.length).toBeGreaterThanOrEqual(3);
      expect(stage.items.length).toBeLessThanOrEqual(4);
    }
  });
  it('첫 미완료 단계가 지금 단계이고 순서를 건너뛰어도 계산된다', () => {
    const project = createProject('p1', now);
    expect(projectProgress(project)).toMatchObject({
      completedStages: 0,
      completedItems: 0,
      currentStage: stages[0],
    });
    const checks = Object.fromEntries(
      [...stages[0].items, ...stages[2].items].map((item) => [item.id, true]),
    );
    const progress = projectProgress({ ...project, checks });
    expect(progress).toMatchObject({
      completedStages: 2,
      completedItems: 6,
      currentIndex: 1,
      currentStage: stages[1],
    });
  });
  it('전부 완료한 뒤 내 항목을 추가·삭제하면 완료 상태도 다시 계산한다', () => {
    const project = {
      ...createProject('p1', now),
      checks: Object.fromEntries(
        stages.flatMap((stage) => stage.items.map((item) => [item.id, true])),
      ),
    };
    expect(projectProgress(project)).toMatchObject({
      completedStages: 7,
      currentStage: null,
      currentIndex: -1,
    });
    const added = addCustomItem(project, stages[0].id, { id: 'custom-one', text: '내 할 일' }, now);
    expect(stageProgress(added, stages[0])).toEqual({ completed: 3, total: 4, done: false });
    expect(projectProgress(added).completedStages).toBe(6);
    expect(
      projectProgress(removeCustomItem(added, stages[0].id, 'custom-one', now)).completedStages,
    ).toBe(7);
  });
});
