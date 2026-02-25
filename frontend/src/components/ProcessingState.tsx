import { Loader2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface ProcessingStateProps {
  message?: string;
  progress?: number;
}

export default function ProcessingState({ message = 'Processing...', progress }: ProcessingStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-4">
      <img src="/assets/generated/processing-icon-transparent.dim_48x48.png" alt="Processing" className="w-12 h-12 animate-pulse" />
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <p className="text-lg font-medium">{message}</p>
      {progress !== undefined && (
        <div className="w-full max-w-xs">
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-muted-foreground text-center mt-2">{Math.round(progress)}%</p>
        </div>
      )}
    </div>
  );
}
