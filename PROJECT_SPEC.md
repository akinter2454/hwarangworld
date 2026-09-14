# PROJECT_SPEC — 다함께 GO! 세계여행 v0.7

## 목표

초등학생이 세계 여러 지역의 언어·음식·생활·문화를 여행 게임처럼 탐색하고, 교사가 학급 활동과 결과를 관리할 수 있는 다문화교육 웹앱을 만든다.

## 기본 기술

- React
- TypeScript
- Vite
- PWA / Service Worker
- 브라우저 localStorage
- GitHub + GitHub Actions + GitHub Pages
- 선택 기능: Supabase Auth/PostgreSQL/Realtime

## 무료 운영 원칙

기본 기능은 외부 생성형 AI API나 유료 서버 없이 작동한다.

- 문제 생성: 로컬 규칙 기반 스마트 문항 엔진
- 학급 분석: 로컬 통계·규칙 엔진
- 개인/같은 기기 콘텐츠: localStorage
- 정적 앱 배포: GitHub Pages
- 선택형 다기기 동기화: Supabase

## GitHub Pages 원칙

- `main` 브랜치에 push되면 Pages workflow가 자동 배포한다.
- Vite base는 GitHub 저장소 이름을 빌드 시 자동 감지한다.
- PWA manifest, service worker, QR 참여 링크는 프로젝트 Pages 하위 경로를 존중한다.
- 학교 PC에서는 Node.js/BAT가 아니라 배포된 URL로 테스트한다.
- 중간 점검은 앱 내 `🛠 확인` 진단센터를 사용한다.

## 교육 핵심 흐름

여권 만들기 → 세계지도 → 여행지 선택 → 언어/음식/생활/문화 탐험 → 미니게임 → 퀴즈 → 도장 → 여행일기/배지

## 교사 흐름

콘텐츠 제작 → 학급 생성(선택형 클라우드) → 수업코드/QR 공유 → 수업 시작 → 전체/그룹/개별 미션 → 진행도 분석 → CSV/활동지

## 접근성/다문화 지원

- 쉬운 한국어 모드
- 한국어/영어/중국어/러시아어/베트남어 이용 안내
- TTS
- 큰 터치 영역
- 학생 실명/민감정보 최소화
- 특정 국가·문화의 모든 사람을 하나의 특징으로 일반화하지 않는 문장 원칙

## 데이터 호환

v0.1부터 사용한 학생 진행도 localStorage 구조를 가능한 한 유지한다. 스키마 변경 시 마이그레이션을 우선한다.
