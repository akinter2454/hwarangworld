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

const illustrated = (
  localSrc: string,
  alt: string,
  caption: string,
  category: CountryImage['category'],
): CountryImage => ({
  src: localSrc,
  alt,
  caption,
  category,
  reviewNote: '실제 사진과 함께 이해를 돕는 교육용 그림 자료예요. 그림 역시 한 나라 전체를 모두 보여 주는 자료는 아니에요.',
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
  school: string;
  map: string;
};

/**
 * v1.2.2 student visual set.
 * Each built-in country now shows 6 visuals:
 * - 4 reviewed Wikimedia Commons photos (hero + food + life + culture)
 * - 2 local illustration cards (school life + location/key facts)
 * No live image search is exposed to students.
 */
const seeds: Record<string, MediaSeed> = {
  korea: {
    name: '한국',
    heroFile: 'Scenery of Seoul.jpg',
    lifeFile: 'Namdaemun market in Seoul I.jpg',
    foodFile: 'Korean.food-Bibimbap-01.jpg',
    cultureFile: 'Gyeongbokgung, Seoul.jpg',
    hero: '서울의 스카이라인과 도시 풍경을 보여 주는 실제 사진이에요. 한강과 고층 건물, 도로가 어우러진 현대 도시 환경을 함께 떠올려 봐요.',
    life: '서울 남대문시장의 실제 모습이에요. 시장은 물건을 사고팔고 길거리 음식을 만나며 다양한 사람들이 오가는 생활 공간이에요.',
    food: '콩나물 비빔밥의 실제 사진이에요. 한국에는 지역의 재료와 계절에 따라 다양한 밥상 문화가 있어요.',
    culture: '서울 경복궁의 실제 모습이에요. 역사적인 궁궐이 오늘날의 도시 생활과 가까이 공존하는 모습을 떠올려 봐요.',
    school: '학교 그림 자료예요. 급식, 체육, 동아리처럼 학생들이 함께 배우고 생활하는 모습을 생각해 볼 수 있어요.',
    map: '위치·계절·생활 자료를 담은 그림이에요. 바다와 산, 사계절 환경이 생활과 음식에 어떤 영향을 주는지 연결해 볼 수 있어요.',
  },
  vietnam: {
    name: '베트남',
    heroFile: 'Hanoi, Vietnam, Hoan Kiem Lake.jpg',
    lifeFile: 'Daily life in Vietnam Street vendor.jpg',
    foodFile: 'Pho in Saigon.jpg',
    cultureFile: 'Lake in Hanoi.jpg',
    hero: '하노이 호안끼엠 호수 주변의 실제 모습이에요. 도시 속에서 사람들이 쉬고 걷고 만나는 대표적인 공공 공간을 살펴봐요.',
    life: '거리에서 일하는 성인의 실제 생활 장면이에요. 시장과 상점 문화 속에서 다양한 직업과 이동식 판매 문화를 떠올릴 수 있어요.',
    food: '베트남에서 널리 알려진 쌀면 음식인 퍼(Phở)의 실제 사진이에요. 국물과 향채를 곁들이는 식사 문화를 생각해 볼 수 있어요.',
    culture: '하노이의 호수 풍경을 보여 주는 실제 사진이에요. 도시 안의 물가 공간이 사람들의 휴식과 이동에 어떤 역할을 하는지 생각해 봐요.',
    school: '학교생활 그림 자료예요. 교실에서 배우고 친구와 인사하는 모습, 학교 준비물을 상상하며 말 배우기와 연결해 보세요.',
    map: '베트남의 길쭉한 지형과 강·바다 환경을 보여 주는 그림 자료예요. 기후와 쌀 재배 문화가 음식과 어떻게 이어지는지도 생각해 볼 수 있어요.',
  },
  china: {
    name: '중국',
    heroFile: 'Beijing skyline from northeast 4th ring road.jpg',
    lifeFile: 'Wangfujing street, Beijing.JPG',
    foodFile: 'Jiaozi.jpg',
    cultureFile: 'Temple-of-heaven.jpg',
    hero: '베이징의 스카이라인을 보여 주는 실제 사진이에요. 고층 건물과 넓은 도로, 업무 지구가 있는 현대 중국 도시의 한 모습을 살펴봐요.',
    life: '베이징의 왕푸징 보행거리 실제 사진이에요. 쇼핑과 산책, 만남이 이루어지는 대표적인 도시 공공 공간의 한 예예요.',
    food: '자오쯔(만두)의 실제 사진이에요. 중국 음식은 지역마다 밀가루 요리, 쌀 요리, 향신료 사용이 달라질 수 있어요.',
    culture: '베이징 천단의 실제 모습이에요. 역사 공간을 보더라도 오늘날의 다양한 중국 생활과 함께 이해해야 해요.',
    school: '학교생활 그림 자료예요. 친구와 인사하고 한자를 익히며 배우는 장면을 상상해 볼 수 있어요.',
    map: '넓은 영토와 다양한 지역 문화를 떠올리게 하는 그림 자료예요. 북쪽과 남쪽의 기후·음식 차이를 연결해 볼 수 있어요.',
  },
  mongolia: {
    name: '몽골',
    heroFile: 'Ulaanbaatar city Mongolia 20230926 102617.jpg',
    lifeFile: 'Peace Avenue, Ulaanbaatar, Mongolia - 2023.jpg',
    foodFile: 'Mongolian buuz.jpg',
    cultureFile: 'Mongolia-terelj.jpg',
    hero: '울란바토르의 실제 도시 전경이에요. 몽골에는 초원뿐 아니라 아파트, 도로, 광장이 있는 도시 생활도 함께 존재해요.',
    life: '울란바토르의 실제 거리 모습이에요. 버스와 자동차, 상점과 보행자가 어우러진 현대적인 도시 생활을 살펴봐요.',
    food: '몽골 음식 부즈의 실제 사진이에요. 고기 요리, 유제품, 차 문화가 추운 기후와 어떻게 연결되는지 생각해 볼 수 있어요.',
    culture: '테를지 지역의 실제 풍경이에요. 넓은 초원과 자연환경이 이동 생활, 가축 돌봄, 주거 문화와 어떤 관련이 있는지 떠올려 봐요.',
    school: '학교생활 그림 자료예요. 도시 학생과 초원 지역 학생 모두 학교에서 배우고 놀이하며 생활할 수 있다는 점을 생각해 보세요.',
    map: '초원, 산지, 도시를 함께 떠올리게 하는 그림 자료예요. 자연환경과 게르 문화의 관계를 연결해 볼 수 있어요.',
  },
  philippines: {
    name: '필리핀',
    heroFile: 'Rizal Park from above.jpg',
    lifeFile: 'Binondo - Quintin Paredes (Manila; 11-24-2019).jpg',
    foodFile: 'Adobo Filipino style.jpg',
    cultureFile: 'Rizal Monument at Rizal Park.jpg',
    hero: '마닐라 리살 공원을 위에서 바라본 실제 사진이에요. 도시 안에서 시민들이 쉬고 모이는 큰 공공 공간의 역할을 살펴봐요.',
    life: '마닐라 비논도의 실제 거리 장면이에요. 상점, 간판, 차량과 보행자가 함께 있는 활기찬 도시 일상을 관찰해 봐요.',
    food: '필리핀식 아도보의 실제 사진이에요. 고기나 채소를 식초와 간장으로 조리하는 가정식의 한 예이며 집마다 맛이 조금씩 달라요.',
    culture: '리살 기념비가 있는 실제 장소 사진이에요. 역사 인물을 기리는 공공 기념 공간이 시민 교육과 기억에 어떤 역할을 하는지 생각해 봐요.',
    school: '학교생활 그림 자료예요. 여러 언어를 쓰는 친구들이 교실에서 함께 배우는 모습을 떠올려 볼 수 있어요.',
    map: '섬이 많은 나라의 특징을 보여 주는 그림 자료예요. 바다와 이동, 지역별 말과 생활 차이를 연결해 생각해 볼 수 있어요.',
  },
  thailand: {
    name: '태국',
    heroFile: 'Bangkok skyline, Bangkok, Thailand.jpg',
    lifeFile: 'Bangkok Chatuchak Market 1.jpg',
    foodFile: 'Pad Thai in Thailand.jpg',
    cultureFile: 'ThaiBangkokWatArun.jpg',
    hero: '방콕의 실제 도시 전경이에요. 고층 건물, 도로, 강 주변 생활이 함께 있는 동남아시아의 대도시 모습을 관찰해 봐요.',
    life: '방콕 짜뚜짝 시장의 실제 모습이에요. 시장은 사람과 물건, 음식이 만나며 지역 경제와 생활이 이어지는 공간이에요.',
    food: '태국에서 촬영된 팟타이의 실제 사진이에요. 단맛·짠맛·신맛이 어우러진 태국 음식의 특징을 떠올릴 수 있어요.',
    culture: '방콕 왓 아룬의 실제 모습이에요. 종교·역사 공간을 존중하며 관찰해요.',
    school: '학교생활 그림 자료예요. 친구와 인사하고 예의를 표현하는 태국의 인사말을 교실 장면과 연결해 볼 수 있어요.',
    map: '열대 기후, 강, 바다를 떠올리게 하는 그림 자료예요. 과일과 쌀 요리가 왜 발달했는지 생각해 볼 수 있어요.',
  },
  uzbekistan: {
    name: '우즈베키스탄',
    heroFile: 'View from Hotel Uzbekistan in Tashkent 2.jpg',
    lifeFile: 'The Street of Tashkent.jpg',
    foodFile: 'Plov.jpg',
    cultureFile: 'Registan Samarkand.jpg',
    hero: '타슈켄트의 광장과 주변 도시 전경을 보여 주는 실제 사진이에요. 중앙아시아의 현대 도시 공간과 넓은 도로, 공공 장소를 함께 살펴봐요.',
    life: '타슈켄트 거리의 실제 생활 장면이에요. 이동하는 사람들과 도심 환경을 보며 오늘날의 일상을 관찰해 봐요.',
    food: '우즈베키스탄의 플로브(팔로브) 실제 사진이에요. 쌀, 고기, 당근을 큰 냄비에 함께 익혀 여러 사람이 나누어 먹는 식사 문화를 떠올릴 수 있어요.',
    culture: '사마르칸트 레기스탄의 실제 건축 공간이에요. 실크로드를 통한 교류의 흔적과 이슬람 건축의 특징을 살펴봐요.',
    school: '학교생활 그림 자료예요. 교실에서 배우는 오늘날의 생활과 실크로드 역사 이야기를 함께 연결해 볼 수 있어요.',
    map: '실크로드의 길과 사막·오아시스 도시를 떠올리게 하는 그림 자료예요. 교류가 음식과 옷, 건축에 남긴 흔적을 생각해 볼 수 있어요.',
  },
  india: {
    name: '인도',
    heroFile: 'Connaught Place New Delhi.jpg',
    lifeFile: 'Street scene in Old Delhi (5621280682).jpg',
    foodFile: 'INDIAN thali.jpg',
    cultureFile: 'India gate new delhi.jpg',
    hero: '뉴델리 코넛 플레이스의 실제 사진이에요. 원형 광장과 상점가가 모여 있는 도시 중심 공간을 보며 현대 인도의 수도 생활을 떠올려 봐요.',
    life: '올드델리의 실제 거리 장면이에요. 사람, 상점, 차량과 골목길이 어우러진 도시의 활기찬 일상을 관찰해 봐요.',
    food: '여러 음식을 한 상에 담은 탈리의 실제 사진이에요. 향신료 사용, 채식과 비채식 선택, 지역마다 다른 빵과 밥 문화를 함께 생각해 볼 수 있어요.',
    culture: '뉴델리의 인디아 게이트 실제 모습이에요. 시민들이 찾는 공공 기념 공간으로서의 의미를 살펴봐요.',
    school: '학교생활 그림 자료예요. 여러 언어 배경을 가진 학생들이 교실에서 함께 배우는 장면을 상상해 볼 수 있어요.',
    map: '넓은 지역과 기후 차이를 보여 주는 그림 자료예요. 북쪽과 남쪽의 음식, 언어, 옷차림 차이를 떠올려 볼 수 있어요.',
  },
  japan: {
    name: '일본',
    heroFile: 'Shibuya Crossing in Tokyo.jpg',
    lifeFile: 'Crowded Shibuya street.jpg',
    foodFile: 'Onigiri.JPG',
    cultureFile: 'Sensoji temple tokyo.jpg',
    hero: '도쿄 시부야 스크램블 교차로의 실제 모습이에요. 많은 사람들이 정해진 신호에 맞춰 함께 이동하는 대도시의 대표 장면을 살펴봐요.',
    life: '시부야의 실제 보행 거리 장면이에요. 상점, 간판, 보행자가 많은 도시 공간이 어떻게 운영되는지 살펴봐요.',
    food: '일본에서 촬영된 오니기리의 실제 사진이에요. 쌀밥과 다양한 속재료, 간편하게 먹는 식사 문화를 떠올릴 수 있어요.',
    culture: '도쿄 센소지의 실제 모습이에요. 역사 공간과 현대 도시가 함께 있는 모습을 살펴봐요.',
    school: '학교생활 그림 자료예요. 학교 급식, 청소 활동, 동아리처럼 학생들이 함께 생활하는 장면을 연결해 볼 수 있어요.',
    map: '섬나라와 계절 변화를 떠올리게 하는 그림 자료예요. 해산물과 쌀 문화, 지역 축제를 생각해 볼 수 있어요.',
  },
  brazil: {
    name: '브라질',
    heroFile: 'Street Scene - Santa Teresa District - Rio de Janeiro - Brazil.jpg',
    lifeFile: 'Pedestrians and street stalls in Rio de Janeiro, Brazil.jpg',
    foodFile: 'Brazilian food Feijoada.jpg',
    cultureFile: 'Sugarloaf, Rio, Brazil.jpg',
    hero: '리우데자네이루 산타테레사의 실제 거리 모습이에요. 언덕길과 주거지, 골목 풍경을 보며 브라질 도시 생활의 한 장면을 살펴봐요.',
    life: '리우데자네이루의 보행자와 거리 가판대가 보이는 실제 생활 장면이에요. 길거리 상점과 사람들의 이동이 어우러진 일상을 관찰해 봐요.',
    food: '브라질 음식 페이조아다의 실제 사진이에요. 콩과 고기, 밥을 함께 먹는 식생활의 한 예를 볼 수 있어요.',
    culture: '리우데자네이루 슈거로프 산의 실제 풍경이에요. 도시와 바다, 산이 가까이 만나는 브라질의 자연·관광 환경을 보여 주는 한 사례예요.',
    school: '학교생활 그림 자료예요. 포르투갈어를 배우고 친구와 운동·놀이를 하는 학교 일상을 떠올려 볼 수 있어요.',
    map: '넓은 영토와 열대우림, 해안 도시를 떠올리게 하는 그림 자료예요. 기후와 지역 차이가 생활에 주는 영향을 생각해 볼 수 있어요.',
  },
  egypt: {
    name: '이집트',
    heroFile: 'The Nile at Cairo.jpg',
    lifeFile: 'Life street in old Cairo.jpg',
    foodFile: 'Egyptian Koshari.jpg',
    cultureFile: 'Cairo City.jpg',
    hero: '카이로를 흐르는 나일강의 실제 모습이에요. 강 주변에 도시 생활이 이어지는 이유와 물의 중요성을 생각해 봐요.',
    life: '올드 카이로의 실제 거리 장면이에요. 상점과 사람들의 이동, 도심 생활이 이어지는 모습을 관찰해 봐요.',
    food: '쌀, 렌틸콩, 파스타 등을 함께 담아 먹는 코샤리의 실제 사진이에요. 여러 재료를 한 그릇에 담는 식사의 특징을 볼 수 있어요.',
    culture: '카이로의 실제 도시 전경이에요. 이집트는 피라미드뿐 아니라 오늘날의 큰 도시 생활도 함께 존재함을 살펴봐요.',
    school: '학교생활 그림 자료예요. 오늘날의 학생들이 교실에서 배우는 모습과 역사 이야기를 함께 떠올릴 수 있어요.',
    map: '사막과 나일강, 도시를 함께 떠올리게 하는 그림 자료예요. 물이 모이는 곳 주변에 생활이 이어지는 이유를 생각해 볼 수 있어요.',
  },
  france: {
    name: '프랑스',
    heroFile: 'Paris from the Eiffel Tower.JPG',
    lifeFile: 'Paris street life. On the banks of the Seine. 4 June 2017.jpg',
    foodFile: 'Baguettes, Paris, France - panoramio.jpg',
    cultureFile: 'Paris Place du Carrousel, le Louvre.jpg',
    hero: '에펠탑에서 내려다본 파리의 실제 모습이에요. 강, 다리, 도로, 건물이 함께 어우러진 수도의 도시 구조를 관찰해 봐요.',
    life: '센강 주변에서 사람들이 쉬는 실제 공공장소의 일상 장면이에요. 걷기, 대화, 휴식 같은 도시 생활을 관찰해 봐요.',
    food: '파리에서 촬영된 바게트의 실제 사진이에요. 빵과 치즈, 다양한 식재료를 즐기는 식문화의 한 예를 생각해 볼 수 있어요.',
    culture: '파리 루브르 박물관 안뜰의 실제 모습이에요. 예술·역사 공간 중 한 사례로 살펴봐요.',
    school: '학교생활 그림 자료예요. 인사와 예절 표현을 사용하며 교실에서 함께 배우는 모습을 떠올릴 수 있어요.',
    map: '프랑스의 여러 지역과 농업·도시 문화를 연결해 보는 그림 자료예요. 지역마다 음식과 말투가 달라질 수 있음을 생각해 볼 수 있어요.',
  },
};

export const countryMedia: Record<string, CountryMedia> = Object.fromEntries(
  Object.entries(seeds).map(([id, c]) => [id, {
    hero: reviewed(c.heroFile, img(id, 'hero'), `${c.name}의 실제 도시·지역 사진`, c.hero, '풍경'),
    gallery: [
      reviewed(c.lifeFile, img(id, 'life'), `${c.name}의 실제 생활·거리 사진`, c.life, '생활'),
      reviewed(c.cultureFile, img(id, 'culture'), `${c.name}의 실제 문화·지역 자료 사진`, c.culture, '문화'),
      reviewed(c.foodFile, img(id, 'food'), `${c.name} 음식의 실제 사진`, c.food, '음식'),
      illustrated(img(id, 'school'), `${c.name}의 학교생활 그림 자료`, c.school, '생활'),
      illustrated(img(id, 'map'), `${c.name}의 위치와 특징 그림 자료`, c.map, '문화'),
    ],
  }]),
);
