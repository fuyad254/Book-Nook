"use client";

import { useState } from "react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    console.log({ email, password });

    // এখানে তোমার login authentication logic যুক্ত করবে
  };

  const handleGoogleLogin = () => {
    console.log("Google login clicked");

    // এখানে Google authentication যুক্ত করবে
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

          {/* Login Button */}
          <button
            type="submit"
            className="w-full rounded-xl bg-emerald-500 py-3 font-semibold text-white shadow-lg shadow-emerald-950/30 transition hover:bg-emerald-400 active:scale-[0.98]"
          >
            Login
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
          className="flex w-full items-center justify-center gap-3 rounded-xl border border-emerald-200/20 bg-white/5 py-3 font-medium text-white transition hover:bg-white/10"
        >
          <FcGoogle className="h-5 w-5 shrink-0"/>
          Continue with Google
        </button>

        {/* Register Link */}
        <p className="mt-8 text-center text-sm text-emerald-100/70">
          Don&apos;t have an account?{" "}
          <Link
            href="/registration"
            className="font-semibold text-emerald-300 transition hover:text-white"
          >
            Register Now
          </Link>
        </p>
      </div>
    </section>
  );
}
