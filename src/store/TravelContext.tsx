import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { JournalEntry, PlayerData } from '../types';

// v0.1에서 사용하던 키를 그대로 유지해 기존 학생 진행도를 보존합니다.
const STORAGE_KEY = 'multicultural-world-tour-player-v1';

const initialPlayer: PlayerData = {
  nickname: '',
  visitedCountries: [],
  stamps: [],
  stars: 0,
  collectedItems: [],
  journals: {},
  activityCompletions: [],
  quizBestScores: {},
  quizAttempts: {},
};

type TravelContextValue = {
  player: PlayerData;
  setNickname: (nickname: string) => void;
  completeCountry: (countryId: string, collectibleId: string, earnedStars: number) => void;
  recordQuizAttempt: (countryId: string, score: number) => void;
  completeMiniGame: (activityId: string, earnedStars?: number) => void;
  saveJournal: (entry: JournalEntry) => void;
  resetProgress: () => void;
  replacePlayer: (player: PlayerData) => void;
};

const TravelContext = createContext<TravelContextValue | null>(null);

export function TravelProvider({ children }: { children: ReactNode }) {
  const [player, setPlayer] = useState<PlayerData>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return initialPlayer;
      const parsed = JSON.parse(raw) as Partial<PlayerData>;
      return {
        ...initialPlayer,
        ...parsed,
        journals: parsed.journals ?? {},
        activityCompletions: parsed.activityCompletions ?? [],
        quizBestScores: parsed.quizBestScores ?? {},
        quizAttempts: parsed.quizAttempts ?? {},
      };
    } catch {
      return initialPlayer;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(player));
  }, [player]);

  const value = useMemo<TravelContextValue>(() => ({
    player,
    setNickname: (nickname) => setPlayer((prev) => ({ ...prev, nickname })),
    completeCountry: (countryId, collectibleId, earnedStars) => {
      setPlayer((prev) => {
        const firstCompletion = !prev.visitedCountries.includes(countryId);
        return {
          ...prev,
          visitedCountries: firstCompletion ? [...prev.visitedCountries, countryId] : prev.visitedCountries,
          stamps: prev.stamps.includes(countryId) ? prev.stamps : [...prev.stamps, countryId],
          collectedItems: prev.collectedItems.includes(collectibleId) ? prev.collectedItems : [...prev.collectedItems, collectibleId],
          stars: firstCompletion ? prev.stars + earnedStars : prev.stars,
        };
      });
    },
    recordQuizAttempt: (countryId, score) => {
      setPlayer((prev) => ({
        ...prev,
        quizBestScores: {
          ...prev.quizBestScores,
          [countryId]: Math.max(prev.quizBestScores[countryId] ?? 0, score),
        },
        quizAttempts: {
          ...prev.quizAttempts,
          [countryId]: (prev.quizAttempts[countryId] ?? 0) + 1,
        },
      }));
    },
    completeMiniGame: (activityId, earnedStars = 1) => {
      setPlayer((prev) => {
        if (prev.activityCompletions.includes(activityId)) return prev;
        return {
          ...prev,
          activityCompletions: [...prev.activityCompletions, activityId],
          stars: prev.stars + earnedStars,
        };
      });
    },
    saveJournal: (entry) => setPlayer((prev) => ({
      ...prev,
      journals: { ...prev.journals, [entry.countryId]: entry },
    })),
    resetProgress: () => setPlayer(initialPlayer),
    replacePlayer: (next) => setPlayer({ ...initialPlayer, ...next, journals: next.journals ?? {}, activityCompletions: next.activityCompletions ?? [], quizBestScores: next.quizBestScores ?? {}, quizAttempts: next.quizAttempts ?? {} }),
  }), [player]);

  return <TravelContext.Provider value={value}>{children}</TravelContext.Provider>;
}

export function useTravel() {
  const context = useContext(TravelContext);
  if (!context) throw new Error('useTravel must be used inside TravelProvider');
  return context;
}
