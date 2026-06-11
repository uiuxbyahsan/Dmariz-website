"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Lightbox from "./Lightbox";

const images = [
  {
    src: "/images/gallery/interior-lounge-1.jpg",
    alt: "DžaMaris café interior with pendant lights and bar stools",
    title: "Café Lounge",
    subtitle: "Aria Mall",
    caption: "Our café lounge",
  },
  {
    src: "/images/gallery/matcha-cocktail.jpg",
    alt: "Matcha latte and a berry cocktail with DžaMaris Family sugar packet",
    title: "Matcha & Berries",
    subtitle: "Signature Drink",
    caption: "Matcha latte & berry refresher",
  },
  {
    src: "/images/gallery/aria-mall-exterior.jpg",
    alt: "DžaMaris exterior at Aria Mall with gold signage under a blue sky",
    title: "DžaMaris",
    subtitle: "Aria Mall, Sarajevo",
    caption: "DžaMaris at Aria Mall, Sarajevo",
  },
  {
    src: "/images/gallery/wok-branded.jpg",
    alt: "Wok chicken stir-fry with rice and fresh salad",
    title: "Wok Specials",
    subtitle: "Signature Dish",
    caption: "Wok special",
  },
  {
    src: "/images/gallery/curry-chicken-plate.jpg",
    alt: "Curry chicken with rice, tomato and red cabbage slaw",
    title: "Curry Piletina",
    subtitle: "Signature Dish",
    caption: "Curry piletina plate",
  },
  {
    src: "/images/gallery/chicken-mushroom-sauce.jpg",
    alt: "Grilled chicken in creamy mushroom sauce over rice with salad",
    title: "Mushroom Sauce",
    subtitle: "Glavna Jela",
    caption: "Chicken in mushroom sauce",
  },
  {
    src: "/images/gallery/interior-lounge-2.jpg",
    alt: "Café seating area with guests and a warm menu board",
    title: "Come Together",
    subtitle: "Café Lounge",
    caption: "A cozy place to gather",
  },
  {
    src: "/images/gallery/chicken-stirfry-rice.jpg",
    alt: "Chicken stir-fry with peppers served over rice with a side salad",
    title: "Stir-Fry & Rice",
    subtitle: "Signature Dish",
    caption: "Chicken stir-fry & rice",
  },
  {
    src: "/images/gallery/curry-piletina-branded.jpg",
    alt: "Curry piletina with fries and coleslaw",
    title: "Curry Plate",
    subtitle: "Glavna Jela",
    caption: "Curry Piletina",
  },
];

// 3-up carousel widths (percent of the viewport row). The center slide stays
// fixed at 46% and perfectly centered; the side slides are wider than the
// visible peek so they read as larger, bleeding symmetrically off both edges.
// EDGE is the amount each side slide overhangs the viewport edge, chosen so
// the center slide's midpoint always lands at 50%.
const SIDE_W = 38; // ~40% larger than the previous 27%
const CENTER_W = 46;
const EDGE = (2 * SIDE_W + CENTER_W - 100) / 2;

function useSlidesPerView() {
  const [spv, setSpv] = useState(1);
  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      if (w >= 1024) setSpv(3);
      else if (w >= 640) setSpv(2);
      else setSpv(1);
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);
  return spv;
}

export default function Gallery() {
  const [index, setIndex] = useState(null); // lightbox index
  const [active, setActive] = useState(0); // slider position
  const slidesPerView = useSlidesPerView();
  const maxIndex = Math.max(0, images.length - slidesPerView);
  // Track translation. In the 3-up view every slide left of `active` is a
  // side-width slide, so the track shifts by `active * SIDE_W`; the extra EDGE
  // offset pulls the left peek partly off-screen to keep the center centered.
  const trackX =
    slidesPerView >= 3
      ? -(active * SIDE_W + EDGE)
      : -(active * (100 / slidesPerView));
  const trackRef = useRef(null);
  const [paused, setPaused] = useState(false);

  // keep active within bounds when slidesPerView changes
  useEffect(() => {
    setActive((a) => Math.min(a, maxIndex));
  }, [maxIndex]);

  const goPrev = useCallback(
    () => setActive((a) => (a <= 0 ? maxIndex : a - 1)),
    [maxIndex]
  );
  const goNext = useCallback(
    () => setActive((a) => (a >= maxIndex ? 0 : a + 1)),
    [maxIndex]
  );

  // autoplay
  useEffect(() => {
    if (paused) return;
    const id = setInterval(goNext, 5000);
    return () => clearInterval(id);
  }, [paused, goNext]);

  // drag/swipe
  const dragStart = useRef(null);
  const onPointerDown = (e) => {
    dragStart.current = e.clientX ?? e.touches?.[0]?.clientX ?? null;
  };
  const onPointerUp = (e) => {
    if (dragStart.current == null) return;
    const endX = e.clientX ?? e.changedTouches?.[0]?.clientX ?? dragStart.current;
    const delta = endX - dragStart.current;
    if (Math.abs(delta) > 40) {
      delta < 0 ? goNext() : goPrev();
    }
    dragStart.current = null;
  };

  // lightbox controls
  const openLb = (i) => setIndex(i);
  const closeLb = () => setIndex(null);
  const prevLb = () => setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  const nextLb = () => setIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  return (
    <section id="gallery" className="dot-texture py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="mb-12 flex flex-wrap items-end justify-between gap-6"
        >
          <div>
            <span className="pill bg-gold/25 text-maroon">Gallery</span>
            <h2 className="mt-5 font-serif text-4xl md:text-5xl text-maroon-dark">
              A taste of <span className="italic text-maroon">DžaMaris</span>
            </h2>
          </div>

          {/* Arrow controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={goPrev}
              aria-label="Previous slide"
              className="flex h-12 w-12 items-center justify-center bg-maroon text-cream transition-colors hover:bg-maroon-dark"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
                <path
                  d="M15 5l-7 7 7 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              onClick={goNext}
              aria-label="Next slide"
              className="flex h-12 w-12 items-center justify-center bg-maroon text-cream transition-colors hover:bg-maroon-dark"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
                <path
                  d="M9 5l7 7-7 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </motion.div>

        {/* Slider viewport */}
        <div
          className="overflow-hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
        >
          <motion.div
            ref={trackRef}
            className="flex items-center"
            animate={{ x: `${trackX}%` }}
            transition={{ type: "tween", ease: [0.25, 1, 0.5, 1], duration: 0.6 }}
            style={{ touchAction: "pan-y" }}
          >
            {images.map((img, i) => {
              const isVisible = i >= active && i < active + slidesPerView;
              // The center of the visible window gets the emphasis.
              // On mobile (1 per view) and the 2-up view there is no single
              // center, so all visible slides render at full size.
              const centerIndex = active + Math.floor(slidesPerView / 2);
              const emphasized =
                slidesPerView >= 3 ? i === centerIndex : isVisible;
              // In the 3-up view the centered slide is allocated a wider
              // share of the row; side slides are narrower (peek effect).
              const slideWidth =
                slidesPerView >= 3
                  ? emphasized
                    ? `${CENTER_W}%`
                    : `${SIDE_W}%`
                  : `${100 / slidesPerView}%`;
              return (
                <motion.div
                  key={img.src}
                  className="shrink-0 px-3"
                  animate={{ width: slideWidth }}
                  transition={{ duration: 0.45, ease: "easeInOut" }}
                  style={{ width: slideWidth }}
                >
                  <button
                    onClick={() => openLb(i)}
                    aria-label={`Open image: ${img.caption}`}
                    className="group block w-full text-left"
                  >
                    <motion.div
                      animate={{ scale: emphasized ? 1 : 0.88 }}
                      transition={{ duration: 0.45, ease: "easeInOut" }}
                      style={{ transformOrigin: "center center" }}
                    >
                      <motion.div
                        animate={{ opacity: emphasized ? 1 : 0.65 }}
                        transition={{ duration: 0.45, ease: "easeInOut" }}
                        className="relative w-full aspect-square overflow-hidden rounded-2xl bg-white shadow-md"
                      >
                        <Image
                          src={img.src}
                          alt={img.alt}
                          fill
                          draggable={false}
                          loading="lazy"
                          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <span className="absolute inset-0 bg-maroon-dark/0 transition-colors duration-300 group-hover:bg-maroon-dark/20" />
                      </motion.div>

                      <motion.div
                        animate={{ opacity: emphasized ? 1 : 0.6 }}
                        transition={{ duration: 0.45, ease: "easeInOut" }}
                        className="mt-4"
                      >
                        <h3 className="font-serif text-xl text-maroon-dark">
                          {img.title}
                        </h3>
                        <p className="mt-1 text-sm tracking-wide text-gold-dark">
                          {img.subtitle}
                        </p>
                      </motion.div>
                    </motion.div>
                  </button>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Dot pagination */}
        <div className="mt-8 flex justify-center gap-2.5">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                active === i
                  ? "w-6 bg-maroon"
                  : "w-2 bg-maroon/30 hover:bg-maroon/50"
              }`}
            />
          ))}
        </div>
      </div>

      <Lightbox
        images={images}
        index={index}
        onClose={closeLb}
        onPrev={prevLb}
        onNext={nextLb}
      />
    </section>
  );
}
