import Link from "next/link";
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

const Marque = async () => {
    const res = await fetch(
        "https://api.abcz.workers.dev/api/bazardor/products"
    );

    if (!res.ok) {
        throw new Error("Failed to fetch Products");
    }

    const products = await res.json();

    return (
        <div className="bg-[#FAFCFA]">
            <div className="flex gap-8 overflow-x-auto px-4 py-3">
                <MarqueeText direction="right" duration={10}  pauseOnHover={true}>


                {products.map((product) => (
                    <Link
                    key={product.id}
                    href={`/products/${product.id}`}
                    className="flex shrink-0 items-center gap-2 mr-10"
                    >
                        <span>{product.image}</span>

                        <span>{product.nameBn}</span>

                        <span>
                            {product.today} টাকা/
                            {product.unit === "kg" ? "কেজি" : product.unit}
                        </span>

                        <span
                            className={
                                product.change.dir === "up"
                                ? "text-red-500"
                                : "text-green-500"
                            }
                            >
                            {product.change.dir === "up" ? "▲" : "▼"}{" "}
                            {product.change.pct}%
                        </span>
                    </Link>
                ))}
                </MarqueeText>

            </div>
        </div>
    );
};

export default Marque;