import Link from "next/link";
import Reveal from "@/components/reveal";
import BeforeAfter from "@/components/before-after";
import ScrollScene from "@/components/scroll-scene";
import EstimateBuilder from "@/components/estimate-builder";
import { MEDIA, scrollFrame, SCROLL_FRAME_COUNT } from "@/lib/media";
import {
  BIZ,
  SERVICES,
  SEASONS,
  DIFFERENCE,
  BEFORE_AFTER,
  REVIEWS,
  SERVICE_TOWNS,
} from "@/lib/content";

const frames = Array.from({ length: SCROLL_FRAME_COUNT }, (_, i) => scrollFrame(i + 1));

const accentText: Record<string, string> = {
  green: "text-boggs-green",
  grass: "text-boggs-grass",
  flagstone: "text-boggs-flagstone",
  steel: "text-boggs-steel",
};
const accentBar: Record<string, string> = {
  green: "bg-boggs-green",
  grass: "bg-boggs-grass",
  flagstone: "bg-boggs-flagstone",
  steel: "bg-boggs-steel",
};

export default function Home() {
  return (
    <>
      {/* ================= HERO ================= */}
      <section className="relative min-h-[92vh] flex items-end overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={MEDIA.after} alt="A finished Boggs Pro Cut landscape in Fort Wayne" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-boggs-green-deep via-boggs-green-deep/70 to-boggs-black/45" />
        <div className="absolute inset-0 bg-gradient-to-r from-boggs-black/75 via-boggs-black/25 to-transparent" />
        <div className="absolute inset-0 grain opacity-40" />
        <div className="container-wide relative pb-16 md:pb-24 pt-28">
          <Reveal>
            <p className="eyebrow text-boggs-grass mb-4">Fort Wayne · {BIZ.county}</p>
            <h1 className="font-display text-5xl sm:text-7xl md:text-8xl text-boggs-cream chiseled leading-[0.9] max-w-4xl">
              One local crew.<br />Every season.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-boggs-cream/85 font-body">
              Family-owned landscaping, hardscaping &amp; snow removal — designed, built, and
              maintained. From the first cut to the final snow.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/estimate"
                className="rounded-full bg-boggs-grass px-7 py-4 font-head font-bold text-boggs-black shadow-soft transition hover:brightness-105 active:scale-[0.98]"
              >
                Get a Free Estimate
              </Link>
              <Link
                href="/work"
                className="rounded-full border-2 border-boggs-cream/40 bg-white/5 px-7 py-4 font-head font-bold text-boggs-cream backdrop-blur transition hover:bg-white/10"
              >
                See Our Work
              </Link>
            </div>
            <p className="mt-6 text-sm text-boggs-cream/70 font-head tracking-wide">
              Licensed &amp; insured · 1-year guarantee · Residential &amp; commercial
            </p>
          </Reveal>
        </div>
      </section>

      {/* ================= FOUR SEASONS BAND ================= */}
      <section className="bg-boggs-green text-boggs-cream">
        <div className="container-wide py-14 md:py-20">
          <Reveal>
            <p className="eyebrow text-boggs-grass text-center mb-3">We handle your yard all year</p>
            <h2 className="font-display text-3xl md:text-5xl text-center chiseled mb-12">Four seasons, one crew</h2>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {SEASONS.map((s, i) => (
              <Reveal key={s.key} delay={i * 90}>
                <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-6 h-full">
                  <span
                    className="inline-block h-2 w-10 rounded-full mb-4"
                    style={{ background: s.color }}
                  />
                  <p className="font-display text-2xl chiseled">{s.label}</p>
                  <p className="font-head font-semibold text-boggs-grass mt-1">{s.line}</p>
                  <p className="text-sm text-boggs-cream/70 mt-2">{s.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= HARDSCAPE FLAGSHIP ================= */}
      <section className="bg-boggs-cream">
        <div className="container-wide py-16 md:py-24 grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl shadow-soft">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={MEDIA.hardscape} alt="Stone retaining wall and paver walkway built by Boggs Pro Cut" className="w-full aspect-[4/3] object-cover" />
              <span className="absolute left-5 top-5 rounded-full bg-boggs-black/70 px-4 py-1.5 text-xs font-head font-bold uppercase tracking-widest text-boggs-cream">
                Flagship craft
              </span>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <p className="eyebrow text-boggs-mulch mb-3">Hardscaping &amp; Masonry</p>
            <h2 className="font-display text-4xl md:text-6xl text-boggs-green chiseled leading-[0.95]">
              Not a mow-and-go crew.
            </h2>
            <p className="mt-5 text-lg text-boggs-black/75 max-w-lg">
              Retaining walls, paver walkways and stone work built to last. It&apos;s the
              craftsmanship that separates Boggs from every $40 mow guy — and it&apos;s what makes a
              yard finally look designed, not just cut.
            </p>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-head font-semibold text-boggs-green">
              <span>· Retaining walls</span>
              <span>· Paver walkways &amp; patios</span>
              <span>· Natural stone &amp; masonry</span>
            </div>
            <Link href="/services" className="mt-8 inline-flex items-center gap-2 font-head font-bold text-boggs-green group">
              Explore hardscaping
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ================= SERVICES GRID ================= */}
      <section className="bg-white border-y border-boggs-cream-dim">
        <div className="container-wide py-16 md:py-24">
          <Reveal>
            <p className="eyebrow text-boggs-grass mb-3">What we do</p>
            <h2 className="font-display text-3xl md:text-5xl text-boggs-green chiseled mb-12 max-w-2xl">
              Everything your property needs, year-round
            </h2>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-2">
            {SERVICES.map((s, i) => (
              <Reveal key={s.slug} delay={i * 80}>
                <Link
                  href="/services"
                  className="group flex gap-5 rounded-2xl bg-boggs-cream/60 p-5 ring-1 ring-boggs-cream-dim transition hover:ring-boggs-green/40 hover:bg-boggs-cream h-full"
                >
                  <div className="relative shrink-0 overflow-hidden rounded-xl w-28 h-28 md:w-32 md:h-32">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={s.image} alt={s.name} className="h-full w-full object-cover transition group-hover:scale-105" />
                  </div>
                  <div>
                    <span className={`inline-block h-1.5 w-8 rounded-full mb-2 ${accentBar[s.accent]}`} />
                    <h3 className={`font-head font-bold text-lg ${accentText[s.accent]}`}>{s.name}</h3>
                    <p className="text-sm text-boggs-black/70 mt-1">{s.short}</p>
                    {s.flagship && (
                      <span className="mt-2 inline-block rounded-full bg-boggs-mulch/10 px-2.5 py-0.5 text-[0.7rem] font-head font-bold uppercase tracking-wider text-boggs-mulch">
                        Premium flagship
                      </span>
                    )}
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SIGNATURE SCROLL ================= */}
      <ScrollScene frames={frames} />

      {/* ================= THE BOGGS DIFFERENCE ================= */}
      <section className="bg-boggs-cream">
        <div className="container-wide py-16 md:py-24">
          <Reveal>
            <p className="eyebrow text-boggs-mulch mb-3">The Boggs difference</p>
            <h2 className="font-display text-3xl md:text-5xl text-boggs-green chiseled mb-12 max-w-2xl">
              Claims are cheap. Here&apos;s the promise.
            </h2>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {DIFFERENCE.map((d, i) => (
              <Reveal key={d.title} delay={i * 70}>
                <div className="rounded-2xl bg-white p-6 ring-1 ring-boggs-cream-dim h-full">
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-boggs-green/10 text-boggs-green mb-4">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3 className="font-head font-bold text-boggs-black">{d.title}</h3>
                  <p className="text-sm text-boggs-black/65 mt-1.5">{d.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= BEFORE / AFTER ================= */}
      <section className="bg-white border-y border-boggs-cream-dim">
        <div className="container-wide py-16 md:py-24">
          <Reveal>
            <p className="eyebrow text-boggs-grass mb-3">Proof, not promises</p>
            <div className="flex flex-wrap items-end justify-between gap-4 mb-12">
              <h2 className="font-display text-3xl md:text-5xl text-boggs-green chiseled max-w-xl">
                Drag to see the transformation
              </h2>
              <Link href="/work" className="font-head font-bold text-boggs-green">View full gallery →</Link>
            </div>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2">
            {BEFORE_AFTER.map((b, i) => (
              <Reveal key={b.title} delay={i * 100}>
                <BeforeAfter {...b} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SERVICE AREA ================= */}
      <section className="bg-boggs-green text-boggs-cream">
        <div className="container-wide py-16 md:py-24 grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <p className="eyebrow text-boggs-grass mb-3">Where we work</p>
            <h2 className="font-display text-3xl md:text-5xl chiseled">Proudly serving Allen County</h2>
            <p className="mt-4 text-boggs-cream/80 max-w-md">
              Fort Wayne and the towns around it — residential and commercial. If you&apos;re nearby,
              we&apos;ve probably already cleared a driveway on your street.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {SERVICE_TOWNS.map((t) => (
                <span key={t} className="rounded-full bg-white/10 px-4 py-1.5 text-sm font-head font-semibold">
                  {t}
                </span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="overflow-hidden rounded-3xl ring-1 ring-white/15 shadow-soft">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={MEDIA.map} alt="Boggs Pro Cut service area map — Allen County, Indiana" className="w-full aspect-[4/3] object-cover" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= REVIEWS ================= */}
      <section className="bg-boggs-cream">
        <div className="container-wide py-16 md:py-24">
          <Reveal>
            <p className="eyebrow text-boggs-mulch mb-3 text-center">What neighbors say</p>
            <h2 className="font-display text-3xl md:text-5xl text-boggs-green chiseled text-center mb-3">
              Trusted across town
            </h2>
            <p className="text-center text-sm text-boggs-flagstone mb-12">
              Sample quotes — real Google &amp; Facebook reviews drop in here before launch.
            </p>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-3">
            {REVIEWS.map((r, i) => (
              <Reveal key={i} delay={i * 90}>
                <figure className="rounded-2xl bg-white p-6 ring-1 ring-boggs-cream-dim h-full flex flex-col">
                  <div className="flex gap-1 text-boggs-grass mb-3">
                    {Array.from({ length: 5 }).map((_, k) => (
                      <svg key={k} width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2l3 6.5 7 .9-5 4.9 1.3 7L12 18l-6.6 3.3L6.7 14 1.7 9.4l7-.9L12 2z" />
                      </svg>
                    ))}
                  </div>
                  <blockquote className="text-boggs-black/80 flex-1">&ldquo;{r.quote}&rdquo;</blockquote>
                  <figcaption className="mt-4 text-sm font-head font-semibold text-boggs-green">
                    {r.name} · <span className="text-boggs-flagstone font-normal">{r.town}</span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= ESTIMATE BAND ================= */}
      <section id="estimate" className="bg-boggs-green-deep text-boggs-cream">
        <div className="container-wide py-16 md:py-24 grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <p className="eyebrow text-boggs-grass mb-3">Free &amp; no-obligation</p>
            <h2 className="font-display text-4xl md:text-6xl chiseled leading-[0.95]">
              Let&apos;s make your yard the best on the block.
            </h2>
            <p className="mt-5 text-boggs-cream/80 max-w-md">
              Tell us what you need — pick any mix of services, add a photo, drop your address. One
              form, and a real person gets back to you within a business day.
            </p>
            <div className="mt-8">
              <p className="font-head text-sm uppercase tracking-widest text-boggs-cream/60">Or just call</p>
              <a href={BIZ.phoneHref} className="font-display text-3xl md:text-4xl text-boggs-cream chiseled">
                {BIZ.phone}
              </a>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <EstimateBuilder />
          </Reveal>
        </div>
      </section>
    </>
  );
}
