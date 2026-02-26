import React, { Suspense, useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { LanguageProvider } from './contexts/LanguageContext';

// Lazy-loaded pages
const HomePage = React.lazy(() => import('./pages/HomePage'));
const CalculatorsPage = React.lazy(() => import('./pages/CalculatorsPage'));
const PDFToolsPage = React.lazy(() => import('./pages/PDFToolsPage'));
const ImageToolsPage = React.lazy(() => import('./pages/ImageToolsPage'));
const ResumeBuilderPage = React.lazy(() => import('./pages/ResumeBuilderPage'));

// Calculator pages
const CGPACalculatorPage = React.lazy(() => import('./pages/calculators/CGPACalculatorPage'));
const SGPACalculatorPage = React.lazy(() => import('./pages/calculators/SGPACalculatorPage'));
const CGPAToPercentageConverterPage = React.lazy(() => import('./pages/calculators/CGPAToPercentageConverterPage'));
const PercentageToCGPAConverterPage = React.lazy(() => import('./pages/calculators/PercentageToCGPAConverterPage'));
const GradeCalculatorPage = React.lazy(() => import('./pages/calculators/GradeCalculatorPage'));
const GPACalculatorPage = React.lazy(() => import('./pages/calculators/GPACalculatorPage'));
const MarksPercentageCalculatorPage = React.lazy(() => import('./pages/calculators/MarksPercentageCalculatorPage'));
const DivisionCalculatorPage = React.lazy(() => import('./pages/calculators/DivisionCalculatorPage'));
const GSTCalculatorPage = React.lazy(() => import('./pages/calculators/GSTCalculatorPage'));
const EMICalculatorPage = React.lazy(() => import('./pages/calculators/EMICalculatorPage'));
const LoanCalculatorPage = React.lazy(() => import('./pages/calculators/LoanCalculatorPage'));
const CompoundInterestCalculatorPage = React.lazy(() => import('./pages/calculators/CompoundInterestCalculatorPage'));
const SimpleInterestCalculatorPage = React.lazy(() => import('./pages/calculators/SimpleInterestCalculatorPage'));
const DiscountCalculatorPage = React.lazy(() => import('./pages/calculators/DiscountCalculatorPage'));
const ProfitLossCalculatorPage = React.lazy(() => import('./pages/calculators/ProfitLossCalculatorPage'));
const SalaryHikeCalculatorPage = React.lazy(() => import('./pages/calculators/SalaryHikeCalculatorPage'));
const BMICalculatorPage = React.lazy(() => import('./pages/calculators/BMICalculatorPage'));
const AgeCalculatorPage = React.lazy(() => import('./pages/calculators/AgeCalculatorPage'));
const DateDifferenceCalculatorPage = React.lazy(() => import('./pages/calculators/DateDifferenceCalculatorPage'));
const TimeDurationCalculatorPage = React.lazy(() => import('./pages/calculators/TimeDurationCalculatorPage'));

// Image tool pages
const PassportPhotoMakerPage = React.lazy(() => import('./pages/image-tools/PassportPhotoMakerPage'));
const AadhaarPhotoResizePage = React.lazy(() => import('./pages/image-tools/AadhaarPhotoResizePage'));
const PANPhotoResizePage = React.lazy(() => import('./pages/image-tools/PANPhotoResizePage'));
const SSCPhotoResizePage = React.lazy(() => import('./pages/image-tools/SSCPhotoResizePage'));
const RailwayPhotoResizePage = React.lazy(() => import('./pages/image-tools/RailwayPhotoResizePage'));
const PoliceArmyPhotoPage = React.lazy(() => import('./pages/image-tools/PoliceArmyPhotoPage'));
const VisaPhotoResizePage = React.lazy(() => import('./pages/image-tools/VisaPhotoResizePage'));
const SignatureResizePage = React.lazy(() => import('./pages/image-tools/SignatureResizePage'));
const ImageCompressorPage = React.lazy(() => import('./pages/image-tools/ImageCompressorPage'));
const ImageCropperPage = React.lazy(() => import('./pages/image-tools/ImageCropperPage'));
const DPIChangerPage = React.lazy(() => import('./pages/image-tools/DPIChangerPage'));
const CustomImageResizePage = React.lazy(() => import('./pages/image-tools/CustomImageResizePage'));
const JPGToPNGPage = React.lazy(() => import('./pages/image-tools/JPGToPNGPage'));
const PNGToJPGPage = React.lazy(() => import('./pages/image-tools/PNGToJPGPage'));
const WEBPConverterPage = React.lazy(() => import('./pages/image-tools/WEBPConverterPage'));
const BackgroundRemoverPage = React.lazy(() => import('./pages/image-tools/BackgroundRemoverPage'));
const SmartDocumentFixerPage = React.lazy(() => import('./pages/image-tools/SmartDocumentFixerPage'));
const AIDocumentEnhancerPage = React.lazy(() => import('./pages/image-tools/AIDocumentEnhancerPage'));

// Resume builder pages
const ResumeTemplateBuilderPage = React.lazy(() => import('./pages/resume-builder/ResumeTemplateBuilderPage'));

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-gray-400 text-sm">Loading...</span>
      </div>
    </div>
  );
}

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
  | 'ai-document-enhancer'
  | 'fresher-resume' | 'government-job-resume' | 'private-job-resume' | 'hindi-resume'
  | 'biodata-for-marriage' | 'teacher-resume' | 'police-army-resume' | 'ats-friendly-resume'
  | 'us-resume' | 'uk-cv-format' | 'canada-resume' | 'europass-cv' | 'creative-resume' | 'corporate-resume';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const handleNavigate = (page: string) => {
    // Map path-style routes to page keys
    const pathToPage: Record<string, Page> = {
      '/': 'home',
      '/calculators': 'calculators',
      '/pdf-tools': 'pdf-tools',
      '/image-tools': 'image-tools',
      '/resume-builder': 'resume-builder',
      '/image-tools/passport-photo': 'passport-photo-maker',
      '/image-tools/aadhaar-photo': 'aadhaar-photo-resize',
      '/image-tools/pan-photo': 'pan-photo-resize',
      '/image-tools/ssc-photo': 'ssc-photo-resize',
      '/image-tools/railway-photo': 'railway-photo-resize',
      '/image-tools/police-army-photo': 'police-army-photo',
      '/image-tools/visa-photo': 'visa-photo-resize',
      '/image-tools/signature-resize': 'signature-resize',
      '/image-tools/compress': 'image-compressor',
      '/image-tools/crop': 'image-cropper',
      '/image-tools/dpi-changer': 'dpi-changer',
      '/image-tools/resize': 'custom-image-resize',
      '/image-tools/jpg-to-png': 'jpg-to-png',
      '/image-tools/png-to-jpg': 'png-to-jpg',
      '/image-tools/webp-converter': 'webp-converter',
      '/image-tools/background-remover': 'background-remover',
      '/image-tools/smart-document-fixer': 'smart-document-fixer',
      '/ai-document-enhancer': 'ai-document-enhancer',
    };

    const mapped = pathToPage[page] || (page as Page);
    setCurrentPage(mapped);
    window.scrollTo(0, 0);
  };

  const handleNavigateHome = () => {
    setCurrentPage('home');
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;

      case 'pdf-tools':
        return <PDFToolsPage onBack={() => setCurrentPage('home')} />;

      case 'image-tools':
        return <ImageToolsPage onNavigate={handleNavigate} />;

      case 'resume-builder':
        return <ResumeBuilderPage onBack={() => setCurrentPage('home')} onNavigate={handleNavigate} />;

      case 'calculators':
        return <CalculatorsPage onBack={() => setCurrentPage('home')} onNavigate={handleNavigate} />;

      // Calculator pages — use onBack prop
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
        return (
          <SmartDocumentFixerPage
            onBack={() => setCurrentPage('image-tools')}
            onNavigate={handleNavigate}
          />
        );
      case 'ai-document-enhancer':
        return <AIDocumentEnhancerPage onNavigate={handleNavigate} />;

      // Resume template pages
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
    <LanguageProvider>
      <div className="min-h-screen bg-gray-900 flex flex-col">
        <Header onNavigate={handleNavigate} onNavigateHome={handleNavigateHome} />
        <main className="flex-1">
          <Suspense fallback={<LoadingFallback />}>
            {renderPage()}
          </Suspense>
        </main>
        <Footer onNavigate={handleNavigate} />
      </div>
    </LanguageProvider>
  );
}
