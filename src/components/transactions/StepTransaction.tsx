import { WalletIcon, AlertCircleIcon } from 'lucide-react';
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

/** Labels en español para el tipo de flujo monetario */
const TX_TYPE_LABEL: Record<TransactionType, string> = {
  income: 'Ingreso a Caja (+)',
  expense: 'Salida de Caja (−)',
};

interface StepTransactionProps {
  data: TransactionFormData;
  /** La acción de inventario determina si el tipo de transacción está bloqueado */
  invAction: InvAction;
  onChange: (field: keyof TransactionFormData, value: string) => void;
  /** Si se intentó finalizar sin completar, muestra errores de validación */
  submitted?: boolean;
}

/**
 * Paso 3 del wizard de transacciones.
 * Registra el asiento de caja (ingreso o egreso) con monto, tipo y concepto.
 * Incluye validaciones visuales por campo cuando submitted=true.
 */
export function StepTransaction({
  data,
  invAction,
  onChange,
  submitted = false,
}: StepTransactionProps) {
  const isTypeLocked = invAction !== 'none';

  // Validaciones de UI
  const showAmountError = submitted && (!data.amount || Number(data.amount) <= 0);
  const showConceptError = submitted && !data.concept.trim();

  return (
    <div className="fade-in-step space-y-5">
      <div className="bg-surface rounded-xl border border-outline p-5 space-y-5">
        {/* Encabezado: indicador de tipo de movimiento */}
        <div className="flex items-center gap-3 pb-4 border-b border-outline">
          <div
            className={`p-2 rounded-lg transition-colors ${
              data.type === 'income'
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            <WalletIcon className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-semibold text-on-surface">Asiento de Libro Mayor</h4>
            <p className="text-xs text-secondary">
              Este movimiento quedará registrado de forma permanente en el balance.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Tipo de flujo */}
          <div className="space-y-1.5">
            <Label htmlFor="txType" className="text-on-surface">Tipo de Movimiento *</Label>
            <Select
              value={data.type}
              onValueChange={(val) => onChange('type', val as TransactionType)}
              disabled={isTypeLocked}
            >
              <SelectTrigger
                id="txType"
                className={
                  data.type === 'income'
                    ? 'bg-green-50/60 text-green-800 border-green-200'
                    : 'bg-red-50/60 text-red-800 border-red-200'
                }
              >
                {/* Label explícito en español para evitar que muestre el valor crudo */}
                <SelectValue>{TX_TYPE_LABEL[data.type]}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="income" className="font-medium text-green-700">
                  Ingreso a Caja (+)
                </SelectItem>
                <SelectItem value="expense" className="font-medium text-red-700">
                  Salida de Caja (−)
                </SelectItem>
              </SelectContent>
            </Select>
            {isTypeLocked && (
              <p className="text-[10px] text-secondary mt-1">
                El tipo se asigna automáticamente según la operación del Paso 2.
              </p>
            )}
          </div>

          {/* Monto */}
          <div className="space-y-1.5">
            <Label htmlFor="amount" className="text-on-surface">Monto ($) *</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary font-medium">
                $
              </span>
              <Input
                id="amount"
                type="number"
                step="0.01"
                min="0.01"
                required
                className={`pl-8 text-lg font-bold bg-background focus:ring-primary/30 ${
                  showAmountError ? 'border-red-400 focus:ring-red-200' : ''
                }`}
                placeholder="0.00"
                value={data.amount}
                onChange={(e) => onChange('amount', e.target.value)}
                // Para "nuevo artículo" el monto se sincroniza desde el paso 2
                readOnly={invAction === 'new'}
              />
            </div>
            {showAmountError && (
              <p className="text-xs text-red-500 flex items-center gap-1">
                <AlertCircleIcon className="w-3 h-3" /> Ingresa un monto mayor a $0
              </p>
            )}
            {invAction === 'new' && (
              <p className="text-[10px] text-secondary">
                Se calcula automáticamente desde el monto entregado.
              </p>
            )}
          </div>

          {/* Concepto */}
          <div className="space-y-1.5 md:col-span-2">
            <Label htmlFor="concept" className="text-on-surface">Concepto *</Label>
            <Input
              id="concept"
              required
              className={`bg-background focus:ring-primary/30 ${
                showConceptError ? 'border-red-400 focus:ring-red-200' : ''
              }`}
              placeholder="Ej. Venta de celular Samsung, Pago de arriendo, Empeño de reloj..."
              value={data.concept}
              onChange={(e) => onChange('concept', e.target.value)}
            />
            {showConceptError && (
              <p className="text-xs text-red-500 flex items-center gap-1">
                <AlertCircleIcon className="w-3 h-3" /> El concepto es obligatorio
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
