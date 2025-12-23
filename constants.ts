
import { TimerMode, TimerSettings } from './types';

export const DEFAULT_SETTINGS: TimerSettings = {
  [TimerMode.WORK]: 25 * 60,
  [TimerMode.SHORT_BREAK]: 5 * 60,
  [TimerMode.LONG_BREAK]: 15 * 60
};

export const MODE_COLORS = {
  [TimerMode.WORK]: 'bg-rose-500',
  [TimerMode.SHORT_BREAK]: 'bg-teal-500',
  [TimerMode.LONG_BREAK]: 'bg-indigo-500'
};

export const MODE_BG_LIGHT = {
  [TimerMode.WORK]: 'bg-rose-50',
  [TimerMode.SHORT_BREAK]: 'bg-teal-50',
  [TimerMode.LONG_BREAK]: 'bg-indigo-50'
};

export const MODE_TEXT = {
  [TimerMode.WORK]: 'Focus Time',
  [TimerMode.SHORT_BREAK]: 'Short Break',
  [TimerMode.LONG_BREAK]: 'Long Break'
};
