"use cache"
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "All Books", href: "/allbooks" },
  { label: "Add Books", href: "/addbooks" },
  { label: "My Books", href: "/mybooks" },
  { label: "My Borrows", href: "/myborrows" },
];

const socialLinks = [
  {
    name: "Facebook",
    href: "/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-5">
        <path d="M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.5 1.6-1.5h1.7V4a22 22 0 0 0-2.5-.1c-2.5 0-4.2 1.5-4.2 4.3V10H7.3v3h2.8v8z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "/",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-5">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r=".8" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    href: "/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-5">
        <path d="M12 .8a11.2 11.2 0 0 0-3.54 21.83c.56.1.76-.24.76-.54v-2.1c-3.1.67-3.76-1.32-3.76-1.32-.5-1.28-1.24-1.62-1.24-1.62-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.16 1.72 1.16 1 .1.76 1.8 2.78 1.25.1-.72.4-1.2.7-1.47-2.48-.28-5.08-1.24-5.08-5.52 0-1.22.44-2.22 1.16-3-.12-.28-.5-1.42.12-2.96 0 0 .95-.3 3.08 1.15a10.7 10.7 0 0 1 5.6 0c2.13-1.45 3.08-1.15 3.08-1.15.62 1.54.24 2.68.12 2.96.72.78 1.16 1.78 1.16 3 0 4.3-2.6 5.24-5.1 5.52.4.34.76 1 .76 2.02v3c0 .3.2.65.77.54A11.2 11.2 0 0 0 12 .8Z" />
      </svg>
    ),
  },
];

const Footer = async() => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-emerald-200/15 bg-linear-to-r from-green-950 via-emerald-950 to-green-950 text-emerald-100">

      {/* Background Glow */}
      <div className="pointer-events-none absolute -left-32 -top-32 size-72 rounded-full bg-emerald-400/10 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 size-72 rounded-full bg-green-400/10 blur-[100px]" />

      <div className="relative mx-auto container px-4 pt-14 pb-6 sm:px-6 lg:px-8">

        {/* Main Footer */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">

          {/* Brand */}
          <div className="space-y-5">
            <Link href="/" className="inline-flex items-center gap-3">
              <Image
                src={logo}
                width={60}
                height={60}
                alt="Book Nook"
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

            <p className="max-w-xs text-sm leading-7 text-emerald-100/65">
              Discover your next favorite book with Book Nook.
              Explore, collect, and borrow books while building
              your own little world of stories.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-1">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="flex size-10 items-center justify-center rounded-full border border-emerald-200/15 bg-emerald-300/5 text-emerald-100/70 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300/50 hover:bg-emerald-300/15 hover:text-emerald-200"
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-5 text-base font-bold text-white">
              Quick Links
            </h3>

            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center gap-2 text-sm text-emerald-100/65 transition-colors duration-200 hover:translate-x-1 hover:text-emerald-300"
                  >
                    <span className="text-emerald-400">›</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-5 text-base font-bold text-white">
              Contact Us
            </h3>

            <ul className="space-y-5">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 text-emerald-300">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="size-5">
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="m3 7 9 6 9-6" />
                  </svg>
                </span>
                <div>
                  <p className="mb-1 text-xs text-emerald-100/40">Email</p>
                  <a
                    href="mailto:your-email@example.com"
                    className="text-sm text-emerald-100/75 transition-colors hover:text-emerald-300"
                  >
                    your-email@example.com
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="mt-0.5 text-emerald-300">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="size-5">
                    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.9 2.2Z" />
                  </svg>
                </span>
                <div>
                  <p className="mb-1 text-xs text-emerald-100/40">Phone</p>
                  <a
                    href="tel:+8801XXXXXXXXX"
                    className="text-sm text-emerald-100/75 transition-colors hover:text-emerald-300"
                  >
                    +880 1XXX-XXXXXX
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="mt-0.5 text-emerald-300">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="size-5">
                    <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
                    <circle cx="12" cy="10" r="2.5" />
                  </svg>
                </span>
                <div>
                  <p className="mb-1 text-xs text-emerald-100/40">Location</p>
                  <p className="text-sm text-emerald-100/75">
                    Your City, Bangladesh
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="mb-5 text-base font-bold text-white">
              Explore Book Nook
            </h3>

            <p className="mb-5 text-sm leading-7 text-emerald-100/65">
              A perfect place for book lovers. Find interesting
              reads, manage your personal collection, and share
              the joy of reading with others.
            </p>

            <Link
              href="/allbooks"
              className="inline-flex items-center gap-2 rounded-full border border-emerald-300/30 bg-emerald-300/10 px-5 py-2.5 text-sm font-semibold text-emerald-200 transition-all duration-300 hover:border-emerald-300/50 hover:bg-emerald-300/20 hover:text-white"
            >
              Explore Books
              <span>→</span>
            </Link>
          </div>

        </div>

        {/* Divider */}
        <div className="my-10 h-px bg-linear-to-r from-transparent via-emerald-200/20 to-transparent" />

        {/* Bottom Footer */}
        <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-emerald-100/50">
            © {currentYear}{" "}
            <span className="font-semibold text-emerald-300">
              Book Nook
            </span>
            . All rights reserved.
          </p>

          <p className="text-xs text-emerald-100/50">
            Made with <span className="text-emerald-400">♥</span> for book lovers.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
