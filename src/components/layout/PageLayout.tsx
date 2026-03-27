import type { ReactNode } from 'react';

interface PageLayoutProps {
  /** Título principal de la página (h1) */
  title: string;
  /** Subtítulo descriptivo debajo del título */
  subtitle?: string;
  /** Acciones opcionales en el lado derecho del encabezado (botones, etc.) */
  actions?: ReactNode;
  /** Contenido principal de la página */
  children: ReactNode;
}

/**
 * Contenedor estándar para todas las páginas del dashboard.
 * Garantiza padding, ancho máximo, jerarquía tipográfica y espaciado uniformes.
 */
export function PageLayout({ title, subtitle, actions, children }: PageLayoutProps) {
  return (
    <div className="animate-in fade-in duration-300 w-full max-w-5xl mx-auto space-y-6">
      {/* Encabezado de página — mismo en todas las rutas */}
      <header className="flex items-start justify-between gap-4 pb-5 border-b border-outline">
        <div className="space-y-0.5 min-w-0">
          <h1 className="text-xl font-bold text-on-surface tracking-tight">{title}</h1>
          {subtitle && (
            <p className="text-sm text-secondary">{subtitle}</p>
          )}
        </div>
        {actions && (
          <div className="flex items-center gap-3 shrink-0">{actions}</div>
        )}
      </header>

      {/* Contenido de la página */}
      <main>{children}</main>
    </div>
  );
}
