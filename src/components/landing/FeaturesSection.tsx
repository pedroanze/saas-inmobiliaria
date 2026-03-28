import { FEATURES } from './constants';

export function FeaturesSection() {
  return (
    <section id="funcionalidades" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-primary text-xs font-bold uppercase tracking-widest mb-3">
            Funcionalidades
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-on-surface mb-4">
            Todo lo que necesita tu negocio
          </h2>
          <p className="text-secondary max-w-xl mx-auto">
            Diseñado específicamente para casas de empeño y prenderías. Sin funciones genéricas,
            sin ruido.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="group bg-[#fafaf8] border border-outline hover:border-primary/30 rounded-2xl p-6 space-y-4 transition-all duration-200 hover:shadow-md hover:shadow-primary/5"
            >
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/15 transition-colors">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-bold text-on-surface">{title}</h3>
              <p className="text-sm text-secondary leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
