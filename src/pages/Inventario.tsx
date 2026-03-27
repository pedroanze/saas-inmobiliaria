import { useEffect, useState } from 'react';
import { inventoryService } from '@/services/inventoryService';
import { InventoryList } from '@/components/inventory/InventoryList';
import { PageLayout } from '@/components/layout/PageLayout';
import { toast } from 'sonner';

type InventoryItemRow = Awaited<ReturnType<typeof inventoryService.getInventoryItems>>[number];

export default function Inventario() {
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
    <PageLayout
      title="Inventario"
      subtitle={`${items.length} artículo${items.length !== 1 ? 's' : ''} registrado${items.length !== 1 ? 's' : ''}`}
    >
      <InventoryList items={items} isLoading={isLoading} />
    </PageLayout>
  );
}
