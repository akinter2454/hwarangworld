import { useState } from 'react';
import type { Country, CountryImage } from '../types';

export function CountryGallery({ country }: { country: Country }) {
  const images = [country.media?.hero, ...(country.media?.gallery ?? [])].filter(Boolean) as CountryImage[];
  const [selected, setSelected] = useState<CountryImage | null>(null);
  if (!images.length) return <div className="card content-card"><h3>🖼️ 이미지 탐험</h3><p>이 여행지에는 아직 이미지가 등록되지 않았어요.</p></div>;

  return <div>
    <div className="lesson-note">🖼️ 이미지는 문화를 한 가지 모습으로 단정하기 위한 자료가 아니라, 질문하고 비교하기 위한 탐험 자료예요.</div>
    <div className="country-gallery-grid">
      {images.map((image) => <button className="gallery-card card" key={`${image.category}-${image.src}`} onClick={() => setSelected(image)}>
        <img src={image.src} alt={image.alt} loading="lazy" />
        <div><span>{image.category}</span><p>{image.caption}</p></div>
      </button>)}
    </div>
    {selected && <div className="modal-backdrop" onClick={() => setSelected(null)}>
      <div className="image-lightbox card" onClick={(e) => e.stopPropagation()}>
        <button className="icon-button lightbox-close" onClick={() => setSelected(null)}>×</button>
        <img src={selected.src} alt={selected.alt} />
        <span>{selected.category}</span><p>{selected.caption}</p>
      </div>
    </div>}
  </div>;
}
