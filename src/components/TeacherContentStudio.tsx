import { useEffect, useRef, useState } from 'react';
import { generateSmartQuiz, type SmartQuizDifficulty } from '../services/smartQuiz';
import { deleteTeacherCountry, listTeacherCountries, saveTeacherCountry } from '../services/supabase';
import type { Country, LanguagePhrase, PhraseCategory, QuizQuestion, TeacherCountryRecord } from '../types';

const emptyQuestions: QuizQuestion[] = [0, 1, 2].map((index) => ({
  id: `draft-${index + 1}`,
  question: '',
  options: ['', '', '', ''],
  answer: 0,
  explanation: '',
}));

function makeCountry(input: {
  id: string; name: string; englishName: string; flag: string; region: string; intro: string;
  greeting: string; greetingMeaning: string; language: string; food: string; foodDescription: string;
  culture: string; cultureDescription: string; dailyLife: string; comparePrompt: string; quiz: QuizQuestion[]; phrasesText: string; heroImage: string;
}): Country {
  const allowedCategories: PhraseCategory[] = ['인사', '예절', '학교', '일상'];
  const extraPhrases: LanguagePhrase[] = input.phrasesText.split('\n').map((line) => line.trim()).filter(Boolean).map((line) => {
    const [text, meaning, rawCategory, romanization] = line.split('|').map((part) => part?.trim() ?? '');
    const category = allowedCategories.includes(rawCategory as PhraseCategory) ? rawCategory as PhraseCategory : '일상';
    return { text, meaning: meaning || '뜻을 입력해 주세요.', lang: input.language.trim() || 'ko-KR', category, romanization: romanization || undefined, icon: category === '학교' ? '🏫' : category === '예절' ? '🙏' : category === '인사' ? '👋' : '💬' };
  }).filter((phrase) => phrase.text);
  return {
    id: input.id,
    name: input.name.trim(),
    englishName: input.englishName.trim() || input.name.trim(),
    flag: input.flag.trim() || '🌏',
    region: input.region.trim() || '교사 제작',
    colorClass: 'teal',
    intro: input.intro.trim(),
    greeting: { text: input.greeting.trim(), meaning: input.greetingMeaning.trim(), lang: input.language.trim() || 'ko-KR' },
    phrases: [{ text: input.greeting.trim(), meaning: input.greetingMeaning.trim(), lang: input.language.trim() || 'ko-KR', category: '인사', icon: '👋' }, ...extraPhrases],
    foods: [{ name: input.food.trim() || '대표 음식 알아보기', description: input.foodDescription.trim(), emoji: '🍽️' }],
    dailyLife: input.dailyLife.split('\n').map((item) => item.trim()).filter(Boolean).slice(0, 5),
    culture: [{ title: input.culture.trim() || '문화 알아보기', description: input.cultureDescription.trim(), emoji: '🎵' }],
    comparePrompt: input.comparePrompt.trim(),
    collectible: { id: `${input.id}-souvenir`, name: `${input.name.trim()} 여행 카드`, emoji: input.flag.trim() || '🌏' },
    quiz: input.quiz.map((q, index) => ({ ...q, id: `${input.id}-q${index + 1}`, options: q.options.slice(0, 4) })),
    media: input.heroImage ? { hero: { src: input.heroImage, alt: `${input.name.trim()} 여행 대표 이미지`, caption: '선생님이 추가한 여행 탐험 이미지예요.', category: '풍경' }, gallery: [] } : undefined,
    custom: true,
  };
}

export function TeacherContentStudio() {
  const [records, setRecords] = useState<TeacherCountryRecord[]>([]);
  const importRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [name, setName] = useState(''); const [englishName, setEnglishName] = useState(''); const [flag, setFlag] = useState('🌏'); const [region, setRegion] = useState('아시아');
  const [intro, setIntro] = useState(''); const [greeting, setGreeting] = useState(''); const [greetingMeaning, setGreetingMeaning] = useState('안녕하세요'); const [language, setLanguage] = useState('ko-KR');
  const [food, setFood] = useState(''); const [foodDescription, setFoodDescription] = useState(''); const [culture, setCulture] = useState(''); const [cultureDescription, setCultureDescription] = useState('');
  const [phrasesText, setPhrasesText] = useState('고맙습니다|고맙다는 뜻의 표현|예절|\n또 만나요|헤어질 때 쓰는 표현|인사|');
  const [heroImage, setHeroImage] = useState('');
  const [dailyLife, setDailyLife] = useState('학교에서 친구들과 함께 공부해요.\n가정과 지역에 따라 생활 모습이 다를 수 있어요.');
  const [comparePrompt, setComparePrompt] = useState('우리의 생활과 비슷한 점과 다른 점을 함께 찾아보세요.');
  const [quiz, setQuiz] = useState<QuizQuestion[]>(emptyQuestions);
  const [difficulty, setDifficulty] = useState<SmartQuizDifficulty>('standard');
  const [questionCount, setQuestionCount] = useState(4);

  const load = async () => { try { setRecords(await listTeacherCountries()); } catch (e) { setMessage(e instanceof Error ? e.message : '콘텐츠를 불러오지 못했습니다.'); } };
  useEffect(() => { void load(); }, []);
  const smartDraft = () => {
    if (!name.trim()) { setMessage('나라 또는 문화권 이름을 먼저 입력해 주세요.'); return; }
    const result = generateSmartQuiz({
      countryName: name,
      greeting,
      greetingMeaning,
      food,
      foodDescription,
      culture,
      cultureDescription,
      dailyLife: dailyLife.split('\n'),
      comparePrompt,
      difficulty,
      count: questionCount,
    });
    setQuiz(result.questions);
    setMessage(result.message);
  };

  const exportLibrary = () => {
    const payload = JSON.stringify({ version: 1, exportedAt: new Date().toISOString(), countries: records.map((record) => record.country_data) }, null, 2);
    const blob = new Blob([payload], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url; anchor.download = '다문화-세계여행-교사콘텐츠.json'; anchor.click(); URL.revokeObjectURL(url);
  };

  const importLibrary = async (file: File) => {
    setBusy(true); setMessage('');
    try {
      const parsed = JSON.parse(await file.text()) as { countries?: Country[] } | Country[];
      const items = Array.isArray(parsed) ? parsed : parsed.countries;
      if (!Array.isArray(items) || !items.length) throw new Error('가져올 여행지 데이터가 없습니다.');
      for (const item of items.slice(0, 50)) {
        if (!item?.name || !Array.isArray(item.quiz)) continue;
        await saveTeacherCountry({ ...item, id: `custom-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, custom: true });
      }
      await load();
      setMessage(`✅ ${items.length}개 이하의 여행지 데이터를 가져왔습니다. 내용을 확인해 주세요.`);
    } catch (e) { setMessage(e instanceof Error ? e.message : '콘텐츠 파일을 읽지 못했습니다.'); }
    finally { setBusy(false); if (importRef.current) importRef.current.value = ''; }
  };

  const updateQuestion = (index: number, patch: Partial<QuizQuestion>) => setQuiz((prev) => prev.map((q, i) => i === index ? { ...q, ...patch } : q));
  const updateOption = (qIndex: number, optionIndex: number, value: string) => setQuiz((prev) => prev.map((q, i) => i === qIndex ? { ...q, options: q.options.map((o, oi) => oi === optionIndex ? value : o) } : q));

  const save = async () => {
    if (!name.trim() || !intro.trim() || !greeting.trim() || quiz.some((q) => !q.question.trim() || q.options.some((o) => !o.trim()))) {
      setMessage('나라 이름·소개·인사말과 퀴즈 3문항을 모두 확인해 주세요.'); return;
    }
    setBusy(true); setMessage('');
    try {
      const id = `custom-${Date.now()}`;
      const country = makeCountry({ id, name, englishName, flag, region, intro, greeting, greetingMeaning, language, food, foodDescription, culture, cultureDescription, dailyLife, comparePrompt, quiz, phrasesText, heroImage });
      await saveTeacherCountry(country);
      setMessage('✅ 새 여행지를 저장했습니다. 학급 화면에서 학생에게 배포할 수 있습니다.');
      setName(''); setEnglishName(''); setIntro(''); setGreeting(''); setFood(''); setFoodDescription(''); setCulture(''); setCultureDescription(''); setPhrasesText(''); setHeroImage(''); setQuiz(emptyQuestions.map((q) => ({ ...q, options: [...q.options] })));
      await load();
    } catch (e) { setMessage(e instanceof Error ? e.message : '저장 중 오류가 발생했습니다.'); }
    finally { setBusy(false); }
  };

  return <section className="content-studio">
    <div className="studio-intro card"><span>🧭</span><div><h3>여행 콘텐츠 제작기</h3><div className="offline-engine-banner">💡 무료 로컬 엔진 · Gemini/OpenAI API 키 불필요 · 문항 생성 비용 0원</div><p>나라를 한 가지 모습으로 단정하지 않고, 학생이 공통점과 차이를 탐색하도록 콘텐츠를 만드세요. 문항은 브라우저 안에서 무료로 자동 생성되며 외부 AI나 API 키를 사용하지 않습니다. 최종 확인은 교사가 합니다.</p></div></div>
    <div className="studio-layout">
      <section className="card studio-form">
        <h3>① 새 여행지 만들기</h3>
        <div className="form-grid two"><label>나라·문화권 이름<input value={name} onChange={(e)=>setName(e.target.value)} placeholder="예: 브라질" /></label><label>영문 이름<input value={englishName} onChange={(e)=>setEnglishName(e.target.value)} placeholder="Brazil" /></label><label>표시 아이콘/국기<input value={flag} onChange={(e)=>setFlag(e.target.value)} /></label><label>지역<input value={region} onChange={(e)=>setRegion(e.target.value)} placeholder="남아메리카" /></label></div>
        <label>학생용 소개<textarea value={intro} onChange={(e)=>setIntro(e.target.value)} placeholder="지역과 사람에 따라 생활 모습이 다양하다는 점을 포함해 짧게 소개하세요." /></label>
        <div className="form-grid two"><label>인사말<input value={greeting} onChange={(e)=>setGreeting(e.target.value)} /></label><label>뜻<input value={greetingMeaning} onChange={(e)=>setGreetingMeaning(e.target.value)} /></label><label>음성 언어 코드<input value={language} onChange={(e)=>setLanguage(e.target.value)} placeholder="pt-BR" /></label><label>대표 음식 예시<input value={food} onChange={(e)=>setFood(e.target.value)} /></label></div>
        <label>추가 말 배우기 · 한 줄에 <b>표현|뜻|분류|읽는 법</b><textarea value={phrasesText} onChange={(e)=>setPhrasesText(e.target.value)} placeholder={'Cảm ơn|고맙습니다|예절|깜 언\nBạn|친구|학교|반'} /></label>
        <label>대표 이미지 파일 · 600KB 이하 권장<input type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml" onChange={(e)=>{const file=e.target.files?.[0];if(!file)return;if(file.size>650000){setMessage('이미지는 600KB 정도 이하로 줄여 주세요.');return;}const reader=new FileReader();reader.onload=()=>setHeroImage(String(reader.result??''));reader.readAsDataURL(file);}} /></label>
        {heroImage && <div className="studio-image-preview"><img src={heroImage} alt="추가한 대표 이미지 미리보기" /><button className="small-button" onClick={()=>setHeroImage('')}>이미지 제거</button></div>}
        <label>음식 설명<textarea value={foodDescription} onChange={(e)=>setFoodDescription(e.target.value)} /></label>
        <div className="form-grid two"><label>문화 탐구 제목<input value={culture} onChange={(e)=>setCulture(e.target.value)} /></label><label>문화 설명<input value={cultureDescription} onChange={(e)=>setCultureDescription(e.target.value)} /></label></div>
        <label>생활 모습 · 한 줄에 하나<textarea value={dailyLife} onChange={(e)=>setDailyLife(e.target.value)} /></label>
        <label>비교·성찰 질문<textarea value={comparePrompt} onChange={(e)=>setComparePrompt(e.target.value)} /></label>
        <div className="quiz-draft-heading"><div><h3>② 도전 퀴즈</h3><small>외부 AI/API 없이 입력한 문화 정보를 조합해 문항 초안을 만듭니다.</small></div><div className="smart-generator-controls"><select value={difficulty} onChange={(e)=>setDifficulty(e.target.value as SmartQuizDifficulty)} aria-label="문항 난이도"><option value="easy">쉬움</option><option value="standard">보통</option><option value="challenge">도전</option></select><select value={questionCount} onChange={(e)=>setQuestionCount(Number(e.target.value))} aria-label="문항 수"><option value={3}>3문항</option><option value={4}>4문항</option><option value={5}>5문항</option></select><button className="small-button" disabled={!name.trim()} onClick={smartDraft}>⚙️ 무료 자동 문항 만들기</button></div></div>
        <div className="quiz-editor-list">{quiz.map((q, qi)=><div className="quiz-editor" key={qi}><label>문제 {qi+1}<input value={q.question} onChange={(e)=>updateQuestion(qi,{question:e.target.value})} /></label><div className="option-editor-grid">{q.options.map((option, oi)=><label key={oi}>{oi+1}번<input value={option} onChange={(e)=>updateOption(qi,oi,e.target.value)} /></label>)}</div><div className="form-grid two"><label>정답<select value={q.answer} onChange={(e)=>updateQuestion(qi,{answer:Number(e.target.value)})}>{q.options.map((_,oi)=><option key={oi} value={oi}>{oi+1}번</option>)}</select></label><label>해설<input value={q.explanation} onChange={(e)=>updateQuestion(qi,{explanation:e.target.value})} /></label></div></div>)}</div>
        {message&&<div className="studio-message">{message}</div>}
        <button className="primary-button wide-button" disabled={busy} onClick={()=>void save()}>{busy?'처리 중…':'💾 여행지 저장'}</button>
      </section>
      <aside className="card studio-library"><h3>내 여행지 보관함</h3><small>{records.length}개 · JSON 파일로 백업하거나 다른 기기로 옮길 수 있어요.</small><div className="library-transfer-actions"><button className="small-button" disabled={!records.length} onClick={exportLibrary}>⬇️ 콘텐츠 내보내기</button><button className="small-button" onClick={()=>importRef.current?.click()}>⬆️ 콘텐츠 가져오기</button><input ref={importRef} type="file" accept="application/json,.json" hidden onChange={(e)=>{const file=e.target.files?.[0];if(file)void importLibrary(file);}} /></div>{!records.length?<div className="empty-studio">아직 만든 여행지가 없습니다.</div>:<div className="studio-record-list">{records.map((record)=><div className="studio-record" key={record.id}><span>{record.country_data.flag || '🌏'}</span><div><strong>{record.name}</strong><small>{record.country_data.region} · 퀴즈 {record.country_data.quiz?.length ?? 0}문항</small></div><button aria-label={`${record.name} 삭제`} onClick={async()=>{if(!window.confirm(`${record.name} 여행지를 삭제할까요? 배포된 미션도 함께 사라질 수 있습니다.`))return; await deleteTeacherCountry(record.id); await load();}}>×</button></div>)}</div>}</aside>
    </div>
  </section>;
}
