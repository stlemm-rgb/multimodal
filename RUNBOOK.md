# RUNBOOK — 절차서

> 설치·실행·검사 명령. 같은 실수를 두 번 하면 여기에 적는다.
> ⚠️ 프로젝트 뼈대가 아직 없다. 아래 "실행·검사"는 Codex가 환경을 구성하면서 실제 명령으로 채운다 (HANDOFF.md "다음 할 일").

## 새 PC 준비
1. Git 설치 후 처음 한 번:
   ```powershell
   git config --global user.name "stlemm"
   git config --global user.email "stlemm@gmail.com"
   git config --global core.autocrlf true
   ```
2. 필요한 것: **Node.js 22 이상** (`node --version`), Chrome(자동 화면 검사용)
3. 저장소 받기 → `npm install` → 전체 검사 통과 확인
4. HANDOFF.md부터 읽고 이어서 작업
5. PC를 옮길 때는 끝낸 PC에서 커밋·push, 새 PC에서 `git pull` 먼저. 한 번에 한 PC에서만

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

## 실행·검사 (Codex가 채울 것)
| 명령 | 하는 일 |
| --- | --- |
| `npm install` | 의존성 설치 |
| `npm run dev` | 개발 서버 (주소: 채울 것) |
| `npm run build` | 배포용 빌드 |
| `npm run check` | **전체 검사 (커밋 전 필수)**: 타입 검사 + 린트 + 단위 시험 + 빌드 (+ 화면 검사) |

## 배포
(정적 호스팅 설정 후 적기)

## 겪은 실수
- **검사 결과를 파이프로 자르고 커밋하지 말 것**: `check | tail -1 && git commit` 은 실패해도 종료 코드가 0이 되어 커밋된다. 출력은 파일로 받고 종료 코드로 판단한다.
- Git Bash에서 `python`이 Microsoft Store 바로가기로 잡혀 아무 출력 없이 끝남 → `py`로 실행
- Codex가 PowerShell 5.1로 한글 파일을 읽으면 깨진다 → 지시에 `Get-Content -Encoding UTF8` 명시
- `codex exec` 출력을 파일로 돌리면 stdin을 기다리며 멈춘다 → 끝에 `< /dev/null`
- Codex 샌드박스는 브라우저를 못 띄우고 인터넷도 막혀 있다 → 화면 확인·`npm install`은 Claude가
- Edge 헤드리스는 이 PC에서 아무것도 출력하지 않은 적 있음 → 자동 화면 검사는 Chrome을 먼저 쓴다
