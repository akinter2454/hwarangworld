import type { Country } from '../types';

export function FlightTransition({ country }: { country: Country }) {
  return (
    <div className="flight-overlay" role="status" aria-live="polite">
      <div className="flight-card">
        <div className="flight-route">
          <span className="flight-origin">🇰🇷</span>
          <span className="flight-line" />
          <span className="flight-plane">✈️</span>
          <span className="flight-destination">{country.flag}</span>
        </div>
        <p>다문화 세계여행</p>
        <h2>{country.name}으로 출발!</h2>
        <small>새로운 말과 생활, 문화를 만나러 가요.</small>
      </div>
    </div>
  );
}
