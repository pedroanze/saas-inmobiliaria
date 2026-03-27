import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { inventoryService } from '@/services/inventoryService';
import { InventoryList } from '@/components/inventory/InventoryList';
import { toast } from 'sonner';

// Tipo mínimo necesario para el listado (refleja la forma real de los datos de Supabase)
type InventoryItemRow = Awaited<ReturnType<typeof inventoryService.getInventoryItems>>[number];

export default function Inventario() {
  const navigate = useNavigate();
  const [items, setItems] = useState<InventoryItemRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      setIsLoading(true);
      const data = await inventoryService.getInventoryItems();
      setItems(data);
    } catch (error) {
      console.error('Failed to load inventory', error);
      toast.error('Ocurrió un error al cargar el inventario.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="animate-in fade-in duration-500">
      <div className="mx-auto max-w-6xl space-y-8">
        <header className="border-outline flex items-center justify-between border-b pb-6">
          <div className="space-y-1">
            <h1 className="text-on-surface text-2xl font-bold">Inventario</h1>
            <p className="text-secondary text-sm">Gestión de propiedades, compras y empeños</p>
          </div>
          <div className="flex space-x-4">
            <Button
              variant="outline"
              onClick={() => navigate('/dashboard')}
              className="border-outline"
            >
              Volver
            </Button>
          </div>
        </header>

        <main>
          <InventoryList items={items} isLoading={isLoading} />
        </main>
      </div>
    </div>
  );
}
