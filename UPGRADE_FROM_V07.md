# v0.7 → v0.8 GitHub 업데이트 방법

기존 GitHub Pages 저장소가 정상 작동한다면 저장소를 새로 만들 필요가 없습니다.

1. v0.8 ZIP을 압축 해제합니다.
2. 압축 안의 파일과 폴더를 기존 GitHub 저장소 **루트**에 업로드해 기존 파일을 교체합니다.
3. 특히 다음 새 파일/폴더가 빠지지 않았는지 확인합니다.
   - `src/pages/LanguageBook.tsx`
   - `src/components/PhraseLearningPanel.tsx`
   - `src/components/CountryGallery.tsx`
   - `src/components/DailyPhraseCard.tsx`
   - `src/data/languagePacks.ts`
   - `src/data/countryMedia.ts`
   - `public/images/countries/` 전체
4. `Commit changes`를 누릅니다.
5. `Actions → Deploy to GitHub Pages`가 초록색 체크가 될 때까지 기다립니다.
6. 사이트를 열고 강력 새로고침(Ctrl+Shift+R)을 한 번 합니다.
7. 오른쪽 아래 `🛠 확인`에서 `0.8.0`인지 확인합니다.

기존 학생 진행도 localStorage 키는 그대로 유지하므로 같은 브라우저에서는 v0.7 기록을 이어서 사용합니다. PWA 캐시는 `world-tour-v8`로 변경되어 새 버전 활성화 시 이전 캐시를 정리합니다.
