"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "./decorations/Decorations";

const categories = [
  "Doručak",
  "Glavna Jela",
  "Salate",
  "Sendviči",
  "Pića",
  "Kafa",
  "Dezerti",
];

const dishes = [
  { name: "Curry Piletina", price: "12.00", highlight: false },
  { name: "Wok Piletina", price: "11.00", highlight: false },
  { name: "Sitni Ćevap", price: "10.00", highlight: false },
  { name: "Hadžijski Ćevap", price: "13.00", highlight: true },
  { name: "Toscana Piletina", price: "12.00", highlight: false },
  { name: "Bavarski Doručak", price: "9.00", highlight: false },
  { name: "Mix Doručak", price: "11.00", highlight: false },
  { name: "Crispy Chicken Salad", price: "8.00", highlight: false },
  { name: "Fokača Sandwich", price: "6.00", highlight: false },
];

const rowVariants = {
  hidden: { opacity: 0, y: 16 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.07, ease: "easeOut" },
  }),
};

export default function Menu() {
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
              <span key={cat} className="flex items-center gap-x-3">
                <span
                  className={
                    i === 0
                      ? "text-maroon-dark font-medium underline decoration-gold decoration-2 underline-offset-4"
                      : "hover:text-maroon transition-colors cursor-default"
                  }
                >
                  {cat}
                </span>
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
            <motion.div
              initial={{ opacity: 0, rotate: 6, scale: 0.94 }}
              whileInView={{ opacity: 1, rotate: 3, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="relative w-full bg-white p-3 shadow-2xl rounded-2xl"
            >
              <div className="relative w-full aspect-[4/5] overflow-hidden rounded-2xl">
                <Image
                  src="/images/gallery/curry-piletina-branded.jpg"
                  alt="Curry piletina — DžaMaris signature chicken curry with fries and coleslaw"
                  fill
                  loading="lazy"
                  sizes="(max-width: 768px) 90vw, 520px"
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>

          {/* Right: price list */}
          <div>
            <motion.ul
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
            >
              {dishes.map((dish, i) => (
                <motion.li
                  key={dish.name}
                  custom={i}
                  variants={rowVariants}
                  className="border-b border-maroon-dark/15"
                >
                  <div className="flex items-baseline justify-between py-4">
                    <span
                      className={`text-lg md:text-xl ${
                        dish.highlight
                          ? "text-gold-dark font-medium"
                          : "text-maroon-dark"
                      }`}
                    >
                      {dish.name}
                    </span>
                    <span
                      className={`text-base md:text-lg whitespace-nowrap pl-4 ${
                        dish.highlight ? "text-gold-dark" : "text-maroon-dark/80"
                      }`}
                    >
                      {dish.price} KM
                    </span>
                  </div>
                </motion.li>
              ))}
            </motion.ul>

            <a
              href="#gallery"
              className="group mt-7 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.15em] text-gold-dark hover:text-maroon transition-colors"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-gold-dark transition-colors group-hover:bg-maroon" />
              See All Menu
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
