import { ZapIcon } from 'lucide-react';

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

        <div className="max-w-sm mx-auto bg-white border-2 border-dashed border-outline rounded-3xl p-12 space-y-5">
          <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
            <ZapIcon className="w-7 h-7 text-primary" />
          </div>
          <h3 className="text-2xl font-bold text-on-surface">Próximamente</h3>
          <p className="text-sm text-secondary leading-relaxed">
            Estamos trabajando en planes accesibles para negocios de todos los tamaños.
            Déjanos tu correo y te avisamos cuando estén disponibles.
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="tu@correo.com"
              className="flex-1 border border-outline rounded-lg px-3 py-2 text-sm bg-[#fafaf8] focus:outline-none focus:border-primary/50 transition-colors"
            />
            <button className="bg-primary text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
              Avisar
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
