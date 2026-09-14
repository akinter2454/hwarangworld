import type { CountryMedia } from '../types';

const base = import.meta.env.BASE_URL;
const img = (countryId: string, file: string) => `${base}images/countries/${countryId}/${file}.svg`;

const captions: Record<string, { name: string; hero: string; food: string; life: string; culture: string }> = {
  korea: { name: '한국', hero: '도시와 자연이 함께 있는 한국의 다양한 풍경을 떠올려 봐요.', food: '여러 재료와 식사 문화를 살펴보는 음식 탐험 이미지예요.', life: '학교에서 함께 배우고 생활하는 모습을 상징해요.', culture: '문자와 전통, 현대 문화가 함께 이어지는 모습을 상징해요.' },
  vietnam: { name: '베트남', hero: '도시와 자연, 여러 지역의 다양한 생활 환경을 떠올려 봐요.', food: '쌀면 등 베트남에서 널리 알려진 음식 문화를 살펴봐요.', life: '학교와 친구, 가족의 다양한 일상을 상징해요.', culture: '공연과 전통, 오늘날의 문화 활동을 함께 살펴봐요.' },
  china: { name: '중국', hero: '넓은 지역에 여러 도시와 자연환경이 있다는 점을 떠올려 봐요.', food: '지역마다 매우 다양한 음식이 있다는 점을 기억해요.', life: '학생들의 학교생활과 지역별 다양한 일상을 상징해요.', culture: '문자와 지역 문화의 다양성을 탐색하는 이미지예요.' },
  mongolia: { name: '몽골', hero: '도시와 초원, 산지 등 다양한 환경을 함께 떠올려 봐요.', food: '지역과 가정에 따라 달라질 수 있는 음식 문화를 살펴봐요.', life: '학교생활과 도시·초원의 여러 생활 모습을 상징해요.', culture: '말 문화와 전통, 현대 생활이 함께 존재함을 떠올려 봐요.' },
  philippines: { name: '필리핀', hero: '여러 섬과 지역으로 이루어진 다양한 환경을 떠올려 봐요.', food: '섬과 지역에 따라 다양한 음식이 있다는 점을 살펴봐요.', life: '여러 언어 배경을 가진 학생들의 일상을 상징해요.', culture: '춤과 지역 문화, 현대 생활을 함께 살펴봐요.' },
  thailand: { name: '태국', hero: '도시와 자연, 여러 지역의 생활 환경을 떠올려 봐요.', food: '다양한 재료와 맛을 만날 수 있는 음식 문화를 상징해요.', life: '학교와 가정에서의 여러 일상을 살펴봐요.', culture: '축제와 인사 문화 등 여러 문화 표현을 탐색해요.' },
  uzbekistan: { name: '우즈베키스탄', hero: '중앙아시아의 도시와 역사적 교류의 흔적을 떠올려 봐요.', food: '쌀과 빵 등 널리 알려진 음식 문화를 살펴봐요.', life: '학교생활과 지역별 다양한 일상을 상징해요.', culture: '실크로드와 무늬, 건축 등 문화 교류를 떠올려 봐요.' },
  india: { name: '인도', hero: '넓은 지역에 다양한 도시와 자연, 언어가 있다는 점을 떠올려 봐요.', food: '지역마다 재료와 향신료가 다른 음식 문화를 살펴봐요.', life: '여러 언어와 지역 배경을 가진 학생들의 일상을 상징해요.', culture: '다양한 언어와 전통, 현대 문화가 함께 있음을 떠올려 봐요.' },
  japan: { name: '일본', hero: '도시와 산, 바다 등 여러 지역의 환경을 떠올려 봐요.', food: '지역에 따라 다양한 밥과 면 요리를 살펴봐요.', life: '학교에서 배우고 친구들과 활동하는 모습을 상징해요.', culture: '지역 축제와 전통, 현대 생활이 함께 있음을 살펴봐요.' },
  brazil: { name: '브라질', hero: '넓은 국토의 숲과 도시, 해안 등 다양한 환경을 떠올려 봐요.', food: '지역마다 다른 재료와 음식 문화를 살펴봐요.', life: '학교와 지역사회에서의 다양한 일상을 상징해요.', culture: '음악과 춤, 여러 공동체의 문화 표현을 탐색해요.' },
  egypt: { name: '이집트', hero: '나일강 주변과 도시, 사막 등 다양한 환경을 떠올려 봐요.', food: '콩과 쌀, 빵 등 다양한 식사 문화를 살펴봐요.', life: '오늘날 학생들의 학교와 도시 생활을 상징해요.', culture: '고대 유산과 오늘날의 문화를 구분해 함께 살펴봐요.' },
  france: { name: '프랑스', hero: '여러 지역의 도시와 농촌, 자연환경을 떠올려 봐요.', food: '빵과 여러 지역 음식 등 다양한 식문화를 살펴봐요.', life: '학교생활과 지역별 다양한 일상을 상징해요.', culture: '예술과 박물관, 지역 문화의 다양성을 탐색해요.' },
};

export const countryMedia: Record<string, CountryMedia> = Object.fromEntries(
  Object.entries(captions).map(([id, c]) => [id, {
    hero: { src: img(id, 'hero'), alt: `${c.name} 여행을 상징하는 교육용 일러스트`, caption: c.hero, category: '풍경' as const },
    gallery: [
      { src: img(id, 'food'), alt: `${c.name} 음식 탐험 교육용 일러스트`, caption: c.food, category: '음식' as const },
      { src: img(id, 'life'), alt: `${c.name} 생활 탐험 교육용 일러스트`, caption: c.life, category: '생활' as const },
      { src: img(id, 'culture'), alt: `${c.name} 문화 탐험 교육용 일러스트`, caption: c.culture, category: '문화' as const },
    ],
  }]),
);
