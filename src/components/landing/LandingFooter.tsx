import { Link } from 'react-router-dom';
import { LOGO } from './constants';

/** Footer minimalista: solo marca, copyright e inicio de sesión */
export function LandingFooter() {
  return (
    <footer style={{ backgroundColor: '#1e1b18' }} className="py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <img
          src={LOGO}
          alt="Prestasys"
          className="h-7 w-auto object-contain"
          style={{ filter: 'brightness(0) invert(1) opacity(0.85)' }}
        />

        {/* Copyright */}
        <p className="text-xs" style={{ color: '#6b6560' }}>
          © {new Date().getFullYear()} Prestasys. Todos los derechos reservados.
        </p>

        {/* Único CTA */}
        <Link
          to="/login"
          className="text-xs font-semibold transition-colors hover:text-primary"
          style={{ color: '#9c948c' }}
        >
          Iniciar sesión →
        </Link>
      </div>
    </footer>
  );
}
