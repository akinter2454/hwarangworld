import { useMemo, useState } from 'react';
import { countries } from '../data/countries';
import { useTravel } from '../store/TravelContext';

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (char) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;',
  }[char] ?? char));
}

function formatDate(value: string) {
  if (!value) return '';
  try {
    return new Intl.DateTimeFormat('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(value));
  } catch {
    return value.slice(0, 10);
  }
}

export function CompletionCertificate() {
  const { player, issueCertificate } = useTravel();
  const [printName, setPrintName] = useState(player.nickname || '지구별 탐험가');
  const completedIds = useMemo(() => new Set(player.visitedCountries), [player.visitedCountries]);
  const remaining = useMemo(() => countries.filter((country) => !completedIds.has(country.id)), [completedIds]);
  const complete = remaining.length === 0;
  const issued = complete && Boolean(player.certificateIssuedAt && player.certificateId);
  const issueDate = formatDate(player.certificateIssuedAt);

  const printCertificate = () => {
    if (!issued) return;
    const safeName = escapeHtml((printName.trim() || player.nickname || '지구별 탐험가').slice(0, 30));
    const safeId = escapeHtml(player.certificateId);
    const safeDate = escapeHtml(issueDate);
    const countryFlags = countries.map((country) => country.flag).join(' ');
    const learnedCount = player.learnedPhraseIds.length;
    const observationCount = Object.keys(player.photoObservations).length;
    const comparisonCount = player.photoComparisons.length;
    const popup = window.open('', '_blank', 'width=1200,height=860');
    if (!popup) {
      window.alert('인쇄 창을 열 수 없습니다. 브라우저의 팝업 차단을 해제한 뒤 다시 시도해 주세요.');
      return;
    }
    popup.document.open();
    popup.document.write(`<!doctype html><html lang="ko"><head><meta charset="utf-8"><title>다문화 세계여행 인증서 - ${safeName}</title><style>
      @page{size:A4 landscape;margin:0}
      *{box-sizing:border-box}html,body{margin:0;padding:0;background:#eef6ff;font-family:"Noto Sans KR","Malgun Gothic",Arial,sans-serif;color:#16305b}
      body{width:297mm;min-height:210mm;display:grid;place-items:center}
      .sheet{width:281mm;height:194mm;background:#fff;padding:7mm;border:2.5mm solid #173876;position:relative;overflow:hidden}
      .inner{height:100%;border:1mm solid #d5a83b;padding:8mm 12mm;text-align:center;position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center}
      .inner:before,.inner:after{content:"✦";position:absolute;color:#d5a83b;font-size:18pt}.inner:before{left:6mm;top:5mm}.inner:after{right:6mm;bottom:5mm}
      .kicker{letter-spacing:.25em;font-weight:800;color:#b18116;font-size:10pt}.title{font-family:Georgia,"Noto Serif KR",serif;font-size:30pt;margin:3mm 0 1mm;color:#173876}.subtitle{font-size:13pt;font-weight:800;margin:0 0 8mm}.name{min-width:115mm;border-bottom:.6mm solid #d5a83b;font-size:25pt;font-weight:900;padding:0 8mm 2.5mm;margin-bottom:5mm;color:#0f2654}.message{font-size:12pt;line-height:1.85;max-width:220mm;margin:0}.flags{font-size:19pt;letter-spacing:.13em;margin:5mm 0 4mm}.stats{display:flex;gap:5mm;justify-content:center;margin:2mm 0 6mm}.stat{min-width:38mm;padding:2.5mm 4mm;border-radius:4mm;background:#f3f7fd;border:.35mm solid #dbe8f8}.stat b{display:block;font-size:14pt;color:#173876}.stat span{font-size:8.5pt;color:#51657f}.footer{width:100%;display:grid;grid-template-columns:1fr 1fr 1fr;align-items:end;margin-top:3mm;font-size:9pt;color:#52647c}.footer strong{display:block;color:#173876;font-size:10pt;margin-top:1mm}.seal{width:23mm;height:23mm;border-radius:50%;border:1mm double #c28f1d;color:#b18116;display:grid;place-items:center;margin:0 auto;font-weight:900;line-height:1.15;transform:rotate(-8deg);font-size:8.5pt}.print-note{position:fixed;right:12px;top:10px;background:#111827;color:#fff;padding:8px 12px;border-radius:8px;font-size:12px}@media print{.print-note{display:none}body{background:#fff}}
    </style></head><body><div class="print-note">인쇄 창에서 ‘PDF로 저장’을 선택하세요.</div><main class="sheet"><div class="inner">
      <div class="kicker">CERTIFICATE OF COMPLETION</div>
      <h1 class="title">세계시민 탐험가 인증서</h1>
      <p class="subtitle">다함께 GO! 다문화 세계여행</p>
      <div class="name">${safeName}</div>
      <p class="message">위 여행자는 서로 다른 문화의 <b>말·음식·생활·사진 자료</b>를 존중하는 태도로 탐색하고,<br><b>${countries.length}개 기본 세계여행 국가를 모두 완료</b>하였기에 이 인증서를 수여합니다.</p>
      <div class="flags">${countryFlags}</div>
      <div class="stats"><div class="stat"><b>${countries.length}</b><span>여행 완료 국가</span></div><div class="stat"><b>${learnedCount}</b><span>배운 세계의 말</span></div><div class="stat"><b>${observationCount}</b><span>사진 관찰 기록</span></div><div class="stat"><b>${comparisonCount}</b><span>나라 비교 기록</span></div></div>
      <div class="footer"><div>인증번호<strong>${safeId}</strong></div><div><div class="seal">WORLD<br>CITIZEN<br>EXPLORER</div></div><div>발급일<strong>${safeDate}</strong></div></div>
    </div></main><script>window.addEventListener('load',()=>setTimeout(()=>window.print(),300));<\/script></body></html>`);
    popup.document.close();
  };

  if (!complete) {
    return <section className="certificate-lock card">
      <div className="certificate-lock-icon">🎓</div>
      <div className="certificate-lock-copy">
        <small>WORLD TOUR CERTIFICATE</small>
        <h3>세계시민 탐험가 인증서</h3>
        <p>기본 세계여행 {countries.length}개국을 모두 완료하면 인증서를 발급할 수 있어요.</p>
        <div className="certificate-progress"><div style={{ width: `${((countries.length - remaining.length) / countries.length) * 100}%` }} /></div>
        <strong>{countries.length - remaining.length} / {countries.length}개국 완료</strong>
        <small className="certificate-remaining">남은 여행: {remaining.map((country) => `${country.flag} ${country.name}`).join(' · ')}</small>
      </div>
    </section>;
  }

  if (!issued) {
    return <section className="certificate-unlock card">
      <div className="certificate-celebration">🎉 🌏 🎓</div>
      <p className="eyebrow">WORLD TOUR COMPLETE</p>
      <h3>세계여행 완주를 축하해요!</h3>
      <p>기본 {countries.length}개국을 모두 여행했어요. 이제 <b>세계시민 탐험가 인증서</b>를 발급할 수 있습니다.</p>
      <button className="primary-button" onClick={issueCertificate}>🎓 인증서 발급하기</button>
      <small>발급일과 고유 인증번호는 처음 발급할 때 저장되며 이후 다시 인쇄할 수 있어요.</small>
    </section>;
  }

  return <section className="certificate-issued card">
    <div className="certificate-toolbar no-print">
      <div><p className="eyebrow">CERTIFICATE ISSUED</p><h3>🎓 세계시민 탐험가 인증서</h3></div>
      <button className="primary-button" onClick={printCertificate}>🖨️ 인증서 인쇄·PDF</button>
    </div>
    <div className="certificate-name-control no-print">
      <label htmlFor="certificate-print-name">인증서에 표시할 이름</label>
      <input id="certificate-print-name" value={printName} onChange={(event) => setPrintName(event.target.value.slice(0, 30))} />
      <small>이 입력값은 인증서 출력에만 사용되고 학습 데이터에는 저장되지 않습니다.</small>
    </div>
    <div className="certificate-preview" aria-label="세계시민 탐험가 인증서 미리보기">
      <div className="certificate-preview-inner">
        <small>CERTIFICATE OF COMPLETION</small>
        <h3>세계시민 탐험가 인증서</h3>
        <div className="certificate-preview-name">{printName.trim() || player.nickname || '지구별 탐험가'}</div>
        <p>다문화 세계여행 {countries.length}개국을 모두 완료하고 다양한 문화를 존중하며 탐구했습니다.</p>
        <div className="certificate-preview-flags">{countries.map((country) => <span key={country.id}>{country.flag}</span>)}</div>
        <div className="certificate-preview-meta"><span>인증번호 <b>{player.certificateId}</b></span><span>발급일 <b>{issueDate}</b></span></div>
      </div>
    </div>
    <p className="certificate-pdf-help no-print">💡 버튼을 누른 뒤 인쇄 창에서 <b>PDF로 저장</b>을 선택하면 인증서를 PDF 파일로 보관할 수 있어요.</p>
  </section>;
}
