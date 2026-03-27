import { CheckCircleIcon } from 'lucide-react';

const STEP_LABELS = ['Cliente', 'Artículo', 'Caja'];

interface StepperHeaderProps {
  currentStep: number;
  totalSteps?: number;
}

/**
 * Barra de progreso del wizard de transacciones.
 * Diseño limpio con dots y línea conectora sin animaciones de escala.
 */
export function StepperHeader({ currentStep, totalSteps = 3 }: StepperHeaderProps) {
  const p = (currentStep - 1) / (totalSteps - 1); // fracción de progreso [0, 1]

  return (
    <div className="relative flex items-center justify-between mt-8 mb-6 px-6">
      {/* Línea de fondo (va de dot 1 a dot N) */}
      <div className="absolute left-6 right-6 top-4 h-[2px] bg-outline/60 z-0" />

      {/* Línea de progreso activa.
          width = p × (100% − 48px) porque left-6 aporta 24px y right-6 otros 24px;
          usar 100% sin descuento hace que en el último paso se extienda 24px de más. */}
      <div
        className="absolute left-6 top-4 h-[2px] bg-primary z-0 transition-[width] duration-400 ease-out"
        style={{ width: `calc(${p * 100}% - ${p * 48}px)` }}
      />

      {/* Dots de cada paso */}
      {Array.from({ length: totalSteps }, (_, i) => i + 1).map((num) => {
        const isCompleted = currentStep > num;
        const isActive = currentStep === num;

        return (
          <div key={num} className="relative z-10 flex flex-col items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors duration-200 ${
                isCompleted
                  ? 'bg-primary text-primary-foreground'
                  : isActive
                    ? 'bg-primary text-primary-foreground ring-4 ring-primary/15'
                    : 'bg-background border-2 border-outline text-secondary'
              }`}
            >
              {isCompleted ? <CheckCircleIcon className="w-4 h-4" /> : num}
            </div>
            <span
              className={`text-[10px] font-semibold uppercase tracking-wide transition-colors duration-200 ${
                currentStep >= num ? 'text-primary' : 'text-secondary/60'
              }`}
            >
              {STEP_LABELS[num - 1]}
            </span>
          </div>
        );
      })}
    </div>
  );
}
