
const ProductLoading = () => {
  return (
    <div className="mx-auto max-w-7xl animate-pulse px-4 py-8">

      <div className="mb-6 h-4 w-56 rounded bg-gray-200" />

      <div className="mb-6 flex flex-col justify-between gap-5 rounded-2xl bg-white p-6 sm:flex-row">
        <div className="flex items-center gap-4">
          <div className="h-20 w-20 rounded-xl bg-gray-200" />

          <div className="space-y-3">
            <div className="h-6 w-48 rounded bg-gray-200" />
            <div className="h-4 w-28 rounded bg-gray-200" />
            <div className="h-4 w-60 rounded bg-gray-200" />
          </div>
        </div>

        <div className="h-28 w-36 rounded-xl bg-gray-200" />
      </div>

      <div className="rounded-2xl bg-white p-6">
        <div className="mb-5 h-6 w-44 rounded bg-gray-200" />

        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-32 rounded-xl bg-gray-200"
            />
          ))}
        </div>

        <div className="mb-4 h-6 w-52 rounded bg-gray-200" />

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
  );
};

export default ProductLoading;
