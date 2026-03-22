import { Link } from 'react-router-dom';
import { STORE_NAME, getWhatsAppUrl } from '@/lib/config';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/[0.06] bg-[#1a1a1a]">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-rose-500/5 rounded-full blur-[100px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src="/images/logo.svg" alt={STORE_NAME} className="h-7 w-auto invert" />
            </div>
            <p className="text-sm text-neutral-400 leading-relaxed mb-5 max-w-md">
              Creemos en el poder de los detalles que iluminan la vida: cada pieza nace con dedicación, creatividad y un profundo amor por lo artesanal.
            </p>
            <a
              href={getWhatsAppUrl('Hola, quiero información sobre sus productos')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 border border-emerald-500/30 hover:bg-emerald-500/30 text-emerald-400 text-sm font-medium rounded-full transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.52 3.48A11.78 11.78 0 0012 0 12 12 0 000 12a11.9 11.9 0 001.64 6.03L0 24l6.15-1.61A12 12 0 1012 0c3.2 0 6.2 1.25 8.52 3.48z"/></svg>
              WhatsApp
            </a>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-xs font-semibold text-white mb-4 uppercase tracking-wider">Enlaces</h4>
            <ul className="space-y-2.5">
              {[
                { to: '/', label: 'Inicio' },
                { to: '/catalogo', label: 'Catálogo' },
                { to: '/contacto', label: 'Contacto' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="text-sm text-neutral-400 hover:text-white transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-semibold text-white mb-4 uppercase tracking-wider">Contacto</h4>
            <div className="space-y-2.5 text-sm text-neutral-400">
              <a href="tel:+573143008425" className="flex items-center gap-2 hover:text-white transition-colors">
                <svg className="w-4 h-4 text-emerald-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M20.52 3.48A11.78 11.78 0 0012 0 12 12 0 000 12a11.9 11.9 0 001.64 6.03L0 24l6.15-1.61A12 12 0 1012 0c3.2 0 6.2 1.25 8.52 3.48z"/></svg>
                +57 314 300 8425
              </a>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-neutral-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
                Colombia
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-neutral-800 mt-10 pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-xs text-neutral-500">
            &copy; {year} {STORE_NAME}. Todos los derechos reservados.
          </p>
          <a
            href="https://www.fofostudio.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-rose-500 hover:bg-rose-600 transition-colors group shadow-md"
          >
            <img
              src="/images/FofoStudioLogo.png"
              alt="Fofo Studio Logo"
              className="h-4 sm:h-5 w-auto group-hover:scale-110 transition-transform filter invert brightness-0"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            <div className="flex flex-col">
              <span className="text-[11px] text-white leading-tight">Hecho con ♥ por</span>
              <span className="text-[11px] font-semibold text-white leading-tight">Fofo Studio</span>
            </div>
          </a>
        </div>
      </div>
    </footer>
  );
}
