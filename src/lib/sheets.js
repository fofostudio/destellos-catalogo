import { SHEETS_CSV_URL, slugify } from './config';

const PRODUCT_DATA = {
  'baby-elefante': { desc: 'Velita tierna pensada para regalar ternura y luz. Ideal para baby showers, bautizos y cumpleaños.', cat: 'Baby Zoo' },
  'baby-leon': { desc: 'Representa ternura y fortaleza. Perfecta para baby showers, bautizos y cumpleaños.', cat: 'Baby Zoo' },
  'oso-winnie': { desc: 'Transmite ternura, dulzura y calidez. Ideal para baby showers y recordatorios.', cat: 'Baby Zoo' },
  'oso-de-rosa': { desc: 'Combina la ternura de un oso con la elegancia de las rosas. Perfecta para aniversarios.', cat: 'Baby Zoo' },
  'baby-jirafa': { desc: 'Llena de dulzura y simpatía, ilumina con alegría tus momentos especiales.', cat: 'Baby Zoo' },
  'peonia': { desc: 'Elegante vela con forma de peonía, un detalle floral sofisticado.', cat: 'Flores y Naturaleza' },
  'rosa-pequena': { desc: 'Una rosa delicada y encantadora, perfecta como detalle especial.', cat: 'Flores y Naturaleza' },
  'rosa': { desc: 'Inspirada en la belleza de esta flor eterna. Elegancia y significado.', cat: 'Flores y Naturaleza' },
  'bouquet-de-tulipan': { desc: 'Pieza única que imita un ramo de tulipanes frescos. El detalle perfecto.', cat: 'Flores y Naturaleza' },
  'arcoiris-unicolor': { desc: 'Pieza artesanal que transforma cualquier espacio en color y alegría.', cat: 'Flores y Naturaleza' },
  'arcoiris-multicolor': { desc: 'Pieza artesanal colorida que transforma cualquier espacio.', cat: 'Flores y Naturaleza' },
  'corazon-flor': { desc: 'Un corazón decorado con flores, símbolo de amor y delicadeza.', cat: 'Love Zone' },
  'margarita': { desc: 'Sencilla y encantadora, como la flor que inspira su diseño.', cat: 'Flores y Naturaleza' },
  'trio-de-nubes': { desc: 'Set de tres nubes delicadas con aroma personalizable.', cat: 'Flores y Naturaleza' },
  'esfera-de-amor': { desc: 'Romántico relieve de pareja, captura la esencia de momentos especiales.', cat: 'Love Zone' },
  'mama': { desc: 'El regalo perfecto para expresar amor y gratitud. Día de la Madre.', cat: 'Love Zone' },
  'oso-en-vaso': { desc: 'Tierno oso en elegante vaso, combina decoración y aroma.', cat: 'Diseños by Destellos' },
  'balon-de-futbol': { desc: 'Diseño deportivo para amantes del fútbol. Perfecta para regalos temáticos.', cat: 'Diseños by Destellos' },
  'cubo-magico': { desc: 'Diseño moderno de sencillez y elegancia. Ambientes acogedores.', cat: 'Clásicas' },
  'cilindro': { desc: 'Moderno y sofisticado con textura de esferas, efecto visual único.', cat: 'Clásicas' },
  'esmalte': { desc: 'Inspirada en frascos de esmalte, un detalle único lleno de estilo.', cat: 'Diseños by Destellos' },
  'calabaza': { desc: 'Detalle creativo que combina dulzura con la calidez de la luz.', cat: 'Halloween' },
  'fantasma': { desc: 'Diseño encantador con ternura y aire juguetón. Perfecto para Halloween.', cat: 'Halloween' },
  'perro-y-gato-fantasmas': { desc: 'Dúo adorable de fantasmitas que roba sonrisas.', cat: 'Halloween' },
  '4-velas-de-caja-navidena': { desc: 'Set navideño de 4 velas en caja especial para regalar.', cat: 'Navideñas' },
  'reno-rodolfo': { desc: 'Magia y ternura navideña en un diseño de reno encantador.', cat: 'Navideñas' },
  'arbol-navideno': { desc: 'Detalle encantador que no puede faltar en diciembre.', cat: 'Navideñas' },
  'copito-de-nieve': { desc: 'Frescura y pureza del invierno. Perfecta para Navidad.', cat: 'Navideñas' },
  'cubo-magico-navideno': { desc: 'Versión navideña del clásico cubo con decoración festiva.', cat: 'Navideñas' },
  'centro-de-mesa-base': { desc: 'Base decorativa ideal como centro de mesa para eventos.', cat: 'Clásicas' },
  'centro-de-mesa-combo': { desc: 'Combo completo de centro de mesa con varias piezas.', cat: 'Clásicas' },
  'vela-vaso': { desc: 'Elegante vela en vaso, decoración y aroma para tu espacio.', cat: 'Clásicas' },
  'pebeteros': { desc: 'Pieza premium para aromaterapia, ambientes relajantes.', cat: 'Clásicas' },
};

const LOCAL_IMAGES = {
  'baby-elefante': '/images/products/baby-elefante.png',
  'baby-leon': '/images/products/baby-leon.jpg',
  'oso-winnie': '/images/products/oso-winnie.png',
  'oso-de-rosa': '/images/products/oso-de-rosa.png',
  'baby-jirafa': '/images/products/baby-jirafa.png',
  'rosa': '/images/products/rosa.png',
  'bouquet-de-tulipan': '/images/products/bouquet-de-tulip-n.png',
  'arcoiris-unicolor': '/images/products/arco-ris-unicolor.png',
  'arcoiris-multicolor': '/images/products/arco-ris-multicolor.png',
  'trio-de-nubes': '/images/products/trio-de-nubes.png',
  'esfera-de-amor': '/images/products/esfera-de-amor.png',
  'mama': '/images/products/mam.png',
  'cubo-magico': '/images/products/cubo-m-gico.png',
  'cilindro': '/images/products/cilindro.png',
  'esmalte': '/images/products/esmalte.png',
  'calabaza': '/images/products/calabaza.png',
  'fantasma': '/images/products/fantasma.png',
  'perro-y-gato-fantasmas': '/images/products/perro-y-gato-fantasmitas.png',
  'reno-rodolfo': '/images/products/reno-rodolfo.png',
  'arbol-navideno': '/images/products/rbol-navide-o.png',
  'copito-de-nieve': '/images/products/copito-de-nieve.png',
};

function parseCSVLine(line) {
  const result = []; let current = ''; let inQ = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"') { if (inQ && line[i+1] === '"') { current += '"'; i++; } else inQ = !inQ; }
    else if (c === ',' && !inQ) { result.push(current.trim()); current = ''; }
    else current += c;
  }
  result.push(current.trim()); return result;
}

function parsePrice(s) {
  if (!s) return 0;
  const n = parseInt(String(s).replace(/[$.,\s]/g, '').replace(/[^0-9-]/g, ''), 10);
  return isNaN(n) ? 0 : n;
}

function normalizeDriveUrl(url) {
  if (!url) return '';
  const s = url.trim();
  if (s.includes('lh3.googleusercontent.com')) return s;
  for (const p of [/\/d\/([a-zA-Z0-9_-]+)/, /id=([a-zA-Z0-9_-]+)/, /\/file\/d\/([a-zA-Z0-9_-]+)/]) {
    const m = s.match(p);
    if (m) return `https://lh3.googleusercontent.com/d/${m[1]}=s800`;
  }
  return s.startsWith('http') ? s : '';
}

export async function fetchProducts() {
  const res = await fetch(SHEETS_CSV_URL);
  const text = await res.text();
  const lines = text.split('\n').filter((l) => l.trim());
  const dataLines = lines.slice(2);
  const products = [];

  for (const line of dataLines) {
    const cols = parseCSVLine(line);
    const name = cols[0]?.replace(/"/g, '').trim();
    if (!name) continue;
    const priceUnit = parsePrice(cols[15]);
    const priceDozen = parsePrice(cols[16]);
    const fotoUrl = cols[20]?.replace(/"/g, '').trim() || '';
    if (!priceUnit) continue;

    const slug = slugify(name);
    const data = PRODUCT_DATA[slug] || {};
    const driveImg = normalizeDriveUrl(fotoUrl);

    products.push({
      name,
      slug,
      priceUnit,
      priceDozen,
      image: driveImg || LOCAL_IMAGES[slug] || '',
      description: data.desc || '',
      category: data.cat || 'Otros',
    });
  }
  return products;
}

export function getCategories(products) {
  const order = ['Baby Zoo', 'Flores y Naturaleza', 'Love Zone', 'Diseños by Destellos', 'Clásicas', 'Navideñas', 'Halloween', 'Otros'];
  const cats = [...new Set(products.map((p) => p.category))];
  return cats.sort((a, b) => {
    const ia = order.indexOf(a); const ib = order.indexOf(b);
    return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
  });
}
