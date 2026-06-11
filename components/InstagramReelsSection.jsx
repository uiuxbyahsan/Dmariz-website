"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const PROFILE_URL = "https://www.instagram.com/dzammaris";

// Swap thumbnail/stats/link per card here. To point a card at a real reel,
// change its `link` to e.g. "https://www.instagram.com/reel/XXXXXXXXXXX/".
const reels = [
  {
    thumbnail: "/images/gallery/wok-branded.jpg",
    alt: "Wok chicken stir-fry with rice and fresh salad",
    views: "12.4K",
    likes: "342",
    link: PROFILE_URL,
  },
  {
    thumbnail: "/images/gallery/matcha-cocktail.jpg",
    alt: "Matcha latte and a berry cocktail",
    views: "8.2K",
    likes: "521",
    link: PROFILE_URL,
  },
  {
    thumbnail: "/images/gallery/curry-piletina-branded.jpg",
    alt: "Curry piletina with fries and coleslaw",
    views: "21K",
    likes: "894",
    link: PROFILE_URL,
  },
  {
    thumbnail: "/images/gallery/chicken-stirfry-rice.jpg",
    alt: "Chicken stir-fry with peppers over rice and salad",
    views: "5.1K",
    likes: "276",
    link: PROFILE_URL,
  },
];

function ReelClapIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path
        d="M3 8.5 21 6m-18 2.5V18a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.5M3 8.5 4 5l16-2 .8 3M7.5 7.7l2-3.2m4 2.6 2-3.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

function EyeIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path
        d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

function HeartIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 20S3.5 14.5 3.5 8.8A4.3 4.3 0 0 1 12 7a4.3 4.3 0 0 1 8.5 1.8C20.5 14.5 12 20 12 20Z" />
    </svg>
  );
}

function ReelCard({ reel, index }) {
  return (
    <motion.a
      href={reel.link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Open DžaMaris on Instagram"
      initial={{ opacity: 0, scale: 0.92, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
      whileHover={{ scale: 1.03 }}
      className="group relative block aspect-[9/16] overflow-hidden rounded-xl bg-white shadow-md transition-shadow duration-300 hover:shadow-xl"
    >
      <Image
        src={reel.thumbnail}
        alt={reel.alt}
        fill
        loading="lazy"
        sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 24vw"
        className="object-cover"
      />

      {/* Bottom gradient for legibility */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

      {/* Top-left reel icon */}
      <div className="absolute left-3 top-3 text-white/90 drop-shadow">
        <ReelClapIcon className="h-5 w-5" />
      </div>

      {/* Center play button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          whileHover={{ scale: 1.12 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-maroon-dark/55 backdrop-blur-sm ring-1 ring-white/30"
        >
          <svg viewBox="0 0 24 24" className="ml-0.5 h-6 w-6 text-white" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        </motion.div>
      </div>

      {/* Bottom-left engagement stats */}
      <div className="absolute bottom-3 left-3 flex items-center gap-3 text-white text-sm font-medium drop-shadow">
        <span className="flex items-center gap-1">
          <EyeIcon className="h-4 w-4" />
          {reel.views}
        </span>
        <span className="flex items-center gap-1">
          <HeartIcon className="h-4 w-4" />
          {reel.likes}
        </span>
      </div>
    </motion.a>
  );
}

export default function InstagramReelsSection() {
  return (
    <section id="instagram" className="dot-texture py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="pill bg-gold/25 text-maroon">@DZAMMARIS</span>
          <h2 className="mt-5 font-serif text-4xl md:text-5xl text-maroon-dark">
            Follow us on <span className="italic text-maroon">Instagram</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-maroon-dark/70 leading-relaxed">
            See our latest dishes, drinks, and behind-the-scenes moments.
          </p>
        </motion.div>

        {/* Reel grid */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {reels.map((reel, i) => (
            <ReelCard key={i} reel={reel} index={i} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 flex justify-center">
          <a
            href={PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-gold"
          >
            View More on Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
