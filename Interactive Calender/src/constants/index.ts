export const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const;

export const STORAGE_KEYS = {
  CALENDAR_NOTES: 'calendar-notes',
} as const;

export const ANIMATION_CONFIG = {
  DURATION: 0.3,
  EASE: 'easeOut',
  STAGGER_DELAY: 0.1,
} as const;

export const DATE_FORMATS = {
  MONTH_YEAR: 'MMMM yyyy',
  DATE_RANGE: 'MMM d',
  FULL_DATE: 'MMM d, yyyy',
} as const;