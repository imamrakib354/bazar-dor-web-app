
import Link from "next/link";

const ProductCard = ({ product }) => {
  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";

  const unitBn = {
    kg: "কেজি",
    liter: "লিটার",
    litre: "লিটার",
    dozen: "ডজন",
    piece: "পিস",
    pcs: "পিস",
  };

  return (
    <Link
      href={`/product/${product.id}`}
      className="block rounded-xl border border-gray-200 bg-white p-4 transition-all hover:-translate-y-1 hover:shadow-md"
    >
      <div className="mb-5 flex items-center gap-3">

        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#F1F6F2] text-2xl">
          {product.image}
        </div>

        <div>
          <h3 className="font-semibold text-[#1F2937]">
            {product.nameBn}
          </h3>

          <p className="text-xs text-gray-500">
            প্রতি {unitBn[product.unit] || product.unit}
          </p>
        </div>

      </div>

      <div className="flex items-end justify-between gap-2">

        <div>
          <p className="text-xs text-gray-500">
            আজকের দাম
          </p>

          <p className="text-lg font-bold text-[#1F2937]">
            {product.today.toLocaleString("bn-BD")} টাকা
          </p>
        </div>

        <span
          className={`rounded-full px-2 py-1 text-xs font-medium ${
            isUp
              ? "bg-red-50 text-red-600"
              : isDown
                ? "bg-green-50 text-green-600"
                : "bg-gray-100 text-gray-500"
          }`}
        >
          {isUp ? "▲" : isDown ? "▼" : "—"}{" "}
          {product.change.pct.toLocaleString("bn-BD")}%
        </span>

      </div>
    </Link>
  );
};

export default ProductCard;
