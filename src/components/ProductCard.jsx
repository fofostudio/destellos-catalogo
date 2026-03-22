import { Link } from 'react-router-dom';
import { formatPriceCOP, getProductWhatsAppUrl } from '@/lib/config';

export default function ProductCard({ product, index = 0, variant = 'light' }) {
  const isDark = variant === 'dark';

  return (
    <div
      className={`group rounded-2xl overflow-hidden transition-all duration-500 transform hover:-translate-y-2 animate-fade-in-up ${
        isDark
          ? 'glass-card-dark hover:border-white/20 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)]'
          : 'card hover:shadow-xl hover:border-neutral-300/70'
      }`}
      style={{ animationDelay: `${(index % 8) * 70}ms` }}
    >
      <Link to={`/producto/${product.slug}`}>
        <div className={`relative aspect-square overflow-hidden ${isDark ? 'bg-neutral-800/50' : 'bg-neutral-100'}`}>
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className={`w-full h-full flex flex-col items-center justify-center ${isDark ? 'text-neutral-600' : 'text-neutral-300'}`}>
              <svg className="w-14 h-14 mb-2 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-[11px] uppercase tracking-wider">Foto pronto</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      </Link>

      <div className="p-4">
        <h3 className={`font-semibold text-sm md:text-base mb-1 line-clamp-2 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
          <Link to={`/producto/${product.slug}`} className="hover:text-rose-500 transition-colors">
            {product.name}
          </Link>
        </h3>
        {product.description && (
          <p className={`text-[13px] line-clamp-2 mb-3 ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>{product.description}</p>
        )}
        <div className="flex items-end justify-between gap-2">
          <div>
            <p className={`text-lg font-bold ${isDark ? 'text-white' : 'text-neutral-900'}`}>{formatPriceCOP(product.priceUnit)}</p>
            {product.priceDozen > 0 && (
              <p className="text-[11px] text-neutral-500">Docena: {formatPriceCOP(product.priceDozen)}</p>
            )}
          </div>
          <a
            href={getProductWhatsAppUrl(product)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="shrink-0 p-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white transition-all duration-200 shadow-lg glow-emerald transform hover:scale-110"
            aria-label={`Pedir ${product.name} por WhatsApp`}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.52 3.48A11.78 11.78 0 0012 0 12 12 0 000 12a11.9 11.9 0 001.64 6.03L0 24l6.15-1.61A12 12 0 1012 0c3.2 0 6.2 1.25 8.52 3.48zM12 21.5a9.5 9.5 0 01-4.84-1.31l-.35-.21-3.64.96.97-3.55-.22-.37A9.48 9.48 0 1121.5 12 9.51 9.51 0 0112 21.5zm5.36-7.34c-.3-.15-1.76-.86-2.03-.96s-.47-.15-.67.15-.77.96-.95 1.16-.35.22-.64.07a7.7 7.7 0 01-2.27-1.4 8.55 8.55 0 01-1.58-2c-.16-.3 0-.46.12-.61s.3-.35.45-.52a2 2 0 00.3-.5.57.57 0 000-.52c0-.15-.67-1.61-.92-2.2s-.49-.51-.67-.52h-.57a1.11 1.11 0 00-.8.38 3.34 3.34 0 00-1.05 2.49 5.8 5.8 0 001.23 3.05 13.2 13.2 0 005.06 4.83 17.29 17.29 0 001.71.63 4.1 4.1 0 001.88.12 3.06 3.06 0 002-1.4 2.52 2.52 0 00.17-1.4c-.07-.12-.27-.19-.57-.33z"/></svg>
          </a>
        </div>
      </div>
    </div>
  );
}
