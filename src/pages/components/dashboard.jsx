
import { useState } from "react";

/* ─────────────────────────────────────────────
   TYPES
───────────────────────────────────────────── */
// // interface Order {
//   id: string;
//   customer: string;
//   item: string;
//   category: string;
//   start: string;
//   end: string;
//   status: "Active" | "Returned" | "Overdue" | "Pending";
//   amount: number;
// }

// interface InventoryItem {
//   id: string;
//   name: string;
//   category: string;
//   available: number;
//   rented: number;
//   total: number;
//   ppd: number;
// }

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const ORDERS = [
  { id: "ORD-1041", customer: "Priya Sharma",  item: "Anarkali Suit",     category: "Ethnic",  start: "14 Mar", end: "18 Mar", status: "Active",   amount: 1200 },
  { id: "ORD-1040", customer: "Rahul Mehta",   item: "Sherwani Set",      category: "Ethnic",  start: "13 Mar", end: "15 Mar", status: "Overdue",  amount: 2500 },
  { id: "ORD-1039", customer: "Sneha Kapoor",  item: "Evening Gown",      category: "Western", start: "12 Mar", end: "14 Mar", status: "Returned", amount: 1800 },
  { id: "ORD-1038", customer: "Arun Patel",    item: "Blazer & Trousers", category: "Formal",  start: "16 Mar", end: "19 Mar", status: "Pending",  amount:  900 },
  { id: "ORD-1037", customer: "Meera Nair",    item: "Lehenga Choli",     category: "Ethnic",  start: "15 Mar", end: "17 Mar", status: "Active",   amount: 3200 },
  { id: "ORD-1036", customer: "Vikram Singh",  item: "Suit & Tie",        category: "Formal",  start: "10 Mar", end: "12 Mar", status: "Returned", amount: 1400 },
  { id: "ORD-1035", customer: "Divya Rao",     item: "Cocktail Dress",    category: "Western", start: "16 Mar", end: "18 Mar", status: "Active",   amount: 1600 },
];

const INVENTORY = [
  { id: "INV-01", name: "Lehenga Choli",  category: "Ethnic",  available: 14, rented: 31, total: 45, ppd: 450 },
  { id: "INV-02", name: "Sherwani",       category: "Ethnic",  available:  8, rented: 22, total: 30, ppd: 600 },
  { id: "INV-03", name: "Evening Gown",   category: "Western", available: 19, rented: 16, total: 35, ppd: 500 },
  { id: "INV-04", name: "Formal Suit",    category: "Formal",  available: 25, rented: 20, total: 45, ppd: 350 },
  { id: "INV-05", name: "Saree",          category: "Ethnic",  available: 33, rented: 42, total: 75, ppd: 300 },
  { id: "INV-06", name: "Cocktail Dress", category: "Western", available: 11, rented: 14, total: 25, ppd: 420 },
];

const REVENUE = [
  { month: "OCT", value: 280000 },
  { month: "NOV", value: 320000 },
  { month: "DEC", value: 415000 },
  { month: "JAN", value: 370000 },
  { month: "FEB", value: 410000 },
  { month: "MAR", value: 482300 },
];

const CATEGORIES = [
  { name: "Ethnic Wear",  pct: 42, color: "#c9a96e" },
  { name: "Western Wear", pct: 28, color: "#6b7280" },
  { name: "Formal Wear",  pct: 18, color: "#9ca3af" },
  { name: "Party Wear",   pct: 12, color: "#374151" },
];

const ACTIVITY = [
  { msg: "Rental order ORD-1041 confirmed — Priya Sharma",     time: "2 min ago",  type: "order"    },
  { msg: "Overdue alert triggered for ORD-1040 — Rahul Mehta", time: "18 min ago", type: "alert"    },
  { msg: "Evening Gown returned & inspected — Sneha Kapoor",   time: "1 hr ago",   type: "return"   },
  { msg: "New customer registered — Arjun Verma",              time: "2 hr ago",   type: "customer" },
  { msg: "Inventory restocked — 5 Sherwanis added",            time: "4 hr ago",   type: "stock"    },
  { msg: "Payment ₹3,200 received — ORD-1035",                 time: "5 hr ago",   type: "payment"  },
];

/* ─────────────────────────────────────────────
   SVG ICONS
───────────────────────────────────────────── */
const s = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" , strokeLinejoin: "round" };
const I = {
  Shirt:    () => <svg {...s} className="w-4 h-4"><path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.57a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.57a2 2 0 00-1.34-2.23z"/></svg>,
  Box:      () => <svg {...s} className="w-4 h-4"><path d="M16.5 9.4l-9-5.19M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.29 7 12 12 20.71 7"/><line x1="12" y1="22" x2="12" y2="12"/></svg>,
  Users:    () => <svg {...s} className="w-4 h-4"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>,
  Currency: () => <svg {...s} className="w-4 h-4"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>,
  Refresh:  () => <svg {...s} className="w-4 h-4"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10"/></svg>,
  Clock:    () => <svg {...s} className="w-4 h-4"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  Bell:     () => <svg {...s} className="w-4 h-4"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>,
  Search:   () => <svg {...s} className="w-3.5 h-3.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  Plus:     () => <svg {...s} className="w-3 h-3"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  Grid:     () => <svg {...s} className="w-4 h-4"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
  Settings: () => <svg {...s} className="w-4 h-4"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>,
  TrendUp:  () => <svg {...s} className="w-3 h-3"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
  TrendDn:  () => <svg {...s} className="w-3 h-3"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/></svg>,
  ChevronL: () => <svg {...s} className="w-4 h-4"><polyline points="15 18 9 12 15 6"/></svg>,
  BarChart: () => <svg {...s} className="w-4 h-4"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
  Star:     () => <svg {...s} className="w-4 h-4"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
};

/* ─────────────────────────────────────────────
   STATUS CONFIG
───────────────────────────────────────────── */
const STATUS_CFG = {
  Active:   { dot: "#c9a96e", text: "#c9a96e", bg: "rgba(201,169,110,0.07)", border: "rgba(201,169,110,0.18)" },
  Returned: { dot: "#6b7280", text: "#9ca3af", bg: "rgba(107,114,128,0.07)", border: "rgba(107,114,128,0.2)"  },
  Overdue:  { dot: "#ef4444", text: "#f87171", bg: "rgba(239,68,68,0.07)",   border: "rgba(239,68,68,0.2)"    },
  Pending:  { dot: "#9ca3af", text: "#9ca3af", bg: "rgba(156,163,175,0.06)", border: "rgba(156,163,175,0.15)" },
};

/* ─────────────────────────────────────────────
   STAT CARD
───────────────────────────────────────────── */
function StatCard({ label, value, sub, trend,  accent } 
 ) {
  return (
    <div className="rounded-xl p-5 transition-all duration-200 hover:-translate-y-px"
      style={{
        background: accent ? "rgba(201,169,110,0.05)" : "rgba(255,255,255,0.02)",
        border: `1px solid ${accent ? "rgba(201,169,110,0.16)" : "rgba(255,255,255,0.06)"}`,
      }}>
      <div className="flex items-start justify-between mb-4">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: accent ? "rgba(201,169,110,0.1)" : "rgba(255,255,255,0.04)", color: accent ? "#c9a96e" : "#6b7280" }}>
          <IconComp />
        </div>
        <span className={`flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full tabular-nums tracking-wide ${trend.dir === "up" ? "text-emerald-400" : "text-red-400"}`}
          style={{ background: trend.dir === "up" ? "rgba(52,211,153,0.07)" : "rgba(248,113,113,0.07)" }}>
          {trend.dir === "up" ? <I.TrendUp /> : <I.TrendDn />}
          {trend.pct}
        </span>
      </div>
      <div className="text-[22px] font-semibold tracking-tight mb-1" style={{ color: "#f0f0f0", fontFamily: "'DM Serif Display', serif" }}>{value}</div>
      <div className="text-[10px] font-medium tracking-[0.1em] uppercase mb-0.5" style={{ color: accent ? "#c9a96e" : "#4b5563" }}>{label}</div>
      <div className="text-[10px]" style={{ color: "#2d2d2d" }}>{sub}</div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   REVENUE BAR CHART
───────────────────────────────────────────── */
function RevenueBar() {
  const max = Math.max(...REVENUE.map(r => r.value));
  return (
    <div className="flex items-end gap-2 w-full" style={{ height: 96 }}>
      {REVENUE.map((r, i) => {
        const h = (r.value / max) * 84;
        const last = i === REVENUE.length - 1;
        return (
          <div key={r.month} className="flex-1 flex flex-col items-center gap-2 group/b">
            <div className="relative w-full flex items-end" style={{ height: 80 }}>
              <div className="w-full rounded-sm transition-all duration-500"
                style={{
                  height: h,
                  background: last ? "#c9a96e" : "rgba(255,255,255,0.05)",
                  boxShadow: last ? "0 0 12px rgba(201,169,110,0.2)" : "none",
                }} />
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[9px] font-mono px-1.5 py-0.5 rounded whitespace-nowrap opacity-0 group-hover/b:opacity-100 transition-opacity pointer-events-none"
                style={{ background: "#1a1a1a", color: "#c9a96e", border: "1px solid rgba(201,169,110,0.15)" }}>
                ₹{(r.value / 1000).toFixed(0)}k
              </div>
            </div>
            <span className="text-[9px] tracking-widest font-medium" style={{ color: last ? "#c9a96e" : "#2d2d2d" }}>{r.month}</span>
          </div>
        );
      })}
    </div>
  );
}

/* ─────────────────────────────────────────────
   DONUT CHART
───────────────────────────────────────────── */
function Donut() {
  const r = 36; const circ = 2 * Math.PI * r; let cum = 0;
  return (
    <div className="flex items-center gap-5">
      <svg width="96" height="96" viewBox="0 0 96 96" className="shrink-0">
        <circle cx="48" cy="48" r={r} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="12" />
        {CATEGORIES.map(c => {
          const dash = (c.pct / 100) * circ;
          const off = -(cum / 100) * circ - circ * 0.25;
          cum += c.pct;
          return <circle key={c.name} cx="48" cy="48" r={r} fill="none" stroke={c.color}
            strokeWidth="12" strokeDasharray={`${dash} ${circ - dash}`} strokeDashoffset={off} />;
        })}
        <text x="48" y="45" textAnchor="middle" fill="#f0f0f0" fontSize="14" fontWeight="600" fontFamily="'DM Serif Display', serif">342</text>
        <text x="48" y="57" textAnchor="middle" fill="#374151" fontSize="7" letterSpacing="1.5">RENTALS</text>
      </svg>
      <div className="flex-1 space-y-2">
        {CATEGORIES.map(c => (
          <div key={c.name} className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="w-1 h-3 rounded-full shrink-0" style={{ background: c.color }} />
              <span className="text-[11px]" style={{ color: "#6b7280" }}>{c.name}</span>
            </div>
            <span className="text-[11px] font-mono" style={{ color: "#4b5563" }}>{c.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   SIDEBAR LINK
───────────────────────────────────────────── */
function SideLink({   label, active, collapsed, onClick } 
) {
  return (
    <button onClick={onClick} title={collapsed ? label : undefined}
      className={`w-full flex items-center gap-3 rounded-lg transition-all duration-150 ${collapsed ? "justify-center px-0 py-2.5" : "px-3 py-2.5"}`}
      style={active
        ? { background: "rgba(201,169,110,0.07)", color: "#c9a96e", border: "1px solid rgba(201,169,110,0.12)" }
        : { color: "#4b5563", border: "1px solid transparent" }}
      onMouseEnter={e => { if (!active) e.currentTarget.style.color = "#9ca3af"; }}
      onMouseLeave={e => { if (!active) e.currentTarget.style.color = "#4b5563"; }}>
      <span className="shrink-0"><IconComp /></span>
      {!collapsed && <span className="text-[12.5px] font-medium tracking-wide">{label}</span>}
    </button>
  );
}

/* ─────────────────────────────────────────────
   MAIN DASHBOARD
───────────────────────────────────────────── */
export  function Dashboard() {
  const [nav, setNav]       = useState("Dashboard");
  const [filter, setFilter] = useState("All");
  const [slim, setSlim]     = useState(false);

  const NAV_ITEMS = [
    { Icon: I.Grid,     label: "Dashboard" },
    { Icon: I.Box,      label: "Orders"    },
    { Icon: I.Shirt,    label: "Inventory" },
    { Icon: I.Users,    label: "Customers" },
    { Icon: I.BarChart, label: "Revenue"   },
    { Icon: I.Refresh,  label: "Returns"   },
    { Icon: I.Star,     label: "Reviews"   },
    { Icon: I.Settings, label: "Settings"  },
  ];

  const STATS = [
    { label: "Clothing Items",  value: "1,284",    sub: "+12 this week",         trend: { dir: "up"   ,pct: "4.2%"  }, Icon: I.Shirt,    accent: false },
    { label: "Active Rentals",  value: "342",       sub: "Across 18 categories",  trend: { dir: "up", pct: "8.1%"  }, Icon: I.Box,      accent: true  },
    { label: "Total Customers", value: "5,671",     sub: "128 new this month",    trend: { dir: "up", pct: "3.5%"  }, Icon: I.Users,    accent: false },
    { label: "Total Revenue",   value: "₹4,82,300", sub: "vs ₹4,10,000 last mo.", trend: { dir: "up", pct: "17.6%" }, Icon: I.Currency, accent: true  },
    { label: "Returned Today",  value: "47",        sub: "3 pending inspection",  trend: { dir: "down" , pct: "2.1%"  }, Icon: I.Refresh,  accent: false },
    { label: "Pending Orders",  value: "23",        sub: "Awaiting confirmation", trend: { dir: "up"  , pct: "5.3%"  }, Icon: I.Clock,    accent: false },
  ];

  const shown = filter === "All" ? ORDERS : ORDERS.filter(o => o.status === filter);

  const ACTIVITY_DOT = {
    order: "#c9a96e", alert: "#ef4444", return: "#6b7280",
    customer: "#9ca3af", stock: "#d1d5db", payment: "#c9a96e",
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:ital,wght@0,400;0,500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 3px; height: 3px; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.06); border-radius: 2px; }
        ::-webkit-scrollbar-track { background: transparent; }
      `}</style>

      <div className="flex min-h-screen" style={{ background: "#0d0d0d", fontFamily: "'DM Sans', sans-serif", color: "#e5e7eb" }}>

        {/* ══ SIDEBAR ══ */}
        <aside className="relative z-20 flex flex-col shrink-0 transition-all duration-300"
          style={{ width: slim ? 58 : 208, background: "#0a0a0a", borderRight: "1px solid rgba(255,255,255,0.05)" }}>

          {/* Wordmark */}
          <div className="flex items-center gap-3 px-3.5 h-14" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
            <div className="w-7 h-7 rounded-md shrink-0 flex items-center justify-center"
              style={{ background: "linear-gradient(135deg,#c9a96e,#a07040)" }}>
              <svg viewBox="0 0 24 24" fill="white" className="w-3.5 h-3.5">
                <path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.57a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.57a2 2 0 00-1.34-2.23z"/>
              </svg>
            </div>
            {!slim && <span className="text-[13px] font-semibold tracking-wide" style={{ color: "#e5e7eb" }}>RentStyle</span>}
            <button onClick={() => setSlim(v => !v)} className="ml-auto transition-colors" style={{ color: "#2d2d2d" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#6b7280")}
              onMouseLeave={e => (e.currentTarget.style.color = "#2d2d2d")}>
              <I.ChevronL />
            </button>
          </div>

          {/* Nav */}
          <nav className="flex-1 flex flex-col gap-0.5 p-2 py-4">
            {!slim && <div className="text-[8px] tracking-[0.2em] uppercase px-3 mb-2" style={{ color: "#2d2d2d" }}>Main Menu</div>}
            {NAV_ITEMS.map(item => (
              <SideLink key={item.label} Icon={item.Icon} label={item.label}
                active={nav === item.label} collapsed={slim}
                onClick={() => setNav(item.label)} />
            ))}
          </nav>

          {/* User chip */}
          <div className="p-3" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full shrink-0 flex items-center justify-center text-[11px] font-semibold"
                style={{ background: "rgba(201,169,110,0.1)", color: "#c9a96e" }}>A</div>
              {!slim && (
                <div className="overflow-hidden">
                  <div className="text-[11px] font-medium truncate" style={{ color: "#6b7280" }}>Admin</div>
                  <div className="text-[9px] truncate" style={{ color: "#2d2d2d" }}>admin@rentstyle.in</div>
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* ══ CONTENT ══ */}
        <main className="flex-1 overflow-y-auto">

          {/* Top bar */}
          <header className="sticky top-0 z-10 flex items-center justify-between px-6 h-14"
            style={{ background: "rgba(13,13,13,0.9)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
            <div className="flex items-baseline gap-3">
              <span className="text-[14px] font-semibold" style={{ color: "#e5e7eb" }}>Overview</span>
              <span className="text-[10px] tracking-widest uppercase" style={{ color: "#2d2d2d" }}>Mon, 16 Mar 2026</span>
            </div>
            <div className="flex items-center gap-2">
              {/* Search */}
              <label className="flex items-center gap-2 rounded-lg px-3 py-2 cursor-text"
                style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <span style={{ color: "#374151" }}><I.Search /></span>
                <input placeholder="Search…" className="bg-transparent outline-none text-[12px] w-36"
                  style={{ color: "#9ca3af", caretColor: "#c9a96e" }}
                  onFocus={e => (e.currentTarget.parentElement.style.borderColor = "rgba(201,169,110,0.25)")}
                  onBlur={e  => (e.currentTarget.parentElement.style.borderColor = "rgba(255,255,255,0.06)")} />
              </label>
              {/* Bell */}
              <button className="relative w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)", color: "#4b5563" }}>
                <I.Bell />
                <span className="absolute top-1.5 right-1.5 w-1 h-1 rounded-full" style={{ background: "#c9a96e" }} />
              </button>
              {/* CTA */}
              <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[11px] font-semibold tracking-wide transition-all"
                style={{ background: "#c9a96e", color: "#0d0d0d" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#d4b47a")}
                onMouseLeave={e => (e.currentTarget.style.background = "#c9a96e")}>
                <I.Plus /> New Rental
              </button>
            </div>
          </header>

          <div className="p-6 space-y-5 max-w-screen-2xl">

            {/* ── KPI CARDS ── */}
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
              {STATS.map(s => <StatCard key={s.label} {...s} />)}
            </div>

            {/* ── CHARTS ROW ── */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">

              {/* Revenue chart */}
              <div className="lg:col-span-3 rounded-xl p-5"
                style={{ background: "rgba(255,255,255,0.018)", border: "1px solid rgba(255,255,255,0.05)" }}>
                <div className="flex items-start justify-between mb-5">
                  <div>
                    <div className="text-[9px] tracking-[0.18em] uppercase mb-1.5" style={{ color: "#374151" }}>Monthly Revenue</div>
                    <div className="text-[22px] font-semibold" style={{ color: "#f0f0f0", fontFamily: "'DM Serif Display', serif" }}>₹4,82,300</div>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-medium px-2.5 py-1 rounded-full"
                    style={{ background: "rgba(201,169,110,0.07)", color: "#c9a96e", border: "1px solid rgba(201,169,110,0.14)" }}>
                    <I.TrendUp /> +17.6%
                  </div>
                </div>
                <RevenueBar />
              </div>

              {/* Donut */}
              <div className="lg:col-span-2 rounded-xl p-5"
                style={{ background: "rgba(255,255,255,0.018)", border: "1px solid rgba(255,255,255,0.05)" }}>
                <div className="text-[9px] tracking-[0.18em] uppercase mb-1.5" style={{ color: "#374151" }}>Category Split</div>
                <div className="text-[13px] font-medium mb-5" style={{ color: "#6b7280" }}>Rental distribution by type</div>
                <Donut />
                <div className="mt-4 pt-4 grid grid-cols-2 gap-3" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
                  <div>
                    <div className="text-[9px] tracking-[0.15em] uppercase mb-1" style={{ color: "#2d2d2d" }}>Top Item</div>
                    <div className="text-[12px] font-medium" style={{ color: "#c9a96e" }}>Lehenga Choli</div>
                  </div>
                  <div>
                    <div className="text-[9px] tracking-[0.15em] uppercase mb-1" style={{ color: "#2d2d2d" }}>Peak Day</div>
                    <div className="text-[12px] font-medium" style={{ color: "#6b7280" }}>Saturday</div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── ORDERS ── */}
            <div className="rounded-xl overflow-hidden"
              style={{ background: "rgba(255,255,255,0.018)", border: "1px solid rgba(255,255,255,0.05)" }}>
              <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                <div>
                  <div className="text-[9px] tracking-[0.18em] uppercase mb-0.5" style={{ color: "#374151" }}>Rental Orders</div>
                  <div className="text-[13px] font-medium" style={{ color: "#6b7280" }}>{shown.length} records</div>
                </div>
                <div className="flex items-center gap-1">
                  {["All", "Active", "Pending", "Returned", "Overdue"].map(f => (
                    <button key={f} onClick={() => setFilter(f)}
                      className="text-[10px] px-2.5 py-1 rounded-md tracking-wide font-medium transition-all"
                      style={filter === f
                        ? { background: "rgba(201,169,110,0.08)", color: "#c9a96e", border: "1px solid rgba(201,169,110,0.18)" }
                        : { color: "#374151", border: "1px solid rgba(255,255,255,0.04)" }}>
                      {f}
                    </button>
                  ))}
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                      {["Order ID", "Customer", "Item", "Category", "Rental Period", "Status", "Amount"].map(h => (
                        <th key={h} className="px-5 py-3 text-left text-[9px] tracking-[0.18em] uppercase font-medium" style={{ color: "#2d2d2d" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {shown.map(o => {
                      const cfg = STATUS_CFG[o.status];
                      return (
                        <tr key={o.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.025)" }}
                          onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.012)")}
                          onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                          <td className="px-5 py-3.5">
                            <span className="text-[11px]" style={{ color: "#c9a96e", fontFamily: "'DM Mono', monospace" }}>{o.id}</span>
                          </td>
                          <td className="px-5 py-3.5">
                            <div className="flex items-center gap-2.5">
                              <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-semibold shrink-0"
                                style={{ background: "rgba(255,255,255,0.05)", color: "#9ca3af" }}>
                                {o.customer[0]}
                              </div>
                              <span className="text-[12px]" style={{ color: "#d1d5db" }}>{o.customer}</span>
                            </div>
                          </td>
                          <td className="px-5 py-3.5 text-[12px]" style={{ color: "#9ca3af" }}>{o.item}</td>
                          <td className="px-5 py-3.5">
                            <span className="text-[10px] px-2 py-0.5 rounded" style={{ background: "rgba(255,255,255,0.04)", color: "#4b5563", border: "1px solid rgba(255,255,255,0.05)" }}>
                              {o.category}
                            </span>
                          </td>
                          <td className="px-5 py-3.5 text-[11px]" style={{ color: "#374151", fontFamily: "'DM Mono', monospace" }}>
                            {o.start} – {o.end}
                          </td>
                          <td className="px-5 py-3.5">
                            <span className="inline-flex items-center gap-1.5 text-[10px] px-2.5 py-1 rounded-full font-medium"
                              style={{ background: cfg.bg, color: cfg.text, border: `1px solid ${cfg.border}` }}>
                              <span className="w-1 h-1 rounded-full shrink-0" style={{ background: cfg.dot }} />
                              {o.status}
                            </span>
                          </td>
                          <td className="px-5 py-3.5 text-[12px] font-medium" style={{ color: "#d1d5db", fontFamily: "'DM Mono', monospace" }}>
                            ₹{o.amount.toLocaleString()}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* ── INVENTORY + ACTIVITY ── */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">

              {/* Inventory */}
              <div className="lg:col-span-3 rounded-xl overflow-hidden"
                style={{ background: "rgba(255,255,255,0.018)", border: "1px solid rgba(255,255,255,0.05)" }}>
                <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <div>
                    <div className="text-[9px] tracking-[0.18em] uppercase mb-0.5" style={{ color: "#374151" }}>Inventory</div>
                    <div className="text-[13px] font-medium" style={{ color: "#6b7280" }}>Stock utilisation</div>
                  </div>
                  <button className="flex items-center gap-1.5 text-[10px] px-3 py-1.5 rounded-md font-medium"
                    style={{ border: "1px solid rgba(255,255,255,0.07)", color: "#4b5563" }}>
                    <I.Plus /> Add Item
                  </button>
                </div>
                <div>
                  {INVENTORY.map((item, idx) => {
                    const pct = Math.round((item.rented / item.total) * 100);
                    const barC = pct > 80 ? "#ef4444" : pct > 55 ? "#c9a96e" : "#6b7280";
                    return (
                      <div key={item.id} className="flex items-center gap-5 px-5 py-4 transition-colors"
                        style={{ borderBottom: idx < INVENTORY.length - 1 ? "1px solid rgba(255,255,255,0.03)" : "none" }}
                        onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.01)")}
                        onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span className="text-[12px] font-medium" style={{ color: "#d1d5db" }}>{item.name}</span>
                              <span className="text-[9px] px-1.5 py-0.5 rounded" style={{ background: "rgba(255,255,255,0.04)", color: "#374151" }}>{item.category}</span>
                            </div>
                            <span className="text-[10px]" style={{ color: "#2d2d2d", fontFamily: "'DM Mono', monospace" }}>{item.id}</span>
                          </div>
                          <div className="h-0.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.05)" }}>
                            <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, background: barC }} />
                          </div>
                        </div>
                        <div className="flex items-center gap-5 shrink-0">
                          {[
                            { label: "AVAIL", value: item.available, color: "#6b7280" },
                            { label: "RENTED", value: item.rented, color: "#c9a96e" },
                            { label: "USED", value: `${pct}%`, color: "#4b5563" },
                            { label: "/DAY", value: `₹${item.ppd}`, color: "#374151" },
                          ].map(col => (
                            <div key={col.label} className="text-center">
                              <div className="text-[11px] font-medium" style={{ color: col.color, fontFamily: "'DM Mono', monospace" }}>{col.value}</div>
                              <div className="text-[8px] tracking-widest uppercase mt-0.5" style={{ color: "#1a1a1a" }}>{col.label}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Activity */}
              <div className="lg:col-span-2 rounded-xl p-5"
                style={{ background: "rgba(255,255,255,0.018)", border: "1px solid rgba(255,255,255,0.05)" }}>
                <div className="text-[9px] tracking-[0.18em] uppercase mb-0.5" style={{ color: "#374151" }}>Activity Log</div>
                <div className="text-[13px] font-medium mb-6" style={{ color: "#6b7280" }}>Latest events</div>
                <div className="space-y-5">
                  {ACTIVITY.map((a, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="flex flex-col items-center gap-1 shrink-0">
                        <div className="w-1.5 h-1.5 rounded-full mt-1" style={{ background: ACTIVITY_DOT[a.type] }} />
                        {i < ACTIVITY.length - 1 && <div className="w-px flex-1" style={{ background: "rgba(255,255,255,0.04)", minHeight: 20 }} />}
                      </div>
                      <div className="pb-1">
                        <div className="text-[11px] leading-relaxed" style={{ color: "#6b7280" }}>{a.msg}</div>
                        <div className="text-[9px] tracking-wide mt-1 uppercase" style={{ color: "#1f1f1f", fontFamily: "'DM Mono', monospace" }}>{a.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </main>
      </div>
    </>
  );
}