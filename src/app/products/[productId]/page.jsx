import { notFound, redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

import ProductSummary from "@/components/ProductSummary";
import PriceSummary from "@/components/PriceSummary";
import MarketPriceTable from "@/components/MarketPriceTable";

const ProductDetails = async ({ params }) => {
  // Check authentication before displaying product details
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin?reason=login-required");
  }

  // Get ID from /products/[productId]
  const { productId } = await params;

  const res = await fetch(
    `https://openapi.programming-hero.com/api/bazardor/products/${encodeURIComponent(productId)}`
  );

  if (res.status === 404) {
    notFound();
  }

  if (!res.ok) {
    throw new Error("Failed to fetch product details");
  }

  const product = await res.json();

  if (!product || !product.id) {
    notFound();
  }

  return (
    <div className="bg-[#F0F5F0] px-4 py-5 sm:py-8">
      <div className="mx-auto max-w-7xl">

        <ProductSummary product={product} />

        <div className="min-w-0 rounded-2xl border border-gray-200 bg-white p-4 sm:p-6">

          <PriceSummary
            markets={product.markets}
            unit={product.unit}
          />

          <MarketPriceTable markets={product.markets} />

        </div>

      </div>
    </div>
  );
};

export default ProductDetails;
