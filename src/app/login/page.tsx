"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);

      const user = Object.fromEntries(formData.entries()) as {
        email: string;
        password: string;
      };

      const { error: signInError } = await authClient.signIn.email({
        email: user.email,
        password: user.password,
      });

      if (signInError) {
        const message = signInError.message || "Invalid email or password.";
        setError(message);
        toast.error(message);
        return;
      }

      toast.success("Welcome back!");

      // The proxy adds ?next= when it redirects unauthenticated users here.
      const next = new URLSearchParams(window.location.search).get("next");
      router.replace(next && next.startsWith("/") ? next : "/");
      router.refresh();
    } catch {
      toast.error("Could not sign in. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { error: socialError } = await authClient.signIn.social({
        provider: "google",
      });

      if (socialError) {
        toast.error(socialError.message || "Could not sign in with Google.");
      }
    } catch {
      toast.error("Could not sign in with Google. Please try again.");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-linear-to-br from-green-950 via-emerald-900 to-green-950 px-4 py-16">
      <div className="w-full max-w-md rounded-2xl border border-emerald-400/20 bg-white/10 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white">Welcome Back!</h1>

          <p className="mt-2 text-sm text-emerald-100/70">
            Login to continue your Book Nook journey
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-emerald-50"
            >
              Email Address
            </label>

            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              required
              className="w-full rounded-xl border border-emerald-300/20 bg-green-950/40 px-4 py-3 text-white outline-none transition placeholder:text-emerald-100/40 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20"
            />
          </div>

          {/* Password */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label
                htmlFor="password"
                className="text-sm font-medium text-emerald-50"
              >
                Password
              </label>

              <Link
                href="/forgot-password"
                className="text-xs font-medium text-emerald-300 transition hover:text-white"
              >
                Forgot Password?
              </Link>
            </div>

            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                required
                className="w-full rounded-xl border border-emerald-300/20 bg-green-950/40 px-4 py-3 pr-20 text-white outline-none transition placeholder:text-emerald-100/40 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-emerald-300 hover:text-white"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Login Error */}
          {error && (
            <p
              role="alert"
              className="rounded-xl border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm text-red-200"
            >
              {error}
            </p>
          )}

          {/* Login Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full cursor-pointer rounded-xl bg-emerald-500 py-3 font-semibold text-white shadow-lg shadow-emerald-950/30 transition hover:bg-emerald-400 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-4">
          <div className="h-px flex-1 bg-emerald-200/20" />
          <span className="text-xs text-emerald-100/50">OR CONTINUE WITH</span>
          <div className="h-px flex-1 bg-emerald-200/20" />
        </div>

        {/* Google Login */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="flex cursor-pointer w-full items-center justify-center gap-3 rounded-xl border border-emerald-200/20 bg-white/5 py-3 font-medium text-white transition hover:bg-white/10"
        >
          <FcGoogle className="h-5 w-5 shrink-0" />
          Continue with Google
        </button>

        {/* Register Link */}
        <p className="mt-8 text-center text-sm text-emerald-100/70">
          Don&apos;t have an account?{" "}
          <Link
            href="/registration"
            className="font-semibold cursor-pointer text-emerald-300 transition hover:text-white"
          >
            Register Now
          </Link>
        </p>
      </div>
    </section>
  );
}
