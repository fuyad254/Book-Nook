"use client";

import { useState } from "react";

interface BorrowBookButtonProps {
  bookTitle: string;
}

const BorrowBookButton = ({ bookTitle }: BorrowBookButtonProps) => {
  const [message, setMessage] = useState("");

  return (
    <div>
      <button
        type="button"
        onClick={() =>
          setMessage(
            `Borrowing "${bookTitle}" is coming soon. The borrow system will be available shortly.`,
          )
        }
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

      {message && (
        <p
          role="status"
          className="mt-3 rounded-xl border border-emerald-300/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-100"
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default BorrowBookButton;
