import { Suspense } from "react";
import type { Metadata } from "next";
import AllBookCard from "@/component/cards/allBookCard";
import type { IBook } from "@/type/book";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

export const metadata: Metadata = {
  title: "All Books",
  description:
    "Browse the full collection of books shared by the Book Nook community. Find your next read by title, author, or category.",
};

export default function AllBooksPage() {
  return (
    <section className="min-h-screen bg-linear-to-br from-green-950 via-emerald-900 to-green-950 px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <header className="mx-auto mb-12 max-w-2xl text-center">
          <span className="mb-4 inline-block rounded-full border border-emerald-300/20 bg-emerald-400/10 px-4 py-2 text-xs font-semibold tracking-widest text-emerald-300">
            BOOK NOOK LIBRARY
          </span>

          <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Explore <span className="text-[#91c99e]">All Books</span>
          </h1>

          <p className="mt-5 text-sm leading-7 text-emerald-100/70 sm:text-base">
            Discover stories, ideas, and knowledge shared by our community.
            Pick a book and open its details to learn more.
          </p>
        </header>

        <Suspense fallback={<BookGridSkeleton />}>
          <BookGrid />
        </Suspense>
      </div>
    </section>
  );
}

async function BookGrid() {
  let books: IBook[] = [];

  try {
    const res = await fetch(`${API_URL}/books`);

    if (!res.ok) {
      throw new Error(`Failed to load books (${res.status})`);
    }

    books = (await res.json()) as IBook[];
  } catch {
    return (
      <div className="mx-auto max-w-xl rounded-2xl border border-red-300/20 bg-red-500/10 px-6 py-10 text-center">
        <p className="text-lg font-semibold text-white">
          We couldn&apos;t load the books right now.
        </p>
        <p className="mt-2 text-sm text-emerald-100/70">
          Please make sure the book server is running and try again.
        </p>
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="mx-auto max-w-xl rounded-2xl border border-emerald-300/15 bg-[#151f19] px-6 py-10 text-center">
        <p className="text-lg font-semibold text-white">No books yet</p>
        <p className="mt-2 text-sm text-emerald-100/70">
          Be the first to share a book with the community.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {books.map((book) => (
        <AllBookCard key={book._id} book={book} />
      ))}
    </div>
  );
}

function BookGridSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-2xl border border-emerald-300/10 bg-[#151f19]"
        >
          <div className="aspect-3/4 w-full animate-pulse bg-emerald-900/60" />

          <div className="space-y-3 p-5">
            <div className="h-4 w-3/4 animate-pulse rounded bg-emerald-900/60" />
            <div className="h-3 w-1/2 animate-pulse rounded bg-emerald-900/40" />
            <div className="h-10 w-full animate-pulse rounded-full bg-emerald-900/40" />
          </div>
        </div>
      ))}
    </div>
  );
}
