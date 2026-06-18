import { useState, useRef, useEffect, useCallback } from 'react';
import { ArrowLeft } from 'lucide-react';
import Timer from './Timer';
import { saveStory } from '../utils/storage';

export default function StoryEditor({ onClose, onSaved }) {
  const [content, setContent] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const textareaRef = useRef(null);
  const savedRef = useRef(false);

  useEffect(() => {
    // Auto-focus the textarea
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  const handleSave = useCallback(() => {
    if (savedRef.current) return;
    savedRef.current = true;
    setIsSaving(true);

    const text = content.trim() || textareaRef.current?.value.trim() || '';
    if (!text) {
      savedRef.current = false;
      setIsSaving(false);
      onClose();
      return;
    }

    const story = saveStory(text);
    onSaved(story);
  }, [content, onClose, onSaved]);

  const handleTimerComplete = useCallback(() => {
    handleSave();
  }, [handleSave]);

  return (
    <div className="editor-overlay">
      <div className="editor-header">
        <button className="icon-btn" onClick={onClose} id="editor-back-btn">
          <ArrowLeft size={22} />
        </button>
        <Timer duration={300} onComplete={handleTimerComplete} />
        <div style={{ width: 40 }} />
      </div>

      <textarea
        ref={textareaRef}
        className="editor-textarea"
        placeholder="Tulis cerita 5 menitmu di sini..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        id="story-textarea"
      />

      <div className="editor-footer">
        <button
          className="save-btn"
          onClick={handleSave}
          disabled={isSaving || !content.trim()}
          id="save-story-btn"
        >
          {isSaving ? 'Menyimpan...' : 'Save Sekarang'}
        </button>
      </div>
    </div>
  );
}
