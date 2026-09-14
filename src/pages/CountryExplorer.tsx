import { useState } from 'react';
import type { Country } from '../types';
import { MiniGames } from '../components/MiniGames';
import { Quiz } from '../components/Quiz';
import { SpeakButton } from '../components/SpeakButton';
import { WorksheetButton } from '../components/WorksheetButton';
import { useDisplay } from '../store/DisplayContext';
import { useTravel } from '../store/TravelContext';

const sections = [
  ['hello', '👋', '친구 만나기'],
  ['language', '🗣️', '말 배우기'],
  ['game', '🎮', '미니게임'],
  ['food', '🍜', '음식 여행'],
  ['life', '🏠', '생활 탐험'],
  ['culture', '🎵', '문화 탐험'],
  ['quiz', '🧠', '도전 퀴즈'],
] as const;

type SectionId = typeof sections[number][0];

export function CountryExplorer({ country, onBack }: { country: Country; onBack: () => void }) {
  const [section, setSection] = useState<SectionId>('hello');
  const [missionMessage, setMissionMessage] = useState('');
  const { player, completeCountry, recordQuizAttempt } = useTravel();
  const { easyKorean } = useDisplay();
  const visited = player.visitedCountries.includes(country.id);
  const gameCount = [`${country.id}-language-game`, `${country.id}-culture-detective`]
    .filter((id) => player.activityCompletions.includes(id)).length;

  const finishQuiz = (score: number) => {
    recordQuizAttempt(country.id, score);
    const pass = score >= Math.ceil(country.quiz.length * 0.66);
    if (pass) {
      completeCountry(country.id, country.collectible.id, score);
      setMissionMessage(`🛂 ${country.name} 여행 완료! 여권 도장과 ${country.collectible.emoji} ${country.collectible.name}을 받았어요.`);
    } else {
      setMissionMessage('💡 조금만 더 알아보고 다시 도전해 보세요. 3문제 중 2문제 이상 맞히면 도장을 받을 수 있어요.');
    }
  };

  return (
    <section className={`page country-page ${country.colorClass}`}>
      <header className="country-header">
        <button className="icon-button" onClick={onBack} aria-label="세계지도로 돌아가기">←</button>
        <div><span>{country.flag}</span><h2>{country.name} 여행</h2><small>{country.englishName}</small></div>
        <div className="country-header-actions"><WorksheetButton country={country} /><span className="stamp-status">{visited ? '✅ 완료' : '여행 중'}</span></div>
      </header>

      <div className="arrival card">
        <div className="airplane">✈️</div>
        <div><p>세계여행 도착!</p><strong>{country.greeting.text}</strong><small>{easyKorean ? `${country.name}의 인사말과 생활 모습을 천천히 알아봐요.` : country.intro}</small></div>
      </div>

      <div className="journey-status card">
        <div><span>🎮</span><strong>미니게임 {gameCount}/2</strong></div>
        <div><span>🧠</span><strong>퀴즈 최고점 {player.quizBestScores[country.id] ?? 0}/{country.quiz.length}</strong></div>
        <div><span>🛂</span><strong>{visited ? '도장 획득' : '도전 중'}</strong></div>
      </div>

      <div className="section-tabs" role="tablist">
        {sections.map(([id, icon, label]) => (
          <button key={id} className={section === id ? 'active' : ''} onClick={() => setSection(id)}>
            <span>{icon}</span><small>{label}</small>
          </button>
        ))}
      </div>

      {section === 'hello' && (
        <div className="content-card card">
          <div className="character">🧒🏻</div>
          <p className="speech">{easyKorean ? `안녕! ${country.name}의 친구들은 어떻게 지낼까요? 사람마다 사는 모습은 다를 수 있어요.` : `안녕! 나는 ${country.name}에 사는 어린이라고 생각하고 함께 여행해 봐요. 사람마다 생활과 경험은 다를 수 있다는 것도 기억해 주세요.`}</p>
          <h3>{country.greeting.text}</h3>
          <p>{country.greeting.meaning}</p>
          <SpeakButton text={country.greeting.text} lang={country.greeting.lang} />
          <div className="reflection"><strong>💭 생각해 보기</strong><p>{easyKorean ? '우리 반 친구에게 어떻게 인사하나요?' : '우리 반에서는 친구에게 어떻게 반갑게 인사하나요?'}</p></div>
        </div>
      )}

      {section === 'language' && (
        <div>
          <div className="lesson-note">🔊 표현을 눌러 소리를 듣고 따라 말해 보세요. 발음은 기기에서 지원하는 음성에 따라 조금 다르게 들릴 수 있어요.</div>
          <div className="content-grid">
            {country.phrases.map((phrase) => (
              <div className="card phrase-card" key={phrase.text}>
                <span>💬</span><h3>{phrase.text}</h3><p>{phrase.meaning}</p><SpeakButton text={phrase.text} lang={phrase.lang} />
              </div>
            ))}
          </div>
        </div>
      )}

      {section === 'game' && <MiniGames country={country} />}

      {section === 'food' && (
        <div>
          <div className="lesson-note">🍽️ 한 나라 안에서도 지역과 가정마다 즐겨 먹는 음식은 달라요. 아래 음식은 널리 알려진 예시예요.</div>
          <div className="content-grid">
            {country.foods.map((food) => <div className="card food-card" key={food.name}><div>{food.emoji}</div><h3>{food.name}</h3><p>{food.description}</p></div>)}
          </div>
        </div>
      )}

      {section === 'life' && (
        <div className="card content-card">
          <h3>🏠 생활 모습을 살펴봐요</h3>
          <div className="life-list">{country.dailyLife.map((item) => <div key={item}><span>✓</span><p>{item}</p></div>)}</div>
          <div className="reflection"><strong>🔎 같은 점 찾기</strong><p>{country.comparePrompt}</p></div>
        </div>
      )}

      {section === 'culture' && (
        <div>
          <div className="lesson-note">🌏 전통문화는 오늘날 사람들의 생활 전체를 뜻하지 않아요. 현대적인 생활과 여러 전통이 함께 존재할 수 있어요.</div>
          <div className="content-grid">
            {country.culture.map((item) => <div className="card culture-card" key={item.title}><div>{item.emoji}</div><h3>{item.title}</h3><p>{item.description}</p></div>)}
          </div>
        </div>
      )}

      {section === 'quiz' && (
        <div>
          {missionMessage && <div className="mission-message">{missionMessage}</div>}
          <Quiz questions={country.quiz} onComplete={finishQuiz} />
        </div>
      )}
    </section>
  );
}
