import { useMemo } from 'react';
import { countries } from '../data/countries';
import { useClassroom } from '../store/ClassroomContext';
import { useTravel } from '../store/TravelContext';
import { imageForCategory } from '../services/countryImages';
import { CuratedPhoto } from '../components/CuratedPhoto';

export function Portfolio() {
  const { player } = useTravel();
  const { customCountries } = useClassroom();
  const allCountries = useMemo(() => [...countries, ...customCountries.filter((c) => !countries.some((b) => b.id === c.id))], [customCountries]);
  const visited = allCountries.filter((country) => player.visitedCountries.includes(country.id));
  const observations = Object.values(player.photoObservations);
  const comparisons = player.photoComparisons;

  const printBook = () => window.print();

  return <section className="page portfolio-page">
    <header className="page-header portfolio-header"><div><p className="eyebrow">MY WORLD PHOTOBOOK</p><h2>📚 나의 세계여행 포토북</h2><p>여행하면서 남긴 사진 관찰, 비교, 일기를 한 권의 기록처럼 모아 봐요.</p></div><button className="primary-button no-print" onClick={printBook}>🖨️ 포토북 인쇄·PDF</button></header>

    <div className="portfolio-summary card">
      <div><span>🛂</span><strong>{visited.length}</strong><small>여행 완료</small></div>
      <div><span>🔎</span><strong>{observations.length}</strong><small>사진 관찰</small></div>
      <div><span>↔️</span><strong>{comparisons.length}</strong><small>나라 비교</small></div>
      <div><span>🗣️</span><strong>{player.learnedPhraseIds.length}</strong><small>배운 말</small></div>
    </div>

    {visited.length === 0 ? <div className="empty-state card"><div>📷</div><h3>아직 포토북이 비어 있어요.</h3><p>나라 여행을 완료하면 사진과 기록이 이곳에 자동으로 모여요.</p></div> : (
      <div className="portfolio-country-list">
        {visited.map((country) => {
          const hero = imageForCategory(country, '풍경');
          const countryObservations = observations.filter((item) => item.countryId === country.id);
          const journal = player.journals[country.id];
          const relatedComparisons = comparisons.filter((item) => item.leftCountryId === country.id || item.rightCountryId === country.id);
          return <article className="card portfolio-country" key={country.id}>
            <div className="portfolio-country-hero">
              {hero && <CuratedPhoto image={hero} imageClassName="portfolio-hero-photo" showCredit={false} />}
              <div><span className="portfolio-flag">{country.flag}</span><h3>{country.name}</h3><small>{country.englishName}</small><div className="portfolio-stamp">🛂 VISITED</div></div>
            </div>

            {countryObservations.length > 0 && <section className="portfolio-section"><h4>🔎 사진 관찰 기록</h4><div className="portfolio-note-grid">{countryObservations.map((entry) => <div className="portfolio-note" key={`${entry.countryId}:${entry.imageCategory}`}><strong>{entry.imageCategory} 사진</strong><p><b>보인 것:</b> {entry.noticed}</p>{entry.wondered && <p><b>궁금한 것:</b> {entry.wondered}</p>}<p><b>사진만으로 알 수 없는 것:</b> {entry.cannotKnow}</p></div>)}</div></section>}

            {journal && <section className="portfolio-section"><h4>📖 여행 일기</h4><div className="portfolio-journal"><p><b>새롭게 알게 된 것</b><br />{journal.learned || '—'}</p><p><b>기억에 남는 것</b><br />{journal.memorable || '—'}</p><p><b>우리와 비슷했던 것</b><br />{journal.similar || '—'}</p></div></section>}

            {relatedComparisons.length > 0 && <section className="portfolio-section"><h4>↔️ 다른 나라와 비교한 기록</h4>{relatedComparisons.map((entry) => {
              const otherId = entry.leftCountryId === country.id ? entry.rightCountryId : entry.leftCountryId;
              const other = allCountries.find((item) => item.id === otherId);
              return <div className="portfolio-comparison" key={entry.id}><strong>{country.flag} {country.name} ↔ {other?.flag} {other?.name ?? otherId} · {entry.category}</strong><p><b>비슷한 점:</b> {entry.same}</p><p><b>다른 점:</b> {entry.different}</p><p><b>존중하며 말하기:</b> {entry.respect}</p></div>;
            })}</section>}
          </article>;
        })}
      </div>
    )}

    <footer className="portfolio-footer"><strong>🌏 다름을 만나고, 같음을 발견하는 세계여행</strong><p>사진 한 장은 한 나라나 사람 전체를 대표하지 않습니다. 여러 자료를 함께 보고 서로의 다양성을 존중해요.</p></footer>
  </section>;
}
