"use client";

// Simple line-icon style graphics for the "You'll love us" strip.
// Stroke uses currentColor so they inherit the gold accent.

const common = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export function RecipeIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path {...common} d="M14 6v14a4 4 0 0 0 8 0V6M18 6v36M34 6c-3 2-4 6-4 11v9h8M34 26v16" />
    </svg>
  );
}

export function LoungeIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path
        {...common}
        d="M10 22a4 4 0 0 1 4-4h20a4 4 0 0 1 4 4v8H10zM10 30v6M38 30v6M8 30h32v-3a3 3 0 0 0-3-3M14 18v-4a4 4 0 0 1 4-4h12a4 4 0 0 1 4 4v4"
      />
    </svg>
  );
}

export function HeartIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path
        {...common}
        d="M24 40S8 30 8 18.5A8.5 8.5 0 0 1 24 14a8.5 8.5 0 0 1 16 4.5C40 30 24 40 24 40Z"
      />
    </svg>
  );
}
