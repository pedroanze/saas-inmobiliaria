import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { navigationLinks } from './navigationLinks';

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="bg-surface hidden w-64 flex-col border-r lg:flex">
      <div className="flex h-16 items-center justify-center border-b px-6">
        <h1 className="text-primary text-xl font-bold tracking-tight">SaaS Inmobiliaria</h1>
      </div>
      <nav className="flex-1 space-y-2 p-4">
        {navigationLinks.map((item) => {
          const isActive = location.pathname.startsWith(item.href);
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-secondary hover:bg-secondary/10 hover:text-on-surface'
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>
      <div className="border-t p-4 text-center">
        <p className="text-secondary/60 text-xs">Versión MVP</p>
      </div>
    </aside>
  );
}
