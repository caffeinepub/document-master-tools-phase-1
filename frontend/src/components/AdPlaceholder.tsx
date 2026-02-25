interface AdPlaceholderProps {
  adType: 'banner' | 'in-content' | 'sidebar';
  className?: string;
}

export default function AdPlaceholder({ adType, className = '' }: AdPlaceholderProps) {
  const dimensions = {
    banner: { 
      width: 728, 
      height: 90, 
      className: 'w-full max-w-[728px] mx-auto',
      aspectRatio: '728/90'
    },
    'in-content': { 
      width: 300, 
      height: 250, 
      className: 'w-full max-w-[300px] mx-auto',
      aspectRatio: '300/250'
    },
    sidebar: { 
      width: 160, 
      height: 600, 
      className: 'w-[160px] sticky top-20 hidden lg:block',
      aspectRatio: '160/600'
    }
  };

  const { width, height, className: typeClassName, aspectRatio } = dimensions[adType];

  return (
    <div className={`${typeClassName} ${className} my-6`}>
      <div className="text-xs text-muted-foreground text-center mb-1">Advertisement</div>
      <div 
        className="bg-muted/30 border border-border rounded-lg flex items-center justify-center overflow-hidden"
        style={{ 
          aspectRatio: aspectRatio,
          minHeight: adType === 'sidebar' ? '600px' : undefined
        }}
      >
        <div className="text-center p-4">
          <div className="text-sm text-muted-foreground">
            Ad Space {width}×{height}
          </div>
        </div>
      </div>
    </div>
  );
}
