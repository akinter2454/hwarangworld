export type HostingMode = 'github-pages' | 'local' | 'other';

export function getHostingMode(): HostingMode {
  if (window.location.hostname.endsWith('.github.io')) return 'github-pages';
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') return 'local';
  return 'other';
}

export function getAppBasePath() {
  return import.meta.env.BASE_URL || '/';
}

export function getAppRootUrl() {
  return new URL(getAppBasePath(), window.location.origin).href;
}

export function getHostingLabel() {
  const mode = getHostingMode();
  if (mode === 'github-pages') return 'GitHub Pages';
  if (mode === 'local') return '로컬 개발';
  return '기타 정적 호스팅';
}
