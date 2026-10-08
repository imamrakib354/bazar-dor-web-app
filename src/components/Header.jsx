
'use client';

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
        <div className="bg-[#F8FAF9]">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">

                <div className="flex items-center gap-2">
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
                        <h1 className="text-lg font-bold text-[#1F2937]">
                            বাজার দর
                        </h1>
                        <p className="text-xs text-gray-500">
                            {date}
                        </p>
                    </div>
                </div>

                <UserInfo />

            </div>

            <NavLinks />

        </div>
    );
};

export default Header;
