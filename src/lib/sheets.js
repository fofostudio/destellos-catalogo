import { SHEETS_CSV_URL, slugify } from './config';

// Descriptions from the original catalog (static fallback)
const DESCRIPTIONS = {
  'baby elefante': 'Velita tierna pensada para regalar ternura y luz en cada detalle. Ideal para baby showers, bautizos y cumpleaños infantiles.',
  'baby leon': 'Representa ternura y fortaleza en un diseño encantador. Perfecta para baby showers, bautizos y cumpleaños.',
  'oso winnie': 'Transmite ternura, dulzura y calidez. Ideal para baby showers, bautizos y recordatorios especiales.',
  'oso de rosa': 'Combina la ternura de un oso con la elegancia de las rosas. Perfecta para aniversarios y celebraciones.',
  'baby jirafa': 'Llena de dulzura y simpatía, ilumina con alegría tus momentos más especiales.',
  'peonia': 'Elegante vela con forma de peonía, un detalle floral sofisticado para cualquier ocasión.',
  'rosa pequena': 'Una rosa delicada y encantadora, perfecta como detalle especial.',
  'rosa': 'Inspirada en la belleza de esta flor eterna. Un obsequio lleno de elegancia y significado.',
  'bouquet de tulipan': 'Pieza única que imita un ramo de tulipanes frescos. El detalle perfecto para enamorar los sentidos.',
  'arcoiris unicolor': 'Pieza artesanal única que transforma cualquier espacio en un lugar lleno de color y alegría.',
  'arcoiris multicolor': 'Pieza artesanal colorida que transforma cualquier espacio con alegría y vitalidad.',
  'corazon flor': 'Un corazón decorado con flores, símbolo de amor y delicadeza.',
  'margarita': 'Sencilla y encantadora, como la flor que inspira su diseño.',
  'trio de nubes': 'Set de tres nubes de diferentes tamaños, delicadas y encantadoras con aroma personalizable.',
  'esfera de amor': 'Diseñada para capturar la esencia de los momentos especiales con un romántico relieve de pareja.',
  'mama': 'El regalo perfecto para expresar amor y gratitud. Ideal para el Día de la Madre.',
  'oso en vaso': 'Tierno oso en un elegante vaso, combina decoración y aroma en una sola pieza.',
  'balon de futbol': 'Diseño deportivo ideal para los amantes del fútbol. Perfecta para cumpleaños y regalos temáticos.',
  'cubo magico': 'Diseño moderno que combina sencillez y elegancia. Ideal para crear ambientes acogedores.',
  'cilindro': 'Diseño moderno y sofisticado con textura de pequeñas esferas, creando un efecto visual único.',
  'esmalte': 'Inspirada en frascos de esmalte, un detalle único lleno de estilo y encanto.',
  'calabaza': 'Detalle creativo que combina dulzura con la calidez de la luz. Ideal para decorar.',
  'fantasma': 'Diseño encantador que combina ternura y un aire juguetón. Perfecto para Halloween.',
  'perro y gato fantasmas': 'Dúo adorable de fantasmitas que roba sonrisas y llena de encanto cualquier rincón.',
  '4 velas de caja navidena': 'Set navideño de 4 velas en caja especial, perfectas para regalar en temporada.',
  'reno rodolfo': 'Elección perfecta para llenar de magia y ternura la Navidad.',
  'arbol navideno': 'Detalle encantador que no puede faltar en la época decembrina.',
  'copito de nieve': 'Transmite la frescura y pureza del invierno. Perfecta para decorar en Navidad.',
  'cubo magico navideno': 'Versión navideña del clásico cubo, con decoración festiva especial.',
  'centro de mesa base': 'Base decorativa ideal como centro de mesa para eventos y celebraciones.',
  'centro de mesa combo': 'Combo completo de centro de mesa con varias piezas decorativas.',
  'vela vaso': 'Elegante vela en vaso, combina decoración y aroma para cualquier espacio.',
  'pebeteros': 'Pieza premium para aromaterapia, perfecta para crear ambientes relajantes.',
};

function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += ch;
    }
  }
  result.push(current.trim());
  return result;
}

function parsePrice(str) {
  if (!str) return 0;
  const cleaned = String(str).replace(/[$.,\s]/g, '').replace(/[^0-9-]/g, '');
  const num = parseInt(cleaned, 10);
  return isNaN(num) ? 0 : num;
}

function normalizeDriveUrl(url) {
  if (!url) return '';
  const str = url.trim();
  // Already a direct link
  if (str.includes('lh3.googleusercontent.com')) return str;
  // Google Drive file ID extraction
  const patterns = [
    /\/d\/([a-zA-Z0-9_-]+)/,
    /id=([a-zA-Z0-9_-]+)/,
    /\/file\/d\/([a-zA-Z0-9_-]+)/,
  ];
  for (const pat of patterns) {
    const match = str.match(pat);
    if (match) {
      return `https://lh3.googleusercontent.com/d/${match[1]}=s800`;
    }
  }
  // If it's already a full URL, return as-is
  if (str.startsWith('http')) return str;
  return '';
}

export async function fetchProducts() {
  const res = await fetch(SHEETS_CSV_URL);
  const text = await res.text();
  const lines = text.split('\n').filter((l) => l.trim());

  // Skip header rows (first 2 rows are headers)
  const dataLines = lines.slice(2);

  const products = [];

  for (const line of dataLines) {
    const cols = parseCSVLine(line);
    const name = cols[0]?.replace(/"/g, '').trim();
    if (!name) continue;

    const priceUnit = parsePrice(cols[15]);
    const priceDozen = parsePrice(cols[16]);
    const fotoUrl = cols[20]?.replace(/"/g, '').trim() || '';

    // Skip rows without a valid price (incomplete rows at the bottom)
    if (!priceUnit) continue;

    const slug = slugify(name);
    const descKey = slug.replace(/-/g, ' ');
    const description = DESCRIPTIONS[descKey] || '';

    products.push({
      name,
      slug,
      priceUnit,
      priceDozen,
      image: normalizeDriveUrl(fotoUrl),
      description,
    });
  }

  return products;
}
