import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
  href?: string;
}

interface BreadcrumbNavigationProps {
  items: BreadcrumbItem[];
  onNavigate?: (page: string) => void;
}

export default function BreadcrumbNavigation({
  items,
  onNavigate,
}: BreadcrumbNavigationProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-1 text-sm text-slate-400 mb-6 flex-wrap"
    >
      <button
        type="button"
        onClick={() => onNavigate?.("home")}
        className="flex items-center gap-1 hover:text-white transition-colors duration-200"
        aria-label="Home"
      >
        <Home className="w-4 h-4 shrink-0" />
        <span className="hidden sm:inline">Home</span>
      </button>
      {items.map((item) => (
        <span key={item.label} className="flex items-center gap-1">
          <ChevronRight className="w-4 h-4 shrink-0 text-slate-600" />
          {item.onClick || item.href ? (
            item.href ? (
              <a
                href={item.href}
                className="hover:text-white transition-colors duration-200"
              >
                {item.label}
              </a>
            ) : (
              <button
                type="button"
                onClick={item.onClick}
                className="hover:text-white transition-colors duration-200"
              >
                {item.label}
              </button>
            )
          ) : (
            <span className="text-slate-200">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
