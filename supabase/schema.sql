-- 다문화 세계여행 v0.3 학급 기능
-- Supabase SQL Editor에서 전체를 한 번 실행하세요.

create extension if not exists pgcrypto;

create table if not exists public.classrooms (
  id uuid primary key default gen_random_uuid(),
  teacher_id uuid not null references auth.users(id) on delete cascade,
  name text not null check (char_length(name) between 1 and 40),
  grade text not null default '',
  join_code text not null unique check (join_code ~ '^[A-Z0-9]{6}$'),
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.classroom_students (
  id uuid primary key default gen_random_uuid(),
  classroom_id uuid not null references public.classrooms(id) on delete cascade,
  auth_user_id uuid not null references auth.users(id) on delete cascade,
  nickname text not null check (char_length(nickname) between 1 and 12),
  joined_at timestamptz not null default now(),
  last_seen_at timestamptz,
  unique(classroom_id, auth_user_id)
);

create table if not exists public.student_progress (
  student_id uuid primary key references public.classroom_students(id) on delete cascade,
  player jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create index if not exists classroom_students_classroom_idx on public.classroom_students(classroom_id);
create index if not exists classroom_students_auth_idx on public.classroom_students(auth_user_id);

alter table public.classrooms enable row level security;
alter table public.classroom_students enable row level security;
alter table public.student_progress enable row level security;

revoke all on table public.classrooms from anon, authenticated;
revoke all on table public.classroom_students from anon, authenticated;
revoke all on table public.student_progress from anon, authenticated;

grant select, insert, update, delete on public.classrooms to authenticated;
grant select, update on public.classroom_students to authenticated;
grant select, insert, update on public.student_progress to authenticated;

-- RLS 정책에서 다른 보호 테이블을 직접 재귀 조회하지 않도록 작은 SECURITY DEFINER 검사 함수를 사용합니다.
create or replace function public.is_teacher_of_classroom(p_classroom_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.classrooms
    where id = p_classroom_id and teacher_id = auth.uid()
  );
$$;

create or replace function public.is_student_record(p_student_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.classroom_students
    where id = p_student_id and auth_user_id = auth.uid()
  );
$$;

create or replace function public.is_teacher_of_student(p_student_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.classroom_students cs
    join public.classrooms c on c.id = cs.classroom_id
    where cs.id = p_student_id and c.teacher_id = auth.uid()
  );
$$;

revoke all on function public.is_teacher_of_classroom(uuid) from public, anon;
revoke all on function public.is_student_record(uuid) from public, anon;
revoke all on function public.is_teacher_of_student(uuid) from public, anon;
grant execute on function public.is_teacher_of_classroom(uuid) to authenticated;
grant execute on function public.is_student_record(uuid) to authenticated;
grant execute on function public.is_teacher_of_student(uuid) to authenticated;

-- 재실행 가능하도록 기존 정책을 먼저 제거합니다.
drop policy if exists "teacher_select_own_classrooms" on public.classrooms;
drop policy if exists "teacher_insert_own_classrooms" on public.classrooms;
drop policy if exists "teacher_update_own_classrooms" on public.classrooms;
drop policy if exists "teacher_delete_own_classrooms" on public.classrooms;
drop policy if exists "student_or_teacher_select_roster" on public.classroom_students;
drop policy if exists "student_update_self" on public.classroom_students;
drop policy if exists "student_or_teacher_read_progress" on public.student_progress;
drop policy if exists "student_insert_own_progress" on public.student_progress;
drop policy if exists "student_update_own_progress" on public.student_progress;

-- 교사: 자신의 학급만 관리
create policy "teacher_select_own_classrooms" on public.classrooms
for select to authenticated
using ((select auth.uid()) = teacher_id);

create policy "teacher_insert_own_classrooms" on public.classrooms
for insert to authenticated
with check (
  (select auth.uid()) = teacher_id
  and coalesce(((select auth.jwt())->>'is_anonymous')::boolean, false) is false
);

create policy "teacher_update_own_classrooms" on public.classrooms
for update to authenticated
using ((select auth.uid()) = teacher_id)
with check ((select auth.uid()) = teacher_id);

create policy "teacher_delete_own_classrooms" on public.classrooms
for delete to authenticated
using ((select auth.uid()) = teacher_id);

-- 학생은 자기 행, 교사는 자기 학급 학생 전체만 조회
create policy "student_or_teacher_select_roster" on public.classroom_students
for select to authenticated
using (
  auth_user_id = (select auth.uid())
  or public.is_teacher_of_classroom(classroom_id)
);

create policy "student_update_self" on public.classroom_students
for update to authenticated
using (auth_user_id = (select auth.uid()))
with check (auth_user_id = (select auth.uid()));

-- 진행도: 해당 학생 본인 또는 담당 교사만 읽기
create policy "student_or_teacher_read_progress" on public.student_progress
for select to authenticated
using (
  public.is_student_record(student_id)
  or public.is_teacher_of_student(student_id)
);

create policy "student_insert_own_progress" on public.student_progress
for insert to authenticated
with check (public.is_student_record(student_id));

create policy "student_update_own_progress" on public.student_progress
for update to authenticated
using (public.is_student_record(student_id))
with check (public.is_student_record(student_id));

-- 수업 코드로 안전하게 가입하는 RPC. 학급 목록/ID를 학생에게 공개하지 않아도 됩니다.
create or replace function public.join_classroom(p_join_code text, p_nickname text)
returns table(student_id uuid, classroom_id uuid, classroom_name text, join_code text, nickname text)
language plpgsql
security definer
set search_path = public
as $$
declare
  target public.classrooms%rowtype;
  enrolled public.classroom_students%rowtype;
begin
  if auth.uid() is null then raise exception '로그인이 필요합니다.'; end if;
  if coalesce((auth.jwt()->>'is_anonymous')::boolean, false) is false then
    raise exception '학생 익명 계정으로 참여해 주세요.';
  end if;

  select c.* into target from public.classrooms c
  where upper(c.join_code) = upper(trim(p_join_code)) and c.active = true
  limit 1;
  if target.id is null then raise exception '수업 코드를 확인해 주세요.'; end if;

  insert into public.classroom_students(classroom_id, auth_user_id, nickname, last_seen_at)
  values(target.id, auth.uid(), left(trim(p_nickname), 12), now())
  on conflict (classroom_id, auth_user_id)
  do update set nickname = excluded.nickname, last_seen_at = now()
  returning * into enrolled;

  return query select enrolled.id, target.id, target.name, target.join_code, enrolled.nickname;
end;
$$;

revoke all on function public.join_classroom(text, text) from public, anon;
grant execute on function public.join_classroom(text, text) to authenticated;

-- Realtime에서 두 테이블의 변경을 구독하도록 등록합니다.
do $$
begin
  if not exists (select 1 from pg_publication_tables where pubname='supabase_realtime' and schemaname='public' and tablename='student_progress') then
    execute 'alter publication supabase_realtime add table public.student_progress';
  end if;
  if not exists (select 1 from pg_publication_tables where pubname='supabase_realtime' and schemaname='public' and tablename='classroom_students') then
    execute 'alter publication supabase_realtime add table public.classroom_students';
  end if;
end $$;

-- ============================================================
-- v0.4 교사 콘텐츠 제작기 / 학급별 여행 미션 배포
-- ============================================================
create table if not exists public.teacher_countries (
  id uuid primary key default gen_random_uuid(),
  teacher_id uuid not null references auth.users(id) on delete cascade,
  name text not null check (char_length(name) between 1 and 60),
  country_data jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.classroom_assignments (
  id uuid primary key default gen_random_uuid(),
  classroom_id uuid not null references public.classrooms(id) on delete cascade,
  built_in_country_id text,
  custom_country_id uuid references public.teacher_countries(id) on delete cascade,
  title text not null check (char_length(title) between 1 and 80),
  teacher_note text not null default '',
  priority integer not null default 5 check (priority between 0 and 10),
  active boolean not null default true,
  created_at timestamptz not null default now(),
  check ((built_in_country_id is not null) <> (custom_country_id is not null))
);

create index if not exists teacher_countries_teacher_idx on public.teacher_countries(teacher_id);
create index if not exists classroom_assignments_classroom_idx on public.classroom_assignments(classroom_id);

alter table public.teacher_countries enable row level security;
alter table public.classroom_assignments enable row level security;
revoke all on table public.teacher_countries from anon, authenticated;
revoke all on table public.classroom_assignments from anon, authenticated;
grant select, insert, update, delete on public.teacher_countries to authenticated;
grant select, insert, update, delete on public.classroom_assignments to authenticated;

drop policy if exists "teacher_manage_own_countries" on public.teacher_countries;
create policy "teacher_manage_own_countries" on public.teacher_countries
for all to authenticated
using ((select auth.uid()) = teacher_id)
with check ((select auth.uid()) = teacher_id and coalesce(((select auth.jwt())->>'is_anonymous')::boolean, false) is false);

drop policy if exists "teacher_manage_own_assignments" on public.classroom_assignments;
create policy "teacher_manage_own_assignments" on public.classroom_assignments
for all to authenticated
using (public.is_teacher_of_classroom(classroom_id))
with check (public.is_teacher_of_classroom(classroom_id));

-- 학생에게는 RLS 테이블을 직접 공개하지 않고 RPC로 자기 학급의 배포 내용만 제공합니다.
drop function if exists public.student_learning_plan(uuid);
create function public.student_learning_plan(p_classroom_id uuid)
returns table(
  assignment_id uuid,
  source_kind text,
  source_id text,
  title text,
  teacher_note text,
  priority integer,
  custom_country jsonb
)
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.uid() is null then raise exception '로그인이 필요합니다.'; end if;
  if not exists (
    select 1 from public.classroom_students cs
    where cs.classroom_id = p_classroom_id and cs.auth_user_id = auth.uid()
  ) then raise exception '이 학급에 참여한 학생만 학습 계획을 볼 수 있습니다.'; end if;

  return query
  select
    a.id,
    case when a.custom_country_id is not null then 'custom' else 'builtin' end,
    case when a.custom_country_id is not null then a.custom_country_id::text else a.built_in_country_id end,
    a.title,
    a.teacher_note,
    a.priority,
    tc.country_data
  from public.classroom_assignments a
  left join public.teacher_countries tc on tc.id = a.custom_country_id
  where a.classroom_id = p_classroom_id and a.active = true
  order by a.priority desc, a.created_at asc;
end;
$$;

revoke all on function public.student_learning_plan(uuid) from public, anon;
grant execute on function public.student_learning_plan(uuid) to authenticated;

-- ============================================================
-- v0.6 수업 모드 / 그룹·개별 미션
-- 기존 v0.3~v0.5 프로젝트에 전체 schema.sql을 다시 실행해도 안전하도록
-- ALTER TABLE ... IF NOT EXISTS 형태로 확장합니다.
-- ============================================================
alter table public.classrooms add column if not exists session_status text not null default 'ready';
alter table public.classrooms add column if not exists session_message text not null default '';
alter table public.classrooms add column if not exists session_started_at timestamptz;

alter table public.classroom_students add column if not exists group_name text not null default '';

alter table public.classroom_assignments add column if not exists target_type text not null default 'all';
alter table public.classroom_assignments add column if not exists target_value text not null default '';

-- 유효값 체크 제약은 중복 생성되지 않게 검사합니다.
do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'classrooms_session_status_check') then
    alter table public.classrooms add constraint classrooms_session_status_check check (session_status in ('ready','live','ended'));
  end if;
  if not exists (select 1 from pg_constraint where conname = 'classroom_assignments_target_type_check') then
    alter table public.classroom_assignments add constraint classroom_assignments_target_type_check check (target_type in ('all','group','student'));
  end if;
end $$;

-- 학생은 nickname/last_seen_at만 갱신할 수 있고 group_name은 교사 RPC로만 변경합니다.
revoke update on table public.classroom_students from authenticated;
grant update (nickname, last_seen_at) on public.classroom_students to authenticated;

create or replace function public.set_student_group(p_student_id uuid, p_group_name text)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  target_classroom uuid;
begin
  select classroom_id into target_classroom from public.classroom_students where id = p_student_id;
  if target_classroom is null or not public.is_teacher_of_classroom(target_classroom) then
    raise exception '담당 교사만 그룹을 변경할 수 있습니다.';
  end if;
  update public.classroom_students set group_name = left(trim(coalesce(p_group_name,'')),30) where id = p_student_id;
end;
$$;
revoke all on function public.set_student_group(uuid,text) from public, anon;
grant execute on function public.set_student_group(uuid,text) to authenticated;

-- 학생은 자기 학급의 수업 상태만 RPC로 확인합니다.
create or replace function public.student_classroom_session(p_classroom_id uuid)
returns table(session_status text, session_message text, session_started_at timestamptz)
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.uid() is null then raise exception '로그인이 필요합니다.'; end if;
  if not exists (
    select 1 from public.classroom_students cs
    where cs.classroom_id = p_classroom_id and cs.auth_user_id = auth.uid()
  ) then raise exception '이 학급에 참여한 학생만 수업 상태를 볼 수 있습니다.'; end if;
  return query select c.session_status, c.session_message, c.session_started_at from public.classrooms c where c.id = p_classroom_id;
end;
$$;
revoke all on function public.student_classroom_session(uuid) from public, anon;
grant execute on function public.student_classroom_session(uuid) to authenticated;

-- v0.4 함수의 반환값/필터가 달라지므로 삭제 후 v0.6 버전으로 다시 만듭니다.
drop function if exists public.student_learning_plan(uuid);
create function public.student_learning_plan(p_classroom_id uuid)
returns table(
  assignment_id uuid,
  source_kind text,
  source_id text,
  title text,
  teacher_note text,
  priority integer,
  target_type text,
  target_value text,
  target_label text,
  custom_country jsonb
)
language plpgsql
security definer
set search_path = public
as $$
declare
  current_student public.classroom_students%rowtype;
begin
  if auth.uid() is null then raise exception '로그인이 필요합니다.'; end if;
  select * into current_student
  from public.classroom_students cs
  where cs.classroom_id = p_classroom_id and cs.auth_user_id = auth.uid()
  limit 1;
  if current_student.id is null then raise exception '이 학급에 참여한 학생만 학습 계획을 볼 수 있습니다.'; end if;

  return query
  select
    a.id,
    case when a.custom_country_id is not null then 'custom' else 'builtin' end,
    case when a.custom_country_id is not null then a.custom_country_id::text else a.built_in_country_id end,
    a.title,
    a.teacher_note,
    a.priority,
    a.target_type,
    a.target_value,
    case
      when a.target_type = 'group' then '그룹 ' || a.target_value
      when a.target_type = 'student' then '나에게 배정'
      else '전체 학생'
    end,
    tc.country_data
  from public.classroom_assignments a
  left join public.teacher_countries tc on tc.id = a.custom_country_id
  where a.classroom_id = p_classroom_id
    and a.active = true
    and (
      a.target_type = 'all'
      or (a.target_type = 'group' and a.target_value <> '' and a.target_value = current_student.group_name)
      or (a.target_type = 'student' and a.target_value = current_student.id::text)
    )
  order by a.priority desc, a.created_at asc;
end;
$$;
revoke all on function public.student_learning_plan(uuid) from public, anon;
grant execute on function public.student_learning_plan(uuid) to authenticated;
