import type { Dictionary } from './types';

export const coding: Dictionary = {
  id: 'coding',
  label: '개발 용어',
  exampleTitle: 'AI에게는 이렇게 말하세요',
  forAi: true,
  categories: [
    {
      id: 'release',
      label: '만들기·올리기',
    },
    {
      id: 'data',
      label: '저장·데이터',
    },
    {
      id: 'debug',
      label: '고장·고치기',
    },
    {
      id: 'version',
      label: '코드 관리',
    },
    {
      id: 'security',
      label: '보안',
    },
    {
      id: 'plan',
      label: '계획·기획',
    },
  ],
  terms: [
    {
      id: 'deploy',
      category: 'release',
      name: '배포',
      english: 'Deploy',
      meaning:
        '만든 앱을 다른 사람도 쓸 수 있는 곳에 올려요. 내 컴퓨터에서 확인한 수정은 배포해야 공개 앱에도 반영돼요.',
      sayToAi:
        '메모 앱의 수정 내용을 확인한 뒤 배포(Deploy)해서 휴대폰에서도 볼 수 있게 해 주세요.',
    },
    {
      id: 'frontend',
      category: 'release',
      name: '프런트엔드',
      english: 'Frontend',
      meaning:
        '사용자가 보고 누르는 화면 쪽을 말해요. 버튼의 모양과 화면에서 일어나는 동작을 만들어요.',
      sayToAi: '카페 주문 앱의 프런트엔드(Frontend)에서 메뉴 사진과 주문 버튼을 크게 해 주세요.',
    },
    {
      id: 'backend',
      category: 'release',
      name: '백엔드',
      english: 'Backend',
      meaning:
        '화면 뒤에서 요청을 처리하고 데이터를 다루는 쪽이에요. 주문 저장이나 로그인 확인 같은 일을 맡아요.',
      sayToAi: '카페 주문을 저장하는 백엔드(Backend)가 어떻게 동작하는지 설명해 주세요.',
    },
    {
      id: 'build',
      category: 'release',
      name: '빌드',
      english: 'Build',
      meaning:
        '작성한 코드를 실행하거나 배포할 수 있는 파일로 바꿔요. 빌드가 끝나도 인터넷에 자동으로 공개되지는 않아요.',
      sayToAi: '메모 앱의 빌드(Build)를 실행하고 실패한 부분이 있으면 설명해 주세요.',
    },
    {
      id: 'local',
      category: 'release',
      name: '로컬',
      english: 'Local',
      meaning:
        '외부 서버가 아닌 내 기기 안의 환경을 말해요. 앱을 공개하기 전에 내 컴퓨터에서 실행해 볼 때 자주 써요.',
      sayToAi: '일정 앱을 로컬(Local)에서 실행하는 방법을 쉬운 순서로 안내해 주세요.',
    },
    {
      id: 'package',
      category: 'release',
      name: '패키지 설치',
      english: 'Package installation',
      meaning:
        '다른 사람이 묶어 둔 코드를 가져와 쓸 준비를 해요. 필요한 기능을 모두 처음부터 만들지 않아도 돼요.',
      sayToAi: '일정 앱에 필요한 달력 패키지 설치(Package installation)를 진행해 주세요.',
    },
    {
      id: 'framework',
      category: 'release',
      name: '프레임워크',
      english: 'Framework',
      meaning:
        '앱을 만들 때 따르는 기본 구조와 도구 묶음이에요. 자주 필요한 기능을 정해진 방식으로 만들도록 도와줘요.',
      sayToAi: '메모 앱에 사용한 프레임워크(Framework)의 역할을 쉬운 말로 설명해 주세요.',
    },
    {
      id: 'responsive',
      category: 'release',
      name: '반응형',
      english: 'Responsive design',
      meaning:
        '화면 너비에 맞춰 글과 버튼의 크기나 배치를 바꿔요. 휴대폰과 컴퓨터에서 모두 편하게 쓰도록 만들어요.',
      sayToAi: '쇼핑몰 상품 목록에 반응형(Responsive design)을 적용해 주세요.',
    },
    {
      id: 'server',
      category: 'data',
      name: '서버',
      english: 'Server',
      meaning:
        '다른 기기의 요청을 받아 응답하는 컴퓨터나 프로그램이에요. 주문을 받거나 저장된 내용을 돌려주는 일을 해요.',
      sayToAi: '카페 주문 앱의 서버(Server)가 응답하지 않는 원인을 확인해 주세요.',
    },
    {
      id: 'database',
      category: 'data',
      name: '데이터베이스',
      english: 'Database',
      meaning:
        '여러 데이터를 정리해 저장하고 찾아 쓰는 곳이에요. 회원 정보나 주문 내역을 보관할 때 많이 써요.',
      sayToAi: '운동 기록을 날짜별로 저장하도록 데이터베이스(Database)를 구성해 주세요.',
    },
    {
      id: 'api',
      category: 'data',
      name: 'API 연결',
      english: 'API',
      meaning:
        '프로그램끼리 정해진 방식으로 요청하고 결과를 주고받는 통로예요. 화면에서 서버의 기능을 부를 때도 써요.',
      sayToAi: '일정 앱에서 날씨를 가져오는 API를 연결해 주세요.',
    },
    {
      id: 'cache',
      category: 'data',
      name: '캐시',
      english: 'Cache',
      meaning:
        '다시 쓸 내용을 가까운 곳에 잠시 저장해 빠르게 불러와요. 예전 내용이 남아 수정이 안 보일 때도 있어요.',
      sayToAi: '블로그의 예전 사진이 계속 보이는 이유가 캐시(Cache) 때문인지 확인해 주세요.',
    },
    {
      id: 'json',
      category: 'data',
      name: 'JSON 데이터',
      english: 'JSON',
      meaning:
        '이름과 값의 짝, 목록 등으로 데이터를 적는 글 형식이에요. 프로그램 사이에서 정보를 주고받을 때 많이 써요.',
      sayToAi: '메모 목록을 JSON 파일로 내보내는 기능을 추가해 주세요.',
    },
    {
      id: 'bug',
      category: 'debug',
      name: '버그',
      english: 'Bug',
      meaning:
        '앱이 의도와 다르게 움직이게 하는 결함이에요. 버튼이 작동하지 않거나 계산이 틀리는 것도 포함해요.',
      sayToAi: '카페 주문 수량이 두 번 늘어나는 버그(Bug)를 수정해 주세요.',
    },
    {
      id: 'debugging',
      category: 'debug',
      name: '디버깅',
      english: 'Debugging',
      meaning:
        '문제가 생기는 조건과 원인을 찾아 고치는 과정이에요. 같은 문제를 다시 일으켜 보며 확인하기도 해요.',
      sayToAi: '메모 저장이 실패하는 상황을 재현하며 디버깅(Debugging)을 진행해 주세요.',
    },
    {
      id: 'error-message',
      category: 'debug',
      name: '오류 메시지',
      english: 'Error message',
      meaning:
        '문제가 생겼을 때 프로그램이 보여 주는 설명이에요. 어디서 무엇이 실패했는지 찾는 단서가 돼요.',
      sayToAi: '일정 앱에 뜬 오류 메시지(Error message)의 뜻과 해결 방법을 설명해 주세요.',
    },
    {
      id: 'log',
      category: 'debug',
      name: '로그',
      english: 'Log',
      meaning:
        '프로그램이 한 일이나 일어난 문제를 남긴 기록이에요. 문제가 발생한 순서와 상황을 살펴볼 때 써요.',
      sayToAi: '쇼핑몰 결제 실패 시점의 로그(Log)를 확인해 주세요.',
    },
    {
      id: 'console',
      category: 'debug',
      name: '콘솔',
      english: 'Console',
      meaning:
        '개발 중 기록과 오류를 확인하거나 명령을 입력하는 창이에요. 웹에서는 브라우저 개발 도구 안에서 볼 수 있어요.',
      sayToAi: '메모 앱의 콘솔(Console)에 뜬 빨간 오류를 읽고 원인을 설명해 주세요.',
    },
    {
      id: 'test',
      category: 'debug',
      name: '테스트',
      english: 'Test',
      meaning:
        '앱이 기대한 대로 동작하는지 확인해요. 손으로 눌러 보거나 자동 검사 코드로 반복 확인할 수 있어요.',
      sayToAi: '일정 앱에서 날짜를 바꿔도 약속이 유지되는지 테스트(Test)해 주세요.',
    },
    {
      id: 'refactoring',
      category: 'debug',
      name: '리팩터링',
      english: 'Refactoring',
      meaning:
        '겉으로 보이는 동작을 유지하며 코드 구조를 정리해요. 이후에 읽고 수정하기 쉽게 만드는 작업이에요.',
      sayToAi: '메모 앱의 중복된 저장 코드를 리팩터링(Refactoring)해 주세요.',
    },
    {
      id: 'commit',
      category: 'version',
      name: '커밋',
      english: 'Commit',
      meaning:
        '코드의 변경 내용을 설명과 함께 한 시점의 기록으로 남겨요. 나중에 무엇을 왜 바꿨는지 확인할 수 있어요.',
      sayToAi: '메모 앱의 저장 오류 수정을 확인한 뒤 커밋(Commit)해 주세요.',
    },
    {
      id: 'github',
      category: 'version',
      name: '깃허브',
      english: 'GitHub',
      meaning:
        '코드 저장소를 인터넷에 보관하고 함께 작업하는 서비스예요. 변경 기록을 공유하고 수정 의견을 주고받아요.',
      sayToAi: '일정 앱 코드를 깃허브(GitHub)에 비공개 저장소로 올리는 방법을 안내해 주세요.',
    },
    {
      id: 'repository',
      category: 'version',
      name: '저장소',
      english: 'Repository',
      meaning:
        '프로젝트 파일과 변경 기록을 모아 관리하는 곳이에요. 내 컴퓨터에도 있고 인터넷 서비스에도 둘 수 있어요.',
      sayToAi: '메모 앱의 저장소(Repository)에서 폴더별 역할을 설명해 주세요.',
    },
    {
      id: 'branch',
      category: 'version',
      name: '브랜치',
      english: 'Branch',
      meaning:
        '기존 작업과 나누어 코드를 바꿔 보는 작업 흐름이에요. 새 기능을 확인한 뒤 원래 흐름에 합칠 수 있어요.',
      sayToAi: '일정 앱의 알림 기능을 별도 브랜치(Branch)에서 작업해 주세요.',
    },
    {
      id: 'revert',
      category: 'version',
      name: '되돌리기',
      english: 'Revert',
      meaning:
        '이전 커밋의 변경을 취소하는 새 기록을 만들어요. 이미 남긴 기록을 지우지 않고 수정 전 동작으로 돌아가요.',
      sayToAi: '메모 앱의 최신 커밋을 확인하고 해당 변경만 되돌리기(Revert)해 주세요.',
    },
    {
      id: 'merge',
      category: 'version',
      name: '병합',
      english: 'Merge',
      meaning:
        '나누어 작업한 코드 변경을 한 흐름으로 합쳐요. 같은 부분을 서로 다르게 고쳤다면 조정이 필요해요.',
      sayToAi: '일정 앱의 알림 브랜치를 검토한 뒤 기본 브랜치에 병합(Merge)해 주세요.',
    },
    {
      id: 'env-variable',
      category: 'security',
      name: '환경 변수',
      english: 'Environment variable',
      meaning:
        '실행 환경에서 프로그램에 전달하는 설정값이에요. 서버 주소 등에 쓰며, 화면 코드에 포함되면 비밀값은 노출될 수 있어요.',
      sayToAi: '쇼핑몰의 개발용 서버 주소를 환경 변수(Environment variable)로 분리해 주세요.',
    },
    {
      id: 'api-key',
      category: 'security',
      name: 'API 키',
      english: 'API key',
      meaning:
        '외부 서비스가 호출자를 구별할 때 쓰는 값이에요. 비밀 키가 노출되면 다른 사람이 내 권한이나 사용량을 쓸 수 있어요.',
      sayToAi: '일정 앱의 날씨 API 키가 공개 코드에 들어갔는지 확인해 주세요.',
    },
    {
      id: 'authentication',
      category: 'security',
      name: '로그인 인증',
      english: 'Authentication',
      meaning:
        '접속한 사람이 누구인지 확인하는 과정이에요. 비밀번호나 외부 계정 등으로 본인임을 확인해요.',
      sayToAi: '메모 앱에서 본인 계정으로 들어오도록 로그인 인증(Authentication)을 추가해 주세요.',
    },
    {
      id: 'authorization',
      category: 'security',
      name: '권한 확인',
      english: 'Authorization',
      meaning:
        '확인된 사용자가 무엇을 보거나 바꿀 수 있는지 검사해요. 로그인한 사람도 다른 사람의 자료는 못 보게 할 수 있어요.',
      sayToAi:
        '메모 앱에서 다른 사람의 메모를 읽지 못하도록 권한 확인(Authorization)을 추가해 주세요.',
    },
    {
      id: 'issue',
      category: 'debug',
      name: '이슈',
      english: 'Issue',
      meaning: '고치거나 정해야 할 일 하나하나예요. 오류뿐 아니라 새 기능 요청도 이슈라고 해요.',
      sayToAi: '결제가 두 번 되는 문제를 이슈(Issue)로 정리하고, 원인과 고칠 순서를 알려 주세요.',
    },
    {
      id: 'blocker',
      category: 'debug',
      name: '블로커',
      english: 'Blocker',
      meaning: '해결하기 전까지 다음 일을 못 하게 막는 문제예요.',
      sayToAi:
        '지금 작업을 막고 있는 블로커(Blocker)가 무엇인지 먼저 알려 주고, 그것부터 해결해 주세요.',
    },
    {
      id: 'hotfix',
      category: 'debug',
      name: '핫픽스',
      english: 'Hotfix',
      meaning: '이미 쓰고 있는 앱의 급한 오류를 빠르게 고쳐 바로 반영하는 것이에요.',
      sayToAi:
        '쇼핑몰 결제 오류만 고치는 핫픽스(Hotfix)를 만들고, 다른 기능은 건드리지 말아 주세요.',
    },
    {
      id: 'rollback',
      category: 'release',
      name: '롤백',
      english: 'Rollback',
      meaning: '새로 올린 버전에 문제가 있을 때 바로 앞 버전으로 되돌리는 것이에요.',
      sayToAi:
        '방금 배포한 버전에서 로그인이 안 되면 이전 버전으로 롤백(Rollback)하는 방법을 알려 주세요.',
    },
    {
      id: 'launch',
      category: 'release',
      name: '런칭',
      english: 'Launch',
      meaning: '만든 앱이나 서비스를 사람들에게 처음 공개하는 것이에요.',
      sayToAi: '메모 앱 런칭(Launch) 전에 꼭 확인할 것을 목록으로 정리해 주세요.',
    },
    {
      id: 'backlog',
      category: 'plan',
      name: '백로그',
      english: 'Backlog',
      meaning: '지금 당장은 아니지만 나중에 할 기능과 고칠 일을 모아 둔 목록이에요.',
      sayToAi: '이번에 못 하는 기능은 백로그(Backlog)에 적어 두고, 중요한 순서로 정렬해 주세요.',
    },
    {
      id: 'milestone',
      category: 'plan',
      name: '마일스톤',
      english: 'Milestone',
      meaning: '긴 작업 중간에 꼭 도달할 목표 지점이에요. 예: 로그인까지 완성.',
      sayToAi:
        '일정 앱을 3개의 마일스톤(Milestone)으로 나누고, 각 단계에서 끝낼 기능을 정해 주세요.',
    },
    {
      id: 'sprint',
      category: 'plan',
      name: '스프린트',
      english: 'Sprint',
      meaning: '1~2주처럼 짧게 정한 기간에 할 일을 묶어 끝내는 방식이에요.',
      sayToAi:
        '이번 주를 한 스프린트(Sprint)로 보고, 장바구니 기능까지 끝낼 할 일 목록을 만들어 주세요.',
    },
    {
      id: 'wireframe',
      category: 'plan',
      name: '와이어프레임',
      english: 'Wireframe',
      meaning: '색과 꾸밈 없이 무엇을 어디에 놓을지만 그린 화면 밑그림이에요.',
      sayToAi: '카페 주문 화면의 와이어프레임(Wireframe)을 먼저 글 상자로 그려서 보여 주세요.',
    },
    {
      id: 'mockup',
      category: 'plan',
      name: '목업',
      english: 'Mockup',
      meaning: '색과 글꼴까지 넣어 완성 모습을 미리 보여 주는 화면 시안이에요.',
      sayToAi: '와이어프레임이 정해지면 실제 색과 글꼴을 넣은 목업(Mockup)으로 보여 주세요.',
    },
  ],
  confusions: [
    {
      a: 'wireframe',
      b: 'mockup',
      difference: '와이어프레임은 배치만 그린 밑그림이고, 목업은 색까지 넣은 완성 시안이에요.',
    },
    {
      a: 'hotfix',
      b: 'rollback',
      difference: '핫픽스는 문제를 빨리 고쳐 올리고, 롤백은 고치지 않고 앞 버전으로 되돌려요.',
    },
    {
      a: 'server',
      b: 'database',
      difference: '서버는 요청을 받아 처리하고, 데이터베이스는 데이터를 정리해 저장하고 찾아 줘요.',
    },
    {
      a: 'commit',
      b: 'deploy',
      difference: '커밋은 코드 변경을 기록하고, 배포는 바뀐 앱을 사용자가 쓸 수 있게 올려요.',
    },
    {
      a: 'frontend',
      b: 'backend',
      difference:
        '프런트엔드는 사용자가 보는 화면을 다루고, 백엔드는 뒤에서 요청과 데이터를 처리해요.',
    },
    {
      a: 'build',
      b: 'deploy',
      difference: '빌드는 실행할 파일을 만들고, 배포는 그 파일을 사용자가 접근할 곳에 올려요.',
    },
    {
      a: 'authentication',
      b: 'authorization',
      difference:
        '로그인 인증은 누구인지 확인하고, 권한 확인은 어떤 자료나 기능을 쓸 수 있는지 검사해요.',
    },
  ],
};
