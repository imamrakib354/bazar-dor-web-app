import CategoryProducts from "@/components/CategoryProducts";
import { notFound } from "next/navigation";

const CategoryPage = async ({ params }) => {
  const { categoryId } = await params;

  const categoryRes = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/categories"
  );

  if (!categoryRes.ok) {
    throw new Error("Failed to fetch categories");
  }

  const categories = await categoryRes.json();

  const category = categories.find(
    (item) => item.slug === categoryId
  );

  if (!category) {
    notFound();
  }

  const productRes = await fetch(
    `https://api.api-store.workers.dev/api/bazardor/products?category=${categoryId}`
  );

  if (!productRes.ok) {
    throw new Error("Failed to fetch category products");
  }

  const products = await productRes.json();

  if (!Array.isArray(products) || products.length === 0) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">

      <div className="mb-6 flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-6">

        <span className="text-4xl">
          {category.icon}
        </span>

        <div>
          <h1 className="text-2xl font-bold text-[#1F2937]">
            {category.nameBn}
          </h1>

          <p className="text-sm text-gray-500">
            {products.length.toLocaleString("bn-BD")}টি
            পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>

      </div>

      <CategoryProducts products={products} />

    </div>
  );
};

export default CategoryPage;
