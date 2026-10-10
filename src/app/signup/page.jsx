
"use client";

import { useState } from "react";
import Link from "next/link";
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

const SignUpPage = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    // Check confirmation password
    if (user.password !== user.confirmPassword) {
      setErrorMessage("পাসওয়ার্ড দুটি মিলছে না।");
      return;
    }

    // We don't send confirmation password to BetterAuth
    delete user.confirmPassword;

    // Prepare submitted information
    user.name = user.name.trim();
    user.email = user.email.trim();

    setIsLoading(true);

    try {
      const { data, error } = await authClient.signUp.email({
        ...user,
      });

      if (error) {
        setErrorMessage(
          error.message || "অ্যাকাউন্ট তৈরি করা যায়নি।"
        );
        return;
      }

      if (data) {
        router.push("/signin");
      }
    } catch (error) {
      console.error("Sign up failed:", error);
      setErrorMessage("সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass =
    "w-full h-11 rounded-lg border border-[#DFE7E0] bg-[#F8FAF9] px-3 text-sm text-[#1F2937] outline-none placeholder:text-gray-400 focus:border-[#05893E] focus:ring-1 focus:ring-[#05893E]";

  return (
    <section className="bg-[#F0F5F0] px-4 py-10">
      <div className="mx-auto max-w-md">

        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-[#1F2937]">
            অ্যাকাউন্ট তৈরি করুন
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
          </p>
        </div>

        <div className="rounded-2xl border border-[#DFE7E0] bg-[#F8FAF9] p-6">
          <Form
            onSubmit={handleSubmit}
            validationBehavior="native"
            className="flex w-full flex-col gap-4"
          >

            {/* Name */}
            <TextField
              isRequired
              name="name"
              className="flex w-full flex-col gap-1.5"
            >
              <Label className="text-sm font-medium text-[#1F2937]">
                নাম
              </Label>

              <Input
                placeholder="যেমন: রহিম উদ্দিন"
                className={inputClass}
              />

              <FieldError className="text-xs text-red-600" />
            </TextField>

            {/* Email */}
            <TextField
              isRequired
              type="email"
              name="email"
              className="flex w-full flex-col gap-1.5"
            >
              <Label className="text-sm font-medium text-[#1F2937]">
                ইমেইল
              </Label>

              <Input
                placeholder="you@example.com"
                className={inputClass}
              />

              <FieldError className="text-xs text-red-600" />
            </TextField>

            {/* Password */}
            <TextField
              isRequired
              type="password"
              name="password"
              minLength={8}
              className="flex w-full flex-col gap-1.5"
            >
              <Label className="text-sm font-medium text-[#1F2937]">
                পাসওয়ার্ড
              </Label>

              <Input
                placeholder="কমপক্ষে ৮ অক্ষর"
                className={inputClass}
              />

              <FieldError className="text-xs text-red-600" />
            </TextField>

            {/* Confirm Password */}
            <TextField
              isRequired
              type="password"
              name="confirmPassword"
              minLength={8}
              className="flex w-full flex-col gap-1.5"
            >
              <Label className="text-sm font-medium text-[#1F2937]">
                পাসওয়ার্ড নিশ্চিত করুন
              </Label>

              <Input
                placeholder="আবার লিখুন"
                className={inputClass}
              />

              <FieldError className="text-xs text-red-600" />
            </TextField>

            {errorMessage && (
              <p role="alert" className="text-sm text-red-600">
                {errorMessage}
              </p>
            )}

            <Button
              type="submit"
              variant="primary"
              isDisabled={isLoading}
              className="mt-1 h-11 w-full rounded-lg border-0 bg-[#05893E] font-medium text-white shadow-[0_4px_2px_0_#04753280] hover:bg-[#047532]"
            >
              {isLoading
                ? "অপেক্ষা করুন..."
                : "অ্যাকাউন্ট তৈরি করুন"}
            </Button>

          </Form>

          <p className="mt-6 text-center text-sm text-[#1F2937]">
            অ্যাকাউন্ট আছে?{" "}
            <Link
              href="/signin"
              className="font-medium text-[#05893E] hover:underline"
            >
              সাইন ইন করুন
            </Link>
          </p>
        </div>

        <div className="mt-7 text-center">
          <Link
            href="/"
            className="text-sm text-gray-500 hover:text-[#05893E]"
          >
            ← হোম পেজে ফিরে যান
          </Link>
        </div>

      </div>
    </section>
  );
};

export default SignUpPage;
