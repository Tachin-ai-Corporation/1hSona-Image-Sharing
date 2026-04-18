import { useState, useEffect, useRef } from "react";

// ── Tokens ──
const PINK = "#E8567F";
const PINK_L = "#FDF2F5";
const TEAL = "#00B894";
const TEAL_L = "#E8FBF5";
const BLUE = "#4A7BF7";
const DARK = "#2D3748";
const BODY = "#F0F2F5";
const TX = "#1A202C";
const TX2 = "#718096";
const TXM = "#A0AEC0";
const BD = "#E2E8F0";
const BDL = "#EDF2F7";
const OK = "#38A169";
const WARN = "#ED8936";

// ── SVG Icons (inline, small) ──
const I = {
  check: (s=12,c="white") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>,
  checkCircle: (s=16,c=OK) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
  search: (s=18,c=TXM) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  share: (s=14,c="white") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>,
  mail: (s=14,c="white") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  shield: (s=14,c=OK) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>,
  arrow: (s=14,c="white") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  bell: (s=18,c=TXM) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>,
  folder: (s=18,c=TXM) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/></svg>,
  chevDown: (s=14,c=TX2) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5"><polyline points="6 9 12 15 18 9"/></svg>,
  wifi: (s=16,c=TX2) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2"><path d="M5 12.55a11 11 0 0114.08 0"/><path d="M1.42 9a16 16 0 0121.16 0"/><path d="M8.53 16.11a6 6 0 016.95 0"/><circle cx="12" cy="20" r="1" fill={c}/></svg>,
  grid: (c="white") => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
  users: (c="white") => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>,
  doc: (c="white") => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>,
  chart: (c=DARK) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2"><rect x="3" y="12" width="4" height="9"/><rect x="10" y="6" width="4" height="15"/><rect x="17" y="2" width="4" height="19"/></svg>,
  pulse: (c="#fff") => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
  trend: (c=DARK) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
  cal: (c=DARK) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  gear: (c=DARK) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>,
};

// ── Components ──
function US({ v=0, w=280, h=180 }) {
  const c=[["#111827","#1f2937","#374151"],["#0f172a","#1e293b","#334155"],["#18181b","#27272a","#3f3f46"]][v%3];
  return <svg width="100%" viewBox={`0 0 ${w} ${h}`} style={{borderRadius:8,display:"block"}}><rect width={w} height={h} fill={c[0]}/><ellipse cx={w/2} cy={h*.47} rx={w*.3} ry={h*.34} fill={c[1]} opacity=".7"/><ellipse cx={w*.45} cy={h*.42} rx={w*.18} ry={h*.2} fill={c[2]} opacity=".6"/><circle cx={w*.4} cy={h*.38} r={w*.08} fill="#555577" opacity=".5"/><text x="6" y={h-6} fontSize="8" fill="#666" fontFamily="monospace">US-{String(v+1).padStart(3,"0")}</text><text x="6" y="12" fontSize="7" fill="#555" fontFamily="monospace">{["12w3d","16w1d","20w0d"][v%3]}</text></svg>;
}
function Logo1H({s=28}){ return <div style={{width:s,height:s,borderRadius:6,border:`1.5px solid ${BD}`,display:"flex",alignItems:"center",justifyContent:"center",background:"white",flexShrink:0}}><span style={{fontSize:s*.46,fontWeight:700,color:DARK,fontFamily:"system-ui",lineHeight:1}}>1h</span></div>; }
function TenantIcon({s=24}){ return <div style={{width:s,height:s,borderRadius:6,background:TEAL,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><svg width={s*.55} height={s*.55} viewBox="0 0 16 16" fill="none"><path d="M8 8a3 3 0 100-6 3 3 0 000 6zM14 14c0-2.5-2.7-4.5-6-4.5S2 11.5 2 14" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></svg></div>; }
function SonaIcon({s=44}){ return <div style={{width:s,height:s,borderRadius:10,background:`linear-gradient(135deg,${PINK},#c44569)`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><span style={{color:"white",fontSize:s*.42,fontWeight:700,fontFamily:"system-ui"}}>S</span></div>; }
function AppIcon({icon,bg="#EDF2F7",s=42}){ return <div style={{width:s,height:s,borderRadius:10,background:bg,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,margin:"0 auto"}}>{icon}</div>; }
function FadeIn({children,delay=0,style={}}){ const[v,setV]=useState(false); useEffect(()=>{const t=setTimeout(()=>setV(true),delay);return()=>clearTimeout(t)},[delay]); return <div style={{opacity:v?1:0,transform:v?"translateY(0)":"translateY(10px)",transition:"opacity .4s ease,transform .4s ease",...style}}>{children}</div>; }
function Btn({children,bg=BLUE,onClick,style={}}){ return <button onClick={onClick} style={{background:bg,color:"white",border:"none",borderRadius:8,padding:"10px 20px",fontSize:13,fontWeight:600,cursor:"pointer",display:"inline-flex",alignItems:"center",gap:6,transition:"transform .15s",...style}} onMouseOver={e=>e.currentTarget.style.transform="translateY(-1px)"} onMouseOut={e=>e.currentTarget.style.transform="none"}>{children}</button>; }

// ── Platform Header ──
function PH({tenant,tabs=[],activeTab,onTab,initials="CB"}){
  return <div style={{background:"white",borderBottom:`1px solid ${BD}`,padding:"0 20px",display:"flex",alignItems:"center",justifyContent:"space-between",height:52,flexShrink:0}}>
    <div style={{display:"flex",alignItems:"center",gap:12}}>
      <Logo1H s={28}/>
      <div style={{display:"flex",alignItems:"center",gap:6,padding:"4px 10px",borderRadius:6,background:"#F7FAFC"}}><TenantIcon s={24}/><span style={{fontSize:13,fontWeight:600,color:TX,maxWidth:240,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{tenant}</span>{I.chevDown()}</div>
      {tabs.map((t,i)=><div key={i} onClick={()=>onTab?.(t.id)} style={{display:"flex",alignItems:"center",gap:6,padding:"6px 12px",borderRadius:6,background:t.id===activeTab?"#EDF2F7":"transparent",cursor:"pointer",marginLeft:i===0?4:0}}>{t.icon}<span style={{fontSize:13,fontWeight:t.id===activeTab?600:400,color:t.id===activeTab?TX:TX2}}>{t.label}</span></div>)}
    </div>
    <div style={{display:"flex",alignItems:"center",gap:14}}>
      {I.search()}<div style={{position:"relative"}}>{I.bell()}<div style={{position:"absolute",top:-4,right:-6,width:14,height:14,borderRadius:"50%",background:TEAL,color:"white",fontSize:9,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center"}}>!</div></div>
      <div style={{position:"relative"}}>{I.folder()}<div style={{position:"absolute",top:-4,right:-6,width:16,height:16,borderRadius:"50%",background:BLUE,color:"white",fontSize:9,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center"}}>2</div></div>
      <div style={{width:32,height:32,borderRadius:"50%",background:"#EDF2F7",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:600,color:TX}}>{initials}</div>
    </div>
  </div>;
}
function IFB({url}){ return <div style={{position:"absolute",top:12,right:16,background:"#F7FAFC",border:`1px solid ${BD}`,borderRadius:4,padding:"3px 8px",fontSize:11,color:TXM,fontFamily:"monospace"}}>iframe: {url}</div>; }

// ══════════════════════════════════════════════════
// S1: Sona Provider Dashboard
// ══════════════════════════════════════════════════
function S1({onShare}){
  const[sel,setSel]=useState([0,1,2]);
  return <div>
    <div style={{background:"white",borderBottom:`1px solid ${BD}`,padding:"12px 24px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
      <div style={{display:"flex",alignItems:"center",gap:10}}><SonaIcon s={32}/><span style={{fontSize:18,fontWeight:700,color:"#1a1a2e"}}>Sona</span><span style={{fontSize:11,background:PINK_L,color:PINK,padding:"3px 8px",borderRadius:6,fontWeight:600}}>Provider Portal</span></div>
      <span style={{fontSize:13,color:TX2}}>Bay Area Women's Health</span>
    </div>
    <div style={{padding:24,maxWidth:860,margin:"0 auto"}}>
      <FadeIn><div style={{background:`${PINK}08`,border:`1px solid ${PINK}15`,borderRadius:14,padding:20,marginBottom:24,display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
        <div><div style={{fontSize:11,color:TXM,textTransform:"uppercase",letterSpacing:".05em",marginBottom:3}}>Patient</div><div style={{fontSize:20,fontWeight:700,color:TX}}>Sarah Johnson</div><div style={{fontSize:13,color:TX2}}>MRN: SN-284719 · DOB: 03/15/1992</div></div>
        <div style={{textAlign:"right"}}><div style={{fontSize:26,fontWeight:700,color:PINK}}>20w 3d</div><div style={{fontSize:11,color:TXM}}>Gestational Age</div></div>
      </div></FadeIn>
      <FadeIn delay={80}><div style={{fontSize:14,fontWeight:600,color:TX,marginBottom:12}}>Ultrasound Images — Today's Exam</div></FadeIn>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:24}}>
        {[0,1,2].map(i=><FadeIn key={i} delay={150+i*60}><div onClick={()=>setSel(s=>s.includes(i)?s.filter(x=>x!==i):[...s,i])} style={{cursor:"pointer",borderRadius:10,overflow:"hidden",border:sel.includes(i)?`2px solid ${PINK}`:`1px solid ${BD}`,boxShadow:sel.includes(i)?`0 0 0 3px ${PINK}22`:"none",background:"white",transition:"all .2s"}}>
          <div style={{position:"relative"}}><US v={i}/>{sel.includes(i)&&<div style={{position:"absolute",top:8,right:8,width:22,height:22,borderRadius:"50%",background:PINK,display:"flex",alignItems:"center",justifyContent:"center"}}>{I.check()}</div>}</div>
          <div style={{padding:"8px 10px",fontSize:12,color:TX2}}>{["Profile View · 10:32 AM","3D Render · 10:35 AM","Heartbeat · 10:38 AM"][i]}</div>
        </div></FadeIn>)}
      </div>
      <FadeIn delay={400}><div style={{display:"flex",gap:10}}>
        <button style={{background:PINK,color:"white",border:"none",borderRadius:8,padding:"10px 18px",fontSize:13,fontWeight:600,opacity:.4,display:"flex",alignItems:"center",gap:6}}>{I.mail()} Send to Patient</button>
        <Btn onClick={onShare} bg={`linear-gradient(135deg,${BLUE},#3a6ae0)`} style={{boxShadow:`0 3px 12px ${BLUE}33`}}>{I.share()} Share with Physician <span style={{fontSize:10,opacity:.75,marginLeft:2}}>via 1Health</span></Btn>
      </div>
      <div style={{fontSize:11,color:TXM,marginTop:8,display:"flex",alignItems:"center",gap:5}}><Logo1H s={16}/> Powered by the 1Health physician network — 4,827 providers</div>
      </FadeIn>
    </div>
  </div>;
}

// ══════════════════════════════════════════════════
// S2: Search — Broadus (found, on network) vs Owens (NPPES, not on network)
// ══════════════════════════════════════════════════
function S2({onFoundBroadus, onFoundOwens}){
  const[q,setQ]=useState("");
  const[reason,setReason]=useState("second_opinion");
  const[mode,setMode]=useState("idle"); // idle|searching|broadus|owens
  const[email,setEmail]=useState("");
  const reasons=[{id:"second_opinion",l:"Second Opinion"},{id:"referral",l:"Referral / Consult"},{id:"comanage",l:"Co-Management"},{id:"transfer",l:"Transfer of Care"}];
  const rLabel = reasons.find(r=>r.id===reason)?.l||"Second Opinion";

  const search=v=>{setQ(v);if(v.length>2){setMode("searching");setTimeout(()=>{if(v.toLowerCase().match(/broadus|calvin|pacific|mfm/))setMode("broadus");else if(v.toLowerCase().match(/owens|dana|latifah|meridian/))setMode("owens");else setMode("broadus")},700)}else{setMode("idle")}};

  const ResultCard=({doc,type})=>{
    const isNetwork = type==="network";
    return <div style={{background:"white",border:`1px solid ${isNetwork?`${BLUE}33`:WARN+"33"}`,borderRadius:10,padding:14,marginBottom:8,transition:"all .15s"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <div style={{width:40,height:40,borderRadius:"50%",background:isNetwork?`${BLUE}10`:`${WARN}10`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:700,color:isNetwork?BLUE:WARN}}>{doc.initials}</div>
          <div>
            <div style={{display:"flex",alignItems:"center",gap:5,flexWrap:"wrap"}}>
              <span style={{fontSize:14,fontWeight:600,color:TX}}>{doc.name}</span>
              {isNetwork ? <span style={{fontSize:10,background:`${BLUE}10`,color:BLUE,padding:"2px 7px",borderRadius:4,fontWeight:600}}>On 1Health Network</span>
                : <span style={{fontSize:10,background:`${WARN}10`,color:WARN,padding:"2px 7px",borderRadius:4,fontWeight:600}}>NPPES Directory</span>}
              {isNetwork && I.checkCircle(13)}
            </div>
            <div style={{fontSize:12,color:TX2}}>{doc.specialty} · {doc.org}</div>
            <div style={{fontSize:10,color:TXM}}>NPI: {doc.npi}</div>
          </div>
        </div>
      </div>
      {/* Network → direct share button */}
      {isNetwork && <div style={{marginTop:12}}><Btn onClick={()=>onFoundBroadus(doc,rLabel)}>{I.share()} Share with {doc.name.split(" ").pop()}</Btn></div>}
      {/* NPPES → email confirm */}
      {!isNetwork && <div style={{marginTop:12}}>
        <div style={{fontSize:12,color:TX2,marginBottom:6}}>This physician isn't on 1Health yet. Confirm their email to send a secure fax invitation with QR code.</div>
        <div style={{display:"flex",gap:8,alignItems:"center"}}>
          <input type="email" placeholder="Enter physician's email..." value={email} onChange={e=>setEmail(e.target.value)} style={{flex:1,padding:"9px 12px",borderRadius:8,border:`1.5px solid ${email.includes("@")?TEAL:BD}`,fontSize:13,outline:"none",boxSizing:"border-box",transition:"border-color .2s"}}/>
          <Btn bg={email.includes("@")?TEAL:BD} onClick={()=>{if(email.includes("@"))onFoundOwens({...doc,email},rLabel)}} style={{opacity:email.includes("@")?1:.5}}>{I.mail()} Send Invitation</Btn>
        </div>
        <div style={{fontSize:11,color:TXM,marginTop:6}}>Try: dana@latifah.com</div>
      </div>}
    </div>;
  };

  return <div>
    <div style={{background:"white",borderBottom:`1px solid ${BD}`,padding:"12px 24px",display:"flex",alignItems:"center",gap:8}}><SonaIcon s={28}/><span style={{fontSize:16,fontWeight:700,color:"#1a1a2e"}}>Sona</span><span style={{color:BD}}>→</span><Logo1H s={22}/><span style={{fontSize:14,fontWeight:600,color:DARK}}>Share with Physician</span></div>
    <div style={{padding:24,maxWidth:620,margin:"0 auto"}}>
      <FadeIn><div style={{background:PINK_L,borderRadius:8,padding:"8px 14px",marginBottom:16,display:"flex",alignItems:"center",gap:8,fontSize:13}}><div style={{width:7,height:7,borderRadius:"50%",background:PINK}}/><span style={{color:TX2}}>Sharing:</span><span style={{fontWeight:600,color:TX}}>Sarah Johnson</span><span style={{color:TXM}}>· 3 images · Today</span></div></FadeIn>
      <FadeIn delay={60}><div style={{marginBottom:14}}>
        <div style={{fontSize:12,fontWeight:600,color:TX2,marginBottom:8,textTransform:"uppercase",letterSpacing:".04em"}}>Reason for Sharing</div>
        <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>{reasons.map(r=><button key={r.id} onClick={()=>setReason(r.id)} style={{padding:"6px 14px",borderRadius:20,fontSize:13,fontWeight:reason===r.id?600:400,cursor:"pointer",border:reason===r.id?`1.5px solid ${BLUE}`:`1px solid ${BD}`,background:reason===r.id?`${BLUE}08`:"white",color:reason===r.id?BLUE:TX2,transition:"all .15s"}}>{r.l}</button>)}</div>
      </div></FadeIn>
      <FadeIn delay={120}><div style={{position:"relative",marginBottom:16}}>
        <div style={{position:"absolute",left:13,top:"50%",transform:"translateY(-50%)"}}>{I.search()}</div>
        <input type="text" placeholder='Search by name, NPI, specialty... Try "Broadus" or "Owens"' value={q} onChange={e=>search(e.target.value)} style={{width:"100%",padding:"12px 12px 12px 38px",borderRadius:10,border:`1.5px solid ${mode==="broadus"?BLUE:mode==="owens"?WARN:BD}`,fontSize:14,outline:"none",boxSizing:"border-box",background:"white",transition:"border-color .2s"}}/>
        {mode==="searching"&&<div style={{position:"absolute",right:13,top:"50%",transform:"translateY(-50%)"}}><div style={{width:16,height:16,border:`2px solid ${BLUE}`,borderTopColor:"transparent",borderRadius:"50%",animation:"sp .7s linear infinite"}}/></div>}
      </div></FadeIn>

      {mode==="broadus"&&<FadeIn><div style={{fontSize:11,color:TXM,marginBottom:8,display:"flex",alignItems:"center",gap:5}}>{I.shield(13)} Verified on 1Health network</div><ResultCard type="network" doc={{name:"Dr. Calvin G. Broadus",specialty:"Maternal-Fetal Medicine",org:"Pacific MFM Associates",npi:"1928374650",initials:"CB"}}/></FadeIn>}

      {mode==="owens"&&<FadeIn><div style={{fontSize:11,color:TXM,marginBottom:8,display:"flex",alignItems:"center",gap:5}}><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={WARN} strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg> Found in NPPES public directory — not yet on 1Health</div><ResultCard type="nppes" doc={{name:"Dr. Dana Owens",specialty:"OB/GYN",org:"Meridian Women's Health",npi:"1567890234",initials:"DO"}}/></FadeIn>}

      {mode==="idle"&&<FadeIn delay={200}><div style={{textAlign:"center",padding:28,color:TXM,fontSize:12}}>4,827 verified physicians · 1.2M+ in NPPES directory</div></FadeIn>}
    </div>
    <style>{`@keyframes sp{to{transform:translateY(-50%) rotate(360deg)}}`}</style>
  </div>;
}

// ══════════════════════════════════════════════════
// S3: Broadus Handshake — accepting shared images
// ══════════════════════════════════════════════════
function S3_BroadusAccept({physician, reason, onAccept}){
  const doc = physician||{name:"Dr. Calvin G. Broadus",initials:"CB"};
  const tn = `Practice of ${doc.name}`;
  const[accepted,setAccepted]=useState(false);
  const[loading,setLoading]=useState(false);

  const handleAccept=()=>{setLoading(true);setTimeout(()=>{setLoading(false);setAccepted(true)},1200)};

  return <div style={{display:"flex",flexDirection:"column",minHeight:"100%"}}>
    <PH tenant={tn} tabs={[{id:"dash",label:"1h Personal Dashboard",icon:<Logo1H s={18}/>},{id:"sona",label:"Sona",icon:<SonaIcon s={20}/>}]} activeTab="sona" initials={doc.initials}/>
    <div style={{flex:1,background:BODY,position:"relative"}}>
      <IFB url="app.1health.io"/>
      <div style={{padding:"28px 28px",maxWidth:600,margin:"0 auto"}}>
        {!accepted ? (
          <FadeIn><div style={{background:"white",borderRadius:16,border:`1px solid ${BDL}`,overflow:"hidden"}}>
            <div style={{background:`linear-gradient(135deg,${PINK}0C,${PINK}04)`,padding:"18px 22px",borderBottom:`1px solid ${BD}`,display:"flex",alignItems:"center",gap:12}}>
              <SonaIcon s={38}/>
              <div><div style={{fontSize:16,fontWeight:700,color:TX}}>Incoming Image Share</div><div style={{fontSize:12,color:TX2}}>via Sona on 1Health</div></div>
            </div>
            <div style={{padding:22}}>
              <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16}}>
                <div style={{flex:1,textAlign:"center"}}>
                  <div style={{width:44,height:44,borderRadius:"50%",background:PINK_L,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 6px"}}><SonaIcon s={24}/></div>
                  <div style={{fontSize:13,fontWeight:600,color:TX}}>Bay Area Women's Health</div>
                  <div style={{fontSize:11,color:TX2}}>Sending provider</div>
                </div>
                <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:3}}>{I.arrow(18,BLUE)}<div style={{fontSize:9,color:BLUE,fontWeight:600}}>HIPAA SECURE</div></div>
                <div style={{flex:1,textAlign:"center"}}>
                  <div style={{width:44,height:44,borderRadius:"50%",background:`${BLUE}10`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 6px",fontSize:16,fontWeight:700,color:BLUE}}>{doc.initials}</div>
                  <div style={{fontSize:13,fontWeight:600,color:TX}}>{doc.name}</div>
                  <div style={{fontSize:11,color:TX2}}>You</div>
                </div>
              </div>
              <div style={{background:"#F7FAFC",borderRadius:10,padding:14,marginBottom:16}}>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,fontSize:13}}>
                  <div><span style={{color:TXM}}>Patient:</span> <span style={{fontWeight:500,color:TX}}>Sarah Johnson</span></div>
                  <div><span style={{color:TXM}}>Reason:</span> <span style={{fontWeight:500,color:TX}}>{reason}</span></div>
                  <div><span style={{color:TXM}}>Images:</span> <span style={{fontWeight:500,color:TX}}>3 ultrasound files</span></div>
                  <div><span style={{color:TXM}}>Expires:</span> <span style={{fontWeight:500,color:TX}}>30 days</span></div>
                </div>
              </div>
              <div style={{display:"flex",gap:8,marginBottom:14,flexWrap:"wrap"}}>
                {["HIPAA Compliant","NPI Verified","E2E Encrypted","Audit Trail"].map(b=><span key={b} style={{fontSize:10,padding:"3px 8px",borderRadius:5,background:`${OK}0C`,color:OK,fontWeight:600,display:"flex",alignItems:"center",gap:3}}>{I.shield(11)} {b}</span>)}
              </div>
              {loading ? <div style={{textAlign:"center",padding:16}}><div style={{width:24,height:24,border:`2.5px solid ${BLUE}`,borderTopColor:"transparent",borderRadius:"50%",margin:"0 auto",animation:"sp2 .8s linear infinite"}}/><div style={{fontSize:13,color:TX2,marginTop:8}}>Verifying...</div></div>
              : <button onClick={handleAccept} style={{width:"100%",background:`linear-gradient(135deg,${BLUE},#3a6ae0)`,color:"white",border:"none",borderRadius:10,padding:14,fontSize:15,fontWeight:600,cursor:"pointer",boxShadow:`0 3px 14px ${BLUE}33`}}>Accept & View Images</button>}
            </div>
          </div></FadeIn>
        ) : (
          <FadeIn><div style={{textAlign:"center",padding:32}}>
            <div style={{width:60,height:60,borderRadius:"50%",background:`${OK}12`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 14px"}}>{I.checkCircle(30)}</div>
            <div style={{fontSize:18,fontWeight:700,color:TX,marginBottom:4}}>Images Accepted</div>
            <div style={{fontSize:14,color:TX2,marginBottom:20}}>You now have access to Sarah Johnson's ultrasound images.</div>
            <Btn onClick={onAccept}>View Images {I.arrow()}</Btn>
          </div></FadeIn>
        )}
      </div>
    </div>
    <style>{`@keyframes sp2{to{transform:rotate(360deg)}}`}</style>
  </div>;
}

// ══════════════════════════════════════════════════
// S4: Broadus views images inside Sona in 1Health
// ══════════════════════════════════════════════════
function S4_BroadusView({physician,onNext}){
  const doc=physician||{name:"Dr. Calvin G. Broadus",initials:"CB"};
  const tn=`Practice of ${doc.name}`;
  return <div style={{display:"flex",flexDirection:"column",minHeight:"100%"}}>
    <PH tenant={tn} tabs={[{id:"dash",label:"1h Personal Dashboard",icon:<Logo1H s={18}/>},{id:"sona",label:"Sona",icon:<SonaIcon s={20}/>}]} activeTab="sona" initials={doc.initials}/>
    <div style={{flex:1,background:BODY,position:"relative"}}>
      <IFB url="app.1health.io"/>
      <div style={{padding:"24px 28px",maxWidth:960,margin:"0 auto"}}>
        <FadeIn><div style={{display:"flex",alignItems:"center",gap:12,marginBottom:4}}><SonaIcon s={42}/><div><div style={{fontSize:18,fontWeight:700,color:TX}}>Sona — Ultrasound Imaging</div><div style={{fontSize:13,color:TX2}}>Viewing as {tn}</div></div></div></FadeIn>
        <div style={{height:1,background:`linear-gradient(90deg,${PINK}33,transparent)`,margin:"14px 0 22px"}}/>
        <FadeIn delay={120}><div style={{background:"white",borderRadius:14,border:`1px solid ${BDL}`,padding:20,marginBottom:18}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
            <div><div style={{fontSize:11,color:TXM,textTransform:"uppercase",letterSpacing:".05em",marginBottom:2}}>Shared With You</div><div style={{fontSize:16,fontWeight:600,color:TX}}>Sarah Johnson — Prenatal Ultrasound</div><div style={{fontSize:13,color:TX2}}>From Bay Area Women's Health · Second Opinion · April 18, 2026</div></div>
            <div style={{display:"flex",alignItems:"center",gap:4,fontSize:11,color:OK,fontWeight:600}}>{I.shield()} HIPAA Secure</div>
          </div>
          <div style={{background:"#F7FAFC",borderRadius:8,padding:"9px 14px",marginBottom:14,display:"flex",gap:20,fontSize:13,flexWrap:"wrap"}}>{[["DOB","03/15/1992"],["Gest. Age","20w 3d"],["Exam","04/18/2026"],["MRN","SN-284719"]].map(([l,v])=><div key={l}><span style={{color:TXM}}>{l}:</span> <span style={{fontWeight:500,color:TX}}>{v}</span></div>)}</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10}}>{[0,1,2].map(i=><div key={i} style={{borderRadius:10,overflow:"hidden",border:`1px solid ${BDL}`,background:"white"}}><US v={i} w={300} h={200}/><div style={{padding:"7px 9px"}}><div style={{fontSize:12,fontWeight:600,color:TX}}>{["Profile View","3D Render","Heartbeat"][i]}</div><div style={{fontSize:11,color:TXM}}>{["Sagittal","3D Surface","M-Mode"][i]}</div></div></div>)}</div>
        </div></FadeIn>
        <FadeIn delay={250}><div style={{background:"white",borderRadius:14,border:`1px solid ${BDL}`,padding:20}}>
          <div style={{fontSize:14,fontWeight:700,color:TX,marginBottom:14}}>Activity Overview</div>
          <div style={{display:"flex",alignItems:"flex-end",gap:14,height:90,padding:"0 4px"}}>{[40,65,35,80,50,60,45,75,55,70,40,60].map((h,i)=><div key={i} style={{flex:1,height:h,borderRadius:4,background:`linear-gradient(180deg,${PINK}88,${PINK}44)`}}/>)}</div>
        </div></FadeIn>
        <FadeIn delay={350}><div style={{textAlign:"center",marginTop:16}}><Btn bg={DARK} onClick={onNext}>See Dr. Owens' Experience {I.arrow()}</Btn></div></FadeIn>
      </div>
    </div>
  </div>;
}

// ══════════════════════════════════════════════════
// S5: Owens Registration (PIN entry, then drops into Sona directly)
// ══════════════════════════════════════════════════
function S5_OwensReg({physician,reason,onComplete}){
  const[pin,setPin]=useState(["","","",""]);
  const[step,setStep]=useState(0);
  const refs=[useRef(),useRef(),useRef(),useRef()];
  const doc=physician||{name:"Dr. Dana Owens",email:"dana@latifah.com"};
  const handlePin=(idx,val)=>{if(val.length>1)return;const n=[...pin];n[idx]=val;setPin(n);if(val&&idx<3)refs[idx+1].current?.focus();if(n.every(d=>d!=="")){setTimeout(()=>setStep(1),300);setTimeout(()=>setStep(2),1800)}};

  if(step===2) return <div style={{minHeight:"100%",background:"#F7FAFC",display:"flex",alignItems:"center",justifyContent:"center"}}>
    <FadeIn><div style={{textAlign:"center",maxWidth:380,padding:40}}>
      <div style={{width:56,height:56,borderRadius:"50%",background:`${OK}12`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 12px"}}>{I.checkCircle(28)}</div>
      <div style={{fontSize:18,fontWeight:700,color:TX,marginBottom:4}}>Welcome to 1Health</div>
      <div style={{fontSize:14,color:TX2,marginBottom:18}}>Practice of {doc.name} verified. You have shared images waiting.</div>
      <Btn bg={TEAL} onClick={onComplete}>Open Sona {I.arrow()}</Btn>
    </div></FadeIn>
  </div>;

  return <div style={{minHeight:"100%",background:"#F7FAFC",display:"flex",alignItems:"center",justifyContent:"center"}}>
    <FadeIn><div style={{maxWidth:400,width:"100%",textAlign:"center",padding:"36px 20px"}}>
      <div style={{margin:"0 auto 14px",width:50,height:50,borderRadius:14,background:"linear-gradient(135deg,#2D3748,#4A5568)",display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{fontSize:20,fontWeight:700,color:"white"}}>1h</span></div>
      <div style={{display:"inline-flex",alignItems:"center",gap:5,background:TEAL_L,color:TEAL,padding:"4px 12px",borderRadius:20,fontSize:12,fontWeight:600,marginBottom:16}}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={TEAL} strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18"/></svg>
        New Practice Registration
      </div>
      <div style={{fontSize:20,fontWeight:700,color:TX,marginBottom:20}}>Welcome, Practice of {doc.name}</div>
      <div style={{background:"white",borderRadius:16,border:`1px solid ${BDL}`,padding:20,marginBottom:22,textAlign:"left"}}>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:12}}>
          <SonaIcon s={38}/>
          <div><div style={{fontSize:10,color:TXM,textTransform:"uppercase",letterSpacing:".06em",fontWeight:600,marginBottom:1}}>Sonographic Images Shared</div><div style={{fontSize:14,fontWeight:700,color:TX}}>Bay Area Women's Health</div><div style={{fontSize:12,color:TX2}}>On behalf of patient Sarah Johnson</div></div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:8,padding:"7px 12px",background:"#F7FAFC",borderRadius:8,marginBottom:12}}>{I.wifi()}<span style={{fontSize:13,color:TX2}}>Inviting you for</span><span style={{fontSize:13,fontWeight:600,color:TX}}>{reason||"Second Opinion"}</span></div>
        <div style={{background:`${PINK}08`,border:`1.5px solid ${PINK}20`,borderRadius:12,padding:12,display:"flex",alignItems:"center",gap:10}}><SonaIcon s={38}/><div><div style={{fontSize:14,fontWeight:700,color:TX}}>Sona — Ultrasound Imaging</div><div style={{fontSize:12,color:TX2}}>Securely view prenatal ultrasound images</div></div></div>
      </div>
      <div style={{fontSize:14,fontWeight:600,color:TX,marginBottom:12}}>4-Digit Invitation PIN</div>
      <div style={{display:"flex",gap:10,justifyContent:"center",marginBottom:8}}>
        {pin.map((d,i)=><input key={i} ref={refs[i]} type="text" inputMode="numeric" maxLength={1} value={d} onChange={e=>handlePin(i,e.target.value.replace(/\D/g,""))} style={{width:52,height:56,borderRadius:10,border:`1.5px solid ${d?TEAL:BD}`,fontSize:22,fontWeight:700,textAlign:"center",outline:"none",background:"white",color:TX,transition:"border-color .2s"}} onFocus={e=>e.target.style.borderColor=TEAL} onBlur={e=>{if(!d)e.target.style.borderColor=BD}}/>)}
      </div>
      {step===1&&<div style={{marginTop:14}}><div style={{width:24,height:24,border:`2.5px solid ${TEAL}`,borderTopColor:"transparent",borderRadius:"50%",margin:"0 auto",animation:"sp2 .8s linear infinite"}}/><div style={{fontSize:13,color:TX2,marginTop:6}}>Verifying...</div></div>}
      <div style={{fontSize:11,color:TXM,marginTop:14,lineHeight:1.5}}>This PIN was included in the secure fax sent to your practice.<br/>Enter any 4 digits to continue the demo.</div>
    </div></FadeIn>
    <style>{`@keyframes sp2{to{transform:rotate(360deg)}}`}</style>
  </div>;
}

// ══════════════════════════════════════════════════
// S6: Owens handshake + image view (dropped directly into Sona, no other apps)
// ══════════════════════════════════════════════════
function S6_OwensView({physician,reason,onNext}){
  const doc=physician||{name:"Dr. Dana Owens",initials:"DO"};
  const tn=`Practice of ${doc.name}`;
  const[accepted,setAccepted]=useState(false);
  const[loading,setLoading]=useState(false);

  const handleAccept=()=>{setLoading(true);setTimeout(()=>{setLoading(false);setAccepted(true)},1000)};

  return <div style={{display:"flex",flexDirection:"column",minHeight:"100%"}}>
    <PH tenant={tn} tabs={[{id:"sona",label:"Sona",icon:<SonaIcon s={20}/>}]} activeTab="sona" initials={doc.initials||"DO"}/>
    <div style={{flex:1,background:BODY,position:"relative"}}>
      <IFB url="app.1health.io"/>
      <div style={{padding:"24px 28px",maxWidth:700,margin:"0 auto"}}>
        <FadeIn><div style={{display:"flex",alignItems:"center",gap:12,marginBottom:4}}><SonaIcon s={42}/><div><div style={{fontSize:18,fontWeight:700,color:TX}}>Sona — Ultrasound Imaging</div><div style={{fontSize:13,color:TX2}}>Viewing as {tn}</div></div></div></FadeIn>
        <div style={{height:1,background:`linear-gradient(90deg,${PINK}33,transparent)`,margin:"14px 0 22px"}}/>

        {!accepted ? (
          <FadeIn delay={100}><div style={{background:"white",borderRadius:16,border:`1px solid ${BDL}`,overflow:"hidden"}}>
            <div style={{background:`linear-gradient(135deg,${PINK}0C,${PINK}04)`,padding:"16px 20px",borderBottom:`1px solid ${BD}`,display:"flex",alignItems:"center",gap:10}}>
              <SonaIcon s={34}/>
              <div><div style={{fontSize:15,fontWeight:700,color:TX}}>Verify Image Share</div><div style={{fontSize:12,color:TX2}}>Please confirm you're the intended recipient</div></div>
            </div>
            <div style={{padding:20}}>
              <div style={{background:"#F7FAFC",borderRadius:10,padding:14,marginBottom:16}}>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,fontSize:13}}>
                  <div><span style={{color:TXM}}>Patient:</span> <span style={{fontWeight:500,color:TX}}>Sarah Johnson</span></div>
                  <div><span style={{color:TXM}}>Reason:</span> <span style={{fontWeight:500,color:TX}}>{reason||"Second Opinion"}</span></div>
                  <div><span style={{color:TXM}}>From:</span> <span style={{fontWeight:500,color:TX}}>Bay Area Women's Health</span></div>
                  <div><span style={{color:TXM}}>Images:</span> <span style={{fontWeight:500,color:TX}}>3 ultrasound files</span></div>
                </div>
              </div>
              <div style={{display:"flex",gap:8,marginBottom:16,flexWrap:"wrap"}}>{["HIPAA Compliant","NPI Verified","E2E Encrypted"].map(b=><span key={b} style={{fontSize:10,padding:"3px 8px",borderRadius:5,background:`${OK}0C`,color:OK,fontWeight:600,display:"flex",alignItems:"center",gap:3}}>{I.shield(11)} {b}</span>)}</div>
              <div style={{fontSize:12,color:TX2,marginBottom:14,lineHeight:1.5}}>By accepting, you confirm you are <strong>{doc.name}</strong> and consent to receive HIPAA-protected patient images for the purpose of <strong>{reason||"a second opinion"}</strong>.</div>
              {loading ? <div style={{textAlign:"center",padding:12}}><div style={{width:24,height:24,border:`2.5px solid ${BLUE}`,borderTopColor:"transparent",borderRadius:"50%",margin:"0 auto",animation:"sp2 .8s linear infinite"}}/></div>
              : <button onClick={handleAccept} style={{width:"100%",background:`linear-gradient(135deg,${BLUE},#3a6ae0)`,color:"white",border:"none",borderRadius:10,padding:14,fontSize:15,fontWeight:600,cursor:"pointer",boxShadow:`0 3px 14px ${BLUE}33`}}>I am {doc.name} — Accept & View Images</button>}
            </div>
          </div></FadeIn>
        ) : (
          <FadeIn>
            <div style={{background:"white",borderRadius:14,border:`1px solid ${BDL}`,padding:20,marginBottom:18}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
                <div><div style={{fontSize:11,color:TXM,textTransform:"uppercase",letterSpacing:".05em",marginBottom:2}}>Shared With You</div><div style={{fontSize:16,fontWeight:600,color:TX}}>Sarah Johnson — Prenatal Ultrasound</div><div style={{fontSize:13,color:TX2}}>From Bay Area Women's Health · {reason} · April 18, 2026</div></div>
                <div style={{display:"flex",alignItems:"center",gap:4,fontSize:11,color:OK,fontWeight:600}}>{I.shield()} Verified</div>
              </div>
              <div style={{background:"#F7FAFC",borderRadius:8,padding:"9px 14px",marginBottom:14,display:"flex",gap:20,fontSize:13,flexWrap:"wrap"}}>{[["DOB","03/15/1992"],["Gest. Age","20w 3d"],["Exam","04/18/2026"]].map(([l,v])=><div key={l}><span style={{color:TXM}}>{l}:</span> <span style={{fontWeight:500,color:TX}}>{v}</span></div>)}</div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10}}>{[0,1,2].map(i=><div key={i} style={{borderRadius:10,overflow:"hidden",border:`1px solid ${BDL}`,background:"white"}}><US v={i} w={300} h={200}/><div style={{padding:"7px 9px"}}><div style={{fontSize:12,fontWeight:600,color:TX}}>{["Profile View","3D Render","Heartbeat"][i]}</div><div style={{fontSize:11,color:TXM}}>{["Sagittal","3D Surface","M-Mode"][i]}</div></div></div>)}</div>
            </div>
            <div style={{textAlign:"center",marginTop:12}}><Btn bg={DARK} onClick={onNext}>See the Network Effect {I.arrow()}</Btn></div>
          </FadeIn>
        )}
      </div>
    </div>
    <style>{`@keyframes sp2{to{transform:rotate(360deg)}}`}</style>
  </div>;
}

// ══════════════════════════════════════════════════
// S7: Network Effect closing
// ══════════════════════════════════════════════════
function S7_Network(){
  return <div style={{minHeight:"100%",background:"linear-gradient(170deg,#0D1B30 0%,#1a2d4a 50%,#0D1B30 100%)"}}>
    <div style={{padding:"40px 24px",maxWidth:700,margin:"0 auto"}}>
      <FadeIn><div style={{textAlign:"center",marginBottom:36}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:14,marginBottom:18}}><SonaIcon s={42}/><span style={{fontSize:26,color:"#ffffff44",fontWeight:200}}>+</span><div style={{width:42,height:42,borderRadius:12,background:"linear-gradient(135deg,#2D3748,#4A5568)",display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{fontSize:17,fontWeight:700,color:"white"}}>1h</span></div></div>
        <div style={{fontSize:24,fontWeight:700,color:"white",lineHeight:1.35,marginBottom:6}}>Every Share Grows the Network.<br/>Every Provider Strengthens the Platform.</div>
        <div style={{fontSize:14,color:"#ffffff77"}}>Sona on 1Health turns image sharing into a distribution engine.</div>
      </div></FadeIn>
      <FadeIn delay={200}><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:28}}>
        {[{n:"01",t:"Provider Shares via Sona",d:"Selects a specialist, chooses a reason (second opinion, referral), shares ultrasound images through the 1Health network.",c:PINK},{n:"02",t:"Existing MD Accepts Instantly",d:"Dr. Broadus is on 1Health — he gets a notification, clicks accept, and views images. No friction.",c:BLUE},{n:"03",t:"New MD Gets a Fax + QR Code",d:"Dr. Owens isn't on 1Health. She receives a fax, scans the QR, enters her PIN, and is dropped directly into Sona to accept.",c:WARN},{n:"04",t:"Network Compounds",d:"Payors drive providers through TRC. Sona adds a new vector. Every physician who joins sees the full app ecosystem.",c:TEAL}].map((s,i)=>(
          <div key={i} style={{background:"#ffffff08",border:"1px solid #ffffff10",borderRadius:12,padding:16}}><div style={{fontSize:10,fontWeight:700,color:s.c,letterSpacing:".08em",marginBottom:5}}>STEP {s.n}</div><div style={{fontSize:14,fontWeight:600,color:"white",marginBottom:3}}>{s.t}</div><div style={{fontSize:12,color:"#ffffff66",lineHeight:1.5}}>{s.d}</div></div>
        ))}
      </div></FadeIn>
      <FadeIn delay={400}><div style={{background:"#ffffff08",border:"1px solid #ffffff10",borderRadius:14,padding:20}}>
        <div style={{fontSize:16,fontWeight:700,color:"white",marginBottom:12}}>What This Means for Sona</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          {[{i:"📈",t:"Instant Distribution",d:"4,800+ verified physicians already on 1Health."},{i:"🔐",t:"SSO & Shared Identity",d:"One credential, all apps. No new logins."},{i:"🏥",t:"Payor-Driven Adoption",d:"Payors onboard providers through TRC. Sona rides the same wave."},{i:"🔍",t:"App Discovery",d:"Sona visible on every provider's dashboard."},{i:"💰",t:"Fundraising Narrative",d:"Network distribution = a stronger pitch to investors."},{i:"🚀",t:"No Infrastructure Build",d:"Identity, compliance, directories — all built. Ship the feature."}].map((v,i)=>(
            <div key={i} style={{display:"flex",gap:8,alignItems:"flex-start"}}><span style={{fontSize:20}}>{v.i}</span><div><div style={{fontSize:12,fontWeight:600,color:"white",marginBottom:1}}>{v.t}</div><div style={{fontSize:11,color:"#ffffff66",lineHeight:1.45}}>{v.d}</div></div></div>
          ))}
        </div>
      </div></FadeIn>
      <FadeIn delay={600}><div style={{textAlign:"center",padding:"24px 0 8px"}}><div style={{fontSize:20,fontWeight:700,color:"white"}}>Let's build this together.</div><div style={{fontSize:13,color:"#ffffff55",marginTop:4}}>Sona × 1Health</div></div></FadeIn>
    </div>
  </div>;
}

// ══════════════════════════════════════════════════
// MAIN
// ══════════════════════════════════════════════════
const SCREENS = [
  "Sona Dashboard",
  "Search & Share",
  "Dr. Broadus Accepts",
  "Broadus Views Images",
  "Dr. Owens Registration",
  "Owens Verifies & Views",
  "Network Effect",
];

export default function App(){
  const[screen,setScreen]=useState(0);
  const[broadusDoc]=useState({name:"Dr. Calvin G. Broadus",specialty:"Maternal-Fetal Medicine",org:"Pacific MFM Associates",npi:"1928374650",initials:"CB"});
  const[owensDoc,setOwensDoc]=useState({name:"Dr. Dana Owens",specialty:"OB/GYN",org:"Meridian Women's Health",npi:"1567890234",initials:"DO",email:"dana@latifah.com"});
  const[reason,setReason]=useState("Second Opinion");
  const ref=useRef(null);
  const goTo=s=>{setScreen(s);ref.current?.scrollTo(0,0)};

  return <div style={{fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif",height:"100vh",display:"flex",flexDirection:"column",background:"#F7FAFC"}}>
    {/* Control bar */}
    <div style={{background:"white",borderBottom:`1px solid ${BD}`,padding:"7px 16px",display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0}}>
      <div style={{display:"flex",alignItems:"center",gap:8}}><span style={{fontSize:12,fontWeight:700,color:BLUE}}>DEMO</span><span style={{fontSize:12,color:TX2}}>Sona × 1Health</span></div>
      <div style={{display:"flex",alignItems:"center",gap:3}}>{SCREENS.map((_,i)=><button key={i} onClick={()=>goTo(i)} title={SCREENS[i]} style={{width:i===screen?22:8,height:8,borderRadius:4,border:"none",cursor:"pointer",transition:"all .2s",background:i===screen?BLUE:i<screen?OK:BD}}/>)}</div>
      <div style={{display:"flex",gap:4}}>
        {screen>0&&<button onClick={()=>goTo(screen-1)} style={{padding:"4px 10px",borderRadius:6,border:`1px solid ${BD}`,background:"white",fontSize:11,cursor:"pointer",color:TX2}}>← Back</button>}
        {screen<SCREENS.length-1&&<button onClick={()=>goTo(screen+1)} style={{padding:"4px 10px",borderRadius:6,border:"none",background:BLUE,color:"white",fontSize:11,fontWeight:600,cursor:"pointer"}}>Next →</button>}
      </div>
    </div>
    <div ref={ref} style={{flex:1,overflow:"auto"}}>
      {screen===0&&<S1 onShare={()=>goTo(1)}/>}
      {screen===1&&<S2 onFoundBroadus={(d,r)=>{setReason(r);goTo(2)}} onFoundOwens={(d,r)=>{setOwensDoc(d);setReason(r);goTo(4)}}/>}
      {screen===2&&<S3_BroadusAccept physician={broadusDoc} reason={reason} onAccept={()=>goTo(3)}/>}
      {screen===3&&<S4_BroadusView physician={broadusDoc} onNext={()=>goTo(4)}/>}
      {screen===4&&<S5_OwensReg physician={owensDoc} reason={reason} onComplete={()=>goTo(5)}/>}
      {screen===5&&<S6_OwensView physician={owensDoc} reason={reason} onNext={()=>goTo(6)}/>}
      {screen===6&&<S7_Network/>}
    </div>
  </div>;
}
