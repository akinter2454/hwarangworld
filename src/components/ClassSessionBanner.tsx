import { useClassroom } from '../store/ClassroomContext';

export function ClassSessionBanner() {
  const { enrollment, session } = useClassroom();
  if (!enrollment || !session) return null;
  const info = session.status === 'live'
    ? { icon: '🟢', title: '수업 진행 중', cls: 'live' }
    : session.status === 'ended'
      ? { icon: '🌙', title: '오늘 수업이 끝났어요', cls: 'ended' }
      : { icon: '🟡', title: '선생님이 수업을 준비하고 있어요', cls: 'ready' };
  return <div className={`class-session-banner ${info.cls}`}><span>{info.icon}</span><div><small>{enrollment.className}</small><strong>{info.title}</strong>{session.message && <p>{session.message}</p>}</div></div>;
}
