export interface User {
  id: string;
  email: string;
  created_at: string;
}

export interface Project {
  id: string;
  user_id: string;
  name: string;
  address: string;
  city: string;
  project_type: string;
  scope: string;
  created_at: string;
  updated_at: string;
}

export interface Analysis {
  id: string;
  project_id: string;
  user_id: string;
  input_text?: string;
  file_url?: string;
  jurisdiction?: string;
  permit_type?: string;
  building_type?: string;
  risk_score: number;
  approval_probability: number;
  expected_review_time_days: number;
  confidence_level: 'low' | 'medium' | 'high';
  summary: string;
  top_risks: RiskFactor[];
  jurisdiction_flags: JurisdictionFlag[];
  created_at: string;
}

export interface RiskFactor {
  title: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  code_refs?: string[];
  explanation: string;
  fix_recommendations: string[];
}

export interface JurisdictionFlag {
  flag: string;
  why_it_matters: string;
  mitigation: string;
}

export interface Jurisdiction {
  id: string;
  name: string;
  city: string;
  state: string;
  typical_cycle_time_min: number;
  typical_cycle_time_max: number;
  common_rejection_themes: string[];
  submission_checklist: string[];
  created_at: string;
}

export interface AuditLog {
  id: string;
  user_id: string;
  event_type: string;
  event_data: any;
  ip_address?: string;
  created_at: string;
}