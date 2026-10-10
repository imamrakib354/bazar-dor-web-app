"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import {
  Form,
  TextField,
  Label,
  Input,
  FieldError,
  Button,
} from "@heroui/react";

import { authClient } from "@/lib/auth-client";

const ProfileContent = () => {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [failedImage, setFailedImage] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const imageFailed = failedImage === user?.image;
  const showImage = Boolean(user?.image) && !imageFailed;

  const firstLetter =
    user?.name?.trim().charAt(0).toUpperCase() || "U";

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const formValues = Object.fromEntries(formData.entries());

    const name = formValues.name?.trim();

    if (!name) {
      toast.error("নাম লিখুন।");
      return;
    }

    if (name === user.name) {
      toast("নাম পরিবর্তন করা হয়নি।");
      return;
    }

    setIsUpdating(true);

    try {
      const { data, error } = await authClient.updateUser({
        name,
      });

      if (error) {
        toast.error(error.message || "নাম আপডেট করা যায়নি।");
        return;
      }

      if (data) {
        toast.success("নাম সফলভাবে আপডেট হয়েছে।");
        router.refresh();
      }
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error("সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setIsUpdating(false);
    }
  };

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
      console.error("Sign out error:", error);
      toast.error("সাইন আউট করা যায়নি। আবার চেষ্টা করুন।");
    } finally {
      setIsSigningOut(false);
    }
  };

  if (isPending) {
    return (
      <section className="bg-[#F0F5F0] px-4 py-10">
        <div className="mx-auto max-w-2xl animate-pulse space-y-5">
          <div className="h-7 w-40 rounded bg-gray-200" />
          <div className="h-28 rounded-2xl bg-gray-200" />
          <div className="h-52 rounded-2xl bg-gray-200" />
        </div>
      </section>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <section className="bg-[#F0F5F0] px-4 py-8 sm:py-12">
      <div className="mx-auto max-w-2xl">

        {/* Page heading */}
        <div className="mb-6 sm:mb-7">
          <h1 className="text-xl font-bold text-[#1F2937] sm:text-2xl">
            আমার প্রোফাইল
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
          </p>
        </div>

        {/* User information */}
        <div className="mb-5 flex flex-col gap-4 rounded-2xl border border-[#DFE7E0] bg-[#F8FAF9] p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">

          <div className="flex min-w-0 items-center gap-3 sm:gap-4">

            {showImage ? (
              <img
                src={user.image}
                alt={user.name || "Profile image"}
                onError={() => setFailedImage(user.image)}
                className="h-14 w-14 shrink-0 rounded-xl object-cover sm:h-16 sm:w-16"
              />
            ) : (
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#E2F2E7] text-xl font-bold text-[#05893E] sm:h-16 sm:w-16 sm:text-2xl">
                {firstLetter}
              </div>
            )}

            <div className="min-w-0">
              <h2 className="truncate font-semibold text-[#1F2937]">
                {user.name}
              </h2>

              <p className="truncate text-xs text-gray-500 sm:text-sm">
                {user.email}
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={handleSignOut}
            disabled={isSigningOut}
            className="self-start rounded-lg border border-red-500 px-4 py-2 text-sm font-medium text-red-500 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50 sm:shrink-0 sm:self-auto"
          >
            {isSigningOut
              ? "অপেক্ষা করুন..."
              : "↪ সাইন আউট"}
          </button>
        </div>

        {/* Update information */}
        <div className="rounded-2xl border border-[#DFE7E0] bg-[#F8FAF9] p-4 sm:p-6">

          <h3 className="mb-5 font-semibold text-[#1F2937] sm:mb-6">
            তথ্য
          </h3>

          <Form
            onSubmit={handleUpdate}
            validationBehavior="native"
            className="flex w-full flex-col gap-4"
          >
            <TextField
              key={user.id + user.name}
              name="name"
              isRequired
              defaultValue={user.name}
              className="flex w-full flex-col gap-1.5"
            >
              <Label className="text-sm font-medium text-[#1F2937]">
                নাম
              </Label>

              <Input
                placeholder="আপনার নাম লিখুন"
                className="h-11 w-full rounded-lg border border-[#DFE7E0] bg-[#F8FAF9] px-3 text-sm text-[#1F2937] outline-none focus:border-[#05893E] focus:ring-1 focus:ring-[#05893E]"
              />

              <FieldError className="text-xs text-red-600" />
            </TextField>

            <Button
              type="submit"
              variant="primary"
              isDisabled={isUpdating || isSigningOut}
              className="h-11 w-full rounded-lg border-0 bg-[#05893E] font-medium text-white shadow-[0_4px_2px_0_#04753280] hover:bg-[#047532]"
            >
              {isUpdating ? "আপডেট হচ্ছে..." : "আপডেট"}
            </Button>
          </Form>

        </div>

      </div>
    </section>
  );
};

export default ProfileContent;
