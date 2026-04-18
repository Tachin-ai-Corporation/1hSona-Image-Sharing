import { useState, useEffect, useRef } from "react";

// ── Brand tokens ──
const SONA_PINK = "#E8567F";
const SONA_PINK_LIGHT = "#FDF2F5";
const SONA_DARK = "#1a1a2e";
const H1_TEAL = "#00B894";
const H1_TEAL_LIGHT = "#E8FBF5";
const H1_BLUE = "#4A7BF7";
const H1_DARK = "#2D3748";
const H1_HEADER_BG = "#FFFFFF";
const H1_BODY_BG = "#F0F2F5";
const TEXT_PRIMARY = "#1A202C";
const TEXT_SECONDARY = "#718096";
const TEXT_MUTED = "#A0AEC0";
const BORDER = "#E2E8F0";
const BORDER_LIGHT = "#EDF2F7";
const SUCCESS = "#38A169";
const ORANGE_ICON = "#ED8936";
const BLUE_ICON = "#4A7BF7";

// ── Ultrasound placeholder ──
function UltrasoundThumb({ variant = 0, w = 200, h = 160 }) {
  const c = [["#111827","#1f2937","#374151"],["#0f172a","#1e293b","#334155"],["#18181b","#27272a","#3f3f46"]][variant % 3];
  return (
    <svg width="100%" height="auto" viewBox={`0 0 ${w} ${h}`} style={{ borderRadius: 8, display: "block" }}>
      <rect width={w} height={h} fill={c[0]} />
      <ellipse cx={w/2} cy={h*0.47} rx={w*0.3} ry={h*0.34} fill={c[1]} opacity="0.7" />
      <ellipse cx={w*0.45} cy={h*0.42} rx={w*0.18} ry={h*0.2} fill={c[2]} opacity="0.6" />
      <circle cx={w*0.4} cy={h*0.38} r={w*0.08} fill="#555577" opacity="0.5" />
      <text x="6" y={h-6} fontSize="8" fill="#666" fontFamily="monospace">US-{String(variant+1).padStart(3,"0")}</text>
      <text x="6" y="12" fontSize="7" fill="#555" fontFamily="monospace">{["12w3d","16w1d","20w0d"][variant%3]}</text>
    </svg>
  );
}

// ── Icons ──
function Icon1H({ size = 28 }) {
  return (
    <div style={{ width: size, height: size, borderRadius: 6, border: `1.5px solid ${BORDER}`, display: "flex", alignItems: "center", justifyContent: "center", background: "white", flexShrink: 0 }}>
      <span style={{ fontSize: size * 0.46, fontWeight: 700, color: H1_DARK, fontFamily: "system-ui", lineHeight: 1 }}>1h</span>
    </div>
  );
}
function IconTenant({ size = 28 }) {
  return (
    <div style={{ width: size, height: size, borderRadius: 6, background: H1_TEAL, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <svg width={size*0.55} height={size*0.55} viewBox="0 0 16 16" fill="none"><path d="M8 8a3 3 0 100-6 3 3 0 000 6zM14 14c0-2.5-2.7-4.5-6-4.5S2 11.5 2 14" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></svg>
    </div>
  );
}
function IconApp({ icon, bg = "#EDF2F7", size = 44 }) {
  return <div style={{ width: size, height: size, borderRadius: 10, background: bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, margin: "0 auto" }}>{icon}</div>;
}
function SonaAppIcon({ size = 44 }) {
  return <div style={{ width: size, height: size, borderRadius: 10, background: `linear-gradient(135deg, ${SONA_PINK}, #c44569)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><span style={{ color: "white", fontSize: size * 0.42, fontWeight: 700, fontFamily: "system-ui" }}>S</span></div>;
}
function SearchIcon({ size = 18, color = TEXT_MUTED }) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>; }
function BellIcon({ size = 18, color = TEXT_MUTED }) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>; }
function FolderIcon({ size = 18, color = TEXT_MUTED }) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/></svg>; }
function ChevronDown({ size = 14, color = TEXT_SECONDARY }) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5"><polyline points="6 9 12 15 18 9"/></svg>; }
function ChartBarIcon() { return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={H1_DARK} strokeWidth="2"><rect x="3" y="12" width="4" height="9"/><rect x="10" y="6" width="4" height="15"/><rect x="17" y="2" width="4" height="19"/></svg>; }
function PulseIcon() { return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>; }
function UsersIcon({ color = H1_DARK }) { return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>; }
function TrendIcon() { return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={H1_DARK} strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>; }
function CalendarIcon() { return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={H1_DARK} strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>; }
function GearIcon() { return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={H1_DARK} strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>; }
function WifiIcon({ size = 16, color = TEXT_SECONDARY }) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><path d="M5 12.55a11 11 0 0114.08 0"/><path d="M1.42 9a16 16 0 0121.16 0"/><path d="M8.53 16.11a6 6 0 016.95 0"/><circle cx="12" cy="20" r="1" fill={color}/></svg>; }
function ShieldCheck({ size = 14, color = SUCCESS }) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>; }
function ArrowRight({ size = 14, color = "#fff" }) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>; }
function CheckCircle({ size = 16, color = SUCCESS }) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>; }
function CheckSmall() { return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>; }
function ShareIcon() { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>; }
function MailIcon() { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>; }
function GridIcon() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>; }
function DocIcon() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>; }

// ── Utility ──
function FadeIn({ children, delay = 0, style = {} }) {
  const [v, setV] = useState(false);
  useEffect(() => { const t = setTimeout(() => setV(true), delay); return () => clearTimeout(t); }, [delay]);
  return <div style={{ opacity: v?1:0, transform: v?"translateY(0)":"translateY(10px)", transition: "opacity 0.4s ease, transform 0.4s ease", ...style }}>{children}</div>;
}

// ── 1Health Platform Header ──
function PlatformHeader({ tenantName, activeTab, tabs = [], onTabClick, initials = "CB" }) {
  return (
    <div style={{ background: H1_HEADER_BG, borderBottom: `1px solid ${BORDER}`, padding: "0 20px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 52, flexShrink: 0 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <Icon1H size={28} />
        <div style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer", padding: "4px 10px", borderRadius: 6, background: "#F7FAFC" }}>
          <IconTenant size={24} />
          <span style={{ fontSize: 13, fontWeight: 600, color: TEXT_PRIMARY, maxWidth: 220, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{tenantName}</span>
          <ChevronDown size={14} />
        </div>
        {tabs.map((tab, i) => (
          <div key={i} onClick={() => onTabClick?.(tab.id)} style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: 6, background: tab.id === activeTab ? "#EDF2F7" : "transparent", cursor: "pointer", marginLeft: i===0?4:0 }}>
            {tab.icon}
            <span style={{ fontSize: 13, fontWeight: tab.id === activeTab ? 600 : 400, color: tab.id === activeTab ? TEXT_PRIMARY : TEXT_SECONDARY }}>{tab.label}</span>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <SearchIcon /><div style={{ position: "relative" }}><BellIcon /><div style={{ position: "absolute", top: -4, right: -6, width: 14, height: 14, borderRadius: "50%", background: H1_TEAL, color: "white", fontSize: 9, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>!</div></div>
        <div style={{ position: "relative" }}><FolderIcon /><div style={{ position: "absolute", top: -4, right: -6, width: 16, height: 16, borderRadius: "50%", background: H1_BLUE, color: "white", fontSize: 9, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>2</div></div>
        <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#EDF2F7", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600, color: TEXT_PRIMARY }}>{initials}</div>
      </div>
    </div>
  );
}

function IframeBadge({ url }) {
  return <div style={{ position: "absolute", top: 12, right: 16, background: "#F7FAFC", border: `1px solid ${BORDER}`, borderRadius: 4, padding: "3px 8px", fontSize: 11, color: TEXT_MUTED, fontFamily: "monospace" }}>iframe: {url}</div>;
}

// ══════════════════════ SCREENS ══════════════════════

function ScreenSonaDashboard({ onShare }) {
  const [sel, setSel] = useState([0,1,2]);
  return (
    <div>
      <div style={{ background: "white", borderBottom: `1px solid ${BORDER}`, padding: "12px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <SonaAppIcon size={32} />
          <span style={{ fontSize: 18, fontWeight: 700, color: SONA_DARK }}>Sona</span>
          <span style={{ fontSize: 11, background: SONA_PINK_LIGHT, color: SONA_PINK, padding: "3px 8px", borderRadius: 6, fontWeight: 600 }}>Provider Portal</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: TEXT_SECONDARY }}>Bay Area Women's Health</div>
      </div>
      <div style={{ padding: 24, maxWidth: 860, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ background: `${SONA_PINK}08`, border: `1px solid ${SONA_PINK}15`, borderRadius: 14, padding: 20, marginBottom: 24, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div style={{ fontSize: 11, color: TEXT_MUTED, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 3 }}>Patient</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: TEXT_PRIMARY }}>Sarah Johnson</div>
              <div style={{ fontSize: 13, color: TEXT_SECONDARY }}>MRN: SN-284719 · DOB: 03/15/1992</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 26, fontWeight: 700, color: SONA_PINK }}>20w 3d</div>
              <div style={{ fontSize: 11, color: TEXT_MUTED }}>Gestational Age</div>
            </div>
          </div>
        </FadeIn>
        <FadeIn delay={100}><div style={{ fontSize: 14, fontWeight: 600, color: TEXT_PRIMARY, marginBottom: 12 }}>Ultrasound Images — Today's Exam</div></FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 24 }}>
          {[0,1,2].map(i => (
            <FadeIn key={i} delay={180+i*70}>
              <div onClick={() => setSel(s => s.includes(i)?s.filter(x=>x!==i):[...s,i])} style={{ cursor: "pointer", borderRadius: 10, overflow: "hidden", border: sel.includes(i)?`2px solid ${SONA_PINK}`:`1px solid ${BORDER}`, boxShadow: sel.includes(i)?`0 0 0 3px ${SONA_PINK}22`:"none", background: "white", transition: "all 0.2s" }}>
                <div style={{ position: "relative" }}>
                  <UltrasoundThumb variant={i} w={280} h={180} />
                  {sel.includes(i) && <div style={{ position: "absolute", top: 8, right: 8, width: 22, height: 22, borderRadius: "50%", background: SONA_PINK, display: "flex", alignItems: "center", justifyContent: "center" }}><CheckSmall /></div>}
                </div>
                <div style={{ padding: "8px 10px", fontSize: 12, color: TEXT_SECONDARY }}>{["Profile View · 10:32 AM","3D Render · 10:35 AM","Heartbeat · 10:38 AM"][i]}</div>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={450}>
          <div style={{ display: "flex", gap: 10 }}>
            <button style={{ background: SONA_PINK, color: "white", border: "none", borderRadius: 8, padding: "10px 18px", fontSize: 13, fontWeight: 600, opacity: 0.4, display: "flex", alignItems: "center", gap: 6 }}><MailIcon /> Send to Patient</button>
            <button onClick={onShare} style={{ background: `linear-gradient(135deg, ${H1_BLUE}, #3a6ae0)`, color: "white", border: "none", borderRadius: 8, padding: "10px 18px", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, boxShadow: `0 3px 12px ${H1_BLUE}33`, transition: "transform 0.15s" }} onMouseOver={e=>e.currentTarget.style.transform="translateY(-1px)"} onMouseOut={e=>e.currentTarget.style.transform="none"}><ShareIcon /> Share with Physician <span style={{ fontSize: 10, opacity: 0.75, marginLeft: 2 }}>via 1Health</span></button>
          </div>
          <div style={{ fontSize: 11, color: TEXT_MUTED, marginTop: 8, display: "flex", alignItems: "center", gap: 5 }}><Icon1H size={16} /> Powered by the 1Health physician network — 4,827 providers and growing</div>
        </FadeIn>
      </div>
    </div>
  );
}

function ScreenSearchShare({ onFound, onNotFound }) {
  const [query, setQuery] = useState("");
  const [reason, setReason] = useState("second_opinion");
  const [mode, setMode] = useState("idle");
  const [results, setResults] = useState([]);
  const physicians = [
    { name: "Dr. Calvin G. Broadus", specialty: "Maternal-Fetal Medicine", npi: "1928374650", org: "Pacific MFM Associates", initials: "CB" },
    { name: "Dr. Maria Chen", specialty: "Perinatology", npi: "1234567890", org: "UCSF Medical Center", initials: "MC" },
  ];
  const reasons = [{ id: "second_opinion", label: "Second Opinion" },{ id: "referral", label: "Referral / Consult" },{ id: "comanage", label: "Co-Management" },{ id: "transfer", label: "Transfer of Care" }];
  const handleSearch = q => { setQuery(q); if(q.length>2){ setMode("searching"); setTimeout(()=>{ if(q.toLowerCase().match(/broadus|calvin|pacific|mfm/)){ setResults(physicians); setMode("found"); } else if(q.toLowerCase().match(/smith|xyz|not/)){ setResults([]); setMode("notfound"); } else { setResults(physicians.slice(0,1)); setMode("found"); }},700); } else { setMode("idle"); setResults([]); }};

  return (
    <div>
      <div style={{ background: "white", borderBottom: `1px solid ${BORDER}`, padding: "12px 24px", display: "flex", alignItems: "center", gap: 8 }}>
        <SonaAppIcon size={28} /><span style={{ fontSize: 16, fontWeight: 700, color: SONA_DARK }}>Sona</span><span style={{ color: BORDER }}>→</span><Icon1H size={22} /><span style={{ fontSize: 14, fontWeight: 600, color: H1_DARK }}>Share with Physician</span>
      </div>
      <div style={{ padding: 24, maxWidth: 620, margin: "0 auto" }}>
        <FadeIn><div style={{ background: SONA_PINK_LIGHT, borderRadius: 8, padding: "8px 14px", marginBottom: 18, display: "flex", alignItems: "center", gap: 8, fontSize: 13 }}><div style={{ width: 7, height: 7, borderRadius: "50%", background: SONA_PINK }}/><span style={{ color: TEXT_SECONDARY }}>Sharing:</span><span style={{ fontWeight: 600, color: TEXT_PRIMARY }}>Sarah Johnson</span><span style={{ color: TEXT_MUTED }}>· 3 images · Today</span></div></FadeIn>
        <FadeIn delay={80}>
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: TEXT_SECONDARY, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.04em" }}>Reason for Sharing</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {reasons.map(r => <button key={r.id} onClick={()=>setReason(r.id)} style={{ padding: "6px 14px", borderRadius: 20, fontSize: 13, fontWeight: reason===r.id?600:400, cursor: "pointer", border: reason===r.id?`1.5px solid ${H1_BLUE}`:`1px solid ${BORDER}`, background: reason===r.id?`${H1_BLUE}08`:"white", color: reason===r.id?H1_BLUE:TEXT_SECONDARY, transition: "all 0.15s" }}>{r.label}</button>)}
            </div>
          </div>
        </FadeIn>
        <FadeIn delay={160}>
          <div style={{ position: "relative", marginBottom: 16 }}>
            <div style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)" }}><SearchIcon /></div>
            <input type="text" placeholder='Search by name, NPI, specialty, or organization...' value={query} onChange={e=>handleSearch(e.target.value)} style={{ width: "100%", padding: "12px 12px 12px 38px", borderRadius: 10, border: `1.5px solid ${mode==="found"?H1_BLUE:BORDER}`, fontSize: 14, outline: "none", boxSizing: "border-box", background: "white", transition: "border-color 0.2s" }}/>
            {mode==="searching" && <div style={{ position: "absolute", right: 13, top: "50%", transform: "translateY(-50%)" }}><div style={{ width: 16, height: 16, border: `2px solid ${H1_BLUE}`, borderTopColor: "transparent", borderRadius: "50%", animation: "spin .7s linear infinite" }}/></div>}
          </div>
        </FadeIn>
        {mode==="found" && results.length>0 && <div>{results.map((doc,i)=>(
          <FadeIn key={i} delay={i*80}><div style={{ background: "white", border: `1px solid ${BORDER}`, borderRadius: 10, padding: 14, marginBottom: 8, display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", transition: "all 0.15s" }} onMouseOver={e=>{e.currentTarget.style.borderColor=H1_BLUE}} onMouseOut={e=>{e.currentTarget.style.borderColor=BORDER}}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: `${H1_BLUE}10`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: H1_BLUE }}>{doc.initials}</div>
              <div><div style={{ display: "flex", alignItems: "center", gap: 5 }}><span style={{ fontSize: 14, fontWeight: 600, color: TEXT_PRIMARY }}>{doc.name}</span><CheckCircle size={13} /></div><div style={{ fontSize: 12, color: TEXT_SECONDARY }}>{doc.specialty} · {doc.org}</div><div style={{ fontSize: 10, color: TEXT_MUTED }}>NPI: {doc.npi}</div></div>
            </div>
            <button onClick={()=>onFound(doc, reasons.find(r=>r.id===reason)?.label||"Second Opinion")} style={{ background: H1_BLUE, color: "white", border: "none", borderRadius: 7, padding: "7px 14px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Share</button>
          </div></FadeIn>))}</div>}
        {mode==="notfound" && <FadeIn><div style={{ textAlign: "center", padding: 32, background: `${H1_BLUE}04`, borderRadius: 14, border: `1px dashed ${H1_BLUE}30` }}><div style={{ fontSize: 30, marginBottom: 8 }}>🔍</div><div style={{ fontSize: 15, fontWeight: 600, color: TEXT_PRIMARY, marginBottom: 4 }}>Physician not yet on 1Health</div><div style={{ fontSize: 13, color: TEXT_SECONDARY, marginBottom: 16 }}>A secure fax with a QR code and PIN will be sent to verify their identity.</div><button onClick={onNotFound} style={{ background: H1_BLUE, color: "white", border: "none", borderRadius: 8, padding: "10px 20px", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6 }}><MailIcon /> Invite via Secure Fax</button></div></FadeIn>}
        {mode==="idle" && <FadeIn delay={240}><div style={{ textAlign: "center", padding: 28, color: TEXT_MUTED, fontSize: 12 }}>4,827 verified physicians · Try "Broadus" (found) or "Smith" (not found)</div></FadeIn>}
      </div>
      <style>{`@keyframes spin{to{transform:translateY(-50%) rotate(360deg)}}`}</style>
    </div>
  );
}

function ScreenRegistration({ physician, reason, onComplete }) {
  const [pin, setPin] = useState(["","","",""]);
  const [step, setStep] = useState(0);
  const refs = [useRef(), useRef(), useRef(), useRef()];
  const doc = physician || { name: "Dr. Calvin G. Broadus" };
  const handlePin = (idx, val) => { if(val.length>1) return; const n=[...pin]; n[idx]=val; setPin(n); if(val && idx<3) refs[idx+1].current?.focus(); if(n.every(d=>d!=="")){ setTimeout(()=>setStep(1),300); setTimeout(()=>setStep(2),1800); }};

  if(step===2) return (
    <div style={{ minHeight: "100%", background: "#F7FAFC", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <FadeIn><div style={{ textAlign: "center", maxWidth: 400, padding: 40 }}>
        <div style={{ width: 60, height: 60, borderRadius: "50%", background: `${SUCCESS}12`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}><CheckCircle size={30} /></div>
        <div style={{ fontSize: 20, fontWeight: 700, color: TEXT_PRIMARY, marginBottom: 6 }}>Verified Successfully</div>
        <div style={{ fontSize: 14, color: TEXT_SECONDARY, marginBottom: 20 }}>Welcome to 1Health, Practice of {doc.name}.</div>
        <button onClick={onComplete} style={{ background: H1_TEAL, color: "white", border: "none", borderRadius: 8, padding: "12px 26px", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Continue to Dashboard →</button>
      </div></FadeIn>
    </div>
  );

  return (
    <div style={{ minHeight: "100%", background: "#F7FAFC", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <FadeIn><div style={{ maxWidth: 400, width: "100%", textAlign: "center", padding: "36px 20px" }}>
        <div style={{ margin: "0 auto 14px", width: 50, height: 50, borderRadius: 14, background: "linear-gradient(135deg, #2D3748, #4A5568)", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ fontSize: 20, fontWeight: 700, color: "white" }}>1h</span></div>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 5, background: H1_TEAL_LIGHT, color: H1_TEAL, padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600, marginBottom: 18 }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={H1_TEAL} strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18"/></svg>
          New Practice Registration
        </div>
        <div style={{ fontSize: 20, fontWeight: 700, color: TEXT_PRIMARY, marginBottom: 22 }}>Welcome, Practice of {doc.name}</div>

        <div style={{ background: "white", borderRadius: 16, border: `1px solid ${BORDER_LIGHT}`, padding: 22, marginBottom: 24, textAlign: "left" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
            <SonaAppIcon size={38} />
            <div>
              <div style={{ fontSize: 10, color: TEXT_MUTED, textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600, marginBottom: 1 }}>Sonographic Images Shared</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: TEXT_PRIMARY }}>Bay Area Women's Health</div>
              <div style={{ fontSize: 12, color: TEXT_SECONDARY }}>On behalf of patient Sarah Johnson</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 12px", background: "#F7FAFC", borderRadius: 8, marginBottom: 12 }}>
            <WifiIcon /><span style={{ fontSize: 13, color: TEXT_SECONDARY }}>Inviting you for</span><span style={{ fontSize: 13, fontWeight: 600, color: TEXT_PRIMARY }}>{reason || "Second Opinion"}</span>
          </div>
          <div style={{ background: `${SONA_PINK}08`, border: `1.5px solid ${SONA_PINK}20`, borderRadius: 12, padding: 12, display: "flex", alignItems: "center", gap: 10 }}>
            <SonaAppIcon size={38} />
            <div><div style={{ fontSize: 14, fontWeight: 700, color: TEXT_PRIMARY }}>Sona — Ultrasound Imaging</div><div style={{ fontSize: 12, color: TEXT_SECONDARY }}>Securely view & share prenatal ultrasound images</div></div>
          </div>
        </div>

        <div style={{ fontSize: 14, fontWeight: 600, color: TEXT_PRIMARY, marginBottom: 12 }}>4-Digit Invitation PIN</div>
        <div style={{ display: "flex", gap: 10, justifyContent: "center", marginBottom: 8 }}>
          {pin.map((d,i) => <input key={i} ref={refs[i]} type="text" inputMode="numeric" maxLength={1} value={d} onChange={e=>handlePin(i,e.target.value.replace(/\D/g,""))} style={{ width: 52, height: 56, borderRadius: 10, border: `1.5px solid ${d?H1_TEAL:BORDER}`, fontSize: 22, fontWeight: 700, textAlign: "center", outline: "none", background: "white", color: TEXT_PRIMARY, transition: "border-color 0.2s" }} onFocus={e=>e.target.style.borderColor=H1_TEAL} onBlur={e=>{if(!d)e.target.style.borderColor=BORDER}}/>)}
        </div>
        {step===1 && <div style={{ marginTop: 14 }}><div style={{ width: 24, height: 24, border: `2.5px solid ${H1_TEAL}`, borderTopColor: "transparent", borderRadius: "50%", margin: "0 auto", animation: "spin2 .8s linear infinite" }}/><div style={{ fontSize: 13, color: TEXT_SECONDARY, marginTop: 6 }}>Verifying...</div></div>}
        <div style={{ fontSize: 11, color: TEXT_MUTED, marginTop: 14, lineHeight: 1.5 }}>This PIN was included in the secure fax sent to your practice.<br/>Multiple verification faxes may be sent if needed.</div>
      </div></FadeIn>
      <style>{`@keyframes spin2{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}

function ScreenDashboard({ physician, onOpenSona }) {
  const doc = physician || { name: "Dr. Calvin G. Broadus", initials: "CB" };
  const tn = `Practice of ${doc.name}`;
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100%" }}>
      <PlatformHeader tenantName={tn} activeTab="dashboard" tabs={[]} initials={doc.initials||"CB"} />
      <div style={{ flex: 1, background: H1_BODY_BG, position: "relative" }}>
        <IframeBadge url="app.1health.io" />
        <div style={{ padding: "24px 28px", maxWidth: 960, margin: "0 auto" }}>
          <FadeIn><div style={{ marginBottom: 22 }}><div style={{ fontSize: 20, fontWeight: 700, color: TEXT_PRIMARY }}>Personal Dashboard</div><div style={{ fontSize: 14, color: TEXT_SECONDARY }}>Your personal workspace and health apps</div></div></FadeIn>
          <FadeIn delay={100}><div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 24 }}>
            {[{ l: "Active Apps", v: "5", icon: <GridIcon />, bg: H1_TEAL },{ l: "Invitations", v: "3", icon: <UsersIcon color="white" />, bg: H1_BLUE },{ l: "Documents", v: "12", icon: <DocIcon />, bg: ORANGE_ICON }].map((s,i) => (
              <div key={i} style={{ background: "white", borderRadius: 12, border: `1px solid ${BORDER_LIGHT}`, padding: "16px 18px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div><div style={{ fontSize: 13, color: TEXT_SECONDARY, marginBottom: 3 }}>{s.l}</div><div style={{ fontSize: 26, fontWeight: 700, color: TEXT_PRIMARY }}>{s.v}</div></div>
                <div style={{ width: 34, height: 34, borderRadius: 8, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>{s.icon}</div>
              </div>
            ))}
          </div></FadeIn>
          <FadeIn delay={180}><div style={{ fontSize: 14, fontWeight: 700, color: TEXT_PRIMARY, marginBottom: 12 }}>Your Apps</div></FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 12 }}>
            {[{ icon: <ChartBarIcon />, label: "Analytics", bg: "#EDF2F7" },{ icon: <PulseIcon />, label: "TCM App", bg: "#6C63FF" },{ icon: <UsersIcon />, label: "Patient Portal", bg: "#EDF2F7" },{ icon: <TrendIcon />, label: "Billing", bg: "#EDF2F7" }].map((app,i) => (
              <FadeIn key={i} delay={260+i*50}><div style={{ background: "white", borderRadius: 12, border: `1px solid ${BORDER_LIGHT}`, padding: "18px 14px", textAlign: "center", cursor: "pointer", transition: "all 0.15s" }} onMouseOver={e=>e.currentTarget.style.boxShadow="0 2px 8px rgba(0,0,0,0.06)"} onMouseOut={e=>e.currentTarget.style.boxShadow="none"}>
                <IconApp icon={app.icon} bg={app.bg} size={42} /><div style={{ fontSize: 13, fontWeight: 500, color: TEXT_PRIMARY, marginTop: 10 }}>{app.label}</div>
              </div></FadeIn>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
            <FadeIn delay={500}><div onClick={onOpenSona} style={{ background: "white", borderRadius: 12, border: `2px solid ${SONA_PINK}44`, padding: "18px 14px", textAlign: "center", cursor: "pointer", boxShadow: `0 2px 12px ${SONA_PINK}10`, position: "relative", transition: "all 0.15s" }} onMouseOver={e=>{e.currentTarget.style.boxShadow=`0 4px 20px ${SONA_PINK}22`;e.currentTarget.style.transform="translateY(-2px)"}} onMouseOut={e=>{e.currentTarget.style.boxShadow=`0 2px 12px ${SONA_PINK}10`;e.currentTarget.style.transform="none"}}>
              <div style={{ position: "absolute", top: 7, right: 7, background: SONA_PINK, color: "white", fontSize: 9, fontWeight: 700, padding: "2px 6px", borderRadius: 4 }}>NEW</div>
              <SonaAppIcon size={42} /><div style={{ fontSize: 13, fontWeight: 600, color: TEXT_PRIMARY, marginTop: 10 }}>Sona</div><div style={{ fontSize: 10, color: SONA_PINK, fontWeight: 500 }}>3 images shared</div>
            </div></FadeIn>
            {[{ icon: <CalendarIcon />, label: "Calendar" },{ icon: <GearIcon />, label: "Settings" }].map((app,i) => (
              <FadeIn key={i} delay={560+i*50}><div style={{ background: "white", borderRadius: 12, border: `1px solid ${BORDER_LIGHT}`, padding: "18px 14px", textAlign: "center", cursor: "pointer" }}>
                <IconApp icon={app.icon} bg="#EDF2F7" size={42} /><div style={{ fontSize: 13, fontWeight: 500, color: TEXT_PRIMARY, marginTop: 10 }}>{app.label}</div>
              </div></FadeIn>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ScreenSonaInPlatform({ physician, onNext }) {
  const doc = physician || { name: "Dr. Calvin G. Broadus", initials: "CB" };
  const tn = `Practice of ${doc.name}`;
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100%" }}>
      <PlatformHeader tenantName={tn} activeTab="sona" tabs={[{ id: "dashboard", label: "1h Personal Dashboard", icon: <Icon1H size={18} /> },{ id: "sona", label: "Sona", icon: <SonaAppIcon size={20} /> }]} initials={doc.initials||"CB"} />
      <div style={{ flex: 1, background: H1_BODY_BG, position: "relative" }}>
        <IframeBadge url="app.1health.io" />
        <div style={{ padding: "24px 28px", maxWidth: 960, margin: "0 auto" }}>
          <FadeIn><div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}><SonaAppIcon size={42} /><div><div style={{ fontSize: 18, fontWeight: 700, color: TEXT_PRIMARY }}>Sona — Ultrasound Imaging</div><div style={{ fontSize: 13, color: TEXT_SECONDARY }}>Viewing as {tn}</div></div></div></FadeIn>
          <div style={{ height: 1, background: `linear-gradient(90deg, ${SONA_PINK}33, transparent)`, margin: "14px 0 22px" }} />

          <FadeIn delay={120}><div style={{ background: "white", borderRadius: 14, border: `1px solid ${BORDER_LIGHT}`, padding: 20, marginBottom: 18 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
              <div><div style={{ fontSize: 11, color: TEXT_MUTED, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 2 }}>Shared With You</div><div style={{ fontSize: 16, fontWeight: 600, color: TEXT_PRIMARY }}>Sarah Johnson — Prenatal Ultrasound</div><div style={{ fontSize: 13, color: TEXT_SECONDARY }}>From Bay Area Women's Health · Second Opinion · April 18, 2026</div></div>
              <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: SUCCESS, fontWeight: 600 }}><ShieldCheck /> HIPAA Secure · SSO Verified</div>
            </div>
            <div style={{ background: "#F7FAFC", borderRadius: 8, padding: "9px 14px", marginBottom: 14, display: "flex", gap: 20, fontSize: 13, flexWrap: "wrap" }}>
              {[["DOB","03/15/1992"],["Gest. Age","20w 3d"],["Exam","04/18/2026"],["MRN","SN-284719"]].map(([l,v])=><div key={l}><span style={{ color: TEXT_MUTED }}>{l}:</span> <span style={{ fontWeight: 500, color: TEXT_PRIMARY }}>{v}</span></div>)}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
              {[0,1,2].map(i => <div key={i} style={{ borderRadius: 10, overflow: "hidden", border: `1px solid ${BORDER_LIGHT}`, background: "white" }}><UltrasoundThumb variant={i} w={300} h={200} /><div style={{ padding: "7px 9px" }}><div style={{ fontSize: 12, fontWeight: 600, color: TEXT_PRIMARY }}>{["Profile View","3D Render","Heartbeat"][i]}</div><div style={{ fontSize: 11, color: TEXT_MUTED }}>{["Sagittal","3D Surface","M-Mode"][i]} · {["10:32 AM","10:35 AM","10:38 AM"][i]}</div></div></div>)}
            </div>
          </div></FadeIn>

          <FadeIn delay={250}><div style={{ background: "white", borderRadius: 14, border: `1px solid ${BORDER_LIGHT}`, padding: 20, marginBottom: 18 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: TEXT_PRIMARY, marginBottom: 14 }}>Activity Overview</div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 14, height: 90, padding: "0 4px" }}>
              {[40,65,35,80,50,60,45,75,55,70,40,60].map((h,i) => <div key={i} style={{ flex: 1, height: h, borderRadius: 4, background: `linear-gradient(180deg, ${SONA_PINK}88, ${SONA_PINK}44)` }}/>)}
            </div>
          </div></FadeIn>

          <FadeIn delay={350}><div style={{ textAlign: "center", marginTop: 6 }}><button onClick={onNext} style={{ background: H1_DARK, color: "white", border: "none", borderRadius: 8, padding: "10px 20px", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6 }}>See the Growth Story <ArrowRight /></button></div></FadeIn>
        </div>
      </div>
    </div>
  );
}

function ScreenNetworkEffect() {
  return (
    <div style={{ minHeight: "100%", background: "linear-gradient(170deg, #0D1B30 0%, #1a2d4a 50%, #0D1B30 100%)" }}>
      <div style={{ padding: "40px 24px", maxWidth: 700, margin: "0 auto" }}>
        <FadeIn><div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, marginBottom: 18 }}><SonaAppIcon size={42} /><span style={{ fontSize: 26, color: "#ffffff44", fontWeight: 200 }}>+</span><div style={{ width: 42, height: 42, borderRadius: 12, background: "linear-gradient(135deg, #2D3748, #4A5568)", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ fontSize: 17, fontWeight: 700, color: "white" }}>1h</span></div></div>
          <div style={{ fontSize: 24, fontWeight: 700, color: "white", lineHeight: 1.35, marginBottom: 6 }}>Every Share Grows the Network.<br/>Every Provider Strengthens the Platform.</div>
          <div style={{ fontSize: 14, color: "#ffffff77" }}>Sona on 1Health turns image sharing into a distribution engine.</div>
        </div></FadeIn>
        <FadeIn delay={200}><div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 28 }}>
          {[{ n: "01", t: "Provider Shares via Sona", d: "Selects a specialist, chooses a reason, and shares ultrasound images through the 1Health network.", c: SONA_PINK },{ n: "02", t: "MD Receives Secure Fax + QR", d: "If not yet on 1Health, the physician receives a fax with a QR code and 4-digit PIN.", c: H1_BLUE },{ n: "03", t: "Lands on 1Health Dashboard", d: "After SSO, they see Sona alongside TCM, Analytics, and more. Single login, full ecosystem.", c: H1_TEAL },{ n: "04", t: "Network Compounds", d: "Payors drive providers through TRC. Sona adds a new vector. Every new provider makes the network more valuable.", c: "#FFB347" }].map((s,i)=>(
            <div key={i} style={{ background: "#ffffff08", border: "1px solid #ffffff10", borderRadius: 12, padding: 16 }}><div style={{ fontSize: 10, fontWeight: 700, color: s.c, letterSpacing: "0.08em", marginBottom: 5 }}>STEP {s.n}</div><div style={{ fontSize: 14, fontWeight: 600, color: "white", marginBottom: 3 }}>{s.t}</div><div style={{ fontSize: 12, color: "#ffffff66", lineHeight: 1.5 }}>{s.d}</div></div>
          ))}
        </div></FadeIn>
        <FadeIn delay={400}><div style={{ background: "#ffffff08", border: "1px solid #ffffff10", borderRadius: 14, padding: 20 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: "white", marginBottom: 12 }}>What This Means for Sona</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {[{ i:"📈",t:"Instant Distribution",d:"4,800+ verified physicians already on 1Health." },{ i:"🔐",t:"SSO & Shared Identity",d:"One credential, all apps. No new logins." },{ i:"🏥",t:"Payor-Driven Adoption",d:"Payors onboard providers through TRC. Sona rides the same wave." },{ i:"🔍",t:"App Discovery",d:"Sona visible on every provider's dashboard." },{ i:"💰",t:"Fundraising Narrative",d:"Network distribution = a stronger pitch to investors." },{ i:"🚀",t:"No Infrastructure Build",d:"Identity, compliance, directories — all built. Ship the feature." }].map((v,i)=>(
              <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}><span style={{ fontSize: 20 }}>{v.i}</span><div><div style={{ fontSize: 12, fontWeight: 600, color: "white", marginBottom: 1 }}>{v.t}</div><div style={{ fontSize: 11, color: "#ffffff66", lineHeight: 1.45 }}>{v.d}</div></div></div>
            ))}
          </div>
        </div></FadeIn>
        <FadeIn delay={600}><div style={{ textAlign: "center", padding: "24px 0 8px" }}><div style={{ fontSize: 20, fontWeight: 700, color: "white" }}>Let's build this together.</div><div style={{ fontSize: 13, color: "#ffffff55", marginTop: 4 }}>Sona × 1Health</div></div></FadeIn>
      </div>
    </div>
  );
}

// ══════════════════════ MAIN ══════════════════════

export default function App() {
  const [screen, setScreen] = useState(0);
  const [physician, setPhysician] = useState(null);
  const [reason, setReason] = useState("Second Opinion");
  const [isNew, setIsNew] = useState(true);
  const ref = useRef(null);
  const goTo = s => { setScreen(s); ref.current?.scrollTo(0,0); };

  const names = isNew
    ? ["Sona Dashboard","Search & Share","Registration","1H Dashboard","Sona in 1Health","Network Effect"]
    : ["Sona Dashboard","Search & Share","1H Dashboard","Sona in 1Health","Network Effect"];
  const total = names.length;

  return (
    <div style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", height: "100vh", display: "flex", flexDirection: "column", background: "#F7FAFC" }}>
      <div style={{ background: "white", borderBottom: `1px solid ${BORDER}`, padding: "7px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}><span style={{ fontSize: 12, fontWeight: 700, color: H1_BLUE }}>DEMO</span><span style={{ fontSize: 12, color: TEXT_SECONDARY }}>Sona × 1Health</span></div>
        <div style={{ display: "flex", alignItems: "center", gap: 2, background: "#F0F2F5", borderRadius: 8, padding: 2 }}>
          <button onClick={()=>{setIsNew(true);setScreen(0)}} style={{ padding: "5px 12px", borderRadius: 6, border: "none", fontSize: 11, fontWeight: 600, cursor: "pointer", background: isNew?"white":"transparent", color: isNew?TEXT_PRIMARY:TEXT_MUTED, boxShadow: isNew?"0 1px 3px rgba(0,0,0,0.08)":"none" }}>New Physician</button>
          <button onClick={()=>{setIsNew(false);setScreen(0)}} style={{ padding: "5px 12px", borderRadius: 6, border: "none", fontSize: 11, fontWeight: 600, cursor: "pointer", background: !isNew?"white":"transparent", color: !isNew?TEXT_PRIMARY:TEXT_MUTED, boxShadow: !isNew?"0 1px 3px rgba(0,0,0,0.08)":"none" }}>Existing Physician</button>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
          {names.map((_,i) => <button key={i} onClick={()=>goTo(i)} title={names[i]} style={{ width: i===screen?22:8, height: 8, borderRadius: 4, border: "none", cursor: "pointer", transition: "all 0.2s", background: i===screen?H1_BLUE:i<screen?SUCCESS:BORDER }}/>)}
        </div>
        <div style={{ display: "flex", gap: 4 }}>
          {screen>0 && <button onClick={()=>goTo(screen-1)} style={{ padding: "4px 10px", borderRadius: 6, border: `1px solid ${BORDER}`, background: "white", fontSize: 11, cursor: "pointer", color: TEXT_SECONDARY }}>← Back</button>}
          {screen<total-1 && <button onClick={()=>{ if(screen===1) setPhysician({ name: "Dr. Calvin G. Broadus", specialty: "Maternal-Fetal Medicine", org: "Pacific MFM Associates", initials: "CB", npi: "1928374650" }); goTo(screen+1); }} style={{ padding: "4px 10px", borderRadius: 6, border: "none", background: H1_BLUE, color: "white", fontSize: 11, fontWeight: 600, cursor: "pointer" }}>Next →</button>}
        </div>
      </div>
      <div ref={ref} style={{ flex: 1, overflow: "auto" }}>
        {screen===0 && <ScreenSonaDashboard onShare={()=>goTo(1)} />}
        {screen===1 && <ScreenSearchShare onFound={(d,r)=>{setPhysician(d);setReason(r);goTo(2)}} onNotFound={()=>{setPhysician({name:"Dr. Rebecca Smith",specialty:"OB/GYN",org:"Meridian Women's Health",initials:"RS"});goTo(2)}}/>}
        {isNew && screen===2 && <ScreenRegistration physician={physician} reason={reason} onComplete={()=>goTo(3)} />}
        {((isNew&&screen===3)||(!isNew&&screen===2)) && <ScreenDashboard physician={physician} onOpenSona={()=>goTo(isNew?4:3)} />}
        {((isNew&&screen===4)||(!isNew&&screen===3)) && <ScreenSonaInPlatform physician={physician} onNext={()=>goTo(isNew?5:4)} />}
        {((isNew&&screen===5)||(!isNew&&screen===4)) && <ScreenNetworkEffect />}
      </div>
    </div>
  );
}
