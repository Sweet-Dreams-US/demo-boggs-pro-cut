"use client";
import { useState } from "react";
import Link from "next/link";

const TABS = [
  "Dashboard",
  "Orders",
  "Schedule",
  "Staff",
  "Menu",
  "Customers",
  "Analytics",
  "Accounting",
  "Socials",
  "Settings",
] as const;
type Tab = (typeof TABS)[number];

const ICONS: Record<Tab, string> = {
  Dashboard: "M4 13h6V4H4v9zm0 7h6v-5H4v5zm10 0h6v-9h-6v9zm0-16v5h6V4h-6z",
  Orders: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
  Schedule: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
  Staff: "M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1.13a4 4 0 10-4-4 4 4 0 004 4z",
  Menu: "M4 6h16M4 12h16M4 18h16",
  Customers: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
  Analytics: "M3 3v18h18M7 15l3-3 3 3 5-6",
  Accounting: "M12 8c-1.7 0-3 .9-3 2s1.3 2 3 2 3 .9 3 2-1.3 2-3 2m0-8V6m0 8v2m0-10c1.1 0 2.1.4 2.6 1M9 15c.5.6 1.5 1 2.6 1",
  Socials: "M8.7 13.3a4 4 0 005.6 0l3-3a4 4 0 00-5.6-5.6l-1.7 1.7M15.3 10.7a4 4 0 00-5.6 0l-3 3a4 4 0 005.6 5.6l1.7-1.7",
  Settings: "M10.3 3.3a1 1 0 011.4 0l1 1a1 1 0 00.9.3l1.4-.2a1 1 0 011.1.7l.5 1.3a1 1 0 00.6.6l1.3.5a1 1 0 01.7 1.1l-.2 1.4a1 1 0 00.3.9l1 1a1 1 0 010 1.4l-1 1a1 1 0 00-.3.9l.2 1.4a1 1 0 01-.7 1.1l-1.3.5a1 1 0 00-.6.6l-.5 1.3a1 1 0 01-1.1.7l-1.4-.2a1 1 0 00-.9.3l-1 1a1 1 0 01-1.4 0l-1-1a1 1 0 00-.9-.3l-1.4.2a1 1 0 01-1.1-.7l-.5-1.3a1 1 0 00-.6-.6l-1.3-.5a1 1 0 01-.7-1.1l.2-1.4a1 1 0 00-.3-.9l-1-1a1 1 0 010-1.4l1-1a1 1 0 00.3-.9l-.2-1.4a1 1 0 01.7-1.1l1.3-.5a1 1 0 00.6-.6l.5-1.3a1 1 0 011.1-.7l1.4.2a1 1 0 00.9-.3l1-1zM12 15a3 3 0 100-6 3 3 0 000 6z",
};

const KPIS = [
  { label: "Jobs today", value: "7", sub: "3 mow · 2 build · 2 cleanup", tone: "green" },
  { label: "New estimates", value: "12", sub: "+4 since yesterday", tone: "grass" },
  { label: "Revenue (MTD)", value: "$48,200", sub: "82% of goal", tone: "flagstone" },
  { label: "Open invoices", value: "$6,140", sub: "5 awaiting payment", tone: "mulch" },
];

const ORDERS = [
  { id: "#1042", customer: "M. Reyes", service: "Retaining wall + beds", town: "Fort Wayne", value: "$8,400", stage: "Scheduled" },
  { id: "#1041", customer: "Grabill Family Dental", service: "Commercial mow + plow", town: "Grabill", value: "$1,200/mo", stage: "Quoted" },
  { id: "#1040", customer: "J. Thompson", service: "Paver walkway", town: "New Haven", value: "$5,900", stage: "New" },
  { id: "#1039", customer: "A. Kowalski", service: "Spring cleanup + mulch", town: "Leo-Cedarville", value: "$780", stage: "Done" },
  { id: "#1038", customer: "Ridgewood HOA", service: "Seasonal snow contract", town: "Fort Wayne", value: "$14,500", stage: "Scheduled" },
];
const STAGES = ["New", "Quoted", "Scheduled", "Done"] as const;
const STAGE_TONE: Record<string, string> = {
  New: "bg-boggs-grass/15 text-boggs-green",
  Quoted: "bg-amber-400/20 text-amber-700",
  Scheduled: "bg-boggs-green/15 text-boggs-green",
  Done: "bg-boggs-flagstone/20 text-boggs-flagstone",
};

const ROUTES = [
  { crew: "Crew A — Dale", area: "SE Fort Wayne", jobs: 4, type: "Mow + trim" },
  { crew: "Crew B — Marcus", area: "New Haven / Woodburn", jobs: 3, type: "Hardscape build" },
  { crew: "Crew C — Ty", area: "Leo / Grabill", jobs: 5, type: "Cleanup + mulch" },
];

const MENU = [
  { cat: "Lawn Care", items: [["Weekly mow (avg lot)", "$45"], ["Bi-weekly mow", "$55"], ["Mulch install (per yd)", "$85"], ["Bush & shrub trim", "$120+"]] },
  { cat: "Landscape Design", items: [["Bed design & install", "$1,200+"], ["Full-yard design", "Quote"], ["Perennial planting", "$60/plant"]] },
  { cat: "Hardscaping", items: [["Retaining wall (per sq ft)", "$45"], ["Paver walkway (per sq ft)", "$28"], ["Patio (per sq ft)", "$32"]] },
  { cat: "Snow & Ice", items: [["Per-storm residential", "$55"], ["Seasonal driveway", "$450/season"], ["Commercial lot", "Quote"]] },
];

const ANALYTICS = [
  { label: "Hardscaping", pct: 38, color: "#6E6A62" },
  { label: "Lawn Care", pct: 27, color: "#7CA24B" },
  { label: "Snow Removal", pct: 20, color: "#2B3A42" },
  { label: "Landscape Design", pct: 15, color: "#2F5233" },
];

const INVOICES = [
  { id: "INV-338", customer: "Ridgewood HOA", amount: "$3,625", status: "Paid" },
  { id: "INV-337", customer: "M. Reyes", amount: "$4,200", status: "Deposit" },
  { id: "INV-336", customer: "J. Thompson", amount: "$2,950", status: "Sent" },
  { id: "INV-335", customer: "Grabill Dental", amount: "$1,200", status: "Overdue" },
];
const INV_TONE: Record<string, string> = {
  Paid: "text-boggs-green", Deposit: "text-amber-600", Sent: "text-boggs-flagstone", Overdue: "text-red-600",
};

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-2xl bg-white ring-1 ring-boggs-cream-dim p-5 ${className}`}>{children}</div>;
}

export default function AdminPage() {
  const [tab, setTab] = useState<Tab>("Dashboard");

  return (
    <div className="min-h-screen bg-boggs-cream pt-20 md:pt-16">
      <div className="mx-auto max-w-wide flex flex-col md:flex-row">
        {/* sidebar */}
        <aside className="md:w-60 shrink-0 border-b md:border-b-0 md:border-r border-boggs-cream-dim bg-white md:min-h-screen">
          <div className="p-4">
            <div className="flex items-center gap-2 px-2 py-2 mb-2">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-boggs-green text-boggs-cream font-display text-sm">B</span>
              <div>
                <p className="font-head font-bold text-sm text-boggs-black leading-tight">Boggs Pro Cut</p>
                <p className="text-[0.65rem] text-boggs-flagstone">Operations</p>
              </div>
            </div>
            <nav className="flex md:flex-col gap-1 overflow-x-auto no-scrollbar">
              {TABS.map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-head font-semibold whitespace-nowrap transition ${
                    tab === t ? "bg-boggs-green text-boggs-cream" : "text-boggs-black/60 hover:bg-boggs-cream"
                  }`}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
                    <path d={ICONS[t]} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {t}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* main */}
        <div className="flex-1 p-5 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-xs text-boggs-flagstone font-head uppercase tracking-widest">Admin · Demo</p>
              <h1 className="font-display text-3xl text-boggs-green chiseled">{tab}</h1>
            </div>
            <Link href="/" className="text-sm font-head font-semibold text-boggs-green hover:underline">← Back to site</Link>
          </div>

          {tab === "Dashboard" && (
            <div className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {KPIS.map((k) => (
                  <Card key={k.label}>
                    <p className="text-xs font-head uppercase tracking-wider text-boggs-flagstone">{k.label}</p>
                    <p className="font-display text-3xl text-boggs-green chiseled mt-1">{k.value}</p>
                    <p className="text-xs text-boggs-black/55 mt-1">{k.sub}</p>
                  </Card>
                ))}
              </div>
              <div className="grid gap-4 lg:grid-cols-3">
                <Card className="lg:col-span-2">
                  <p className="font-head font-bold text-boggs-black mb-3">Today&apos;s jobs</p>
                  <ul className="divide-y divide-boggs-cream-dim">
                    {ORDERS.slice(0, 4).map((o) => (
                      <li key={o.id} className="flex items-center justify-between py-2.5 text-sm">
                        <span className="font-head font-semibold text-boggs-black">{o.customer}</span>
                        <span className="text-boggs-black/60">{o.service}</span>
                        <span className={`rounded-full px-2.5 py-0.5 text-xs font-head font-bold ${STAGE_TONE[o.stage]}`}>{o.stage}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
                <Card className="bg-boggs-steel text-boggs-cream ring-boggs-steel">
                  <p className="font-head font-bold mb-1">Weather · Fort Wayne</p>
                  <p className="font-display text-4xl chiseled">28°F</p>
                  <p className="text-sm text-boggs-cream/80 mt-1">Snow likely overnight — 3-5&quot;</p>
                  <div className="mt-4 rounded-lg bg-boggs-cream/10 px-3 py-2 text-sm font-head font-semibold text-boggs-grass">
                    ❄ Plow-day alert: activate winter routes
                  </div>
                </Card>
              </div>
            </div>
          )}

          {tab === "Orders" && (
            <div className="grid gap-4 md:grid-cols-4">
              {STAGES.map((st) => (
                <div key={st} className="rounded-2xl bg-white ring-1 ring-boggs-cream-dim p-3">
                  <div className="flex items-center justify-between px-1 mb-3">
                    <p className="font-head font-bold text-sm text-boggs-black">{st}</p>
                    <span className="text-xs text-boggs-flagstone">{ORDERS.filter((o) => o.stage === st).length}</span>
                  </div>
                  <div className="space-y-2">
                    {ORDERS.filter((o) => o.stage === st).map((o) => (
                      <div key={o.id} className="rounded-xl bg-boggs-cream/60 p-3">
                        <p className="font-head font-semibold text-sm text-boggs-black">{o.customer}</p>
                        <p className="text-xs text-boggs-black/60 mt-0.5">{o.service}</p>
                        <div className="flex items-center justify-between mt-2 text-xs">
                          <span className="text-boggs-flagstone">{o.town}</span>
                          <span className="font-head font-bold text-boggs-green">{o.value}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === "Schedule" && (
            <div className="space-y-4">
              {ROUTES.map((r) => (
                <Card key={r.crew} className="flex items-center justify-between">
                  <div>
                    <p className="font-head font-bold text-boggs-black">{r.crew}</p>
                    <p className="text-sm text-boggs-black/60">{r.area} · {r.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-display text-2xl text-boggs-green chiseled">{r.jobs}</p>
                    <p className="text-xs text-boggs-flagstone">stops today</p>
                  </div>
                </Card>
              ))}
              <Card className="bg-boggs-steel text-boggs-cream ring-boggs-steel">
                <p className="font-head font-bold">❄ Winter plow routes (priority)</p>
                <p className="text-sm text-boggs-cream/80 mt-1">
                  Commercial lots cleared first (5am), then residential seasonal contracts by zone.
                </p>
              </Card>
            </div>
          )}

          {tab === "Menu" && (
            <div className="grid gap-4 md:grid-cols-2">
              {MENU.map((m) => (
                <Card key={m.cat}>
                  <p className="font-head font-bold text-boggs-green mb-3">{m.cat}</p>
                  <ul className="divide-y divide-boggs-cream-dim">
                    {m.items.map(([name, price]) => (
                      <li key={name} className="flex items-center justify-between py-2 text-sm">
                        <span className="text-boggs-black/75">{name}</span>
                        <span className="font-head font-bold text-boggs-black">{price}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          )}

          {tab === "Analytics" && (
            <div className="grid gap-4 lg:grid-cols-2">
              <Card>
                <p className="font-head font-bold text-boggs-black mb-4">Leads by service</p>
                <div className="space-y-3">
                  {ANALYTICS.map((a) => (
                    <div key={a.label}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-boggs-black/70">{a.label}</span>
                        <span className="font-head font-bold text-boggs-black">{a.pct}%</span>
                      </div>
                      <div className="h-2.5 rounded-full bg-boggs-cream">
                        <div className="h-full rounded-full" style={{ width: `${a.pct}%`, background: a.color }} />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
              <Card>
                <p className="font-head font-bold text-boggs-black mb-4">Seasonal mix</p>
                <div className="flex items-end gap-2 h-40">
                  {[["Spr", 60], ["Sum", 90], ["Fall", 70], ["Win", 80]].map(([m, h]) => (
                    <div key={m as string} className="flex-1 flex flex-col items-center gap-2">
                      <div className="w-full rounded-t-lg bg-boggs-green" style={{ height: `${h}%` }} />
                      <span className="text-xs text-boggs-flagstone font-head">{m}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-boggs-black/55 mt-3">Estimate conversion: <span className="font-bold text-boggs-green">34%</span></p>
              </Card>
            </div>
          )}

          {tab === "Accounting" && (
            <Card>
              <p className="font-head font-bold text-boggs-black mb-3">Recent invoices</p>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-boggs-flagstone font-head text-xs uppercase tracking-wider">
                    <th className="py-2">Invoice</th><th>Customer</th><th>Amount</th><th className="text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-boggs-cream-dim">
                  {INVOICES.map((iv) => (
                    <tr key={iv.id}>
                      <td className="py-2.5 font-head font-semibold text-boggs-black">{iv.id}</td>
                      <td className="text-boggs-black/70">{iv.customer}</td>
                      <td className="font-head font-bold text-boggs-black">{iv.amount}</td>
                      <td className={`text-right font-head font-bold ${INV_TONE[iv.status]}`}>{iv.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          )}

          {(tab === "Staff" || tab === "Customers" || tab === "Socials" || tab === "Settings") && (
            <Card className="text-center py-16">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="mx-auto text-boggs-flagstone mb-3">
                <path d={ICONS[tab]} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="font-head font-bold text-boggs-black">{tab}</p>
              <p className="text-sm text-boggs-black/55 mt-1 max-w-sm mx-auto">
                {tab === "Staff" && "Crew & equipment assignments, availability and time tracking."}
                {tab === "Customers" && "Property history, recurring plans, and one-click rebooking."}
                {tab === "Socials" && "Facebook reviews inbox and a before/after post scheduler."}
                {tab === "Settings" && "Service area, hours, team, and the seasonal snow on/off switch."}
              </p>
              <p className="text-xs text-boggs-flagstone mt-3">Sample module — wired up in the full build.</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
