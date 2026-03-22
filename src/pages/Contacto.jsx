import { getWhatsAppUrl, STORE_NAME } from '@/lib/config';

export default function Contacto() {
  const options = [
    { label: 'Pedidos individuales', desc: 'Compra una o varias unidades de tus velas favoritas.', msg: 'Hola, quiero hacer un pedido de velas', icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12H6L5 9z' },
    { label: 'Pedidos por docena', desc: 'Precios especiales en compras al por mayor.', msg: 'Hola, me interesa un pedido por docena', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
    { label: 'Eventos y empresas', desc: 'Cotiza velas para bodas, baby showers y eventos corporativos.', msg: 'Hola, quiero cotizar velas para un evento especial', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { label: 'Personalización', desc: 'Aroma, color y empaque a tu gusto.', msg: 'Hola, me gustaría personalizar un pedido de velas', icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z' },
  ];

  return (
    <div className="pt-20 pb-16 min-h-screen bg-neutral-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-8 mb-8 animate-fade-in-up">
          <p className="text-xs uppercase tracking-[0.3em] text-rose-500 font-semibold mb-2">Contacto</p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900">Hablemos</h1>
        </div>

        <div className="card rounded-3xl p-6 md:p-10 shadow-lg animate-fade-in-up delay-100">
          <p className="text-neutral-600 text-lg leading-relaxed mb-8">
            En {STORE_NAME} estamos para ayudarte. Escríbenos por WhatsApp y te atendemos de inmediato.
          </p>

          <div className="space-y-3 mb-8">
            {options.map(({ label, desc, msg, icon }, i) => (
              <a
                key={label}
                href={getWhatsAppUrl(msg)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl border border-neutral-200 bg-white hover:border-emerald-300 hover:bg-emerald-50/50 transition-all duration-300 group animate-fade-in-up"
                style={{ animationDelay: `${(i + 2) * 80}ms` }}
              >
                <div className="w-11 h-11 rounded-xl bg-neutral-100 group-hover:bg-emerald-100 flex items-center justify-center flex-shrink-0 transition-colors">
                  <svg className="w-5 h-5 text-neutral-500 group-hover:text-emerald-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d={icon} />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-neutral-900 group-hover:text-emerald-700 transition-colors">{label}</p>
                  <p className="text-sm text-neutral-500 mt-0.5">{desc}</p>
                </div>
                <span className="shrink-0 px-4 py-2 bg-emerald-500 group-hover:bg-emerald-600 text-white text-sm font-medium rounded-full flex items-center gap-2 transition-colors shadow-md">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.52 3.48A11.78 11.78 0 0012 0 12 12 0 000 12a11.9 11.9 0 001.64 6.03L0 24l6.15-1.61A12 12 0 1012 0c3.2 0 6.2 1.25 8.52 3.48z"/></svg>
                  Escribir
                </span>
              </a>
            ))}
          </div>

          <div className="border-t border-neutral-200 pt-6">
            <h3 className="font-semibold text-neutral-900 mb-4">Información de contacto</h3>
            <div className="space-y-3 text-sm">
              <a href="tel:+573143008425" className="flex items-center gap-3 text-neutral-600 hover:text-neutral-900 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 24 24"><path d="M20.52 3.48A11.78 11.78 0 0012 0 12 12 0 000 12a11.9 11.9 0 001.64 6.03L0 24l6.15-1.61A12 12 0 1012 0c3.2 0 6.2 1.25 8.52 3.48z"/></svg>
                </div>
                +57 314 300 8425
              </a>
              <div className="flex items-center gap-3 text-neutral-600">
                <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
                </div>
                Colombia
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
