import { useMemo, useState } from 'react';
import { countries as builtInCountries } from '../data/countries';
import { useClassroom } from '../store/ClassroomContext';
import { useTravel } from '../store/TravelContext';
import { SpeakButton } from '../components/SpeakButton';
import type { PhraseCategory } from '../types';

const categories: ('전체' | PhraseCategory)[] = ['전체', '인사', '예절', '학교', '일상'];

type Mode = 'all' | 'favorites' | 'learned';

export function LanguageBook() {
  const { customCountries } = useClassroom();
  const { player, markPhraseLearned, toggleFavoritePhrase } = useTravel();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<(typeof categories)[number]>('전체');
  const [mode, setMode] = useState<Mode>('all');
  const [countryFilter, setCountryFilter] = useState('전체');

  const allCountries = useMemo(() => [...builtInCountries, ...customCountries.filter((c) => !builtInCountries.some((b) => b.id === c.id))], [customCountries]);
  const entries = useMemo(() => allCountries.flatMap((country) => country.phrases.map((phrase, index) => ({ country, phrase, index, id: `${country.id}:${index}` }))), [allCountries]);
  const filtered = entries.filter(({ country, phrase, id }) => {
    const text = `${country.name} ${phrase.text} ${phrase.meaning} ${phrase.romanization ?? ''}`.toLowerCase();
    if (query && !text.includes(query.toLowerCase())) return false;
    if (category !== '전체' && phrase.category !== category) return false;
    if (countryFilter !== '전체' && country.id !== countryFilter) return false;
    if (mode === 'favorites' && !player.favoritePhraseIds.includes(id)) return false;
    if (mode === 'learned' && !player.learnedPhraseIds.includes(id)) return false;
    return true;
  });

  const total = entries.length;
  const learned = entries.filter(({ id }) => player.learnedPhraseIds.includes(id)).length;
  const favorites = entries.filter(({ id }) => player.favoritePhraseIds.includes(id)).length;

  return <section className="page language-book-page">
    <header className="page-header">
      <div><p className="eyebrow">WORLD LANGUAGE BOOK</p><h2>🗣️ 나의 세계 말 도감</h2></div>
      <div className="star-pill">배운 말 {learned}/{total}</div>
    </header>

    <section className="language-book-hero card">
      <div className="language-book-hero-icon">💬</div>
      <div><strong>여러 나라의 말을 듣고, 따라 하고, 모아 보세요.</strong><p>같은 나라에서도 여러 언어와 말투가 함께 쓰일 수 있어요. 여기에서는 여행에서 만나는 대표적인 표현을 연습합니다.</p></div>
      <div className="language-stats"><span>✓ {learned} 배움</span><span>★ {favorites} 즐겨찾기</span><span>🌏 {allCountries.length} 여행지</span></div>
    </section>

    <section className="language-filter card">
      <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="나라·표현·뜻 검색" aria-label="말 도감 검색" />
      <select value={countryFilter} onChange={(e) => setCountryFilter(e.target.value)} aria-label="나라 선택"><option value="전체">모든 나라</option>{allCountries.map((country) => <option value={country.id} key={country.id}>{country.flag} {country.name}</option>)}</select>
      <div className="mode-tabs">{(['all','favorites','learned'] as Mode[]).map((item) => <button key={item} className={mode === item ? 'active' : ''} onClick={() => setMode(item)}>{item === 'all' ? '전체' : item === 'favorites' ? '★ 즐겨찾기' : '✓ 배운 말'}</button>)}</div>
    </section>

    <div className="phrase-category-tabs language-book-categories">{categories.map((item) => <button key={item} className={category === item ? 'active' : ''} onClick={() => setCategory(item)}>{item}</button>)}</div>

    {!filtered.length ? <div className="card empty-language-book">조건에 맞는 표현이 아직 없어요.</div> : <div className="language-book-grid">
      {filtered.map(({ country, phrase, id }) => {
        const learnedItem = player.learnedPhraseIds.includes(id);
        const favorite = player.favoritePhraseIds.includes(id);
        return <article className={`card language-book-card ${learnedItem ? 'learned' : ''}`} key={id}>
          <div className="language-book-country"><span>{country.flag}</span><strong>{country.name}</strong><small>{phrase.category ?? '표현'}</small></div>
          <div className="language-book-phrase"><span>{phrase.icon ?? '💬'}</span><h3>{phrase.text}</h3>{phrase.romanization && <em>{phrase.romanization}</em>}<p>{phrase.meaning}</p></div>
          <div className="language-book-actions"><SpeakButton text={phrase.text} lang={phrase.lang} /><button className={`small-button ${favorite ? 'favorite-active' : ''}`} onClick={() => toggleFavoritePhrase(id)}>{favorite ? '★' : '☆'}</button><button className={`small-button ${learnedItem ? 'learned-button' : ''}`} onClick={() => markPhraseLearned(id)}>{learnedItem ? '✓ 배움' : '배웠어요'}</button></div>
        </article>;
      })}
    </div>}
  </section>;
}
