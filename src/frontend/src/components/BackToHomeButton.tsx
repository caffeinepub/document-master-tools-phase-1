import { ArrowLeft } from "lucide-react";

interface BackToHomeButtonProps {
  onNavigate?: (page: string) => void;
  onClick?: () => void;
  label?: string;
}

export default function BackToHomeButton({
  onNavigate,
  onClick,
  label = "Back to Home",
}: BackToHomeButtonProps) {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (onNavigate) {
      onNavigate("home");
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors duration-200 group mb-6"
    >
      <ArrowLeft className="w-4 h-4 shrink-0 group-hover:-translate-x-1 transition-transform duration-200" />
      <span>{label}</span>
    </button>
  );
}
