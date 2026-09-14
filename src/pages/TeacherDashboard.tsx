import { countries } from '../data/countries';
import { useTravel } from '../store/TravelContext';
import { FreeClassAnalysis } from '../components/FreeClassAnalysis';

function downloadFile(filename: string, content: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

export function TeacherDashboard({ embedded = false }: { embedded?: boolean }) {
  const { player } = useTravel();
  const completed = player.visitedCountries.length;
  const totalAttempts = Object.values(player.quizAttempts).reduce((sum, value) => sum + value, 0);
  const quizCountries = Object.keys(player.quizBestScores);
  const avgScore = quizCountries.length
    ? Math.round(quizCountries.reduce((sum, id) => {
      const country = countries.find((item) => item.id === id);
      if (!country) return sum;
      return sum + ((player.quizBestScores[id] ?? 0) / country.quiz.length) * 100;
    }, 0) / quizCountries.length)
    : 0;

  const exportJson = () => {
    downloadFile(`world-tour-${player.nickname || 'student'}.json`, JSON.stringify(player, null, 2), 'application/json;charset=utf-8');
  };

  const exportCsv = () => {
    const rows = [['국가', '여행완료', '최고점', '전체문항', '도전횟수', '미니게임완료', '사진관찰기록']];
    countries.forEach((country) => {
      const miniGames = [`${country.id}-language-game`, `${country.id}-culture-detective`, `${country.id}-photo-word-game`]
        .filter((id) => player.activityCompletions.includes(id)).length;
      rows.push([
        country.name,
        player.visitedCountries.includes(country.id) ? '완료' : '미완료',
        String(player.quizBestScores[country.id] ?? 0),
        String(country.quiz.length),
        String(player.quizAttempts[country.id] ?? 0),
        `${miniGames}/3`,
        String(Object.values(player.photoObservations).filter((entry) => entry.countryId === country.id).length),
      ]);
    });
    const csv = '\uFEFF' + rows.map((row) => row.map((cell) => `"${cell.replaceAll('"', '""')}"`).join(',')).join('\n');
    downloadFile(`world-tour-${player.nickname || 'student'}.csv`, csv, 'text/csv;charset=utf-8');
  };

  return (
    <section className={embedded ? "local-dashboard-embedded" : "page teacher-page"}>
      {!embedded && <header className="page-header"><div><p className="eyebrow">교사용 · 이 기기 학습 기록</p><h2>🧑‍🏫 세계여행 관제센터</h2></div><div className="teacher-local-chip">LOCAL</div></header>}

      <div className="teacher-note">
        현재 Supabase가 연결되지 않아 이 기기에 저장된 한 여행자의 기록을 보여줍니다. SUPABASE_SETUP.md를 따라 연결하면 학급 코드와 여러 학생의 실시간 기록을 사용할 수 있습니다.
      </div>

      <div className="stats-grid">
        <div className="card stat-card"><span>🌏</span><strong>{completed}/{countries.length}</strong><small>방문 국가</small></div>
        <div className="card stat-card"><span>🧠</span><strong>{avgScore}%</strong><small>퀴즈 최고점 평균</small></div>
        <div className="card stat-card"><span>🔁</span><strong>{totalAttempts}</strong><small>총 퀴즈 도전</small></div>
        <div className="card stat-card"><span>📸</span><strong>{Object.keys(player.photoObservations).length}</strong><small>사진 관찰 기록</small></div>
      </div>

      <section className="card teacher-student-card">
        <div>
          <small>현재 여행자</small>
          <h3>🛂 {player.nickname || '지구별 탐험가'}</h3>
          <p>⭐ {player.stars} · 일기 {Object.keys(player.journals).length}개 · 사진 관찰 {Object.keys(player.photoObservations).length}개 · 비교 {player.photoComparisons.length}개</p>
        </div>
        <div className="export-actions">
          <button className="small-button" onClick={exportCsv}>CSV 내보내기</button>
          <button className="small-button" onClick={exportJson}>JSON 백업</button>
        </div>
      </section>

      <FreeClassAnalysis learners={[{ nickname: player.nickname || '지구별 탐험가', progress: player }]} totalCountries={countries.length} />

      <section className="card country-progress-table">
        <div className="table-heading"><h3>나라별 학습 진행</h3><small>퀴즈·미니게임·사진 관찰 기록</small></div>
        <div className="teacher-table-scroll">
          <table>
            <thead><tr><th>여행지</th><th>상태</th><th>최고점</th><th>도전</th><th>게임</th><th>사진관찰</th></tr></thead>
            <tbody>
              {countries.map((country) => {
                const best = player.quizBestScores[country.id] ?? 0;
                const games = [`${country.id}-language-game`, `${country.id}-culture-detective`, `${country.id}-photo-word-game`]
                  .filter((id) => player.activityCompletions.includes(id)).length;
                return (
                  <tr key={country.id}>
                    <td><span>{country.flag}</span> {country.name}</td>
                    <td>{player.visitedCountries.includes(country.id) ? '✅ 완료' : '⏳ 탐험 중'}</td>
                    <td>{best}/{country.quiz.length}</td>
                    <td>{player.quizAttempts[country.id] ?? 0}회</td>
                    <td>{games}/3</td>
                    <td>{Object.values(player.photoObservations).filter((entry) => entry.countryId === country.id).length}개</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section className="teacher-next card">
        <h3>💡 무료 운영 방식</h3>
        <p>문항 생성과 학습 분석은 이 기기에서 계산하므로 Gemini/OpenAI API 키와 사용료가 필요 없습니다. 여러 학생 기기 동기화가 필요할 때만 Supabase 연결을 선택할 수 있습니다.</p>
      </section>
    </section>
  );
}
