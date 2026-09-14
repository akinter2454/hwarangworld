import type { Country } from '../types';

function esc(text: string) { return text.replace(/[&<>"']/g, (c) => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;' }[c] ?? c)); }

export function WorksheetButton({ country }: { country: Country }) {
  const print = () => {
    const w = window.open('', '_blank');
    if (!w) { window.alert('인쇄 창이 차단되었습니다. 브라우저의 팝업 허용 후 다시 눌러 주세요.'); return; }
    const quiz = country.quiz.slice(0, 3).map((q, i) => `<section><b>${i+1}. ${esc(q.question)}</b>${q.options.map((o,j)=>`<p>□ ${j+1}. ${esc(o)}</p>`).join('')}</section>`).join('');
    w.document.write(`<!doctype html><html lang="ko"><head><meta charset="utf-8"><title>${esc(country.name)} 세계여행 활동지</title><style>body{font-family:Arial,'Noto Sans KR',sans-serif;max-width:800px;margin:28px auto;padding:0 24px;color:#111;line-height:1.6}h1{font-size:26px;border-bottom:3px solid #111;padding-bottom:10px}.meta{display:flex;gap:30px;margin:12px 0 28px}.box{border:1.5px solid #333;border-radius:10px;padding:14px;margin:14px 0}.line{border-bottom:1px solid #777;height:30px;margin-top:8px}section{margin:22px 0;break-inside:avoid}p{margin:5px 0}@media print{button{display:none}body{margin:0;max-width:none}}</style></head><body><h1>${country.flag} ${esc(country.name)} 다문화 세계여행 활동지</h1><div class="meta"><span>학년·반: __________</span><span>이름: __________</span></div><div class="box"><b>1. 인사말</b><p>${esc(country.greeting.text)} = ${esc(country.greeting.meaning)}</p><div class="line"></div></div><div class="box"><b>2. 우리 생활과 비슷한 점을 찾아보세요.</b><p>${esc(country.comparePrompt)}</p><div class="line"></div><div class="line"></div></div><div class="box"><b>3. 새롭게 알게 된 문화 또는 음식 한 가지</b><div class="line"></div><div class="line"></div></div><h2>🧠 확인 퀴즈</h2>${quiz}<div class="box"><b>4. 존중하며 함께 지내기 위해 내가 할 수 있는 일</b><div class="line"></div><div class="line"></div></div><button onclick="window.print()">인쇄 / PDF 저장</button><script>setTimeout(()=>window.print(),300);</script></body></html>`);
    w.document.close();
  };
  return <button className="small-button worksheet-button" onClick={print}>🖨 활동지</button>;
}
