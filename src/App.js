import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Mail, ExternalLink, Download, ChevronDown, Menu, X, Send, ArrowRight, Package, BarChart3, Wrench, GraduationCap, MapPin, CheckCircle, Moon, Sun, Briefcase, Cpu, FlaskConical, TrendingUp, Shield, Layers, Database, Globe, Terminal, ChevronRight, Thermometer, Award, Calendar, Building2 } from "lucide-react";

const PROJECTS = [
  { title:"NGO Inventory Management System", subtitle:"Full-Stack · Real-Time · Multilingual", desc:"Production-grade donation tracking platform built for a real nonprofit. Manages the full receive → store → distribute pipeline with role-based access control, real-time multi-device sync, and bilingual support.", features:["4 User Roles with Auth","EN/ES Language Toggle","Dark & Light Mode","Real-Time KPI Dashboard","Shelf-Location Tracking","People Served Metrics","Excel Report Generation","Onboarding Tutorial"], tech:["React","Supabase","PostgreSQL","Recharts","SheetJS","Vercel"], liveUrl:"https://ngo-inventory-v2.vercel.app", codeUrl:"https://github.com/Vanshsingh1203/ngo-inventory-v2", color:"#00ced1", icon:<Package size={24}/>, featured:true },
  { title:"ChainGuard — Pharma Cold Chain Dashboard", subtitle:"Risk Analytics · Predictive · Compliance", desc:"Premium real-time monitoring dashboard for pharmaceutical cold chain logistics. Tracks 500+ shipments, detects temperature excursions, predicts risks using a weighted scoring algorithm, and ensures GDP compliance with interactive visualizations.", features:["500+ Shipment Tracking","Risk Scoring Algorithm","Temperature Excursion Alerts","Route Risk Heatmap (US Map)","Cost Impact Calculator","PDF & Excel Export","Dark/Light Theme","Gantt Timeline View"], tech:["React","Recharts","jsPDF","SheetJS","date-fns","GitHub Pages"], liveUrl:"https://vanshsingh1203.github.io/chainguard-pharma-dashboard", codeUrl:"https://github.com/Vanshsingh1203/chainguard-pharma-dashboard", color:"#00d4aa", icon:<Thermometer size={24}/>, featured:true },
  { title:"Demand Forecasting & Inventory Optimization", subtitle:"Machine Learning · Time Series · Analytics", desc:"Interactive analytics engine analyzing 1.7M+ real retail sales records across 54 stores and 33 product families. Compares multiple forecasting methods and calculates optimal inventory parameters.", features:["Holt-Winters, ARIMA, XGBoost","EOQ & Safety Stock Calculator","ABC / Pareto Classification","What-If Simulator","Promotion Impact Analysis","Cost Curve Visualization","Best-Model Auto Selection","Interactive Filters"], tech:["Python","Streamlit","pandas","scikit-learn","XGBoost","Plotly","statsmodels"], liveUrl:"https://demand-forecast-9hjy8sujmqrpxzcxnlgacb.streamlit.app/", codeUrl:"https://github.com/Vanshsingh1203/demand-forecast", color:"#a78bfa", icon:<BarChart3 size={24}/>, featured:true },
  { title:"Cold Chain Risk Analytics", subtitle:"Logistics · Risk Modeling · KPI Design", desc:"Analyzed 5,650 EPCIS logistics events across 305 cold-chain shipment histories to quantify dwell time, handoff frequency, and end-to-end supply chain risk with data-driven delay reduction strategies.", features:["5,650 Events Analyzed","305 Shipment Histories","Chain-Level KPI Development","Top 25% Risk Identification"], tech:["Python","pandas","SQL","KPI Dashboards"], codeUrl:"https://github.com/Vanshsingh1203/cold-chain-temperature-excursion-prediction", color:"#ffd93d", icon:<TrendingUp size={24}/>, featured:false },
  { title:"EDM Process Optimization", subtitle:"Design of Experiments · Aerospace Manufacturing", desc:"Optimized Electrical Discharge Machining parameters using Box-Behnken Design on CNC die-sinking EDM for Haynes 25 superalloy, achieving dimensional accuracy within 10 microns for micro-hole fabrication.", features:["Box-Behnken DOE","10μm Accuracy","Haynes 25 Superalloy","Process Robustness"], tech:["DOE","Minitab","Statistical Analysis","CNC EDM"], color:"#ff6b6b", icon:<Cpu size={24}/>, featured:false },
  { title:"Turbine Blade Thermal Evaluation", subtitle:"CFD Simulation · ANSYS · Heat Transfer", desc:"Conducted CFD and thermal simulations in ANSYS Workbench to evaluate turbine blade cooling strategies, identifying improvements projected to extend component service life by 20%.", features:["CFD & Thermal Sim","20% Life Extension","Conference Presentation","Team Collaboration"], tech:["ANSYS Workbench","ANSYS Fluent","CFD","SolidWorks"], liveUrl:"https://www.taylorfrancis.com/chapters/edit/10.1201/9781003679622-25/comprehensive-thermal-evaluation-jet-turbine-blades-utilizing-ansys-simulation-vansh-singh-atul-das-chacko-pallickal-nikhil-rao-senthur-prabu?context=ubx&refId=90cdef82-6d96-475d-ac9e-2163c3108f58", color:"#48dbfb", icon:<FlaskConical size={24}/>, featured:false },
];

const SKILLS = {
  "Supply Chain & Operations":{ icon:<Package size={20}/>, color:"#00ced1", items:["Demand Forecasting & Planning","Inventory Optimization (EOQ, ROP, SS)","Warehouse Management (WMS)","Procurement & Strategic Sourcing","Logistics & Warehousing","Capacity Planning & Scheduling","Cost & Lead Time Analysis","Service Level Optimization"] },
  "Analytics & Data Science":{ icon:<BarChart3 size={20}/>, color:"#a78bfa", items:["Time Series (ARIMA, Holt-Winters)","Machine Learning (XGBoost, Regression)","Linear Programming & OR Models","Statistical Process Control (SPC)","KPI Design (OTIF, Cycle Time, Dwell)","Root Cause & Variance Analysis","ABC / Pareto Classification","Monte Carlo Simulation"] },
  "Engineering & Quality":{ icon:<Wrench size={20}/>, color:"#ffd93d", items:["Lean Manufacturing","Six Sigma (Green Belt)","DMAIC / 5S / Kaizen","FMEA & Risk Analysis","Process Mapping & Improvement","BOM Management","Supplier Performance Evaluation","Continuous Improvement"] },
  "Mechanical & Design":{ icon:<Cpu size={20}/>, color:"#ff6b6b", items:["SolidWorks (CSWP Certified)","ANSYS Workbench & Fluent","CFD & Thermal Simulation","Finite Element Analysis (FEA)","Design of Experiments (DOE)","GD&T & Tolerancing","Material Selection & Testing","Manufacturing Process Planning"] },
};

const TOOLS = [
  { name:"Python", icon:"🐍" },{ name:"JavaScript", icon:"⚡" },{ name:"React", icon:"⚛️" },{ name:"SQL / MySQL", icon:"🗄️" },
  { name:"PostgreSQL", icon:"🐘" },{ name:"Supabase", icon:"⚡" },{ name:"pandas / NumPy", icon:"📊" },{ name:"scikit-learn", icon:"🤖" },
  { name:"XGBoost", icon:"🚀" },{ name:"Plotly / Recharts", icon:"📈" },{ name:"Streamlit", icon:"🎯" },{ name:"Power BI", icon:"📉" },
  { name:"Tableau", icon:"📋" },{ name:"Excel (Advanced)", icon:"📗" },{ name:"SolidWorks (CSWP)", icon:"🔧" },{ name:"ANSYS", icon:"🔬" },
  { name:"Git / GitHub", icon:"🔀" },{ name:"Vercel", icon:"▲" },{ name:"Minitab", icon:"📐" },{ name:"MATLAB", icon:"🧮" },
];

const NAV = ["About","Projects","Skills","Experience","Resume","Contact"];
const fadeUp = { hidden:{opacity:0,y:40}, visible:{opacity:1,y:0,transition:{duration:0.6,ease:"easeOut"}} };
const stagger = { visible:{transition:{staggerChildren:0.1}} };
const scaleIn = { hidden:{opacity:0,scale:0.9}, visible:{opacity:1,scale:1,transition:{duration:0.5}} };

const LIGHT = { bg:"#f8f9fc",card:"#ffffff",cardHover:"#f0f4ff",text:"#1a1a2e",textSec:"#4a4a6a",textMuted:"#6b7194",textFaint:"#9ca3c4",border:"#e4e8f4",accent:"#6c5ce7",accentGlow:"rgba(108,92,231,.08)",inputBg:"#fff",inputBorder:"#d0d5e8",sectionAlt:"#eef0f8",heroGrad1:"#0a0a1a",heroGrad2:"#16162e" };
const DARK = { bg:"#0a0a14",card:"#12121f",cardHover:"#1a1a30",text:"#eef0ff",textSec:"#c4c6e0",textMuted:"#8b8db0",textFaint:"#5c5e80",border:"#1e1e35",accent:"#a78bfa",accentGlow:"rgba(167,139,250,.1)",inputBg:"#16162a",inputBorder:"#2d2d50",sectionAlt:"#0e0e1c",heroGrad1:"#050510",heroGrad2:"#0a0a1a" };

function Section({children,id,dark,alt,theme}) {
  const ref=useRef(null); const isInView=useInView(ref,{once:true,margin:"-80px"});
  const bg = dark ? `linear-gradient(180deg,${theme.heroGrad1},${theme.heroGrad2})` : (alt?theme.sectionAlt:theme.bg);
  return(<motion.section ref={ref} id={id} initial="hidden" animate={isInView?"visible":"hidden"} variants={stagger} style={{padding:"100px 24px",background:bg,position:"relative",transition:"background .4s"}}><div style={{maxWidth:1100,margin:"0 auto"}}>{children}</div></motion.section>);
}

function SectionTitle({title,subtitle,light,theme}) {
  return(<motion.div variants={fadeUp} style={{textAlign:"center",marginBottom:56}}>
    <h2 style={{fontSize:"clamp(28px,4vw,38px)",fontWeight:800,color:light?"#fff":theme.text,margin:"0 0 12px",letterSpacing:"-0.5px"}}>{title}</h2>
    {subtitle&&<p style={{fontSize:16,color:light?"#94a3b8":theme.textMuted,margin:0,maxWidth:550,marginLeft:"auto",marginRight:"auto",lineHeight:1.6}}>{subtitle}</p>}
  </motion.div>);
}

function Header({activeSection,theme,dark,toggleDark}) {
  const[scrolled,setScrolled]=useState(false);const[menuOpen,setMenuOpen]=useState(false);
  useEffect(()=>{const h=()=>setScrolled(window.scrollY>50);window.addEventListener("scroll",h);return()=>window.removeEventListener("scroll",h);},[]);
  const scrollTo=(id)=>{document.getElementById(id.toLowerCase())?.scrollIntoView({behavior:"smooth"});setMenuOpen(false);};
  return(
    <header style={{position:"fixed",top:0,left:0,right:0,zIndex:100,padding:scrolled?"10px 24px":"18px 24px",background:scrolled?(dark?"rgba(10,15,26,.92)":"rgba(255,255,255,.88)"):"transparent",backdropFilter:scrolled?"blur(20px) saturate(180%)":"none",borderBottom:scrolled?`1px solid ${theme.border}`:"none",transition:"all .3s"}}>
      <div style={{maxWidth:1100,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <a href="#hero" onClick={e=>{e.preventDefault();window.scrollTo({top:0,behavior:"smooth"});}} style={{fontSize:22,fontWeight:800,color:scrolled?theme.text:"#fff",textDecoration:"none",letterSpacing:"-0.5px",transition:"color .3s"}}>VS<span style={{color:"#a78bfa"}}>.</span></a>
        <nav style={{display:"flex",gap:28,alignItems:"center"}}>
          {NAV.map(n=>(<button key={n} onClick={()=>scrollTo(n)} style={{background:"none",border:"none",color:activeSection===n.toLowerCase()?"#a78bfa":(scrolled?theme.textMuted:"#94a3b8"),fontSize:14,fontWeight:activeSection===n.toLowerCase()?600:500,cursor:"pointer",padding:"4px 0",borderBottom:activeSection===n.toLowerCase()?"2px solid #a78bfa":"2px solid transparent",transition:"all .2s"}}>{n}</button>))}
          <button onClick={toggleDark} style={{background:theme.accentGlow,border:"none",borderRadius:10,padding:"8px 10px",cursor:"pointer",color:scrolled?theme.textSec:"#94a3b8",display:"flex",alignItems:"center",transition:"all .3s"}}>{dark?<Sun size={16}/>:<Moon size={16}/>}</button>
        </nav>
        <button onClick={()=>setMenuOpen(!menuOpen)} className="mobile-menu" style={{display:"none",background:"none",border:"none",color:scrolled?theme.text:"#fff",cursor:"pointer"}}>{menuOpen?<X size={24}/>:<Menu size={24}/>}</button>
      </div>
      <style>{`@media(max-width:768px){nav{display:none !important}.mobile-menu{display:block !important}}`}</style>
      <AnimatePresence>{menuOpen&&(<motion.div initial={{opacity:0,y:-20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}} style={{position:"absolute",top:"100%",left:0,right:0,background:dark?"rgba(10,15,26,.98)":"rgba(255,255,255,.98)",padding:"16px 24px",display:"flex",flexDirection:"column",gap:12,borderBottom:`1px solid ${theme.border}`,backdropFilter:"blur(20px)"}}>
        {NAV.map(n=>(<button key={n} onClick={()=>scrollTo(n)} style={{background:"none",border:"none",color:theme.text,fontSize:16,fontWeight:500,cursor:"pointer",textAlign:"left",padding:"10px 0"}}>{n}</button>))}
        <button onClick={()=>{toggleDark();setMenuOpen(false);}} style={{background:"none",border:"none",color:theme.textSec,fontSize:16,fontWeight:500,cursor:"pointer",textAlign:"left",padding:"10px 0",display:"flex",alignItems:"center",gap:8}}>{dark?<Sun size={16}/>:<Moon size={16}/>}{dark?"Light Mode":"Dark Mode"}</button>
      </motion.div>)}</AnimatePresence>
    </header>
  );
}

function Hero({theme}) {
  const[typed,setTyped]=useState("");const[lineIdx,setLineIdx]=useState(0);const[charIdx,setCharIdx]=useState(0);const[deleting,setDeleting]=useState(false);
  const lines=["Supply Chain Analytics","Inventory Optimization","Operations Research","Data-Driven Decisions"];
  useEffect(()=>{const line=lines[lineIdx];const timeout=setTimeout(()=>{if(!deleting){setTyped(line.substring(0,charIdx+1));if(charIdx+1===line.length)setTimeout(()=>setDeleting(true),1500);else setCharIdx(charIdx+1);}else{setTyped(line.substring(0,charIdx));if(charIdx===0){setDeleting(false);setLineIdx((lineIdx+1)%lines.length);}else setCharIdx(charIdx-1);}},deleting?30:80);return()=>clearTimeout(timeout);});
  return(
    <section id="hero" style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:`linear-gradient(135deg,${theme.heroGrad1} 0%,${theme.heroGrad2} 40%,${theme.heroGrad1} 100%)`,position:"relative",overflow:"hidden",padding:"0 24px"}}>
      <div style={{position:"absolute",inset:0}}>
        <div style={{position:"absolute",top:"15%",left:"5%",width:450,height:450,borderRadius:"50%",background:"radial-gradient(circle,rgba(108,92,231,.15) 0%,transparent 70%)",filter:"blur(80px)",animation:"float1 8s ease-in-out infinite"}}/>
        <div style={{position:"absolute",bottom:"10%",right:"5%",width:400,height:400,borderRadius:"50%",background:"radial-gradient(circle,rgba(0,206,209,.12) 0%,transparent 70%)",filter:"blur(80px)",animation:"float2 10s ease-in-out infinite"}}/>
        <div style={{position:"absolute",top:"40%",right:"30%",width:300,height:300,borderRadius:"50%",background:"radial-gradient(circle,rgba(255,107,107,.08) 0%,transparent 70%)",filter:"blur(60px)",animation:"float3 12s ease-in-out infinite"}}/>
        <div style={{position:"absolute",bottom:"30%",left:"25%",width:250,height:250,borderRadius:"50%",background:"radial-gradient(circle,rgba(72,219,251,.08) 0%,transparent 70%)",filter:"blur(60px)",animation:"float1 9s ease-in-out infinite reverse"}}/>
      </div>
      <motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.8,ease:"easeOut"}} style={{textAlign:"center",position:"relative",zIndex:1,maxWidth:800}}>
        <motion.div initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}} transition={{delay:0.2}} style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(167,139,250,.1)",border:"1px solid rgba(167,139,250,.2)",borderRadius:50,padding:"8px 22px",marginBottom:32}}>
          <MapPin size={14} color="#a78bfa"/><span style={{fontSize:13,color:"#c4b5fd",fontWeight:600}}>Boston, MA</span>
          <span style={{width:4,height:4,borderRadius:2,background:"#475569"}}/>
          <span style={{fontSize:13,color:"#00ced1",fontWeight:600}}>Open to Opportunities</span>
        </motion.div>
        <h1 style={{fontSize:"clamp(42px,6vw,68px)",fontWeight:800,color:"#fff",margin:"0 0 16px",lineHeight:1.05,letterSpacing:"-2px"}}>
          Hi, I'm <span style={{background:"linear-gradient(135deg,#a78bfa,#00ced1,#ff6b6b)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Vansh Singh</span>
        </h1>
        <div style={{fontSize:"clamp(20px,3vw,28px)",color:"#94a3b8",fontWeight:500,marginBottom:28,minHeight:40,fontFamily:"'JetBrains Mono',monospace"}}>
          {typed}<span style={{color:"#a78bfa",animation:"blink 1s infinite"}}>_</span>
        </div>
        <p style={{fontSize:17,color:"#64748b",lineHeight:1.8,maxWidth:580,margin:"0 auto 40px"}}>
          Engineering Management grad who builds tools that turn operational chaos into clean, data-driven systems. I make supply chains visible, from warehouse floors to interactive dashboards.
        </p>
        <div style={{display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap"}}>
          <a href="#projects" onClick={e=>{e.preventDefault();document.getElementById("projects")?.scrollIntoView({behavior:"smooth"});}} style={{padding:"14px 30px",background:"linear-gradient(135deg,#6c5ce7,#a78bfa)",color:"#fff",borderRadius:14,fontSize:15,fontWeight:600,textDecoration:"none",display:"flex",alignItems:"center",gap:8,boxShadow:"0 4px 24px rgba(108,92,231,.4)"}}>View Projects <ArrowRight size={18}/></a>
          <a href="/resume.pdf" download style={{padding:"14px 30px",background:"rgba(255,255,255,.06)",color:"#e2e8f0",borderRadius:14,fontSize:15,fontWeight:600,textDecoration:"none",display:"flex",alignItems:"center",gap:8,border:"1px solid rgba(255,255,255,.12)",backdropFilter:"blur(10px)"}}><Download size={18}/>Resume</a>
          <a href="https://github.com/Vanshsingh1203" target="_blank" rel="noreferrer" style={{padding:"14px 16px",background:"rgba(255,255,255,.06)",color:"#e2e8f0",borderRadius:14,textDecoration:"none",display:"flex",alignItems:"center",border:"1px solid rgba(255,255,255,.12)",backdropFilter:"blur(10px)"}}><Github size={20}/></a>
          <a href="https://www.linkedin.com/in/vansh-singh1203" target="_blank" rel="noreferrer" style={{padding:"14px 16px",background:"rgba(255,255,255,.06)",color:"#e2e8f0",borderRadius:14,textDecoration:"none",display:"flex",alignItems:"center",border:"1px solid rgba(255,255,255,.12)",backdropFilter:"blur(10px)"}}><Linkedin size={20}/></a>
        </div>
      </motion.div>
      <motion.div animate={{y:[0,10,0]}} transition={{repeat:Infinity,duration:2.5,ease:"easeInOut"}} style={{position:"absolute",bottom:36,left:"50%",transform:"translateX(-50%)"}}><ChevronDown size={24} color="#475569"/></motion.div>
      <style>{`@keyframes blink{0%,100%{opacity:1}50%{opacity:0}} @keyframes float1{0%,100%{transform:translate(0,0)}50%{transform:translate(30px,-20px)}} @keyframes float2{0%,100%{transform:translate(0,0)}50%{transform:translate(-25px,25px)}} @keyframes float3{0%,100%{transform:translate(0,0)}50%{transform:translate(15px,30px)}}`}</style>
    </section>
  );
}

function About({theme}) {
  const stats=[{value:"6",label:"Projects Built",icon:<Layers size={18}/>,clr:"#a78bfa"},{value:"1.7M+",label:"Records Analyzed",icon:<Database size={18}/>,clr:"#00ced1"},{value:"4+",label:"Forecasting Models",icon:<TrendingUp size={18}/>,clr:"#ff6b6b"},{value:"3",label:"Live Deployments",icon:<Globe size={18}/>,clr:"#ffd93d"}];
  return(
    <Section id="about" theme={theme}>
      <SectionTitle title="About Me" subtitle="Part engineer, part analyst, full-time problem solver" theme={theme}/>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(320px,1fr))",gap:36}}>
        <motion.div variants={fadeUp}>
          <div style={{background:theme.card,borderRadius:20,padding:"36px 32px",transition:"background .4s"}}>
            <p style={{fontSize:16,color:theme.textSec,lineHeight:1.9,margin:"0 0 18px"}}>I build tools that bring clarity to complex operations. Currently pursuing my MS in Engineering Management at <strong style={{color:theme.text}}>Northeastern University</strong>, with a Mechanical Engineering foundation from <strong style={{color:theme.text}}>VIT</strong>.</p>
            <p style={{fontSize:16,color:theme.textSec,lineHeight:1.9,margin:"0 0 18px"}}>At <strong style={{color:theme.text}}>Tata Motors</strong>, I developed cost analytics dashboards covering 100+ machines and analyzed supplier performance across 20+ vendors. With <strong style={{color:theme.text}}>Team Assailing Falcons</strong>, I applied lean principles to streamline the build process for a 12-member engineering team, reducing build time by 20%.</p>
            <p style={{fontSize:16,color:theme.textSec,lineHeight:1.9,margin:0}}>Now I focus on full-stack development for real operational challenges: inventory management systems for nonprofits, demand forecasting engines processing 1.7M+ records, and cold chain compliance dashboards for pharmaceutical logistics. I turn data into decisions.</p>
          </div>
          <div style={{display:"flex",gap:12,marginTop:16}}>
            {[{icon:<GraduationCap size={16}/>,text:"MS Engineering Management — Northeastern (Sep 2025 - Dec 2027)"},{icon:<GraduationCap size={16}/>,text:"BE Mechanical Engineering — VIT (Aug 2021 - Aug 2025)"}].map((e,i)=>(
              <div key={i} style={{flex:1,background:theme.card,borderRadius:14,padding:"16px 18px",display:"flex",alignItems:"center",gap:10,fontSize:13,color:theme.textSec,fontWeight:500,transition:"background .4s"}}><span style={{color:"#a78bfa"}}>{e.icon}</span>{e.text}</div>
            ))}
          </div>
        </motion.div>
        <motion.div variants={fadeUp}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
            {stats.map((s,i)=>(
              <motion.div key={i} variants={scaleIn} whileHover={{y:-4,transition:{duration:0.2}}} style={{background:theme.card,borderRadius:16,padding:"28px 22px",cursor:"default",transition:"background .4s"}}>
                <div style={{width:40,height:40,borderRadius:12,background:`${s.clr}15`,display:"flex",alignItems:"center",justifyContent:"center",color:s.clr,marginBottom:14}}>{s.icon}</div>
                <div style={{fontSize:32,fontWeight:800,color:theme.text,letterSpacing:"-1px"}}>{s.value}</div>
                <div style={{fontSize:13,color:theme.textMuted,marginTop:4,fontWeight:500}}>{s.label}</div>
              </motion.div>
            ))}
          </div>
          <motion.div variants={fadeUp} style={{marginTop:16,background:"linear-gradient(135deg,#6c5ce7,#00ced1)",borderRadius:16,padding:"24px 28px",color:"#fff"}}>
            <div style={{fontSize:14,fontWeight:600,opacity:.8,marginBottom:6}}>Currently Looking For</div>
            <div style={{fontSize:18,fontWeight:700}}>Supply Chain & Operations Analytics Internships</div>
            <div style={{fontSize:13,opacity:.7,marginTop:8}}>Summer 2026 · Fall 2026 · Co-op</div>
          </motion.div>
        </motion.div>
      </div>
    </Section>
  );
}

function Projects({theme,dark}) {
  const featured=PROJECTS.filter(p=>p.featured);const other=PROJECTS.filter(p=>!p.featured);
  return(
    <Section id="projects" dark theme={theme}>
      <SectionTitle title="Featured Projects" subtitle="Real problems, real data, deployed in production" light theme={theme}/>
      <div style={{display:"flex",flexDirection:"column",gap:32}}>
        {featured.map((p,idx)=>(
          <motion.div key={idx} variants={fadeUp} whileHover={{y:-2,transition:{duration:0.2}}} style={{background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.08)",borderRadius:20,padding:"36px 32px",position:"relative",overflow:"hidden",backdropFilter:"blur(10px)"}}>
            <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:`linear-gradient(90deg,${p.color},${p.color}40,transparent)`}}/>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:16,marginBottom:14}}>
              <div style={{display:"flex",alignItems:"center",gap:14}}>
                <div style={{width:48,height:48,borderRadius:14,background:`${p.color}18`,display:"flex",alignItems:"center",justifyContent:"center",color:p.color}}>{p.icon}</div>
                <div><h3 style={{fontSize:22,fontWeight:700,color:"#fff",margin:"0 0 4px"}}>{p.title}</h3><span style={{fontSize:13,color:"#94a3b8",fontWeight:500}}>{p.subtitle}</span></div>
              </div>
              <div style={{display:"flex",gap:8}}>
                {p.liveUrl&&<a href={p.liveUrl} target="_blank" rel="noreferrer" style={{padding:"8px 18px",background:p.color,color:"#fff",borderRadius:10,fontSize:13,fontWeight:600,textDecoration:"none",display:"flex",alignItems:"center",gap:6,boxShadow:`0 2px 12px ${p.color}40`}}><ExternalLink size={14}/>Live Demo</a>}
                {p.codeUrl&&<a href={p.codeUrl} target="_blank" rel="noreferrer" style={{padding:"8px 18px",background:"rgba(255,255,255,.06)",color:"#e2e8f0",borderRadius:10,fontSize:13,fontWeight:600,textDecoration:"none",display:"flex",alignItems:"center",gap:6,border:"1px solid rgba(255,255,255,.1)"}}><Github size={14}/>Code</a>}
              </div>
            </div>
            <p style={{fontSize:15,color:"#94a3b8",lineHeight:1.7,margin:"0 0 20px",maxWidth:700}}>{p.desc}</p>
            <div style={{display:"flex",flexWrap:"wrap",gap:7,marginBottom:20}}>
              {p.features.map((f,i)=>(<span key={i} style={{display:"flex",alignItems:"center",gap:5,fontSize:12,color:"#cbd5e1",background:"rgba(255,255,255,.04)",padding:"5px 12px",borderRadius:8}}><CheckCircle size={11} color={p.color}/>{f}</span>))}
            </div>
            <div style={{display:"flex",flexWrap:"wrap",gap:7}}>
              {p.tech.map((t,i)=>(<span key={i} style={{fontSize:11,color:p.color,background:`${p.color}12`,padding:"4px 12px",borderRadius:20,fontWeight:600,letterSpacing:"0.3px"}}>{t}</span>))}
            </div>
          </motion.div>
        ))}
      </div>
      <motion.div variants={fadeUp} style={{marginTop:56}}>
        <h3 style={{fontSize:22,fontWeight:700,color:"#fff",textAlign:"center",marginBottom:8}}>Research & Academic Work</h3>
        <p style={{fontSize:14,color:"#64748b",textAlign:"center",marginBottom:28}}>Engineering projects from university and competition teams</p>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:16}}>
          {other.map((p,idx)=>(
            <motion.div key={idx} variants={scaleIn} whileHover={{y:-3,transition:{duration:0.2}}} style={{background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.06)",borderRadius:16,padding:"24px 22px",position:"relative",overflow:"hidden",backdropFilter:"blur(10px)",cursor:"default"}}>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
                <div style={{width:36,height:36,borderRadius:10,background:`${p.color}15`,display:"flex",alignItems:"center",justifyContent:"center",color:p.color}}>{p.icon}</div>
                <div><h4 style={{fontSize:15,fontWeight:700,color:"#fff",margin:0}}>{p.title}</h4><span style={{fontSize:11,color:p.color,fontWeight:600}}>{p.subtitle}</span></div>
              </div>
              <p style={{fontSize:13,color:"#94a3b8",lineHeight:1.7,margin:"0 0 14px"}}>{p.desc}</p>
              <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:(p.codeUrl||p.liveUrl)?14:0}}>
                {p.tech.map((t,i)=>(<span key={i} style={{fontSize:10,color:p.color,background:`${p.color}10`,padding:"3px 10px",borderRadius:12,fontWeight:600}}>{t}</span>))}
              </div>
              {(p.codeUrl||p.liveUrl)&&<div style={{display:"flex",gap:6}}>
                {p.liveUrl&&<a href={p.liveUrl} target="_blank" rel="noreferrer" style={{padding:"6px 12px",background:p.color,color:"#fff",borderRadius:8,fontSize:11,fontWeight:600,textDecoration:"none",display:"flex",alignItems:"center",gap:4}}><ExternalLink size={12}/>Publication</a>}
                {p.codeUrl&&<a href={p.codeUrl} target="_blank" rel="noreferrer" style={{padding:"6px 12px",background:"rgba(255,255,255,.06)",color:"#e2e8f0",borderRadius:8,fontSize:11,fontWeight:600,textDecoration:"none",display:"flex",alignItems:"center",gap:4,border:"1px solid rgba(255,255,255,.1)"}}><Github size={12}/>Code</a>}
              </div>}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Section>
  );
}

function Skills({theme}) {
  return(
    <Section id="skills" alt theme={theme}>
      <SectionTitle title="Skills & Expertise" subtitle="Where engineering discipline meets data-driven thinking" theme={theme}/>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:20,marginBottom:48}}>
        {Object.entries(SKILLS).map(([cat,{icon,color,items}],idx)=>(
          <motion.div key={idx} variants={scaleIn} whileHover={{y:-3,transition:{duration:0.2}}} style={{background:theme.card,borderRadius:18,padding:"28px 24px",transition:"all .3s",cursor:"default"}}>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:18}}>
              <div style={{width:42,height:42,borderRadius:12,background:`${color}12`,display:"flex",alignItems:"center",justifyContent:"center",color}}>{icon}</div>
              <h3 style={{fontSize:15,fontWeight:700,color:theme.text,margin:0}}>{cat}</h3>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              {items.map((s,i)=>(<div key={i} style={{display:"flex",alignItems:"center",gap:8,fontSize:13,color:theme.textSec}}><ChevronRight size={12} color={color} style={{flexShrink:0}}/>{s}</div>))}
            </div>
          </motion.div>
        ))}
      </div>
      <motion.div variants={fadeUp}>
        <h3 style={{fontSize:18,fontWeight:700,color:theme.text,textAlign:"center",marginBottom:20}}>Tools & Technologies</h3>
        <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center",gap:10}}>
          {TOOLS.map((t,i)=>(
            <motion.span key={i} whileHover={{y:-2,transition:{duration:0.15}}} style={{padding:"8px 16px",background:theme.card,borderRadius:10,fontSize:13,fontWeight:600,color:theme.textSec,cursor:"default",display:"flex",alignItems:"center",gap:6,transition:"background .3s"}}>{t.icon} {t.name}</motion.span>
          ))}
        </div>
      </motion.div>
      <motion.div variants={fadeUp} style={{marginTop:48}}>
        <h3 style={{fontSize:18,fontWeight:700,color:theme.text,textAlign:"center",marginBottom:20}}>Certifications</h3>
        <div style={{display:"flex",justifyContent:"center",gap:16,flexWrap:"wrap"}}>
          {[{name:"Six Sigma Green Belt",org:"Lean Six Sigma",icon:<Award size={20}/>,color:"#10b981"},{name:"CSWP",org:"Certified SolidWorks Professional",icon:<Wrench size={20}/>,color:"#f59e0b"}].map((c,i)=>(
            <motion.div key={i} whileHover={{y:-3,transition:{duration:0.2}}} style={{background:theme.card,borderRadius:14,padding:"20px 28px",display:"flex",alignItems:"center",gap:14,cursor:"default",transition:"background .3s"}}>
              <div style={{width:44,height:44,borderRadius:12,background:`${c.color}15`,display:"flex",alignItems:"center",justifyContent:"center",color:c.color}}>{c.icon}</div>
              <div>
                <div style={{fontSize:15,fontWeight:700,color:theme.text}}>{c.name}</div>
                <div style={{fontSize:12,color:theme.textMuted}}>{c.org}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Section>
  );
}

function Experience({theme}) {
  const experiences = [
    {
      title: "Structural Engineer",
      company: "Team Assailing Falcons",
      location: "Vellore, India",
      period: "Oct 2023 - Aug 2024",
      color: "#00ced1",
      achievements: [
        "Analyzed cost-performance trade-offs across design and manufacturing data, reducing machining and fabrication time by 10%",
        "Led cross-functional coordination with 12-member team using lean principles (5S, process mapping), reducing build cycle time by 20%",
        "Managed BOM tracking and procurement timelines across multiple suppliers ensuring on-time delivery with zero stockouts"
      ]
    },
    {
      title: "Cost Engineering Intern",
      company: "Tata Motors",
      location: "Pune, India",
      period: "Aug 2023 - Oct 2023",
      color: "#a78bfa",
      achievements: [
        "Built Excel-based cost analytics dashboard consolidating data from 100+ automated press machines, improving cost visibility by 40%",
        "Performed machine utilization analysis identifying underperforming assets, contributing to 8% reduction in operating expenses",
        "Evaluated material substitution through commodity cost analysis, achieving 12-15% weight reduction and 10% decrease in energy consumption",
        "Integrated procurement and supplier data from 20+ vendors, improving pricing transparency for strategic sourcing"
      ]
    }
  ];

  return (
    <Section id="experience" dark theme={theme}>
      <SectionTitle title="Work Experience" subtitle="Building operational excellence through data and process improvement" light theme={theme}/>
      <div style={{maxWidth:800,margin:"0 auto",position:"relative"}}>
        <div style={{position:"absolute",left:20,top:0,bottom:0,width:2,background:"rgba(255,255,255,.1)"}}/>
        {experiences.map((exp,idx)=>(
          <motion.div key={idx} variants={fadeUp} style={{position:"relative",paddingLeft:56,marginBottom:idx===experiences.length-1?0:40}}>
            <div style={{position:"absolute",left:12,top:6,width:18,height:18,borderRadius:"50%",background:exp.color,border:"3px solid rgba(10,10,20,.8)"}}/>
            <div style={{background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.08)",borderRadius:16,padding:"28px 28px",backdropFilter:"blur(10px)"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:12,marginBottom:16}}>
                <div>
                  <h3 style={{fontSize:20,fontWeight:700,color:"#fff",margin:"0 0 4px"}}>{exp.title}</h3>
                  <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
                    <span style={{fontSize:14,color:exp.color,fontWeight:600}}>{exp.company}</span>
                    <span style={{width:4,height:4,borderRadius:2,background:"#475569"}}/>
                    <span style={{fontSize:13,color:"#94a3b8"}}>{exp.location}</span>
                  </div>
                </div>
                <div style={{display:"flex",alignItems:"center",gap:6,background:"rgba(255,255,255,.05)",padding:"6px 12px",borderRadius:8}}>
                  <Calendar size={14} color="#94a3b8"/>
                  <span style={{fontSize:13,color:"#94a3b8",fontWeight:500}}>{exp.period}</span>
                </div>
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:10}}>
                {exp.achievements.map((a,i)=>(
                  <div key={i} style={{display:"flex",alignItems:"flex-start",gap:10}}>
                    <ChevronRight size={14} color={exp.color} style={{flexShrink:0,marginTop:3}}/>
                    <span style={{fontSize:14,color:"#c4c6e0",lineHeight:1.6}}>{a}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

function ResumeSection({theme}) {
  return(
    <section id="resume" style={{padding:"80px 24px",background:`linear-gradient(135deg,${theme.heroGrad1},${theme.heroGrad2})`}}>
      <div style={{maxWidth:700,margin:"0 auto",textAlign:"center"}}>
        <motion.div initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}}>
          <Terminal size={36} color="#a78bfa" style={{marginBottom:20}}/>
          <h2 style={{fontSize:32,fontWeight:800,color:"#fff",margin:"0 0 16px"}}>Want the Full Picture?</h2>
          <p style={{fontSize:16,color:"#94a3b8",lineHeight:1.8,marginBottom:36}}>Work experience at Tata Motors and Team Assailing Falcons. Academic projects in cold chain analytics, process optimization, and CFD simulation. Coursework spanning Operations Research, Supply Chain Management, and Quality Engineering.</p>
          <div style={{display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap"}}>
            <a href="/resume.pdf" download style={{padding:"14px 30px",background:"linear-gradient(135deg,#6c5ce7,#a78bfa)",color:"#fff",borderRadius:14,fontSize:15,fontWeight:600,textDecoration:"none",display:"flex",alignItems:"center",gap:8,boxShadow:"0 4px 24px rgba(108,92,231,.4)"}}><Download size={18}/>Download Resume</a>
            <a href="https://www.linkedin.com/in/vansh-singh1203" target="_blank" rel="noreferrer" style={{padding:"14px 30px",background:"rgba(255,255,255,.06)",color:"#e2e8f0",borderRadius:14,fontSize:15,fontWeight:600,textDecoration:"none",display:"flex",alignItems:"center",gap:8,border:"1px solid rgba(255,255,255,.12)"}}><Linkedin size={18}/>LinkedIn</a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Contact({theme}) {
  const[form,setForm]=useState({name:"",email:"",message:""});const[status,setStatus]=useState(null);const[sending,setSending]=useState(false);
  const submit=async(e)=>{e.preventDefault();setSending(true);try{const res=await fetch("https://formspree.io/f/mqeywzye",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(form)});if(res.ok){setStatus("sent");setForm({name:"",email:"",message:""});}else setStatus("error");}catch{setStatus("error");}setSending(false);};
  const inp={width:"100%",padding:"12px 16px",border:`1px solid ${theme.inputBorder}`,borderRadius:12,fontSize:14,outline:"none",boxSizing:"border-box",background:theme.inputBg,color:theme.text,transition:"all .3s"};
  return(
    <Section id="contact" alt theme={theme}>
      <SectionTitle title="Get In Touch" subtitle="Open to supply chain, operations, and analytics opportunities" theme={theme}/>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:36,maxWidth:900,margin:"0 auto"}}>
        <motion.div variants={fadeUp}>
          <h3 style={{fontSize:20,fontWeight:700,color:theme.text,margin:"0 0 14px"}}>Let's Connect</h3>
          <p style={{fontSize:15,color:theme.textMuted,lineHeight:1.7,margin:"0 0 24px"}}>Whether you have an internship opportunity, want to discuss supply chain analytics, or just want to say hi — I'd love to hear from you.</p>
          <div style={{display:"flex",flexDirection:"column",gap:12}}>
            {[{icon:<Mail size={18}/>,label:"singh.v2@northeastern.edu",href:"mailto:singh.v2@northeastern.edu"},{icon:<Linkedin size={18}/>,label:"linkedin.com/in/vansh-singh1203",href:"https://www.linkedin.com/in/vansh-singh1203"},{icon:<Github size={18}/>,label:"github.com/Vanshsingh1203",href:"https://github.com/Vanshsingh1203"}].map((l,i)=>(
              <motion.a key={i} href={l.href} target="_blank" rel="noreferrer" whileHover={{x:4,transition:{duration:0.15}}} style={{display:"flex",alignItems:"center",gap:12,padding:"14px 18px",background:theme.card,borderRadius:14,textDecoration:"none",color:theme.textSec,fontSize:14,fontWeight:500,transition:"background .3s"}}><span style={{width:36,height:36,borderRadius:10,background:theme.accentGlow,display:"flex",alignItems:"center",justifyContent:"center",color:"#a78bfa"}}>{l.icon}</span>{l.label}</motion.a>
            ))}
          </div>
        </motion.div>
        <motion.div variants={fadeUp}>
          {status==="sent"?(<div style={{background:theme.card,borderRadius:20,padding:44,textAlign:"center",transition:"background .4s"}}><CheckCircle size={44} color="#10b981" style={{marginBottom:16}}/><h3 style={{fontSize:20,fontWeight:700,color:"#10b981",margin:"0 0 8px"}}>Message Sent!</h3><p style={{fontSize:14,color:theme.textMuted,margin:0}}>I'll get back to you soon.</p></div>):(
            <div style={{background:theme.card,borderRadius:20,padding:"32px 28px",transition:"background .4s"}}>
              <div style={{display:"flex",flexDirection:"column",gap:14}}>
                {[{label:"Name",key:"name",type:"text",placeholder:"Your name"},{label:"Email",key:"email",type:"email",placeholder:"your@email.com"}].map(f=>(<div key={f.key}><label style={{fontSize:13,fontWeight:600,color:theme.textSec,display:"block",marginBottom:6}}>{f.label}</label><input type={f.type} value={form[f.key]} onChange={e=>setForm({...form,[f.key]:e.target.value})} placeholder={f.placeholder} style={inp}/></div>))}
                <div><label style={{fontSize:13,fontWeight:600,color:theme.textSec,display:"block",marginBottom:6}}>Message</label><textarea value={form.message} onChange={e=>setForm({...form,message:e.target.value})} placeholder="Tell me about the opportunity..." rows={4} style={{...inp,resize:"vertical",fontFamily:"inherit"}}/></div>
                <button onClick={submit} disabled={sending||!form.name||!form.email||!form.message} style={{padding:"13px",background:sending?"#94a3b8":"linear-gradient(135deg,#6c5ce7,#a78bfa)",color:"#fff",border:"none",borderRadius:12,fontSize:15,fontWeight:600,cursor:sending?"not-allowed":"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8,boxShadow:sending?"none":"0 4px 24px rgba(108,92,231,.3)"}}>{sending?"Sending...":<><Send size={18}/>Send Message</>}</button>
                {status==="error"&&<p style={{fontSize:13,color:"#dc2626",margin:0}}>Something went wrong. Try emailing me directly.</p>}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </Section>
  );
}

function Footer({theme}) {
  return(
    <footer style={{background:theme.heroGrad1,borderTop:`1px solid ${theme.border}`,padding:"32px 24px",textAlign:"center",transition:"background .4s"}}>
      <div style={{display:"flex",justifyContent:"center",gap:16,marginBottom:14}}>
        {[{icon:<Github size={18}/>,href:"https://github.com/Vanshsingh1203"},{icon:<Linkedin size={18}/>,href:"https://www.linkedin.com/in/vansh-singh1203"},{icon:<Mail size={18}/>,href:"mailto:singh.v2@northeastern.edu"}].map((l,i)=>(
          <a key={i} href={l.href} target="_blank" rel="noreferrer" style={{width:40,height:40,borderRadius:12,background:"rgba(255,255,255,.05)",display:"flex",alignItems:"center",justifyContent:"center",color:"#94a3b8",textDecoration:"none"}}>{l.icon}</a>
        ))}
      </div>
      <p style={{fontSize:13,color:"#475569",margin:0}}>Designed & Built by Vansh Singh · {new Date().getFullYear()}</p>
    </footer>
  );
}

export default function App() {
  const[activeSection,setActiveSection]=useState("");
  const[dark,setDark]=useState(()=>{try{return localStorage.getItem("vs-dark")==="true";}catch(e){return false;}});
  const theme=dark?DARK:LIGHT;
  const toggleDark=()=>setDark(p=>{const n=!p;try{localStorage.setItem("vs-dark",n);}catch(e){}return n;});

  useEffect(()=>{const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting)setActiveSection(e.target.id);});},{threshold:0.3});NAV.forEach(n=>{const el=document.getElementById(n.toLowerCase());if(el)obs.observe(el);});return()=>obs.disconnect();},[]);

  return(
    <div style={{fontFamily:"'Inter','Segoe UI',system-ui,sans-serif",transition:"background .4s"}}>
      <Header activeSection={activeSection} theme={theme} dark={dark} toggleDark={toggleDark}/>
      <Hero theme={theme}/>
      <About theme={theme}/>
      <Projects theme={theme} dark={dark}/>
      <Skills theme={theme}/>
      <Experience theme={theme}/>
      <ResumeSection theme={theme}/>
      <Contact theme={theme}/>
      <Footer theme={theme}/>
    </div>
  );
}