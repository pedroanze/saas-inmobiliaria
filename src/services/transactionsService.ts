import { supabase } from '@/lib/supabase';
import type { TransactionInsert } from '@/types/transaction';
import type { TransactionPayload } from '@/components/transactions/transaction.types';

/** Tipo local que representa cada fila de la tabla de transacciones con el JOIN de inventario */
export interface TransactionRow {
  id: string;
  type: string;
  concept: string | null;
  amount: number;
  created_at: string | null;
  inventory: { name: string } | null;
}

export const transactionsService = {
  /**
   * Obtiene todas las transacciones ordenadas por fecha de creación descendente.
   */
  async getTransactions(): Promise<TransactionRow[]> {
    const { data, error } = await supabase
      .from('transactions')
      .select('*, inventory(name)')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching transactions:', error);
      throw new Error(error.message);
    }

    // Mapeamos los datos crudos de Supabase al tipo local eliminando nullables innecesarios
    return (data ?? []).map((row) => ({
      id: row.id,
      type: row.type ?? '',
      concept: row.concept,
      amount: row.amount ?? 0,
      created_at: row.created_at,
      inventory: row.inventory as { name: string } | null,
    }));
  },

  /**
   * Crea una nueva transacción en la base de datos resolviendo automáticamente el company_id.
   */
  async createTransaction(transaction: TransactionInsert) {
    const sessionResponse = await supabase.auth.getSession();
    const userId = sessionResponse.data.session?.user.id;
    
    if (!userId) {
      throw new Error('Usuario no autenticado');
    }

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
      .insert([
        {
          ...transaction,
          company_id: userData.company_id,
          user_id: userId,
        },
      ])
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }
    return data;
  },

  /**
   * ESTRICTO FLUJO DE 3 PASOS:
   * 1. Cliente
   * 2. Artículo
   * 3. Transacción
   */
  async processTransaction(payload: TransactionPayload) {
    const sessionResponse = await supabase.auth.getSession();
    const userId = sessionResponse.data.session?.user.id;
    if (!userId) throw new Error('Usuario no autenticado');

    const { data: userData } = await supabase
      .from('users')
      .select('company_id')
      .eq('id', userId)
      .single();

    if (!userData?.company_id) throw new Error('El usuario no tiene una empresa asignada.');
    const companyId = userData.company_id;

    // --- PASO 1: Identificación del Cliente ---
    let customerId = null;
    if (payload.customer && payload.customer.national_id) {
      const { data: existingCustomer } = await supabase
        .from('customers')
        .select('id')
        .eq('company_id', companyId)
        .eq('national_id', payload.customer.national_id)
        .maybeSingle();

      if (existingCustomer) {
        customerId = existingCustomer.id;
      } else {
        const { data: newCustomer, error: customerError } = await supabase
          .from('customers')
          .insert([{
            national_id: payload.customer.national_id ?? '',
            // Garantizamos que full_name sea siempre string (Supabase lo requiere como NOT NULL)
            full_name: payload.customer.full_name ?? '',
            phone: payload.customer.phone ?? null,
            company_id: companyId
          }])
          .select('id')
          .single();
        if (customerError) throw new Error(`Paso 1 Falló (Cliente): ${customerError.message}`);
        customerId = newCustomer.id;
      }
    }

    // --- PASO 2: Registro del Artículo ---
    let inventoryId = null;
    if (payload.inventory.action === 'new') {
      const { data: newItem, error: invError } = await supabase
        .from('inventory')
        .insert([{
          customer_id: customerId,
          company_id: companyId,
          user_id: userId,
          name: payload.inventory.name,
          category: payload.inventory.category,
          status: payload.inventory.status,
          amount_paid: payload.inventory.amount_paid,
          // description no forma parte del payload del wizard (campo opcional fuera de scope)
          due_date: payload.inventory.due_date ?? null
        }])
        .select('id')
        .single();
      if (invError) throw new Error(`Paso 2 Falló (Inventario): ${invError.message}`);
      inventoryId = newItem.id;
    } else if (payload.inventory.action === 'existing' && payload.inventory.id) {
      inventoryId = payload.inventory.id;
      if (payload.transaction.type === 'income') {
        const { error: updateError } = await supabase
          .from('inventory')
          .update({ status: 'sold' })
          .eq('id', inventoryId);
        if (updateError) throw new Error(`Error actualizando artículo a vendido: ${updateError.message}`);
      }
    }

    // --- PASO 3: Registro en Caja (Transacción) ---
    const { data: newTx, error: txError } = await supabase
      .from('transactions')
      .insert([{
        inventory_id: inventoryId,
        customer_id: customerId,
        company_id: companyId,
        user_id: userId,
        type: payload.transaction.type,
        amount: payload.transaction.amount,
        concept: payload.transaction.concept
      }])
      .select()
      .single();

    if (txError) throw new Error(`Paso 3 Falló (Caja): ${txError.message}`);

    return { customerId, inventoryId, transaction: newTx };
  }
};
