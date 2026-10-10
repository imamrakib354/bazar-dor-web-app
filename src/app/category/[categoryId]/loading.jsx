const CategoryLoading = () => {
  return (
    <section className="bg-[#F0F5F0] px-4 py-6 sm:py-8">
      <div className="mx-auto max-w-7xl animate-pulse">

        {/* Category heading */}
        <div className="mb-6 flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4 sm:gap-4 sm:p-6">

          <div className="h-14 w-14 shrink-0 rounded-xl bg-gray-200 sm:h-16 sm:w-16" />

          <div className="min-w-0 flex-1 space-y-3">
            <div className="h-6 w-28 max-w-full rounded bg-gray-200" />
            <div className="h-4 w-52 max-w-full rounded bg-gray-200" />
          </div>
        </div>

        {/* Product count and sorting */}
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="h-4 w-40 rounded bg-gray-200" />

          <div className="h-10 w-44 max-w-full rounded-lg bg-gray-200" />
        </div>

        {/* Product cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="min-w-0 rounded-xl border border-gray-200 bg-white p-4"
            >
              <div className="mb-5 flex items-center gap-3">
                <div className="h-12 w-12 shrink-0 rounded-lg bg-gray-200" />

                <div className="min-w-0 flex-1 space-y-2">
                  <div className="h-4 w-32 max-w-full rounded bg-gray-200" />
                  <div className="h-3 w-20 rounded bg-gray-200" />
                </div>
              </div>

              <div className="flex items-end justify-between gap-3">
                <div className="space-y-2">
                  <div className="h-3 w-20 rounded bg-gray-200" />
                  <div className="h-5 w-28 rounded bg-gray-200" />
                </div>

                <div className="h-6 w-16 shrink-0 rounded-full bg-gray-200" />
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default CategoryLoading;
