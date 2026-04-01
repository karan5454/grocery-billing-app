import type{ CartItem, AppliedOffer } from "../types";

export function calculateOffers(items: CartItem[]): AppliedOffer[] {
  const offers: AppliedOffer[] = [];
  const getQty = (id: string) =>
    items.find((i) => i.product.id === id)?.quantity ?? 0;

  // Offer 1: Buy 1 Cheese, get 2nd Cheese FREE (BOGOF)
  const cheeseQty = getQty("cheese");
  if (cheeseQty >= 2) {
    const freeCount = Math.floor(cheeseQty / 2);
    offers.push({
      description: `Cheese BOGOF — ${freeCount} free`,
      saving: freeCount * 90,
    });
  }

  // Offer 2: Buy Soup → half price Bread
  const soupQty = getQty("soup");
  const breadQty = getQty("bread");
  if (soupQty >= 1 && breadQty >= 1) {
    const discounted = Math.min(soupQty, breadQty);
    offers.push({
      description: `Soup deal — ${discounted} Bread at half price`,
      saving: discounted * Math.floor(110 / 2),
    });
  }

  // Offer 3: 1/3 off Butter
  const butterQty = getQty("butter");
  if (butterQty >= 1) {
    offers.push({
      description: `Butter — 1/3 off (×${butterQty})`,
      saving: butterQty * Math.floor(120 / 3),
    });
  }

  return offers;
}