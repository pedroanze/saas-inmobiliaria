import { TrendingUpIcon, TrendingDownIcon, ReceiptIcon } from 'lucide-react';
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

/** Categorías predefinidas para el inventario de la casa de empeño */
const CATEGORIES = [
  'Celulares y Tablets',
  'Computadoras y Laptops',
  'Televisores',
  'Electrodomésticos',
  'Electrónica y Audio',
  'Joyas y Relojes',
  'Ropa y Calzado',
  'Herramientas',
  'Muebles y Decoración',
  'Videojuegos y Consolas',
  'Vehículos y Repuestos',
  'Instrumentos Musicales',
  'Otro',
];

/** Mapa de labels en español para el tipo de operación comercial */
const OPERATION_LABEL: Record<string, string> = {
  bought: 'Compra directa',
  pawned: 'Empeño (préstamo)',
};

interface StepInventoryProps {
  data: InventoryFormData;
  inventoryItems: InventoryItem[];
  onChange: (field: keyof InventoryFormData, value: string) => void;
  onActionChange: (action: InvAction) => void;
  /** Si se intentó avanzar sin completar el paso, muestra errores */
  submitted?: boolean;
}

/** Tarjeta de selección de acción financiera */
function ActionCard({
  active,
  onClick,
  icon: Icon,
  label,
  badge,
  title,
  description,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ElementType;
  label: string;
  badge: string;
  title: string;
  description: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`p-4 rounded-xl border-2 text-left transition-all duration-150 flex flex-col gap-2 ${
        active
          ? 'border-primary bg-primary/5 shadow-sm'
          : 'border-outline hover:border-primary/40 bg-surface'
      }`}
    >
      <div className="flex items-center justify-between w-full">
        <Icon className={`w-5 h-5 ${active ? 'text-primary' : 'text-secondary'}`} />
        <span
          className={`text-[10px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded ${
            active ? 'bg-primary/10 text-primary' : 'bg-outline/60 text-secondary'
          }`}
        >
          {badge}
        </span>
      </div>
      <h4 className="font-bold text-sm text-on-surface">{label}</h4>
      <p className="text-[11px] text-secondary leading-tight">{title}</p>
      <p className="text-[10px] text-secondary/70 leading-tight">{description}</p>
    </button>
  );
}

/** Formulario de detalle para un artículo nuevo (egreso) */
function NewItemForm({
  data,
  onChange,
  submitted = false,
}: Pick<StepInventoryProps, 'data' | 'onChange' | 'submitted'>) {
  const showNameError = submitted && !data.name;
  const showCategoryError = submitted && !data.category;
  const showAmountError = submitted && !data.amount_paid;
  const showDueDateError = submitted && data.status === 'pawned' && !data.due_date;

  return (
    <div className="bg-surface rounded-xl border border-outline p-5 grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in zoom-in-95 duration-150">
      {/* Operación comercial */}
      <div className="space-y-1.5">
        <Label htmlFor="status" className="text-on-surface">Tipo de Operación *</Label>
        <Select value={data.status} onValueChange={(val) => onChange('status', val ?? '')}>
          <SelectTrigger id="status" className="bg-background">
            {/* Mostramos el label en español explícitamente para evitar que aparezca el valor crudo */}
            <SelectValue>{OPERATION_LABEL[data.status] ?? 'Selecciona...'}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="bought">Compra directa</SelectItem>
            <SelectItem value="pawned">Empeño (préstamo)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Nombre del artículo */}
      <div className="space-y-1.5">
        <Label htmlFor="itemName" className="text-on-surface">Producto / Modelo *</Label>
        <Input
          id="itemName"
          placeholder="Ej. iPhone 14 Pro"
          value={data.name}
          onChange={(e) => onChange('name', e.target.value)}
          className={`bg-background ${showNameError ? 'border-red-400' : ''}`}
        />
        {showNameError && <p className="text-xs text-red-500">Requerido</p>}
      </div>

      {/* Categoría — dropdown fijo */}
      <div className="space-y-1.5">
        <Label htmlFor="category" className="text-on-surface">Categoría *</Label>
        <Select value={data.category} onValueChange={(val) => onChange('category', val ?? '')}>
          <SelectTrigger id="category" className={`bg-background ${showCategoryError ? 'border-red-400' : ''}`}>
            <SelectValue placeholder="Selecciona categoría...">{data.category || 'Selecciona categoría...'}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            {CATEGORIES.map((cat) => (
              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {showCategoryError && <p className="text-xs text-red-500">Requerido</p>}
      </div>

      {/* Monto entregado */}
      <div className="space-y-1.5">
        <Label htmlFor="amountPaid" className="text-on-surface">Monto Entregado ($) *</Label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary font-medium">$</span>
          <Input
            id="amountPaid"
            type="number"
            min="0.01"
            step="0.01"
            value={data.amount_paid}
            onChange={(e) => onChange('amount_paid', e.target.value)}
            className={`pl-7 bg-background ${showAmountError ? 'border-red-400' : ''}`}
            placeholder="0.00"
          />
        </div>
        {showAmountError && <p className="text-xs text-red-500">Requerido</p>}
      </div>

      {/* Fecha de vencimiento (solo empeño) */}
      {data.status === 'pawned' && (
        <div className="space-y-1.5 md:col-span-2">
          <Label htmlFor="dueDate" className="text-on-surface">Fecha de Vencimiento del Empeño *</Label>
          <Input
            id="dueDate"
            type="date"
            value={data.due_date}
            onChange={(e) => onChange('due_date', e.target.value)}
            className={`bg-background max-w-xs ${showDueDateError ? 'border-red-400' : ''}`}
          />
          {showDueDateError && <p className="text-xs text-red-500">Requerido para empeños</p>}
        </div>
      )}
    </div>
  );
}

/** Selector de artículo existente para venta (ingreso) */
function ExistingItemSelector({
  inventoryItems,
  value,
  onChange,
  submitted = false,
}: {
  inventoryItems: InventoryItem[];
  value: string;
  onChange: (val: string) => void;
  submitted?: boolean;
}) {
  const sellable = inventoryItems.filter(
    (i) => i.status === 'bought' || i.status === 'for_sale' || i.status === 'pawned',
  );
  const selected = sellable.find((i) => i.id === value);
  const showError = submitted && !value;

  return (
    <div className="bg-surface rounded-xl border border-outline p-5 animate-in fade-in zoom-in-95 duration-150">
      <div className="space-y-1.5">
        <Label htmlFor="existingInvId" className="text-on-surface">Artículo a vender *</Label>
        <Select value={value} onValueChange={(val) => onChange(val ?? '')}>
          <SelectTrigger
            id="existingInvId"
            className={`w-full h-auto py-3 bg-background ${showError ? 'border-red-400' : ''}`}
          >
            <SelectValue placeholder="Selecciona un artículo...">
              {selected ? selected.name : 'Selecciona un artículo...'}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {sellable.map((item) => (
              <SelectItem key={item.id} value={item.id} className="py-2">
                <div className="flex flex-col">
                  <span className="font-medium">{item.name}</span>
                  <span className="text-[10px] text-secondary mt-0.5">
                    {item.category} • {STATUS_LABEL[item.status]}
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
        {showError && <p className="text-xs text-red-500">Debes seleccionar un artículo</p>}
      </div>
    </div>
  );
}

/**
 * Paso 2 del wizard de transacciones.
 * Tres modos: Egreso con inventario nuevo, Ingreso por venta, o movimiento libre de Caja.
 */
export function StepInventory({
  data,
  inventoryItems,
  onChange,
  onActionChange,
  submitted = false,
}: StepInventoryProps) {
  return (
    <div className="fade-in-step space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <ActionCard
          active={data.action === 'new'}
          onClick={() => onActionChange('new')}
          icon={TrendingDownIcon}
          label="Egreso"
          badge="Egreso"
          title="Compra o Empeño"
          description="Registra un artículo nuevo que entra a la tienda."
        />
        <ActionCard
          active={data.action === 'existing'}
          onClick={() => onActionChange('existing')}
          icon={TrendingUpIcon}
          label="Ingreso"
          badge="Ingreso"
          title="Venta de artículo"
          description="Vende un artículo ya registrado en el inventario."
        />
        <ActionCard
          active={data.action === 'none'}
          onClick={() => onActionChange('none')}
          icon={ReceiptIcon}
          label="Caja Libre"
          badge="Caja"
          title="Sin inventario"
          description="Gastos, sueldos, ingresos sin artículo asociado."
        />
      </div>

      {data.action === 'new' && (
        <NewItemForm data={data} onChange={onChange} submitted={submitted} />
      )}

      {data.action === 'existing' && (
        <ExistingItemSelector
          inventoryItems={inventoryItems}
          value={data.id}
          onChange={(val) => onChange('id', val)}
          submitted={submitted}
        />
      )}

      {data.action === 'none' && (
        <div className="bg-surface rounded-xl border border-dashed border-outline p-5 text-center animate-in fade-in zoom-in-95 duration-150">
          <ReceiptIcon className="w-8 h-8 text-secondary mx-auto mb-2" />
          <p className="text-sm text-secondary">
            Este movimiento no afectará el inventario. Solo impactará el libro de caja.
          </p>
        </div>
      )}
    </div>
  );
}
