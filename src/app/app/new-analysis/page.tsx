'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';

export default function NewAnalysisPage() {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState(1);

  // Form state
  const [projectName, setProjectName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [projectType, setProjectType] = useState('');
  const [scope, setScope] = useState('');
  const [inputText, setInputText] = useState('');
  const [jurisdiction, setJurisdiction] = useState('');
  const [permitType, setPermitType] = useState('');
  const [buildingType, setBuildingType] = useState('');

  const handleCreateProject = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase
      .from('projects')
      .insert({
        user_id: user.id,
        name: projectName,
        address,
        city,
        project_type: projectType,
        scope,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  };

  const handleRunAnalysis = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Create project
      const project = await handleCreateProject();
      if (!project) throw new Error('Failed to create project');

      // Run analysis via API
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          project_id: project.id,
          input_text: inputText,
          jurisdiction,
          permit_type: permitType,
          building_type: buildingType,
        }),
      });

      if (!response.ok) throw new Error('Analysis failed');

      const result = await response.json();
      router.push(`/app/analysis/${result.id}`);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">New Risk Analysis</h1>
        <p className="text-neutral-600">
          Create a project and run a compliance risk assessment
        </p>
      </div>

      {/* Step indicator */}
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center space-x-4">
          <div className={`flex items-center ${step >= 1 ? 'text-primary-600' : 'text-neutral-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 1 ? 'border-primary-600 bg-primary-600 text-white' : 'border-neutral-300'}`}>
              1
            </div>
            <span className="ml-2 text-sm font-medium">Project Details</span>
          </div>
          <div className="w-16 h-0.5 bg-neutral-300"></div>
          <div className={`flex items-center ${step >= 2 ? 'text-primary-600' : 'text-neutral-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 2 ? 'border-primary-600 bg-primary-600 text-white' : 'border-neutral-300'}`}>
              2
            </div>
            <span className="ml-2 text-sm font-medium">Analysis Input</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleRunAnalysis}>
        {step === 1 && (
          <Card>
            <h2 className="text-xl font-semibold text-neutral-900 mb-6">Project Information</h2>
            
            {error && (
              <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <div className="space-y-6">
              <Input
                label="Project Name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="e.g., 123 Main St ADU"
                required
              />

              <Input
                label="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="123 Main Street"
                required
              />

              <Input
                label="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="San Jose"
                required
              />

              <Select
                label="Project Type"
                value={projectType}
                onChange={(e) => setProjectType(e.target.value)}
                options={[
                  { value: '', label: 'Select project type' },
                  { value: 'New Construction', label: 'New Construction' },
                  { value: 'Addition', label: 'Addition' },
                  { value: 'Remodel', label: 'Remodel' },
                  { value: 'ADU', label: 'Accessory Dwelling Unit (ADU)' },
                  { value: 'Commercial TI', label: 'Commercial Tenant Improvement' },
                ]}
                required
              />

              <Textarea
                label="Scope of Work"
                value={scope}
                onChange={(e) => setScope(e.target.value)}
                placeholder="Brief description of the project scope..."
                required
              />

              <div className="flex justify-end">
                <Button type="button" onClick={() => setStep(2)}>
                  Continue to Analysis Input
                </Button>
              </div>
            </div>
          </Card>
        )}

        {step === 2 && (
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-neutral-900">Analysis Input</h2>
              <Button type="button" variant="ghost" size="sm" onClick={() => setStep(1)}>
                ← Back
              </Button>
            </div>

            <div className="space-y-6">
              <Textarea
                label="Project Details / Plan Notes"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Paste plan notes, checklist, or describe the project details...&#10;&#10;Example:&#10;- 800 sq ft ADU with 2 bedrooms&#10;- Setback from property line: 18 feet&#10;- Two-story structure&#10;- Includes new foundation and utilities"
                rows={8}
                required
              />

              <Select
                label="Jurisdiction"
                value={jurisdiction}
                onChange={(e) => setJurisdiction(e.target.value)}
                options={[
                  { value: '', label: 'Select jurisdiction' },
                  { value: 'San Jose', label: 'San Jose, CA' },
                  { value: 'San Francisco', label: 'San Francisco, CA' },
                  { value: 'Oakland', label: 'Oakland, CA' },
                  { value: 'San Mateo', label: 'San Mateo, CA' },
                  { value: 'Santa Clara', label: 'Santa Clara, CA' },
                ]}
              />

              <Select
                label="Permit Type"
                value={permitType}
                onChange={(e) => setPermitType(e.target.value)}
                options={[
                  { value: '', label: 'Select permit type' },
                  { value: 'Building', label: 'Building Permit' },
                  { value: 'Structural', label: 'Structural Permit' },
                  { value: 'Electrical', label: 'Electrical Permit' },
                  { value: 'Plumbing', label: 'Plumbing Permit' },
                  { value: 'Mechanical', label: 'Mechanical Permit' },
                ]}
              />

              <Select
                label="Building Type"
                value={buildingType}
                onChange={(e) => setBuildingType(e.target.value)}
                options={[
                  { value: '', label: 'Select building type' },
                  { value: 'Residential - Single Family', label: 'Residential - Single Family' },
                  { value: 'Residential - Multi Family', label: 'Residential - Multi Family' },
                  { value: 'Commercial', label: 'Commercial' },
                  { value: 'Mixed Use', label: 'Mixed Use' },
                  { value: 'Industrial', label: 'Industrial' },
                ]}
              />

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex">
                  <svg className="w-5 h-5 text-yellow-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-yellow-800 mb-1">Disclaimer</p>
                    <p className="text-sm text-yellow-700">
                      This is a decision support tool, not legal advice. Code compliance requirements vary by jurisdiction. Final permit authority remains with the jurisdiction AHJ. Consult licensed professionals for project-specific guidance.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <Button type="button" variant="secondary" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? 'Analyzing...' : 'Run Analysis'}
                </Button>
              </div>
            </div>
          </Card>
        )}
      </form>
    </div>
  );
}
