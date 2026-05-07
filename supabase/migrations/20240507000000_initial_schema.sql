-- Leads from contact form
CREATE TABLE IF NOT EXISTS contact_leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  destination TEXT,
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Leads from quiz
CREATE TABLE IF NOT EXISTS quiz_leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  whatsapp TEXT,
  destination TEXT,
  traveler_type TEXT,
  pace TEXT,
  vibes TEXT[],
  accommodation TEXT,
  timeline TEXT,
  special_request TEXT,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Blog posts
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT,
  cover_image TEXT,
  category TEXT,
  published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
