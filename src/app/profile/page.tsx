"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
  const { data: session, isPending } = authClient.useSession();
  const [imageFailed, setImageFailed] = useState(false);

  const user = session?.user;
  const showImage = Boolean(user?.image) && !imageFailed;
  const initial = user?.name?.trim().charAt(0).toUpperCase() || "U";

  if (isPending) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-linear-to-br from-green-950 via-emerald-900 to-green-950 px-4 py-16">
        <span className="h-12 w-12 animate-spin rounded-full border-4 border-emerald-300/30 border-t-emerald-300" />
      </section>
    );
  }

  if (!user) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-linear-to-br from-green-950 via-emerald-900 to-green-950 px-4 py-16">
        <div className="w-full max-w-md rounded-2xl border border-emerald-400/20 bg-white/10 p-8 text-center shadow-2xl backdrop-blur-xl">
          <h1 className="text-2xl font-bold text-white">
            You are not signed in
          </h1>

          <p className="mt-3 text-sm text-emerald-100/70">
            Sign in to view your profile and manage your books.
          </p>

          <Link
            href="/login"
            className="mt-6 inline-flex rounded-full bg-emerald-300 px-5 py-2.5 text-sm font-semibold text-green-950 transition-colors hover:bg-emerald-200"
          >
            Log In
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-linear-to-br from-green-950 via-emerald-900 to-green-950 px-4 py-16 sm:py-20">
      <div className="mx-auto w-full max-w-md rounded-2xl border border-emerald-400/20 bg-white/10 p-8 text-center shadow-2xl backdrop-blur-xl">
        <span className="relative mx-auto flex h-24 w-24 items-center justify-center overflow-hidden rounded-2xl bg-emerald-300/10 ring-2 ring-emerald-300/40">
          {showImage ? (
            <Image
              src={user.image as string}
              alt={user.name}
              width={96}
              height={96}
              unoptimized
              onError={() => setImageFailed(true)}
              className="size-full object-cover"
            />
          ) : (
            <span className="text-3xl font-bold text-emerald-200">
              {initial}
            </span>
          )}
        </span>

        <h1 className="mt-5 text-2xl font-bold text-white">{user.name}</h1>

        <p className="mt-1 break-all text-sm text-emerald-100/70">
          {user.email}
        </p>

        <div className="mt-8 grid grid-cols-2 gap-3">
          <Link
            href="/my-books"
            className="rounded-xl border border-emerald-200/25 px-4 py-3 text-sm font-semibold text-emerald-50 transition-colors hover:bg-emerald-300/10"
          >
            My Books
          </Link>

          <Link
            href="/my-borrows"
            className="rounded-xl border border-emerald-200/25 px-4 py-3 text-sm font-semibold text-emerald-50 transition-colors hover:bg-emerald-300/10"
          >
            My Borrows
          </Link>
        </div>

        <Link
          href="/all-books"
          className="mt-3 inline-flex w-full items-center justify-center rounded-xl bg-emerald-300 px-4 py-3 text-sm font-semibold text-green-950 transition-colors hover:bg-emerald-200"
        >
          Browse Books
        </Link>
      </div>
    </section>
  );
}
