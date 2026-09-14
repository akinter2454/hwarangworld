import { useState } from 'react';
import { useTravel } from '../store/TravelContext';
import { APP_VERSION } from '../services/diagnostics';

export function Home({ onStart }: { onStart: () => void }) {
  const { player, setNickname } = useTravel();
  const [name, setName] = useState(player.nickname);

  const start = () => {
    const safeName = name.trim() || '지구별 탐험가';
    setNickname(safeName.slice(0, 12));
    onStart();
  };

  return (
    <main className="home-screen">
      <section className="hero-card">
        <div className="planet">🌏</div>
        <p className="eyebrow">다문화 세계여행 학습 플랫폼 · v{APP_VERSION}</p>
        <h1>다함께 GO!<br />세계여행</h1>
        <p className="hero-copy">다름을 만나고, 같음을 발견하는 여행을 떠나 볼까요?</p>
        <div className="passport-setup">
          <label htmlFor="nickname">🛂 여권에 적을 여행자 이름</label>
          <input id="nickname" value={name} onChange={(event) => setName(event.target.value)} maxLength={12} placeholder="예: 별빛탐험가" />
          <button className="hero-button" onClick={start}>✈️ 여행 시작하기</button>
        </div>
      </section>
      <section className="home-values">
        <div><span>👋</span><strong>말</strong><small>세계의 인사말</small></div>
        <div><span>🍜</span><strong>생활</strong><small>음식과 일상</small></div>
        <div><span>🤝</span><strong>존중</strong><small>같음과 다름</small></div>
      </section>
    </main>
  );
}
