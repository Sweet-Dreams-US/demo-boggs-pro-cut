"use client";
import { useEffect, useRef, useState } from "react";

/**
 * Signature "Build + Seasons" scroll section.
 * A tall pinned section scrubs through a frame sequence (extracted from the two
 * Higgsfield clips) so the yard builds itself, then cycles into snow, as you scroll.
 * Motion captions cross-fade at milestones; the logo resolves on the capstone at the end.
 */
export default function ScrollScene({ frames }: { frames: string[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgs = useRef<(HTMLImageElement | null)[]>([]);
  const loaded = useRef(0);
  const raf = useRef<number>(0);
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);

  // preload
  useEffect(() => {
    imgs.current = frames.map(() => null);
    frames.forEach((src, i) => {
      const im = new Image();
      im.decoding = "async";
      im.onload = () => {
        imgs.current[i] = im;
        loaded.current += 1;
        if (loaded.current >= Math.min(4, frames.length)) setReady(true);
        if (i === 0) draw(0);
      };
      im.onerror = () => {
        loaded.current += 1;
      };
      im.src = src;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const draw = (p: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const n = frames.length;
    let idx = Math.min(n - 1, Math.max(0, Math.round(p * (n - 1))));
    // snap to nearest loaded frame
    if (!imgs.current[idx]) {
      let lo = idx, hi = idx;
      while (lo >= 0 || hi < n) {
        if (lo >= 0 && imgs.current[lo]) { idx = lo; break; }
        if (hi < n && imgs.current[hi]) { idx = hi; break; }
        lo--; hi++;
      }
    }
    const im = imgs.current[idx];
    if (!im) return;
    const cw = canvas.width, ch = canvas.height;
    const ir = im.width / im.height, cr = cw / ch;
    let dw = cw, dh = ch, dx = 0, dy = 0;
    if (ir > cr) { dh = ch; dw = ch * ir; dx = (cw - dw) / 2; }
    else { dw = cw; dh = cw / ir; dy = (ch - dh) / 2; }
    ctx.drawImage(im, dx, dy, dw, dh);
  };

  useEffect(() => {
    const resize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      draw(progress);
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const p = Math.min(1, Math.max(0, -rect.top / total));
      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        setProgress(p);
        draw(p);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const captions = [
    { at: 0.02, to: 0.32, kicker: "The Build", line: "It starts bare." },
    { at: 0.32, to: 0.62, kicker: "Design · Build", line: "We design it. We build it in stone." },
    { at: 0.62, to: 0.86, kicker: "Every Season", line: "Then we keep it — clear into the snow." },
  ];

  return (
    <section ref={sectionRef} className="relative h-[320vh] bg-boggs-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" style={{ width: "100%", height: "100%" }} />
        {/* grade for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-boggs-black/70 via-transparent to-boggs-black/30" />

        {!ready && (
          <div className="absolute inset-0 grid place-items-center">
            <span className="font-head text-sm uppercase tracking-widest text-boggs-cream/70 animate-pulse">
              Loading the yard…
            </span>
          </div>
        )}

        {/* motion captions */}
        <div className="absolute inset-0 flex items-end md:items-center">
          <div className="container-wide pb-24 md:pb-0">
            {captions.map((c, i) => {
              const active = progress >= c.at && progress < c.to;
              return (
                <div
                  key={i}
                  className="absolute max-w-2xl transition-all duration-500"
                  style={{
                    opacity: active ? 1 : 0,
                    transform: active ? "translateY(0)" : "translateY(20px)",
                  }}
                >
                  <p className="eyebrow text-boggs-grass mb-3">{c.kicker}</p>
                  <p className="font-display text-4xl sm:text-6xl md:text-7xl text-boggs-cream chiseled leading-[0.95]">
                    {c.line}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* logo reveal on the capstone */}
        <div
          className="absolute inset-0 grid place-items-center transition-all duration-700"
          style={{ opacity: progress >= 0.88 ? 1 : 0, transform: progress >= 0.88 ? "scale(1)" : "scale(0.94)" }}
        >
          <div className="text-center">
            <p className="font-display text-5xl sm:text-7xl md:text-8xl text-boggs-cream chiseled leading-none">
              BOGGS PRO CUT
            </p>
            <p className="mt-3 font-head text-sm md:text-base uppercase tracking-[0.35em] text-boggs-grass">
              First cut to final snow
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
