import Image from "next/image";
import Link from "next/link";
import type { IBook } from "@/type/book";

interface MyBooksCardProps {
  books: IBook[];
}

export default function MyBooksCard({ books }: MyBooksCardProps) {
  if (books.length === 0) {
    return (
      <div className="rounded-2xl border border-emerald-300/15 bg-[#151f19] px-6 py-14 text-center shadow-lg shadow-black/20">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-400/10 text-2xl">
          📚
        </span>
        <p className="mt-4 text-lg font-semibold text-white">No books yet</p>
        <p className="mt-2 text-sm text-emerald-100/70">
          Be the first to share a book with the community.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Table (sm and up) */}
      <div className="hidden overflow-hidden rounded-2xl border border-emerald-300/15 bg-[#151f19] shadow-lg shadow-black/20 sm:block">
        <table className="w-full text-left text-sm">
          <thead className="bg-emerald-400/5 text-xs uppercase tracking-wider text-emerald-200/70">
            <tr>
              <th scope="col" className="px-5 py-4 font-semibold">
                Book
              </th>
              <th scope="col" className="px-5 py-4 font-semibold">
                Author
              </th>
              <th scope="col" className="px-5 py-4 font-semibold">
                Copies
              </th>
              <th scope="col" className="px-5 py-4 text-right font-semibold">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-emerald-300/10">
            {books.map((book) => (
              <tr
                key={book._id}
                className="transition-colors hover:bg-emerald-400/5"
              >
                <td className="px-5 py-4">
                  <div className="flex items-center gap-4">
                    <Cover book={book} />
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-white">
                        {book.title}
                      </p>
                      {book.category ? (
                        <CategoryBadge category={book.category} />
                      ) : null}
                    </div>
                  </div>
                </td>

                <td className="px-5 py-4 text-emerald-100/70">{book.author}</td>

                <td className="px-5 py-4 text-emerald-100/70">
                  {book.copies}
                </td>

                <td className="px-5 py-4 text-right">
                  <ViewLink id={book._id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards (mobile) */}
      <ul className="space-y-4 sm:hidden">
        {books.map((book) => (
          <li
            key={book._id}
            className="rounded-2xl border border-emerald-300/15 bg-[#151f19] p-4 shadow-lg shadow-black/20"
          >
            <div className="flex gap-4">
              <Cover book={book} />
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-white">{book.title}</p>
                {book.category ? (
                  <CategoryBadge category={book.category} />
                ) : null}

                <dl className="mt-3 space-y-1 text-xs">
                  <div className="flex items-center justify-between gap-3">
                    <dt className="text-emerald-100/60">Author</dt>
                    <dd className="text-emerald-100/90">{book.author}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <dt className="text-emerald-100/60">Copies</dt>
                    <dd className="text-emerald-100/90">{book.copies}</dd>
                  </div>
                </dl>
              </div>
            </div>

            <div className="mt-4">
              <ViewLink id={book._id} fullWidth />
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

function Cover({ book }: { book: IBook }) {
  if (!book.image) {
    return (
      <span className="flex h-16 w-12 shrink-0 items-center justify-center rounded-md bg-emerald-950 text-lg text-emerald-300/40">
        📖
      </span>
    );
  }

  return (
    <Image
      src={book.image}
      alt={`Cover of ${book.title}`}
      width={48}
      height={64}
      sizes="48px"
      className="h-16 w-12 shrink-0 rounded-md object-cover ring-1 ring-emerald-300/20"
    />
  );
}

function CategoryBadge({ category }: { category: string }) {
  return (
    <span className="mt-2 inline-flex rounded-full border border-emerald-300/25 bg-emerald-400/10 px-2.5 py-0.5 text-[11px] font-medium text-emerald-200">
      {category}
    </span>
  );
}

function ViewLink({ id, fullWidth = false }: { id: string; fullWidth?: boolean }) {
  return (
    <Link
      href={`/book/${id}`}
      className={`inline-flex items-center justify-center gap-2 rounded-full border border-emerald-300/25 bg-emerald-400/10 px-4 py-2 text-xs font-semibold text-emerald-100 transition hover:border-emerald-300/50 hover:bg-emerald-400/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300 ${
        fullWidth ? "w-full" : ""
      }`}
    >
      View Details
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
  );
}
