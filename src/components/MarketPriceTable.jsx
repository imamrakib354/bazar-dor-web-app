const MarketPriceTable = ({ markets }) => {
  return (
    <div>
      <h2 className="mb-4 text-xl font-bold text-[#1F2937]">
        বাজারভিত্তিক আজকের দাম
      </h2>

      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full min-w-162.5 border-collapse text-left text-sm">

          <thead className="bg-[#F1F6F2] text-gray-600">
            <tr>
              <th className="px-4 py-3 font-medium">বাজার</th>
              <th className="px-4 py-3 font-medium">বিভাগ</th>
              <th className="px-4 py-3 text-right font-medium">
                সর্বনিম্ন
              </th>
              <th className="px-4 py-3 text-right font-medium">
                সর্বোচ্চ
              </th>
              <th className="px-4 py-3 text-right font-medium">
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
                  <td className="px-4 py-3">
                    {market.market}
                  </td>

                  <td className="px-4 py-3">
                    {market.division}
                  </td>

                  <td className="px-4 py-3 text-right">
                    {market.min.toLocaleString("bn-BD")} টাকা
                  </td>

                  <td className="px-4 py-3 text-right">
                    {market.max.toLocaleString("bn-BD")} টাকা
                  </td>

                  <td className="px-4 py-3 text-right font-medium">
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
    </div>
  );
};

export default MarketPriceTable;
