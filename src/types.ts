export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
  image?: string;
  imageAlt?: string;
};

export type PhraseCategory = '인사' | '예절' | '학교' | '일상';

export type LanguagePhrase = {
  text: string;
  meaning: string;
  lang: string;
  romanization?: string;
  category?: PhraseCategory;
  icon?: string;
};

export type CountryImage = {
  src: string;
  alt: string;
  caption: string;
  category: '풍경' | '음식' | '생활' | '문화';
};

export type CountryMedia = {
  hero?: CountryImage;
  gallery?: CountryImage[];
};

export type Country = {
  id: string;
  name: string;
  englishName: string;
  flag: string;
  region: string;
  colorClass: string;
  intro: string;
  greeting: {
    text: string;
    meaning: string;
    lang: string;
  };
  phrases: LanguagePhrase[];
  foods: { name: string; description: string; emoji: string }[];
  dailyLife: string[];
  culture: { title: string; description: string; emoji: string }[];
  comparePrompt: string;
  collectible: { id: string; name: string; emoji: string };
  quiz: QuizQuestion[];
  media?: CountryMedia;
  custom?: boolean;
};

export type JournalEntry = {
  countryId: string;
  learned: string;
  memorable: string;
  similar: string;
};

export type PlayerData = {
  nickname: string;
  visitedCountries: string[];
  stamps: string[];
  stars: number;
  collectedItems: string[];
  journals: Record<string, JournalEntry>;
  activityCompletions: string[];
  quizBestScores: Record<string, number>;
  quizAttempts: Record<string, number>;
  learnedPhraseIds: string[];
  favoritePhraseIds: string[];
};

export type TeacherCountryRecord = {
  id: string;
  teacher_id: string;
  name: string;
  country_data: Country;
  created_at: string;
  updated_at: string;
};

export type AssignmentTargetType = 'all' | 'group' | 'student';

export type LearningAssignment = {
  id: string;
  classroomId: string;
  source: 'builtin' | 'custom';
  countryId: string;
  title: string;
  teacherNote: string;
  priority: number;
  targetType: AssignmentTargetType;
  targetValue: string;
  targetLabel: string;
  customCountry: Country | null;
};
