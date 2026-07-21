import Reveal from "@/components/reveal";
import EstimateBuilder from "@/components/estimate-builder";
import { BIZ, SERVICE_TOWNS } from "@/lib/content";

export const metadata = {
  title: "Free Estimate — Boggs Pro Cut | Fort Wayne Landscaping",
  description:
    "Get a free, no-obligation estimate for lawn care, landscape design, hardscaping or snow removal in Fort Wayne & Allen County.",
};

export default function EstimatePage({
  searchParams,
}: {
  searchParams: { service?: string };
}) {
  return (
    <section className="bg-boggs-green-deep text-boggs-cream min-h-screen pt-24 pb-16">
      <div className="container-wide grid gap-10 lg:grid-cols-2 lg:items-start">
        <Reveal>
          <p className="eyebrow text-boggs-grass mb-3">Free &amp; no-obligation</p>
          <h1 className="font-display text-5xl md:text-7xl chiseled leading-[0.92]">
            Get your free estimate
          </h1>
          <p className="mt-5 text-boggs-cream/80 text-lg max-w-md">
            Pick any mix of services, add a photo of the area, and drop your address. One quick form
            — a real Boggs crew member replies within a business day.
          </p>

          <div className="mt-10 space-y-4">
            {[
              ["Free & no pressure", "Every estimate is on us — no obligation, ever."],
              ["Local & fast", "A Fort Wayne crew, not a call center. Usually same-week."],
              ["Every season", "Lawn, design, stone or snow — book it all in one place."],
            ].map(([t, b]) => (
              <div key={t} className="flex gap-3">
                <span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-boggs-grass text-boggs-black">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <div>
                  <p className="font-head font-bold">{t}</p>
                  <p className="text-sm text-boggs-cream/70">{b}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <p className="font-head text-sm uppercase tracking-widest text-boggs-cream/60 mb-1">Prefer to call?</p>
            <a href={BIZ.phoneHref} className="font-display text-3xl md:text-4xl text-boggs-cream chiseled">
              {BIZ.phone}
            </a>
            <p className="mt-4 text-xs text-boggs-cream/50">
              Serving {SERVICE_TOWNS.slice(0, 5).join(" · ")} &amp; all of Allen County
            </p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <EstimateBuilder preselect={searchParams.service} />
        </Reveal>
      </div>
    </section>
  );
}
