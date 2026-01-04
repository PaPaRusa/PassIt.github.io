import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export default async function JurisdictionsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: jurisdictions } = await supabase
    .from('jurisdictions')
    .select('*')
    .order('name');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">Jurisdiction Library</h1>
        <p className="text-neutral-600">
          Review patterns, typical cycle times, and submission requirements for major jurisdictions
        </p>
      </div>

      {!jurisdictions || jurisdictions.length === 0 ? (
        <Card className="text-center py-16">
          <p className="text-neutral-600">No jurisdiction data available</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {jurisdictions.map((jurisdiction: any) => (
            <Card key={jurisdiction.id}>
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-neutral-900 mb-1">{jurisdiction.name}</h2>
                  <p className="text-neutral-600">{jurisdiction.city}, {jurisdiction.state}</p>
                </div>
                <Badge variant="info">
                  {jurisdiction.typical_cycle_time_min}-{jurisdiction.typical_cycle_time_max} days
                </Badge>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-sm font-semibold text-neutral-900 mb-3">Common Rejection Themes</h3>
                  <ul className="space-y-2">
                    {jurisdiction.common_rejection_themes?.map((theme: string, i: number) => (
                      <li key={i} className="flex items-start text-sm text-neutral-700">
                        <svg className="w-5 h-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {theme}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-neutral-900 mb-3">Submission Checklist</h3>
                  <ul className="space-y-2">
                    {jurisdiction.submission_checklist?.map((item: string, i: number) => (
                      <li key={i} className="flex items-start text-sm text-neutral-700">
                        <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-neutral-200">
                <p className="text-xs text-neutral-500">
                  Data represents typical patterns and may vary based on project specifics. Always verify requirements with jurisdiction directly.
                </p>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
