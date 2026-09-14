# v0.8 → v0.8.1 GitHub 업데이트

기존 GitHub Pages와 `.github/workflows/pages.yml`은 그대로 사용합니다. `.github` 폴더를 삭제하거나 다시 만들 필요가 없습니다.

## 권장 방법

1. v0.8.1 ZIP을 풉니다.
2. 기존 GitHub 저장소에서 **전체 파일을 삭제하지 않습니다.**
3. 아래 변경 파일과 폴더를 업로드해 덮어씁니다.
   - `src/`
   - `README.md`
   - `PROJECT_SPEC.md`
   - `TEST_CHECKLIST.md`
   - `CHANGELOG.md`
   - `IMAGE_SAFETY_POLICY.md`
   - `CURATED_PHOTO_LIST.md`
   - `package.json`
4. 기존 `.github/`는 그대로 둡니다.
5. Commit 후 `Actions → Deploy to GitHub Pages`가 초록색인지 확인합니다.
6. 사이트에서 `Ctrl+Shift+R`로 강력 새로고침합니다.
7. `🛠 확인`에서 버전 `0.8.1`과 `실사진 안전목록 24개`를 확인합니다.

## 학교에서 Wikimedia가 막힌 경우

실사진이 로딩되지 않으면 오류 화면 대신 기존 교육용 SVG가 자동으로 나타납니다. 이는 정상적인 안전 대체 동작입니다.
