import { useMemo, useRef, useState } from 'react';
import { countries } from '../data/countries';
import { countryMedia } from '../data/countryMedia';
import { curatedCommonsCount } from '../data/curatedCommonsAllowlist';
import type { CountryImage } from '../types';
import {
  approveTeacherPhoto,
  candidateFileNameLooksSafe,
  exportTeacherPhotoLibrary,
  importTeacherPhotoLibrary,
  listTeacherApprovedPhotos,
  removeTeacherApprovedPhoto,
  type TeacherApprovedPhoto,
} from '../services/teacherPhotoLibrary';
import {
  commonsCandidatePhotoUrl,
  commonsSourcePage,
  inspectWikimediaCandidate,
  type WikimediaMetadata,
} from '../services/wikimedia';
import { CuratedPhoto } from './CuratedPhoto';

const categories: CountryImage['category'][] = ['풍경', '음식', '생활', '문화'];

function download(name: string, text: string) {
  const blob = new Blob([text], { type: 'application/json;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = name;
  anchor.click();
  URL.revokeObjectURL(url);
}

export function PhotoLibraryManager() {
  const [countryId, setCountryId] = useState(countries[0]?.id ?? 'korea');
  const [category, setCategory] = useState<CountryImage['category']>('문화');
  const [fileName, setFileName] = useState('');
  const [caption, setCaption] = useState('');
  const [alt, setAlt] = useState('');
  const [metadata, setMetadata] = useState<WikimediaMetadata | null>(null);
  const [checking, setChecking] = useState(false);
  const [message, setMessage] = useState('');
  const [previewFailed, setPreviewFailed] = useState(false);
  const [approved, setApproved] = useState<TeacherApprovedPhoto[]>(() => listTeacherApprovedPhotos());
  const [checks, setChecks] = useState({ relevant: false, age: false, privacy: false, stereotype: false, source: false });
  const importRef = useRef<HTMLInputElement | null>(null);

  const country = countries.find((item) => item.id === countryId) ?? countries[0];
  const builtin = useMemo(() => {
    const media = countryMedia[countryId];
    return [media?.hero, ...(media?.gallery ?? [])].filter(Boolean) as CountryImage[];
  }, [countryId]);
  const allChecked = Object.values(checks).every(Boolean);
  const candidateSafe = Boolean(fileName.trim()) && candidateFileNameLooksSafe(fileName.trim());

  const inspect = async () => {
    const clean = fileName.trim().replace(/^File:/i, '');
    if (!clean) { setMessage('Wikimedia Commons 파일명을 입력해 주세요.'); return; }
    if (!candidateFileNameLooksSafe(clean)) { setMessage('파일명에 학생용 자료로 부적절할 수 있는 표현이 있어 미리보기를 차단했습니다.'); return; }
    setChecking(true); setMessage(''); setMetadata(null); setPreviewFailed(false);
    try {
      const result = await inspectWikimediaCandidate(clean);
      setFileName(clean);
      setMetadata(result);
      setMessage('✅ 원본 파일을 찾았습니다. 사진과 출처를 직접 확인한 뒤 아래 안전 항목을 체크하세요.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : '사진 정보를 확인하지 못했습니다.');
    } finally { setChecking(false); }
  };

  const publish = () => {
    if (!metadata || !allChecked || !candidateSafe || previewFailed || !country) {
      setMessage('미리보기·출처·안전 체크를 모두 확인해야 학생용 자료로 승인할 수 있습니다.');
      return;
    }
    try {
      const item = approveTeacherPhoto({
        countryId,
        commonsFile: fileName.trim(),
        src: country.media?.gallery?.find((image) => image.category === category)?.src
          ?? country.media?.hero?.src
          ?? `${import.meta.env.BASE_URL}images/countries/${countryId}/${category === '음식' ? 'food' : category === '생활' ? 'life' : category === '문화' ? 'culture' : 'hero'}.svg`,
        alt: alt.trim() || `${country.name} ${category} 실제 자료 사진`,
        caption: caption.trim() || `${country.name}의 ${category}을(를) 살펴보는 실제 자료 사진이에요.`,
        category,
        reviewNote: '교사가 Wikimedia Commons 원본과 출처를 열어 보고, 연령 적합성·개인정보·문화 고정관념 여부를 확인한 뒤 승인한 추가 자료입니다.',
      });
      setApproved(listTeacherApprovedPhotos());
      setMessage(`✅ ${item.commonsFile} 사진을 이 기기의 학생 갤러리에 승인했습니다.`);
      setFileName(''); setCaption(''); setAlt(''); setMetadata(null); setPreviewFailed(false);
      setChecks({ relevant: false, age: false, privacy: false, stereotype: false, source: false });
    } catch (error) { setMessage(error instanceof Error ? error.message : '사진 승인 중 오류가 발생했습니다.'); }
  };

  const importFile = async (file: File) => {
    try {
      const count = importTeacherPhotoLibrary(await file.text());
      setApproved(listTeacherApprovedPhotos());
      setMessage(`✅ 검토 완료 사진 ${count}개를 가져왔습니다. 가져온 목록도 수업 전에 다시 확인해 주세요.`);
    } catch (error) { setMessage(error instanceof Error ? error.message : '사진 자료 파일을 읽지 못했습니다.'); }
    finally { if (importRef.current) importRef.current.value = ''; }
  };

  return <section className="photo-library-manager">
    <div className="card photo-library-intro">
      <div><span className="photo-library-icon">📷</span></div>
      <div><h3>학생용 사진 자료 관리실</h3><p>기본 자료는 실시간 검색이 아니라 미리 검토된 <b>{curatedCommonsCount}장</b>의 Wikimedia Commons 사진만 사용합니다. 추가 자료도 학생에게 바로 공개되지 않고 교사가 원본·출처·연령 적합성을 직접 확인해야 합니다.</p></div>
    </div>

    <div className="photo-library-layout">
      <section className="card photo-library-defaults">
        <div className="section-title-row"><div><h3>① 기본 사전 선별 사진</h3><small>12개국 × 4장 · 풍경/음식/생활/문화</small></div></div>
        <label>미리 볼 나라<select value={countryId} onChange={(e) => setCountryId(e.target.value)}>{countries.map((item) => <option key={item.id} value={item.id}>{item.flag} {item.name}</option>)}</select></label>
        <div className="teacher-photo-preview-grid">
          {builtin.map((image, index) => <div className="teacher-photo-preview-card" key={`${image.commonsFile}-${index}`}>
            <CuratedPhoto image={image} showCredit />
            <strong>{image.category}</strong><p>{image.caption}</p>
          </div>)}
        </div>
      </section>

      <section className="card photo-candidate-panel">
        <h3>② 교사가 추가 사진 검토</h3>
        <div className="teacher-safety-banner">🛡️ 학생에게 인터넷 검색창을 제공하지 않습니다. 교사가 정확한 Commons 파일명을 넣고 직접 확인한 사진만 승인할 수 있습니다.</div>
        <div className="form-grid two"><label>적용할 나라<select value={countryId} onChange={(e) => setCountryId(e.target.value)}>{countries.map((item) => <option key={item.id} value={item.id}>{item.flag} {item.name}</option>)}</select></label><label>자료 유형<select value={category} onChange={(e) => setCategory(e.target.value as CountryImage['category'])}>{categories.map((item) => <option key={item}>{item}</option>)}</select></label></div>
        <label>Wikimedia Commons 파일명<input value={fileName} onChange={(e) => { setFileName(e.target.value); setMetadata(null); setPreviewFailed(false); }} placeholder="예: Hoan Kiem Lake photo.jpg" /></label>
        <button className="small-button" disabled={checking || !fileName.trim()} onClick={() => void inspect()}>{checking ? '확인 중…' : '🔎 원본·미리보기 확인'}</button>

        {metadata && <div className="candidate-preview-box">
          <img src={commonsCandidatePhotoUrl(fileName, 1000)} alt="교사 검토용 Wikimedia Commons 후보 사진" referrerPolicy="no-referrer" onError={() => setPreviewFailed(true)} />
          {previewFailed && <div className="form-error">사진 미리보기를 불러오지 못했습니다. 학생용으로 승인하지 마세요.</div>}
          <div className="candidate-metadata"><strong>{metadata.fileName}</strong><span>저작자: {metadata.author}</span><span>라이선스: {metadata.license}</span><a href={commonsSourcePage(fileName)} target="_blank" rel="noopener noreferrer">Wikimedia Commons 원본 페이지 열기 ↗</a></div>
        </div>}
        <label>학생용 설명<input value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="사진에서 관찰할 점을 중립적으로 적어 주세요." /></label>
        <label>대체텍스트<input value={alt} onChange={(e) => setAlt(e.target.value)} placeholder="화면을 보지 못해도 이해할 수 있는 설명" /></label>

        <fieldset className="photo-safety-checklist"><legend>학생 공개 전 필수 확인</legend>
          <label><input type="checkbox" checked={checks.relevant} onChange={(e) => setChecks((v) => ({...v, relevant:e.target.checked}))} /> 수업 주제와 직접 관련된 실제 자료다.</label>
          <label><input type="checkbox" checked={checks.age} onChange={(e) => setChecks((v) => ({...v, age:e.target.checked}))} /> 폭력·성적 내용·혐오·충격적인 장면이 없고 초등학생에게 적절하다.</label>
          <label><input type="checkbox" checked={checks.privacy} onChange={(e) => setChecks((v) => ({...v, privacy:e.target.checked}))} /> 특정 아동의 민감한 근접 사진이나 사생활 침해 우려가 없다.</label>
          <label><input type="checkbox" checked={checks.stereotype} onChange={(e) => setChecks((v) => ({...v, stereotype:e.target.checked}))} /> 한 사진을 그 나라 사람 전체의 모습으로 일반화하지 않도록 설명했다.</label>
          <label><input type="checkbox" checked={checks.source} onChange={(e) => setChecks((v) => ({...v, source:e.target.checked}))} /> Commons 원본 페이지의 저작자와 라이선스를 직접 확인했다.</label>
        </fieldset>
        {message && <div className="studio-message">{message}</div>}
        <button className="primary-button wide-button" disabled={!metadata || !allChecked || previewFailed || !candidateSafe} onClick={publish}>✅ 학생용 사진으로 승인</button>
      </section>
    </div>

    <section className="card teacher-approved-library">
      <div className="table-heading"><div><h3>③ 교사 승인 추가 사진</h3><small>이 목록은 이 브라우저에 저장됩니다. 다른 기기로 옮길 때는 JSON 내보내기/가져오기를 사용하세요.</small></div><div className="library-transfer-actions"><button className="small-button" disabled={!approved.length} onClick={() => download('다문화-세계여행-승인사진.json', exportTeacherPhotoLibrary())}>⬇️ 목록 내보내기</button><button className="small-button" onClick={() => importRef.current?.click()}>⬆️ 목록 가져오기</button><input ref={importRef} type="file" accept="application/json,.json" hidden onChange={(e) => { const file=e.target.files?.[0]; if (file) void importFile(file); }} /></div></div>
      {!approved.length ? <div className="empty-studio">추가 승인한 사진이 없습니다. 기본 48장만 학생에게 표시됩니다.</div> : <div className="approved-photo-list">{approved.map((item) => <div className="approved-photo-row" key={item.id}><div><strong>{countries.find((c)=>c.id===item.countryId)?.flag} {countries.find((c)=>c.id===item.countryId)?.name} · {item.category}</strong><span>{item.commonsFile}</span><small>{item.caption}</small></div><div><a className="small-button link-button" href={commonsSourcePage(item.commonsFile)} target="_blank" rel="noopener noreferrer">원본</a><button className="small-button danger-button" onClick={() => { removeTeacherApprovedPhoto(item.id); setApproved(listTeacherApprovedPhotos()); }}>삭제</button></div></div>)}</div>}
    </section>
  </section>;
}
