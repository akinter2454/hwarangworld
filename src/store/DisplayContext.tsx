import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

export type GuideLanguage = 'ko' | 'en' | 'zh' | 'ru' | 'vi';

type DisplaySettings = {
  easyKorean: boolean;
  guideLanguage: GuideLanguage;
};

type DisplayContextValue = DisplaySettings & {
  setEasyKorean: (value: boolean) => void;
  setGuideLanguage: (value: GuideLanguage) => void;
};

const STORAGE_KEY = 'multicultural-world-tour-display-v1';
const initial: DisplaySettings = { easyKorean: false, guideLanguage: 'ko' };
const DisplayContext = createContext<DisplayContextValue | null>(null);

export const guideLanguageNames: Record<GuideLanguage, string> = {
  ko: '한국어',
  en: 'English',
  zh: '中文',
  ru: 'Русский',
  vi: 'Tiếng Việt',
};

export const quickGuide: Record<GuideLanguage, { title: string; intro: string; travel: string; passport: string; bag: string; journal: string; badge: string; class: string }> = {
  ko: { title: '빠른 사용 안내', intro: '지도에서 나라를 고르고 문화 활동과 퀴즈를 해 보세요.', travel: '여행: 나라 선택', passport: '여권: 완료한 나라 확인', bag: '가방: 모은 카드 확인', journal: '일기: 배운 점 쓰기', badge: '배지: 나의 성장 확인', class: '학급 참여: 선생님이 준 수업 코드 입력' },
  en: { title: 'Quick Guide', intro: 'Choose a country on the map, explore its culture, and try the quiz.', travel: 'Travel: choose a country', passport: 'Passport: see completed trips', bag: 'Bag: see collected cards', journal: 'Journal: write what you learned', badge: 'Badges: check your progress', class: 'Join class: enter the code from your teacher' },
  zh: { title: '快速使用指南', intro: '在地图上选择一个国家，了解文化并完成小测验。', travel: '旅行：选择国家', passport: '护照：查看完成的旅行', bag: '背包：查看收集的卡片', journal: '日记：写下学到的内容', badge: '徽章：查看成长记录', class: '加入班级：输入老师提供的课堂代码' },
  ru: { title: 'Краткая инструкция', intro: 'Выберите страну на карте, изучите культуру и выполните викторину.', travel: 'Путешествие: выбрать страну', passport: 'Паспорт: завершённые поездки', bag: 'Рюкзак: собранные карточки', journal: 'Дневник: написать, что узнал', badge: 'Значки: посмотреть прогресс', class: 'Войти в класс: ввести код учителя' },
  vi: { title: 'Hướng dẫn nhanh', intro: 'Chọn một quốc gia trên bản đồ, khám phá văn hóa và làm câu hỏi.', travel: 'Du lịch: chọn quốc gia', passport: 'Hộ chiếu: xem chuyến đi đã hoàn thành', bag: 'Túi: xem thẻ đã sưu tầm', journal: 'Nhật ký: viết điều đã học', badge: 'Huy hiệu: xem tiến bộ', class: 'Vào lớp: nhập mã do giáo viên cung cấp' },
};

function loadSettings(): DisplaySettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return initial;
    const parsed = JSON.parse(raw) as Partial<DisplaySettings>;
    const language = parsed.guideLanguage && parsed.guideLanguage in guideLanguageNames ? parsed.guideLanguage : 'ko';
    return { easyKorean: Boolean(parsed.easyKorean), guideLanguage: language };
  } catch { return initial; }
}

export function DisplayProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<DisplaySettings>(loadSettings);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    document.documentElement.classList.toggle('easy-korean', settings.easyKorean);
    document.documentElement.lang = settings.guideLanguage === 'ko' ? 'ko' : settings.guideLanguage;
  }, [settings]);

  const value = useMemo<DisplayContextValue>(() => ({
    ...settings,
    setEasyKorean: (easyKorean) => setSettings((prev) => ({ ...prev, easyKorean })),
    setGuideLanguage: (guideLanguage) => setSettings((prev) => ({ ...prev, guideLanguage })),
  }), [settings]);

  return <DisplayContext.Provider value={value}>{children}</DisplayContext.Provider>;
}

export function useDisplay() {
  const context = useContext(DisplayContext);
  if (!context) throw new Error('useDisplay must be used inside DisplayProvider');
  return context;
}
