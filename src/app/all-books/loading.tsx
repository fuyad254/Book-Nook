export default function AllBooksLoading() {
  return (
    <section className="min-h-screen bg-linear-to-br from-green-950 via-emerald-900 to-green-950 px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <div className="mx-auto h-8 w-40 animate-pulse rounded-full bg-emerald-300/10" />
          <div className="mx-auto mt-4 h-10 w-72 max-w-full animate-pulse rounded bg-emerald-300/10" />
          <div className="mx-auto mt-4 h-4 w-full max-w-lg animate-pulse rounded bg-emerald-300/10" />
        </div>

        <div
          aria-hidden="true"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl border border-emerald-300/10 bg-[#151f19]"
            >
              <div className="aspect-3/4 w-full animate-pulse bg-emerald-900/60" />

              <div className="space-y-3 p-5">
                <div className="h-4 w-3/4 animate-pulse rounded bg-emerald-900/60" />
                <div className="h-3 w-1/2 animate-pulse rounded bg-emerald-900/40" />
                <div className="h-10 w-full animate-pulse rounded-full bg-emerald-900/40" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
