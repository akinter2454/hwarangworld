# v0.8 이미지 자산 안내

기본 12개 여행지에는 외부 이미지 서버가 차단되어도 사용할 수 있도록 프로젝트 내부에 경량 SVG 교육용 일러스트가 포함되어 있습니다.

경로 예시:

```text
public/images/countries/vietnam/hero.svg
public/images/countries/vietnam/food.svg
public/images/countries/vietnam/life.svg
public/images/countries/vietnam/culture.svg
```

12개국 × 4종 = 총 48개 파일입니다.

- `hero.svg`: 여행 도착/풍경 탐험
- `food.svg`: 음식 탐험
- `life.svg`: 학교·생활 탐험
- `culture.svg`: 문화 탐험

이 이미지는 사진처럼 특정 개인이나 지역을 그 나라 전체의 모습으로 대표하지 않고, 학생이 질문과 비교 활동을 시작하기 위한 상징적 교육 일러스트로 사용합니다.

교사 제작 여행지에서는 콘텐츠 제작기의 `대표 이미지 파일`에서 PNG/JPEG/WebP/SVG를 추가할 수 있습니다. 브라우저 저장 공간과 Supabase JSON 크기를 고려해 약 600KB 이하의 이미지를 권장합니다.
