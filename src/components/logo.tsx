import Link from "next/link";

/**
 * Typographic lockup: a chiseled "BOGGS PRO CUT" wordmark with a mark that
 * blends a grass blade with a stacked-stone / retaining-wall motif.
 * Built in SVG/CSS so the spelling is always correct and it flips cleanly
 * for dark green headers (variant="light").
 */
export default function Logo({
  variant = "dark",
  className = "",
}: {
  variant?: "dark" | "light";
  className?: string;
}) {
  const primary = variant === "light" ? "#F4EFE6" : "#2F5233";
  const accent = "#7CA24B";
  const stone = variant === "light" ? "#CFC7B5" : "#6E6A62";
  return (
    <Link href="/" aria-label="Boggs Pro Cut home" className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg width="34" height="34" viewBox="0 0 40 40" fill="none" aria-hidden="true" className="shrink-0">
        {/* stacked stone base */}
        <rect x="6" y="26" width="28" height="4.4" rx="1" fill={stone} />
        <rect x="8.5" y="31" width="23" height="4.4" rx="1" fill={stone} opacity="0.7" />
        {/* grass blades rising from the wall */}
        <path d="M20 26C20 18 17 12 14 8c3 5 3 12 3 18" fill={primary} />
        <path d="M20 26c0-9 3-15 6-19-2 6-2 12-2 19" fill={primary} />
        <path d="M20 26c0-6 1.5-10 0-15-1.5 5-1.5 9-1.5 15z" fill={accent} />
      </svg>
      <span className="leading-none">
        <span
          className="font-display text-[1.15rem] tracking-wide chiseled block"
          style={{ color: primary }}
        >
          BOGGS PRO CUT
        </span>
        <span
          className="font-head text-[0.55rem] font-semibold uppercase tracking-[0.28em] block -mt-0.5"
          style={{ color: variant === "light" ? "#CFC7B5" : "#6E6A62" }}
        >
          Landscape · Hardscape · Snow
        </span>
      </span>
    </Link>
  );
}
