
const CategoryLoading = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 animate-pulse">

      <div className="mb-6 flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-6">
        <div className="h-12 w-12 rounded-lg bg-gray-200" />

        <div className="space-y-3">
          <div className="h-6 w-28 rounded bg-gray-200" />
          <div className="h-4 w-52 rounded bg-gray-200" />
        </div>
      </div>

      <div className="mb-5 flex items-center justify-between gap-3">
        <div className="h-4 w-40 rounded bg-gray-200" />
        <div className="h-10 w-36 rounded-lg bg-gray-200" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="rounded-xl border border-gray-200 bg-white p-4"
          >
            <div className="mb-5 flex items-center gap-3">
              <div className="h-12 w-12 rounded-lg bg-gray-200" />

              <div className="space-y-2">
                <div className="h-4 w-32 rounded bg-gray-200" />
                <div className="h-3 w-20 rounded bg-gray-200" />
              </div>
            </div>

            <div className="flex items-end justify-between">
              <div className="space-y-2">
                <div className="h-3 w-20 rounded bg-gray-200" />
                <div className="h-5 w-28 rounded bg-gray-200" />
              </div>

              <div className="h-6 w-16 rounded-full bg-gray-200" />
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default CategoryLoading;
