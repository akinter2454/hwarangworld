import { useState } from 'react';
import { updateClassroomSession, type Classroom, type ClassroomSessionStatus } from '../services/supabase';

export function ClassSessionControls({ classroom, onUpdated }: { classroom: Classroom; onUpdated: (classroom: Classroom) => void }) {
  const [message, setMessage] = useState(classroom.session_message || '오늘은 추천 여행지를 탐험하고, 우리와 비슷한 점을 한 가지 찾아봅시다.');
  const [busy, setBusy] = useState(false);
  const act = async (status: ClassroomSessionStatus) => {
    setBusy(true);
    try { onUpdated(await updateClassroomSession(classroom.id, status, message)); }
    finally { setBusy(false); }
  };
  const statusLabel = classroom.session_status === 'live' ? '🟢 수업 진행 중' : classroom.session_status === 'ended' ? '⚫ 오늘 수업 종료' : '🟡 시작 전';
  return <section className="card session-control-card"><div className="table-heading"><div><h3>🎬 수업 시작·종료</h3><small>학생 화면에 현재 수업 상태와 안내문이 표시됩니다.</small></div><span className={`session-status-chip ${classroom.session_status}`}>{statusLabel}</span></div><label>학생 안내문<textarea value={message} maxLength={240} onChange={(e)=>setMessage(e.target.value)} /></label><div className="session-actions"><button className="primary-button" disabled={busy} onClick={()=>void act('live')}>▶ 수업 시작</button><button className="small-button" disabled={busy} onClick={()=>void act('ready')}>⏸ 시작 전</button><button className="small-button danger-soft" disabled={busy} onClick={()=>void act('ended')}>■ 수업 종료</button></div></section>;
}
