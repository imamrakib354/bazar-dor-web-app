"use client";

import { useState } from "react";
import ProductCard from "./ProductCard";

const CategoryProducts = ({ products }) => {
  const [sortBy, setSortBy] = useState("default");

  const sortedProducts = [...products];

  if (sortBy === "low") {
    sortedProducts.sort((a, b) => a.today - b.today);
  } else if (sortBy === "high") {
    sortedProducts.sort((a, b) => b.today - a.today);
  }

  return (
    <div className="min-w-0">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

        <p className="text-sm text-gray-500">
          মোট {products.length.toLocaleString("bn-BD")}টি পণ্য দেখানো হচ্ছে
        </p>

        <div className="flex min-w-0 items-center gap-2">
          <label
            htmlFor="product-sort"
            className="shrink-0 text-sm text-gray-500"
          >
            সাজান:
          </label>

          <select
            id="product-sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="min-w-0 max-w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-[#1F2937] outline-none focus:border-[#05893E] focus:ring-1 focus:ring-[#05893E]"
          >
            <option value="default">ডিফল্ট</option>
            <option value="low">দাম: কম থেকে বেশি</option>
            <option value="high">দাম: বেশি থেকে কম</option>
          </select>
        </div>

      </div>

      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-gray-200 bg-white px-4 py-10 text-center text-sm text-gray-500">
          কোনো পণ্য পাওয়া যায়নি।
        </div>
      )}
    </div>
  );
};

export default CategoryProducts;
