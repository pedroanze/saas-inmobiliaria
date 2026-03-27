import { BoxIcon, ShoppingBagIcon, FileTextIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { InvAction, InventoryFormData, InventoryItem } from './transaction.types';
import { STATUS_LABEL } from './transaction.types';

interface StepInventoryProps {
  data: InventoryFormData;
  inventoryItems: InventoryItem[];
  onChange: (field: keyof InventoryFormData, value: string) => void;
  onActionChange: (action: InvAction) => void;
}

/** Tarjeta de selección de acción con resaltado activo */
function ActionCard({
  active,
  onClick,
  icon: Icon,
  title,
  description,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`p-4 rounded-xl border-2 text-left transition-all duration-200 flex flex-col items-start ${
        active
          ? 'border-primary bg-primary/5 shadow-md shadow-primary/10 scale-[1.02]'
          : 'border-outline hover:border-primary/50 bg-surface opacity-80'
      }`}
    >
      <Icon className={`w-5 h-5 mb-3 ${active ? 'text-primary' : 'text-secondary'}`} />
      <h4 className="font-semibold text-sm text-on-surface">{title}</h4>
      <p className="text-[11px] text-secondary mt-1 leading-tight">{description}</p>
    </button>
  );
}

/** Formulario de detalle para un artículo nuevo */
function NewItemForm({ data, onChange }: Pick<StepInventoryProps, 'data' | 'onChange'>) {
  return (
    <div className="bg-surface rounded-xl border border-outline p-5 grid grid-cols-1 md:grid-cols-2 gap-5 animate-in fade-in zoom-in-95 duration-200">
      <div className="space-y-2">
        <Label htmlFor="status" className="text-on-surface">Operación Comercial *</Label>
        <Select value={data.status} onValueChange={(val) => onChange('status', val ?? '')}>
          <SelectTrigger id="status"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="bought">Es una Compra (Directa)</SelectItem>
            <SelectItem value="pawned">Es un Empeño (Préstamo)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="itemName" className="text-on-surface">Producto / Modelo *</Label>
        <Input
          id="itemName"
          placeholder="Ej. PlayStation 5"
          value={data.name}
          onChange={(e) => onChange('name', e.target.value)}
          required
          className="bg-background focus:ring-primary/30"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="category" className="text-on-surface">Categoría *</Label>
        <Input
          id="category"
          placeholder="Ej. Consolas"
          value={data.category}
          onChange={(e) => onChange('category', e.target.value)}
          required
          className="bg-background focus:ring-primary/30"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="amountPaid" className="text-on-surface">Monto Entregado ($) *</Label>
        <Input
          id="amountPaid"
          type="number"
          min="0.01"
          step="0.01"
          value={data.amount_paid}
          onChange={(e) => onChange('amount_paid', e.target.value)}
          required
          className="bg-background focus:ring-primary/30"
        />
      </div>

      {data.status === 'pawned' && (
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="dueDate" className="text-on-surface">Fecha de Vencimiento *</Label>
          <Input
            id="dueDate"
            type="date"
            value={data.due_date}
            onChange={(e) => onChange('due_date', e.target.value)}
            required
            className="bg-background focus:ring-primary/30"
          />
        </div>
      )}
    </div>
  );
}

/** Selector de artículo existente para venta */
function ExistingItemSelector({
  inventoryItems,
  value,
  onChange,
}: {
  inventoryItems: InventoryItem[];
  value: string;
  onChange: (val: string) => void;
}) {
  // Solo mostramos los artículos disponibles para venta
  const sellable = inventoryItems.filter(
    (i) => i.status === 'bought' || i.status === 'for_sale' || i.status === 'pawned',
  );

  return (
    <div className="bg-surface rounded-xl border border-outline p-5 animate-in fade-in zoom-in-95 duration-200">
      <div className="space-y-2">
        <Label htmlFor="existingInvId" className="text-on-surface">Selecciona el objeto *</Label>
        <Select value={value} onValueChange={(val) => onChange(val ?? '')}>
          <SelectTrigger id="existingInvId" className="w-full text-left h-auto py-3 bg-background">
            <SelectValue placeholder="Busca en tu inventario..." />
          </SelectTrigger>
          <SelectContent>
            {sellable.map((item) => (
              <SelectItem key={item.id} value={item.id} className="py-2 cursor-pointer">
                <div className="flex flex-col">
                  <span className="font-medium">{item.name}</span>
                  <span className="text-[10px] text-secondary mt-0.5">
                    Categoría: {item.category} • Estado: {STATUS_LABEL[item.status]}
                  </span>
                </div>
              </SelectItem>
            ))}
            {sellable.length === 0 && (
              <div className="p-4 text-sm text-secondary text-center">
                No hay artículos disponibles para la venta.
              </div>
            )}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

/**
 * Paso 2 del wizard de transacciones.
 * Permite registrar un artículo nuevo, vincular uno existente o ignorarlo.
 */
export function StepInventory({ data, inventoryItems, onChange, onActionChange }: StepInventoryProps) {
  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <ActionCard
          active={data.action === 'new'}
          onClick={() => onActionChange('new')}
          icon={BoxIcon}
          title="Asentar Nuevo"
          description="Registra una compra o empeño de un nuevo artículo."
        />
        <ActionCard
          active={data.action === 'existing'}
          onClick={() => onActionChange('existing')}
          icon={ShoppingBagIcon}
          title="Vender Existente"
          description="Enlaza la venta de un artículo ya registrado en tu inventario."
        />
        <ActionCard
          active={data.action === 'none'}
          onClick={() => onActionChange('none')}
          icon={FileTextIcon}
          title="Sólo Caja"
          description="Asientos generales como pago de luz, sueldos o ingresos libres."
        />
      </div>

      {data.action === 'new' && (
        <NewItemForm data={data} onChange={onChange} />
      )}

      {data.action === 'existing' && (
        <ExistingItemSelector
          inventoryItems={inventoryItems}
          value={data.id}
          onChange={(val) => onChange('id', val)}
        />
      )}
    </div>
  );
}
