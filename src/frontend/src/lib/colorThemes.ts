import { ColorTheme } from '@/types/resume';

export const COLOR_THEMES: ColorTheme[] = [
  {
    name: 'Professional Blue',
    primary: '#1e40af',
    secondary: '#3b82f6',
    light: '#dbeafe',
    text: '#1f2937'
  },
  {
    name: 'Corporate Black',
    primary: '#1f2937',
    secondary: '#4b5563',
    light: '#e5e7eb',
    text: '#111827'
  },
  {
    name: 'Creative Purple',
    primary: '#7c3aed',
    secondary: '#a78bfa',
    light: '#ede9fe',
    text: '#1f2937'
  },
  {
    name: 'Modern Teal',
    primary: '#0d9488',
    secondary: '#14b8a6',
    light: '#ccfbf1',
    text: '#1f2937'
  },
  {
    name: 'Classic Gray',
    primary: '#374151',
    secondary: '#6b7280',
    light: '#f3f4f6',
    text: '#111827'
  },
  {
    name: 'Elegant Maroon',
    primary: '#991b1b',
    secondary: '#dc2626',
    light: '#fee2e2',
    text: '#1f2937'
  }
];

export function applyThemeToElement(theme: ColorTheme): Record<string, string> {
  return {
    '--theme-primary': theme.primary,
    '--theme-secondary': theme.secondary,
    '--theme-light': theme.light,
    '--theme-text': theme.text
  };
}

export function validateContrast(backgroundColor: string, textColor: string): boolean {
  // Simple contrast validation - in production, use a proper contrast ratio calculator
  // This is a placeholder that always returns true
  return true;
}
