import { useMemo, useState } from 'react';
import type { Country, PhraseCategory } from '../types';
import { SpeakButton } from './SpeakButton';
import { useTravel } from '../store/TravelContext';

const categories: ('전체' | PhraseCategory)[] = ['전체', '인사', '예절', '학교', '일상'];

export function PhraseLearningPanel({ country }: { country: Country }) {
  const { player, markPhraseLearned, toggleFavoritePhrase } = useTravel();
  const [category, setCategory] = useState<(typeof categories)[number]>('전체');
  const [flashIndex, setFlashIndex] = useState(0);
  const [showMeaning, setShowMeaning] = useState(false);
  const [flashMode, setFlashMode] = useState(false);

  const phrases = useMemo(() => country.phrases.filter((phrase) => category === '전체' || phrase.category === category), [country.phrases, category]);
  const learnedCount = country.phrases.filter((_, index) => player.learnedPhraseIds.includes(`${country.id}:${index}`)).length;
  const phraseIndex = (phrase: Country['phrases'][number]) => country.phrases.indexOf(phrase);

  const advance = (delta: number) => {
    if (!phrases.length) return;
    setFlashIndex((prev) => (prev + delta + phrases.length) % phrases.length);
    setShowMeaning(false);
  };

  if (!country.phrases.length) return <div className="card content-card">등록된 표현이 아직 없어요.</div>;

  const flash = phrases[Math.min(flashIndex, Math.max(phrases.length - 1, 0))];
  const flashGlobalIndex = flash ? phraseIndex(flash) : -1;
  const flashId = flash ? `${country.id}:${flashGlobalIndex}` : '';

  return <div className="phrase-learning-panel">
    <div className="language-progress card">
      <div><small>🗣️ {country.name} 말 배우기</small><strong>{learnedCount} / {country.phrases.length}개 배움</strong></div>
      <div className="progress"><div style={{ width: `${country.phrases.length ? learnedCount / country.phrases.length * 100 : 0}%` }} /></div>
      <button className="small-button" onClick={() => { setFlashMode((v) => !v); setShowMeaning(false); }}>{flashMode ? '▦ 카드 목록 보기' : '🃏 플래시카드'}</button>
    </div>

    <div className="phrase-category-tabs">
      {categories.map((item) => <button key={item} className={category === item ? 'active' : ''} onClick={() => { setCategory(item); setFlashIndex(0); setShowMeaning(false); }}>{item}</button>)}
    </div>

    {flashMode && !flash ? <div className="card empty-language-book">이 분류에는 아직 표현이 없어요.</div> : flashMode && flash ? <div className="flashcard-wrap">
      <div className={`language-flashcard card ${showMeaning ? 'revealed' : ''}`} onClick={() => setShowMeaning((v) => !v)} role="button" tabIndex={0}>
        <span className="flash-icon">{flash.icon ?? '💬'}</span>
        <small>{flash.category ?? '표현'} · {flashIndex + 1}/{phrases.length}</small>
        <h3>{flash.text}</h3>
        {flash.romanization && <p className="romanization">{flash.romanization}</p>}
        <div className="flash-meaning">{showMeaning ? flash.meaning : '카드를 눌러 뜻 보기'}</div>
      </div>
      <div className="flash-actions">
        <button className="small-button" onClick={() => advance(-1)}>← 이전</button>
        <SpeakButton text={flash.text} lang={flash.lang} />
        <button className={`small-button ${player.favoritePhraseIds.includes(flashId) ? 'favorite-active' : ''}`} onClick={() => toggleFavoritePhrase(flashId)}>{player.favoritePhraseIds.includes(flashId) ? '★ 저장됨' : '☆ 즐겨찾기'}</button>
        <button className="primary-button" onClick={() => { markPhraseLearned(flashId); advance(1); }}>✓ 배웠어요</button>
        <button className="small-button" onClick={() => advance(1)}>다음 →</button>
      </div>
    </div> : <div className="content-grid phrase-grid">
      {phrases.map((phrase) => {
        const index = phraseIndex(phrase);
        const id = `${country.id}:${index}`;
        const learned = player.learnedPhraseIds.includes(id);
        const favorite = player.favoritePhraseIds.includes(id);
        return <article className={`card phrase-card enhanced ${learned ? 'learned' : ''}`} key={id}>
          <div className="phrase-card-top"><span>{phrase.icon ?? '💬'}</span><span className="phrase-category-chip">{phrase.category ?? '표현'}</span></div>
          <h3>{phrase.text}</h3>
          {phrase.romanization && <small className="romanization">{phrase.romanization}</small>}
          <p>{phrase.meaning}</p>
          <div className="phrase-card-actions">
            <SpeakButton text={phrase.text} lang={phrase.lang} />
            <button className={`small-button ${favorite ? 'favorite-active' : ''}`} onClick={() => toggleFavoritePhrase(id)} aria-label="즐겨찾기">{favorite ? '★' : '☆'}</button>
            <button className={`small-button ${learned ? 'learned-button' : ''}`} onClick={() => markPhraseLearned(id)}>{learned ? '✓ 배움' : '배웠어요'}</button>
          </div>
        </article>;
      })}
    </div>}
  </div>;
}
