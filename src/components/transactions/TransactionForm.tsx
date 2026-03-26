import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { TransactionInsert, TransactionType } from '@/types/transaction';

interface TransactionFormProps {
  onSubmit: (data: Omit<TransactionInsert, 'company_id' | 'user_id'>) => Promise<void>;
  isLoading: boolean;
}

export function TransactionForm({ onSubmit, isLoading }: TransactionFormProps) {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<TransactionType>('sell');
  const [amount, setAmount] = useState<string>('');
  const [concept, setConcept] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || isNaN(Number(amount))) return;

    await onSubmit({
      type,
      amount: Number(amount),
      concept,
    });
    
    // Reseteamos el form al enviar
    setOpen(false);
    setAmount('');
    setConcept('');
    setType('sell');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2">
        Nueva Transacción
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Registrar Transacción</DialogTitle>
          <DialogDescription>
            Añade los detalles de la nueva compra, venta o préstamo.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="type">Tipo de Operación</Label>
            <Select
              value={type}
              onValueChange={(val) => setType(val as TransactionType)}
            >
              <SelectTrigger id="type">
                <SelectValue placeholder="Seleccione un tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="buy">Compra</SelectItem>
                <SelectItem value="sell">Venta</SelectItem>
                <SelectItem value="loan">Préstamo</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Monto ($)</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              min="0"
              required
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="concept">Concepto</Label>
            <Input
              id="concept"
              placeholder="Ej. Anticipo por terreno lote 45"
              value={concept}
              onChange={(e) => setConcept(e.target.value)}
            />
          </div>

          <DialogFooter className="pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading || !amount}>
              {isLoading ? 'Guardando...' : 'Guardar'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
