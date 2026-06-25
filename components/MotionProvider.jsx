"use client";

import { MotionConfig } from "framer-motion";

// Wraps the app so every framer-motion animation (including the section
// whileInView fade-ups) automatically honors the user's prefers-reduced-motion
// setting: transforms are skipped, opacity-only changes still apply.
export default function MotionProvider({ children }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
