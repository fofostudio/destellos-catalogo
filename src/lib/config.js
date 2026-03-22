export const WHATSAPP_NUMBER = '573143008425';
export const STORE_NAME = 'Destellos';
export const STORE_TAGLINE = 'Velas para momentos únicos';
export const STORE_DESCRIPTION = 'Cada pieza nace con dedicación, creatividad y amor por lo artesanal, para transformar cualquier espacio en un refugio de calma, armonía y belleza.';

// Google Sheets published CSV URL
export const SHEETS_CSV_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vRLxebOrb3RL8GbphAd_DQ5GQMwFOTNAP2XStxvzhyuxvrjQMebd7UMhorw1n5r6zEyqJz1T9VBsQnV/pub?gid=905581388&single=true&output=csv';

export const SOCIAL = {
  whatsapp: WHATSAPP_NUMBER,
  instagram: '', // Add your Instagram URL
  facebook: '', // Add your Facebook URL
  tiktok: '', // Add your TikTok URL
};

export function getWhatsAppUrl(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function getProductWhatsAppUrl(product) {
  const price = formatPriceCOP(product.priceUnit);
  const msg = `Hola! Me interesa la vela *${product.name}*\nPrecio: ${price}\nhttps://destellosaf.com/producto/${product.slug}`;
  return getWhatsAppUrl(msg);
}

export function formatPriceCOP(value) {
  if (!value && value !== 0) return '';
  return `$ ${new Intl.NumberFormat('es-CO', { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value)} COP`;
}

export function slugify(text) {
  return String(text)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
