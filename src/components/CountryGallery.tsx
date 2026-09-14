import { useEffect, useMemo, useState } from 'react';
import type { Country, CountryImage } from '../types';
import { photosForCountry } from '../services/teacherPhotoLibrary';
import { CuratedPhoto } from './CuratedPhoto';

export function CountryGallery({ country }: { country: Country }) {
  const [selected, setSelected] = useState<CountryImage | null>(null);
  const [libraryVersion, setLibraryVersion] = useState(0);
  useEffect(() => {
    const refresh = () => setLibraryVersion((v) => v + 1);
    window.addEventListener('multicultural-photo-library-changed', refresh);
    return () => window.removeEventListener('multicultural-photo-library-changed', refresh);
  }, []);
  const images = useMemo(() => [
    country.media?.hero,
    ...(country.media?.gallery ?? []),
    ...photosForCountry(country.id),
  ].filter(Boolean) as CountryImage[], [country, libraryVersion]);

  if (!images.length) return <div className="card content-card"><h3>🖼️ 사진·그림 탐험</h3><p>이 여행지에는 아직 이미지가 등록되지 않았어요.</p></div>;

  return <div>
    <div className="lesson-note photo-safety-note">
      <strong>📷 실제 사진 안전모드</strong>
      <span>학생에게는 자동 검색 결과를 보여주지 않아요. 기본 자료는 사전 선별한 실제 사진과 교육용 그림 자료를 함께 보여 줍니다. 교사 추가 자료도 미리보기와 안전 확인을 거쳐야 공개됩니다. 사진이나 그림 한 장만 보고 그 나라 전체 모습이라고 일반화하지 않아요.</span>
    </div>
    <div className="country-gallery-grid">
      {images.map((image, index) => <button className="gallery-card card" key={`${image.category}-${image.commonsFile ?? image.src}-${index}`} onClick={() => setSelected(image)}>
        <CuratedPhoto image={image} showCredit={false} wrapperClassName="gallery-photo-shell" />
        <div>
          <div className="gallery-category-row"><span>{image.category}</span>{image.commonsFile && <em>실제 사진</em>}</div>
          <p>{image.caption}</p>
        </div>
      </button>)}
    </div>
    {selected && <div className="modal-backdrop" onClick={() => setSelected(null)}>
      <div className="image-lightbox card" onClick={(e) => e.stopPropagation()}>
        <button className="icon-button lightbox-close" onClick={() => setSelected(null)}>×</button>
        <CuratedPhoto image={selected} imageClassName="lightbox-photo" showCredit />
        <span className="lightbox-category">{selected.category}</span>
        <p>{selected.caption}</p>
        {selected.reviewNote && <div className="photo-review-note">🛡️ {selected.reviewNote}</div>}
      </div>
    </div>}
  </div>;
}
