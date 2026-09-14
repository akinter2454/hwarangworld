import type { CountryImage } from '../types';
import { isCuratedCommonsFile } from '../data/curatedCommonsAllowlist';
import { isTeacherApprovedCommonsFile } from './teacherPhotoLibrary';

export type WikimediaMetadata = {
  fileName: string;
  sourcePage: string;
  author: string;
  license: string;
  licenseUrl: string;
};

const metadataCache = new Map<string, Promise<WikimediaMetadata>>();

const safeHttpUrl = (value: string, fallback: string) => {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' || url.protocol === 'http:' ? url.href : fallback;
  } catch { return fallback; }
};

const stripHtml = (value = '') => {
  if (typeof document === 'undefined') return value.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  const element = document.createElement('div');
  element.innerHTML = value;
  return (element.textContent ?? '').replace(/\s+/g, ' ').trim();
};

export const commonsSourcePage = (fileName: string) =>
  `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(fileName.replace(/ /g, '_'))}`;

export const commonsCandidatePhotoUrl = (fileName: string, width = 1000) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(fileName)}?width=${width}`;

export function isStudentApprovedCommonsFile(fileName: string) {
  return isCuratedCommonsFile(fileName) || isTeacherApprovedCommonsFile(fileName);
}

/** Student-facing remote image URL. */
export const commonsPhotoUrl = (fileName: string, width = 1400) => {
  if (!isStudentApprovedCommonsFile(fileName)) throw new Error('Commons file is not in the student-safe allowlist');
  return commonsCandidatePhotoUrl(fileName, width);
};

export const displaySourceForImage = (image: CountryImage, width = 1400) =>
  image.commonsFile && image.curatedForStudents && isStudentApprovedCommonsFile(image.commonsFile)
    ? commonsPhotoUrl(image.commonsFile, width)
    : image.src;

async function fetchMetadata(fileName: string): Promise<WikimediaMetadata> {
  const cached = metadataCache.get(fileName);
  if (cached) return cached;
  const pending = (async () => {
    const params = new URLSearchParams({
      action: 'query',
      prop: 'imageinfo',
      titles: `File:${fileName}`,
      iiprop: 'extmetadata',
      iiextmetadatafilter: 'Artist|LicenseShortName|LicenseUrl',
      iiextmetadatalanguage: 'ko',
      format: 'json',
      origin: '*',
    });
    const response = await fetch(`https://commons.wikimedia.org/w/api.php?${params.toString()}`, {
      method: 'GET', mode: 'cors', credentials: 'omit', referrerPolicy: 'no-referrer',
    });
    if (!response.ok) throw new Error(`Wikimedia metadata HTTP ${response.status}`);
    const data = await response.json();
    const pages = Object.values(data?.query?.pages ?? {}) as Array<any>;
    const info = pages[0]?.imageinfo?.[0];
    if (!info) throw new Error('Wikimedia Commons에서 파일을 찾지 못했습니다. 파일명을 정확히 확인해 주세요.');
    const meta = info.extmetadata ?? {};
    return {
      fileName,
      sourcePage: commonsSourcePage(fileName),
      author: stripHtml(meta.Artist?.value || 'Wikimedia Commons 기여자'),
      license: stripHtml(meta.LicenseShortName?.value || '파일 페이지에서 라이선스 확인'),
      licenseUrl: safeHttpUrl(meta.LicenseUrl?.value || '', commonsSourcePage(fileName)),
    };
  })();
  metadataCache.set(fileName, pending);
  return pending;
}

/** Student UI may only query metadata for already approved images. */
export async function fetchWikimediaMetadata(fileName: string): Promise<WikimediaMetadata> {
  if (!isStudentApprovedCommonsFile(fileName)) throw new Error('Commons file is not in the student-safe allowlist');
  return fetchMetadata(fileName);
}

/** Teacher-only candidate inspection. This does not approve or publish the image. */
export async function inspectWikimediaCandidate(fileName: string): Promise<WikimediaMetadata> {
  return fetchMetadata(fileName);
}
