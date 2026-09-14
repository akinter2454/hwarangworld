import type { CountryImage } from '../types';

export type TeacherApprovedPhoto = CountryImage & {
  id: string;
  countryId: string;
  commonsFile: string;
  curatedForStudents: true;
  approvedAt: string;
};

const STORAGE_KEY = 'multicultural-world-tour-teacher-photo-library-v1';

const allowedCountryIds = new Set(['korea', 'vietnam', 'china', 'mongolia', 'philippines', 'thailand', 'uzbekistan', 'india', 'japan', 'brazil', 'egypt', 'france']);
const allowedCategories: CountryImage['category'][] = ['풍경', '음식', '생활', '문화'];

function safeLocalFallback(countryId: string, category: CountryImage['category']) {
  const file = category === '음식' ? 'food' : category === '생활' ? 'life' : category === '문화' ? 'culture' : 'hero';
  return `${import.meta.env.BASE_URL}images/countries/${countryId}/${file}.svg`;
}

const blockedTerms = [
  'nude', 'nudity', 'porn', 'sex', 'sexual', 'erotic', 'fetish',
  'blood', 'corpse', 'dead body', 'injury', 'wound', 'gore',
  'weapon', 'gun', 'rifle', 'pistol', 'knife', 'sword',
  'execution', 'suicide', 'self-harm', 'drug', 'cannabis', 'cocaine',
];

export function candidateFileNameLooksSafe(fileName: string) {
  const clean = fileName.replace(/^File:/i, '').trim();
  if (!clean || clean.length > 240 || !/\.(jpe?g|png|webp)$/i.test(clean)) return false;
  const normalized = clean.toLowerCase().replaceAll('_', ' ');
  return !blockedTerms.some((term) => normalized.includes(term));
}

function sanitizePhoto(item: Partial<TeacherApprovedPhoto>): TeacherApprovedPhoto | null {
  const countryId = typeof item.countryId === 'string' ? item.countryId : '';
  const commonsFile = typeof item.commonsFile === 'string' ? item.commonsFile.replace(/^File:/i, '').trim() : '';
  const category = item.category;
  if (!countryId || !allowedCountryIds.has(countryId) || !commonsFile || !candidateFileNameLooksSafe(commonsFile)) return null;
  if (!category || !allowedCategories.includes(category)) return null;

  return {
    id: typeof item.id === 'string' && item.id ? item.id : `teacher-photo-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    countryId,
    commonsFile,
    // Never trust a URL from imported/local JSON as the fallback image.
    src: safeLocalFallback(countryId, category),
    alt: typeof item.alt === 'string' && item.alt.trim() ? item.alt.trim().slice(0, 240) : `${countryId} ${category} 실제 자료 사진`,
    caption: typeof item.caption === 'string' && item.caption.trim() ? item.caption.trim().slice(0, 500) : '교사가 검토해 추가한 실제 자료 사진입니다.',
    category,
    reviewNote: typeof item.reviewNote === 'string' && item.reviewNote.trim()
      ? item.reviewNote.trim().slice(0, 600)
      : '교사가 원본 사진을 직접 미리보고 학생용 안전 체크리스트를 확인한 뒤 승인한 자료입니다.',
    curatedForStudents: true,
    approvedAt: typeof item.approvedAt === 'string' && item.approvedAt ? item.approvedAt : new Date().toISOString(),
  };
}

export function listTeacherApprovedPhotos(): TeacherApprovedPhoto[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
    if (!Array.isArray(parsed)) return [];
    return parsed.map((item) => sanitizePhoto(item ?? {})).filter((item): item is TeacherApprovedPhoto => Boolean(item));
  } catch {
    return [];
  }
}

function write(items: TeacherApprovedPhoto[]) {
  const safe = items.map((item) => sanitizePhoto(item)).filter((item): item is TeacherApprovedPhoto => Boolean(item));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(safe.slice(0, 120)));
  window.dispatchEvent(new CustomEvent('multicultural-photo-library-changed'));
}

export function approveTeacherPhoto(input: Omit<TeacherApprovedPhoto, 'id' | 'approvedAt' | 'curatedForStudents'>) {
  const next = sanitizePhoto({
    ...input,
    id: `teacher-photo-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    approvedAt: new Date().toISOString(),
    curatedForStudents: true,
  });
  if (!next) {
    throw new Error('학생용 사진 승인 조건을 충족하지 못했습니다. 나라·유형·파일명을 다시 확인해 주세요.');
  }
  const existing = listTeacherApprovedPhotos().filter((item) => item.commonsFile !== next.commonsFile || item.countryId !== next.countryId);
  write([next, ...existing]);
  return next;
}

export function removeTeacherApprovedPhoto(id: string) {
  write(listTeacherApprovedPhotos().filter((item) => item.id !== id));
}

export function isTeacherApprovedCommonsFile(fileName: string) {
  return listTeacherApprovedPhotos().some((item) => item.commonsFile === fileName);
}

export function photosForCountry(countryId: string) {
  return listTeacherApprovedPhotos().filter((item) => item.countryId === countryId);
}

export function exportTeacherPhotoLibrary() {
  return JSON.stringify({
    version: 1,
    exportedAt: new Date().toISOString(),
    photos: listTeacherApprovedPhotos(),
  }, null, 2);
}

export function importTeacherPhotoLibrary(text: string) {
  const parsed = JSON.parse(text) as { photos?: TeacherApprovedPhoto[] } | TeacherApprovedPhoto[];
  const photos = Array.isArray(parsed) ? parsed : parsed.photos;
  if (!Array.isArray(photos)) throw new Error('사진 자료 JSON 형식이 올바르지 않습니다.');
  const clean = photos.map((item) => sanitizePhoto(item ?? {})).filter((item): item is TeacherApprovedPhoto => Boolean(item));
  write(clean);
  return clean.length;
}
