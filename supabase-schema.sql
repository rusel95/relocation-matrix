-- Relocation Matrix — Supabase Schema

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  auth_id UUID NOT NULL, -- Supabase auth user ID
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Profiles (saved comparisons)
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  weights JSONB NOT NULL DEFAULT '{
    "safety": 5,
    "quality_of_life": 5,
    "education": 3,
    "climate": 3,
    "tech_hub": 5,
    "passport_strength": 3,
    "citizenship_time": 2,
    "cost_of_living": 5,
    "healthcare": 4,
    "tax_rate": 4,
    "tech_salaries": 10,
    "expat_community": 3,
    "economic_future": 4,
    "purchasing_power": 10,
    "language_barrier": 10,
    "career_opportunities": 10,
    "visa_ease": 10
  }',
  cities TEXT[] NOT NULL, -- ['Singapore', 'Austin', ...]
  salary_usd INTEGER DEFAULT 100000, -- For personalized purchasing power
  nationality TEXT DEFAULT 'US', -- User nationality for criteria adjustments
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Shared profile links (public)
CREATE TABLE shared_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  share_token TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP DEFAULT NOW() + INTERVAL '1 year'
);

-- Row Level Security (RLS)

-- Users can only see their own profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profiles"
  ON profiles FOR SELECT
  USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can insert their own profiles"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid()::text = user_id::text);

CREATE POLICY "Users can update their own profiles"
  ON profiles FOR UPDATE
  USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can delete their own profiles"
  ON profiles FOR DELETE
  USING (auth.uid()::text = user_id::text);

-- Shared profiles are public (no auth needed)
ALTER TABLE shared_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Shared profiles are public"
  ON shared_profiles FOR SELECT
  USING (TRUE);

-- Indexes for performance
CREATE INDEX idx_profiles_user_id ON profiles(user_id);
CREATE INDEX idx_shared_profiles_token ON shared_profiles(share_token);
CREATE INDEX idx_shared_profiles_profile_id ON shared_profiles(profile_id);

-- Analytics table (optional)
CREATE TABLE analytics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_type TEXT NOT NULL, -- 'profile_created', 'profile_shared', 'viewed_shared'
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Dump initial data trigger (optional)
CREATE TABLE city_rankings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  snapshot_date DATE DEFAULT CURRENT_DATE,
  rankings JSONB NOT NULL, -- Full ranked list with criteria
  created_at TIMESTAMP DEFAULT NOW()
);
