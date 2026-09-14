import { useState } from 'react';
import type { PlayerData } from '../types';
import { useClassroom } from '../store/ClassroomContext';
import { useTravel } from '../store/TravelContext';

export function ClassJoin({ initialCode = '', onDone, onBack }: { initialCode?: string; onDone: () => void; onBack: () => void }) {
  const { player, setNickname, replacePlayer } = useTravel();
  const { cloudConfigured, enrollment, join, leave, joining, error, clearError } = useClassroom();
  const [code, setCode] = useState(initialCode.toUpperCase());
  const [nickname, setLocalNickname] = useState(player.nickname || '');
  const [success, setSuccess] = useState('');

  const submit = async () => {
    clearError(); setSuccess('');
    const safeNickname = nickname.trim() || player.nickname || '지구별 탐험가';
    try {
      const result = await join(code, safeNickname);
      setNickname(safeNickname);
      if (result.remoteProgress) {
        const remote = result.remoteProgress as PlayerData;
        const localMeaningful = player.visitedCountries.length + player.stars > 0;
        const remoteMeaningful = (remote.visitedCountries?.length ?? 0) + (remote.stars ?? 0) > 0;
        if (!localMeaningful && remoteMeaningful) replacePlayer(remote);
      }
      setSuccess(`${result.enrollment.className}에 참여했어요!`);
      window.setTimeout(onDone, 500);
    } catch { /* context displays error */ }
  };

  if (enrollment) return <section className="page class-join-page"><header className="page-header"><div><p className="eyebrow">학급 연결</p><h2>🏫 {enrollment.className}</h2></div><button className="small-button" onClick={onBack}>← 여행으로</button></header><div className="card joined-class-card"><span className="big-status">✅</span><h3>학급과 연결되어 있어요</h3><p>수업 코드 <strong>{enrollment.joinCode}</strong> · 여행자 <strong>{enrollment.nickname}</strong></p><p className="muted">여행 기록은 기기에 먼저 저장되고 인터넷이 연결되면 학급 관제센터에도 동기화됩니다.</p><button className="danger-button" onClick={async () => { await leave(); onBack(); }}>학급 연결 해제</button></div></section>;

  return <section className="page class-join-page"><header className="page-header"><div><p className="eyebrow">학생용</p><h2>🏫 우리 반 세계여행 참여</h2></div><button className="small-button" onClick={onBack}>← 돌아가기</button></header><div className="card class-code-card"><div className="class-code-visual">🌏<span>+</span>🏫</div><h3>선생님에게 받은 6자리 수업 코드를 입력하세요.</h3>{!cloudConfigured && <div className="setup-warning">현재 Supabase가 연결되지 않아 학급 참여 기능은 비활성화되어 있습니다. 개인 여행 기능은 그대로 사용할 수 있어요.</div>}<label>수업 코드<input value={code} onChange={(e) => setCode(e.target.value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, 6))} placeholder="예: ABC234" inputMode="text" autoCapitalize="characters" /></label><label>여행자 이름<input value={nickname} onChange={(e) => setLocalNickname(e.target.value.slice(0, 12))} placeholder="예: 별빛탐험가" /></label>{error && <div className="form-error">⚠️ {error}</div>}{success && <div className="form-success">🎉 {success}</div>}<button className="primary-button" disabled={!cloudConfigured || joining || code.length !== 6} onClick={submit}>{joining ? '입장 확인 중…' : '✈️ 우리 반 여행에 참여하기'}</button><small className="privacy-note">학생 이메일이나 전화번호 없이 익명 학습 계정으로 참여하도록 설계했습니다.</small></div></section>;
}
