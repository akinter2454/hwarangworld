import { useEffect, useRef, useState } from 'react';
import { syncStudentProgress } from '../services/supabase';
import { useClassroom } from '../store/ClassroomContext';
import { useTravel } from '../store/TravelContext';

export function ProgressSync() {
  const { player } = useTravel();
  const { enrollment, cloudConfigured } = useClassroom();
  const [state, setState] = useState<'idle' | 'syncing' | 'ok' | 'error'>('idle');
  const timer = useRef<number | null>(null);

  useEffect(() => {
    if (!cloudConfigured || !enrollment) { setState('idle'); return; }
    if (timer.current) window.clearTimeout(timer.current);
    setState('syncing');
    timer.current = window.setTimeout(async () => {
      try { await syncStudentProgress(enrollment, player); setState('ok'); }
      catch { setState('error'); }
    }, 900);
    return () => { if (timer.current) window.clearTimeout(timer.current); };
  }, [cloudConfigured, enrollment, player]);

  if (!enrollment) return null;
  return <div className={`sync-indicator ${state}`} title="학급 서버 동기화 상태">{state === 'syncing' ? '☁️ 저장 중' : state === 'ok' ? '☁️ 학급 저장됨' : state === 'error' ? '⚠️ 로컬 저장됨' : '💾 기기 저장'}</div>;
}
