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
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">

        <Link
          href="/"
          className="flex items-center gap-2"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#05893E]">
            <Image
              src="/logoIcon.png"
              alt="Bazar Dor Logo"
              width={40}
              height={40}
              className="object-contain"
              priority
            />
          </div>

          <div>
            <h1 className="font-bold text-[#1F2937]">
              বাজার দর
            </h1>

            <p className="text-xs text-gray-500">
              {date}
            </p>
          </div>
        </Link>

        <UserInfo />
      </div>

      <NavLinks />
    </header>
  );
};

export default Header;
