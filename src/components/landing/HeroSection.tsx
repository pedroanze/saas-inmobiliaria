import { Link } from 'react-router-dom';
import { ArrowRightIcon, ChevronRightIcon, CheckIcon } from 'lucide-react';
import { LOGO } from './constants';

export function HeroSection() {
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

        {/* UI Preview */}
        <div className="relative hidden lg:block">
          <div className="bg-white rounded-2xl border border-outline/60 shadow-2xl shadow-primary/10 overflow-hidden">
            <div className="bg-[#fafaf8] border-b border-outline px-5 py-3 flex items-center justify-between">
              <img src={LOGO} alt="Prestasys" className="h-6 w-auto object-contain" />
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-400" />
                <span className="w-3 h-3 rounded-full bg-amber-400" />
                <span className="w-3 h-3 rounded-full bg-green-400" />
              </div>
            </div>

            <div className="p-5 space-y-4">
              <div className="flex items-center gap-3 mb-4">
                {['Cliente', 'Artículo', 'Caja'].map((s, i) => (
                  <div key={s} className="flex items-center gap-2">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                        i === 0
                          ? 'bg-primary text-white'
                          : i === 1
                            ? 'bg-primary/20 text-primary'
                            : 'bg-outline text-secondary'
                      }`}
                    >
                      {i + 1}
                    </div>
                    <span className={`text-xs font-medium ${i === 0 ? 'text-primary' : 'text-secondary'}`}>
                      {s}
                    </span>
                    {i < 2 && <div className="w-8 h-px bg-outline" />}
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <div className="text-[11px] font-semibold text-secondary uppercase tracking-wider">
                  Cédula / Carnet
                </div>
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

              <button className="w-full bg-primary text-white text-xs font-semibold py-2.5 rounded-lg flex items-center justify-center gap-2">
                Siguiente paso <ArrowRightIcon className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="absolute -bottom-4 -left-4 bg-white border border-outline rounded-xl shadow-lg px-4 py-2.5 flex items-center gap-2.5">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckIcon className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <p className="text-xs font-bold text-on-surface">Empeño registrado</p>
              <p className="text-[10px] text-secondary">Libro mayor actualizado</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
