import { useEffect, useMemo, useState } from 'react';
import { countries } from '../data/countries';
import {
  assignCountryToClassroom,
  listClassroomAssignments,
  listTeacherCountries,
  removeClassroomAssignment,
  type Classroom,
  type StudentRosterRow,
} from '../services/supabase';
import type { AssignmentTargetType, LearningAssignment, TeacherCountryRecord } from '../types';

export function ClassMissionManager({ classroom, students }: { classroom: Classroom; students: StudentRosterRow[] }) {
  const [custom, setCustom] = useState<TeacherCountryRecord[]>([]);
  const [assignments, setAssignments] = useState<LearningAssignment[]>([]);
  const [target, setTarget] = useState('builtin:vietnam');
  const [note, setNote] = useState('여행을 마치고 우리 생활과 비슷한 점 한 가지를 찾아보세요.');
  const [priority, setPriority] = useState(8);
  const [targetType, setTargetType] = useState<AssignmentTargetType>('all');
  const [targetValue, setTargetValue] = useState('');
  const [busy, setBusy] = useState(false); const [message, setMessage] = useState('');
  const load = async () => { const [c, a] = await Promise.all([listTeacherCountries(), listClassroomAssignments(classroom.id)]); setCustom(c); setAssignments(a); };
  useEffect(() => { void load().catch((e)=>setMessage(e.message)); }, [classroom.id]);

  const groups = useMemo(() => Array.from(new Set(students.map((s)=>s.group_name).filter(Boolean))).sort(), [students]);
  useEffect(() => {
    if (targetType === 'group' && !groups.includes(targetValue)) setTargetValue(groups[0] ?? '');
    if (targetType === 'student' && !students.some((s)=>s.id===targetValue)) setTargetValue(students[0]?.id ?? '');
    if (targetType === 'all') setTargetValue('');
  }, [targetType, groups, students, targetValue]);

  const selectedTitle = useMemo(() => {
    const [kind, id] = target.split(':');
    if (kind === 'builtin') return countries.find((c)=>c.id===id)?.name ?? '세계여행';
    return custom.find((c)=>c.id===id)?.name ?? '교사 제작 여행지';
  }, [target, custom]);

  const assign = async () => {
    setBusy(true); setMessage('');
    try {
      const [kind, id] = target.split(':');
      await assignCountryToClassroom({ classroomId: classroom.id, title: `${selectedTitle} 탐험 미션`, teacherNote: note, priority, builtInCountryId: kind==='builtin'?id:undefined, customCountryId: kind==='custom'?id:undefined, targetType, targetValue });
      setMessage('✅ 학생의 “오늘의 추천 여행”에 배포했습니다.'); await load();
    } catch(e){setMessage(e instanceof Error?e.message:'배포 오류');} finally{setBusy(false);}
  };

  const targetName = (assignment: LearningAssignment) => {
    if (assignment.targetType === 'all') return '전체 학생';
    if (assignment.targetType === 'group') return `그룹: ${assignment.targetValue}`;
    return `개별: ${students.find((s)=>s.id===assignment.targetValue)?.nickname ?? '학생'}`;
  };

  return <section className="card mission-manager"><div className="table-heading"><div><h3>🎯 학생·그룹별 여행 미션</h3><small>전체, 그룹, 한 학생에게 서로 다른 여행을 배정할 수 있습니다.</small></div><span className="mission-count">{assignments.length}개 배포</span></div>
    <div className="mission-form mission-form-v06">
      <label>여행지<select value={target} onChange={(e)=>setTarget(e.target.value)}><optgroup label="기본 여행지">{countries.map((c)=><option key={c.id} value={`builtin:${c.id}`}>{c.flag} {c.name}</option>)}</optgroup>{custom.length>0&&<optgroup label="내가 만든 여행지">{custom.map((c)=><option key={c.id} value={`custom:${c.id}`}>{c.country_data.flag} {c.name}</option>)}</optgroup>}</select></label>
      <label>대상<select value={targetType} onChange={(e)=>setTargetType(e.target.value as AssignmentTargetType)}><option value="all">👥 전체 학생</option><option value="group" disabled={!groups.length}>🧩 그룹</option><option value="student" disabled={!students.length}>👤 개별 학생</option></select></label>
      {targetType === 'group' && <label>그룹<select value={targetValue} onChange={(e)=>setTargetValue(e.target.value)}>{groups.map((g)=><option key={g} value={g}>{g}</option>)}</select></label>}
      {targetType === 'student' && <label>학생<select value={targetValue} onChange={(e)=>setTargetValue(e.target.value)}>{students.map((s)=><option key={s.id} value={s.id}>{s.nickname}</option>)}</select></label>}
      <label>우선순위<select value={priority} onChange={(e)=>setPriority(Number(e.target.value))}>{[10,9,8,7,6,5,4,3,2,1].map((p)=><option key={p} value={p}>{p}{p>=8?' · 추천':''}</option>)}</select></label>
      <label className="mission-note">학생에게 보여줄 미션<textarea value={note} onChange={(e)=>setNote(e.target.value)} /></label>
      <button className="primary-button" disabled={busy || ((targetType==='group'||targetType==='student')&&!targetValue)} onClick={()=>void assign()}>{busy?'배포 중…':'학생에게 배포'}</button>
    </div>
    {targetType==='group' && !groups.length && <div className="studio-message">먼저 아래 학생 현황에서 그룹을 지정해 주세요.</div>}
    {message&&<div className="studio-message">{message}</div>}
    <div className="assignment-list">{!assignments.length?<div className="empty-studio">아직 배포한 미션이 없습니다.</div>:assignments.map((a)=><div className="assignment-row" key={a.id}><span>{a.source==='custom'?'🧑‍🏫':'🌏'}</span><div><strong>{a.title}</strong><small>{targetName(a)} · 우선순위 {a.priority} · {a.teacherNote || '교사 메모 없음'}</small></div><button className="small-button" onClick={async()=>{await removeClassroomAssignment(a.id);await load();}}>배포 취소</button></div>)}</div>
  </section>;
}
