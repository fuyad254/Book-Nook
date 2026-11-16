"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { useRef, useState } from "react";

const categories = ["Fiction", "Science", "History", "Kids", "Productivity", "Others","Spirituality","Personal Development", "Classic","Self-Help"];

export default function AddBookPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [preview] = useState("");
  const [uploading] = useState(false);
  const [error] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();


    const formData = new FormData(e.currentTarget);

    const book = Object.fromEntries(formData.entries()) as {
      title: string;
      author: string;
      category: string;
      copies: string;
      image: string;
      description: string;
      name: string;
      email: string;
    };

    const res = await fetch("http://localhost:5000/add-book", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(book),
    });
    const data = res.json();
    console.log(data);
  };

  const { data: session } = authClient.useSession();
    const user = session?.user;
    

  const inputStyle =
    "w-full rounded-md border border-[#303a34] bg-[#19221d] px-2 py-1.5 text-[11px] text-[#dce5de] outline-none placeholder:text-[#758078] focus:border-[#91c99e]";




  const labelStyle = "mb-1 block text-[10px] font-medium text-[#d1d9d2]";

  return (
    <section className="min-h-screen bg-linear-to-br from-green-950 via-emerald-900 to-green-950 px-4 py-12 sm:py-16">
      <div className="mx-auto w-full max-w-3xl">
        {/* Heading */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            Add a New Book
          </h1>

          <p className="mt-3 text-sm text-emerald-100/70 sm:text-base">
            Share your favorite books with the Book Nook community.
          </p>
        </div>

        {/* Form Card */}
        <div className="rounded-2xl border border-emerald-400/20 bg-white/10 p-5 shadow-2xl backdrop-blur-xl sm:p-8">
          <form
            onSubmit={handleSubmit}
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
                defaultValue="Fiction"
                required
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
                defaultValue="0"
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
                // onChange={handleImageChange}
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
                className={`${inputStyle} resize-none`}
              />
            </div>

            {/* User Name */}
            <div>
              <label htmlFor="userName" className={labelStyle}>
                User Name
              </label>
              <input
                id="userName"
                type="text"
                name="name"
                value={user?.name ?? ""}
                
                readOnly
                className={`${inputStyle}`}
              />
            </div>

            {/* User Email */}
            <div>
              <label htmlFor="userEmail" className={labelStyle}>
                User Email
              </label>
              <input
                id="userEmail"
                type="email"
                name="email"
                value={user?.email ?? ""}
                readOnly
                className={`${inputStyle}`}
              />
            </div>

            {/* Error */}
            {error && (
              <p className="sm:col-span-2 rounded-md bg-red-500/10 px-3 py-2 text-xs text-red-400">
                {error}
              </p>
            )}

            {/* Add Book Button */}
            <div className="sm:col-span-2">
              <button
                type="submit"
                disabled={uploading}
                className="w-full rounded-md bg-[#91c99e] py-2 text-[11px] font-semibold text-[#102017] transition hover:bg-[#a5d9af] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {uploading ? "Uploading..." : "Add Book"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
