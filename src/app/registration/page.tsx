
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";

const RegisterPage = () => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const passwordRules = {
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    minLength: password.length >= 6,
  };

  const isPasswordValid =
    passwordRules.uppercase &&
    passwordRules.lowercase &&
    passwordRules.minLength;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isPasswordValid) {
      setPasswordError("Please enter a valid password.");
      return;
    }

    setPasswordError("");
    setSubmitError("");
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);

      const user = Object.fromEntries(formData.entries()) as {
        name: string;
        photoURL: string;
        email: string;
        password: string;
      };

      const { error } = await authClient.signUp.email({
        name: user.name,
        image: user.photoURL,
        email: user.email,
        password: user.password,
      });

      if (error) {
        setSubmitError(
          error.message || "Could not create your account. Please try again.",
        );
        return;
      }

      router.replace("/");
      router.refresh();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = () => {
    // Connect Google Authentication here.
    console.log("Google Login clicked");
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-linear-to-br from-green-950 via-emerald-950 to-green-900 px-4 py-28 sm:px-6">

      {/* Background Glow */}
      <div className="pointer-events-none absolute -left-40 top-20 size-96 rounded-full bg-emerald-400/10 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-32 size-96 rounded-full bg-green-400/10 blur-[120px]" />

      {/* Register Card */}
      <div className="relative w-full max-w-lg rounded-3xl border border-emerald-200/15 bg-emerald-900/30 p-6 shadow-[0_20px_60px_rgba(2,44,34,0.4)] backdrop-blur-2xl sm:p-9">

        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-2xl border border-emerald-200/20 bg-emerald-300/10 shadow-lg shadow-emerald-950/30">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="size-8 text-emerald-300"
            >
              <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v17H6.5A2.5 2.5 0 0 1 4 17.5z" />
              <path d="M4 17.5A2.5 2.5 0 0 1 6.5 15H20M8 7h8M8 10h6" />
            </svg>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Create Account
          </h1>

          <p className="mt-3 text-sm leading-6 text-emerald-100/60">
            Join Book Nook and start your reading journey today.
          </p>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Name */}
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-medium text-emerald-100">
              Full Name
            </label>

            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your full name"
              required
              autoComplete="name"
              className="w-full rounded-xl border border-emerald-200/15 bg-green-950/40 px-4 py-3 text-sm text-white outline-none placeholder:text-emerald-100/30 transition-all focus:border-emerald-300/60 focus:ring-2 focus:ring-emerald-300/10"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-emerald-100">
              Email Address
            </label>

            <input
              id="email"
              name="email"
              type="email"
              placeholder="example@email.com"
              required
              autoComplete="email"
              className="w-full rounded-xl border border-emerald-200/15 bg-green-950/40 px-4 py-3 text-sm text-white outline-none placeholder:text-emerald-100/30 transition-all focus:border-emerald-300/60 focus:ring-2 focus:ring-emerald-300/10"
            />
          </div>

          {/* Photo URL */}
          <div>
            <label htmlFor="photoURL" className="mb-2 block text-sm font-medium text-emerald-100">
              Photo URL
            </label>

            <input
              id="photoURL"
              name="photoURL"
              type="url"
              placeholder="https://example.com/photo.jpg"
              required
              className="w-full rounded-xl border border-emerald-200/15 bg-green-950/40 px-4 py-3 text-sm text-white outline-none placeholder:text-emerald-100/30 transition-all focus:border-emerald-300/60 focus:ring-2 focus:ring-emerald-300/10"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-medium text-emerald-100">
              Password
            </label>

            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a strong password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError("");
                }}
                required
                autoComplete="new-password"
                className={`w-full rounded-xl border bg-green-950/40 px-4 py-3 pr-12 text-sm text-white outline-none placeholder:text-emerald-100/30 transition-all focus:ring-2 focus:ring-emerald-300/10 ${
                  passwordError
                    ? "border-red-400/70 focus:border-red-400"
                    : "border-emerald-200/15 focus:border-emerald-300/60"
                }`}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-100/50 transition-colors hover:text-emerald-300"
              >
                {showPassword ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="size-5">
                    <path d="M3 3l18 18M10.6 10.6a2 2 0 0 0 2.8 2.8" />
                    <path d="M9.9 5.2A10.8 10.8 0 0 1 12 5c5 0 8.5 4.5 9.5 7-.5 1.2-1.3 2.4-2.3 3.4M6.2 6.2C3.9 7.7 2.7 9.7 2.5 12c1 2.5 4.5 7 9.5 7 1.5 0 2.9-.4 4.1-1.1" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="size-5">
                    <path d="M2.5 12s3.5-7 9.5-7 9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7Z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>

            {/* Password Validation */}
            <div className="mt-3 space-y-2">
              <p className="text-xs font-medium text-emerald-100/60">
                Password must contain:
              </p>

              {[
                {
                  label: "At least one uppercase letter (A-Z)",
                  valid: passwordRules.uppercase,
                },
                {
                  label: "At least one lowercase letter (a-z)",
                  valid: passwordRules.lowercase,
                },
                {
                  label: "At least 6 characters",
                  valid: passwordRules.minLength,
                },
              ].map((rule) => (
                <div key={rule.label} className="flex items-center gap-2">
                  <span className={rule.valid ? "text-emerald-300" : "text-emerald-100/35"}>
                    {rule.valid ? "✓" : "○"}
                  </span>
                  <span className={`text-xs ${rule.valid ? "text-emerald-300" : "text-emerald-100/45"}`}>
                    {rule.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Password Error */}
            {passwordError && (
              <p role="alert" className="mt-2 text-xs font-medium text-red-400">
                {passwordError}
              </p>
            )}
          </div>

          {/* Submit Error */}
          {submitError && (
            <p
              role="alert"
              className="rounded-xl border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm text-red-200"
            >
              {submitError}
            </p>
          )}

          {/* Register Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="group cursor-pointer flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-300 px-5 py-3.5 text-sm font-bold text-green-950 shadow-lg shadow-emerald-950/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-200 hover:shadow-emerald-300/20 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200 focus-visible:ring-offset-2 focus-visible:ring-offset-green-950 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
          >
            {isSubmitting ? "Creating Account..." : "Create Account"}

            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-4 transition-transform duration-200 group-hover:translate-x-1">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-4">
          <div className="h-px flex-1 bg-emerald-200/15" />
          <span className="text-xs text-emerald-100/40">OR CONTINUE WITH</span>
          <div className="h-px flex-1 bg-emerald-200/15" />
        </div>

        {/* Google Login */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="flex cursor-pointer w-full items-center justify-center gap-3 rounded-xl border border-emerald-200/20 bg-white/5 px-5 py-3 text-sm font-semibold text-emerald-50 transition-all duration-300 hover:border-emerald-200/40 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/50"
        >
          <FcGoogle className="h-5 w-5 shrink-0" />
          Continue with Google
        </button>

        {/* Login Link */}
        <div className="mt-7 border-t border-emerald-200/10 pt-6 text-center">
          <p className="text-sm text-emerald-100/60">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-bold cursor-pointer text-emerald-300 transition-colors hover:text-emerald-200"
            >
              Login Now
            </Link>
          </p>
        </div>

        {/* Bottom Text */}
        <p className="mt-5 text-center text-xs text-emerald-100/30">
          By creating an account, you agree to our Terms & Privacy Policy.
        </p>
      </div>
    </main>
  );
};

export default RegisterPage;
