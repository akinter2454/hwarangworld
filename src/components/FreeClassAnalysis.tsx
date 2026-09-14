import { analyzeClassLocally, type AnalysisLearner } from '../services/localAnalysis';

export function FreeClassAnalysis({ learners, totalCountries }: { learners: AnalysisLearner[]; totalCountries: number }) {
  const analysis = analyzeClassLocally(learners, totalCountries);
  return (
    <section className="card free-analysis-card">
      <div className="free-analysis-heading">
        <div><small>🧠 API 없는 무료 자동 분석</small><h3>{analysis.headline}</h3></div>
        <span className="offline-engine-chip">LOCAL ENGINE</span>
      </div>
      <p>{analysis.summary}</p>
      <div className="free-analysis-grid">
        <div><strong>👍 잘 진행되는 점</strong>{analysis.strengths.length ? <ul>{analysis.strengths.map((item) => <li key={item}>{item}</li>)}</ul> : <p className="muted-analysis">기록이 조금 더 쌓이면 강점을 표시합니다.</p>}</div>
        <div><strong>🔎 살펴볼 점</strong>{analysis.attention.length ? <ul>{analysis.attention.map((item) => <li key={item}>{item}</li>)}</ul> : <p className="muted-analysis">현재 자동 감지된 주의 항목이 없습니다.</p>}</div>
        <div><strong>🧭 다음 수업 제안</strong><ul>{analysis.nextActions.map((item) => <li key={item}>{item}</li>)}</ul></div>
      </div>
      <small className="analysis-disclaimer">학생 평가를 자동 결정하지 않습니다. 저장된 활동 기록을 규칙으로 요약하는 보조 기능입니다.</small>
    </section>
  );
}
