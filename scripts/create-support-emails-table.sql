-- Run this in your Supabase SQL editor
-- Dashboard → SQL Editor → New query → paste → Run

create table if not exists support_emails (
  id          uuid primary key default gen_random_uuid(),
  from_email  text not null,
  from_name   text,
  subject     text,
  text_body   text,
  html_body   text,
  raw_payload jsonb,
  received_at timestamptz not null default now(),
  replied     boolean not null default false,
  reply_body  text,
  replied_at  timestamptz
);

-- Only the service role key (used by your API) can read/write this table
alter table support_emails enable row level security;

-- No public access — all reads/writes go through service role in your API
