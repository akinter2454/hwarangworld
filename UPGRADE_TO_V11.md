# v1.0.0 → v1.1.0 GitHub Pages 업데이트

이번 버전은 **세계여행 완주 인증서**가 추가된 기능 업데이트입니다.

## 가장 안전한 업데이트 순서

1. 기존 GitHub 저장소의 `.github` 폴더는 삭제하지 않습니다.
2. v1.1.0 ZIP의 `src/`, `public/`, `package.json`, `vite.config.ts` 및 루트 문서를 기존 저장소의 같은 위치에 업로드/교체합니다.
3. `UPGRADE_TO_V11.md`도 함께 올려 두면 이후 버전 확인이 쉽습니다.
4. Commit 후 `Actions → Deploy to GitHub Pages`가 초록색 체크가 되는지 확인합니다.
5. 배포 사이트에서 `Ctrl+Shift+R`로 한 번 새로고침합니다.
6. `🛠 확인`에서 VERSION `1.1.0`인지 확인합니다.

## 학생 데이터

기존 `multicultural-world-tour-player-v1` 저장 키를 그대로 사용합니다. 이전 학생 데이터는 삭제되지 않습니다. v1.1.0에서 추가된 `certificateIssuedAt`, `certificateId`가 없는 기존 기록에는 빈 값이 자동으로 보완됩니다.

## 인증서 발급 조건

기본 제공 12개국을 모두 여행하면 `여권` 화면에서 인증서를 발급할 수 있습니다. 교사가 추가한 사용자 제작 여행지는 인증서 필수 조건이 아닙니다.

## PDF 저장

`인증서 인쇄·PDF` 버튼을 누르면 인증서 전용 인쇄 창이 열립니다. Chrome/Edge 인쇄 창에서 대상 프린터를 `PDF로 저장`으로 선택하면 PDF 파일로 보관할 수 있습니다. 용지는 A4 가로 방향으로 자동 지정됩니다.
