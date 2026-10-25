# 화면으로 설명하기 (multimodal)

> 코딩을 몰라도, 화면을 보여 주며 AI에게 원하는 걸 말할 수 있게.

AI로 앱을 만드는 "바이브 코딩"을 하다 보면, 원하는 모습을 말로 설명하기가 가장 어렵습니다.
"저 아래에서 올라오는 창"이 **바텀시트**라는 걸 모르면 AI도 엉뚱한 걸 만들어요.

이 도구는 그 사이를 이어 줍니다.

- **캡처에 표시하기** — 화면 캡처나 다른 앱 화면에 번호·박스·화살표·메모를 얹고, 번호마다 한 줄씩 지시문을 붙여 어느 AI에나 붙여 넣을 수 있게 내보냅니다. *(만드는 중)*
- **UI 용어 사전** — 스켈레톤, 칩, 바텀시트 같은 화면 부품을 실제 모습과 함께 보여 주고 "AI에게는 이렇게 말하세요"를 알려 줍니다.
- **프로젝트 단계 안내** — 아이디어 정리부터 출시 준비까지 7단계 체크 목록. 내 항목도 더할 수 있어요.
- **AI 연결 (선택)** — Claude나 ChatGPT API 키를 넣으면 지시문을 다듬어 줍니다. 기본은 꺼짐이고, 보낼 때마다 확인한 뒤에만 전송돼요.

## 바로 써 보기

👉 **https://stlemm-rgb.github.io/multimodal/** (설치 없음, 폰에서도 됨)

사진과 프로젝트는 **내 브라우저 안에만** 저장돼요. 서버로 올라가지 않습니다.

## 지금 상태

초기 버전(0.1)입니다. 되는 것: 프로젝트 만들기·캡처 추가·단계 체크·용어 사전(2개)·AI 연결 설정.
만드는 중: 번호·박스·화살표 표시 도구, 표시된 이미지 내보내기, 움직임 표시, 용어 늘리기, 안드로이드 앱.

## 같이 만들기

써 보다가 불편한 점, 있었으면 하는 기능, 용어 사전에 넣을 용어는 **Issues**에 편하게 남겨 주세요. 코딩을 몰라도 괜찮습니다.

코드를 고치고 싶다면:

```bash
npm install
npm run dev      # http://127.0.0.1:5173
npm run check    # 보내기 전 전체 검사 (타입·린트·시험·빌드·화면 검사, Chrome 필요)
```

Node.js 22 이상이 필요합니다. 자세한 명령은 [RUNBOOK.md](RUNBOOK.md), 기획은 [docs/PRODUCT.md](docs/PRODUCT.md).

## English

A tool that helps non-developers ("vibe coders") explain what they want to an AI by marking up screenshots, learning UI component names (bottom sheet, chip, skeleton…), and following a step-by-step project checklist. Everything stays in your browser; optional Claude/ChatGPT connection uses your own API key and asks before every send. The UI is in Korean for now.

## 라이선스

[GPL-3.0](LICENSE)
