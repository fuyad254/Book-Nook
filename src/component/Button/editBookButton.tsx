"use client";

import { authClient } from "@/lib/auth-client";
import { IBook } from "@/type/book";
import Image from "next/image";
import React, { useRef, useState } from "react";

const categories = [
  "Fiction",
  "Science",
  "History",
  "Kids",
  "Productivity",
  "Others",
  "Spirituality",
  "Personal Development",
  "Classic",
  "Self-Help",
];

const EditBookButton = ({ book }: { book: IBook }) => {
  const [isOpen, setIsOpen] = useState(false);
  const labelStyle = "mb-1 block text-[10px] font-medium text-[#d1d9d2]";
  const inputStyle =
    "w-full rounded-md border border-[#303a34] bg-[#19221d] px-2 py-1.5 text-[11px] text-[#dce5de] outline-none placeholder:text-[#758078] focus:border-[#91c99e]";
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [preview] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleEditBookButton = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const formData = new FormData(e.currentTarget);
    const editBook = Object.fromEntries(formData.entries());

    // Original book data
    const originalData = {
      title: String(book.title),
      author: String(book.author),
      category: String(book.category),
      copies: String(book.copies),
      image: String(book.image),
      description: String(book.description),
    };

    // Check if anything changed
    const hasChanges = Object.keys(originalData).some(
      (key) =>
        String(editBook[key] ?? "") !==
        originalData[key as keyof typeof originalData],
    );

    if (!hasChanges) {
      setSuccess("No changes detected!");
      return;
    }

    try {
      setUploading(true);

      const {data}= await authClient.token()

      const res = await fetch(`http://localhost:5000/my-books/${book._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${data?.token}`
        },
        body: JSON.stringify(editBook),
      });

      if (!res.ok) {
        throw new Error("Failed to update book!");
      }

      setSuccess("Book updated successfully!");

      window.location.reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong!");
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-full border border-emerald-300/25 bg-emerald-400/10 px-3 py-1.5 text-xs font-semibold text-emerald-200 transition-all duration-200 hover\:border-emerald-300/50 hover\:bg-emerald-400/20 hover\:text-emerald-100 focus-visible\:outline-2 focus-visible\:outline-offset-2 focus-visible\:outline-emerald-300"
      >
        <svg
          xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
        >
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
        </svg>
        Edit
      </button>
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-9999 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            className="w-full max-w-lg rounded-2xl border border-emerald-300/15 bg-[#151f19] p-6 shadow-2xl shadow-black/40"
          >
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Edit Book</h2>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-full p-2 text-emerald-100/60 transition hover:bg-red-500/10 hover:text-red-400"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={handleEditBookButton}
              className="grid grid-cols-1 gap-x-3 gap-y-3 sm:grid-cols-2"
            >
              {/* Book Title */}
              <div>
                <label htmlFor="title" className={labelStyle}>
                  Book Title
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  placeholder="Enter book title"
                  required
                  defaultValue={book.title}
                  className={inputStyle}
                />
              </div>

              {/* Author Name */}
              <div>
                <label htmlFor="author" className={labelStyle}>
                  Author Name
                </label>
                <input
                  id="author"
                  name="author"
                  type="text"
                  placeholder="Enter author name"
                  required
                  defaultValue={book.author}
                  className={inputStyle}
                />
              </div>

              {/* Category */}
              <div>
                <label htmlFor="category" className={labelStyle}>
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  required
                  defaultValue={book.category}
                  className={inputStyle}
                >
                  {categories.map((category) => (
                    <option
                      key={category}
                      value={category}
                      className="bg-[#19221d]"
                    >
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Total Copies */}
              <div>
                <label htmlFor="copies" className={labelStyle}>
                  Total Copies
                </label>
                <input
                  id="copies"
                  name="copies"
                  type="number"
                  min="1"
                  defaultValue={book.copies}
                  required
                  className={inputStyle}
                />
              </div>

              {/* Book Image */}
              <div className="sm:col-span-2">
                <label htmlFor="image" className={labelStyle}>
                  Book Image Url
                </label>

                <input
                  ref={fileInputRef}
                  id="image"
                  name="image"
                  defaultValue={book.image}
                  className={`${inputStyle}`}
                />

                {preview && (
                  <Image
                    src={preview}
                    width={50}
                    height={50}
                    alt="Book preview"
                    className="mt-2 h-24 w-20 rounded-md border border-[#303a34] object-cover"
                  />
                )}
              </div>

              {/* Short Description */}
              <div className="sm:col-span-2">
                <label htmlFor="description" className={labelStyle}>
                  Short Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  placeholder="Write a short description..."
                  required
                  defaultValue={book.description}
                  className={`${inputStyle} resize-none`}
                />
              </div>

              {/* Error */}
              {error && (
                <p className="sm:col-span-2 rounded-md bg-red-500/10 px-3 py-2 text-xs text-red-400">
                  {error}
                </p>
              )}
              {success && (
                <p className="sm:col-span-2 rounded-md bg-red-500/10 px-3 py-2 text-xs text-red-400">
                  {success}
                </p>
              )}
              {/* Add Book Button */}
              <div className="mt-7 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-full cursor-pointer border border-emerald-300/20 px-5 py-2.5 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-400/10"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={uploading}
                  className="rounded-full cursor-pointer bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {uploading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EditBookButton;
