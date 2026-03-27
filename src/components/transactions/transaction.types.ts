// Tipos compartidos para el módulo de transacciones

export type InvAction = 'new' | 'existing' | 'none';
export type InventoryStatus = 'pawned' | 'bought' | 'for_sale' | 'sold';
export type TransactionType = 'income' | 'expense';

/** Datos del cliente recolectados en el Paso 1 */
export interface CustomerFormData {
  national_id: string;
  full_name: string;
  phone: string;
}

/** Datos del inventario recolectados en el Paso 2 */
export interface InventoryFormData {
  action: InvAction;
  /** UUID del ítem existente (solo cuando action === 'existing') */
  id: string;
  name: string;
  category: string;
  status: 'pawned' | 'bought';
  amount_paid: string;
  due_date: string;
}

/** Datos de la transacción de caja recolectados en el Paso 3 */
export interface TransactionFormData {
  type: TransactionType;
  amount: string;
  concept: string;
}

/** Ítem de inventario proveniente de Supabase */
export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  status: InventoryStatus;
}

/** Mapa de traducción de estados al español */
export const STATUS_LABEL: Record<InventoryStatus, string> = {
  pawned: 'Empeñado',
  bought: 'Comprado',
  for_sale: 'En venta',
  sold: 'Vendido',
};

/** Payload completo enviado al servicio processTransaction */
export interface TransactionPayload {
  customer: {
    national_id?: string;
    full_name?: string;
    phone?: string;
  };
  inventory: {
    action: InvAction;
    id?: string;
    name: string;
    category: string;
    status: 'pawned' | 'bought';
    amount_paid?: number;
    due_date?: string;
  };
  transaction: {
    type: TransactionType;
    amount: number;
    concept: string;
  };
}
