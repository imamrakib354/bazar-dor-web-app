
import Image from "next/image";
import Link from "next/link";

const Banner = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
    timeZone: "Asia/Dhaka",
  });

  return (
    <section className="bg-[#F0F5F0] px-4 py-6 lg:py-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-between gap-8 rounded-[28px] border border-[#DDE5DD] bg-[#F8FAF9] px-6 py-8 lg:flex-row lg:px-10 lg:py-10">

          <div className="max-w-xl">
            <span className="inline-block rounded-full bg-[#E7F7EC] px-3 py-1 text-sm font-medium text-[#05893E]">
              {date}
            </span>

            <h1 className="mt-4 text-3xl font-bold leading-tight text-[#1F2937] md:text-4xl">
              আজকের বাজারের দাম এক নজরে
            </h1>

            <p className="mt-4 max-w-lg text-base leading-7 text-[#6B7280]">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
              বাজারভিত্তিক বিস্তারিত, দ্রুত, সর্বনিম্ন-সর্বাধিক
              এবং দামের পরিবর্তন এক জায়গায়।
            </p>

            <Link
              href="/#সব-পণ্য"
              className="btn mt-6 rounded-xl border-0 bg-[#05893E] px-6 text-white shadow-[0_5px_2px_0_#04753280] hover:bg-[#047532] hover:text-white"
            >
              সব পণ্য দেখুন
            </Link>
          </div>

          <div className="flex justify-center">
            <Image
              src="/bazar-hero.png"
              alt="Bazar Hero"
              width={320}
              height={220}
              className="h-auto w-55 md:w-70 lg:w-[320px]"
              priority
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Banner;
