-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Projects table
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  project_type TEXT NOT NULL,
  scope TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Analyses table
CREATE TABLE analyses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  input_text TEXT,
  file_url TEXT,
  jurisdiction TEXT,
  permit_type TEXT,
  building_type TEXT,
  risk_score INTEGER NOT NULL,
  approval_probability INTEGER NOT NULL,
  expected_review_time_days INTEGER NOT NULL,
  confidence_level TEXT NOT NULL CHECK (confidence_level IN ('low', 'medium', 'high')),
  summary TEXT NOT NULL,
  top_risks JSONB NOT NULL DEFAULT '[]',
  jurisdiction_flags JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Jurisdictions table
CREATE TABLE jurisdictions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  typical_cycle_time_min INTEGER NOT NULL,
  typical_cycle_time_max INTEGER NOT NULL,
  common_rejection_themes JSONB NOT NULL DEFAULT '[]',
  submission_checklist JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Audit logs table
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  event_data JSONB,
  ip_address TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_projects_user_id ON projects(user_id);
CREATE INDEX idx_analyses_project_id ON analyses(project_id);
CREATE INDEX idx_analyses_user_id ON analyses(user_id);
CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at);

-- Row Level Security (RLS) policies
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Projects policies
CREATE POLICY "Users can view their own projects" ON projects
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own projects" ON projects
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own projects" ON projects
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own projects" ON projects
  FOR DELETE USING (auth.uid() = user_id);

-- Analyses policies
CREATE POLICY "Users can view their own analyses" ON analyses
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own analyses" ON analyses
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own analyses" ON analyses
  FOR DELETE USING (auth.uid() = user_id);

-- Audit logs policies (read-only for users)
CREATE POLICY "Users can view their own audit logs" ON audit_logs
  FOR SELECT USING (auth.uid() = user_id);

-- Jurisdictions policies (public read)
ALTER TABLE jurisdictions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view jurisdictions" ON jurisdictions
  FOR SELECT TO authenticated USING (true);

-- Seed data for jurisdictions
INSERT INTO jurisdictions (name, city, state, typical_cycle_time_min, typical_cycle_time_max, common_rejection_themes, submission_checklist) VALUES
(
  'City of San Jose Building Department',
  'San Jose',
  'CA',
  35,
  75,
  '[
    "Setback requirement violations (especially for ADUs)",
    "Incomplete Title 24 energy compliance documentation",
    "Missing structural engineer stamps on foundation plans",
    "Stormwater management plans not meeting C.3 requirements",
    "Fire egress window specifications incomplete"
  ]'::jsonb,
  '[
    "Complete architectural plan set with all dimensions",
    "Structural calculations with engineer stamp",
    "Title 24 energy compliance forms (CF-1R)",
    "Plot plan showing setbacks and easements",
    "Stormwater management plan (projects >2,500 sq ft)",
    "Sanitary sewer lateral compliance",
    "Fire sprinkler plans (if required)",
    "Building permit application form"
  ]'::jsonb
),
(
  'San Francisco Department of Building Inspection',
  'San Francisco',
  'CA',
  45,
  90,
  '[
    "Unpermitted existing work requiring legalization",
    "Dwelling unit legalization issues",
    "Planning department approval delays",
    "Historic preservation requirements",
    "Seismic upgrade requirements for older buildings"
  ]'::jsonb,
  '[
    "Planning department approval (if required)",
    "Complete permit application with project description",
    "Architectural drawings stamped by California architect",
    "Structural drawings stamped by California engineer",
    "Energy calculations and compliance forms",
    "Geotechnical report (for foundations)",
    "Historical review (if in historic district)",
    "Neighbor notification proof"
  ]'::jsonb
),
(
  'City of Oakland Building Services',
  'Oakland',
  'CA',
  40,
  80,
  '[
    "Seismic retrofit requirements frequently missed",
    "Soft-story building requirements",
    "Green building requirements documentation",
    "Fire access and fire flow requirements",
    "Accessible route compliance"
  ]'::jsonb,
  '[
    "Building permit application",
    "Plot plan with building location and setbacks",
    "Architectural plans (stamped if over certain size)",
    "Structural plans with engineer stamp",
    "Energy compliance documentation",
    "Fire sprinkler plans (if required)",
    "Green building checklist (if required)",
    "Soils report for new foundations"
  ]'::jsonb
);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$ LANGUAGE plpgsql;

-- Trigger for projects updated_at
CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();