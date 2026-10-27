import type { Dictionary } from './types';

export const image: Dictionary = {
  id: 'image',
  label: '이미지',
  exampleTitle: 'AI에게는 이렇게 말하세요',
  forAi: true,
  categories: [
    {
      id: 'size',
      label: '크기·비율',
    },
    {
      id: 'format',
      label: '파일 형식',
    },
    {
      id: 'edit',
      label: '편집',
    },
    {
      id: 'style',
      label: '꾸밈',
    },
  ],
  terms: [
    {
      id: 'aspect-ratio',
      category: 'size',
      name: '화면 비율',
      english: 'Aspect ratio',
      meaning: '가로와 세로 길이의 비를 말해요. 16:9는 가로로 길고, 1:1은 정사각형이에요.',
      sayToAi: '상품 사진의 화면 비율(Aspect ratio)을 모두 1:1로 통일해 주세요.',
    },
    {
      id: 'resolution',
      category: 'size',
      name: '해상도',
      english: 'Resolution',
      meaning:
        '이미지를 이루는 점의 수를 가로와 세로로 표시해요. 같은 크기로 보면 점이 많을수록 세밀하게 표현해요.',
      sayToAi: '쇼핑몰 대표 사진의 해상도(Resolution)를 가로 1200, 세로 1200픽셀로 설정해 주세요.',
    },
    {
      id: 'pixel',
      category: 'size',
      name: '픽셀',
      english: 'Pixel',
      meaning:
        '디지털 이미지를 이루는 작은 색 점이에요. 사진을 크게 확대하면 작은 네모처럼 보여요.',
      sayToAi: '블로그 배너의 가로 길이를 1200픽셀(Pixel)로 설정해 주세요.',
    },
    {
      id: 'crop',
      category: 'size',
      name: '자르기',
      english: 'Crop',
      meaning:
        '이미지 가장자리의 필요 없는 부분을 덜어 내요. 남긴 부분만 보여 주므로 사진 구도가 달라져요.',
      sayToAi: '카페 메뉴 사진은 컵이 가운데 오도록 자르기(Crop)를 적용해 주세요.',
    },
    {
      id: 'resize',
      category: 'size',
      name: '크기 조절',
      english: 'Resize',
      meaning:
        '사진 전체를 유지하면서 가로와 세로의 픽셀 수를 바꿔요. 크게 늘린다고 원래 없던 세부가 생기지는 않아요.',
      sayToAi: '블로그 사진이 찌그러지지 않도록 비율을 유지하며 크기 조절(Resize)을 해 주세요.',
    },
    {
      id: 'retina',
      category: 'size',
      name: '레티나용 2배 이미지',
      english: 'Retina 2x',
      meaning:
        '촘촘한 화면에서도 선명하도록 표시 크기보다 가로와 세로 픽셀을 각각 두 배로 준비해요.',
      sayToAi:
        '카페 로고를 화면에서는 100×100으로 보이게 하고 레티나용 2배 이미지(Retina 2x)는 200×200으로 준비해 주세요.',
    },
    {
      id: 'jpg',
      category: 'format',
      name: 'JPG 사진',
      english: 'JPG',
      meaning:
        '사진에 많이 쓰는 이미지 파일 형식이에요. 용량을 줄이기 좋지만 배경을 투명하게 저장할 수는 없어요.',
      sayToAi: '쇼핑몰 상품 사진을 JPG로 저장해 주세요.',
    },
    {
      id: 'png',
      category: 'format',
      name: 'PNG 그림',
      english: 'PNG',
      meaning:
        '글자나 선을 또렷하게 보존하고 투명한 배경도 저장하는 형식이에요. 사진은 파일이 커질 수 있어요.',
      sayToAi: '카페 로고를 투명 배경이 유지되는 PNG로 저장해 주세요.',
    },
    {
      id: 'webp',
      category: 'format',
      name: 'WebP 이미지',
      english: 'WebP',
      meaning:
        '웹에서 이미지 용량을 줄이는 데 쓰는 형식이에요. 투명 배경과 움직이는 이미지도 지원해요.',
      sayToAi: '블로그 사진을 WebP로 바꾸고 원본과 화질을 비교해 주세요.',
    },
    {
      id: 'svg',
      category: 'format',
      name: 'SVG 그림',
      english: 'SVG',
      meaning:
        '선과 도형을 수치로 기록하는 이미지 형식이에요. 단순한 로고나 아이콘은 크게 확대해도 또렷하게 보여요.',
      sayToAi: '일정 앱의 달력 아이콘을 SVG로 준비해 주세요.',
    },
    {
      id: 'compression',
      category: 'format',
      name: '압축',
      english: 'Compression',
      meaning:
        '이미지 파일의 용량을 줄여요. 방법에 따라 화질이 그대로 유지되거나 세부가 손실될 수 있어요.',
      sayToAi: '쇼핑몰 사진의 글씨가 뭉개지지 않는 범위에서 압축(Compression)을 해 주세요.',
    },
    {
      id: 'vector',
      category: 'format',
      name: '벡터',
      english: 'Vector',
      meaning:
        '그림을 작은 점 대신 선과 도형의 정보로 표현해요. 크기를 바꿔도 선을 또렷하게 그릴 수 있어요.',
      sayToAi: '카페 로고를 간판에도 쓸 수 있도록 벡터(Vector)로 제작해 주세요.',
    },
    {
      id: 'transparent-background',
      category: 'edit',
      name: '투명 배경',
      english: 'Transparent background',
      meaning:
        '그림 뒤에 색이 없어 다른 배경이 비쳐요. 편집기의 바둑판 무늬는 투명한 곳을 보여 주는 표시예요.',
      sayToAi: '쇼핑몰 상품만 남긴 사진을 투명 배경(Transparent background)으로 저장해 주세요.',
    },
    {
      id: 'remove-background',
      category: 'edit',
      name: '배경 지우기',
      english: 'Remove background',
      meaning:
        '사진에서 주인공을 남기고 뒤의 배경을 없애요. 머리카락이나 유리처럼 경계가 복잡한 곳은 확인이 필요해요.',
      sayToAi: '카페 컵 사진에 배경 지우기(Remove background)를 적용해 주세요.',
    },
    {
      id: 'brightness',
      category: 'edit',
      name: '밝기',
      english: 'Brightness',
      meaning:
        '사진이 전체적으로 밝거나 어두워 보이는 정도를 조절해요. 너무 밝히면 밝은 부분의 무늬가 사라져요.',
      sayToAi: '어두운 카페 내부 사진의 밝기(Brightness)를 조금 높여 주세요.',
    },
    {
      id: 'contrast',
      category: 'edit',
      name: '대비',
      english: 'Contrast',
      meaning:
        '밝은 부분과 어두운 부분의 차이를 조절해요. 차이를 키우면 더 뚜렷하고 강한 느낌이 나요.',
      sayToAi: '블로그 음식 사진의 대비(Contrast)를 살짝 높여 주세요.',
    },
    {
      id: 'saturation',
      category: 'edit',
      name: '채도',
      english: 'Saturation',
      meaning:
        '색이 얼마나 진하고 선명하게 보일지 조절해요. 낮추면 색이 옅어지고 끝까지 낮추면 흑백이 돼요.',
      sayToAi: '쇼핑몰 옷 사진이 실제 색과 비슷해지도록 채도(Saturation)를 조절해 주세요.',
    },
    {
      id: 'white-balance',
      category: 'edit',
      name: '화이트 밸런스',
      english: 'White balance',
      meaning:
        '흰색이 자연스럽게 보이도록 사진의 색 기운을 맞춰요. 조명 때문에 노랗거나 파랗게 찍혔을 때 조절해요.',
      sayToAi:
        '카페 접시 사진의 누런 기운을 줄이도록 화이트 밸런스(White balance)를 조절해 주세요.',
    },
    {
      id: 'rotate',
      category: 'edit',
      name: '회전',
      english: 'Rotate',
      meaning:
        '이미지의 방향이나 기울기를 돌려 바꿔요. 옆으로 누운 사진이나 비스듬한 구도를 바로잡을 때 써요.',
      sayToAi: '블로그에 올릴 옆으로 누운 사진에 회전(Rotate)을 적용해 주세요.',
    },
    {
      id: 'layer',
      category: 'edit',
      name: '레이어',
      english: 'Layer',
      meaning: '사진과 글, 그림을 서로 다른 층에 나눠 놓아요. 한 층만 옮기거나 수정할 수 있어요.',
      sayToAi: '카페 행사 배너의 사진과 제목을 서로 다른 레이어(Layer)로 분리해 주세요.',
    },
    {
      id: 'filter',
      category: 'style',
      name: '필터',
      english: 'Filter',
      meaning:
        '색감이나 분위기를 한꺼번에 바꾸는 효과예요. 같은 효과를 여러 사진에 쓰면 느낌을 맞추기 쉬워요.',
      sayToAi: '카페 메뉴 사진에 따뜻한 느낌의 필터(Filter)를 적용해 주세요.',
    },
    {
      id: 'blur',
      category: 'style',
      name: '흐림',
      english: 'Blur',
      meaning:
        '사진의 경계를 부드럽게 만들어 덜 또렷하게 보여 줘요. 배경을 흐려 주인공을 돋보이게 할 때 써요.',
      sayToAi: '블로그 인물 사진은 배경에만 흐림(Blur)을 적용해 주세요.',
    },
    {
      id: 'watermark',
      category: 'style',
      name: '워터마크',
      english: 'Watermark',
      meaning:
        '출처나 소유자를 알리려고 사진 위에 얹는 글이나 로고예요. 무단 사용 자체를 막는 장치는 아니에요.',
      sayToAi: '쇼핑몰 상품 사진 구석에 상호를 워터마크(Watermark)로 표시해 주세요.',
    },
    {
      id: 'thumbnail',
      category: 'style',
      name: '썸네일',
      english: 'Thumbnail',
      meaning:
        '목록에서 내용을 미리 보여 주는 작은 대표 이미지예요. 작게 봐도 주제가 보이도록 만드는 게 좋아요.',
      sayToAi: '블로그 글 목록에 쓸 썸네일(Thumbnail)을 제작해 주세요.',
    },
    {
      id: 'icon',
      category: 'style',
      name: '아이콘',
      english: 'Icon',
      meaning:
        '기능이나 대상을 간단한 그림으로 나타내요. 작은 크기에서도 알아보기 쉽게 모양을 단순하게 만들어요.',
      sayToAi: '일정 앱의 알림 버튼에 종 모양 아이콘(Icon)을 추가해 주세요.',
    },
    {
      id: 'illustration',
      category: 'style',
      name: '일러스트',
      english: 'Illustration',
      meaning:
        '내용이나 분위기를 전달하려고 그린 그림이에요. 사진 대신 친근한 설명이나 장면을 보여 줄 때 써요.',
      sayToAi: '운동 앱 첫 화면에 스트레칭하는 사람의 일러스트(Illustration)를 추가해 주세요.',
    },
    {
      id: 'mockup',
      category: 'style',
      name: '목업',
      english: 'Mockup',
      meaning:
        '완성했을 때 어떻게 보일지 미리 보여 주는 시안이에요. 실제로 작동하지 않아도 모양을 확인할 수 있어요.',
      sayToAi: '카페 주문 앱의 첫 화면을 목업(Mockup)으로 제작해 주세요.',
    },
    {
      id: 'gradient',
      category: 'style',
      name: '그라데이션',
      english: 'Gradient',
      meaning:
        '한 색에서 다른 색으로 서서히 바뀌는 표현이에요. 배경이나 그림에 부드러운 색 변화를 넣어요.',
      sayToAi:
        '운동 앱 소개 배너 배경에 파랑에서 보라로 바뀌는 그라데이션(Gradient)을 적용해 주세요.',
    },
    {
      id: 'opacity',
      category: 'style',
      name: '불투명도',
      english: 'Opacity',
      meaning:
        '그림이 배경을 얼마나 가리는지 정해요. 100%면 완전히 보이고, 0%면 그림이 보이지 않아요.',
      sayToAi: '카페 배너의 장식 그림은 불투명도(Opacity)를 30%로 설정해 주세요.',
    },
    {
      id: 'sharpen',
      category: 'edit',
      name: '선명하게',
      english: 'Sharpen',
      meaning:
        '경계의 차이를 강조해 사진이 더 또렷해 보이게 해요. 너무 강하게 쓰면 테두리가 부자연스러워져요.',
      sayToAi: '블로그 음식 사진에 선명하게(Sharpen) 효과를 약하게 적용해 주세요.',
    },
  ],
  confusions: [
    {
      a: 'jpg',
      b: 'png',
      difference: 'JPG는 사진 용량을 줄이기 좋고, PNG는 투명 배경과 또렷한 선을 보존해요.',
    },
    {
      a: 'crop',
      b: 'resize',
      difference: '자르기는 사진 일부를 덜어 내고, 크기 조절은 사진 전체의 픽셀 수를 바꿔요.',
    },
    {
      a: 'resolution',
      b: 'aspect-ratio',
      difference: '해상도는 가로·세로 점의 수를 나타내고, 화면 비율은 두 길이의 비를 나타내요.',
    },
    {
      a: 'brightness',
      b: 'contrast',
      difference:
        '밝기는 전체의 밝고 어두운 정도를 바꾸고, 대비는 밝은 곳과 어두운 곳의 차이를 바꿔요.',
    },
    {
      a: 'svg',
      b: 'vector',
      difference: 'SVG는 이미지 파일 형식이고, 벡터는 선과 도형으로 그림을 표현하는 방식이에요.',
    },
  ],
};
