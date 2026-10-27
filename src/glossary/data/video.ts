import type { Dictionary } from './types';

export const video: Dictionary = {
  id: 'video',
  label: '영상',
  exampleTitle: 'AI에게는 이렇게 말하세요',
  forAi: true,
  categories: [
    {
      id: 'edit',
      label: '자르기·잇기',
    },
    {
      id: 'screen',
      label: '화면',
    },
    {
      id: 'audio',
      label: '소리',
    },
    {
      id: 'playback',
      label: '재생·파일',
    },
  ],
  terms: [
    {
      id: 'cut',
      category: 'edit',
      name: '컷',
      english: 'Cut',
      meaning:
        '효과 없이 다음 장면으로 바로 바꾸는 편집이에요. 한 번에 촬영한 장면을 가리킬 때도 쓰는 말이에요.',
      sayToAi: '카페 소개 영상은 컷(Cut)으로 매장 장면에서 메뉴 장면으로 바로 전환해 주세요.',
    },
    {
      id: 'transition',
      category: 'edit',
      name: '전환 효과',
      english: 'Transition',
      meaning:
        '장면과 장면 사이를 이어 주는 시각 효과예요. 서서히 겹치거나 옆으로 밀리는 모습 등을 넣어요.',
      sayToAi: '카페 소개 영상의 장면 사이에 부드러운 전환 효과(Transition)를 추가해 주세요.',
    },
    {
      id: 'trim',
      category: 'edit',
      name: '길이 다듬기',
      english: 'Trim',
      meaning:
        '영상의 시작이나 끝에서 필요 없는 부분을 잘라 내요. 본 장면 앞뒤의 기다리는 시간을 줄일 때 써요.',
      sayToAi: '운동 안내 영상 앞뒤의 빈 시간을 길이 다듬기(Trim)로 제거해 주세요.',
    },
    {
      id: 'intro',
      category: 'edit',
      name: '인트로',
      english: 'Intro',
      meaning:
        '영상 시작에서 제목이나 주제를 소개하는 부분이에요. 앞으로 무엇을 볼지 짧게 알려 줘요.',
      sayToAi: '카페 소개 영상 앞에 상호를 보여 주는 2초짜리 인트로(Intro)를 추가해 주세요.',
    },
    {
      id: 'outro',
      category: 'edit',
      name: '아웃트로',
      english: 'Outro',
      meaning: '영상 마지막을 마무리하는 부분이에요. 끝인사나 다음 행동을 안내하는 내용을 넣어요.',
      sayToAi: '운동 영상 끝에 다음 운동을 안내하는 아웃트로(Outro)를 추가해 주세요.',
    },
    {
      id: 'timeline',
      category: 'edit',
      name: '타임라인',
      english: 'Timeline',
      meaning:
        '영상과 소리를 시간 순서대로 놓는 편집 영역이에요. 어느 순간에 어떤 장면이 나올지 맞출 수 있어요.',
      sayToAi: '카페 소개 영상의 타임라인(Timeline)을 매장, 메뉴, 위치 안내 순서로 구성해 주세요.',
    },
    {
      id: 'frame',
      category: 'screen',
      name: '프레임',
      english: 'Frame',
      meaning:
        '영상을 이루는 정지 그림 한 장이에요. 여러 장을 빠르게 이어 보여 주면 움직이는 것처럼 보여요.',
      sayToAi: '운동 자세가 가장 잘 보이는 프레임(Frame)을 한 장 추출해 주세요.',
    },
    {
      id: 'fps',
      category: 'screen',
      name: '초당 프레임',
      english: 'FPS',
      meaning:
        '1초에 보여 주는 그림의 수예요. 수가 많으면 움직임을 더 잘게 나누어 표현할 수 있어요.',
      sayToAi: '카페 소개 영상의 초당 프레임(FPS)을 30으로 설정해 주세요.',
    },
    {
      id: 'resolution',
      category: 'screen',
      name: '해상도',
      english: 'Resolution',
      meaning:
        '영상 한 장을 이루는 가로와 세로의 점 수예요. 보통 1080p는 1920×1080, 4K는 3840×2160을 뜻해요.',
      sayToAi: '블로그용 가로 영상의 해상도(Resolution)를 1920×1080으로 설정해 주세요.',
    },
    {
      id: 'vertical-video',
      category: 'screen',
      name: '세로 영상',
      english: 'Vertical video',
      meaning: '가로보다 세로가 긴 영상이에요. 휴대폰을 세운 채 보기 좋으며 9:16 비율을 많이 써요.',
      sayToAi: '카페 신메뉴 소개를 9:16 세로 영상(Vertical video)으로 제작해 주세요.',
    },
    {
      id: 'captions',
      category: 'screen',
      name: '자막',
      english: 'Captions',
      meaning:
        '말소리나 필요한 설명을 화면에 글로 보여 줘요. 소리를 듣지 못하는 상황에서도 내용을 이해하게 도와줘요.',
      sayToAi: '운동 안내 영상에 동작 설명을 담은 자막(Captions)을 추가해 주세요.',
    },
    {
      id: 'thumbnail',
      category: 'screen',
      name: '썸네일',
      english: 'Thumbnail',
      meaning:
        '재생하기 전에 영상 내용을 알려 주는 대표 이미지예요. 영상에서 한 장을 고르거나 따로 만들어요.',
      sayToAi: '카페 메뉴가 잘 보이는 장면으로 영상 썸네일(Thumbnail)을 제작해 주세요.',
    },
    {
      id: 'screen-recording',
      category: 'screen',
      name: '화면 녹화',
      english: 'Screen recording',
      meaning:
        '휴대폰이나 컴퓨터에서 보이는 화면을 영상으로 기록해요. 앱 사용법을 설명할 때 많이 써요.',
      sayToAi:
        '메모 앱에서 새 메모를 만드는 과정을 화면 녹화(Screen recording)하는 방법을 안내해 주세요.',
    },
    {
      id: 'bgm',
      category: 'audio',
      name: '배경 음악',
      english: 'Background music',
      meaning:
        '영상 뒤에 깔리는 음악이에요. 분위기를 살리되 설명하는 목소리를 가리지 않게 조절해요.',
      sayToAi:
        '카페 소개 영상에 사용 허락을 받은 잔잔한 배경 음악(Background music)을 추가해 주세요.',
    },
    {
      id: 'volume',
      category: 'audio',
      name: '음량 조절',
      english: 'Volume',
      meaning:
        '목소리나 음악이 얼마나 크게 들릴지 바꿔요. 소리마다 크기를 따로 맞추면 설명을 듣기 편해져요.',
      sayToAi: '운동 영상의 설명보다 음악이 작게 들리도록 음량 조절(Volume)을 해 주세요.',
    },
    {
      id: 'fade-in',
      category: 'audio',
      name: '페이드 인',
      english: 'Fade in',
      meaning:
        '소리가 작은 상태에서 서서히 커지게 해요. 화면이 서서히 나타나는 효과를 뜻하기도 해요.',
      sayToAi: '카페 영상의 시작 음악에 2초 동안 페이드 인(Fade in)을 적용해 주세요.',
    },
    {
      id: 'fade-out',
      category: 'audio',
      name: '페이드 아웃',
      english: 'Fade out',
      meaning: '소리가 서서히 작아지며 끝나게 해요. 화면이 서서히 사라지는 효과를 뜻하기도 해요.',
      sayToAi: '카페 영상의 마지막 음악에 2초 동안 페이드 아웃(Fade out)을 적용해 주세요.',
    },
    {
      id: 'mute',
      category: 'audio',
      name: '음소거',
      english: 'Mute',
      meaning:
        '영상은 그대로 두고 소리가 들리지 않게 해요. 음악 파일을 지우는 것과는 달리 다시 켤 수 있어요.',
      sayToAi: '쇼핑몰 상품 영상에 음소거(Mute) 버튼을 추가해 주세요.',
    },
    {
      id: 'voiceover',
      category: 'audio',
      name: '내레이션',
      english: 'Voice-over',
      meaning:
        '장면 위에 설명하는 목소리를 따로 얹어요. 화면에 사람이 나오지 않아도 내용을 안내할 수 있어요.',
      sayToAi: '운동 영상에 자세를 설명하는 내레이션(Voice-over)을 추가해 주세요.',
    },
    {
      id: 'slow-motion',
      category: 'playback',
      name: '슬로 모션',
      english: 'Slow motion',
      meaning:
        '원래보다 느리게 재생해 움직임을 자세히 보여 줘요. 촬영한 그림 수가 부족하면 끊겨 보일 수 있어요.',
      sayToAi: '운동 영상의 점프 구간에 슬로 모션(Slow motion)을 적용해 주세요.',
    },
    {
      id: 'fast-forward',
      category: 'playback',
      name: '빨리 감기',
      english: 'Fast forward',
      meaning:
        '영상을 빠른 속도로 재생해 시간을 줄여요. 긴 준비 과정이나 반복 작업을 짧게 보여 줄 때 써요.',
      sayToAi: '카페 음료 영상의 긴 준비 구간에 4배속 빨리 감기(Fast forward)를 적용해 주세요.',
    },
    {
      id: 'loop',
      category: 'playback',
      name: '루프',
      english: 'Loop',
      meaning:
        '영상이 끝나면 처음부터 다시 반복해서 재생해요. 앞뒤 장면이 자연스럽게 이어지면 반복이 덜 눈에 띄어요.',
      sayToAi: '운동 앱의 동작 예시 영상에 루프(Loop)를 적용해 주세요.',
    },
    {
      id: 'autoplay',
      category: 'playback',
      name: '자동 재생',
      english: 'Autoplay',
      meaning:
        '재생 버튼을 누르지 않아도 영상이 시작돼요. 브라우저에서는 소리가 켜져 있으면 시작이 제한될 수 있어요.',
      sayToAi: '카페 첫 화면 영상에 음소거 상태의 자동 재생(Autoplay)을 적용해 주세요.',
    },
    {
      id: 'streaming',
      category: 'playback',
      name: '스트리밍',
      english: 'Streaming',
      meaning:
        '영상 전체를 다 받기 전에 받은 부분부터 재생해요. 인터넷 속도가 부족하면 중간에 기다릴 수 있어요.',
      sayToAi: '운동 강의 영상을 스트리밍(Streaming)으로 볼 수 있게 해 주세요.',
    },
    {
      id: 'encoding',
      category: 'playback',
      name: '인코딩',
      english: 'Encoding',
      meaning:
        '편집한 영상과 소리를 저장하거나 재생할 형식으로 변환해요. 이때 화질과 파일 크기에 영향을 주는 설정을 정해요.',
      sayToAi: '카페 소개 영상을 웹에서 재생할 수 있도록 인코딩(Encoding)해 주세요.',
    },
    {
      id: 'bitrate',
      category: 'playback',
      name: '비트레이트',
      english: 'Bitrate',
      meaning:
        '영상이나 소리에 1초당 쓰는 데이터의 양이에요. 같은 조건이면 높을수록 세부를 살리기 좋지만 용량도 커져요.',
      sayToAi: '블로그 영상의 화질과 파일 크기를 비교하며 비트레이트(Bitrate)를 조절해 주세요.',
    },
    {
      id: 'gif',
      category: 'playback',
      name: 'GIF 움짤',
      english: 'GIF',
      meaning:
        '짧은 움직임을 이미지 파일로 담을 수 있는 형식이에요. 소리는 담지 못하고 표현할 수 있는 색도 제한돼요.',
      sayToAi: '메모 앱의 사용 예시를 소리 없는 GIF로 제작해 주세요.',
    },
    {
      id: 'mp4',
      category: 'playback',
      name: 'MP4 영상',
      english: 'MP4',
      meaning:
        '영상과 소리 등을 한 파일에 담는 형식이에요. 같은 MP4라도 안에 담은 압축 방식에 따라 재생 가능 여부가 달라져요.',
      sayToAi: '카페 소개 영상을 휴대폰에서 확인할 수 있는 MP4 파일로 저장해 주세요.',
    },
    {
      id: 'codec',
      category: 'playback',
      name: '코덱',
      english: 'Codec',
      meaning:
        '영상이나 소리를 압축하고 다시 풀어 읽는 방식이에요. 재생 기기가 그 방식을 알아야 파일을 볼 수 있어요.',
      sayToAi: '운동 영상이 휴대폰에서 재생되지 않는 이유가 코덱(Codec) 때문인지 확인해 주세요.',
    },
    {
      id: 'playback-speed',
      category: 'playback',
      name: '재생 속도',
      english: 'Playback speed',
      meaning:
        '영상을 보는 빠르기를 조절해요. 재생기의 속도를 바꿔도 저장된 원본 영상은 그대로예요.',
      sayToAi:
        '운동 강의를 0.5배와 1배로 볼 수 있도록 재생 속도(Playback speed) 선택 기능을 추가해 주세요.',
    },
  ],
  confusions: [
    {
      a: 'cut',
      b: 'transition',
      difference: '컷은 다음 장면으로 바로 바꾸고, 전환 효과는 장면 사이에 시각 효과를 넣어요.',
    },
    {
      a: 'frame',
      b: 'fps',
      difference:
        '프레임은 영상의 그림 한 장을 뜻하고, 초당 프레임은 1초에 보여 주는 장수를 뜻해요.',
    },
    {
      a: 'fade-in',
      b: 'fade-out',
      difference: '페이드 인은 소리가 서서히 커지게 하고, 페이드 아웃은 서서히 작아지게 해요.',
    },
    {
      a: 'resolution',
      b: 'bitrate',
      difference: '해상도는 화면의 점 수를 나타내고, 비트레이트는 1초에 쓰는 데이터양을 나타내요.',
    },
    {
      a: 'mp4',
      b: 'codec',
      difference:
        'MP4는 영상과 소리를 담는 파일 형식이고, 코덱은 그 내용을 압축하고 푸는 방식이에요.',
    },
  ],
};
