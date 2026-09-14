export type Tab = 'travel' | 'passport' | 'bag' | 'journal' | 'badges';

const navItems: { id: Tab; icon: string; label: string }[] = [
  { id: 'travel', icon: '🌏', label: '여행' },
  { id: 'passport', icon: '🛂', label: '여권' },
  { id: 'bag', icon: '🎒', label: '가방' },
  { id: 'journal', icon: '📖', label: '일기' },
  { id: 'badges', icon: '🏆', label: '배지' },
];

export function BottomNav({ current, onChange }: { current: Tab; onChange: (tab: Tab) => void }) {
  return (
    <nav className="bottom-nav" aria-label="주요 메뉴">
      {navItems.map((item) => (
        <button key={item.id} className={current === item.id ? 'active' : ''} onClick={() => onChange(item.id)}>
          <span>{item.icon}</span>
          <small>{item.label}</small>
        </button>
      ))}
    </nav>
  );
}
