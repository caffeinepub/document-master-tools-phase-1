const KEY = "dmt_typing_progress";

export interface TypingProgress {
  bestWpm: number;
  totalSessions: number;
  totalTimeSecs: number;
}

export function loadTypingProgress(): TypingProgress {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw) as TypingProgress;
  } catch {
    /* ignore */
  }
  return { bestWpm: 0, totalSessions: 0, totalTimeSecs: 0 };
}

export function saveTypingProgress(p: TypingProgress): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(p));
  } catch {
    /* ignore */
  }
}

export function updateTypingProgress(wpm: number, durationSecs: number): void {
  const p = loadTypingProgress();
  p.bestWpm = Math.max(p.bestWpm, wpm);
  p.totalSessions += 1;
  p.totalTimeSecs += durationSecs;
  saveTypingProgress(p);
}
