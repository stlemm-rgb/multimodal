# HANDOFF — 지금 상태와 남은 일

> 마지막 갱신: 2026-10-27 (용어 사전 56개까지). 기획 원본은 docs/PRODUCT.md. **다른 PC에서 이어 하기 = RUNBOOK "새 PC 준비"**

## 지금 상태
- Vite + React + TS 웹앱. CapCut식 어두운 화면. `npm run check` 통과(단위 38 · 화면 30).
  | 화면 | 주소 | 되는 것 |
  | --- | --- | --- |
  | 홈 | `#/` | 새 프로젝트, 프로젝트 카드(썸네일·단계 진행·**지금 단계와 남은 항목 2개 바로 체크**), 이름 바꾸기·삭제 |
  | 프로젝트 | `#/p/<id>` | 캡처 추가, 표시 도구(선택·번호·박스·화살표·메모, 옮기기·지우기·번호 다시 매김), **번호는 어느 도구에서든 누르면 지시문·끌면 이동, 더블 클릭하면 번호만 이동(원래 자리와 점선)**, 되돌리기 50단계, **지시문이 그림 위 라벨로도 보임(토글)**, 오른쪽 **[용어] 서랍**(화면 폭과 상관없이 오른쪽에서 밀려 나옴, 프로젝트 화면 크기는 그대로, 고른 번호에 문구 넣기), 내보내기 = 표시된 PNG 저장/복사 + 지시문 복사(화면·프로젝트 전체). 움직임은 "준비 중" |
  | 단계 안내 | `#/p/<id>/guide` | 7단계 체크·내 항목 추가/삭제, 진행 막대 |
  | 용어 사전 | `#/glossary` | 56개를 쓰임새 6분류(화면 틀·부품·입력·알림·손짓·모양·꾸밈)로, CSS 미리보기(꾸밈은 전/후), 누르면 자세히·문구 복사·**헷갈리기 쉬운 말** 13쌍 |
  | 설정 | `#/settings` | AI 연결(기본 꺼짐, Claude/ChatGPT, 키는 이 기기 localStorage, 연결 시험) |
- 저장: IndexedDB(`src/platform/idbStore.ts`, 형식 버전 1). 새로고침해도 유지.
- AI 다듬기: 메모 + 지금 캡처 1장 → 확인 시트 → 전송 → 결과 복사. **실제 API 키로는 아직 안 해 봄.**
- **오픈소스(GPL-3.0)로 공개 준비 완료**: README·LICENSE·`.github/workflows/deploy.yml`(main push → `npm run check` → GitHub Pages). AI 작업 문서는 git 밖(이 PC에만).
- **공개 중**: 저장소 https://github.com/stlemm-rgb/multimodal · 웹 https://stlemm-rgb.github.io/multimodal/ (main push → 검사 → 자동 배포)

## 폴더 (일 나누는 단위)
| 폴더 | 내용 | 기본 담당 |
| --- | --- | --- |
| `src/core/` | 순수 로직: project·stages·storage 인터페이스·llm 글 만들기·지시문 | `core-dev` |
| `src/core/data/stages.ts` | 단계·체크 항목 문구 | Codex 하청 |
| `src/platform/` | 브라우저·기기 닿는 코드(IndexedDB·클립보드·파일·설정·LLM 호출). 안드로이드 때 여기만 | `core-dev` |
| `src/ui/`, `src/screens/`, `src/editor/`, `src/glossary/` | 화면 | `frontend` |
| `tests/unit/`, `tests/e2e/` | Vitest, Playwright(설치된 Chrome) | 만든 쪽 |

## 다음 할 일 (추천 순서)
1. **사용자가 직접 한 바퀴**: `npm run dev` → 새 프로젝트 → 캡처 → 단계 체크 → (API 키 있으면) AI 다듬기. 막히는 곳 메모.
2. **내보낸 PNG + 지시문을 실제 AI(Claude·ChatGPT)에 붙여 넣어 시험** — 잘 알아듣는지, 형식(`src/core/instructions.ts`)을 고칠지.
3. 알려진 점: 번호끼리 겹치면 아래 번호가 가려짐(지금은 더블 클릭으로 손으로 비켜 놓음, 자동 비키기는 검토), 실제 폰·Safari 미확인
4. 용어 사전: 검색창(56개라 찾기 어려움), 글자 굵기 미리보기 보강. 움직임 표시(편집기)
5. 안드로이드: Capacitor 감싸기 (웹 첫 버전 뒤)

## 사용자가 할 일
- AI 작업 문서는 git 밖 → PC를 옮길 때마다 `multimodal-ai-docs.zip`으로 옮긴다 (RUNBOOK "새 PC 준비")

## 작은 정리 거리
- workflow 경고: actions 버전(Node 20 낡음), ubuntu-latest → Ubuntu 26 이동
