import {
  ArrowLeft,
  Info,
  Palette,
  Monitor,
  Heart,
  Camera,
  Music,
  Globe,
  FileDown,
} from 'lucide-react';
import { useTheme, ACCENT_COLORS } from '../context/ThemeContext';
import { exportStoriesPDF } from '../utils/pdfExport';

export default function SettingsPage({ onBack }) {
  const { mode, accent, changeMode, changeAccent } = useTheme();

  return (
    <>
      {/* Header */}
      <header className="header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button className="icon-btn" onClick={onBack} id="settings-back-btn">
            <ArrowLeft size={22} />
          </button>
          <h1 className="header-title">Settings</h1>
        </div>
      </header>

      <div className="settings-page">
        {/* About */}
        <section className="settings-section">
          <div className="settings-section-title">About</div>
          <div className="settings-card">
            <div style={{ padding: 'var(--space-md)', display: 'flex', alignItems: 'flex-start', gap: 'var(--space-md)' }}>
              <Info size={20} style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '2px' }} />
              <p className="about-text" style={{ padding: 0 }}>
                DayLore membantu kamu menjadi 'kolektor momen' dengan investasi 5 menit sehari.
                Tidak perlu menunggu hal besar terjadi—cerita terbaik ada di hal-hal kecil yang sering terlewatkan.
                Dengan mencatat satu momen bermakna setiap hari, kamu melatih kepekaan, memperlambat waktu yang terasa cepat,
                dan membangun bank ide yang melimpah. Setiap hari yang kamu jalani punya ceritanya sendiri.
                Mari mulai menangkap momen itu hari ini, dan lihat hidup jadi lebih berwarna.
              </p>
            </div>
          </div>
        </section>

        {/* Theme Colors */}
        <section className="settings-section">
          <div className="settings-section-title">Theme Colors</div>
          <div className="settings-card">
            <div className="color-picker">
              {ACCENT_COLORS.map((color) => (
                <button
                  key={color.key}
                  className={`color-swatch ${accent === color.key ? 'active' : ''}`}
                  style={{ backgroundColor: color.hex }}
                  onClick={() => changeAccent(color.key)}
                  title={color.label}
                  id={`color-${color.key}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Display */}
        <section className="settings-section">
          <div className="settings-section-title">Display</div>
          <div className="settings-card">
            <div className="theme-toggle-group">
              <button
                className={`theme-toggle-option ${mode === 'light' ? 'active' : ''}`}
                onClick={() => changeMode('light')}
                id="mode-light"
              >
                Light
              </button>
              <button
                className={`theme-toggle-option ${mode === 'dark' ? 'active' : ''}`}
                onClick={() => changeMode('dark')}
                id="mode-dark"
              >
                Dark
              </button>
              <button
                className={`theme-toggle-option ${mode === 'auto' ? 'active' : ''}`}
                onClick={() => changeMode('auto')}
                id="mode-auto"
              >
                Auto
              </button>
            </div>
          </div>
        </section>

        {/* Export */}
        <section className="settings-section">
          <div className="settings-section-title">Data</div>
          <div className="settings-card" style={{ padding: 'var(--space-md)' }}>
            <button className="export-btn" onClick={exportStoriesPDF} id="settings-export-btn">
              <FileDown size={20} />
              Export Semua Cerita (PDF)
            </button>
          </div>
        </section>

        {/* Support Me */}
        <section className="settings-section">
          <div className="settings-section-title">Support Me</div>
          <div className="settings-card">
            <div style={{ padding: 'var(--space-md)' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-md)', marginBottom: 'var(--space-md)' }}>
                <Heart size={20} style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '2px' }} />
                <p className="about-text" style={{ padding: 0 }}>
                  Jika DayLore membantu kamu menjadi kolektor momen, dukung developer dengan
                  cara-cara berikut:
                </p>
              </div>

              <div className="support-qr" style={{ marginBottom: 'var(--space-md)' }}>
                <div className="support-qr-placeholder">QR Code</div>
                <span className="support-qr-label">Scan untuk support (iPaymu)</span>
              </div>
            </div>
          </div>
        </section>

        {/* Social Media */}
        <section className="settings-section">
          <div className="settings-section-title">Social Media</div>
          <div className="settings-card">
            <a
              href="https://instagram.com/aiiistheticsv4"
              target="_blank"
              rel="noopener noreferrer"
              className="settings-item"
              id="settings-instagram"
            >
              <div className="settings-item-left">
                <Camera size={20} />
                <div>
                  <div className="settings-item-label">Instagram</div>
                  <div className="settings-item-desc">@aiiistheticsv4</div>
                </div>
              </div>
              <div className="settings-item-right">
                <Globe size={18} />
              </div>
            </a>

            <a
              href="https://tiktok.com/@aiiistheticsv4"
              target="_blank"
              rel="noopener noreferrer"
              className="settings-item"
              id="settings-tiktok"
            >
              <div className="settings-item-left">
                <Music size={20} />
                <div>
                  <div className="settings-item-label">TikTok</div>
                  <div className="settings-item-desc">@aiiistheticsv4</div>
                </div>
              </div>
              <div className="settings-item-right">
                <Globe size={18} />
              </div>
            </a>

            <a
              href="https://avfour.github.io/Avfour-Portofolio/"
              target="_blank"
              rel="noopener noreferrer"
              className="settings-item"
              id="settings-website"
            >
              <div className="settings-item-left">
                <Globe size={20} />
                <div>
                  <div className="settings-item-label">Website</div>
                  <div className="settings-item-desc">avfour.github.io</div>
                </div>
              </div>
              <div className="settings-item-right">
                <Globe size={18} />
              </div>
            </a>
          </div>
        </section>

        {/* Version */}
        <div style={{
          textAlign: 'center',
          padding: 'var(--space-lg)',
          paddingBottom: 'var(--space-2xl)',
        }}>
          <p style={{ fontSize: 'var(--font-xs)', color: 'var(--text-tertiary)' }}>
            DayLore v1.0.0
          </p>
          <p style={{ fontSize: 'var(--font-xs)', color: 'var(--text-tertiary)', marginTop: '4px' }}>
            Made with ❤️ for story collectors
          </p>
        </div>
      </div>
    </>
  );
}
