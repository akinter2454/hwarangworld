import { useEffect, useMemo, useState } from 'react';
import { useClassroom } from '../store/ClassroomContext';
import { APP_VERSION, clearErrorLogs, installGlobalErrorCapture, loadChecklist, readErrorLogs, runDiagnostics, saveChecklist, testChecklistItems, type DiagnosticResult, type ErrorLog } from '../services/diagnostics';
import { getAppBasePath, getHostingLabel } from '../services/deployment';

function copyText(text: string) {
  if (navigator.clipboard?.writeText) return navigator.clipboard.writeText(text);
  const area = document.createElement('textarea'); area.value = text; area.style.position = 'fixed'; area.style.opacity = '0'; document.body.appendChild(area); area.select(); document.execCommand('copy'); area.remove(); return Promise.resolve();
}

export function DiagnosticsCenter() {
  const { cloudConfigured, enrollment } = useClassroom();
  const [open, setOpen] = useState(false);
  const [results, setResults] = useState<DiagnosticResult[]>([]);
  const [logs, setLogs] = useState<ErrorLog[]>(readErrorLogs);
  const [checks, setChecks] = useState<boolean[]>(loadChecklist);
  const [copied, setCopied] = useState(false);

  useEffect(() => installGlobalErrorCapture(), []);
  useEffect(() => { const refresh = () => setLogs(readErrorLogs()); window.addEventListener('multicultural-world-tour-error-log', refresh); return () => window.removeEventListener('multicultural-world-tour-error-log', refresh); }, []);
  useEffect(() => { if (open) setResults(runDiagnostics(cloudConfigured, Boolean(enrollment))); }, [open, cloudConfigured, enrollment]);
  const summary = useMemo(() => results.length ? `${results.filter((r)=>r.ok).length}/${results.length} 정상` : '점검 전', [results]);

  const report = () => {
    const lines = [
      `다문화 세계여행 v${APP_VERSION} 진단`,
      `시간: ${new Date().toLocaleString('ko-KR')}`,
      `주소: ${window.location.href}`,
      `호스팅: ${getHostingLabel()}`,
      `앱 base: ${getAppBasePath()}`, 
      `브라우저: ${navigator.userAgent}`,
      `화면: ${window.innerWidth}x${window.innerHeight}`,
      `네트워크: ${navigator.onLine ? '온라인' : '오프라인'}`,
      `학급 클라우드: ${cloudConfigured ? '설정됨' : '무료 로컬 모드'}`,
      `학생 학급 연결: ${enrollment ? `${enrollment.className} / ${enrollment.joinCode}` : '없음'}`,
      '', '자동 진단:',
      ...results.map((r) => `- ${r.ok ? 'OK' : 'CHECK'} ${r.label}: ${r.detail}`),
      '', '최근 오류:',
      ...(logs.length ? logs.map((log) => `- ${log.time} ${log.message} ${log.source ?? ''}`) : ['- 기록된 오류 없음']),
      '', '수동 체크:',
      ...testChecklistItems.map((item, i) => `- ${checks[i] ? '[x]' : '[ ]'} ${item}`),
    ];
    return lines.join('\n');
  };

  return <>
    <button className="diagnostic-fab" onClick={() => setOpen(true)} aria-label="테스트 및 오류 진단">🛠<span>확인</span></button>
    {open && <div className="modal-backdrop diagnostics-backdrop" role="dialog" aria-modal="true" aria-label="중간 확인 진단센터"><section className="card diagnostics-modal">
      <div className="modal-heading"><div><small>GitHub Pages 주소에서 설치 없이 확인</small><h3>🛠 v{APP_VERSION} 중간 확인센터</h3></div><button className="icon-button" onClick={() => setOpen(false)} aria-label="닫기">×</button></div>
      <div className="diagnostic-summary"><span className="version-chip">VERSION {APP_VERSION}</span><strong>{summary}</strong><button className="small-button" onClick={()=>setResults(runDiagnostics(cloudConfigured, Boolean(enrollment)))}>자동 진단 다시 실행</button></div>
      <section className="diagnostic-section"><h4>① 자동 진단</h4><div className="diagnostic-list">{results.map((r)=><div key={r.id} className={`diagnostic-row ${r.ok?'ok':'warn'}`}><span>{r.ok?'✅':'⚠️'}</span><div><strong>{r.label}</strong><small>{r.detail}</small></div></div>)}</div></section>
      <section className="diagnostic-section"><h4>② 직접 눌러보는 체크리스트</h4><div className="checklist-list">{testChecklistItems.map((item,i)=><label key={item}><input type="checkbox" checked={checks[i]} onChange={(e)=>{const next=[...checks];next[i]=e.target.checked;setChecks(next);saveChecklist(next);}}/><span>{item}</span></label>)}</div></section>
      <section className="diagnostic-section"><div className="diagnostic-section-heading"><h4>③ 최근 오류 기록</h4><button className="text-button" onClick={()=>{clearErrorLogs();setLogs([]);}}>기록 지우기</button></div>{logs.length?<div className="error-log-list">{logs.slice(0,5).map((log)=><div key={`${log.time}-${log.message}`}><strong>{new Date(log.time).toLocaleTimeString('ko-KR')}</strong><span>{log.message}</span></div>)}</div>:<p className="diagnostic-empty">현재 기록된 브라우저 오류가 없습니다.</p>}</section>
      <button className="primary-button diagnostic-copy" onClick={async()=>{await copyText(report());setCopied(true);setTimeout(()=>setCopied(false),1800);}}>{copied?'✅ 복사됨 · 이 채팅에 붙여넣으세요':'📋 진단정보 복사'}</button>
      <p className="privacy-note">복사 내용에는 비밀번호나 API 키를 넣지 않습니다. 브라우저 상태와 오류 메시지, 체크 결과만 포함합니다.</p>
    </section></div>}
  </>;
}
