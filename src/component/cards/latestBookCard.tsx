import Image from "next/image";
import Link from "next/link";
import type { IBook } from "@/type/book";

interface AllBookCardProps {
  book: IBook;
}

const LatestBookCard = ({ book }: AllBookCardProps) => {
  return (
    <article className="group flex h-120 flex-col overflow-hidden rounded-2xl border border-emerald-300/15 bg-[#151f19] shadow-lg shadow-black/20 transition duration-300 hover:-translate-y-1.5 hover:border-[#91c99e]/50 hover:shadow-xl hover:shadow-black/30">
      {/* Cover */}
      <div className="relative aspect-3/4 w-full overflow-hidden bg-emerald-950">
        {book.image ? (
          <Image
            src={book.image}
            alt={`Cover of ${book.title}`}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-5xl text-emerald-300/30">
            📖
          </div>
        )}

        <span className="absolute left-3 top-3 rounded-full border border-emerald-300/25 bg-green-950/80 px-3 py-1 text-[11px] font-semibold tracking-wide text-emerald-200 backdrop-blur">
          {book.category}
        </span>
      </div>

      {/* Details */}
      <div className="flex flex-1 flex-col p-5">
        <h2 className="line-clamp-2 text-lg font-bold leading-snug text-white">
          {book.title}
        </h2>

        <p className="mt-2 text-sm text-emerald-100/60">
          by <span className="font-medium text-emerald-200">{book.author}</span>
        </p>

        <Link
          href={`/book/${book._id}`}
          className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-[#91c99e] px-5 py-2.5 text-sm font-semibold text-[#102017] transition hover:bg-[#a5d9af] active:scale-[0.99]"
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
      </div>
    </article>
  );
};

export default LatestBookCard;
