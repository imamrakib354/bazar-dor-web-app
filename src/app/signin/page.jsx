"use client";

import { useEffect, useState } from "react";
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

import { Eye, EyeOff } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

const SignInPage = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [isSocialLoading, setIsSocialLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const url = new URL(window.location.href);

    const reason = url.searchParams.get("reason");
    const error = url.searchParams.get("error");

    if (reason === "login-required") {
      toast("বিস্তারিত দেখতে আগে সাইন ইন করুন।", {
        id: "login-required",
        icon: "🔒",
      });
    }

    if (error) {
      if (error === "account_not_linked") {
        toast.error(
          "এই ইমেইলে আগে থেকেই অ্যাকাউন্ট আছে। পূর্বের পদ্ধতিতে সাইন ইন করুন।",
          { id: "oauth-error" }
        );
      } else {
        toast.error(
          "Google/GitHub সাইন ইন ব্যর্থ হয়েছে। আবার চেষ্টা করুন।",
          { id: "oauth-error" }
        );
      }
    }

    if (reason || error) {
      url.searchParams.delete("reason");
      url.searchParams.delete("error");

      window.history.replaceState(
        window.history.state,
        "",
        url.pathname + url.search + url.hash
      );
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    user.email = user.email.trim();

    if (!user.email || !user.password) {
      toast.error("ইমেইল ও পাসওয়ার্ড লিখুন।");
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await authClient.signIn.email({
        ...user,
      });

      if (error) {
        toast.error(
          error.message || "ইমেইল বা পাসওয়ার্ড সঠিক নয়।"
        );
        return;
      }

      if (data) {
        toast.success("সফলভাবে সাইন ইন হয়েছে।");

        router.push("/");
        router.refresh();
      }
    } catch (error) {
      console.error("Sign in failed:", error);
      toast.error("সাইন ইন করা যায়নি। আবার চেষ্টা করুন।");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignIn = async (provider) => {
    setIsSocialLoading(true);

    try {
      const { error } = await authClient.signIn.social({
        provider,
        callbackURL: "/",
        errorCallbackURL: "/signin",
      });

      if (error) {
        toast.error(
          error.message || `${provider} দিয়ে সাইন ইন করা যায়নি।`
        );
      }
    } catch (error) {
      console.error("Social authentication error:", error);
      toast.error("সোশ্যাল সাইন ইন ব্যর্থ হয়েছে।");
    } finally {
      setIsSocialLoading(false);
    }
  };

  const inputClass =
    "w-full h-11 rounded-lg border border-[#DFE7E0] bg-[#F8FAF9] px-3 text-sm text-[#1F2937] outline-none placeholder:text-gray-400 focus:border-[#05893E] focus:ring-1 focus:ring-[#05893E]";

  return (
    <section className="bg-[#F0F5F0] px-4 py-8 sm:py-10">
      <div className="mx-auto w-full max-w-md">

        <div className="mb-6 text-center">
          <h1 className="text-xl font-bold text-[#1F2937] sm:text-2xl">
            সাইন ইন
          </h1>

          <p className="mt-1 text-sm leading-6 text-gray-500">
            বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল
            দেখতে অ্যাকাউন্টে ঢুকুন।
          </p>
        </div>

        <div className="rounded-2xl border border-[#DFE7E0] bg-[#F8FAF9] p-4 sm:p-6">

          <Form
            onSubmit={handleSubmit}
            validationBehavior="native"
            className="flex w-full flex-col gap-4"
          >

            {/* Email */}
            <TextField
              isRequired
              name="email"
              type="email"
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
              name="password"
              className="relative flex w-full flex-col gap-1.5"
            >
              <Label className="text-sm font-medium text-[#1F2937]">
                পাসওয়ার্ড
              </Label>

              <Input
                type={showPassword ? "text" : "password"}
                placeholder="আপনার পাসওয়ার্ড লিখুন"
                className={`${inputClass} pr-11`}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={
                  showPassword
                    ? "পাসওয়ার্ড লুকান"
                    : "পাসওয়ার্ড দেখুন"
                }
                className="absolute right-3 top-9 z-10 text-gray-500 hover:text-[#05893E]"
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>

              <FieldError className="text-xs text-red-600" />
            </TextField>

            <Button
              type="submit"
              variant="primary"
              isDisabled={isLoading || isSocialLoading}
              className="mt-1 h-11 w-full rounded-lg border-0 bg-[#05893E] font-medium text-white shadow-[0_4px_2px_0_#04753280] hover:bg-[#047532]"
            >
              {isLoading ? "সাইন ইন হচ্ছে..." : "সাইন ইন"}
            </Button>

          </Form>

          {/* Divider */}
          <div className="my-5 flex items-center gap-4">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-xs text-gray-500">
              অথবা
            </span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          {/* Social authentication */}
          <div className="grid grid-cols-1 gap-2 min-[380px]:grid-cols-2">

            <button
              type="button"
              onClick={() => handleSocialSignIn("google")}
              disabled={isLoading || isSocialLoading}
              className="flex min-h-11 items-center justify-center gap-2 rounded-lg border border-[#DFE7E0] bg-[#F8FAF9] px-2 py-2 text-xs font-medium text-[#1F2937] hover:bg-gray-100 disabled:opacity-50"
            >
              <svg
                viewBox="0 0 48 48"
                className="h-5 w-5 shrink-0"
                aria-hidden="true"
              >
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 5.38 6.51 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.27 5.48-4.78 7.18l7.73 6C44.4 38.03 46.98 31.87 46.98 24.55z" />
                <path fill="#FBBC05" d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.6.28-3.14.77-4.59l-7.98-6.2A23.84 23.84 0 0 0 0 24c0 3.87.93 7.51 2.56 10.78l7.97-6.19z" />
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.91-5.8l-7.73-6c-2.15 1.45-4.92 2.3-8.18 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.97 6.19C6.51 42.62 14.62 48 24 48z" />
              </svg>

              <span>Google দিয়ে চালিয়ে যান</span>
            </button>

            <button
              type="button"
              onClick={() => handleSocialSignIn("github")}
              disabled={isLoading || isSocialLoading}
              className="flex min-h-11 items-center justify-center gap-2 rounded-lg border border-[#DFE7E0] bg-[#F8FAF9] px-2 py-2 text-xs font-medium text-[#1F2937] hover:bg-gray-100 disabled:opacity-50"
            >
              <FaGithub size={18} className="shrink-0" />

              <span>GitHub দিয়ে চালিয়ে যান</span>
            </button>

          </div>

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
