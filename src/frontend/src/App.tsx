import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import PDFToolsPage from './pages/PDFToolsPage';
import ImageToolsPage from './pages/ImageToolsPage';
import ResumeBuilderPage from './pages/ResumeBuilderPage';
import ResumeTemplateBuilderPage from './pages/resume-builder/ResumeTemplateBuilderPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfUsePage from './pages/TermsOfUsePage';
import DisclaimerPage from './pages/DisclaimerPage';
import CalculatorsPage from './pages/CalculatorsPage';
import CGPACalculatorPage from './pages/calculators/CGPACalculatorPage';
import SGPACalculatorPage from './pages/calculators/SGPACalculatorPage';
import CGPAToPercentageConverterPage from './pages/calculators/CGPAToPercentageConverterPage';
import PercentageToCGPAConverterPage from './pages/calculators/PercentageToCGPAConverterPage';
import GradeCalculatorPage from './pages/calculators/GradeCalculatorPage';
import GPACalculatorPage from './pages/calculators/GPACalculatorPage';
import MarksPercentageCalculatorPage from './pages/calculators/MarksPercentageCalculatorPage';
import DivisionCalculatorPage from './pages/calculators/DivisionCalculatorPage';
import GSTCalculatorPage from './pages/calculators/GSTCalculatorPage';
import EMICalculatorPage from './pages/calculators/EMICalculatorPage';
import LoanCalculatorPage from './pages/calculators/LoanCalculatorPage';
import CompoundInterestCalculatorPage from './pages/calculators/CompoundInterestCalculatorPage';
import SimpleInterestCalculatorPage from './pages/calculators/SimpleInterestCalculatorPage';
import DiscountCalculatorPage from './pages/calculators/DiscountCalculatorPage';
import ProfitLossCalculatorPage from './pages/calculators/ProfitLossCalculatorPage';
import SalaryHikeCalculatorPage from './pages/calculators/SalaryHikeCalculatorPage';
import BMICalculatorPage from './pages/calculators/BMICalculatorPage';
import AgeCalculatorPage from './pages/calculators/AgeCalculatorPage';
import DateDifferenceCalculatorPage from './pages/calculators/DateDifferenceCalculatorPage';
import TimeDurationCalculatorPage from './pages/calculators/TimeDurationCalculatorPage';
import PassportPhotoMakerPage from './pages/image-tools/PassportPhotoMakerPage';
import AadhaarPhotoResizePage from './pages/image-tools/AadhaarPhotoResizePage';
import PANPhotoResizePage from './pages/image-tools/PANPhotoResizePage';
import SSCPhotoResizePage from './pages/image-tools/SSCPhotoResizePage';
import RailwayPhotoResizePage from './pages/image-tools/RailwayPhotoResizePage';
import PoliceArmyPhotoPage from './pages/image-tools/PoliceArmyPhotoPage';
import VisaPhotoResizePage from './pages/image-tools/VisaPhotoResizePage';
import SignatureResizePage from './pages/image-tools/SignatureResizePage';
import ImageCompressorPage from './pages/image-tools/ImageCompressorPage';
import ImageCropperPage from './pages/image-tools/ImageCropperPage';
import DPIChangerPage from './pages/image-tools/DPIChangerPage';
import CustomImageResizePage from './pages/image-tools/CustomImageResizePage';
import JPGToPNGPage from './pages/image-tools/JPGToPNGPage';
import PNGToJPGPage from './pages/image-tools/PNGToJPGPage';
import WEBPConverterPage from './pages/image-tools/WEBPConverterPage';
import BackgroundRemoverPage from './pages/image-tools/BackgroundRemoverPage';
import { useState } from 'react';

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
  | 'jpg-to-png' | 'png-to-jpg' | 'webp-converter' | 'background-remover'
  | 'fresher-resume' | 'government-job-resume' | 'private-job-resume' | 'hindi-resume'
  | 'biodata-for-marriage' | 'teacher-resume' | 'police-army-resume' | 'ats-friendly-resume'
  | 'us-resume' | 'uk-cv-format' | 'canada-resume' | 'europass-cv' | 'creative-resume' | 'corporate-resume';

const queryClient = new QueryClient();

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
      case 'passport-photo-maker':
        return <PassportPhotoMakerPage onBack={() => setCurrentPage('image-tools')} />;
      case 'aadhaar-photo-resize':
        return <AadhaarPhotoResizePage onBack={() => setCurrentPage('image-tools')} />;
      case 'pan-photo-resize':
        return <PANPhotoResizePage onBack={() => setCurrentPage('image-tools')} />;
      case 'ssc-photo-resize':
        return <SSCPhotoResizePage onBack={() => setCurrentPage('image-tools')} />;
      case 'railway-photo-resize':
        return <RailwayPhotoResizePage onBack={() => setCurrentPage('image-tools')} />;
      case 'police-army-photo':
        return <PoliceArmyPhotoPage onBack={() => setCurrentPage('image-tools')} />;
      case 'visa-photo-resize':
        return <VisaPhotoResizePage onBack={() => setCurrentPage('image-tools')} />;
      case 'signature-resize':
        return <SignatureResizePage onBack={() => setCurrentPage('image-tools')} />;
      case 'image-compressor':
        return <ImageCompressorPage onBack={() => setCurrentPage('image-tools')} />;
      case 'image-cropper':
        return <ImageCropperPage onBack={() => setCurrentPage('image-tools')} />;
      case 'dpi-changer':
        return <DPIChangerPage onBack={() => setCurrentPage('image-tools')} />;
      case 'custom-image-resize':
        return <CustomImageResizePage onBack={() => setCurrentPage('image-tools')} />;
      case 'jpg-to-png':
        return <JPGToPNGPage onBack={() => setCurrentPage('image-tools')} />;
      case 'png-to-jpg':
        return <PNGToJPGPage onBack={() => setCurrentPage('image-tools')} />;
      case 'webp-converter':
        return <WEBPConverterPage onBack={() => setCurrentPage('image-tools')} />;
      case 'background-remover':
        return <BackgroundRemoverPage onBack={() => setCurrentPage('image-tools')} />;
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
        <div className="min-h-screen flex flex-col bg-background">
          <Header onNavigateHome={handleNavigateHome} onNavigate={handleNavigate} />
          {renderPage()}
          <Toaster />
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
