import { ArrowLeft, CheckCircle, RotateCcw } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const SAMPLE_TEXTS = [
  "The quick brown fox jumps over the lazy dog. Practice makes perfect and consistent effort leads to improvement over time. Keep typing to build your speed and accuracy.",
  "Typing speed improves with daily practice. Focus on accuracy first and speed will follow naturally as your fingers learn the position of every key on the keyboard.",
  "A good typist does not look at the keyboard while typing. Train your muscle memory and your speed will increase significantly over a few weeks of consistent practice.",
  "Technology has changed the way we communicate today. Fast and accurate typing is now an essential skill for every professional working in any field or industry.",
  "The internet has connected billions of people around the world. Information travels at the speed of light and communication has never been easier or more accessible.",
  "Document processing tools help you work smarter and faster. From converting files to resizing images, the right tools make complex tasks simple and quick to complete.",
];

type TestDuration = 1 | 3 | 5;
type TestState = "idle" | "running" | "finished";
type ActiveTab = "test" | "learn" | "practice";

interface ProgressStats {
  bestWpm: number;
  totalWpm: number;
  testsCompleted: number;
}

const PROGRESS_KEY = "typingmaster_progress";

function loadProgress(): ProgressStats {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    if (raw) return JSON.parse(raw) as ProgressStats;
  } catch {
    // ignore
  }
  return { bestWpm: 0, totalWpm: 0, testsCompleted: 0 };
}

function saveProgress(stats: ProgressStats) {
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(stats));
  } catch {
    // ignore
  }
}

// ---- Leaderboard ----

const LEADERBOARD_KEY = "typingmaster_leaderboard";

interface LeaderboardEntry {
  name: string;
  wpm: number;
  accuracy: number;
  date: string;
}

function loadLeaderboard(): LeaderboardEntry[] {
  try {
    const raw = localStorage.getItem(LEADERBOARD_KEY);
    if (raw) return JSON.parse(raw) as LeaderboardEntry[];
  } catch {
    // ignore
  }
  return [];
}

function saveLeaderboard(entries: LeaderboardEntry[]) {
  try {
    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(entries));
  } catch {
    // ignore
  }
}

function addLeaderboardEntry(
  entries: LeaderboardEntry[],
  newEntry: LeaderboardEntry,
): LeaderboardEntry[] {
  const updated = [...entries, newEntry];
  // Sort: highest WPM first; tie-break by highest accuracy
  updated.sort((a, b) =>
    b.wpm !== a.wpm ? b.wpm - a.wpm : b.accuracy - a.accuracy,
  );
  // Keep top 10
  return updated.slice(0, 10);
}

interface Lesson {
  id: string;
  title: string;
  subtitle: string;
  keys: string;
  lines: string[];
  tip: string;
}

const LESSONS: Lesson[] = [
  {
    id: "home",
    title: "Home Row Keys",
    subtitle: "A S D F  —  J K L ;",
    keys: "A S D F G H J K L ;",
    lines: [
      "asdf jkl; asdf jkl; asdf jkl;",
      "fjdk slaf jfkd lafs fjdk slaf",
      "add fall sad lads flask flag",
      "alas flask dads falls asks lads",
      "glad half jack flask dads falls",
    ],
    tip: "Keep all eight fingers resting on the home row. Your left index finger rests on F and your right index finger rests on J — feel the raised bump on each key.",
  },
  {
    id: "top",
    title: "Top Row Keys",
    subtitle: "Q W E R T  —  Y U I O P",
    keys: "Q W E R T Y U I O P",
    lines: [
      "qwer uiop qwer uiop qwer uiop",
      "type quit wore pour riot true",
      "tower quite write power route",
      "poetry quote writer Europe trip",
      "your quiet power write tower",
    ],
    tip: "Reach up from the home row without moving your wrists. Return your fingers to home row after each keystroke.",
  },
  {
    id: "bottom",
    title: "Bottom Row Keys",
    subtitle: "Z X C V B  —  N M , . /",
    keys: "Z X C V B N M , . /",
    lines: [
      "zxcv nm,. zxcv nm,. zxcv nm,.",
      "zinc exam cave bomb next move",
      "bench zinc exam cave next move",
      "mix vex zinc cave bomb bench",
      "come next move bench zinc exam",
    ],
    tip: "Curl your fingers downward to reach the bottom row. Keep your thumbs lightly resting on the space bar.",
  },
];

// Practice Mode word/sentence/paragraph pools
const PRACTICE_WORDS = [
  "keyboard typing speed practice accuracy learning focus improve skill",
  "finger position home row touch type method train daily effort",
  "quick brown lazy dog jump over fence strong brave smart bold",
  "desk chair screen monitor mouse click drag scroll zoom copy paste",
  "document format print export save open close edit delete insert",
];

const PRACTICE_SENTENCES = [
  "Typing regularly helps improve both speed and accuracy.",
  "Keep your eyes on the screen and not the keyboard.",
  "Accuracy is more important than speed when learning.",
  "Touch typing is a skill that saves hours every week.",
  "Practice every day to build strong muscle memory.",
  "Focus on each word carefully before moving to the next.",
];

const PRACTICE_PARAGRAPHS = [
  "Typing is a very important skill in the digital world. Practicing every day helps improve speed, accuracy, and productivity.",
  "The home row is the foundation of touch typing. By keeping your fingers anchored on A S D F and J K L semicolon, your hands can reach every other key efficiently without looking down at the keyboard.",
  "Good typing habits start with the correct posture. Sit up straight, keep your wrists slightly elevated, and let your fingers rest lightly on the home row keys at all times.",
];

interface TypingTestPageProps {
  onBack?: () => void;
}

export default function TypingTestPage({ onBack }: TypingTestPageProps) {
  const [activeTab, setActiveTab] = useState<ActiveTab>("test");

  // --- Typing Test state ---
  const [duration, setDuration] = useState<TestDuration>(1);
  const [testState, setTestState] = useState<TestState>("idle");
  const [sampleText, setSampleText] = useState(SAMPLE_TEXTS[0]);
  const [typed, setTyped] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [mistakes, setMistakes] = useState(0);
  const [finalStats, setFinalStats] = useState<{
    wpm: number;
    accuracy: number;
    mistakes: number;
  } | null>(null);

  const [progress, setProgress] = useState<ProgressStats>(loadProgress);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // --- Leaderboard state ---
  const [leaderboard, setLeaderboard] =
    useState<LeaderboardEntry[]>(loadLeaderboard);
  const [playerName, setPlayerName] = useState("");
  const [scoreSubmitted, setScoreSubmitted] = useState(false);

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number>(0);
  const liveStatsRef = useRef({ wpm: 0, accuracy: 100, mistakes: 0 });

  // --- Learn Typing state ---
  const [selectedLesson, setSelectedLesson] = useState<Lesson>(LESSONS[0]);
  const [lessonTyped, setLessonTyped] = useState("");
  const [lessonLineIndex, setLessonLineIndex] = useState(0);

  // --- Practice Mode state ---
  const [practiceMode, setPracticeMode] = useState<
    "word" | "sentence" | "paragraph"
  >("word");
  const [practiceText, setPracticeText] = useState("");
  const [practiceTyped, setPracticeTyped] = useState("");
  const [practiceCorrect, setPracticeCorrect] = useState<boolean | null>(null);
  const [practiceWpm, setPracticeWpm] = useState(0);
  const [practiceAccuracy, setPracticeAccuracy] = useState(100);
  const [practiceMistakes, setPracticeMistakes] = useState(0);
  const practiceStartTimeRef = useRef<number>(0);
  const practiceRef = useRef<HTMLTextAreaElement>(null);

  // ---- Typing Test logic ----

  const calcStats = useCallback(
    (currentTyped: string, elapsed: number) => {
      const words = currentTyped.trim().split(/\s+/).filter(Boolean).length;
      const elapsedMinutes = elapsed / 60;
      const currentWpm =
        elapsedMinutes > 0 ? Math.round(words / elapsedMinutes) : 0;

      let errors = 0;
      for (let i = 0; i < currentTyped.length; i++) {
        if (currentTyped[i] !== sampleText[i]) errors++;
      }
      const acc =
        currentTyped.length > 0
          ? Math.max(
              0,
              Math.round(
                ((currentTyped.length - errors) / currentTyped.length) * 100,
              ),
            )
          : 100;

      setWpm(currentWpm);
      setAccuracy(acc);
      setMistakes(errors);
      liveStatsRef.current = {
        wpm: currentWpm,
        accuracy: acc,
        mistakes: errors,
      };
      return { wpm: currentWpm, accuracy: acc, mistakes: errors };
    },
    [sampleText],
  );

  const stopTest = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    const stats = { ...liveStatsRef.current };
    setFinalStats(stats);
    setTestState("finished");
    // Update progress tracking
    setProgress((prev) => {
      const updated: ProgressStats = {
        bestWpm: Math.max(prev.bestWpm, stats.wpm),
        totalWpm: prev.totalWpm + stats.wpm,
        testsCompleted: prev.testsCompleted + 1,
      };
      saveProgress(updated);
      return updated;
    });
  }, []);

  const startTest = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    const randomText =
      SAMPLE_TEXTS[Math.floor(Math.random() * SAMPLE_TEXTS.length)];
    setSampleText(randomText);
    setTyped("");
    setTimeLeft(duration * 60);
    setWpm(0);
    setAccuracy(100);
    setMistakes(0);
    setFinalStats(null);
    setScoreSubmitted(false);
    setPlayerName("");
    setTestState("running");
    startTimeRef.current = Date.now();
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  useEffect(() => {
    if (testState === "running") {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            stopTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [testState, stopTest]);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (testState !== "running") return;
    const value = e.target.value;
    setTyped(value);
    const elapsed = (Date.now() - startTimeRef.current) / 1000;
    calcStats(value, elapsed);
    if (value.length >= sampleText.length) {
      stopTest();
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return m > 0 ? `${m}:${s.toString().padStart(2, "0")}` : `${s}s`;
  };

  const renderColoredText = () =>
    sampleText.split("").map((char, i) => {
      let className = "text-slate-400";
      if (i < typed.length) {
        className = typed[i] === char ? "text-green-400" : "text-red-400";
      } else if (i === typed.length) {
        className = "text-white bg-blue-500/40 rounded";
      }
      return (
        // biome-ignore lint/suspicious/noArrayIndexKey: character-level render requires index key
        <span key={i} className={className}>
          {char}
        </span>
      );
    });

  const timerColor = timeLeft <= 10 ? "text-red-400" : "text-blue-400";

  // ---- Learn Typing logic ----

  const currentLine = selectedLesson.lines[lessonLineIndex];

  const renderLessonText = () =>
    currentLine.split("").map((char, i) => {
      let cls = "text-slate-400";
      if (i < lessonTyped.length) {
        cls =
          lessonTyped[i] === char
            ? "text-green-400"
            : "text-red-400 bg-red-900/30";
      } else if (i === lessonTyped.length) {
        cls = "text-white bg-blue-500/40 rounded";
      }
      return (
        // biome-ignore lint/suspicious/noArrayIndexKey: character-level render requires index key
        <span key={i} className={cls}>
          {char}
        </span>
      );
    });

  const handleLessonInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    // Only allow typing up to line length
    if (value.length > currentLine.length) return;
    setLessonTyped(value);
    // Auto-advance when line is completed correctly
    if (value === currentLine) {
      setTimeout(() => {
        if (lessonLineIndex < selectedLesson.lines.length - 1) {
          setLessonLineIndex((prev) => prev + 1);
          setLessonTyped("");
        } else {
          // Lesson complete — wrap back to first line
          setLessonLineIndex(0);
          setLessonTyped("");
        }
      }, 400);
    }
  };

  const selectLesson = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setLessonLineIndex(0);
    setLessonTyped("");
  };

  // ---- Practice Mode logic ----

  const generatePracticeText = (mode: "word" | "sentence" | "paragraph") => {
    if (mode === "word") {
      const shuffled = [...PRACTICE_WORDS].sort(() => Math.random() - 0.5);
      return shuffled.slice(0, 10).join(" ");
    }
    if (mode === "sentence") {
      return PRACTICE_SENTENCES[
        Math.floor(Math.random() * PRACTICE_SENTENCES.length)
      ];
    }
    return PRACTICE_PARAGRAPHS[
      Math.floor(Math.random() * PRACTICE_PARAGRAPHS.length)
    ];
  };

  const startPractice = (mode: "word" | "sentence" | "paragraph") => {
    setPracticeMode(mode);
    setPracticeText(generatePracticeText(mode));
    setPracticeTyped("");
    setPracticeCorrect(null);
    setPracticeWpm(0);
    setPracticeAccuracy(100);
    setPracticeMistakes(0);
    practiceStartTimeRef.current = 0;
    setTimeout(() => practiceRef.current?.focus(), 50);
  };

  const handlePracticeInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;

    // Record start time on first keystroke
    if (value.length === 1 && practiceStartTimeRef.current === 0) {
      practiceStartTimeRef.current = Date.now();
    }

    setPracticeTyped(value);

    // Live stats
    const elapsedSeconds =
      practiceStartTimeRef.current > 0
        ? (Date.now() - practiceStartTimeRef.current) / 1000
        : 1;
    const elapsedMinutes = elapsedSeconds / 60;
    const wordCount = value.trim().split(/\s+/).filter(Boolean).length;
    const liveWpm =
      elapsedMinutes > 0 ? Math.round(wordCount / elapsedMinutes) : 0;

    let errors = 0;
    for (let i = 0; i < value.length; i++) {
      if (value[i] !== practiceText[i]) errors++;
    }
    const liveAccuracy =
      value.length > 0
        ? Math.max(
            0,
            Math.round(((value.length - errors) / value.length) * 100),
          )
        : 100;

    setPracticeWpm(liveWpm);
    setPracticeAccuracy(liveAccuracy);
    setPracticeMistakes(errors);

    if (value.length >= practiceText.length) {
      setPracticeCorrect(value === practiceText);
    } else {
      setPracticeCorrect(null);
    }
  };

  const renderPracticeText = () =>
    practiceText.split("").map((char, i) => {
      let cls = "text-slate-400";
      if (i < practiceTyped.length) {
        cls =
          practiceTyped[i] === char
            ? "text-green-400"
            : "text-red-400 bg-red-900/30";
      } else if (i === practiceTyped.length) {
        cls = "text-white bg-blue-500/40 rounded";
      }
      return (
        // biome-ignore lint/suspicious/noArrayIndexKey: character-level render requires index key
        <span key={i} className={cls}>
          {char}
        </span>
      );
    });

  // ---- Keyboard key highlight ----
  const highlightKeys = (keyString: string) => {
    const keys = keyString.split(" ");
    return (
      <div className="flex flex-wrap gap-2 justify-center my-3">
        {keys.map((k) => (
          <span
            key={k}
            className="inline-flex items-center justify-center w-9 h-9 rounded-md bg-slate-700 border border-blue-500/50 text-blue-300 font-mono font-bold text-sm shadow-md"
          >
            {k}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Back button */}
        {onBack && (
          <button
            type="button"
            data-ocid="typing_test.secondary_button"
            onClick={onBack}
            className="mb-6 flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </button>
        )}

        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            ⌨️ Typing Master
          </h1>
          <p className="text-slate-300 text-sm">
            Test your speed, learn touch typing, and build muscle memory.
          </p>
        </div>

        {/* Progress Stats Panel */}
        <div className="mb-6">
          <div
            data-ocid="typing_test.progress.panel"
            className="grid grid-cols-3 gap-3 mb-2"
          >
            {[
              {
                label: "Best WPM",
                value: progress.bestWpm,
                color: "text-green-400",
                ocid: "typing_test.best_wpm.card",
              },
              {
                label: "Avg WPM",
                value:
                  progress.testsCompleted > 0
                    ? Math.round(progress.totalWpm / progress.testsCompleted)
                    : 0,
                color: "text-blue-400",
                ocid: "typing_test.avg_wpm.card",
              },
              {
                label: "Tests Done",
                value: progress.testsCompleted,
                color: "text-yellow-400",
                ocid: "typing_test.tests_done.card",
              },
            ].map((s) => (
              <div
                key={s.label}
                data-ocid={s.ocid}
                className="bg-slate-800/70 border border-slate-700 rounded-xl py-3 px-2 text-center"
              >
                <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
                <div className="text-slate-400 text-xs mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              data-ocid="typing_test.reset_stats.button"
              onClick={() => setShowResetConfirm(true)}
              className="text-xs text-slate-500 hover:text-red-400 transition-colors px-2 py-1 rounded border border-transparent hover:border-red-400/30"
            >
              Reset Stats
            </button>
          </div>

          {/* Reset Confirmation Dialog */}
          {showResetConfirm && (
            <div
              data-ocid="typing_test.reset_stats.dialog"
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
            >
              <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 w-full max-w-sm shadow-2xl">
                <h2 className="text-white font-bold text-lg mb-2 text-center">
                  Reset Statistics
                </h2>
                <p className="text-slate-300 text-sm text-center mb-6">
                  Are you sure you want to reset your typing statistics?
                </p>
                <div className="flex gap-3 justify-center">
                  <button
                    type="button"
                    data-ocid="typing_test.reset_stats.cancel_button"
                    onClick={() => setShowResetConfirm(false)}
                    className="flex-1 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2.5 rounded-lg font-semibold text-sm transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    data-ocid="typing_test.reset_stats.confirm_button"
                    onClick={() => {
                      localStorage.removeItem(PROGRESS_KEY);
                      const reset: ProgressStats = {
                        bestWpm: 0,
                        totalWpm: 0,
                        testsCompleted: 0,
                      };
                      setProgress(reset);
                      setShowResetConfirm(false);
                    }}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-lg font-semibold text-sm transition-colors"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center gap-2 mb-8">
          {(["test", "learn", "practice"] as ActiveTab[]).map((tab) => {
            const labels: Record<ActiveTab, string> = {
              test: "Typing Test",
              learn: "Learn Typing",
              practice: "Practice Mode",
            };
            return (
              <button
                key={tab}
                type="button"
                data-ocid={`typing_test.${tab}.tab`}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-lg font-semibold text-sm transition-all duration-200 ${
                  activeTab === tab
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                    : "bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white"
                }`}
              >
                {labels[tab]}
              </button>
            );
          })}
        </div>

        {/* ===== TYPING TEST TAB ===== */}
        {activeTab === "test" && (
          <>
            {/* Duration Selector */}
            <div className="flex justify-center gap-3 mb-8">
              {([1, 3, 5] as TestDuration[]).map((d) => (
                <button
                  type="button"
                  key={d}
                  data-ocid="typing_test.duration.tab"
                  onClick={() => {
                    if (testState !== "running") {
                      setDuration(d);
                      setTimeLeft(d * 60);
                      setTestState("idle");
                      setTyped("");
                      setWpm(0);
                      setAccuracy(100);
                      setMistakes(0);
                      setFinalStats(null);
                    }
                  }}
                  className={`px-6 py-2 rounded-lg font-semibold text-sm transition-all duration-200 ${
                    duration === d
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                      : "bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white"
                  } ${testState === "running" ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                >
                  {d} min
                </button>
              ))}
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-4 gap-3 mb-6">
              {[
                {
                  label: "Time",
                  value: formatTime(timeLeft),
                  color: timerColor,
                },
                { label: "WPM", value: String(wpm), color: "text-green-400" },
                {
                  label: "Accuracy",
                  value: `${accuracy}%`,
                  color: "text-yellow-400",
                },
                {
                  label: "Mistakes",
                  value: String(mistakes),
                  color: "text-red-400",
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-slate-800 border border-slate-700 rounded-xl py-3 px-2 text-center"
                >
                  <div className={`text-2xl font-bold ${stat.color}`}>
                    {stat.value}
                  </div>
                  <div className="text-slate-400 text-xs mt-0.5">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Text Display */}
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 mb-4 text-base leading-8 tracking-wide font-mono select-none break-words min-h-[96px]">
              {testState === "idle" ? (
                <span className="text-slate-500 italic text-sm">
                  Press "Start Test" to begin. The typing text will appear here.
                </span>
              ) : (
                renderColoredText()
              )}
            </div>

            {/* Input Area */}
            {testState === "running" && (
              <textarea
                ref={inputRef}
                data-ocid="typing_test.textarea"
                value={typed}
                onChange={handleInput}
                rows={3}
                placeholder="Start typing here..."
                className="w-full bg-slate-900 border border-slate-600 focus:border-blue-500 rounded-xl text-white text-base p-4 resize-none outline-none transition-colors font-mono mb-4"
              />
            )}

            {/* Result Screen */}
            {testState === "finished" && finalStats && (
              <div className="bg-slate-800 border border-green-500/30 rounded-xl p-6 mb-4 text-center">
                <div className="flex justify-center mb-3">
                  <CheckCircle className="w-10 h-10 text-green-400" />
                </div>
                <h2 className="text-xl font-bold text-white mb-4">
                  Test Complete!
                </h2>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <div className="text-3xl font-bold text-green-400">
                      {finalStats.wpm}
                    </div>
                    <div className="text-slate-400 text-sm">WPM</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-yellow-400">
                      {finalStats.accuracy}%
                    </div>
                    <div className="text-slate-400 text-sm">Accuracy</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-red-400">
                      {finalStats.mistakes}
                    </div>
                    <div className="text-slate-400 text-sm">Mistakes</div>
                  </div>
                </div>
                <p className="text-slate-300 text-sm mb-5">
                  {finalStats.wpm >= 60
                    ? "Excellent speed! You're a proficient typist."
                    : finalStats.wpm >= 40
                      ? "Good job! Keep practicing to increase your speed."
                      : "Keep practicing — consistent effort will improve your speed."}
                </p>

                {/* Submit Score to Leaderboard */}
                {!scoreSubmitted ? (
                  <div className="mt-2">
                    <p className="text-slate-300 text-sm mb-3">
                      Enter your name to save your score to the leaderboard:
                    </p>
                    <div className="flex gap-2 justify-center flex-wrap">
                      <input
                        type="text"
                        data-ocid="leaderboard.name.input"
                        value={playerName}
                        onChange={(e) =>
                          setPlayerName(e.target.value.slice(0, 30))
                        }
                        placeholder="Your name..."
                        maxLength={30}
                        className="bg-slate-900 border border-slate-600 focus:border-blue-500 rounded-lg text-white text-sm px-4 py-2.5 outline-none transition-colors w-52"
                      />
                      <button
                        type="button"
                        data-ocid="leaderboard.submit.primary_button"
                        disabled={!playerName.trim()}
                        onClick={() => {
                          if (!playerName.trim() || !finalStats) return;
                          const entry: LeaderboardEntry = {
                            name: playerName.trim(),
                            wpm: finalStats.wpm,
                            accuracy: finalStats.accuracy,
                            date: new Date().toLocaleDateString("en-IN", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }),
                          };
                          const updated = addLeaderboardEntry(
                            leaderboard,
                            entry,
                          );
                          setLeaderboard(updated);
                          saveLeaderboard(updated);
                          setScoreSubmitted(true);
                        }}
                        className="bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white px-5 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200"
                      >
                        Submit Score
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="mt-2 text-green-400 text-sm font-semibold">
                    ✓ Score saved to leaderboard!
                  </div>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-center gap-3">
              {testState === "idle" && (
                <button
                  type="button"
                  data-ocid="typing_test.primary_button"
                  onClick={startTest}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/20"
                >
                  Start Test
                </button>
              )}
              {testState === "running" && (
                <button
                  type="button"
                  data-ocid="typing_test.stop_button"
                  onClick={stopTest}
                  className="bg-red-600 hover:bg-red-700 text-white px-10 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" /> Stop
                </button>
              )}
              {testState === "finished" && (
                <button
                  type="button"
                  data-ocid="typing_test.primary_button"
                  onClick={startTest}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" /> Try Again
                </button>
              )}
            </div>

            {/* Leaderboard Table */}
            <div
              data-ocid="leaderboard.section"
              className="mt-10 bg-slate-800 border border-slate-700 rounded-xl overflow-hidden"
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-slate-700">
                <h3 className="text-white font-bold text-base">
                  🏆 Leaderboard — Top 10
                </h3>
                {leaderboard.length > 0 && (
                  <button
                    type="button"
                    data-ocid="leaderboard.clear.delete_button"
                    onClick={() => {
                      if (
                        window.confirm(
                          "Clear all leaderboard entries? This cannot be undone.",
                        )
                      ) {
                        setLeaderboard([]);
                        saveLeaderboard([]);
                      }
                    }}
                    className="text-xs text-slate-500 hover:text-red-400 transition-colors px-2 py-1 rounded border border-transparent hover:border-red-400/30"
                  >
                    Clear
                  </button>
                )}
              </div>

              {leaderboard.length === 0 ? (
                <div
                  data-ocid="leaderboard.empty_state"
                  className="px-5 py-10 text-center text-slate-500 text-sm"
                >
                  No scores yet. Complete a test and submit your name to appear
                  here.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table
                    data-ocid="leaderboard.table"
                    className="w-full text-sm"
                  >
                    <thead>
                      <tr className="bg-slate-900/60 text-slate-400 text-xs uppercase tracking-wider">
                        <th className="px-4 py-3 text-center w-12">Rank</th>
                        <th className="px-4 py-3 text-left">Name</th>
                        <th className="px-4 py-3 text-center">WPM</th>
                        <th className="px-4 py-3 text-center">Accuracy</th>
                        <th className="px-4 py-3 text-center">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leaderboard.map((entry, index) => {
                        const rankColors = [
                          "text-yellow-400",
                          "text-slate-300",
                          "text-amber-600",
                        ];
                        const rankEmojis = ["🥇", "🥈", "🥉"];
                        const rankDisplay =
                          index < 3 ? (
                            <span className={rankColors[index]}>
                              {rankEmojis[index]}
                            </span>
                          ) : (
                            <span className="text-slate-500">{index + 1}</span>
                          );
                        return (
                          <tr
                            // biome-ignore lint/suspicious/noArrayIndexKey: leaderboard rows are ordered by rank position
                            key={index}
                            data-ocid={`leaderboard.row.${index + 1}`}
                            className={`border-t border-slate-700/50 transition-colors ${
                              index === 0
                                ? "bg-yellow-500/5"
                                : "hover:bg-slate-700/30"
                            }`}
                          >
                            <td className="px-4 py-3 text-center font-bold">
                              {rankDisplay}
                            </td>
                            <td className="px-4 py-3 text-white font-medium max-w-[140px] truncate">
                              {entry.name}
                            </td>
                            <td className="px-4 py-3 text-center text-green-400 font-bold">
                              {entry.wpm}
                            </td>
                            <td className="px-4 py-3 text-center text-yellow-400">
                              {entry.accuracy}%
                            </td>
                            <td className="px-4 py-3 text-center text-slate-400 text-xs">
                              {entry.date}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Tips */}
            {testState === "idle" && (
              <div className="mt-10 bg-slate-800/50 border border-slate-700 rounded-xl p-5">
                <h3 className="text-white font-semibold mb-3 text-sm">
                  Tips to improve typing speed
                </h3>
                <ul className="space-y-1.5 text-slate-400 text-sm">
                  <li>
                    • Keep your fingers on the home row keys (A S D F — J K L ;)
                  </li>
                  <li>
                    • Focus on accuracy first — speed comes naturally with
                    practice
                  </li>
                  <li>• Do not look at the keyboard while typing</li>
                  <li>• Practice for at least 10–15 minutes daily</li>
                </ul>
              </div>
            )}
          </>
        )}

        {/* ===== LEARN TYPING TAB ===== */}
        {activeTab === "learn" && (
          <div>
            {/* Lesson Selector */}
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              {LESSONS.map((lesson) => (
                <button
                  key={lesson.id}
                  type="button"
                  data-ocid={`learn_typing.${lesson.id}.tab`}
                  onClick={() => selectLesson(lesson)}
                  className={`px-5 py-2 rounded-lg font-semibold text-sm transition-all duration-200 ${
                    selectedLesson.id === lesson.id
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                      : "bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white"
                  }`}
                >
                  {lesson.title}
                </button>
              ))}
            </div>

            {/* Lesson Card */}
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 mb-5">
              <div className="text-center mb-4">
                <h2 className="text-xl font-bold text-white mb-1">
                  {selectedLesson.title}
                </h2>
                <p className="text-blue-300 font-mono text-sm">
                  {selectedLesson.subtitle}
                </p>
              </div>

              {/* Key Highlights */}
              {highlightKeys(selectedLesson.keys)}

              {/* Progress */}
              <div className="flex justify-center gap-1 mb-4 mt-2">
                {selectedLesson.lines.map((line, i) => (
                  <span
                    key={line}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      i < lessonLineIndex
                        ? "bg-green-400"
                        : i === lessonLineIndex
                          ? "bg-blue-400"
                          : "bg-slate-600"
                    }`}
                  />
                ))}
              </div>

              {/* Practice Line Display */}
              <div className="bg-slate-900 border border-slate-600 rounded-lg p-4 mb-4 font-mono text-lg leading-8 tracking-widest text-center select-none min-h-[56px]">
                {renderLessonText()}
              </div>

              {/* Typing Input */}
              <textarea
                key={`${selectedLesson.id}-${lessonLineIndex}`}
                data-ocid="learn_typing.textarea"
                value={lessonTyped}
                onChange={handleLessonInput}
                rows={2}
                placeholder="Type the text above..."
                className="w-full bg-slate-900 border border-slate-600 focus:border-blue-500 rounded-xl text-white text-base p-4 resize-none outline-none transition-colors font-mono"
              />

              {/* Feedback */}
              {lessonTyped.length > 0 && (
                <div className="mt-3 text-center text-sm">
                  {lessonTyped === currentLine ? (
                    <span className="text-green-400 font-semibold">
                      ✓ Line complete! Moving to next line...
                    </span>
                  ) : (
                    <span className="text-slate-400">
                      {lessonTyped.length} / {currentLine.length} characters
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Tip Box */}
            <div className="bg-slate-800/50 border border-blue-500/20 rounded-xl p-4">
              <p className="text-slate-300 text-sm leading-relaxed">
                <span className="text-blue-400 font-semibold">Tip: </span>
                {selectedLesson.tip}
              </p>
            </div>
          </div>
        )}

        {/* ===== PRACTICE MODE TAB ===== */}
        {activeTab === "practice" && (
          <div>
            {/* Mode Selector */}
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              {(["word", "sentence", "paragraph"] as const).map((mode) => {
                const labels = {
                  word: "Words",
                  sentence: "Sentences",
                  paragraph: "Paragraph",
                };
                return (
                  <button
                    key={mode}
                    type="button"
                    data-ocid={`practice.${mode}.tab`}
                    onClick={() => startPractice(mode)}
                    className={`px-6 py-2 rounded-lg font-semibold text-sm transition-all duration-200 ${
                      practiceMode === mode && practiceText
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                        : "bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white"
                    }`}
                  >
                    {labels[mode]}
                  </button>
                );
              })}
            </div>

            {practiceText ? (
              <>
                {/* Live Stats Bar */}
                <div className="grid grid-cols-3 gap-3 mb-5">
                  {[
                    {
                      label: "WPM",
                      value: String(practiceWpm),
                      color: "text-green-400",
                    },
                    {
                      label: "Accuracy",
                      value: `${practiceAccuracy}%`,
                      color: "text-yellow-400",
                    },
                    {
                      label: "Mistakes",
                      value: String(practiceMistakes),
                      color: "text-red-400",
                    },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="bg-slate-800 border border-slate-700 rounded-xl py-3 px-2 text-center"
                    >
                      <div className={`text-2xl font-bold ${stat.color}`}>
                        {stat.value}
                      </div>
                      <div className="text-slate-400 text-xs mt-0.5">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Practice Text Display */}
                <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 mb-4 font-mono text-base leading-8 tracking-wide select-none break-words min-h-[80px]">
                  {renderPracticeText()}
                </div>

                {/* Input */}
                <textarea
                  ref={practiceRef}
                  data-ocid="practice.textarea"
                  value={practiceTyped}
                  onChange={handlePracticeInput}
                  rows={3}
                  placeholder="Start typing here..."
                  className="w-full bg-slate-900 border border-slate-600 focus:border-blue-500 rounded-xl text-white text-base p-4 resize-none outline-none transition-colors font-mono mb-4"
                />

                {/* Result Feedback */}
                {practiceCorrect !== null && (
                  <div
                    className={`rounded-xl p-4 mb-4 text-center font-semibold text-sm ${
                      practiceCorrect
                        ? "bg-green-900/30 border border-green-500/30 text-green-400"
                        : "bg-red-900/20 border border-red-500/20 text-red-400"
                    }`}
                  >
                    {practiceCorrect
                      ? "✓ Perfect! Well done."
                      : "✗ There are some errors. Check highlighted characters."}
                  </div>
                )}

                {/* Next button */}
                <div className="flex justify-center">
                  <button
                    type="button"
                    data-ocid="practice.primary_button"
                    onClick={() => startPractice(practiceMode)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" /> Next
                  </button>
                </div>
              </>
            ) : (
              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-10 text-center text-slate-400 text-sm">
                Select a practice mode above to begin.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
