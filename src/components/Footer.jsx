import { Link } from 'react-router-dom';
import { STORE_NAME, getWhatsAppUrl } from '@/lib/config';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/[0.06]">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-rose-500/5 rounded-full blur-[100px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-rose-500 to-rose-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">D</span>
              </div>
              <span className="text-lg font-bold text-white">{STORE_NAME}</span>
            </div>
            <p className="text-sm text-neutral-500 leading-relaxed mb-5 max-w-xs">
              Velas artesanales de cera de soya, hechas a mano con dedicación y amor.
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
            <h4 className="text-xs font-semibold text-neutral-400 mb-4 uppercase tracking-wider">Navegación</h4>
            <ul className="space-y-2.5">
              {[
                { to: '/', label: 'Inicio' },
                { to: '/catalogo', label: 'Catálogo' },
                { to: '/contacto', label: 'Contacto' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="text-sm text-neutral-500 hover:text-white transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-semibold text-neutral-400 mb-4 uppercase tracking-wider">Contacto</h4>
            <div className="space-y-2.5 text-sm text-neutral-500">
              <a href="tel:+573143008425" className="block hover:text-white transition-colors">+57 314 300 8425</a>
              <span className="block">Colombia</span>
            </div>
          </div>
        </div>

        <div className="border-t border-white/[0.06] mt-10 pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-xs text-neutral-600">&copy; {year} {STORE_NAME}. Todos los derechos reservados.</p>
          <a href="https://www.fofostudio.com" target="_blank" rel="noopener noreferrer" className="text-xs text-neutral-600 hover:text-neutral-400 transition-colors">
            Hecho con <span className="text-rose-500">&hearts;</span> por Fofo Studio
          </a>
        </div>
      </div>
    </footer>
  );
}
