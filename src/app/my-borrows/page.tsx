import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import BorrowBooksCard from "@/component/cards/borrowBooksCard";
import { auth } from "@/lib/auth";
import type { IBorrow } from "@/type/book";

const API_URL = process.env.SERVER_BASE_API_URL;

export const metadata: Metadata = {
  title: "My Borrows",
  description:
    "Track the books you have borrowed from the Book Nook community and see when each one is due back.",
};

export default function MyBorrowsPage() {
  return (
    <section className="min-h-screen bg-linear-to-br from-green-950 via-emerald-900 to-green-950 px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto w-full max-w-5xl">
        <header className="mx-auto mb-10 max-w-2xl text-center">
          <span className="mb-4 inline-block rounded-full border border-emerald-300/20 bg-emerald-400/10 px-4 py-2 text-xs font-semibold tracking-widest text-emerald-300">
            YOUR SHELF
          </span>

          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            My <span className="text-[#91c99e]">Borrows</span>
          </h1>

          <p className="mt-4 text-sm leading-7 text-emerald-100/70 sm:text-base">
            Books you borrow from the community appear here with their return
            dates.
          </p>
        </header>

        {/* Reads the session, so it streams in behind the boundary. */}
        <Suspense fallback={<BorrowsSkeleton />}>
          <BorrowsList />
        </Suspense>

        <div className="mt-10 text-center">
          <Link
            href="/all-books"
            className="inline-flex rounded-full bg-emerald-300 px-6 py-3 text-sm font-semibold text-green-950 transition-colors hover:bg-emerald-200"
          >
            Browse More Books
          </Link>
        </div>
      </div>
    </section>
  );
}

async function BorrowsList() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const email = session?.user?.email;

  if (!email) {
    redirect("/login?next=/my-borrows");
  }

  const books = await getBorrows(email);

  if (books === null) {
    return (
      <div className="mx-auto max-w-xl rounded-2xl border border-red-300/20 bg-red-500/10 px-6 py-10 text-center">
        <p className="text-lg font-semibold text-white">
          We couldn&apos;t load your borrowed books.
        </p>
        <p className="mt-2 text-sm text-emerald-100/70">
          Please make sure the book server is running and try again.
        </p>
      </div>
    );
  }

  return <BorrowBooksCard borrowBooks={books} today={new Date().toISOString()} />;
}

async function getBorrows(email: string): Promise<IBorrow[] | null> {
  const jwtToken = await auth.api.getToken({
    headers: await headers(),
  });

  try {
    const res = await fetch(
      `${API_URL}/borrows/${encodeURIComponent(email)}`,
      {
        headers: {
          authorization: `Bearer ${jwtToken.token}`,
        },
        cache: "no-store",
      },
    );

    if (!res.ok) {
      throw new Error(`Failed to load borrows (${res.status})`);
    }

    const data = (await res.json()) as IBorrow[];

    return Array.isArray(data) ? data : [];
  } catch {
    return null;
  }
}

function BorrowsSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="overflow-hidden rounded-2xl border border-emerald-300/10 bg-[#151f19]"
    >
      <div className="h-12 animate-pulse bg-emerald-900/40" />

      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="flex items-center gap-4 border-t border-emerald-300/10 px-5 py-4"
        >
          <div className="h-16 w-12 shrink-0 animate-pulse rounded-md bg-emerald-900/50" />

          <div className="flex-1 space-y-2">
            <div className="h-4 w-1/3 animate-pulse rounded bg-emerald-900/50" />
            <div className="h-3 w-1/4 animate-pulse rounded bg-emerald-900/40" />
          </div>

          <div className="hidden h-9 w-28 animate-pulse rounded-full bg-emerald-900/40 sm:block" />
        </div>
      ))}
    </div>
  );
}
