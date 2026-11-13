
import Link from "next/link";

const features = [
  {
    id: 1,
    icon: "📚",
    title: "Vast Book Collection",
    description:
      "Explore a wide collection of books across different genres, from fiction and science to history and more.",
  },
  {
    id: 2,
    icon: "🔍",
    title: "Easy Book Discovery",
    description:
      "Find your favorite books effortlessly with organized categories and a simple browsing experience.",
  },
  {
    id: 3,
    icon: "🤝",
    title: "Easy Book Borrowing",
    description:
      "Borrow books with ease and enjoy your favorite stories without the hassle of complicated processes.",
  },
  {
    id: 4,
    icon: "🌱",
    title: "Share Your Collection",
    description:
      "Add your own books and share your collection with a growing community of passionate readers.",
  },
  {
    id: 5,
    icon: "💻",
    title: "User-Friendly Experience",
    description:
      "Enjoy a clean, responsive, and easy-to-use platform designed to make your reading journey enjoyable.",
  },
  {
    id: 6,
    icon: "❤️",
    title: "Built for Book Lovers",
    description:
      "Be part of a community where readers can discover, share, and celebrate their love for books.",
  },
];

const WhyChooseUsPage = () => {
  return (
    <section className="bg-[#0e1511] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto w-full container">

        {/* Section Heading */}
        <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-16">
          <span className="mb-4 inline-block rounded-full border border-emerald-300/20 bg-emerald-400/10 px-4 py-2 text-xs font-semibold tracking-widest text-emerald-300">
            WHY BOOK NOOK
          </span>

          <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            Why Choose{" "}
            <span className="text-[#91c99e]">Book Nook?</span>
          </h2>

          <p className="mt-5 text-sm leading-7 text-gray-400 sm:text-base">
            More than just a book platform. Book Nook makes discovering,
            sharing, and enjoying books easier for every reader.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="flex flex-col rounded-2xl border border-[#29372e] bg-[#151f19] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#91c99e]/50 hover:bg-[#19271e] hover:shadow-lg hover:shadow-black/20 sm:p-7"
            >
              {/* Icon */}
              <div className="mb-5 flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-emerald-300/15 bg-emerald-400/10 text-3xl transition-transform duration-300 hover:scale-110">
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="mb-3 text-lg font-semibold text-white sm:text-xl">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-sm leading-7 text-gray-400">
                {feature.description}
              </p>

              {/* Bottom Accent */}
              <div className="mt-6 h-1 w-10 rounded-full bg-[#91c99e]/50 transition-all duration-300 hover:w-20" />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 rounded-2xl border border-emerald-300/15 bg-[#151f19] px-5 py-10 text-center sm:mt-16 sm:px-10 sm:py-12">
          <h3 className="text-2xl font-bold leading-snug text-white sm:text-3xl">
            Your Next Favorite Book Is Waiting!
          </h3>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-gray-400 sm:text-base">
            Start exploring a world of stories, knowledge, and inspiration
            with Book Nook today.
          </p>

          <Link
            href="/allbooks"
            className="mt-7 inline-flex items-center justify-center gap-2 rounded-lg bg-[#91c99e] px-7 py-3 text-sm font-semibold text-[#102017] transition-all duration-300 hover:-translate-y-1 hover:bg-[#a5d9af]"
          >
            Explore Books
            <span aria-hidden="true">→</span>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUsPage;
