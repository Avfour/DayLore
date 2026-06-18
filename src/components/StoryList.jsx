import { BookOpen, Calendar } from 'lucide-react';

function formatDate(isoString) {
  const d = new Date(isoString);
  return d.toLocaleDateString('id-ID', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
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

export default function StoryList({ stories, onSelect }) {
  if (stories.length === 0) {
    return (
      <div className="empty-state">
        <BookOpen />
        <div className="empty-state-title">Belum ada cerita</div>
        <p className="empty-state-text">
          Mulai tulis cerita pertamamu hari ini!
        </p>
      </div>
    );
  }

  return (
    <div className="story-list">
      {stories.map((story) => (
        <div
          key={story.id}
          className="story-card"
          onClick={() => onSelect(story)}
          id={`story-card-${story.id}`}
        >
          <div className="story-card-date">
            <Calendar size={12} />
            {formatDate(story.createdAt)} • {formatTime(story.createdAt)}
          </div>
          <p className="story-card-preview">{story.content}</p>
        </div>
      ))}
    </div>
  );
}
