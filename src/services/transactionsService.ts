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
   * Crea una nueva transacción en la base de datos resolviendo automáticamente el company_id.
   */
  async createTransaction(transaction: Omit<TransactionInsert, 'company_id' | 'user_id'>): Promise<Transaction> {
    const sessionResponse = await supabase.auth.getSession();
    const userId = sessionResponse.data.session?.user.id;
    
    if (!userId) throw new Error('Usuario no autenticado');

    // Recuperamos la empresa del usuario
    const { data: userData } = await supabase
      .from('users')
      .select('company_id')
      .eq('id', userId)
      .single();

    if (!userData?.company_id) {
       throw new Error('El usuario no tiene una empresa asignada.');
    }

    const { data, error } = await supabase
      .from('transactions')
      .insert([{ 
        ...transaction, 
        company_id: userData.company_id,
        user_id: userId
      }])
      .select()
      .single();

    if (error) {
      console.error('Error creating transaction:', error);
      throw new Error(error.message);
    }

    return data;
  },
};
