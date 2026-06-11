"use client";

import Image from "next/image";
import { motion } from "framer-motion";

// Wide, full-width spread of 5 tilted photo cards. Order is left → right; the
// center card (index 2) is largest and straightest and sits slightly raised,
// the outer cards are progressively more tilted and pushed lower to form a
// gentle arc. On tablet only the center + two inner cards show; on mobile only
// the center storefront photo remains.
const CENTER = 2;

// Mobile-only compact arc. The center storefront sits highest and largest; the
// four others peek out from behind its edges, partially cropped by the viewport
// (the section is overflow-hidden, so no horizontal scroll). Positions are vw
// based so the spread scales cleanly across 375–414px. Order matches arcPhotos.
const mobilePhotos = [
  {
    src: "/images/gallery/interior-lounge-1.jpg",
    alt: "DžaMaris café interior lounge at Aria Mall",
    rotate: -12,
    z: 10,
    pos: "left-[-7vw] top-[128px]",
    size: "w-[30vw] max-w-[128px]",
  },
  {
    src: "/images/gallery/wok-branded.jpg",
    alt: "DžaMaris wok chicken stir-fry with rice and salad",
    rotate: -7,
    z: 20,
    pos: "left-[7vw] top-[74px]",
    size: "w-[34vw] max-w-[150px]",
  },
  {
    src: "/images/gallery/aria-mall-exterior.jpg",
    alt: "DžaMaris storefront at Aria Mall, Sarajevo with gold signage under a blue sky",
    rotate: 0,
    z: 30,
    pos: "left-1/2 -translate-x-1/2 top-[16px]",
    size: "w-[58vw] max-w-[240px]",
  },
  {
    src: "/images/gallery/curry-piletina-branded.jpg",
    alt: "DžaMaris curry piletina plate with fries and coleslaw",
    rotate: 7,
    z: 20,
    pos: "right-[7vw] top-[74px]",
    size: "w-[34vw] max-w-[150px]",
  },
  {
    src: "/images/gallery/matcha-cocktail.jpg",
    alt: "DžaMaris matcha latte and a berry cocktail",
    rotate: 12,
    z: 10,
    pos: "right-[-7vw] top-[128px]",
    size: "w-[30vw] max-w-[128px]",
  },
];

const arcPhotos = [
  {
    src: "/images/gallery/interior-lounge-1.jpg",
    alt: "DžaMaris café interior lounge at Aria Mall",
    rotate: -11,
    y: 104,
    z: 10,
    box: "w-[196px] h-[256px] xl:w-[214px] xl:h-[280px]",
    show: "hidden lg:block",
    overlap: "lg:-ml-5",
  },
  {
    src: "/images/gallery/wok-branded.jpg",
    alt: "DžaMaris wok chicken stir-fry with rice and salad",
    rotate: -6,
    y: 46,
    z: 20,
    box: "w-[228px] h-[298px] sm:w-[244px] sm:h-[318px] xl:w-[258px] xl:h-[336px]",
    show: "hidden md:block",
    overlap: "md:-ml-4 lg:-ml-3",
  },
  {
    src: "/images/gallery/aria-mall-exterior.jpg",
    alt: "DžaMaris storefront at Aria Mall, Sarajevo with gold signage under a blue sky",
    rotate: 0,
    y: -28,
    z: 30,
    box: "w-[290px] h-[376px] sm:w-[316px] sm:h-[410px] lg:w-[340px] lg:h-[440px]",
    show: "block",
    overlap: "md:-ml-3 lg:-ml-2",
    priority: true,
  },
  {
    src: "/images/gallery/curry-piletina-branded.jpg",
    alt: "DžaMaris curry piletina plate with fries and coleslaw",
    rotate: 6,
    y: 46,
    z: 20,
    box: "w-[228px] h-[298px] sm:w-[244px] sm:h-[318px] xl:w-[258px] xl:h-[336px]",
    show: "hidden md:block",
    overlap: "md:-ml-3 lg:-ml-2",
  },
  {
    src: "/images/gallery/matcha-cocktail.jpg",
    alt: "DžaMaris matcha latte and a berry cocktail",
    rotate: 11,
    y: 104,
    z: 10,
    box: "w-[196px] h-[256px] xl:w-[214px] xl:h-[280px]",
    show: "hidden lg:block",
    overlap: "lg:-ml-3",
  },
];

export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden dot-texture pt-28 pb-16 md:pt-32 md:pb-20"
    >
      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-8">
        {/* Mobile compact arc (all 5 photos, layered + peeking) */}
        <div className="relative mx-auto h-[360px] w-full max-w-[420px] md:hidden">
          {mobilePhotos.map((photo, i) => {
            const dist = Math.abs(i - CENTER);
            return (
              // Outer wrapper holds absolute positioning (incl. -translate-x-1/2);
              // the inner motion div owns the transform animation so framer-motion
              // does not clobber the centering translate.
              <div
                key={photo.src}
                className={`absolute ${photo.pos} ${photo.size}`}
                style={{ zIndex: photo.z }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 40, rotate: 0, scale: 0.85 }}
                  animate={{ opacity: 1, y: 0, rotate: photo.rotate, scale: 1 }}
                  transition={{
                    duration: 0.6,
                    ease: "easeOut",
                    delay: dist * 0.12,
                  }}
                >
                  <div className="rounded-2xl bg-white p-2 shadow-xl">
                    <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl">
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        priority={photo.z === 30}
                        loading={photo.z === 30 ? undefined : "lazy"}
                        sizes="(max-width: 768px) 60vw, 240px"
                        className="object-cover"
                      />
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* Wide fanned photo spread (tablet/desktop) */}
        <div className="hidden items-center justify-center md:flex">
          {arcPhotos.map((photo, i) => {
            const dist = Math.abs(i - CENTER);
            return (
              <motion.div
                key={photo.src}
                className={`relative ${photo.show} ${photo.overlap}`}
                style={{ zIndex: photo.z }}
                initial={{ opacity: 0, y: 60, rotate: 0, scale: 0.85 }}
                animate={{
                  opacity: 1,
                  y: photo.y,
                  rotate: photo.rotate,
                  scale: 1,
                }}
                transition={{
                  duration: 0.7,
                  ease: "easeOut",
                  delay: dist * 0.12,
                }}
              >
                <div className="rounded-2xl bg-white p-2.5 shadow-xl">
                  <div
                    className={`relative overflow-hidden rounded-2xl ${photo.box}`}
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      priority={photo.priority}
                      loading={photo.priority ? undefined : "lazy"}
                      sizes="(max-width: 640px) 312px, 332px"
                      className="object-cover"
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Centered text block */}
        <div className="relative z-10 mx-auto mt-16 max-w-2xl text-center md:mt-20">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.85 }}
            className="pill bg-gold/25 text-maroon"
          >
            Restoran &amp; Caffe
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.95 }}
            className="mt-6 font-serif text-4xl leading-[1.08] text-maroon-dark sm:text-5xl lg:text-6xl"
          >
            Real flavors served
            <br />
            with <span className="italic text-maroon">pride</span> in Sarajevo.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.05 }}
            className="mx-auto mt-6 max-w-xl text-maroon-dark/70 leading-relaxed"
          >
            A family-run Caffe &amp; Restaurant in the heart of Aria Mall,
            Sarajevo, fresh coffee, curry piletina, and sizzling wok plates
            served with a warm Bosnian welcome.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="mt-8 flex justify-center"
          >
            <a href="#location" className="btn btn-primary">
              Find Us
            </a>
          </motion.div>

          {/* Scroll indicator */}
          <motion.a
            href="#menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            className="mt-12 inline-flex flex-col items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-maroon-dark/60 transition-colors hover:text-maroon"
          >
            Scroll to Explore
            <motion.svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              animate={{ y: [0, 7, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            >
              <path
                d="M6 9l6 6 6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          </motion.a>
        </div>
      </div>
    </section>
  );
}
