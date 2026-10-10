import Image from "next/image";
import Link from "next/link";

const Banner = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
    timeZone: "Asia/Dhaka",
  });

  return (
    <section className="bg-[#F0F5F0] px-4 py-5 sm:py-6 lg:py-8">
      <div className="mx-auto max-w-7xl">

        <div className="flex flex-col items-center justify-between gap-7 rounded-[24px] border border-[#DDE5DD] bg-[#F8FAF9] px-5 py-7 sm:gap-8 sm:rounded-[28px] sm:px-8 sm:py-9 lg:flex-row lg:px-10 lg:py-10">

          {/* Banner information */}
          <div className="w-full min-w-0 max-w-xl text-center lg:text-left">

            <span className="inline-block max-w-full rounded-full bg-[#E7F7EC] px-3 py-1 text-xs font-medium text-[#05893E] sm:text-sm">
              {date}
            </span>

            <h1 className="mt-4 text-2xl font-bold leading-snug text-[#1F2937] sm:text-3xl md:text-4xl">
              আজকের বাজারের দাম এক নজরে
            </h1>

            <p className="mt-4 max-w-lg text-sm leading-7 text-[#6B7280] sm:text-base">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
              বাজারভিত্তিক বিস্তারিত, দ্রুত, সর্বনিম্ন-সর্বাধিক
              এবং দামের পরিবর্তন এক জায়গায়।
            </p>

            <Link
              href="/#সব-পণ্য"
              className="btn btn-sm mt-6 rounded-xl border-0 bg-[#05893E] px-5 text-white shadow-[0_5px_2px_0_#04753280] hover:bg-[#047532] hover:text-white sm:btn-md sm:px-6"
            >
              সব পণ্য দেখুন
            </Link>
          </div>

          {/* Banner image */}
          <div className="flex w-full shrink-0 justify-center lg:w-auto">
            <Image
              src="/bazar-hero.png"
              alt="Bazar Hero"
              width={320}
              height={220}
              className="h-auto w-44 object-contain sm:w-60 lg:w-[320px]"
              priority
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Banner;
