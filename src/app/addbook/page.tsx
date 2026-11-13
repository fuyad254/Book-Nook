"use client";

import Image from "next/image";
import { useRef, useState } from "react";

const categories = ["Fiction", "Science", "History", "Kids", "Others"];

export default function AddBookPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  // Replace these values with your authenticated user's data.
  const currentUser = {
    name: "Your Name",
    email: "your@email.com",
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be less than 5MB.");
      return;
    }

    setError("");
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const uploadImage = async (file: File) => {
    const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

    if (!apiKey) {
      throw new Error("ImgBB API key is missing.");
    }

    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${apiKey}`,
      {
        method: "POST",
        body: formData,
      },
    );

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error("Image upload failed.");
    }

    return result.data.url as string;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      setUploading(true);

      let imageUrl = "";

      if (image) {
        imageUrl = await uploadImage(image);
      } else {
        setError("Please upload a book image.");
        return;
      }

      const bookData = {
        title: formData.get("title"),
        author: formData.get("author"),
        category: formData.get("category"),
        image: imageUrl,
        description: formData.get("description"),
        userName: currentUser.name,
        userEmail: currentUser.email,
      };

      console.log("New Book:", bookData);

      // Send bookData to your backend/database here.

      alert("Book image uploaded successfully!");

      form.reset();
      setImage(null);
      setPreview("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setUploading(false);
    }
  };

  const inputStyle =
    "w-full rounded-md border border-[#303a34] bg-[#19221d] px-2 py-1.5 text-[11px] text-[#dce5de] outline-none placeholder:text-[#758078] focus:border-[#91c99e]";

  const labelStyle = "mb-1 block text-[10px] font-medium text-[#d1d9d2]";

  return (
    <section className="min-h-screen bg-gradient-to-br from-green-950 via-emerald-900 to-green-950 px-4 py-12 sm:py-16">
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
                Book Image
              </label>

              <input
                ref={fileInputRef}
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className={`${inputStyle} file:mr-2 file:border-0 file:bg-transparent file:text-[10px] file:text-[#dce5de]`}
              />

              {preview && (
                <Image
                  src={preview}
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
                value={currentUser.name}
                readOnly
                className={`${inputStyle} cursor-not-allowed`}
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
                value={currentUser.email}
                readOnly
                className={`${inputStyle} cursor-not-allowed`}
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
                className="w-full rounded-md bg-[#91c99e] py-2 text-[11px] font-semibold text-[#102017] transition hover:bg-[#a5d9af] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
              >
                Add Book
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
