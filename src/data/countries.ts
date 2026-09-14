import type { Country } from '../types';
import { countryMedia } from './countryMedia';
import { languagePacks } from './languagePacks';

const baseCountries: Country[] = [
  {
    id: 'korea', name: '한국', englishName: 'Korea', flag: '🇰🇷', region: '동아시아', colorClass: 'sky',
    intro: '우리에게 익숙한 생활도 세계의 여러 문화와 이어져 있어요. 한국의 다양한 모습을 출발점으로 세계를 비교해 봅시다.',
    greeting: { text: '안녕하세요', meaning: '반갑게 인사할 때 쓰는 말', lang: 'ko-KR' },
    phrases: [
      { text: '안녕하세요', meaning: 'Hello', lang: 'ko-KR' },
      { text: '고맙습니다', meaning: 'Thank you', lang: 'ko-KR' },
      { text: '또 만나요', meaning: 'See you again', lang: 'ko-KR' },
    ],
    foods: [
      { name: '김밥', description: '밥과 여러 재료를 김에 말아 만드는 음식의 한 예예요.', emoji: '🍙' },
      { name: '비빔밥', description: '밥에 여러 재료를 곁들여 비벼 먹는 음식으로 널리 알려져 있어요.', emoji: '🥗' },
    ],
    dailyLife: ['학교에서 친구들과 함께 배워요.', '가족이나 친구와 식사를 함께할 수 있어요.', '놀이·운동·온라인 활동 등 다양한 여가 생활을 해요.'],
    culture: [
      { title: '한글', description: '한국에서 사용하는 대표적인 문자 체계예요.', emoji: '🔤' },
      { title: '다양한 명절', description: '가정과 지역에 따라 여러 방식으로 명절과 기념일을 보내요.', emoji: '🎊' },
    ],
    comparePrompt: '내가 평소에 하는 생활 중 다른 나라 친구들도 비슷하게 할 것 같은 일을 골라보세요.',
    collectible: { id: 'korea-hangeul', name: '한글 카드', emoji: '🔤' },
    quiz: [
      { id: 'kr1', question: '한국에서 널리 사용하는 문자 체계는 무엇일까요?', options: ['한글', '키릴 문자', '데바나가리', '아랍 문자'], answer: 0, explanation: '한글은 한국에서 널리 사용하는 문자 체계예요.' },
      { id: 'kr2', question: '문화에 대해 바르게 말한 것은?', options: ['모든 한국인은 같은 생활을 한다.', '사람과 지역에 따라 생활 모습이 다를 수 있다.', '모두 같은 음식을 좋아한다.', '모두 같은 놀이를 한다.'], answer: 1, explanation: '같은 나라 안에서도 사람과 지역에 따라 생활 모습은 다양할 수 있어요.' },
      { id: 'kr3', question: '다른 문화와 비교할 때 좋은 태도는?', options: ['다른 점을 놀린다.', '내 문화만 옳다고 생각한다.', '같은 점과 다른 점을 함께 살핀다.', '모든 문화를 똑같다고 말한다.'], answer: 2, explanation: '공통점과 차이점을 함께 살피는 것이 중요해요.' },
    ],
  },
  {
    id: 'vietnam', name: '베트남', englishName: 'Vietnam', flag: '🇻🇳', region: '동남아시아', colorClass: 'green',
    intro: '베트남의 언어와 음식, 어린이들의 생활 모습을 살펴보며 우리와 비슷한 점도 찾아봐요.',
    greeting: { text: 'Xin chào', meaning: '안녕하세요', lang: 'vi-VN' },
    phrases: [
      { text: 'Xin chào', meaning: '안녕하세요', lang: 'vi-VN' },
      { text: 'Cảm ơn', meaning: '고맙습니다', lang: 'vi-VN' },
      { text: 'Tạm biệt', meaning: '안녕히 가세요 / 또 만나요', lang: 'vi-VN' },
    ],
    foods: [
      { name: '퍼(Phở)', description: '쌀로 만든 면을 이용하는 베트남의 널리 알려진 음식 중 하나예요.', emoji: '🍜' },
      { name: '반미(Bánh mì)', description: '빵에 여러 재료를 넣어 먹는 음식으로 널리 알려져 있어요.', emoji: '🥖' },
    ],
    dailyLife: ['학교에서 친구들과 함께 공부해요.', '가족과 식사를 함께할 수 있어요.', '지역과 가정에 따라 다양한 놀이와 취미를 즐겨요.'],
    culture: [
      { title: '아오자이', description: '베트남을 대표하는 전통 의복으로 널리 알려져 있어요. 모든 사람이 매일 입는 옷은 아니에요.', emoji: '👗' },
      { title: '수상 인형극', description: '물 위에서 인형을 움직이며 이야기를 보여주는 전통 공연이 있어요.', emoji: '🎭' },
    ],
    comparePrompt: '한국과 베트남 어린이의 생활에서 공통점을 2가지 이상 찾아보세요.',
    collectible: { id: 'vietnam-pho', name: '쌀국수 카드', emoji: '🍜' },
    quiz: [
      { id: 'vn1', question: '베트남에서 사용할 수 있는 인사말은?', options: ['Bonjour', 'Xin chào', 'Hello', 'Olá'], answer: 1, explanation: '“Xin chào”는 베트남어로 인사할 때 사용할 수 있는 표현이에요.' },
      { id: 'vn2', question: '베트남에서 널리 알려진 음식 중 하나는?', options: ['퍼(쌀국수)', '타코', '스시', '크루아상'], answer: 0, explanation: '퍼는 쌀면을 이용하는 베트남의 널리 알려진 음식이에요.' },
      { id: 'vn3', question: '한국과 베트남 어린이에게 모두 있을 수 있는 모습은?', options: ['모두 같은 언어 사용', '모두 같은 옷 착용', '친구와 함께 공부하기', '모두 같은 음식 먹기'], answer: 2, explanation: '사는 곳이 달라도 학교에서 친구와 배우는 경험은 비슷할 수 있어요.' },
    ],
  },
  {
    id: 'china', name: '중국', englishName: 'China', flag: '🇨🇳', region: '동아시아', colorClass: 'red',
    intro: '넓은 지역과 많은 사람들이 살아가는 중국에는 지역마다 다양한 언어·음식·생활 문화가 있어요.',
    greeting: { text: '你好', meaning: '안녕하세요', lang: 'zh-CN' },
    phrases: [
      { text: '你好', meaning: '안녕하세요 (Nǐ hǎo)', lang: 'zh-CN' },
      { text: '谢谢', meaning: '고맙습니다 (Xièxie)', lang: 'zh-CN' },
      { text: '再见', meaning: '또 만나요 (Zàijiàn)', lang: 'zh-CN' },
    ],
    foods: [
      { name: '만두', description: '반죽 안에 여러 재료를 넣어 만드는 음식은 중국 여러 지역에서 다양한 형태로 만날 수 있어요.', emoji: '🥟' },
      { name: '면 요리', description: '지역에 따라 매우 다양한 면 요리를 만날 수 있어요.', emoji: '🍜' },
    ],
    dailyLife: ['학교에서 여러 교과를 배우고 친구들과 활동해요.', '도시와 농촌, 지역에 따라 생활 모습이 크게 달라요.', '가족과 함께 식사하거나 명절을 보내는 모습도 다양해요.'],
    culture: [
      { title: '한자', description: '중국어 표기에 한자가 널리 사용돼요.', emoji: '🀄' },
      { title: '다양한 지역 문화', description: '중국은 매우 넓어 지역마다 음식·말·생활 방식이 다양해요.', emoji: '🗺️' },
    ],
    comparePrompt: '한국과 중국에서 사용하는 글자의 모습, 학교생활, 음식에서 공통점과 차이점을 찾아보세요.',
    collectible: { id: 'china-character', name: '한자 카드', emoji: '🀄' },
    quiz: [
      { id: 'cn1', question: '“你好”의 뜻은?', options: ['고맙습니다', '안녕하세요', '맛있어요', '잘 자요'], answer: 1, explanation: '“你好(Nǐ hǎo)”는 인사할 때 사용하는 대표적인 표현이에요.' },
      { id: 'cn2', question: '중국 문화에 대해 바른 설명은?', options: ['지역마다 모두 같다.', '매일 전통옷만 입는다.', '지역에 따라 문화가 다양하다.', '모든 사람이 같은 음식을 먹는다.'], answer: 2, explanation: '중국은 넓은 나라여서 지역마다 문화와 생활이 다양해요.' },
      { id: 'cn3', question: '중국어 표기에 널리 쓰이는 문자는?', options: ['한자', '한글', '키릴 문자', '그림만 사용'], answer: 0, explanation: '중국어 표기에는 한자가 널리 사용돼요.' },
    ],
  },
  {
    id: 'mongolia', name: '몽골', englishName: 'Mongolia', flag: '🇲🇳', region: '동아시아·중앙아시아', colorClass: 'blue',
    intro: '몽골의 도시와 초원 지역에는 서로 다른 생활 모습이 있으며 현대적인 생활과 전통 문화가 함께 존재해요.',
    greeting: { text: 'Сайн байна уу?', meaning: '안녕하세요', lang: 'mn-MN' },
    phrases: [
      { text: 'Сайн байна уу?', meaning: '안녕하세요', lang: 'mn-MN' },
      { text: 'Баярлалаа', meaning: '고맙습니다', lang: 'mn-MN' },
    ],
    foods: [
      { name: '부즈', description: '고기 등을 반죽 안에 넣어 쪄 먹는 음식으로 널리 알려져 있어요.', emoji: '🥟' },
      { name: '수테차이', description: '우유와 차를 이용하는 전통 음료로 알려져 있어요.', emoji: '🥛' },
    ],
    dailyLife: ['울란바토르 같은 도시에서 생활하는 사람도 많아요.', '초원 지역에서는 가축과 함께 생활하는 가정도 있어요.', '학생들은 학교에서 공부하고 친구들과 다양한 활동을 해요.'],
    culture: [
      { title: '게르', description: '이동과 조립이 가능한 전통 주거 형태로 잘 알려져 있어요.', emoji: '⛺' },
      { title: '말 문화', description: '역사적으로 말은 이동과 생활에 중요한 역할을 해왔어요.', emoji: '🐎' },
    ],
    comparePrompt: '도시 생활과 초원 생활이 어떻게 다를 수 있는지 생각하고, 우리 생활과 비슷한 점도 찾아보세요.',
    collectible: { id: 'mongolia-horse', name: '말 카드', emoji: '🐎' },
    quiz: [
      { id: 'mn1', question: '몽골의 전통 주거 형태로 널리 알려진 것은?', options: ['게르', '이글루', '수상가옥', '성'], answer: 0, explanation: '게르는 조립과 이동이 가능한 전통 주거 형태로 잘 알려져 있어요.' },
      { id: 'mn2', question: '몽골의 생활에 대해 알맞은 설명은?', options: ['모두 초원에서만 산다.', '도시와 초원 등 다양한 생활 모습이 있다.', '학교가 없다.', '모두 말을 타고 등교한다.'], answer: 1, explanation: '몽골에도 도시와 농촌·초원 등 여러 생활 모습이 있어요.' },
      { id: 'mn3', question: '다문화 학습에서 좋은 질문은?', options: ['왜 우리와 다르지?', '누가 더 좋은 문화지?', '어떤 점이 비슷하고 다를까?', '모두 똑같아야 하지 않을까?'], answer: 2, explanation: '비슷한 점과 다른 점을 함께 탐색하는 질문이 좋아요.' },
    ],
  },
  {
    id: 'philippines', name: '필리핀', englishName: 'Philippines', flag: '🇵🇭', region: '동남아시아', colorClass: 'yellow',
    intro: '많은 섬으로 이루어진 필리핀에는 지역과 언어가 다양하며 여러 문화가 함께 살아가고 있어요.',
    greeting: { text: 'Kumusta?', meaning: '안녕하세요 / 잘 지내요?', lang: 'fil-PH' },
    phrases: [
      { text: 'Kumusta?', meaning: '안녕하세요 / 잘 지내요?', lang: 'fil-PH' },
      { text: 'Salamat', meaning: '고맙습니다', lang: 'fil-PH' },
    ],
    foods: [
      { name: '판싯', description: '면을 이용한 여러 요리를 가리키는 이름으로 널리 알려져 있어요.', emoji: '🍜' },
      { name: '할로할로', description: '여러 재료와 얼음을 섞어 먹는 디저트로 잘 알려져 있어요.', emoji: '🍧' },
    ],
    dailyLife: ['여러 섬과 지역에 따라 생활 환경이 다양해요.', '학교에서 친구들과 공부하고 활동해요.', '가정에서 사용하는 언어가 서로 다를 수 있어요.'],
    culture: [
      { title: '티니클링', description: '대나무 장대를 이용하는 전통 춤으로 널리 알려져 있어요.', emoji: '🎋' },
      { title: '다양한 언어', description: '필리핀에는 여러 지역 언어가 사용돼요.', emoji: '🗣️' },
    ],
    comparePrompt: '우리 반에서도 서로 다른 말과 생활 경험을 가진 친구가 있을 수 있다는 점과 연결해 보세요.',
    collectible: { id: 'philippines-halo', name: '할로할로 카드', emoji: '🍧' },
    quiz: [
      { id: 'ph1', question: '“Salamat”의 뜻은?', options: ['안녕', '고맙습니다', '미안합니다', '잘 자요'], answer: 1, explanation: '“Salamat”은 고마움을 표현할 때 쓰는 말이에요.' },
      { id: 'ph2', question: '필리핀에 대해 알맞은 설명은?', options: ['한 개의 섬으로만 되어 있다.', '여러 섬과 지역이 있다.', '언어가 하나뿐이다.', '모든 사람이 같은 생활을 한다.'], answer: 1, explanation: '필리핀은 많은 섬으로 이루어져 있고 지역별 생활도 다양해요.' },
      { id: 'ph3', question: '티니클링과 관련된 것은?', options: ['대나무 장대', '눈썰매', '낙타', '빙하'], answer: 0, explanation: '티니클링은 대나무 장대를 이용하는 전통 춤으로 잘 알려져 있어요.' },
    ],
  },
  {
    id: 'thailand', name: '태국', englishName: 'Thailand', flag: '🇹🇭', region: '동남아시아', colorClass: 'purple',
    intro: '태국의 인사말과 음식, 축제와 일상생활을 살펴보며 다양한 문화가 현대 생활 속에서 어떻게 이어지는지 알아봐요.',
    greeting: { text: 'สวัสดี', meaning: '안녕하세요', lang: 'th-TH' },
    phrases: [
      { text: 'สวัสดี', meaning: '안녕하세요', lang: 'th-TH' },
      { text: 'ขอบคุณ', meaning: '고맙습니다', lang: 'th-TH' },
    ],
    foods: [
      { name: '팟타이', description: '쌀국수를 볶아 만드는 태국의 널리 알려진 음식 중 하나예요.', emoji: '🍝' },
      { name: '망고 찹쌀밥', description: '망고와 찹쌀을 함께 먹는 디저트로 알려져 있어요.', emoji: '🥭' },
    ],
    dailyLife: ['도시와 농촌에 따라 생활 모습이 다양해요.', '학교에서 친구들과 함께 공부해요.', '더운 기후에 맞춘 생활 모습을 볼 수 있는 지역도 있어요.'],
    culture: [
      { title: '송끄란', description: '태국의 새해와 관련된 축제로 널리 알려져 있으며 지역과 사람에 따라 참여 방식은 달라요.', emoji: '💦' },
      { title: '와이', description: '두 손을 모아 인사를 표현하는 모습이 널리 알려져 있어요.', emoji: '🙏' },
    ],
    comparePrompt: '태국과 한국에서 인사하는 방법을 비교해 보고, 상대방을 존중하는 마음이라는 공통점을 찾아보세요.',
    collectible: { id: 'thailand-mango', name: '망고 카드', emoji: '🥭' },
    quiz: [
      { id: 'th1', question: '태국에서 사용할 수 있는 인사말은?', options: ['สวัสดี', 'Xin chào', 'Olá', 'Bonjour'], answer: 0, explanation: '“สวัสดี”는 태국어의 대표적인 인사 표현이에요.' },
      { id: 'th2', question: '팟타이에 주로 사용되는 면은?', options: ['쌀로 만든 면', '감자만 사용', '면이 없는 음식', '옥수수빵'], answer: 0, explanation: '팟타이는 쌀국수를 이용하는 볶음면 요리로 널리 알려져 있어요.' },
      { id: 'th3', question: '인사 방법이 달라도 공통적으로 담을 수 있는 마음은?', options: ['존중', '경쟁', '놀림', '무시'], answer: 0, explanation: '인사 방식은 달라도 상대를 존중하고 반가움을 표현할 수 있어요.' },
    ],
  },
  {
    id: 'uzbekistan', name: '우즈베키스탄', englishName: 'Uzbekistan', flag: '🇺🇿', region: '중앙아시아', colorClass: 'teal',
    intro: '중앙아시아의 우즈베키스탄에서는 실크로드의 역사와 현대 생활이 함께 이어져요.',
    greeting: { text: 'Assalomu alaykum', meaning: '안녕하세요', lang: 'uz-UZ' },
    phrases: [
      { text: 'Assalomu alaykum', meaning: '안녕하세요', lang: 'uz-UZ' },
      { text: 'Rahmat', meaning: '고맙습니다', lang: 'uz-UZ' },
    ],
    foods: [
      { name: '플로프', description: '쌀과 여러 재료를 함께 조리하는 음식으로 널리 알려져 있어요.', emoji: '🍚' },
      { name: '논', description: '둥근 모양의 빵이 널리 알려져 있어요.', emoji: '🫓' },
    ],
    dailyLife: ['도시와 농촌의 생활 모습이 다양해요.', '학생들은 학교에서 여러 과목을 배워요.', '가정과 지역에 따라 다양한 언어와 전통을 만날 수 있어요.'],
    culture: [
      { title: '실크로드', description: '과거 여러 지역을 잇던 교류의 길과 관련된 도시들이 있어요.', emoji: '🐫' },
      { title: '전통 무늬', description: '건축과 직물 등에서 다양한 무늬와 색을 볼 수 있어요.', emoji: '🧵' },
    ],
    comparePrompt: '옛날 사람들이 서로 다른 지역을 오가며 물건과 문화를 나누었던 모습을 오늘날의 세계 교류와 비교해 보세요.',
    collectible: { id: 'uzbekistan-pattern', name: '실크로드 무늬 카드', emoji: '🧵' },
    quiz: [
      { id: 'uz1', question: '“Rahmat”의 뜻은?', options: ['고맙습니다', '안녕하세요', '학교', '친구'], answer: 0, explanation: '“Rahmat”은 고마움을 표현하는 우즈베크어예요.' },
      { id: 'uz2', question: '우즈베키스탄과 관련된 역사적 교류의 길은?', options: ['실크로드', '파나마 운하', '북극항로만', '해저터널'], answer: 0, explanation: '우즈베키스탄의 여러 도시는 실크로드 역사와 깊은 관련이 있어요.' },
      { id: 'uz3', question: '문화 교류에 대한 알맞은 설명은?', options: ['문화는 서로 영향을 주고받을 수 있다.', '문화는 절대 변하지 않는다.', '다른 문화와 만나면 안 된다.', '모든 문화는 완전히 같다.'], answer: 0, explanation: '사람들이 만나고 이동하며 문화도 서로 영향을 주고받을 수 있어요.' },
    ],
  },
  {
    id: 'india', name: '인도', englishName: 'India', flag: '🇮🇳', region: '남아시아', colorClass: 'orange',
    intro: '인도에는 여러 언어와 종교, 지역 문화가 함께 존재하며 생활 모습도 매우 다양해요.',
    greeting: { text: 'नमस्ते', meaning: '안녕하세요 (Namaste)', lang: 'hi-IN' },
    phrases: [
      { text: 'नमस्ते', meaning: '안녕하세요 (Namaste)', lang: 'hi-IN' },
      { text: 'धन्यवाद', meaning: '고맙습니다 (Dhanyavaad)', lang: 'hi-IN' },
    ],
    foods: [
      { name: '도사', description: '쌀과 콩 등을 이용해 만드는 얇은 음식으로 남인도에서 특히 잘 알려져 있어요.', emoji: '🥞' },
      { name: '다양한 커리 요리', description: '지역과 가정에 따라 재료와 향신료 조합이 매우 다양해요.', emoji: '🍛' },
    ],
    dailyLife: ['지역과 언어에 따라 생활 모습이 매우 다양해요.', '학생들은 학교에서 여러 교과와 언어를 배울 수 있어요.', '도시와 농촌의 환경과 생활은 서로 다를 수 있어요.'],
    culture: [
      { title: '여러 언어', description: '인도에서는 힌디어뿐 아니라 다양한 언어가 사용돼요.', emoji: '🗣️' },
      { title: '다양성', description: '넓은 지역에 많은 문화와 전통이 함께 존재해요.', emoji: '🌈' },
    ],
    comparePrompt: '한 나라 안에서도 여러 언어와 문화가 함께 존재할 수 있다는 점을 우리 사회와 연결해 생각해 보세요.',
    collectible: { id: 'india-lotus', name: '연꽃 카드', emoji: '🪷' },
    quiz: [
      { id: 'in1', question: '인도에서 사용하는 대표적인 인사 표현의 한 예는?', options: ['Namaste', 'Xin chào', 'Kumusta', 'Olá'], answer: 0, explanation: '“Namaste”는 인도에서 널리 알려진 인사 표현 중 하나예요.' },
      { id: 'in2', question: '인도의 언어에 대해 바르게 말한 것은?', options: ['한 가지 언어만 쓴다.', '여러 언어가 사용된다.', '문자가 없다.', '모든 지역의 말이 완전히 같다.'], answer: 1, explanation: '인도에서는 여러 언어가 사용돼요.' },
      { id: 'in3', question: '한 나라 안의 문화에 대해 알맞은 생각은?', options: ['모두 같아야 한다.', '지역과 사람에 따라 다양할 수 있다.', '전통만 문화다.', '음식만 문화다.'], answer: 1, explanation: '같은 나라 안에서도 언어, 음식, 생활 등은 다양할 수 있어요.' },
    ],
  },
  {
    id: 'japan', name: '일본', englishName: 'Japan', flag: '🇯🇵', region: '동아시아', colorClass: 'red',
    intro: '일본에는 여러 지역 문화와 현대적인 생활이 함께 존재해요. 가까운 이웃 나라의 학교생활과 표현을 살펴봐요.',
    greeting: { text: 'こんにちは', meaning: '안녕하세요 (Konnichiwa)', lang: 'ja-JP' },
    phrases: [
      { text: 'こんにちは', meaning: '안녕하세요', lang: 'ja-JP' },
      { text: 'ありがとう', meaning: '고맙습니다', lang: 'ja-JP' },
    ],
    foods: [
      { name: '오니기리', description: '밥을 여러 모양으로 빚어 먹는 음식의 한 예예요. 재료와 모양은 다양할 수 있어요.', emoji: '🍙' },
      { name: '우동', description: '굵은 면을 이용한 음식으로 지역에 따라 국물과 재료가 달라질 수 있어요.', emoji: '🍜' },
    ],
    dailyLife: ['학생들은 학교에서 교과 학습과 여러 활동을 해요.', '도시와 농촌, 지역에 따라 생활 모습이 달라요.', '가정마다 식사와 여가 생활도 다양할 수 있어요.'],
    culture: [
      { title: '마쓰리', description: '지역마다 서로 다른 축제가 열리며 참여 방식도 다양해요.', emoji: '🏮' },
      { title: '현대와 전통', description: '전통문화와 현대적인 생활이 함께 나타나는 모습을 볼 수 있어요.', emoji: '🏙️' },
    ],
    comparePrompt: '한국과 일본의 학교생활에서 비슷한 점과 다른 점을 한 가지씩 찾아보세요.',
    collectible: { id: 'japan-lantern', name: '축제 등불 카드', emoji: '🏮' },
    quiz: [
      { id: 'jp1', question: '“ありがとう”의 뜻은?', options: ['고맙습니다', '안녕하세요', '미안합니다', '잘 자요'], answer: 0, explanation: '“ありがとう”는 고마움을 나타내는 표현이에요.' },
      { id: 'jp2', question: '일본의 지역 문화에 대해 알맞은 설명은?', options: ['지역마다 다양한 문화가 있을 수 있다.', '모든 지역의 생활은 완전히 같다.', '전통문화만 존재한다.', '모든 사람이 같은 음식을 먹는다.'], answer: 0, explanation: '한 나라 안에서도 지역과 사람에 따라 문화와 생활은 다양할 수 있어요.' },
      { id: 'jp3', question: '가까운 이웃 나라 문화를 배울 때 좋은 태도는?', options: ['공통점과 차이를 함께 살펴본다.', '누가 더 좋은지 순위를 매긴다.', '다른 점을 놀린다.', '한 가지 모습으로 판단한다.'], answer: 0, explanation: '서로의 공통점과 차이를 존중하며 살펴보는 태도가 중요해요.' },
    ],
  },
  {
    id: 'brazil', name: '브라질', englishName: 'Brazil', flag: '🇧🇷', region: '남아메리카', colorClass: 'green',
    intro: '브라질은 매우 넓은 나라로 지역과 가정, 언어 배경에 따라 생활 모습이 다양해요.',
    greeting: { text: 'Olá', meaning: '안녕하세요', lang: 'pt-BR' },
    phrases: [
      { text: 'Olá', meaning: '안녕하세요', lang: 'pt-BR' },
      { text: 'Obrigado', meaning: '고맙습니다의 한 표현', lang: 'pt-BR' },
    ],
    foods: [
      { name: '페이조아다', description: '콩과 여러 재료를 이용한 음식으로 널리 알려져 있으며 조리법은 다양해요.', emoji: '🍲' },
      { name: '팡 지 케이주', description: '치즈를 넣어 만드는 작은 빵으로 널리 알려진 음식 중 하나예요.', emoji: '🧀' },
    ],
    dailyLife: ['포르투갈어가 널리 사용되며 여러 언어 배경도 존재해요.', '도시와 농촌, 해안과 내륙의 생활 환경이 서로 달라요.', '학생들은 학교에서 공부하고 친구들과 다양한 활동을 해요.'],
    culture: [
      { title: '다양한 음악과 춤', description: '브라질에는 지역과 공동체에 따라 여러 음악과 춤 문화가 있어요.', emoji: '🎶' },
      { title: '축구와 여러 스포츠', description: '축구가 널리 알려져 있지만 사람들이 즐기는 활동은 다양해요.', emoji: '⚽' },
    ],
    comparePrompt: '브라질의 넓은 지역에서 생활 모습이 달라질 수 있다는 점을 우리나라의 지역 차이와 연결해 보세요.',
    collectible: { id: 'brazil-music', name: '리듬 카드', emoji: '🎶' },
    quiz: [
      { id: 'br1', question: '브라질에서 널리 사용되는 언어는?', options: ['포르투갈어', '한국어', '일본어만', '프랑스어만'], answer: 0, explanation: '브라질에서는 포르투갈어가 널리 사용돼요.' },
      { id: 'br2', question: '브라질의 생활에 대해 알맞은 것은?', options: ['지역에 따라 다양한 생활 모습이 있다.', '모든 사람이 같은 생활을 한다.', '모든 사람이 축구선수다.', '음식이 한 종류뿐이다.'], answer: 0, explanation: '브라질은 넓은 나라여서 지역과 사람에 따라 생활 모습이 다양해요.' },
      { id: 'br3', question: '다른 나라의 유명한 문화를 볼 때 기억할 점은?', options: ['유명한 한 가지가 그 나라 전체를 뜻하지 않는다.', '모든 사람이 반드시 참여한다.', '유명한 문화만 배우면 된다.', '사람을 문화로 판단해도 된다.'], answer: 0, explanation: '유명한 문화는 다양한 생활 중 한 예일 뿐이에요.' },
    ],
  },
  {
    id: 'egypt', name: '이집트', englishName: 'Egypt', flag: '🇪🇬', region: '아프리카', colorClass: 'yellow',
    intro: '이집트에서는 오랜 역사 유산과 현대의 도시·농촌 생활이 함께 이어져요.',
    greeting: { text: 'مرحباً', meaning: '안녕하세요 (Marhaban)', lang: 'ar-EG' },
    phrases: [
      { text: 'مرحباً', meaning: '안녕하세요', lang: 'ar-EG' },
      { text: 'شكراً', meaning: '고맙습니다', lang: 'ar-EG' },
    ],
    foods: [
      { name: '코샤리', description: '쌀, 면, 콩류 등을 함께 먹는 음식으로 널리 알려져 있어요.', emoji: '🍚' },
      { name: '아이시', description: '여러 식사에 곁들이는 빵의 한 종류로 알려져 있어요.', emoji: '🫓' },
    ],
    dailyLife: ['카이로 같은 큰 도시에서 생활하는 사람도 많아요.', '나일강 주변과 여러 지역의 환경은 서로 달라요.', '학생들은 학교와 가정에서 현대적인 생활을 해요.'],
    culture: [
      { title: '고대 유산', description: '피라미드와 여러 유적은 오래전 역사를 보여 주는 문화유산이에요.', emoji: '🔺' },
      { title: '오늘의 이집트', description: '고대 유적뿐 아니라 현대의 도시와 다양한 일상생활도 함께 살펴봐야 해요.', emoji: '🏙️' },
    ],
    comparePrompt: '역사 유산과 오늘날 사람들의 실제 생활을 구분해서 살펴보세요.',
    collectible: { id: 'egypt-nile', name: '나일강 카드', emoji: '🌊' },
    quiz: [
      { id: 'eg1', question: '이집트를 배울 때 함께 살펴봐야 하는 것은?', options: ['역사 유산과 오늘날의 생활', '피라미드만', '사막만', '옛날 이야기만'], answer: 0, explanation: '문화유산과 함께 오늘날 사람들의 다양한 생활도 살펴보는 것이 중요해요.' },
      { id: 'eg2', question: '“شكراً”의 뜻은?', options: ['고맙습니다', '학교', '안녕히 주무세요', '친구'], answer: 0, explanation: '“شكراً”는 고마움을 표현하는 아랍어예요.' },
      { id: 'eg3', question: '문화유산에 대한 알맞은 생각은?', options: ['현재 사람들의 생활 전체와 같지는 않다.', '모든 사람이 유적에서 산다.', '옛날과 지금은 완전히 같다.', '유산만 보면 현재 생활도 모두 알 수 있다.'], answer: 0, explanation: '역사 유산과 현재의 실제 생활은 구분해 이해해야 해요.' },
    ],
  },
  {
    id: 'france', name: '프랑스', englishName: 'France', flag: '🇫🇷', region: '유럽', colorClass: 'blue',
    intro: '프랑스에는 여러 지역과 다양한 배경의 사람들이 함께 살아가며 음식과 예술, 일상도 다양해요.',
    greeting: { text: 'Bonjour', meaning: '안녕하세요', lang: 'fr-FR' },
    phrases: [
      { text: 'Bonjour', meaning: '안녕하세요', lang: 'fr-FR' },
      { text: 'Merci', meaning: '고맙습니다', lang: 'fr-FR' },
    ],
    foods: [
      { name: '바게트', description: '길쭉한 형태의 빵으로 널리 알려진 음식 중 하나예요.', emoji: '🥖' },
      { name: '크레프', description: '얇게 부친 반죽에 여러 재료를 곁들여 먹는 음식이에요.', emoji: '🥞' },
    ],
    dailyLife: ['도시와 농촌, 여러 지역의 생활 환경이 달라요.', '학생들은 학교에서 다양한 교과와 활동을 경험해요.', '가정마다 사용하는 언어와 문화적 배경이 다를 수 있어요.'],
    culture: [
      { title: '박물관과 예술', description: '여러 시대와 지역의 예술 작품을 만날 수 있는 박물관이 있어요.', emoji: '🖼️' },
      { title: '다양한 지역 문화', description: '지역에 따라 음식, 말투, 축제와 생활 방식이 다를 수 있어요.', emoji: '🗺️' },
    ],
    comparePrompt: '프랑스와 우리나라에서 지역에 따라 음식이나 말투가 달라지는 예를 생각해 보세요.',
    collectible: { id: 'france-art', name: '미술관 카드', emoji: '🖼️' },
    quiz: [
      { id: 'fr1', question: '“Merci”의 뜻은?', options: ['고맙습니다', '안녕하세요', '친구', '학교'], answer: 0, explanation: '“Merci”는 고마움을 표현하는 프랑스어예요.' },
      { id: 'fr2', question: '프랑스 문화에 대해 알맞은 설명은?', options: ['지역과 사람에 따라 다양할 수 있다.', '모든 사람이 같은 음식을 먹는다.', '모두 파리에만 산다.', '예술만 문화다.'], answer: 0, explanation: '한 나라 안에서도 지역과 가정, 개인에 따라 문화는 다양해요.' },
      { id: 'fr3', question: '지역 문화를 비교할 때 좋은 방법은?', options: ['공통점과 차이를 함께 찾는다.', '더 좋은 지역을 고른다.', '다른 점을 놀린다.', '한 예를 전체라고 생각한다.'], answer: 0, explanation: '공통점과 차이를 함께 살펴보면 문화를 더 균형 있게 이해할 수 있어요.' },
    ],
  }
];



const contentEnhancements: Record<string, Pick<Country, 'intro' | 'foods' | 'dailyLife' | 'culture'>> = {
  korea: {
    intro: '한국의 일상은 학교, 아파트와 주택가, 시장, 지하철, 산과 바다가 가까운 지역 등 매우 다양해요. 익숙한 생활을 바탕으로 세계 여러 문화와 공통점과 차이점을 찾아봐요.',
    foods: [
      { name: '김밥', description: '밥과 달걀, 채소, 단무지 같은 재료를 김에 말아 만드는 음식이에요. 소풍이나 간단한 식사로 즐기기도 해요.', emoji: '🍙' },
      { name: '비빔밥', description: '밥 위에 나물, 고기, 달걀, 고추장 등을 올려 비벼 먹는 음식이에요. 여러 재료를 한 그릇에 담아 먹는 한국 식생활의 한 예예요.', emoji: '🥗' },
    ],
    dailyLife: ['학생들은 교실 수업뿐 아니라 급식, 체육, 동아리, 돌봄 등 학교에서 다양한 활동을 해요.', '지하철·버스 같은 대중교통을 이용하거나 걸어서 이동하는 도시 생활도 흔히 볼 수 있어요.', '사계절이 뚜렷해서 계절에 따라 옷차림, 놀이, 먹거리도 달라질 수 있어요.'],
    culture: [
      { title: '한글', description: '한글은 배우기 쉽고 소리를 적기 좋게 만든 문자예요. 안내판, 책, 휴대전화 등 일상 곳곳에서 만날 수 있어요.', emoji: '🔤' },
      { title: '명절과 나눔', description: '설날과 추석 같은 명절에는 가족과 음식을 나누고 인사를 드리기도 해요. 가정마다 보내는 방식은 다를 수 있어요.', emoji: '🎊' },
    ],
  },
  vietnam: {
    intro: '베트남은 남북으로 길게 이어진 나라라 지역에 따라 날씨와 음식, 생활 분위기가 달라질 수 있어요. 도시 생활과 강·바다 주변 생활을 함께 떠올리며 살펴봐요.',
    foods: [
      { name: '퍼(Phở)', description: '쌀로 만든 면을 따뜻한 국물에 넣고 향채를 곁들여 먹는 음식이에요. 아침이나 점심 식사로도 자주 알려져 있어요.', emoji: '🍜' },
      { name: '반미(Bánh mì)', description: '바게트 빵에 고기, 채소, 소스 등을 넣어 먹는 음식이에요. 프랑스 문화와 베트남 식재료가 만나 만들어진 예로도 볼 수 있어요.', emoji: '🥖' },
    ],
    dailyLife: ['오토바이와 자전거, 버스가 함께 다니는 활기찬 도시 교통 모습을 볼 수 있어요.', '쌀을 많이 재배하는 지역이 있어서 밥과 쌀면을 이용한 식생활이 널리 알려져 있어요.', '학교에서 공부하고 친구와 놀며 가족과 식사하는 모습은 우리와 비슷한 점도 많아요.'],
    culture: [
      { title: '아오자이', description: '아오자이는 베트남을 대표하는 전통 의복으로 알려져 있어요. 특별한 날이나 행사에서 볼 수 있으며 모든 사람이 매일 입는 옷은 아니에요.', emoji: '👗' },
      { title: '수상 인형극', description: '물 위 무대에서 인형을 움직이며 이야기를 들려주는 공연이에요. 물과 가까운 생활환경이 문화 속에 어떻게 담기는지도 생각해 볼 수 있어요.', emoji: '🎭' },
    ],
  },
  china: {
    intro: '중국은 매우 넓어서 북쪽과 남쪽, 도시와 농촌, 해안과 내륙의 생활이 서로 다를 수 있어요. 그래서 한 장면만 보고 중국 전체를 판단하지 않는 태도가 중요해요.',
    foods: [
      { name: '만두', description: '밀가루 반죽 안에 고기나 채소를 넣어 빚는 음식이에요. 찌거나 굽는 등 조리법도 다양해요.', emoji: '🥟' },
      { name: '면 요리', description: '칼국수처럼 넓은 면, 가는 면, 국물면, 볶음면 등 지역에 따라 매우 다양한 면 요리가 알려져 있어요.', emoji: '🍜' },
    ],
    dailyLife: ['큰 도시에서는 지하철과 높은 건물, 많은 상점을 볼 수 있고, 다른 지역에서는 또 다른 생활환경을 만날 수 있어요.', '학교에서는 교과 공부뿐 아니라 체육, 예술, 친구와의 모둠 활동도 할 수 있어요.', '지역에 따라 말, 음식 맛, 기후가 달라 생활 습관도 다르게 나타날 수 있어요.'],
    culture: [
      { title: '한자', description: '한자는 중국어를 적는 데 널리 쓰이는 문자예요. 오랜 역사 속에서 주변 여러 나라의 문자 문화에도 영향을 주었어요.', emoji: '🀄' },
      { title: '다양한 지역 문화', description: '북경오리, 딤섬, 국수처럼 음식도 지역마다 다르고, 명절 풍습과 생활 방식도 다양해요.', emoji: '🗺️' },
    ],
  },
  mongolia: {
    intro: '몽골은 넓은 초원 이미지로 많이 알려져 있지만, 울란바토르 같은 도시에서 생활하는 사람도 많아요. 자연환경과 도시 생활이 함께 있는 모습을 균형 있게 살펴봐요.',
    foods: [
      { name: '부즈', description: '밀가루 반죽 안에 고기소를 넣어 쪄 먹는 음식이에요. 추운 날씨에 따뜻하게 먹기 좋은 대표 음식으로 알려져 있어요.', emoji: '🥟' },
      { name: '수테차이', description: '우유를 넣어 끓인 차예요. 유제품을 활용하는 식생활과 자연환경의 관계를 생각해 볼 수 있어요.', emoji: '🥛' },
    ],
    dailyLife: ['도시에서는 아파트, 학교, 버스, 상점이 있는 현대적인 생활을 볼 수 있어요.', '초원 지역에서는 가축을 돌보며 자연과 가까이 지내는 가정도 있어요.', '추운 기후에 맞추어 따뜻한 옷차림과 고기·유제품 중심 식생활이 발달한 모습도 살펴볼 수 있어요.'],
    culture: [
      { title: '게르', description: '게르는 이동과 조립이 가능한 전통 주거 형태예요. 넓은 초원 생활과 연결해 생각해 볼 수 있어요.', emoji: '⛺' },
      { title: '말 문화', description: '말은 이동, 놀이, 축제 등 몽골의 역사와 생활 속에서 중요한 의미를 지녀 왔어요.', emoji: '🐎' },
    ],
  },
  philippines: {
    intro: '필리핀은 많은 섬으로 이루어져 있어 바다와 가까운 생활을 떠올릴 수 있고, 지역마다 사용하는 말과 음식도 다양해요. 여러 섬 나라의 특징을 생각하며 여행해 봐요.',
    foods: [
      { name: '판싯', description: '여러 종류의 면과 채소, 고기나 해산물을 넣어 만드는 음식이에요. 축하 자리에서 나누어 먹는 음식으로도 알려져 있어요.', emoji: '🍜' },
      { name: '할로할로', description: '얼음, 우유, 과일, 젤리 등을 섞어 먹는 시원한 디저트예요. 더운 날씨와 연결해 생각해 볼 수 있어요.', emoji: '🍧' },
    ],
    dailyLife: ['여러 섬에 사는 사람들은 바다와 가까운 생활을 하거나 도시에서 바쁘게 일상생활을 하기도 해요.', '학교에서는 영어와 필리핀어 등 다양한 언어 환경 속에서 공부할 수 있어요.', '가족과 함께 식사하고, 축제나 노래, 춤을 즐기는 생활문화도 널리 알려져 있어요.'],
    culture: [
      { title: '티니클링', description: '대나무 장대를 리듬에 맞추어 움직이며 추는 춤이에요. 협동과 박자가 중요한 전통 공연으로 알려져 있어요.', emoji: '🎋' },
      { title: '다양한 언어', description: '필리핀에서는 필리핀어와 영어 외에도 여러 지역 언어가 사용돼요. 한 나라 안에서도 언어가 다양할 수 있음을 보여 줘요.', emoji: '🗣️' },
    ],
  },
  thailand: {
    intro: '태국은 더운 기후와 활기찬 시장 문화, 다양한 사원과 현대 도시가 함께 떠오르는 나라예요. 음식, 인사, 공공장소의 모습을 함께 살펴봐요.',
    foods: [
      { name: '팟타이', description: '쌀국수를 볶아 달콤하고 새콤한 맛을 내는 음식이에요. 땅콩이나 숙주를 곁들이는 경우도 많아요.', emoji: '🍝' },
      { name: '망고 찹쌀밥', description: '달콤한 망고와 찹쌀을 함께 먹는 디저트예요. 열대 과일과 쌀을 활용하는 식생활의 한 예예요.', emoji: '🥭' },
    ],
    dailyLife: ['시장에서는 과일, 간식, 생활용품을 사고파는 활기찬 모습을 볼 수 있어요.', '더운 날씨에 맞게 가볍고 시원한 옷차림과 음료, 과일을 즐기는 생활도 떠올릴 수 있어요.', '학교생활에서는 친구와 함께 배우고 예의를 갖춘 인사를 나누는 모습을 생각해 볼 수 있어요.'],
    culture: [
      { title: '송끄란', description: '태국의 새해를 기념하는 축제로 알려져 있어요. 지역과 가족, 공동체에 따라 참여하는 방식은 달라질 수 있어요.', emoji: '💦' },
      { title: '와이', description: '두 손을 모아 인사하는 태국의 대표적인 인사 예절이에요. 상대를 존중하는 마음을 담아 표현해요.', emoji: '🙏' },
    ],
  },
  uzbekistan: {
    intro: '우즈베키스탄은 실크로드로 알려진 역사와 함께 오늘날의 도시 생활이 이어지는 나라예요. 건축과 음식, 교류의 흔적을 함께 살펴보면 좋아요.',
    foods: [
      { name: '플로프', description: '쌀과 고기, 당근 등을 큰 솥에 함께 익혀 나누어 먹는 음식이에요. 손님맞이와 공동체 식사의 분위기도 떠올릴 수 있어요.', emoji: '🍚' },
      { name: '논', description: '둥근 모양의 빵으로 식사와 함께 자주 먹는 음식이에요. 빵 표면의 무늬와 모양도 눈여겨볼 수 있어요.', emoji: '🫓' },
    ],
    dailyLife: ['도시에서는 버스와 자동차가 다니고 학교와 시장이 있는 현대적인 생활을 볼 수 있어요.', '가정과 지역에 따라 우즈베크어 외에 러시아어 등 다양한 언어 환경을 접할 수 있어요.', '사람들이 오가며 물건과 문화가 만나는 시장은 실크로드의 전통을 떠올리게 해 줘요.'],
    culture: [
      { title: '실크로드', description: '옛날 동서양을 잇던 교역로로, 사람과 물건, 생각이 오가며 문화가 만나는 길이었어요.', emoji: '🐫' },
      { title: '전통 무늬', description: '건축물 타일과 직물에서 파란색과 기하무늬를 자주 볼 수 있어요. 지역의 미적 감각과 역사적 교류가 담겨 있어요.', emoji: '🧵' },
    ],
  },
  india: {
    intro: '인도는 여러 언어와 종교, 지역 문화가 함께 있는 매우 다양한 나라예요. 큰 도시와 전통 시장, 다양한 밥상과 옷차림을 함께 떠올려 보세요.',
    foods: [
      { name: '도사', description: '쌀과 콩 반죽을 얇게 부쳐 만드는 음식이에요. 주로 남인도에서 잘 알려져 있으며 다양한 소스와 함께 먹어요.', emoji: '🥞' },
      { name: '다양한 커리 요리', description: '향신료를 사용한 여러 요리를 통틀어 부를 수 있어요. 지역과 가정에 따라 재료와 맛이 매우 달라요.', emoji: '🍛' },
    ],
    dailyLife: ['학교에서는 여러 교과뿐 아니라 다양한 언어와 문자를 접할 수 있는 지역도 있어요.', '도시에서는 많은 사람과 교통, 상점이 어우러진 활기찬 일상을 볼 수 있어요.', '채식과 비채식 식사가 함께 존재하고, 손으로 먹는 식사 문화처럼 다양한 생활 습관도 만날 수 있어요.'],
    culture: [
      { title: '여러 언어', description: '인도에서는 힌디어뿐 아니라 벵골어, 타밀어, 텔루구어 등 다양한 언어가 사용돼요.', emoji: '🗣️' },
      { title: '다양성', description: '같은 나라 안에서도 옷차림, 음식, 명절, 음악이 매우 다양하다는 점이 인도의 큰 특징 중 하나예요.', emoji: '🌈' },
    ],
  },
  japan: {
    intro: '일본은 가까운 이웃 나라로, 도시의 질서 있는 거리와 계절을 즐기는 문화, 쌀과 해산물을 활용한 식생활 등 다양한 특징을 생각해 볼 수 있어요.',
    foods: [
      { name: '오니기리', description: '밥을 삼각형이나 둥근 모양으로 뭉쳐 속재료를 넣어 먹는 음식이에요. 간편하게 먹기 좋은 한 끼의 예예요.', emoji: '🍙' },
      { name: '우동', description: '굵은 면을 국물과 함께 먹는 음식이에요. 지역에 따라 국물 맛과 면의 굵기가 달라질 수 있어요.', emoji: '🍜' },
    ],
    dailyLife: ['전철과 버스를 이용하는 도시 생활, 걸어서 통학하는 학생 모습 등을 떠올릴 수 있어요.', '학교에서는 급식, 체육, 청소 활동처럼 함께 생활하며 책임을 나누는 모습도 알려져 있어요.', '봄 벚꽃, 여름 축제, 가을 단풍, 겨울 눈처럼 계절 변화가 생활과 문화에 영향을 주기도 해요.'],
    culture: [
      { title: '마쓰리', description: '지역마다 열리는 축제를 마쓰리라고 불러요. 등불, 음악, 거리 행진 등 축제 모습은 지역마다 달라요.', emoji: '🏮' },
      { title: '현대와 전통', description: '신칸센과 고층 건물 같은 현대 생활과 전통 사찰·축제가 함께 존재하는 모습을 볼 수 있어요.', emoji: '🏙️' },
    ],
  },
  brazil: {
    intro: '브라질은 넓은 국토와 다양한 인종·언어 배경, 음악과 자연환경이 어우러진 나라예요. 도시 생활과 자연, 음식, 놀이 문화를 함께 살펴봐요.',
    foods: [
      { name: '페이조아다', description: '검은콩과 고기를 함께 끓여 밥과 곁들여 먹는 음식이에요. 브라질의 대표 음식으로 자주 소개돼요.', emoji: '🍲' },
      { name: '팡 지 케이주', description: '치즈를 넣어 구운 작은 빵이에요. 겉은 쫄깃하고 속은 부드러운 간식으로 잘 알려져 있어요.', emoji: '🧀' },
    ],
    dailyLife: ['해안 도시, 내륙 지역, 열대우림 주변 등 환경이 달라 생활 모습도 다양할 수 있어요.', '학교에서 공부하고 친구와 운동하며 지내는 점은 우리와 비슷하지만 사용하는 말과 음식은 다를 수 있어요.', '음악과 춤, 축구처럼 몸을 움직이며 함께 즐기는 문화가 널리 알려져 있어요.'],
    culture: [
      { title: '다양한 음악과 춤', description: '삼바를 비롯해 지역마다 서로 다른 음악과 춤 문화가 있어요. 리듬과 공동체의 즐거움을 느낄 수 있어요.', emoji: '🎶' },
      { title: '축구와 여러 스포츠', description: '축구가 특히 잘 알려져 있지만 브라질 사람들이 즐기는 스포츠와 놀이 문화는 매우 다양해요.', emoji: '⚽' },
    ],
  },
  egypt: {
    intro: '이집트는 피라미드 같은 고대 유산으로 유명하지만, 오늘날의 도시 생활과 나일강 주변 생활도 함께 살펴봐야 해요. 옛날과 오늘의 이집트를 함께 여행해 봐요.',
    foods: [
      { name: '코샤리', description: '쌀, 파스타, 렌틸콩, 병아리콩을 함께 담아 소스를 뿌려 먹는 음식이에요. 여러 재료가 한 그릇에 어우러지는 점이 특징이에요.', emoji: '🍚' },
      { name: '아이시', description: '식사와 함께 먹는 빵의 한 종류예요. 빵을 곁들이는 식사 문화와 연결해 볼 수 있어요.', emoji: '🫓' },
    ],
    dailyLife: ['카이로 같은 대도시에서는 차와 사람이 많고 상점이 이어지는 활기찬 거리 모습을 볼 수 있어요.', '나일강은 물과 농업, 생활에 큰 영향을 주는 중요한 자연환경이에요.', '학교에서 공부하고 가족과 식사하며 지내는 오늘날의 생활은 역사 유적과는 또 다른 모습이에요.'],
    culture: [
      { title: '고대 유산', description: '피라미드와 신전, 유물은 오래전 이집트의 역사와 문화를 보여 주는 중요한 문화유산이에요.', emoji: '🔺' },
      { title: '오늘의 이집트', description: '현대의 이집트에는 아파트, 학교, 시장, 도로가 있는 일상생활이 이어져요. 고대 유적만으로 현재의 삶을 모두 설명할 수는 없어요.', emoji: '🏙️' },
    ],
  },
  france: {
    intro: '프랑스는 도시의 공공 공간, 빵과 치즈를 곁들인 식생활, 박물관과 예술 문화, 지역마다 다른 생활 분위기가 함께 떠오르는 나라예요.',
    foods: [
      { name: '바게트', description: '겉은 바삭하고 속은 부드러운 긴 빵이에요. 샌드위치를 만들거나 식사와 함께 곁들이기도 해요.', emoji: '🥖' },
      { name: '크레프', description: '얇게 부친 반죽에 과일, 초콜릿, 햄, 치즈 등을 넣어 먹는 음식이에요. 간식과 식사 모두로 활용될 수 있어요.', emoji: '🥞' },
    ],
    dailyLife: ['강가나 광장, 공원처럼 사람들이 쉬고 이야기하는 공공 공간 문화를 떠올릴 수 있어요.', '학교에서는 수업뿐 아니라 예술, 체육, 토론 활동을 통해 생각을 표현하는 경험도 할 수 있어요.', '지역에 따라 빵, 치즈, 해산물, 농산물 등 즐겨 먹는 음식이 달라질 수 있어요.'],
    culture: [
      { title: '박물관과 예술', description: '루브르 같은 박물관에서는 여러 시대의 미술과 문화를 만날 수 있어요. 예술을 생활 속에서 가까이 접하는 문화의 한 예예요.', emoji: '🖼️' },
      { title: '다양한 지역 문화', description: '파리, 남부 해안, 농촌 지역 등은 분위기와 음식, 말투가 다를 수 있어요. 한 나라 안의 다양성을 생각해 보게 해 줘요.', emoji: '🗺️' },
    ],
  },
};

export const countries: Country[] = baseCountries.map((country) => {
  const media = country.media ?? countryMedia[country.id];
  const image = media?.gallery?.find((item) => item.category === '문화') ?? media?.hero;
  const enhanced = contentEnhancements[country.id];
  return {
    ...country,
    ...(enhanced ? {
      intro: enhanced.intro,
      foods: enhanced.foods,
      dailyLife: enhanced.dailyLife,
      culture: enhanced.culture,
    } : {}),
    phrases: languagePacks[country.id] ?? country.phrases,
    media,
    quiz: image ? [...country.quiz, {
      id: `${country.id}-image-literacy`,
      question: '이 그림 자료를 보며 다른 문화를 배울 때 가장 좋은 태도는 무엇일까요?',
      options: ['그림 한 장으로 그 나라 사람들을 모두 판단한다.', '그림은 한 가지 예라는 점을 기억하고 다른 자료와 함께 살펴본다.', '우리와 다른 모습만 찾아 이상하다고 말한다.', '유명한 전통이 오늘날 모든 사람의 생활이라고 생각한다.'],
      answer: 1,
      explanation: '이미지는 문화를 이해하는 여러 자료 중 하나예요. 한 장의 그림을 나라 전체의 모습으로 일반화하지 않고 다양한 자료와 함께 살펴보는 것이 좋아요.',
      image: image.src,
      imageAlt: image.alt,
    }] : country.quiz,
  };
});

export const countryById = (id: string) => countries.find((country) => country.id === id);
