import { Injectable } from '@angular/core';

export interface Category {
  slug: string;
  name: string;
  icon: string;
}

export interface Item {
  id: number;
  name: string;
  category: string;
  brand: string;
  price: number;
  stock: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
}

@Injectable({ providedIn: 'root' })
export class DataService {

  categories: Category[] = [
    { slug: 'tv', name: 'TV', icon: 'bi-tv' },
    { slug: 'laptop', name: 'Laptop', icon: 'bi-laptop' },
    { slug: 'led', name: 'LED', icon: 'bi-lightbulb' },
    { slug: 'lcd', name: 'LCD', icon: 'bi-display' },
    { slug: 'fan', name: 'Fan', icon: 'bi-fan' },
    { slug: 'ac', name: 'AC', icon: 'bi-snow' },
    { slug: 'refrigerator', name: 'Refrigerator', icon: 'bi-box2' },
    { slug: 'washing-machine', name: 'Washing Machine', icon: 'bi-droplet' },
    { slug: 'microwave', name: 'Microwave', icon: 'bi-microwave' },
    { slug: 'iron', name: 'Iron', icon: 'bi-inboxes' },
    { slug: 'water-dispenser', name: 'Water Dispenser', icon: 'bi-cup-straw' },
    { slug: 'geyser', name: 'Geyser', icon: 'bi-thermometer-high' },
    { slug: 'heater', name: 'Heater', icon: 'bi-fire' },
    { slug: 'cooler', name: 'Cooler', icon: 'bi-wind' },
    { slug: 'mixer-grinder', name: 'Mixer Grinder', icon: 'bi-cup-hot' },
    { slug: 'vacuum-cleaner', name: 'Vacuum Cleaner', icon: 'bi-recycle' },
    { slug: 'sewing-machine', name: 'Sewing Machine', icon: 'bi-scissors' },
    { slug: 'ups', name: 'UPS', icon: 'bi-battery-charging' },
    { slug: 'inverter', name: 'Inverter', icon: 'bi-lightning-charge' },
    { slug: 'stabilizer', name: 'Stabilizer', icon: 'bi-plug' },
    { slug: 'extension-board', name: 'Extension Board', icon: 'bi-plug-fill' },
    { slug: 'wiring-cable', name: 'Wiring/Cable', icon: 'bi-usb-symbol' },
    { slug: 'switches-sockets', name: 'Switches & Sockets', icon: 'bi-toggle2-on' },
    { slug: 'mcb-breakers', name: 'MCB/Breakers', icon: 'bi-shield-slash' },
    { slug: 'bulbs-lights', name: 'Bulbs & Lights', icon: 'bi-lightbulb-fill' },
    { slug: 'speaker', name: 'Speaker', icon: 'bi-speaker' },
    { slug: 'cctv-camera', name: 'CCTV Camera', icon: 'bi-camera-video' },
    { slug: 'printer', name: 'Printer', icon: 'bi-printer' },
    { slug: 'router', name: 'Router', icon: 'bi-router' },
    { slug: 'other', name: 'Other', icon: 'bi-three-dots' },
  ];

  private brands = ['Samsung','LG','Sony','Haier','Dawlance','Orient','Philips','Anker','TP-Link','Generic'];

  items: Item[] = this.generateItems();

  private generateItems(): Item[] {
    const list: Item[] = [];
    let id = 1;
    this.categories.forEach((cat) => {
      const count = 2 + Math.floor(Math.random() * 2);
      for (let i = 0; i < count; i++) {
        const stock = Math.floor(Math.random() * 40);
        const status: Item['status'] = stock === 0 ? 'Out of Stock' : stock < 8 ? 'Low Stock' : 'In Stock';
        list.push({
          id: id++,
          name: `${cat.name} Model ${String.fromCharCode(65 + i)}`,
          category: cat.slug,
          brand: this.brands[Math.floor(Math.random() * this.brands.length)],
          price: 1500 + Math.floor(Math.random() * 150000),
          stock,
          status
        });
      }
    });
    return list;
  }

  getCategoryName(slug: string): string {
    return this.categories.find(c => c.slug === slug)?.name ?? slug;
  }

  getItemsByCategory(slug: string): Item[] {
    return this.items.filter(i => i.category === slug);
  }
}
