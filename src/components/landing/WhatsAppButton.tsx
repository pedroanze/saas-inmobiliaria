import { WA_NUMBER, WA_MESSAGE } from './constants';

const WA_ICON =
  'https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/whatsapp-white-icon.png';

/**
 * Botón flotante de WhatsApp — esquina inferior derecha.
 * Sin padding extra cuando está colapsado: el texto usa pl propio al expandirse.
 */
export function WhatsAppButton() {
  const href = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center bg-[#25D366] text-white font-semibold text-sm p-3 rounded-full shadow-lg hover:bg-[#20bc5a] transition-all duration-200 hover:scale-105 hover:shadow-xl group"
    >
      <img src={WA_ICON} alt="WhatsApp" className="w-5 h-5 object-contain shrink-0" />
      {/*
        El span arranca en w-0 sin padding; al hover crece y adquiere pl-2.5.
        Así no hay espacio extra cuando el botón está colapsado.
      */}
      <span className="w-0 overflow-hidden group-hover:w-[90px] transition-all duration-300 whitespace-nowrap group-hover:pl-2.5 text-sm font-semibold">
        ¿Hablamos?
      </span>
    </a>
  );
}
