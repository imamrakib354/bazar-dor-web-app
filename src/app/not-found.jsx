
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-7xl flex-col items-center justify-center px-4 text-center">

      <h1 className="mb-3 text-7xl font-bold text-[#05893E]">
        ৪০৪
      </h1>

      <h2 className="mb-3 text-2xl font-bold text-[#1F2937]">
        কোনো তথ্য পাওয়া যায়নি
      </h2>

      <p className="mb-6 text-gray-500">
        আপনার খোঁজা পেজ বা পণ্যটি পাওয়া যায়নি।
      </p>

      <Link
        href="/"
        className="rounded-lg bg-[#05893E] px-6 py-3 font-medium text-white transition-colors hover:bg-[#047532]"
      >
        হোম পেজে ফিরে যান
      </Link>

    </div>
  );
};

export default NotFound;
