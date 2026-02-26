import { ChevronRight, Home } from 'lucide-react';
import { useEffect } from 'react';

export interface BreadcrumbItem {
  label: string;
  // Support both old onClick style and new path style
  path?: string;
  href?: string;
  onClick?: () => void;
}

interface BreadcrumbNavigationProps {
  items: BreadcrumbItem[];
  onNavigate?: (path: string) => void;
}

export default function BreadcrumbNavigation({ items, onNavigate }: BreadcrumbNavigationProps) {
  // Schema.org BreadcrumbList JSON-LD
  useEffect(() => {
    const existingScript = document.getElementById('breadcrumb-schema');
    if (existingScript) existingScript.remove();

    const schemaData = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.label,
        ...(item.path || item.href
          ? { item: `https://docmastertools.com${item.path || item.href}` }
          : {}),
      })),
    };

    const script = document.createElement('script');
    script.id = 'breadcrumb-schema';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schemaData);
    document.head.appendChild(script);

    return () => {
      const s = document.getElementById('breadcrumb-schema');
      if (s) s.remove();
    };
  }, [items]);

  const handleItemClick = (item: BreadcrumbItem) => {
    if (item.onClick) {
      item.onClick();
    } else if (item.path && onNavigate) {
      onNavigate(item.path);
    } else if (item.href && onNavigate) {
      onNavigate(item.href);
    }
  };

  const isClickable = (item: BreadcrumbItem) =>
    !!(item.onClick || item.path || item.href);

  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center overflow-x-auto scrollbar-hide py-1 mb-3"
    >
      <ol className="flex items-center gap-1 text-sm whitespace-nowrap min-w-0">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const clickable = isClickable(item) && !isLast;

          return (
            <li key={index} className="flex items-center gap-1">
              {index === 0 && item.label === 'Home' ? (
                <button
                  onClick={() => handleItemClick(item)}
                  className="flex items-center gap-1 text-gray-400 hover:text-blue-400 transition-colors min-h-[44px] px-1"
                >
                  <Home className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="hidden sm:inline">Home</span>
                </button>
              ) : (
                <>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-600 flex-shrink-0 rtl:rotate-180" />
                  {clickable ? (
                    <button
                      onClick={() => handleItemClick(item)}
                      className="text-gray-400 hover:text-blue-400 transition-colors min-h-[44px] px-1 truncate max-w-[120px] sm:max-w-none"
                    >
                      {item.label}
                    </button>
                  ) : (
                    <span className="text-gray-200 font-medium px-1 truncate max-w-[150px] sm:max-w-none">
                      {item.label}
                    </span>
                  )}
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
