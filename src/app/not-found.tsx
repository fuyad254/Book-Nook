import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-linear-to-br from-green-950 via-emerald-900 to-green-950 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-xl rounded-2xl border border-emerald-300/15 bg-[#151f19]/90 p-8 text-center shadow-xl shadow-black/20 backdrop-blur sm:p-12">
        <span className="mb-4 inline-block rounded-full border border-emerald-300/20 bg-emerald-400/10 px-4 py-2 text-xs font-semibold tracking-widest text-emerald-300">
          404 ERROR
        </span>

        <h1 className="text-3xl font-bold text-white sm:text-4xl">
          Page <span className="text-[#91c99e]">Not Found</span>
        </h1>

        <p className="mt-4 text-sm leading-7 text-emerald-100/70 sm:text-base">
          Sorry, the page you are looking for doesn&apos;t exist or may have been
          moved.
        </p>

        <div className="mt-8 flex justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-[#91c99e] px-7 py-3 text-sm font-semibold text-[#102017] transition hover:bg-[#a5d9af]"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
}
