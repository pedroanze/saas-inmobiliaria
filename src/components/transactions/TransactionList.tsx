import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import type { Transaction } from '@/types/transaction';

interface TransactionListProps {
  transactions: Transaction[];
  isLoading: boolean;
}

export function TransactionList({ transactions, isLoading }: TransactionListProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <p className="text-secondary">Cargando transacciones...</p>
      </div>
    );
  }

  if (!transactions.length) {
    return (
      <div className="bg-surface flex flex-col items-center justify-center rounded-sm border border-dashed py-12">
        <p className="text-secondary">No hay transacciones registradas.</p>
      </div>
    );
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'buy':
        return <Badge variant="secondary" className="bg-blue-100 text-blue-700">Compra</Badge>;
      case 'sell':
        return <Badge variant="secondary" className="bg-green-100 text-green-700">Venta</Badge>;
      case 'loan':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">Préstamo</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="bg-surface rounded-sm border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Fecha</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Concepto</TableHead>
            <TableHead className="text-right">Monto</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((tx) => (
            <TableRow key={tx.id}>
              <TableCell className="font-medium">{formatDate(tx.created_at)}</TableCell>
              <TableCell>{getTypeBadge(tx.type)}</TableCell>
              <TableCell className="max-w-[200px] truncate" title={tx.concept}>
                {tx.concept || '-'}
              </TableCell>
              <TableCell className="text-right font-semibold">
                ${tx.amount.toLocaleString('es-ES', { minimumFractionDigits: 2 })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
