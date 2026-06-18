import { Home, Settings } from 'lucide-react';

export default function Navbar({ activePage, onNavigate }) {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <button
          className={`nav-item ${activePage === 'home' ? 'active' : ''}`}
          onClick={() => onNavigate('home')}
          id="nav-home"
        >
          <Home size={22} />
          <span>Home</span>
        </button>
        <button
          className={`nav-item ${activePage === 'settings' ? 'active' : ''}`}
          onClick={() => onNavigate('settings')}
          id="nav-settings"
        >
          <Settings size={22} />
          <span>Settings</span>
        </button>
      </div>
    </nav>
  );
}
