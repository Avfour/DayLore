/**
 * Streak & stats calculation for DayLore
 */

import { getStories } from './storage';

/**
 * Get total story count
 */
export const getStoryCount = () => {
  return getStories().length;
};

/**
 * Calculate current writing streak (consecutive days with at least 1 story)
 * If today has no story, streak counts from the most recent day that has one,
 * but only if that day was yesterday — otherwise streak = 0.
 */
export const getCurrentStreak = () => {
  const stories = getStories();
  if (stories.length === 0) return 0;

  // Group stories by date string (YYYY-MM-DD)
  const datesWithStories = new Set();
  stories.forEach((s) => {
    const d = new Date(s.createdAt);
    datesWithStories.add(formatDateKey(d));
  });

  // Sort dates descending
  const sortedDates = Array.from(datesWithStories).sort().reverse();

  const today = formatDateKey(new Date());
  const yesterday = formatDateKey(new Date(Date.now() - 86400000));

  // If most recent story isn't today or yesterday, streak = 0
  if (sortedDates[0] !== today && sortedDates[0] !== yesterday) {
    return 0;
  }

  let streak = 0;
  let checkDate = sortedDates[0] === today ? new Date() : new Date(Date.now() - 86400000);

  for (let i = 0; i < 365; i++) {
    const key = formatDateKey(checkDate);
    if (datesWithStories.has(key)) {
      streak++;
      checkDate = new Date(checkDate.getTime() - 86400000);
    } else {
      break;
    }
  }

  return streak;
};

function formatDateKey(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}
