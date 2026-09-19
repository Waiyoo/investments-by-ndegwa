// app/investments/[slug]/page.tsx
import { prisma } from '@/lib/db/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import InquiryForm from '@/components/public/inquiry-form'
import { MapPin, Calendar, ShieldCheck, ArrowLeft, FileText, ExternalLink, CheckCircle2 } from 'lucide-react'

export const revalidate = 60

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const resolvedParams = await params
  const investment = await prisma.investmentOpportunity.findUnique({
    where: { slug: resolvedParams.slug },
    include: { category: true },
  })

  if (!investment || !investment.published) {
    return { title: 'Investment Not Found' }
  }

  return {
    title: investment.metaTitle || investment.title,
    description: investment.metaDescription || investment.shortDescription,
  }
}

export default async function InvestmentDetailPage({ params }: { params: { slug: string } }) {
  const resolvedParams = await params
  const investment = await prisma.investmentOpportunity.findUnique({
    where: { slug: resolvedParams.slug },
    include: {
      category: true,
      status: true,
      documents: { where: { public: true }, orderBy: { ordering: 'asc' } },
      links: { where: { public: true }, orderBy: { ordering: 'asc' } },
    },
  })

  if (!investment || !investment.published) {
    notFound()
  }

  // Safe funding progress calculation
  let fundingProgress = null
  if (investment.showFundingProgress && investment.fundingTarget && investment.amountRaised) {
    const target = Number(investment.fundingTarget)
    const raised = Number(investment.amountRaised)
    if (target > 0) {
      fundingProgress = Math.min(Math.max((raised / target) * 100, 0), 100).toFixed(1)
    }
  }

  return (
    <div className="py-12 bg-slate-50 dark:bg-slate-950 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Link
          href="/investments"
          className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to All Opportunities
        </Link>

        {/* Header Overview Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
                {investment.category.name}
              </span>
              <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                {investment.status.name}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-slate-500 font-medium">
              <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>{investment.location}</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            {investment.title}
          </h1>

          <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            {investment.shortDescription}
          </p>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-slate-100 dark:border-slate-800">
            {investment.showFundingTarget && investment.fundingTarget && (
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 space-y-1">
                <span className="text-xs text-slate-500 font-medium">Target Capital</span>
                <p className="font-bold text-slate-900 dark:text-white text-base">
                  KSh {Number(investment.fundingTarget).toLocaleString()}
                </p>
              </div>
            )}

            {investment.showMinimumInvestment && investment.minimumInvestment && (
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 space-y-1">
                <span className="text-xs text-slate-500 font-medium">Min Investment</span>
                <p className="font-bold text-slate-900 dark:text-white text-base">
                  KSh {Number(investment.minimumInvestment).toLocaleString()}
                </p>
              </div>
            )}

            {investment.showRisk && investment.riskLevel && (
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 space-y-1">
                <span className="text-xs text-slate-500 font-medium">Risk Profile</span>
                <p className="font-bold text-slate-900 dark:text-white text-base">
                  {investment.riskLevel}
                </p>
              </div>
            )}

            {investment.showDuration && investment.duration && (
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 space-y-1">
                <span className="text-xs text-slate-500 font-medium">Duration / Horizon</span>
                <p className="font-bold text-slate-900 dark:text-white text-base">
                  {investment.duration}
                </p>
              </div>
            )}
          </div>

          {/* Funding Progress Bar */}
          {fundingProgress && (
            <div className="space-y-2 pt-2">
              <div className="flex justify-between text-sm font-medium">
                <span className="text-slate-600 dark:text-slate-400">Total Capital Raised</span>
                <span className="text-emerald-600 dark:text-emerald-400">{fundingProgress}% Funded</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-3 rounded-full overflow-hidden">
                <div 
                  className="bg-emerald-600 h-full rounded-full transition-all"
                  style={{ width: `${Math.min(Number(fundingProgress), 100)}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Full Description & Returns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Opportunity Overview & Details</h2>
              <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 whitespace-pre-wrap leading-relaxed text-sm">
                {investment.fullDescription}
              </div>
            </div>

            {investment.showReturnInformation && investment.returnDescription && (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-sm space-y-4">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Return Structure & Projections</h2>
                <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/20 space-y-2">
                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                    Return Type: {investment.returnType}
                  </span>
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {investment.returnDescription}
                  </p>
                  {investment.expectedReturn && (
                    <p className="text-sm font-bold text-slate-900 dark:text-white pt-2">
                      Expected Return Benchmark: {investment.expectedReturn}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Public Documents & Links */}
            {(investment.showDocuments && investment.documents.length > 0) || (investment.showLinks && investment.links.length > 0) ? (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-sm space-y-6">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Public Documentation & Resources</h2>
                
                {investment.showDocuments && investment.documents.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">Available Documents</h3>
                    <div className="space-y-2">
                      {investment.documents.map((doc: any) => (
                        <a
                          key={doc.id}
                          href={doc.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <FileText className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                            <div>
                              <p className="text-sm font-semibold text-slate-900 dark:text-white">{doc.title}</p>
                              {doc.description && <p className="text-xs text-slate-500">{doc.description}</p>}
                            </div>
                          </div>
                          <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">View / Download</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {investment.showLinks && investment.links.length > 0 && (
                  <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">External Links</h3>
                    <div className="space-y-2">
                      {investment.links.map((link: any) => (
                        <a
                          key={link.id}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <ExternalLink className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                            <div>
                              <p className="text-sm font-semibold text-slate-900 dark:text-white">{link.title}</p>
                              {link.description && <p className="text-xs text-slate-500">{link.description}</p>}
                            </div>
                          </div>
                          <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">Open Link</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : null}
          </div>

          {/* Inquiry Form Column */}
          <div className="space-y-6">
            <div className="sticky top-24">
              <InquiryForm investmentId={investment.id} investmentTitle={investment.title} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}