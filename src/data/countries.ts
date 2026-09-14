import type { Country } from '../types';

export const countries: Country[] = [
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

export const countryById = (id: string) => countries.find((country) => country.id === id);
