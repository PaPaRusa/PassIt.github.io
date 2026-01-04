import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: analysis } = await supabase
      .from('analyses')
      .select('*, projects(*)')
      .eq('id', params.id)
      .eq('user_id', user.id)
      .single();

    if (!analysis) {
      return NextResponse.json({ error: 'Analysis not found' }, { status: 404 });
    }

    // Generate simple HTML report
    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Risk Analysis Report - ${analysis.projects.name}</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 800px; margin: 40px auto; padding: 0 20px; color: #333; }
    h1 { color: #0369a1; margin-bottom: 10px; }
    h2 { color: #0369a1; margin-top: 30px; margin-bottom: 15px; border-bottom: 2px solid #e5e5e5; padding-bottom: 10px; }
    .header { margin-bottom: 40px; }
    .meta { color: #666; font-size: 14px; }
    .summary-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin: 30px 0; }
    .summary-card { border: 1px solid #e5e5e5; padding: 15px; border-radius: 8px; }
    .summary-card .label { font-size: 12px; color: #666; margin-bottom: 5px; }
    .summary-card .value { font-size: 32px; font-weight: bold; }
    .risk-item { margin-bottom: 30px; padding-left: 20px; border-left: 4px solid #e5e5e5; }
    .risk-title { font-weight: bold; font-size: 18px; margin-bottom: 10px; }
    .severity { display: inline-block; padding: 4px 12px; border-radius: 4px; font-size: 12px; font-weight: bold; margin-bottom: 10px; }
    .severity-low { background: #dcfce7; color: #166534; }
    .severity-medium { background: #fef3c7; color: #92400e; }
    .severity-high { background: #fed7aa; color: #9a3412; }
    .severity-critical { background: #fee2e2; color: #991b1b; }
    .recommendation { margin-top: 10px; }
    .recommendation ul { margin: 10px 0; padding-left: 20px; }
    .disclaimer { background: #f5f5f5; padding: 15px; border-radius: 8px; margin-top: 40px; font-size: 12px; color: #666; }
  </style>
</head>
<body>
  <div class="header">
    <h1>Permit Risk Analysis Report</h1>
    <div class="meta">
      <p><strong>Project:</strong> ${analysis.projects.name}</p>
      <p><strong>Location:</strong> ${analysis.projects.address}, ${analysis.projects.city}</p>
      <p><strong>Project Type:</strong> ${analysis.projects.project_type}</p>
      <p><strong>Generated:</strong> ${new Date(analysis.created_at).toLocaleDateString()}</p>
    </div>
  </div>

  <div class="summary-grid">
    <div class="summary-card">
      <div class="label">Risk Score</div>
      <div class="value">${analysis.risk_score}</div>
    </div>
    <div class="summary-card">
      <div class="label">Approval Probability</div>
      <div class="value">${analysis.approval_probability}%</div>
    </div>
    <div class="summary-card">
      <div class="label">Review Time</div>
      <div class="value">${analysis.expected_review_time_days}d</div>
    </div>
    <div class="summary-card">
      <div class="label">Confidence</div>
      <div class="value">${analysis.confidence_level}</div>
    </div>
  </div>

  <h2>Executive Summary</h2>
  <p>${analysis.summary}</p>

  <h2>Identified Risk Factors</h2>
  ${analysis.top_risks.map((risk: any) => `
    <div class="risk-item">
      <div class="risk-title">${risk.title}</div>
      <span class="severity severity-${risk.severity}">${risk.severity.toUpperCase()}</span>
      <p>${risk.explanation}</p>
      <div class="recommendation">
        <strong>Recommended Actions:</strong>
        <ul>
          ${risk.fix_recommendations.map((rec: string) => `<li>${rec}</li>`).join('')}
        </ul>
      </div>
    </div>
  `).join('')}

  ${analysis.jurisdiction_flags && analysis.jurisdiction_flags.length > 0 ? `
    <h2>Jurisdiction-Specific Considerations</h2>
    ${analysis.jurisdiction_flags.map((flag: any) => `
      <div class="risk-item">
        <div class="risk-title">${flag.flag}</div>
        <p>${flag.why_it_matters}</p>
        <p><strong>Mitigation:</strong> ${flag.mitigation}</p>
      </div>
    `).join('')}
  ` : ''}

  <div class="disclaimer">
    <strong>Disclaimer:</strong> This analysis is a decision support tool based on common code requirements and jurisdiction patterns. 
    It is not legal advice, and final permit authority remains with the jurisdiction AHJ. Code compliance requirements vary by 
    jurisdiction and project specifics. Always consult with licensed professionals for project-specific guidance.
  </div>
</body>
</html>
    `;

    // Log audit event
    await supabase.from('audit_logs').insert({
      user_id: user.id,
      event_type: 'analysis_exported',
      event_data: { analysis_id: analysis.id },
    });

    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html',
        'Content-Disposition': `attachment; filename="analysis-${params.id}.html"`,
      },
    });
  } catch (error: any) {
    console.error('Export error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
