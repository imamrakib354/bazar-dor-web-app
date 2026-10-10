
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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

  const [imageError, setImageError] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();

    setMessage("");
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    const formValues = Object.fromEntries(formData.entries());

    const name = formValues.name?.trim();

    if (!name) {
      setErrorMessage("নাম লিখুন।");
      return;
    }

    setIsUpdating(true);

    try {
      const { data, error } = await authClient.updateUser({
        name,
      });

      if (error) {
        setErrorMessage(
          error.message || "নাম আপডেট করা যায়নি।"
        );
        return;
      }

      if (data) {
        setMessage("নাম সফলভাবে আপডেট হয়েছে।");
        router.refresh();
      }
    } catch (error) {
      console.error("Profile update error:", error);
      setErrorMessage("সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSignOut = async () => {
    setErrorMessage("");
    setIsSigningOut(true);

    try {
      const { error } = await authClient.signOut();

      if (error) {
        setErrorMessage(
          error.message || "সাইন আউট করা যায়নি।"
        );
        return;
      }

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Sign out error:", error);
      setErrorMessage("সাইন আউট করা যায়নি।");
    } finally {
      setIsSigningOut(false);
    }
  };

  if (isPending) {
    return (
      <div className="mx-auto max-w-2xl p-8 text-center">
        প্রোফাইল লোড হচ্ছে...
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const firstLetter =
    user.name?.trim().charAt(0).toUpperCase() || "U";

  return (
    <section className="bg-[#F0F5F0] px-4 py-12">
      <div className="mx-auto max-w-2xl">

        <div className="mb-7">
          <h1 className="text-2xl font-bold text-[#1F2937]">
            আমার প্রোফাইল
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
          </p>
        </div>

        {/* User information */}
        <div className="mb-5 flex items-center justify-between gap-4 rounded-2xl border border-[#DFE7E0] bg-[#F8FAF9] p-5">

          <div className="flex min-w-0 items-center gap-4">

            {/* Profile image or fallback letter */}
            {user.image && !imageError ? (
              <img
                src={user.image}
                alt={user.name || "Profile image"}
                onError={() => setImageError(true)}
                className="h-16 w-16 shrink-0 rounded-xl object-cover"
              />
            ) : (
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-[#E2F2E7] text-2xl font-bold text-[#05893E]">
                {firstLetter}
              </div>
            )}

            <div className="min-w-0">
              <h2 className="truncate font-semibold text-[#1F2937]">
                {user.name}
              </h2>

              <p className="truncate text-sm text-gray-500">
                {user.email}
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={handleSignOut}
            disabled={isSigningOut}
            className="shrink-0 rounded-lg border border-red-500 px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-50 disabled:opacity-50"
          >
            {isSigningOut
              ? "অপেক্ষা করুন..."
              : "↪ সাইন আউট"}
          </button>

        </div>

        {/* Update user name */}
        <div className="rounded-2xl border border-[#DFE7E0] bg-[#F8FAF9] p-6">

          <h3 className="mb-6 font-semibold text-[#1F2937]">
            তথ্য
          </h3>

          <Form
            onSubmit={handleUpdate}
            validationBehavior="native"
            className="flex w-full flex-col gap-4"
          >
            <TextField
              key={user.name}
              name="name"
              isRequired
              defaultValue={user.name}
              className="flex w-full flex-col gap-1.5"
            >
              <Label className="text-sm font-medium text-[#1F2937]">
                নাম
              </Label>

              <Input
                className="h-11 w-full rounded-lg border border-[#DFE7E0] bg-[#F8FAF9] px-3 text-sm text-[#1F2937] outline-none focus:border-[#05893E] focus:ring-1 focus:ring-[#05893E]"
              />

              <FieldError className="text-xs text-red-600" />
            </TextField>

            {message && (
              <p role="status" className="text-sm text-green-700">
                {message}
              </p>
            )}

            {errorMessage && (
              <p role="alert" className="text-sm text-red-600">
                {errorMessage}
              </p>
            )}

            <Button
              type="submit"
              variant="primary"
              isDisabled={isUpdating}
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
