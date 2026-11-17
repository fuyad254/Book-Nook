import Image from "next/image";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";
import type { Metadata } from "next";
import BorrowBookButton from "@/component/Button/borrowBookButton";
import { auth } from "@/lib/auth";
import type { IBook } from "@/type/book";

const API_URL = process.env.SERVER_BASE_API_URL;

type BookPageProps = {
  params: Promise<{ sulg: string }>;
};

async function getBook(id: string): Promise<IBook | null> {

  const jwtToken= await auth.api.getToken({
    headers: await headers()
  })

  const res = await fetch(`${API_URL}/book/${id}`,{
    headers: {
      authorization: `Bearer ${jwtToken?.token}`
    }
  });

  if (!res.ok) {
    return null;
  }

  const book = (await res.json()) as IBook | null;

  if (!book?._id) {
    return null;
  }

  return book;
}

export async function generateMetadata({
  params,
}: BookPageProps): Promise<Metadata> {
  const { sulg } = await params;
  const book = await getBook(sulg).catch(() => null);

  if (!book) {
    return {
      title: "Book Not Found",
      description: "This book could not be found in the Book Nook library.",
    };
  }

  const title = `${book.title} by ${book.author}`;

  return {
    title,
    description: book.description,
    openGraph: {
      title,
      description: book.description,
      type: "article",
      ...(book.image
        ? { images: [{ url: book.image, alt: `Cover of ${book.title}` }] }
        : {}),
    },
  };
}

export default function BookPage({ params }: BookPageProps) {
  return (
    <section className="min-h-screen bg-linear-to-br from-green-950 via-emerald-900 to-green-950 px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <Suspense fallback={<BookDetailSkeleton />}>
          {params.then(({ sulg }) => (
            <BookDetails id={sulg} />
          ))}
        </Suspense>
      </div>
    </section>
  );
}

async function BookDetails({ id }: { id: string }) {
  // The proxy check is optimistic; always validate the session on the server.
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect(`/login?next=/book/${id}`);
  }

  const book = await getBook(id).catch(() => null);

  if (!book) {
    notFound();
  }

  return (
    <article className="grid items-start gap-8 lg:grid-cols-[minmax(0,340px)_1fr] lg:gap-12">
      {/* Cover */}
      <div className="relative mx-auto aspect-3/4 w-full max-w-sm overflow-hidden rounded-2xl border border-emerald-300/20 bg-emerald-950 shadow-2xl shadow-black/40">
        {book.image ? (
          <Image
            src={book.image}
            alt={`Cover of ${book.title}`}
            fill
            priority
            sizes="(min-width: 1024px) 340px, 90vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-6xl text-emerald-300/30">
            📖
          </div>
        )}
      </div>

      {/* Information */}
      <div className="rounded-2xl border border-emerald-300/15 bg-[#151f19]/80 p-6 shadow-xl shadow-black/20 backdrop-blur sm:p-8">
        <span className="inline-block rounded-full border border-emerald-300/25 bg-emerald-400/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-emerald-200">
          {book.category}
        </span>

        <h1 className="mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl">
          {book.title}
        </h1>

        <p className="mt-3 text-lg text-emerald-100/70">
          by{" "}
          <span className="font-semibold text-emerald-200">{book.author}</span>
        </p>

        <p className="mt-6 text-sm leading-7 text-emerald-50/80 sm:text-base">
          {book.description}
        </p>

        <dl className="mt-8 grid gap-4 border-t border-emerald-300/10 pt-6 sm:grid-cols-2">
          <div>
            <dt className="text-xs font-semibold uppercase tracking-widest text-emerald-300/70">
              Copies Available
            </dt>
            <dd className="mt-1 text-base font-semibold text-white">
              {book.copies}
            </dd>
          </div>

          <div>
            <dt className="text-xs font-semibold uppercase tracking-widest text-emerald-300/70">
              Added By
            </dt>
            <dd className="mt-1 text-base font-semibold text-white">
              {book.name}
            </dd>
            <dd className="mt-1 text-sm break-all text-emerald-100/60">
              <a
                href={`mailto:${book.email}`}
                className="transition-colors hover:text-emerald-300"
              >
                {book.email}
              </a>
            </dd>
          </div>
        </dl>

        {book.copies > 0 ? (
          <div className="mt-8">
            <BorrowBookButton book={book} />
          </div>
        ) : (
          <button
            disabled={true}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-semibold shadow-lg transition sm:w-auto cursor-not-allowed bg-gray-500 text-white opacity-70"
          >Not available to borrow now</button>
        )}
      </div>
    </article>
  );
}

function BookDetailSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="grid items-start gap-8 lg:grid-cols-[minmax(0,340px)_1fr] lg:gap-12"
    >
      <div className="mx-auto aspect-3/4 w-full max-w-sm animate-pulse rounded-2xl border border-emerald-300/10 bg-emerald-900/60" />

      <div className="space-y-4 rounded-2xl border border-emerald-300/10 bg-[#151f19] p-6 sm:p-8">
        <div className="h-6 w-24 animate-pulse rounded-full bg-emerald-900/60" />
        <div className="h-9 w-3/4 animate-pulse rounded bg-emerald-900/60" />
        <div className="h-5 w-1/3 animate-pulse rounded bg-emerald-900/40" />
        <div className="space-y-2 pt-4">
          <div className="h-4 w-full animate-pulse rounded bg-emerald-900/40" />
          <div className="h-4 w-full animate-pulse rounded bg-emerald-900/40" />
          <div className="h-4 w-2/3 animate-pulse rounded bg-emerald-900/40" />
        </div>
        <div className="h-12 w-full animate-pulse rounded-full bg-emerald-900/50 sm:w-56" />
      </div>
    </div>
  );
}
