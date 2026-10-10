import Link from "next/link";

const unitBn = {
  kg: "কেজি",
  liter: "লিটার",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
  pcs: "পিস",
};

const ProductSummary = ({ product }) => {
  const unit = unitBn[product.unit] || product.unit;

  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";

  const changeText = isUp
    ? "বেড়েছে"
    : isDown
      ? "কমেছে"
      : "অপরিবর্তিত রয়েছে";

  const priceDifference = Math.abs(product.today - product.yesterday);

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-gray-500">
        <Link href="/" className="hover:text-[#05893E]">
          হোম
        </Link>

        <span>›</span>

        <Link
          href={`/category/${product.category}`}
          className="hover:text-[#05893E]"
        >
          {product.categoryNameBn}
        </Link>

        <span>›</span>

        <span className="text-[#1F2937]">
          {product.nameBn}
        </span>
      </div>

      <div className="mb-6 flex flex-col gap-6 rounded-2xl border border-gray-200 bg-white p-6 sm:flex-row sm:items-center sm:justify-between">

        <div className="flex items-center gap-4">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-[#F1F6F2] text-4xl">
            {product.image}
          </div>

          <div>
            <h1 className="text-2xl font-bold text-[#1F2937]">
              {product.nameBn}
            </h1>

            <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-gray-500">
              <span>প্রতি {unit}</span>

              <span>·</span>

              <span>{product.categoryIcon} {product.categoryNameBn}</span>
            </div>

            <p className="mt-2 text-sm text-gray-500">
              গতকালের তুলনায় আজ দাম {changeText}
              {(isUp || isDown) && (
                <> · {priceDifference.toLocaleString("bn-BD")} টাকা</>
              )}
            </p>
          </div>
        </div>

        <div className="rounded-xl bg-[#F1F6F2] p-4 text-center sm:min-w-36">
          <p className="text-xs text-gray-500">
            আজকের দাম
          </p>

          <p className="mt-1 text-3xl font-bold text-[#1F2937]">
            {product.today.toLocaleString("bn-BD")}
          </p>

          <p className="text-xs text-gray-500">
            টাকা / {unit}
          </p>

          <p
            className={`mt-2 text-sm font-medium ${isUp
                ? "text-red-600"
                : isDown
                  ? "text-green-600"
                  : "text-gray-500"
              }`}
          >
            {isUp ? "▲" : isDown ? "▼" : "—"}{" "}
            {product.change.pct.toLocaleString("bn-BD")}%
          </p>
        </div>

      </div>
    </div>
  );
};

export default ProductSummary;
