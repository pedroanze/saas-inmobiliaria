export type TransactionType = 'buy' | 'sell' | 'loan';

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  description: string;
  created_at: string;
  user_id?: string;
}

export interface TransactionInsert {
  type: TransactionType;
  amount: number;
  description: string;
}
