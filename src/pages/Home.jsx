import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '@/hooks/useProducts';
import ProductCard from '@/components/ProductCard';
import { STORE_NAME, STORE_DESCRIPTION, getWhatsAppUrl, formatPriceCOP, WA_MESSAGES } from '@/lib/config';

const GALLERY = [
  '/images/gallery/gallery-1.jpg',
  '/images/gallery/gallery-2.jpg',
  '/images/gallery/gallery-3.png',
  '/images/gallery/gallery-4.png',
  '/images/gallery/gallery-5.png',
  '/images/gallery/gallery-6.png',
];

export default function Home() {
  const { products, loading } = useProducts();
  const [heroIdx, setHeroIdx] = useState(0);
  const [spotlightIdx, setSpotlightIdx] = useState(null);

  // Pick a random spotlight product once products load
  useEffect(() => {
    if (products.length > 0 && spotlightIdx === null) {
      const withImage = products.filter((p) => p.image);
      const pool = withImage.length > 0 ? withImage : products;
      setSpotlightIdx(Math.floor(Math.random() * pool.length));
    }
  }, [products, spotlightIdx]);

  const spotlightPool = products.filter((p) => p.image).length > 0
    ? products.filter((p) => p.image)
    : products;
  const spotlight = spotlightIdx !== null ? spotlightPool[spotlightIdx % spotlightPool.length] : null;

  useEffect(() => {
    if (GALLERY.length <= 1) return;
    const t = setInterval(() => setHeroIdx((i) => (i + 1) % GALLERY.length), 5000);
    return () => clearInterval(t);
  }, []);

  const features = [
    { title: 'Natural & Consciente', desc: 'Cera 100% de soya, procesos limpios y fragancias seguras para ti y tu hogar.', icon: 'M4 14c6-1 10-5 12-10 3 3 4 8 2 12-2 4-7 6-11 4-2-1-3-3-3-6z' },
    { title: 'Hecho a Mano', desc: 'Cada pieza es única, elaborada artesanalmente con atención en cada detalle.', icon: 'M3 21h6M7 19l10-10a2.5 2.5 0 00-3.5-3.5L3 16v3h4z' },
    { title: 'Acabado Premium', desc: 'Aromas duraderos, texturas envolventes y estética que enamora.', icon: 'M12 3l3.5 4.5 5.5.8-4 3.8.9 5.4-4.9-2.6-4.9 2.6.9-5.4-4-3.8 5.5-.8L12 3z' },
  ];

  const stats = [
    { value: '33+', label: 'Diseños únicos' },
    { value: '100%', label: 'Cera de soya' },
    { value: '500+', label: 'Clientes felices' },
  ];

  return (
    <>
      {/* ═══════════════════════════════════════════
          HERO — Dark, glassmorphism, gallery bg
      ═══════════════════════════════════════════ */}
      <section className="relative min-h-[100vh] flex items-center overflow-hidden bg-neutral-950">
        {/* Gallery background */}
        {GALLERY.map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            className={`hero-image absolute inset-0 w-full h-full object-cover ${i === heroIdx ? 'hero-image-active' : ''}`}
            aria-hidden="true"
          />
        ))}
        <div className="absolute inset-0 bg-neutral-900/65" />
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/40 via-transparent to-neutral-950/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(244,63,94,0.12),transparent)]" />

        {/* Ambient glows */}
        <div className="absolute top-1/3 -left-40 w-96 h-96 rounded-full bg-rose-500/10 blur-[120px] animate-glow-pulse" />
        <div className="absolute bottom-1/4 -right-40 w-80 h-80 rounded-full bg-pink-500/8 blur-[100px] animate-glow-pulse delay-200" />

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0 z-20 text-neutral-100">
          <svg className="w-full h-20 md:h-28" viewBox="0 0 1440 120" preserveAspectRatio="none">
            <path fill="currentColor" d="M0,50 C360,100 720,0 1080,60 C1260,90 1380,40 1440,30 L1440,120 L0,120 Z" />
          </svg>
        </div>

        {/* Hero content */}
        <div className="relative z-10 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-36 md:pt-36 md:pb-44">
            <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-16 items-center">
              {/* Left column */}
              <div className="space-y-8 animate-fade-in-up">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-[11px] uppercase tracking-[0.3em] text-neutral-300">
                  <span className="w-2 h-2 rounded-full bg-rose-400 animate-glow-pulse" />
                  Velas para momentos únicos
                </div>

                <div>
                  <img src="/images/logo.svg" alt={STORE_NAME} className="h-14 md:h-20 w-auto mb-4 invert brightness-0 invert" />
                  <h1 className="sr-only">{STORE_NAME}</h1>
                  <p className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-[1.1] tracking-tight">
                    <span className="text-gradient">Ilumina tu mundo</span>
                  </p>
                </div>

                <p className="text-lg md:text-xl text-neutral-200 leading-relaxed max-w-lg animate-fade-in-up delay-100">
                  {STORE_DESCRIPTION}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-200">
                  <Link
                    to="/catalogo"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold rounded-full bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-400 hover:to-rose-500 text-white transition-all duration-300 shadow-xl glow-rose"
                  >
                    Explorar Catálogo
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </Link>
                  <a
                    href={getWhatsAppUrl(WA_MESSAGES.heroOrder)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold rounded-full glass hover:bg-emerald-500/20 hover:border-emerald-400/40 text-white transition-all duration-300"
                  >
                    <svg className="w-5 h-5 text-emerald-400" fill="currentColor" viewBox="0 0 24 24"><path d="M20.52 3.48A11.78 11.78 0 0012 0 12 12 0 000 12a11.9 11.9 0 001.64 6.03L0 24l6.15-1.61A12 12 0 1012 0c3.2 0 6.2 1.25 8.52 3.48z"/></svg>
                    Hacer Pedido
                  </a>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 pt-4 animate-fade-in-up delay-300">
                  {stats.map(({ value, label }) => (
                    <div key={label} className="glass rounded-2xl px-4 py-4 text-center">
                      <p className="text-2xl md:text-3xl font-extrabold text-white">{value}</p>
                      <p className="text-[11px] uppercase tracking-wider text-neutral-400 mt-1">{label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right — Spotlight card */}
              <div className="relative animate-fade-in-up delay-400 hidden lg:block">
                <div className="absolute -inset-6 bg-gradient-to-br from-rose-500/15 via-transparent to-pink-500/10 rounded-[40px] blur-2xl opacity-70" />
                <div className="relative glass-strong rounded-[32px] p-6 shadow-2xl">
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-5 bg-neutral-800/50">
                    {spotlight?.image ? (
                      <img src={spotlight.image} alt={spotlight?.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-neutral-800 to-neutral-900 flex items-center justify-center">
                        <svg className="w-20 h-20 text-neutral-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                      </div>
                    )}
                    <div className="absolute top-4 left-4 glass rounded-full px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-white font-medium">
                      Destacado
                    </div>
                  </div>
                  {spotlight && (
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-400">Favorito</p>
                        <p className="text-base font-semibold text-white">{spotlight.name}</p>
                        <p className="text-lg font-bold text-rose-400">{formatPriceCOP(spotlight.priceUnit)}</p>
                      </div>
                      <Link to={`/producto/${spotlight.slug}`} className="px-5 py-2.5 rounded-full text-sm font-semibold glass-light hover:bg-white/20 text-white transition-all">
                        Ver
                      </Link>
                    </div>
                  )}
                </div>
                <div className="absolute -top-4 -left-4 backdrop-blur-2xl bg-neutral-900/80 border border-neutral-700/60 rounded-2xl px-5 py-3 shadow-2xl animate-float">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-neutral-400">Destellos</p>
                  <p className="text-sm font-semibold text-white">{products.length}+ piezas únicas</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FEATURES — Light section
      ═══════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in-up">
            <p className="text-xs uppercase tracking-[0.3em] text-rose-500 font-semibold mb-3">¿Por qué elegirnos?</p>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">Calidad que se siente</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div
                key={f.title}
                className="card rounded-2xl p-8 hover:shadow-xl hover:border-neutral-300 transition-all duration-500 group animate-fade-in-up"
                style={{ animationDelay: `${i * 120}ms` }}
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500 to-rose-600 text-white flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300 glow-rose">
                  <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d={f.icon} /></svg>
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-3">{f.title}</h3>
                <p className="text-neutral-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          PRODUCTS — Light section with cards
      ═══════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12 animate-fade-in-up">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-rose-500 font-semibold mb-2">Catálogo</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900">Nuestras Velas</h2>
              <p className="text-neutral-500 mt-2 max-w-md">Diseños artesanales para cada ocasión: desde baby showers hasta navidad.</p>
            </div>
            <Link to="/catalogo" className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-full bg-neutral-900 text-white hover:bg-rose-500 transition-all duration-300 shadow-lg">
              Ver catálogo completo
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="card rounded-2xl overflow-hidden">
                  <div className="aspect-square bg-neutral-200 animate-shimmer" />
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-neutral-200 rounded-full w-3/4" />
                    <div className="h-3 bg-neutral-200 rounded-full w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="sm:hidden -mx-2 px-2">
                <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 scroll-smooth">
                  {products.slice(0, 8).map((p, i) => (
                    <div key={p.slug} className="min-w-[78%] snap-center"><ProductCard product={p} index={i} /></div>
                  ))}
                </div>
              </div>
              <div className="hidden sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {products.slice(0, 8).map((p, i) => <ProductCard key={p.slug} product={p} index={i} />)}
              </div>
            </>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          GALLERY — Infinite marquee
      ═══════════════════════════════════════════ */}
      <section className="py-16 md:py-20 bg-neutral-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 animate-fade-in-up">
          <p className="text-xs uppercase tracking-[0.3em] text-rose-400 font-semibold mb-2">Galería</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Nuestro trabajo</h2>
        </div>
        {/* Marquee row — duplicated for seamless loop */}
        <div className="group/marquee relative">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-neutral-900 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-neutral-900 to-transparent z-10 pointer-events-none" />
          <div className="flex gap-4 animate-marquee group-hover/marquee:[animation-play-state:paused]">
            {[...GALLERY, ...GALLERY, ...GALLERY, ...GALLERY].map((src, i) => {
              const sizes = ['h-48 w-36', 'h-64 w-48', 'h-56 w-40', 'h-52 w-44', 'h-60 w-44', 'h-48 w-40'];
              const sizeClass = sizes[i % sizes.length];
              return (
                <div
                  key={i}
                  className={`flex-shrink-0 ${sizeClass} rounded-2xl overflow-hidden border border-neutral-700/40 transition-all duration-500 hover:scale-110 hover:z-20 hover:shadow-2xl hover:border-rose-500/40 cursor-pointer`}
                >
                  <img src={src} alt={`Galería ${(i % GALLERY.length) + 1}`} className="w-full h-full object-cover" loading="lazy" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          MORE PRODUCTS — if we have > 8
      ═══════════════════════════════════════════ */}
      {products.length > 8 && (
        <section className="py-16 md:py-24 bg-neutral-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 animate-fade-in-up">
              <p className="text-xs uppercase tracking-[0.3em] text-rose-500 font-semibold mb-2">Más opciones</p>
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">Descubre más diseños</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {products.slice(8, 16).map((p, i) => <ProductCard key={p.slug} product={p} index={i} />)}
            </div>
            {products.length > 16 && (
              <div className="text-center mt-10">
                <Link to="/catalogo" className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold rounded-full bg-neutral-900 text-white hover:bg-rose-500 transition-all shadow-lg">
                  Ver los {products.length} productos
                </Link>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════
          CTA EMPRESAS — Dark glass
      ═══════════════════════════════════════════ */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-neutral-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(244,63,94,0.08),transparent_70%)]" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="glass-strong rounded-[36px] p-10 md:p-16 shadow-2xl animate-fade-in-up">
            <p className="text-xs uppercase tracking-[0.3em] text-rose-400 font-semibold mb-4">Eventos & Empresas</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              ¿Tienes un evento<br />especial?
            </h2>
            <p className="text-neutral-300 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
              Velas personalizadas para bodas, baby showers, eventos corporativos y celebraciones. El detalle perfecto que tus invitados recordarán.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={getWhatsAppUrl(WA_MESSAGES.eventQuote)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-emerald-500 hover:bg-emerald-400 text-white text-lg font-bold rounded-full transition-all duration-300 shadow-xl glow-emerald"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.52 3.48A11.78 11.78 0 0012 0 12 12 0 000 12a11.9 11.9 0 001.64 6.03L0 24l6.15-1.61A12 12 0 1012 0c3.2 0 6.2 1.25 8.52 3.48z"/></svg>
                Cotizar por WhatsApp
              </a>
              <Link
                to="/contacto"
                className="inline-flex items-center justify-center gap-2 px-10 py-5 glass text-white text-lg font-bold rounded-full hover:bg-white/10 transition-all"
              >
                Más opciones
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
