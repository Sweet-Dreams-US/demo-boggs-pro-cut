"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { MEDIA } from "@/lib/media";

type TabDef = { key: string; icon: string; locked: boolean };

const INBOX_ICON = "M4 7l8 5 8-5M4 7a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V7z";

const TABS: TabDef[] = [
  { key: "Inquiries", icon: INBOX_ICON, locked: false },
  { key: "Dashboard", icon: "M4 13h6V4H4v9zm0 7h6v-5H4v5zm10 0h6v-9h-6v9zm0-16v5h6V4h-6z", locked: true },
  { key: "Schedule", icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z", locked: true },
  { key: "Jobs", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2", locked: true },
  { key: "Staff", icon: "M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1.13a4 4 0 10-4-4 4 4 0 004 4z", locked: true },
  { key: "Menu", icon: "M4 6h16M4 12h16M4 18h16", locked: true },
  { key: "Customers", icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z", locked: true },
  { key: "Analytics", icon: "M3 3v18h18M7 15l3-3 3 3 5-6", locked: true },
  { key: "Accounting", icon: "M12 8c-1.7 0-3 .9-3 2s1.3 2 3 2 3 .9 3 2-1.3 2-3 2m0-8V6m0 8v2", locked: true },
  { key: "Settings", icon: "M10.3 3.3a1 1 0 011.4 0l1 1a1 1 0 00.9.3l1.4-.2a1 1 0 011.1.7l.5 1.3a1 1 0 00.6.6l1.3.5a1 1 0 01.7 1.1l-.2 1.4a1 1 0 00.3.9l1 1a1 1 0 010 1.4l-1 1a1 1 0 00-.3.9l.2 1.4a1 1 0 01-.7 1.1l-1.3.5a1 1 0 00-.6.6l-.5 1.3a1 1 0 01-1.1.7l-1.4-.2a1 1 0 00-.9.3l-1 1a1 1 0 01-1.4 0l-1-1a1 1 0 00-.9-.3l-1.4.2a1 1 0 01-1.1-.7l-.5-1.3a1 1 0 00-.6-.6l-1.3-.5a1 1 0 01-.7-1.1l.2-1.4a1 1 0 00-.3-.9l-1-1a1 1 0 010-1.4l1-1a1 1 0 00.3-.9l-.2-1.4a1 1 0 01.7-1.1l1.3-.5a1 1 0 00.6-.6l.5-1.3a1 1 0 011.1-.7l1.4.2a1 1 0 00.9-.3l1-1zM12 15a3 3 0 100-6 3 3 0 000 6z", locked: true },
];

type Status = "New" | "Quoted" | "Sent";
type Inquiry = {
  id: string;
  name: string;
  phone: string;
  town: string;
  address: string;
  services: string[];
  property: "Residential" | "Commercial";
  size: string;
  message: string;
  photo: string | null;
  received: string;
  status: Status;
};

const INITIAL: Inquiry[] = [
  {
    id: "LEAD-2041", name: "Marcus Reyes", phone: "(260) 555-0142", town: "Fort Wayne",
    address: "4210 Tillman Rd", services: ["Hardscaping", "Landscape Design"], property: "Residential",
    size: "Average lot (¼–½ acre)", message: "Bare slope in the back — want a retaining wall and some planting beds. Photo attached.",
    photo: MEDIA.before, received: "12 min ago", status: "New",
  },
  {
    id: "LEAD-2040", name: "Grabill Family Dental", phone: "(260) 555-0199", town: "Grabill",
    address: "13820 State St", services: ["Lawn Care", "Snow Removal"], property: "Commercial",
    size: "Commercial lot", message: "Need weekly mowing plus a seasonal snow contract for the parking lot.",
    photo: null, received: "1 hr ago", status: "New",
  },
  {
    id: "LEAD-2039", name: "Jenna Thompson", phone: "(260) 555-0176", town: "New Haven",
    address: "728 Green St", services: ["Landscape Design"], property: "Residential",
    size: "Small yard (under ¼ acre)", message: "Front foundation beds are dead — would love them redone.",
    photo: MEDIA.bedBefore, received: "3 hrs ago", status: "Quoted",
  },
  {
    id: "LEAD-2038", name: "Alan Kowalski", phone: "(260) 555-0110", town: "Leo-Cedarville",
    address: "1102 Cedar Canyons Rd", services: ["Snow Removal"], property: "Residential",
    size: "Average lot", message: "Want to lock a driveway snow contract before winter.",
    photo: null, received: "Yesterday", status: "Sent",
  },
];

const LINE_DEFAULTS: Record<string, { desc: string; price: number }> = {
  "Lawn Care": { desc: "Weekly mowing plan (per visit)", price: 45 },
  "Landscape Design": { desc: "Planting bed design & install", price: 1200 },
  Hardscaping: { desc: "Stacked-stone retaining wall (est.)", price: 3800 },
  "Snow Removal": { desc: "Seasonal snow contract", price: 450 },
};

const STATUS_TONE: Record<Status, string> = {
  New: "bg-boggs-grass/20 text-boggs-green",
  Quoted: "bg-amber-400/25 text-amber-700",
  Sent: "bg-boggs-green/15 text-boggs-green",
};

const money = (n: number) => `$${n.toLocaleString()}`;

export default function AdminPage() {
  const [tab, setTab] = useState("Inquiries");
  const [inquiries, setInquiries] = useState<Inquiry[]>(INITIAL);
  const [openId, setOpenId] = useState<string | null>(null);
  const [step, setStep] = useState<"detail" | "quote">("detail");
  const [lines, setLines] = useState<{ desc: string; price: number }[]>([]);
  const [note, setNote] = useState("");
  const [toast, setToast] = useState("");

  const current = TABS.find((t) => t.key === tab)!;
  const open = inquiries.find((i) => i.id === openId) || null;
  const subtotal = useMemo(() => lines.reduce((s, l) => s + (Number(l.price) || 0), 0), [lines]);
  const newCount = inquiries.filter((i) => i.status === "New").length;

  const openInquiry = (i: Inquiry) => {
    setOpenId(i.id);
    setStep("detail");
    setLines(i.services.map((s) => LINE_DEFAULTS[s] || { desc: s, price: 0 }));
    setNote("");
  };
  const closeModal = () => setOpenId(null);

  const sendQuote = () => {
    if (!open) return;
    setInquiries((list) => list.map((i) => (i.id === open.id ? { ...i, status: "Sent" as Status } : i)));
    setToast(`Quote (${money(subtotal)}) sent to ${open.name} — they'll get it by email & text.`);
    setOpenId(null);
    setTimeout(() => setToast(""), 5000);
  };

  return (
    <div className="min-h-screen bg-boggs-cream pt-16 md:pt-16 pb-28 md:pb-0">
      <div className="mx-auto max-w-wide flex flex-col md:flex-row">
        {/* sidebar / mobile tab bar */}
        <aside className="md:w-60 shrink-0 border-b md:border-b-0 md:border-r border-boggs-cream-dim bg-white md:min-h-screen sticky top-16 z-30">
          <div className="p-3 md:p-4">
            <div className="hidden md:flex items-center gap-2 px-2 py-2 mb-2">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-boggs-green text-boggs-cream font-display text-sm">B</span>
              <div>
                <p className="font-head font-bold text-sm text-boggs-black leading-tight">Boggs Pro Cut</p>
                <p className="text-[0.65rem] text-boggs-flagstone">Operations</p>
              </div>
            </div>
            <nav className="flex md:flex-col gap-1.5 md:gap-1 overflow-x-auto no-scrollbar">
              {TABS.map((t) => {
                const active = tab === t.key;
                return (
                  <button
                    key={t.key}
                    onClick={() => setTab(t.key)}
                    className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-head font-semibold whitespace-nowrap transition shrink-0 ${
                      active
                        ? "bg-boggs-green text-boggs-cream"
                        : t.locked
                        ? "text-boggs-black/40 hover:bg-boggs-cream"
                        : "text-boggs-black/70 hover:bg-boggs-cream"
                    }`}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
                      <path d={t.icon} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {t.key}
                    {t.locked ? (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="ml-0.5 opacity-70">
                        <rect x="5" y="11" width="14" height="9" rx="2" />
                        <path d="M8 11V8a4 4 0 018 0v3" strokeLinecap="round" />
                      </svg>
                    ) : (
                      newCount > 0 && (
                        <span className="ml-0.5 grid h-5 min-w-[1.25rem] place-items-center rounded-full bg-boggs-grass px-1 text-[0.7rem] font-bold text-boggs-black">
                          {newCount}
                        </span>
                      )
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* main */}
        <div className="flex-1 p-4 md:p-8 min-w-0">
          <div className="flex items-center justify-between gap-3 mb-5">
            <div className="min-w-0">
              <p className="text-xs text-boggs-flagstone font-head uppercase tracking-widest">Admin · Demo</p>
              <h1 className="font-display text-2xl md:text-3xl text-boggs-green chiseled truncate">{tab}</h1>
            </div>
            <Link href="/" className="text-sm font-head font-semibold text-boggs-green hover:underline whitespace-nowrap">← Back to site</Link>
          </div>

          {toast && (
            <div className="mb-5 flex items-start gap-3 rounded-xl bg-boggs-green text-boggs-cream px-4 py-3 shadow-card">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="mt-0.5 shrink-0">
                <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="text-sm font-head font-semibold">{toast}</p>
            </div>
          )}

          {/* ---------- INQUIRIES (live) ---------- */}
          {current.key === "Inquiries" && (
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-4 text-sm">
                <span className="rounded-full bg-boggs-grass/20 text-boggs-green px-3 py-1 font-head font-bold">
                  {newCount} new
                </span>
                <span className="rounded-full bg-white ring-1 ring-boggs-cream-dim px-3 py-1 font-head font-semibold text-boggs-black/60">
                  {inquiries.length} total this week
                </span>
                <span className="text-boggs-flagstone">Straight from the website estimate form.</span>
              </div>

              <div className="grid gap-3">
                {inquiries.map((i) => (
                  <button
                    key={i.id}
                    onClick={() => openInquiry(i)}
                    className="text-left rounded-2xl bg-white ring-1 ring-boggs-cream-dim p-4 transition hover:ring-boggs-green/40 hover:shadow-card"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="font-head font-bold text-boggs-black">{i.name}</p>
                          <span className={`rounded-full px-2.5 py-0.5 text-xs font-head font-bold ${STATUS_TONE[i.status]}`}>{i.status}</span>
                        </div>
                        <p className="text-xs text-boggs-flagstone mt-0.5">
                          {i.town} · {i.property} · {i.received}
                        </p>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {i.services.map((s) => (
                            <span key={s} className="rounded-full bg-boggs-green/10 px-2.5 py-0.5 text-xs font-head font-semibold text-boggs-green">
                              {s}
                            </span>
                          ))}
                          {i.photo && (
                            <span className="rounded-full bg-boggs-cream px-2.5 py-0.5 text-xs font-head font-semibold text-boggs-flagstone">
                              📷 photo
                            </span>
                          )}
                        </div>
                      </div>
                      <span className="shrink-0 rounded-lg bg-boggs-green px-3 py-2 text-xs font-head font-bold text-boggs-cream">
                        {i.status === "New" ? "Quote →" : "View"}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ---------- LOCKED TABS ---------- */}
          {current.locked && (
            <div className="rounded-2xl bg-white ring-1 ring-boggs-cream-dim p-8 md:p-14 text-center">
              <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-2xl bg-boggs-cream text-boggs-flagstone">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="5" y="11" width="14" height="9" rx="2" />
                  <path d="M8 11V8a4 4 0 018 0v3" strokeLinecap="round" />
                </svg>
              </div>
              <h2 className="font-display text-2xl md:text-3xl text-boggs-green chiseled">{tab} is locked</h2>
              <p className="mt-2 text-boggs-black/65 max-w-md mx-auto">
                This is part of the full Boggs Pro Cut operations platform — scheduling, crews, invoicing,
                analytics and more. It unlocks when you go live with Sweet Dreams.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                <button
                  onClick={() => setTab("Inquiries")}
                  className="rounded-full bg-boggs-grass px-6 py-2.5 font-head font-bold text-boggs-black"
                >
                  Back to Inquiries
                </button>
                <span className="rounded-full bg-boggs-cream px-6 py-2.5 font-head font-semibold text-boggs-flagstone cursor-not-allowed">
                  Unlock in full build
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ---------- INQUIRY / QUOTE MODAL ---------- */}
      {open && (
        <div className="fixed inset-0 z-[60] flex justify-center md:items-center bg-boggs-black/50 backdrop-blur-sm">
          <div className="flex flex-col w-full md:max-w-lg bg-white h-full md:h-auto md:max-h-[90vh] md:rounded-2xl overflow-hidden shadow-soft">
            {/* modal header */}
            <div className="flex items-center justify-between gap-3 bg-boggs-green px-5 py-4 shrink-0">
              <div className="min-w-0">
                <p className="eyebrow text-boggs-grass">{step === "detail" ? "Inquiry" : "New quote"}</p>
                <p className="font-head font-bold text-boggs-cream truncate">{open.name}</p>
              </div>
              <button onClick={closeModal} className="grid h-9 w-9 place-items-center rounded-lg bg-white/10 text-boggs-cream" aria-label="Close">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-5">
              {step === "detail" ? (
                <>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <Field label="Contact" value={open.phone} />
                    <Field label="Status" value={open.status} />
                    <Field label="Location" value={`${open.address}, ${open.town}`} full />
                    <Field label="Property" value={`${open.property} · ${open.size}`} full />
                  </div>
                  <div>
                    <p className="font-head font-bold text-xs uppercase tracking-wider text-boggs-flagstone mb-1.5">Services requested</p>
                    <div className="flex flex-wrap gap-1.5">
                      {open.services.map((s) => (
                        <span key={s} className="rounded-full bg-boggs-green/10 px-3 py-1 text-sm font-head font-semibold text-boggs-green">{s}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="font-head font-bold text-xs uppercase tracking-wider text-boggs-flagstone mb-1.5">Message</p>
                    <p className="text-sm text-boggs-black/80 rounded-xl bg-boggs-cream/70 p-3">{open.message}</p>
                  </div>
                  {open.photo && (
                    <div>
                      <p className="font-head font-bold text-xs uppercase tracking-wider text-boggs-flagstone mb-1.5">Photo from customer</p>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={open.photo} alt="Customer-submitted photo" className="w-full aspect-[16/10] object-cover rounded-xl" />
                    </div>
                  )}
                </>
              ) : (
                <>
                  <p className="text-sm text-boggs-black/70">
                    Line items are pre-filled from what {open.name.split(" ")[0]} asked for. Adjust the prices,
                    then send it back.
                  </p>
                  <div className="space-y-2.5">
                    {lines.map((l, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <input
                          value={l.desc}
                          onChange={(e) => setLines((ls) => ls.map((x, k) => (k === idx ? { ...x, desc: e.target.value } : x)))}
                          className="flex-1 min-w-0 rounded-lg border-2 border-boggs-cream-dim px-3 py-2 text-sm outline-none focus:border-boggs-green"
                        />
                        <div className="flex items-center rounded-lg border-2 border-boggs-cream-dim focus-within:border-boggs-green">
                          <span className="pl-2 text-sm text-boggs-flagstone">$</span>
                          <input
                            type="number"
                            value={l.price}
                            onChange={(e) => setLines((ls) => ls.map((x, k) => (k === idx ? { ...x, price: Number(e.target.value) } : x)))}
                            className="w-20 rounded-lg px-1 py-2 text-sm outline-none text-right"
                          />
                        </div>
                        <button
                          onClick={() => setLines((ls) => ls.filter((_, k) => k !== idx))}
                          className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-boggs-flagstone hover:bg-boggs-cream"
                          aria-label="Remove line"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" /></svg>
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => setLines((ls) => [...ls, { desc: "Additional service", price: 0 }])}
                      className="text-sm font-head font-bold text-boggs-green"
                    >
                      + Add line item
                    </button>
                  </div>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Note to customer (optional)…"
                    rows={2}
                    className="w-full rounded-xl border-2 border-boggs-cream-dim px-3 py-2 text-sm outline-none focus:border-boggs-green"
                  />
                  <div className="flex items-center justify-between rounded-xl bg-boggs-cream/70 px-4 py-3">
                    <span className="font-head font-bold text-boggs-black">Quote total</span>
                    <span className="font-display text-2xl text-boggs-green chiseled">{money(subtotal)}</span>
                  </div>
                </>
              )}
            </div>

            {/* sticky action */}
            <div className="shrink-0 border-t border-boggs-cream-dim p-4 [padding-bottom:max(1rem,env(safe-area-inset-bottom))]">
              {step === "detail" ? (
                <button
                  onClick={() => setStep("quote")}
                  className="w-full rounded-xl bg-boggs-grass py-3.5 font-head font-bold text-boggs-black"
                >
                  Create quote →
                </button>
              ) : (
                <div className="flex gap-2.5">
                  <button
                    onClick={() => setStep("detail")}
                    className="rounded-xl border-2 border-boggs-cream-dim px-5 py-3.5 font-head font-bold text-boggs-black/70"
                  >
                    Back
                  </button>
                  <button
                    onClick={sendQuote}
                    className="flex-1 rounded-xl bg-boggs-green py-3.5 font-head font-bold text-boggs-cream flex items-center justify-center gap-2"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    Send quote to {open.name.split(" ")[0]}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, value, full }: { label: string; value: string; full?: boolean }) {
  return (
    <div className={full ? "col-span-2" : ""}>
      <p className="font-head font-bold text-xs uppercase tracking-wider text-boggs-flagstone">{label}</p>
      <p className="text-boggs-black mt-0.5">{value}</p>
    </div>
  );
}
