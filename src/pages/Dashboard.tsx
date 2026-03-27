import { useAuth } from '@/contexts/AuthContext';
import { PageLayout } from '@/components/layout/PageLayout';
import { LayoutDashboardIcon, PackageIcon, ArrowRightLeftIcon, TrendingUpIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

/** Tarjeta de métrica del dashboard (datos estáticos por ahora) */
function MetricCard({ label, value, delta }: { label: string; value: string; delta?: string }) {
  return (
    <div className="bg-surface border border-outline rounded-lg p-5 space-y-2">
      <p className="text-xs font-semibold text-secondary uppercase tracking-wider">{label}</p>
      <p className="text-2xl font-bold text-on-surface">{value}</p>
      {delta && <p className="text-xs text-secondary">{delta}</p>}
    </div>
  );
}

/** Acceso rápido a las secciones principales */
function QuickAccessCard({
  to,
  icon: Icon,
  label,
  description,
}: {
  to: string;
  icon: React.ElementType;
  label: string;
  description: string;
}) {
  return (
    <Link
      to={to}
      className="flex items-start gap-4 bg-surface border border-outline rounded-lg p-4 hover:border-primary/40 hover:bg-primary/5 transition-colors group"
    >
      <div className="p-2 rounded-md bg-primary/10 text-primary shrink-0">
        <Icon className="w-4 h-4" />
      </div>
      <div className="min-w-0">
        <p className="font-semibold text-sm text-on-surface group-hover:text-primary transition-colors">{label}</p>
        <p className="text-xs text-secondary mt-0.5 leading-snug">{description}</p>
      </div>
    </Link>
  );
}

export default function Dashboard() {
  const { user } = useAuth();
  const firstName = user?.email?.split('@')[0] ?? 'Usuario';

  return (
    <PageLayout
      title="Panel de Control"
      subtitle={`Bienvenido de vuelta, ${firstName}`}
    >
      {/* Métricas */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <MetricCard label="Artículos en Inventario" value="—" delta="Próximamente" />
        <MetricCard label="Transacciones del Mes" value="—" delta="Próximamente" />
        <MetricCard label="Balance de Caja" value="—" delta="Próximamente" />
      </div>

      {/* Accesos rápidos */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-secondary uppercase tracking-wider">Accesos Rápidos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <QuickAccessCard
            to="/inventario"
            icon={PackageIcon}
            label="Inventario"
            description="Consulta los artículos empeñados, comprados y en venta."
          />
          <QuickAccessCard
            to="/transacciones"
            icon={ArrowRightLeftIcon}
            label="Transacciones"
            description="Registra ingresos, egresos y movimientos de caja."
          />
          <QuickAccessCard
            to="/ajustes"
            icon={LayoutDashboardIcon}
            label="Ajustes y Perfil"
            description="Gestiona tu cuenta y los datos de la empresa."
          />
          <QuickAccessCard
            to="/transacciones"
            icon={TrendingUpIcon}
            label="Nueva Transacción"
            description="Registra una nueva compra, empeño o venta rápidamente."
          />
        </div>
      </div>
    </PageLayout>
  );
}
