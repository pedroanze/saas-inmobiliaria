import { Link } from 'react-router-dom';
import { LOGO } from './constants';

export function LandingFooter() {
  const scrollTo = (id: string) =>
    document.querySelector(`#${id}`)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer style={{ backgroundColor: '#1e1b18' }} className="py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-10"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.12)' }}
        >
          {/* Brand */}
          <div className="space-y-4 lg:col-span-2">
            <img
              src={LOGO}
              alt="Prestasys"
              className="h-8 w-auto object-contain"
              style={{ filter: 'brightness(0) invert(1) opacity(0.9)' }}
            />
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: '#a89f96' }}>
              Software de gestión para casas de empeño. Operaciones digitales, inventario en tiempo
              real y libro mayor automatizado.
            </p>
          </div>

          {/* Producto */}
          <div className="space-y-3">
            <h4
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: '#6b6560' }}
            >
              Producto
            </h4>
            {[
              { label: 'Funcionalidades', id: 'funcionalidades' },
              { label: 'Precios', id: 'precios' },
              { label: 'Contacto', id: 'contacto' },
            ].map(({ label, id }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="block text-sm transition-colors hover:text-primary"
                style={{ color: '#9c948c' }}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Legal */}
          <div className="space-y-3">
            <h4
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: '#6b6560' }}
            >
              Legal
            </h4>
            {['Términos de Uso', 'Privacidad', 'Cookies'].map((l) => (
              <span key={l} className="block text-sm" style={{ color: '#9c948c' }}>
                {l}
              </span>
            ))}
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs" style={{ color: '#6b6560' }}>
            © {new Date().getFullYear()} Prestasys. Todos los derechos reservados.
          </p>
          <Link
            to="/login"
            className="text-xs transition-colors hover:text-primary"
            style={{ color: '#6b6560' }}
          >
            Iniciar sesión →
          </Link>
        </div>
      </div>
    </footer>
  );
}
