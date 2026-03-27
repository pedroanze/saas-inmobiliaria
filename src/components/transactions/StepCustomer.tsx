import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { CustomerFormData } from './transaction.types';

interface StepCustomerProps {
  data: CustomerFormData;
  onChange: (field: keyof CustomerFormData, value: string) => void;
}

/**
 * Paso 1 del wizard de transacciones.
 * Recoge o valida la identidad del cliente por cédula.
 */
export function StepCustomer({ data, onChange }: StepCustomerProps) {
  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-6">
      <div className="bg-primary/5 rounded-xl border border-primary/10 p-5 space-y-4">
        <p className="text-sm text-secondary">
          La ley exige asociar toda operación a una persona natural o jurídica.
          Si el cliente ya existe, el sistema lo enlazará automáticamente por su Cédula.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label htmlFor="nationalId" className="text-on-surface">Cédula / Carnet *</Label>
            <Input
              id="nationalId"
              placeholder="Ej. 1234567"
              value={data.national_id}
              onChange={(e) => onChange('national_id', e.target.value)}
              required
              className="bg-background focus:ring-primary/30"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="customerName" className="text-on-surface">Nombre Completo *</Label>
            <Input
              id="customerName"
              placeholder="Ej. Juan Pérez"
              value={data.full_name}
              onChange={(e) => onChange('full_name', e.target.value)}
              required
              className="bg-background focus:ring-primary/30"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="customerPhone" className="text-on-surface">Teléfono (Opcional)</Label>
            <Input
              id="customerPhone"
              placeholder="Ej. +591..."
              value={data.phone}
              onChange={(e) => onChange('phone', e.target.value)}
              className="bg-background focus:ring-primary/30"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
