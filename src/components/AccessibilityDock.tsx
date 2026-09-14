import { useState } from 'react';
import { guideLanguageNames, quickGuide, useDisplay, type GuideLanguage } from '../store/DisplayContext';

export function AccessibilityDock() {
  const { easyKorean, setEasyKorean, guideLanguage, setGuideLanguage } = useDisplay();
  const [open, setOpen] = useState(false);
  const guide = quickGuide[guideLanguage];

  return <>
    <div className="accessibility-dock" aria-label="읽기 도움">
      <button onClick={() => setEasyKorean(!easyKorean)} className={easyKorean ? 'active' : ''}>가<small>{easyKorean ? '쉬운말 ON' : '쉬운말'}</small></button>
      <button onClick={() => setOpen(true)}>🌐<small>언어 안내</small></button>
    </div>
    {open && <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="다국어 빠른 안내">
      <section className="card guide-modal">
        <div className="modal-heading"><div><small>다문화 학습 접근성</small><h3>🌐 {guide.title}</h3></div><button className="icon-button" onClick={() => setOpen(false)} aria-label="닫기">×</button></div>
        <label className="guide-language-select">안내 언어<select value={guideLanguage} onChange={(e) => setGuideLanguage(e.target.value as GuideLanguage)}>{Object.entries(guideLanguageNames).map(([id,name]) => <option value={id} key={id}>{name}</option>)}</select></label>
        <p className="guide-intro">{guide.intro}</p>
        <div className="guide-list"><span>🌏 {guide.travel}</span><span>🛂 {guide.passport}</span><span>🎒 {guide.bag}</span><span>📖 {guide.journal}</span><span>🏆 {guide.badge}</span><span>🏫 {guide.class}</span></div>
        <div className="guide-note">교육 내용 자체는 번역 오류를 줄이기 위해 기본 한국어를 유지하고, 메뉴 이용 방법을 여러 언어로 안내합니다.</div>
      </section>
    </div>}
  </>;
}
