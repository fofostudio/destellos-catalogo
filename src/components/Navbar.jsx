import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { STORE_NAME, getWhatsAppUrl } from '@/lib/config';

const links = [
  { to: '/', label: 'Inicio' },
  { to: '/catalogo', label: 'Catálogo' },
  { to: '/contacto', label: 'Contacto' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  const whatsappUrl = getWhatsAppUrl('Hola, me interesa conocer sus productos');

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#1a1a1a]/95 backdrop-blur-md shadow-lg' : 'bg-[#1a1a1a]'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold text-white tracking-wide">
            {STORE_NAME}
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {links.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                  location.pathname === to
                    ? 'text-rose-400 bg-white/10'
                    : 'text-neutral-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {label}
              </Link>
            ))}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-3 inline-flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold rounded-full transition-colors shadow-lg"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.52 3.48A11.78 11.78 0 0012 0 12 12 0 000 12a11.9 11.9 0 001.64 6.03L0 24l6.15-1.61A12 12 0 1012 0c3.2 0 6.2 1.25 8.52 3.48zM12 21.5a9.5 9.5 0 01-4.84-1.31l-.35-.21-3.64.96.97-3.55-.22-.37A9.48 9.48 0 1121.5 12 9.51 9.51 0 0112 21.5zm5.36-7.34c-.3-.15-1.76-.86-2.03-.96s-.47-.15-.67.15-.77.96-.95 1.16-.35.22-.64.07a7.7 7.7 0 01-2.27-1.4 8.55 8.55 0 01-1.58-2c-.16-.3 0-.46.12-.61s.3-.35.45-.52a2 2 0 00.3-.5.57.57 0 000-.52c0-.15-.67-1.61-.92-2.2s-.49-.51-.67-.52h-.57a1.11 1.11 0 00-.8.38 3.34 3.34 0 00-1.05 2.49 5.8 5.8 0 001.23 3.05 13.2 13.2 0 005.06 4.83 17.29 17.29 0 001.71.63 4.1 4.1 0 001.88.12 3.06 3.06 0 002-1.4 2.52 2.52 0 00.17-1.4c-.07-.12-.27-.19-.57-.33z"/></svg>
              WhatsApp
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-lg text-white bg-neutral-800 hover:bg-neutral-700 transition-colors"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="bg-[#1a1a1a] border-t border-neutral-800 px-4 pt-2 pb-4 space-y-1">
          {links.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`block px-4 py-3 text-base font-medium rounded-xl transition-colors ${
                location.pathname === to
                  ? 'bg-neutral-800 text-white'
                  : 'text-neutral-300 hover:bg-neutral-800 hover:text-white'
              }`}
            >
              {label}
            </Link>
          ))}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-3 text-base font-semibold rounded-xl bg-emerald-600 text-white mt-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.52 3.48A11.78 11.78 0 0012 0 12 12 0 000 12a11.9 11.9 0 001.64 6.03L0 24l6.15-1.61A12 12 0 1012 0c3.2 0 6.2 1.25 8.52 3.48zM12 21.5a9.5 9.5 0 01-4.84-1.31l-.35-.21-3.64.96.97-3.55-.22-.37A9.48 9.48 0 1121.5 12 9.51 9.51 0 0112 21.5zm5.36-7.34c-.3-.15-1.76-.86-2.03-.96s-.47-.15-.67.15-.77.96-.95 1.16-.35.22-.64.07a7.7 7.7 0 01-2.27-1.4 8.55 8.55 0 01-1.58-2c-.16-.3 0-.46.12-.61s.3-.35.45-.52a2 2 0 00.3-.5.57.57 0 000-.52c0-.15-.67-1.61-.92-2.2s-.49-.51-.67-.52h-.57a1.11 1.11 0 00-.8.38 3.34 3.34 0 00-1.05 2.49 5.8 5.8 0 001.23 3.05 13.2 13.2 0 005.06 4.83 17.29 17.29 0 001.71.63 4.1 4.1 0 001.88.12 3.06 3.06 0 002-1.4 2.52 2.52 0 00.17-1.4c-.07-.12-.27-.19-.57-.33z"/></svg>
            Escríbenos por WhatsApp
          </a>
        </div>
      </div>
    </nav>
  );
}
