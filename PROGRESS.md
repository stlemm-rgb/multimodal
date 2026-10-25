# PROGRESS — 작업 일지

> 작업 하나 끝날 때마다 번호 붙인 한 문단: 무엇을 · 왜 · 어느 파일 · 어떻게 확인했나.

0. **하네스 구성** (2026-10-25, Claude) — 이전 게임 프로젝트에서 복사된 문서의 게임 전용 내용(D1 데모·세이브·전투·기준 이미지 검사 등)을 걷어내고, 이 입력 도구용 공동 규칙·총괄 역할·에이전트 프로필·절차서·인수인계를 새로 썼다. 파일: AGENTS.md, CLAUDE.md, RUNBOOK.md, HANDOFF.md, PROGRESS.md, `.claude/agents/`, `.claude/settings.json`, `.gitignore`, `refs/README.md`. 확인: Codex 실행 파일 경로·Node 24·Git 존재 확인, `git init`.

1. **Codex 협업 방식 옮기기** (2026-10-25, Claude) — 사용자가 준 이전 프로젝트 문서(HANDOFF·PROGRESS·RUNBOOK)에서 Codex와 일하던 방식을 찾아 적용: 하청 세 종류(고치기·점검·의견/반박), 사용자 지정 모델(작업 `gpt-6-astra` medium, 판단 `gpt-6.1-sol`), 한 번에 하나·백그라운드 실행, 지시서 `refs/brief_*`·결과 `review_/codex_/debate_/draft_` 이름 규칙, 샌드박스 한계(브라우저·인터넷 없음 → 화면 확인·설치는 Claude), PROGRESS 기록 형식, 표 + 추천으로 묻기. 파일: CLAUDE.md, AGENTS.md, RUNBOOK.md, refs/README.md, `.claude/agents/codex-review.md`. 확인: 두 모델로 `codex exec` 읽기 전용 시험 실행 종료 코드 0.
