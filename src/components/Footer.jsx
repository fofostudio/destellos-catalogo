import { Link } from 'react-router-dom';
import { STORE_NAME, getWhatsAppUrl } from '@/lib/config';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#1a1a1a] text-neutral-400 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-bold text-white mb-3">{STORE_NAME}</h3>
            <p className="text-sm leading-relaxed mb-4 max-w-xs">
              Velas artesanales de cera de soya, hechas a mano con dedicación y amor por lo artesanal.
            </p>
            <a
              href={getWhatsAppUrl('Hola, quiero información sobre sus productos')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-full transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.52 3.48A11.78 11.78 0 0012 0 12 12 0 000 12a11.9 11.9 0 001.64 6.03L0 24l6.15-1.61A12 12 0 1012 0c3.2 0 6.2 1.25 8.52 3.48zM12 21.5a9.5 9.5 0 01-4.84-1.31l-.35-.21-3.64.96.97-3.55-.22-.37A9.48 9.48 0 1121.5 12 9.51 9.51 0 0112 21.5zm5.36-7.34c-.3-.15-1.76-.86-2.03-.96s-.47-.15-.67.15-.77.96-.95 1.16-.35.22-.64.07a7.7 7.7 0 01-2.27-1.4 8.55 8.55 0 01-1.58-2c-.16-.3 0-.46.12-.61s.3-.35.45-.52a2 2 0 00.3-.5.57.57 0 000-.52c0-.15-.67-1.61-.92-2.2s-.49-.51-.67-.52h-.57a1.11 1.11 0 00-.8.38 3.34 3.34 0 00-1.05 2.49 5.8 5.8 0 001.23 3.05 13.2 13.2 0 005.06 4.83 17.29 17.29 0 001.71.63 4.1 4.1 0 001.88.12 3.06 3.06 0 002-1.4 2.52 2.52 0 00.17-1.4c-.07-.12-.27-.19-.57-.33z"/></svg>
              WhatsApp
            </a>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Navegación</h4>
            <ul className="space-y-2">
              {[
                { to: '/', label: 'Inicio' },
                { to: '/catalogo', label: 'Catálogo' },
                { to: '/contacto', label: 'Contacto' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="text-sm hover:text-white transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Contacto</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 24 24"><path d="M20.52 3.48A11.78 11.78 0 0012 0 12 12 0 000 12a11.9 11.9 0 001.64 6.03L0 24l6.15-1.61A12 12 0 1012 0c3.2 0 6.2 1.25 8.52 3.48z"/></svg>
                <a href="tel:+573143008425" className="hover:text-white transition-colors">+57 314 300 8425</a>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                <span>Colombia</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-800 mt-8 pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-xs text-neutral-500">&copy; {year} {STORE_NAME}. Todos los derechos reservados.</p>
          <a href="https://www.fofostudio.com" target="_blank" rel="noopener noreferrer" className="text-xs text-neutral-500 hover:text-neutral-300 transition-colors">
            Hecho con <span className="text-rose-400">&hearts;</span> por Fofo Studio
          </a>
        </div>
      </div>
    </footer>
  );
}
