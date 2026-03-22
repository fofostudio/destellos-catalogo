import { getWhatsAppUrl, STORE_NAME } from '@/lib/config';

export default function Contacto() {
  return (
    <div className="pt-20 pb-12 min-h-screen bg-neutral-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mt-8 mb-8">
          <p className="text-xs uppercase tracking-[0.3em] text-rose-500 font-semibold">Contacto</p>
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900">Hablemos</h1>
        </div>

        <div className="bg-white border border-neutral-200 rounded-2xl p-6 md:p-10 shadow-sm animate-fade-in-up">
          <p className="text-neutral-600 text-lg leading-relaxed mb-8">
            En {STORE_NAME} estamos para ayudarte. Ya sea que quieras hacer un pedido, cotizar para un evento o simplemente conocer más sobre nuestros productos, escríbenos por WhatsApp.
          </p>

          <div className="space-y-4 mb-8">
            {[
              { label: 'Pedidos individuales', msg: 'Hola, quiero hacer un pedido de velas' },
              { label: 'Pedidos por docena', msg: 'Hola, me interesa un pedido por docena' },
              { label: 'Eventos y empresas', msg: 'Hola, quiero cotizar velas para un evento especial' },
              { label: 'Personalización', msg: 'Hola, me gustaría personalizar un pedido de velas' },
            ].map(({ label, msg }) => (
              <a
                key={label}
                href={getWhatsAppUrl(msg)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-4 p-4 rounded-xl border border-neutral-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all group"
              >
                <span className="font-medium text-neutral-900 group-hover:text-emerald-700">{label}</span>
                <span className="shrink-0 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium rounded-full flex items-center gap-2 transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.52 3.48A11.78 11.78 0 0012 0 12 12 0 000 12a11.9 11.9 0 001.64 6.03L0 24l6.15-1.61A12 12 0 1012 0c3.2 0 6.2 1.25 8.52 3.48z"/></svg>
                  Escribir
                </span>
              </a>
            ))}
          </div>

          <div className="border-t border-neutral-200 pt-6">
            <h3 className="font-semibold text-neutral-900 mb-3">Información de contacto</h3>
            <div className="space-y-2 text-sm text-neutral-600">
              <p className="flex items-center gap-2">
                <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 24 24"><path d="M20.52 3.48A11.78 11.78 0 0012 0 12 12 0 000 12a11.9 11.9 0 001.64 6.03L0 24l6.15-1.61A12 12 0 1012 0c3.2 0 6.2 1.25 8.52 3.48z"/></svg>
                <a href="tel:+573143008425" className="hover:text-neutral-900 transition-colors">+57 314 300 8425</a>
              </p>
              <p className="flex items-center gap-2">
                <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
                Colombia
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
