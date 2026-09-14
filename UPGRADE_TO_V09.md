# v0.8.1 → v0.9.0 GitHub 업데이트

기존 GitHub Pages가 정상 작동하고 있다면 저장소를 새로 만들 필요가 없습니다.

## 가장 중요한 점: `.github`는 그대로 두세요

GitHub 웹 업로드에서 숨김 폴더 `.github`가 자주 누락될 수 있으므로, 현재 저장소의 아래 파일이 정상 동작한다면 삭제하거나 다시 올리지 마세요.

```text
.github/
└─ workflows/
   ├─ pages.yml
   └─ check.yml
```

v0.9에서는 workflow 자체를 바꿀 필요가 없습니다.

## 업데이트 순서

1. `multicultural-world-tour-v0.9.zip`을 풉니다.
2. GitHub 저장소의 기존 `.github/`는 그대로 유지합니다.
3. v0.9의 `src/`, `public/`, `package.json`, `vite.config.ts` 및 문서 파일을 같은 위치에 업로드/교체합니다.
4. Commit 합니다.
5. `Actions`에서 기존 `Deploy to GitHub Pages`가 자동 실행되는지 확인합니다.
6. 초록색 체크가 뜨면 GitHub Pages 사이트에서 `Ctrl+Shift+R`로 한 번 강력 새로고침합니다.
7. 앱의 `🛠 확인`에서 `0.9.0`, `실사진 안전목록 48개`를 확인합니다.

## `.github`가 사라졌다면

v0.9 ZIP의 눈에 보이는 폴더:

```text
GITHUB_WORKFLOW_BACKUP/
├─ pages.yml
└─ check.yml
```

을 참고해 GitHub에서 다음 경로로 각각 생성하면 됩니다.

```text
.github/workflows/pages.yml
.github/workflows/check.yml
```

## v0.9에서 새로 중요한 파일

```text
src/components/PhotoLibraryManager.tsx
src/services/teacherPhotoLibrary.ts
src/services/wikimedia.ts
src/data/curatedCommonsAllowlist.ts
src/data/countryMedia.ts
IMAGE_SAFETY_POLICY.md
CURATED_PHOTO_LIST.md
```
