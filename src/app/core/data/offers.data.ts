import { Offer } from '../models';

const now = new Date();
function daysFromNow(days: number): string {
  return new Date(now.getTime() + days * 86400000).toISOString();
}

export const OFFERS: Offer[] = [
  {
    id: 1,
    title: 'Independence Day Sale',
    description: 'Celebrate with up to 30% OFF on all LED & Smart TVs.',
    discount: 30,
    startDate: daysFromNow(-5),
    endDate: daysFromNow(10),
    image: 'bi-flag',
    category: 'television-display',
    isActive: true
  },
  {
    id: 2,
    title: 'Laptop Mega Sale',
    description: 'Flat 15% OFF on all Laptops and Gaming PCs this week.',
    discount: 15,
    startDate: daysFromNow(-2),
    endDate: daysFromNow(6),
    image: 'bi-laptop',
    category: 'computers',
    isActive: true
  },
  {
    id: 3,
    title: 'Weekend Flash Sale',
    description: 'Extra 10% OFF storewide, this weekend only.',
    discount: 10,
    startDate: daysFromNow(-1),
    endDate: daysFromNow(2),
    image: 'bi-lightning-charge',
    category: 'all',
    isActive: true
  },
  {
    id: 4,
    title: 'Eid Sale',
    description: 'Up to 25% OFF on Home Appliances.',
    discount: 25,
    startDate: daysFromNow(-60),
    endDate: daysFromNow(-30),
    image: 'bi-house-heart',
    category: 'home-appliances',
    isActive: false
  },
  {
    id: 5,
    title: 'New Product Launch — Accessories',
    description: 'Get 12% OFF on newly launched computer accessories.',
    discount: 12,
    startDate: daysFromNow(0),
    endDate: daysFromNow(15),
    image: 'bi-stars',
    category: 'computer-accessories',
    isActive: true
  }
];
