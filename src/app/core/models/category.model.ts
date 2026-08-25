export interface SubCategory {
  slug: string;
  name: string;
  icon: string;
}

export interface Category {
  slug: string;
  name: string;
  icon: string;
  subCategories: SubCategory[];
}
