import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import PDFToolsPage from './pages/PDFToolsPage';
import ImageToolsPage from './pages/ImageToolsPage';
import ResumeBuilderPage from './pages/ResumeBuilderPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfUsePage from './pages/TermsOfUsePage';
import DisclaimerPage from './pages/DisclaimerPage';
import { useState } from 'react';

type Page = 'home' | 'pdf-tools' | 'image-tools' | 'resume-builder' | 'privacy' | 'terms' | 'disclaimer';

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
        return <ImageToolsPage onBack={() => setCurrentPage('home')} />;
      case 'resume-builder':
        return <ResumeBuilderPage onBack={() => setCurrentPage('home')} />;
      case 'privacy':
        return <PrivacyPolicyPage onBack={() => setCurrentPage('home')} />;
      case 'terms':
        return <TermsOfUsePage onBack={() => setCurrentPage('home')} />;
      case 'disclaimer':
        return <DisclaimerPage onBack={() => setCurrentPage('home')} />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <div className="min-h-screen flex flex-col bg-background">
          <Header onNavigateHome={handleNavigateHome} />
          {renderPage()}
          <Toaster />
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
