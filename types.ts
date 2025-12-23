
export enum TimerMode {
  WORK = 'WORK',
  SHORT_BREAK = 'SHORT_BREAK',
  LONG_BREAK = 'LONG_BREAK'
}

export interface TimerSettings {
  [TimerMode.WORK]: number;
  [TimerMode.SHORT_BREAK]: number;
  [TimerMode.LONG_BREAK]: number;
}

export interface Quote {
  text: string;
  author: string;
}
