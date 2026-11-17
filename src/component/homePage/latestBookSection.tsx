import { Suspense } from "react";
import Link from "next/link";
import type { IBook } from "@/type/book";
import LatestBookCard from "../cards/latestBookCard";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

async function getLatestBooks(): Promise<IBook[]> {
  try {
    const res = await fetch(`${API_URL}/latest-books`, { cache: "no-store" });

    if (!res.ok) {
      return [];
    }

    const data = (await res.json()) as IBook[] | { books?: IBook[] };
    const books = Array.isArray(data) ? data : data.books ?? [];

    // Show newest first and limit to 6 (server should also sort & limit in MongoDB)
    return [...books]
      .sort((a, b) => {
        const aTime = Date.parse((a as IBook & { createdAt?: string }).createdAt ?? "");
        const bTime = Date.parse((b as IBook & { createdAt?: string }).createdAt ?? "");
        if (Number.isNaN(aTime) || Number.isNaN(bTime)) return 0;
        return bTime - aTime;
      })
      .slice(0, 6);
  } catch {
    return [];
  }
}

function LoadingSpinner() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-center justify-center py-16"
    >
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-emerald-300/30 border-t-[#91c99e]" />
      <p className="mt-4 text-sm font-medium text-emerald-100/70">
        Loading new arrivals...
      </p>
      <span className="sr-only">Loading</span>
    </div>
  );
}

async function LatestBooksContent() {
  const books = await getLatestBooks();

  if (books.length === 0) {
    return (
      <div className="mx-auto max-w-xl rounded-2xl border border-emerald-300/15 bg-[#151f19] px-6 py-10 text-center">
        <p className="text-lg font-semibold text-white">No books available yet</p>
        <p className="mt-2 text-sm text-emerald-100/70">
          Check back soon for new arrivals from the community.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {books.map((book) => (
        <LatestBookCard key={book._id} book={book} />
      ))}
    </div>
  );
}

const LatestBookSection = () => {
  return (
    <section className="bg-linear-to-br from-green-950 via-emerald-900 to-green-950 px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <header className="mx-auto mb-12 max-w-2xl text-center">
          <span className="mb-4 inline-block rounded-full border border-emerald-300/20 bg-emerald-400/10 px-4 py-2 text-xs font-semibold tracking-widest text-emerald-300">
            FRESH PICKS
          </span>
          <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            New <span className="text-[#91c99e]">Arrivals</span>
          </h2>
          <p className="mt-5 text-sm leading-7 text-emerald-100/70 sm:text-base">
            Explore the latest books added to Book Nook by our community.
          </p>
        </header>

        <Suspense fallback={<LoadingSpinner />}>
          <LatestBooksContent />
        </Suspense>

        <div className="mt-10 flex justify-center">
          <Link
            href="/all-books"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[#91c99e]/60 bg-transparent px-7 py-3 text-sm font-semibold text-[#91c99e] transition hover:bg-[#91c99e] hover:text-[#102017]"
          >
            See All Books
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LatestBookSection;