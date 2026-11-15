"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, A11y, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import { useSyncExternalStore } from "react";


const slides = [
  {
    id: 1,
    title: "Discover Your Next Favorite Book",
    description:
      "Explore a world of amazing stories, unforgettable characters, and endless knowledge.",
    image:
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1800&q=85",
  },
  {
    id: 2,
    title: "Escape Into The World of Fiction",
    description:
      "Find exciting adventures, beautiful stories, and magical worlds waiting for you.",
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=1800&q=85",
  },
  {
    id: 3,
    title: "Knowledge Begins With Reading",
    description:
      "Explore science, history, and educational books to expand your knowledge every day.",
    image:
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=1800&q=85",
  },
  {
    id: 4,
    title: "A Little Book, A Big Adventure",
    description:
      "Discover wonderful books for kids and inspire young minds through reading.",
    image:
      "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=1800&q=85",
  },
  {
    id: 5,
    title: "Build Your Own Reading Journey",
    description:
      "Find your favorite books, share your collection, and become part of our reading community.",
    image:
      "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=1800&q=85",
  },
];

const Banner = () => {
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  if (!mounted) {
    return (
      <section className="min-h-107.5 bg-[#0e1511] sm:min-h-125 lg:min-h-150" />
    );
  }
  return (
    <section className="relative w-full overflow-hidden bg-[#0e1511]">
      <Swiper
        modules={[Autoplay, Pagination, A11y]}
        slidesPerView={1}
        spaceBetween={0}
        loop={true}
        speed={900}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        }}
        pagination={{ clickable: true }}
        className="book-banner"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="relative flex min-h-107.5 items-center bg-cover bg-center px-6 py-20 sm:min-h-125 sm:px-12 lg:min-h-150 lg:px-20"
              style={{
                backgroundImage: `url("${slide.image}")`,
              }}
            >
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-linear-to-r from-[#06130c]/95 via-[#06130c]/75 to-[#06130c]/20" />

              {/* Content */}
              <div className="relative z-10 mx-auto w-full max-w-7xl">
                <div className="max-w-2xl">
                  <span className="mb-5 inline-block rounded-full border border-emerald-300/30 bg-emerald-400/10 px-4 py-2 text-xs font-medium tracking-widest text-emerald-300">
                    WELCOME TO BOOK NOOK
                  </span>

                  <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-6xl">
                    {slide.title}
                  </h1>

                  <p className="mt-5 max-w-xl text-sm leading-7 text-gray-200 sm:text-base lg:text-lg">
                    {slide.description}
                  </p>

                  <Link
                    href="/all-books"
                    className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[#91c99e] px-6 py-3 text-sm font-semibold text-[#102017] shadow-lg shadow-black/20 transition duration-300 hover:-translate-y-1 hover:bg-[#a5d9af]"
                  >
                    Browse Books
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Banner;
