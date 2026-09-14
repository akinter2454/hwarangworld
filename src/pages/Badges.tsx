import { useTravel } from '../store/TravelContext';

type BadgeRule = {
  id: string;
  icon: string;
  name: string;
  description: string;
  need: number;
  kind: 'travel' | 'language' | 'favorite';
};

const badgeRules: BadgeRule[] = [
  { id: 'first', icon: '🛫', name: '첫 여행', description: '첫 나라 여행을 완료해요.', need: 1, kind: 'travel' },
  { id: 'hello', icon: '👋', name: '세계 인사왕', description: '3개 나라를 여행해요.', need: 3, kind: 'travel' },
  { id: 'word10', icon: '🗣️', name: '말 탐험가', description: '세계의 말 10개를 배워요.', need: 10, kind: 'language' },
  { id: 'word30', icon: '💬', name: '말 수집가', description: '세계의 말 30개를 배워요.', need: 30, kind: 'language' },
  { id: 'favorite10', icon: '⭐', name: '내 마음의 한마디', description: '마음에 드는 표현 10개를 즐겨찾기해요.', need: 10, kind: 'favorite' },
  { id: 'explorer', icon: '🌏', name: '세계 탐험가', description: '5개 나라를 여행해요.', need: 5, kind: 'travel' },
  { id: 'respect', icon: '🤝', name: '다름 존중', description: '7개 나라를 여행해요.', need: 7, kind: 'travel' },
  { id: 'citizen', icon: '🏆', name: '세계 시민', description: '기본 세계여행 12개국을 완료해요.', need: 12, kind: 'travel' },
];

export function Badges() {
  const { player, resetProgress } = useTravel();
  const countFor = (badge: BadgeRule) => badge.kind === 'travel' ? player.visitedCountries.length : badge.kind === 'language' ? player.learnedPhraseIds.length : player.favoritePhraseIds.length;
  return (
    <section className="page">
      <header className="page-header"><div><p className="eyebrow">WORLD CITIZEN</p><h2>🏆 나의 세계시민 배지</h2></div></header>
      <div className="badge-list">
        {badgeRules.map((badge) => {
          const count = countFor(badge);
          const unlocked = count >= badge.need;
          return <div key={badge.id} className={`card badge-item ${unlocked ? 'unlocked' : ''}`}><span>{unlocked ? badge.icon : '🔒'}</span><div><strong>{badge.name}</strong><p>{badge.description}</p><small>{Math.min(count, badge.need)} / {badge.need}</small></div></div>;
        })}
      </div>
      <details className="teacher-tools card"><summary>⚙️ 교사용 테스트 도구</summary><p>학생 데이터를 시험할 때만 사용하세요.</p><button className="danger-button" onClick={() => { if (confirm('이 기기에 저장된 모든 여행 기록을 초기화할까요?')) resetProgress(); }}>모든 진행도 초기화</button></details>
    </section>
  );
}
