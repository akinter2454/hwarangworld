# GitHub Pages 배포 방법 — v0.8

v0.8부터 기본 배포 방식은 **GitHub Pages**입니다. 학교 PC에서 Node.js나 BAT 파일을 실행할 필요가 없습니다.

## 처음 한 번만 설정

1. GitHub에서 새 저장소를 만듭니다. 예: `multicultural-world-tour`
2. 이 프로젝트 ZIP을 압축 해제한 뒤 **프로젝트 내부 파일 전체**를 저장소 루트에 업로드합니다.
   - `.github` 폴더도 반드시 함께 올립니다.
   - ZIP 파일 자체를 올리는 것이 아니라 압축을 푼 파일을 올립니다.
3. 저장소의 `Settings` → `Pages`로 이동합니다.
4. `Build and deployment` → `Source`를 **GitHub Actions**로 선택합니다.
5. `Actions` 탭에서 `Deploy to GitHub Pages`가 실행되는지 확인합니다.
6. 성공하면 `Settings` → `Pages`에 공개 주소가 표시됩니다.

일반 저장소라면 주소는 보통 다음 형태입니다.

`https://사용자이름.github.io/저장소이름/`

저장소 이름을 바꿔도 v0.8은 GitHub Actions 빌드 시 Vite base 경로를 자동 계산합니다.

## 이후 업데이트

새 버전 파일을 같은 저장소의 `main` 브랜치에 올리면 됩니다.

`파일 업로드 → Commit → GitHub Actions 자동 빌드 → Pages 자동 갱신`

학교 PC에서는 배포가 끝난 뒤 GitHub Pages 주소만 열어 테스트하세요.

## Supabase 학급 기능을 쓸 때

Supabase를 사용하지 않으면 별도 설정이 없습니다.

여러 학생 기기의 진행도를 교사 관제센터에 모으려면 저장소에서:

1. `Settings` → `Secrets and variables` → `Actions`
2. `Variables` 탭에서 다음 두 Repository variable을 만듭니다.
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_PUBLISHABLE_KEY`
3. 값을 저장한 뒤 `Actions` → `Deploy to GitHub Pages` → `Run workflow`로 다시 배포합니다.

`service_role` 키는 절대 넣지 마세요. 브라우저에는 Supabase publishable key만 사용합니다.

## 학교에서 중간 확인

배포된 사이트 오른쪽 아래 `🛠 확인`을 누릅니다.

- 현재 버전
- GitHub Pages 배포 여부
- 앱 base 경로
- localStorage
- PWA/서비스워커
- 음성 읽기
- 네트워크
- Supabase 연결 여부
- 최근 브라우저 오류

를 확인할 수 있습니다.

문제가 생기면 `📋 진단정보 복사`를 눌러 이 채팅에 붙여넣으면 됩니다.

## 주의

GitHub Pages는 정적 호스팅입니다. 이 프로젝트는 React/Vite 앱과 Supabase 브라우저 클라이언트 구조라 Pages에서 사용할 수 있습니다. 생성형 AI 서버 함수는 v0.5부터 사용하지 않으므로 별도 서버가 필요하지 않습니다.
