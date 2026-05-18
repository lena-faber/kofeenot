"use client";
import { useState } from "react";
import { useForm, type UseFormReturn, type FieldValues, type Path } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Loader2, CheckCircle2 } from "lucide-react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { submitLead } from "@/lib/leads.functions";

const sampleSchema = z.object({
  company: z.string().trim().min(1, "Required").max(200),
  name: z.string().trim().min(1, "Required").max(120),
  email: z.string().trim().email("Invalid email").max(255),
  quantity: z.string().trim().min(1, "Required").max(120),
  country: z.string().trim().min(1, "Required").max(120),
  notes: z.string().trim().max(2000).optional(),
});
type SampleValues = z.infer<typeof sampleSchema>;

const quoteSchema = z.object({
  company: z.string().trim().min(1, "Required").max(200),
  role: z.string().trim().max(120).optional(),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().max(60).optional(),
  quantity: z.string().trim().min(1, "Required").max(120),
  branding_method: z.string().trim().max(120).optional(),
  in_hands_date: z.string().trim().max(60).optional(),
  destination: z.string().trim().max(200).optional(),
  notes: z.string().trim().max(2000).optional(),
  send_spec: z.boolean().optional(),
});
type QuoteValues = z.infer<typeof quoteSchema>;

type Props = {
  type: "sample" | "quote";
  open: boolean;
  onOpenChange: (v: boolean) => void;
  source?: string;
};

export function LeadModal(props: Props) {
  return props.type === "sample" ? <SampleDialog {...props} /> : <QuoteDialog {...props} />;
}

function Shell({
  title, description, open, onOpenChange, done, onReset, children,
}: {
  title: string; description: string;
  open: boolean; onOpenChange: (v: boolean) => void;
  done: boolean; onReset: () => void;
  children: React.ReactNode;
}) {
  return (
    <Dialog open={open} onOpenChange={(v) => { onOpenChange(v); if (!v) setTimeout(onReset, 250); }}>
      <DialogContent className="max-w-lg bg-black neon-border text-foreground max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold tracking-tight">{title}</DialogTitle>
          <DialogDescription className="text-muted-foreground">{description}</DialogDescription>
        </DialogHeader>
        {done ? (
          <div className="flex flex-col items-center py-8 text-center">
            <CheckCircle2 className="h-14 w-14 mb-3" style={{ color: "#00ff00" }} />
            <h3 className="text-xl font-bold neon-text">You're in.</h3>
            <p className="text-muted-foreground mt-2 text-sm">
              We'll reach out within 24 hours from info@kofeenot.com.
            </p>
            <Button className="mt-6 bg-[color:var(--neon)] text-black hover:bg-[color:var(--neon-dim)]" onClick={() => onOpenChange(false)}>
              Done
            </Button>
          </div>
        ) : children}
      </DialogContent>
    </Dialog>
  );
}

function Field<T extends FieldValues>({
  form, name, label, type = "text", placeholder, required,
}: {
  form: UseFormReturn<T>; name: Path<T>;
  label: string; type?: string; placeholder?: string; required?: boolean;
}) {
  const err = form.formState.errors[name as string]?.message as string | undefined;
  return (
    <div className="grid gap-1">
      <Label className="text-xs uppercase tracking-wider text-muted-foreground">
        {label} {required && <span style={{ color: "#00ff00" }}>*</span>}
      </Label>
      <Input type={type} placeholder={placeholder} {...form.register(name)} />
      {err && <span className="text-xs text-destructive">{err}</span>}
    </div>
  );
}

function SubmitBar({ submitting, label }: { submitting: boolean; label: string }) {
  return (
    <>
      <Button
        type="submit" disabled={submitting}
        className="mt-2 bg-[color:var(--neon)] text-black hover:bg-[color:var(--neon-dim)] font-bold tracking-wide"
      >
        {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {label}
      </Button>
      <p className="text-[10px] text-muted-foreground">
        By submitting, you agree we may contact you about Kofeᵉ̬Not orders. No spam.
      </p>
    </>
  );
}

function SampleDialog({ open, onOpenChange, source }: Props) {
  const submit = useServerFn(submitLead);
  const [done, setDone] = useState(false);
  const form = useForm<SampleValues>({
    resolver: zodResolver(sampleSchema),
    defaultValues: { company: "", name: "", email: "", quantity: "1", country: "", notes: "" },
  });
  const onSubmit = async (v: SampleValues) => {
    try {
      await submit({ data: { type: "sample", source, ...v } });
      setDone(true);
      toast.success("Sample request received", { description: "We'll reply within 24 hours." });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Submit failed");
    }
  };
  return (
    <Shell
      title="Buy a Sample" open={open} onOpenChange={onOpenChange} done={done}
      onReset={() => { setDone(false); form.reset(); }}
      description="2-unit gift box, $30. Credit applies to your first OEM order."
    >
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-3">
        <Field form={form} name="company" label="Company" required />
        <div className="grid grid-cols-2 gap-3">
          <Field form={form} name="name" label="Your name" required />
          <Field form={form} name="email" label="Email" type="email" required />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field form={form} name="quantity" label="Qty (gift boxes)" type="number" required />
          <Field form={form} name="country" label="Shipping country" required placeholder="USA" />
        </div>
        <div className="grid gap-1">
          <Label className="text-xs uppercase tracking-wider text-muted-foreground">Notes</Label>
          <Textarea rows={3} {...form.register("notes")} placeholder="Anything else?" />
        </div>
        <SubmitBar submitting={form.formState.isSubmitting} label="Send sample request" />
      </form>
    </Shell>
  );
}

function QuoteDialog({ open, onOpenChange, source }: Props) {
  const submit = useServerFn(submitLead);
  const [done, setDone] = useState(false);
  const form = useForm<QuoteValues>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      company: "", role: "", email: "", phone: "", quantity: "",
      branding_method: "", in_hands_date: "", destination: "", notes: "", send_spec: true,
    },
  });
  const onSubmit = async (v: QuoteValues) => {
    try {
      await submit({ data: { type: "quote", source, ...v } });
      setDone(true);
      toast.success("Quote request received", { description: "We'll reply within 24 hours." });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Submit failed");
    }
  };
  return (
    <Shell
      title="Request a Quote" open={open} onOpenChange={onOpenChange} done={done}
      onReset={() => { setDone(false); form.reset(); }}
      description="Branded bulk pricing for promo agencies, cafés, and OEM runs."
    >
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-3">
        <div className="grid grid-cols-2 gap-3">
          <Field form={form} name="company" label="Company" required />
          <Field form={form} name="role" label="Role" placeholder="Sourcing / Account Mgr" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field form={form} name="email" label="Email" type="email" required />
          <Field form={form} name="phone" label="Phone" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field form={form} name="quantity" label="Target qty" required placeholder="500 / 5k / 50k" />
          <Field form={form} name="branding_method" label="Branding" placeholder="Pad print / laser" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field form={form} name="in_hands_date" label="In-hands date" type="date" />
          <Field form={form} name="destination" label="Destination" placeholder="City, Country" />
        </div>
        <div className="grid gap-1">
          <Label className="text-xs uppercase tracking-wider text-muted-foreground">Notes</Label>
          <Textarea rows={3} {...form.register("notes")} placeholder="Use case, timeline, anything else." />
        </div>
        <label className="flex items-center gap-2 text-sm text-muted-foreground">
          <Checkbox defaultChecked onCheckedChange={(c) => form.setValue("send_spec", !!c)} />
          Send me the spec sheet PDF
        </label>
        <SubmitBar submitting={form.formState.isSubmitting} label="Request quote" />
      </form>
    </Shell>
  );
}
