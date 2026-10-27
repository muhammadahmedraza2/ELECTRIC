import { BusinessTypeConfig } from '../models/business-type.model';

const commonRetailModules = ['Dashboard', 'Products & Inventory', 'Sales / POS', 'Purchases', 'Suppliers', 'Customers', 'Orders', 'Invoices', 'Accounts', 'Expenses', 'Reports', 'Settings'];
const retailFields = [
  { key: 'brand', label: 'Brand' },
  { key: 'sku', label: 'SKU / Barcode' },
  { key: 'unit', label: 'Unit' },
  { key: 'stock', label: 'Stock quantity' },
  { key: 'price', label: 'Purchase and sale price' }
];

export const BUSINESS_TYPES: BusinessTypeConfig[] = [
  {
    id: 'pharmacy', name: 'Pharmacy', icon: 'bi-capsule', group: 'Specialty',
    description: 'Medicine inventory with batch tracking, expiry alerts and prescription controls.',
    modules: [...commonRetailModules, 'Expiry & Batch Tracking', 'Prescription Records'],
    productFields: [...retailFields, { key: 'batchNo', label: 'Batch number' }, { key: 'expiryDate', label: 'Expiry date' }, { key: 'salt', label: 'Salt / formula' }, { key: 'drugLicense', label: 'Drug license' }, { key: 'prescriptionRequired', label: 'Prescription required' }],
    categories: ['Prescription medicine', 'OTC medicine', 'Vitamins & supplements', 'Personal care', 'Medical devices'],
    defaultTheme: { primaryColor: '#16845b', surfaceTone: '#edf7f1' },
    sampleProducts: [
      { id: 'pharm-001', name: 'Paracetamol 500mg', category: 'Prescription medicine', stock: 120, attributes: { batchNo: 'PCM-2411', expiryDate: 'Nov 2027', salt: 'Paracetamol', drugLicense: 'DRAP-2048', prescriptionRequired: 'No' } },
      { id: 'pharm-002', name: 'Vitamin D3 Capsules', category: 'Vitamins & supplements', stock: 48, attributes: { batchNo: 'VD3-0826', expiryDate: 'Aug 2027', salt: 'Cholecalciferol', drugLicense: 'DRAP-1932', prescriptionRequired: 'No' } },
      { id: 'pharm-003', name: 'Blood Pressure Monitor', category: 'Medical devices', stock: 12, attributes: { batchNo: 'BPM-761', expiryDate: 'N/A', salt: 'N/A', drugLicense: 'MD-7781', prescriptionRequired: 'No' } }
    ]
  },
  {
    id: 'dairy', name: 'Milk / Dairy', icon: 'bi-cup-straw', group: 'Food & Fresh',
    description: 'Track dairy products by volume, freshness, expiry and daily delivery.',
    modules: [...commonRetailModules, 'Freshness & Expiry', 'Daily Deliveries'],
    productFields: [...retailFields.filter(field => field.key !== 'unit'), { key: 'unit', label: 'Unit (litre, ml, pack)' }, { key: 'ratePerUnit', label: 'Rate per unit' }, { key: 'freshnessDate', label: 'Freshness date' }, { key: 'expiryDate', label: 'Expiry date' }, { key: 'supplierBatch', label: 'Supplier batch' }],
    categories: ['Fresh milk', 'Yogurt', 'Butter & cream', 'Cheese', 'Milk products'],
    defaultTheme: { primaryColor: '#087e8b', surfaceTone: '#eaf7f7' },
    sampleProducts: [
      { id: 'dairy-001', name: 'Farm Fresh Whole Milk', category: 'Fresh milk', stock: 34, attributes: { unit: '1 litre', ratePerUnit: 'Rs 270 / litre', freshnessDate: 'Today', expiryDate: '3 days', supplierBatch: 'MILK-1027' } },
      { id: 'dairy-002', name: 'Plain Greek Yogurt', category: 'Yogurt', stock: 18, attributes: { unit: '500 ml', ratePerUnit: 'Rs 420 / pack', freshnessDate: 'Today', expiryDate: '6 days', supplierBatch: 'YOG-1026' } },
      { id: 'dairy-003', name: 'Salted Farm Butter', category: 'Butter & cream', stock: 9, attributes: { unit: '200 g', ratePerUnit: 'Rs 390 / pack', freshnessDate: 'Yesterday', expiryDate: '18 days', supplierBatch: 'BUT-1019' } }
    ]
  },
  {
    id: 'hardware', name: 'Hardware', icon: 'bi-tools', group: 'Specialty',
    description: 'Organize hardware stock by brand, dimensions, specification and unit.',
    modules: [...commonRetailModules, 'Stock by Unit', 'Barcode Labels'],
    productFields: [...retailFields, { key: 'size', label: 'Size / specification' }, { key: 'unit', label: 'Unit (piece, metre, box)' }, { key: 'material', label: 'Material' }],
    categories: ['Tools', 'Fasteners', 'Paint & supplies', 'Plumbing', 'Building materials'],
    defaultTheme: { primaryColor: '#a66b00', surfaceTone: '#fbf4e8' }
  },
  {
    id: 'cosmetics', name: 'Cosmetics', icon: 'bi-magic', group: 'Retail',
    description: 'Manage beauty products with brand, shade, skin type and batch details.',
    modules: [...commonRetailModules, 'Variants & Shades', 'Batch Tracking'],
    productFields: [...retailFields, { key: 'shade', label: 'Shade / color' }, { key: 'skinType', label: 'Skin type' }, { key: 'expiryDate', label: 'Expiry date' }],
    categories: ['Skincare', 'Makeup', 'Hair care', 'Fragrance', 'Tools & accessories'],
    defaultTheme: { primaryColor: '#b23a68', surfaceTone: '#faedf2' }
  },
  {
    id: 'garments', name: 'Garments / Abaya', icon: 'bi-handbag', group: 'Retail',
    description: 'Manage clothing variants by size, color, fabric and design.',
    modules: [...commonRetailModules, 'Size & Color Variants', 'Variant Stock'],
    productFields: [...retailFields, { key: 'size', label: 'Size' }, { key: 'color', label: 'Color' }, { key: 'fabric', label: 'Fabric' }, { key: 'design', label: 'Design / style' }, { key: 'variantStock', label: 'Stock by variant' }],
    categories: ['Abaya', 'Burkha', 'Clothes', 'Hijab', 'Accessories'],
    defaultTheme: { primaryColor: '#53616c', surfaceTone: '#f0f3f5' },
    sampleProducts: [
      { id: 'gar-001', name: 'Nida Classic Open Abaya', category: 'Abaya', stock: 18, attributes: { size: 'M, L, XL', color: 'Black', fabric: 'Premium Nida', design: 'Open front, minimal trim', variantStock: 'M: 6 / L: 8 / XL: 4' } },
      { id: 'gar-002', name: 'Embroidered Occasion Burkha', category: 'Burkha', stock: 11, attributes: { size: 'S, M, L', color: 'Deep Navy', fabric: 'Chiffon blend', design: 'Embroidered cuffs', variantStock: 'S: 2 / M: 5 / L: 4' } },
      { id: 'gar-003', name: 'Everyday Cotton Hijab', category: 'Hijab', stock: 32, attributes: { size: 'Free size', color: 'Stone, Black, Olive', fabric: 'Soft cotton voile', design: 'Plain', variantStock: 'Stone: 12 / Black: 14 / Olive: 6' } }
    ]
  },
  {
    id: 'bakery', name: 'Bakery', icon: 'bi-cake2', group: 'Food & Fresh',
    description: 'Keep recipes, ingredients, baked weights and short shelf-life in view.',
    modules: [...commonRetailModules, 'Recipe & Ingredients', 'Freshness & Expiry'],
    productFields: [...retailFields, { key: 'ingredients', label: 'Ingredients' }, { key: 'weight', label: 'Weight' }, { key: 'expiryDate', label: 'Expiry date' }, { key: 'madeAt', label: 'Baked at' }],
    categories: ['Bread', 'Cakes', 'Pastries', 'Biscuits', 'Snacks'],
    defaultTheme: { primaryColor: '#c45435', surfaceTone: '#fbf0ec' }
  },
  {
    id: 'vegetables', name: 'Vegetables', icon: 'bi-flower1', group: 'Food & Fresh',
    description: 'Sell fresh produce by weight with daily rates and freshness tracking.',
    modules: [...commonRetailModules, 'Weight-based Pricing', 'Freshness Tracking'],
    productFields: [...retailFields, { key: 'weightUnit', label: 'Weight unit (kg, g)' }, { key: 'ratePerUnit', label: 'Rate per unit' }, { key: 'freshnessDate', label: 'Freshness date' }, { key: 'origin', label: 'Farm / origin' }],
    categories: ['Leafy greens', 'Root vegetables', 'Seasonal vegetables', 'Herbs', 'Organic'],
    defaultTheme: { primaryColor: '#16845b', surfaceTone: '#edf7f1' }
  },
  {
    id: 'fruits', name: 'Fruits', icon: 'bi-apple', group: 'Food & Fresh',
    description: 'Handle fresh fruit by weight, grade, origin and freshness date.',
    modules: [...commonRetailModules, 'Weight-based Pricing', 'Freshness Tracking'],
    productFields: [...retailFields, { key: 'weightUnit', label: 'Weight unit (kg, g)' }, { key: 'ratePerUnit', label: 'Rate per unit' }, { key: 'freshnessDate', label: 'Freshness date' }, { key: 'grade', label: 'Grade / quality' }, { key: 'origin', label: 'Origin' }],
    categories: ['Citrus', 'Tropical fruits', 'Berries', 'Seasonal fruits', 'Dried fruits'],
    defaultTheme: { primaryColor: '#c45435', surfaceTone: '#fbf0ec' }
  },
  {
    id: 'bookshop', name: 'Bookshop', icon: 'bi-book', group: 'Specialty',
    description: 'Catalog books by author, ISBN, publisher and edition.',
    modules: [...commonRetailModules, 'ISBN Lookup', 'Author & Publisher Catalog'],
    productFields: [...retailFields, { key: 'author', label: 'Author' }, { key: 'isbn', label: 'ISBN' }, { key: 'publisher', label: 'Publisher' }, { key: 'edition', label: 'Edition' }],
    categories: ['Fiction', 'Education', 'Children', 'Business', 'Stationery'],
    defaultTheme: { primaryColor: '#1769aa', surfaceTone: '#edf4fa' }
  },
  {
    id: 'electric', name: 'Electric', icon: 'bi-lightning-charge', group: 'Specialty',
    description: 'Track electrical goods by brand, technical specification and unit.',
    modules: [...commonRetailModules, 'Technical Specifications', 'Barcode Labels'],
    productFields: [...retailFields.filter(field => field.key !== 'brand' && field.key !== 'unit'), { key: 'brand', label: 'Brand' }, { key: 'specification', label: 'Electrical specification' }, { key: 'unit', label: 'Unit' }, { key: 'warranty', label: 'Warranty' }],
    categories: ['Wires & cables', 'Switches', 'Lighting', 'Circuit protection', 'Accessories'],
    defaultTheme: { primaryColor: '#a66b00', surfaceTone: '#fbf4e8' }
  },
  {
    id: 'electronics', name: 'Electronics', icon: 'bi-cpu', group: 'Retail',
    description: 'Manage serialized devices, warranty coverage, brand and model.',
    modules: [...commonRetailModules, 'IMEI / Serial Tracking', 'Warranty Tracking'],
    productFields: [...retailFields.filter(field => field.key !== 'brand'), { key: 'serialNumber', label: 'IMEI / serial number' }, { key: 'warranty', label: 'Warranty period' }, { key: 'brand', label: 'Brand' }, { key: 'model', label: 'Model' }],
    categories: ['Mobiles', 'Computers', 'Home appliances', 'Audio & video', 'Accessories'],
    defaultTheme: { primaryColor: '#1769aa', surfaceTone: '#edf4fa' }
  },
  {
    id: 'grocery', name: 'Grocery', icon: 'bi-basket2', group: 'Retail',
    description: 'General store inventory with flexible units, brands and reorder levels.',
    modules: [...commonRetailModules, 'Low Stock Alerts', 'Barcode Labels'],
    productFields: [...retailFields, { key: 'packSize', label: 'Pack size' }, { key: 'expiryDate', label: 'Expiry date' }, { key: 'reorderLevel', label: 'Reorder level' }],
    categories: ['Staples', 'Snacks', 'Beverages', 'Household', 'Personal care'],
    defaultTheme: { primaryColor: '#087e8b', surfaceTone: '#eaf7f7' }
  },
  {
    id: 'sanitary', name: 'Sanitary', icon: 'bi-droplet-half', group: 'Specialty',
    description: 'Track sanitary goods with brand, size, material and unit details.',
    modules: [...commonRetailModules, 'Specification Catalog', 'Stock by Unit'],
    productFields: [...retailFields, { key: 'size', label: 'Size / specification' }, { key: 'material', label: 'Material' }, { key: 'unit', label: 'Unit' }],
    categories: ['Pipes & fittings', 'Faucets', 'Bathroom fixtures', 'Water systems', 'Accessories'],
    defaultTheme: { primaryColor: '#087e8b', surfaceTone: '#eaf7f7' }
  },
  {
    id: 'mobile', name: 'Mobile', icon: 'bi-phone', group: 'Retail',
    description: 'Track each phone by IMEI, serial number, model and warranty.',
    modules: [...commonRetailModules, 'IMEI Tracking', 'Warranty Tracking'],
    productFields: [...retailFields.filter(field => field.key !== 'brand'), { key: 'imei', label: 'IMEI number' }, { key: 'serialNumber', label: 'Serial number' }, { key: 'brand', label: 'Brand' }, { key: 'model', label: 'Model' }, { key: 'warranty', label: 'Warranty' }],
    categories: ['Smartphones', 'Feature phones', 'Chargers', 'Cases & covers', 'Wearables'],
    defaultTheme: { primaryColor: '#1769aa', surfaceTone: '#edf4fa' }
  },
  {
    id: 'shoes', name: 'Shoes', icon: 'bi-universal-access', group: 'Retail',
    description: 'Manage footwear stock by size, color, material and style.',
    modules: [...commonRetailModules, 'Size & Color Variants', 'Variant Stock'],
    productFields: [...retailFields, { key: 'size', label: 'Shoe size' }, { key: 'color', label: 'Color' }, { key: 'material', label: 'Material' }, { key: 'style', label: 'Style' }, { key: 'variantStock', label: 'Stock by variant' }],
    categories: ['Men', 'Women', 'Children', 'Sports', 'Sandals'],
    defaultTheme: { primaryColor: '#53616c', surfaceTone: '#f0f3f5' }
  },
  {
    id: 'meat', name: 'Meat', icon: 'bi-box2-heart', group: 'Food & Fresh',
    description: 'Sell by weight with cut, freshness, storage and expiry details.',
    modules: [...commonRetailModules, 'Weight-based Pricing', 'Freshness & Expiry'],
    productFields: [...retailFields, { key: 'weightUnit', label: 'Weight unit (kg, g)' }, { key: 'ratePerUnit', label: 'Rate per unit' }, { key: 'cut', label: 'Cut / type' }, { key: 'freshnessDate', label: 'Freshness date' }, { key: 'expiryDate', label: 'Expiry date' }],
    categories: ['Beef', 'Mutton', 'Chicken', 'Fish', 'Prepared cuts'],
    defaultTheme: { primaryColor: '#b23a48', surfaceTone: '#faeef0' }
  }
];