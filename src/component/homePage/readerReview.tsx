import React from "react";

const reviews = [
  {
    id: 1,
    name: "Sarah Ahmed",
    role: "Book Lover",
    initials: "SA",
    rating: 5,
    date: "October 12, 2026",
    review:
      "Book Nook has made discovering new books so easy. I love the collection and the simple experience. It's now my favorite place to explore books!",
  },
  {
    id: 2,
    name: "Rakib Hasan",
    role: "Regular Reader",
    initials: "RH",
    rating: 5,
    date: "October 08, 2026",
    review:
      "A wonderful platform for every book enthusiast. The categories are well organized, and finding my next favorite book has never been easier.",
  },
  {
    id: 3,
    name: "Nusrat Jahan",
    role: "Student",
    initials: "NJ",
    rating: 5,
    date: "September 25, 2026",
    review:
      "I really enjoy exploring books here. The website looks beautiful and is very easy to use. I would definitely recommend Book Nook!",
  },
];

const ReaderReviewPage = () => {
  return (
    <section className="bg-[#0e1511] px-6 py-20 sm:px-10 lg:px-20">
      <div className="mx-auto container">
        {/* Section Heading */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="mb-4 inline-block rounded-full border border-emerald-300/20 bg-emerald-400/10 px-4 py-2 text-xs font-semibold tracking-widest text-emerald-300">
            READER TESTIMONIALS
          </span>

          <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            What Our Readers <span className="text-[#91c99e]">Say</span>
          </h2>

          <p className="mt-5 text-sm leading-7 text-gray-400 sm:text-base">
            Real stories, happy readers, and a shared love for books. Discover
            what makes Book Nook special to our reading community.
          </p>
        </div>

        {/* Overall Rating */}
        <div className="mb-12 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-5">
          <div className="text-5xl font-bold text-white">4.9</div>

          <div className="text-center sm:text-left">
            <div className="text-xl tracking-widest text-yellow-400">★★★★★</div>
            <p className="mt-1 text-sm text-gray-400">
              Loved by book enthusiasts
            </p>
          </div>
        </div>

        {/* Review Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="group rounded-2xl border border-[#29372e] bg-[#151f19] p-7 transition duration-300 hover:-translate-y-2 hover:border-[#91c99e]/50 hover:shadow-xl hover:shadow-black/20"
            >
              <div className="mb-5 flex items-center justify-between">
                <div className="text-lg tracking-widest text-yellow-400">
                  {"★".repeat(review.rating)}
                </div>

                <span className="text-xs text-gray-500">{review.date}</span>
              </div>

              <p className="min-h-28 text-sm leading-7 text-gray-300">
                “{review.review}”
              </p>

              <div className="mt-7 flex items-center gap-3 border-t border-[#29372e] pt-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#91c99e]/15 text-sm font-bold text-[#91c99e]">
                  {review.initials}
                </div>

                <div>
                  <h3 className="font-semibold text-white">{review.name}</h3>
                  <p className="mt-1 text-xs text-gray-400">{review.role}</p>
                </div>

                <div className="ml-auto text-[#91c99e]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-6 w-6"
                  >
                    <path d="M7.17 6A5.17 5.17 0 0 0 2 11.17V18h7v-7H5.5a1.67 1.67 0 0 1 1.67-1.67V6Zm10 0A5.17 5.17 0 0 0 12 11.17V18h7v-7h-3.5a1.67 1.67 0 0 1 1.67-1.67V6Z" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 text-center">
          <p className="text-sm text-gray-400">
            Your reading experience matters to us.
          </p>
          <p className="mt-2 text-lg font-semibold text-[#91c99e]">
            Read. Share. Inspire.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ReaderReviewPage;
