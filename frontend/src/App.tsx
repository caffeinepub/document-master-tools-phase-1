import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import { LanguageProvider } from './contexts/LanguageContext';
import { lazy, Suspense, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfUsePage from './pages/TermsOfUsePage';
import DisclaimerPage from './pages/DisclaimerPage';
import { Loader2 } from 'lucide-react';

// Lazy load heavy modules for code splitting
const PDFToolsPage = lazy(() => import('./pages/PDFToolsPage'));
const ImageToolsPage = lazy(() => import('./pages/ImageToolsPage'));
const ResumeBuilderPage = lazy(() => import('./pages/ResumeBuilderPage'));
const ResumeTemplateBuilderPage = lazy(() => import('./pages/resume-builder/ResumeTemplateBuilderPage'));
const CalculatorsPage = lazy(() => import('./pages/CalculatorsPage'));

// Lazy load calculator pages
const CGPACalculatorPage = lazy(() => import('./pages/calculators/CGPACalculatorPage'));
const SGPACalculatorPage = lazy(() => import('./pages/calculators/SGPACalculatorPage'));
const CGPAToPercentageConverterPage = lazy(() => import('./pages/calculators/CGPAToPercentageConverterPage'));
const PercentageToCGPAConverterPage = lazy(() => import('./pages/calculators/PercentageToCGPAConverterPage'));
const GradeCalculatorPage = lazy(() => import('./pages/calculators/GradeCalculatorPage'));
const GPACalculatorPage = lazy(() => import('./pages/calculators/GPACalculatorPage'));
const MarksPercentageCalculatorPage = lazy(() => import('./pages/calculators/MarksPercentageCalculatorPage'));
const DivisionCalculatorPage = lazy(() => import('./pages/calculators/DivisionCalculatorPage'));
const GSTCalculatorPage = lazy(() => import('./pages/calculators/GSTCalculatorPage'));
const EMICalculatorPage = lazy(() => import('./pages/calculators/EMICalculatorPage'));
const LoanCalculatorPage = lazy(() => import('./pages/calculators/LoanCalculatorPage'));
const CompoundInterestCalculatorPage = lazy(() => import('./pages/calculators/CompoundInterestCalculatorPage'));
const SimpleInterestCalculatorPage = lazy(() => import('./pages/calculators/SimpleInterestCalculatorPage'));
const DiscountCalculatorPage = lazy(() => import('./pages/calculators/DiscountCalculatorPage'));
const ProfitLossCalculatorPage = lazy(() => import('./pages/calculators/ProfitLossCalculatorPage'));
const SalaryHikeCalculatorPage = lazy(() => import('./pages/calculators/SalaryHikeCalculatorPage'));
const BMICalculatorPage = lazy(() => import('./pages/calculators/BMICalculatorPage'));
const AgeCalculatorPage = lazy(() => import('./pages/calculators/AgeCalculatorPage'));
const DateDifferenceCalculatorPage = lazy(() => import('./pages/calculators/DateDifferenceCalculatorPage'));
const TimeDurationCalculatorPage = lazy(() => import('./pages/calculators/TimeDurationCalculatorPage'));

// Lazy load image tool pages
const PassportPhotoMakerPage = lazy(() => import('./pages/image-tools/PassportPhotoMakerPage'));
const AadhaarPhotoResizePage = lazy(() => import('./pages/image-tools/AadhaarPhotoResizePage'));
const PANPhotoResizePage = lazy(() => import('./pages/image-tools/PANPhotoResizePage'));
const SSCPhotoResizePage = lazy(() => import('./pages/image-tools/SSCPhotoResizePage'));
const RailwayPhotoResizePage = lazy(() => import('./pages/image-tools/RailwayPhotoResizePage'));
const PoliceArmyPhotoPage = lazy(() => import('./pages/image-tools/PoliceArmyPhotoPage'));
const VisaPhotoResizePage = lazy(() => import('./pages/image-tools/VisaPhotoResizePage'));
const SignatureResizePage = lazy(() => import('./pages/image-tools/SignatureResizePage'));
const ImageCompressorPage = lazy(() => import('./pages/image-tools/ImageCompressorPage'));
const ImageCropperPage = lazy(() => import('./pages/image-tools/ImageCropperPage'));
const DPIChangerPage = lazy(() => import('./pages/image-tools/DPIChangerPage'));
const CustomImageResizePage = lazy(() => import('./pages/image-tools/CustomImageResizePage'));
const JPGToPNGPage = lazy(() => import('./pages/image-tools/JPGToPNGPage'));
const PNGToJPGPage = lazy(() => import('./pages/image-tools/PNGToJPGPage'));
const WEBPConverterPage = lazy(() => import('./pages/image-tools/WEBPConverterPage'));
const BackgroundRemoverPage = lazy(() => import('./pages/image-tools/BackgroundRemoverPage'));
const SmartDocumentFixerPage = lazy(() => import('./pages/image-tools/SmartDocumentFixerPage'));

type Page =
  | 'home' | 'pdf-tools' | 'image-tools' | 'resume-builder' | 'privacy' | 'terms' | 'disclaimer'
  | 'calculators'
  | 'cgpa-calculator' | 'sgpa-calculator' | 'cgpa-to-percentage-converter' | 'percentage-to-cgpa-converter'
  | 'grade-calculator' | 'gpa-calculator' | 'marks-percentage-calculator' | 'division-calculator'
  | 'gst-calculator' | 'emi-calculator' | 'loan-calculator' | 'compound-interest-calculator'
  | 'simple-interest-calculator' | 'discount-calculator' | 'profit-loss-calculator' | 'salary-hike-calculator'
  | 'bmi-calculator' | 'age-calculator' | 'date-difference-calculator' | 'time-duration-calculator'
  | 'passport-photo-maker' | 'aadhaar-photo-resize' | 'pan-photo-resize' | 'ssc-photo-resize'
  | 'railway-photo-resize' | 'police-army-photo' | 'visa-photo-resize' | 'signature-resize'
  | 'image-compressor' | 'image-cropper' | 'dpi-changer' | 'custom-image-resize'
  | 'jpg-to-png' | 'png-to-jpg' | 'webp-converter' | 'background-remover' | 'smart-document-fixer'
  | 'fresher-resume' | 'government-job-resume' | 'private-job-resume' | 'hindi-resume'
  | 'biodata-for-marriage' | 'teacher-resume' | 'police-army-resume' | 'ats-friendly-resume'
  | 'us-resume' | 'uk-cv-format' | 'canada-resume' | 'europass-cv' | 'creative-resume' | 'corporate-resume';

const queryClient = new QueryClient();

// Loading fallback component
function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
        <p className="text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const handleNavigate = (page: string) => {
    setCurrentPage(page as Page);
    window.scrollTo(0, 0);
  };

  const handleNavigateHome = () => {
    setCurrentPage('home');
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'pdf-tools':
        return <PDFToolsPage onBack={() => setCurrentPage('home')} />;
      case 'image-tools':
        return <ImageToolsPage onBack={() => setCurrentPage('home')} onNavigate={handleNavigate} />;
      case 'resume-builder':
        return <ResumeBuilderPage onBack={() => setCurrentPage('home')} onNavigate={handleNavigate} />;
      case 'privacy':
        return <PrivacyPolicyPage onBack={() => setCurrentPage('home')} />;
      case 'terms':
        return <TermsOfUsePage onBack={() => setCurrentPage('home')} />;
      case 'disclaimer':
        return <DisclaimerPage onBack={() => setCurrentPage('home')} />;
      case 'calculators':
        return <CalculatorsPage onBack={() => setCurrentPage('home')} onNavigate={handleNavigate} />;
      case 'cgpa-calculator':
        return <CGPACalculatorPage onBack={() => setCurrentPage('calculators')} />;
      case 'sgpa-calculator':
        return <SGPACalculatorPage onBack={() => setCurrentPage('calculators')} />;
      case 'cgpa-to-percentage-converter':
        return <CGPAToPercentageConverterPage onBack={() => setCurrentPage('calculators')} />;
      case 'percentage-to-cgpa-converter':
        return <PercentageToCGPAConverterPage onBack={() => setCurrentPage('calculators')} />;
      case 'grade-calculator':
        return <GradeCalculatorPage onBack={() => setCurrentPage('calculators')} />;
      case 'gpa-calculator':
        return <GPACalculatorPage onBack={() => setCurrentPage('calculators')} />;
      case 'marks-percentage-calculator':
        return <MarksPercentageCalculatorPage onBack={() => setCurrentPage('calculators')} />;
      case 'division-calculator':
        return <DivisionCalculatorPage onBack={() => setCurrentPage('calculators')} />;
      case 'gst-calculator':
        return <GSTCalculatorPage onBack={() => setCurrentPage('calculators')} />;
      case 'emi-calculator':
        return <EMICalculatorPage onBack={() => setCurrentPage('calculators')} />;
      case 'loan-calculator':
        return <LoanCalculatorPage onBack={() => setCurrentPage('calculators')} />;
      case 'compound-interest-calculator':
        return <CompoundInterestCalculatorPage onBack={() => setCurrentPage('calculators')} />;
      case 'simple-interest-calculator':
        return <SimpleInterestCalculatorPage onBack={() => setCurrentPage('calculators')} />;
      case 'discount-calculator':
        return <DiscountCalculatorPage onBack={() => setCurrentPage('calculators')} />;
      case 'profit-loss-calculator':
        return <ProfitLossCalculatorPage onBack={() => setCurrentPage('calculators')} />;
      case 'salary-hike-calculator':
        return <SalaryHikeCalculatorPage onBack={() => setCurrentPage('calculators')} />;
      case 'bmi-calculator':
        return <BMICalculatorPage onBack={() => setCurrentPage('calculators')} />;
      case 'age-calculator':
        return <AgeCalculatorPage onBack={() => setCurrentPage('calculators')} />;
      case 'date-difference-calculator':
        return <DateDifferenceCalculatorPage onBack={() => setCurrentPage('calculators')} />;
      case 'time-duration-calculator':
        return <TimeDurationCalculatorPage onBack={() => setCurrentPage('calculators')} />;
      // Image tool pages — use onNavigate prop
      case 'passport-photo-maker':
        return <PassportPhotoMakerPage onNavigate={handleNavigate} />;
      case 'aadhaar-photo-resize':
        return <AadhaarPhotoResizePage onNavigate={handleNavigate} />;
      case 'pan-photo-resize':
        return <PANPhotoResizePage onNavigate={handleNavigate} />;
      case 'ssc-photo-resize':
        return <SSCPhotoResizePage onNavigate={handleNavigate} />;
      case 'railway-photo-resize':
        return <RailwayPhotoResizePage onNavigate={handleNavigate} />;
      case 'police-army-photo':
        return <PoliceArmyPhotoPage onNavigate={handleNavigate} />;
      case 'visa-photo-resize':
        return <VisaPhotoResizePage onNavigate={handleNavigate} />;
      case 'signature-resize':
        return <SignatureResizePage onNavigate={handleNavigate} />;
      case 'image-compressor':
        return <ImageCompressorPage onNavigate={handleNavigate} />;
      case 'image-cropper':
        return <ImageCropperPage onNavigate={handleNavigate} />;
      case 'dpi-changer':
        return <DPIChangerPage onNavigate={handleNavigate} />;
      case 'custom-image-resize':
        return <CustomImageResizePage onNavigate={handleNavigate} />;
      case 'jpg-to-png':
        return <JPGToPNGPage onNavigate={handleNavigate} />;
      case 'png-to-jpg':
        return <PNGToJPGPage onNavigate={handleNavigate} />;
      case 'webp-converter':
        return <WEBPConverterPage onNavigate={handleNavigate} />;
      case 'background-remover':
        return <BackgroundRemoverPage onNavigate={handleNavigate} />;
      case 'smart-document-fixer':
        return <SmartDocumentFixerPage onBack={() => setCurrentPage('image-tools')} onNavigate={handleNavigate} />;
      case 'fresher-resume':
        return <ResumeTemplateBuilderPage templateSlug="fresher-resume" onBack={() => setCurrentPage('resume-builder')} />;
      case 'government-job-resume':
        return <ResumeTemplateBuilderPage templateSlug="government-job-resume" onBack={() => setCurrentPage('resume-builder')} />;
      case 'private-job-resume':
        return <ResumeTemplateBuilderPage templateSlug="private-job-resume" onBack={() => setCurrentPage('resume-builder')} />;
      case 'hindi-resume':
        return <ResumeTemplateBuilderPage templateSlug="hindi-resume" onBack={() => setCurrentPage('resume-builder')} />;
      case 'biodata-for-marriage':
        return <ResumeTemplateBuilderPage templateSlug="biodata-for-marriage" onBack={() => setCurrentPage('resume-builder')} />;
      case 'teacher-resume':
        return <ResumeTemplateBuilderPage templateSlug="teacher-resume" onBack={() => setCurrentPage('resume-builder')} />;
      case 'police-army-resume':
        return <ResumeTemplateBuilderPage templateSlug="police-army-resume" onBack={() => setCurrentPage('resume-builder')} />;
      case 'ats-friendly-resume':
        return <ResumeTemplateBuilderPage templateSlug="ats-friendly-resume" onBack={() => setCurrentPage('resume-builder')} />;
      case 'us-resume':
        return <ResumeTemplateBuilderPage templateSlug="us-resume" onBack={() => setCurrentPage('resume-builder')} />;
      case 'uk-cv-format':
        return <ResumeTemplateBuilderPage templateSlug="uk-cv-format" onBack={() => setCurrentPage('resume-builder')} />;
      case 'canada-resume':
        return <ResumeTemplateBuilderPage templateSlug="canada-resume" onBack={() => setCurrentPage('resume-builder')} />;
      case 'europass-cv':
        return <ResumeTemplateBuilderPage templateSlug="europass-cv" onBack={() => setCurrentPage('resume-builder')} />;
      case 'creative-resume':
        return <ResumeTemplateBuilderPage templateSlug="creative-resume" onBack={() => setCurrentPage('resume-builder')} />;
      case 'corporate-resume':
        return <ResumeTemplateBuilderPage templateSlug="corporate-resume" onBack={() => setCurrentPage('resume-builder')} />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <LanguageProvider>
          <div className="min-h-screen flex flex-col bg-background">
            <Header onNavigateHome={handleNavigateHome} onNavigate={handleNavigate} />
            <Suspense fallback={<PageLoader />}>
              {renderPage()}
            </Suspense>
            <Footer onNavigate={handleNavigate} />
            <Toaster />
          </div>
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
