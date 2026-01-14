import { RiskFactor, JurisdictionFlag } from '../types';

interface AnalysisInput {
  projectType?: string;
  buildingType?: string;
  jurisdiction?: string;
  permitType?: string;
  inputText?: string;
}

export async function generateMockAnalysis(input: AnalysisInput) {
  await new Promise(resolve => setTimeout(resolve, 1500));

  const { projectType, buildingType, jurisdiction, permitType } = input;

  let riskScore = 65;
  if (buildingType?.toLowerCase().includes('residential')) riskScore -= 10;
  if (jurisdiction?.toLowerCase().includes('san jose')) riskScore += 5;
  if (permitType?.toLowerCase().includes('structural')) riskScore += 15;

  riskScore = Math.max(0, Math.min(100, riskScore));
  const approvalProbability = 100 - riskScore;

  let reviewDays = 45;
  if (riskScore > 70) reviewDays += 20;
  if (riskScore < 40) reviewDays -= 15;

  const topRisks: RiskFactor[] = [
    {
      title: 'Setback Requirements Compliance',
      severity: riskScore > 60 ? 'high' : 'medium',
      code_refs: ['CBC 503.1.1', 'Local Zoning §17.10.050'],
      explanation: 'Project plans show structures within 15 feet of property line in R-1 zone. Code requires minimum 20-foot side setback for two-story structures.',
      fix_recommendations: [
        'Revise site plan to comply with 20-foot minimum setback',
        'Consider variance application if physical constraints exist',
        'Provide detailed survey showing exact property boundaries'
      ]
    },
    {
      title: 'Fire Egress Path Documentation',
      severity: 'high',
      code_refs: ['CBC 1006.2.1', 'IBC Section 1006'],
      explanation: 'Submitted plans lack clear egress path markings from second floor bedrooms.',
      fix_recommendations: [
        'Add egress window specifications (minimum 5.7 sq ft opening)',
        'Show clear egress path to grade or approved alternative'
      ]
    }
  ];

  const jurisdictionFlags: JurisdictionFlag[] = [];

  if (jurisdiction?.toLowerCase().includes('san jose')) {
    jurisdictionFlags.push({
      flag: 'ADU Review Backlog',
      why_it_matters: 'San Jose currently processing ADU permits 15-20% slower than typical.',
      mitigation: 'Submit complete initial package to avoid multiple correction cycles.'
    });
  }

  const confidenceLevel = riskScore > 70 ? 'high' : riskScore > 50 ? 'medium' : 'low';

  return {
    risk_score: riskScore,
    approval_probability: approvalProbability,
    expected_review_time_days: reviewDays,
    confidence_level: confidenceLevel,
    summary: `Analysis indicates a ${riskScore > 65 ? 'elevated' : 'moderate'} compliance risk profile with ${topRisks.length} primary code concerns identified.`,
    top_risks: topRisks,
    jurisdiction_flags: jurisdictionFlags
  };
}