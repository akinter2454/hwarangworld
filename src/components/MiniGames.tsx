import { useMemo, useState } from 'react';
import type { Country } from '../types';
import { useTravel } from '../store/TravelContext';

const fallbackMeanings = ['안녕하세요', '고맙습니다', '또 만나요', '친구', '학교', '맛있어요'];

export function MiniGames({ country }: { country: Country }) {
  const { player, completeMiniGame } = useTravel();
  const [languageIndex, setLanguageIndex] = useState(0);
  const [languageScore, setLanguageScore] = useState(0);
  const [languageDone, setLanguageDone] = useState(false);
  const [cultureIndex, setCultureIndex] = useState(0);
  const [cultureScore, setCultureScore] = useState(0);
  const [cultureDone, setCultureDone] = useState(false);

  const languageItems = country.phrases.slice(0, 5);
  const currentPhrase = languageItems[languageIndex];
  const languageOptions = useMemo(() => {
    if (!currentPhrase) return [];
    const candidates = [
      currentPhrase.meaning,
      ...languageItems.filter((item) => item.text !== currentPhrase.text).map((item) => item.meaning),
      ...fallbackMeanings,
    ];
    return [...new Set(candidates)].slice(0, 4).sort((a, b) => a.localeCompare(b, 'ko'));
  }, [currentPhrase, languageItems]);

  const cultureQuestions = [
    {
      statement: country.dailyLife[0] ?? '학교와 친구에 관한 생활 모습을 찾아볼 수 있어요.',
      prompt: '이 문장은 이 여행지의 생활 예시로 소개되었나요?',
      answer: true,
    },
    {
      statement: `${country.name}의 모든 사람은 언제나 똑같은 생활을 해요.`,
      prompt: '이 생각은 문화 다양성을 존중하는 설명일까요?',
      answer: false,
    },
    {
      statement: '같은 나라 안에서도 지역과 가정, 사람에 따라 생활 모습은 달라질 수 있어요.',
      prompt: '이 생각은 문화 다양성을 존중하는 설명일까요?',
      answer: true,
    },
  ];

  const languageActivityId = `${country.id}-language-game`;
  const cultureActivityId = `${country.id}-culture-detective`;
  const languageCleared = player.activityCompletions.includes(languageActivityId);
  const cultureCleared = player.activityCompletions.includes(cultureActivityId);

  const answerLanguage = (option: string) => {
    if (!currentPhrase || languageDone) return;
    const correct = option === currentPhrase.meaning;
    const nextScore = languageScore + (correct ? 1 : 0);
    setLanguageScore(nextScore);
    if (languageIndex >= languageItems.length - 1) {
      setLanguageDone(true);
      if (nextScore >= Math.max(1, languageItems.length - 1)) completeMiniGame(languageActivityId, 2);
    } else {
      setLanguageIndex((value) => value + 1);
    }
  };

  const answerCulture = (answer: boolean) => {
    if (cultureDone) return;
    const correct = answer === cultureQuestions[cultureIndex].answer;
    const nextScore = cultureScore + (correct ? 1 : 0);
    setCultureScore(nextScore);
    if (cultureIndex >= cultureQuestions.length - 1) {
      setCultureDone(true);
      if (nextScore >= 2) completeMiniGame(cultureActivityId, 2);
    } else {
      setCultureIndex((value) => value + 1);
    }
  };

  const resetLanguage = () => {
    setLanguageIndex(0);
    setLanguageScore(0);
    setLanguageDone(false);
  };

  const resetCulture = () => {
    setCultureIndex(0);
    setCultureScore(0);
    setCultureDone(false);
  };

  return (
    <div className="mini-games-grid">
      <section className="card mini-game-card">
        <div className="mini-game-title">
          <span>🗣️</span>
          <div><small>미니게임 1</small><h3>세계 말 스피드 퀴즈</h3></div>
          {languageCleared && <b className="clear-chip">완료 ✓</b>}
        </div>
        {!languageDone && currentPhrase ? (
          <>
            <p className="game-counter">{languageIndex + 1} / {languageItems.length}</p>
            <div className="game-question"><strong>{currentPhrase.text}</strong><span>무슨 뜻일까요?</span></div>
            <div className="game-options">
              {languageOptions.map((option) => <button key={option} onClick={() => answerLanguage(option)}>{option}</button>)}
            </div>
          </>
        ) : (
          <div className="game-result">
            <span>{languageScore >= Math.max(1, languageItems.length - 1) ? '🎉' : '💡'}</span>
            <strong>{languageScore} / {languageItems.length}</strong>
            <p>{languageScore >= Math.max(1, languageItems.length - 1) ? '언어 탐험 성공! 처음 성공하면 별 2개를 받아요.' : '표현 카드를 한 번 더 보고 다시 도전해 보세요.'}</p>
            <button className="small-button" onClick={resetLanguage}>다시 도전</button>
          </div>
        )}
      </section>

      <section className="card mini-game-card">
        <div className="mini-game-title">
          <span>🔎</span>
          <div><small>미니게임 2</small><h3>문화 탐정 OX</h3></div>
          {cultureCleared && <b className="clear-chip">완료 ✓</b>}
        </div>
        {!cultureDone ? (
          <>
            <p className="game-counter">{cultureIndex + 1} / {cultureQuestions.length}</p>
            <div className="culture-statement">
              <strong>“{cultureQuestions[cultureIndex].statement}”</strong>
              <span>{cultureQuestions[cultureIndex].prompt}</span>
            </div>
            <div className="ox-buttons">
              <button onClick={() => answerCulture(true)}>⭕ 맞아요</button>
              <button onClick={() => answerCulture(false)}>❌ 아니에요</button>
            </div>
          </>
        ) : (
          <div className="game-result">
            <span>{cultureScore >= 2 ? '🕵️' : '🌱'}</span>
            <strong>{cultureScore} / {cultureQuestions.length}</strong>
            <p>{cultureScore >= 2 ? '문화 탐정 성공! 서로 다른 생활을 한 가지 모습으로 단정하지 않았어요.' : '사람마다 경험이 다를 수 있다는 점을 기억하며 다시 도전해요.'}</p>
            <button className="small-button" onClick={resetCulture}>다시 도전</button>
          </div>
        )}
      </section>
    </div>
  );
}
