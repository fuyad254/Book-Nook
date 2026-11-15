import Link from "next/link";

export default function MyBorrowsPage() {
  return (
    <section className="min-h-screen bg-linear-to-br from-green-950 via-emerald-900 to-green-950 px-4 py-16 sm:py-20">
      <div className="mx-auto w-full max-w-3xl text-center">
        <h1 className="text-3xl font-bold text-white sm:text-4xl">
          My Borrows
        </h1>

        <p className="mt-3 text-sm text-emerald-100/70 sm:text-base">
          Books you borrow from the community will appear here.
        </p>

        <Link
          href="/all-books"
          className="mt-8 inline-flex rounded-full bg-emerald-300 px-6 py-3 text-sm font-semibold text-green-950 transition-colors hover:bg-emerald-200"
        >
          Browse Books
        </Link>
      </div>
    </section>
  );
}
