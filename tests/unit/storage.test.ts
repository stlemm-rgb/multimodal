import { describe, expect, it } from 'vitest';
import { createMemoryStore, STORE_VERSION } from '../../src/core/storage';
import { attachCapture, createProject, type Capture } from '../../src/core/project';

const now = '2026-10-25T00:00:00.000Z';
const capture: Capture = {
  id: 'c1',
  projectId: 'p1',
  imageKey: 'img1',
  mime: 'image/png',
  width: 10,
  height: 20,
  createdAt: now,
  annotations: [
    { id: 'pin1', type: 'pin', number: 1, instruction: '크게', position: { x: 1, y: 2 } },
  ],
};

describe('메모리 저장소', () => {
  it('버전 1이며 저장하거나 읽은 객체를 고쳐도 저장소는 오염되지 않는다', async () => {
    expect(STORE_VERSION).toBe(1);
    const store = createMemoryStore();
    const project = createProject('p1', now);
    await store.saveProject(project);
    project.name = '밖에서 바꾼 이름';
    const read = (await store.getProject('p1'))!;
    read.checks.test = true;
    const list = await store.listProjects();
    list[0].captureIds.push('fake');
    expect(await store.getProject('p1')).toMatchObject({
      name: '새 프로젝트',
      checks: {},
      captureIds: [],
    });
    await store.saveCapture(capture);
    const readCapture = (await store.getCapture('c1'))!;
    readCapture.annotations[0].id = 'changed';
    expect((await store.getCapture('c1'))?.annotations[0].id).toBe('pin1');
  });
  it('프로젝트를 지우면 캡처와 이미지까지 지우고 다른 프로젝트는 유지한다', async () => {
    const store = createMemoryStore();
    const project = attachCapture(createProject('p1', now), capture.id, now);
    const image = new Blob(['test'], { type: 'image/png' });
    await store.addCapture(project, capture, image);
    await store.saveProject(createProject('p2', now));
    await store.saveImage('other-image', image);
    expect(await (await store.getImage('img1'))?.text()).toBe('test');
    await store.deleteProject('p1');
    expect(await store.getProject('p1')).toBeUndefined();
    expect(await store.getCapture('c1')).toBeUndefined();
    expect(await store.getImage('img1')).toBeUndefined();
    expect(await store.getProject('p2')).toBeDefined();
    expect(await store.getImage('other-image')).toBeDefined();
  });
  it('캡처만 지우면 프로젝트의 순서 목록에서 빼고 이미지를 지운다', async () => {
    const store = createMemoryStore();
    const project = attachCapture(createProject('p1', now), capture.id, now);
    await store.addCapture(project, capture, new Blob(['test']));
    await store.deleteCapture('c1');
    await store.deleteCapture('missing');
    expect((await store.getProject('p1'))?.captureIds).toEqual([]);
    expect(await store.getCapture('c1')).toBeUndefined();
    expect(await store.getImage('img1')).toBeUndefined();
  });
});
