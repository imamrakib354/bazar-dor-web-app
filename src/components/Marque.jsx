
import Link from "next/link";
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

const Marque = ({ products }) => {

    return (
        <div className="bg-[#FAFCFA]">
            <div className="flex gap-8 overflow-x-auto px-4 py-3">
                <MarqueeText
                    direction="right"
                    duration={10}
                    pauseOnHover={true}
                >
                    {products.map((product) => (
                        <Link
                            key={product.id}
                            href={`/product/${product.id}`}
                            className="mr-10 flex shrink-0 items-center gap-2"
                        >
                            <span>{product.image}</span>

                            <span>{product.nameBn}</span>

                            <span>
                                {product.today.toLocaleString("bn-BD")} টাকা/
                                {product.unit === "kg" ? "কেজি" : product.unit}
                            </span>

                            <span
                                className={
                                    product.change.dir === "up"
                                        ? "text-red-500"
                                        : product.change.dir === "down"
                                            ? "text-green-500"
                                            : "text-gray-500"
                                }
                            >
                                {product.change.dir === "up"
                                    ? "▲"
                                    : product.change.dir === "down"
                                        ? "▼"
                                        : "—"}{" "}
                                {product.change.pct.toLocaleString("bn-BD")}%
                            </span>
                        </Link>
                    ))}
                </MarqueeText>
            </div>
        </div>
    );
};

export default Marque;
