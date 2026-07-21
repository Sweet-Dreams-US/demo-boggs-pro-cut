import Link from "next/link";
import Reveal from "@/components/reveal";
import { SERVICES, BIZ } from "@/lib/content";

export const metadata = {
  title: "Services — Boggs Pro Cut | Fort Wayne Landscaping & Hardscaping",
  description:
    "Lawn care, landscape design, hardscaping & masonry, and snow removal for Fort Wayne and Allen County. Residential and commercial.",
};

const accentBar: Record<string, string> = {
  green: "bg-boggs-green",
  grass: "bg-boggs-grass",
  flagstone: "bg-boggs-flagstone",
  steel: "bg-boggs-steel",
};

export default function ServicesPage() {
  return (
    <>
      <section className="bg-boggs-green text-boggs-cream pt-28 pb-16">
        <div className="container-wide">
          <Reveal>
            <p className="eyebrow text-boggs-grass mb-3">What we do</p>
            <h1 className="font-display text-5xl md:text-7xl chiseled leading-[0.92] max-w-3xl">
              Designed, built, maintained — all year.
            </h1>
            <p className="mt-5 max-w-xl text-boggs-cream/80 text-lg">
              Four services, one crew you already know. From premium stonework to a driveway plowed
              before dawn.
            </p>
          </Reveal>
        </div>
      </section>

      <div className="bg-boggs-cream">
        <div className="container-wide py-16 md:py-24 space-y-20">
          {SERVICES.map((s, i) => (
            <Reveal key={s.slug}>
              <div
                id={s.slug}
                className={`grid gap-8 lg:grid-cols-2 lg:items-center ${i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}
              >
                <div className="overflow-hidden rounded-3xl shadow-soft">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={s.image} alt={s.name} className="w-full aspect-[4/3] object-cover" />
                </div>
                <div>
                  <span className={`inline-block h-1.5 w-10 rounded-full mb-4 ${accentBar[s.accent]}`} />
                  {s.flagship && (
                    <span className="ml-3 inline-block rounded-full bg-boggs-mulch/10 px-3 py-1 text-xs font-head font-bold uppercase tracking-wider text-boggs-mulch align-middle">
                      Premium flagship
                    </span>
                  )}
                  <h2 className="font-display text-4xl md:text-5xl text-boggs-green chiseled leading-[0.95]">
                    {s.name}
                  </h2>
                  <p className="mt-4 text-lg text-boggs-black/75 max-w-lg">{s.blurb}</p>
                  <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2.5 text-boggs-black/80">
                        <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-boggs-green/10 text-boggs-green">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                        <span className="text-sm font-body">{b}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/estimate?service=${s.slug}`}
                    className="mt-8 inline-block rounded-full bg-boggs-grass px-6 py-3 font-head font-bold text-boggs-black hover:brightness-105"
                  >
                    Get a free estimate
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}

          {/* commercial block */}
          <Reveal>
            <div className="rounded-3xl bg-boggs-steel text-boggs-cream p-8 md:p-12 grid gap-6 md:grid-cols-[1.4fr_1fr] md:items-center">
              <div>
                <p className="eyebrow text-boggs-grass mb-2">Commercial &amp; property partnerships</p>
                <h2 className="font-display text-3xl md:text-4xl chiseled">Year-round grounds + winter plowing, one contract.</h2>
                <p className="mt-3 text-boggs-cream/80 max-w-xl">
                  Property managers and business owners: keep your lots, entrances and grounds sharp
                  in every season with a single local crew — and priority plow routes when the snow
                  hits.
                </p>
              </div>
              <div className="md:text-right">
                <a href={BIZ.phoneHref} className="font-display text-3xl chiseled text-boggs-cream">{BIZ.phone}</a>
                <Link href="/estimate" className="mt-4 block md:inline-block rounded-full bg-boggs-grass px-6 py-3 font-head font-bold text-boggs-black">
                  Request a property quote
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </>
  );
}
