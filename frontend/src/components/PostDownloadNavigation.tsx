import { Home, Wrench } from 'lucide-react';

interface PostDownloadNavigationProps {
  hubPath?: string;
  hubLabel?: string;
  onNavigate?: (path: string) => void;
}

export default function PostDownloadNavigation({
  hubPath = '/image-tools',
  hubLabel = 'Use Another Tool',
  onNavigate,
}: PostDownloadNavigationProps) {
  const navigate = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
    } else {
      window.location.href = path;
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-3 mt-4 w-full">
      <button
        onClick={() => navigate('/')}
        className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-200 hover:text-white border border-gray-600 hover:border-gray-400 transition-all duration-200 min-h-[48px] w-full md:w-auto font-medium text-sm"
      >
        <Home className="w-4 h-4" />
        Back to Home
      </button>
      <button
        onClick={() => navigate(hubPath)}
        className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white border border-blue-500 hover:border-blue-400 transition-all duration-200 min-h-[48px] w-full md:w-auto font-medium text-sm"
      >
        <Wrench className="w-4 h-4" />
        {hubLabel}
      </button>
    </div>
  );
}
