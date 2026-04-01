import React from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectCartItems, selectBillSummary } from "../features/cart/cartSelectors";
import CartItem from "./CartItem";
import { clearCart } from "../features/cart/cartSlice";
import { saveOrderToFirestore } from "../firebase/saveOrder";

const fmt = (pence: number) => `£${(pence / 100).toFixed(2)}`;

const BillSummary: React.FC = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const { subtotal, appliedOffers, totalSavings, total } =
    useAppSelector(selectBillSummary);

  const handlePlaceOrder = async () => {
  await saveOrderToFirestore({
    items,
    subtotal,
    appliedOffers,
    totalSavings,
    total,
  });
  dispatch(clearCart());
  alert("Order placed and saved! ✅ Karan will be happy! 😄");
};

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow p-6 flex items-center justify-center min-h-64">
        <p className="text-gray-400 text-lg">Your basket is empty</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Basket</h2>
        <button
          onClick={() => dispatch(clearCart())}
          className="text-sm text-red-400 hover:text-red-600 transition"
        >
          Clear all
        </button>
      </div>

      <ul>
        {items.map((item) => (
          <CartItem key={item.product.id} item={item} />
        ))}
      </ul>
      

      {/* Special Offers Section */}
      {appliedOffers.length > 0 && (
        <div className="mt-4 bg-green-50 rounded-xl p-4">
          <p className="text-green-700 font-semibold text-sm mb-2">
            🎉 Special Offers Applied
          </p>
          {appliedOffers.map((offer, idx) => (
            <div key={idx} className="flex justify-between text-sm">
              <span className="text-gray-600">{offer.description}</span>
              <span className="text-red-500 font-medium">
                -{fmt(offer.saving)}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Totals */}
      <div className="mt-6 space-y-2 border-t border-gray-100 pt-4">
        <div className="flex justify-between text-gray-600">
          <span>Sub Total</span>
          <span>{fmt(subtotal)}</span>
        </div>
        {totalSavings > 0 && (
          <div className="flex justify-between text-red-500 font-medium">
            <span>Total Savings</span>
            <span>-{fmt(totalSavings)}</span>
          </div>
        )}
        <div className="flex justify-between text-xl font-bold text-gray-800 pt-2 border-t border-gray-200">
          <span>Total Amount</span>
          <span>{fmt(total)}</span>
        </div>
        <button
  onClick={handlePlaceOrder}
  className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl transition text-lg"
>
  Place Order 🛒
</button>
      </div>
    </div>
  );
};


export default BillSummary;