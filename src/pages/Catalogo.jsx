import { useState, useMemo } from 'react';
import { useProducts } from '@/hooks/useProducts';
import ProductCard from '@/components/ProductCard';

export default function Catalogo() {
  const { products, loading, error } = useProducts();
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    if (!search.trim()) return products;
    const q = search.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    return products.filter((p) => {
      const name = p.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      return name.includes(q);
    });
  }, [products, search]);

  return (
    <div className="pt-20 pb-12 min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.3em] text-rose-500 font-semibold">Catálogo completo</p>
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">Nuestras Velas</h1>
          <div className="max-w-md">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Buscar vela..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-neutral-300 bg-white text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-rose-400/50 focus:border-rose-400 transition-shadow text-sm"
              />
            </div>
          </div>
        </div>

        {/* Error state */}
        {error && (
          <div className="text-center py-12">
            <p className="text-red-500 mb-2">Error cargando productos</p>
            <p className="text-neutral-500 text-sm">{error}</p>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {Array.from({ length: 12 }).map((_, i) => (
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
        )}

        {/* Products grid */}
        {!loading && !error && (
          <>
            <p className="text-sm text-neutral-500 mb-6">{filtered.length} producto{filtered.length !== 1 ? 's' : ''}</p>
            {filtered.length === 0 ? (
              <div className="text-center py-16">
                <svg className="w-16 h-16 text-neutral-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <p className="text-neutral-500">No se encontraron productos para "{search}"</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {filtered.map((p, i) => (
                  <ProductCard key={p.slug} product={p} index={i} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
