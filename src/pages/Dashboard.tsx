import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className="bg-background min-h-screen p-8">
      <div className="mx-auto max-w-5xl space-y-8">
        <header className="border-outline flex items-center justify-between border-b pb-6">
          <div className="space-y-1">
            <h1 className="text-on-surface text-2xl font-bold">
              Inventario (v3)
            </h1>
            <p className="text-secondary text-sm">
              Bienvenido de vuelta,{' '}
              <span className="text-on-surface font-medium">{user?.email}</span>
            </p>
          </div>
          <Button
            variant="outline"
            onClick={handleSignOut}
            className="hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30 border-outline"
          >
            Cerrar Sesión
          </Button>
        </header>

        <main className="grid gap-6 md:grid-cols-3">
          <div className="bg-surface shadow-float border-primary/20 rounded-sm border-t p-6">
            <h3 className="text-secondary text-[13px] font-medium tracking-wider uppercase">
              Propiedades Activas
            </h3>
            <p className="text-on-surface mt-2 text-3xl font-bold">12</p>
          </div>
          <div className="bg-surface shadow-float border-primary/20 rounded-sm border-t p-6">
            <h3 className="text-secondary text-[13px] font-medium tracking-wider uppercase">
              Nuevos Leads
            </h3>
            <p className="text-on-surface mt-2 text-3xl font-bold">4</p>
          </div>
          <div className="bg-surface shadow-float border-primary/20 rounded-sm border-t p-6">
            <h3 className="text-secondary text-[13px] font-medium tracking-wider uppercase">
              Ingresos Estimados
            </h3>
            <p className="text-on-surface mt-2 text-3xl font-bold">$4,250</p>
          </div>
        </main>

        <section className="bg-surface shadow-float mt-8 rounded-sm p-8">
          <h2 className="text-on-surface mb-4 text-lg font-bold">
            Actividad Reciente
          </h2>
          <div className="space-y-4">
            <div className="border-outline-variant/30 flex items-center justify-between border-b py-3">
              <div>
                <p className="text-on-surface text-[15px] font-medium">
                  Nuevo Lead Registrado
                </p>
                <p className="text-secondary text-[13px]">
                  Juan Pérez - Propiedad #12
                </p>
              </div>
              <span className="text-secondary text-[12px]">Hace 2 horas</span>
            </div>
            <div className="border-outline-variant/30 flex items-center justify-between border-b py-3">
              <div>
                <p className="text-on-surface text-[15px] font-medium">
                  Actualización de Inventario
                </p>
                <p className="text-secondary text-[13px]">
                  Se modificó el precio de Propiedad #08
                </p>
              </div>
              <span className="text-secondary text-[12px]">Hace 5 horas</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
