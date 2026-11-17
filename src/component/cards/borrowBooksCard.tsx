"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import type { IBorrow } from "@/type/book";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

interface BorrowBooksCardProps {
  borrowBooks: IBorrow[];
  /** ISO timestamp from the server, kept in sync with the render to avoid hydration drift. */
  today: string;
}

interface DueStatus {
  label: string;
  tone: "overdue" | "soon" | "ok";
}

const DAY_MS = 1000 * 60 * 60 * 24;

const dueToneStyles: Record<DueStatus["tone"], string> = {
  overdue: "border-red-400/30 bg-red-500/15 text-red-200",
  soon: "border-amber-300/30 bg-amber-400/15 text-amber-200",
  ok: "border-emerald-300/25 bg-emerald-400/10 text-emerald-200",
};

function startOfDay(date: Date): number {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
}

function getDueStatus(returnDate: string, now: Date): DueStatus | null {
  const due = new Date(returnDate);

  if (Number.isNaN(due.getTime())) {
    return null;
  }

  const daysLeft = Math.round((startOfDay(due) - startOfDay(now)) / DAY_MS);

  if (daysLeft < 0) {
    return {
      label: `Overdue by ${Math.abs(daysLeft)}d`,
      tone: "overdue",
    };
  }

  if (daysLeft === 0) {
    return { label: "Due today", tone: "soon" };
  }

  return {
    label: `Due in ${daysLeft}d`,
    tone: daysLeft <= 3 ? "soon" : "ok",
  };
}

export default function BorrowBooksCard({
  borrowBooks,
  today,
}: BorrowBooksCardProps) {

  const router = useRouter();
  const [returningId, setReturningId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const now = new Date(today);

  const handleReturnBook = async (book: IBorrow) => {
    if (returningId) {
      return;
    }

    setReturningId(book._id);
    setError(null);

    try {
      const patchRes = await fetch(
        `${API_URL}/my-borrow/${book._id}`,
        {
          method: "DELETE",
        },
      );

      if (!patchRes.ok) {
        throw new Error(
          `Could not update book copies (${patchRes.status}).`,
        );
      }

      const deleteRes = await fetch(`${API_URL}/my-borrow/${book._id}`, {
        method: "DELETE",
      });

      if (!deleteRes.ok) {
        throw new Error(`Could not return this book (${deleteRes.status}).`);
      }

      toast.success("Book returned successfully!");
      router.refresh();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong. Try again.";
      setError(message);
      toast.error(message);
    } finally {
      setReturningId(null);
    }

    const res= await fetch(`${API_URL}/my-borrow-return/${book.bookId}`,{
      method :"PATCH"
    })
    console.log(res);
  };

  if (borrowBooks.length === 0) {
    return (
      <div className="rounded-2xl border border-emerald-300/15 bg-[#151f19] px-6 py-14 text-center shadow-lg shadow-black/20">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-400/10 text-2xl">
          📖
        </span>

        <p className="mt-4 text-lg font-semibold text-white">
          No borrowed books yet
        </p>

        <p className="mt-2 text-sm text-emerald-100/70">
          Books you borrow will show up here with their return dates.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {error ? (
        <p
          role="alert"
          className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200"
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
                Borrow Date
              </th>
              <th scope="col" className="px-5 py-4 font-semibold">
                Return Date
              </th>
              <th scope="col" className="px-5 py-4 text-right font-semibold">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-emerald-300/10">
            {borrowBooks.map((book) => {
              const status = getDueStatus(book.returnDate, now);
              const isReturning = returningId === book._id;

              return (
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

                        {status ? <DueBadge status={status} /> : null}
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-emerald-100/70">
                    {book.borrowDate}
                  </td>

                  <td className="px-5 py-4 text-emerald-100/70">
                    {book.returnDate}
                  </td>

                  <td className="px-5 py-4 text-right">
                    <ReturnButton
                      book={book}
                      isReturning={isReturning}
                      disabled={returningId !== null}
                      onReturn={handleReturnBook}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Cards (mobile) */}
      <ul className="space-y-4 sm:hidden">
        {borrowBooks.map((book) => {
          const status = getDueStatus(book.returnDate, now);
          const isReturning = returningId === book._id;

          return (
            <li
              key={book._id}
              className="rounded-2xl border border-emerald-300/15 bg-[#151f19] p-4 shadow-lg shadow-black/20"
            >
              <div className="flex gap-4">
                <Cover book={book} />

                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-white">{book.title}</p>

                  {status ? <DueBadge status={status} /> : null}

                  <dl className="mt-3 space-y-1 text-xs">
                    <div className="flex items-center justify-between gap-3">
                      <dt className="text-emerald-100/60">Borrowed</dt>
                      <dd className="text-emerald-100/90">{book.borrowDate}</dd>
                    </div>

                    <div className="flex items-center justify-between gap-3">
                      <dt className="text-emerald-100/60">Due</dt>
                      <dd className="text-emerald-100/90">{book.returnDate}</dd>
                    </div>
                  </dl>
                </div>
              </div>

              <div className="mt-4">
                <ReturnButton
                  book={book}
                  isReturning={isReturning}
                  disabled={returningId !== null}
                  onReturn={handleReturnBook}
                  fullWidth
                />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function Cover({ book }: { book: IBorrow }) {
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

function DueBadge({ status }: { status: DueStatus }) {
  return (
    <span
      className={`mt-2 inline-flex rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${dueToneStyles[status.tone]}`}
    >
      {status.label}
    </span>
  );
}

interface ReturnButtonProps {
  book: IBorrow;
  isReturning: boolean;
  disabled: boolean;
  onReturn: (book: IBorrow) => void;
  fullWidth?: boolean;
}

function ReturnButton({
  book,
  isReturning,
  disabled,
  onReturn,
  fullWidth = false,
}: ReturnButtonProps) {
  return (
    <button
      type="button"
      onClick={() => onReturn(book)}
      disabled={disabled}
      className={`inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border border-emerald-300/25 bg-emerald-400/10 px-4 py-2 text-xs font-semibold text-emerald-100 transition hover:border-emerald-300/50 hover:bg-emerald-400/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300 disabled:cursor-not-allowed disabled:opacity-60 ${
        fullWidth ? "w-full" : ""
      }`}
    >
      {isReturning ? (
        <>
          <span
            aria-hidden="true"
            className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-emerald-200/40 border-t-emerald-200"
          />
          Returning…
        </>
      ) : (
        "Return Book"
      )}
    </button>
  );
}
