import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { transactionsService } from '@/services/transactionsService';
import type { Transaction, TransactionInsert } from '@/types/transaction';
import { TransactionList } from '@/components/transactions/TransactionList';
import { TransactionForm } from '@/components/transactions/TransactionForm';

export default function Transacciones() {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
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

  const handleAddTransaction = async (data: TransactionInsert) => {
    try {
      setIsSubmitting(true);
      const newTx = await transactionsService.createTransaction(data);
      // Prepend the new transaction to the list to avoid refetching everything
      setTransactions((prev) => [newTx, ...prev]);
    } catch (error) {
      console.error('Failed to create transaction', error);
      // Opcional: Mostrar un toast de error aquí
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
