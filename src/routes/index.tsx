"use client";
import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";
import { Play, ArrowRight, Sparkles, Zap, Eye, RotateCcw, Truck, Shield, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useLeads } from "@/components/lead-provider";

import corp from "@/assets/kofeenot-corp.jpeg";
import giftBox from "@/assets/kofeenot-gift.jpg";
import masterCase from "@/assets/kofeenot-pack.jpeg";
import deadSpill from "@/assets/dead-spill.jpg";
import safeSpill from "@/assets/safe-spill.jpeg";
import neck from "@/assets/kofeenot-neck.jpg";
import mechanics from "@/assets/kofeenot-mechanics.jpg";
import tilt from "@/assets/kofeenot-tilt.jpg";
import fidget from "@/assets/kofeenot-fidget.jpg";
import brand from "@/assets/kofeenot-brand.jpg";
import demoVideo from "@/assets/kofeenot-demo.mp4";

export const Route = createFileRoute("/")({
  component: Home,
});

function CountUp({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1200;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);
  return <span ref={ref}>{n.toLocaleString()}{suffix}</span>;
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      className="relative z-10 pointer-events-auto"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Home() {
  const { openSample, openQuote } = useLeads();
  const [videoOpen, setVideoOpen] = useState(false);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  const openCheckout = (url: string) => {
    const width = Math.min(920, window.screen.availWidth - 48);
    const height = Math.min(760, window.screen.availHeight - 48);
    const left = Math.max(0, Math.round((window.screen.availWidth - width) / 2));
    const top = Math.max(0, Math.round((window.screen.availHeight - height) / 2));
    const checkoutWindow = window.open(
      url,
      "kofeenot_stripe_checkout",
      `popup=yes,width=${width},height=${height},left=${left},top=${top},noopener,noreferrer`,
    );

    if (checkoutWindow) {
      checkoutWindow.focus();
      return;
    }

    setCheckoutUrl(url);
  };


  return (
    <>
      {/* HERO */}
      <section ref={heroRef} className="relative isolate overflow-hidden bg-black -mt-16 pt-16">
        {/* Background product image */}
        <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
          <img
            src={corp}
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-black/60" />
        </div>

        <div className="relative z-10 mx-auto max-w-[1320px] px-4 lg:px-6 pt-8 pb-8 lg:pt-10 lg:pb-10 pointer-events-auto flex flex-col">
          {/* Eyebrow */}
          <Reveal>
            <div className="inline-block px-5 py-2.5 border border-white/15 bg-black/40 backdrop-blur-sm">
              <span className="text-[11px] uppercase tracking-[0.22em] font-black text-white">
                OEM / White-Label Ready • IP Holder • FOB California
              </span>
            </div>
          </Reveal>

          {/* Headline */}
          <Reveal delay={0.05}>
            <h1 className="mt-8 text-6xl md:text-7xl lg:text-8xl font-black italic leading-[0.95] tracking-tight neon-text drop-shadow-[0_0_30px_rgba(0,255,0,0.35)]">
              A Wedge.<br />
              Saves $1,000+<br />
              Hardware
            </h1>
          </Reveal>

          {/* Chip */}
          <Reveal delay={0.1}>
            <div className="mt-6 inline-block">
              <span className="text-[11px] uppercase tracking-[0.22em] font-black text-white">
                No Magnets • No Adhesives
              </span>
            </div>
          </Reveal>

          {/* Stat cards */}
          <Reveal delay={0.15}>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-xl">
              {[
                { big: "1 oz", small: "Flat-Folding", greenSmall: false },
                { big: "365 days", small: "Visibility", greenSmall: false },
                { big: "3-in-1", small: "Laptops Phones Tablets", greenSmall: false },
              ].map((p) => (
                <div
                  key={p.big}
                  className="group px-1 py-2 text-center bg-black/40 backdrop-blur-sm border border-[rgba(0,255,0,0.4)] hover:border-[color:var(--neon)] transition-colors"
                >
                  <div className="text-2xl md:text-[26px] font-black leading-tight neon-text">
                    {p.big}
                  </div>
                  {p.small && (
                    <div className={`mt-0.5 text-[11px] uppercase tracking-[0.2em] font-bold leading-snug ${p.greenSmall ? "neon-text" : "text-white"}`}>
                      {p.small}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Reveal>

          {/* CTAs */}
          <Reveal delay={0.2}>
            <div className="relative z-20 mt-8 flex flex-wrap items-center gap-8 pointer-events-auto">
              <button
                onClick={() => setVideoOpen(true)}
                className="flex items-center gap-3 text-[color:var(--neon)] font-black uppercase tracking-[0.18em] text-base md:text-lg hover:opacity-80 transition"
              >
                <Play className="h-6 w-6 fill-current" />
                Watch 2-Sec Setup
              </button>
            </div>
          </Reveal>
        </div>

        {/* Floating right-side overlay */}
        <div className="hidden lg:block absolute bottom-20 right-6 z-20 max-w-xs bg-black/85 backdrop-blur-sm border border-white/10 p-5 pointer-events-auto">
          <div className="text-white font-bold text-base leading-snug">A promo product with real staying power</div>
          <p className="mt-2 text-sm text-muted-foreground leading-snug">Daily utility keeps the product and your branding in constant view.</p>
        </div>

        {/* MARQUEE */}
        <div className="relative z-10 border-y border-[rgba(0,255,0,0.18)] bg-black/60 overflow-hidden">
          <div className="marquee flex gap-12 whitespace-nowrap py-3 text-sm uppercase tracking-[0.25em] text-muted-foreground">
            {Array.from({ length: 2 }).map((_, k) => (
              <div key={k} className="flex gap-12 shrink-0">
                {["Promo Agencies", "Tech Conferences", "Cafés & Co-Working", "Enterprise IT", "OEM Runs", "White-Label Programs", "Private Label", "Branded Bulk"].map((t) => (
                  <span key={t} className="flex items-center gap-3">
                    <span className="text-[color:var(--neon)]">◆</span>{t}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY */}
      <section id="why" className="mx-auto max-w-[1320px] px-4 lg:px-6 py-20">
        <Reveal>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight">Why Promo Buyers Choose <span className="neon-text">KOFEᵉ̬NOT</span></h2>
          <p className="text-muted-foreground mt-3">Six reasons this scales fast</p>
        </Reveal>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { icon: Zap, t: "Easy Math", d: "A $3 unit prevents $1,000+ hardware losses. Easy approval for IT, procurement, and HR." },
            { icon: Check, t: "Easy to Deploy", d: "No magnets. No adhesives. No setup. One-motion install works with most laptops, phones, and tablets." },
            { icon: Eye, t: "Easy to See", d: "Logo stays visible during daily use faced outwards. Not buried in packaging, drawers, or swag bags." },
            { icon: RotateCcw, t: "Easy to Reorder", d: "Simple volume scaling: samples → events → OEM. Built for repeat agency and enterprise orders." },
            { icon: Truck, t: "Easy to Ship", d: "Flat-folding pocket-size design. Lightweight bulk deployment. Fast California dispatch for events and onboarding." },
            { icon: Shield, t: "Deflects Spills", d: "Hinge-first incline redirects liquid away from keyboard electronics. Buys a golden minute critical reaction time during spills." },
          ].map((f, i) => (
            <Reveal key={f.t} delay={i * 0.05}>
              <div className="panel panel-hover rounded-sm p-6 h-full transition-all hover:-translate-y-1">
                <f.icon className="h-6 w-6 text-[color:var(--neon)] mb-3" />
                <h3 className="text-lg font-bold">{f.t}</h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed whitespace-pre-line">{f.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* THREE WINS */}
      <section className="mx-auto max-w-[1320px] px-4 lg:px-6 py-20 border-t border-[rgba(0,255,0,0.12)]">
        <Reveal>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight">One Small Wedge. <span className="neon-text">Three Big Wins</span></h2>
        </Reveal>
        <div className="mt-10 grid md:grid-cols-3 gap-5">
          {[
            { img: deadSpill, label: "Dead spill", text: "Flat laptops trap liquid through the keyboard into the motherboard. One spill can mean a full replacement." },
            { img: safeSpill, label: "Safe spill", text: "Hinge-first incline redirects liquid away from critical components. Buys reaction time during accidents." },
            { img: neck, label: "Better Posture", text: "Raised screen angle helps reduce neck strain during daily laptop use." },
          ].map((u, i) => (
            <Reveal key={u.label} delay={i * 0.08}>
              <article className="panel rounded-sm overflow-hidden group">
                <div className="bg-black aspect-square overflow-hidden">
                  <img src={u.img} alt={u.label} className="w-full h-full object-cover transition group-hover:scale-[1.02]" />
                </div>
                <div className="p-5">
                  <p className="text-sm leading-relaxed">
                    <strong className="text-[color:var(--neon)]">{u.label}:</strong> {u.text}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mx-auto max-w-[1320px] px-4 lg:px-6 py-20 border-t border-[rgba(0,255,0,0.12)]">
        <Reveal>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight">
            How It Works: <span className="neon-text">Open › Rest › Snap</span>
          </h2>
        </Reveal>
        <div className="mt-10 grid md:grid-cols-3 gap-5">
          {[
            { n: "01", t: "Open Laptop All the Way", d: "Feel for the rear hinge." },
            { n: "02", t: "Rest Rear Hinge on Wedge", d: "Works with open-trench hinges. Flip wedge for closed-angle hinges." },
            { n: "03", t: "Snap Shut. Weirdly Addictive.", d: "A satisfying mechanical click users keep repeating." },
          ].map((s, i) => (
            <Reveal key={s.n} delay={i * 0.1}>
              <div className="relative panel rounded-sm p-7 h-full">
                <div className="text-6xl font-black neon-text leading-none">{s.n}</div>
                <h3 className="mt-4 text-xl font-bold">{s.t}</h3>
                <p className="text-sm text-muted-foreground mt-2">{s.d}</p>
                <div className="absolute top-7 right-7 h-1 w-12 bg-[color:var(--neon)]" />
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          {[
            { img: mechanics, c: "Hinge-first wedge design" },
            { img: tilt, c: "Mac + PC Compatible" },
            { img: fidget, c: "Tactile click desk fidget" },
          ].map((g) => (
            <div key={g.c} className="panel rounded-sm overflow-hidden">
              <div className="bg-black aspect-square overflow-hidden">
                <img src={g.img} alt={g.c} className="w-full h-full object-cover" />
              </div>
              <div className="p-3 text-xs uppercase tracking-[0.18em] text-muted-foreground text-center">{g.c}</div>
            </div>
          ))}
        </div>
      </section>

      {/* BRANDING */}
      <section className="mx-auto max-w-[1320px] px-4 lg:px-6 py-20 border-t border-[rgba(0,255,0,0.12)]">
        <Reveal>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight">Built for <span className="neon-text">Branded Bulk Deployment</span></h2>
          <p className="text-muted-foreground mt-3">Logo-ready • bulk pricing • FOB California</p>
        </Reveal>
        <div className="mt-10 grid md:grid-cols-2 gap-6 items-stretch">
          <Reveal>
            <div className="relative bg-[#080808] border border-[#1a1a1a] border-l-2 border-l-[color:var(--neon)] rounded-sm p-10 md:p-12 h-full flex flex-col overflow-hidden">
              <div className="flex items-center gap-3 mb-10">
                <span className="h-px w-8 bg-[color:var(--neon)]" />
                <span className="text-[color:var(--neon)] text-[10px] uppercase tracking-[0.3em] font-mono">Standard Specification</span>
              </div>

              <h3 className="text-white text-3xl md:text-4xl font-black leading-[1.05] tracking-tight uppercase mb-12">
                Branding That <span className="text-[color:var(--neon)]">Gets Seen</span>, Heard, and Felt
              </h3>

              <div className="flex-1">
                {[
                  { t: "2.0\" × 1.6\" Branding Zone", d: "Built for custom logo application." },
                  { t: "Always Visible", d: "Your logo stays outward-facing during laptop use." },
                  { t: "Your Brand in Every Snap", d: "Every snap shut catches attention from new eyes nearby." },
                ].map((i, idx) => (
                  <div key={i.t} className={`flex gap-6 py-6 border-t border-[#1a1a1a] ${idx === 2 ? "border-b" : ""}`}>
                    <div className="text-[color:var(--neon)] text-xs font-mono shrink-0 pt-1">{String(idx + 1).padStart(2, "0")}</div>
                    <div>
                      <h4 className="text-white text-base font-bold tracking-tight uppercase">{i.t}</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed mt-1.5">{i.d}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex justify-between items-center">
                <div className="text-[9px] text-zinc-600 uppercase tracking-[0.3em] font-mono">System Code: BR-ND-001</div>
                <div className="flex gap-1">
                  <div className="w-1 h-1 bg-[color:var(--neon)]" />
                  <div className="w-1 h-1 bg-[color:var(--neon)]/40" />
                  <div className="w-1 h-1 bg-[color:var(--neon)]/10" />
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="panel rounded-sm overflow-hidden h-full flex flex-col">
              <div className="bg-black flex-1 flex items-center justify-center min-h-0">
                <img src={brand} alt="Branded Kofeᵉ̬not" className="w-full h-full object-contain" />
              </div>
              <div className="p-4 text-center text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Ships Blank / Ready for Decoration
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SPECS */}
      <section id="specs" className="mx-auto max-w-[1320px] px-4 lg:px-6 py-20 border-t border-[rgba(0,255,0,0.12)]">
        <Reveal>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight">Technical <span className="neon-text">Specifications</span></h2>
          <p className="text-muted-foreground mt-3">Patent-Pending Geometry</p>
        </Reveal>
        <div className="mt-10 panel rounded-sm overflow-hidden">
          <table className="w-full text-sm">
            <tbody>
              {[
                ["Material", "High-Impact RoHS-Compliant ABS"],
                ["Weight Per Unit", "1 oz"],
                ["Folded Size", "3.4\" L × 2.4\" W × 0.4\" H"],
                ["Branding Area", "2.0\" L × 1.6\" W • front-facing flat branding surface"],
                ["Construction", "Pure mechanical design • zero adhesives • zero magnets"],
                ["Compatible Devices", "Most laptops, tablets, phones"],
                ["Ergonomics", "Posture support • spill deflection"],
                ["Production Status", "FOB California • OEM ready"],
                ["IP Status", "Utility patent pending • KofeNot™: Make Your Laptop Coffee-Shop Friendly™ trademark pending"],
              ].map(([k, v]) => (
                <tr key={k} className="border-b border-[rgba(0,255,0,0.12)] last:border-0">
                  <td className="px-5 py-4 text-[color:var(--neon)] font-bold uppercase text-xs tracking-wider w-1/3">{k}</td>
                  <td className="px-5 py-4">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="relative z-20 mt-5 flex flex-wrap gap-3 pointer-events-auto">
          <a href="/kofeenot-spec.pdf" download>
            <Button variant="outline" className="border-[rgba(0,255,0,0.45)] hover:bg-[rgba(0,255,0,0.08)] hover:text-[color:var(--neon)]">
              Download spec sheet (PDF)
            </Button>
          </a>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="mx-auto max-w-[1320px] px-4 lg:px-6 py-20 border-t border-[rgba(0,255,0,0.12)]">
        <Reveal>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight">Retail • Café • <span className="neon-text">OEM</span></h2>
          <p className="text-muted-foreground mt-3">24-48h dispatch • FOB SF Bay Area, CA, US</p>
        </Reveal>
        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { vol: "2-Unit Gift Box", price: "$30", detail: "US shipping included • Professional evaluation set
Gift-ready packaging", sub: "Credited toward OEM order", cta: "Buy now", action: "url" as const, source: "price-2pack", url: "https://buy.stripe.com/fZufZg5YqbWA3g4gcsdUY0B" },
            { vol: "20 2-Unit Gift Boxes min", price: "$480", detail: "Pre-packed in 2-unit gift boxes •
Ideal for corporate gifting", sub: "Expedited shipping available", cta: "Buy now", action: "url" as const, source: "price-20pack", url: "https://buy.stripe.com/00w3cu4Um8Ko7wk0dudUY0C" },
            { vol: "1 pack or 1 case min", price: "Bulk OEM", detail: "100-Unit Pack or 400 Units Master Case (25 lb)", sub: "Ships raw for custom branding", cta: "Request Pricing", action: "quote" as const, source: "price-oem", featured: true },
            { vol: "OEM Manufacturing • Private Label • Licensing", price: "Enterprise", detail: "Full Pantone color matching • Custom logo molding & tooling • Bespoke retail-ready packaging", sub: "Global DDP freight & Logistics", cta: "Request Quote", action: "quote" as const, source: "price-enterprise" },
          ].map((p, i) => (
            <Reveal key={p.vol} delay={i * 0.05}>
              <div className={`rounded-sm p-6 h-full flex flex-col ${p.featured ? "neon-border bg-[rgba(0,255,0,0.06)] neon-glow" : "panel panel-hover"}`}>
                <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{p.vol}</div>
                <div className="text-3xl font-black mt-3 neon-text">{p.price}</div>
                {p.detail && <div className="text-sm mt-2">{p.detail}</div>}
                {p.sub && <p className="text-xs text-muted-foreground mt-2">{p.sub}</p>}
                <div className="flex-1" />
                <Button
                  onClick={() => {
                    if (p.action === "url" && "url" in p && p.url) {
                      openCheckout(p.url);
                    } else if (p.action === "quote") {

                      openQuote(p.source);
                    }
                  }}
                  className="mt-5 bg-[color:var(--neon)] text-black hover:bg-[color:var(--neon-dim)] font-bold"
                >

                  {p.cta}
                </Button>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-8 grid md:grid-cols-2 gap-4 items-stretch">
          {[
            { img: giftBox, c: "KOFEᵉ̬NOT in gift box" },
            { img: masterCase, c: "KOFEᵉ̬NOT pack in master case" },
          ].map((g) => (
            <div key={g.c} className="panel rounded-sm overflow-hidden flex flex-col">
              <div className="bg-black flex-1">
                <img src={g.img} alt={g.c} className="w-full h-full object-cover" />
              </div>
              <div className="p-3 text-xs uppercase tracking-[0.18em] text-muted-foreground text-center">{g.c}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-[1320px] px-4 lg:px-6 py-16">
        <Reveal>
          <div className="neon-border bg-[rgba(0,255,0,0.04)] rounded-sm text-center p-10 md:p-16 neon-glow">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">Break Through <span className="neon-text">Swag Noise</span></h2>
            <p className="text-muted-foreground mt-3">With Product People Actually Use</p>
            <p className="text-muted-foreground">Scale from sample to OEM production fast</p>
            <p className="mt-5 text-lg">Built for promo agencies, cafés, and OEM runs</p>
            <div className="relative z-20 mt-8 flex flex-wrap justify-center gap-3 pointer-events-auto">
              <Button
                onClick={() => openQuote("bottom-cta")}
                className="bg-[color:var(--neon)] text-black hover:bg-[color:var(--neon-dim)] font-bold h-12 px-8"
              >
                Request sample + quote <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                onClick={() => openSample("bottom-cta")}
                className="border-[rgba(0,255,0,0.45)] hover:bg-[rgba(0,255,0,0.08)] hover:text-[color:var(--neon)] h-12 px-8"
              >
                Buy a sample
              </Button>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Counters */}
      <section className="mx-auto max-w-[1320px] px-4 lg:px-6 pb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { v: 1000, s: "+", l: "$ saved per unit" },
            { v: 24, s: "h", l: "Dispatch time" },
            { v: 100, s: "%", l: "RoHS compliant" },
            { v: 3, s: ".5yr", l: "Desk presence" },
          ].map((c) => (
            <div key={c.l} className="panel rounded-sm p-6 text-center">
              <div className="text-3xl md:text-4xl font-black neon-text">
                <CountUp value={c.v} />{c.s}
              </div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground mt-2">{c.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Video Modal */}
      <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
        <DialogContent className="max-w-3xl bg-black neon-border p-2">
          <video src={demoVideo} controls autoPlay playsInline className="w-full rounded-sm" />
        </DialogContent>
      </Dialog>

       {/* Stripe Checkout Fallback Modal */}
      <Dialog open={!!checkoutUrl} onOpenChange={(o) => !o && setCheckoutUrl(null)}>
        <DialogContent className="max-w-md bg-black neon-border p-8 text-center">
          <h3 className="text-2xl font-black neon-text">Secure checkout</h3>
          <p className="mt-3 text-sm text-muted-foreground">
            Stripe checkout opens in its own secure payment window.
          </p>
          <Button
            onClick={() => checkoutUrl && (window.location.href = checkoutUrl)}
            className="mt-6 bg-[color:var(--neon)] text-black hover:bg-[color:var(--neon-dim)] font-bold"
          >
            Continue to checkout <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}

     
