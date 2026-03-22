import { useState, useMemo } from 'react';
import { useProducts } from '@/hooks/useProducts';
import { getCategories } from '@/lib/sheets';
import ProductCard from '@/components/ProductCard';

export default function Catalogo() {
  const { products, loading, error } = useProducts();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('Todos');

  const categories = useMemo(() => ['Todos', ...getCategories(products)], [products]);

  const filtered = useMemo(() => {
    let list = products;
    if (activeCategory !== 'Todos') {
      list = list.filter((p) => p.category === activeCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      list = list.filter((p) =>
        p.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(q)
      );
    }
    return list;
  }, [products, search, activeCategory]);

  // Group by category for "Todos" view
  const grouped = useMemo(() => {
    if (activeCategory !== 'Todos') return null;
    const cats = getCategories(filtered);
    return cats.map((cat) => ({
      name: cat,
      products: filtered.filter((p) => p.category === cat),
    })).filter((g) => g.products.length > 0);
  }, [filtered, activeCategory]);

  return (
    <div className="pt-20 pb-16 min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="pt-8 mb-8 animate-fade-in-up">
          <p className="text-xs uppercase tracking-[0.3em] text-rose-500 font-semibold mb-2">Catálogo completo</p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">Nuestras Velas</h1>

          {/* Search */}
          <div className="max-w-md mb-6">
            <div className="relative">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Buscar vela..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-neutral-300 bg-white text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-rose-400/40 focus:border-rose-400 transition-all text-sm shadow-sm"
              />
            </div>
          </div>

          {/* Category filters */}
          <div className="flex gap-2 overflow-x-auto pb-2 snap-x snap-mandatory">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`snap-start whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                  activeCategory === cat
                    ? 'bg-neutral-900 text-white border-neutral-900 shadow-md'
                    : 'bg-white text-neutral-600 border-neutral-300 hover:border-neutral-400 hover:text-neutral-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="card rounded-2xl p-8 text-center">
            <p className="text-rose-500 mb-2">Error cargando productos</p>
            <p className="text-neutral-500 text-sm">{error}</p>
          </div>
        )}

        {loading && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="card rounded-2xl overflow-hidden">
                <div className="aspect-square bg-neutral-200 animate-shimmer" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-neutral-200 rounded-full w-3/4" />
                  <div className="h-3 bg-neutral-200 rounded-full w-1/2" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && !error && (
          <>
            <p className="text-sm text-neutral-500 mb-6">{filtered.length} producto{filtered.length !== 1 ? 's' : ''}</p>

            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <svg className="w-16 h-16 text-neutral-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <p className="text-neutral-500">No se encontraron productos</p>
              </div>
            ) : grouped ? (
              /* Grouped by category */
              <div className="space-y-12">
                {grouped.map((group) => (
                  <div key={group.name}>
                    <h2 className="text-xl md:text-2xl font-bold text-neutral-900 mb-5 flex items-center gap-3">
                      <span className="w-1.5 h-8 bg-rose-500 rounded-full" />
                      {group.name}
                      <span className="text-sm font-normal text-neutral-400">({group.products.length})</span>
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                      {group.products.map((p, i) => (
                        <ProductCard key={p.slug} product={p} index={i} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Filtered single category */
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
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
