import CategoryProducts from "@/components/CategoryProducts";
import { notFound } from "next/navigation";

const CategoryPage = async ({ params }) => {
  const { categoryId } = await params;

  const categoryRes = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/categories"
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
    `https://openapi.programming-hero.com/api/bazardor/products?category=${encodeURIComponent(categoryId)}`
  );

  if (!productRes.ok) {
    throw new Error("Failed to fetch category products");
  }

  const products = await productRes.json();

  if (!Array.isArray(products) || products.length === 0) {
    notFound();
  }

  return (
    <section className="bg-[#F0F5F0] px-4 py-6 sm:py-8">
      <div className="mx-auto max-w-7xl">

        <div className="mb-6 flex min-w-0 items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4 sm:gap-4 sm:p-6">

          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#F1F6F2] text-3xl sm:h-16 sm:w-16 sm:text-4xl">
            {category.icon}
          </div>

          <div className="min-w-0">
            <h1 className="text-xl font-bold text-[#1F2937] sm:text-2xl">
              {category.nameBn}
            </h1>

            <p className="mt-1 text-xs leading-6 text-gray-500 sm:text-sm">
              {products.length.toLocaleString("bn-BD")}টি পণ্যের
              আজকের দাম ও পরিবর্তন
            </p>
          </div>

        </div>

        <CategoryProducts products={products} />

      </div>
    </section>
  );
};

export default CategoryPage;
