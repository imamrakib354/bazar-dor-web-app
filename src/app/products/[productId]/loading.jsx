const ProductLoading = () => {
  return (
    <div className="bg-[#F0F5F0] px-4 py-5 sm:py-8">
      <div className="mx-auto max-w-7xl animate-pulse">

        {/* Breadcrumb */}
        <div className="mb-6 h-4 w-48 max-w-full rounded bg-gray-200 sm:w-56" />

        {/* Product summary */}
        <div className="mb-6 flex flex-col justify-between gap-5 rounded-2xl border border-gray-200 bg-white p-4 sm:flex-row sm:items-center sm:p-6">

          <div className="flex min-w-0 items-center gap-3 sm:gap-4">
            <div className="h-16 w-16 shrink-0 rounded-xl bg-gray-200 sm:h-20 sm:w-20" />

            <div className="min-w-0 flex-1 space-y-3">
              <div className="h-6 w-40 max-w-full rounded bg-gray-200 sm:w-48" />
              <div className="h-4 w-28 max-w-full rounded bg-gray-200" />
              <div className="h-4 w-52 max-w-full rounded bg-gray-200 sm:w-60" />
            </div>
          </div>

          <div className="h-28 w-full rounded-xl bg-gray-200 sm:w-36 sm:shrink-0" />
        </div>

        {/* Prices and market table */}
        <div className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-6">
          <div className="mb-5 h-6 w-44 max-w-full rounded bg-gray-200" />

          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-28 rounded-xl bg-gray-200 sm:h-32"
              />
            ))}
          </div>

          <div className="mb-4 h-6 w-52 max-w-full rounded bg-gray-200" />

          <div className="space-y-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-11 rounded bg-gray-200"
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductLoading;
