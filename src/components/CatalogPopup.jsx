import { useState, useEffect } from 'react';

export default function CatalogPopup() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem('catalogPopupDismissed') === '1') return;
    } catch {}

    const timer = setTimeout(() => setShow(true), 30000);
    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => {
    setShow(false);
    try { sessionStorage.setItem('catalogPopupDismissed', '1'); } catch {}
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={dismiss} />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 animate-scale-in">
        {/* Close */}
        <button
          onClick={dismiss}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-neutral-600 transition-colors"
          aria-label="Cerrar"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex items-start gap-4 mb-6">
          <div className="shrink-0 w-12 h-12 rounded-2xl bg-rose-100 text-rose-500 flex items-center justify-center">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v12m0 0l-4-4m4 4l4-4M4 21h16" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-bold text-neutral-900">Destellos, siempre contigo</h3>
            <p className="text-sm text-neutral-600 mt-1 leading-relaxed">
              Descarga nuestro catálogo en PDF para explorar todos los productos y detalles cuando quieras.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={dismiss}
            className="flex-1 px-5 py-3 text-sm font-medium rounded-xl border border-neutral-300 text-neutral-700 hover:bg-neutral-50 transition-colors"
          >
            Ahora no
          </button>
          <a
            href="/catalogo.pdf"
            download
            onClick={dismiss}
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-bold rounded-xl bg-rose-500 hover:bg-rose-600 text-white transition-colors shadow-lg glow-rose"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v12m0 0l-4-4m4 4l4-4M4 21h16" />
            </svg>
            Descargar PDF
          </a>
        </div>
      </div>
    </div>
  );
}
