import type { QuizQuestion } from '../types';

export type SmartQuizDifficulty = 'easy' | 'standard' | 'challenge';

export type SmartQuizRequest = {
  countryName: string;
  greeting: string;
  greetingMeaning: string;
  food: string;
  foodDescription: string;
  culture: string;
  cultureDescription: string;
  dailyLife: string[];
  comparePrompt: string;
  difficulty?: SmartQuizDifficulty;
  count?: number;
};

type DraftQuestion = {
  question: string;
  correct: string;
  distractors: string[];
  explanation: string;
};

function hashText(value: string) {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function seededShuffle<T>(items: T[], seed: number) {
  const result = [...items];
  let state = seed || 1;
  const random = () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 4294967296;
  };
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function toQuestion(draft: DraftQuestion, id: string, seed: number): QuizQuestion {
  const tagged = [
    { text: draft.correct, correct: true },
    ...draft.distractors.slice(0, 3).map((text) => ({ text, correct: false })),
  ];
  const options = seededShuffle(tagged, seed);
  return {
    id,
    question: draft.question,
    options: options.map((item) => item.text),
    answer: options.findIndex((item) => item.correct),
    explanation: draft.explanation,
  };
}

const greetingPool = ['안녕하세요', 'Hello', 'Bonjour', 'Hola', '你好', 'Xin chào', 'สวัสดี', 'Сайн байна уу?'];

export function generateSmartQuiz(input: SmartQuizRequest): { questions: QuizQuestion[]; message: string } {
  const country = input.countryName.trim() || '이 여행지';
  const greeting = input.greeting.trim() || '안녕하세요';
  const greetingMeaning = input.greetingMeaning.trim() || '안녕하세요';
  const food = input.food.trim() || '수업에서 살펴본 음식';
  const foodDescription = input.foodDescription.trim() || `${country}의 음식 문화에 대해 살펴봤어요.`;
  const culture = input.culture.trim() || '문화 탐구';
  const cultureDescription = input.cultureDescription.trim() || `${country}의 다양한 문화를 살펴봤어요.`;
  const daily = input.dailyLife.map((item) => item.trim()).filter(Boolean);
  const lifeFact = daily[0] || '학교, 가족, 친구와 관련된 생활 모습을 찾아볼 수 있어요.';
  const compare = input.comparePrompt.trim() || '우리의 생활과 비슷한 점과 다른 점을 함께 찾아보세요.';
  const difficulty = input.difficulty ?? 'standard';
  const count = Math.max(3, Math.min(5, input.count ?? (difficulty === 'challenge' ? 5 : difficulty === 'easy' ? 3 : 4)));

  const greetingDistractors = greetingPool.filter((item) => item !== greeting && item !== greetingMeaning).slice(0, 3);
  while (greetingDistractors.length < 3) greetingDistractors.push(`다른 나라의 인사말 ${greetingDistractors.length + 1}`);

  const drafts: DraftQuestion[] = [
    {
      question: `${country} 문화를 배울 때 가장 알맞은 태도는 무엇일까요?`,
      correct: '비슷한 점과 다른 점을 함께 살펴보고 서로의 문화를 존중한다.',
      distractors: ['한 가지 모습으로 모든 사람을 판단한다.', '우리 문화와 다르면 틀렸다고 생각한다.', '특이해 보이는 점만 골라 놀린다.'],
      explanation: '다문화 학습에서는 차이와 공통점을 함께 찾고, 사람마다 생활 방식이 다를 수 있음을 존중하는 태도가 중요해요.',
    },
    {
      question: `${country}에서 배운 인사말로 알맞은 것은 무엇일까요?`,
      correct: greeting,
      distractors: greetingDistractors,
      explanation: `${greeting}은(는) 이번 여행에서 ‘${greetingMeaning}’라는 뜻으로 배운 표현이에요.`,
    },
    {
      question: `${country}의 음식 문화를 소개하는 말로 가장 알맞은 것은?`,
      correct: `${food}: ${foodDescription}`,
      distractors: ['그 나라 사람은 모두 매일 같은 음식만 먹는다.', '한 가지 음식만 알면 그 나라의 모든 문화를 알 수 있다.', '음식은 지역과 가정에 따라 달라질 수 없다고 말할 수 있다.'],
      explanation: `이번 여행에서는 ${food}을(를) 하나의 예로 살펴봤어요. 한 나라 안에서도 음식과 생활은 지역·가정·개인에 따라 다양할 수 있어요.`,
    },
    {
      question: `${country}의 ‘${culture}’ 활동을 설명한 것으로 알맞은 것은?`,
      correct: cultureDescription,
      distractors: ['전통문화의 모습은 시대가 달라도 절대 변하지 않는다.', '모든 사람이 같은 방식으로 이 문화를 즐긴다.', '문화에는 한 가지 정답만 있고 다른 모습은 틀리다.'],
      explanation: `${culture}도 사람과 지역, 시대에 따라 여러 모습으로 나타날 수 있어요. 수업에서 살펴본 예와 실제 사람들의 다양성을 함께 기억해요.`,
    },
    {
      question: `${country}의 생활을 우리 생활과 비교할 때 가장 좋은 방법은?`,
      correct: compare,
      distractors: ['다른 점만 찾아 어느 쪽이 더 좋은지 순위를 매긴다.', '사진 한 장만 보고 그 나라 사람 모두의 생활을 판단한다.', '우리와 같은 점은 없다고 생각하고 비교하지 않는다.'],
      explanation: `생활을 비교할 때는 ${lifeFact} 같은 구체적인 예를 살펴보고, 공통점과 차이를 함께 찾아보는 것이 좋아요.`,
    },
  ];

  const order = difficulty === 'easy' ? [1, 0, 2, 3, 4] : difficulty === 'challenge' ? [2, 3, 4, 1, 0] : [0, 1, 2, 4, 3];
  const seedBase = hashText(`${country}|${greeting}|${food}|${culture}|${difficulty}`);
  const questions = order.slice(0, count).map((draftIndex, index) =>
    toQuestion(drafts[draftIndex], `smart-${Date.now()}-${index + 1}`, seedBase + index * 97),
  );

  return {
    questions,
    message: `✅ 무료 로컬 문항 엔진이 ${questions.length}문항을 만들었습니다. 외부 AI/API를 사용하지 않았습니다. 사실 정보와 표현은 학생 배포 전에 교사가 확인해 주세요.`,
  };
}
