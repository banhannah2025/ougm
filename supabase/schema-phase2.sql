-- Phase 2 schema (idempotent) for Camp Mercy
-- Run this entire file in Supabase SQL editor.
-- Note: The enum extension must commit before being used below.

-- 0) Extend enum with program_participant (safe if already exists)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_enum e
    JOIN pg_type t ON t.oid = e.enumtypid
    WHERE t.typname = 'user_role' AND e.enumlabel = 'program_participant'
  ) THEN
    ALTER TYPE user_role ADD VALUE 'program_participant';
  END IF;
EXCEPTION
  WHEN undefined_object THEN
    CREATE TYPE user_role AS ENUM ('admin', 'editor', 'viewer', 'program_participant');
END $$;
COMMIT;

-- 1) Tables (create if missing)
CREATE TABLE IF NOT EXISTS allowed_users (
  email text PRIMARY KEY,
  role user_role NOT NULL DEFAULT 'admin',
  roles text[] NOT NULL DEFAULT ARRAY['admin'],
  note text,
  inserted_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  clerk_user_id text UNIQUE NOT NULL,
  email text NOT NULL,
  role user_role NOT NULL DEFAULT 'viewer',
  roles text[] NOT NULL DEFAULT ARRAY['viewer'],
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- ensure email uniqueness for upserts
CREATE UNIQUE INDEX IF NOT EXISTS user_profiles_email_key ON user_profiles(email);

CREATE TABLE IF NOT EXISTS page_sections (
  slug text PRIMARY KEY,
  title text,
  body text,
  image_url text,
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS camp_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  applicant_name text,
  email text,
  status text DEFAULT 'new',
  data jsonb,
  submitted_at timestamptz NOT NULL DEFAULT now()
);

-- Helpful indexes for admin sorting/filtering
CREATE INDEX IF NOT EXISTS idx_camp_applications_submitted_at ON camp_applications(submitted_at DESC);
CREATE INDEX IF NOT EXISTS idx_camp_applications_status ON camp_applications(status);

-- 2) Add columns if schema already existed without them
ALTER TABLE allowed_users ADD COLUMN IF NOT EXISTS roles text[] NOT NULL DEFAULT ARRAY['admin'];
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS roles text[] NOT NULL DEFAULT ARRAY['viewer'];

-- 3) Triggers for updated_at
CREATE OR REPLACE FUNCTION update_allowed_users_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_allowed_users_updated_at ON allowed_users;
CREATE TRIGGER trg_allowed_users_updated_at
BEFORE UPDATE ON allowed_users
FOR EACH ROW
EXECUTE PROCEDURE update_allowed_users_updated_at();

CREATE OR REPLACE FUNCTION update_user_profiles_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_user_profiles_updated_at ON user_profiles;
CREATE TRIGGER trg_user_profiles_updated_at
BEFORE UPDATE ON user_profiles
FOR EACH ROW
EXECUTE PROCEDURE update_user_profiles_updated_at();

CREATE OR REPLACE FUNCTION update_page_sections_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_page_sections_updated_at ON page_sections;
CREATE TRIGGER trg_page_sections_updated_at
BEFORE UPDATE ON page_sections
FOR EACH ROW
EXECUTE PROCEDURE update_page_sections_updated_at();

-- 4) Backfill roles arrays if empty
UPDATE allowed_users
SET roles = ARRAY[role]
WHERE (roles IS NULL OR array_length(roles,1) = 0);

UPDATE user_profiles
SET roles = ARRAY[role]
WHERE (roles IS NULL OR array_length(roles,1) = 0);

-- 5) Enable RLS
ALTER TABLE allowed_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE camp_applications ENABLE ROW LEVEL SECURITY;

-- 6) Policies
DROP POLICY IF EXISTS "page_sections_read_all" ON page_sections;
CREATE POLICY "page_sections_read_all" ON page_sections
FOR SELECT USING (true);

DROP POLICY IF EXISTS "page_sections_admin_write" ON page_sections;
CREATE POLICY "page_sections_admin_write" ON page_sections
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM user_profiles
    WHERE user_profiles.email = auth.jwt()->>'email'
      AND (user_profiles.role = 'admin' OR 'admin' = ANY(user_profiles.roles))
  )
) WITH CHECK (
  EXISTS (
    SELECT 1 FROM user_profiles
    WHERE user_profiles.email = auth.jwt()->>'email'
      AND (user_profiles.role = 'admin' OR 'admin' = ANY(user_profiles.roles))
  )
);

DROP POLICY IF EXISTS "allowed_users_admin" ON allowed_users;
CREATE POLICY "allowed_users_admin" ON allowed_users
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM user_profiles
    WHERE user_profiles.email = auth.jwt()->>'email'
      AND (user_profiles.role = 'admin' OR 'admin' = ANY(user_profiles.roles))
  )
) WITH CHECK (
  EXISTS (
    SELECT 1 FROM user_profiles
    WHERE user_profiles.email = auth.jwt()->>'email'
      AND (user_profiles.role = 'admin' OR 'admin' = ANY(user_profiles.roles))
  )
);

DROP POLICY IF EXISTS "user_profiles_admin" ON user_profiles;
CREATE POLICY "user_profiles_admin" ON user_profiles
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM user_profiles
    WHERE user_profiles.email = auth.jwt()->>'email'
      AND (user_profiles.role = 'admin' OR 'admin' = ANY(user_profiles.roles))
  )
) WITH CHECK (
  EXISTS (
    SELECT 1 FROM user_profiles
    WHERE user_profiles.email = auth.jwt()->>'email'
      AND (user_profiles.role = 'admin' OR 'admin' = ANY(user_profiles.roles))
  )
);

DROP POLICY IF EXISTS "camp_applications_read" ON camp_applications;
CREATE POLICY "camp_applications_read" ON camp_applications
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM user_profiles
    WHERE user_profiles.email = auth.jwt()->>'email'
      AND (
        user_profiles.role IN ('admin','editor','viewer','program_participant')
        OR user_profiles.roles && ARRAY['admin','editor','viewer','program_participant']::text[]
      )
  )
);

DROP POLICY IF EXISTS "camp_applications_admin" ON camp_applications;
CREATE POLICY "camp_applications_admin" ON camp_applications
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM user_profiles
    WHERE user_profiles.email = auth.jwt()->>'email'
      AND (user_profiles.role = 'admin' OR 'admin' = ANY(user_profiles.roles))
  )
) WITH CHECK (
  EXISTS (
    SELECT 1 FROM user_profiles
    WHERE user_profiles.email = auth.jwt()->>'email'
      AND (user_profiles.role = 'admin' OR 'admin' = ANY(user_profiles.roles))
  )
);

-- 7) Seed/restore admins (Robin also program participant)
INSERT INTO allowed_users (email, role, roles, note)
VALUES
  ('specopsrecon82@gmail.com', 'admin', ARRAY['admin','program_participant'], 'Robin Cornett'),
  ('campmercycoordinator@gmail.com', 'admin', ARRAY['admin'], 'Jacqueline Smith')
ON CONFLICT (email) DO UPDATE
SET role = EXCLUDED.role, roles = EXCLUDED.roles, note = EXCLUDED.note;

INSERT INTO user_profiles (clerk_user_id, email, role, roles)
VALUES
  ('seed-robin', 'specopsrecon82@gmail.com', 'admin', ARRAY['admin','program_participant']),
  ('seed-jacqueline', 'campmercycoordinator@gmail.com', 'admin', ARRAY['admin'])
ON CONFLICT (email) DO UPDATE
SET role = EXCLUDED.role, roles = EXCLUDED.roles;
