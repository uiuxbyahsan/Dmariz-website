"use client";

import { motion } from "framer-motion";
import { RecipeIcon, LoungeIcon, HeartIcon } from "./decorations/FeatureIcons";

const features = [
  {
    Icon: RecipeIcon,
    title: "Authentic Recipes",
    text: "Traditional Bosnian dishes made fresh every day from family recipes.",
  },
  {
    Icon: LoungeIcon,
    title: "Cozy Café Lounge",
    text: "Warm, welcoming seating in the heart of Aria Mall, Sarajevo.",
  },
  {
    Icon: HeartIcon,
    title: "Made with Love",
    text: "Family-run hospitality and genuine care in every single plate.",
  },
];

export default function Features() {
  return (
    <section className="bg-maroon-dark py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="font-serif text-4xl md:text-5xl text-cream"
        >
          You&apos;ll <span className="italic text-gold">love</span> us
        </motion.h2>

        <div className="mt-14 grid sm:grid-cols-3 gap-12 sm:gap-8">
          {features.map(({ Icon, title, text }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="flex flex-col items-center"
            >
              <Icon className="w-12 h-12 text-gold" />
              <h3 className="mt-5 font-serif text-xl text-cream">{title}</h3>
              <p className="mt-3 max-w-xs text-cream/65 text-sm leading-relaxed">
                {text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
