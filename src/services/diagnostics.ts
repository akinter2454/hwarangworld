import { countries } from '../data/countries';
import { getAppBasePath, getHostingLabel, getHostingMode } from './deployment';
import { CURATED_COMMONS_FILES } from '../data/curatedCommonsAllowlist';

export const APP_VERSION = '1.1.0';
const ERROR_KEY = 'multicultural-world-tour-error-log-v1';
const CHECK_KEY = 'multicultural-world-tour-test-checklist-v3';

export type ErrorLog = { time: string; message: string; source?: string };
export type DiagnosticResult = { id: string; label: string; ok: boolean; detail: string };

export function readErrorLogs(): ErrorLog[] {
  try { return JSON.parse(localStorage.getItem(ERROR_KEY) ?? '[]') as ErrorLog[]; } catch { return []; }
}

export function pushErrorLog(message: string, source?: string) {
  const logs = readErrorLogs();
  logs.unshift({ time: new Date().toISOString(), message: String(message).slice(0, 1000), source: source?.slice(0, 300) });
  localStorage.setItem(ERROR_KEY, JSON.stringify(logs.slice(0, 20)));
  window.dispatchEvent(new Event('multicultural-world-tour-error-log'));
}

export function clearErrorLogs() {
  localStorage.removeItem(ERROR_KEY);
  window.dispatchEvent(new Event('multicultural-world-tour-error-log'));
}

export function installGlobalErrorCapture() {
  const onError = (event: ErrorEvent) => pushErrorLog(event.message || '알 수 없는 오류', `${event.filename || ''}:${event.lineno || ''}`);
  const onRejection = (event: PromiseRejectionEvent) => pushErrorLog(event.reason instanceof Error ? event.reason.message : String(event.reason), 'unhandledrejection');
  window.addEventListener('error', onError);
  window.addEventListener('unhandledrejection', onRejection);
  return () => { window.removeEventListener('error', onError); window.removeEventListener('unhandledrejection', onRejection); };
}

export function runDiagnostics(cloudConfigured: boolean, enrolled: boolean): DiagnosticResult[] {
  const results: DiagnosticResult[] = [];
  try {
    const key = '__world_tour_test__'; localStorage.setItem(key, 'ok'); const ok = localStorage.getItem(key) === 'ok'; localStorage.removeItem(key);
    results.push({ id: 'storage', label: '브라우저 저장', ok, detail: ok ? 'localStorage 읽기/쓰기 정상' : '브라우저 저장을 사용할 수 없음' });
  } catch { results.push({ id: 'storage', label: '브라우저 저장', ok: false, detail: '저장 권한이 차단됨' }); }
  const quizOkay = countries.every((country) => country.quiz.length > 0 && country.quiz.every((q) => q.options.length >= 2 && q.answer >= 0 && q.answer < q.options.length));
  results.push({ id: 'content', label: '기본 여행 콘텐츠', ok: quizOkay && countries.length >= 12, detail: `${countries.length}개 국가 · 퀴즈 구조 ${quizOkay ? '정상' : '확인 필요'}` });
  results.push({ id: 'speech', label: '음성 읽기', ok: 'speechSynthesis' in window, detail: 'speechSynthesis' in window ? '기기 음성 기능 사용 가능' : '이 브라우저에서 음성 기능 미지원' });
  results.push({ id: 'network', label: '현재 네트워크', ok: navigator.onLine, detail: navigator.onLine ? '온라인으로 감지됨' : '오프라인으로 감지됨' });
  results.push({ id: 'photos', label: '실사진 안전목록', ok: CURATED_COMMONS_FILES.length === 48, detail: `Wikimedia Commons 사전 선별 사진 ${CURATED_COMMONS_FILES.length}개 · 나라별 4장 · 실시간 검색 사용 안 함` });
  results.push({ id: 'pwa', label: 'PWA 지원', ok: 'serviceWorker' in navigator, detail: 'serviceWorker' in navigator ? '서비스워커 사용 가능' : '서비스워커 미지원' });
  const hostingMode = getHostingMode();
  results.push({ id: 'hosting', label: '배포 환경', ok: true, detail: `${getHostingLabel()} · base ${getAppBasePath()}${hostingMode === 'github-pages' ? ' · GitHub Pages 경로 자동 대응' : ''}` });
  results.push({ id: 'cloud', label: '학급 클라우드', ok: true, detail: cloudConfigured ? (enrolled ? 'Supabase 연결 + 학생 학급 연결됨' : 'Supabase 연결됨 · 현재 학생 학급 세션 없음') : '무료 로컬 모드 · 클라우드 선택 사항' });
  return results;
}

export const testChecklistItems = [
  '세계지도가 열리고 국가를 선택할 수 있다.',
  '나라 여행에서 인사말 음성 버튼이 동작한다.',
  '말 퀴즈·문화 탐정·사진-말 연결 미니게임을 완료할 수 있다.',
  '여권 도장과 별이 새로고침 후에도 유지된다.',
  '여행일기를 저장하고 다시 확인할 수 있다.',
  '사진 관찰 미션에서 보이는 것·궁금한 것·사진만으로 알 수 없는 것을 저장할 수 있다.',
  '두 나라 사진 비교 기록을 저장할 수 있다.',
  '포토북에서 관찰·비교·일기 기록이 자동으로 모이고 인쇄/PDF가 가능하다.',
  '기본 12개국 완주 후 여권에서 인증서를 발급하고 인쇄/PDF 저장할 수 있다.',
  '교사 콘텐츠 제작기에서 새 여행지를 저장할 수 있다.',
  '쉬운 한국어와 다국어 빠른 안내를 켜고 끌 수 있다.',
  '교사 수업 모드·미션 배포 기능이 필요한 방식으로 표시된다.',
  '휴대폰 또는 태블릿 화면에서 버튼과 글자가 잘리지 않는다.',
  '진단센터에서 오류정보 복사 기능이 동작한다.',
  'GitHub Pages 주소에서 새로고침해도 첫 화면이 정상적으로 열린다.',
  '그림 탐험에서 나라별 풍경·음식·생활·문화 실사진 4장과 출처가 표시된다.',
  '교사 사진 관리실에서 승인 전 안전 체크가 필수로 표시된다.',
];

export function loadChecklist(): boolean[] {
  try {
    const raw = JSON.parse(localStorage.getItem(CHECK_KEY) ?? '[]') as boolean[];
    return testChecklistItems.map((_, index) => Boolean(raw[index]));
  } catch { return testChecklistItems.map(() => false); }
}

export function saveChecklist(values: boolean[]) { localStorage.setItem(CHECK_KEY, JSON.stringify(values)); }
