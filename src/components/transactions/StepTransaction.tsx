import { WalletIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { InvAction, TransactionFormData, TransactionType } from './transaction.types';

interface StepTransactionProps {
  data: TransactionFormData;
  /** La acción de inventario determina si el tipo de transacción está bloqueado */
  invAction: InvAction;
  onChange: (field: keyof TransactionFormData, value: string) => void;
}

/**
 * Paso 3 del wizard de transacciones.
 * Registra el asiento de caja (ingreso o egreso) con monto y concepto.
 */
export function StepTransaction({ data, invAction, onChange }: StepTransactionProps) {
  const isTypeLocked = invAction !== 'none';

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-6">
      <div className="bg-surface rounded-xl border border-outline p-5 space-y-5">
        {/* Encabezado temático de la sección */}
        <div className="flex items-center gap-3 pb-4 border-b border-outline">
          <div
            className={`p-2 rounded-lg ${
              data.type === 'income' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}
          >
            <WalletIcon className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-semibold text-on-surface">Asiento de Libro Mayor</h4>
            <p className="text-xs text-secondary">
              Esta transacción impactará de forma inmutable el balance general.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
          {/* Selector de tipo de flujo */}
          <div className="space-y-2">
            <Label htmlFor="txType" className="text-on-surface">Flujo de Dinero *</Label>
            <Select
              value={data.type}
              onValueChange={(val) => onChange('type', val as TransactionType)}
              disabled={isTypeLocked}
            >
              <SelectTrigger
                id="txType"
                className={
                  data.type === 'income'
                    ? 'bg-green-50/50 text-green-800 border-green-200'
                    : 'bg-red-50/50 text-red-800 border-red-200'
                }
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="income" className="font-medium text-green-700">
                  Ingreso a Caja (+)
                </SelectItem>
                <SelectItem value="expense" className="font-medium text-red-700">
                  Salida de Caja (-)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Campo de monto */}
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-on-surface">Monto Exacto ($) *</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary font-medium">
                $
              </span>
              <Input
                id="amount"
                type="number"
                step="0.01"
                min="0"
                required
                className="pl-8 text-lg font-bold bg-background focus:ring-primary/30"
                placeholder="0.00"
                value={data.amount}
                onChange={(e) => onChange('amount', e.target.value)}
                // Si es artículo nuevo el monto viene sincronizado del paso 2
                readOnly={invAction === 'new'}
              />
            </div>
          </div>

          {/* Concepto */}
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="concept" className="text-on-surface">Concepto de la Transacción *</Label>
            <Input
              id="concept"
              required
              className="bg-background focus:ring-primary/30"
              placeholder="Ej. Venta de joyas, o Anticipo por Consola..."
              value={data.concept}
              onChange={(e) => onChange('concept', e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
