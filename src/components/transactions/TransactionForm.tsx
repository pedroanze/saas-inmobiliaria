import { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { WalletIcon, ArrowRightIcon, ArrowLeftIcon, CheckCircleIcon } from 'lucide-react';
import { inventoryService } from '@/services/inventoryService';

import { StepperHeader } from './StepperHeader';
import { StepCustomer } from './StepCustomer';
import { StepInventory } from './StepInventory';
import { StepTransaction } from './StepTransaction';
import type {
  CustomerFormData,
  InventoryFormData,
  InventoryItem,
  TransactionFormData,
  TransactionPayload,
} from './transaction.types';

interface TransactionFormProps {
  onSubmit: (data: TransactionPayload) => Promise<void>;
  isLoading: boolean;
}

// Valores iniciales del wizard — se usan también en el reseteo
const INITIAL_CUSTOMER: CustomerFormData = { national_id: '', full_name: '', phone: '' };
const INITIAL_INVENTORY: InventoryFormData = {
  action: 'new',
  id: '',
  name: '',
  category: '',
  status: 'bought',
  amount_paid: '',
  due_date: '',
};
const INITIAL_TRANSACTION: TransactionFormData = { type: 'expense', amount: '', concept: '' };

const TOTAL_STEPS = 3;

/**
 * Wizard de 3 pasos para registrar una operación completa:
 * 1. Identificar al cliente (con búsqueda por debounce)
 * 2. Registrar/vincular artículo o marcar como solo caja
 * 3. Registrar el asiento de caja con validaciones
 */
export function TransactionForm({ onSubmit, isLoading }: TransactionFormProps) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);

  // Estado que indica si el usuario intentó avanzar sin cumplir las validaciones
  const [stepSubmitted, setStepSubmitted] = useState(false);

  const [customer, setCustomer] = useState<CustomerFormData>(INITIAL_CUSTOMER);
  const [inventory, setInventory] = useState<InventoryFormData>(INITIAL_INVENTORY);
  const [transaction, setTransaction] = useState<TransactionFormData>(INITIAL_TRANSACTION);
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);

  // Carga el inventario disponible al abrir el dialog
  useEffect(() => {
    if (open) {
      inventoryService
        .getInventoryItems()
        .then((rows) => {
          if (!rows) return;
          const mapped: InventoryItem[] = rows
            .filter((r) => r.id && r.name)
            .map((r) => ({
              id: r.id,
              name: r.name ?? '',
              category: r.category ?? '',
              status: (r.status ?? 'bought') as InventoryItem['status'],
            }));
          setInventoryItems(mapped);
        })
        .catch(console.error);
    }
  }, [open]);

  /**
   * Sincronización reactiva: cuando cambia la acción de inventario o el monto,
   * actualizamos el tipo y monto de la transacción sin usar setState en un effect.
   */
  const derivedTransaction = useMemo<TransactionFormData>(() => {
    if (inventory.action === 'new') {
      // Compra / empeño → egreso, monto heredado del artículo
      return { ...transaction, type: 'expense', amount: inventory.amount_paid };
    }
    if (inventory.action === 'existing') {
      // Venta → ingreso
      return { ...transaction, type: 'income' };
    }
    return transaction;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inventory.action, inventory.amount_paid]);

  useEffect(() => {
    setTransaction(derivedTransaction);
  }, [derivedTransaction]);

  const handleCustomerChange = (field: keyof CustomerFormData, value: string) => {
    setCustomer((prev) => ({ ...prev, [field]: value }));
  };

  const handleInventoryChange = (field: keyof InventoryFormData, value: string) => {
    setInventory((prev) => ({ ...prev, [field]: value }));
  };

  const handleInventoryActionChange = (action: InventoryFormData['action']) => {
    setInventory((prev) => ({ ...prev, action }));
  };

  const handleTransactionChange = (field: keyof TransactionFormData, value: string) => {
    setTransaction((prev) => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setStep(1);
    setStepSubmitted(false);
    setCustomer(INITIAL_CUSTOMER);
    setInventory(INITIAL_INVENTORY);
    setTransaction(INITIAL_TRANSACTION);
  };

  const handleSubmit = async () => {
    if (!isStep3Valid) {
      setStepSubmitted(true);
      return;
    }
    await onSubmit({
      customer: {
        national_id: customer.national_id || undefined,
        full_name: customer.full_name || undefined,
        phone: customer.phone || undefined,
      },
      inventory: {
        action: inventory.action,
        id: inventory.action === 'existing' ? inventory.id : undefined,
        name: inventory.name,
        category: inventory.category,
        status: inventory.status,
        amount_paid: inventory.amount_paid ? Number(inventory.amount_paid) : undefined,
        due_date: inventory.status === 'pawned' ? inventory.due_date : undefined,
      },
      transaction: {
        type: transaction.type,
        amount: Number(transaction.amount),
        concept: transaction.concept,
      },
    });

    setOpen(false);
    resetForm();
  };

  // Reglas de validación: el Step 1 requiere cédula + nombre (el nombre lo llena la búsqueda o el usuario)
  const isStep1Valid = !!customer.national_id && !!customer.full_name;
  const isStep2Valid =
    inventory.action === 'none' ||
    (inventory.action === 'existing' && !!inventory.id) ||
    (inventory.action === 'new' &&
      !!inventory.name &&
      !!inventory.category &&
      !!inventory.amount_paid &&
      (inventory.status !== 'pawned' || !!inventory.due_date));
  const isStep3Valid =
    !!transaction.amount && Number(transaction.amount) > 0 && !!transaction.concept.trim();

  const canAdvance = step === 1 ? isStep1Valid : step === 2 ? isStep2Valid : isStep3Valid;

  const nextStep = () => {
    if (!canAdvance) {
      // Muestra errores de validación en los campos del paso actual
      setStepSubmitted(true);
      return;
    }
    setStepSubmitted(false);
    if (step < TOTAL_STEPS) setStep((s) => s + 1);
  };

  const prevStep = () => {
    setStepSubmitted(false);
    setStep((s) => Math.max(1, s - 1));
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        setOpen(val);
        if (!val) resetForm();
      }}
    >
      {/* Base UI usa render= en lugar de asChild */}
      <DialogTrigger
        render={
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 transition-all font-semibold px-5 py-2">
            <WalletIcon className="w-4 h-4 mr-2" />
            Nueva Transacción
          </Button>
        }
      />

      <DialogContent className="sm:max-w-[680px] p-0 overflow-hidden border-outline/50 bg-background shadow-2xl">
        {/* Encabezado con stepper */}
        <div className="bg-surface border-b border-outline px-6 pt-4 pb-0">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-on-surface">
              Módulo de Operaciones Central
            </DialogTitle>
          </DialogHeader>
          <StepperHeader currentStep={step} totalSteps={TOTAL_STEPS} />
        </div>

        {/* Contenido del paso activo */}
        <div className="px-6 py-6 max-h-[65vh] overflow-y-auto custom-scrollbar">
          {step === 1 && (
            <StepCustomer data={customer} onChange={handleCustomerChange} />
          )}
          {step === 2 && (
            <StepInventory
              data={inventory}
              inventoryItems={inventoryItems}
              onChange={handleInventoryChange}
              onActionChange={handleInventoryActionChange}
              submitted={stepSubmitted}
            />
          )}
          {step === 3 && (
            <StepTransaction
              data={transaction}
              invAction={inventory.action}
              onChange={handleTransactionChange}
              submitted={stepSubmitted}
            />
          )}
        </div>

        {/* Barra de acciones */}
        <div className="bg-surface border-t border-outline px-6 py-4 flex items-center justify-between">
          <Button
            type="button"
            variant="ghost"
            className="text-secondary hover:bg-outline hover:text-on-surface"
            onClick={() => setOpen(false)}
          >
            Cancelar
          </Button>

          <div className="flex gap-2">
            {step > 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                className="bg-background"
              >
                <ArrowLeftIcon className="w-4 h-4 mr-1.5" /> Atrás
              </Button>
            )}

            {step < TOTAL_STEPS ? (
              <Button
                type="button"
                onClick={nextStep}
                className="bg-on-surface text-surface hover:bg-on-surface/90 px-6"
              >
                Siguiente <ArrowRightIcon className="w-4 h-4 ml-1.5" />
              </Button>
            ) : (
              <Button
                type="button"
                disabled={isLoading}
                onClick={handleSubmit}
                className="bg-primary hover:bg-primary/90 shadow-primary/20 shadow-lg px-6 font-semibold"
              >
                {isLoading ? 'Registrando...' : 'Finalizar Transacción'}
                <CheckCircleIcon className="w-4 h-4 ml-1.5" />
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
