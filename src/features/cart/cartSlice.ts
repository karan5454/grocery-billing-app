import { createSlice } from "@reduxjs/toolkit";
import type { CartItem, Product } from "../../types";
import type { PayloadAction } from "@reduxjs/toolkit";

interface CartState {
  items: CartItem[];
}

const initialState: CartState = { items: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Product>) {
      const existing = state.items.find(
        (i) => i.product.id === action.payload.id
      );
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ product: action.payload, quantity: 1 });
      }
    },

    removeFromCart(state, action: PayloadAction<string>) {
      const existing = state.items.find(
        (i) => i.product.id === action.payload
      );
      if (!existing) return;
      if (existing.quantity > 1) {
        existing.quantity -= 1;
      } else {
        state.items = state.items.filter(
          (i) => i.product.id !== action.payload
        );
      }
    },

    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;