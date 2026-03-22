import { Routes, Route } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import CatalogPopup from '@/components/CatalogPopup';
import Home from '@/pages/Home';
import Catalogo from '@/pages/Catalogo';
import ProductDetail from '@/pages/ProductDetail';
import Contacto from '@/pages/Contacto';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/producto/:slug" element={<ProductDetail />} />
          <Route path="/contacto" element={<Contacto />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppFloat />
      <CatalogPopup />
    </div>
  );
}
