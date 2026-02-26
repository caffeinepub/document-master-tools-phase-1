import { ArrowLeft, Home } from 'lucide-react';

interface BackToHomeButtonProps {
  onNavigate?: (path: string) => void;
}

export default function BackToHomeButton({ onNavigate }: BackToHomeButtonProps) {
  const handleClick = () => {
    if (onNavigate) {
      onNavigate('/');
    } else {
      window.location.href = '/';
    }
  };

  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-200 hover:text-white border border-gray-700 hover:border-gray-500 transition-all duration-200 min-h-[44px] min-w-[44px] w-full sm:w-auto text-sm font-medium"
      aria-label="Back to Home"
    >
      <ArrowLeft className="w-4 h-4 flex-shrink-0" />
      <Home className="w-4 h-4 flex-shrink-0" />
      <span>Home</span>
    </button>
  );
}
