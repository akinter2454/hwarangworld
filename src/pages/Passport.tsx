import { countries } from '../data/countries';
import { useClassroom } from '../store/ClassroomContext';
import { useTravel } from '../store/TravelContext';

export function Passport() {
  const { player } = useTravel();
  const { customCountries } = useClassroom();
  const allCountries = [...countries, ...customCountries.filter((custom) => !countries.some((item) => item.id === custom.id))];
  return (
    <section className="page">
      <header className="page-header"><div><p className="eyebrow">WORLD PASSPORT</p><h2>🛂 나의 세계여행 여권</h2></div></header>
      <div className="passport card">
        <div className="passport-top"><div className="passport-photo">🧑‍🚀</div><div><small>여행자</small><h3>{player.nickname || '지구별 탐험가'}</h3><p>방문 국가 {allCountries.filter((country)=>player.visitedCountries.includes(country.id)).length} / {allCountries.length}</p></div></div>
        <div className="stamp-grid">
          {allCountries.map((country) => {
            const visited = player.visitedCountries.includes(country.id);
            return <div key={country.id} className={`stamp ${visited ? 'visited' : ''}`}><span>{country.flag}</span><strong>{country.name}</strong><small>{visited ? 'VISITED ✔' : country.custom ? '선생님 미션' : '미방문'}</small></div>;
          })}
        </div>
      </div>
    </section>
  );
}
