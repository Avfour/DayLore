import { useState, useMemo, useCallback } from 'react';
import { Plus, Search, Moon, Sun, Flame, BookOpen, FileDown } from 'lucide-react';
import StoryList from '../components/StoryList';
import StoryDetail from '../components/StoryDetail';
import StoryEditor from '../components/StoryEditor';
import Toast from '../components/Toast';
import { getStories } from '../utils/storage';
import { getStoryCount, getCurrentStreak } from '../utils/streaks';
import { exportStoriesPDF } from '../utils/pdfExport';
import { useTheme } from '../context/ThemeContext';

export default function HomePage() {
  const { mode, resolvedMode, changeMode } = useTheme();
  const [stories, setStories] = useState(() => getStories());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStory, setSelectedStory] = useState(null);
  const [showEditor, setShowEditor] = useState(false);
  const [toast, setToast] = useState(null);

  const storyCount = stories.length;
  const streak = useMemo(() => getCurrentStreak(), [stories]);

  const filteredStories = useMemo(() => {
    if (!searchQuery.trim()) return stories;
    const q = searchQuery.toLowerCase();
    return stories.filter((s) =>
      s.content.toLowerCase().includes(q) ||
      new Date(s.createdAt).toLocaleDateString('id-ID').includes(q)
    );
  }, [stories, searchQuery]);

  const handleStorySaved = useCallback((story) => {
    setStories(getStories());
    setShowEditor(false);
    setToast('Cerita tersimpan! ✨');
  }, []);

  const toggleTheme = () => {
    changeMode(resolvedMode === 'light' ? 'dark' : 'light');
  };

  return (
    <>
      {/* Header */}
      <header className="header">
        <h1 className="header-title">DayLore</h1>
        <div className="header-actions">
          <button className="icon-btn" onClick={toggleTheme} id="theme-toggle-btn">
            {resolvedMode === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </header>

      {/* Stats */}
      <div className="stats-bar">
        <div className="stat-item">
          <BookOpen size={16} />
          <span>{storyCount} cerita</span>
        </div>
        <div className="stat-item">
          <Flame size={16} />
          <span>{streak} hari streak</span>
        </div>
      </div>

      {/* New Story Button */}
      <div className="new-story-section">
        <button
          className="new-story-btn"
          onClick={() => setShowEditor(true)}
          id="new-story-btn"
        >
          <Plus size={22} />
          Cerita Baru
        </button>
      </div>

      {/* Search */}
      {storyCount > 0 && (
        <div className="search-container">
          <div className="search-input-wrapper">
            <Search size={18} />
            <input
              type="text"
              className="search-input"
              placeholder="Cari cerita..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              id="search-input"
            />
          </div>
        </div>
      )}

      {/* Story List */}
      {storyCount > 0 && (
        <div className="story-list-header">
          <span className="story-list-title">
            {searchQuery
              ? `${filteredStories.length} hasil`
              : 'Cerita terbaru'}
          </span>
          <button
            className="icon-btn"
            onClick={exportStoriesPDF}
            title="Export PDF"
            id="export-pdf-btn"
          >
            <FileDown size={20} />
          </button>
        </div>
      )}

      <StoryList stories={filteredStories} onSelect={setSelectedStory} />

      {/* Story Detail Modal */}
      {selectedStory && (
        <StoryDetail
          story={selectedStory}
          onClose={() => setSelectedStory(null)}
        />
      )}

      {/* Story Editor */}
      {showEditor && (
        <StoryEditor
          onClose={() => setShowEditor(false)}
          onSaved={handleStorySaved}
        />
      )}

      {/* Toast */}
      {toast && <Toast message={toast} onDone={() => setToast(null)} />}
    </>
  );
}
