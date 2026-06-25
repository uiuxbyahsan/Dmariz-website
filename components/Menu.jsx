"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import AnimatedPhotoCard from "./AnimatedPhotoCard";

// Each category drives both the price list and the left-hand photo. Edit items
// or swap `image` here as new dishes/photos are added.
const categories = [
  {
    name: "Doručak",
    image: "/images/gallery/chicken-mushroom-sauce.jpg",
    items: [
      { name: "Bavarski Doručak", price: "9.00" },
      { name: "Mix Doručak", price: "11.00" },
    ],
  },
  {
    name: "Glavna Jela",
    image: "/images/gallery/curry-piletina-branded.jpg",
    items: [
      { name: "Curry Piletina", price: "12.00" },
      { name: "Wok Piletina", price: "11.00" },
      { name: "Sitni Ćevap", price: "10.00" },
      { name: "Hadžijski Ćevap", price: "13.00" },
      { name: "Toscana Piletina", price: "12.00" },
    ],
  },
  {
    name: "Salate",
    image: "/images/gallery/chicken-stirfry-rice.jpg",
    items: [{ name: "Crispy Chicken Salad", price: "8.00" }],
  },
  {
    name: "Sendviči",
    image: "/images/gallery/wok-branded.jpg",
    items: [{ name: "Fokača Sandwich", price: "6.00" }],
  },
  {
    name: "Pića",
    image: "/images/gallery/matcha-cocktail.jpg",
    items: [
      { name: "Limunada", price: "4.00" },
      { name: "Ledena Kafa", price: "5.00" },
    ],
  },
  {
    name: "Kafa",
    image: "/images/gallery/interior-lounge-1.jpg",
    items: [
      { name: "Espresso", price: "2.00" },
      { name: "Cappuccino", price: "3.50" },
    ],
  },
  {
    name: "Dezerti",
    image: "/images/gallery/curry-chicken-plate.jpg",
    items: [
      { name: "Tiramisu", price: "6.00" },
      { name: "Čokoladna Torta", price: "6.50" },
    ],
  },
];

const listVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const rowVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function Menu() {
  const [active, setActive] = useState(0);
  const activeCategory = categories[active];

  return (
    <section id="menu" className="dot-texture py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Heading + category nav */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-serif text-4xl md:text-5xl text-maroon-dark">
            Our <span className="italic text-maroon">menu</span>
          </h2>
          <nav className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-lg md:text-xl text-maroon-dark/70">
            {categories.map((cat, i) => (
              <span key={cat.name} className="flex items-center gap-x-3">
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  aria-pressed={i === active}
                  className={
                    i === active
                      ? "text-maroon-dark font-medium underline decoration-gold decoration-2 underline-offset-4"
                      : "hover:text-maroon transition-colors"
                  }
                >
                  {cat.name}
                </button>
                {i < categories.length - 1 && (
                  <span className="text-maroon-dark/30">/</span>
                )}
              </span>
            ))}
          </nav>
        </motion.div>

        {/* Two-column: photo + price list */}
        <div className="mt-12 grid md:grid-cols-2 gap-10 md:gap-14 items-start">
          {/* Left: tilted photo card with white backing */}
          <div className="relative flex justify-center md:justify-start md:px-6">
            <div className="absolute inset-0 bg-white shadow-xl -rotate-[4deg] rounded-2xl" />
            <AnimatedPhotoCard
              trigger="inView"
              rotate={3}
              restY={0}
              floatDur={4.8}
              floatAmp={5}
              entranceX={0}
              entranceY={24}
              entranceRotateExtra={3}
              scaleFrom={0.94}
              className="relative w-full bg-white p-3 shadow-xl rounded-2xl transition-shadow duration-300 hover:shadow-2xl"
            >
              <div className="relative w-full aspect-[4/5] overflow-hidden rounded-2xl">
                <motion.div
                  key={activeCategory.image}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <Image
                    src={activeCategory.image}
                    alt={`${activeCategory.name} — DžaMaris`}
                    fill
                    loading="lazy"
                    sizes="(max-width: 768px) 90vw, 520px"
                    className="object-cover"
                  />
                </motion.div>
              </div>
            </AnimatedPhotoCard>
          </div>

          {/* Right: price list */}
          <div>
            <motion.ul
              key={activeCategory.name}
              variants={listVariants}
              initial="hidden"
              animate="show"
            >
              {activeCategory.items.map((dish) => (
                <motion.li
                  key={dish.name}
                  variants={rowVariants}
                  className="border-b border-maroon-dark/15"
                >
                  <div className="flex items-baseline justify-between py-4">
                      <span className="text-lg md:text-xl text-maroon-dark">
                        {dish.name}
                      </span>
                      <span className="text-base md:text-lg whitespace-nowrap pl-4 text-maroon-dark/80">
                        {dish.price} KM
                      </span>
                    </div>
                  </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </div>
    </section>
  );
}
