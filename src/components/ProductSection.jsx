
import ProductCard from "./ProductCard";

const ProductSection = ({ title, subtitle, products, id }) => {
  return (
    <section id={id} className="mb-12">

      <div className="mb-5">
        <h2 className="flex items-center gap-2 text-xl font-bold text-[#1F2937]">
          {title}
        </h2>

        {subtitle && (
          <p className="mt-1 text-sm text-gray-500">
            {subtitle}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>

    </section>
  );
};

export default ProductSection;
