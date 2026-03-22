import { getWhatsAppUrl, STORE_NAME } from '@/lib/config';

export default function Contacto() {
  const options = [
    { label: 'Pedidos individuales', msg: 'Hola, quiero hacer un pedido de velas', icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12H6L5 9z' },
    { label: 'Pedidos por docena', msg: 'Hola, me interesa un pedido por docena', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
    { label: 'Eventos y empresas', msg: 'Hola, quiero cotizar velas para un evento especial', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { label: 'Personalización', msg: 'Hola, me gustaría personalizar un pedido de velas', icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z' },
  ];

  return (
    <div className="pt-20 pb-16 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-8 mb-8 animate-fade-in-up">
          <p className="text-xs uppercase tracking-[0.3em] text-rose-400 font-semibold mb-2">Contacto</p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">Hablemos</h1>
        </div>

        <div className="glass-strong rounded-3xl p-6 md:p-10 shadow-2xl animate-fade-in-up delay-100">
          <p className="text-neutral-300 text-lg leading-relaxed mb-8">
            En {STORE_NAME} estamos para ayudarte. Escríbenos por WhatsApp y te atendemos de inmediato.
          </p>

          <div className="space-y-3 mb-8">
            {options.map(({ label, msg, icon }, i) => (
              <a
                key={label}
                href={getWhatsAppUrl(msg)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-4 p-4 rounded-2xl glass hover:bg-emerald-500/10 hover:border-emerald-400/30 transition-all duration-300 group animate-fade-in-up"
                style={{ animationDelay: `${(i + 2) * 80}ms` }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl glass flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-500/20 transition-colors">
                    <svg className="w-5 h-5 text-neutral-400 group-hover:text-emerald-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d={icon} />
                    </svg>
                  </div>
                  <span className="font-medium text-white">{label}</span>
                </div>
                <span className="shrink-0 px-4 py-2 bg-emerald-500 group-hover:bg-emerald-400 text-white text-sm font-medium rounded-full flex items-center gap-2 transition-colors shadow-lg">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.52 3.48A11.78 11.78 0 0012 0 12 12 0 000 12a11.9 11.9 0 001.64 6.03L0 24l6.15-1.61A12 12 0 1012 0c3.2 0 6.2 1.25 8.52 3.48z"/></svg>
                  Escribir
                </span>
              </a>
            ))}
          </div>

          <div className="border-t border-white/10 pt-6">
            <h3 className="font-semibold text-white mb-4">Información</h3>
            <div className="space-y-3 text-sm text-neutral-400">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg glass flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 24 24"><path d="M20.52 3.48A11.78 11.78 0 0012 0 12 12 0 000 12a11.9 11.9 0 001.64 6.03L0 24l6.15-1.61A12 12 0 1012 0c3.2 0 6.2 1.25 8.52 3.48z"/></svg>
                </div>
                <a href="tel:+573143008425" className="hover:text-white transition-colors">+57 314 300 8425</a>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg glass flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
                </div>
                <span>Colombia</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
