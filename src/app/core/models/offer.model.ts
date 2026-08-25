export interface Offer {
  id: number;
  title: string;
  description: string;
  discount: number;
  startDate: string;
  endDate: string;
  image: string; // icon class
  category: string;
  isActive: boolean;
}

export function isOfferCurrentlyActive(offer: Offer): boolean {
  const now = new Date().getTime();
  const start = new Date(offer.startDate).getTime();
  const end = new Date(offer.endDate).getTime();
  return offer.isActive && now >= start && now <= end;
}
