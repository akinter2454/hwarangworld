import { useEffect, useMemo, useState } from 'react';
import { countries } from '../data/countries';
import { useClassroom } from '../store/ClassroomContext';
import { useTravel } from '../store/TravelContext';

export function Journal() {
  const { player, saveJournal } = useTravel();
  const { customCountries } = useClassroom();
  const allCountries = useMemo(() => [...countries, ...customCountries.filter((custom) => !countries.some((item) => item.id === custom.id))], [customCountries]);
  const available = useMemo(() => allCountries.filter((country) => player.visitedCountries.includes(country.id)), [allCountries, player.visitedCountries]);
  const [countryId, setCountryId] = useState(available[0]?.id ?? '');
  const current = player.journals[countryId];
  const [learned, setLearned] = useState(current?.learned ?? '');
  const [memorable, setMemorable] = useState(current?.memorable ?? '');
  const [similar, setSimilar] = useState(current?.similar ?? '');
  const [saved, setSaved] = useState(false);

  useEffect(() => { if (!countryId && available[0]) setCountryId(available[0].id); }, [available, countryId]);
  const changeCountry = (id: string) => {
    setCountryId(id);
    const entry = player.journals[id];
    setLearned(entry?.learned ?? ''); setMemorable(entry?.memorable ?? ''); setSimilar(entry?.similar ?? ''); setSaved(false);
  };
  const save = () => { if (!countryId) return; saveJournal({ countryId, learned, memorable, similar }); setSaved(true); };

  return (
    <section className="page">
      <header className="page-header"><div><p className="eyebrow">TRAVEL JOURNAL</p><h2>📖 나의 세계여행 일기</h2></div></header>
      {available.length === 0 ? <div className="empty-state card"><div>📔</div><h3>여행을 먼저 완료해 주세요.</h3><p>여권 도장을 받은 나라부터 여행 일기를 쓸 수 있어요.</p></div> : (
        <div className="card journal-form">
          <label>여행한 나라<select value={countryId} onChange={(event) => changeCountry(event.target.value)}>{available.map((country) => <option key={country.id} value={country.id}>{country.flag} {country.name}</option>)}</select></label>
          <label>오늘 새롭게 알게 된 것은?<textarea value={learned} onChange={(event) => { setLearned(event.target.value); setSaved(false); }} placeholder="새롭게 알게 된 내용을 한 문장으로 써 보세요." /></label>
          <label>가장 기억에 남는 것은?<textarea value={memorable} onChange={(event) => { setMemorable(event.target.value); setSaved(false); }} placeholder="말, 음식, 생활, 문화 중 기억에 남는 것을 써 보세요." /></label>
          <label>우리와 비슷했던 것은?<textarea value={similar} onChange={(event) => { setSimilar(event.target.value); setSaved(false); }} placeholder="나의 생활과 비슷한 점을 찾아보세요." /></label>
          <button className="primary-button" onClick={save}>💾 여행 일기 저장</button>
          {saved && <p className="saved-message">✓ 저장되었어요.</p>}
        </div>
      )}
    </section>
  );
}
