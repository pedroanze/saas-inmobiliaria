import { STEPS } from './constants';

export function HowItWorksSection() {
  return (
    <section className="py-20" style={{ backgroundColor: '#1e1b18' }}>
      <div className="max-w-6xl mx-auto px-6 text-center">
        <p className="text-primary text-xs font-bold uppercase tracking-widest mb-3">
          Flujo de trabajo
        </p>
        <h2 className="text-3xl font-bold mb-12" style={{ color: '#f5f0ea' }}>
          Una operación completa en 3 pasos
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {STEPS.map((step, i) => (
            <div key={step.number} className="relative">
              {i < STEPS.length - 1 && (
                <div
                  className="hidden md:block absolute top-10 left-[calc(50%+2rem)] right-0 h-px"
                  style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
                />
              )}
              <div className="flex flex-col items-center gap-4">
                <div
                  className="w-16 h-16 rounded-2xl border flex items-center justify-center"
                  style={{
                    backgroundColor: 'rgba(212,122,85,0.25)',
                    borderColor: 'rgba(212,122,85,0.4)',
                  }}
                >
                  <span className="text-2xl font-black text-primary">{step.number}</span>
                </div>
                <h3 className="font-bold text-lg" style={{ color: '#f0ebe4' }}>
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#b8afa6' }}>
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
