const MarketPriceTable = ({ markets }) => {
  if (!markets || markets.length === 0) {
    return (
      <div>
        <h2 className="mb-4 text-lg font-bold text-[#1F2937] sm:text-xl">
          বাজারভিত্তিক আজকের দাম
        </h2>

        <p className="rounded-xl border border-gray-200 bg-[#FAFCFA] p-5 text-sm text-gray-500">
          বাজারের তথ্য পাওয়া যায়নি।
        </p>
      </div>
    );
  }

  return (
    <div className="min-w-0">

      <h2 className="mb-4 text-lg font-bold text-[#1F2937] sm:text-xl">
        বাজারভিত্তিক আজকের দাম
      </h2>

      <div className="w-full max-w-full overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full min-w-[650px] border-collapse text-left text-sm">

          <thead className="bg-[#F1F6F2] text-gray-600">
            <tr>
              <th className="whitespace-nowrap px-4 py-3 font-medium">
                বাজার
              </th>

              <th className="whitespace-nowrap px-4 py-3 font-medium">
                বিভাগ
              </th>

              <th className="whitespace-nowrap px-4 py-3 text-right font-medium">
                সর্বনিম্ন
              </th>

              <th className="whitespace-nowrap px-4 py-3 text-right font-medium">
                সর্বোচ্চ
              </th>

              <th className="whitespace-nowrap px-4 py-3 text-right font-medium">
                গড়
              </th>
            </tr>
          </thead>

          <tbody>
            {markets.map((market, index) => {
              const average = (market.min + market.max) / 2;

              return (
                <tr
                  key={index}
                  className="border-t border-gray-200 even:bg-[#F8FAF9]"
                >
                  <td className="px-4 py-3 text-[#1F2937]">
                    {market.market}
                  </td>

                  <td className="whitespace-nowrap px-4 py-3 text-gray-600">
                    {market.division}
                  </td>

                  <td className="whitespace-nowrap px-4 py-3 text-right">
                    {market.min.toLocaleString("bn-BD")} টাকা
                  </td>

                  <td className="whitespace-nowrap px-4 py-3 text-right">
                    {market.max.toLocaleString("bn-BD")} টাকা
                  </td>

                  <td className="whitespace-nowrap px-4 py-3 text-right font-medium">
                    {average.toLocaleString("bn-BD", {
                      maximumFractionDigits: 2,
                    })} টাকা
                  </td>
                </tr>
              );
            })}
          </tbody>

        </table>
      </div>

      <p className="mt-2 text-xs text-gray-500 sm:hidden">
        সম্পূর্ণ বাজার তালিকা দেখতে টেবিলটি ডানে-বামে স্ক্রল করুন।
      </p>

    </div>
  );
};

export default MarketPriceTable;
