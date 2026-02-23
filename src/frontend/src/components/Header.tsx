import { Button } from '@/components/ui/button';
import { Calculator } from 'lucide-react';
import LanguageSelector from './LanguageSelector';
import { useLanguage } from '@/contexts/LanguageContext';

interface HeaderProps {
  onNavigateHome: () => void;
  onNavigate?: (page: string) => void;
}

export default function Header({ onNavigateHome, onNavigate }: HeaderProps) {
  const { t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Button
            variant="ghost"
            className="p-0 hover:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
            onClick={onNavigateHome}
            aria-label="Go to home page"
          >
            <img
              src="/assets/file_0000000062007206bdb8c024866ac514.png"
              alt="DocMasterTools.com – All-in-One Document, Image & PDF Tools"
              className="h-8 w-auto sm:h-10 md:h-12 object-contain transition-transform hover:scale-105"
              loading="eager"
            />
          </Button>
          
          <div className="flex items-center gap-2">
            {onNavigate && (
              <nav className="hidden md:flex items-center gap-6">
                <Button
                  variant="ghost"
                  onClick={() => onNavigate('calculators')}
                  className="flex items-center gap-2"
                >
                  <Calculator className="h-4 w-4" />
                  {t('nav.calculators')}
                </Button>
              </nav>
            )}
            <LanguageSelector />
          </div>
        </div>
      </div>
    </header>
  );
}
