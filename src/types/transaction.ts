import type { Database } from './supabase';

export type TransactionType = 'buy' | 'sell' | 'loan';

export type Transaction = Database['public']['Tables']['transactions']['Row'];
export type TransactionInsert = Database['public']['Tables']['transactions']['Insert'];
export type TransactionUpdate = Database['public']['Tables']['transactions']['Update'];
