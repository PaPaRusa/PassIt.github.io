import { AppHeader } from '@/components/layout/AppHeader';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-neutral-50">
      <AppHeader />
      <main>{children}</main>
    </div>
  );
}

### `src/app/app/page.tsx`
````````````typescript
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Fetch recent projects and analyses
  const { data: projects } = await supabase
    .from('projects')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(5);

  const { data: analyses } = await supabase
    .from('analyses')
    .select('*, projects(name)')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(5);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">Dashboard</h1>
        <p className="text-neutral-600">Welcome back, {user.email}</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <div className="text-sm text-neutral-600 mb-1">Total Projects</div>
          <div className="text-3xl font-bold text-neutral-900">{projects?.length || 0}</div>
        </Card>
        <Card>
          <div className="text-sm text-neutral-600 mb-1">Analyses Run</div>
          <div className="text-3xl font-bold text-neutral-900">{analyses?.length || 0}</div>
        </Card>
        <Card>
          <div className="text-sm text-neutral-600 mb-1">Avg Risk Score</div>
          <div className="text-3xl font-bold text-neutral-900">
            {analyses && analyses.length > 0
              ? Math.round(analyses.reduce((acc, a) => acc + (a.risk_score || 0), 0) / analyses.length)
              : '—'}
          </div>
        </Card>
        <Card>
          <div className="text-sm text-neutral-600 mb-1">Avg Approval Probability</div>
          <div className="text-3xl font-bold text-primary-600">
            {analyses && analyses.length > 0
              ? Math.round(analyses.reduce((acc, a) => acc + (a.approval_probability || 0), 0) / analyses.length) + '%'
              : '—'}
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-neutral-900">Quick Actions</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/app/new-analysis">
            <Button className="w-full">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New Risk Analysis
            </Button>
          </Link>
          <Link href="/app/projects">
            <Button variant="secondary" className="w-full">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
              </svg>
              View All Projects
            </Button>
          </Link>
          <Link href="/app/jurisdictions">
            <Button variant="secondary" className="w-full">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
              Jurisdiction Library
            </Button>
          </Link>
        </div>
      </Card>

      {/* Recent Analyses */}
      <Card className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-neutral-900">Recent Analyses</h2>
          <Link href="/app/projects">
            <Button variant="ghost" size="sm">View All</Button>
          </Link>
        </div>
        {!analyses || analyses.length === 0 ? (
          <div className="text-center py-12">
            <svg className="w-12 h-12 text-neutral-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-neutral-600 mb-4">No analyses yet</p>
            <Link href="/app/new-analysis">
              <Button>Run Your First Analysis</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {analyses.map((analysis: any) => (
              <Link key={analysis.id} href={`/app/analysis/${analysis.id}`}>
                <div className="p-4 border border-neutral-200 rounded-lg hover:border-primary-500 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-medium text-neutral-900">
                          {analysis.projects?.name || 'Unnamed Project'}
                        </h3>
                        <Badge 
                          variant={
                            analysis.risk_score < 40 ? 'success' :
                            analysis.risk_score < 70 ? 'warning' : 'danger'
                          }
                        >
                          Risk: {analysis.risk_score}
                        </Badge>
                      </div>
                      <p className="text-sm text-neutral-600 mb-2">
                        {analysis.summary?.substring(0, 120)}...
                      </p>
                      <div className="flex items-center space-x-4 text-xs text-neutral-500">
                        <span>{formatDate(analysis.created_at)}</span>
                        <span>•</span>
                        <span>{analysis.approval_probability}% approval probability</span>
                        <span>•</span>
                        <span>{analysis.expected_review_time_days} days</span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </Card>

      {/* Recent Projects */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-neutral-900">Recent Projects</h2>
          <Link href="/app/projects">
            <Button variant="ghost" size="sm">View All</Button>
          </Link>
        </div>
        {!projects || projects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-neutral-600">No projects yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {projects.map((project: any) => (
              <Link key={project.id} href={`/app/projects/${project.id}`}>
                <div className="p-4 border border-neutral-200 rounded-lg hover:border-primary-500 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-neutral-900">{project.name}</h3>
                      <p className="text-sm text-neutral-600">{project.city} • {project.project_type}</p>
                    </div>
                    <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
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
