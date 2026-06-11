"use client";

// Reusable, colorable decorative SVGs. Color via the `color` prop
// (any CSS color / var) and size via className.

export function Squiggle({ className = "", color = "var(--gold)" }) {
  return (
    <svg
      viewBox="0 0 120 28"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M2 14C10 4 18 4 26 14s16 10 24 0 16-10 24 0 16 10 24 0 16-10 18-12"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function DotCluster({ className = "", color = "var(--gold)" }) {
  // Scattered dot cluster
  const dots = [
    [6, 6],
    [20, 4],
    [34, 10],
    [12, 20],
    [28, 22],
    [42, 18],
    [4, 34],
    [22, 36],
    [38, 32],
  ];
  return (
    <svg
      viewBox="0 0 48 42"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {dots.map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="2.2" fill={color} />
      ))}
    </svg>
  );
}

export function DrawnSquiggle({ className = "", color = "var(--gold)" }) {
  // A single flowing line, good for corner accents
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M6 40c8-14 20-14 28 0s20 14 28 0"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ArrowRight({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M4 12h15m0 0-6-6m6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
