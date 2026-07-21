"use client";
import { useMemo, useState } from "react";
import { SERVICES, SERVICE_TOWNS } from "@/lib/content";

const UPSELLS: Record<string, { id: string; label: string }[]> = {
  "landscape-design": [
    { id: "mulch", label: "Seasonal mulch refresh" },
    { id: "walkway", label: "Add a paver walkway" },
    { id: "wall", label: "Add a retaining wall" },
  ],
  hardscaping: [
    { id: "lighting", label: "Low-voltage path lighting" },
    { id: "beds", label: "Planting beds around the wall" },
  ],
  "lawn-care": [
    { id: "recurring", label: "Lock a recurring plan (save 10%)" },
    { id: "cleanup", label: "Spring + fall cleanup package" },
  ],
  "snow-removal": [
    { id: "seasonal", label: "Full-season contract (best value)" },
    { id: "salt", label: "Add ice / salt treatment" },
  ],
};

const accentBg: Record<string, string> = {
  green: "bg-boggs-green",
  grass: "bg-boggs-grass",
  flagstone: "bg-boggs-flagstone",
  steel: "bg-boggs-steel",
};

export default function EstimateBuilder({ preselect }: { preselect?: string }) {
  const [selected, setSelected] = useState<string[]>(preselect ? [preselect] : []);
  const [addons, setAddons] = useState<string[]>([]);
  const [prop, setProp] = useState<"residential" | "commercial">("residential");
  const [size, setSize] = useState("");
  const [address, setAddress] = useState("");
  const [file, setFile] = useState<string>("");
  const [done, setDone] = useState(false);

  const toggle = (slug: string) =>
    setSelected((s) => (s.includes(slug) ? s.filter((x) => x !== slug) : [...s, slug]));
  const toggleAddon = (id: string) =>
    setAddons((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const areaCheck = useMemo(() => {
    if (!address.trim()) return null;
    const hit = SERVICE_TOWNS.some((t) => address.toLowerCase().includes(t.toLowerCase()));
    return hit;
  }, [address]);

  const upsells = useMemo(
    () => selected.flatMap((s) => (UPSELLS[s] || []).map((u) => ({ ...u, from: s }))),
    [selected]
  );

  if (done) {
    return (
      <div className="rounded-2xl bg-boggs-green text-boggs-cream p-8 md:p-12 text-center shadow-soft">
        <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-boggs-grass text-boggs-black">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="font-display text-3xl md:text-4xl chiseled">Estimate request in.</h3>
        <p className="mt-3 text-boggs-cream/80 max-w-md mx-auto">
          Thanks — a Boggs crew member will reach out within one business day with your free estimate.
          (This is a demo: nothing was actually submitted.)
        </p>
        <button
          onClick={() => {
            setDone(false);
            setSelected([]);
            setAddons([]);
          }}
          className="mt-6 rounded-full bg-boggs-cream px-6 py-2.5 font-head font-bold text-boggs-green"
        >
          Start another
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white shadow-soft ring-1 ring-boggs-cream-dim overflow-hidden">
      <div className="bg-boggs-green px-6 md:px-8 py-5">
        <p className="eyebrow text-boggs-grass">Free Estimate</p>
        <h3 className="font-display text-2xl md:text-3xl text-boggs-cream chiseled mt-1">
          Build your estimate
        </h3>
        <p className="text-boggs-cream/70 text-sm mt-1">
          Pick what you need, add a few details — one form, no page hops.
        </p>
      </div>

      <div className="p-6 md:p-8 space-y-7">
        {/* 1. services */}
        <div>
          <label className="font-head font-bold text-sm text-boggs-black">1 · What do you need?</label>
          <div className="mt-3 grid grid-cols-2 gap-2.5">
            {SERVICES.map((s) => {
              const on = selected.includes(s.slug);
              return (
                <button
                  key={s.slug}
                  type="button"
                  onClick={() => toggle(s.slug)}
                  className={`text-left rounded-xl border-2 p-3 transition ${
                    on ? "border-boggs-green bg-boggs-green/5" : "border-boggs-cream-dim hover:border-boggs-green/40"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className={`grid h-6 w-6 place-items-center rounded-md ${accentBg[s.accent]} text-white text-xs`}>
                      {on ? "✓" : ""}
                    </span>
                    <span className="font-head font-semibold text-sm text-boggs-black leading-tight">{s.name}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* upsells (contextual) */}
        {upsells.length > 0 && (
          <div className="rounded-xl bg-boggs-cream/70 p-4 animate-fade-up">
            <p className="font-head font-bold text-xs uppercase tracking-wider text-boggs-flagstone mb-2.5">
              Add on &amp; save a trip
            </p>
            <div className="flex flex-wrap gap-2">
              {upsells.map((u) => {
                const on = addons.includes(u.id);
                return (
                  <button
                    key={u.id}
                    type="button"
                    onClick={() => toggleAddon(u.id)}
                    className={`rounded-full px-3.5 py-1.5 text-sm font-head font-semibold transition ${
                      on ? "bg-boggs-grass text-boggs-black" : "bg-white text-boggs-black/70 ring-1 ring-boggs-cream-dim hover:ring-boggs-grass"
                    }`}
                  >
                    {on ? "✓ " : "+ "}
                    {u.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* 2. property */}
        <div>
          <label className="font-head font-bold text-sm text-boggs-black">2 · Property</label>
          <div className="mt-3 flex gap-2">
            {(["residential", "commercial"] as const).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setProp(p)}
                className={`flex-1 rounded-xl border-2 py-2.5 font-head font-semibold text-sm capitalize transition ${
                  prop === p ? "border-boggs-green bg-boggs-green text-boggs-cream" : "border-boggs-cream-dim text-boggs-black/70"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
          <select
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="mt-2.5 w-full rounded-xl border-2 border-boggs-cream-dim bg-white px-3.5 py-2.5 font-body text-sm text-boggs-black outline-none focus:border-boggs-green"
          >
            <option value="">Rough size / scope…</option>
            <option>Small yard (under 1/4 acre)</option>
            <option>Average lot (1/4–1/2 acre)</option>
            <option>Large property (1/2+ acre)</option>
            <option>Commercial lot / multi-site</option>
          </select>
        </div>

        {/* 3. address + area check */}
        <div>
          <label className="font-head font-bold text-sm text-boggs-black">3 · Where&apos;s the property?</label>
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Street, city (e.g. New Haven)"
            className="mt-3 w-full rounded-xl border-2 border-boggs-cream-dim bg-white px-3.5 py-2.5 font-body text-sm outline-none focus:border-boggs-green"
          />
          {areaCheck === true && (
            <p className="mt-2 text-sm font-head font-semibold text-boggs-green">✓ You&apos;re in our service area.</p>
          )}
          {areaCheck === false && (
            <p className="mt-2 text-sm text-boggs-flagstone">
              We&apos;ll confirm coverage — we serve Fort Wayne &amp; most of Allen County.
            </p>
          )}
        </div>

        {/* 4. photo upload */}
        <div>
          <label className="font-head font-bold text-sm text-boggs-black">4 · Add a photo (optional)</label>
          <label className="mt-3 flex cursor-pointer items-center gap-3 rounded-xl border-2 border-dashed border-boggs-cream-dim px-4 py-3.5 hover:border-boggs-green/50">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-boggs-cream text-boggs-green">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M5 12h14" strokeLinecap="round" />
              </svg>
            </span>
            <span className="text-sm text-boggs-black/70 font-body">
              {file || "Upload a photo of the yard or area"}
            </span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setFile(e.target.files?.[0]?.name || "")}
            />
          </label>
        </div>

        {/* 5. contact */}
        <div className="grid gap-2.5 sm:grid-cols-2">
          <input placeholder="Your name" className="rounded-xl border-2 border-boggs-cream-dim bg-white px-3.5 py-2.5 text-sm outline-none focus:border-boggs-green" />
          <input placeholder="Phone" className="rounded-xl border-2 border-boggs-cream-dim bg-white px-3.5 py-2.5 text-sm outline-none focus:border-boggs-green" />
        </div>

        <button
          type="button"
          onClick={() => setDone(true)}
          disabled={selected.length === 0}
          className="w-full rounded-xl bg-boggs-grass py-4 font-head font-bold text-lg text-boggs-black shadow-sm transition enabled:hover:brightness-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {selected.length === 0 ? "Pick a service to continue" : "Get my free estimate"}
        </button>
        <p className="text-center text-xs text-boggs-flagstone -mt-3">
          Free &amp; no-obligation · Licensed &amp; insured · Usually a reply within 1 business day
        </p>
      </div>
    </div>
  );
}
