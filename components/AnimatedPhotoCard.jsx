"use client";

import { useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

// Shared animated photo card used by the Hero arc, the Menu photo, and the
// About/Comfort-Food photo. It provides one consistent motion system:
//   1. Entrance — spring/ease settle from an offset start (scaled down + extra
//      tilt). Fires on mount ("load") or when scrolled into view ("inView").
//   2. Idle float — once settled, a gentle, independent vertical bob loop.
//   3. Hover — lift (scale up), straighten toward 0°, and (via the caller's
//      `hover:shadow-2xl` class on the framed child) a deeper shadow.
// Respects prefers-reduced-motion by falling back to a plain fade-in.
//
// The caller supplies the white-framed image as `children`. Transform-only
// animation (x/y/scale/rotate/opacity) keeps it GPU-accelerated.
export default function AnimatedPhotoCard({
  children,
  className = "",
  style,
  rotate = 0,
  restY = 0,
  floatDur = 5,
  floatAmp = 5,
  trigger = "load", // "load" animates on mount; "inView" waits for scroll-in
  entranceX = 0,
  entranceY = 40,
  entranceRotateExtra = 0,
  scaleFrom = 0.85,
  hoverScale = 1.05,
  transition,
  viewportAmount = 0.3,
  onHoverChange,
}) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const inViewRaw = useInView(ref, { once: true, amount: viewportAmount });
  const inView = trigger === "load" ? true : inViewRaw;
  const [settled, setSettled] = useState(false);

  const initial = reduce
    ? { opacity: 0 }
    : {
        opacity: 0,
        scale: scaleFrom,
        rotate: rotate + entranceRotateExtra,
        x: entranceX,
        y: restY + entranceY,
      };

  const rest = reduce
    ? { opacity: 1 }
    : { opacity: 1, scale: 1, rotate, x: 0, y: restY };

  const float = {
    opacity: 1,
    scale: 1,
    rotate,
    x: 0,
    y: [restY, restY - floatAmp, restY, restY + floatAmp, restY],
  };

  // Hold the initial frame until in view, then settle, then float.
  const animate = !inView ? initial : settled ? float : rest;

  const settleTransition = reduce
    ? { duration: 0.5 }
    : transition || { duration: 0.7, ease: "easeOut" };

  const activeTransition =
    settled && inView && !reduce
      ? { y: { duration: floatDur, repeat: Infinity, ease: "easeInOut" } }
      : settleTransition;

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={initial}
      animate={animate}
      transition={activeTransition}
      onAnimationComplete={() => {
        if (inView && !settled) setSettled(true);
      }}
      onHoverStart={() => onHoverChange?.(true)}
      onHoverEnd={() => onHoverChange?.(false)}
      whileHover={
        reduce
          ? undefined
          : {
              scale: hoverScale,
              rotate: rotate * 0.4,
              transition: { duration: 0.3, ease: "easeOut" },
            }
      }
    >
      {children}
    </motion.div>
  );
}
