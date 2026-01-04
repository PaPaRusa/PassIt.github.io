import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function PricingPage() {
  const plans = [
    {
      name: 'Starter',
      price: '299',
      description: 'For individual contractors and small builders',
      features: [
        '10 risk analyses per month',
        'Basic jurisdiction library',
        'PDF export',
        'Email support',
        '30-day analysis history',
        'Standard review time predictions'
      ],
      cta: 'Start Free Trial',
      highlighted: false
    },
    {
      name: 'Professional',
      price: '799',
      description: 'For growing firms and development companies',
      features: [
        '50 risk analyses per month',
        'Full jurisdiction library',
        'Priority PDF export',
        'Priority email & chat support',
        '1-year analysis history',
        'Advanced risk factor insights',
        'Project collaboration (5 seats)',
        'API access'
      ],
      cta: 'Start Free Trial',
      highlighted: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'For large developers and multi-office firms',
      features: [
        'Unlimited risk analyses',
        'Custom jurisdiction data',
        'Dedicated success manager',
        'Phone & Slack support',
        'Unlimited history & archival',
        'Custom integrations',
        'Unlimited seats',
        'SOC 2 compliance',
        'SSO / SAML authentication',
        'SLA guarantee'
      ],
      cta: 'Contact Sales',
      highlighted: false
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h1 className="text-4xl font-bold text-neutral-900 mb-4">
                Transparent Pricing
              </h1>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                Choose the plan that fits your permit volume. All plans include 14-day free trial with no credit card required.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {plans.map((plan) => (
                <Card 
                  key={plan.name} 
                  className={plan.highlighted ? 'border-2 border-primary-600 shadow-lg' : ''}
                >
                  {plan.highlighted && (
                    <div className="text-xs font-semibold text-primary-600 mb-4">
                      MOST POPULAR
                    </div>
                  )}
                  <h3 className="text-2xl font-bold text-neutral-900 mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    {plan.price === 'Custom' ? (
                      <div className="text-3xl font-bold text-neutral-900">Custom</div>
                    ) : (
                      <>
                        <span className="text-4xl font-bold text-neutral-900">${plan.price}</span>
                        <span className="text-neutral-600">/month</span>
                      </>
                    )}
                  </div>
                  <p className="text-sm text-neutral-600 mb-6">{plan.description}</p>
                  
                  <Link href={plan.price === 'Custom' ? '/contact' : '/signup'}>
                    <Button 
                      variant={plan.highlighted ? 'primary' : 'secondary'} 
                      className="w-full mb-6"
                    >
                      {plan.cta}
                    </Button>
                  </Link>

                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start text-sm text-neutral-600">
                        <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>

            <div className="bg-neutral-50 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-6 text-center">
                Frequently Asked Questions
              </h2>
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <div>
                  <h3 className="font-semibold text-neutral-900 mb-2">What counts as an analysis?</h3>
                  <p className="text-sm text-neutral-600">
                    Each unique risk score generation counts as one analysis. Re-analyzing the same project with updated plans counts as a new analysis.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900 mb-2">Can I upgrade or downgrade?</h3>
                  <p className="text-sm text-neutral-600">
                    Yes, you can change plans at any time. Upgrades are immediate; downgrades take effect at your next billing cycle.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900 mb-2">What jurisdictions are supported?</h3>
                  <p className="text-sm text-neutral-600">
                    We currently support major California jurisdictions with expanding coverage. Enterprise plans can request custom jurisdiction data.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900 mb-2">Is this legal advice?</h3>
                  <p className="text-sm text-neutral-600">
                    No. PermitFlow is a decision support tool. Final permit authority remains with the jurisdiction AHJ. Consult licensed professionals.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}