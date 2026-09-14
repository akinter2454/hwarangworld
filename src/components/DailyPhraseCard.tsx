import type { Country } from '../types';
import { SpeakButton } from './SpeakButton';
import { useTravel } from '../store/TravelContext';

export function DailyPhraseCard({ countries }: { countries: Country[] }) {
  const { player, markPhraseLearned, toggleFavoritePhrase } = useTravel();
  const all = countries.flatMap((country) => country.phrases.map((phrase, index) => ({ country, phrase, index })));
  if (!all.length) return null;
  const day = Math.floor(Date.now() / 86400000);
  const item = all[day % all.length];
  const id = `${item.country.id}:${item.index}`;
  const learned = player.learnedPhraseIds.includes(id);
  const favorite = player.favoritePhraseIds.includes(id);
  return <section className="daily-phrase card">
    <div className="daily-phrase-symbol">{item.country.flag}</div>
    <div className="daily-phrase-copy"><small>🌞 오늘의 세계 한마디 · {item.country.name}</small><strong>{item.phrase.text}</strong>{item.phrase.romanization && <em>{item.phrase.romanization}</em>}<p>{item.phrase.meaning}</p></div>
    <div className="daily-phrase-actions"><SpeakButton text={item.phrase.text} lang={item.phrase.lang} /><button className="small-button" onClick={() => markPhraseLearned(id)}>{learned ? '✓ 배움' : '배웠어요'}</button><button className={`small-button ${favorite ? 'favorite-active' : ''}`} onClick={() => toggleFavoritePhrase(id)}>{favorite ? '★' : '☆'}</button></div>
  </section>;
}
