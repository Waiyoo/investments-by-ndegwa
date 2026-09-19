// app/page.tsx
import Link from 'next/link'
import { prisma } from '@/lib/db/prisma'
import { getPublicInvestments } from '@/app/actions/public'
import { ArrowRight, ShieldCheck, TrendingUp, Building2, Sprout, CheckCircle2, Phone, MapPin } from 'lucide-react'

export const revalidate = 60 // Revalidate cache every 60 seconds

export default async function HomePage() {
  // Fetch featured published investments
  let featuredInvestments: Awaited<ReturnType<typeof getPublicInvestments>> = []
  try {
    const allInvestments = await getPublicInvestments({ sort: 'newest' })
    featuredInvestments = allInvestments.filter((i) => i.featured).slice(0, 3)
    if (featuredInvestments.length === 0) {
      featuredInvestments = allInvestments.slice(0, 3)
    }
  } catch (err) {
    console.error('Failed to load featured investments on home:', err)
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white py-24 lg:py-32 border-b border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-900/20 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold tracking-wide uppercase">
              <ShieldCheck className="w-4 h-4" />
              Vetted Investment Opportunities in East Africa
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-[1.1]">
              Curated Capital Opportunities for Discerning Investors
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl">
              Ndegwa Investments connects qualified investors with rigorously vetted commercial, agricultural, and real estate ventures in Nairobi and across Kenya.
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <Link
                href="/investments"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-base transition-all shadow-lg shadow-emerald-600/25 active:scale-95"
              >
                Browse Opportunities
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-base transition-all border border-slate-700"
              >
                Contact Our Team
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Opportunities Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold text-xs tracking-wider uppercase">
                Active Offerings
              </span>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mt-1">
                Featured Investment Opportunities
              </h2>
            </div>
            <Link
              href="/investments"
              className="mt-4 md:mt-0 inline-flex items-center text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
            >
              View all opportunities <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          {featuredInvestments.length === 0 ? (
            <div className="text-center py-16 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                No active investment opportunities are currently published. Please check back shortly.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredInvestments.map((inv) => (
                <div
                  key={inv.id}
                  className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col group"
                >
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
                          {inv.category.name}
                        </span>
                        <span className="text-xs text-slate-500 font-medium">
                          {inv.location}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        {inv.title}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                        {inv.shortDescription}
                      </p>
                    </div>

                    <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                      {inv.fundingTarget && (
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-500">Target Capital:</span>
                          <span className="font-semibold text-slate-900 dark:text-white">
                            KSh {Number(inv.fundingTarget).toLocaleString()}
                          </span>
                        </div>
                      )}
                      {inv.returnDescription && (
                        <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 text-xs text-slate-600 dark:text-slate-300">
                          <strong className="text-emerald-600 dark:text-emerald-400">Return:</strong> {inv.returnDescription}
                        </div>
                      )}
                      <Link
                        href={`/investments/${inv.slug}`}
                        className="w-full flex items-center justify-center py-2.5 rounded-lg bg-slate-900 hover:bg-emerald-600 dark:bg-slate-800 dark:hover:bg-emerald-600 text-white font-medium text-sm transition-colors"
                      >
                        View Opportunity Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold text-xs tracking-wider uppercase">
              Streamlined Process
            </span>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              How Opportunity Engagement Works
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              Our structured approach ensures transparent presentation and direct connection between qualified investors and project sponsors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-600/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-lg">
                01
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Browse & Evaluate</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Explore published investment opportunities across real estate, agriculture, and commercial sectors with complete visibility into targets, returns, and documentation.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-600/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-lg">
                02
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Express Interest</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Submit your investment interest securely through our inquiry form, specifying your intended capital allocation and questions for the advisory team.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-600/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-lg">
                03
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Direct Consultation</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Our team reviews your submission and schedules a direct consultation to discuss project documentation, terms, and partnership modalities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Ndegwa Investments */}
      <section className="py-20 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold text-xs tracking-wider uppercase">
                Institutional Standards
              </span>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                Why Consider Opportunities Presented by Ndegwa Investments
              </h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                We maintain rigorous standards in sourcing and presenting investment opportunities. Every project undergoes thorough evaluation before publication on our platform.
              </p>
              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white text-sm">Rigorous Opportunity Selection</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Carefully vetted ventures with clear operational models and market demand in Kenya.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white text-sm">Transparent Presentation</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Explicit disclosure of funding targets, return structures, risk profiles, and documentation.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white text-sm">Direct Local Presence</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Based in Nairobi, Kenya, providing local expertise and accessible advisory support.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Get in Touch with Our Team</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Have questions regarding our current investment opportunities or wish to discuss partnership structures? Reach out to our Nairobi headquarters directly.
              </p>
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
                  <Phone className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                  <span>+254 799 357 038 / 0799357038</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
                  <MapPin className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                  <span>Nairobi, Kenya</span>
                </div>
              </div>
              <Link
                href="/contact"
                className="w-full flex items-center justify-center py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-sm transition-all shadow-sm"
              >
                Send an Inquiry Message
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}