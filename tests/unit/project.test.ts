import { describe, expect, it } from 'vitest';
import {
  addCustomItem,
  attachCapture,
  createProject,
  removeCustomItem,
  renameProject,
  toggleCheck,
} from '../../src/core/project';

const now = '2026-10-25T00:00:00.000Z';
const later = '2026-10-25T01:00:00.000Z';

describe('프로젝트를 원본 변경 없이 편집한다', () => {
  it('프로젝트를 만들고 이름과 수정 날짜를 바꾼다', () => {
    const project = createProject('p1', now);
    const renamed = renameProject(project, '  내 앱  ', later);
    expect(renamed).toMatchObject({ id: 'p1', name: '내 앱', createdAt: now, updatedAt: later });
    expect(project.name).toBe('새 프로젝트');
    expect(project.updatedAt).toBe(now);
    expect(renameProject(project, ' ', later).name).toBe(project.name);
  });
  it('체크를 두 번 누르면 해제하고 원본 체크는 유지한다', () => {
    const project = createProject('p1', now);
    Object.freeze(project.checks);
    const checked = toggleCheck(project, 'idea-sentence', later);
    expect(checked.checks['idea-sentence']).toBe(true);
    expect(project.checks).toEqual({});
    expect(toggleCheck(checked, 'idea-sentence', later).checks['idea-sentence']).toBe(false);
  });
  it('내 항목을 더하고 지울 때 그 항목의 체크 기록도 지운다', () => {
    const project = createProject('p1', now);
    const item = { id: 'custom-one', text: '  친구에게 보여 주기  ' };
    const added = addCustomItem(project, 'idea', item, later);
    const checked = toggleCheck(added, item.id, later);
    const removed = removeCustomItem(checked, 'idea', item.id, later);
    expect(project.customItems).toEqual({});
    expect(item.text).toBe('  친구에게 보여 주기  ');
    expect(added.customItems.idea).toEqual([{ id: item.id, text: '친구에게 보여 주기' }]);
    expect(checked.customItems.idea).toHaveLength(1);
    expect(removed.customItems.idea).toEqual([]);
    expect(removed.checks[item.id]).toBeUndefined();
    expect(checked.checks[item.id]).toBe(true);
  });
  it('빈 항목·중복 id는 추가하지 않고 없는 사용자 항목은 지우지 않는다', () => {
    const project = createProject('p1', now);
    expect(addCustomItem(project, 'idea', { id: 'x', text: ' ' }, later)).toBe(project);
    const added = addCustomItem(project, 'idea', { id: 'x', text: '항목' }, later);
    expect(addCustomItem(added, 'screens', { id: 'x', text: '중복' }, later)).toBe(added);
    expect(removeCustomItem(added, 'screens', 'x', later)).toBe(added);
  });
  it('캡처 순서를 보존하고 중복을 막는다', () => {
    const project = createProject('p1', now);
    const first = attachCapture(project, 'c1', later);
    const second = attachCapture(first, 'c2', later);
    expect(project.captureIds).toEqual([]);
    expect(first.captureIds).toEqual(['c1']);
    expect(attachCapture(second, 'c1', later).captureIds).toEqual(['c1', 'c2']);
  });
});
