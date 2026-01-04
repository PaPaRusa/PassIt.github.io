import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';

export default async function ProjectDetailPage({ params }: { params: { id: string } }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: project } = await supabase
    .from('projects')
    .select('*')
    .eq('id', params.id)
    .eq('user_id', user.id)
    .single();

  if (!project) {
    redirect('/app/projects');
  }

  const { data: analyses } = await supabase
    .from('analyses')
    .select('*')
    .eq('project_id', params.id)
    .order('created_at', { ascending: false });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center text-sm text-neutral-600 mb-6">
        <Link href="/app" className="hover:text-neutral-900">Dashboard</Link>
        <svg className="w-4 h-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <Link href="/app/projects" className="hover:text-neutral-900">Projects</Link>
        <svg className="w-4 h-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <span>{project.name}</span>
      </div>

      {/* Project Info */}
      <Card className="mb-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900 mb-2">{project.name}</h1>
            <div className="flex items-center space-x-4 text-sm text-neutral-600">
              <span>{project.address}</span>
              <span>•</span>
              <span>{project.city}</span>
              <span>•</span>
              <span>{project.project_type}</span>
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-200 pt-6">
          <h3 className="text-sm font-semibold text-neutral-900 mb-2">Scope of Work</h3>
          <p className="text-neutral-700">{project.scope}</p>
        </div>

        <div className="mt-6 pt-6 border-t border-neutral-200 flex items-center justify-between">
          <span className="text-sm text-neutral-600">Created {formatDate(project.created_at)}</span>
          <Link href="/app/new-analysis">
            <Button>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New Analysis
            </Button>
          </Link>
        </div>
      </Card>

      {/* Analyses */}
      <Card>
        <h2 className="text-xl font-semibold text-neutral-900 mb-6">Analysis History</h2>
        {!analyses || analyses.length === 0 ? (
          <div className="text-center py-12">
            <svg className="w-12 h-12 text-neutral-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-neutral-600 mb-4">No analyses for this project yet</p>
            <Link href="/app/new-analysis">
              <Button>Run First Analysis</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {analyses.map((analysis: any) => (
              <Link key={analysis.id} href={`/app/analysis/${analysis.id}`}>
                <div className="p-4 border border-neutral-200 rounded-lg hover:border-primary-500 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <Badge 
                        variant={
                          analysis.risk_score < 40 ? 'success' :
                          analysis.risk_score < 70 ? 'warning' : 'danger'
                        }
                      >
                        Risk: {analysis.risk_score}
                      </Badge>
                      <Badge variant="info">
                        {analysis.approval_probability}% approval
                      </Badge>
                    </div>
                    <span className="text-sm text-neutral-600">{formatDate(analysis.created_at)}</span>
                  </div>
                  
                  <p className="text-sm text-neutral-700 mb-2">
                    {analysis.summary?.substring(0, 150)}...
                  </p>
                  
                  <div className="flex items-center space-x-4 text-xs text-neutral-500">
                    <span>{analysis.expected_review_time_days} days review time</span>
                    <span>•</span>
                    <span>{analysis.top_risks?.length || 0} risk factors identified</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}