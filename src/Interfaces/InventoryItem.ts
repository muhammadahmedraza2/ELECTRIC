export interface InventoryItem {
  id: string;
  itemCode: string;
  itemName: string;
  category: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  minStockLevel: number;
  supplierName: string;
  purchaseDate: string;
  storageLocation: string;
  notes: string;
}

export interface CategoryNode {
  name: string;
  icon: string;
}

export const INVENTORY_CATEGORIES: CategoryNode[] = [
  { name: 'TV', icon: '📺' },
  { name: 'Laptop', icon: '💻' },
  { name: 'LED', icon: '💡' },
  { name: 'LCD', icon: '🖥️' },
  { name: 'Fan', icon: '🌀' },
  { name: 'AC', icon: '❄️' },
  { name: 'Refrigerator', icon: '🧊' },
  { name: 'Washing Machine', icon: '🌀' },
  { name: 'Microwave', icon: '🔲' },
  { name: 'Iron', icon: '🔥' },
  { name: 'Water Dispenser', icon: '🚰' },
  { name: 'Geyser', icon: '♨️' },
  { name: 'Heater', icon: '🔥' },
  { name: 'Cooler', icon: '🌬️' },
  { name: 'Mixer Grinder', icon: '🧉' },
  { name: 'Vacuum Cleaner', icon: '🧹' },
  { name: 'Sewing Machine', icon: '🧵' },
  { name: 'UPS', icon: '🔋' },
  { name: 'Inverter', icon: '🔌' },
  { name: 'Stabilizer', icon: '⚡' },
  { name: 'Extension Board', icon: '🔌' },
  { name: 'Wiring / Cable', icon: '🧵' },
  { name: 'Switches & Sockets', icon: '🔘' },
  { name: 'MCB / Breakers', icon: '🧯' },
  { name: 'Bulbs & Lights', icon: '💡' },
  { name: 'Speaker', icon: '🔊' },
  { name: 'CCTV Camera', icon: '📷' },
  { name: 'Printer', icon: '🖨️' },
  { name: 'Router', icon: '📶' },
  { name: 'Other', icon: '📦' }
];

export const INVENTORY_UNITS: string[] = ['pcs', 'set', 'box', 'meter', 'roll', 'kg', 'pair'];