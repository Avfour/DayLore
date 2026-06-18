/**
 * Storage utility for DayLore
 * Abstracts localStorage for web / Capacitor Preferences for mobile
 */

const isCapacitor = () => {
  try {
    return window.Capacitor !== undefined;
  } catch {
    return false;
  }
};

// --- Stories ---

const STORIES_KEY = 'daylore_stories';

export const getStories = () => {
  try {
    const raw = localStorage.getItem(STORIES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const saveStory = (content) => {
  const stories = getStories();
  const story = {
    id: Date.now().toString(36) + Math.random().toString(36).substr(2, 5),
    content: content.trim(),
    createdAt: new Date().toISOString(),
  };
  stories.unshift(story);
  localStorage.setItem(STORIES_KEY, JSON.stringify(stories));
  return story;
};

export const getStoryById = (id) => {
  const stories = getStories();
  return stories.find((s) => s.id === id) || null;
};

// --- Theme Preferences ---

const THEME_MODE_KEY = 'daylore_theme_mode';
const ACCENT_COLOR_KEY = 'daylore_accent_color';

export const getThemeMode = () => {
  return localStorage.getItem(THEME_MODE_KEY) || 'light';
};

export const setThemeMode = (mode) => {
  localStorage.setItem(THEME_MODE_KEY, mode);
};

export const getAccentColor = () => {
  return localStorage.getItem(ACCENT_COLOR_KEY) || 'blue';
};

export const setAccentColor = (color) => {
  localStorage.setItem(ACCENT_COLOR_KEY, color);
};

// --- Popup ---

const POPUP_KEY = 'daylore_last_popup';

export const getLastPopupDate = () => {
  const raw = localStorage.getItem(POPUP_KEY);
  return raw ? new Date(raw) : null;
};

export const setLastPopupDate = () => {
  localStorage.setItem(POPUP_KEY, new Date().toISOString());
};

export const shouldShowPopup = () => {
  const last = getLastPopupDate();
  if (!last) return true;
  const now = new Date();
  const diffMs = now.getTime() - last.getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);
  return diffDays >= 3;
};
