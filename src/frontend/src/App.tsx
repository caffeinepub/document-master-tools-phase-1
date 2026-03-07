import React, { useState, Suspense } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { LanguageProvider } from "./contexts/LanguageContext";

// Lazy load pages
const HomePage = React.lazy(() => import("./pages/HomePage"));
const TypingTestPage = React.lazy(() => import("./pages/TypingTestPage"));
const TypingTestSEOPage = React.lazy(() => import("./pages/TypingTestSEOPage"));

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
const PDFToolsPage = React.lazy(() => import("./pages/PDFToolsPage"));
const ImageToolsPage = React.lazy(() => import("./pages/ImageToolsPage"));
const ResumeBuilderPage = React.lazy(() => import("./pages/ResumeBuilderPage"));
const SmartDocumentFixerPage = React.lazy(
  () => import("./pages/image-tools/SmartDocumentFixerPage"),
);
const AIDocumentEnhancerPage = React.lazy(
  () => import("./pages/image-tools/AIDocumentEnhancerPage"),
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
  | "typing-test-1-minute"
  | "typing-test-3-minute"
  | "typing-test-5-minute"
  | "verify-certificate"
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

  // Accept string, cast to Page internally
  const navigate = (page: string) => {
    setCurrentPage(page as Page);
    window.scrollTo(0, 0);
  };

  const goHome = () => navigate("home");

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage onNavigate={navigate} />;
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
        return <TypingTestPage onBack={goHome} />;

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
