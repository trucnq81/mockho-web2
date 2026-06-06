# Mộc K'Ho Website

Website React/Vite cho Mộc K'Ho Restaurant & Homestay.

## Chạy local

```bash
npm install
npm run dev
```

## Build deploy Vercel

```bash
npm run build
```

## Kết nối Supabase

Tạo file `.env` dựa theo `.env.example`:

```env
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
VITE_ZALO_PHONE=0937376169
```

## Bảng Supabase cần có

```sql
create table bookings (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  customer_name text not null,
  phone text not null,
  service text not null,
  booking_date date,
  guests int,
  note text,
  status text default 'new',
  source text default 'website'
);

alter table bookings enable row level security;

create policy "Allow public booking insert"
on bookings
for insert
to anon
with check (true);
```
