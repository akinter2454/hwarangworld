import { useMemo, useState } from 'react';
import { BottomNav, type Tab } from './components/BottomNav';
import { AccessibilityDock } from './components/AccessibilityDock';
import { ClassSessionBanner } from './components/ClassSessionBanner';
import { DiagnosticsCenter } from './components/DiagnosticsCenter';
import { ProgressSync } from './components/ProgressSync';
import { countryById } from './data/countries';
import { useClassroom } from './store/ClassroomContext';
import { Bag } from './pages/Bag';
import { Badges } from './pages/Badges';
import { ClassJoin } from './pages/ClassJoin';
import { CountryExplorer } from './pages/CountryExplorer';
import { Home } from './pages/Home';
import { Journal } from './pages/Journal';
import { LanguageBook } from './pages/LanguageBook';
import { Passport } from './pages/Passport';
import { TeacherPortal } from './pages/TeacherPortal';
import { WorldMap } from './pages/WorldMap';
import { useTravel } from './store/TravelContext';

export default function App() {
  const { player } = useTravel();
  const { customCountries } = useClassroom();
  const queryClassCode = useMemo(() => new URLSearchParams(window.location.search).get('class')?.toUpperCase() ?? '', []);
  const [started, setStarted] = useState(Boolean(player.nickname));
  const [tab, setTab] = useState<Tab>('travel');
  const [countryId, setCountryId] = useState<string | null>(null);
  const [teacherMode, setTeacherMode] = useState(false);
  const [joinMode, setJoinMode] = useState(Boolean(queryClassCode));

  const clearClassQuery = () => {
    if (!queryClassCode) return;
    const url = new URL(window.location.href);
    url.searchParams.delete('class');
    window.history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`);
  };

  if (joinMode) {
    return <><ClassJoin initialCode={queryClassCode} onDone={() => { clearClassQuery(); setStarted(true); setJoinMode(false); }} onBack={() => { clearClassQuery(); setJoinMode(false); }} /><AccessibilityDock /><DiagnosticsCenter /></>;
  }

  if (!started) return <><Home onStart={() => setStarted(true)} /><AccessibilityDock /><DiagnosticsCenter /></>;

  if (teacherMode) {
    return (
      <div className="app-shell teacher-shell">
        <AccessibilityDock /><DiagnosticsCenter />
        <div className="teacher-back-wrap"><button className="small-button" onClick={() => setTeacherMode(false)}>← 학생 여행 화면으로</button></div>
        <TeacherPortal />
      </div>
    );
  }

  const country = countryId ? (countryById(countryId) ?? customCountries.find((item) => item.id === countryId)) : undefined;
  if (country) return <><ProgressSync /><CountryExplorer country={country} onBack={() => setCountryId(null)} /><AccessibilityDock /><DiagnosticsCenter /></>;

  return (
    <div className="app-shell">
      <ProgressSync />
      <AccessibilityDock />
      <DiagnosticsCenter />
      <main className="app-content">
        <ClassSessionBanner />
        {tab === 'travel' && <WorldMap onSelect={setCountryId} onOpenTeacher={() => setTeacherMode(true)} onJoinClass={() => setJoinMode(true)} />}
        {tab === 'language' && <LanguageBook />}
        {tab === 'passport' && <Passport />}
        {tab === 'bag' && <Bag />}
        {tab === 'journal' && <Journal />}
        {tab === 'badges' && <Badges />}
      </main>
      <BottomNav current={tab} onChange={setTab} />
    </div>
  );
}
