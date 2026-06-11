"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { DotCluster } from "./decorations/Decorations";

export default function ComfortFood() {
  return (
    <section id="about" className="dot-texture py-16 md:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 grid md:grid-cols-2 gap-14 md:gap-10 items-center">
        {/* Left tilted photo */}
        <div className="relative flex justify-center md:justify-start">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="absolute -top-6 right-4 md:-right-4 w-24 text-gold z-20"
          >
            <DotCluster className="w-full" />
          </motion.div>

          <div className="relative">
            <div className="absolute inset-0 bg-white shadow-xl -rotate-[5deg] rounded-2xl" />
            <motion.div
              initial={{ opacity: 0, x: -40, rotate: 0 }}
              whileInView={{ opacity: 1, x: 0, rotate: 3 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative bg-white p-3 shadow-2xl rounded-2xl"
            >
              <div className="relative w-[280px] h-[340px] sm:w-[380px] sm:h-[460px] overflow-hidden">
                <Image
                  src="/images/gallery/wok-chicken-plate-1.jpg"
                  alt="A plate of DžaMaris wok chicken with rice held in the café interior"
                  fill
                  loading="lazy"
                  sizes="(max-width: 640px) 280px, 380px"
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right text */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="font-serif text-4xl md:text-5xl leading-tight text-maroon-dark">
            The best <span className="italic text-maroon">comfort food</span> in
            Sarajevo
          </h2>
          <p className="mt-6 max-w-md text-maroon-dark/70 leading-relaxed">
            Our kitchen is built around generous, soul-warming plates. Savor our
            signature Curry Piletina, sizzling Wok specials and Chicken in
            Mushroom Sauce, alongside classics like Ramstek and freshly grilled
            Ćevapi, each served with rice, fries and a crisp seasonal salad.
          </p>
          <a href="#gallery" className="btn btn-primary mt-8">
            About Us
          </a>
        </motion.div>
      </div>
    </section>
  );
}
