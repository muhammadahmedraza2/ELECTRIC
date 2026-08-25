import { Product } from '../models';
import { CATEGORIES } from './categories.data';

const BRANDS = ['Samsung', 'LG', 'Sony', 'Haier', 'Dawlance', 'Orient', 'Philips',
  'Anker', 'TP-Link', 'HP', 'Dell', 'Lenovo', 'Asus', 'Logitech', 'JBL', 'Xiaomi', 'Generic'];

const DESCRIPTIONS = [
  'Reliable performance with modern design, built for everyday use.',
  'Energy efficient model offering great value and durability.',
  'Premium build quality with the latest technology inside.',
  'Compact and powerful — perfect for home or office use.',
  'Top-rated by customers for performance and after-sales support.'
];

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function buildProducts(): Product[] {
  const products: Product[] = [];
  let id = 1;
  const rand = seededRandom(42);

  CATEGORIES.forEach(cat => {
    cat.subCategories.forEach(sub => {
      const count = 3 + Math.floor(rand() * 3); // 3–5 products per sub-category
      for (let i = 0; i < count; i++) {
        const brand = BRANDS[Math.floor(rand() * BRANDS.length)];
        const price = 1200 + Math.floor(rand() * 180000);
        const discount = Math.floor(rand() * 5) === 0 ? 0 : [5, 10, 12, 15, 20, 25, 30][Math.floor(rand() * 7)];
        const stock = Math.floor(rand() * 45);
        const rating = Math.round((3 + rand() * 2) * 10) / 10;
        const daysAgo = Math.floor(rand() * 200);
        const createdAt = new Date(Date.now() - daysAgo * 86400000).toISOString();

        products.push({
          id: id++,
          name: `${brand} ${sub.name} ${String.fromCharCode(65 + i)}${100 + Math.floor(rand() * 800)}`,
          category: cat.slug,
          subCategory: sub.slug,
          brand,
          model: `${sub.slug.toUpperCase().slice(0, 3)}-${1000 + id}`,
          price,
          discount,
          stock,
          rating,
          image: sub.icon,
          description: DESCRIPTIONS[Math.floor(rand() * DESCRIPTIONS.length)],
          specifications: [
            { label: 'Brand', value: brand },
            { label: 'Category', value: sub.name },
            { label: 'Warranty', value: '1 Year Official Warranty' },
          ],
          features: ['High performance', 'Energy efficient', 'Durable build', '1 year warranty'],
          warranty: '1 Year Brand Warranty',
          isFeatured: rand() > 0.85,
          isOffer: discount > 0 && rand() > 0.5,
          createdAt,
          soldCount: Math.floor(rand() * 500)
        });
      }
    });
  });

  return products;
}

export const PRODUCTS: Product[] = buildProducts();
