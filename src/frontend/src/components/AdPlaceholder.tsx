interface AdPlaceholderProps {
  adType: 'banner' | 'in-content' | 'sidebar';
}

export default function AdPlaceholder({ adType }: AdPlaceholderProps) {
  const dimensions = {
    banner: { width: 728, height: 90, className: 'w-full max-w-[728px] mx-auto' },
    'in-content': { width: 300, height: 250, className: 'w-full max-w-[300px] mx-auto' },
    sidebar: { width: 160, height: 600, className: 'w-[160px] hidden lg:block' }
  };

  const { width, height, className } = dimensions[adType];
  const aspectRatio = (height / width) * 100;

  return (
    <div className={`${className} my-4`}>
      <div className="text-xs text-muted-foreground text-center mb-1">Advertisement</div>
      <div 
        className="bg-muted/30 border border-border rounded-lg flex items-center justify-center overflow-hidden"
        style={{ 
          aspectRatio: `${width}/${height}`,
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
