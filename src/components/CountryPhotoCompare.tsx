import { useMemo, useState } from 'react';
import type { Country, CountryImage } from '../types';
import { countries } from '../data/countries';
import { useClassroom } from '../store/ClassroomContext';
import { imageForCategory } from '../services/countryImages';
import { useTravel } from '../store/TravelContext';
import { CuratedPhoto } from './CuratedPhoto';

const categories: CountryImage['category'][] = ['풍경', '음식', '생활', '문화'];

export function CountryPhotoCompare({ country }: { country: Country }) {
  const { customCountries } = useClassroom();
  const { savePhotoComparison, completeMiniGame } = useTravel();
  const allCountries = useMemo(() => [...countries, ...customCountries.filter((c) => !countries.some((b) => b.id === c.id))], [customCountries]);
  const candidates = allCountries.filter((item) => item.id !== country.id && item.media);
  const [otherId, setOtherId] = useState(candidates[0]?.id ?? '');
  const [category, setCategory] = useState<CountryImage['category']>('생활');
  const [same, setSame] = useState('');
  const [different, setDifferent] = useState('');
  const [respect, setRespect] = useState('');
  const [saved, setSaved] = useState(false);

  const other = allCountries.find((item) => item.id === otherId);
  const leftImage = imageForCategory(country, category);
  const rightImage = other ? imageForCategory(other, category) : undefined;

  const save = () => {
    if (!other || !same.trim() || !different.trim() || !respect.trim()) return;
    const pair = [country.id, other.id].sort().join('-');
    savePhotoComparison({
      id: `${pair}:${category}`,
      leftCountryId: country.id,
      rightCountryId: other.id,
      category,
      same: same.trim(),
      different: different.trim(),
      respect: respect.trim(),
      createdAt: new Date().toISOString(),
    });
    completeMiniGame(`${country.id}-photo-compare`, 2);
    setSaved(true);
  };

  if (!other) return <div className="card content-card"><h3>↔️ 두 나라 사진 비교</h3><p>비교할 다른 여행지가 아직 없어요.</p></div>;

  return <section className="compare-mission">
    <div className="lesson-note"><strong>↔️ 비교할 때 기억하기</strong><span>어느 쪽이 더 좋다고 순위를 매기지 않고, 사진에 나타난 공통점과 차이를 관찰해요.</span></div>
    <div className="compare-controls card">
      <label>비교할 나라<select value={otherId} onChange={(e) => { setOtherId(e.target.value); setSaved(false); }}>{candidates.map((item) => <option key={item.id} value={item.id}>{item.flag} {item.name}</option>)}</select></label>
      <label>사진 주제<select value={category} onChange={(e) => { setCategory(e.target.value as CountryImage['category']); setSaved(false); }}>{categories.map((item) => <option key={item}>{item}</option>)}</select></label>
    </div>
    <div className="country-compare-photos">
      <div className="card"><h3>{country.flag} {country.name}</h3>{leftImage && <CuratedPhoto image={leftImage} imageClassName="compare-photo" showCredit />}<p>{leftImage?.caption}</p></div>
      <div className="compare-arrow">↔️</div>
      <div className="card"><h3>{other.flag} {other.name}</h3>{rightImage && <CuratedPhoto image={rightImage} imageClassName="compare-photo" showCredit />}<p>{rightImage?.caption}</p></div>
    </div>
    <div className="card compare-writing">
      <label>🤝 비슷한 점<textarea value={same} onChange={(e) => { setSame(e.target.value); setSaved(false); }} placeholder="사진에서 찾은 비슷한 점을 써 보세요." /></label>
      <label>🔍 다른 점<textarea value={different} onChange={(e) => { setDifferent(e.target.value); setSaved(false); }} placeholder="사진에서 찾은 다른 점을 써 보세요." /></label>
      <label>🌏 존중하며 말하기<textarea value={respect} onChange={(e) => { setRespect(e.target.value); setSaved(false); }} placeholder="예: 모습은 달라도 사람들이 생활하는 소중한 공간이라는 점은 같아요." /></label>
      <button className="primary-button" disabled={!same.trim() || !different.trim() || !respect.trim()} onClick={save}>📘 비교 기록을 포토북에 저장</button>
      {saved && <p className="saved-message">✓ 두 나라 비교 기록이 저장되었어요.</p>}
    </div>
  </section>;
}
