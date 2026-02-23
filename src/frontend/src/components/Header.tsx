import { Button } from '@/components/ui/button';

interface HeaderProps {
  onNavigateHome: () => void;
}

export default function Header({ onNavigateHome }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center">
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
        </div>
      </div>
    </header>
  );
}
