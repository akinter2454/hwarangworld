import { useMemo, useState } from 'react';
import type { Country, CountryImage } from '../types';
import { CountryGallery } from '../components/CountryGallery';
import { MiniGames } from '../components/MiniGames';
import { PhotoObservationMission } from '../components/PhotoObservationMission';
import { CountryPhotoCompare } from '../components/CountryPhotoCompare';
import { PhraseLearningPanel } from '../components/PhraseLearningPanel';
import { Quiz } from '../components/Quiz';
import { SpeakButton } from '../components/SpeakButton';
import { WorksheetButton } from '../components/WorksheetButton';
import { CuratedPhoto } from '../components/CuratedPhoto';
import { useDisplay } from '../store/DisplayContext';
import { useTravel } from '../store/TravelContext';

const sections = [
  ['hello', '👋', '친구 만나기'],
  ['language', '🗣️', '말 배우기'],
  ['gallery', '🖼️', '그림 탐험'],
  ['observe', '🔎', '관찰 미션'],
  ['compare', '↔️', '사진 비교'],
  ['game', '🎮', '미니게임'],
  ['food', '🍜', '음식 여행'],
  ['life', '🏠', '생활 탐험'],
  ['culture', '🎵', '문화 탐험'],
  ['quiz', '🧠', '도전 퀴즈'],
] as const;

type SectionId = typeof sections[number][0];

function TopicVisualGrid({ title, description, images }: { title: string; description: string; images: CountryImage[] }) {
  if (!images.length) return null;
  return (
    <div className="topic-visuals card">
      <div className="topic-visuals-head">
        <div>
          <small>VISUALS</small>
          <h4>{title}</h4>
        </div>
        <p>{description}</p>
      </div>
      <div className="topic-photo-grid">
        {images.map((image, index) => (
          <div className="topic-photo-card" key={`${image.category}-${image.commonsFile ?? image.src}-${index}`}>
            <CuratedPhoto image={image} imageClassName="topic-grid-photo" showCredit />
            <p>{image.caption}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CountryExplorer({ country, onBack }: { country: Country; onBack: () => void }) {
  const [section, setSection] = useState<SectionId>('hello');
  const [missionMessage, setMissionMessage] = useState('');
  const { player, completeCountry, recordQuizAttempt } = useTravel();
  const { easyKorean } = useDisplay();
  const visited = player.visitedCountries.includes(country.id);
  const gameCount = [`${country.id}-language-game`, `${country.id}-culture-detective`, `${country.id}-photo-word-game`]
    .filter((id) => player.activityCompletions.includes(id)).length;
  const learnedCount = country.phrases.filter((_, index) => player.learnedPhraseIds.includes(`${country.id}:${index}`)).length;

  const heroImage = country.media?.hero ?? null;
  const galleryImages = country.media?.gallery ?? [];
  const foodImages = galleryImages.filter((item) => item.category === '음식');
  const lifeImages = galleryImages.filter((item) => item.category === '생활');
  const cultureImages = galleryImages.filter((item) => item.category === '문화');
  const visualHighlights = useMemo(
    () => [heroImage, ...galleryImages].filter(Boolean) as CountryImage[],
    [heroImage, galleryImages],
  );

  const finishQuiz = (score: number) => {
    recordQuizAttempt(country.id, score);
    const pass = score >= Math.ceil(country.quiz.length * 0.66);
    if (pass) {
      completeCountry(country.id, country.collectible.id, score);
      setMissionMessage(`🛂 ${country.name} 여행 완료! 여권 도장과 ${country.collectible.emoji} ${country.collectible.name}을 받았어요.`);
    } else {
      setMissionMessage(`💡 조금만 더 알아보고 다시 도전해 보세요. ${country.quiz.length}문제 중 ${Math.ceil(country.quiz.length * 0.66)}문제 이상 맞히면 도장을 받을 수 있어요.`);
    }
  };

  return (
    <section className={`page country-page ${country.colorClass}`}>
      <header className="country-header">
        <button className="icon-button" onClick={onBack} aria-label="세계지도로 돌아가기">←</button>
        <div><span>{country.flag}</span><h2>{country.name} 여행</h2><small>{country.englishName}</small></div>
        <div className="country-header-actions"><WorksheetButton country={country} /><span className="stamp-status">{visited ? '✅ 완료' : '여행 중'}</span></div>
      </header>

      <div className="arrival card arrival-v08">
        {heroImage && <CuratedPhoto image={heroImage} imageClassName="arrival-hero-image" wrapperClassName="arrival-photo-shell" showCredit eager />}
        <div className="arrival-copy"><div className="airplane">✈️</div><p>세계여행 도착!</p><strong>{country.greeting.text}</strong><small>{easyKorean ? `${country.name}의 말과 생활 모습을 실제 사진과 그림 자료로 천천히 알아봐요.` : country.intro}</small><SpeakButton text={country.greeting.text} lang={country.greeting.lang} /></div>
      </div>

      <div className="journey-status card journey-status-v08">
        <div><span>🗣️</span><strong>배운 말 {learnedCount}/{country.phrases.length}</strong></div>
        <div><span>🎮</span><strong>미니게임 {gameCount}/3</strong></div>
        <div><span>🧠</span><strong>퀴즈 최고점 {player.quizBestScores[country.id] ?? 0}/{country.quiz.length}</strong></div>
        <div><span>🛂</span><strong>{visited ? '도장 획득' : '도전 중'}</strong></div>
      </div>

      {visualHighlights.length > 0 && (
        <div className="country-visual-summary card">
          <div className="country-visual-summary-head">
            <div>
              <small>PHOTO & ART</small>
              <h3>한눈에 보는 {country.name}</h3>
            </div>
            <p>{country.name}의 실제 사진과 그림 자료를 함께 보며 음식, 생활, 문화의 특징을 연결해 봐요.</p>
          </div>
          <div className="country-visual-grid">
            {visualHighlights.map((image, index) => (
              <div className={`visual-summary-card ${index === 0 ? 'hero-card' : ''}`} key={`${image.category}-${image.commonsFile ?? image.src}-${index}`}>
                <CuratedPhoto image={image} imageClassName="visual-summary-photo" showCredit={Boolean(index < 2)} />
                <div className="visual-summary-copy">
                  <span>{image.category}</span>
                  <p>{image.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="section-tabs section-tabs-v08" role="tablist">
        {sections.map(([id, icon, label]) => (
          <button key={id} className={section === id ? 'active' : ''} onClick={() => setSection(id)}>
            <span>{icon}</span><small>{label}</small>
          </button>
        ))}
      </div>

      {section === 'hello' && (
        <div className="content-card card">
          <div className="character">🧒🏻</div>
          <p className="speech">{easyKorean ? `안녕! ${country.name}의 친구들은 어떻게 지낼까요? 실제 사진과 그림 자료를 보면서 사람마다 사는 모습이 다를 수 있다는 것도 함께 생각해 봐요.` : `안녕! 나는 ${country.name}에 사는 어린이라고 생각하고 함께 여행해 봐요. 실제 사진과 그림은 이해를 돕는 자료이며, 사람마다 생활과 경험은 다를 수 있다는 것도 기억해 주세요.`}</p>
          <h3>{country.greeting.text}</h3>
          <p>{country.greeting.meaning}</p>
          <SpeakButton text={country.greeting.text} lang={country.greeting.lang} />
          <div className="reflection"><strong>💭 생각해 보기</strong><p>{easyKorean ? '우리 반 친구에게 어떻게 인사하나요? 인사하는 방법이 달라도 반가운 마음은 비슷하다는 점을 떠올려 보세요.' : '우리 반에서는 친구에게 어떻게 반갑게 인사하나요? 인사 방법은 달라도 존중하고 반가워하는 마음은 공통점일 수 있어요.'}</p></div>
        </div>
      )}

      {section === 'language' && <PhraseLearningPanel country={country} />}
      {section === 'gallery' && <CountryGallery country={country} />}
      {section === 'observe' && <PhotoObservationMission country={country} />}
      {section === 'compare' && <CountryPhotoCompare country={country} />}
      {section === 'game' && <MiniGames country={country} />}

      {section === 'food' && (
        <div>
          <div className="lesson-note">🍽️ 한 나라 안에서도 지역과 가정마다 즐겨 먹는 음식은 달라요. 아래 사진과 설명은 그 나라를 이해하는 대표적인 예시 자료예요.</div>
          <TopicVisualGrid title={`${country.name} 식생활 사진·그림`} description="실제 음식 사진과 보조 그림 자료를 함께 보며 재료, 먹는 방식, 기후와의 관계를 생각해 봐요." images={foodImages} />
          <div className="content-grid content-grid-rich">
            {country.foods.map((food) => <div className="card food-card" key={food.name}><div>{food.emoji}</div><h3>{food.name}</h3><p>{food.description}</p></div>)}
          </div>
        </div>
      )}

      {section === 'life' && (
        <div className="topic-page-stack">
          <TopicVisualGrid title={`${country.name} 생활 모습 자료`} description="실제 거리 사진과 학교생활 그림을 함께 보며 이동, 학교, 가족, 일상 활동을 연결해 생각해 봐요." images={lifeImages} />
          <div className="card content-card topic-with-image">
            <div><h3>🏠 생활 모습을 살펴봐요</h3>
            <div className="life-list">{country.dailyLife.map((item) => <div key={item}><span>✓</span><p>{item}</p></div>)}</div>
            <div className="reflection"><strong>🔎 같은 점 찾기</strong><p>{country.comparePrompt}</p></div></div>
          </div>
        </div>
      )}

      {section === 'culture' && (
        <div>
          <div className="lesson-note">🌏 전통문화는 오늘날 사람들의 생활 전체를 뜻하지 않아요. 현대적인 생활과 여러 전통이 함께 존재할 수 있어요.</div>
          <TopicVisualGrid title={`${country.name} 문화·지역 자료`} description="공공장소 사진과 위치·특징 그림을 함께 보며 역사, 자연환경, 축제, 예술을 연결해 봐요." images={cultureImages} />
          <div className="content-grid content-grid-rich">
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
