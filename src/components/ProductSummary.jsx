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

  const priceDifference = Math.abs(
    product.today - product.yesterday
  );

  return (
    <div>

      {/* Breadcrumb */}
      <div className="mb-5 flex flex-wrap items-center gap-2 text-xs text-gray-500 sm:mb-6 sm:text-sm">
        <Link
          href="/"
          className="hover:text-[#05893E]"
        >
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

        <span className="font-medium text-[#1F2937]">
          {product.nameBn}
        </span>
      </div>

      {/* Product information */}
      <div className="mb-6 flex min-w-0 flex-col gap-5 rounded-2xl border border-gray-200 bg-white p-4 sm:p-6 lg:flex-row lg:items-center lg:justify-between">

        <div className="flex min-w-0 items-start gap-3 sm:items-center sm:gap-4">

          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-[#F1F6F2] text-3xl sm:h-20 sm:w-20 sm:text-4xl">
            {product.image}
          </div>

          <div className="min-w-0">
            <h1 className="break-words text-xl font-bold text-[#1F2937] sm:text-2xl">
              {product.nameBn}
            </h1>

            <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-gray-500 sm:text-sm">
              <span>প্রতি {unit}</span>
              <span>·</span>
              <span>
                {product.categoryIcon} {product.categoryNameBn}
              </span>
            </div>

            <p className="mt-2 text-xs leading-6 text-gray-500 sm:text-sm">
              গতকালের তুলনায় আজ দাম {changeText}
              {(isUp || isDown) && (
                <>
                  {" "}· {priceDifference.toLocaleString("bn-BD")} টাকা
                </>
              )}
            </p>
          </div>
        </div>

        {/* Today's price */}
        <div className="rounded-xl bg-[#F1F6F2] p-4 text-center lg:min-w-36 lg:shrink-0">
          <p className="text-xs text-gray-500">
            আজকের দাম
          </p>

          <p className="mt-1 text-2xl font-bold text-[#1F2937] sm:text-3xl">
            {product.today.toLocaleString("bn-BD")}
          </p>

          <p className="text-xs text-gray-500">
            টাকা / {unit}
          </p>

          <p
            className={`mt-2 text-sm font-medium ${
              isUp
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
