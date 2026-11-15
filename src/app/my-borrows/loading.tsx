export default function Loading() {
  return (
    <section className="min-h-screen bg-linear-to-br from-green-950 via-emerald-900 to-green-950 px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto w-full max-w-5xl">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <div className="mx-auto h-8 w-32 animate-pulse rounded-full bg-emerald-300/10" />
          <div className="mx-auto mt-4 h-9 w-56 animate-pulse rounded-lg bg-emerald-300/10" />
          <div className="mx-auto mt-4 h-4 w-72 max-w-full animate-pulse rounded bg-emerald-300/10" />
        </div>

        <div
          aria-hidden="true"
          className="overflow-hidden rounded-2xl border border-emerald-300/10 bg-[#151f19]"
        >
          <div className="h-12 animate-pulse bg-emerald-900/40" />

          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="flex items-center gap-4 border-t border-emerald-300/10 px-5 py-4"
            >
              <div className="h-16 w-12 shrink-0 animate-pulse rounded-md bg-emerald-900/50" />

              <div className="flex-1 space-y-2">
                <div className="h-4 w-1/3 animate-pulse rounded bg-emerald-900/50" />
                <div className="h-3 w-1/4 animate-pulse rounded bg-emerald-900/40" />
              </div>

              <div className="hidden h-9 w-28 animate-pulse rounded-full bg-emerald-900/40 sm:block" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
