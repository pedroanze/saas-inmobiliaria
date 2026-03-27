import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { transactionsService } from '@/services/transactionsService';
import type { TransactionRow } from '@/services/transactionsService';
import type { TransactionPayload } from '@/components/transactions/transaction.types';
import { TransactionList } from '@/components/transactions/TransactionList';
import { TransactionForm } from '@/components/transactions/TransactionForm';
import { toast } from 'sonner';

export default function Transacciones() {
  const navigate = useNavigate();
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
      // Opcional: Mostrar un toast de error aquí
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTransaction = async (payload: TransactionPayload) => {
    try {
      setIsSubmitting(true);
      await transactionsService.processTransaction(payload);
      toast.success('Transacción completada exitosamente.');
      await fetchTransactions(); // Recargar la lista
    } catch (error: unknown) {
      console.error('Failed to create transaction', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="animate-in fade-in duration-500">
      <div className="mx-auto max-w-5xl space-y-8">
        <header className="border-outline flex items-center justify-between border-b pb-6">
          <div className="space-y-1">
            <h1 className="text-on-surface text-2xl font-bold">
              Transacciones
            </h1>
            <p className="text-secondary text-sm">
              Registro de compras, ventas y préstamos
            </p>
          </div>
          <div className="flex space-x-4">
            <Button
              variant="outline"
              onClick={() => navigate('/dashboard')}
              className="border-outline"
            >
              Volver
            </Button>
            <TransactionForm 
              onSubmit={handleAddTransaction} 
              isLoading={isSubmitting} 
            />
          </div>
        </header>

        <main>
          <TransactionList transactions={transactions} isLoading={isLoading} />
        </main>
      </div>
    </div>
  );
}
