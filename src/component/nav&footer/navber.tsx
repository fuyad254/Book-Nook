"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "@/assets/logo.png";

const links = [
  { label: "Home", href: "/" },
  { label: "All Books", href: "/allbooks" },
  { label: "Add Book", href: "/addbook" },
  { label: "My Books", href: "/mybooks" },
  { label: "My Borrows", href: "/myborrows" },
];

const isActive = (pathname: string, href: string) =>
  href === "/"
    ? pathname === "/"
    : pathname === href || pathname.startsWith(`${href}/`);

const Navbar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-emerald-200/15 bg-linear-to-r from-green-950/85 via-emerald-900/70 to-green-950/85 shadow-[0_8px_32px_rgba(2,44,34,0.35)] backdrop-blur-xl backdrop-saturate-150">
      <nav
        aria-label="Main navigation"
        className="container mx-auto flex h-16 items-center justify-between gap-4 px-4 sm:px-6 md:h-20 lg:px-8"
      >
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <Image
            src={logo}
            width={60}
            height={60}
            alt="Book Nook"
            priority
            className="h-12 w-12 object-contain drop-shadow-[0_2px_10px_rgba(167,243,208,0.25)]"
          />

          <div className="flex h-12 flex-col justify-center text-emerald-50">
            <span className="text-base font-bold leading-tight tracking-wider">
              BOOK
            </span>
            <span className="text-base font-bold leading-tight tracking-wider">
              NOOK
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden items-center gap-1 md:flex">
          {links.map((link) => {
            const active = isActive(pathname, link.href);

            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                    active
                      ? "bg-emerald-300/15 text-emerald-50"
                      : "text-emerald-100/75 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {link.label}

                  {active && (
                    <span className="absolute inset-x-4 -bottom-px h-px bg-linear-to-r from-transparent via-emerald-300 to-transparent" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Desktop Auth Buttons + Mobile Toggle */}
        <div className="flex shrink-0 items-center gap-2">
          <div className="hidden items-center gap-2 md:flex">
            <Link
              href="/login"
              className="rounded-full border border-emerald-200/25 px-4 py-2 text-sm font-semibold text-emerald-50 transition-all duration-200 hover:border-emerald-200/50 hover:bg-emerald-300/10"
            >
              Log In
            </Link>

            <Link
              href="/registration"
              className="rounded-full bg-emerald-300 px-5 py-2 text-sm font-semibold text-green-950 shadow-md shadow-emerald-950/20 transition-all duration-200 hover:bg-emerald-200 hover:shadow-emerald-300/20"
            >
              Register
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex size-10 items-center justify-center rounded-full border border-emerald-200/20 text-emerald-50 transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/70 md:hidden"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              strokeLinecap="round"
              className="size-5"
            >
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div
          id="mobile-menu"
          className="border-t border-emerald-200/10 bg-green-950/95 backdrop-blur-xl md:hidden"
        >
          <ul className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3 sm:px-6">
            {links.map((link) => {
              const active = isActive(pathname, link.href);

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={`block rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                      active
                        ? "bg-emerald-300/15 text-emerald-50"
                        : "text-emerald-100/80 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}

            {/* Mobile Auth Buttons */}
            <li className="mt-3 grid grid-cols-2 gap-3 border-t border-emerald-200/10 pt-4">
              <Link
                href="/login"
                className="rounded-full border border-emerald-200/25 px-4 py-3 text-center text-sm font-semibold text-emerald-50 transition-colors hover:bg-emerald-300/10"
              >
                Log In
              </Link>

              <Link
                href="/Registration"
                className="rounded-full bg-emerald-300 px-4 py-3 text-center text-sm font-semibold text-green-950 transition-colors hover:bg-emerald-200"
              >
                Register
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
