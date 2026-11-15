"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { authClient } from "@/lib/auth-client";

type NavbarUser = {
  name: string;
  email: string;
  image?: string | null;
};

const UserInformationPage = ({ user }: { user: NavbarUser }) => {
  const router = useRouter();

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const [signOutError, setSignOutError] = useState("");

  const initial = user.name?.trim().charAt(0).toUpperCase() || "U";
  const showImage = Boolean(user.image) && !imageFailed;

  // Close the dropdown on outside click or Escape.
  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleSignOut = async () => {
    try {
      setSignOutError("");
      setIsSigningOut(true);

      const { error } = await authClient.signOut();

      if (error) {
        setSignOutError(
          error.message || "Could not sign you out. Please try again.",
        );
        return;
      }

      setIsOpen(false);
      router.replace("/");
      router.refresh();
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    // User Profile Dropdown
    <div className="relative" ref={dropdownRef}>
      {/* Profile Toggle Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="User profile menu"
        className="flex items-center gap-2 rounded-xl p-1.5 transition-all duration-300 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/70"
      >
        {/* User Image */}
        <span className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-emerald-300/10 ring-2 ring-emerald-300/40">
          {showImage ? (
            <Image
              src={user.image as string}
              alt={user.name}
              width={40}
              height={40}
              unoptimized
              onError={() => setImageFailed(true)}
              className="size-full object-cover"
            />
          ) : (
            <span className="text-base font-bold text-emerald-200">
              {initial}
            </span>
          )}
        </span>

        {/* User Name */}
        <span className="hidden max-w-40 truncate text-[15px] font-medium text-emerald-50 sm:inline">
          {user.name}
        </span>

        {/* Dropdown Arrow */}
        <svg
          className={`h-3 w-3 text-emerald-200/70 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      <div
        className={`absolute right-0 top-full z-50 mt-3 w-67.5 max-w-[calc(100vw-2rem)] origin-top-right rounded-[18px] border border-emerald-200/15 bg-green-950/95 p-5 shadow-[0_18px_40px_rgba(2,44,34,0.45)] backdrop-blur-xl transition-all duration-200 ${
          isOpen
            ? "visible translate-y-0 scale-100 opacity-100"
            : "invisible -translate-y-2 scale-95 opacity-0"
        }`}
      >
        {/* User Information */}
        <div className="mb-4">
          <h3 className="text-[15px] font-semibold text-emerald-50">
            {user.name}
          </h3>

          <p className="mt-0.5 break-all text-[13px] text-emerald-100/60">
            {user.email}
          </p>
        </div>

        {/* My Profile */}
        <Link
          href="/profile"
          onClick={() => setIsOpen(false)}
          className="flex items-center gap-2 rounded-lg px-2 py-2 text-[14px] text-emerald-100/80 transition-colors duration-200 hover:bg-emerald-300/10 hover:text-emerald-300"
        >
          <svg
            className="h-4.5 w-4.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.7"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          My Profile
        </Link>

        {/* Divider */}
        <div className="my-2 border-t border-emerald-200/10" />

        {/* Sign Out */}
        <button
          type="button"
          onClick={handleSignOut}
          disabled={isSigningOut}
          className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-[14px] text-red-300 transition-colors duration-200 hover:bg-red-400/10 hover:text-red-200 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSigningOut ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-red-300 border-t-transparent" />
              Signing out...
            </>
          ) : (
            <>
              <svg
                className="h-4.5 w-4.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12H3m0 0l4-4m-4 4l4 4m5-12h5a2 2 0 012 2v12a2 2 0 01-2 2h-5"
                />
              </svg>
              Sign out
            </>
          )}
        </button>

        {signOutError && (
          <p role="alert" className="mt-2 text-xs text-red-300">
            {signOutError}
          </p>
        )}
      </div>
    </div>
  );
};

export default UserInformationPage;
