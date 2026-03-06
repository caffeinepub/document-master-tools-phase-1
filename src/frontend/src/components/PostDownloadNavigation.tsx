import { ArrowRight, CheckCircle, Home } from "lucide-react";

interface PostDownloadNavigationProps {
  onNavigate?: (page: string) => void;
  onBack?: () => void;
  hubPage?: string;
  hubLabel?: string;
}

export default function PostDownloadNavigation({
  onNavigate,
  onBack,
  hubPage = "home",
  hubLabel = "Use Another Tool",
}: PostDownloadNavigationProps) {
  const handleBackHome = () => {
    if (onBack) {
      onBack();
    } else if (onNavigate) {
      onNavigate("home");
    }
  };

  const handleUseAnother = () => {
    if (onNavigate) {
      onNavigate(hubPage);
    }
  };

  return (
    <div className="bg-gray-900 border border-green-500/30 rounded-xl p-4 sm:p-6 mt-6">
      <div className="flex items-center gap-3 mb-4">
        <CheckCircle className="w-6 h-6 text-green-400 shrink-0" />
        <div>
          <h3 className="text-white font-semibold">Download Complete!</h3>
          <p className="text-slate-300 text-sm">
            Your file has been processed and downloaded successfully.
          </p>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={handleBackHome}
          className="flex items-center justify-center gap-2 min-h-[48px] px-6 bg-slate-700 hover:bg-slate-600 text-white text-sm font-medium rounded-lg transition-all duration-200 hover:shadow-md"
        >
          <Home className="w-4 h-4 shrink-0" />
          Back to Home
        </button>
        <button
          onClick={handleUseAnother}
          className="flex items-center justify-center gap-2 min-h-[48px] px-6 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-all duration-200 hover:shadow-md"
        >
          {hubLabel}
          <ArrowRight className="w-4 h-4 shrink-0" />
        </button>
      </div>
    </div>
  );
}
