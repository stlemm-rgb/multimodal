import type { Dictionary } from './types';

export const pangyo: Dictionary = {
  id: 'pangyo',
  label: '판교 사투리',
  exampleTitle: '쉬운 말로 바꾸면',
  forAi: false,
  categories: [
    {
      id: 'meeting',
      label: '회의',
    },
    {
      id: 'schedule',
      label: '일정',
    },
    {
      id: 'work',
      label: '일하는 방식',
    },
    {
      id: 'problem',
      label: '문제·대응',
    },
    {
      id: 'planning',
      label: '기획',
    },
  ],
  terms: [
    {
      id: 'align',
      category: 'meeting',
      name: '얼라인',
      english: 'Align',
      meaning:
        '영어로 줄을 맞춘다는 뜻이에요. 회사에서는 목표나 생각, 일의 방향을 서로 맞출 때 써요.',
      sayToAi: '"이번 주까지 얼라인 맞춰 주세요" → "이번 주까지 서로 생각을 맞춰 주세요"',
    },
    {
      id: 'sync',
      category: 'meeting',
      name: '싱크',
      english: 'Sync',
      meaning:
        '영어로 서로 맞추거나 동기화한다는 뜻이에요. 회사에서는 진행 상황이나 알고 있는 정보를 함께 맞출 때 써요.',
      sayToAi: '"오후에 진행 상황 싱크 한번 하죠" → "오후에 서로 어디까지 했는지 공유하죠"',
    },
    {
      id: 'confirm',
      category: 'meeting',
      name: '컨펌',
      english: 'Confirm',
      meaning:
        '영어로 확인하거나 확정한다는 뜻이에요. 회사에서는 내용이 맞는지 확인받거나 진행 승인을 받을 때 써요.',
      sayToAi: '"이 시안 팀장님 컨펌 받았나요?" → "이 시안을 팀장님이 확인하고 승인했나요?"',
    },
    {
      id: 'feedback',
      category: 'meeting',
      name: '피드백',
      english: 'Feedback',
      meaning:
        '영어로 결과에 대한 반응이나 의견을 뜻해요. 회사에서는 잘된 점이나 고칠 점을 알려 줄 때 써요.',
      sayToAi: '"시안 보시고 피드백 부탁드려요" → "시안을 보고 좋은 점과 고칠 점을 알려 주세요"',
    },
    {
      id: 'kickoff',
      category: 'meeting',
      name: '킥오프',
      english: 'Kickoff',
      meaning:
        '영어로 경기나 일의 시작을 뜻해요. 회사에서는 일을 시작하며 목표와 역할을 정하는 첫 모임을 말해요.',
      sayToAi:
        '"월요일에 새 프로젝트 킥오프 잡아 주세요" → "월요일에 새 일의 목표와 역할을 정하는 첫 회의를 잡아 주세요"',
    },
    {
      id: 'daily',
      category: 'meeting',
      name: '데일리',
      english: 'Daily',
      meaning:
        '영어로 매일이라는 뜻이에요. 회사에서는 진행 상황과 막힌 일을 짧게 나누는 매일의 회의를 가리켜요.',
      sayToAi:
        '"내일 데일리 때 블로커 공유해 주세요" → "내일 짧은 정기 회의에서 일을 막는 문제를 알려 주세요"',
    },
    {
      id: 'asap',
      category: 'schedule',
      name: '아삽',
      english: 'ASAP',
      meaning:
        '가능한 한 빨리라는 영어 표현의 줄임말이에요. 급한 부탁에 쓰지만 정확한 마감 시각은 따로 확인해야 해요.',
      sayToAi: '"이 자료 아삽으로 부탁드려요" → "이 자료를 가능한 한 빨리 준비해 주세요"',
    },
    {
      id: 'deadline',
      category: 'schedule',
      name: '데드라인',
      english: 'Deadline',
      meaning:
        '영어로 마감 기한을 뜻해요. 회사에서는 일을 끝내거나 결과물을 내야 하는 마지막 시점을 말해요.',
      sayToAi: '"이번 작업 데드라인은 금요일이에요" → "이번 작업은 금요일까지 끝내야 해요"',
    },
    {
      id: 'milestone',
      category: 'schedule',
      name: '마일스톤',
      english: 'Milestone',
      meaning:
        '영어로 이정표나 중요한 단계를 뜻해요. 회사에서는 긴 작업 중 꼭 도달해야 할 중간 목표를 말해요.',
      sayToAi:
        '"이번 달 마일스톤은 첫 시제품 완성이에요" → "이번 달에 달성할 중간 목표는 첫 시제품 완성이에요"',
    },
    {
      id: 'backlog',
      category: 'schedule',
      name: '백로그',
      english: 'Backlog',
      meaning:
        '영어로 쌓여 있는 일을 뜻해요. 회사에서는 앞으로 할 기능이나 개선 작업을 모아 둔 목록을 말해요.',
      sayToAi: '"그 기능은 백로그에 넣어 두죠" → "그 기능은 나중에 할 일 목록에 적어 두죠"',
    },
    {
      id: 'priority',
      category: 'schedule',
      name: '프라이오리티',
      english: 'Priority',
      meaning:
        '영어로 우선순위나 우선권을 뜻해요. 회사에서는 여러 일 중 무엇을 먼저 할지 정할 때 써요.',
      sayToAi:
        '"로그인 오류 수정의 프라이오리티를 높여 주세요" → "로그인 오류 수정을 다른 일보다 먼저 해 주세요"',
    },
    {
      id: 'sprint',
      category: 'schedule',
      name: '스프린트',
      english: 'Sprint',
      meaning:
        '영어로 짧은 거리를 전력으로 달린다는 뜻이에요. 개발팀에서는 정해진 짧은 기간 동안 묶어서 진행하는 작업을 말해요.',
      sayToAi: '"이번 스프린트에는 검색까지 끝내죠" → "이번 작업 기간 안에 검색 기능까지 완성하죠"',
    },
    {
      id: 'resource',
      category: 'work',
      name: '리소스',
      english: 'Resource',
      meaning: '영어로 자원을 뜻해요. 회사에서는 일에 쓸 사람, 시간, 예산 등을 말해요.',
      sayToAi: '"이번 주는 리소스가 부족해요" → "이번 주는 이 일을 맡을 사람이나 시간이 부족해요"',
    },
    {
      id: 'follow-up',
      category: 'work',
      name: '팔로업',
      english: 'Follow-up',
      meaning:
        '영어로 뒤따르는 조치나 확인을 뜻해요. 회사에서는 앞서 논의한 일이 진행됐는지 챙길 때 써요.',
      sayToAi:
        '"지난 회의에서 나온 요청 팔로업 부탁드려요" → "지난 회의의 요청이 처리됐는지 확인하고 챙겨 주세요"',
    },
    {
      id: 'ping',
      category: 'work',
      name: '핑',
      english: 'Ping',
      meaning:
        '영어로 짧은 신호나 소리를 뜻해요. 회사에서는 메신저로 짧게 연락하거나 알려 달라는 뜻으로 써요.',
      sayToAi: '"자료 올라오면 저한테 핑 주세요" → "자료가 올라오면 저에게 메시지로 알려 주세요"',
    },
    {
      id: 'ownership',
      category: 'work',
      name: '오너십',
      english: 'Ownership',
      meaning:
        '영어로 소유권을 뜻해요. 회사에서는 맡은 일을 자기 일처럼 책임지고 끝까지 챙기는 태도를 말해요.',
      sayToAi:
        '"이 업무는 오너십을 갖고 진행해 주세요" → "이 업무는 맡아서 끝까지 책임지고 챙겨 주세요"',
    },
    {
      id: 'retrospective',
      category: 'work',
      name: '회고',
      english: 'Retrospective',
      meaning:
        '영어로 지난 일을 돌아본다는 뜻이에요. 팀에서는 작업 후 잘된 점과 다음에 바꿀 점을 함께 살펴봐요.',
      sayToAi:
        '"출시 끝나면 회고 한번 하죠" → "출시가 끝나면 잘된 점과 다음에 고칠 점을 함께 돌아보죠"',
    },
    {
      id: 'issue',
      category: 'problem',
      name: '이슈',
      english: 'Issue',
      meaning:
        '영어로 문제나 논의할 사안을 뜻해요. 회사에서는 오류뿐 아니라 확인하거나 결정할 일에도 써요.',
      sayToAi: '"결제 쪽 이슈가 하나 있어요" → "결제 쪽에서 확인하고 처리할 일이 하나 있어요"',
    },
    {
      id: 'blocker',
      category: 'problem',
      name: '블로커',
      english: 'Blocker',
      meaning:
        '영어로 무언가를 막는 대상을 뜻해요. 회사에서는 해결하기 전까지 다음 일을 진행하지 못하게 하는 문제를 말해요.',
      sayToAi:
        '"계정 권한이 없어서 블로커예요" → "계정 권한이 없어 다음 작업을 진행하지 못하고 있어요"',
    },
    {
      id: 'critical',
      category: 'problem',
      name: '크리티컬',
      english: 'Critical',
      meaning:
        '영어로 매우 중요하거나 심각하다는 뜻이에요. 회사에서는 서비스나 일정에 큰 영향을 주는 문제에 써요.',
      sayToAi:
        '"로그인이 안 되는 건 크리티컬해요" → "로그인이 안 되는 건 큰 영향을 주는 심각한 문제예요"',
    },
    {
      id: 'escalation',
      category: 'problem',
      name: '에스컬레이션',
      english: 'Escalation',
      meaning:
        '영어로 단계나 강도를 높인다는 뜻이에요. 회사에서는 해결하기 어려운 일을 상위 책임자에게 올려 도움을 구해요.',
      sayToAi:
        '"이 건은 팀장님께 에스컬레이션해 주세요" → "이 건은 팀장님께 알려 결정이나 도움을 요청해 주세요"',
    },
    {
      id: 'rollback',
      category: 'problem',
      name: '롤백',
      english: 'Rollback',
      meaning:
        '영어로 이전 상태로 되돌린다는 뜻이에요. 회사에서는 새로 적용한 변경에 문제가 있어 이전 버전으로 돌릴 때 써요.',
      sayToAi:
        '"배포 후 오류가 많아서 롤백하겠습니다" → "새 버전에서 오류가 많아 이전 버전으로 되돌리겠습니다"',
    },
    {
      id: 'hotfix',
      category: 'problem',
      name: '핫픽스',
      english: 'Hotfix',
      meaning:
        '영어로 긴급 수정을 뜻해요. 개발팀에서는 이미 쓰는 서비스의 급한 오류를 빠르게 고쳐 반영하는 작업을 말해요.',
      sayToAi: '"결제 오류는 오늘 핫픽스로 내죠" → "결제 오류는 오늘 긴급하게 고쳐 반영하죠"',
    },
    {
      id: 'develop',
      category: 'planning',
      name: '디벨롭',
      english: 'Develop',
      meaning:
        '영어로 발전시키거나 개발한다는 뜻이에요. 회사에서는 초안이나 아이디어를 더 구체적으로 다듬을 때 써요.',
      sayToAi:
        '"이 아이디어 조금 더 디벨롭해 주세요" → "이 아이디어를 실제로 어떻게 할지 더 구체적으로 다듬어 주세요"',
    },
    {
      id: 'needs',
      category: 'planning',
      name: '니즈',
      english: 'Needs',
      meaning:
        '영어로 필요로 하는 것을 뜻해요. 회사에서는 사용자나 고객이 원하는 것과 해결하고 싶은 문제를 말해요.',
      sayToAi:
        '"사용자 니즈부터 확인하죠" → "사용자가 무엇을 원하고 어떤 문제를 겪는지부터 확인하죠"',
    },
    {
      id: 'insight',
      category: 'planning',
      name: '인사이트',
      english: 'Insight',
      meaning:
        '영어로 통찰이나 깊은 이해를 뜻해요. 회사에서는 자료나 관찰에서 얻은 의미 있는 발견을 말해요.',
      sayToAi:
        '"인터뷰에서 얻은 인사이트를 공유해 주세요" → "인터뷰를 통해 새롭게 알게 된 중요한 점을 알려 주세요"',
    },
    {
      id: 'reference',
      category: 'planning',
      name: '레퍼런스',
      english: 'Reference',
      meaning:
        '영어로 참고 자료나 참조를 뜻해요. 회사에서는 방향을 설명하거나 비교할 만한 사례와 자료를 말해요.',
      sayToAi:
        '"원하는 분위기의 레퍼런스를 모아 주세요" → "원하는 분위기를 보여 주는 참고 사례를 모아 주세요"',
    },
    {
      id: 'wireframe',
      category: 'planning',
      name: '와이어프레임',
      english: 'Wireframe',
      meaning:
        '영어로 철사로 만든 뼈대를 뜻해요. 화면 기획에서는 색이나 장식보다 내용의 배치를 보여 주는 밑그림을 말해요.',
      sayToAi:
        '"디자인 전에 와이어프레임부터 볼까요?" → "꾸미기 전에 화면에 무엇을 어디에 놓을지 밑그림부터 볼까요?"',
    },
    {
      id: 'mockup',
      category: 'planning',
      name: '목업',
      english: 'Mockup',
      meaning:
        '영어로 실물 모형이나 시안을 뜻해요. 화면 작업에서는 완성된 모습을 미리 보여 주는 그림을 말해요.',
      sayToAi: '"목업으로 먼저 컨펌받죠" → "완성 모습을 보여 주는 시안으로 먼저 승인을 받죠"',
    },
    {
      id: 'launch',
      category: 'planning',
      name: '런칭',
      english: 'Launch',
      meaning:
        '영어로 시작하거나 내놓는다는 뜻이에요. 회사에서는 새 서비스나 제품을 사용자에게 처음 공개할 때 써요.',
      sayToAi: '"다음 달에 서비스 런칭합니다" → "다음 달에 서비스를 처음 공개합니다"',
    },
  ],
  confusions: [
    {
      a: 'sync',
      b: 'align',
      difference: '싱크는 서로 아는 정보나 진행 상황을 맞추고, 얼라인은 목표나 방향을 맞춰요.',
    },
    {
      a: 'deadline',
      b: 'milestone',
      difference: '데드라인은 일을 끝낼 기한이고, 마일스톤은 중간에 달성할 중요한 목표예요.',
    },
    {
      a: 'issue',
      b: 'blocker',
      difference:
        '이슈는 확인하거나 처리할 사안이고, 블로커는 다음 일을 진행하지 못하게 막는 문제예요.',
    },
    {
      a: 'rollback',
      b: 'hotfix',
      difference: '롤백은 이전 버전으로 되돌리고, 핫픽스는 현재 버전의 급한 오류를 고쳐 반영해요.',
    },
    {
      a: 'wireframe',
      b: 'mockup',
      difference:
        '와이어프레임은 화면의 구조와 배치를 보여 주고, 목업은 꾸며진 완성 모습을 보여 줘요.',
    },
  ],
};
