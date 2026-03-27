import { CheckCircleIcon } from 'lucide-react';

const STEP_LABELS = ['Cliente', 'Artículo', 'Caja'];

interface StepperHeaderProps {
  currentStep: number;
  totalSteps?: number;
}

/**
 * Cabecera visual del wizard con línea de progreso y bullets numerados.
 * currentStep es 1-indexed.
 */
export function StepperHeader({ currentStep, totalSteps = 3 }: StepperHeaderProps) {
  // El ancho de la línea de progreso va de 0% (paso 1) a 100% (último paso)
  const progressWidth = `${((currentStep - 1) / (totalSteps - 1)) * 100}%`;

  return (
    <div className="relative mt-8 mb-4 px-12">
      {/* Línea base */}
      <div className="absolute top-1/2 left-12 right-12 h-[2px] bg-outline transform -translate-y-1/2 z-0" />
      {/* Línea de progreso */}
      <div
        className="absolute top-1/2 left-12 h-[2px] bg-primary transform -translate-y-1/2 z-0 transition-all duration-500 ease-in-out"
        style={{ width: progressWidth }}
      />

      <div className="relative z-10 flex justify-between">
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((num) => {
          const isCompleted = currentStep > num;
          const isActive = currentStep === num;

          return (
            <div key={num} className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow transition-all duration-300 ${
                  isActive
                    ? 'bg-primary text-primary-foreground ring-4 ring-primary/20 scale-110'
                    : isCompleted
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-surface border border-outline text-secondary'
                }`}
              >
                {isCompleted ? <CheckCircleIcon className="w-5 h-5" /> : num}
              </div>
              <span
                className={`text-[11px] font-semibold mt-2 absolute -bottom-5 whitespace-nowrap ${
                  currentStep >= num ? 'text-primary' : 'text-secondary'
                }`}
              >
                {STEP_LABELS[num - 1]}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
