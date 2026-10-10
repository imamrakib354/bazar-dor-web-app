
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

const SignInPage = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    user.email = user.email.trim();

    setIsLoading(true);

    try {
      const { data, error } = await authClient.signIn.email({
        ...user,
      });

      if (error) {
        setErrorMessage(
          error.message || "ইমেইল বা পাসওয়ার্ড সঠিক নয়।"
        );
        return;
      }

      if (data) {
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      console.error("Sign in failed:", error);
      setErrorMessage(
        "সাইন ইন করা যায়নি। আবার চেষ্টা করুন।"
      );
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
            সাইন ইন
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল
            দেখতে অ্যাকাউন্টে ঢুকুন।
          </p>
        </div>

        <div className="rounded-2xl border border-[#DFE7E0] bg-[#F8FAF9] p-6">
          <Form
            onSubmit={handleSubmit}
            validationBehavior="native"
            className="flex w-full flex-col gap-4"
          >

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
              className="flex w-full flex-col gap-1.5"
            >
              <Label className="text-sm font-medium text-[#1F2937]">
                পাসওয়ার্ড
              </Label>

              <Input
                placeholder="আপনার পাসওয়ার্ড লিখুন"
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
              {isLoading ? "সাইন ইন হচ্ছে..." : "সাইন ইন"}
            </Button>

          </Form>

          <p className="mt-6 text-center text-sm text-[#1F2937]">
            অ্যাকাউন্ট নেই?{" "}
            <Link
              href="/signup"
              className="font-medium text-[#05893E] hover:underline"
            >
              সাইন আপ করুন
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

export default SignInPage;
