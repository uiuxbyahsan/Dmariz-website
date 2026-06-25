"use client";

import Image from "next/image";
import { motion } from "framer-motion";

function InstagramIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path
        d="M14 8h2V5h-2c-2 0-3 1.3-3 3.2V10H9v3h2v6h3v-6h2.2l.5-3H14V8.6c0-.4.3-.6.6-.6H14Z"
        fill="currentColor"
      />
    </svg>
  );
}

const footerColsVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const footerColVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Footer() {
  return (
    <footer id="contact" className="bg-maroon-dark text-cream">
      {/* CTA strip */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6 }}
        className="border-b border-cream/10"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <h2 className="font-serif text-3xl md:text-4xl">
            Visit us <span className="italic text-gold">today</span>
          </h2>
          <a href="#location" className="btn btn-outline-gold">
            View Location &amp; Hours
          </a>
        </div>
      </motion.div>

      {/* Footer row */}
      <motion.div
        variants={footerColsVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto max-w-7xl px-5 sm:px-8 py-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4"
      >
        <motion.div variants={footerColVariants}>
          <Image
            src="/images/logo.png"
            alt="DžaMaris Caffe & Restaurant logo"
            width={675}
            height={208}
            className="h-12 w-auto object-contain"
          />
          <p className="mt-4 text-cream/60 text-sm leading-relaxed max-w-xs">
            A family-run Caffe &amp; Restaurant serving authentic Bosnian
            comfort food in the heart of Sarajevo.
          </p>
        </motion.div>

        <motion.div variants={footerColVariants}>
          <h3 className="font-serif text-lg text-gold-light">Location</h3>
          <p className="mt-3 text-cream/70 text-sm leading-relaxed">
            Aria Mall, Sarajevo
            <br />
            Trebević, Miljevići bb
          </p>
        </motion.div>

        <motion.div variants={footerColVariants}>
          <h3 className="font-serif text-lg text-gold-light">Hours</h3>
          <p className="mt-3 text-cream/70 text-sm leading-relaxed">
            Mon – Sat: 07:00 – 22:00
            <br />
            Sunday: closed
          </p>
        </motion.div>

        <motion.div variants={footerColVariants}>
          <h3 className="font-serif text-lg text-gold-light">Contact</h3>
          <p className="mt-3 text-cream/70 text-sm leading-relaxed">
            +387 33 000 000
            <br />
            info@dzamaris.ba
          </p>
          <div className="mt-4 flex items-center gap-3">
            <a
              href="https://www.instagram.com/dzammaris"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="DžaMaris on Instagram"
              className="text-cream/70 hover:text-gold transition-colors"
            >
              <InstagramIcon className="w-6 h-6" />
            </a>
            <a
              href="https://www.facebook.com/100063592327588"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="DžaMaris on Facebook"
              className="text-cream/70 hover:text-gold transition-colors"
            >
              <FacebookIcon className="w-6 h-6" />
            </a>
          </div>
        </motion.div>
      </motion.div>

      <div className="border-t border-cream/10">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-6 text-center text-cream/50 text-xs">
          © {new Date().getFullYear()} DžaMaris Caffe &amp; Restaurant. All
          rights reserved.
        </div>
      </div>
    </footer>
  );
}
