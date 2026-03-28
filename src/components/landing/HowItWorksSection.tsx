import { STEPS } from './constants';

export function HowItWorksSection() {
  return (
    <section className="py-24" style={{ backgroundColor: '#1e1b18' }}>
      <div className="max-w-5xl mx-auto px-6 text-center">
        <p className="text-primary text-xs font-bold uppercase tracking-widest mb-3">
          Flujo de trabajo
        </p>
        <h2 className="text-3xl font-bold mb-4" style={{ color: '#f5f0ea' }}>
          Una operación completa en 3 pasos
        </h2>
        <p className="text-sm mb-16 max-w-lg mx-auto" style={{ color: '#8c8480' }}>
          Desde que el cliente llega hasta que el libro mayor queda actualizado, todo ocurre
          en el mismo sistema, sin saltarte ningún paso ni perder datos en el camino.
        </p>

        {/* Contenedor con posición relativa para la línea conectora */}
        <div className="relative grid md:grid-cols-3 gap-8">

          {/*
            Línea conectora: va del centro del dot 1 al centro del dot 3.
            En un grid de 3 columnas iguales, el centro de la col 1 está en 1/6
            del ancho total y el centro de la col 3 en 5/6, por lo que los bordes
            son ambos calc(100% / 6).
            z-index: 0 asegura que quede DETRÁS de los cards (z-10 en adelante).
          */}
          <div
            className="hidden md:block absolute top-8 h-px"
            style={{
              left: 'calc(100% / 6)',
              right: 'calc(100% / 6)',
              backgroundColor: 'rgba(212,122,85,0.4)',
              zIndex: 0,
            }}
          />

          {STEPS.map((step) => (
            <div
              key={step.number}
              className="flex flex-col items-center gap-5"
              style={{ position: 'relative', zIndex: 10 }}
            >
              {/* El fondo del dot es sólido para tapar la línea que pasa por detrás */}
              <div
                className="w-16 h-16 rounded-2xl border flex items-center justify-center shrink-0"
                style={{
                  // Color sólido = mezcla del bg de sección + tinte primary al 25%
                  backgroundColor: '#2e1f18',
                  borderColor: 'rgba(212,122,85,0.5)',
                }}
              >
                <span className="text-2xl font-black text-primary">{step.number}</span>
              </div>

              <div className="space-y-2">
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
