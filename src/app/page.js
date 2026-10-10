
import Banner from "@/components/Banner";
import Marque from "@/components/Marque";
import ProductSection from "@/components/ProductSection";

const Home = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch Products");
  }

  const products = await res.json();

  const risers = products
    .filter((product) => product.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const fallers = products
    .filter((product) => product.change.dir === "down")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  return (
    <>
      <Marque products={products} />

      <Banner />

      <div className="mx-auto max-w-7xl px-4 py-12">

        <ProductSection
          title={
            <>
              <span className="text-red-600">▲</span>
              <span>আজ দাম বেড়েছে</span>
            </>
          }
          products={risers}
        />

        <ProductSection
          title={
            <>
              <span className="text-green-600">▼</span>
              <span>আজ দাম কমেছে</span>
            </>
          }
          products={fallers}
        />

        <ProductSection
          title="সব পণ্য"
          subtitle="বাজারে পণ্যের দাম এক নজরে"
          products={products}
          id="সব-পণ্য"
        />

      </div>
    </>
  );
};

export default Home;
