import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import { calculateOffers } from "../../utils/offers";

export const selectCartItems = (state: RootState) => state.cart.items;

export const selectBillSummary = createSelector(selectCartItems, (items) => {
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const appliedOffers = calculateOffers(items);
  const totalSavings = appliedOffers.reduce((sum, o) => sum + o.saving, 0);
  return {
    subtotal,
    appliedOffers,
    totalSavings,
    total: subtotal - totalSavings,
  };
});