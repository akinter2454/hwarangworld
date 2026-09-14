import { useMemo, useState } from 'react';
import type { Country } from '../types';
import { imagesForCountry } from '../services/countryImages';
import { useTravel } from '../store/TravelContext';
import { CuratedPhoto } from './CuratedPhoto';

const fallbackMeanings = ['안녕하세요', '고맙습니다', '또 만나요', '친구', '학교', '맛있어요'];
const categoryHelp: Record<string, string> = {
  풍경: '도시·지역·자연환경',
  음식: '먹는 음식과 식문화',
  생활: '거리·시장·사람들의 일상',
  문화: '역사·공공장소·문화 환경',
};

export function MiniGames({ country }: { country: Country }) {
  const { player, completeMiniGame } = useTravel();
  const [languageIndex, setLanguageIndex] = useState(0);
  const [languageScore, setLanguageScore] = useState(0);
  const [languageDone, setLanguageDone] = useState(false);
  const [cultureIndex, setCultureIndex] = useState(0);
  const [cultureScore, setCultureScore] = useState(0);
  const [cultureDone, setCultureDone] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [photoScore, setPhotoScore] = useState(0);
  const [photoDone, setPhotoDone] = useState(false);

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

  const photoItems = useMemo(() => imagesForCountry(country).filter((item, index, arr) => arr.findIndex((other) => other.category === item.category) === index).slice(0, 4), [country]);
  const currentPhoto = photoItems[photoIndex];
  const photoOptions = useMemo(() => photoItems.map((item) => item.category).sort((a, b) => a.localeCompare(b, 'ko')), [photoItems]);

  const languageActivityId = `${country.id}-language-game`;
  const cultureActivityId = `${country.id}-culture-detective`;
  const photoActivityId = `${country.id}-photo-word-game`;
  const languageCleared = player.activityCompletions.includes(languageActivityId);
  const cultureCleared = player.activityCompletions.includes(cultureActivityId);
  const photoCleared = player.activityCompletions.includes(photoActivityId);

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

  const answerPhoto = (category: string) => {
    if (!currentPhoto || photoDone) return;
    const correct = category === currentPhoto.category;
    const nextScore = photoScore + (correct ? 1 : 0);
    setPhotoScore(nextScore);
    if (photoIndex >= photoItems.length - 1) {
      setPhotoDone(true);
      if (nextScore >= Math.max(2, photoItems.length - 1)) completeMiniGame(photoActivityId, 2);
    } else {
      setPhotoIndex((value) => value + 1);
    }
  };

  const resetLanguage = () => { setLanguageIndex(0); setLanguageScore(0); setLanguageDone(false); };
  const resetCulture = () => { setCultureIndex(0); setCultureScore(0); setCultureDone(false); };
  const resetPhoto = () => { setPhotoIndex(0); setPhotoScore(0); setPhotoDone(false); };

  return (
    <div className="mini-games-grid mini-games-grid-v10">
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
            <div className="game-options">{languageOptions.map((option) => <button key={option} onClick={() => answerLanguage(option)}>{option}</button>)}</div>
          </>
        ) : (
          <div className="game-result"><span>{languageScore >= Math.max(1, languageItems.length - 1) ? '🎉' : '💡'}</span><strong>{languageScore} / {languageItems.length}</strong><p>{languageScore >= Math.max(1, languageItems.length - 1) ? '언어 탐험 성공! 처음 성공하면 별 2개를 받아요.' : '표현 카드를 한 번 더 보고 다시 도전해 보세요.'}</p><button className="small-button" onClick={resetLanguage}>다시 도전</button></div>
        )}
      </section>

      <section className="card mini-game-card">
        <div className="mini-game-title"><span>🔎</span><div><small>미니게임 2</small><h3>문화 탐정 OX</h3></div>{cultureCleared && <b className="clear-chip">완료 ✓</b>}</div>
        {!cultureDone ? (
          <><p className="game-counter">{cultureIndex + 1} / {cultureQuestions.length}</p><div className="culture-statement"><strong>“{cultureQuestions[cultureIndex].statement}”</strong><span>{cultureQuestions[cultureIndex].prompt}</span></div><div className="ox-buttons"><button onClick={() => answerCulture(true)}>⭕ 맞아요</button><button onClick={() => answerCulture(false)}>❌ 아니에요</button></div></>
        ) : (
          <div className="game-result"><span>{cultureScore >= 2 ? '🕵️' : '🌱'}</span><strong>{cultureScore} / {cultureQuestions.length}</strong><p>{cultureScore >= 2 ? '문화 탐정 성공! 서로 다른 생활을 한 가지 모습으로 단정하지 않았어요.' : '사람마다 경험이 다를 수 있다는 점을 기억하며 다시 도전해요.'}</p><button className="small-button" onClick={resetCulture}>다시 도전</button></div>
        )}
      </section>

      <section className="card mini-game-card photo-word-game">
        <div className="mini-game-title"><span>🖼️</span><div><small>미니게임 3</small><h3>사진-말 연결</h3></div>{photoCleared && <b className="clear-chip">완료 ✓</b>}</div>
        {!photoDone && currentPhoto ? (
          <>
            <p className="game-counter">{photoIndex + 1} / {photoItems.length}</p>
            <CuratedPhoto image={currentPhoto} imageClassName="photo-word-game-image" showCredit={false} />
            <div className="game-question"><strong>이 사진은 어떤 주제와 가장 잘 연결될까요?</strong><span>사진에서 보이는 근거를 생각한 뒤 골라 보세요.</span></div>
            <div className="game-options photo-category-options">{photoOptions.map((option) => <button key={option} onClick={() => answerPhoto(option)}><strong>{option}</strong><small>{categoryHelp[option]}</small></button>)}</div>
          </>
        ) : (
          <div className="game-result"><span>{photoScore >= Math.max(2, photoItems.length - 1) ? '📸' : '👀'}</span><strong>{photoScore} / {photoItems.length}</strong><p>{photoScore >= Math.max(2, photoItems.length - 1) ? '사진 자료의 주제를 잘 구분했어요! 사진 설명과 실제 보이는 모습을 함께 확인해요.' : '사진의 설명과 보이는 요소를 다시 살펴보고 도전해 보세요.'}</p><button className="small-button" onClick={resetPhoto}>다시 도전</button></div>
        )}
      </section>
    </div>
  );
}
