import { useCallback, useEffect, useMemo, useState } from 'react';
import { countries } from '../data/countries';
import {
  cloudConfigured,
  createClassroom,
  currentUser,
  listClassroomStudents,
  listTeacherClassrooms,
  removeRealtimeChannel,
  signOutCloud,
  subscribeToClassroomProgress,
  teacherSignIn,
  teacherSignUp,
  updateStudentGroup,
  type Classroom,
  type StudentRosterRow,
} from '../services/supabase';
import { ClassQrCode } from '../components/ClassQrCode';
import { TeacherDashboard } from './TeacherDashboard';
import { TeacherContentStudio } from '../components/TeacherContentStudio';
import { ClassMissionManager } from '../components/ClassMissionManager';
import { FreeClassAnalysis } from '../components/FreeClassAnalysis';
import { ClassSessionControls } from '../components/ClassSessionControls';
import { getAppRootUrl } from '../services/deployment';
import { PhotoLibraryManager } from '../components/PhotoLibraryManager';

function downloadCsv(classroom: Classroom, students: StudentRosterRow[]) {
  const rows = [['여행자', '그룹', '방문국가', '별', '퀴즈평균', '활동완료', '사진관찰', '사진비교', '마지막동기화']];
  students.forEach((student) => {
    const player = student.progress;
    const quizIds = Object.keys(player?.quizBestScores ?? {});
    const average = quizIds.length ? Math.round(quizIds.reduce((sum, id) => {
      const country = countries.find((item) => item.id === id);
      return sum + (country ? ((player?.quizBestScores[id] ?? 0) / country.quiz.length) * 100 : 0);
    }, 0) / quizIds.length) : 0;
    rows.push([
      student.nickname, student.group_name || '-', String(player?.visitedCountries.length ?? 0), String(player?.stars ?? 0), `${average}%`, String(player?.activityCompletions.length ?? 0), String(Object.keys(player?.photoObservations ?? {}).length), String(player?.photoComparisons?.length ?? 0),
      student.progress_updated_at ? new Date(student.progress_updated_at).toLocaleString('ko-KR') : '-',
    ]);
  });
  const csv = '\uFEFF' + rows.map((row) => row.map((cell) => `"${cell.replaceAll('"', '""')}"`).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob); const anchor = document.createElement('a');
  anchor.href = url; anchor.download = `${classroom.name}-세계여행.csv`; anchor.click(); URL.revokeObjectURL(url);
}

function CloudSetupGuide() {
  return <div className="card cloud-setup-card"><div className="cloud-icon">🆓</div><h3>API 키 없이 무료로 바로 사용할 수 있습니다.</h3><p>개인 여행, 로컬 콘텐츠 제작, 자동 문항 생성, 학습 분석은 모두 브라우저 안에서 동작합니다. 여러 학생 기기의 기록을 한 교사 화면으로 모으고 싶을 때만 선택적으로 Supabase를 연결하세요.</p><div className="setup-steps"><span>무료 기본: GitHub Pages 정적 배포</span><span>문항 생성: 로컬 규칙 엔진</span><span>분석: 로컬 통계·규칙 엔진</span><span>선택: Supabase 학급 동기화</span></div></div>;
}

function TeacherAuth({ onReady }: { onReady: () => void }) {
  const [email, setEmail] = useState(''); const [password, setPassword] = useState(''); const [busy, setBusy] = useState(false); const [message, setMessage] = useState('');
  const act = async (mode: 'login' | 'signup') => { setBusy(true); setMessage(''); try { if (mode === 'login') { await teacherSignIn(email.trim(), password); setMessage('로그인되었습니다.'); onReady(); } else { const result = await teacherSignUp(email.trim(), password); setMessage(result.session ? '교사 계정을 만들었습니다.' : '가입 확인 메일을 보냈습니다. 메일 인증 후 로그인해 주세요.'); if (result.session) onReady(); } } catch (caught) { setMessage(caught instanceof Error ? caught.message : '인증 중 오류가 발생했습니다.'); } finally { setBusy(false); } };
  return <div className="card teacher-auth-card"><div className="auth-visual">🧑‍🏫</div><h3>교사 관제센터 로그인</h3><p>교사 계정만 이메일을 사용하고, 학생은 익명 수업코드 방식으로 참여합니다.</p><label>이메일<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="teacher@example.com" /></label><label>비밀번호<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} minLength={6} placeholder="6자 이상" /></label>{message && <div className="auth-message">{message}</div>}<div className="auth-actions"><button className="primary-button" disabled={busy || !email || password.length < 6} onClick={() => act('login')}>{busy ? '확인 중…' : '로그인'}</button><button className="small-button" disabled={busy || !email || password.length < 6} onClick={() => act('signup')}>교사 계정 만들기</button></div></div>;
}

const groupPresets = ['', 'A', 'B', 'C', '지원', '심화'];

function CloudClassroomDashboard({ classroom, onBack }: { classroom: Classroom; onBack: () => void }) {
  const [room, setRoom] = useState(classroom);
  const [students, setStudents] = useState<StudentRosterRow[]>([]); const [loading, setLoading] = useState(true); const [updated, setUpdated] = useState<Date | null>(null);
  const load = useCallback(async () => { setLoading(true); try { setStudents(await listClassroomStudents(room.id)); setUpdated(new Date()); } finally { setLoading(false); } }, [room.id]);
  useEffect(() => { void load(); const channel = subscribeToClassroomProgress(room.id, () => void load()); return () => { void removeRealtimeChannel(channel); }; }, [room.id, load]);

  const stats = useMemo(() => { const active = students.filter((s) => s.progress).length; const totalVisits = students.reduce((sum, s) => sum + (s.progress?.visitedCountries.length ?? 0), 0); const totalStars = students.reduce((sum, s) => sum + (s.progress?.stars ?? 0), 0); return { active, avgVisits: active ? (totalVisits / active).toFixed(1) : '0', avgStars: active ? Math.round(totalStars / active) : 0 }; }, [students]);
  const joinUrl = `${getAppRootUrl()}?class=${room.join_code}`;
  const copy = async (value: string) => { try { await navigator.clipboard.writeText(value); } catch { /* browser may deny clipboard */ } };

  return <section className="cloud-classroom-dashboard"><div className="class-dashboard-toolbar"><button className="small-button" onClick={onBack}>← 학급 목록</button><div><h3>{room.name}</h3><small>{room.grade || '학년 미지정'} · 실시간 동기화</small></div><button className="small-button" onClick={() => void load()}>↻ 새로고침</button></div>
    <ClassSessionControls classroom={room} onUpdated={setRoom} />
    <div className="class-share-grid"><div className="card class-code-display"><small>학생 수업 코드</small><strong>{room.join_code}</strong><div className="share-buttons"><button className="small-button" onClick={() => copy(room.join_code)}>코드 복사</button><button className="small-button" onClick={() => copy(joinUrl)}>참여 링크 복사</button></div></div><div className="card qr-card"><ClassQrCode value={joinUrl} /><small>학생이 QR을 찍으면 코드가 자동 입력됩니다.</small></div></div>
    <div className="stats-grid class-stats"><div className="card stat-card"><span>👥</span><strong>{students.length}</strong><small>참여 학생</small></div><div className="card stat-card"><span>☁️</span><strong>{stats.active}</strong><small>기록 동기화</small></div><div className="card stat-card"><span>🌏</span><strong>{stats.avgVisits}</strong><small>평균 방문국</small></div><div className="card stat-card"><span>⭐</span><strong>{stats.avgStars}</strong><small>평균 별</small></div></div>
    <ClassMissionManager classroom={room} students={students} />
    <FreeClassAnalysis learners={students.map((student) => ({ nickname: student.nickname, progress: student.progress }))} totalCountries={countries.length} />
    <section className="card roster-card"><div className="table-heading"><div><h3>학생 여행 현황 · 그룹 관리</h3><small>{updated ? `${updated.toLocaleTimeString('ko-KR')} 갱신 · 그룹은 미션 배정에 사용됩니다.` : '불러오는 중'}</small></div><button className="small-button" disabled={!students.length} onClick={() => downloadCsv(room, students)}>CSV 내보내기</button></div>{loading && !students.length ? <div className="empty-roster">학생 기록을 불러오는 중…</div> : !students.length ? <div className="empty-roster">아직 참여한 학생이 없습니다. QR 또는 수업 코드를 보여주세요.</div> : <div className="teacher-table-scroll"><table><thead><tr><th>여행자</th><th>그룹</th><th>방문국가</th><th>별</th><th>퀴즈</th><th>활동</th><th>사진관찰</th><th>상태</th></tr></thead><tbody>{students.map((student) => { const p=student.progress; const ids=Object.keys(p?.quizBestScores ?? {}); const avg=ids.length?Math.round(ids.reduce((sum,id)=>{const c=countries.find(x=>x.id===id);return sum+(c?((p?.quizBestScores[id]??0)/c.quiz.length)*100:0)},0)/ids.length):0; const recent=student.last_seen_at && Date.now()-new Date(student.last_seen_at).getTime()<5*60*1000; const options=Array.from(new Set([...groupPresets, student.group_name])); return <tr key={student.id}><td><strong>🛂 {student.nickname}</strong></td><td><select className="group-select" value={student.group_name} onChange={async(e)=>{await updateStudentGroup(student.id,e.target.value);await load();}}>{options.map((g)=><option value={g} key={g || 'none'}>{g || '미지정'}</option>)}</select></td><td>{p?.visitedCountries.length ?? 0}/{countries.length}</td><td>{p?.stars ?? 0}</td><td>{avg}%</td><td>{p?.activityCompletions.length ?? 0}</td><td>{Object.keys(p?.photoObservations ?? {}).length}</td><td><span className={`presence ${recent?'online':'offline'}`}>{recent?'● 최근 활동':'○ 오프라인'}</span></td></tr>; })}</tbody></table></div>}</section>
  </section>;
}

export function TeacherPortal() {
  const [authReady, setAuthReady] = useState(false); const [userState, setUserState] = useState<'loading'|'guest'|'teacher'|'student'>('loading');
  const [classrooms, setClassrooms] = useState<Classroom[]>([]); const [portalView, setPortalView] = useState<'classes'|'studio'|'photos'>('classes'); const [selected, setSelected] = useState<Classroom | null>(null); const [name, setName] = useState(''); const [grade, setGrade] = useState('3학년'); const [creating, setCreating] = useState(false); const [error, setError] = useState('');
  const refreshAuth = useCallback(async () => { if (!cloudConfigured) return; const user = await currentUser(); setUserState(!user ? 'guest' : user.is_anonymous ? 'student' : 'teacher'); setAuthReady((v) => !v); }, []);
  useEffect(() => { if (cloudConfigured) void refreshAuth(); else setUserState('guest'); }, [refreshAuth]);
  useEffect(() => { if (userState !== 'teacher') return; void listTeacherClassrooms().then(setClassrooms).catch((e) => setError(e.message)); }, [userState, authReady]);

  if (!cloudConfigured) return <section className="page teacher-page"><header className="page-header"><div><p className="eyebrow">교사용 · 완전 무료 로컬 모드</p><h2>{portalView === 'studio' ? '🧭 세계여행 콘텐츠 스튜디오' : portalView === 'photos' ? '📷 학생용 사진 자료 관리실' : '🧑‍🏫 세계여행 관제센터'}</h2></div><div className="header-actions"><div className="teacher-local-chip">FREE LOCAL</div>{portalView !== 'classes' && <button className="small-button" onClick={()=>setPortalView('classes')}>← 관제센터</button>}<button className="small-button" onClick={()=>setPortalView('studio')}>🧭 콘텐츠 제작</button><button className="small-button" onClick={()=>setPortalView('photos')}>📷 사진 관리</button></div></header>{portalView === 'studio' ? <><div className="local-free-note">이 모드에서는 만든 여행지가 브라우저에 저장되고 같은 기기의 학생 세계지도에 즉시 추가됩니다. 서버·API 키·사용료가 필요 없습니다.</div><TeacherContentStudio /></> : portalView === 'photos' ? <PhotoLibraryManager /> : <><CloudSetupGuide /><TeacherDashboard embedded /></>}</section>;
  if (userState === 'loading') return <section className="page"><div className="card loading-card">☁️ 교사 계정 확인 중…</div></section>;
  if (userState === 'student') return <section className="page teacher-page"><div className="card session-conflict-card"><span>🎒</span><h3>이 브라우저는 학생 학급에 연결되어 있습니다.</h3><p>학생 진행도는 기기에 안전하게 남아 있습니다. 교사 계정으로 전환하려면 학생 클라우드 세션에서 로그아웃하세요.</p><button className="primary-button" onClick={async()=>{await signOutCloud(); localStorage.removeItem('multicultural-world-tour-enrollment-v1'); await refreshAuth();}}>교사 로그인으로 전환</button></div></section>;
  if (userState === 'guest') return <section className="page teacher-page"><header className="page-header"><div><p className="eyebrow">교사용</p><h2>🧑‍🏫 세계여행 관제센터</h2></div><div className="teacher-cloud-chip">CLOUD</div></header><TeacherAuth onReady={() => void refreshAuth()} /></section>;
  if (selected) return <section className="page teacher-page"><header className="page-header"><div><p className="eyebrow">교사용 · CLOUD</p><h2>🧑‍🏫 세계여행 관제센터</h2></div><div className="teacher-cloud-chip">LIVE</div></header><CloudClassroomDashboard classroom={selected} onBack={() => setSelected(null)} /></section>;
  if (portalView === 'studio') return <section className="page teacher-page"><header className="page-header"><div><p className="eyebrow">교사용 · 콘텐츠 제작</p><h2>🧭 세계여행 콘텐츠 스튜디오</h2></div><div className="header-actions"><button className="small-button" onClick={()=>setPortalView('classes')}>← 학급 관리</button><button className="small-button" onClick={()=>setPortalView('photos')}>📷 사진 관리</button><button className="small-button" onClick={async()=>{await signOutCloud();setUserState('guest');}}>로그아웃</button></div></header><TeacherContentStudio /></section>;
  if (portalView === 'photos') return <section className="page teacher-page"><header className="page-header"><div><p className="eyebrow">교사용 · 자료 검토</p><h2>📷 학생용 사진 자료 관리실</h2></div><div className="header-actions"><button className="small-button" onClick={()=>setPortalView('classes')}>← 학급 관리</button><button className="small-button" onClick={()=>setPortalView('studio')}>🧭 콘텐츠 제작</button><button className="small-button" onClick={async()=>{await signOutCloud();setUserState('guest');}}>로그아웃</button></div></header><PhotoLibraryManager /></section>;

  const makeClass = async () => { if (!name.trim()) return; setCreating(true); setError(''); try { const c=await createClassroom(name,grade); setClassrooms((prev)=>[c,...prev]); setName(''); setSelected(c); } catch(caught){setError(caught instanceof Error?caught.message:'학급 생성 오류');} finally{setCreating(false);} };
  return <section className="page teacher-page"><header className="page-header"><div><p className="eyebrow">교사용 · CLOUD</p><h2>🧑‍🏫 세계여행 관제센터</h2></div><div className="header-actions"><div className="teacher-cloud-chip">LIVE</div><button className="small-button" onClick={()=>setPortalView('studio')}>🧭 콘텐츠 제작</button><button className="small-button" onClick={()=>setPortalView('photos')}>📷 사진 관리</button><button className="small-button" onClick={async()=>{await signOutCloud(); setUserState('guest'); setClassrooms([]);}}>로그아웃</button></div></header>
    <div className="teacher-cloud-intro card"><div><span>🌏</span><div><strong>학급을 만들고 학생에게 수업 코드를 공유하세요.</strong><p>학생 진행도는 각 기기에서 자동 저장되고, 인터넷 연결 시 이 관제센터와 동기화됩니다.</p></div></div></div>
    <section className="card create-class-card"><h3>➕ 새 세계여행 학급</h3><div className="create-class-form"><label>학급 이름<input value={name} onChange={(e)=>setName(e.target.value)} placeholder="예: 3학년 2반" /></label><label>학년<input value={grade} onChange={(e)=>setGrade(e.target.value)} placeholder="예: 3학년" /></label><button className="primary-button" disabled={creating || !name.trim()} onClick={makeClass}>{creating?'만드는 중…':'학급 만들기'}</button></div>{error&&<div className="form-error">⚠️ {error}</div>}</section>
    <section className="teacher-class-list"><div className="section-title-row"><h3>내 학급</h3><small>{classrooms.length}개</small></div>{!classrooms.length?<div className="card empty-class-card">아직 학급이 없습니다. 첫 세계여행 학급을 만들어 보세요.</div>:<div className="classroom-grid">{classrooms.map((c)=><button key={c.id} className="card classroom-card" onClick={()=>setSelected(c)}><span>🏫</span><div><small>{c.grade}</small><strong>{c.name}</strong><p>수업 코드 <b>{c.join_code}</b></p></div><i>→</i></button>)}</div>}</section>
  </section>;
}
