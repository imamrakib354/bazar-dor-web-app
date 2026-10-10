"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Dropdown } from "@heroui/react";
import { ChevronDown, LogOut, UserRound } from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

const UserInfo = () => {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const [failedImage, setFailedImage] = useState(null);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const user = session?.user;

  const imageFailed = failedImage === user?.image;
  const showImage = Boolean(user?.image) && !imageFailed;

  const firstLetter =
    user?.name?.trim().charAt(0).toUpperCase() || "U";

  const handleSignOut = async () => {
    setIsSigningOut(true);

    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error(error.message || "সাইন আউট করা যায়নি।");
        return;
      }

      toast.success("সফলভাবে সাইন আউট হয়েছে।");

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Sign out failed:", error);
      toast.error("সাইন আউট করা যায়নি। আবার চেষ্টা করুন।");
    } finally {
      setIsSigningOut(false);
    }
  };

  if (isPending) {
    return (
      <div className="h-9 w-16 animate-pulse rounded-lg bg-gray-200 sm:w-24" />
    );
  }

  if (!user) {
    return (
      <div className="flex shrink-0 items-center gap-2 text-xs sm:gap-3 sm:text-sm">
        <Link
          href="/signin"
          className="whitespace-nowrap font-medium text-[#1F2937] hover:text-[#05893E]"
        >
          সাইন ইন
        </Link>

        <Link
          href="/signup"
          className="whitespace-nowrap rounded-lg bg-[#05893E] px-3 py-2 font-medium text-white hover:bg-[#047532] sm:px-4"
        >
          সাইন আপ
        </Link>
      </div>
    );
  }

  return (
    <Dropdown>
      <Dropdown.Trigger className="flex max-w-full items-center gap-1.5 rounded-lg bg-transparent px-1 py-1 sm:gap-2 sm:px-2">
        {showImage ? (
          <img
            src={user.image}
            alt={user.name || "User"}
            onError={() => setFailedImage(user.image)}
            className="h-8 w-8 shrink-0 rounded-full object-cover sm:h-9 sm:w-9"
          />
        ) : (
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E2F2E7] font-semibold text-[#05893E] sm:h-9 sm:w-9">
            {firstLetter}
          </span>
        )}

        <span className="hidden max-w-24 truncate text-sm font-medium text-[#1F2937] sm:inline md:max-w-28">
          {user.name}
        </span>

        <ChevronDown size={14} className="shrink-0 text-[#374151]" />
      </Dropdown.Trigger>

      <Dropdown.Popover
        placement="bottom end"
        className="w-60 max-w-[calc(100vw-24px)] rounded-xl border border-gray-200 bg-white p-2 shadow-lg sm:w-64"
      >
        <div className="border-b border-gray-100 px-3 py-2">
          <p className="truncate text-sm font-semibold text-[#1F2937]">
            {user.name}
          </p>

          <p className="truncate text-xs text-gray-500">
            {user.email}
          </p>
        </div>

        <Dropdown.Menu
          className="flex flex-col gap-1 p-1"
          onAction={(key) => {
            if (key === "profile") {
              router.push("/profile");
            }

            if (key === "signout" && !isSigningOut) {
              handleSignOut();
            }
          }}
        >
          <Dropdown.Item
            id="profile"
            textValue="আমার প্রোফাইল"
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-[#1F2937] hover:bg-gray-100"
          >
            <UserRound size={16} className="shrink-0" />
            <span>আমার প্রোফাইল</span>
          </Dropdown.Item>

          <Dropdown.Item
            id="signout"
            textValue="সাইন আউট"
            isDisabled={isSigningOut}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50"
          >
            <LogOut size={16} className="shrink-0" />
            <span>
              {isSigningOut ? "অপেক্ষা করুন..." : "সাইন আউট"}
            </span>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
};

export default UserInfo;
