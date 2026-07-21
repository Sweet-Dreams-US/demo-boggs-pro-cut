import Link from "next/link";
import Reveal from "@/components/reveal";
import { MEDIA } from "@/lib/media";
import { BIZ, DIFFERENCE } from "@/lib/content";

export const metadata = {
  title: "Our Story — Boggs Pro Cut | Family-Owned Fort Wayne Landscaping",
  description:
    "Family-owned and local for over a decade. Meet the Boggs Pro Cut crew and the craftsmanship behind every wall, bed and cut.",
};

export default function StoryPage() {
  return (
    <>
      <section className="relative pt-28 pb-20 overflow-hidden bg-boggs-green-deep text-boggs-cream">
        <div className="container-wide grid gap-10 lg:grid-cols-2 lg:items-center relative">
          <Reveal>
            <p className="eyebrow text-boggs-grass mb-3">Our story</p>
            <h1 className="font-display text-5xl md:text-7xl chiseled leading-[0.92]">
              The neighbor who does beautiful work.
            </h1>
            <p className="mt-5 text-boggs-cream/80 text-lg max-w-lg">
              Boggs Pro Cut has been a family-owned fixture in Fort Wayne for {BIZ.yearsClaim}. The
              owner is on the crew, the crew knows your street, and the work gets done like it&apos;s
              their own yard — because pride is the whole point.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <div className="overflow-hidden rounded-3xl shadow-soft ring-1 ring-white/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={MEDIA.crew} alt="The Boggs Pro Cut crew" className="w-full aspect-[3/2] object-cover" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-boggs-cream">
        <div className="container-wide py-16 md:py-24">
          <div className="grid gap-12 lg:grid-cols-3">
            <Reveal>
              <div>
                <h2 className="font-display text-2xl text-boggs-green chiseled mb-3">Rooted here</h2>
                <p className="text-boggs-black/75">
                  We&apos;re not a franchise routed in from out of town. Boggs is Fort Wayne — the
                  same faces, season after season, from the east side out through Allen County.
                </p>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div>
                <h2 className="font-display text-2xl text-boggs-green chiseled mb-3">Built to last</h2>
                <p className="text-boggs-black/75">
                  Our hardscaping is where the craft really shows. A wall we build is engineered to
                  hold and set to look right for decades — not stacked and forgotten.
                </p>
              </div>
            </Reveal>
            <Reveal delay={160}>
              <div>
                <h2 className="font-display text-2xl text-boggs-green chiseled mb-3">Personal by default</h2>
                <p className="text-boggs-black/75">
                  &ldquo;Personalized attention&rdquo; isn&apos;t a slogan when it&apos;s the
                  owner&apos;s crew on your property. You get a direct line and a real answer.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal>
            <div className="mt-16 rounded-3xl bg-white ring-1 ring-boggs-cream-dim p-8 md:p-12">
              <h2 className="font-display text-3xl text-boggs-green chiseled mb-8">Why homeowners stay with us</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {DIFFERENCE.map((d) => (
                  <div key={d.title} className="flex gap-3">
                    <span className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-boggs-green/10 text-boggs-green">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <div>
                      <p className="font-head font-bold text-boggs-black">{d.title}</p>
                      <p className="text-sm text-boggs-black/65 mt-0.5">{d.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="mt-14 text-center">
              <p className="font-display text-3xl md:text-4xl text-boggs-green chiseled max-w-2xl mx-auto">
                &ldquo;{BIZ.tagline}&rdquo;
              </p>
              <Link href="/estimate" className="mt-8 inline-block rounded-full bg-boggs-grass px-8 py-4 font-head font-bold text-boggs-black hover:brightness-105">
                Get your free estimate
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
