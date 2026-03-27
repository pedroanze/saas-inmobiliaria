import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

/** Subconjunto de campos de inventario que la tabla necesita renderizar */
interface InventoryRow {
  id: string;
  name: string;
  category: string | null;
  status: string;
  amount_paid: number | null;
  sale_price: number | null;
  customers: { full_name: string } | null;
}

interface InventoryListProps {
  items: InventoryRow[];
  isLoading: boolean;
}

export function InventoryList({ items, isLoading }: InventoryListProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <p className="text-secondary">Cargando inventario...</p>
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="bg-surface flex flex-col items-center justify-center rounded-sm border border-dashed py-12">
        <p className="text-secondary">No hay artículos en el inventario.</p>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pawned':
        return <Badge variant="outline" className="border-yellow-200 bg-yellow-100 text-yellow-800">Empeñado</Badge>;
      case 'bought':
        return <Badge variant="outline" className="border-blue-200 bg-blue-100 text-blue-800">Comprado</Badge>;
      case 'for_sale':
        return <Badge variant="outline" className="border-green-200 bg-green-100 text-green-800">A la Venta</Badge>;
      case 'sold':
        return <Badge variant="outline" className="border-gray-200 bg-gray-100 text-gray-800">Vendido</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="bg-surface rounded-sm border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Artículo</TableHead>
            <TableHead>Categoría</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead className="text-right">Monto Pagado</TableHead>
            <TableHead className="text-right">Precio Venta</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.name}</TableCell>
              <TableCell>{item.category || '-'}</TableCell>
              <TableCell>{getStatusBadge(item.status)}</TableCell>
              <TableCell>{item.customers?.full_name || '-'}</TableCell>
              <TableCell className="text-right font-semibold">
                ${item.amount_paid?.toLocaleString('es-ES', { minimumFractionDigits: 2 }) || '0.00'}
              </TableCell>
              <TableCell className="text-right font-semibold text-green-600">
                {item.sale_price ? `$${item.sale_price.toLocaleString('es-ES', { minimumFractionDigits: 2 })}` : '-'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
