import { useState } from 'react';
import { PhoneIcon, MapPinIcon, CheckIcon } from 'lucide-react';
import { WA_NUMBER, WA_MESSAGE } from './constants';

const WA_HREF = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`;

export function ContactSection() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica de envío pendiente
    setSent(true);
  };

  return (
    <section id="contacto" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-start">
        {/* Info */}
        <div className="space-y-8">
          <div>
            <p className="text-primary text-xs font-bold uppercase tracking-widest mb-3">
              Contacto
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-on-surface mb-4">
              ¿Tienes dudas?
              <br />
              Hablemos
            </h2>
            <p className="text-secondary leading-relaxed">
              Escríbenos y te ayudamos a ver si Prestasys es la solución correcta para tu
              negocio. Sin presiones, sin compromiso.
            </p>
          </div>

          <div className="space-y-4">
            {[
              { icon: PhoneIcon, label: 'WhatsApp', value: '+591 79288990', href: WA_HREF },
              { icon: MapPinIcon, label: 'Región', value: 'Bolivia · Latinoamérica', href: undefined },
            ].map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="flex items-center gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-secondary font-medium">{label}</p>
                  {href ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-primary hover:underline"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="text-sm font-semibold text-on-surface">{value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Formulario */}
        {sent ? (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-12 flex flex-col items-center gap-4 text-center">
            <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center">
              <CheckIcon className="w-7 h-7 text-green-600" />
            </div>
            <h3 className="text-lg font-bold text-green-800">¡Mensaje enviado!</h3>
            <p className="text-sm text-green-700">Te responderemos en menos de 24 horas.</p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-[#fafaf8] border border-outline rounded-2xl p-8 space-y-4"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label
                  htmlFor="contactName"
                  className="text-xs font-semibold text-secondary uppercase tracking-wider block"
                >
                  Nombre
                </label>
                <input
                  id="contactName"
                  required
                  placeholder="Tu nombre"
                  className="w-full border border-outline bg-white rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="contactPhone"
                  className="text-xs font-semibold text-secondary uppercase tracking-wider block"
                >
                  Celular / WhatsApp
                </label>
                <input
                  id="contactPhone"
                  type="tel"
                  required
                  placeholder="+591 7X XXX XXX"
                  className="w-full border border-outline bg-white rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="contactBusiness"
                className="text-xs font-semibold text-secondary uppercase tracking-wider block"
              >
                Negocio
              </label>
              <input
                id="contactBusiness"
                required
                placeholder="Nombre de tu casa de empeño"
                className="w-full border border-outline bg-white rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="contactMessage"
                className="text-xs font-semibold text-secondary uppercase tracking-wider block"
              >
                Mensaje
              </label>
              <textarea
                id="contactMessage"
                rows={3}
                required
                placeholder="Cuéntanos sobre tu negocio..."
                className="w-full border border-outline bg-white rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary/50 transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white font-semibold py-3 rounded-xl hover:bg-primary/90 transition-colors shadow-sm text-sm"
            >
              Enviar mensaje
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
