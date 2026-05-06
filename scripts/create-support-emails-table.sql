-- Run in Supabase → SQL Editor → New query → Run
-- Drops old emails/support_emails tables and creates the new schema with threading

drop table if exists email_labels cascade;
drop table if exists emails cascade;
drop table if exists support_emails cascade;

create table emails (
  id              uuid        primary key default gen_random_uuid(),
  resend_email_id text        unique,
  message_id      text,
  thread_id       text,
  from_address    text        not null default '',
  from_name       text,
  to_address      text[],
  cc_address      text[],
  bcc_address     text[],
  subject         text,
  body_html       text,
  body_text       text,
  is_read         boolean     not null default false,
  is_starred      boolean     not null default false,
  is_archived     boolean     not null default false,
  is_trash        boolean     not null default false,
  is_sent         boolean     not null default false,
  direction       text        not null default 'inbound',
  attachments     jsonb       default '[]'::jsonb,
  received_at     timestamptz not null default now(),
  created_at      timestamptz not null default now()
);

create table email_labels (
  id       uuid primary key default gen_random_uuid(),
  email_id uuid not null references emails(id) on delete cascade,
  label    text not null
);

create index emails_thread_id_idx          on emails(thread_id);
create index emails_message_id_idx         on emails(message_id);
create index emails_direction_received_idx on emails(direction, received_at desc);
create index emails_is_read_idx            on emails(is_read);
create index emails_is_starred_idx         on emails(is_starred);
create index emails_is_archived_idx        on emails(is_archived);
create index emails_is_trash_idx           on emails(is_trash);
create index emails_received_at_idx        on emails(received_at desc);

alter table emails       enable row level security;
alter table email_labels enable row level security;
