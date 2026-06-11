"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Squiggle } from "./decorations/Decorations";

export default function ComeSayHello() {
  return (
    <section id="location" className="dot-texture py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative overflow-hidden rounded-[2rem] bg-maroon-dark px-6 py-16 md:py-20 text-center text-cream shadow-2xl"
        >
          {/* dimmed background image */}
          <Image
            src="/images/gallery/interior-lounge-1.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-maroon-dark/55" />

          {/* corner squiggles */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="absolute top-6 left-6 w-24 text-gold"
          >
            <Squiggle className="w-full" color="var(--gold)" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="absolute bottom-6 right-6 w-24 text-gold rotate-180"
          >
            <Squiggle className="w-full" color="var(--gold)" />
          </motion.div>

          <div className="relative z-10">
            <h2 className="font-serif text-4xl md:text-5xl">
              Come say <span className="italic text-gold-light">hello</span>
            </h2>

            <p className="mt-6 text-xs tracking-[0.25em] uppercase text-gold-light">
              Aria Mall · Sarajevo
            </p>
            <p className="mt-3 text-cream/85 leading-relaxed">
              Caffe &amp; Restaurant DžaMaris
              <br />
              Trebević, Miljevići bb
            </p>

            <div className="mt-7 flex justify-center">
              <span className="pill bg-gold text-maroon-dark normal-case tracking-normal text-sm px-5 py-2">
                07:00 – 22:00 (Mon–Sat)
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
