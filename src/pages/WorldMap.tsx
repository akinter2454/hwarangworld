import { useMemo, useState } from 'react';
import { countries, countryById } from '../data/countries';
import { FlightTransition } from '../components/FlightTransition';
import { useTravel } from '../store/TravelContext';
import { useClassroom } from '../store/ClassroomContext';

const mapPoints: Record<string, { left: string; top: string }> = {
  korea: { left: '80%', top: '36%' },
  china: { left: '73%', top: '38%' },
  mongolia: { left: '69%', top: '29%' },
  vietnam: { left: '75%', top: '52%' },
  philippines: { left: '84%', top: '53%' },
  thailand: { left: '71%', top: '54%' },
  uzbekistan: { left: '59%', top: '36%' },
  india: { left: '65%', top: '50%' },
  japan: { left: '87%', top: '37%' },
  brazil: { left: '27%', top: '68%' },
  egypt: { left: '52%', top: '45%' },
  france: { left: '47%', top: '30%' },
};

export function WorldMap({ onSelect, onOpenTeacher, onJoinClass }: { onSelect: (countryId: string) => void; onOpenTeacher: () => void; onJoinClass: () => void }) {
  const { player } = useTravel();
  const { enrollment, learningPlan, customCountries, planLoading, refreshLearningPlan } = useClassroom();
  const [region, setRegion] = useState('전체');
  const [flyingTo, setFlyingTo] = useState<string | null>(null);
  const allCountries = useMemo(() => [...countries, ...customCountries.filter((custom) => !countries.some((builtIn) => builtIn.id === custom.id))], [customCountries]);
  const completed = allCountries.filter((country) => player.visitedCountries.includes(country.id)).length;

  const regions = useMemo(() => ['전체', ...new Set(allCountries.map((country) => country.region))], [allCountries]);
  const filtered = region === '전체' ? allCountries : allCountries.filter((country) => country.region === region);
  const flyingCountry = flyingTo ? (countryById(flyingTo) ?? customCountries.find((item) => item.id === flyingTo)) : undefined;
  const recommended = useMemo(() => {
    if (!learningPlan.length) return null;
    const unfinished = learningPlan.filter((assignment) => !player.visitedCountries.includes(assignment.countryId));
    if (!unfinished.length) return learningPlan[0];
    const weak = unfinished.map((assignment) => {
      const country = countryById(assignment.countryId) ?? assignment.customCountry;
      const best = player.quizBestScores[assignment.countryId] ?? 0;
      const ratio = country?.quiz.length ? best / country.quiz.length : 0;
      return { assignment, ratio };
    }).sort((a,b) => a.ratio - b.ratio || b.assignment.priority - a.assignment.priority);
    return weak[0]?.assignment ?? unfinished[0];
  }, [learningPlan, player.visitedCountries, player.quizBestScores]);

  const startFlight = (countryId: string) => {
    setFlyingTo(countryId);
    window.setTimeout(() => {
      setFlyingTo(null);
      onSelect(countryId);
    }, 1350);
  };

  return (
    <section className="page">
      {flyingCountry && <FlightTransition country={flyingCountry} />}
      <header className="page-header">
        <div>
          <p className="eyebrow">{player.nickname || '지구별 탐험가'}의 여행</p>
          <h2>🌎 어디로 떠날까요?</h2>
        </div>
        <div className="header-actions">
          <button className={`class-shortcut ${enrollment ? 'connected' : ''}`} onClick={onJoinClass}>{enrollment ? `🏫 ${enrollment.className}` : '🏫 학급 참여'}</button>
          <button className="teacher-shortcut" onClick={onOpenTeacher}>🧑‍🏫 관제센터</button>
          <div className="star-pill">⭐ {player.stars}</div>
        </div>
      </header>

      <div className="map-hero card">
        <div className="map-globe">🌍</div>
        <div>
          <strong>{completed} / {allCountries.length}개 나라 여행 완료</strong>
          <div className="progress"><div style={{ width: `${allCountries.length ? (completed / allCountries.length) * 100 : 0}%` }} /></div>
          <small>지도에서 핀을 누르면 비행기를 타고 여행을 시작해요.</small>
        </div>
      </div>


      {enrollment && (
        <section className="recommended-mission card">
          <div className="recommended-icon">🎯</div>
          <div className="recommended-copy">
            <small>{enrollment.className} · 오늘의 추천 여행{recommended ? ` · ${recommended.targetLabel}` : ''}</small>
            {planLoading ? <strong>선생님 미션을 불러오는 중…</strong> : recommended ? <>
              <strong>{recommended.title}</strong>
              <p>{recommended.teacherNote || '여행을 마치고 새롭게 알게 된 점을 찾아보세요.'}</p>
            </> : <>
              <strong>아직 배포된 미션이 없어요.</strong>
              <p>자유롭게 세계여행을 탐험하거나 선생님이 미션을 배포할 때까지 기다려 주세요.</p>
            </>}
          </div>
          <div className="recommended-actions">
            {recommended && <button className="primary-button" onClick={() => startFlight(recommended.countryId)}>바로 출발 ✈️</button>}
            <button className="small-button" onClick={() => void refreshLearningPlan()}>↻ 미션 새로고침</button>
          </div>
        </section>
      )}

      <div className="world-map-card card" aria-label="다문화 세계여행 지도">
        <div className="map-title-row">
          <div><strong>학습용 세계지도</strong><small>나라의 위치는 학습 편의를 위해 단순화했어요.</small></div>
          <span>✈️ 출발지: 대한민국</span>
        </div>
        <div className="world-map-stage">
          <svg className="continent-map" viewBox="0 0 1000 520" role="img" aria-label="단순화된 세계지도">
            <path d="M65 115 L130 70 L220 78 L265 115 L250 165 L205 190 L175 245 L115 230 L88 180 Z" />
            <path d="M225 270 L275 300 L295 380 L260 470 L220 415 L205 335 Z" />
            <path d="M410 115 L455 92 L500 105 L520 145 L495 170 L450 162 Z" />
            <path d="M470 190 L535 180 L575 220 L555 310 L520 385 L475 340 L455 260 Z" />
            <path d="M520 105 L620 75 L730 88 L815 125 L900 150 L930 205 L860 245 L810 220 L755 270 L700 240 L655 200 L590 190 L540 155 Z" />
            <path d="M810 330 L865 320 L915 350 L900 400 L845 410 L805 375 Z" />
          </svg>

          {countries.map((country) => {
            const point = mapPoints[country.id];
            if (!point) return null;
            const visited = player.visitedCountries.includes(country.id);
            return (
              <button
                key={country.id}
                className={`map-pin ${visited ? 'visited' : ''}`}
                style={point}
                onClick={() => startFlight(country.id)}
                aria-label={`${country.name} ${visited ? '여행 완료' : '여행하기'}`}
              >
                <span>{country.flag}</span>
                <b>{country.name}</b>
                {visited && <i>✓</i>}
              </button>
            );
          })}
        </div>
      </div>

      <div className="region-filter" aria-label="지역 필터">
        {regions.map((item) => <button key={item} className={region === item ? 'active' : ''} onClick={() => setRegion(item)}>{item}</button>)}
      </div>

      <div className="region-grid">
        {filtered.map((country) => {
          const visited = player.visitedCountries.includes(country.id);
          const gameCount = [`${country.id}-language-game`, `${country.id}-culture-detective`]
            .filter((id) => player.activityCompletions.includes(id)).length;
          return (
            <button key={country.id} className={`country-card ${country.colorClass}`} onClick={() => startFlight(country.id)}>
              <span className="country-flag">{country.flag}</span>
              <span className="country-region">{country.region}{country.custom ? ' · 선생님 제작' : ''}</span>
              <strong>{country.name}</strong>
              <small>{visited ? `✅ 여행 완료 · 게임 ${gameCount}/2` : `✈️ 여행하기 · 게임 ${gameCount}/2`}</small>
            </button>
          );
        })}
      </div>
    </section>
  );
}
