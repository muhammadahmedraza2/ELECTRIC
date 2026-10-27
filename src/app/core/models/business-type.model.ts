export interface BusinessProductField {
  key: string;
  label: string;
  example?: string;
}

export interface BusinessTheme {
  primaryColor: string;
  surfaceTone: string;
}

export interface BusinessTypeConfig {
  id: string;
  name: string;
  icon: string;
  description: string;
  group: 'Retail' | 'Food & Fresh' | 'Specialty';
  modules: string[];
  productFields: BusinessProductField[];
  categories: string[];
  defaultTheme: BusinessTheme;
}