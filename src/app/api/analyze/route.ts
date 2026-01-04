import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { generateMockAnalysis } from '@/lib/analyzers/mock-analyzer';
import { generateOpenAIAnalysis } from '@/lib/analyzers/openai-analyzer';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { project_id, input_text, jurisdiction, permit_type, building_type, file_url } = body;

    if (!project_id || (!input_text && !file_url)) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Verify project ownership
    const { data: project } = await supabase
      .from('projects')
      .select('*')
      .eq('id', project_id)
      .eq('user_id', user.id)
      .single();

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    // Generate analysis
    let analysisResult;
    try {
      // Try OpenAI first if API key is available
      if (process.env.OPENAI_API_KEY) {
        analysisResult = await generateOpenAIAnalysis({
          projectType: project.project_type,
          buildingType,
          jurisdiction,
          permitType: permit_type,
          inputText: input_text,
        });
      } else {
        throw new Error('OpenAI not configured');
      }
    } catch (error) {
      // Fall back to mock analyzer
      console.log('Using mock analyzer:', error);
      analysisResult = await generateMockAnalysis({
        projectType: project.project_type,
        buildingType,
        jurisdiction,
        permitType: permit_type,
        inputText: input_text,
      });
    }

    // Store analysis in database
    const { data: analysis, error: insertError } = await supabase
      .from('analyses')
      .insert({
        project_id,
        user_id: user.id,
        input_text,
        file_url,
        jurisdiction,
        permit_type,
        building_type,
        risk_score: analysisResult.risk_score,
        approval_probability: analysisResult.approval_probability,
        expected_review_time_days: analysisResult.expected_review_time_days,
        confidence_level: analysisResult.confidence_level,
        summary: analysisResult.summary,
        top_risks: analysisResult.top_risks,
        jurisdiction_flags: analysisResult.jurisdiction_flags,
      })
      .select()
      .single();

    if (insertError) {
      console.error('Insert error:', insertError);
      return NextResponse.json({ error: 'Failed to save analysis' }, { status: 500 });
    }

    // Log audit event
    await supabase.from('audit_logs').insert({
      user_id: user.id,
      event_type: 'analysis_created',
      event_data: { analysis_id: analysis.id, project_id },
    });

    return NextResponse.json(analysis);
  } catch (error: any) {
    console.error('Analysis error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
