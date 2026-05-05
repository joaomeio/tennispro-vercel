-- Run this in Supabase → SQL Editor → New query → Run
-- This replaces the old support_emails table with a proper emails table

create table if not exists emails (
  id           uuid primary key default gen_random_uuid(),
  folder       text not null default 'inbox',   -- 'inbox' | 'sent'
  from_email   text not null,
  from_name    text,
  to_email     text,
  subject      text,
  html_body    text,
  text_body    text,
  resend_id    text,
  reply_to_id  uuid references emails(id),
  created_at   timestamptz not null default now(),
  read         boolean not null default false,
  starred      boolean not null default false,
  replied      boolean not null default false
);

create index if not exists emails_folder_created_at on emails(folder, created_at desc);
create index if not exists emails_starred on emails(starred, created_at desc);

-- All reads/writes go through the service role key in your API — no public access
alter table emails enable row level security;
