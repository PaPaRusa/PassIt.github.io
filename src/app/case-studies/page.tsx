import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export default function CaseStudiesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h1 className="text-4xl font-bold text-neutral-900 mb-4">
                Case Studies
              </h1>
              <p className="text-lg text-neutral-600">
                Real-world results from developers and contractors using PermitFlow to streamline permit approvals.
              </p>
            </div>

            <div className="space-y-12">
              {/* Case Study 1 */}
              <Card className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-neutral-900 mb-2">
                      Bay Area Development Group
                    </h2>
                    <p className="text-neutral-600">Multi-family residential developer, San Jose</p>
                  </div>
                  <Badge variant="success">Residential</Badge>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-6 p-6 bg-neutral-50 rounded-lg">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary-600 mb-1">71%</div>
                    <div className="text-sm text-neutral-600">Reduction in correction cycles</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary-600 mb-1">31 days</div>
                    <div className="text-sm text-neutral-600">Faster approval timeline</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary-600 mb-1">$124K</div>
                    <div className="text-sm text-neutral-600">Estimated cost savings</div>
                  </div>
                </div>

                <div className="space-y-4 text-neutral-600">
                  <p>
                    <span className="font-semibold text-neutral-900">Challenge:</span> Bay Area Development Group was experiencing 3-4 correction cycles on ADU permits in San Jose, with average approval times exceeding 90 days. Setback violations and energy code documentation were recurring issues leading to costly delays.
                  </p>
                  <p>
                    <span className="font-semibold text-neutral-900">Solution:</span> The team integrated PermitFlow into their pre-submittal review process. Each project received a compliance risk analysis before formal submission, identifying setback conflicts, Title 24 documentation gaps, and jurisdiction-specific requirements.
                  </p>
                  <p>
                    <span className="font-semibold text-neutral-900">Results:</span> First-submittal approval rates increased from 23% to 89%. Average permit approval time decreased to 59 days. The firm eliminated $124,000 in annual carrying costs from permit delays across their project pipeline.
                  </p>
                  <blockquote className="border-l-4 border-primary-600 pl-4 italic">
                    "PermitFlow catches code issues our team would have missed. We're now submitting complete packages the first time, which has dramatically reduced our time to approval. The jurisdiction-specific flags for San Jose have been particularly valuable."
                    <footer className="text-sm mt-2 not-italic">— Development Director</footer>
                  </blockquote>
                </div>
              </Card>

              {/* Case Study 2 */}
              <Card className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-neutral-900 mb-2">
                      Pacific Coast Builders
                    </h2>
                    <p className="text-neutral-600">Commercial contractor, Bay Area</p>
                  </div>
                  <Badge variant="info">Commercial</Badge>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-6 p-6 bg-neutral-50 rounded-lg">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary-600 mb-1">58%</div>
                    <div className="text-sm text-neutral-600">Faster plan check cycles</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary-600 mb-1">94%</div>
                    <div className="text-sm text-neutral-600">First-time approval rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary-600 mb-1">18</div>
                    <div className="text-sm text-neutral-600">Projects analyzed monthly</div>
                  </div>
                </div>

                <div className="space-y-4 text-neutral-600">
                  <p>
                    <span className="font-semibold text-neutral-900">Challenge:</span> Pacific Coast Builders operates across multiple Bay Area jurisdictions, each with unique requirements. Their team struggled to maintain current knowledge of jurisdiction-specific submission requirements, leading to incomplete submittals and extended review cycles.
                  </p>
                  <p>
                    <span className="font-semibold text-neutral-900">Solution:</span> PermitFlow's jurisdiction library provided standardized checklists for San Francisco, Oakland, and San Jose submissions. The risk analysis identified missing documentation before formal submittal, including structural calculations, energy compliance forms, and stormwater management plans.
                  </p>
                  <p>
                    <span className="font-semibold text-neutral-900">Results:</span> Plan check cycle times decreased from an average of 68 days to 29 days. The firm reduced engineering consultant fees by 22% by catching structural documentation issues earlier in the process. Client satisfaction scores improved significantly due to more predictable timelines.
                  </p>
                  <blockquote className="border-l-4 border-primary-600 pl-4 italic">
                    "The jurisdiction-specific insights are game-changing. We're no longer guessing about submission requirements or getting surprised by local interpretations of code. PermitFlow has become an essential tool for our estimating and planning process."
                    <footer className="text-sm mt-2 not-italic">— Operations Manager</footer>
                  </blockquote>
                </div>
              </Card>
            </div>

            <div className="mt-16 text-center p-8 bg-neutral-50 rounded-lg">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                Ready to improve your approval rate?
              </h2>
              <p className="text-neutral-600 mb-6">
                Join development firms using PermitFlow to reduce permit risk and accelerate project timelines.
              </p>
              <Button size="lg">Start Free Trial</Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}

### `src/app/contact/page.tsx`
````````````````typescript
'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <Card className="max-w-md text-center">
            <div className="text-green-600 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-neutral-900 mb-2">Thank you!</h2>
            <p className="text-neutral-600 mb-6">
              We've received your message and will respond within 24 hours.
            </p>
            <Button onClick={() => setSubmitted(false)}>Send Another Message</Button>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h1 className="text-4xl font-bold text-neutral-900 mb-4">
                Contact Us
              </h1>
              <p className="text-lg text-neutral-600">
                Have questions about PermitFlow? We're here to help.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl font-bold text-neutral-900 mb-6">Get in Touch</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <Input label="First Name" required />
                    <Input label="Last Name" required />
                  </div>
                  
                  <Input label="Email" type="email" required />
                  
                  <Input label="Company" />
                  
                  <Select
                    label="Inquiry Type"
                    options={[
                      { value: '', label: 'Select an option' },
                      { value: 'sales', label: 'Sales & Pricing' },
                      { value: 'support', label: 'Technical Support' },
                      { value: 'enterprise', label: 'Enterprise Plans' },
                      { value: 'other', label: 'Other' }
                    ]}
                    required
                  />
                  
                  <Textarea 
                    label="Message" 
                    placeholder="Tell us how we can help..."
                    rows={6}
                    required
                  />
                  
                  <Button type="submit" className="w-full">
                    Send Message
                  </Button>
                </form>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-neutral-900 mb-6">Other Ways to Reach Us</h2>
                
                <div className="space-y-6">
                  <Card className="p-6">
                    <h3 className="font-semibold text-neutral-900 mb-2">Sales</h3>
                    <p className="text-sm text-neutral-600 mb-2">
                      Questions about pricing or enterprise plans?
                    </p>
                    <a href="mailto:sales@permitflow.com" className="text-sm text-primary-600 hover:text-primary-700">
                      sales@permitflow.com
                    </a>
                  </Card>

                  <Card className="p-6">
                    <h3 className="font-semibold text-neutral-900 mb-2">Support</h3>
                    <p className="text-sm text-neutral-600 mb-2">
                      Need help with your account or analysis?
                    </p>
                    <a href="mailto:support@permitflow.com" className="text-sm text-primary-600 hover:text-primary-700">
                      support@permitflow.com
                    </a>
                  </Card>

                  <Card className="p-6">
                    <h3 className="font-semibold text-neutral-900 mb-2">Security</h3>
                    <p className="text-sm text-neutral-600 mb-2">
                      Security inquiries or compliance questions?
                    </p>
                    <a href="mailto:security@permitflow.com" className="text-sm text-primary-600 hover:text-primary-700">
                      security@permitflow.com
                    </a>
                  </Card>

                  <div className="pt-6 border-t border-neutral-200">
                    <p className="text-sm text-neutral-600">
                      Response times: Sales inquiries within 24 hours, Support within 4 hours (Professional and Enterprise plans).
                    </p>
                  </div>
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