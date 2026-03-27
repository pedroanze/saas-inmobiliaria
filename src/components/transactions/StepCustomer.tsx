import { useEffect, useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/lib/supabase';
import { CheckCircleIcon, Loader2Icon, UserPlusIcon, SearchIcon, AlertCircleIcon } from 'lucide-react';
import type { CustomerFormData } from './transaction.types';

interface StepCustomerProps {
  data: CustomerFormData;
  onChange: (field: keyof CustomerFormData, value: string) => void;
}

type SearchStatus = 'idle' | 'searching' | 'found' | 'not_found';

interface FoundCustomer {
  id: string;
  full_name: string;
  phone: string | null;
  national_id: string;
}

/**
 * Paso 1 del wizard de transacciones.
 * Busca al cliente por cédula con debounce. Si existe lo prelellena;
 * si no, habilita el formulario de creación.
 */
export function StepCustomer({ data, onChange }: StepCustomerProps) {
  const [status, setStatus] = useState<SearchStatus>('idle');
  const [foundCustomer, setFoundCustomer] = useState<FoundCustomer | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Validaciones de UI
  const showNameError = status === 'not_found' && data.national_id.length > 0 && !data.full_name;

  /**
   * Busca un cliente en la base de datos por national_id.
   * Solo busca dentro de la empresa actual del usuario autenticado.
   */
  const searchCustomer = async (nationalId: string) => {
    if (!nationalId.trim()) {
      setStatus('idle');
      setFoundCustomer(null);
      return;
    }

    setStatus('searching');
    try {
      const { data: session } = await supabase.auth.getSession();
      const userId = session.session?.user.id;
      if (!userId) return;

      const { data: userData } = await supabase
        .from('users')
        .select('company_id')
        .eq('id', userId)
        .single();

      if (!userData?.company_id) return;

      const { data: customer } = await supabase
        .from('customers')
        .select('id, national_id, full_name, phone')
        .eq('company_id', userData.company_id)
        .eq('national_id', nationalId.trim())
        .maybeSingle();

      if (customer) {
        setFoundCustomer(customer);
        setStatus('found');
        // Pre-llenamos los campos con los datos del cliente encontrado
        onChange('full_name', customer.full_name);
        onChange('phone', customer.phone ?? '');
      } else {
        setFoundCustomer(null);
        setStatus('not_found');
        // Limpiamos los campos para el nuevo registro
        onChange('full_name', '');
        onChange('phone', '');
      }
    } catch {
      setStatus('idle');
    }
  };

  // Debounce: espera 600ms tras dejar de escribir antes de buscar
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      searchCustomer(data.national_id);
    }, 600);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.national_id]);

  return (
    <div className="fade-in-step space-y-5">
      {/* Campo de búsqueda por cédula */}
      <div className="space-y-2">
        <Label htmlFor="nationalId" className="text-on-surface font-semibold">
          Cédula / Carnet de Identidad *
        </Label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary">
            {status === 'searching' ? (
              <Loader2Icon className="w-4 h-4 animate-spin" />
            ) : (
              <SearchIcon className="w-4 h-4" />
            )}
          </span>
          <Input
            id="nationalId"
            placeholder="Ingresa el número de cédula..."
            value={data.national_id}
            onChange={(e) => onChange('national_id', e.target.value)}
            required
            className="pl-9 bg-background focus:ring-primary/30"
          />
        </div>
        {status === 'searching' && (
          <p className="text-xs text-secondary animate-pulse">Buscando en la base de datos...</p>
        )}
      </div>

      {/* Cliente ENCONTRADO */}
      {status === 'found' && foundCustomer && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-start gap-3 animate-in fade-in zoom-in-95 duration-200">
          <CheckCircleIcon className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-green-800 text-sm">Cliente registrado encontrado</p>
            <p className="text-green-700 text-sm mt-0.5">{foundCustomer.full_name}</p>
            {foundCustomer.phone && (
              <p className="text-green-600 text-xs mt-1">{foundCustomer.phone}</p>
            )}
          </div>
        </div>
      )}

      {/* Cliente NO ENCONTRADO → formulario de registro */}
      {status === 'not_found' && (
        <div className="animate-in fade-in zoom-in-95 duration-200 space-y-4">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
            <UserPlusIcon className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold text-amber-800 text-sm">Cliente no encontrado</p>
              <p className="text-amber-700 text-xs mt-0.5">
                Completa los campos para registrar al nuevo cliente.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="customerName" className="text-on-surface">Nombre Completo *</Label>
              <Input
                id="customerName"
                placeholder="Ej. Juan Pérez"
                value={data.full_name}
                onChange={(e) => onChange('full_name', e.target.value)}
                required
                className={`bg-background focus:ring-primary/30 ${showNameError ? 'border-red-400 focus:ring-red-200' : ''}`}
              />
              {showNameError && (
                <p className="text-xs text-red-500 flex items-center gap-1">
                  <AlertCircleIcon className="w-3 h-3" /> El nombre es obligatorio
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="customerPhone" className="text-on-surface">Teléfono (Opcional)</Label>
              <Input
                id="customerPhone"
                placeholder="Ej. +591 70000000"
                value={data.phone}
                onChange={(e) => onChange('phone', e.target.value)}
                className="bg-background focus:ring-primary/30"
              />
            </div>
          </div>
        </div>
      )}

      {/* Estado inicial: instrucción */}
      {status === 'idle' && !data.national_id && (
        <p className="text-sm text-secondary bg-surface border border-outline rounded-xl p-4">
          Ingresa el número de cédula para buscar al cliente. Si no existe en el sistema,
          podrás registrarlo en el momento.
        </p>
      )}
    </div>
  );
}
