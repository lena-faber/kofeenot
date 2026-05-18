"use client";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, FileText, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLeads } from "./lead-provider";
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import logo from "@/assets/kofeenot-logo.jpg";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { openQuote } = useLeads();
  return (
    <header className="sticky top-0 z-[100] isolate pointer-events-auto bg-black/40 backdrop-blur-md text-white border-b border-white/5">
      <div className="relative z-10 mx-auto max-w-[1320px] px-4 lg:px-6 h-16 flex items-center justify-between gap-4 pointer-events-auto">
        <Link to="/" className="relative z-20 flex items-center gap-4 group pointer-events-auto">
          <img src={logo} alt="Kofeᵉ̬Not" className="h-8 w-auto rounded-sm transition group-hover:scale-105" />
          <span className="hidden sm:block text-[11px] uppercase tracking-[0.2em] text-[color:var(--neon)] font-bold leading-tight">
            Make your laptop coffeeshop-friendly™
          </span>
        </Link>

        <nav className="relative z-20 hidden md:flex items-center gap-7 text-sm pointer-events-auto">
          <a href="/#why" className="hover:text-[color:var(--neon)] transition">Why It Sells</a>
          <a href="/#specs" className="hover:text-[color:var(--neon)] transition">Specs</a>
          <a href="/#pricing" className="hover:text-[color:var(--neon)] transition">Pricing</a>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 hover:text-[color:var(--neon)] transition outline-none">
              Spec Sheet <ChevronDown className="h-3.5 w-3.5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-black neon-border">
              <DropdownMenuItem asChild>
                <Link to="/spec" className="cursor-pointer"><FileText className="h-4 w-4 mr-2" />View online</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a href="/kofeenot-spec.pdf" download className="cursor-pointer">
                  <FileText className="h-4 w-4 mr-2" />Download PDF
                </a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        <div className="relative z-20 flex items-center gap-2 pointer-events-auto">
          <Button
            onClick={() => openQuote("header")}
            className="bg-[color:var(--neon)] text-black hover:bg-[color:var(--neon-dim)] font-bold hidden sm:inline-flex"
          >
            Request a Quote
          </Button>
          <button
            className="md:hidden p-2 rounded border border-[rgba(0,255,0,0.25)]"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="relative z-20 md:hidden border-t border-[rgba(0,255,0,0.18)] bg-black pointer-events-auto">
          <div className="px-4 py-4 grid gap-3 text-sm">
            <a href="/#why" onClick={() => setOpen(false)}>Why It Sells</a>
            <a href="/#specs" onClick={() => setOpen(false)}>Specs</a>
            <a href="/#pricing" onClick={() => setOpen(false)}>Pricing</a>
            <Link to="/spec" onClick={() => setOpen(false)}>Spec Sheet</Link>
            <a href="/kofeenot-spec.pdf" download onClick={() => setOpen(false)}>Download spec PDF</a>
            <Button
              onClick={() => { setOpen(false); openQuote("mobile-nav"); }}
              className="bg-[color:var(--neon)] text-black hover:bg-[color:var(--neon-dim)] font-bold"
            >
              Request a Quote
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-[rgba(0,255,0,0.18)] mt-20">
      <div className="mx-auto max-w-[1320px] px-4 lg:px-6 py-10 text-center text-sm text-muted-foreground space-y-3">
        <p className="text-foreground">
          <strong>© 2026 Kofeᵉ̬Not: Make Your Laptop Coffee Shop-Friendly.</strong> Patent Pending. Made in California.
        </p>
        <p>
          Samples • Bulk Cases • OEM Runs{" "}
          <a className="text-[color:var(--neon)] hover:underline" href="mailto:info@kofeenot.com">
            info@kofeenot.com
          </a>{" "}
          | Volume tiers: samples, bulk cases, OEM custom runs.
        </p>
        <p className="text-xs">
          RoHS Compliant | Patent Pending | KofeNot: Make Your Laptop CoffeeShop-Friendly™ Trademark
        </p>
      </div>
    </footer>
  );
}
