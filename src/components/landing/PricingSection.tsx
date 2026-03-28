import { CheckIcon, ZapIcon, StarIcon } from 'lucide-react';

const PLANS = [
  {
    icon: ZapIcon,
    name: 'Pro',
    tagline: 'Para negocios que empiezan a escalar',
    features: [
      'Hasta 500 transacciones / mes',
      'Inventario ilimitado',
      'Libro mayor digital',
      'Registro de clientes',
      'Soporte por WhatsApp',
    ],
  },
  {
    icon: StarIcon,
    name: 'Ultra',
    tagline: 'Para operaciones de alto volumen',
    features: [
      'Transacciones ilimitadas',
      'Múltiples usuarios y roles',
      'Reportes financieros avanzados',
      'Exportación a Excel / PDF',
      'Soporte prioritario 24/7',
      'Integración con caja registradora',
    ],
  },
];

export function PricingSection() {
  return (
    <section id="precios" className="py-24 bg-[#fafaf8]">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <p className="text-primary text-xs font-bold uppercase tracking-widest mb-3">Precios</p>
        <h2 className="text-3xl md:text-4xl font-bold text-on-surface mb-4">
          Planes simples y transparentes
        </h2>
        <p className="text-secondary max-w-md mx-auto mb-16">
          Sin contratos. Sin sorpresas. Cancela cuando quieras.
        </p>

        {/* Cards con altura uniforme — el botón siempre queda pegado abajo */}
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto items-stretch">
          {PLANS.map(({ icon: Icon, name, tagline, features }) => (
            <div
              key={name}
              className="bg-white rounded-2xl border-2 border-outline p-8 text-left flex flex-col gap-6"
            >
              {/* Header */}
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-primary/10">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-on-surface">{name}</h3>
                  <p className="text-xs text-secondary">{tagline}</p>
                </div>
              </div>

              {/* Precio — próximamente */}
              <div className="py-4 border-y border-outline">
                <p className="text-2xl font-black text-on-surface">Próximamente</p>
                <p className="text-xs text-secondary mt-1">
                  Estamos definiendo el precio final. Te avisamos cuando esté listo.
                </p>
              </div>

              {/* Features — flex-1 para empujar el botón al fondo */}
              <ul className="space-y-3 flex-1">
                {features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-on-surface">
                    <CheckIcon className="w-4 h-4 shrink-0 mt-0.5 text-primary" />
                    {f}
                  </li>
                ))}
              </ul>

              {/* Botón siempre en la parte inferior gracias a flex-col + flex-1 en features */}
              <button className="w-full py-2.5 rounded-xl text-sm font-semibold border border-outline text-on-surface hover:border-primary/40 hover:text-primary transition-colors mt-auto">
                Me interesa
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
