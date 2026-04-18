import { useState, useEffect, useRef } from "react";

const SONA_PINK = "#E8567F";
const SONA_PINK_LIGHT = "#FDF2F5";
const SONA_DARK = "#1a1a2e";
const HEALTH_BLUE = "#0066FF";
const HEALTH_BLUE_LIGHT = "#EBF3FF";
const HEALTH_TEAL = "#00C9A7";
const HEALTH_DARK = "#0A1628";
const BG_WARM = "#FAFAF8";
const CARD_BG = "#FFFFFF";
const TEXT_PRIMARY = "#1a1a2e";
const TEXT_SECONDARY = "#6B7280";
const BORDER = "#E5E7EB";
const SUCCESS_GREEN = "#10B981";

// Fake ultrasound placeholder SVGs
function UltrasoundImage({ variant = 0, size = 200 }) {
  const colors = [
    ["#1a1a2e", "#2d2d44", "#3f3f5c"],
    ["#0f0f23", "#252540", "#3a3a5e"],
    ["#1e1e35", "#33334d", "#484866"],
  ];
  const c = colors[variant % 3];
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" style={{ borderRadius: 12 }}>
      <rect width="200" height="200" fill={c[0]} />
      <ellipse cx="100" cy="95" rx="60" ry="55" fill={c[1]} opacity="0.7" />
      <ellipse cx="90" cy="85" rx="35" ry="32" fill={c[2]} opacity="0.6" />
      <circle cx="80" cy="78" r="18" fill="#555577" opacity="0.5" />
      <circle cx="80" cy="78" r="8" fill="#777799" opacity="0.4" />
      <text x="10" y="190" fontSize="10" fill="#888" fontFamily="monospace">
        US-{String(variant + 1).padStart(3, "0")} • DICOM
      </text>
      <text x="10" y="15" fontSize="9" fill="#666" fontFamily="monospace">
        Sona • {["12w3d", "16w1d", "20w0d"][variant % 3]}
      </text>
    </svg>
  );
}

function SonaLogo({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40">
      <rect width="40" height="40" rx="10" fill={SONA_PINK} />
      <text x="20" y="26" textAnchor="middle" fill="white" fontSize="18" fontWeight="700" fontFamily="system-ui">
        S
      </text>
    </svg>
  );
}

function OneHealthLogo({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40">
      <rect width="40" height="40" rx="10" fill={HEALTH_BLUE} />
      <text x="20" y="27" textAnchor="middle" fill="white" fontSize="16" fontWeight="700" fontFamily="system-ui">
        1H
      </text>
    </svg>
  );
}

function GiggleGaugeLogo({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40">
      <rect width="40" height="40" rx="10" fill="#FFB347" />
      <text x="20" y="28" textAnchor="middle" fontSize="22">😄</text>
    </svg>
  );
}

function TRCLogo({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40">
      <rect width="40" height="40" rx="10" fill="#6C63FF" />
      <text x="20" y="26" textAnchor="middle" fill="white" fontSize="11" fontWeight="700" fontFamily="system-ui">
        TRC
      </text>
    </svg>
  );
}

// Icon components
function SearchIcon({ size = 20, color = TEXT_SECONDARY }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function ShareIcon({ size = 20, color = "white" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  );
}

function CheckCircle({ size = 20, color = SUCCESS_GREEN }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function BellIcon({ size = 20, color = HEALTH_BLUE }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

function ArrowRight({ size = 20, color = "white" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function UserIcon({ size = 20, color = TEXT_SECONDARY }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function MailIcon({ size = 20, color = "white" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function GridIcon({ size = 20, color = TEXT_SECONDARY }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  );
}

function ShieldIcon({ size = 20, color = SUCCESS_GREEN }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" stroke={color} strokeWidth="2" />
    </svg>
  );
}

function NetworkIcon({ size = 48 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="8" r="5" fill={HEALTH_BLUE} opacity="0.8" />
      <circle cx="8" cy="28" r="5" fill={SONA_PINK} opacity="0.8" />
      <circle cx="40" cy="28" r="5" fill={HEALTH_TEAL} opacity="0.8" />
      <circle cx="16" cy="42" r="5" fill="#FFB347" opacity="0.8" />
      <circle cx="32" cy="42" r="5" fill="#6C63FF" opacity="0.8" />
      <line x1="24" y1="13" x2="8" y2="23" stroke={BORDER} strokeWidth="1.5" />
      <line x1="24" y1="13" x2="40" y2="23" stroke={BORDER} strokeWidth="1.5" />
      <line x1="8" y1="33" x2="16" y2="37" stroke={BORDER} strokeWidth="1.5" />
      <line x1="40" y1="33" x2="32" y2="37" stroke={BORDER} strokeWidth="1.5" />
      <line x1="16" y1="42" x2="32" y2="42" stroke={BORDER} strokeWidth="1.5" />
      <line x1="8" y1="28" x2="40" y2="28" stroke={BORDER} strokeWidth="1" strokeDasharray="3 3" />
    </svg>
  );
}

// Fade-in animation wrapper
function FadeIn({ children, delay = 0, style = {} }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(12px)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// Step indicator
function StepIndicator({ steps, current, onStep }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4, padding: "12px 0" }}>
      {steps.map((s, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <button
            onClick={() => onStep(i)}
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              border: "none",
              background: i === current ? HEALTH_BLUE : i < current ? SUCCESS_GREEN : BORDER,
              color: i <= current ? "white" : TEXT_SECONDARY,
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.3s",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {i < current ? "✓" : i + 1}
          </button>
          {i < steps.length - 1 && (
            <div
              style={{
                width: 40,
                height: 2,
                background: i < current ? SUCCESS_GREEN : BORDER,
                transition: "background 0.3s",
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

// ============================================================
// SCREEN 1: Sona Provider Dashboard
// ============================================================
function Screen1_SonaDashboard({ onNext }) {
  const [selectedImage, setSelectedImage] = useState(null);

  const patient = {
    name: "Sarah Johnson",
    dob: "03/15/1992",
    gestAge: "20w 3d",
    nextAppt: "May 12, 2026",
    mrn: "SN-284719",
  };

  return (
    <div style={{ minHeight: "100%" }}>
      {/* Sona Header */}
      <div
        style={{
          background: "white",
          borderBottom: `1px solid ${BORDER}`,
          padding: "14px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <SonaLogo size={32} />
          <span style={{ fontSize: 18, fontWeight: 700, color: SONA_DARK, letterSpacing: "-0.02em" }}>
            Sona
          </span>
          <span
            style={{
              fontSize: 11,
              background: SONA_PINK_LIGHT,
              color: SONA_PINK,
              padding: "3px 8px",
              borderRadius: 6,
              fontWeight: 600,
            }}
          >
            Provider Portal
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ fontSize: 13, color: TEXT_SECONDARY }}>Bay Area Women's Health</span>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: SONA_PINK_LIGHT,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <UserIcon size={16} color={SONA_PINK} />
          </div>
        </div>
      </div>

      <div style={{ padding: 24, maxWidth: 900, margin: "0 auto" }}>
        <FadeIn>
          <div
            style={{
              background: `linear-gradient(135deg, ${SONA_PINK}11 0%, ${SONA_PINK}05 100%)`,
              border: `1px solid ${SONA_PINK}22`,
              borderRadius: 16,
              padding: 24,
              marginBottom: 24,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ fontSize: 12, color: TEXT_SECONDARY, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Patient
                </div>
                <div style={{ fontSize: 22, fontWeight: 700, color: TEXT_PRIMARY, marginBottom: 2 }}>
                  {patient.name}
                </div>
                <div style={{ fontSize: 13, color: TEXT_SECONDARY }}>
                  MRN: {patient.mrn} • DOB: {patient.dob}
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 28, fontWeight: 700, color: SONA_PINK }}>{patient.gestAge}</div>
                <div style={{ fontSize: 12, color: TEXT_SECONDARY }}>Gestational Age</div>
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={150}>
          <div style={{ fontSize: 15, fontWeight: 600, color: TEXT_PRIMARY, marginBottom: 12 }}>
            Ultrasound Images — Today's Exam
          </div>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 24 }}>
          {[0, 1, 2].map((i) => (
            <FadeIn key={i} delay={250 + i * 100}>
              <div
                onClick={() => setSelectedImage(i)}
                style={{
                  cursor: "pointer",
                  borderRadius: 12,
                  overflow: "hidden",
                  border: selectedImage === i ? `3px solid ${SONA_PINK}` : `1px solid ${BORDER}`,
                  transition: "all 0.2s",
                  background: "white",
                  boxShadow: selectedImage === i ? `0 0 0 3px ${SONA_PINK}33` : "0 1px 3px rgba(0,0,0,0.06)",
                }}
              >
                <UltrasoundImage variant={i} size={280} />
                <div style={{ padding: "8px 10px", fontSize: 12, color: TEXT_SECONDARY }}>
                  {["Profile View", "3D Render", "Heartbeat"][i]} •{" "}
                  {["10:32 AM", "10:35 AM", "10:38 AM"][i]}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={600}>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <button
              style={{
                background: SONA_PINK,
                color: "white",
                border: "none",
                borderRadius: 10,
                padding: "12px 20px",
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 8,
                opacity: 0.5,
              }}
            >
              <MailIcon size={16} /> Send to Patient
            </button>
            <button
              onClick={onNext}
              style={{
                background: `linear-gradient(135deg, ${HEALTH_BLUE}, ${HEALTH_BLUE}dd)`,
                color: "white",
                border: "none",
                borderRadius: 10,
                padding: "12px 20px",
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 8,
                boxShadow: `0 4px 14px ${HEALTH_BLUE}44`,
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow = `0 6px 20px ${HEALTH_BLUE}55`;
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = `0 4px 14px ${HEALTH_BLUE}44`;
              }}
            >
              <ShareIcon size={16} /> Share with Physician
              <span style={{ fontSize: 11, opacity: 0.8, marginLeft: 4 }}>via 1Health</span>
            </button>
          </div>
          <div style={{ fontSize: 12, color: TEXT_SECONDARY, marginTop: 10, display: "flex", alignItems: "center", gap: 6 }}>
            <OneHealthLogo size={16} />
            Powered by the 1Health physician network — {(4827).toLocaleString()} providers and growing
          </div>
        </FadeIn>
      </div>
    </div>
  );
}

// ============================================================
// SCREEN 2: Search 1Health Physician Directory
// ============================================================
function Screen2_PhysicianSearch({ onNext, onNotFound }) {
  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState(null);
  const [mode, setMode] = useState("idle"); // idle | searching | found | notfound

  const physicians = [
    { name: "Dr. Maria Chen", specialty: "Maternal-Fetal Medicine", npi: "1234567890", org: "UCSF Medical Center", verified: true },
    { name: "Dr. James Rodriguez", specialty: "OB/GYN", npi: "0987654321", org: "Kaiser Permanente SF", verified: true },
    { name: "Dr. Anika Patel", specialty: "Perinatology", npi: "1122334455", org: "Stanford Health Care", verified: true },
  ];

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
    if (searchQuery.length > 2) {
      setMode("searching");
      setTimeout(() => {
        if (searchQuery.toLowerCase().includes("chen") || searchQuery.toLowerCase().includes("maria") || searchQuery.toLowerCase().includes("mfm") || searchQuery.toLowerCase().includes("ucsf")) {
          setResults(physicians);
          setMode("found");
        } else if (searchQuery.toLowerCase().includes("not") || searchQuery.toLowerCase().includes("xyz") || searchQuery.toLowerCase().includes("smith")) {
          setResults([]);
          setMode("notfound");
        } else {
          setResults(physicians.slice(0, 2));
          setMode("found");
        }
      }, 800);
    } else {
      setMode("idle");
      setResults(null);
    }
  };

  return (
    <div style={{ minHeight: "100%" }}>
      {/* Sona Header with 1Health badge */}
      <div
        style={{
          background: "white",
          borderBottom: `1px solid ${BORDER}`,
          padding: "14px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <SonaLogo size={32} />
          <span style={{ fontSize: 18, fontWeight: 700, color: SONA_DARK }}>Sona</span>
          <span style={{ margin: "0 4px", color: BORDER }}>×</span>
          <OneHealthLogo size={28} />
          <span style={{ fontSize: 14, fontWeight: 600, color: HEALTH_BLUE }}>1Health Network</span>
        </div>
        <div style={{ fontSize: 13, color: TEXT_SECONDARY }}>
          Physician Directory
        </div>
      </div>

      <div style={{ padding: 24, maxWidth: 700, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: TEXT_PRIMARY, marginBottom: 4 }}>
              Share Ultrasound Images
            </div>
            <div style={{ fontSize: 14, color: TEXT_SECONDARY }}>
              Search the 1Health physician network to find the specialist you want to share with.
            </div>
          </div>
        </FadeIn>

        {/* Patient context bar */}
        <FadeIn delay={100}>
          <div
            style={{
              background: SONA_PINK_LIGHT,
              borderRadius: 10,
              padding: "10px 14px",
              marginBottom: 20,
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontSize: 13,
            }}
          >
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: SONA_PINK }} />
            <span style={{ color: TEXT_SECONDARY }}>Sharing from:</span>
            <span style={{ fontWeight: 600, color: TEXT_PRIMARY }}>Sarah Johnson</span>
            <span style={{ color: TEXT_SECONDARY }}>• 3 images selected • Today's exam</span>
          </div>
        </FadeIn>

        {/* Search input */}
        <FadeIn delay={200}>
          <div
            style={{
              position: "relative",
              marginBottom: 20,
            }}
          >
            <div style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }}>
              <SearchIcon size={18} />
            </div>
            <input
              type="text"
              placeholder="Search by name, NPI, specialty, or organization..."
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              style={{
                width: "100%",
                padding: "14px 14px 14px 42px",
                borderRadius: 12,
                border: `2px solid ${mode === "found" ? HEALTH_BLUE : BORDER}`,
                fontSize: 15,
                outline: "none",
                transition: "border-color 0.3s",
                boxSizing: "border-box",
                background: "white",
              }}
            />
            {mode === "searching" && (
              <div style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)" }}>
                <div
                  style={{
                    width: 18,
                    height: 18,
                    border: `2px solid ${HEALTH_BLUE}`,
                    borderTopColor: "transparent",
                    borderRadius: "50%",
                    animation: "spin 0.8s linear infinite",
                  }}
                />
              </div>
            )}
          </div>
        </FadeIn>

        {/* Quick filters */}
        <FadeIn delay={300}>
          <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
            {["Maternal-Fetal Medicine", "OB/GYN", "Perinatology", "Radiology"].map((f) => (
              <button
                key={f}
                onClick={() => handleSearch(f)}
                style={{
                  padding: "6px 14px",
                  borderRadius: 20,
                  border: `1px solid ${BORDER}`,
                  background: "white",
                  fontSize: 12,
                  color: TEXT_SECONDARY,
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = HEALTH_BLUE;
                  e.currentTarget.style.color = HEALTH_BLUE;
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = BORDER;
                  e.currentTarget.style.color = TEXT_SECONDARY;
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Results */}
        {mode === "found" && results && results.length > 0 && (
          <div>
            <div style={{ fontSize: 12, color: TEXT_SECONDARY, marginBottom: 10, display: "flex", alignItems: "center", gap: 6 }}>
              <ShieldIcon size={14} />
              {results.length} verified physicians found in the 1Health network
            </div>
            {results.map((doc, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div
                  style={{
                    background: "white",
                    border: `1px solid ${BORDER}`,
                    borderRadius: 12,
                    padding: 16,
                    marginBottom: 10,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.borderColor = HEALTH_BLUE;
                    e.currentTarget.style.boxShadow = `0 2px 12px ${HEALTH_BLUE}15`;
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.borderColor = BORDER;
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: "50%",
                        background: HEALTH_BLUE_LIGHT,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 16,
                        fontWeight: 700,
                        color: HEALTH_BLUE,
                      }}
                    >
                      {doc.name.split(" ")[1][0]}
                      {doc.name.split(" ")[2]?.[0] || ""}
                    </div>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <span style={{ fontSize: 15, fontWeight: 600, color: TEXT_PRIMARY }}>{doc.name}</span>
                        {doc.verified && <CheckCircle size={14} />}
                      </div>
                      <div style={{ fontSize: 13, color: TEXT_SECONDARY }}>
                        {doc.specialty} • {doc.org}
                      </div>
                      <div style={{ fontSize: 11, color: TEXT_SECONDARY, marginTop: 2 }}>NPI: {doc.npi}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => onNext(doc)}
                    style={{
                      background: HEALTH_BLUE,
                      color: "white",
                      border: "none",
                      borderRadius: 8,
                      padding: "8px 16px",
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <ShareIcon size={14} /> Share
                  </button>
                </div>
              </FadeIn>
            ))}
          </div>
        )}

        {mode === "notfound" && (
          <FadeIn>
            <div
              style={{
                textAlign: "center",
                padding: 40,
                background: `${HEALTH_BLUE}05`,
                borderRadius: 16,
                border: `1px dashed ${HEALTH_BLUE}33`,
              }}
            >
              <div style={{ fontSize: 36, marginBottom: 12 }}>🔍</div>
              <div style={{ fontSize: 16, fontWeight: 600, color: TEXT_PRIMARY, marginBottom: 6 }}>
                Physician not yet on 1Health
              </div>
              <div style={{ fontSize: 13, color: TEXT_SECONDARY, marginBottom: 20, maxWidth: 400, margin: "0 auto 20px" }}>
                No worries — you can invite them to join. They'll get secure access to view the shared images through Sona on 1Health.
              </div>
              <button
                onClick={onNotFound}
                style={{
                  background: HEALTH_BLUE,
                  color: "white",
                  border: "none",
                  borderRadius: 10,
                  padding: "12px 24px",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  margin: "0 auto",
                }}
              >
                <MailIcon size={16} /> Invite Physician to 1Health
              </button>
            </div>
          </FadeIn>
        )}

        {mode === "idle" && (
          <FadeIn delay={400}>
            <div
              style={{
                textAlign: "center",
                padding: 40,
                color: TEXT_SECONDARY,
              }}
            >
              <NetworkIcon size={56} />
              <div style={{ fontSize: 14, marginTop: 12, fontWeight: 500 }}>
                4,827 verified physicians across 312 organizations
              </div>
              <div style={{ fontSize: 12, marginTop: 4, opacity: 0.7 }}>
                Growing daily as payors onboard providers through 1Health
              </div>
            </div>
          </FadeIn>
        )}
      </div>

      <style>{`@keyframes spin { to { transform: translateY(-50%) rotate(360deg); } }`}</style>
    </div>
  );
}

// ============================================================
// SCREEN 3: Confirm Share / Handshake
// ============================================================
function Screen3_ConfirmShare({ physician, onNext }) {
  const [step, setStep] = useState(0); // 0: confirm, 1: sending, 2: sent

  useEffect(() => {
    if (step === 1) {
      const t = setTimeout(() => setStep(2), 1500);
      return () => clearTimeout(t);
    }
  }, [step]);

  const doc = physician || {
    name: "Dr. Maria Chen",
    specialty: "Maternal-Fetal Medicine",
    org: "UCSF Medical Center",
    npi: "1234567890",
    verified: true,
  };

  return (
    <div style={{ minHeight: "100%" }}>
      <div
        style={{
          background: "white",
          borderBottom: `1px solid ${BORDER}`,
          padding: "14px 24px",
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <SonaLogo size={28} />
        <span style={{ color: BORDER, margin: "0 2px" }}>×</span>
        <OneHealthLogo size={24} />
        <span style={{ fontSize: 15, fontWeight: 600, color: TEXT_PRIMARY }}>Confirm Share</span>
      </div>

      <div style={{ padding: 24, maxWidth: 560, margin: "0 auto" }}>
        {step === 0 && (
          <FadeIn>
            <div
              style={{
                background: "white",
                borderRadius: 16,
                border: `1px solid ${BORDER}`,
                overflow: "hidden",
              }}
            >
              {/* Share summary header */}
              <div style={{ background: `linear-gradient(135deg, ${HEALTH_BLUE}08, ${SONA_PINK}08)`, padding: 24, borderBottom: `1px solid ${BORDER}` }}>
                <div style={{ fontSize: 18, fontWeight: 700, color: TEXT_PRIMARY, marginBottom: 16 }}>
                  Confirm Image Share
                </div>

                {/* From / To visual */}
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{ flex: 1, textAlign: "center" }}>
                    <div style={{ width: 48, height: 48, borderRadius: "50%", background: SONA_PINK_LIGHT, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 8px" }}>
                      <SonaLogo size={24} />
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: TEXT_PRIMARY }}>Sarah Johnson</div>
                    <div style={{ fontSize: 11, color: TEXT_SECONDARY }}>Patient • via Sona</div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                    <ArrowRight size={20} color={HEALTH_BLUE} />
                    <div style={{ fontSize: 10, color: HEALTH_BLUE, fontWeight: 600 }}>HIPAA SECURE</div>
                  </div>
                  <div style={{ flex: 1, textAlign: "center" }}>
                    <div style={{ width: 48, height: 48, borderRadius: "50%", background: HEALTH_BLUE_LIGHT, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 8px" }}>
                      <span style={{ fontSize: 18, fontWeight: 700, color: HEALTH_BLUE }}>MC</span>
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: TEXT_PRIMARY }}>{doc.name}</div>
                    <div style={{ fontSize: 11, color: TEXT_SECONDARY }}>{doc.specialty}</div>
                  </div>
                </div>
              </div>

              {/* Details */}
              <div style={{ padding: 20 }}>
                <div style={{ fontSize: 12, color: TEXT_SECONDARY, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 10 }}>
                  Sharing Details
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
                  <div style={{ background: BG_WARM, borderRadius: 8, padding: 12 }}>
                    <div style={{ fontSize: 11, color: TEXT_SECONDARY }}>Images</div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: TEXT_PRIMARY }}>3 ultrasound files</div>
                  </div>
                  <div style={{ background: BG_WARM, borderRadius: 8, padding: 12 }}>
                    <div style={{ fontSize: 11, color: TEXT_SECONDARY }}>Purpose</div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: TEXT_PRIMARY }}>Specialist consult</div>
                  </div>
                  <div style={{ background: BG_WARM, borderRadius: 8, padding: 12 }}>
                    <div style={{ fontSize: 11, color: TEXT_SECONDARY }}>Organization</div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: TEXT_PRIMARY }}>{doc.org}</div>
                  </div>
                  <div style={{ background: BG_WARM, borderRadius: 8, padding: 12 }}>
                    <div style={{ fontSize: 11, color: TEXT_SECONDARY }}>Access Expires</div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: TEXT_PRIMARY }}>30 days</div>
                  </div>
                </div>

                {/* Security badges */}
                <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
                  {["HIPAA Compliant", "NPI Verified", "End-to-End Encrypted", "Audit Trail"].map((b) => (
                    <span
                      key={b}
                      style={{
                        fontSize: 11,
                        padding: "4px 10px",
                        borderRadius: 6,
                        background: `${SUCCESS_GREEN}10`,
                        color: SUCCESS_GREEN,
                        fontWeight: 600,
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                      }}
                    >
                      <ShieldIcon size={12} color={SUCCESS_GREEN} />
                      {b}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => setStep(1)}
                  style={{
                    width: "100%",
                    background: `linear-gradient(135deg, ${HEALTH_BLUE}, ${HEALTH_BLUE}dd)`,
                    color: "white",
                    border: "none",
                    borderRadius: 10,
                    padding: "14px",
                    fontSize: 15,
                    fontWeight: 600,
                    cursor: "pointer",
                    boxShadow: `0 4px 14px ${HEALTH_BLUE}33`,
                  }}
                >
                  Confirm & Share Securely
                </button>
              </div>
            </div>
          </FadeIn>
        )}

        {step === 1 && (
          <div style={{ textAlign: "center", padding: 60 }}>
            <div
              style={{
                width: 64,
                height: 64,
                border: `3px solid ${HEALTH_BLUE}`,
                borderTopColor: "transparent",
                borderRadius: "50%",
                margin: "0 auto 20px",
                animation: "spin2 1s linear infinite",
              }}
            />
            <div style={{ fontSize: 16, fontWeight: 600, color: TEXT_PRIMARY }}>Sharing securely...</div>
            <div style={{ fontSize: 13, color: TEXT_SECONDARY, marginTop: 4 }}>
              Encrypting and sending via 1Health
            </div>
            <style>{`@keyframes spin2 { to { transform: rotate(360deg); } }`}</style>
          </div>
        )}

        {step === 2 && (
          <FadeIn>
            <div style={{ textAlign: "center", padding: 40 }}>
              <div
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: "50%",
                  background: `${SUCCESS_GREEN}15`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px",
                }}
              >
                <CheckCircle size={36} />
              </div>
              <div style={{ fontSize: 20, fontWeight: 700, color: TEXT_PRIMARY, marginBottom: 6 }}>
                Images Shared Successfully
              </div>
              <div style={{ fontSize: 14, color: TEXT_SECONDARY, marginBottom: 4 }}>
                {doc.name} has been notified and can view the images
              </div>
              <div style={{ fontSize: 14, color: TEXT_SECONDARY, marginBottom: 24 }}>
                through their 1Health dashboard using SSO.
              </div>

              <div style={{ background: BG_WARM, borderRadius: 12, padding: 16, marginBottom: 24, textAlign: "left" }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: TEXT_SECONDARY, marginBottom: 8 }}>What happens next:</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {[
                    { icon: "🔔", text: `${doc.name} receives a secure notification` },
                    { icon: "🔐", text: "They authenticate via 1Health SSO — no new login needed" },
                    { icon: "👁", text: "Ultrasound images open directly in the Sona viewer" },
                    { icon: "📋", text: "Full audit trail is recorded for compliance" },
                  ].map((item, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 13, color: TEXT_PRIMARY }}>
                      <span style={{ fontSize: 16 }}>{item.icon}</span>
                      {item.text}
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={onNext}
                style={{
                  background: HEALTH_BLUE,
                  color: "white",
                  border: "none",
                  borderRadius: 10,
                  padding: "12px 24px",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  margin: "0 auto",
                }}
              >
                See Receiving Physician's View <ArrowRight size={16} />
              </button>
            </div>
          </FadeIn>
        )}
      </div>
    </div>
  );
}

// ============================================================
// SCREEN 4: Invitation Flow (physician NOT on 1Health)
// ============================================================
function Screen4_InviteFlow({ onNext }) {
  const [step, setStep] = useState(0); // 0: form, 1: sending, 2: sent

  useEffect(() => {
    if (step === 1) {
      const t = setTimeout(() => setStep(2), 1200);
      return () => clearTimeout(t);
    }
  }, [step]);

  return (
    <div style={{ minHeight: "100%" }}>
      <div style={{ background: "white", borderBottom: `1px solid ${BORDER}`, padding: "14px 24px", display: "flex", alignItems: "center", gap: 10 }}>
        <SonaLogo size={28} />
        <span style={{ color: BORDER, margin: "0 2px" }}>×</span>
        <OneHealthLogo size={24} />
        <span style={{ fontSize: 15, fontWeight: 600, color: TEXT_PRIMARY }}>Invite Physician</span>
      </div>

      <div style={{ padding: 24, maxWidth: 520, margin: "0 auto" }}>
        {step === 0 && (
          <FadeIn>
            <div style={{ background: "white", borderRadius: 16, border: `1px solid ${BORDER}`, padding: 24 }}>
              <div style={{ fontSize: 18, fontWeight: 700, color: TEXT_PRIMARY, marginBottom: 4 }}>
                Invite a Physician to 1Health
              </div>
              <div style={{ fontSize: 13, color: TEXT_SECONDARY, marginBottom: 24 }}>
                They'll receive a secure link to join the 1Health network and immediately view the shared ultrasound images through Sona.
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  { label: "Physician Name", placeholder: "Dr. Rebecca Smith", value: "Dr. Rebecca Smith" },
                  { label: "Email", placeholder: "rebecca.smith@example.com", value: "rsmith@meridianwomens.com" },
                  { label: "NPI (optional)", placeholder: "National Provider Identifier", value: "1567890234" },
                  { label: "Organization (optional)", placeholder: "Practice or hospital name", value: "Meridian Women's Health" },
                ].map((field) => (
                  <div key={field.label}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: TEXT_SECONDARY, marginBottom: 4 }}>{field.label}</div>
                    <input
                      readOnly
                      value={field.value}
                      style={{
                        width: "100%",
                        padding: "10px 12px",
                        borderRadius: 8,
                        border: `1px solid ${BORDER}`,
                        fontSize: 14,
                        color: TEXT_PRIMARY,
                        background: BG_WARM,
                        boxSizing: "border-box",
                      }}
                    />
                  </div>
                ))}

                <div style={{ fontSize: 12, fontWeight: 600, color: TEXT_SECONDARY, marginBottom: 4, marginTop: 4 }}>
                  Message (optional)
                </div>
                <textarea
                  readOnly
                  value="Hi Dr. Smith — I'm sharing prenatal ultrasound images for our mutual patient, Sarah Johnson. Please join 1Health to view them securely through Sona."
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    borderRadius: 8,
                    border: `1px solid ${BORDER}`,
                    fontSize: 13,
                    color: TEXT_PRIMARY,
                    background: BG_WARM,
                    minHeight: 70,
                    resize: "none",
                    boxSizing: "border-box",
                    lineHeight: 1.5,
                  }}
                />

                <div style={{ background: `${HEALTH_BLUE}08`, borderRadius: 10, padding: 14, display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <NetworkIcon size={36} />
                  <div style={{ fontSize: 12, color: TEXT_SECONDARY, lineHeight: 1.5 }}>
                    <strong style={{ color: TEXT_PRIMARY }}>Network growth:</strong> When Dr. Smith joins 1Health, she'll also discover other apps in the ecosystem — expanding the network for everyone.
                  </div>
                </div>

                <button
                  onClick={() => setStep(1)}
                  style={{
                    width: "100%",
                    background: HEALTH_BLUE,
                    color: "white",
                    border: "none",
                    borderRadius: 10,
                    padding: "14px",
                    fontSize: 15,
                    fontWeight: 600,
                    cursor: "pointer",
                    marginTop: 4,
                  }}
                >
                  Send Invitation
                </button>
              </div>
            </div>
          </FadeIn>
        )}

        {step === 1 && (
          <div style={{ textAlign: "center", padding: 60 }}>
            <div
              style={{
                width: 64,
                height: 64,
                border: `3px solid ${HEALTH_BLUE}`,
                borderTopColor: "transparent",
                borderRadius: "50%",
                margin: "0 auto 20px",
                animation: "spin2 1s linear infinite",
              }}
            />
            <div style={{ fontSize: 16, fontWeight: 600, color: TEXT_PRIMARY }}>Sending invitation...</div>
            <style>{`@keyframes spin2 { to { transform: rotate(360deg); } }`}</style>
          </div>
        )}

        {step === 2 && (
          <FadeIn>
            <div style={{ textAlign: "center", padding: 40 }}>
              <div style={{ width: 72, height: 72, borderRadius: "50%", background: `${SUCCESS_GREEN}15`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                <CheckCircle size={36} />
              </div>
              <div style={{ fontSize: 20, fontWeight: 700, color: TEXT_PRIMARY, marginBottom: 6 }}>
                Invitation Sent!
              </div>
              <div style={{ fontSize: 14, color: TEXT_SECONDARY, marginBottom: 24 }}>
                Dr. Rebecca Smith will receive a secure link to join 1Health and view the shared images through Sona.
              </div>

              <div style={{ background: `${HEALTH_TEAL}10`, borderRadius: 12, padding: 16, textAlign: "left", marginBottom: 24 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: HEALTH_TEAL, marginBottom: 8 }}>
                  🔁 The Flywheel in Action
                </div>
                <div style={{ fontSize: 13, color: TEXT_PRIMARY, lineHeight: 1.6 }}>
                  Every invitation from Sona grows the 1Health physician network. Dr. Smith joins → sees the full app ecosystem → her patients benefit from TRC, Giggle Gauge, and more → she invites colleagues → the network compounds.
                </div>
              </div>

              <button
                onClick={onNext}
                style={{
                  background: HEALTH_BLUE,
                  color: "white",
                  border: "none",
                  borderRadius: 10,
                  padding: "12px 24px",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  margin: "0 auto",
                }}
              >
                See Physician's Dashboard <ArrowRight size={16} />
              </button>
            </div>
          </FadeIn>
        )}
      </div>
    </div>
  );
}

// ============================================================
// SCREEN 5: Receiving MD — 1Health Dashboard with Sona
// ============================================================
function Screen5_MDDashboard({ onNext }) {
  const [showNotif, setShowNotif] = useState(true);
  const [viewingImages, setViewingImages] = useState(false);

  return (
    <div style={{ minHeight: "100%" }}>
      {/* 1Health Header */}
      <div
        style={{
          background: HEALTH_DARK,
          padding: "12px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <OneHealthLogo size={30} />
          <span style={{ fontSize: 17, fontWeight: 700, color: "white", letterSpacing: "-0.02em" }}>
            1Health
          </span>
          <span style={{ fontSize: 11, color: "#ffffff66", marginLeft: 4 }}>Platform</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ position: "relative", cursor: "pointer" }}>
            <BellIcon size={20} color="#ffffff99" />
            {showNotif && (
              <div
                style={{
                  position: "absolute",
                  top: -4,
                  right: -4,
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  background: SONA_PINK,
                  color: "white",
                  fontSize: 10,
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                1
              </div>
            )}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 30, height: 30, borderRadius: "50%", background: "#ffffff15", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: "white" }}>MC</span>
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "white" }}>Dr. Maria Chen</div>
              <div style={{ fontSize: 11, color: "#ffffff66" }}>UCSF Medical Center</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", minHeight: "calc(100% - 54px)" }}>
        {/* Sidebar */}
        <div style={{ width: 220, background: "#0D1B30", padding: "20px 0", flexShrink: 0 }}>
          {[
            { icon: <GridIcon size={16} color="#ffffff88" />, label: "Dashboard", active: true },
            { icon: <BellIcon size={16} color="#ffffff55" />, label: "Notifications", badge: 1 },
            { icon: <UserIcon size={16} color="#ffffff55" />, label: "Patients" },
            { icon: <SearchIcon size={16} color="#ffffff55" />, label: "Provider Network" },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 20px",
                fontSize: 13,
                color: item.active ? "white" : "#ffffff66",
                background: item.active ? "#ffffff10" : "transparent",
                borderLeft: item.active ? `3px solid ${HEALTH_BLUE}` : "3px solid transparent",
                cursor: "pointer",
              }}
            >
              {item.icon}
              {item.label}
              {item.badge && (
                <span style={{ marginLeft: "auto", background: SONA_PINK, color: "white", fontSize: 10, fontWeight: 700, padding: "2px 6px", borderRadius: 10 }}>
                  {item.badge}
                </span>
              )}
            </div>
          ))}

          <div style={{ padding: "20px 20px 10px", fontSize: 11, color: "#ffffff33", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            My Apps
          </div>
          {[
            { logo: <SonaLogo size={20} />, name: "Sona", desc: "Ultrasound Sharing", isNew: true },
            { logo: <TRCLogo size={20} />, name: "TRC", desc: "Transitions of Care" },
            { logo: <GiggleGaugeLogo size={20} />, name: "Giggle Gauge", desc: "Voice AI Wellness" },
          ].map((app, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "8px 20px",
                cursor: "pointer",
                transition: "background 0.2s",
              }}
              onMouseOver={(e) => (e.currentTarget.style.background = "#ffffff08")}
              onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}
            >
              {app.logo}
              <div>
                <div style={{ fontSize: 12, color: "white", fontWeight: 500, display: "flex", alignItems: "center", gap: 6 }}>
                  {app.name}
                  {app.isNew && (
                    <span style={{ fontSize: 9, background: SONA_PINK, color: "white", padding: "1px 5px", borderRadius: 4, fontWeight: 700 }}>NEW</span>
                  )}
                </div>
                <div style={{ fontSize: 10, color: "#ffffff44" }}>{app.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, background: BG_WARM, padding: 24, overflow: "auto" }}>
          {!viewingImages ? (
            <>
              {/* Notification banner */}
              {showNotif && (
                <FadeIn>
                  <div
                    onClick={() => {
                      setShowNotif(false);
                      setViewingImages(true);
                    }}
                    style={{
                      background: "white",
                      border: `1px solid ${SONA_PINK}44`,
                      borderLeft: `4px solid ${SONA_PINK}`,
                      borderRadius: 12,
                      padding: 16,
                      marginBottom: 20,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                      transition: "box-shadow 0.2s",
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.boxShadow = `0 4px 16px ${SONA_PINK}15`)}
                    onMouseOut={(e) => (e.currentTarget.style.boxShadow = "none")}
                  >
                    <SonaLogo size={36} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 600, color: TEXT_PRIMARY }}>
                        New ultrasound images shared with you
                      </div>
                      <div style={{ fontSize: 13, color: TEXT_SECONDARY }}>
                        Bay Area Women's Health shared 3 prenatal ultrasound images for patient Sarah Johnson via Sona
                      </div>
                      <div style={{ fontSize: 11, color: TEXT_SECONDARY, marginTop: 4 }}>2 minutes ago</div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, color: SONA_PINK, fontSize: 13, fontWeight: 600, whiteSpace: "nowrap" }}>
                      View Images <ArrowRight size={14} color={SONA_PINK} />
                    </div>
                  </div>
                </FadeIn>
              )}

              {/* App grid */}
              <FadeIn delay={200}>
                <div style={{ fontSize: 16, fontWeight: 700, color: TEXT_PRIMARY, marginBottom: 14 }}>
                  Your Applications
                </div>
              </FadeIn>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
                {[
                  {
                    logo: <SonaLogo size={32} />,
                    name: "Sona",
                    desc: "Secure ultrasound image sharing between providers",
                    color: SONA_PINK,
                    badge: "3 new",
                    onClick: () => setViewingImages(true),
                  },
                  {
                    logo: <TRCLogo size={32} />,
                    name: "Transitions of Care",
                    desc: "Care gap alerts and follow-up coordination with payors",
                    color: "#6C63FF",
                    badge: "12 alerts",
                  },
                  {
                    logo: <GiggleGaugeLogo size={32} />,
                    name: "Giggle Gauge",
                    desc: "Voice AI tool tracking laughter as a biometric of happiness",
                    color: "#FFB347",
                  },
                ].map((app, i) => (
                  <FadeIn key={i} delay={300 + i * 100}>
                    <div
                      onClick={app.onClick}
                      style={{
                        background: "white",
                        borderRadius: 14,
                        border: `1px solid ${BORDER}`,
                        padding: 20,
                        cursor: "pointer",
                        transition: "all 0.2s",
                        height: "100%",
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.borderColor = app.color;
                        e.currentTarget.style.boxShadow = `0 4px 16px ${app.color}18`;
                        e.currentTarget.style.transform = "translateY(-2px)";
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.borderColor = BORDER;
                        e.currentTarget.style.boxShadow = "none";
                        e.currentTarget.style.transform = "translateY(0)";
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                        {app.logo}
                        {app.badge && (
                          <span style={{ fontSize: 11, background: `${app.color}15`, color: app.color, padding: "3px 8px", borderRadius: 6, fontWeight: 600 }}>
                            {app.badge}
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: 15, fontWeight: 600, color: TEXT_PRIMARY, marginBottom: 4 }}>
                        {app.name}
                      </div>
                      <div style={{ fontSize: 12, color: TEXT_SECONDARY, lineHeight: 1.5 }}>
                        {app.desc}
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>

              {/* Network stats */}
              <FadeIn delay={700}>
                <div style={{ marginTop: 24, background: "white", borderRadius: 14, border: `1px solid ${BORDER}`, padding: 20 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: TEXT_PRIMARY, marginBottom: 14 }}>
                    1Health Network Activity
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
                    {[
                      { label: "Providers", value: "4,827", delta: "+127 this month" },
                      { label: "Organizations", value: "312", delta: "+18 this month" },
                      { label: "Apps", value: "14", delta: "+3 new this quarter" },
                      { label: "Data Exchanges", value: "52.4K", delta: "+8.2K this month" },
                    ].map((s, i) => (
                      <div key={i} style={{ textAlign: "center" }}>
                        <div style={{ fontSize: 22, fontWeight: 700, color: HEALTH_BLUE }}>{s.value}</div>
                        <div style={{ fontSize: 12, fontWeight: 600, color: TEXT_PRIMARY, marginBottom: 2 }}>{s.label}</div>
                        <div style={{ fontSize: 10, color: SUCCESS_GREEN }}>{s.delta}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </>
          ) : (
            /* Image viewer - Sona UI within 1Health */
            <FadeIn>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                  <button
                    onClick={() => setViewingImages(false)}
                    style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, color: TEXT_SECONDARY, display: "flex", alignItems: "center", gap: 4 }}
                  >
                    ← Back to Dashboard
                  </button>
                </div>

                <div style={{ background: "white", borderRadius: 16, border: `1px solid ${BORDER}`, overflow: "hidden" }}>
                  {/* Sona-branded header inside 1Health */}
                  <div style={{ background: `linear-gradient(135deg, ${SONA_PINK}10, ${SONA_PINK}05)`, padding: "16px 20px", borderBottom: `1px solid ${BORDER}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <SonaLogo size={28} />
                      <div>
                        <div style={{ fontSize: 15, fontWeight: 600, color: TEXT_PRIMARY }}>Sona Ultrasound Viewer</div>
                        <div style={{ fontSize: 12, color: TEXT_SECONDARY }}>Shared by Bay Area Women's Health</div>
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <ShieldIcon size={14} />
                      <span style={{ fontSize: 11, color: SUCCESS_GREEN, fontWeight: 600 }}>HIPAA Secure • SSO Authenticated</span>
                    </div>
                  </div>

                  {/* Patient info */}
                  <div style={{ padding: "14px 20px", borderBottom: `1px solid ${BORDER}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <span style={{ fontSize: 14, fontWeight: 600, color: TEXT_PRIMARY }}>Sarah Johnson</span>
                      <span style={{ fontSize: 13, color: TEXT_SECONDARY, marginLeft: 12 }}>DOB: 03/15/1992 • 20w 3d</span>
                    </div>
                    <span style={{ fontSize: 12, color: TEXT_SECONDARY }}>Exam: April 18, 2026</span>
                  </div>

                  {/* Images grid */}
                  <div style={{ padding: 20 }}>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
                      {[0, 1, 2].map((i) => (
                        <div key={i} style={{ borderRadius: 10, overflow: "hidden", border: `1px solid ${BORDER}` }}>
                          <UltrasoundImage variant={i} size={280} />
                          <div style={{ padding: "8px 10px" }}>
                            <div style={{ fontSize: 12, fontWeight: 600, color: TEXT_PRIMARY }}>
                              {["Profile View", "3D Render", "Heartbeat"][i]}
                            </div>
                            <div style={{ fontSize: 11, color: TEXT_SECONDARY }}>
                              {["Sagittal", "3D Surface", "M-Mode"][i]} • {["10:32 AM", "10:35 AM", "10:38 AM"][i]}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: 20, textAlign: "center" }}>
                  <button
                    onClick={onNext}
                    style={{
                      background: HEALTH_BLUE,
                      color: "white",
                      border: "none",
                      borderRadius: 10,
                      padding: "12px 24px",
                      fontSize: 14,
                      fontWeight: 600,
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    See the Network Effect Story <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </FadeIn>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// SCREEN 6: Network Effect / Value Summary
// ============================================================
function Screen6_NetworkEffect() {
  return (
    <div style={{ minHeight: "100%", background: `linear-gradient(180deg, ${HEALTH_DARK} 0%, #0f2340 100%)` }}>
      <div style={{ padding: "40px 24px", maxWidth: 760, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 20 }}>
              <SonaLogo size={40} />
              <span style={{ fontSize: 28, color: "white", fontWeight: 300 }}>+</span>
              <OneHealthLogo size={40} />
            </div>
            <div style={{ fontSize: 28, fontWeight: 700, color: "white", marginBottom: 8, lineHeight: 1.3 }}>
              Every Share Grows the Network.
              <br />
              Every Provider Strengthens the Platform.
            </div>
            <div style={{ fontSize: 15, color: "#ffffff88", maxWidth: 500, margin: "0 auto" }}>
              Sona on 1Health transforms image sharing from a feature into a growth engine.
            </div>
          </div>
        </FadeIn>

        {/* Flywheel visual */}
        <FadeIn delay={300}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 32 }}>
            {[
              {
                num: "01",
                title: "Sona Provider Shares Images",
                desc: "A provider uses Sona to share ultrasound images with a specialist for a second opinion.",
                color: SONA_PINK,
              },
              {
                num: "02",
                title: "Specialist Joins 1Health",
                desc: "The receiving physician authenticates via 1Health SSO — one login for all apps, no new credentials.",
                color: HEALTH_BLUE,
              },
              {
                num: "03",
                title: "Discovers the Ecosystem",
                desc: "On the 1Health dashboard, they see TRC alerts, Giggle Gauge, and other tools relevant to their practice.",
                color: HEALTH_TEAL,
              },
              {
                num: "04",
                title: "Network Compounds",
                desc: "Payors are already inviting providers through TRC. Sona adds another vector. Every new user makes the network more valuable for everyone.",
                color: "#FFB347",
              },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  background: "#ffffff08",
                  border: "1px solid #ffffff12",
                  borderRadius: 14,
                  padding: 20,
                  backdropFilter: "blur(10px)",
                }}
              >
                <div style={{ fontSize: 11, fontWeight: 700, color: item.color, marginBottom: 8, letterSpacing: "0.08em" }}>
                  STEP {item.num}
                </div>
                <div style={{ fontSize: 16, fontWeight: 600, color: "white", marginBottom: 6 }}>
                  {item.title}
                </div>
                <div style={{ fontSize: 13, color: "#ffffff77", lineHeight: 1.6 }}>
                  {item.desc}
                </div>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Value props for Ellen */}
        <FadeIn delay={600}>
          <div style={{ background: "#ffffff08", border: "1px solid #ffffff12", borderRadius: 16, padding: 24, marginBottom: 24 }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: "white", marginBottom: 16 }}>
              What This Means for Sona
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              {[
                { icon: "📈", title: "Instant Distribution", desc: "Access 4,800+ verified physicians already on 1Health — no cold outreach needed." },
                { icon: "🔐", title: "SSO & Shared Identity", desc: "Providers don't want multiple logins. 1Health SSO means zero friction to adopt Sona." },
                { icon: "🏥", title: "Payor-Driven Adoption", desc: "Payors are already onboarding providers through TRC. Your app rides the same wave." },
                { icon: "🔍", title: "App Discovery", desc: "Sona appears on every provider's 1Health dashboard — organic awareness at scale." },
                { icon: "💰", title: "Fundraising Narrative", desc: "Network distribution + payor relationships = a fundamentally stronger growth story for investors." },
                { icon: "🚀", title: "Speed to Market", desc: "No need to build identity, compliance, or provider directories from scratch. Ship the feature, not the infrastructure." },
              ].map((v, i) => (
                <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 24 }}>{v.icon}</span>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "white", marginBottom: 2 }}>{v.title}</div>
                    <div style={{ fontSize: 12, color: "#ffffff77", lineHeight: 1.5 }}>{v.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={800}>
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div style={{ fontSize: 14, color: "#ffffff55", marginBottom: 12 }}>
              Ready to explore the integration?
            </div>
            <div style={{ fontSize: 22, fontWeight: 700, color: "white" }}>
              Let's build this together.
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 16 }}>
              <SonaLogo size={24} />
              <span style={{ color: "#ffffff44" }}>×</span>
              <OneHealthLogo size={24} />
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}

// ============================================================
// MAIN APP
// ============================================================
export default function SonaOneHealthDemo() {
  const [screen, setScreen] = useState(0);
  const [selectedPhysician, setSelectedPhysician] = useState(null);
  const [inviteFlow, setInviteFlow] = useState(false);
  const containerRef = useRef(null);

  const screens = [
    "Sona Dashboard",
    "Search Physicians",
    inviteFlow ? "Invite Physician" : "Confirm Share",
    "Physician View",
    "Network Effect",
  ];

  const goTo = (s) => {
    setScreen(s);
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  };

  return (
    <div style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif", height: "100vh", display: "flex", flexDirection: "column", background: BG_WARM }}>
      {/* Top nav */}
      <div
        style={{
          background: "white",
          borderBottom: `1px solid ${BORDER}`,
          padding: "8px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: HEALTH_BLUE, letterSpacing: "-0.02em" }}>DEMO</span>
          <span style={{ fontSize: 13, color: TEXT_SECONDARY }}>Sona × 1Health Integration</span>
        </div>
        <StepIndicator steps={screens} current={screen} onStep={goTo} />
        <div style={{ display: "flex", gap: 6 }}>
          {screen > 0 && (
            <button
              onClick={() => goTo(screen - 1)}
              style={{
                padding: "6px 14px",
                borderRadius: 8,
                border: `1px solid ${BORDER}`,
                background: "white",
                fontSize: 12,
                cursor: "pointer",
                color: TEXT_SECONDARY,
              }}
            >
              ← Back
            </button>
          )}
          {screen < screens.length - 1 && (
            <button
              onClick={() => {
                if (screen === 1 && !inviteFlow) {
                  setSelectedPhysician({
                    name: "Dr. Maria Chen",
                    specialty: "Maternal-Fetal Medicine",
                    org: "UCSF Medical Center",
                    npi: "1234567890",
                    verified: true,
                  });
                }
                goTo(screen + 1);
              }}
              style={{
                padding: "6px 14px",
                borderRadius: 8,
                border: "none",
                background: HEALTH_BLUE,
                color: "white",
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Next →
            </button>
          )}
        </div>
      </div>

      {/* Screen container */}
      <div ref={containerRef} style={{ flex: 1, overflow: "auto" }}>
        {screen === 0 && <Screen1_SonaDashboard onNext={() => goTo(1)} />}
        {screen === 1 && (
          <Screen2_PhysicianSearch
            onNext={(doc) => {
              setSelectedPhysician(doc);
              setInviteFlow(false);
              goTo(2);
            }}
            onNotFound={() => {
              setInviteFlow(true);
              goTo(2);
            }}
          />
        )}
        {screen === 2 && !inviteFlow && (
          <Screen3_ConfirmShare physician={selectedPhysician} onNext={() => goTo(3)} />
        )}
        {screen === 2 && inviteFlow && (
          <Screen4_InviteFlow onNext={() => goTo(3)} />
        )}
        {screen === 3 && <Screen5_MDDashboard onNext={() => goTo(4)} />}
        {screen === 4 && <Screen6_NetworkEffect />}
      </div>
    </div>
  );
}
