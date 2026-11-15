"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import type { IBook } from "@/type/book";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

interface BorrowBookProps {
  book: IBook;
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getBorrowDates(): { borrowDate: string; returnDate: string } {
  const borrow = new Date();
  const due = new Date(borrow);
  due.setDate(due.getDate() + 7);

  return { borrowDate: formatDate(borrow), returnDate: formatDate(due) };
}

const fieldStyle =
  "w-full rounded-md border border-[#303a34] bg-[#19221d] px-3 py-2 text-sm text-[#dce5de] outline-none";
const labelStyle = "mb-1 block text-xs font-medium text-emerald-200/80";

const BorrowBookButton = ({ book }: BorrowBookProps) => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [open, setOpen] = useState(false);
  const [submitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  const { borrowDate, returnDate } = getBorrowDates();

  const close = () => {
    if (submitting) {
      return;
    }

    setOpen(false);
    setError(null);
    setSuccess(false);
  };

  // Escape to close, plus lock body scroll and move focus into the dialog.
  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        setError(null);
        setSuccess(false);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    panelRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    

    const borrowData = {
      bookId: book._id,
      title: book.title,
      image: book.image,
      userEmail: user?.email,
      borrowDate,
      returnDate,
    };

    try {
      const res = await fetch(`${API_URL}/my-borrow`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(borrowData),
      });

      console.log(res);
      
      router.refresh()
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong. Try again.",
      );
    } 
  };

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#91c99e] px-7 py-3 text-sm font-semibold text-[#102017] shadow-lg shadow-emerald-950/30 transition hover:bg-[#a5d9af] active:scale-[0.99] sm:w-auto"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5"
        >
          <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5Z" />
          <path d="M4 20.5A2.5 2.5 0 0 1 6.5 18H20" />
        </svg>
        Borrow This Book
      </button>

      {open ? (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
          {/* Backdrop */}
          <button
            type="button"
            aria-label="Close borrow dialog"
            onClick={close}
            className="absolute inset-0 cursor-default bg-green-950/70 backdrop-blur-sm"
          />

          {/* Dialog */}
          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            tabIndex={-1}
            className="relative w-full max-w-md rounded-2xl border border-emerald-300/20 bg-[#151f19] p-6 shadow-2xl shadow-black/50 outline-none"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="relative h-14 w-11 shrink-0 overflow-hidden rounded-md bg-emerald-950 ring-1 ring-emerald-300/20">
                  {book.image ? (
                    <Image
                      src={book.image}
                      alt={`Cover of ${book.title}`}
                      width={44}
                      height={56}
                      sizes="44px"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="flex h-full items-center justify-center text-emerald-300/40">
                      📖
                    </span>
                  )}
                </span>

                <div className="min-w-0">
                  <h2
                    id={titleId}
                    className="truncate text-lg font-bold text-white"
                  >
                    Borrow This Book
                  </h2>
                  <p className="truncate text-sm text-emerald-100/70">
                    {book.title}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="shrink-0 rounded-full p-1.5 text-emerald-100/70 transition hover:bg-white/10 hover:text-white"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  strokeLinecap="round"
                  className="h-5 w-5"
                >
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            {success ? (
              <div className="mt-6 text-center">
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-400/15 text-2xl text-emerald-300">
                  ✓
                </span>
                <p className="mt-4 text-lg font-semibold text-white">
                  Book borrowed successfully!
                </p>
                <p className="mt-2 text-sm text-emerald-100/70">
                  Please return it by {returnDate}.
                </p>

                <button
                  type="button"
                  onClick={close}
                  className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-[#91c99e] px-6 py-3 text-sm font-semibold text-[#102017] transition hover:bg-[#a5d9af]"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                  <label htmlFor="borrow-name" className={labelStyle}>
                    User Name
                  </label>
                  <input
                    id="borrow-name"
                    type="text"
                    value={user?.name ?? ""}
                    readOnly
                    placeholder="Not signed in"
                    className={`${fieldStyle} cursor-not-allowed text-emerald-100/80`}
                  />
                </div>

                <div>
                  <label htmlFor="borrow-email" className={labelStyle}>
                    Email
                  </label>
                  <input
                    id="borrow-email"
                    type="email"
                    value={user?.email ?? ""}
                    readOnly
                    placeholder="Not signed in"
                    className={`${fieldStyle} cursor-not-allowed text-emerald-100/80`}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="borrow-date" className={labelStyle}>
                      Borrow Date
                    </label>
                    <input
                      id="borrow-date"
                      type="text"
                      value={borrowDate}
                      readOnly
                      className={`${fieldStyle} cursor-not-allowed text-emerald-100/80`}
                    />
                  </div>

                  <div>
                    <label htmlFor="return-date" className={labelStyle}>
                      Return Date
                    </label>
                    <input
                      id="return-date"
                      type="date"
                      required
                      defaultValue={returnDate}
                      className={`${fieldStyle}  text-emerald-100/80`}
                    />
                  </div>
                </div>

                {error ? (
                  <p
                    role="alert"
                    className="rounded-md border border-red-400/30 bg-red-500/10 px-3 py-2 text-xs text-red-200"
                  >
                    {error}
                  </p>
                ) : null}

                {!user?.email && !isPending ? (
                  <p className="text-xs text-emerald-100/60">
                    You need an account to borrow.{" "}
                    <a
                      href={`/login?next=/book/${book._id}`}
                      className="font-semibold text-emerald-300 underline-offset-2 hover:underline"
                    >
                      Sign in
                    </a>
                  </p>
                ) : null}

                <div className="flex flex-col gap-2 pt-2 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={close}
                    disabled={submitting}
                    className="inline-flex items-center justify-center rounded-full border border-emerald-300/25 px-5 py-2.5 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-400/10 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    // disabled={submitting || !user?.email}
                    // onClick={close}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#91c99e] px-6 py-2.5 text-sm font-semibold text-[#102017] transition hover:bg-[#a5d9af] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {submitting ? (
                      <>
                        <span
                          aria-hidden="true"
                          className="h-4 w-4 animate-spin rounded-full border-2 border-[#102017]/40 border-t-[#102017]"
                        />
                        Saving…
                      </>
                    ) : (
                      "Confirm Borrow"
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default BorrowBookButton;
