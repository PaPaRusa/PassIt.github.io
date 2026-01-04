import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { getSeverityColor, getConfidenceColor, formatDate } from '@/lib/utils';
import Link from 'next/link';

export default async function AnalysisPage({ params }: { params: { id: string } }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: analysis } = await supabase
    .from('analyses')
    .select('*, projects(*)')
    .eq('id', params.id)
    .eq('user_id', user.id)
    .single();

  if (!analysis) {
    redirect('/app');
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center text-sm text-neutral-600 mb-4">
          <Link href="/app" className="hover:text-neutral-900">Dashboard</Link>
          <svg className="w-4 h-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <Link href={`/app/projects/${analysis.project_id}`} className="hover:text-neutral-900">
            {analysis.projects?.name}
          </Link>
          <svg className="w-4 h-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span>Analysis</span>
        </div>

        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900 mb-2">Risk Analysis Results</h1>
            <p className="text-neutral-600">
              Generated on {formatDate(analysis.created_at)}
            </p>
          </div>
          <a href={`/api/export/${analysis.id}`} target="_blank" rel="noopener noreferrer">
            <Button variant="secondary">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Export PDF
            </Button>
          </a>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <div className="text-sm text-neutral-600 mb-2">Risk Score</div>
          <div className="flex items-baseline">
            <div className={`text-4xl font-bold ${
              analysis.risk_score < 40 ? 'text-green-600' :
              analysis.risk_score < 70 ? 'text-yellow-600' : 'text-red-600'
            }`}>
              {analysis.risk_score}
            </div>
            <div className="text-neutral-500 ml-1">/100</div>
          </div>
        </Card>

        <Card>
          <div className="text-sm text-neutral-600 mb-2">Approval Probability</div>
          <div className="flex items-baseline">
            <div className="text-4xl font-bold text-primary-600">
              {analysis.approval_probability}%
            </div>
          </div>
        </Card>

        <Card>
          <div className="text-sm text-neutral-600 mb-2">Expected Review Time</div>
          <div className="flex items-baseline">
            <div className="text-4xl font-bold text-neutral-900">
              {analysis.expected_review_time_days}
            </div>
            <div className="text-neutral-500 ml-2">days</div>
          </div>
        </Card>

        <Card>
          <div className="text-sm text-neutral-600 mb-2">Confidence Level</div>
          <Badge className={`${getConfidenceColor(analysis.confidence_level)} mt-2`}>
            {analysis.confidence_level.charAt(0).toUpperCase() + analysis.confidence_level.slice(1)}
          </Badge>
        </Card>
      </div>

      {/* Executive Summary */}
      <Card className="mb-8">
        <h2 className="text-xl font-semibold text-neutral-900 mb-4">Executive Summary</h2>
        <p className="text-neutral-700 leading-relaxed">{analysis.summary}</p>
      </Card>

      {/* Top Risk Factors */}
      <Card className="mb-8">
        <h2 className="text-xl font-semibold text-neutral-900 mb-6">Identified Risk Factors</h2>
        <div className="space-y-6">
          {analysis.top_risks?.map((risk: any, index: number) => (
            <div key={index} className="border-l-4 border-neutral-200 pl-6 pb-6 last:pb-0">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">{risk.title}</h3>
                  <Badge className={getSeverityColor(risk.severity)}>
                    {risk.severity.charAt(0).toUpperCase() + risk.severity.slice(1)} Severity
                  </Badge>
                </div>
                {risk.code_refs && risk.code_refs.length > 0 && (
                  <div className="text-sm text-neutral-600">
                    {risk.code_refs.map((ref: string, i: number) => (
                      <Badge key={i} variant="default" className="ml-2">
                        {ref}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <p className="text-neutral-700 mb-4">{risk.explanation}</p>

              <div>
                <h4 className="text-sm font-semibold text-neutral-900 mb-2">Recommended Actions:</h4>
                <ul className="space-y-2">
                  {risk.fix_recommendations?.map((rec: string, i: number) => (
                    <li key={i} className="flex items-start text-sm text-neutral-700">
                      <svg className="w-5 h-5 text-primary-600 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Jurisdiction Flags */}
      {analysis.jurisdiction_flags && analysis.jurisdiction_flags.length > 0 && (
        <Card>
          <h2 className="text-xl font-semibold text-neutral-900 mb-6">Jurisdiction-Specific Considerations</h2>
          <div className="space-y-6">
            {analysis.jurisdiction_flags.map((flag: any, index: number) => (
              <div key={index} className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-2">{flag.flag}</h3>
                <p className="text-sm text-blue-800 mb-3">{flag.why_it_matters}</p>
                <div className="bg-white border border-blue-200 rounded p-3">
                  <p className="text-sm font-medium text-blue-900 mb-1">Recommended Mitigation:</p>
                  <p className="text-sm text-blue-800">{flag.mitigation}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Disclaimer */}
      <div className="mt-8 p-4 bg-neutral-100 border border-neutral-200 rounded-lg">
        <p className="text-xs text-neutral-600">
          <strong>Disclaimer:</strong> This analysis is a decision support tool based on common code requirements and jurisdiction patterns. It is not legal advice, and final permit authority remains with the jurisdiction AHJ. Code compliance requirements vary by jurisdiction and project specifics. Always consult with licensed professionals for project-specific guidance.
        </p>
      </div>
    </div>
  );
}

### `src/app/app/projects/page.tsx`
`````````typescript
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';

export default async function ProjectsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: projects } = await supabase
    .from('projects')
    .select('*, analyses(count)')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">Projects</h1>
          <p className="text-neutral-600">Manage your permit projects and analyses</p>
        </div>
        <Link href="/app/new-analysis">
          <Button>
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Project
          </Button>
        </Link>
      </div>

      {!projects || projects.length === 0 ? (
        <Card className="text-center py-16">
          <svg className="w-16 h-16 text-neutral-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
          </svg>
          <h3 className="text-lg font-semibold text-neutral-900 mb-2">No projects yet</h3>
          <p className="text-neutral-600 mb-6">Create your first project to get started with risk analysis</p>
          <Link href="/app/new-analysis">
            <Button>Create Project</Button>
          </Link>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project: any) => (
            <Link key={project.id} href={`/app/projects/${project.id}`}>
              <Card className="h-full hover:border-primary-500 transition-colors cursor-pointer">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-semibold text-neutral-900">{project.name}</h3>
                  <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                
                <div className="space-y-2 text-sm text-neutral-600 mb-4">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    {project.city}
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    {project.project_type}
                  </div>
                </div>
                
                <div className="pt-4 border-t border-neutral-200 flex items-center justify-between">
                  <span className="text-xs text-neutral-500">{formatDate(project.created_at)}</span>
                  <span className="text-xs text-primary-600 font-medium">
                    {project.analyses?.[0]?.count || 0} analyses
                  </span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
