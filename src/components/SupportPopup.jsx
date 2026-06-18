import { X, Camera, Globe, Music } from 'lucide-react';
import { setLastPopupDate } from '../utils/storage';

export default function SupportPopup({ onClose }) {
  const handleClose = () => {
    setLastPopupDate();
    onClose();
  };

  return (
    <div className="support-modal" onClick={(e) => e.stopPropagation()}>
      <div className="support-content">
        <div className="support-header">
          <h2>Support DayLore!</h2>
          <button className="icon-btn" onClick={handleClose} id="support-close-btn">
            <X size={20} />
          </button>
        </div>
        <div className="support-body">
          <p className="support-text">
            Jika DayLore membantu kamu menciptakan kenangan, support developer dengan
            follow social media atau visit website aku!
          </p>

          <div className="support-qr">
            <div className="support-qr-placeholder">QR Code</div>
            <span className="support-qr-label">Scan untuk support (iPaymu)</span>
          </div>

          <div className="support-links">
            <a
              href="https://instagram.com/aiiistheticsv4"
              target="_blank"
              rel="noopener noreferrer"
              className="support-link"
              id="support-instagram"
            >
              <Camera size={20} />
              <span>Instagram</span>
              <span className="support-link-handle">@aiiistheticsv4</span>
            </a>

            <a
              href="https://tiktok.com/@aiiistheticsv4"
              target="_blank"
              rel="noopener noreferrer"
              className="support-link"
              id="support-tiktok"
            >
              <Music size={20} />
              <span>TikTok</span>
              <span className="support-link-handle">@aiiistheticsv4</span>
            </a>

            <a
              href="https://avfour.github.io/Avfour-Portofolio/"
              target="_blank"
              rel="noopener noreferrer"
              className="support-link"
              id="support-website"
            >
              <Globe size={20} />
              <span>Website</span>
              <span className="support-link-handle">avfour.github.io</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
