const Loading = () => {
  return (
    <div className="animate-pulse bg-[#F0F5F0]">

      {/* Marquee skeleton */}
      <div className="overflow-hidden bg-[#FAFCFA] px-4 py-4">
        <div className="mx-auto flex max-w-7xl gap-6">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="h-4 w-36 shrink-0 rounded bg-gray-200"
            />
          ))}
        </div>
      </div>

      {/* Banner skeleton */}
      <div className="mx-auto max-w-7xl px-4 py-6 lg:py-8">
        <div className="flex flex-col items-center justify-between gap-8 rounded-[28px] border border-[#DDE5DD] bg-[#F8FAF9] px-5 py-8 sm:px-8 lg:flex-row lg:px-10 lg:py-10">

          <div className="w-full max-w-xl space-y-5">
            <div className="h-7 w-48 max-w-full rounded-full bg-gray-200" />

            <div className="h-9 w-4/5 rounded bg-gray-200" />

            <div className="space-y-2">
              <div className="h-4 w-full rounded bg-gray-200" />
              <div className="h-4 w-11/12 rounded bg-gray-200" />
              <div className="h-4 w-3/4 rounded bg-gray-200" />
            </div>

            <div className="h-11 w-36 rounded-xl bg-gray-200" />
          </div>

          <div className="h-44 w-44 shrink-0 rounded-2xl bg-gray-200 sm:h-52 sm:w-52 lg:h-56 lg:w-72" />

        </div>
      </div>

      {/* Product sections skeleton */}
      <div className="mx-auto max-w-7xl space-y-12 px-4 py-8">

        {Array.from({ length: 3 }).map((_, sectionIndex) => (
          <section key={sectionIndex}>
            <div className="mb-5 h-7 w-44 rounded bg-gray-200" />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

              {Array.from({ length: 6 }).map((_, cardIndex) => (
                <div
                  key={cardIndex}
                  className="rounded-xl border border-gray-200 bg-white p-4"
                >
                  <div className="mb-6 flex items-center gap-3">
                    <div className="h-12 w-12 shrink-0 rounded-lg bg-gray-200" />

                    <div className="flex-1 space-y-2">
                      <div className="h-4 w-28 rounded bg-gray-200" />
                      <div className="h-3 w-20 rounded bg-gray-200" />
                    </div>
                  </div>

                  <div className="flex items-end justify-between gap-3">
                    <div className="space-y-2">
                      <div className="h-3 w-20 rounded bg-gray-200" />
                      <div className="h-6 w-28 rounded bg-gray-200" />
                    </div>

                    <div className="h-6 w-16 rounded-full bg-gray-200" />
                  </div>
                </div>
              ))}

            </div>
          </section>
        ))}

      </div>
    </div>
  );
};

export default Loading;
