export interface Product {
  id: string;
  name: string;
  price: number; // stored in pence
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface AppliedOffer {
  description: string;
  saving: number; // in pence
}

export interface BillSummary {
  subtotal: number;
  appliedOffers: AppliedOffer[];
  totalSavings: number;
  total: number;
}