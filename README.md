# 🌏 다함께 GO! 세계여행 v0.7

다름을 만나고, 같음을 발견하는 초등 다문화 세계여행 학습 플랫폼입니다.

## v0.7 핵심 변화 — GitHub Pages 기본 배포

- Netlify 설정과 의존 문서를 제거했습니다.
- `.github/workflows/pages.yml`이 `main` 브랜치 변경을 자동 빌드하고 GitHub Pages에 배포합니다.
- 일반 프로젝트 Pages의 `/저장소이름/` 경로를 Vite가 자동 계산합니다.
- `username.github.io` 형태의 사용자/조직 Pages 저장소에서는 자동으로 `/`를 사용합니다.
- manifest와 service worker를 GitHub Pages 하위 경로에 맞게 수정했습니다.
- 학생 QR/참여 링크도 현재 앱 루트 주소를 기준으로 생성됩니다.
- `🛠 확인` 진단센터에서 GitHub Pages 여부와 base 경로를 확인할 수 있습니다.
- 학교 PC에서는 Node.js/BAT 실행 없이 배포된 Pages 주소만 열어 테스트할 수 있습니다.

## 기존 교육 기능

- 12개 기본 국가 세계여행
- 교사 제작 여행지
- 인사말 TTS
- 음식·생활·문화 탐험
- 미니게임과 퀴즈
- 여권·별·배지·가방·여행일기
- 쉬운 한국어와 5개 언어 이용 안내
- 인쇄/PDF 활동지
- API 없는 무료 스마트 문항 생성
- API 없는 무료 학급 분석
- 선택형 Supabase 학급 코드·QR·진행도 동기화
- 수업 시작/종료 및 전체·그룹·개별 미션
- PWA/오프라인 기본 지원

## GitHub Pages 배포

자세한 내용은 `GITHUB_PAGES_SETUP.md`를 참고하세요.

처음 한 번만:

1. GitHub 저장소를 만듭니다.
2. 압축을 푼 프로젝트 파일 전체를 저장소 루트에 업로드합니다.
3. `Settings` → `Pages` → `Build and deployment` → `Source`를 `GitHub Actions`로 선택합니다.
4. `main` 브랜치에 파일이 올라가면 `Deploy to GitHub Pages` workflow가 자동 실행됩니다.
5. 배포된 GitHub Pages 주소를 학교 PC/태블릿에서 엽니다.

## 완전 무료 모드

Supabase를 연결하지 않아도 다음 기능은 모두 브라우저에서 사용할 수 있습니다.

- 세계여행 콘텐츠
- 학생 진행도 저장
- 교사 콘텐츠 제작
- 자동 문항 생성
- 로컬 학습 분석
- 활동지
- 쉬운 한국어/다국어 안내

## 선택: Supabase 학급 동기화

여러 학생 기기의 결과를 교사 화면 한 곳에서 모을 때만 Supabase가 필요합니다.

GitHub Pages 배포에서는 `.env.local`을 올리는 대신 저장소의 `Settings` → `Secrets and variables` → `Actions` → `Variables`에 다음 값을 등록합니다.

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`

자세한 내용은 `SUPABASE_SETUP.md`를 참고하세요.

## 학교 네트워크에서 중간 확인

`SCHOOL_NETWORK_TESTING.md`를 참고하세요. 배포된 사이트 오른쪽 아래의 `🛠 확인`에서 자동 진단과 오류정보 복사를 사용할 수 있습니다.

## 개발 원칙

- 생성형 AI API 키 없음
- 학생 개인정보 최소화
- 기존 localStorage 데이터 호환 유지
- 모바일/태블릿 우선
- 문화 고정관념을 피하고 공통점과 다양성을 함께 탐색
