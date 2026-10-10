const PriceSummary = ({ markets, unit }) => {
  const unitBn = {
    kg: "কেজি",
    liter: "লিটার",
    litre: "লিটার",
    dozen: "ডজন",
    piece: "পিস",
    pcs: "পিস",
  };

  const bnUnit = unitBn[unit] || unit;

  if (!markets || markets.length === 0) {
    return (
      <div className="mb-8">
        <h2 className="mb-4 text-lg font-bold text-[#1F2937] sm:text-xl">
          দামের সারসংক্ষেপ
        </h2>

        <p className="rounded-xl bg-[#FAFCFA] p-5 text-sm text-gray-500">
          বাজারের দামের তথ্য পাওয়া যায়নি।
        </p>
      </div>
    );
  }

  const minimumPrice = Math.min(
    ...markets.map((market) => market.min)
  );

  const maximumPrice = Math.max(
    ...markets.map((market) => market.max)
  );

  const totalMidpoints = markets.reduce((total, market) => {
    const midpoint = (market.min + market.max) / 2;
    return total + midpoint;
  }, 0);

  const averagePrice = totalMidpoints / markets.length;

  const priceCards = [
    {
      title: "সর্বনিম্ন দাম",
      price: minimumPrice,
      color: "text-green-600",
      description: "সব বাজারের মধ্যে সর্বনিম্ন",
    },
    {
      title: "সর্বোচ্চ দাম",
      price: maximumPrice,
      color: "text-red-600",
      description: "সব বাজারের মধ্যে সর্বোচ্চ",
    },
    {
      title: "গড় দাম",
      price: averagePrice,
      color: "text-[#1F2937]",
      description: "বাজারের দামের আনুমানিক গড়",
    },
  ];

  return (
    <div className="mb-8">

      <h2 className="mb-4 text-lg font-bold text-[#1F2937] sm:text-xl">
        দামের সারসংক্ষেপ
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {priceCards.map((item) => (
          <div
            key={item.title}
            className="min-w-0 rounded-xl border border-gray-200 bg-[#FAFCFA] p-4 sm:p-5"
          >
            <p className="text-sm text-gray-500">
              {item.title}
            </p>

            <p className={`mt-2 break-words text-xl font-bold sm:text-2xl ${item.color}`}>
              {item.price.toLocaleString("bn-BD", {
                maximumFractionDigits: 2,
              })} টাকা
            </p>

            <p className="mt-2 text-xs text-gray-500">
              {item.description} · প্রতি {bnUnit}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
};

export default PriceSummary;
