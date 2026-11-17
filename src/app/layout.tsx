import type { Metadata } from "next";
import { Suspense } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navber from "@/component/nav&footer/navber";
import Footer from "@/component/nav&footer/footer";
import AppToaster from "@/component/toast/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Book Nook",
    template: "%s | Book Nook",
  },
  description:
    "Discover, share, and borrow books with the Book Nook community.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      data-theme="light"
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Suspense fallback={<NavberFallback />}>
          <Navber />
        </Suspense>
        <main className="flex-1 pt-16 md:pt-20">{children}</main>
        <Footer />
        <AppToaster />
      </body>
    </html>
  );
}

function NavberFallback() {
  return (
    <header
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-50 border-b border-emerald-200/15 bg-linear-to-r from-green-950/85 via-emerald-900/70 to-green-950/85 shadow-[0_8px_32px_rgba(2,44,34,0.35)] backdrop-blur-xl"
    >
      <div className="container mx-auto flex h-16 items-center px-4 sm:px-6 md:h-20 lg:px-8">
        <div className="h-10 w-36 animate-pulse rounded-xl bg-emerald-300/10" />
      </div>
    </header>
  );
}
