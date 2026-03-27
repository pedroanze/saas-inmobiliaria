import { supabase } from '@/lib/supabase';
import type { InventoryInsert, InventoryItem, InventoryStatus } from '@/types/inventory';

interface InventoryRegistrationPayload {
  inventoryData: Omit<InventoryInsert, 'company_id' | 'user_id' | 'customer_id'>;
  customerData: {
    national_id: string;
    full_name: string;
    phone?: string;
  };
}

export const inventoryService = {
  /**
   * Obtiene todos los artículos del inventario de la empresa actual (JOIN con customers)
   */
  async getInventoryItems() {
    const { data, error } = await supabase
      .from('inventory')
      .select('*, customers(full_name, national_id)')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching inventory:', error);
      throw new Error(error.message);
    }
    return data;
  },

  /**
   * Registra un nuevo ítem en inventario.
   * Maneja inteligentemente la creación/asignación de Clientes y la creación Automática de Transacciones.
   */
  async registerNewItem({ inventoryData, customerData }: InventoryRegistrationPayload): Promise<InventoryItem> {
    const sessionResponse = await supabase.auth.getSession();
    const userId = sessionResponse.data.session?.user.id;
    if (!userId) throw new Error('Usuario no autenticado');

    // Recuperamos la empresa del usuario actual
    const { data: userData } = await supabase
      .from('users')
      .select('company_id')
      .eq('id', userId)
      .single();

    if (!userData?.company_id) throw new Error('El usuario no tiene una empresa asignada.');
    const companyId = userData.company_id;

    // 1. Manejo del Cliente (Buscar o Crear)
    let customerId: string | null = null;
    if (customerData.national_id) {
      const { data: existingCustomer } = await supabase
        .from('customers')
        .select('id')
        .eq('company_id', companyId)
        .eq('national_id', customerData.national_id)
        .maybeSingle();

      if (existingCustomer) {
        customerId = existingCustomer.id;
      } else {
        // Creamos el cliente
        const { data: newCustomer, error: customerError } = await supabase
          .from('customers')
          .insert([{ 
            national_id: customerData.national_id, 
            full_name: customerData.full_name, 
            phone: customerData.phone,
            company_id: companyId 
          }])
          .select('id')
          .single();
        
        if (customerError) throw new Error(`Error creando cliente: ${customerError.message}`);
        customerId = newCustomer.id;
      }
    }

    // 2. Crear el ítem de Inventario
    const { data: newItem, error: inventoryError } = await supabase
      .from('inventory')
      .insert([{
        ...inventoryData,
        company_id: companyId,
        user_id: userId,
        customer_id: customerId
      }])
      .select()
      .single();

    if (inventoryError) throw new Error(`Error guardando inventario: ${inventoryError.message}`);

    // 3. Crear Transacción Automática (Si aplica)
    const status = inventoryData.status as InventoryStatus;
    const amountPaid = inventoryData.amount_paid || 0;

    if ((status === 'pawned' || status === 'bought') && amountPaid > 0) {
      const transactionType = status === 'pawned' ? 'loan' : 'buy';
      const conceptPrefix = status === 'pawned' ? 'Préstamo por empeño' : 'Compra de artículo';
      
      const { error: txError } = await supabase
        .from('transactions')
        .insert([{
          type: transactionType,
          amount: amountPaid,
          concept: `${conceptPrefix}: ${inventoryData.name}`,
          company_id: companyId,
          user_id: userId,
          customer_id: customerId,
          inventory_id: newItem.id
        }]);

      if (txError) {
        console.error('Warning: Error creating automatic transaction:', txError);
        // Podríamos hacer rollback, pero por MVP solo advertimos. El ítem ya existe.
      }
    }

    return newItem;
  }
};
