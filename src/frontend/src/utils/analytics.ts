/**
 * GA4 Analytics Utility for DocMasterTools
 * Measurement ID: G-0HQE1FK58V
 *
 * All events fire silently. In development mode, events are also logged to the console.
 * If GA4 is blocked by an ad-blocker or unavailable, all calls fail silently.
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

const IS_DEV = import.meta.env.DEV;

/** Safe gtag wrapper — silently catches all errors */
function gtag(command: string, ...args: unknown[]): void {
  try {
    if (typeof window.gtag === "function") {
      window.gtag(command, ...args);
    }
    if (IS_DEV) {
      console.debug("[GA4]", command, ...args);
    }
  } catch {
    // silently fail — ad-blocker or script not loaded
  }
}

// ─── Page View Tracking ────────────────────────────────────────────────────────

export interface PageViewParams {
  page_title: string;
  page_url: string;
  page_category: string;
}

export function trackPageView(params: PageViewParams): void {
  gtag("event", "page_view", {
    page_title: params.page_title,
    page_location: params.page_url,
    page_category: params.page_category,
  });
}

// ─── Generic Event ─────────────────────────────────────────────────────────────

export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>,
): void {
  gtag("event", eventName, params ?? {});
}

// ─── Tool Usage ────────────────────────────────────────────────────────────────

export function trackToolUsed(
  toolName: string,
  toolCategory: string,
  pageUrl?: string,
): void {
  gtag("event", "tool_used", {
    tool_name: toolName,
    tool_category: toolCategory,
    page_url: pageUrl ?? window.location.href,
  });
}

// ─── Typing Platform ───────────────────────────────────────────────────────────

export function trackTypingTestStart(testDuration: number): void {
  gtag("event", "typing_test_start", {
    test_duration: testDuration,
    page_url: window.location.href,
  });
}

export function trackTypingTestComplete(params: {
  testDuration: number;
  wpm: number;
  accuracy: number;
  mistakes: number;
  timeTaken?: number;
}): void {
  gtag("event", "typing_test_complete", {
    test_duration: params.testDuration,
    wpm: params.wpm,
    accuracy: params.accuracy,
    mistakes: params.mistakes,
    time_taken: params.timeTaken ?? params.testDuration * 60,
  });
}

export function trackTypingGamePlayed(params: {
  gameName: string;
  score?: number;
  wpm?: number;
  accuracy?: number;
  timeTaken?: number;
}): void {
  gtag("event", "typing_game_played", {
    game_name: params.gameName,
    score: params.score ?? 0,
    wpm: params.wpm ?? 0,
    accuracy: params.accuracy ?? 0,
    time_taken: params.timeTaken ?? 0,
  });
}

export function trackDailyChallengeCompleted(params: {
  wpm: number;
  accuracy: number;
  timeTaken: number;
}): void {
  gtag("event", "daily_challenge_completed", {
    wpm: params.wpm,
    accuracy: params.accuracy,
    time_taken: params.timeTaken,
  });
}

// ─── Certificate System ────────────────────────────────────────────────────────

export function trackCertificateGenerated(params: {
  certificateId: string;
  wpm: number;
  accuracy: number;
}): void {
  gtag("event", "certificate_generated", {
    certificate_id: params.certificateId,
    wpm: params.wpm,
    accuracy: params.accuracy,
  });
}

export function trackCertificateVerified(certificateId: string): void {
  gtag("event", "certificate_verified", {
    certificate_id: certificateId,
  });
}

export function trackCertificateShared(params: {
  certificateId?: string;
  platform: string;
  wpm?: number;
  accuracy?: number;
}): void {
  gtag("event", "certificate_shared", {
    certificate_id: params.certificateId ?? "",
    platform: params.platform,
    wpm: params.wpm ?? 0,
    accuracy: params.accuracy ?? 0,
  });
}

// ─── File Tools ────────────────────────────────────────────────────────────────

export function trackImageToolUsed(params: {
  toolName: string;
  fileType?: string;
  fileSize?: number;
}): void {
  gtag("event", "image_tool_used", {
    tool_name: params.toolName,
    file_type: params.fileType ?? "unknown",
    file_size: params.fileSize ?? 0,
  });
}

export function trackPdfToolUsed(params: {
  toolName: string;
  fileType?: string;
  fileSize?: number;
}): void {
  gtag("event", "pdf_tool_used", {
    tool_name: params.toolName,
    file_type: params.fileType ?? "pdf",
    file_size: params.fileSize ?? 0,
  });
}

export function trackCalculatorUsed(toolName: string): void {
  gtag("event", "calculator_used", {
    tool_name: toolName,
    tool_category: "calculator",
    page_url: window.location.href,
  });
}

// ─── User Engagement ───────────────────────────────────────────────────────────

export function trackLeaderboardSubmission(params: {
  wpm: number;
  accuracy: number;
  playerName?: string;
}): void {
  gtag("event", "leaderboard_submission", {
    wpm: params.wpm,
    accuracy: params.accuracy,
    player_name: params.playerName ?? "Anonymous",
  });
}

export function trackResumeCreated(templateName?: string): void {
  gtag("event", "resume_created", {
    template_name: templateName ?? "unknown",
    page_url: window.location.href,
  });
}

export function trackFileProcessed(params: {
  toolName: string;
  toolCategory: string;
  fileType?: string;
  fileSize?: number;
}): void {
  gtag("event", "file_processed", {
    tool_name: params.toolName,
    tool_category: params.toolCategory,
    file_type: params.fileType ?? "unknown",
    file_size: params.fileSize ?? 0,
  });
}

export function trackShareClicked(params: {
  platform: string;
  contentType: string;
  pageUrl?: string;
}): void {
  gtag("event", "share_clicked", {
    platform: params.platform,
    content_type: params.contentType,
    page_url: params.pageUrl ?? window.location.href,
  });
}

// ─── Page metadata map (for SPA route-change tracking) ────────────────────────

export interface PageMeta {
  title: string;
  category: string;
}

export const PAGE_META: Record<string, PageMeta> = {
  home: { title: "Home — DocMasterTools", category: "homepage" },
  sitemap: { title: "Site Map — DocMasterTools", category: "navigation" },
  "pdf-tools": { title: "PDF Tools — DocMasterTools", category: "pdf_tools" },
  "image-tools": {
    title: "Image Tools — DocMasterTools",
    category: "image_tools",
  },
  "resume-builder": {
    title: "Resume Builder — DocMasterTools",
    category: "resume_tools",
  },
  "smart-document-fixer": {
    title: "Smart Document Fixer — DocMasterTools",
    category: "image_tools",
  },
  "ai-document-enhancer": {
    title: "AI Document Enhancer — DocMasterTools",
    category: "image_tools",
  },
  calculators: {
    title: "Calculators — DocMasterTools",
    category: "calculators",
  },
  "typing-test": {
    title: "Typing Test — DocMasterTools",
    category: "typing_tools",
  },
  "typing-games": {
    title: "Typing Games — DocMasterTools",
    category: "typing_tools",
  },
  "daily-typing-challenge": {
    title: "Daily Typing Challenge — DocMasterTools",
    category: "typing_tools",
  },
  "typing-practice": {
    title: "Typing Practice — DocMasterTools",
    category: "typing_tools",
  },
  "learn-touch-typing": {
    title: "Learn Touch Typing — DocMasterTools",
    category: "typing_tools",
  },
  "free-typing-lessons": {
    title: "Free Typing Lessons — DocMasterTools",
    category: "typing_tools",
  },
  "typing-speed-practice": {
    title: "Typing Speed Practice — DocMasterTools",
    category: "typing_tools",
  },
  "typing-test-1-minute": {
    title: "1 Minute Typing Test — DocMasterTools",
    category: "typing_tools",
  },
  "typing-test-3-minute": {
    title: "3 Minute Typing Test — DocMasterTools",
    category: "typing_tools",
  },
  "typing-test-5-minute": {
    title: "5 Minute Typing Test — DocMasterTools",
    category: "typing_tools",
  },
  "verify-certificate": {
    title: "Verify Certificate — DocMasterTools",
    category: "typing_tools",
  },
  "contact-us": {
    title: "Contact Us — DocMasterTools",
    category: "legal",
  },
  "about-us": { title: "About Us — DocMasterTools", category: "legal" },
  "privacy-policy": {
    title: "Privacy Policy — DocMasterTools",
    category: "legal",
  },
  disclaimer: { title: "Disclaimer — DocMasterTools", category: "legal" },
  "terms-and-conditions": {
    title: "Terms & Conditions — DocMasterTools",
    category: "legal",
  },
  "dmca-policy": { title: "DMCA Policy — DocMasterTools", category: "legal" },
  // Image tools
  "image-passport-photo": {
    title: "Passport Photo Maker — DocMasterTools",
    category: "image_tools",
  },
  "image-aadhaar-photo": {
    title: "Aadhaar Photo Resize — DocMasterTools",
    category: "image_tools",
  },
  "image-pan-photo": {
    title: "PAN Photo Resize — DocMasterTools",
    category: "image_tools",
  },
  "image-ssc-photo": {
    title: "SSC Photo Resize — DocMasterTools",
    category: "image_tools",
  },
  "image-railway-photo": {
    title: "Railway Photo Resize — DocMasterTools",
    category: "image_tools",
  },
  "image-police-army-photo": {
    title: "Police/Army Photo — DocMasterTools",
    category: "image_tools",
  },
  "image-visa-photo": {
    title: "Visa Photo Resize — DocMasterTools",
    category: "image_tools",
  },
  "image-signature-resize": {
    title: "Signature Resize — DocMasterTools",
    category: "image_tools",
  },
  "image-compressor": {
    title: "Image Compressor — DocMasterTools",
    category: "image_tools",
  },
  "image-cropper": {
    title: "Image Cropper — DocMasterTools",
    category: "image_tools",
  },
  "image-dpi-changer": {
    title: "DPI Changer — DocMasterTools",
    category: "image_tools",
  },
  "image-custom-resize": {
    title: "Custom Image Resize — DocMasterTools",
    category: "image_tools",
  },
  "image-jpg-to-png": {
    title: "JPG to PNG — DocMasterTools",
    category: "image_tools",
  },
  "image-png-to-jpg": {
    title: "PNG to JPG — DocMasterTools",
    category: "image_tools",
  },
  "image-webp-converter": {
    title: "WEBP Converter — DocMasterTools",
    category: "image_tools",
  },
  "image-background-remover": {
    title: "Background Remover — DocMasterTools",
    category: "image_tools",
  },
  // New Typing SEO Pages
  "typing-speed-test": {
    title: "Free Typing Speed Test — DocMasterTools",
    category: "typing_tools",
  },
  "typing-test-online": {
    title: "Typing Test Online — DocMasterTools",
    category: "typing_tools",
  },
  "typing-test-free": {
    title: "Free Typing Test — DocMasterTools",
    category: "typing_tools",
  },
  "check-typing-speed": {
    title: "Check Typing Speed — DocMasterTools",
    category: "typing_tools",
  },
  "typing-test-with-certificate": {
    title: "Typing Test with Certificate — DocMasterTools",
    category: "typing_tools",
  },
  "typing-practice-online": {
    title: "Typing Practice Online — DocMasterTools",
    category: "typing_tools",
  },
  "touch-typing-practice": {
    title: "Touch Typing Practice — DocMasterTools",
    category: "typing_tools",
  },
  "improve-typing-speed": {
    title: "Improve Typing Speed — DocMasterTools",
    category: "typing_tools",
  },
  "learn-typing-online": {
    title: "Learn Typing Online — DocMasterTools",
    category: "typing_tools",
  },
  "typing-test-for-jobs": {
    title: "Typing Test for Jobs — DocMasterTools",
    category: "typing_tools",
  },
  "typing-test-30-seconds": {
    title: "30 Second Typing Test — DocMasterTools",
    category: "typing_tools",
  },
  "typing-test-2-minute": {
    title: "2 Minute Typing Test — DocMasterTools",
    category: "typing_tools",
  },
  "typing-test-10-minute": {
    title: "10 Minute Typing Test — DocMasterTools",
    category: "typing_tools",
  },
  // New Document Tool SEO Pages
  "passport-photo-resize": {
    title: "Passport Photo Resize Online Free — DocMasterTools",
    category: "image_tools",
  },
  "resize-passport-photo-online": {
    title: "Resize Passport Photo Online — DocMasterTools",
    category: "image_tools",
  },
  "resize-photo-for-aadhaar-card": {
    title: "Resize Photo for Aadhaar Card — DocMasterTools",
    category: "image_tools",
  },
  "pan-card-photo-resize": {
    title: "PAN Card Photo Resize — DocMasterTools",
    category: "image_tools",
  },
  "signature-resize-online": {
    title: "Signature Resize Online — DocMasterTools",
    category: "image_tools",
  },
  "compress-image-online-free": {
    title: "Compress Image Online Free — DocMasterTools",
    category: "image_tools",
  },
  "convert-jpg-to-png-online": {
    title: "Convert JPG to PNG Online — DocMasterTools",
    category: "image_tools",
  },
  "pdf-to-word-converter": {
    title: "PDF to Word Converter — DocMasterTools",
    category: "pdf_tools",
  },
  "merge-pdf-files-online": {
    title: "Merge PDF Files Online — DocMasterTools",
    category: "pdf_tools",
  },
  "compress-pdf-file": {
    title: "Compress PDF File — DocMasterTools",
    category: "pdf_tools",
  },
  "seo-image-background-remover": {
    title: "Image Background Remover — DocMasterTools",
    category: "image_tools",
  },
  // Utility Tool Pages
  "word-count-tool": {
    title: "Word Count Tool — DocMasterTools",
    category: "utility_tools",
  },
  "random-password-generator": {
    title: "Random Password Generator — DocMasterTools",
    category: "utility_tools",
  },
  "json-formatter-online": {
    title: "JSON Formatter Online — DocMasterTools",
    category: "utility_tools",
  },
  // Calculator SEO Pages
  "percentage-calculator": {
    title: "Percentage Calculator — DocMasterTools",
    category: "calculators",
  },
  "discount-calculator": {
    title: "Discount Calculator — DocMasterTools",
    category: "calculators",
  },
  "loan-emi-calculator": {
    title: "Loan EMI Calculator — DocMasterTools",
    category: "calculators",
  },
  "age-calculator-online": {
    title: "Age Calculator Online — DocMasterTools",
    category: "calculators",
  },
  "date-difference-calculator": {
    title: "Date Difference Calculator — DocMasterTools",
    category: "calculators",
  },
  "gst-calculator": {
    title: "GST Calculator — DocMasterTools",
    category: "calculators",
  },
  // Calculators
  "calc-age": {
    title: "Age Calculator — DocMasterTools",
    category: "calculators",
  },
  "calc-bmi": {
    title: "BMI Calculator — DocMasterTools",
    category: "calculators",
  },
  "calc-cgpa": {
    title: "CGPA Calculator — DocMasterTools",
    category: "calculators",
  },
  "calc-cgpa-to-percentage": {
    title: "CGPA to Percentage — DocMasterTools",
    category: "calculators",
  },
  "calc-compound-interest": {
    title: "Compound Interest Calculator — DocMasterTools",
    category: "calculators",
  },
  "calc-date-difference": {
    title: "Date Difference Calculator — DocMasterTools",
    category: "calculators",
  },
  "calc-discount": {
    title: "Discount Calculator — DocMasterTools",
    category: "calculators",
  },
  "calc-division": {
    title: "Division Calculator — DocMasterTools",
    category: "calculators",
  },
  "calc-emi": {
    title: "EMI Calculator — DocMasterTools",
    category: "calculators",
  },
  "calc-gpa": {
    title: "GPA Calculator — DocMasterTools",
    category: "calculators",
  },
  "calc-grade": {
    title: "Grade Calculator — DocMasterTools",
    category: "calculators",
  },
  "calc-gst": {
    title: "GST Calculator — DocMasterTools",
    category: "calculators",
  },
  "calc-loan": {
    title: "Loan Calculator — DocMasterTools",
    category: "calculators",
  },
  "calc-marks-percentage": {
    title: "Marks Percentage Calculator — DocMasterTools",
    category: "calculators",
  },
  "calc-percentage-to-cgpa": {
    title: "Percentage to CGPA — DocMasterTools",
    category: "calculators",
  },
  "calc-profit-loss": {
    title: "Profit Loss Calculator — DocMasterTools",
    category: "calculators",
  },
  "calc-salary-hike": {
    title: "Salary Hike Calculator — DocMasterTools",
    category: "calculators",
  },
  "calc-sgpa": {
    title: "SGPA Calculator — DocMasterTools",
    category: "calculators",
  },
  "calc-simple-interest": {
    title: "Simple Interest Calculator — DocMasterTools",
    category: "calculators",
  },
  "calc-time-duration": {
    title: "Time Duration Calculator — DocMasterTools",
    category: "calculators",
  },
  // Resume templates
  "resume-fresher-india": {
    title: "Fresher Resume (India) — DocMasterTools",
    category: "resume_tools",
  },
  "resume-experienced-india": {
    title: "Experienced Resume (India) — DocMasterTools",
    category: "resume_tools",
  },
  "resume-professional-india": {
    title: "Professional Resume (India) — DocMasterTools",
    category: "resume_tools",
  },
  "resume-simple-india": {
    title: "Simple Resume (India) — DocMasterTools",
    category: "resume_tools",
  },
  "resume-creative-india": {
    title: "Creative Resume (India) — DocMasterTools",
    category: "resume_tools",
  },
  "resume-government-india": {
    title: "Government Resume (India) — DocMasterTools",
    category: "resume_tools",
  },
  "resume-academic-india": {
    title: "Academic Resume (India) — DocMasterTools",
    category: "resume_tools",
  },
  "resume-fresher-intl": {
    title: "Fresher Resume (International) — DocMasterTools",
    category: "resume_tools",
  },
  "resume-experienced-intl": {
    title: "Experienced Resume (International) — DocMasterTools",
    category: "resume_tools",
  },
  "resume-professional-intl": {
    title: "Professional Resume (International) — DocMasterTools",
    category: "resume_tools",
  },
  "resume-simple-intl": {
    title: "Simple Resume (International) — DocMasterTools",
    category: "resume_tools",
  },
  "resume-creative-intl": {
    title: "Creative Resume (International) — DocMasterTools",
    category: "resume_tools",
  },
  "resume-executive-intl": {
    title: "Executive Resume (International) — DocMasterTools",
    category: "resume_tools",
  },
  "resume-academic-intl": {
    title: "Academic Resume (International) — DocMasterTools",
    category: "resume_tools",
  },
};
