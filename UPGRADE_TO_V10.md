# v0.9 → v1.0 GitHub 업데이트

## 가장 중요한 점

기존 GitHub 저장소의 `.github` 폴더는 삭제하지 마세요. 현재 Pages 배포가 정상이라면 workflow를 다시 만들 필요가 없습니다.

## 업데이트 순서

1. `multicultural-world-tour-v1.0.zip`을 풉니다.
2. GitHub 저장소의 기존 `.github` 폴더는 그대로 둡니다.
3. v1.0의 `src/`, `public/`, `package.json`, `vite.config.ts` 및 루트 문서를 업로드/교체합니다.
4. Commit changes를 누릅니다.
5. Actions → `Deploy to GitHub Pages`가 초록색으로 완료되는지 확인합니다.
6. 실제 사이트에서 `Ctrl+Shift+R` 또는 브라우저 새로고침을 합니다.
7. 오른쪽 아래 `🛠 확인`에서 버전 `1.0.0`을 확인합니다.

## v1.0에서 새로 중요한 파일

- `src/components/PhotoObservationMission.tsx`
- `src/components/CountryPhotoCompare.tsx`
- `src/pages/Portfolio.tsx`
- `src/services/countryImages.ts`

기존 진행도는 자동 마이그레이션됩니다.
