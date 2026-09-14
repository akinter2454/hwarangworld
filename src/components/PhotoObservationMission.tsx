import { useMemo, useState } from 'react';
import type { Country, CountryImage } from '../types';
import { imagesForCountry } from '../services/countryImages';
import { useTravel } from '../store/TravelContext';
import { CuratedPhoto } from './CuratedPhoto';

const categories: CountryImage['category'][] = ['풍경', '음식', '생활', '문화'];

export function PhotoObservationMission({ country }: { country: Country }) {
  const { player, savePhotoObservation, completeMiniGame } = useTravel();
  const images = useMemo(() => imagesForCountry(country), [country]);
  const available = categories.filter((category) => images.some((image) => image.category === category));
  const [category, setCategory] = useState<CountryImage['category']>(available[0] ?? '풍경');
  const key = `${country.id}:${category}`;
  const existing = player.photoObservations[key];
  const [noticed, setNoticed] = useState(existing?.noticed ?? '');
  const [wondered, setWondered] = useState(existing?.wondered ?? '');
  const [cannotKnow, setCannotKnow] = useState(existing?.cannotKnow ?? '');
  const [saved, setSaved] = useState(false);

  const image = images.find((item) => item.category === category) ?? images[0];

  const changeCategory = (next: CountryImage['category']) => {
    const old = player.photoObservations[`${country.id}:${next}`];
    setCategory(next);
    setNoticed(old?.noticed ?? '');
    setWondered(old?.wondered ?? '');
    setCannotKnow(old?.cannotKnow ?? '');
    setSaved(false);
  };

  const save = () => {
    if (!image || !noticed.trim() || !cannotKnow.trim()) return;
    savePhotoObservation({
      countryId: country.id,
      imageCategory: category,
      noticed: noticed.trim(),
      wondered: wondered.trim(),
      cannotKnow: cannotKnow.trim(),
      updatedAt: new Date().toISOString(),
    });
    completeMiniGame(`${country.id}-photo-observation`, 2);
    setSaved(true);
  };

  if (!image) return <div className="card content-card"><h3>🔎 사진 관찰 미션</h3><p>이 여행지에는 아직 관찰할 사진이 없어요.</p></div>;

  return <section className="photo-observation-layout">
    <div className="lesson-note photo-literacy-note"><strong>🔎 사진 탐정 규칙</strong><span>사진에서 실제로 보이는 것과 내가 추측한 것을 구분해요. 사진 한 장만 보고 사람이나 나라 전체를 판단하지 않아요.</span></div>
    <div className="observation-category-tabs" role="tablist">
      {available.map((item) => <button key={item} className={item === category ? 'active' : ''} onClick={() => changeCategory(item)}>{item}</button>)}
    </div>
    <div className="photo-observation-grid">
      <div className="card observation-photo-card">
        <CuratedPhoto image={image} imageClassName="observation-photo" showCredit />
        <p>{image.caption}</p>
      </div>
      <div className="card observation-form">
        <h3>🕵️ {country.name} {category} 사진 관찰</h3>
        <label>① 사진에서 직접 보이는 것<textarea value={noticed} onChange={(e) => { setNoticed(e.target.value); setSaved(false); }} placeholder="예: 길 옆에 가게와 사람들이 보여요." /></label>
        <label>② 더 궁금한 것<textarea value={wondered} onChange={(e) => { setWondered(e.target.value); setSaved(false); }} placeholder="예: 이곳은 언제 사람들이 가장 많을까요?" /></label>
        <label>③ 이 사진만으로는 알 수 없는 것 <span className="required-chip">필수</span><textarea value={cannotKnow} onChange={(e) => { setCannotKnow(e.target.value); setSaved(false); }} placeholder="예: 이 나라 모든 사람의 생활 모습은 알 수 없어요." /></label>
        <button className="primary-button" disabled={!noticed.trim() || !cannotKnow.trim()} onClick={save}>💾 관찰 기록 저장</button>
        {saved && <p className="saved-message">✓ 포토북에 관찰 기록이 저장되었어요.</p>}
      </div>
    </div>
  </section>;
}
