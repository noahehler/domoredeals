-- Run this in your Supabase SQL editor
-- Existing tables
CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  business_name text NOT NULL,
  website_url text NOT NULL,
  location text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS audits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id uuid REFERENCES leads(id),
  visibility_score integer,
  queries_tested integer,
  queries_found integer,
  gaps_found integer,
  audit_data jsonb,
  created_at timestamptz DEFAULT now()
);

-- ─── Phase 1: Cold Email Outreach ────────────────────────────────────────────

CREATE TABLE contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_name text,
  website_url text,
  email text,
  location text,
  industry text,
  cms text,
  status text DEFAULT 'new', -- new | emailed | opened | clicked | replied | booked | client | unsubscribed
  created_at timestamptz DEFAULT now()
);

CREATE TABLE campaigns (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text,
  status text DEFAULT 'draft', -- draft | active | paused
  daily_limit integer DEFAULT 25,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE campaign_emails (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id uuid REFERENCES campaigns(id) ON DELETE CASCADE,
  step integer,         -- 1 = initial, 2 = follow-up 1, 3 = follow-up 2
  subject text,
  body text,
  delay_days integer DEFAULT 0  -- days after previous step to send
);

CREATE TABLE sends (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  contact_id uuid REFERENCES contacts(id),
  campaign_id uuid REFERENCES campaigns(id),
  step integer,
  sent_at timestamptz DEFAULT now(),
  opened_at timestamptz,
  clicked_at timestamptz,
  tracking_id uuid DEFAULT gen_random_uuid()
);

-- Indexes for common queries
CREATE INDEX idx_contacts_status ON contacts(status);
CREATE INDEX idx_contacts_email ON contacts(email);
CREATE INDEX idx_sends_contact ON sends(contact_id);
CREATE INDEX idx_sends_campaign ON sends(campaign_id);
CREATE INDEX idx_sends_tracking ON sends(tracking_id);
CREATE INDEX idx_sends_sent_at ON sends(sent_at);

-- Enable RLS
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE audits ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaign_emails ENABLE ROW LEVEL SECURITY;
ALTER TABLE sends ENABLE ROW LEVEL SECURITY;
-- Service role key bypasses RLS automatically — no additional policies needed

-- ─── Seed: First Campaign ─────────────────────────────────────────────────────

INSERT INTO campaigns (id, name, status, daily_limit)
VALUES ('00000000-0000-0000-0000-000000000001', 'Cold Outreach — AI Visibility', 'active', 25);

INSERT INTO campaign_emails (campaign_id, step, subject, body, delay_days) VALUES
(
  '00000000-0000-0000-0000-000000000001',
  1,
  '[Business Name] — quick AI visibility check',
  E'Hey [first name],\n\nRan a quick check on [Business Name] — you''re not showing up when people ask ChatGPT or Perplexity for [industry] in [city].\n\nYour competitors with weaker reputations are getting recommended instead.\n\nWe built a free AI visibility audit that shows exactly where you''re invisible and the 3 fastest fixes. Takes 2 minutes to run.\n\n[CTA:Get your free audit →:https://domoredeals.com/#audit]\n\n— Noah',
  0
),
(
  '00000000-0000-0000-0000-000000000001',
  2,
  'Re: [Business Name] AI visibility',
  E'Just following up — did you get a chance to see where [Business Name] stands on AI search?\n\nIt''s free and takes 2 minutes. Most businesses we audit score under 20/100.\n\n[CTA:Run your audit →:https://domoredeals.com/#audit]\n\n— Noah',
  4
),
(
  '00000000-0000-0000-0000-000000000001',
  3,
  'Last one — [Business Name]',
  E'Won''t keep following up after this.\n\nAI search (ChatGPT, Perplexity, Claude) is where your customers are going to find you in 2 years. Most local businesses have zero visibility right now — which is actually the opportunity.\n\nFree audit here if you want it: [CTA:Get your audit:https://domoredeals.com/#audit]\n\n— Noah',
  9
);
