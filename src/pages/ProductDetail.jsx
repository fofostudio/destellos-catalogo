import { useParams, Link } from 'react-router-dom';
import { useProducts } from '@/hooks/useProducts';
import ProductCard from '@/components/ProductCard';
import { formatPriceCOP, getProductWhatsAppUrl, STORE_NAME } from '@/lib/config';

export default function ProductDetail() {
  const { slug } = useParams();
  const { products, loading } = useProducts();

  const product = products.find((p) => p.slug === slug);
  const related = products.filter((p) => p.slug !== slug).slice(0, 4);

  if (loading) {
    return (
      <div className="pt-20 pb-12 min-h-screen bg-neutral-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse grid md:grid-cols-2 gap-8 mt-8">
            <div className="aspect-square bg-neutral-200 rounded-2xl" />
            <div className="space-y-4 py-4">
              <div className="h-8 bg-neutral-200 rounded w-3/4" />
              <div className="h-4 bg-neutral-200 rounded w-1/2" />
              <div className="h-10 bg-neutral-200 rounded w-1/3" />
              <div className="h-14 bg-neutral-200 rounded-full w-full mt-8" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-20 pb-12 min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-neutral-900 mb-3">Producto no encontrado</h1>
          <Link to="/catalogo" className="text-rose-500 hover:text-rose-600 font-medium">
            Volver al catálogo
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-12 min-h-screen bg-neutral-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-neutral-500 mt-4 mb-6">
          <Link to="/" className="hover:text-neutral-900 transition-colors">Inicio</Link>
          <span>/</span>
          <Link to="/catalogo" className="hover:text-neutral-900 transition-colors">Catálogo</Link>
          <span>/</span>
          <span className="text-neutral-900 font-medium truncate">{product.name}</span>
        </nav>

        {/* Product */}
        <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-sm animate-fade-in-up">
          <div className="grid md:grid-cols-2">
            {/* Image */}
            <div className="aspect-square bg-neutral-100 relative overflow-hidden">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-neutral-300">
                  <svg className="w-24 h-24 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm">Foto próximamente</span>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="p-6 md:p-8 flex flex-col justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-3">{product.name}</h1>
                {product.description && (
                  <p className="text-neutral-600 leading-relaxed mb-6">{product.description}</p>
                )}

                {/* Prices */}
                <div className="space-y-2 mb-6">
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-bold text-neutral-900">{formatPriceCOP(product.priceUnit)}</span>
                    <span className="text-sm text-neutral-500">Unidad</span>
                  </div>
                  {product.priceDozen > 0 && (
                    <div className="flex items-baseline gap-3">
                      <span className="text-xl font-semibold text-neutral-700">{formatPriceCOP(product.priceDozen)}</span>
                      <span className="text-sm text-neutral-500">Docena</span>
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="space-y-3 mb-8">
                  {[
                    { icon: 'M4 14c6-1 10-5 12-10 3 3 4 8 2 12-2 4-7 6-11 4-2-1-3-3-3-6z', text: '100% cera de soya natural' },
                    { icon: 'M3 21h6M7 19l10-10a2.5 2.5 0 00-3.5-3.5L3 16v3h4z', text: 'Elaborada artesanalmente' },
                    { icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z', text: 'Aroma y color personalizable' },
                  ].map(({ icon, text }) => (
                    <div key={text} className="flex items-center gap-3 text-sm text-neutral-600">
                      <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-neutral-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d={icon} /></svg>
                      </div>
                      {text}
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <a
                href={getProductWhatsAppUrl(product)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white text-lg font-semibold rounded-full transition-colors shadow-lg"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.52 3.48A11.78 11.78 0 0012 0 12 12 0 000 12a11.9 11.9 0 001.64 6.03L0 24l6.15-1.61A12 12 0 1012 0c3.2 0 6.2 1.25 8.52 3.48zM12 21.5a9.5 9.5 0 01-4.84-1.31l-.35-.21-3.64.96.97-3.55-.22-.37A9.48 9.48 0 1121.5 12 9.51 9.51 0 0112 21.5zm5.36-7.34c-.3-.15-1.76-.86-2.03-.96s-.47-.15-.67.15-.77.96-.95 1.16-.35.22-.64.07a7.7 7.7 0 01-2.27-1.4 8.55 8.55 0 01-1.58-2c-.16-.3 0-.46.12-.61s.3-.35.45-.52a2 2 0 00.3-.5.57.57 0 000-.52c0-.15-.67-1.61-.92-2.2s-.49-.51-.67-.52h-.57a1.11 1.11 0 00-.8.38 3.34 3.34 0 00-1.05 2.49 5.8 5.8 0 001.23 3.05 13.2 13.2 0 005.06 4.83 17.29 17.29 0 001.71.63 4.1 4.1 0 001.88.12 3.06 3.06 0 002-1.4 2.52 2.52 0 00.17-1.4c-.07-.12-.27-.19-.57-.33z"/></svg>
                Pedir por WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">También te puede gustar</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {related.map((p, i) => (
                <ProductCard key={p.slug} product={p} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
