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
 * v1.2.0 student visual set.
 * Each built-in country now shows 6 visuals:
 * - 4 reviewed Wikimedia Commons photos (hero + food + life + culture)
 * - 2 local illustration cards (school life + location/key facts)
 * No live image search is exposed to students.
 */
const seeds: Record<string, MediaSeed> = {
  korea: {
    name: '한국',
    heroFile: 'Road in Seoul, KOREA.jpg',
    lifeFile: 'Streets of Seoul.jpg',
    foodFile: 'Korean.food-Bibimbap-01.jpg',
    cultureFile: 'Gyeongbokgung, Seoul.jpg',
    hero: '서울의 실제 도로와 도시 모습을 보며 현대 한국의 한 장면을 살펴봐요.',
    life: '서울의 실제 거리 사진이에요. 같은 도시 안에서도 사람마다 이동 방식과 하루 일과는 달라요.',
    food: '콩나물 비빔밥의 실제 사진이에요. 한국에는 지역의 재료와 계절에 따라 다양한 밥상 문화가 있어요.',
    culture: '서울 경복궁의 실제 모습이에요. 역사적인 공간과 오늘날의 생활 공간을 함께 떠올려 봐요.',
    school: '학교 그림 자료예요. 급식, 체육, 동아리처럼 학생들이 함께 배우고 생활하는 모습을 생각해 볼 수 있어요.',
    map: '위치·계절·생활 자료를 담은 그림이에요. 바다와 산, 사계절 환경이 생활과 음식에 어떤 영향을 주는지 연결해 볼 수 있어요.',
  },
  vietnam: {
    name: '베트남',
    heroFile: 'Vietnam, Hanoi, Life on the streets of Hanoi.jpg',
    lifeFile: 'Daily life in Vietnam Street vendor.jpg',
    foodFile: 'Pho in Saigon.jpg',
    cultureFile: 'Hoan Kiem Lake photo.jpg',
    hero: '하노이의 실제 거리 모습이에요. 오토바이, 가게, 보행자가 함께 어우러진 도시 일상을 관찰해 봐요.',
    life: '거리에서 일하는 성인의 실제 생활 장면이에요. 시장과 상점 문화 속에서 다양한 직업을 떠올릴 수 있어요.',
    food: '베트남에서 널리 알려진 쌀면 음식인 퍼(Phở)의 실제 사진이에요. 국물과 향채를 곁들이는 식사 문화를 생각해 볼 수 있어요.',
    culture: '하노이 호안끼엠 호수의 실제 모습이에요. 사람들이 쉬고 걷는 공공 공간의 역할을 살펴봐요.',
    school: '학교생활 그림 자료예요. 교실에서 배우고 친구와 인사하는 모습, 학교 준비물을 상상하며 말 배우기와 연결해 보세요.',
    map: '베트남의 길쭉한 지형과 강·바다 환경을 보여 주는 그림 자료예요. 기후와 쌀 재배 문화가 음식과 어떻게 이어지는지도 생각해 볼 수 있어요.',
  },
  china: {
    name: '중국',
    heroFile: 'Street life in Beijing 07.jpg',
    lifeFile: 'Street life in Beijing 02.jpg',
    foodFile: 'Jiaozi.jpg',
    cultureFile: 'Temple-of-heaven.jpg',
    hero: '베이징의 실제 거리 사진으로 넓은 중국의 도시 생활 중 한 사례를 살펴봐요.',
    life: '베이징 거리의 실제 일상 장면이에요. 한 도시 안에서도 출근·통학·쇼핑 등 다양한 생활이 이어져요.',
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
    hero: '울란바토르의 실제 도시 전경이에요. 몽골에는 초원뿐 아니라 큰 도시 생활도 있어요.',
    life: '울란바토르의 실제 거리 모습이에요. 현대적인 도시 생활과 교통, 상점의 모습을 함께 살펴봐요.',
    food: '몽골 음식 부즈의 실제 사진이에요. 고기 요리, 유제품, 차 문화가 추운 기후와 어떻게 연결되는지 생각해 볼 수 있어요.',
    culture: '테를지 국립공원의 실제 풍경이에요. 넓은 초원과 자연환경이 이동 생활과 어떤 관련이 있는지 떠올려 봐요.',
    school: '학교생활 그림 자료예요. 도시 학생과 초원 지역 학생 모두 학교에서 배우고 놀이하며 생활할 수 있다는 점을 생각해 보세요.',
    map: '초원, 산지, 도시를 함께 떠올리게 하는 그림 자료예요. 자연환경과 게르 문화의 관계를 연결해 볼 수 있어요.',
  },
  philippines: {
    name: '필리핀',
    heroFile: 'Manila street.jpg',
    lifeFile: 'Binondo - Quintin Paredes (Manila; 11-24-2019).jpg',
    foodFile: 'Adobo Filipino style.jpg',
    cultureFile: 'Rizal Park.jpg',
    hero: '마닐라의 실제 거리 사진이에요. 여러 섬과 지역 중 한 도시의 모습을 살펴봐요.',
    life: '마닐라 비논도의 실제 거리 장면이에요. 상점과 사람들이 오가는 활기찬 도시 일상을 관찰해 봐요.',
    food: '필리핀식 아도보의 실제 사진이에요. 식초와 간장으로 맛을 내는 조리법의 한 예이며 가정마다 방식이 다를 수 있어요.',
    culture: '마닐라 리살 공원의 실제 모습이에요. 사람들이 함께 쉬고 모이는 공공 공간의 의미를 생각해 봐요.',
    school: '학교생활 그림 자료예요. 여러 언어를 쓰는 친구들이 교실에서 함께 배우는 모습을 떠올려 볼 수 있어요.',
    map: '섬이 많은 나라의 특징을 보여 주는 그림 자료예요. 바다와 이동, 지역별 말과 생활 차이를 연결해 생각해 볼 수 있어요.',
  },
  thailand: {
    name: '태국',
    heroFile: 'Bangkok, Thailand skyline, 30 March 2023.jpg',
    lifeFile: 'Bangkok Chatuchak Market 1.jpg',
    foodFile: 'Pad Thai in Thailand.jpg',
    cultureFile: 'ThaiBangkokWatArun.jpg',
    hero: '방콕의 실제 도시 전경이에요. 현대적인 대도시의 모습을 관찰해 봐요.',
    life: '방콕 짜뚜짝 시장의 실제 모습이에요. 시장은 사람과 물건, 음식이 만나는 생활 공간 중 하나예요.',
    food: '태국에서 촬영된 팟타이의 실제 사진이에요. 단맛·짠맛·신맛이 어우러진 태국 음식의 특징을 떠올릴 수 있어요.',
    culture: '방콕 왓 아룬의 실제 모습이에요. 종교·역사 공간을 존중하며 관찰해요.',
    school: '학교생활 그림 자료예요. 친구와 인사하고 예의를 표현하는 태국의 인사말을 교실 장면과 연결해 볼 수 있어요.',
    map: '열대 기후, 강, 바다를 떠올리게 하는 그림 자료예요. 과일과 쌀 요리가 왜 발달했는지 생각해 볼 수 있어요.',
  },
  uzbekistan: {
    name: '우즈베키스탄',
    heroFile: 'The Street of Tashkent.jpg',
    lifeFile: 'Street in Tashkent.jpg',
    foodFile: 'Plov.jpg',
    cultureFile: 'Registan Samarkand.jpg',
    hero: '타슈켄트의 실제 거리 모습이에요. 중앙아시아의 현대 도시 환경을 살펴봐요.',
    life: '타슈켄트의 또 다른 실제 거리 사진이에요. 한 도시 안에도 다양한 공간이 있음을 비교해 봐요.',
    food: '우즈베키스탄의 플로브(팔로브) 실제 사진이에요. 쌀과 고기, 채소를 큰 냄비에 함께 익히는 식사 문화를 떠올릴 수 있어요.',
    culture: '사마르칸트 레기스탄의 실제 건축 공간이에요. 교류의 역사를 떠올리며 살펴봐요.',
    school: '학교생활 그림 자료예요. 교실에서 배우는 오늘날의 생활과 실크로드 역사 이야기를 함께 연결해 볼 수 있어요.',
    map: '실크로드의 길과 사막·오아시스 도시를 떠올리게 하는 그림 자료예요. 교류가 음식과 옷, 건축에 남긴 흔적을 생각해 볼 수 있어요.',
  },
  india: {
    name: '인도',
    heroFile: 'Street delhi connaught place.jpg',
    lifeFile: 'Street scene in Old Delhi (5621280682).jpg',
    foodFile: 'INDIAN thali.jpg',
    cultureFile: 'India gate new delhi.jpg',
    hero: '델리 코넛 플레이스의 실제 거리 사진이에요. 인도의 수많은 지역 중 한 도시 모습을 살펴봐요.',
    life: '올드델리의 실제 거리 장면이에요. 사람과 교통, 상점이 함께 있는 도시 일상을 관찰해 봐요.',
    food: '여러 음식을 한 상에 담은 탈리의 실제 사진이에요. 향신료와 채식·비채식 선택, 지역별 빵·밥 문화의 다양성을 떠올려 볼 수 있어요.',
    culture: '뉴델리의 인디아 게이트 실제 모습이에요. 도시의 공공 기념 건축물 중 한 사례로 살펴봐요.',
    school: '학교생활 그림 자료예요. 여러 언어 배경을 가진 학생들이 교실에서 함께 배우는 장면을 상상해 볼 수 있어요.',
    map: '넓은 지역과 기후 차이를 보여 주는 그림 자료예요. 북쪽과 남쪽의 음식, 언어, 옷차림 차이를 떠올려 볼 수 있어요.',
  },
  japan: {
    name: '일본',
    heroFile: 'Tokyo street.jpg',
    lifeFile: 'Crowded Shibuya street.jpg',
    foodFile: 'Onigiri.JPG',
    cultureFile: 'Sensoji temple tokyo.jpg',
    hero: '도쿄의 실제 거리 사진이에요. 현대 일본의 여러 도시 모습 중 한 사례예요.',
    life: '시부야의 실제 보행 거리 장면이에요. 많은 사람이 함께 이용하는 도시 공간을 살펴봐요.',
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
    hero: '리우데자네이루 산타테레사의 실제 거리 모습이에요. 넓은 브라질의 한 지역을 살펴봐요.',
    life: '리우데자네이루의 보행자와 거리 가판대가 보이는 실제 생활 장면이에요.',
    food: '브라질 음식 페이조아다의 실제 사진이에요. 콩과 고기, 밥을 함께 먹는 식생활의 한 예를 볼 수 있어요.',
    culture: '리우데자네이루 슈거로프 산의 실제 풍경이에요. 브라질의 여러 자연환경 중 한 사례예요.',
    school: '학교생활 그림 자료예요. 포르투갈어를 배우고 친구와 운동·놀이를 하는 학교 일상을 떠올려 볼 수 있어요.',
    map: '넓은 영토와 열대우림, 해안 도시를 떠올리게 하는 그림 자료예요. 기후와 지역 차이가 생활에 주는 영향을 생각해 볼 수 있어요.',
  },
  egypt: {
    name: '이집트',
    heroFile: 'Cairo City.jpg',
    lifeFile: 'Life street in old Cairo.jpg',
    foodFile: 'Egyptian Koshari.jpg',
    cultureFile: 'The Nile at Cairo.jpg',
    hero: '카이로의 실제 도시 전경이에요. 고대 유적뿐 아니라 오늘날의 대도시 생활도 함께 살펴봐요.',
    life: '카이로의 실제 거리에서 일하는 성인의 일상 장면이에요. 상점과 사람들의 이동이 이어지는 도시 생활을 관찰해 봐요.',
    food: '쌀·렌틸콩·파스타 등을 함께 먹는 코샤리의 실제 사진이에요. 여러 재료를 한 그릇에 담는 식사의 특징을 볼 수 있어요.',
    culture: '카이로를 지나는 나일강의 실제 모습이에요. 도시와 강이 생활에 미치는 영향을 생각해 봐요.',
    school: '학교생활 그림 자료예요. 오늘날의 학생들이 교실에서 배우는 모습과 역사 이야기를 함께 떠올릴 수 있어요.',
    map: '사막과 나일강, 도시를 함께 떠올리게 하는 그림 자료예요. 물이 모이는 곳 주변에 생활이 이어지는 이유를 생각해 볼 수 있어요.',
  },
  france: {
    name: '프랑스',
    heroFile: 'The Seine in Paris.jpg',
    lifeFile: 'Paris street life. On the banks of the Seine. 4 June 2017.jpg',
    foodFile: 'Baguettes, Paris, France - panoramio.jpg',
    cultureFile: 'Paris Place du Carrousel, le Louvre.jpg',
    hero: '파리 센강의 실제 사진이에요. 프랑스의 여러 지역 중 수도의 한 풍경을 살펴봐요.',
    life: '센강 주변에서 사람들이 쉬는 실제 공공장소의 일상 장면이에요. 걷기, 대화, 휴식 같은 생활을 관찰해 봐요.',
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
      reviewed(c.foodFile, img(id, 'food'), `${c.name} 음식의 실제 사진`, c.food, '음식'),
      reviewed(c.lifeFile, img(id, 'life'), `${c.name}의 실제 생활·거리 사진`, c.life, '생활'),
      reviewed(c.cultureFile, img(id, 'culture'), `${c.name}의 실제 문화·지역 자료 사진`, c.culture, '문화'),
      illustrated(img(id, 'school'), `${c.name}의 학교생활 그림 자료`, c.school, '생활'),
      illustrated(img(id, 'map'), `${c.name}의 위치와 특징 그림 자료`, c.map, '문화'),
    ],
  }]),
);
