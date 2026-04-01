import React from "react";
import ProductList from "./components/ProductList";
import BillSummary from "./components/BillSummary";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">
          🛒 Grocery Billing App
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ProductList />
          <BillSummary />
        </div>
      </div>
    </div>
  );
};

export default App;