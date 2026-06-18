import { X, Calendar, Clock } from 'lucide-react';

function formatDate(isoString) {
  const d = new Date(isoString);
  return d.toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function formatTime(isoString) {
  const d = new Date(isoString);
  return d.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function StoryDetail({ story, onClose }) {
  if (!story) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <div className="modal-date" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Calendar size={14} />
              {formatDate(story.createdAt)}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Clock size={12} />
              {formatTime(story.createdAt)}
            </div>
          </div>
          <button className="icon-btn" onClick={onClose} id="detail-close-btn">
            <X size={20} />
          </button>
        </div>
        <div className="modal-body">
          <p className="modal-story-text">{story.content}</p>
        </div>
      </div>
    </div>
  );
}
