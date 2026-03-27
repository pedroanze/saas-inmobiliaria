import type { Database } from './supabase';

export type InventoryStatus = 'pawned' | 'bought' | 'for_sale' | 'sold';

export type InventoryItem = Database['public']['Tables']['inventory']['Row'];
export type InventoryInsert = Database['public']['Tables']['inventory']['Insert'];
export type InventoryUpdate = Database['public']['Tables']['inventory']['Update'];
