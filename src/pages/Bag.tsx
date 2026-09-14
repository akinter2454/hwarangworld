import { countries } from '../data/countries';
import { useClassroom } from '../store/ClassroomContext';
import { useTravel } from '../store/TravelContext';

export function Bag() {
  const { player } = useTravel();
  const { customCountries } = useClassroom();
  const allCountries = [...countries, ...customCountries.filter((custom) => !countries.some((item) => item.id === custom.id))];
  const items = allCountries.flatMap((country) => player.collectedItems.includes(country.collectible.id) ? [{ ...country.collectible, country }] : []);
  return (
    <section className="page">
      <header className="page-header"><div><p className="eyebrow">COLLECTION</p><h2>🎒 나의 여행 가방</h2></div><div className="star-pill">⭐ {player.stars}</div></header>
      {items.length === 0 ? <div className="empty-state card"><div>🧳</div><h3>아직 여행 가방이 비어 있어요.</h3><p>나라별 미션을 완료하면 특별한 수집 카드를 받을 수 있어요.</p></div> : <div className="collection-grid">{items.map((item) => <div className="card collectible" key={item.id}><span>{item.emoji}</span><strong>{item.name}</strong><small>{item.country.flag} {item.country.name}</small></div>)}</div>}
    </section>
  );
}
