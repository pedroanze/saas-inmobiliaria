import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MenuIcon, XIcon } from 'lucide-react';
import { LOGO, NAV_LINKS } from './constants';

export function LandingNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-outline/50'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <img src={LOGO} alt="Prestasys" className="h-8 w-auto object-contain" />
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <button
              key={l.href}
              onClick={() => scrollTo(l.href)}
              className="text-sm font-medium text-secondary hover:text-primary transition-colors"
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/login"
            className="text-sm font-semibold text-secondary hover:text-on-surface transition-colors"
          >
            Iniciar Sesión
          </Link>
          <Link
            to="/login"
            className="bg-primary text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
          >
            Comenzar gratis
          </Link>
        </div>

        <button
          className="md:hidden text-secondary hover:text-on-surface p-2"
          onClick={() => setOpen(!open)}
          aria-label="Menú"
        >
          {open ? <XIcon className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-outline/50 px-6 py-4 space-y-3 shadow-lg">
          {NAV_LINKS.map((l) => (
            <button
              key={l.href}
              onClick={() => scrollTo(l.href)}
              className="block w-full text-left text-sm font-medium text-secondary hover:text-primary py-1"
            >
              {l.label}
            </button>
          ))}
          <div className="pt-3 border-t border-outline/50 space-y-2">
            <Link to="/login" className="block text-center text-sm font-semibold text-secondary py-2">
              Iniciar Sesión
            </Link>
            <Link
              to="/login"
              className="block text-center bg-primary text-white text-sm font-semibold px-4 py-2 rounded-lg"
            >
              Comenzar gratis
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
