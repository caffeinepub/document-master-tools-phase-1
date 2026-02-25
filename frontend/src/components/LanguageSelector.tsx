import { Globe, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLanguage } from '@/contexts/LanguageContext';

const languages = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو' },
] as const;

export default function LanguageSelector() {
  const { currentLanguage, setLanguage, isLoading } = useLanguage();

  const currentLangData = languages.find(lang => lang.code === currentLanguage);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="gap-2 min-w-[44px] min-h-[44px] md:min-w-0 md:min-h-0"
          disabled={isLoading}
        >
          <Globe className="h-4 w-4" />
          <span className="hidden md:inline font-medium">{currentLangData?.nativeName || 'EN'}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-52 backdrop-blur-sm bg-background/95 shadow-xl border-border/50 animate-in slide-in-from-top-2 duration-200"
      >
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code as any)}
            className={`cursor-pointer min-h-[44px] text-base transition-colors ${
              currentLanguage === lang.code 
                ? 'bg-primary/10 dark:bg-primary/20 font-semibold' 
                : 'hover:bg-accent'
            }`}
          >
            <span className="flex-1">{lang.nativeName}</span>
            {currentLanguage === lang.code && (
              <Check className="h-4 w-4 text-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
