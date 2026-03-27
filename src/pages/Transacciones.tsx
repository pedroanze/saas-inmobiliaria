import { useEffect, useState } from 'react';
import { transactionsService } from '@/services/transactionsService';
import type { TransactionRow } from '@/services/transactionsService';
import type { TransactionPayload } from '@/components/transactions/transaction.types';
import { TransactionList } from '@/components/transactions/TransactionList';
import { TransactionForm } from '@/components/transactions/TransactionForm';
import { PageLayout } from '@/components/layout/PageLayout';
import { toast } from 'sonner';

export default function Transacciones() {
  const [transactions, setTransactions] = useState<TransactionRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      setIsLoading(true);
      const data = await transactionsService.getTransactions();
      setTransactions(data);
    } catch (error) {
      console.error('Failed to load transactions', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTransaction = async (payload: TransactionPayload) => {
    try {
      setIsSubmitting(true);
      await transactionsService.processTransaction(payload);
      toast.success('Transacción completada exitosamente.');
      await fetchTransactions();
    } catch (error: unknown) {
      console.error('Failed to create transaction', error);
      toast.error('Ocurrió un error al registrar la transacción.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageLayout
      title="Transacciones"
      subtitle="Registro de compras, ventas y movimientos de caja"
      actions={
        <TransactionForm onSubmit={handleAddTransaction} isLoading={isSubmitting} />
      }
    >
      <TransactionList transactions={transactions} isLoading={isLoading} />
    </PageLayout>
  );
}
