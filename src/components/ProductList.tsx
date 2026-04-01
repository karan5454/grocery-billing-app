import React from "react";
import { PRODUCTS } from "../data/products";
import { addToCart } from "../features/cart/cartSlice";
import { useAppDispatch } from "../app/hooks";

const fmt = (pence: number) => `£${(pence / 100).toFixed(2)}`;

const ProductList: React.FC = () => {
  const dispatch = useAppDispatch();

  return (
    <div className="bg-white rounded-2xl shadow p-6 h-fit">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Products</h2>
      <ul className="divide-y divide-gray-100">
        {PRODUCTS.map((product) => (
          <li
            key={product.id}
            className="flex items-center justify-between py-3"
          >
            <span className="text-gray-700 font-medium w-24">{product.name}</span>
            <span className="text-gray-500 w-16 text-right">
              {fmt(product.price)}
            </span>
            <button
              onClick={() => dispatch(addToCart(product))}
              className="ml-4 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold px-4 py-1.5 rounded-lg transition"
            >
              Add
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;