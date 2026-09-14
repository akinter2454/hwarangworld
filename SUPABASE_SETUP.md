# Supabase 학급·콘텐츠 기능 연결 방법 (v0.7, 선택 기능)

> 중요: v0.7의 기본 여행, 콘텐츠 제작, 무료 자동 문항 생성, 로컬 분석에는 Supabase가 필요하지 않습니다. 아래 설정은 **여러 학생 기기의 진행도를 교사 한 화면으로 모을 때만** 사용합니다.

## 1. Supabase 프로젝트 생성
새 프로젝트를 만든다.

## 2. 학생 익명 로그인 활성화
Authentication 설정에서 **Anonymous Sign-Ins**를 활성화한다. 학생은 이메일이나 전화번호 없이 수업코드로 참여한다.

## 3. 데이터베이스 설치/업데이트
Supabase SQL Editor에서 `supabase/schema.sql` 전체를 실행한다.

주요 테이블:
- `classrooms`: 교사 학급과 6자리 참여 코드
- `classroom_students`: 익명 학생과 학급 연결 + 교사 지정 그룹
- `student_progress`: 학생의 여행 진행도
- `teacher_countries`: 교사가 제작한 여행 콘텐츠
- `classroom_assignments`: 전체/그룹/개별 학생 여행 미션 배포

주요 RPC:
- `join_classroom()`: 학생 수업코드 입장
- `student_learning_plan()`: 학생 본인에게 해당하는 전체/그룹/개별 미션 조회
- `student_classroom_session()`: 학생이 현재 수업 시작/종료 상태 확인
- `set_student_group()`: 담당 교사만 학생 그룹 변경

RLS를 사용해 교사는 자기 학급/콘텐츠만 관리하고, 학생은 허용된 RPC와 자기 진행 기록만 이용하도록 구성한다.

## 4. 브라우저 환경 변수
`.env.example`을 `.env.local`로 복사한다.

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_YOUR_KEY
```

`service_role` 키는 브라우저 코드에 넣지 않는다.

## 5. 생성형 AI API 키는 필요 없음
v0.7에서는 Gemini/OpenAI API를 호출하지 않는다. 문항 생성과 학급 분석은 브라우저의 로컬 엔진으로 처리한다.

## 6. 수업 흐름
1. 교사 화면에서 계정 생성/로그인
2. `콘텐츠 제작`에서 새 여행지 작성 및 무료 자동 문항 검토
3. 학급 생성
4. 학급 상세에서 학생 그룹을 A/B/C·지원·심화 등으로 지정
5. `학생·그룹별 여행 미션`에서 전체/그룹/개별 학생을 선택해 배포
6. 필요하면 `수업 시작` 버튼으로 학생 화면에 수업 상태와 안내문 표시
7. 학생은 QR 또는 수업코드로 입장
8. 학생 세계지도에 자신에게 해당하는 `오늘의 추천 여행` 표시
9. 학생 진행도는 로컬에 먼저 저장되고 인터넷 연결 시 Supabase와 동기화
10. 교사 관제센터에서 무료 로컬 분석 엔진이 학급 기록을 요약

## 운영 참고
- 교사와 학생을 같은 브라우저에서 동시에 테스트하지 않는 것이 편하다. 서로 다른 브라우저/시크릿 창/기기를 권장한다.
- 학생 실명 대신 별명 또는 학급에서 정한 비식별 이름 사용을 권장한다.
- 교사 제작 콘텐츠와 자동 생성 문항은 실제 수업 전 사실과 표현을 검토한다.
- 학급 결과는 관제센터 CSV로 정기 백업할 수 있다.


## GitHub Pages에서 환경 변수 넣기

GitHub Pages 배포에서는 `.env.local` 파일을 GitHub에 올리지 않습니다. 저장소의 `Settings` → `Secrets and variables` → `Actions` → `Variables`에서 다음 Repository variable을 만드세요.

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`

저장 후 `Actions` → `Deploy to GitHub Pages` → `Run workflow`로 다시 배포하면 빌드 과정에서 값이 주입됩니다. `service_role` 키는 절대 등록하지 마세요.
