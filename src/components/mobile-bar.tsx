"use client";
import Link from "next/link";
import { BIZ } from "@/lib/content";

// Winter fast-path toggle: flip to true in-season to swap Call -> Reserve Snow Removal.
const WINTER_MODE = false;

export default function MobileBar() {
  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-boggs-cream/95 backdrop-blur border-t border-boggs-cream-dim px-3 py-2.5 flex gap-2.5 [padding-bottom:max(0.625rem,env(safe-area-inset-bottom))]">
      <Link
        href="/estimate"
        className="flex-1 rounded-xl bg-boggs-grass py-3 text-center font-head font-bold text-boggs-black shadow-sm active:scale-[0.98]"
      >
        Free Estimate
      </Link>
      {WINTER_MODE ? (
        <Link
          href="/estimate?service=snow-removal"
          className="flex-1 rounded-xl bg-boggs-steel py-3 text-center font-head font-bold text-boggs-cream shadow-sm active:scale-[0.98]"
        >
          Reserve Snow
        </Link>
      ) : (
        <a
          href={BIZ.phoneHref}
          className="flex-1 rounded-xl border-2 border-boggs-green py-3 text-center font-head font-bold text-boggs-green active:scale-[0.98]"
        >
          Call
        </a>
      )}
    </div>
  );
}
