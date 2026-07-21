"use client";
import { useRef, useState, useCallback } from "react";

export default function BeforeAfter({
  before,
  after,
  title,
  tag,
  town,
}: {
  before: string;
  after: string;
  title: string;
  tag: string;
  town: string;
}) {
  const [pos, setPos] = useState(50);
  const wrap = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const set = useCallback((clientX: number) => {
    const el = wrap.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const p = ((clientX - r.left) / r.width) * 100;
    setPos(Math.max(0, Math.min(100, p)));
  }, []);

  return (
    <figure className="group overflow-hidden rounded-2xl bg-boggs-black shadow-card">
      <div
        ref={wrap}
        className="relative aspect-[4/3] w-full select-none overflow-hidden cursor-ew-resize touch-none"
        onPointerDown={(e) => {
          dragging.current = true;
          (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
          set(e.clientX);
        }}
        onPointerMove={(e) => dragging.current && set(e.clientX)}
        onPointerUp={() => (dragging.current = false)}
      >
        {/* after (base) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={after} alt={`${title} — after`} className="absolute inset-0 h-full w-full object-cover" draggable={false} />
        {/* before (clipped) */}
        <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={before}
            alt={`${title} — before`}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ width: wrap.current ? wrap.current.clientWidth : "100%", maxWidth: "none" }}
            draggable={false}
          />
          <span className="absolute left-3 top-3 rounded-full bg-boggs-black/70 px-3 py-1 text-xs font-head font-bold uppercase tracking-wider text-boggs-cream">
            Before
          </span>
        </div>
        <span className="absolute right-3 top-3 rounded-full bg-boggs-grass/90 px-3 py-1 text-xs font-head font-bold uppercase tracking-wider text-boggs-black">
          After
        </span>

        {/* handle */}
        <div className="absolute inset-y-0" style={{ left: `${pos}%`, transform: "translateX(-50%)" }}>
          <div className="h-full w-0.5 bg-boggs-cream/90" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 grid h-9 w-9 place-items-center rounded-full bg-boggs-cream text-boggs-green shadow-md">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
              <path d="M9 7L4 12l5 5M15 7l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
      <figcaption className="flex items-center justify-between gap-3 bg-boggs-cream px-4 py-3">
        <div>
          <p className="font-head font-bold text-boggs-black leading-tight">{title}</p>
          <p className="text-xs text-boggs-flagstone">{town}</p>
        </div>
        <span className="shrink-0 rounded-full bg-boggs-green/10 px-3 py-1 text-xs font-head font-semibold text-boggs-green">
          {tag}
        </span>
      </figcaption>
    </figure>
  );
}
