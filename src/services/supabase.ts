import { createClient, type RealtimeChannel, type User } from '@supabase/supabase-js';
import type { AssignmentTargetType, Country, LearningAssignment, PlayerData, TeacherCountryRecord } from '../types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim();
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY?.trim();

export const cloudConfigured = Boolean(supabaseUrl && supabasePublishableKey);

const LOCAL_TEACHER_COUNTRIES_KEY = 'multicultural-world-tour-local-teacher-countries-v1';
export const LOCAL_CONTENT_UPDATED_EVENT = 'multicultural-world-tour-local-content-updated';

function readLocalTeacherCountries(): TeacherCountryRecord[] {
  try {
    const raw = localStorage.getItem(LOCAL_TEACHER_COUNTRIES_KEY);
    const parsed = raw ? JSON.parse(raw) as TeacherCountryRecord[] : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch { return []; }
}

function writeLocalTeacherCountries(records: TeacherCountryRecord[]) {
  localStorage.setItem(LOCAL_TEACHER_COUNTRIES_KEY, JSON.stringify(records));
  window.dispatchEvent(new Event(LOCAL_CONTENT_UPDATED_EVENT));
}

export const supabase = cloudConfigured
  ? createClient(supabaseUrl!, supabasePublishableKey!, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
    })
  : null;

export type ClassroomSessionStatus = 'ready' | 'live' | 'ended';
export type Classroom = {
  id: string;
  teacher_id: string;
  name: string;
  grade: string;
  join_code: string;
  active: boolean;
  session_status: ClassroomSessionStatus;
  session_message: string;
  session_started_at: string | null;
  created_at: string;
};

export type ClassroomSession = { status: ClassroomSessionStatus; message: string; startedAt: string | null };

export type Enrollment = {
  classroomId: string;
  studentId: string;
  joinCode: string;
  className: string;
  nickname: string;
};

export type StudentRosterRow = {
  id: string;
  nickname: string;
  group_name: string;
  joined_at: string;
  last_seen_at: string | null;
  progress: PlayerData | null;
  progress_updated_at: string | null;
};

type JoinRpcRow = {
  student_id: string;
  classroom_id: string;
  classroom_name: string;
  join_code: string;
  nickname: string;
};

function requireClient() {
  if (!supabase) throw new Error('Supabase 환경 변수가 설정되지 않았습니다.');
  return supabase;
}

export async function currentUser(): Promise<User | null> {
  const client = requireClient();
  const { data, error } = await client.auth.getUser();
  if (error) return null;
  return data.user;
}

export async function signOutCloud() {
  const client = requireClient();
  const { error } = await client.auth.signOut();
  if (error) throw error;
}

export async function teacherSignIn(email: string, password: string) {
  const client = requireClient();
  const { data, error } = await client.auth.signInWithPassword({ email, password });
  if (error) throw error;
  if (data.user?.is_anonymous) throw new Error('교사 계정으로 로그인해 주세요.');
  return data.user;
}

export async function teacherSignUp(email: string, password: string) {
  const client = requireClient();
  const { data, error } = await client.auth.signUp({ email, password });
  if (error) throw error;
  return data;
}

async function ensureAnonymousStudent() {
  const client = requireClient();
  const { data: sessionData } = await client.auth.getSession();
  const existing = sessionData.session?.user;
  if (existing?.is_anonymous) return existing;
  if (existing && !existing.is_anonymous) {
    throw new Error('현재 브라우저가 교사 계정으로 로그인되어 있습니다. 교사 화면에서 로그아웃한 뒤 학생으로 참여해 주세요.');
  }
  const { data, error } = await client.auth.signInAnonymously();
  if (error) throw error;
  if (!data.user) throw new Error('학생 익명 세션을 만들지 못했습니다.');
  return data.user;
}

export async function joinClassroom(joinCode: string, nickname: string): Promise<Enrollment> {
  const client = requireClient();
  await ensureAnonymousStudent();
  const code = joinCode.replace(/\s/g, '').toUpperCase();
  const safeNickname = nickname.trim().slice(0, 12);
  if (!code || !safeNickname) throw new Error('수업 코드와 여행자 이름을 입력해 주세요.');

  const { data, error } = await client.rpc('join_classroom', { p_join_code: code, p_nickname: safeNickname });
  if (error) throw error;
  const row = (Array.isArray(data) ? data[0] : data) as JoinRpcRow | undefined;
  if (!row) throw new Error('학급 참여 정보를 받지 못했습니다.');

  return {
    classroomId: row.classroom_id,
    studentId: row.student_id,
    joinCode: row.join_code,
    className: row.classroom_name,
    nickname: row.nickname,
  };
}

export async function syncStudentProgress(enrollment: Enrollment, player: PlayerData) {
  const client = requireClient();
  const now = new Date().toISOString();
  const { error: studentError } = await client.from('classroom_students')
    .update({ last_seen_at: now, nickname: enrollment.nickname }).eq('id', enrollment.studentId);
  if (studentError) throw studentError;
  const { error } = await client.from('student_progress').upsert({
    student_id: enrollment.studentId,
    player,
    updated_at: now,
  }, { onConflict: 'student_id' });
  if (error) throw error;
}

export async function loadStudentProgress(studentId: string): Promise<PlayerData | null> {
  const client = requireClient();
  const { data, error } = await client.from('student_progress').select('player').eq('student_id', studentId).maybeSingle();
  if (error) throw error;
  return (data?.player as PlayerData | undefined) ?? null;
}

export async function listTeacherClassrooms(): Promise<Classroom[]> {
  const client = requireClient();
  const user = await currentUser();
  if (!user || user.is_anonymous) return [];
  const { data, error } = await client.from('classrooms').select('*').eq('teacher_id', user.id).order('created_at', { ascending: false });
  if (error) throw error;
  return (data ?? []) as Classroom[];
}

function randomCode() {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  return Array.from({ length: 6 }, () => alphabet[Math.floor(Math.random() * alphabet.length)]).join('');
}

export async function createClassroom(name: string, grade: string): Promise<Classroom> {
  const client = requireClient();
  const user = await currentUser();
  if (!user || user.is_anonymous) throw new Error('교사 로그인이 필요합니다.');
  for (let attempt = 0; attempt < 5; attempt += 1) {
    const { data, error } = await client.from('classrooms').insert({
      teacher_id: user.id,
      name: name.trim().slice(0, 40),
      grade: grade.trim().slice(0, 20),
      join_code: randomCode(),
    }).select('*').single();
    if (!error && data) return data as Classroom;
    if (error?.code !== '23505') throw error;
  }
  throw new Error('수업 코드 생성에 실패했습니다. 다시 시도해 주세요.');
}

export async function listClassroomStudents(classroomId: string): Promise<StudentRosterRow[]> {
  const client = requireClient();
  const { data, error } = await client.from('classroom_students')
    .select('id,nickname,group_name,joined_at,last_seen_at,student_progress(player,updated_at)')
    .eq('classroom_id', classroomId).order('joined_at', { ascending: true });
  if (error) throw error;
  return (data ?? []).map((row: any) => {
    const progressRow = Array.isArray(row.student_progress) ? row.student_progress[0] : row.student_progress;
    return {
      id: row.id,
      nickname: row.nickname,
      group_name: row.group_name ?? '',
      joined_at: row.joined_at,
      last_seen_at: row.last_seen_at,
      progress: (progressRow?.player as PlayerData | undefined) ?? null,
      progress_updated_at: progressRow?.updated_at ?? null,
    };
  });
}

export function subscribeToClassroomProgress(classroomId: string, onChange: () => void): RealtimeChannel | null {
  const client = supabase;
  if (!client) return null;
  return client.channel(`classroom-progress-${classroomId}`)
    .on('postgres_changes', { event: '*', schema: 'public', table: 'student_progress' }, () => onChange())
    .on('postgres_changes', { event: '*', schema: 'public', table: 'classroom_students', filter: `classroom_id=eq.${classroomId}` }, () => onChange())
    .subscribe();
}

export async function removeRealtimeChannel(channel: RealtimeChannel | null) {
  if (supabase && channel) await supabase.removeChannel(channel);
}


export async function listTeacherCountries(): Promise<TeacherCountryRecord[]> {
  if (!cloudConfigured) return readLocalTeacherCountries();
  const client = requireClient();
  const user = await currentUser();
  if (!user || user.is_anonymous) return [];
  const { data, error } = await client.from('teacher_countries')
    .select('*').eq('teacher_id', user.id).order('updated_at', { ascending: false });
  if (error) throw error;
  return (data ?? []) as TeacherCountryRecord[];
}

export async function saveTeacherCountry(country: Country, recordId?: string): Promise<TeacherCountryRecord> {
  const now = new Date().toISOString();
  const safeCountry: Country = { ...country, custom: true };
  if (!cloudConfigured) {
    const records = readLocalTeacherCountries();
    const localId = recordId ?? (crypto.randomUUID ? crypto.randomUUID() : `local-${Date.now()}`);
    const next: TeacherCountryRecord = {
      id: localId,
      teacher_id: 'local',
      name: safeCountry.name.slice(0, 60),
      country_data: safeCountry,
      created_at: records.find((item) => item.id === localId)?.created_at ?? now,
      updated_at: now,
    };
    writeLocalTeacherCountries([next, ...records.filter((item) => item.id !== localId)]);
    return next;
  }
  const client = requireClient();
  const user = await currentUser();
  if (!user || user.is_anonymous) throw new Error('교사 로그인이 필요합니다.');
  if (recordId) {
    const { data, error } = await client.from('teacher_countries').update({
      name: safeCountry.name.slice(0, 60), country_data: safeCountry, updated_at: now,
    }).eq('id', recordId).select('*').single();
    if (error) throw error;
    return data as TeacherCountryRecord;
  }
  const { data, error } = await client.from('teacher_countries').insert({
    teacher_id: user.id, name: safeCountry.name.slice(0, 60), country_data: safeCountry,
  }).select('*').single();
  if (error) throw error;
  return data as TeacherCountryRecord;
}

export async function deleteTeacherCountry(recordId: string) {
  if (!cloudConfigured) {
    writeLocalTeacherCountries(readLocalTeacherCountries().filter((item) => item.id !== recordId));
    return;
  }
  const client = requireClient();
  const { error } = await client.from('teacher_countries').delete().eq('id', recordId);
  if (error) throw error;
}

export async function listClassroomAssignments(classroomId: string): Promise<LearningAssignment[]> {
  const client = requireClient();
  const { data, error } = await client.from('classroom_assignments')
    .select('id,classroom_id,built_in_country_id,custom_country_id,title,teacher_note,priority,target_type,target_value,teacher_countries(country_data)')
    .eq('classroom_id', classroomId).eq('active', true).order('priority', { ascending: false }).order('created_at', { ascending: true });
  if (error) throw error;
  return (data ?? []).map((row: any) => {
    const related = Array.isArray(row.teacher_countries) ? row.teacher_countries[0] : row.teacher_countries;
    const customCountry = related?.country_data ? ({ ...related.country_data, custom: true } as Country) : null;
    return {
      id: row.id,
      classroomId: row.classroom_id,
      source: row.custom_country_id ? 'custom' : 'builtin',
      countryId: row.custom_country_id ? (customCountry?.id || `custom-${row.custom_country_id}`) : row.built_in_country_id,
      title: row.title,
      teacherNote: row.teacher_note ?? '',
      priority: row.priority ?? 0,
      targetType: (row.target_type ?? 'all') as AssignmentTargetType,
      targetValue: row.target_value ?? '',
      targetLabel: row.target_type === 'group' ? `그룹 ${row.target_value}` : row.target_type === 'student' ? '개별 학생' : '전체',
      customCountry,
    } satisfies LearningAssignment;
  });
}

export async function assignCountryToClassroom(input: {
  classroomId: string;
  title: string;
  teacherNote?: string;
  priority?: number;
  builtInCountryId?: string;
  customCountryId?: string;
  targetType?: AssignmentTargetType;
  targetValue?: string;
}) {
  const client = requireClient();
  if (!input.builtInCountryId && !input.customCountryId) throw new Error('배포할 여행지를 선택해 주세요.');
  const { data, error } = await client.from('classroom_assignments').insert({
    classroom_id: input.classroomId,
    built_in_country_id: input.builtInCountryId ?? null,
    custom_country_id: input.customCountryId ?? null,
    title: input.title.slice(0, 80),
    teacher_note: (input.teacherNote ?? '').slice(0, 300),
    priority: Math.max(0, Math.min(10, input.priority ?? 5)),
    target_type: input.targetType ?? 'all',
    target_value: (input.targetValue ?? '').slice(0, 80),
  }).select('id').single();
  if (error) throw error;
  return data as { id: string };
}

export async function removeClassroomAssignment(assignmentId: string) {
  const client = requireClient();
  const { error } = await client.from('classroom_assignments').delete().eq('id', assignmentId);
  if (error) throw error;
}

export async function loadStudentLearningPlan(classroomId: string): Promise<LearningAssignment[]> {
  const client = requireClient();
  const { data, error } = await client.rpc('student_learning_plan', { p_classroom_id: classroomId });
  if (error) throw error;
  return (data ?? []).map((row: any) => {
    const customCountry = row.custom_country ? ({ ...row.custom_country, custom: true } as Country) : null;
    return {
      id: row.assignment_id,
      classroomId,
      source: row.source_kind as 'builtin' | 'custom',
      countryId: row.source_kind === 'custom' ? (customCountry?.id || `custom-${row.source_id}`) : row.source_id,
      title: row.title,
      teacherNote: row.teacher_note ?? '',
      priority: row.priority ?? 0,
      targetType: (row.target_type ?? 'all') as AssignmentTargetType,
      targetValue: row.target_value ?? '',
      targetLabel: row.target_label ?? (row.target_type === 'group' ? `그룹 ${row.target_value}` : row.target_type === 'student' ? '나에게 배정' : '전체 학생'),
      customCountry,
    } satisfies LearningAssignment;
  });
}


export async function updateClassroomSession(classroomId: string, status: ClassroomSessionStatus, message: string): Promise<Classroom> {
  const client = requireClient();
  const patch = {
    session_status: status,
    session_message: message.trim().slice(0, 240),
    session_started_at: status === 'live' ? new Date().toISOString() : null,
  };
  const { data, error } = await client.from('classrooms').update(patch).eq('id', classroomId).select('*').single();
  if (error) throw error;
  return data as Classroom;
}

export async function loadStudentClassroomSession(classroomId: string): Promise<ClassroomSession | null> {
  const client = requireClient();
  const { data, error } = await client.rpc('student_classroom_session', { p_classroom_id: classroomId });
  if (error) throw error;
  const row = Array.isArray(data) ? data[0] : data;
  if (!row) return null;
  return { status: row.session_status as ClassroomSessionStatus, message: row.session_message ?? '', startedAt: row.session_started_at ?? null };
}

export async function updateStudentGroup(studentId: string, groupName: string) {
  const client = requireClient();
  const { error } = await client.rpc('set_student_group', { p_student_id: studentId, p_group_name: groupName.trim().slice(0, 30) });
  if (error) throw error;
}
