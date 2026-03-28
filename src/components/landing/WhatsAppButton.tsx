import { MessageCircleIcon } from 'lucide-react';
import { WA_NUMBER, WA_MESSAGE } from './constants';

/** Botón flotante de WhatsApp — esquina inferior derecha, expandible al hover */
export function WhatsAppButton() {
  const href = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-[#25D366] text-white font-semibold text-sm px-4 py-3 rounded-full shadow-lg hover:bg-[#20bc5a] transition-all duration-200 hover:scale-105 hover:shadow-xl group"
    >
      <MessageCircleIcon className="w-5 h-5 shrink-0" />
      <span className="max-w-0 overflow-hidden group-hover:max-w-[120px] transition-all duration-300 whitespace-nowrap">
        ¿Hablamos?
      </span>
    </a>
  );
}
