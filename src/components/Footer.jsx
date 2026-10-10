const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-[#F8FAF9]">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-center text-xs text-[#6B7280] sm:flex-row sm:gap-6 sm:py-4 sm:text-left sm:text-sm lg:text-base">

        <p>
          বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </p>

        <p className="sm:text-right">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </p>

      </div>
    </footer>
  );
};

export default Footer;
