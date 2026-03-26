import { c as createLucideIcon, r as reactExports, t as trackTypingTestComplete, j as jsxRuntimeExports, a as trackLeaderboardSubmission, b as trackCertificateGenerated, d as trackTypingTestStart, e as trackCertificateShared, f as trackShareClicked } from "./index-BFVPq1mW.js";
import { B as BreadcrumbSchema } from "./BreadcrumbSchema-DJGqVWYd.js";
import { S as SEO } from "./SEO-B1UZw1Ql.js";
import { T as TypingInternalLinks, a as TypingFAQ } from "./TypingInternalLinks-C_8L56vS.js";
import { u as updateTypingProgress } from "./typingProgress-CQm7G-tq.js";
import { A as ArrowLeft } from "./arrow-left-ByehoCcW.js";
import { C as CircleCheckBig } from "./circle-check-big-ChSD8Z6F.js";
import { A as Award } from "./award-CXhz2WwS.js";
import { R as RotateCcw } from "./rotate-ccw-CIFpfncy.js";
import { D as Download } from "./download-BN8DLBPc.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "18", cy: "5", r: "3", key: "gq8acd" }],
  ["circle", { cx: "6", cy: "12", r: "3", key: "w7nqdw" }],
  ["circle", { cx: "18", cy: "19", r: "3", key: "1xt0gg" }],
  ["line", { x1: "8.59", x2: "15.42", y1: "13.51", y2: "17.49", key: "47mynk" }],
  ["line", { x1: "15.41", x2: "8.59", y1: "6.51", y2: "10.49", key: "1n3mei" }]
];
const Share2 = createLucideIcon("share-2", __iconNode);
const SAMPLE_TEXTS = [
  "The quick brown fox jumps over the lazy dog. Practice makes perfect and consistent effort leads to improvement over time. Keep typing to build your speed and accuracy.",
  "Typing speed improves with daily practice. Focus on accuracy first and speed will follow naturally as your fingers learn the position of every key on the keyboard.",
  "A good typist does not look at the keyboard while typing. Train your muscle memory and your speed will increase significantly over a few weeks of consistent practice.",
  "Technology has changed the way we communicate today. Fast and accurate typing is now an essential skill for every professional working in any field or industry.",
  "The internet has connected billions of people around the world. Information travels at the speed of light and communication has never been easier or more accessible.",
  "Document processing tools help you work smarter and faster. From converting files to resizing images, the right tools make complex tasks simple and quick to complete."
];
const PROGRESS_KEY = "typingmaster_progress";
function loadProgress() {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
  }
  return { bestWpm: 0, totalWpm: 0, testsCompleted: 0 };
}
function saveProgress(stats) {
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(stats));
  } catch {
  }
}
const CERTIFICATES_KEY = "typingmaster_certificates";
const CERT_COUNTER_KEY = "typingmaster_cert_counter";
function generateCertificateId() {
  try {
    const year = (/* @__PURE__ */ new Date()).getFullYear();
    const raw = localStorage.getItem(CERT_COUNTER_KEY);
    const counter = raw ? Number.parseInt(raw, 10) + 1 : 1;
    localStorage.setItem(CERT_COUNTER_KEY, String(counter));
    const padded = String(counter).padStart(6, "0");
    return `DMT-${year}-${padded}`;
  } catch {
    return `DMT-${(/* @__PURE__ */ new Date()).getFullYear()}-${Date.now().toString().slice(-6)}`;
  }
}
function saveCertificate(record) {
  try {
    const raw = localStorage.getItem(CERTIFICATES_KEY);
    const existing = raw ? JSON.parse(raw) : [];
    existing.push(record);
    localStorage.setItem(CERTIFICATES_KEY, JSON.stringify(existing));
  } catch {
  }
}
const LEADERBOARD_KEY = "typingmaster_leaderboard";
function loadLeaderboard() {
  try {
    const raw = localStorage.getItem(LEADERBOARD_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
  }
  return [];
}
function saveLeaderboard(entries) {
  try {
    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(entries));
  } catch {
  }
}
function addLeaderboardEntry(entries, newEntry) {
  const updated = [...entries, newEntry];
  updated.sort(
    (a, b) => b.wpm !== a.wpm ? b.wpm - a.wpm : b.accuracy - a.accuracy
  );
  return updated.slice(0, 10);
}
const LESSONS = [
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
      "glad half jack flask dads falls"
    ],
    tip: "Keep all eight fingers resting on the home row. Your left index finger rests on F and your right index finger rests on J — feel the raised bump on each key."
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
      "your quiet power write tower"
    ],
    tip: "Reach up from the home row without moving your wrists. Return your fingers to home row after each keystroke."
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
      "come next move bench zinc exam"
    ],
    tip: "Curl your fingers downward to reach the bottom row. Keep your thumbs lightly resting on the space bar."
  }
];
const PRACTICE_WORDS = [
  "keyboard typing speed practice accuracy learning focus improve skill",
  "finger position home row touch type method train daily effort",
  "quick brown lazy dog jump over fence strong brave smart bold",
  "desk chair screen monitor mouse click drag scroll zoom copy paste",
  "document format print export save open close edit delete insert"
];
const PRACTICE_SENTENCES = [
  "Typing regularly helps improve both speed and accuracy.",
  "Keep your eyes on the screen and not the keyboard.",
  "Accuracy is more important than speed when learning.",
  "Touch typing is a skill that saves hours every week.",
  "Practice every day to build strong muscle memory.",
  "Focus on each word carefully before moving to the next."
];
const PRACTICE_PARAGRAPHS = [
  "Typing is a very important skill in the digital world. Practicing every day helps improve speed, accuracy, and productivity.",
  "The home row is the foundation of touch typing. By keeping your fingers anchored on A S D F and J K L semicolon, your hands can reach every other key efficiently without looking down at the keyboard.",
  "Good typing habits start with the correct posture. Sit up straight, keep your wrists slightly elevated, and let your fingers rest lightly on the home row keys at all times."
];
const TYPING_TEST_FAQS = [
  {
    q: "How does the typing test work?",
    a: "Click Start Test, select your duration (1, 3, or 5 minutes), and type the displayed text. Your WPM, accuracy, and mistakes are tracked live."
  },
  {
    q: "What is the Learn Typing tab?",
    a: "The Learn Typing tab provides structured keyboard lessons including Home Row, Top Row, and Bottom Row drills with live accuracy feedback."
  },
  {
    q: "Can I generate a typing certificate?",
    a: "Yes. After completing a test, click Generate Typing Certificate, enter your name, and download your certificate as a PNG."
  },
  {
    q: "How is my progress tracked?",
    a: "Your best WPM, average WPM, and total tests are stored in your browser. The stats panel at the top updates after each completed test."
  },
  {
    q: "What is the typing leaderboard?",
    a: "The leaderboard shows the top 10 scores from all tests taken in your browser session, sorted by WPM."
  }
];
function TypingTestPage({
  onBack,
  onNavigate
}) {
  const [activeTab, setActiveTab] = reactExports.useState("test");
  const [duration, setDuration] = reactExports.useState(1);
  const [testState, setTestState] = reactExports.useState("idle");
  const [sampleText, setSampleText] = reactExports.useState(SAMPLE_TEXTS[0]);
  const [typed, setTyped] = reactExports.useState("");
  const [timeLeft, setTimeLeft] = reactExports.useState(60);
  const [wpm, setWpm] = reactExports.useState(0);
  const [accuracy, setAccuracy] = reactExports.useState(100);
  const [mistakes, setMistakes] = reactExports.useState(0);
  const [finalStats, setFinalStats] = reactExports.useState(null);
  const [progress, setProgress] = reactExports.useState(loadProgress);
  const [showResetConfirm, setShowResetConfirm] = reactExports.useState(false);
  const [leaderboard, setLeaderboard] = reactExports.useState(loadLeaderboard);
  const [playerName, setPlayerName] = reactExports.useState("");
  const [scoreSubmitted, setScoreSubmitted] = reactExports.useState(false);
  const [showCertificate, setShowCertificate] = reactExports.useState(false);
  const [certName, setCertName] = reactExports.useState("");
  const [certId, setCertId] = reactExports.useState("");
  const [shareToastVisible, setShareToastVisible] = reactExports.useState(false);
  const [showSharePanel, setShowSharePanel] = reactExports.useState(false);
  const certRef = reactExports.useRef(null);
  const inputRef = reactExports.useRef(null);
  const timerRef = reactExports.useRef(null);
  const startTimeRef = reactExports.useRef(0);
  const liveStatsRef = reactExports.useRef({ wpm: 0, accuracy: 100, mistakes: 0 });
  const [selectedLesson, setSelectedLesson] = reactExports.useState(LESSONS[0]);
  const [lessonTyped, setLessonTyped] = reactExports.useState("");
  const [lessonLineIndex, setLessonLineIndex] = reactExports.useState(0);
  const [practiceMode, setPracticeMode] = reactExports.useState("word");
  const [practiceText, setPracticeText] = reactExports.useState("");
  const [practiceTyped, setPracticeTyped] = reactExports.useState("");
  const [practiceCorrect, setPracticeCorrect] = reactExports.useState(null);
  const [practiceWpm, setPracticeWpm] = reactExports.useState(0);
  const [practiceAccuracy, setPracticeAccuracy] = reactExports.useState(100);
  const [practiceMistakes, setPracticeMistakes] = reactExports.useState(0);
  const practiceStartTimeRef = reactExports.useRef(0);
  const practiceRef = reactExports.useRef(null);
  const calcStats = reactExports.useCallback(
    (currentTyped, elapsed) => {
      const words = currentTyped.trim().split(/\s+/).filter(Boolean).length;
      const elapsedMinutes = elapsed / 60;
      const currentWpm = elapsedMinutes > 0 ? Math.round(words / elapsedMinutes) : 0;
      let errors = 0;
      for (let i = 0; i < currentTyped.length; i++) {
        if (currentTyped[i] !== sampleText[i]) errors++;
      }
      const acc = currentTyped.length > 0 ? Math.max(
        0,
        Math.round(
          (currentTyped.length - errors) / currentTyped.length * 100
        )
      ) : 100;
      setWpm(currentWpm);
      setAccuracy(acc);
      setMistakes(errors);
      liveStatsRef.current = {
        wpm: currentWpm,
        accuracy: acc,
        mistakes: errors
      };
      return { wpm: currentWpm, accuracy: acc, mistakes: errors };
    },
    [sampleText]
  );
  const stopTest = reactExports.useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    const stats = { ...liveStatsRef.current };
    setFinalStats(stats);
    setTestState("finished");
    setProgress((prev) => {
      const updated = {
        bestWpm: Math.max(prev.bestWpm, stats.wpm),
        totalWpm: prev.totalWpm + stats.wpm,
        testsCompleted: prev.testsCompleted + 1
      };
      saveProgress(updated);
      return updated;
    });
    updateTypingProgress(stats.wpm, duration * 60);
    trackTypingTestComplete({
      testDuration: duration,
      wpm: stats.wpm,
      accuracy: stats.accuracy,
      mistakes: stats.mistakes
    });
  }, [duration]);
  const startTest = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    const randomText = SAMPLE_TEXTS[Math.floor(Math.random() * SAMPLE_TEXTS.length)];
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
    trackTypingTestStart(duration);
    setTimeout(() => {
      var _a;
      return (_a = inputRef.current) == null ? void 0 : _a.focus();
    }, 50);
  };
  reactExports.useEffect(() => {
    if (testState === "running") {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            stopTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1e3);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [testState, stopTest]);
  const handleInput = (e) => {
    if (testState !== "running") return;
    const value = e.target.value;
    setTyped(value);
    const elapsed = (Date.now() - startTimeRef.current) / 1e3;
    calcStats(value, elapsed);
    if (value.length >= sampleText.length) {
      stopTest();
    }
  };
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return m > 0 ? `${m}:${s.toString().padStart(2, "0")}` : `${s}s`;
  };
  const renderColoredText = () => sampleText.split("").map((char, i) => {
    let className = "text-slate-400";
    if (i < typed.length) {
      className = typed[i] === char ? "text-green-400" : "text-red-400";
    } else if (i === typed.length) {
      className = "text-white bg-blue-500/40 rounded";
    }
    return (
      // biome-ignore lint/suspicious/noArrayIndexKey: character-level render requires index key
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className, children: char }, i)
    );
  });
  const timerColor = timeLeft <= 10 ? "text-red-400" : "text-blue-400";
  const currentLine = selectedLesson.lines[lessonLineIndex];
  const renderLessonText = () => currentLine.split("").map((char, i) => {
    let cls = "text-slate-400";
    if (i < lessonTyped.length) {
      cls = lessonTyped[i] === char ? "text-green-400" : "text-red-400 bg-red-900/30";
    } else if (i === lessonTyped.length) {
      cls = "text-white bg-blue-500/40 rounded";
    }
    return (
      // biome-ignore lint/suspicious/noArrayIndexKey: character-level render requires index key
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cls, children: char }, i)
    );
  });
  const handleLessonInput = (e) => {
    const value = e.target.value;
    if (value.length > currentLine.length) return;
    setLessonTyped(value);
    if (value === currentLine) {
      setTimeout(() => {
        if (lessonLineIndex < selectedLesson.lines.length - 1) {
          setLessonLineIndex((prev) => prev + 1);
          setLessonTyped("");
        } else {
          setLessonLineIndex(0);
          setLessonTyped("");
        }
      }, 400);
    }
  };
  const selectLesson = (lesson) => {
    setSelectedLesson(lesson);
    setLessonLineIndex(0);
    setLessonTyped("");
  };
  const generatePracticeText = (mode) => {
    if (mode === "word") {
      const shuffled = [...PRACTICE_WORDS].sort(() => Math.random() - 0.5);
      return shuffled.slice(0, 10).join(" ");
    }
    if (mode === "sentence") {
      return PRACTICE_SENTENCES[Math.floor(Math.random() * PRACTICE_SENTENCES.length)];
    }
    return PRACTICE_PARAGRAPHS[Math.floor(Math.random() * PRACTICE_PARAGRAPHS.length)];
  };
  const startPractice = (mode) => {
    setPracticeMode(mode);
    setPracticeText(generatePracticeText(mode));
    setPracticeTyped("");
    setPracticeCorrect(null);
    setPracticeWpm(0);
    setPracticeAccuracy(100);
    setPracticeMistakes(0);
    practiceStartTimeRef.current = 0;
    setTimeout(() => {
      var _a;
      return (_a = practiceRef.current) == null ? void 0 : _a.focus();
    }, 50);
  };
  const handlePracticeInput = (e) => {
    const value = e.target.value;
    if (value.length === 1 && practiceStartTimeRef.current === 0) {
      practiceStartTimeRef.current = Date.now();
    }
    setPracticeTyped(value);
    const elapsedSeconds = practiceStartTimeRef.current > 0 ? (Date.now() - practiceStartTimeRef.current) / 1e3 : 1;
    const elapsedMinutes = elapsedSeconds / 60;
    const wordCount = value.trim().split(/\s+/).filter(Boolean).length;
    const liveWpm = elapsedMinutes > 0 ? Math.round(wordCount / elapsedMinutes) : 0;
    let errors = 0;
    for (let i = 0; i < value.length; i++) {
      if (value[i] !== practiceText[i]) errors++;
    }
    const liveAccuracy = value.length > 0 ? Math.max(
      0,
      Math.round((value.length - errors) / value.length * 100)
    ) : 100;
    setPracticeWpm(liveWpm);
    setPracticeAccuracy(liveAccuracy);
    setPracticeMistakes(errors);
    if (value.length >= practiceText.length) {
      setPracticeCorrect(value === practiceText);
    } else {
      setPracticeCorrect(null);
    }
  };
  const renderPracticeText = () => practiceText.split("").map((char, i) => {
    let cls = "text-slate-400";
    if (i < practiceTyped.length) {
      cls = practiceTyped[i] === char ? "text-green-400" : "text-red-400 bg-red-900/30";
    } else if (i === practiceTyped.length) {
      cls = "text-white bg-blue-500/40 rounded";
    }
    return (
      // biome-ignore lint/suspicious/noArrayIndexKey: character-level render requires index key
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cls, children: char }, i)
    );
  });
  const downloadCertificate = async () => {
    const node = certRef.current;
    if (!node || !finalStats) return;
    const canvas = document.createElement("canvas");
    const scale = 2;
    const W = 800;
    const H = 560;
    canvas.width = W * scale;
    canvas.height = H * scale;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(scale, scale);
    const grad = ctx.createLinearGradient(0, 0, W, H);
    grad.addColorStop(0, "#0f2027");
    grad.addColorStop(0.45, "#203a43");
    grad.addColorStop(1, "#2c5364");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);
    const vignette = ctx.createRadialGradient(
      W / 2,
      H / 2,
      H * 0.2,
      W / 2,
      H / 2,
      W * 0.85
    );
    vignette.addColorStop(0, "rgba(0,0,0,0)");
    vignette.addColorStop(1, "rgba(0,0,0,0.55)");
    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, W, H);
    const titleGlow = ctx.createRadialGradient(W / 2, 150, 0, W / 2, 150, 260);
    titleGlow.addColorStop(0, "rgba(79,156,255,0.14)");
    titleGlow.addColorStop(1, "rgba(79,156,255,0)");
    ctx.fillStyle = titleGlow;
    ctx.fillRect(0, 0, W, H);
    ctx.save();
    ctx.translate(W / 2, H / 2);
    ctx.rotate(-20 * Math.PI / 180);
    ctx.font = "bold 72px 'Segoe UI', Arial, sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.06)";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("DocMasterTools.com", 0, 0);
    ctx.restore();
    ctx.shadowColor = "#4f9cff";
    ctx.shadowBlur = 18;
    ctx.strokeStyle = "rgba(79,156,255,0.35)";
    ctx.lineWidth = 10;
    ctx.strokeRect(12, 12, W - 24, H - 24);
    ctx.shadowBlur = 0;
    ctx.strokeStyle = "#4f9cff";
    ctx.lineWidth = 2;
    ctx.strokeRect(18, 18, W - 36, H - 36);
    const drawCorner = (x, y, dx, dy) => {
      ctx.strokeStyle = "#60a5fa";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x + dx * 40, y);
      ctx.lineTo(x, y);
      ctx.lineTo(x, y + dy * 40);
      ctx.stroke();
    };
    drawCorner(32, 32, 1, 1);
    drawCorner(W - 32, 32, -1, 1);
    drawCorner(32, H - 32, 1, -1);
    drawCorner(W - 32, H - 32, -1, -1);
    ctx.fillStyle = "#60a5fa";
    ctx.font = "bold 14px 'Segoe UI', Arial, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("DocMasterTools.com", W / 2, 68);
    ctx.font = "44px serif";
    ctx.fillText("🏆", W / 2, 128);
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 32px 'Segoe UI', Arial, sans-serif";
    ctx.fillText("Certificate of Achievement", W / 2, 178);
    ctx.fillStyle = "#94a3b8";
    ctx.font = "16px 'Segoe UI', Arial, sans-serif";
    ctx.fillText("This certifies that", W / 2, 214);
    ctx.fillStyle = "#f1f5f9";
    ctx.font = "bold 28px 'Segoe UI', Arial, sans-serif";
    ctx.fillText(certName || "Typist", W / 2, 256);
    ctx.strokeStyle = "rgba(148,163,184,0.3)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(W / 2 - 160, 272);
    ctx.lineTo(W / 2 + 160, 272);
    ctx.stroke();
    ctx.fillStyle = "#94a3b8";
    ctx.font = "15px 'Segoe UI', Arial, sans-serif";
    ctx.fillText(
      "has successfully completed a Typing Speed Test with the following results:",
      W / 2,
      298
    );
    const stats = [
      {
        label: "Typing Speed",
        value: `${finalStats.wpm} WPM`,
        color: "#4ade80"
      },
      { label: "Accuracy", value: `${finalStats.accuracy}%`, color: "#facc15" },
      { label: "Duration", value: `${duration} Min`, color: "#38bdf8" }
    ];
    const cellW = 200;
    const startX = W / 2 - cellW;
    stats.forEach((s, i) => {
      const cx = startX + i * cellW;
      ctx.fillStyle = "rgba(255,255,255,0.07)";
      ctx.beginPath();
      const cardX = cx - 70;
      const cardY = 318;
      const cardW = 140;
      const cardH = 78;
      const r = 12;
      ctx.moveTo(cardX + r, cardY);
      ctx.lineTo(cardX + cardW - r, cardY);
      ctx.quadraticCurveTo(cardX + cardW, cardY, cardX + cardW, cardY + r);
      ctx.lineTo(cardX + cardW, cardY + cardH - r);
      ctx.quadraticCurveTo(
        cardX + cardW,
        cardY + cardH,
        cardX + cardW - r,
        cardY + cardH
      );
      ctx.lineTo(cardX + r, cardY + cardH);
      ctx.quadraticCurveTo(cardX, cardY + cardH, cardX, cardY + cardH - r);
      ctx.lineTo(cardX, cardY + r);
      ctx.quadraticCurveTo(cardX, cardY, cardX + r, cardY);
      ctx.fill();
      ctx.strokeStyle = "rgba(79,156,255,0.25)";
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.fillStyle = s.color;
      ctx.font = "bold 24px 'Segoe UI', Arial, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(s.value, cx, 366);
      ctx.fillStyle = "#94a3b8";
      ctx.font = "12px 'Segoe UI', Arial, sans-serif";
      ctx.fillText(s.label, cx, 386);
    });
    ctx.fillStyle = "#64748b";
    ctx.font = "13px 'Segoe UI', Arial, sans-serif";
    ctx.textAlign = "center";
    const dateStr = (/* @__PURE__ */ new Date()).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric"
    });
    ctx.fillText(`Date: ${dateStr}`, W / 2, 418);
    ctx.fillStyle = "#60a5fa";
    ctx.font = "bold 13px 'Segoe UI', Arial, sans-serif";
    ctx.fillText(`Certificate ID: ${certId}`, W / 2, 438);
    ctx.strokeStyle = "rgba(59,130,246,0.3)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(80, 455);
    ctx.lineTo(W - 80, 455);
    ctx.stroke();
    ctx.fillStyle = "#93c5fd";
    ctx.font = "bold 15px 'Segoe UI', Arial, sans-serif";
    ctx.fillText(
      "Generated by DocMasterTools.com — Free Online Document & Utility Tools",
      W / 2,
      476
    );
    saveCertificate({
      certificateId: certId,
      name: certName || "Typist",
      wpm: finalStats.wpm,
      accuracy: finalStats.accuracy,
      duration,
      date: (/* @__PURE__ */ new Date()).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "long",
        year: "numeric"
      })
    });
    const link = document.createElement("a");
    link.download = `typing-certificate-${(certName || "typist").replace(/\s+/g, "-").toLowerCase()}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };
  const getShareMessage = () => `I just completed a typing speed test on DocMasterTools.com 🚀
Speed: ${(finalStats == null ? void 0 : finalStats.wpm) ?? 0} WPM | Accuracy: ${(finalStats == null ? void 0 : finalStats.accuracy) ?? 0}%

Try the typing test here:
https://docmastertools.com/typing-test`;
  const shareWhatsApp = () => {
    const text = encodeURIComponent(getShareMessage());
    window.open(`https://wa.me/?text=${text}`, "_blank", "noopener,noreferrer");
    trackCertificateShared({
      certificateId: certId,
      platform: "whatsapp",
      wpm: finalStats == null ? void 0 : finalStats.wpm,
      accuracy: finalStats == null ? void 0 : finalStats.accuracy
    });
    trackShareClicked({
      platform: "whatsapp",
      contentType: "typing_certificate"
    });
  };
  const shareFacebook = () => {
    const url = encodeURIComponent("https://docmastertools.com/typing-test");
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      "_blank",
      "noopener,noreferrer"
    );
    trackCertificateShared({
      certificateId: certId,
      platform: "facebook",
      wpm: finalStats == null ? void 0 : finalStats.wpm,
      accuracy: finalStats == null ? void 0 : finalStats.accuracy
    });
    trackShareClicked({
      platform: "facebook",
      contentType: "typing_certificate"
    });
  };
  const shareTwitter = () => {
    const text = encodeURIComponent(getShareMessage());
    window.open(
      `https://twitter.com/intent/tweet?text=${text}`,
      "_blank",
      "noopener,noreferrer"
    );
    trackCertificateShared({
      certificateId: certId,
      platform: "twitter",
      wpm: finalStats == null ? void 0 : finalStats.wpm,
      accuracy: finalStats == null ? void 0 : finalStats.accuracy
    });
    trackShareClicked({
      platform: "twitter",
      contentType: "typing_certificate"
    });
  };
  const copyShareLink = async () => {
    try {
      await navigator.clipboard.writeText(getShareMessage());
      setShareToastVisible(true);
      setTimeout(() => setShareToastVisible(false), 3e3);
      trackShareClicked({
        platform: "clipboard",
        contentType: "typing_certificate"
      });
    } catch {
    }
  };
  const highlightKeys = (keyString) => {
    const keys = keyString.split(" ");
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 justify-center my-3", children: keys.map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        className: "inline-flex items-center justify-center w-9 h-9 rounded-md bg-slate-700 border border-blue-500/50 text-blue-300 font-mono font-bold text-sm shadow-md",
        children: k
      },
      k
    )) });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-8 px-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SEO,
      {
        title: "Free Typing Test & Learn Typing | DocMasterTools",
        description: "Take a free online typing test, learn touch typing with guided lessons, and track your progress. 1, 3, and 5 minute tests with WPM and accuracy tracking.",
        canonicalUrl: "https://docmastertools.com/typing-test",
        ogImage: "/assets/generated/docmastertools-logo.dim_540x270.png"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      BreadcrumbSchema,
      {
        items: [
          { name: "Home", url: "https://docmastertools.com/" },
          {
            name: "Typing Test",
            url: "https://docmastertools.com/typing-test"
          }
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto", children: [
      onBack && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          "data-ocid": "typing_test.secondary_button",
          onClick: onBack,
          className: "mb-6 flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
            " Back to Home"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl md:text-4xl font-bold text-white mb-2", children: "⌨️ Typing Master" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-300 text-sm", children: "Test your speed, learn touch typing, and build muscle memory." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            "data-ocid": "typing_test.progress.panel",
            className: "grid grid-cols-3 gap-3 mb-2",
            children: [
              {
                label: "Best WPM",
                value: progress.bestWpm,
                color: "text-green-400",
                ocid: "typing_test.best_wpm.card"
              },
              {
                label: "Avg WPM",
                value: progress.testsCompleted > 0 ? Math.round(progress.totalWpm / progress.testsCompleted) : 0,
                color: "text-blue-400",
                ocid: "typing_test.avg_wpm.card"
              },
              {
                label: "Tests Done",
                value: progress.testsCompleted,
                color: "text-yellow-400",
                ocid: "typing_test.tests_done.card"
              }
            ].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                "data-ocid": s.ocid,
                className: "bg-slate-800/70 border border-slate-700 rounded-xl py-3 px-2 text-center",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `text-2xl font-bold ${s.color}`, children: s.value }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-slate-400 text-xs mt-0.5", children: s.label })
                ]
              },
              s.label
            ))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            "data-ocid": "typing_test.reset_stats.button",
            onClick: () => setShowResetConfirm(true),
            className: "text-xs text-slate-500 hover:text-red-400 transition-colors px-2 py-1 rounded border border-transparent hover:border-red-400/30",
            children: "Reset Stats"
          }
        ) }),
        showResetConfirm && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            "data-ocid": "typing_test.reset_stats.dialog",
            className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-800 border border-slate-700 rounded-2xl p-6 w-full max-w-sm shadow-2xl", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-white font-bold text-lg mb-2 text-center", children: "Reset Statistics" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-300 text-sm text-center mb-6", children: "Are you sure you want to reset your typing statistics?" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 justify-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    "data-ocid": "typing_test.reset_stats.cancel_button",
                    onClick: () => setShowResetConfirm(false),
                    className: "flex-1 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2.5 rounded-lg font-semibold text-sm transition-colors",
                    children: "Cancel"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    "data-ocid": "typing_test.reset_stats.confirm_button",
                    onClick: () => {
                      localStorage.removeItem(PROGRESS_KEY);
                      const reset = {
                        bestWpm: 0,
                        totalWpm: 0,
                        testsCompleted: 0
                      };
                      setProgress(reset);
                      setShowResetConfirm(false);
                    },
                    className: "flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-lg font-semibold text-sm transition-colors",
                    children: "Reset"
                  }
                )
              ] })
            ] })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center gap-2 mb-8", children: ["test", "learn", "practice"].map((tab) => {
        const labels = {
          test: "Typing Test",
          learn: "Learn Typing",
          practice: "Practice Mode"
        };
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            "data-ocid": `typing_test.${tab}.tab`,
            onClick: () => setActiveTab(tab),
            className: `px-5 py-2 rounded-lg font-semibold text-sm transition-all duration-200 ${activeTab === tab ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20" : "bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white"}`,
            children: labels[tab]
          },
          tab
        );
      }) }),
      activeTab === "test" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center gap-3 mb-8", children: [1, 3, 5].map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            "data-ocid": "typing_test.duration.tab",
            onClick: () => {
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
            },
            className: `px-6 py-2 rounded-lg font-semibold text-sm transition-all duration-200 ${duration === d ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20" : "bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white"} ${testState === "running" ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`,
            children: [
              d,
              " min"
            ]
          },
          d
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 gap-3 mb-6", children: [
          {
            label: "Time",
            value: formatTime(timeLeft),
            color: timerColor
          },
          { label: "WPM", value: String(wpm), color: "text-green-400" },
          {
            label: "Accuracy",
            value: `${accuracy}%`,
            color: "text-yellow-400"
          },
          {
            label: "Mistakes",
            value: String(mistakes),
            color: "text-red-400"
          }
        ].map((stat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-slate-800 border border-slate-700 rounded-xl py-3 px-2 text-center",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `text-2xl font-bold ${stat.color}`, children: stat.value }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-slate-400 text-xs mt-0.5", children: stat.label })
            ]
          },
          stat.label
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-slate-800 border border-slate-700 rounded-xl p-5 mb-4 text-base leading-8 tracking-wide font-mono select-none break-words min-h-[96px]", children: testState === "idle" ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-500 italic text-sm", children: 'Press "Start Test" to begin. The typing text will appear here.' }) : renderColoredText() }),
        testState === "running" && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "textarea",
          {
            ref: inputRef,
            "data-ocid": "typing_test.textarea",
            value: typed,
            onChange: handleInput,
            rows: 3,
            placeholder: "Start typing here...",
            className: "w-full bg-slate-900 border border-slate-600 focus:border-blue-500 rounded-xl text-white text-base p-4 resize-none outline-none transition-colors font-mono mb-4"
          }
        ),
        testState === "finished" && finalStats && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-800 border border-green-500/30 rounded-xl p-6 mb-4 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-10 h-10 text-green-400" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold text-white mb-4", children: "Test Complete!" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-4 mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl font-bold text-green-400", children: finalStats.wpm }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-slate-400 text-sm", children: "WPM" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-3xl font-bold text-yellow-400", children: [
                finalStats.accuracy,
                "%"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-slate-400 text-sm", children: "Accuracy" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl font-bold text-red-400", children: finalStats.mistakes }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-slate-400 text-sm", children: "Mistakes" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-300 text-sm mb-5", children: finalStats.wpm >= 60 ? "Excellent speed! You're a proficient typist." : finalStats.wpm >= 40 ? "Good job! Keep practicing to increase your speed." : "Keep practicing — consistent effort will improve your speed." }),
          !scoreSubmitted ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-300 text-sm mb-3", children: "Enter your name to save your score to the leaderboard:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 justify-center flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "text",
                  "data-ocid": "leaderboard.name.input",
                  value: playerName,
                  onChange: (e) => setPlayerName(e.target.value.slice(0, 30)),
                  placeholder: "Your name...",
                  maxLength: 30,
                  className: "bg-slate-900 border border-slate-600 focus:border-blue-500 rounded-lg text-white text-sm px-4 py-2.5 outline-none transition-colors w-52"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "data-ocid": "leaderboard.submit.primary_button",
                  disabled: !playerName.trim(),
                  onClick: () => {
                    if (!playerName.trim() || !finalStats) return;
                    const entry = {
                      name: playerName.trim(),
                      wpm: finalStats.wpm,
                      accuracy: finalStats.accuracy,
                      date: (/* @__PURE__ */ new Date()).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric"
                      })
                    };
                    const updated = addLeaderboardEntry(
                      leaderboard,
                      entry
                    );
                    setLeaderboard(updated);
                    saveLeaderboard(updated);
                    setScoreSubmitted(true);
                    trackLeaderboardSubmission({
                      wpm: finalStats.wpm,
                      accuracy: finalStats.accuracy,
                      playerName: playerName.trim()
                    });
                  },
                  className: "bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white px-5 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200",
                  children: "Submit Score"
                }
              )
            ] })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-green-400 text-sm font-semibold", children: "✓ Score saved to leaderboard!" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 pt-4 border-t border-slate-700", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                "data-ocid": "certificate.open_modal_button",
                onClick: () => {
                  const newCertId = generateCertificateId();
                  setCertId(newCertId);
                  setShowCertificate(true);
                  setCertName(playerName || "");
                  if (finalStats) {
                    trackCertificateGenerated({
                      certificateId: newCertId,
                      wpm: finalStats.wpm,
                      accuracy: finalStats.accuracy
                    });
                  }
                },
                className: "w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 rounded-lg font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "w-4 h-4" }),
                  " Generate Typing Certificate"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "a",
              {
                href: "/verify-certificate",
                "data-ocid": "certificate.verify.link",
                className: "mt-2 w-full flex items-center justify-center gap-1.5 text-blue-400 hover:text-blue-300 text-xs font-medium transition-colors py-1",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "svg",
                    {
                      xmlns: "http://www.w3.org/2000/svg",
                      className: "w-3.5 h-3.5",
                      viewBox: "0 0 24 24",
                      fill: "none",
                      stroke: "currentColor",
                      strokeWidth: "2",
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      "aria-hidden": "true",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M22 11.08V12a10 10 0 1 1-5.93-9.14" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { points: "22 4 12 14.01 9 11.01" })
                      ]
                    }
                  ),
                  "Verify Certificate"
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-center gap-3", children: [
          testState === "idle" && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              "data-ocid": "typing_test.primary_button",
              onClick: startTest,
              className: "bg-blue-600 hover:bg-blue-700 text-white px-10 py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/20",
              children: "Start Test"
            }
          ),
          testState === "running" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              "data-ocid": "typing_test.stop_button",
              onClick: stopTest,
              className: "bg-red-600 hover:bg-red-700 text-white px-10 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "w-4 h-4" }),
                " Stop"
              ]
            }
          ),
          testState === "finished" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              "data-ocid": "typing_test.primary_button",
              onClick: startTest,
              className: "bg-blue-600 hover:bg-blue-700 text-white px-10 py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg flex items-center gap-2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "w-4 h-4" }),
                " Try Again"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-ocid": "leaderboard.section",
            className: "mt-10 bg-slate-800 border border-slate-700 rounded-xl overflow-hidden",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 py-4 border-b border-slate-700", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-white font-bold text-base", children: "🏆 Leaderboard — Top 10" }),
                leaderboard.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    "data-ocid": "leaderboard.clear.delete_button",
                    onClick: () => {
                      if (window.confirm(
                        "Clear all leaderboard entries? This cannot be undone."
                      )) {
                        setLeaderboard([]);
                        saveLeaderboard([]);
                      }
                    },
                    className: "text-xs text-slate-500 hover:text-red-400 transition-colors px-2 py-1 rounded border border-transparent hover:border-red-400/30",
                    children: "Clear"
                  }
                )
              ] }),
              leaderboard.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  "data-ocid": "leaderboard.empty_state",
                  className: "px-5 py-10 text-center text-slate-500 text-sm",
                  children: "No scores yet. Complete a test and submit your name to appear here."
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "table",
                {
                  "data-ocid": "leaderboard.table",
                  className: "w-full text-sm",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-slate-900/60 text-slate-400 text-xs uppercase tracking-wider", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-center w-12", children: "Rank" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left", children: "Name" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-center", children: "WPM" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-center", children: "Accuracy" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-center", children: "Date" })
                    ] }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: leaderboard.map((entry, index) => {
                      const rankColors = [
                        "text-yellow-400",
                        "text-slate-300",
                        "text-amber-600"
                      ];
                      const rankEmojis = ["🥇", "🥈", "🥉"];
                      const rankDisplay = index < 3 ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: rankColors[index], children: rankEmojis[index] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-500", children: index + 1 });
                      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "tr",
                        {
                          "data-ocid": `leaderboard.row.${index + 1}`,
                          className: `border-t border-slate-700/50 transition-colors ${index === 0 ? "bg-yellow-500/5" : "hover:bg-slate-700/30"}`,
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-center font-bold", children: rankDisplay }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-white font-medium max-w-[140px] truncate", children: entry.name }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-center text-green-400 font-bold", children: entry.wpm }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-center text-yellow-400", children: [
                              entry.accuracy,
                              "%"
                            ] }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-center text-slate-400 text-xs", children: entry.date })
                          ]
                        },
                        index
                      );
                    }) })
                  ]
                }
              ) })
            ]
          }
        ),
        testState === "idle" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 bg-slate-800/50 border border-slate-700 rounded-xl p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-white font-semibold mb-3 text-sm", children: "Tips to improve typing speed" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-1.5 text-slate-400 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Keep your fingers on the home row keys (A S D F — J K L ;)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Focus on accuracy first — speed comes naturally with practice" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Do not look at the keyboard while typing" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Practice for at least 10–15 minutes daily" })
          ] })
        ] })
      ] }),
      activeTab === "learn" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap justify-center gap-3 mb-6", children: LESSONS.map((lesson) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            "data-ocid": `learn_typing.${lesson.id}.tab`,
            onClick: () => selectLesson(lesson),
            className: `px-5 py-2 rounded-lg font-semibold text-sm transition-all duration-200 ${selectedLesson.id === lesson.id ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20" : "bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white"}`,
            children: lesson.title
          },
          lesson.id
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-800 border border-slate-700 rounded-xl p-6 mb-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold text-white mb-1", children: selectedLesson.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-blue-300 font-mono text-sm", children: selectedLesson.subtitle })
          ] }),
          highlightKeys(selectedLesson.keys),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center gap-1 mb-4 mt-2", children: selectedLesson.lines.map((line, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: `w-2 h-2 rounded-full transition-colors ${i < lessonLineIndex ? "bg-green-400" : i === lessonLineIndex ? "bg-blue-400" : "bg-slate-600"}`
            },
            line
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-slate-900 border border-slate-600 rounded-lg p-4 mb-4 font-mono text-lg leading-8 tracking-widest text-center select-none min-h-[56px]", children: renderLessonText() }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "textarea",
            {
              "data-ocid": "learn_typing.textarea",
              value: lessonTyped,
              onChange: handleLessonInput,
              rows: 2,
              placeholder: "Type the text above...",
              className: "w-full bg-slate-900 border border-slate-600 focus:border-blue-500 rounded-xl text-white text-base p-4 resize-none outline-none transition-colors font-mono"
            },
            `${selectedLesson.id}-${lessonLineIndex}`
          ),
          lessonTyped.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 text-center text-sm", children: lessonTyped === currentLine ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-green-400 font-semibold", children: "✓ Line complete! Moving to next line..." }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-slate-400", children: [
            lessonTyped.length,
            " / ",
            currentLine.length,
            " characters"
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-slate-800/50 border border-blue-500/20 rounded-xl p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-slate-300 text-sm leading-relaxed", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-400 font-semibold", children: "Tip: " }),
          selectedLesson.tip
        ] }) })
      ] }),
      activeTab === "practice" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap justify-center gap-3 mb-6", children: ["word", "sentence", "paragraph"].map((mode) => {
          const labels = {
            word: "Words",
            sentence: "Sentences",
            paragraph: "Paragraph"
          };
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              "data-ocid": `practice.${mode}.tab`,
              onClick: () => startPractice(mode),
              className: `px-6 py-2 rounded-lg font-semibold text-sm transition-all duration-200 ${practiceMode === mode && practiceText ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20" : "bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white"}`,
              children: labels[mode]
            },
            mode
          );
        }) }),
        practiceText ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-3 mb-5", children: [
            {
              label: "WPM",
              value: String(practiceWpm),
              color: "text-green-400"
            },
            {
              label: "Accuracy",
              value: `${practiceAccuracy}%`,
              color: "text-yellow-400"
            },
            {
              label: "Mistakes",
              value: String(practiceMistakes),
              color: "text-red-400"
            }
          ].map((stat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "bg-slate-800 border border-slate-700 rounded-xl py-3 px-2 text-center",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `text-2xl font-bold ${stat.color}`, children: stat.value }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-slate-400 text-xs mt-0.5", children: stat.label })
              ]
            },
            stat.label
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-slate-800 border border-slate-700 rounded-xl p-5 mb-4 font-mono text-base leading-8 tracking-wide select-none break-words min-h-[80px]", children: renderPracticeText() }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "textarea",
            {
              ref: practiceRef,
              "data-ocid": "practice.textarea",
              value: practiceTyped,
              onChange: handlePracticeInput,
              rows: 3,
              placeholder: "Start typing here...",
              className: "w-full bg-slate-900 border border-slate-600 focus:border-blue-500 rounded-xl text-white text-base p-4 resize-none outline-none transition-colors font-mono mb-4"
            }
          ),
          practiceCorrect !== null && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `rounded-xl p-4 mb-4 text-center font-semibold text-sm ${practiceCorrect ? "bg-green-900/30 border border-green-500/30 text-green-400" : "bg-red-900/20 border border-red-500/20 text-red-400"}`,
              children: practiceCorrect ? "✓ Perfect! Well done." : "✗ There are some errors. Check highlighted characters."
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              "data-ocid": "practice.primary_button",
              onClick: () => startPractice(practiceMode),
              className: "bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "w-4 h-4" }),
                " Next"
              ]
            }
          ) })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-slate-800/50 border border-slate-700 rounded-xl p-10 text-center text-slate-400 text-sm", children: "Select a practice mode above to begin." })
      ] })
    ] }),
    showCertificate && finalStats && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        "data-ocid": "certificate.modal",
        className: "fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4 py-8 overflow-y-auto",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-2xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-white font-bold text-lg flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "w-5 h-5 text-blue-400" }),
              " Typing Certificate"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                "data-ocid": "certificate.close_button",
                onClick: () => {
                  setShowCertificate(false);
                  setShowSharePanel(false);
                },
                className: "text-slate-400 hover:text-white transition-colors text-sm px-3 py-1.5 rounded-lg border border-slate-600 hover:border-slate-400",
                children: "✕ Close"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "cert-name-input",
                className: "block text-slate-300 text-sm mb-1.5 font-medium",
                children: "Your Name (appears on certificate)"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "cert-name-input",
                type: "text",
                "data-ocid": "certificate.name.input",
                value: certName,
                onChange: (e) => setCertName(e.target.value.slice(0, 40)),
                placeholder: "Enter your full name...",
                maxLength: 40,
                className: "w-full bg-slate-900 border border-slate-600 focus:border-blue-500 rounded-lg text-white text-sm px-4 py-2.5 outline-none transition-colors"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              ref: certRef,
              "data-ocid": "certificate.card",
              className: "relative w-full rounded-2xl overflow-hidden",
              style: {
                background: "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)",
                border: "2px solid #4f9cff",
                boxShadow: "0 0 32px rgba(79,156,255,0.45), 0 0 80px rgba(79,156,255,0.15), 0 24px 64px rgba(0,0,0,0.7)"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "absolute inset-0 pointer-events-none",
                    style: {
                      background: "radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(0,0,0,0.5) 100%)"
                    }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "absolute pointer-events-none",
                    style: {
                      top: 0,
                      left: 0,
                      right: 0,
                      height: "55%",
                      background: "radial-gradient(ellipse at 50% 0%, rgba(79,156,255,0.12) 0%, transparent 70%)"
                    }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden",
                    "aria-hidden": "true",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        style: {
                          fontSize: "clamp(3rem, 10vw, 5.5rem)",
                          fontWeight: 800,
                          color: "rgba(255,255,255,0.06)",
                          transform: "rotate(-20deg)",
                          whiteSpace: "nowrap",
                          letterSpacing: "0.02em",
                          userSelect: "none"
                        },
                        children: "DocMasterTools.com"
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "absolute inset-3 rounded-xl pointer-events-none",
                    style: { border: "1px solid rgba(79,156,255,0.2)" }
                  }
                ),
                [
                  "top-5 left-5 border-t-2 border-l-2",
                  "top-5 right-5 border-t-2 border-r-2",
                  "bottom-5 left-5 border-b-2 border-l-2",
                  "bottom-5 right-5 border-b-2 border-r-2"
                ].map((cls) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: `absolute w-8 h-8 rounded-sm ${cls} pointer-events-none`,
                    style: { borderColor: "rgba(79,156,255,0.6)" }
                  },
                  cls
                )),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative px-8 py-10 text-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-blue-400 font-semibold text-xs tracking-[0.2em] uppercase mb-3", children: "DocMasterTools.com" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-5xl mb-3", children: "🏆" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-white font-bold text-2xl md:text-3xl mb-2", children: "Certificate of Achievement" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400 text-sm mb-4", children: "This certifies that" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white font-bold text-2xl md:text-3xl mb-1 min-h-[40px]", children: certName.trim() || /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-500 italic text-xl", children: "Your Name" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-48 h-px bg-slate-600 mx-auto mb-4" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400 text-sm mb-6", children: "has successfully completed a Typing Speed Test with the following results:" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-3 mb-6", children: [
                    {
                      label: "Typing Speed",
                      value: `${finalStats.wpm} WPM`,
                      color: "text-green-400",
                      glow: "rgba(74,222,128,0.12)"
                    },
                    {
                      label: "Accuracy",
                      value: `${finalStats.accuracy}%`,
                      color: "text-yellow-400",
                      glow: "rgba(250,204,21,0.12)"
                    },
                    {
                      label: "Duration",
                      value: `${duration} Min`,
                      color: "text-blue-300",
                      glow: "rgba(79,156,255,0.12)"
                    }
                  ].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "rounded-xl py-3 px-2",
                      style: {
                        background: "rgba(255,255,255,0.07)",
                        border: "1px solid rgba(79,156,255,0.22)",
                        boxShadow: `inset 0 1px 0 rgba(255,255,255,0.08), 0 4px 12px ${s.glow}`,
                        backdropFilter: "blur(8px)"
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: `text-xl md:text-2xl font-bold ${s.color}`,
                            children: s.value
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-slate-400 text-xs mt-0.5", children: s.label })
                      ]
                    },
                    s.label
                  )) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-slate-500 text-xs mb-1", children: [
                    "Date:",
                    " ",
                    (/* @__PURE__ */ new Date()).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric"
                    })
                  ] }),
                  certId && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-blue-400 font-bold text-sm mb-4 tracking-wide", children: [
                    "Certificate ID: ",
                    certId
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-slate-600 pt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-center font-bold",
                      style: {
                        color: "#93c5fd",
                        fontSize: "0.9rem",
                        letterSpacing: "0.01em",
                        textShadow: "0 0 12px rgba(147,197,253,0.3)"
                      },
                      children: "Generated by DocMasterTools.com — Free Online Document & Utility Tools"
                    }
                  ) })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 mt-4 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                "data-ocid": "certificate.download.primary_button",
                onClick: downloadCertificate,
                className: "flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4" }),
                  " Download Certificate"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                "data-ocid": "certificate.share.secondary_button",
                onClick: () => setShowSharePanel((v) => !v),
                className: "flex-1 bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-lg font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 border border-slate-600",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "w-4 h-4" }),
                  " Share Certificate"
                ]
              }
            )
          ] }),
          showSharePanel && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              "data-ocid": "certificate.share.panel",
              className: "mt-3 bg-slate-800 border border-slate-700 rounded-xl p-4",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400 text-xs mb-3 text-center", children: "Share your achievement:" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 justify-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      "data-ocid": "certificate.share.whatsapp.button",
                      onClick: shareWhatsApp,
                      className: "flex items-center gap-1.5 bg-[#25D366] hover:bg-[#1ebe5a] text-white px-4 py-2 rounded-lg font-semibold text-sm transition-colors",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "svg",
                          {
                            className: "w-4 h-4",
                            viewBox: "0 0 24 24",
                            fill: "currentColor",
                            "aria-hidden": "true",
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" })
                          }
                        ),
                        "WhatsApp"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      "data-ocid": "certificate.share.facebook.button",
                      onClick: shareFacebook,
                      className: "flex items-center gap-1.5 bg-[#1877F2] hover:bg-[#166fe5] text-white px-4 py-2 rounded-lg font-semibold text-sm transition-colors",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "svg",
                          {
                            className: "w-4 h-4",
                            viewBox: "0 0 24 24",
                            fill: "currentColor",
                            "aria-hidden": "true",
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" })
                          }
                        ),
                        "Facebook"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      "data-ocid": "certificate.share.twitter.button",
                      onClick: shareTwitter,
                      className: "flex items-center gap-1.5 bg-slate-900 hover:bg-slate-700 border border-slate-600 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-colors",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "svg",
                          {
                            className: "w-4 h-4",
                            viewBox: "0 0 24 24",
                            fill: "currentColor",
                            "aria-hidden": "true",
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.73-8.835L1.254 2.25H8.08l4.259 5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z" })
                          }
                        ),
                        "Twitter (X)"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      "data-ocid": "certificate.share.copy.button",
                      onClick: copyShareLink,
                      className: "flex items-center gap-1.5 bg-slate-700 hover:bg-slate-600 border border-slate-500 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-colors",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "svg",
                          {
                            className: "w-4 h-4",
                            viewBox: "0 0 24 24",
                            fill: "none",
                            stroke: "currentColor",
                            strokeWidth: "2",
                            "aria-hidden": "true",
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "9", y: "9", width: "13", height: "13", rx: "2", ry: "2" }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" })
                            ]
                          }
                        ),
                        "Copy Link"
                      ]
                    }
                  )
                ] })
              ]
            }
          )
        ] })
      }
    ),
    shareToastVisible && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "certificate.success_state",
        className: "fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-700 border border-slate-600 text-white text-sm px-5 py-3 rounded-xl shadow-xl z-[60] flex items-center gap-2",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4 text-green-400" }),
          " Share message copied to clipboard!"
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto mt-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        TypingInternalLinks,
        {
          onNavigate: onNavigate ?? onBack ?? (() => {
          }),
          currentPage: "typing-test"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TypingFAQ, { faqs: TYPING_TEST_FAQS })
    ] })
  ] });
}
export {
  TypingTestPage as default
};
