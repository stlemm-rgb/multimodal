# RUNBOOK — 절차서

> 설치·실행·검사 명령. 같은 실수를 두 번 하면 여기에 적는다.

## 새 PC 준비
1. Git 설치 후 처음 한 번:
   ```powershell
   git config --global core.autocrlf true
   ```
   저장소를 받은 뒤, 공개 저장소라 이메일은 **GitHub 비공개 주소**로 (저장소 안에서만):
   `git config user.email "<GitHub 숫자 ID>+<아이디>@users.noreply.github.com"` — 주소는 GitHub 설정 → Emails에서 확인
2. **AI 작업 문서**(CLAUDE.md·AGENTS.md·`.claude/`·`refs/`)는 git에 올라가지 않는다. 새 PC로 옮길 때는 따로 복사한다.
3. 필요한 것: **Node.js 22 이상** (`node --version`), Chrome(자동 화면 검사용)
4. 저장소 받기 → `npm install` → 전체 검사 통과 확인
5. HANDOFF.md부터 읽고 이어서 작업
6. PC를 옮길 때는 끝낸 PC에서 커밋·push, 새 PC에서 `git pull` 먼저. 한 번에 한 PC에서만

## 커밋 순서 (매번)
```bash
git pull                      # 원격 연결 후
npm run check > check.log 2>&1; echo $?   # 0이 아니면 커밋하지 않는다
git log --oneline -3          # 다른 쪽이 커밋했는지 확인
git add 파일1 파일2           # 이름으로만
git commit -m "무엇을 했나"
git push                      # 원격 연결 후
```

## git 문제가 생기면
| 증상 | 뜻 | 할 일 |
| --- | --- | --- |
| push가 `rejected` | 다른 PC에서 먼저 올린 게 있음 | `git pull` 후 다시 `git push` |
| pull 때 `Your local changes ... would be overwritten` | 이 PC에 커밋 안 한 변경이 있음 | 살리려면 커밋한 뒤 `git pull`. 버려도 되는지는 AI에게 먼저 물어보기 |
| `CONFLICT` (충돌) | 두 PC에서 같은 파일을 따로 고침 | **더 진행하지 말고** 화면을 AI에게 보여 주기 |

## 실행·검사
| 명령 | 하는 일 |
| --- | --- |
| `npm install` | 의존성 설치 (Node.js 22 이상, 최초 한 번) |
| `npm run dev` | 개발 서버: http://127.0.0.1:5173 (Ctrl+C로 종료) |
| `npm run typecheck` | TypeScript 타입 검사 |
| `npm run lint` | 코드 규칙 검사 (경고도 실패로 처리) |
| `npm run format` | 작성한 앱·시험·설정 파일의 서식 정리 |
| `npm run test` | 지시문 생성 로직 단위 시험 (Vitest) |
| `npm run build` | 타입 검사 후 `dist/`에 배포용 파일 만들기 |
| `npm run e2e` | 빌드된 화면 자동 검사 (먼저 `npm run build` 실행) |
| `npm run check` | **전체 검사 (커밋 전 필수)**: 타입 검사 → 린트 → 단위 시험 → 빌드 → 화면 검사. 하나라도 실패하면 즉시 중단하고 실패 종료 코드를 반환 |

- 개발 화면: 편집기 http://127.0.0.1:5173/#/ · 용어 사전 http://127.0.0.1:5173/#/glossary
- 화면 검사는 PC에 설치된 **Google Chrome**을 쓴다. Playwright용 브라우저를 따로 내려받는 명령은 필요 없다.
- 화면 검사 때 `vite preview`가 http://127.0.0.1:4173 에서 자동으로 시작·종료된다. 이 포트는 비워 둔다.
- 화면 크기 390×844와 1280×800에서 메뉴 이동·콘솔 오류·가로 넘침·이미지 불러오기를 확인한다.
- 첫 설치·전체 검사·실제 화면 확인은 Claude가 수행한다. Codex 환경 구성 단계에서는 설치와 검사를 실행하지 않았다.
- PowerShell에서는 `npm run check` 바로 다음에 `$LASTEXITCODE`를 확인한다. `0`이어야 통과다.

## 배포
(정적 호스팅 설정 후 적기)

## 겪은 실수
- **검사 결과를 파이프로 자르고 커밋하지 말 것**: `check | tail -1 && git commit` 은 실패해도 종료 코드가 0이 되어 커밋된다. 출력은 파일로 받고 종료 코드로 판단한다.
- Git Bash에서 `python`이 Microsoft Store 바로가기로 잡혀 아무 출력 없이 끝남 → `py`로 실행
- Codex가 PowerShell 5.1로 한글 파일을 읽으면 깨진다 → 지시에 `Get-Content -Encoding UTF8` 명시
- `codex exec` 출력을 파일로 돌리면 stdin을 기다리며 멈춘다 → 끝에 `< /dev/null`
- Codex 샌드박스는 브라우저를 못 띄우고 인터넷도 막혀 있다 → 화면 확인·`npm install`은 Claude가
- Edge 헤드리스는 이 PC에서 아무것도 출력하지 않은 적 있음 → 자동 화면 검사는 Chrome을 먼저 쓴다
