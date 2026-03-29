import React, { useState, Suspense, useEffect } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import OrganizationSchema from "./components/OrganizationSchema";
import WebsiteSearchSchema from "./components/WebsiteSearchSchema";
import { LanguageProvider } from "./contexts/LanguageContext";
import { PAGE_META, trackPageView } from "./utils/analytics";

// Lazy load pages
const HomePage = React.lazy(() => import("./pages/HomePage"));
const TypingTestPage = React.lazy(() => import("./pages/TypingTestPage"));
const TypingTestSEOPage = React.lazy(() => import("./pages/TypingTestSEOPage"));
const TypingGamesPage = React.lazy(() => import("./pages/TypingGamesPage"));
const DailyTypingChallengePage = React.lazy(
  () => import("./pages/DailyTypingChallengePage"),
);

// Legal pages
const ContactUsPage = React.lazy(() => import("./pages/ContactUsPage"));
const AboutUsPage = React.lazy(() => import("./pages/AboutUsPage"));
const PrivacyPolicyPage = React.lazy(() => import("./pages/PrivacyPolicyPage"));
const DisclaimerPage = React.lazy(() => import("./pages/DisclaimerPage"));
const TermsOfUsePage = React.lazy(() => import("./pages/TermsOfUsePage"));
const DMCAPolicyPage = React.lazy(() => import("./pages/DMCAPolicyPage"));
const VerifyCertificatePage = React.lazy(
  () => import("./pages/VerifyCertificatePage"),
);
const CalculatorsPage = React.lazy(() => import("./pages/CalculatorsPage"));
const TypingPracticePage = React.lazy(
  () => import("./pages/TypingPracticePage"),
);
const LearnTouchTypingPage = React.lazy(
  () => import("./pages/LearnTouchTypingPage"),
);
const FreeTypingLessonsPage = React.lazy(
  () => import("./pages/FreeTypingLessonsPage"),
);
const TypingSpeedPracticePage = React.lazy(
  () => import("./pages/TypingSpeedPracticePage"),
);
const PDFToolsPage = React.lazy(() => import("./pages/PDFToolsPage"));
const ImageToolsPage = React.lazy(() => import("./pages/ImageToolsPage"));
const ResumeBuilderPage = React.lazy(() => import("./pages/ResumeBuilderPage"));
const SitemapPage = React.lazy(() => import("./pages/SitemapPage"));
const SmartDocumentFixerPage = React.lazy(
  () => import("./pages/image-tools/SmartDocumentFixerPage"),
);
const AIDocumentEnhancerPage = React.lazy(
  () => import("./pages/image-tools/AIDocumentEnhancerPage"),
);

// New Typing SEO Pages
const TypingSpeedTestPage = React.lazy(
  () => import("./pages/seo-typing/TypingSpeedTestPage"),
);
const TypingTestOnlinePage = React.lazy(
  () => import("./pages/seo-typing/TypingTestOnlinePage"),
);
const TypingTestFreePage = React.lazy(
  () => import("./pages/seo-typing/TypingTestFreePage"),
);
const CheckTypingSpeedPage = React.lazy(
  () => import("./pages/seo-typing/CheckTypingSpeedPage"),
);
const TypingTestCertificatePage = React.lazy(
  () => import("./pages/seo-typing/TypingTestCertificatePage"),
);
const TypingPracticeOnlinePage = React.lazy(
  () => import("./pages/seo-typing/TypingPracticeOnlinePage"),
);
const TouchTypingPracticePage = React.lazy(
  () => import("./pages/seo-typing/TouchTypingPracticePage"),
);
const ImproveTypingSpeedPage = React.lazy(
  () => import("./pages/seo-typing/ImproveTypingSpeedPage"),
);
const LearnTypingOnlinePage = React.lazy(
  () => import("./pages/seo-typing/LearnTypingOnlinePage"),
);
const TypingTestForJobsPage = React.lazy(
  () => import("./pages/seo-typing/TypingTestForJobsPage"),
);
const TypingTest30SecondsPage = React.lazy(
  () => import("./pages/seo-typing/TypingTest30SecondsPage"),
);
const TypingTest2MinutePage = React.lazy(
  () => import("./pages/seo-typing/TypingTest2MinutePage"),
);
const TypingTest10MinutePage = React.lazy(
  () => import("./pages/seo-typing/TypingTest10MinutePage"),
);

// New Document Tool SEO Pages
const ResizePassportPhotoPage = React.lazy(
  () => import("./pages/seo-docs/ResizePassportPhotoPage"),
);
const PassportPhotoResizeSEOPage = React.lazy(
  () => import("./pages/seo-docs/PassportPhotoResizeSEOPage"),
);
const AadhaarPhotoResizeSEOPage = React.lazy(
  () => import("./pages/seo-docs/AadhaarPhotoResizeSEOPage"),
);
const ResizeAadhaarPhotoPage = React.lazy(
  () => import("./pages/seo-docs/ResizeAadhaarPhotoPage"),
);
const PANCardPhotoResizePage = React.lazy(
  () => import("./pages/seo-docs/PANCardPhotoResizePage"),
);
const SignatureResizeOnlinePage = React.lazy(
  () => import("./pages/seo-docs/SignatureResizeOnlinePage"),
);
const CompressImageOnlinePage = React.lazy(
  () => import("./pages/seo-docs/CompressImageOnlinePage"),
);
const ConvertJpgToPngPage = React.lazy(
  () => import("./pages/seo-docs/ConvertJpgToPngPage"),
);
const PDFToWordPage = React.lazy(
  () => import("./pages/seo-docs/PDFToWordPage"),
);
const MergePDFPage = React.lazy(() => import("./pages/seo-docs/MergePDFPage"));
const CompressPDFPage = React.lazy(
  () => import("./pages/seo-docs/CompressPDFPage"),
);
const ImageBackgroundRemoverSEOPage = React.lazy(
  () => import("./pages/seo-docs/ImageBackgroundRemoverPage"),
);

// Utility Tool Pages
const WordCountToolPage = React.lazy(
  () => import("./pages/seo-docs/WordCountToolPage"),
);
const RandomPasswordGeneratorPage = React.lazy(
  () => import("./pages/seo-docs/RandomPasswordGeneratorPage"),
);
const JSONFormatterPage = React.lazy(
  () => import("./pages/seo-docs/JSONFormatterPage"),
);

// Calculator SEO Pages
const PercentageCalculatorPage = React.lazy(
  () => import("./pages/seo-calculators/PercentageCalculatorPage"),
);
const DiscountCalculatorSEOPage = React.lazy(
  () => import("./pages/seo-calculators/DiscountCalculatorSEOPage"),
);
const LoanEMICalculatorPage = React.lazy(
  () => import("./pages/seo-calculators/LoanEMICalculatorPage"),
);
const AgeCalculatorSEOPage = React.lazy(
  () => import("./pages/seo-calculators/AgeCalculatorSEOPage"),
);
const DateDifferenceCalculatorSEOPage = React.lazy(
  () => import("./pages/seo-calculators/DateDifferenceCalculatorSEOPage"),
);
const GSTCalculatorSEOPage = React.lazy(
  () => import("./pages/seo-calculators/GSTCalculatorSEOPage"),
);

// Calculator pages
const AgeCalculatorPage = React.lazy(
  () => import("./pages/calculators/AgeCalculatorPage"),
);
const BMICalculatorPage = React.lazy(
  () => import("./pages/calculators/BMICalculatorPage"),
);
const CGPACalculatorPage = React.lazy(
  () => import("./pages/calculators/CGPACalculatorPage"),
);
const CGPAToPercentageConverterPage = React.lazy(
  () => import("./pages/calculators/CGPAToPercentageConverterPage"),
);
const CompoundInterestCalculatorPage = React.lazy(
  () => import("./pages/calculators/CompoundInterestCalculatorPage"),
);
const DateDifferenceCalculatorPage = React.lazy(
  () => import("./pages/calculators/DateDifferenceCalculatorPage"),
);
const DiscountCalculatorPage = React.lazy(
  () => import("./pages/calculators/DiscountCalculatorPage"),
);
const DivisionCalculatorPage = React.lazy(
  () => import("./pages/calculators/DivisionCalculatorPage"),
);
const EMICalculatorPage = React.lazy(
  () => import("./pages/calculators/EMICalculatorPage"),
);
const GPACalculatorPage = React.lazy(
  () => import("./pages/calculators/GPACalculatorPage"),
);
const GradeCalculatorPage = React.lazy(
  () => import("./pages/calculators/GradeCalculatorPage"),
);
const GSTCalculatorPage = React.lazy(
  () => import("./pages/calculators/GSTCalculatorPage"),
);
const LoanCalculatorPage = React.lazy(
  () => import("./pages/calculators/LoanCalculatorPage"),
);
const MarksPercentageCalculatorPage = React.lazy(
  () => import("./pages/calculators/MarksPercentageCalculatorPage"),
);
const PercentageToCGPAConverterPage = React.lazy(
  () => import("./pages/calculators/PercentageToCGPAConverterPage"),
);
const ProfitLossCalculatorPage = React.lazy(
  () => import("./pages/calculators/ProfitLossCalculatorPage"),
);
const SalaryHikeCalculatorPage = React.lazy(
  () => import("./pages/calculators/SalaryHikeCalculatorPage"),
);
const SGPACalculatorPage = React.lazy(
  () => import("./pages/calculators/SGPACalculatorPage"),
);
const SimpleInterestCalculatorPage = React.lazy(
  () => import("./pages/calculators/SimpleInterestCalculatorPage"),
);
const TimeDurationCalculatorPage = React.lazy(
  () => import("./pages/calculators/TimeDurationCalculatorPage"),
);

// Image tool pages
const PassportPhotoMakerPage = React.lazy(
  () => import("./pages/image-tools/PassportPhotoMakerPage"),
);
const AadhaarPhotoResizePage = React.lazy(
  () => import("./pages/image-tools/AadhaarPhotoResizePage"),
);
const PANPhotoResizePage = React.lazy(
  () => import("./pages/image-tools/PANPhotoResizePage"),
);
const SSCPhotoResizePage = React.lazy(
  () => import("./pages/image-tools/SSCPhotoResizePage"),
);
const RailwayPhotoResizePage = React.lazy(
  () => import("./pages/image-tools/RailwayPhotoResizePage"),
);
const PoliceArmyPhotoPage = React.lazy(
  () => import("./pages/image-tools/PoliceArmyPhotoPage"),
);
const VisaPhotoResizePage = React.lazy(
  () => import("./pages/image-tools/VisaPhotoResizePage"),
);
const SignatureResizePage = React.lazy(
  () => import("./pages/image-tools/SignatureResizePage"),
);
const ImageCompressorPage = React.lazy(
  () => import("./pages/image-tools/ImageCompressorPage"),
);
const ImageCropperPage = React.lazy(
  () => import("./pages/image-tools/ImageCropperPage"),
);
const DPIChangerPage = React.lazy(
  () => import("./pages/image-tools/DPIChangerPage"),
);
const CustomImageResizePage = React.lazy(
  () => import("./pages/image-tools/CustomImageResizePage"),
);
const JPGToPNGPage = React.lazy(
  () => import("./pages/image-tools/JPGToPNGPage"),
);
const PNGToJPGPage = React.lazy(
  () => import("./pages/image-tools/PNGToJPGPage"),
);
const WEBPConverterPage = React.lazy(
  () => import("./pages/image-tools/WEBPConverterPage"),
);
const BackgroundRemoverPage = React.lazy(
  () => import("./pages/image-tools/BackgroundRemoverPage"),
);

// Resume builder pages
const ResumeTemplateBuilderPage = React.lazy(
  () => import("./pages/resume-builder/ResumeTemplateBuilderPage"),
);

type Page =
  | "home"
  | "sitemap"
  | "calculators"
  | "pdf-tools"
  | "image-tools"
  | "resume-builder"
  | "smart-document-fixer"
  | "ai-document-enhancer"
  // calculators
  | "calc-age"
  | "calc-bmi"
  | "calc-cgpa"
  | "calc-cgpa-to-percentage"
  | "calc-compound-interest"
  | "calc-date-difference"
  | "calc-discount"
  | "calc-division"
  | "calc-emi"
  | "calc-gpa"
  | "calc-grade"
  | "calc-gst"
  | "calc-loan"
  | "calc-marks-percentage"
  | "calc-percentage-to-cgpa"
  | "calc-profit-loss"
  | "calc-salary-hike"
  | "calc-sgpa"
  | "calc-simple-interest"
  | "calc-time-duration"
  // image tools
  | "image-passport-photo"
  | "image-aadhaar-photo"
  | "image-pan-photo"
  | "image-ssc-photo"
  | "image-railway-photo"
  | "image-police-army-photo"
  | "image-visa-photo"
  | "image-signature-resize"
  | "image-compressor"
  | "image-cropper"
  | "image-dpi-changer"
  | "image-custom-resize"
  | "image-jpg-to-png"
  | "image-png-to-jpg"
  | "image-webp-converter"
  | "image-background-remover"
  // typing
  | "typing-test"
  | "typing-games"
  | "daily-typing-challenge"
  | "typing-test-1-minute"
  | "typing-test-3-minute"
  | "typing-test-5-minute"
  | "verify-certificate"
  | "typing-practice"
  | "learn-touch-typing"
  | "free-typing-lessons"
  | "typing-speed-practice"
  // new typing SEO pages
  | "typing-speed-test"
  | "typing-test-online"
  | "typing-test-free"
  | "check-typing-speed"
  | "typing-test-with-certificate"
  | "typing-practice-online"
  | "touch-typing-practice"
  | "improve-typing-speed"
  | "learn-typing-online"
  | "typing-test-for-jobs"
  | "typing-test-30-seconds"
  | "typing-test-2-minute"
  | "typing-test-10-minute"
  // new document tool SEO pages
  | "passport-photo-resize"
  | "aadhaar-photo-resize"
  | "resize-passport-photo-online"
  | "resize-photo-for-aadhaar-card"
  | "pan-card-photo-resize"
  | "signature-resize-online"
  | "compress-image-online-free"
  | "convert-jpg-to-png-online"
  | "pdf-to-word-converter"
  | "merge-pdf-files-online"
  | "compress-pdf-file"
  | "seo-image-background-remover"
  // utility tool pages
  | "word-count-tool"
  | "random-password-generator"
  | "json-formatter-online"
  // calculator SEO pages
  | "percentage-calculator"
  | "discount-calculator"
  | "loan-emi-calculator"
  | "age-calculator-online"
  | "date-difference-calculator"
  | "gst-calculator"
  // legal pages
  | "contact-us"
  | "about-us"
  | "privacy-policy"
  | "disclaimer"
  | "terms-and-conditions"
  | "dmca-policy"
  // resume templates
  | "resume-fresher-india"
  | "resume-experienced-india"
  | "resume-professional-india"
  | "resume-simple-india"
  | "resume-creative-india"
  | "resume-government-india"
  | "resume-academic-india"
  | "resume-fresher-intl"
  | "resume-experienced-intl"
  | "resume-professional-intl"
  | "resume-simple-intl"
  | "resume-creative-intl"
  | "resume-executive-intl"
  | "resume-academic-intl";

const LoadingFallback = () => (
  <div className="min-h-screen bg-gray-900 flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4" />
      <p className="text-gray-400">Loading...</p>
    </div>
  </div>
);

function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");

  // Track page views on every SPA route change
  useEffect(() => {
    const meta = PAGE_META[currentPage];
    trackPageView({
      page_title: meta?.title ?? `${currentPage} — DocMasterTools`,
      page_url: `https://docmastertools.com/${currentPage === "home" ? "" : currentPage}`,
      page_category: meta?.category ?? "other",
    });
  }, [currentPage]);

  // Accept string, cast to Page internally
  const navigate = (page: string) => {
    setCurrentPage(page as Page);
    window.scrollTo(0, 0);
  };

  const goHome = () => navigate("home");

  const renderPage = () => {
    // Normalize image-tools/ sub-routes to flat image tool page IDs
    let effectivePage: string = currentPage;
    if (effectivePage.startsWith("image-tools/")) {
      const toolId = effectivePage.slice("image-tools/".length);
      if (
        toolId === "ai-document-enhancer" ||
        toolId === "smart-document-fixer"
      ) {
        effectivePage = toolId;
      } else if (toolId.startsWith("image-")) {
        effectivePage = toolId; // already has image- prefix (e.g. image-compressor)
      } else {
        effectivePage = `image-${toolId}`;
      }
    }

    // Handle pdf-tools sub-routes (e.g. "pdf-tools/pdf-to-jpg")
    if (effectivePage.startsWith("pdf-tools/")) {
      const toolId = effectivePage.slice("pdf-tools/".length);
      return <PDFToolsPage onNavigate={navigate} currentTool={toolId} />;
    }

    // Normalize CalculatorsPage IDs to App.tsx switch case names
    const calcIdMap: Record<string, string> = {
      "cgpa-calculator": "calc-cgpa",
      "sgpa-calculator": "calc-sgpa",
      "cgpa-to-percentage-converter": "calc-cgpa-to-percentage",
      "percentage-to-cgpa-converter": "calc-percentage-to-cgpa",
      "grade-calculator": "calc-grade",
      "gpa-calculator": "calc-gpa",
      "marks-percentage-calculator": "calc-marks-percentage",
      "division-calculator": "calc-division",
      "gst-calculator": "calc-gst",
      "emi-calculator": "calc-emi",
      "loan-calculator": "calc-loan",
      "compound-interest-calculator": "calc-compound-interest",
      "simple-interest-calculator": "calc-simple-interest",
      "discount-calculator": "calc-discount",
      "profit-loss-calculator": "calc-profit-loss",
      "salary-hike-calculator": "calc-salary-hike",
      "bmi-calculator": "calc-bmi",
      "age-calculator": "calc-age",
      "date-difference-calculator": "calc-date-difference",
      "time-duration-calculator": "calc-time-duration",
    };
    if (calcIdMap[effectivePage]) {
      effectivePage = calcIdMap[effectivePage];
    }

    switch (effectivePage) {
      case "home":
        return <HomePage onNavigate={navigate} />;
      case "sitemap":
        return <SitemapPage onNavigate={navigate} />;
      case "calculators":
        return <CalculatorsPage onNavigate={navigate} onBack={goHome} />;
      case "pdf-tools":
        return <PDFToolsPage onNavigate={navigate} />;

      case "image-tools":
        return <ImageToolsPage onNavigate={navigate} />;
      case "resume-builder":
        return <ResumeBuilderPage onNavigate={navigate} />;
      case "smart-document-fixer":
        return (
          <SmartDocumentFixerPage
            onBack={() => navigate("image-tools")}
            onNavigate={navigate}
          />
        );
      case "ai-document-enhancer":
        return (
          <AIDocumentEnhancerPage
            onBack={() => navigate("image-tools")}
            onNavigate={navigate}
          />
        );

      // Calculators
      case "calc-age":
        return <AgeCalculatorPage onBack={() => navigate("calculators")} />;
      case "calc-bmi":
        return <BMICalculatorPage onBack={() => navigate("calculators")} />;
      case "calc-cgpa":
        return <CGPACalculatorPage onBack={() => navigate("calculators")} />;
      case "calc-cgpa-to-percentage":
        return (
          <CGPAToPercentageConverterPage
            onBack={() => navigate("calculators")}
          />
        );
      case "calc-compound-interest":
        return (
          <CompoundInterestCalculatorPage
            onBack={() => navigate("calculators")}
          />
        );
      case "calc-date-difference":
        return (
          <DateDifferenceCalculatorPage
            onBack={() => navigate("calculators")}
          />
        );
      case "calc-discount":
        return (
          <DiscountCalculatorPage onBack={() => navigate("calculators")} />
        );
      case "calc-division":
        return (
          <DivisionCalculatorPage onBack={() => navigate("calculators")} />
        );
      case "calc-emi":
        return <EMICalculatorPage onBack={() => navigate("calculators")} />;
      case "calc-gpa":
        return <GPACalculatorPage onBack={() => navigate("calculators")} />;
      case "calc-grade":
        return <GradeCalculatorPage onBack={() => navigate("calculators")} />;
      case "calc-gst":
        return <GSTCalculatorPage onBack={() => navigate("calculators")} />;
      case "calc-loan":
        return <LoanCalculatorPage onBack={() => navigate("calculators")} />;
      case "calc-marks-percentage":
        return (
          <MarksPercentageCalculatorPage
            onBack={() => navigate("calculators")}
          />
        );
      case "calc-percentage-to-cgpa":
        return (
          <PercentageToCGPAConverterPage
            onBack={() => navigate("calculators")}
          />
        );
      case "calc-profit-loss":
        return (
          <ProfitLossCalculatorPage onBack={() => navigate("calculators")} />
        );
      case "calc-salary-hike":
        return (
          <SalaryHikeCalculatorPage onBack={() => navigate("calculators")} />
        );
      case "calc-sgpa":
        return <SGPACalculatorPage onBack={() => navigate("calculators")} />;
      case "calc-simple-interest":
        return (
          <SimpleInterestCalculatorPage
            onBack={() => navigate("calculators")}
          />
        );
      case "calc-time-duration":
        return (
          <TimeDurationCalculatorPage onBack={() => navigate("calculators")} />
        );

      case "typing-test":
        return <TypingTestPage onBack={goHome} onNavigate={navigate} />;

      case "typing-games":
        return <TypingGamesPage onBack={goHome} onNavigate={navigate} />;

      case "daily-typing-challenge":
        return (
          <DailyTypingChallengePage onBack={goHome} onNavigate={navigate} />
        );

      case "typing-practice":
        return <TypingPracticePage onNavigate={navigate} onBack={goHome} />;
      case "learn-touch-typing":
        return <LearnTouchTypingPage onNavigate={navigate} onBack={goHome} />;
      case "free-typing-lessons":
        return <FreeTypingLessonsPage onNavigate={navigate} onBack={goHome} />;
      case "typing-speed-practice":
        return (
          <TypingSpeedPracticePage onNavigate={navigate} onBack={goHome} />
        );

      case "typing-test-1-minute":
        return (
          <TypingTestSEOPage
            duration={1}
            onNavigate={navigate}
            onBack={goHome}
          />
        );
      case "typing-test-3-minute":
        return (
          <TypingTestSEOPage
            duration={3}
            onNavigate={navigate}
            onBack={goHome}
          />
        );
      case "typing-test-5-minute":
        return (
          <TypingTestSEOPage
            duration={5}
            onNavigate={navigate}
            onBack={goHome}
          />
        );

      case "verify-certificate":
        return <VerifyCertificatePage onBack={goHome} />;

      // New Typing SEO Pages
      case "typing-speed-test":
        return <TypingSpeedTestPage onNavigate={navigate} onBack={goHome} />;
      case "typing-test-online":
        return <TypingTestOnlinePage onNavigate={navigate} onBack={goHome} />;
      case "typing-test-free":
        return <TypingTestFreePage onNavigate={navigate} onBack={goHome} />;
      case "check-typing-speed":
        return <CheckTypingSpeedPage onNavigate={navigate} onBack={goHome} />;
      case "typing-test-with-certificate":
        return (
          <TypingTestCertificatePage onNavigate={navigate} onBack={goHome} />
        );
      case "typing-practice-online":
        return (
          <TypingPracticeOnlinePage onNavigate={navigate} onBack={goHome} />
        );
      case "touch-typing-practice":
        return (
          <TouchTypingPracticePage onNavigate={navigate} onBack={goHome} />
        );
      case "improve-typing-speed":
        return <ImproveTypingSpeedPage onNavigate={navigate} onBack={goHome} />;
      case "learn-typing-online":
        return <LearnTypingOnlinePage onNavigate={navigate} onBack={goHome} />;
      case "typing-test-for-jobs":
        return <TypingTestForJobsPage onNavigate={navigate} onBack={goHome} />;
      case "typing-test-30-seconds":
        return (
          <TypingTest30SecondsPage onNavigate={navigate} onBack={goHome} />
        );
      case "typing-test-2-minute":
        return <TypingTest2MinutePage onNavigate={navigate} onBack={goHome} />;
      case "typing-test-10-minute":
        return <TypingTest10MinutePage onNavigate={navigate} onBack={goHome} />;

      // New Document Tool SEO Pages
      case "passport-photo-resize":
        return (
          <PassportPhotoResizeSEOPage onNavigate={navigate} onBack={goHome} />
        );
      case "aadhaar-photo-resize":
        return (
          <AadhaarPhotoResizeSEOPage onNavigate={navigate} onBack={goHome} />
        );
      case "resize-passport-photo-online":
        return <ResizePassportPhotoPage onNavigate={navigate} />;
      case "resize-photo-for-aadhaar-card":
        return <ResizeAadhaarPhotoPage onNavigate={navigate} />;
      case "pan-card-photo-resize":
        return <PANCardPhotoResizePage onNavigate={navigate} />;
      case "signature-resize-online":
        return <SignatureResizeOnlinePage onNavigate={navigate} />;
      case "compress-image-online-free":
        return <CompressImageOnlinePage onNavigate={navigate} />;
      case "convert-jpg-to-png-online":
        return <ConvertJpgToPngPage onNavigate={navigate} />;
      case "pdf-to-word-converter":
        return <PDFToWordPage onNavigate={navigate} />;
      case "merge-pdf-files-online":
        return <MergePDFPage onNavigate={navigate} />;
      case "compress-pdf-file":
        return <CompressPDFPage onNavigate={navigate} />;
      case "seo-image-background-remover":
        return <ImageBackgroundRemoverSEOPage onNavigate={navigate} />;

      // Utility Tool Pages
      case "word-count-tool":
        return <WordCountToolPage onNavigate={navigate} onBack={goHome} />;
      case "random-password-generator":
        return (
          <RandomPasswordGeneratorPage onNavigate={navigate} onBack={goHome} />
        );
      case "json-formatter-online":
        return <JSONFormatterPage onNavigate={navigate} onBack={goHome} />;

      // Calculator SEO Pages
      case "percentage-calculator":
        return (
          <PercentageCalculatorPage onNavigate={navigate} onBack={goHome} />
        );
      case "discount-calculator":
        return (
          <DiscountCalculatorSEOPage onNavigate={navigate} onBack={goHome} />
        );
      case "loan-emi-calculator":
        return <LoanEMICalculatorPage onNavigate={navigate} onBack={goHome} />;
      case "age-calculator-online":
        return <AgeCalculatorSEOPage onNavigate={navigate} onBack={goHome} />;
      case "date-difference-calculator":
        return (
          <DateDifferenceCalculatorSEOPage
            onNavigate={navigate}
            onBack={goHome}
          />
        );
      case "gst-calculator":
        return <GSTCalculatorSEOPage onNavigate={navigate} onBack={goHome} />;

      // Legal pages
      case "contact-us":
        return <ContactUsPage onBack={goHome} />;
      case "about-us":
        return <AboutUsPage onBack={goHome} />;
      case "privacy-policy":
        return <PrivacyPolicyPage onBack={goHome} />;
      case "disclaimer":
        return <DisclaimerPage onBack={goHome} />;
      case "terms-and-conditions":
        return <TermsOfUsePage onBack={goHome} />;
      case "dmca-policy":
        return <DMCAPolicyPage onBack={goHome} />;

      // Image tools
      case "image-passport-photo":
        return <PassportPhotoMakerPage onNavigate={navigate} />;
      case "image-aadhaar-photo":
        return <AadhaarPhotoResizePage onNavigate={navigate} />;
      case "image-pan-photo":
        return <PANPhotoResizePage onNavigate={navigate} />;
      case "image-ssc-photo":
        return <SSCPhotoResizePage onNavigate={navigate} />;
      case "image-railway-photo":
        return <RailwayPhotoResizePage onNavigate={navigate} />;
      case "image-police-army-photo":
        return <PoliceArmyPhotoPage onNavigate={navigate} />;
      case "image-visa-photo":
        return <VisaPhotoResizePage onNavigate={navigate} />;
      case "image-signature-resize":
        return <SignatureResizePage onNavigate={navigate} />;
      case "image-compressor":
        return <ImageCompressorPage onNavigate={navigate} />;
      case "image-cropper":
        return <ImageCropperPage onNavigate={navigate} />;
      case "image-dpi-changer":
        return <DPIChangerPage onNavigate={navigate} />;
      case "image-custom-resize":
        return <CustomImageResizePage onNavigate={navigate} />;
      case "image-jpg-to-png":
        return <JPGToPNGPage onNavigate={navigate} />;
      case "image-png-to-jpg":
        return <PNGToJPGPage onNavigate={navigate} />;
      case "image-webp-converter":
        return <WEBPConverterPage onNavigate={navigate} />;
      case "image-background-remover":
        return <BackgroundRemoverPage onNavigate={navigate} />;

      // Resume templates
      case "resume-fresher-india":
        return (
          <ResumeTemplateBuilderPage
            templateSlug="fresher-india"
            onBack={() => navigate("resume-builder")}
          />
        );
      case "resume-experienced-india":
        return (
          <ResumeTemplateBuilderPage
            templateSlug="experienced-india"
            onBack={() => navigate("resume-builder")}
          />
        );
      case "resume-professional-india":
        return (
          <ResumeTemplateBuilderPage
            templateSlug="professional-india"
            onBack={() => navigate("resume-builder")}
          />
        );
      case "resume-simple-india":
        return (
          <ResumeTemplateBuilderPage
            templateSlug="simple-india"
            onBack={() => navigate("resume-builder")}
          />
        );
      case "resume-creative-india":
        return (
          <ResumeTemplateBuilderPage
            templateSlug="creative-india"
            onBack={() => navigate("resume-builder")}
          />
        );
      case "resume-government-india":
        return (
          <ResumeTemplateBuilderPage
            templateSlug="government-india"
            onBack={() => navigate("resume-builder")}
          />
        );
      case "resume-academic-india":
        return (
          <ResumeTemplateBuilderPage
            templateSlug="academic-india"
            onBack={() => navigate("resume-builder")}
          />
        );
      case "resume-fresher-intl":
        return (
          <ResumeTemplateBuilderPage
            templateSlug="fresher-international"
            onBack={() => navigate("resume-builder")}
          />
        );
      case "resume-experienced-intl":
        return (
          <ResumeTemplateBuilderPage
            templateSlug="experienced-international"
            onBack={() => navigate("resume-builder")}
          />
        );
      case "resume-professional-intl":
        return (
          <ResumeTemplateBuilderPage
            templateSlug="professional-international"
            onBack={() => navigate("resume-builder")}
          />
        );
      case "resume-simple-intl":
        return (
          <ResumeTemplateBuilderPage
            templateSlug="simple-international"
            onBack={() => navigate("resume-builder")}
          />
        );
      case "resume-creative-intl":
        return (
          <ResumeTemplateBuilderPage
            templateSlug="creative-international"
            onBack={() => navigate("resume-builder")}
          />
        );
      case "resume-executive-intl":
        return (
          <ResumeTemplateBuilderPage
            templateSlug="executive-international"
            onBack={() => navigate("resume-builder")}
          />
        );
      case "resume-academic-intl":
        return (
          <ResumeTemplateBuilderPage
            templateSlug="academic-international"
            onBack={() => navigate("resume-builder")}
          />
        );

      default:
        return <HomePage onNavigate={navigate} />;
    }
  };

  return (
    <LanguageProvider>
      <OrganizationSchema />
      <WebsiteSearchSchema />
      <div className="min-h-screen bg-gray-900 flex flex-col">
        <Header onNavigate={navigate} onNavigateHome={goHome} />
        <main className="flex-1">
          <Suspense fallback={<LoadingFallback />}>{renderPage()}</Suspense>
        </main>
        <Footer onNavigate={navigate} />
      </div>
    </LanguageProvider>
  );
}

export default App;
