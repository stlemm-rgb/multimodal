# HANDOFF — 지금 상태와 남은 일

> 마지막 갱신: 2026-10-25 (앱 틀 완성 직후). 기획 원본은 docs/PRODUCT.md

## 지금 상태
- Vite + React + TS 웹앱. CapCut식 어두운 화면. `npm run check` 통과(단위 36 · 화면 28).
  | 화면 | 주소 | 되는 것 |
  | --- | --- | --- |
  | 홈 | `#/` | 새 프로젝트, 프로젝트 카드(썸네일·단계 진행·**지금 단계와 남은 항목 2개 바로 체크**), 이름 바꾸기·삭제 |
  | 프로젝트 | `#/p/<id>` | 캡처 추가, 표시 도구(선택·번호·박스·화살표·메모, 옮기기·지우기·번호 다시 매김), 되돌리기 50단계, **지시문이 그림 위 라벨로도 보임(토글)**, 오른쪽 **[용어] 패널**(넓으면 옆에 붙고 폰은 밀려 나옴, 고른 번호에 문구 넣기), 내보내기 = 표시된 PNG 저장/복사 + 지시문 복사(화면·프로젝트 전체). 움직임은 "준비 중" |
  | 단계 안내 | `#/p/<id>/guide` | 7단계 체크·내 항목 추가/삭제, 진행 막대 |
  | 용어 사전 | `#/glossary` | 그림으로 보는 용어 12 · 움직임이 있는 용어 12(CSS 애니메이션 썸네일), 누르면 자세히·문구 복사 |
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
3. 알려진 점: 핀이 가리킨 글자를 덮음(핀을 살짝 비켜 놓는 방식 검토), 실제 폰·Safari 미확인
4. 용어 사전 항목 늘리기 (Codex 하청), 움직임 표시
5. 안드로이드: Capacitor 감싸기 (웹 첫 버전 뒤)

## 사용자가 할 일
- AI 작업 문서 백업 방법 정하기 (git 밖이라 이 PC가 망가지면 사라짐)

## 작은 정리 거리
- workflow 경고: actions 버전(Node 20 낡음), ubuntu-latest → Ubuntu 26 이동
