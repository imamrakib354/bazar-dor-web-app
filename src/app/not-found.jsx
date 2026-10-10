import Link from "next/link";

const NotFound = () => {
  return (
    <section className="flex min-h-[60vh] items-center justify-center bg-[#F0F5F0] px-4 py-16">

      <div className="mx-auto max-w-xl text-center">

        <h1 className="mb-4 text-6xl font-bold text-[#05893E] sm:text-7xl md:text-8xl">
          ৪০৪
        </h1>

        <h2 className="mb-3 text-xl font-bold text-[#1F2937] sm:text-2xl">
          কোনো তথ্য পাওয়া যায়নি
        </h2>

        <p className="mb-7 text-sm leading-7 text-gray-500 sm:text-base">
          আপনার খোঁজা পেজ বা পণ্যটি পাওয়া যায়নি।
        </p>

        <Link
          href="/"
          className="inline-flex min-h-11 items-center justify-center rounded-lg bg-[#05893E] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#047532] sm:text-base"
        >
          হোম পেজে ফিরে যান
        </Link>

      </div>
    </section>
  );
};

export default NotFound;
