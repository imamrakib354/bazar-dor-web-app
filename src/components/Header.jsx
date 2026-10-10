import Image from "next/image";
import Link from "next/link";
import UserInfo from "./UserInfo";
import NavLinks from "./NavLinks";

const Header = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
    timeZone: "Asia/Dhaka",
  });

  return (
    <header className="bg-[#F8FAF9]">

      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-3 py-3 sm:gap-4 sm:px-4 sm:py-4">

        {/* Logo link */}
        <Link
          href="/"
          className="flex min-w-0 shrink items-center gap-2"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#05893E] sm:h-12 sm:w-12">
            <Image
              src="/logoIcon.png"
              alt="Bazar Dor Logo"
              width={40}
              height={40}
              className="h-auto w-8 object-contain sm:w-10"
              priority
            />
          </div>

          <div className="min-w-0">
            <h1 className="truncate text-sm font-bold text-[#1F2937] sm:text-base">
              বাজার দর
            </h1>

            <p className="max-w-40 truncate text-[10px] text-gray-500 sm:max-w-none sm:text-xs">
              {date}
            </p>
          </div>
        </Link>

        {/* Authentication controls */}
        <div className="min-w-0 shrink-0">
          <UserInfo />
        </div>

      </div>

      <NavLinks />

    </header>
  );
};

export default Header;
