import { useEffect, useMemo, useState } from 'react';
import type { CountryImage } from '../types';
import { commonsSourcePage, displaySourceForImage, fetchWikimediaMetadata, isStudentApprovedCommonsFile, type WikimediaMetadata } from '../services/wikimedia';

 type Props = {
  image: CountryImage;
  imageClassName?: string;
  wrapperClassName?: string;
  showCredit?: boolean;
  eager?: boolean;
};

export function CuratedPhoto({ image, imageClassName, wrapperClassName = '', showCredit = true, eager = false }: Props) {
  const [remoteFailed, setRemoteFailed] = useState(false);
  const [metadata, setMetadata] = useState<WikimediaMetadata | null>(null);
  const approved = Boolean(image.commonsFile && image.curatedForStudents && isStudentApprovedCommonsFile(image.commonsFile));
  const remote = approved && !remoteFailed;
  const src = useMemo(
    () => remote && image.commonsFile ? displaySourceForImage(image) : image.src,
    [image, remote],
  );

  useEffect(() => {
    let active = true;
    setRemoteFailed(false);
    setMetadata(null);
    if (!image.commonsFile || !image.curatedForStudents || !isStudentApprovedCommonsFile(image.commonsFile)) return () => { active = false; };
    fetchWikimediaMetadata(image.commonsFile)
      .then((value) => { if (active) setMetadata(value); })
      .catch(() => { /* The photo can still render via Special:FilePath. */ });
    return () => { active = false; };
  }, [image.commonsFile, image.curatedForStudents]);

  const sourcePage = image.commonsFile && isStudentApprovedCommonsFile(image.commonsFile) ? commonsSourcePage(image.commonsFile) : '';

  return (
    <figure className={`curated-photo ${wrapperClassName} ${remote ? 'is-remote-photo' : 'is-local-illustration'}`.trim()}>
      <div className="curated-photo-image-wrap">
        <img
          className={imageClassName}
          src={src}
          alt={image.alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          referrerPolicy="no-referrer"
          onError={() => {
            if (image.commonsFile && !remoteFailed) setRemoteFailed(true);
          }}
        />
        {remote && image.curatedForStudents && <span className="curated-safe-badge">✓ 검토된 실사진</span>}
        {!remote && image.commonsFile && <span className="curated-fallback-badge">오프라인 그림 사용 중</span>}
      </div>
      {showCredit && remote && image.commonsFile && (
        <figcaption className="curated-photo-credit">
          <span>{metadata ? `사진: ${metadata.author}` : '사진: Wikimedia Commons'}</span>
          <span aria-hidden="true"> · </span>
          <a href={sourcePage} target="_blank" rel="noopener noreferrer">원본·출처</a>
          {metadata?.license && <><span aria-hidden="true"> · </span><a href={metadata.licenseUrl} target="_blank" rel="noopener noreferrer">{metadata.license}</a></>}
        </figcaption>
      )}
    </figure>
  );
}
