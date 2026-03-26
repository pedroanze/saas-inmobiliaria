import { supabase } from '@/lib/supabase';
import type { Transaction, TransactionInsert } from '@/types/transaction';

export const transactionsService = {
  /**
   * Obtiene todas las transacciones ordenadas por fecha de creación descendente.
   */
  async getTransactions(): Promise<Transaction[]> {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching transactions:', error);
      throw new Error(error.message);
    }

    return data || [];
  },

  /**
   * Crea una nueva transacción en la base de datos.
   */
  async createTransaction(transaction: TransactionInsert): Promise<Transaction> {
    const { data, error } = await supabase
      .from('transactions')
      .insert([transaction])
      .select()
      .single();

    if (error) {
      console.error('Error creating transaction:', error);
      throw new Error(error.message);
    }

    return data;
  },
};
