"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import AnimatedPhotoCard from "./AnimatedPhotoCard";

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
    pos: "left-[-6vw] top-[106px]",
    size: "w-[26vw] max-w-[108px]",
    dur: 5,
    amp: 4,
  },
  {
    src: "/images/gallery/wok-branded.jpg",
    alt: "DžaMaris wok chicken stir-fry with rice and salad",
    rotate: -7,
    z: 20,
    pos: "left-[7vw] top-[62px]",
    size: "w-[29vw] max-w-[125px]",
    dur: 4.5,
    amp: 4,
  },
  {
    src: "/images/gallery/aria-mall-exterior.jpg",
    alt: "DžaMaris storefront at Aria Mall, Sarajevo with gold signage under a blue sky",
    rotate: 0,
    z: 30,
    pos: "left-1/2 -translate-x-1/2 top-[14px]",
    size: "w-[50vw] max-w-[200px]",
    dur: 6,
    amp: 6,
  },
  {
    src: "/images/gallery/curry-piletina-branded.jpg",
    alt: "DžaMaris curry piletina plate with fries and coleslaw",
    rotate: 7,
    z: 20,
    pos: "right-[7vw] top-[62px]",
    size: "w-[29vw] max-w-[125px]",
    dur: 5.5,
    amp: 4,
  },
  {
    src: "/images/gallery/matcha-cocktail.jpg",
    alt: "DžaMaris matcha latte and a berry cocktail",
    rotate: 12,
    z: 10,
    pos: "right-[-6vw] top-[106px]",
    size: "w-[26vw] max-w-[108px]",
    dur: 4,
    amp: 4,
  },
];

const arcPhotos = [
  {
    src: "/images/gallery/interior-lounge-1.jpg",
    alt: "DžaMaris café interior lounge at Aria Mall",
    rotate: -11,
    y: 86,
    z: 10,
    box: "w-[164px] h-[212px] xl:w-[178px] xl:h-[232px]",
    show: "hidden lg:block",
    overlap: "lg:-ml-5",
    dur: 5,
    amp: 5,
  },
  {
    src: "/images/gallery/wok-branded.jpg",
    alt: "DžaMaris wok chicken stir-fry with rice and salad",
    rotate: -6,
    y: 38,
    z: 20,
    box: "w-[190px] h-[248px] sm:w-[204px] sm:h-[264px] xl:w-[214px] xl:h-[280px]",
    show: "hidden md:block",
    overlap: "md:-ml-4 lg:-ml-3",
    dur: 4.5,
    amp: 5,
  },
  {
    src: "/images/gallery/aria-mall-exterior.jpg",
    alt: "DžaMaris storefront at Aria Mall, Sarajevo with gold signage under a blue sky",
    rotate: 0,
    y: -24,
    z: 30,
    box: "w-[242px] h-[314px] sm:w-[264px] sm:h-[342px] lg:w-[282px] lg:h-[366px]",
    show: "block",
    overlap: "md:-ml-3 lg:-ml-2",
    priority: true,
    dur: 6,
    amp: 7,
  },
  {
    src: "/images/gallery/curry-piletina-branded.jpg",
    alt: "DžaMaris curry piletina plate with fries and coleslaw",
    rotate: 6,
    y: 38,
    z: 20,
    box: "w-[190px] h-[248px] sm:w-[204px] sm:h-[264px] xl:w-[214px] xl:h-[280px]",
    show: "hidden md:block",
    overlap: "md:-ml-3 lg:-ml-2",
    dur: 5.5,
    amp: 5,
  },
  {
    src: "/images/gallery/matcha-cocktail.jpg",
    alt: "DžaMaris matcha latte and a berry cocktail",
    rotate: 11,
    y: 86,
    z: 10,
    box: "w-[164px] h-[212px] xl:w-[178px] xl:h-[232px]",
    show: "hidden lg:block",
    overlap: "lg:-ml-3",
    dur: 4,
    amp: 5,
  },
];

// Desktop arc card: wraps the shared AnimatedPhotoCard (entrance → idle float →
// hover) and adds a scroll-linked parallax/fade as the hero exits. Outer cards
// drift further than the center for depth.
function ArcCard({ photo, index, scrollYProgress, reduce }) {
  const [hovered, setHovered] = useState(false);
  const dist = Math.abs(index - CENTER);
  const fromLeft = index < CENTER;
  const isCenter = index === CENTER;

  const parallaxShift = -(50 + dist * 55);
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, parallaxShift]);
  const parallaxOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  const spring = {
    type: "spring",
    stiffness: isCenter ? 80 : 95,
    damping: isCenter ? 11 : 14,
    delay: 0.15 + dist * 0.14,
  };

  return (
    <motion.div
      className={`relative ${photo.show} ${photo.overlap}`}
      style={{
        y: reduce ? undefined : parallaxY,
        opacity: reduce ? undefined : parallaxOpacity,
        zIndex: hovered ? 50 : photo.z,
      }}
    >
      <AnimatedPhotoCard
        trigger="load"
        rotate={photo.rotate}
        restY={photo.y}
        floatDur={photo.dur}
        floatAmp={photo.amp}
        entranceX={isCenter ? 0 : fromLeft ? -170 : 170}
        entranceY={isCenter ? -175 : 85}
        entranceRotateExtra={isCenter ? 0 : fromLeft ? -8 : 8}
        transition={spring}
        onHoverChange={setHovered}
        className="relative"
      >
        <div className="rounded-2xl bg-white p-2.5 shadow-xl transition-shadow duration-300 hover:shadow-2xl">
          <div className={`relative overflow-hidden rounded-2xl ${photo.box}`}>
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
      </AnimatedPhotoCard>
    </motion.div>
  );
}

// Mobile compact-arc card: same shared animation, but the outer wrapper keeps
// the absolute positioning (incl. -translate-x-1/2) so the inner motion
// transform never clobbers the centering translate.
function MobileCard({ photo, index }) {
  const dist = Math.abs(index - CENTER);

  return (
    <div
      className={`absolute ${photo.pos} ${photo.size}`}
      style={{ zIndex: photo.z }}
    >
      <AnimatedPhotoCard
        trigger="load"
        rotate={photo.rotate}
        restY={0}
        floatDur={photo.dur}
        floatAmp={photo.amp}
        entranceX={0}
        entranceY={40}
        entranceRotateExtra={0}
        hoverScale={1.06}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 + dist * 0.12 }}
        className="relative"
      >
        <div className="rounded-2xl bg-white p-2 shadow-xl transition-shadow duration-300 hover:shadow-2xl">
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
      </AnimatedPhotoCard>
    </div>
  );
}

export default function Hero() {
  const sectionRef = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const handleScrollToMenu = (e) => {
    e.preventDefault();
    document
      .getElementById("menu")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative overflow-hidden dot-texture pt-24 pb-12 md:pt-28 md:pb-16"
    >
      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-8">
        {/* Mobile compact arc (all 5 photos, layered + peeking) */}
        <div className="relative mx-auto h-[300px] w-full max-w-[420px] md:hidden">
          {mobilePhotos.map((photo, i) => (
            <MobileCard key={photo.src} photo={photo} index={i} />
          ))}
        </div>

        {/* Wide fanned photo spread (tablet/desktop) */}
        <div className="hidden items-center justify-center md:flex">
          {arcPhotos.map((photo, i) => (
            <ArcCard
              key={photo.src}
              photo={photo}
              index={i}
              scrollYProgress={scrollYProgress}
              reduce={reduce}
            />
          ))}
        </div>

        {/* Centered text block */}
        <div className="relative z-10 mx-auto mt-10 max-w-2xl text-center md:mt-12">
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
            className="mt-5 font-serif text-3xl leading-[1.08] text-maroon-dark sm:text-4xl lg:text-5xl"
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

          {/* Down-arrow scroll cue (replaces the old "Explore More" button) */}
          <motion.a
            href="#menu"
            onClick={handleScrollToMenu}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            aria-label="Scroll to our menu"
            className="mt-9 inline-flex justify-center text-gold-dark transition-colors hover:text-maroon"
          >
            <motion.svg
              viewBox="0 0 24 24"
              className="h-9 w-9"
              fill="none"
              animate={{ y: [0, 8, 0] }}
              transition={{
                duration: 1.4,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
              }}
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
