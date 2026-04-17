import { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProducts } from '@/hooks/useProducts';
import ProductCard from '@/components/ProductCard';
import { formatPriceCOP, getProductWhatsAppUrl, getProductDozenWhatsAppUrl } from '@/lib/config';

export default function ProductDetail() {
  const { slug } = useParams();
  const { products, loading } = useProducts();
  const product = products.find((p) => p.slug === slug);
  const [selectedImg, setSelectedImg] = useState(0);
  const [paused, setPaused] = useState(false);

  const images = product?.images?.length ? product.images : (product?.image ? [product.image] : []);

  // Reset selected image when product changes
  useEffect(() => { setSelectedImg(0); }, [slug]);

  // Autoplay gallery every 5s
  useEffect(() => {
    if (images.length <= 1 || paused) return;
    const t = setInterval(() => setSelectedImg((i) => (i + 1) % images.length), 5000);
    return () => clearInterval(t);
  }, [images.length, paused]);

  const prev = useCallback(() => {
    setPaused(true);
    setSelectedImg((i) => (i - 1 + images.length) % images.length);
  }, [images.length]);

  const next = useCallback(() => {
    setPaused(true);
    setSelectedImg((i) => (i + 1) % images.length);
  }, [images.length]);

  const related = product
    ? products.filter((p) => p.slug !== slug && p.category === product.category).slice(0, 4)
    : [];
  const moreRelated = related.length < 4
    ? [...related, ...products.filter((p) => p.slug !== slug && !related.includes(p)).slice(0, 4 - related.length)]
    : related;

  if (loading) {
    return (
      <div className="pt-20 pb-12 min-h-screen bg-neutral-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <div className="card rounded-3xl overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="aspect-square bg-neutral-200 animate-shimmer" />
              <div className="p-8 space-y-6">
                <div className="h-8 bg-neutral-200 rounded-full w-3/4" />
                <div className="h-4 bg-neutral-200 rounded-full w-full" />
                <div className="h-12 bg-neutral-200 rounded-full w-1/3 mt-8" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-20 pb-12 min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center card rounded-3xl p-12">
          <h1 className="text-2xl font-bold text-neutral-900 mb-4">Producto no encontrado</h1>
          <Link to="/catalogo" className="text-rose-500 hover:text-rose-600 font-medium">Volver al catálogo</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-16 min-h-screen bg-neutral-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-neutral-500 mt-6 mb-6 overflow-x-auto">
          <Link to="/" className="hover:text-neutral-900 transition-colors whitespace-nowrap">Inicio</Link>
          <span className="text-neutral-300">/</span>
          <Link to="/catalogo" className="hover:text-neutral-900 transition-colors whitespace-nowrap">Catálogo</Link>
          <span className="text-neutral-300">/</span>
          <span className="text-neutral-900 font-medium truncate">{product.name}</span>
        </nav>

        {/* ═══ Main Product Card ═══ */}
        <div className="card rounded-3xl overflow-hidden shadow-lg animate-fade-in-up">
          <div className="grid md:grid-cols-2">

            {/* ── Image Gallery ── */}
            <div className="flex flex-col bg-neutral-100">
              {/* Main image with slider arrows */}
              <div
                className="aspect-square relative overflow-hidden group"
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
              >
                {images.length > 0 ? (
                  <img
                    src={images[selectedImg] || images[0]}
                    alt={`${product.name} - imagen ${selectedImg + 1}`}
                    className="w-full h-full object-cover transition-all duration-500"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-neutral-300">
                    <svg className="w-24 h-24 mb-3 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}

                {/* Category badge */}
                <span className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-[11px] uppercase tracking-wider font-semibold bg-neutral-900/80 text-white backdrop-blur-sm">
                  {product.category}
                </span>

                {/* Slider arrows */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={prev}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-neutral-700 flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      aria-label="Imagen anterior"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <button
                      onClick={next}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-neutral-700 flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      aria-label="Imagen siguiente"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </button>

                    {/* Dots */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {images.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => { setPaused(true); setSelectedImg(i); }}
                          className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                            i === selectedImg ? 'bg-white scale-125 shadow' : 'bg-white/50 hover:bg-white/80'
                          }`}
                          aria-label={`Ir a imagen ${i + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}

                {/* Image counter */}
                {images.length > 1 && (
                  <span className="absolute top-4 right-4 px-2.5 py-1 rounded-full text-[11px] font-medium bg-neutral-900/70 text-white backdrop-blur-sm">
                    {selectedImg + 1} / {images.length}
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-2 p-3 overflow-x-auto bg-white border-t border-neutral-200/70">
                  {images.map((src, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => { setPaused(true); setSelectedImg(i); }}
                      className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                        selectedImg === i
                          ? 'border-rose-500 ring-2 ring-rose-500/20 scale-105'
                          : 'border-neutral-200 hover:border-neutral-400'
                      }`}
                      aria-label={`Ver imagen ${i + 1}`}
                    >
                      <img src={src} alt={`${product.name} ${i + 1}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* ── Product Info ── */}
            <div className="p-6 md:p-8 lg:p-10 flex flex-col">
              <div className="flex-1">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-neutral-900 mb-2">{product.name}</h1>
                <p className="text-sm text-rose-500 font-medium mb-4">{product.category}</p>
                {product.description && (
                  <p className="text-neutral-600 leading-relaxed mb-6">{product.description}</p>
                )}

                {/* Prices */}
                <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-5 mb-6 space-y-3">
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm text-neutral-500 uppercase tracking-wider font-medium">Unidad</span>
                    <span className="text-3xl font-bold text-neutral-900">{formatPriceCOP(product.priceUnit)}</span>
                  </div>
                  {product.priceDozen > 0 && (
                    <div className="flex items-baseline justify-between border-t border-neutral-200 pt-3">
                      <span className="text-sm text-neutral-500 uppercase tracking-wider font-medium">Docena</span>
                      <span className="text-xl font-semibold text-neutral-700">{formatPriceCOP(product.priceDozen)}</span>
                    </div>
                  )}
                </div>

                {/* Characteristics */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-neutral-900 uppercase tracking-wider mb-3">Características</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {[
                      { icon: 'M4 14c6-1 10-5 12-10 3 3 4 8 2 12-2 4-7 6-11 4-2-1-3-3-3-6z', text: '100% cera de soya' },
                      { icon: 'M3 21h6M7 19l10-10a2.5 2.5 0 00-3.5-3.5L3 16v3h4z', text: 'Hecho a mano' },
                      { icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z', text: 'Aroma personalizable' },
                      { icon: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01', text: 'Color a tu elección' },
                      { icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4', text: 'Empaque especial' },
                      { icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', text: 'Fragancias seguras' },
                    ].map(({ icon, text }) => (
                      <div key={text} className="flex items-center gap-2.5 text-sm text-neutral-600">
                        <div className="w-7 h-7 rounded-lg bg-rose-50 flex items-center justify-center flex-shrink-0">
                          <svg className="w-3.5 h-3.5 text-rose-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path strokeLinecap="round" strokeLinejoin="round" d={icon} /></svg>
                        </div>
                        {text}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Shipping & Guarantees */}
                <div className="bg-emerald-50 border border-emerald-200/60 rounded-2xl p-4 mb-6">
                  <div className="space-y-2.5">
                    {[
                      { icon: 'M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0', label: 'Envíos a toda Colombia' },
                      { icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', label: 'Producto con garantía de calidad' },
                      { icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', label: 'Despacho en 2-5 días hábiles' },
                      { icon: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z', label: 'Pedidos al por mayor disponibles' },
                    ].map(({ icon, label }) => (
                      <div key={label} className="flex items-center gap-2.5 text-sm text-emerald-800">
                        <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={icon} /></svg>
                        {label}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="space-y-3 mt-auto">
                <a
                  href={getProductWhatsAppUrl(product)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full px-8 py-5 bg-emerald-500 hover:bg-emerald-600 text-white text-lg font-bold rounded-2xl transition-all duration-300 shadow-xl glow-emerald"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.52 3.48A11.78 11.78 0 0012 0 12 12 0 000 12a11.9 11.9 0 001.64 6.03L0 24l6.15-1.61A12 12 0 1012 0c3.2 0 6.2 1.25 8.52 3.48zM12 21.5a9.5 9.5 0 01-4.84-1.31l-.35-.21-3.64.96.97-3.55-.22-.37A9.48 9.48 0 1121.5 12 9.51 9.51 0 0112 21.5zm5.36-7.34c-.3-.15-1.76-.86-2.03-.96s-.47-.15-.67.15-.77.96-.95 1.16-.35.22-.64.07a7.7 7.7 0 01-2.27-1.4 8.55 8.55 0 01-1.58-2c-.16-.3 0-.46.12-.61s.3-.35.45-.52a2 2 0 00.3-.5.57.57 0 000-.52c0-.15-.67-1.61-.92-2.2s-.49-.51-.67-.52h-.57a1.11 1.11 0 00-.8.38 3.34 3.34 0 00-1.05 2.49 5.8 5.8 0 001.23 3.05 13.2 13.2 0 005.06 4.83 17.29 17.29 0 001.71.63 4.1 4.1 0 001.88.12 3.06 3.06 0 002-1.4 2.52 2.52 0 00.17-1.4c-.07-.12-.27-.19-.57-.33z"/></svg>
                  Pedir por WhatsApp
                </a>
                <a
                  href={getProductDozenWhatsAppUrl(product)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-6 py-3.5 border-2 border-neutral-300 hover:border-neutral-400 text-neutral-700 text-sm font-semibold rounded-2xl transition-all duration-200"
                >
                  Consultar pedido por docena
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Related */}
        {moreRelated.length > 0 && (
          <div className="mt-14">
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">También te puede gustar</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {moreRelated.map((p, i) => <ProductCard key={p.slug} product={p} index={i} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
