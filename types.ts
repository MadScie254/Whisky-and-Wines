export interface User {
  id: string;
  email: string;
  name: string;
  role: 'buyer' | 'vendor' | 'admin';
}

export enum ProductType {
  WHISKY = 'whisky',
  WINE = 'wine',
  VODKA = 'vodka',
  CIGAR = 'cigar'
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  type: ProductType;
  origin_country: string;
  price_min: number;
  price_max: number;
  abv?: number;
  description: string;
  tasting_notes: string;
  image_url: string;
  affiliate_url: string;
  available: boolean;
}

export interface VaultItem {
  id: string;
  product: Product;
  acquired_price: number;
  acquired_at: string;
  tasting_note?: string;
  rating?: number;
}

export interface Event {
  id: string;
  title: string;
  venue: string;
  start_at: string;
  ticket_price: number;
  capacity: number;
}

export interface AuthResponse {
  access: string;
  refresh: string;
  user: User;
}