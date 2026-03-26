const KEY = "dmt_typing_progress";
function loadTypingProgress() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw);
  } catch {
  }
  return { bestWpm: 0, totalSessions: 0, totalTimeSecs: 0 };
}
function saveTypingProgress(p) {
  try {
    localStorage.setItem(KEY, JSON.stringify(p));
  } catch {
  }
}
function updateTypingProgress(wpm, durationSecs) {
  const p = loadTypingProgress();
  p.bestWpm = Math.max(p.bestWpm, wpm);
  p.totalSessions += 1;
  p.totalTimeSecs += durationSecs;
  saveTypingProgress(p);
}
export {
  loadTypingProgress as l,
  updateTypingProgress as u
};
