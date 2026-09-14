import type { CountryImage, CountryMedia } from '../types';

const base = import.meta.env.BASE_URL;
const img = (countryId: string, file: string) => `${base}images/countries/${countryId}/${file}.svg`;

const reviewed = (
  commonsFile: string,
  fallbackSrc: string,
  alt: string,
  caption: string,
  category: CountryImage['category'],
): CountryImage => ({
  src: fallbackSrc,
  commonsFile,
  alt,
  caption,
  category,
  curatedForStudents: true,
  reviewNote: 'Wikimedia Commons의 공개 자료 중 수업용으로 사전 선별한 사진입니다. 사진 한 장은 그 나라 전체 사람들의 모습을 대표하지 않습니다.',
});

type MediaSeed = {
  name: string;
  heroFile: string;
  lifeFile: string;
  foodFile: string;
  cultureFile: string;
  hero: string;
  life: string;
  food: string;
  culture: string;
};

/**
 * v0.9 student photo set.
 * Four real photos are attached to each built-in country: city/region, food,
 * everyday life, and a place/cultural environment. No live image search is
 * exposed to students.
 */
const seeds: Record<string, MediaSeed> = {
  korea: {
    name: '한국',
    heroFile: 'Road in Seoul, KOREA.jpg',
    lifeFile: 'Streets of Seoul.jpg',
    foodFile: 'Korean.food-Bibimbap-01.jpg',
    cultureFile: 'Gyeongbokgung, Seoul.jpg',
    hero: '서울의 실제 도로와 도시 모습을 보며 현대 한국의 한 장면을 살펴봐요.',
    life: '서울의 실제 거리 사진이에요. 같은 도시 안에서도 사람마다 생활 모습은 다양해요.',
    food: '콩나물 비빔밥의 실제 사진이에요. 한국에는 지역과 가정에 따라 매우 다양한 음식이 있어요.',
    culture: '서울 경복궁의 실제 모습이에요. 역사적인 공간과 오늘날의 생활 공간을 구분해 살펴봐요.',
  },
  vietnam: {
    name: '베트남',
    heroFile: 'Vietnam, Hanoi, Life on the streets of Hanoi.jpg',
    lifeFile: 'Daily life in Vietnam Street vendor.jpg',
    foodFile: 'Pho in Saigon.jpg',
    cultureFile: 'Hoan Kiem Lake photo.jpg',
    hero: '하노이의 실제 거리 모습이에요. 도시의 이동과 상점, 사람들의 일상을 관찰해 봐요.',
    life: '거리에서 일하는 성인의 실제 생활 장면이에요. 다양한 직업과 생활 모습을 생각해 봐요.',
    food: '베트남에서 널리 알려진 쌀면 음식인 퍼(Phở)의 실제 사진이에요.',
    culture: '하노이 호안끼엠 호수의 실제 모습이에요. 도시의 공공 공간이 어떻게 이용되는지 살펴봐요.',
  },
  china: {
    name: '중국',
    heroFile: 'Street life in Beijing 07.jpg',
    lifeFile: 'Street life in Beijing 02.jpg',
    foodFile: 'Jiaozi.jpg',
    cultureFile: 'Temple-of-heaven.jpg',
    hero: '베이징의 실제 거리 사진으로 넓은 중국의 도시 생활 중 한 사례를 살펴봐요.',
    life: '베이징 거리의 실제 일상 장면이에요. 지역에 따라 생활 모습은 매우 다를 수 있어요.',
    food: '자오쯔(만두)의 실제 사진이에요. 중국 음식은 지역마다 재료와 조리법이 매우 다양해요.',
    culture: '베이징 천단의 실제 모습이에요. 역사 유산을 오늘날의 중국 생활 전체와 같다고 생각하지 않아요.',
  },
  mongolia: {
    name: '몽골',
    heroFile: 'Ulaanbaatar city Mongolia 20230926 102617.jpg',
    lifeFile: 'Peace Avenue, Ulaanbaatar, Mongolia - 2023.jpg',
    foodFile: 'Mongolian buuz.jpg',
    cultureFile: 'Mongolia-terelj.jpg',
    hero: '울란바토르의 실제 도시 전경이에요. 몽골에는 초원뿐 아니라 큰 도시 생활도 있어요.',
    life: '울란바토르의 실제 거리 모습이에요. 현대적인 도시 생활을 함께 살펴봐요.',
    food: '몽골 음식 부즈의 실제 사진이에요. 한 음식으로 모든 가정의 식생활을 설명할 수는 없어요.',
    culture: '테를지 국립공원의 실제 풍경이에요. 몽골의 자연환경 중 한 사례를 살펴봐요.',
  },
  philippines: {
    name: '필리핀',
    heroFile: 'Manila street.jpg',
    lifeFile: 'Binondo - Quintin Paredes (Manila; 11-24-2019).jpg',
    foodFile: 'Adobo Filipino style.jpg',
    cultureFile: 'Rizal Park.jpg',
    hero: '마닐라의 실제 거리 사진이에요. 여러 섬과 지역 중 한 도시의 모습을 살펴봐요.',
    life: '마닐라 비논도의 실제 거리 장면이에요. 다양한 지역 공동체의 도시 생활을 관찰해 봐요.',
    food: '필리핀식 아도보의 실제 사진이에요. 지역과 가정마다 조리법이 달라질 수 있어요.',
    culture: '마닐라 리살 공원의 실제 모습이에요. 사람들이 함께 이용하는 공공 공간을 살펴봐요.',
  },
  thailand: {
    name: '태국',
    heroFile: 'Bangkok, Thailand skyline, 30 March 2023.jpg',
    lifeFile: 'Bangkok Chatuchak Market 1.jpg',
    foodFile: 'Pad Thai in Thailand.jpg',
    cultureFile: 'ThaiBangkokWatArun.jpg',
    hero: '방콕의 실제 도시 전경이에요. 현대적인 대도시의 모습을 관찰해 봐요.',
    life: '방콕 짜뚜짝 시장의 실제 모습이에요. 시장은 사람과 물건, 음식이 만나는 생활 공간 중 하나예요.',
    food: '태국에서 촬영된 팟타이의 실제 사진이에요. 태국 음식 역시 지역에 따라 다양해요.',
    culture: '방콕 왓 아룬의 실제 모습이에요. 종교·역사 공간을 존중하며 관찰해요.',
  },
  uzbekistan: {
    name: '우즈베키스탄',
    heroFile: 'The Street of Tashkent.jpg',
    lifeFile: 'Street in Tashkent.jpg',
    foodFile: 'Plov.jpg',
    cultureFile: 'Registan Samarkand.jpg',
    hero: '타슈켄트의 실제 거리 모습이에요. 중앙아시아의 현대 도시 환경을 살펴봐요.',
    life: '타슈켄트의 또 다른 실제 거리 사진이에요. 한 도시 안에도 다양한 공간이 있음을 비교해 봐요.',
    food: '우즈베키스탄의 플로브(팔로브) 실제 사진이에요. 조리법은 지역과 가정에 따라 달라질 수 있어요.',
    culture: '사마르칸트 레기스탄의 실제 건축 공간이에요. 교류의 역사를 떠올리며 살펴봐요.',
  },
  india: {
    name: '인도',
    heroFile: 'Street delhi connaught place.jpg',
    lifeFile: 'Street scene in Old Delhi (5621280682).jpg',
    foodFile: 'INDIAN thali.jpg',
    cultureFile: 'India gate new delhi.jpg',
    hero: '델리 코넛 플레이스의 실제 거리 사진이에요. 인도의 수많은 지역 중 한 도시 모습을 살펴봐요.',
    life: '올드델리의 실제 거리 장면이에요. 사람과 교통, 상점이 함께 있는 도시 일상을 관찰해 봐요.',
    food: '여러 음식을 한 상에 담은 탈리의 실제 사진이에요. 인도의 음식 문화는 지역별 차이가 매우 커요.',
    culture: '뉴델리의 인디아 게이트 실제 모습이에요. 도시의 공공 기념 건축물 중 하나로 살펴봐요.',
  },
  japan: {
    name: '일본',
    heroFile: 'Tokyo street.jpg',
    lifeFile: 'Crowded Shibuya street.jpg',
    foodFile: 'Onigiri.JPG',
    cultureFile: 'Sensoji temple tokyo.jpg',
    hero: '도쿄의 실제 거리 사진이에요. 현대 일본의 여러 도시 모습 중 한 사례예요.',
    life: '시부야의 실제 보행 거리 장면이에요. 많은 사람이 함께 이용하는 도시 공간을 살펴봐요.',
    food: '일본에서 촬영된 오니기리의 실제 사진이에요. 지역과 사람에 따라 식사는 다양해요.',
    culture: '도쿄 센소지의 실제 모습이에요. 역사 공간과 현대 도시가 함께 있는 모습을 살펴봐요.',
  },
  brazil: {
    name: '브라질',
    heroFile: 'Street Scene - Santa Teresa District - Rio de Janeiro - Brazil.jpg',
    lifeFile: 'Pedestrians and street stalls in Rio de Janeiro, Brazil.jpg',
    foodFile: 'Brazilian food Feijoada.jpg',
    cultureFile: 'Sugarloaf, Rio, Brazil.jpg',
    hero: '리우데자네이루 산타테레사의 실제 거리 모습이에요. 넓은 브라질의 한 지역을 살펴봐요.',
    life: '리우데자네이루의 보행자와 거리 가판대가 보이는 실제 생활 장면이에요.',
    food: '브라질 음식 페이조아다의 실제 사진이에요. 브라질에는 지역별로 다양한 음식 문화가 있어요.',
    culture: '리우데자네이루 슈거로프 산의 실제 풍경이에요. 브라질의 여러 자연환경 중 한 사례예요.',
  },
  egypt: {
    name: '이집트',
    heroFile: 'Cairo City.jpg',
    lifeFile: 'Life street in old Cairo.jpg',
    foodFile: 'Egyptian Koshari.jpg',
    cultureFile: 'The Nile at Cairo.jpg',
    hero: '카이로의 실제 도시 전경이에요. 고대 유적뿐 아니라 오늘날의 대도시 생활도 함께 살펴봐요.',
    life: '카이로의 실제 거리에서 일하는 성인의 일상 장면이에요.',
    food: '쌀·렌틸콩·파스타 등을 함께 먹는 코샤리의 실제 사진이에요.',
    culture: '카이로를 지나는 나일강의 실제 모습이에요. 도시와 자연환경의 관계를 살펴봐요.',
  },
  france: {
    name: '프랑스',
    heroFile: 'The Seine in Paris.jpg',
    lifeFile: 'Paris street life. On the banks of the Seine. 4 June 2017.jpg',
    foodFile: 'Baguettes, Paris, France - panoramio.jpg',
    cultureFile: 'Paris Place du Carrousel, le Louvre.jpg',
    hero: '파리 센강의 실제 사진이에요. 프랑스의 여러 지역 중 수도의 한 풍경을 살펴봐요.',
    life: '센강 주변에서 사람들이 쉬는 실제 공공장소의 일상 장면이에요.',
    food: '파리에서 촬영된 바게트의 실제 사진이에요. 프랑스 식문화도 지역과 사람에 따라 다양해요.',
    culture: '파리 루브르 박물관 안뜰의 실제 모습이에요. 예술·역사 공간 중 한 사례로 살펴봐요.',
  },
};

export const countryMedia: Record<string, CountryMedia> = Object.fromEntries(
  Object.entries(seeds).map(([id, c]) => [id, {
    hero: reviewed(c.heroFile, img(id, 'hero'), `${c.name}의 실제 도시·지역 사진`, c.hero, '풍경'),
    gallery: [
      reviewed(c.foodFile, img(id, 'food'), `${c.name} 음식의 실제 사진`, c.food, '음식'),
      reviewed(c.lifeFile, img(id, 'life'), `${c.name}의 실제 생활·거리 사진`, c.life, '생활'),
      reviewed(c.cultureFile, img(id, 'culture'), `${c.name}의 실제 문화·지역 자료 사진`, c.culture, '문화'),
    ],
  }]),
);
