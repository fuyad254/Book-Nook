"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { IBook } from "@/type/book";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

interface MyBooksCardProps {
  books: IBook[];
}

const actionBase =
  "inline-flex items-center justify-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300";

const viewStyles =
  "border-emerald-300/25 bg-emerald-400/10 text-emerald-100 hover:border-emerald-300/50 hover:bg-emerald-400/20";
const editStyles =
  "border-sky-300/25 bg-sky-400/10 text-sky-100 hover:border-sky-300/50 hover:bg-sky-400/20";
const deleteStyles =
  "border-red-400/25 bg-red-500/10 text-red-200 hover:border-red-400/50 hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-60";

export default function MyBooksCard({ books }: MyBooksCardProps) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async (book: IBook) => {
    if (deletingId) {
      return;
    }

    const confirmed = window.confirm(
      `Delete "${book.title}"? This cannot be undone.`,
    );

    if (!confirmed) {
      return;
    }

    setDeletingId(book._id);
    setError(null);

    try {
      // NOTE: assumed endpoint. If the backend exposes a different route,
      // update only this line.
      const res = await fetch(`${API_URL}/my-books/${book._id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error(`Could not delete this book (${res.status}).`);
      }

      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong. Try again.",
      );
    } finally {
      setDeletingId(null);
    }
  };

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
      {error ? (
        <p
          role="alert"
          className="mb-4 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200"
        >
          {error}
        </p>
      ) : null}

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

                <td className="px-5 py-4">
                  <div className="flex flex-wrap items-center justify-end gap-2">
                    <ViewLink id={book._id} title={book.title} />
                    <EditLink id={book._id} title={book.title} />
                    <DeleteButton
                      book={book}
                      isDeleting={deletingId === book._id}
                      disabled={deletingId !== null}
                      onDelete={handleDelete}
                    />
                  </div>
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

            <div className="mt-4 grid grid-cols-3 gap-2">
              <ViewLink id={book._id} title={book.title} fullWidth />
              <EditLink id={book._id} title={book.title} fullWidth />
              <DeleteButton
                book={book}
                isDeleting={deletingId === book._id}
                disabled={deletingId !== null}
                onDelete={handleDelete}
                fullWidth
              />
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

function ViewLink({
  id,
  title,
  fullWidth = false,
}: {
  id: string;
  title: string;
  fullWidth?: boolean;
}) {
  return (
    <Link
      href={`/book/${id}`}
      aria-label={`View details of ${title}`}
      className={`${actionBase} ${viewStyles} ${fullWidth ? "w-full" : ""}`}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
      >
        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
      View
    </Link>
  );
}

function EditLink({
  id,
  title,
  fullWidth = false,
}: {
  id: string;
  title: string;
  fullWidth?: boolean;
}) {
  return (
    <Link
      href={`/edit-book/${id}`}
      aria-label={`Edit ${title}`}
      className={`${actionBase} ${editStyles} ${fullWidth ? "w-full" : ""}`}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
      >
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
      </svg>
      Edit
    </Link>
  );
}

interface DeleteButtonProps {
  book: IBook;
  isDeleting: boolean;
  disabled: boolean;
  onDelete: (book: IBook) => void;
  fullWidth?: boolean;
}

function DeleteButton({
  book,
  isDeleting,
  disabled,
  onDelete,
  fullWidth = false,
}: DeleteButtonProps) {
  return (
    <button
      type="button"
      onClick={() => onDelete(book)}
      disabled={disabled}
      aria-label={`Delete ${book.title}`}
      className={`${actionBase} ${deleteStyles} ${fullWidth ? "w-full" : ""}`}
    >
      {isDeleting ? (
        <>
          <span
            aria-hidden="true"
            className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-red-200/40 border-t-red-200"
          />
          Deleting…
        </>
      ) : (
        <>
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <path d="M3 6h18" />
            <path d="M8 6V4h8v2" />
            <path d="M19 6l-1 14H6L5 6" />
            <path d="M10 11v6M14 11v6" />
          </svg>
          Delete
        </>
      )}
    </button>
  );
}
