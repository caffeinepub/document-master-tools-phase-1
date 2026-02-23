import { Check } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { ColorTheme } from '@/types/resume';
import { COLOR_THEMES } from '@/lib/colorThemes';

interface ColorThemeSelectorProps {
  selected: ColorTheme;
  onSelect: (theme: ColorTheme) => void;
}

export default function ColorThemeSelector({ selected, onSelect }: ColorThemeSelectorProps) {
  return (
    <div>
      <Label className="mb-3 block">Color Theme</Label>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {COLOR_THEMES.map((theme) => (
          <button
            key={theme.name}
            onClick={() => onSelect(theme)}
            className={`relative border-2 rounded-lg p-3 transition-all hover:shadow-md ${
              selected.name === theme.name ? 'border-primary' : 'border-border'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <div
                className="w-6 h-6 rounded"
                style={{ backgroundColor: theme.primary }}
              />
              <div
                className="w-6 h-6 rounded"
                style={{ backgroundColor: theme.secondary }}
              />
              <div
                className="w-6 h-6 rounded border"
                style={{ backgroundColor: theme.light }}
              />
            </div>
            <p className="text-xs font-medium text-left">{theme.name}</p>
            {selected.name === theme.name && (
              <div className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                <Check className="h-3 w-3 text-primary-foreground" />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
