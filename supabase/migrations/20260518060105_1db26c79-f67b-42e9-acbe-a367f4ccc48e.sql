create table public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  type text not null check (type in ('sample','quote')),
  company text,
  name text,
  email text not null,
  phone text,
  role text,
  quantity text,
  branding_method text,
  in_hands_date text,
  destination text,
  country text,
  notes text,
  send_spec boolean not null default false,
  raw jsonb
);

alter table public.leads enable row level security;

create policy "anyone can insert leads"
on public.leads for insert
to anon, authenticated
with check (true);
