import Link from "next/link";
import Reveal from "@/components/reveal";
import BeforeAfter from "@/components/before-after";
import { MEDIA } from "@/lib/media";
import { BEFORE_AFTER } from "@/lib/content";

export const metadata = {
  title: "Our Work — Boggs Pro Cut | Project Gallery",
  description:
    "Real Boggs Pro Cut projects across Allen County — retaining walls, paver walkways, designed beds, full-yard makeovers and snow clearing.",
};

const GALLERY = [
  { src: MEDIA.hardscape, tag: "Hardscaping", title: "Stacked-stone retaining wall & paver walkway", town: "Fort Wayne" },
  { src: MEDIA.landscape, tag: "Landscape Design", title: "Layered planting bed with fresh mulch", town: "Grabill" },
  { src: MEDIA.lawn, tag: "Lawn Care", title: "Crisp cut lines & clean edging", town: "New Haven" },
  { src: MEDIA.snow, tag: "Snow Removal", title: "Driveway plowed before dawn", town: "Leo-Cedarville" },
  { src: MEDIA.after, tag: "Full-Yard Makeover", title: "Complete backyard transformation", town: "Fort Wayne" },
];

export default function WorkPage() {
  return (
    <>
      <section className="bg-boggs-green text-boggs-cream pt-28 pb-16">
        <div className="container-wide">
          <Reveal>
            <p className="eyebrow text-boggs-grass mb-3">Proof, not promises</p>
            <h1 className="font-display text-5xl md:text-7xl chiseled leading-[0.92] max-w-3xl">
              The work speaks for itself.
            </h1>
            <p className="mt-5 max-w-xl text-boggs-cream/80 text-lg">
              Real transformations across Fort Wayne and Allen County. Drag any slider to see the
              before.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-boggs-cream">
        <div className="container-wide py-16 md:py-24">
          <Reveal>
            <h2 className="font-display text-2xl md:text-3xl text-boggs-green chiseled mb-8">Before &amp; after</h2>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2">
            {BEFORE_AFTER.map((b, i) => (
              <Reveal key={b.title} delay={i * 100}>
                <BeforeAfter {...b} />
              </Reveal>
            ))}
          </div>

          <Reveal>
            <h2 className="font-display text-2xl md:text-3xl text-boggs-green chiseled mt-20 mb-8">Recent projects</h2>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {GALLERY.map((g, i) => (
              <Reveal key={g.title} delay={i * 70}>
                <figure className="group overflow-hidden rounded-2xl bg-boggs-black shadow-card">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={g.src} alt={g.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                    <span className="absolute left-3 top-3 rounded-full bg-boggs-black/70 px-3 py-1 text-xs font-head font-bold uppercase tracking-wider text-boggs-cream">
                      {g.tag}
                    </span>
                  </div>
                  <figcaption className="bg-boggs-cream px-4 py-3">
                    <p className="font-head font-semibold text-boggs-black text-sm leading-tight">{g.title}</p>
                    <p className="text-xs text-boggs-flagstone mt-0.5">{g.town}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-16 text-center">
              <Link href="/estimate" className="inline-block rounded-full bg-boggs-grass px-8 py-4 font-head font-bold text-boggs-black hover:brightness-105">
                Start your project — free estimate
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
