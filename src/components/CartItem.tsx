import React from "react";
import type { CartItem as CartItemType } from "../types";
import { addToCart, removeFromCart } from "../features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectBillSummary } from "../features/cart/cartSelectors";

interface Props {
  item: CartItemType;
}

const fmt = (pence: number) => `£${(pence / 100).toFixed(2)}`;

const CartItem: React.FC<Props> = ({ item }) => {
  const dispatch = useAppDispatch();
  const { appliedOffers } = useAppSelector(selectBillSummary);

  const { product, quantity } = item;
  const lineTotal = product.price * quantity;

  // Find offer saving for this product
  const offerForItem = appliedOffers.find((o) =>
    o.description.toLowerCase().includes(product.name.toLowerCase())
  );

  const itemCost = lineTotal - (offerForItem?.saving ?? 0);

  return (
    <li className="py-4 border-b border-gray-100 last:border-0">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-semibold text-gray-800">{product.name}</p>
          <p className="text-sm text-gray-400">
            {fmt(product.price)} × {quantity} = {fmt(lineTotal)}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => dispatch(addToCart(product))}
            className="w-8 h-8 rounded-full bg-blue-500 hover:bg-blue-600 text-white font-bold transition"
          >
            +
          </button>
          <span className="w-6 text-center font-medium">{quantity}</span>
          <button
            onClick={() => dispatch(removeFromCart(product.id))}
            className="w-8 h-8 rounded-full border border-gray-300 hover:bg-gray-100 text-gray-600 font-bold transition"
          >
            −
          </button>
        </div>
      </div>

      {offerForItem && (
        <p className="text-sm text-red-500 mt-1 text-right">
          Savings {fmt(offerForItem.saving)}
        </p>
      )}
      <p className="text-sm text-gray-700 text-right mt-0.5">
        Item cost {fmt(itemCost)}
      </p>
    </li>
  );
};

export default CartItem;