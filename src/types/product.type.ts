export interface IProduct {
  _id: string;
  userId: string;
  businessId: string;
  stripeProductId?: string;
  stripePriceId?: string;
  name: string;
  price: number;
  category: {
    _id: string;
    name?: string;
  };
  sku?: string;
  quantity: number;
  minRestockLevel: number;
  description?: string;
  imageURLs?: string[];
  wareHouseAddress: {
    street?: string;
    zipcode?: string;
    city?: string;
    state: string;
    country: string;
  };
  hsCode: string;
  weight: number;
  length: number;
  width: number;
  height: number;
  createdAt: string;
  updatedAt: string;
}

export interface IProductInput {
  name?: string;
  price?: number;
  category?: string;
  sku?: string;
  quantity?: number;
  minRestockLevel?: number;
  description?: string;
  productImages?: File[];
  wareHouseAddress?: {
    street?: string;
    zipcode?: string;
    city?: string;
    state?: string;
    country?: string;
  };
  hsCode?: string;
  weight?: number;
  length?: number;
  width?: number;
  height?: number;
  stripeProductId?: string;
  stripePriceId?: string;
}

export interface BulkProductInput {
  userId: string;
  businessId: string;
  products: {
    name: string;
    price: number;
    categoryName: string;
    sku?: string;
    quantity: number;
    minRestockLevel?: number;
    description?: string;
    hsCode: string;
    weight: number;
    length: number;
    width: number;
    height: number;
    isStripe?: boolean; // optional flag if using Stripe
  }[];
}
