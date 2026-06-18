import { useState, useCallback, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import SplashScreen from './components/SplashScreen';
import SupportPopup from './components/SupportPopup';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import SettingsPage from './pages/SettingsPage';
import { shouldShowPopup } from './utils/storage';

function AppContent() {
  const [showSplash, setShowSplash] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [activePage, setActivePage] = useState('home');

  const handleSplashComplete = useCallback(() => {
    setShowSplash(false);
    // Check if support popup should show
    if (shouldShowPopup()) {
      setShowPopup(true);
    }
  }, []);

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <>
      <div className="app-container">
        {activePage === 'home' && <HomePage />}
        {activePage === 'settings' && (
          <SettingsPage onBack={() => setActivePage('home')} />
        )}
      </div>

      <Navbar activePage={activePage} onNavigate={setActivePage} />

      {showPopup && <SupportPopup onClose={() => setShowPopup(false)} />}
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
