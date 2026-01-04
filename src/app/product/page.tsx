import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card } from '@/components/ui/Card';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function ProductPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h1 className="text-4xl font-bold text-neutral-900 mb-4">
                How PermitFlow Works
              </h1>
              <p className="text-lg text-neutral-600">
                Comprehensive compliance analysis that integrates with your existing workflow to reduce permit review cycles and increase first-submittal approval rates.
              </p>
            </div>

            <div className="space-y-20">
              {/* Step 1 */}
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="text-sm font-medium text-primary-600 mb-2">Step 1</div>
                  <h2 className="text-3xl font-bold text-neutral-900 mb-4">
                    Create Your Project
                  </h2>
                  <p className="text-neutral-600 mb-6">
                    Input basic project details including location, project type, building classification, and scope of work. Our system uses jurisdiction-specific data to contextualize your analysis.
                  </p>
                  <ul className="space-y-3 text-sm text-neutral-600">
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Jurisdiction-aware analysis
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Support for all permit types
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Project organization by client or site
                    </li>
                  </ul>
                </div>
                <Card className="bg-neutral-50">
                  <div className="h-64 flex items-center justify-center text-neutral-400">
                    Project Creation Interface Preview
                  </div>
                </Card>
              </div>

              {/* Step 2 */}
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <Card className="bg-neutral-50 order-2 md:order-1">
                  <div className="h-64 flex items-center justify-center text-neutral-400">
                    Document Upload & Analysis Preview
                  </div>
                </Card>
                <div className="order-1 md:order-2">
                  <div className="text-sm font-medium text-primary-600 mb-2">Step 2</div>
                  <h2 className="text-3xl font-bold text-neutral-900 mb-4">
                    Submit Plans & Documents
                  </h2>
                  <p className="text-neutral-600 mb-6">
                    Upload architectural plans, engineering calculations, or paste project notes. Our analysis engine reviews for code compliance, setback requirements, energy code, and jurisdiction-specific factors.
                  </p>
                  <ul className="space-y-3 text-sm text-neutral-600">
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      PDF plan upload supported
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Text-based scope input
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Secure encrypted storage
                    </li>
                  </ul>
                </div>
              </div>

              {/* Step 3 */}
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="text-sm font-medium text-primary-600 mb-2">Step 3</div>
                  <h2 className="text-3xl font-bold text-neutral-900 mb-4">
                    Review Risk Analysis
                  </h2>
                  <p className="text-neutral-600 mb-6">
                    Receive quantified risk scores, approval probability, expected review time, and actionable recommendations. Each risk factor includes code references and specific fix suggestions.
                  </p>
                  <ul className="space-y-3 text-sm text-neutral-600">
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Ranked risk factors with severity
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Building code references
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Actionable fix recommendations
                    </li>
                  </ul>
                </div>
                <Card className="bg-neutral-50">
                  <div className="h-64 flex items-center justify-center text-neutral-400">
                    Risk Analysis Results Preview
                  </div>
                </Card>
              </div>

              {/* Step 4 */}
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <Card className="bg-neutral-50 order-2 md:order-1">
                  <div className="h-64 flex items-center justify-center text-neutral-400">
                    Export & Documentation Preview
                  </div>
                </Card>
                <div className="order-1 md:order-2">
                  <div className="text-sm font-medium text-primary-600 mb-2">Step 4</div>
                  <h2 className="text-3xl font-bold text-neutral-900 mb-4">
                    Export & Iterate
                  </h2>
                  <p className="text-neutral-600 mb-6">
                    Generate PDF reports for internal review or client communication. Re-analyze updated plans to track risk reduction as you address compliance issues.
                  </p>
                  <ul className="space-y-3 text-sm text-neutral-600">
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Professional PDF export
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Analysis history tracking
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Risk trend visualization
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-20 text-center">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                Ready to get started?
              </h2>
              <Link href="/signup">
                <Button size="lg">Start Free Trial</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}