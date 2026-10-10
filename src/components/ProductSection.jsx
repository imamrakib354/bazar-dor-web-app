import ProductCard from "./ProductCard";

const ProductSection = ({ title, subtitle, products, id }) => {
  return (
    <section id={id} className="mb-10 scroll-mt-6 sm:mb-12">

      <div className="mb-5">
        <h2 className="flex flex-wrap items-center gap-2 text-lg font-bold text-[#1F2937] sm:text-xl">
          {title}
        </h2>

        {subtitle && (
          <p className="mt-1 text-sm text-gray-500">
            {subtitle}
          </p>
        )}
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
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

    </section>
  );
};

export default ProductSection;
