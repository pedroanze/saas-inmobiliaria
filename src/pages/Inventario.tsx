import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function Inventario() {
  const navigate = useNavigate();

  return (
    <div className="bg-background min-h-screen p-8">
      <div className="mx-auto max-w-5xl space-y-8">
        <header className="border-outline flex items-center justify-between border-b pb-6">
          <div className="space-y-1">
            <h1 className="text-on-surface text-2xl font-bold">Inventario</h1>
            <p className="text-secondary text-sm">Gestión de propiedades</p>
          </div>
          <Button
            variant="outline"
            onClick={() => navigate('/dashboard')}
            className="border-outline"
          >
            Volver al Dashboard
          </Button>
        </header>

        <main>
          <div className="bg-surface shadow-float mt-8 flex min-h-[400px] flex-col items-center justify-center rounded-sm p-8">
            <p className="text-secondary text-lg">
              Módulo de Inventario en construcción...
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
