# PROGRESS — 작업 일지

> 작업 하나 끝날 때마다 번호 붙인 한 문단: 무엇을 · 왜 · 어느 파일 · 어떻게 확인했나.

0. **하네스 구성** (2026-10-25, Claude) — 이전 게임 프로젝트에서 복사된 문서의 게임 전용 내용(D1 데모·세이브·전투·기준 이미지 검사 등)을 걷어내고, 이 입력 도구용 공동 규칙·총괄 역할·에이전트 프로필·절차서·인수인계를 새로 썼다. 파일: AGENTS.md, CLAUDE.md, RUNBOOK.md, HANDOFF.md, PROGRESS.md, `.claude/agents/`, `.claude/settings.json`, `.gitignore`, `refs/README.md`. 확인: Codex 실행 파일 경로·Node 24·Git 존재 확인, `git init`.

1. **Codex 협업 방식 옮기기** (2026-10-25, Claude) — 사용자가 준 이전 프로젝트 문서(HANDOFF·PROGRESS·RUNBOOK)에서 Codex와 일하던 방식을 찾아 적용: 하청 세 종류(고치기·점검·의견/반박), 사용자 지정 모델(작업 `gpt-6-astra` medium, 판단 `gpt-6.1-sol`), 한 번에 하나·백그라운드 실행, 지시서 `refs/brief_*`·결과 `review_/codex_/debate_/draft_` 이름 규칙, 샌드박스 한계(브라우저·인터넷 없음 → 화면 확인·설치는 Claude), PROGRESS 기록 형식, 표 + 추천으로 묻기. 파일: CLAUDE.md, AGENTS.md, RUNBOOK.md, refs/README.md, `.claude/agents/codex-review.md`. 확인: 두 모델로 `codex exec` 읽기 전용 시험 실행 종료 코드 0.

2. **프로젝트 환경 구성** (2026-10-25, Codex 하청 gpt-6-astra high, 총괄 검수) — 코드 작업을 시작할 뼈대가 필요해서. 지시서 `refs/brief_env_setup.md`. Vite 6 + React 19 + TypeScript strict, ESLint(경고도 실패)·Prettier·Vitest·Playwright(설치된 Chrome, 390×844·1280×800), `npm run check` = 타입 → 린트 → 단위 → 빌드 → 화면을 `&&`로 이음. 화면: 편집기(붙여넣기·끌어 놓기·파일 고르기 미리보기), 용어 사전(스켈레톤·바텀시트). `src/core/` 표시 타입과 지시문 함수. RUNBOOK "실행·검사" 채움. 총괄이 고친 것: vitest 3 → 4(하위 패키지 보안 경고 3개 → 0). 확인: 지시 밖 변경 없음, `npm install` 후 `npm run check` 종료 코드 0, 일부러 타입 오류를 넣으면 종료 코드 2, Chrome으로 두 화면 390·1280 사진을 직접 봄.

3. **앱 틀: CapCut식 화면 + 프로젝트 관리 + 단계 안내 + LLM 연결** (2026-10-25, Codex 하청 gpt-6-astra high, 총괄 검수) — 사용자 방향(CapCut 참고, 웹 먼저·안드로이드 준비, 프로젝트·단계 체크, LLM API 선택 연결)을 총괄이 `docs/PRODUCT.md`로 정리하고 지시서 `refs/brief_app_shell.md`로 맡김. 총괄이 미리 `@anthropic-ai/sdk`·`openai` 설치(Codex 샌드박스는 인터넷 없음). 결과: 홈·프로젝트·단계 안내·용어 사전·설정 화면, 바텀시트 부품, `src/core/`(project·stages·storage·llm), `src/platform/`(IndexedDB·클립보드·파일·설정·Claude/OpenAI 호출, SDK는 쓸 때만 불러옴), 단위 17·화면 14 시험. Claude 호출은 `claude-opus-5-5`, 거절 시 서버 대체 모델(`fallbacks: "default"`), 보낼 때마다 확인 시트. 총괄이 고친 것: 단계 화면이 저장 중 들어온 체크를 말없이 버리던 버그(데스크톱 화면 시험 실패로 발견) → 화면은 바로 바꾸고 저장은 순서대로 줄 세움(`src/screens/Guide.tsx`). 확인: 지시 밖 변경 없음, `npm run check` 종료 코드 0, Chrome 390px로 홈·프로젝트·단계·설정 사진 직접 봄, 콘솔 오류 0. 실제 API 키 호출은 미확인.
