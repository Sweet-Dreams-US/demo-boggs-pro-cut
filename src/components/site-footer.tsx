import Link from "next/link";
import Logo from "./logo";
import { BIZ, SERVICES, SERVICE_TOWNS } from "@/lib/content";

export default function SiteFooter() {
  return (
    <footer className="bg-boggs-green-deep text-boggs-cream mt-20">
      <div className="container-wide py-14 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-1">
          <Logo variant="light" />
          <p className="mt-4 text-sm text-boggs-cream/70 max-w-xs">{BIZ.tagline}</p>
          <p className="mt-4 text-xs uppercase tracking-widest text-boggs-grass font-head font-semibold">
            Licensed &amp; Insured · Free Estimates
          </p>
        </div>

        <div>
          <h3 className="font-head font-bold text-sm uppercase tracking-wider text-boggs-cream/60 mb-4">Services</h3>
          <ul className="space-y-2 text-sm">
            {SERVICES.map((s) => (
              <li key={s.slug}>
                <Link href="/services" className="text-boggs-cream/85 hover:text-boggs-grass">
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-head font-bold text-sm uppercase tracking-wider text-boggs-cream/60 mb-4">Service Area</h3>
          <ul className="space-y-2 text-sm text-boggs-cream/85">
            {SERVICE_TOWNS.slice(0, 6).map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-head font-bold text-sm uppercase tracking-wider text-boggs-cream/60 mb-4">Get Started</h3>
          <a href={BIZ.phoneHref} className="block font-display text-2xl text-boggs-cream chiseled">
            {BIZ.phone}
          </a>
          <p className="text-xs text-boggs-cream/50 mt-1">{BIZ.city} · {BIZ.county}</p>
          <Link
            href="/estimate"
            className="mt-5 inline-block rounded-full bg-boggs-grass px-6 py-3 font-head font-bold text-boggs-black hover:brightness-105"
          >
            Get a Free Estimate
          </Link>
        </div>
      </div>

      <div className="border-t border-boggs-cream/10">
        <div className="container-wide py-5 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-boggs-cream/45">
          <p>© {new Date().getFullYear()} {BIZ.legal}. All rights reserved.</p>
          <p>
            Demo site by <span className="text-boggs-cream/70">Sweet Dreams</span> · not yet published
          </p>
        </div>
      </div>
    </footer>
  );
}
