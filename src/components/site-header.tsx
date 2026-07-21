"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Logo from "./logo";
import { NAV, BIZ } from "@/lib/content";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-boggs-cream/95 backdrop-blur border-b border-boggs-cream-dim shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container-wide flex items-center justify-between h-16 md:h-20">
        <Logo />
        <nav className="hidden md:flex items-center gap-7">
          {NAV.slice(0, 4).map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={`font-head text-sm font-semibold tracking-wide transition-colors hover:text-boggs-green ${
                pathname === n.href ? "text-boggs-green" : "text-boggs-black/70"
              }`}
            >
              {n.label}
            </Link>
          ))}
          <a href={BIZ.phoneHref} className="font-head text-sm font-semibold text-boggs-black/70 hover:text-boggs-green">
            {BIZ.phone}
          </a>
          <Link
            href="/estimate"
            className="rounded-full bg-boggs-grass px-5 py-2.5 font-head text-sm font-bold text-boggs-black shadow-sm transition hover:brightness-105 active:scale-[0.98]"
          >
            Free Estimate
          </Link>
        </nav>

        <button
          onClick={() => setOpen((o) => !o)}
          className="md:hidden inline-flex h-11 w-11 items-center justify-center rounded-lg border border-boggs-green/25 text-boggs-green"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span className="relative block h-4 w-5">
            <span className={`absolute inset-x-0 top-0 h-0.5 bg-current transition ${open ? "translate-y-[7px] rotate-45" : ""}`} />
            <span className={`absolute inset-x-0 top-[7px] h-0.5 bg-current transition ${open ? "opacity-0" : ""}`} />
            <span className={`absolute inset-x-0 bottom-0 h-0.5 bg-current transition ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
          </span>
        </button>
      </div>

      {/* Mobile: nav open at the top (condenses on scroll) — honors brief mobile.nav_open_top */}
      <div
        className={`md:hidden overflow-hidden bg-boggs-cream/95 backdrop-blur border-t border-boggs-cream-dim transition-all duration-300 ${
          scrolled || open ? "max-h-0 opacity-0" : "max-h-16 opacity-100"
        }`}
      >
        <nav className="flex items-center gap-2 overflow-x-auto no-scrollbar px-4 py-2.5">
          {NAV.slice(0, 4).map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={`shrink-0 rounded-full px-3.5 py-1.5 text-sm font-head font-semibold whitespace-nowrap ${
                pathname === n.href ? "bg-boggs-green text-boggs-cream" : "bg-white text-boggs-black/70 ring-1 ring-boggs-cream-dim"
              }`}
            >
              {n.label}
            </Link>
          ))}
          <Link
            href="/estimate"
            className="shrink-0 rounded-full bg-boggs-grass px-3.5 py-1.5 text-sm font-head font-bold text-boggs-black whitespace-nowrap"
          >
            Free Estimate
          </Link>
        </nav>
      </div>

      {/* Mobile full menu (hamburger) */}
      <div
        className={`md:hidden overflow-hidden border-t border-boggs-cream-dim bg-boggs-cream transition-[max-height] duration-300 ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <nav className="container-wide flex flex-col py-2">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="py-3 font-head font-semibold text-boggs-black border-b border-boggs-cream-dim/70 last:border-0"
            >
              {n.label}
            </Link>
          ))}
          <a href={BIZ.phoneHref} className="py-3 font-head font-semibold text-boggs-green">
            Call {BIZ.phone}
          </a>
        </nav>
      </div>
    </header>
  );
}
