import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const leadSchema = z.object({
  type: z.enum(["sample", "quote"]),
  company: z.string().trim().max(200).optional().nullable(),
  name: z.string().trim().max(120).optional().nullable(),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(60).optional().nullable(),
  role: z.string().trim().max(120).optional().nullable(),
  quantity: z.string().trim().max(120).optional().nullable(),
  branding_method: z.string().trim().max(120).optional().nullable(),
  in_hands_date: z.string().trim().max(60).optional().nullable(),
  destination: z.string().trim().max(200).optional().nullable(),
  country: z.string().trim().max(120).optional().nullable(),
  notes: z.string().trim().max(2000).optional().nullable(),
  send_spec: z.boolean().optional(),
  source: z.string().trim().max(120).optional().nullable(),
});

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => leadSchema.parse(input))
  .handler(async ({ data }) => {
    const { error } = await supabaseAdmin.from("leads").insert({
      type: data.type,
      company: data.company ?? null,
      name: data.name ?? null,
      email: data.email,
      phone: data.phone ?? null,
      role: data.role ?? null,
      quantity: data.quantity ?? null,
      branding_method: data.branding_method ?? null,
      in_hands_date: data.in_hands_date ?? null,
      destination: data.destination ?? null,
      country: data.country ?? null,
      notes: data.notes ?? null,
      send_spec: data.send_spec ?? false,
      raw: { source: data.source ?? null, ts: new Date().toISOString() },
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });
