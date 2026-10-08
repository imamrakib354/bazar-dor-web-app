import React from 'react';
import Link from "next/link";

const UserInfo = () => {
    return (
        <div className="flex items-center gap-4">
            <Link
                href="/signin"
                className="text-sm font-medium text-[#1F2937] hover:text-[#05893E]"
            >
                সাইন ইন
            </Link>

            <Link
                href="/signup"
                className="rounded-lg bg-[#05893E] px-4 py-2 text-sm font-medium text-white shadow-md hover:bg-[#047532]"
            >
                সাইন আপ
            </Link>
        </div>
    );
};

export default UserInfo;