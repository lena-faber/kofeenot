"use client";
import { useState, createContext, useContext, type ReactNode } from "react";
import { LeadModal } from "./lead-modal";

type Ctx = {
  openSample: (source?: string) => void;
  openQuote: (source?: string) => void;
};
const LeadCtx = createContext<Ctx | null>(null);

export function useLeads() {
  const ctx = useContext(LeadCtx);
  if (!ctx) throw new Error("useLeads must be used within LeadProvider");
  return ctx;
}

export function LeadProvider({ children }: { children: ReactNode }) {
  const [sample, setSample] = useState<{ open: boolean; source?: string }>({ open: false });
  const [quote, setQuote] = useState<{ open: boolean; source?: string }>({ open: false });

  return (
    <LeadCtx.Provider
      value={{
        openSample: (source) => setSample({ open: true, source }),
        openQuote: (source) => setQuote({ open: true, source }),
      }}
    >
      {children}
      <LeadModal type="sample" open={sample.open} source={sample.source}
        onOpenChange={(v) => setSample((s) => ({ ...s, open: v }))} />
      <LeadModal type="quote" open={quote.open} source={quote.source}
        onOpenChange={(v) => setQuote((s) => ({ ...s, open: v }))} />
    </LeadCtx.Provider>
  );
}
