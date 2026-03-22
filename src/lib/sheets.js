import { SHEETS_CSV_URL, slugify } from './config';

// Descriptions fallback (used when sheet doesn't have a description column)
const DESCRIPTIONS = {
  'baby-elefante': 'Velita tierna pensada para regalar ternura y luz. Ideal para baby showers, bautizos y cumpleaños.',
  'baby-leon': 'Representa ternura y fortaleza. Perfecta para baby showers, bautizos y cumpleaños.',
  'oso-winnie': 'Transmite ternura, dulzura y calidez. Ideal para baby showers y recordatorios.',
  'oso-de-rosa': 'Combina la ternura de un oso con la elegancia de las rosas. Perfecta para aniversarios.',
  'baby-jirafa': 'Llena de dulzura y simpatía, ilumina con alegría tus momentos especiales.',
  'peonia': 'Elegante vela con forma de peonía, un detalle floral sofisticado.',
  'rosa-pequena': 'Una rosa delicada y encantadora, perfecta como detalle especial.',
  'rosa': 'Inspirada en la belleza de esta flor eterna. Elegancia y significado.',
  'bouquet-de-tulipan': 'Pieza única que imita un ramo de tulipanes frescos. El detalle perfecto.',
  'arcoiris-unicolor': 'Pieza artesanal que transforma cualquier espacio en color y alegría.',
  'arcoiris-multicolor': 'Pieza artesanal colorida que transforma cualquier espacio.',
  'corazon-flor': 'Un corazón decorado con flores, símbolo de amor y delicadeza.',
  'margarita': 'Sencilla y encantadora, como la flor que inspira su diseño.',
  'trio-de-nubes': 'Set de tres nubes delicadas con aroma personalizable.',
  'esfera-de-amor': 'Romántico relieve de pareja, captura la esencia de momentos especiales.',
  'mama': 'El regalo perfecto para expresar amor y gratitud. Día de la Madre.',
  'oso-en-vaso': 'Tierno oso en elegante vaso, combina decoración y aroma.',
  'balon-de-futbol': 'Diseño deportivo para amantes del fútbol. Perfecta para regalos temáticos.',
  'cubo-magico': 'Diseño moderno de sencillez y elegancia. Ambientes acogedores.',
  'cilindro': 'Moderno y sofisticado con textura de esferas, efecto visual único.',
  'esmalte': 'Inspirada en frascos de esmalte, un detalle único lleno de estilo.',
  'calabaza': 'Detalle creativo que combina dulzura con la calidez de la luz.',
  'fantasma': 'Diseño encantador con ternura y aire juguetón. Perfecto para Halloween.',
  'perro-y-gato-fantasmas': 'Dúo adorable de fantasmitas que roba sonrisas.',
  '4-velas-de-caja-navidena': 'Set navideño de 4 velas en caja especial para regalar.',
  'reno-rodolfo': 'Magia y ternura navideña en un diseño de reno encantador.',
  'arbol-navideno': 'Detalle encantador que no puede faltar en diciembre.',
  'copito-de-nieve': 'Frescura y pureza del invierno. Perfecta para Navidad.',
  'cubo-magico-navideno': 'Versión navideña del clásico cubo con decoración festiva.',
  'centro-de-mesa-base': 'Base decorativa ideal como centro de mesa para eventos.',
  'centro-de-mesa-combo': 'Combo completo de centro de mesa con varias piezas.',
  'vela-vaso': 'Elegante vela en vaso, decoración y aroma para tu espacio.',
  'pebeteros': 'Pieza premium para aromaterapia, ambientes relajantes.',
};

// Category fallback (used when sheet CATEGORIA column is empty)
const CATEGORY_FALLBACK = {
  'baby-elefante': 'Baby Zoo', 'baby-leon': 'Baby Zoo', 'oso-winnie': 'Baby Zoo',
  'oso-de-rosa': 'Baby Zoo', 'baby-jirafa': 'Baby Zoo',
  'peonia': 'Flores y Naturaleza', 'rosa-pequena': 'Flores y Naturaleza',
  'rosa': 'Flores y Naturaleza', 'bouquet-de-tulipan': 'Flores y Naturaleza',
  'arcoiris-unicolor': 'Flores y Naturaleza', 'arcoiris-multicolor': 'Flores y Naturaleza',
  'margarita': 'Flores y Naturaleza', 'trio-de-nubes': 'Flores y Naturaleza',
  'corazon-flor': 'Love Zone', 'esfera-de-amor': 'Love Zone', 'mama': 'Love Zone',
  'oso-en-vaso': 'Diseños by Destellos', 'esmalte': 'Diseños by Destellos',
  'balon-de-futbol': 'Diseños by Destellos',
  'cubo-magico': 'Clásicas', 'cilindro': 'Clásicas',
  'centro-de-mesa-base': 'Clásicas', 'centro-de-mesa-combo': 'Clásicas',
  'vela-vaso': 'Clásicas', 'pebeteros': 'Clásicas',
  'calabaza': 'Halloween', 'fantasma': 'Halloween', 'perro-y-gato-fantasmas': 'Halloween',
  '4-velas-de-caja-navidena': 'Navideñas', 'reno-rodolfo': 'Navideñas',
  'arbol-navideno': 'Navideñas', 'copito-de-nieve': 'Navideñas',
  'cubo-magico-navideno': 'Navideñas',
};

// Local product images fallback (slug → path)
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

// ── CSV Parsing ──

function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQ = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"') {
      if (inQ && line[i + 1] === '"') { current += '"'; i++; }
      else inQ = !inQ;
    } else if (c === ',' && !inQ) {
      result.push(current.trim());
      current = '';
    } else {
      current += c;
    }
  }
  result.push(current.trim());
  return result;
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

function clean(val) {
  return (val || '').replace(/^"|"$/g, '').trim();
}

// ── Column indices ──
// A=0:  Molde
// P=15: Venta Final Unidad
// Q=16: Docena
// U=20: FOTO_URL           (imagen principal)
// V=21: CATEGORIA
// W=22: MOSTRAR             (checkbox TRUE/FALSE)
// X=23: FOTO_URL_2          (galería secundaria)
// Y=24: FOTO_URL_3
// Z=25: FOTO_URL_4
// AA=26: FOTO_URL_5
// ... columnas adicionales se leen dinámicamente

export async function fetchProducts() {
  const res = await fetch(SHEETS_CSV_URL);
  const text = await res.text();
  const lines = text.split('\n').filter((l) => l.trim());

  // Skip header rows (row 1 = header titles, row 2 = sub-headers)
  const dataLines = lines.slice(2);
  const products = [];

  for (const line of dataLines) {
    const cols = parseCSVLine(line);
    const name = clean(cols[0]);
    if (!name) continue;

    const priceUnit = parsePrice(cols[15]);
    const priceDozen = parsePrice(cols[16]);
    if (!priceUnit) continue;

    // FOTO_URL principal (col U = index 20)
    const fotoUrl = clean(cols[20]);

    // CATEGORIA (col V = index 21)
    const sheetCategory = clean(cols[21]);

    // MOSTRAR (col W = index 22)
    const mostrarRaw = clean(cols[22]).toUpperCase();
    const mostrar = mostrarRaw === 'FALSE' ? false : true;

    if (!mostrar) continue;

    const slug = slugify(name);
    const mainDriveImg = normalizeDriveUrl(fotoUrl);
    const mainImage = mainDriveImg || LOCAL_IMAGES[slug] || '';
    const category = sheetCategory || CATEGORY_FALLBACK[slug] || 'Otros';

    // Gallery: read FOTO_URL_2 (col 23), FOTO_URL_3 (col 24), etc.
    const gallery = [mainImage].filter(Boolean);
    for (let i = 23; i < cols.length; i++) {
      const url = normalizeDriveUrl(clean(cols[i]));
      if (url) gallery.push(url);
    }

    products.push({
      name,
      slug,
      priceUnit,
      priceDozen,
      image: mainImage,
      images: gallery,
      description: DESCRIPTIONS[slug] || '',
      category,
    });
  }

  return products;
}

export function getCategories(products) {
  const order = ['Baby Zoo', 'Flores y Naturaleza', 'Love Zone', 'Diseños by Destellos', 'Clásicas', 'Navideñas', 'Halloween', 'Otros'];
  const cats = [...new Set(products.map((p) => p.category))];
  return cats.sort((a, b) => {
    const ia = order.indexOf(a);
    const ib = order.indexOf(b);
    return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
  });
}
