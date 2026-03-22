import { Link } from 'react-router-dom';
import { useProducts } from '@/hooks/useProducts';
import ProductCard from '@/components/ProductCard';
import { STORE_NAME, STORE_TAGLINE, STORE_DESCRIPTION, getWhatsAppUrl } from '@/lib/config';

export default function Home() {
  const { products, loading } = useProducts();

  const features = [
    { title: 'Cera de soya', text: 'Natural, ecológica y de combustión limpia.', icon: 'M4 14c6-1 10-5 12-10 3 3 4 8 2 12-2 4-7 6-11 4-2-1-3-3-3-6z' },
    { title: 'Hecho a mano', text: 'Cada pieza es única, cuidada en cada detalle.', icon: 'M3 21h6M7 19l10-10a2.5 2.5 0 00-3.5-3.5L3 16v3h4z' },
    { title: 'Acabado premium', text: 'Aromas duraderos y estética minimalista.', icon: 'M12 3l3.5 4.5 5.5.8-4 3.8.9 5.4-4.9-2.6-4.9 2.6.9-5.4-4-3.8 5.5-.8L12 3z' },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative bg-[#1a1a1a] text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-900/20 via-transparent to-neutral-900/40" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 md:pt-36 md:pb-24">
          <div className="max-w-2xl animate-fade-in-up">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.25em] bg-white/10 border border-white/20 text-neutral-300 mb-6">
              {STORE_TAGLINE}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-5">
              {STORE_NAME}
            </h1>
            <p className="text-lg md:text-xl text-neutral-300 leading-relaxed mb-8 max-w-lg">
              {STORE_DESCRIPTION}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/catalogo"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-semibold rounded-full bg-rose-500 hover:bg-rose-600 text-white transition-colors shadow-lg"
              >
                Ver Catálogo
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </Link>
              <a
                href={getWhatsAppUrl('Hola, quiero hacer un pedido')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-semibold rounded-full border border-white/30 text-white hover:bg-emerald-500 hover:border-emerald-500 transition-all shadow-lg"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.52 3.48A11.78 11.78 0 0012 0 12 12 0 000 12a11.9 11.9 0 001.64 6.03L0 24l6.15-1.61A12 12 0 1012 0c3.2 0 6.2 1.25 8.52 3.48z"/></svg>
                Hacer Pedido
              </a>
            </div>
          </div>
        </div>
        {/* Bottom curve */}
        <div className="absolute bottom-0 left-0 right-0 text-neutral-50">
          <svg className="w-full h-12 md:h-16" viewBox="0 0 1440 120" preserveAspectRatio="none"><path fill="currentColor" d="M0,40 C360,100 720,0 1080,60 C1260,90 1380,50 1440,30 L1440,120 L0,120 Z" /></svg>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 md:py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <div
                key={f.title}
                className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-2xl bg-neutral-900 text-white flex items-center justify-center mb-4">
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d={f.icon} /></svg>
                </div>
                <h3 className="text-lg font-semibold text-neutral-900">{f.title}</h3>
                <p className="mt-2 text-sm text-neutral-600">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Preview */}
      <section className="py-12 md:py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-rose-500 font-semibold">Catálogo</p>
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">Nuestras Velas</h2>
            </div>
            <Link to="/catalogo" className="inline-flex items-center px-6 py-3 text-sm font-semibold rounded-full bg-neutral-900 text-white hover:bg-rose-500 transition-colors shadow-lg">
              Ver todo el catálogo
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="bg-white border border-neutral-200 rounded-2xl overflow-hidden animate-pulse">
                  <div className="aspect-square bg-neutral-200" />
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-neutral-200 rounded w-3/4" />
                    <div className="h-3 bg-neutral-200 rounded w-1/2" />
                    <div className="h-5 bg-neutral-200 rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              {/* Mobile: horizontal scroll */}
              <div className="sm:hidden -mx-2 px-2">
                <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-3 scroll-smooth">
                  {products.slice(0, 8).map((p, i) => (
                    <div key={p.slug} className="min-w-[75%] snap-center">
                      <ProductCard product={p} index={i} />
                    </div>
                  ))}
                </div>
              </div>
              {/* Desktop: grid */}
              <div className="hidden sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {products.slice(0, 8).map((p, i) => (
                  <ProductCard key={p.slug} product={p} index={i} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-neutral-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">¿Tienes un evento especial?</h2>
          <p className="text-neutral-300 text-lg mb-8 max-w-2xl mx-auto">
            Ofrecemos velas personalizadas para eventos empresariales, bodas, baby showers y celebraciones. Escríbenos para cotizar.
          </p>
          <a
            href={getWhatsAppUrl('Hola, quiero cotizar velas para un evento especial')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white text-lg font-semibold rounded-full transition-colors shadow-xl"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.52 3.48A11.78 11.78 0 0012 0 12 12 0 000 12a11.9 11.9 0 001.64 6.03L0 24l6.15-1.61A12 12 0 1012 0c3.2 0 6.2 1.25 8.52 3.48z"/></svg>
            Cotizar por WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}
