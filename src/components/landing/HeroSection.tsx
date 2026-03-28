import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, ChevronRightIcon, CheckIcon, PackageIcon, WalletIcon } from 'lucide-react';
import { LOGO } from './constants';

/** Contenido del mockup para cada paso del wizard */
const MOCKUP_STEPS = [
  {
    label: 'Cliente',
    content: (
      <div className="space-y-3">
        <div className="space-y-1.5">
          <p className="text-[11px] font-semibold text-secondary uppercase tracking-wider">
            Cédula / Carnet
          </p>
          <div className="bg-[#fafaf8] border border-outline rounded-lg px-3 py-2 text-sm text-on-surface flex items-center justify-between">
            <span>1234567</span>
            <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
              ✓ Encontrado
            </span>
          </div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-xl p-3 flex items-center gap-3">
          <CheckIcon className="w-4 h-4 text-green-600 shrink-0" />
          <div>
            <p className="text-xs font-semibold text-green-800">Juan Pérez</p>
            <p className="text-[10px] text-green-600">+591 71234567</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    label: 'Artículo',
    content: (
      <div className="space-y-3">
        <div className="flex items-center gap-2 bg-primary/10 rounded-lg px-3 py-2">
          <PackageIcon className="w-4 h-4 text-primary shrink-0" />
          <span className="text-xs font-semibold text-primary">Nuevo artículo — Empeño</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: 'Nombre', value: 'iPhone 14 Pro' },
            { label: 'Categoría', value: 'Celulares' },
            { label: 'Estado', value: 'Empeño' },
            { label: 'Monto', value: '$150.00' },
          ].map((f) => (
            <div key={f.label} className="bg-[#fafaf8] border border-outline rounded-lg px-2.5 py-1.5">
              <p className="text-[9px] text-secondary uppercase tracking-wider">{f.label}</p>
              <p className="text-xs font-semibold text-on-surface mt-0.5">{f.value}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    label: 'Caja',
    content: (
      <div className="space-y-3">
        <div className="flex items-center gap-2 bg-red-50 rounded-lg px-3 py-2">
          <WalletIcon className="w-4 h-4 text-red-500 shrink-0" />
          <span className="text-xs font-semibold text-red-600">Salida de Caja (−)</span>
        </div>
        <div className="bg-[#fafaf8] border border-outline rounded-xl p-3 space-y-2">
          {[
            { label: 'Monto', value: '$150.00', bold: true },
            { label: 'Concepto', value: 'Empeño — iPhone 14 Pro' },
            { label: 'Cliente', value: 'Juan Pérez' },
          ].map((r) => (
            <div key={r.label} className="flex items-center justify-between">
              <span className="text-[10px] text-secondary">{r.label}</span>
              <span className={`text-xs ${r.bold ? 'font-bold text-on-surface' : 'text-on-surface'}`}>
                {r.value}
              </span>
            </div>
          ))}
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg px-3 py-2 flex items-center gap-2">
          <CheckIcon className="w-3.5 h-3.5 text-green-600 shrink-0" />
          <span className="text-[10px] font-semibold text-green-700">
            Libro mayor actualizado correctamente
          </span>
        </div>
      </div>
    ),
  },
];

/** Elementos flotantes decorativos alrededor del mockup */
function FloatingBadge({
  className,
  children,
}: {
  className: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`absolute bg-white border border-outline rounded-xl shadow-lg px-3.5 py-2.5 flex items-center gap-2.5 pointer-events-none ${className}`}
    >
      {children}
    </div>
  );
}

export function HeroSection() {
  const [activeStep, setActiveStep] = useState(0);

  // Rota automáticamente entre los 3 pasos cada 4 segundos en bucle
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((s) => (s + 1) % MOCKUP_STEPS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-linear-to-br from-[#fdfaf7] via-[#faf6f0] to-[#f5ede3]">
      {/* Decoración de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-primary/8 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-primary/5 rounded-full blur-2xl" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(#2a2724 1px, transparent 1px), linear-gradient(to right, #2a2724 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 pt-24 pb-16 grid lg:grid-cols-2 gap-12 items-center">
        {/* Copy */}
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-full border border-primary/20">
            <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
            Software para casas de empeño
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-on-surface leading-tight tracking-tight">
            Gestiona tu casa de empeño{' '}
            <span className="text-primary">sin papeles</span>, sin errores
          </h1>

          <p className="text-lg text-secondary leading-relaxed max-w-lg">
            Prestasys digitaliza cada operación: empeños, compras, ventas y caja.
            Todo en un flujo simple, en segundos. Desde cualquier dispositivo.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/login"
              className="inline-flex items-center justify-center gap-2 bg-primary text-white font-semibold px-6 py-3 rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 text-sm"
            >
              Comenzar gratis
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
            <button
              onClick={() =>
                document.querySelector('#funcionalidades')?.scrollIntoView({ behavior: 'smooth' })
              }
              className="inline-flex items-center justify-center gap-2 bg-white text-on-surface font-semibold px-6 py-3 rounded-xl border border-outline hover:border-primary/40 hover:bg-primary/5 transition-colors text-sm"
            >
              Ver funcionalidades
              <ChevronRightIcon className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-6 pt-2">
            {[
              { value: '3 pasos', label: 'por operación' },
              { value: '100%', label: 'digital' },
              { value: '0 papel', label: 'necesario' },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-xl font-bold text-on-surface">{s.value}</p>
                <p className="text-xs text-secondary">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* UI Preview — rota entre los 3 pasos del wizard */}
        <div className="relative hidden lg:block">
          {/* ── Tarjetas flotantes decorativas (solo 2) ── */}

          {/* Derecha — un tercio hacia abajo */}
          <FloatingBadge className="top-1/3 -right-10 animate-[float_4s_ease-in-out_0.8s_infinite]">
            <div className="w-2 h-2 bg-green-500 rounded-full shrink-0" />
            <div>
              <p className="text-[10px] font-semibold text-on-surface">8 empeños hoy</p>
              <p className="text-[9px] text-secondary">↑ 12% vs ayer</p>
            </div>
          </FloatingBadge>

          {/* Abajo izquierda: transacción registrada */}
          <FloatingBadge className="-bottom-4 -left-8 animate-[float_4s_ease-in-out_2.4s_infinite]">
            <div className="w-7 h-7 bg-green-100 rounded-lg flex items-center justify-center shrink-0">
              <CheckIcon className="w-3.5 h-3.5 text-green-600" />
            </div>
            <div>
              <p className="text-xs font-bold text-on-surface">Empeño registrado</p>
              <p className="text-[9px] text-secondary">Libro mayor actualizado</p>
            </div>
          </FloatingBadge>

          {/* Tarjeta principal del mockup */}
          <div className="bg-white rounded-2xl border border-outline/60 shadow-2xl shadow-primary/10 overflow-hidden mx-6">
            {/* Fake app header */}
            <div className="bg-[#fafaf8] border-b border-outline px-5 py-3 flex items-center justify-between">
              <img src={LOGO} alt="Prestasys" className="h-6 w-auto object-contain" />
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-400" />
                <span className="w-3 h-3 rounded-full bg-amber-400" />
                <span className="w-3 h-3 rounded-full bg-green-400" />
              </div>
            </div>

            <div className="p-5 space-y-4">
              {/* Stepper */}
              <div className="flex items-center gap-1 mb-2">
                {MOCKUP_STEPS.map((s, i) => (
                  <div key={s.label} className="flex items-center gap-1 flex-1 last:flex-none">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors duration-500 ${
                        i < activeStep
                          ? 'bg-primary text-white'
                          : i === activeStep
                            ? 'bg-primary text-white ring-4 ring-primary/15'
                            : 'bg-outline text-secondary'
                      }`}
                    >
                      {i < activeStep ? <CheckIcon className="w-3.5 h-3.5" /> : i + 1}
                    </div>
                    <span
                      className={`text-[10px] font-semibold mr-1 transition-colors duration-500 ${
                        i <= activeStep ? 'text-primary' : 'text-secondary/50'
                      }`}
                    >
                      {s.label}
                    </span>
                    {i < MOCKUP_STEPS.length - 1 && (
                      <div
                        className={`flex-1 h-px transition-colors duration-500 ${
                          i < activeStep ? 'bg-primary' : 'bg-outline'
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Contenido del paso activo — altura fija para que la card no salte */}
              <div key={activeStep} className="animate-in fade-in zoom-in-95 duration-300 h-[140px] overflow-hidden">
                {MOCKUP_STEPS[activeStep].content}
              </div>

              <button className="w-full bg-primary text-white text-xs font-semibold py-2.5 rounded-lg flex items-center justify-center gap-2">
                {activeStep < MOCKUP_STEPS.length - 1 ? (
                  <>
                    Siguiente paso <ArrowRightIcon className="w-3.5 h-3.5" />
                  </>
                ) : (
                  <>
                    Finalizar Transacción <CheckIcon className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Indicadores de paso */}
          <div className="flex justify-center gap-1.5 mt-4">
            {MOCKUP_STEPS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveStep(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === activeStep ? 'w-6 bg-primary' : 'w-1.5 bg-primary/25'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
