// app/investments/[slug]/page.tsx
import { prisma } from '@/lib/db/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Footer from '@/components/public/footer'
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
    <div className="flex flex-col min-h-screen bg-[#FAF7F2] text-[#1F1A15] overflow-x-hidden antialiased">

      {/* =========================================================================
          GLOBAL STYLES — Institutional Design System
          ========================================================================= */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Inter:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap');

            .font-serif { font-family: 'Cormorant Garamond', Georgia, serif; font-optical-sizing: auto; }
            .font-sans { font-family: 'Inter', system-ui, sans-serif; }
            .font-mono { font-family: 'IBM Plex Mono', ui-monospace, monospace; }

            :root {
              --accent: #A8763E;
              --accent-deep: #7A5222;
              --accent-soft: #C9A46A;
              --ink: #1F1A15;
              --ink-soft: #2B241D;
              --paper: #FAF7F2;
              --bone: #F1EBE1;
              --dark: #231C16;
              --line: rgba(31,26,21,0.10);
              --line-strong: rgba(31,26,21,0.20);
            }

            @keyframes fadeUp {
              from { opacity: 0; transform: translateY(24px); }
              to { opacity: 1; transform: translateY(0); }
            }
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes drawLineX {
              from { transform: scaleX(0); }
              to { transform: scaleX(1); }
            }
            @keyframes blink {
              0%, 55% { opacity: 1; }
              56%, 100% { opacity: 0.35; }
            }
            @keyframes marqueeSlow {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            @keyframes progressShine {
              0% { background-position: -200% 0; }
              100% { background-position: 200% 0; }
            }

            .anim-fade-up { animation: fadeUp 1.1s cubic-bezier(0.22,1,0.36,1) both; }
            .anim-fade-in { animation: fadeIn 1.4s cubic-bezier(0.22,1,0.36,1) both; }
            .anim-draw-x { animation: drawLineX 1.6s cubic-bezier(0.77,0,0.175,1) both; transform-origin: left; }
            .anim-blink { animation: blink 2s steps(1) infinite; }
            .anim-marquee-slow { animation: marqueeSlow 90s linear infinite; }
            .anim-progress-shine {
              background-size: 200% 100%;
              animation: progressShine 4s ease-in-out infinite;
              background-image: linear-gradient(90deg, #A8763E 0%, #C9A46A 25%, #A8763E 50%, #C9A46A 75%, #A8763E 100%);
            }

            .d-1 { animation-delay: 0.10s; }
            .d-2 { animation-delay: 0.20s; }
            .d-3 { animation-delay: 0.30s; }
            .d-4 { animation-delay: 0.40s; }
            .d-5 { animation-delay: 0.50s; }
            .d-6 { animation-delay: 0.60s; }

            /* Grain */
            .grain::after {
              content:'';
              position: fixed; inset: 0; z-index: 9998; pointer-events: none;
              opacity: 0.02;
              background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 260 260' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
            }

            /* Institutional image treatment — warmed */
            .img-inst { filter: saturate(0.65) contrast(1.02) brightness(0.98) sepia(0.08); }

            /* Institutional label */
            .label-inst {
              font-family: 'IBM Plex Mono', monospace;
              font-size: 0.65rem;
              letter-spacing: 0.32em;
              text-transform: uppercase;
              font-weight: 500;
            }

            .label-inst-sm {
              font-family: 'IBM Plex Mono', monospace;
              font-size: 0.6rem;
              letter-spacing: 0.28em;
              text-transform: uppercase;
              font-weight: 500;
            }

            /* Prose styling for full description — warm ink */
            .prose-inst {
              font-family: 'Inter', system-ui, sans-serif;
              font-size: 0.95rem;
              line-height: 1.85;
              color: rgba(31,26,21,0.75);
              white-space: pre-wrap;
            }
            .prose-inst p { margin-bottom: 1.1em; }
            .prose-inst strong { color: #1F1A15; font-weight: 600; }
            .prose-inst em { font-style: italic; }

            ::-webkit-scrollbar { width: 10px; height: 10px; }
            ::-webkit-scrollbar-track { background: #FAF7F2; }
            ::-webkit-scrollbar-thumb { background: rgba(31,26,21,0.22); }
            ::-webkit-scrollbar-thumb:hover { background: #A8763E; }
          `,
        }}
      />

      {/* =========================================================================
          1. HEADER — INSTITUTIONAL OPPORTUNITY FILE
          ========================================================================= */}
      <section className="relative bg-[#231C16] text-white overflow-hidden border-b border-white/10">

        {/* Background image — architecture / property */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2600&q=90"
            alt=""
            className="w-full h-full object-cover opacity-[0.20] img-inst"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#231C16] via-[#231C16]/90 to-[#231C16]/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#231C16] via-transparent to-[#231C16]/40" />
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-10 pt-24 lg:pt-32 pb-16 lg:pb-20">

          {/* Back link */}
          <Link
            href="/investments"
            className="inline-flex items-center gap-3 label-inst text-white/60 hover:text-[#C9A46A] transition-colors duration-500 mb-12 anim-fade-up"
          >
            <ArrowLeft className="w-3.5 h-3.5" strokeWidth={1.5} />
            Back to All Opportunities
          </Link>

          <div className="grid grid-cols-12 gap-8">

            {/* Left — title block */}
            <div className="col-span-12 lg:col-span-8">
              {/* Meta row */}
              <div className="flex flex-wrap items-center gap-4 mb-10 anim-fade-up d-1">
                <span className="label-inst text-[#C9A46A] border border-[#A8763E]/50 px-3.5 py-1.5 bg-[#A8763E]/15">
                  {investment.category.name}
                </span>
                <span className="label-inst text-white/70 border border-white/20 px-3.5 py-1.5">
                  {investment.status.name}
                </span>
                <span className="flex items-center gap-2 label-inst text-white/55">
                  <MapPin className="w-3.5 h-3.5 text-[#C9A46A]" strokeWidth={1.5} />
                  {investment.location}
                </span>
              </div>

              <h1 className="font-serif font-light text-white text-[2.25rem] sm:text-[3rem] lg:text-[4rem] leading-[1.05] tracking-[-0.02em] mb-8 max-w-[24ch] anim-fade-up d-2">
                {investment.title}
              </h1>

              <p className="text-lg lg:text-xl text-white/70 leading-[1.75] font-light max-w-[60ch] anim-fade-up d-3">
                {investment.shortDescription}
              </p>
            </div>

            {/* Right — reference panel */}
            <div className="col-span-12 lg:col-span-4 lg:border-l lg:border-white/15 lg:pl-16 flex flex-col justify-end anim-fade-in d-4">
              <div className="mb-6">
                <span className="label-inst text-white/45 block mb-3">Opportunity File</span>
                <span className="w-8 h-px bg-[#A8763E] block" />
              </div>

              <div className="flex flex-col">
                <div className="flex items-baseline justify-between py-5 border-b border-white/12">
                  <span className="label-inst text-white/50">Reference</span>
                  <span className="font-mono text-xs text-white/85">
                    {investment.slug.slice(0, 12).toUpperCase()}
                  </span>
                </div>
                <div className="flex items-baseline justify-between py-5 border-b border-white/12">
                  <span className="label-inst text-white/50">Status</span>
                  <span className="flex items-center gap-2 font-serif text-base text-white">
                    <span className="w-1.5 h-1.5 bg-[#A8763E] rounded-full anim-blink" />
                    {investment.status.name}
                  </span>
                </div>
                <div className="flex items-baseline justify-between py-5 border-b border-white/12 last:border-b-0">
                  <span className="label-inst text-white/50">Sector</span>
                  <span className="font-serif text-base text-white">{investment.category.name}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. MARQUEE STRIP — CONTINUITY
          ========================================================================= */}
      <div className="bg-[#231C16] text-white border-b border-white/10 py-5 overflow-hidden">
        <div className="flex whitespace-nowrap anim-marquee-slow w-max label-inst text-white/35">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex items-center">
              {[
                investment.category.name,
                investment.location,
                'Verified Documentation',
                'Institutional Grade',
                'Nairobi · Kenya',
                investment.status.name,
              ].map((item, i) => (
                <span key={`${item}-${i}`} className="flex items-center">
                  <span className="px-10">{item}</span>
                  <span className="w-1 h-1 rounded-full bg-[#A8763E]" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* =========================================================================
          3. KEY METRICS — HAIRLINE DIVIDED GRID
          ========================================================================= */}
      {(investment.showFundingTarget && investment.fundingTarget) ||
       (investment.showMinimumInvestment && investment.minimumInvestment) ||
       (investment.showRisk && investment.riskLevel) ||
       (investment.showDuration && investment.duration) ? (
        <section className="bg-[#FAF7F2] border-b border-[var(--line)]">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
            <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-[var(--line)]">

              {investment.showFundingTarget && investment.fundingTarget && (
                <div className="py-10 px-6 lg:px-8 anim-fade-up d-1">
                  <span className="label-inst text-[#1F1A15]/45 block mb-4">Target Capital</span>
                  <span className="font-serif text-2xl lg:text-3xl font-light text-[#1F1A15] block tracking-[-0.02em]">
                    KSh {Number(investment.fundingTarget).toLocaleString()}
                  </span>
                </div>
              )}

              {investment.showMinimumInvestment && investment.minimumInvestment && (
                <div className="py-10 px-6 lg:px-8 anim-fade-up d-2">
                  <span className="label-inst text-[#1F1A15]/45 block mb-4">Minimum Investment</span>
                  <span className="font-serif text-2xl lg:text-3xl font-light text-[#1F1A15] block tracking-[-0.02em]">
                    KSh {Number(investment.minimumInvestment).toLocaleString()}
                  </span>
                </div>
              )}

              {investment.showRisk && investment.riskLevel && (
                <div className="py-10 px-6 lg:px-8 anim-fade-up d-3">
                  <span className="label-inst text-[#1F1A15]/45 block mb-4">Risk Profile</span>
                  <span className="font-serif text-2xl lg:text-3xl font-light text-[#1F1A15] block tracking-[-0.02em]">
                    {investment.riskLevel}
                  </span>
                </div>
              )}

              {investment.showDuration && investment.duration && (
                <div className="py-10 px-6 lg:px-8 anim-fade-up d-4">
                  <span className="label-inst text-[#1F1A15]/45 block mb-4">Duration / Horizon</span>
                  <span className="font-serif text-2xl lg:text-3xl font-light text-[#1F1A15] block tracking-[-0.02em]">
                    {investment.duration}
                  </span>
                </div>
              )}

            </div>
          </div>
        </section>
      ) : null}

      {/* =========================================================================
          4. MAIN CONTENT — OVERVIEW + INQUIRY FORM
          ========================================================================= */}
      <section className="bg-[#FAF7F2] py-16 lg:py-24">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-12 gap-8 lg:gap-16">

            {/* LEFT: Main content */}
            <div className="col-span-12 lg:col-span-8 space-y-12">

              {/* Funding progress */}
              {fundingProgress && (
                <div className="bg-white border border-[var(--line)] p-8 lg:p-10 anim-fade-up relative">
                  <div className="absolute top-0 left-0 w-16 h-px bg-[#A8763E]" />

                  <div className="flex items-start justify-between gap-6 mb-8">
                    <div>
                      <div className="flex items-center gap-4 mb-3">
                        <span className="label-inst text-[#1F1A15]/45">Funding Progress</span>
                        <span className="w-8 h-px bg-[#A8763E]" />
                      </div>
                      <h3 className="font-serif text-[1.5rem] lg:text-[1.75rem] font-normal tracking-[-0.01em] text-[#1F1A15]">
                        Total Capital Raised
                      </h3>
                    </div>
                    <span className="font-serif text-4xl lg:text-5xl font-light text-[#A8763E] tracking-[-0.02em] leading-none">
                      {fundingProgress}%
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-[#F1EBE1] h-1.5 relative overflow-hidden">
                    <div
                      className="absolute top-0 left-0 h-full bg-[#A8763E] anim-progress-shine transition-all duration-1000"
                      style={{ width: `${Math.min(Number(fundingProgress), 100)}%` }}
                    />
                  </div>

                  {/* Data row */}
                  <div className="grid grid-cols-2 gap-6 mt-8 pt-6 border-t border-[var(--line)]">
                    <div>
                      <span className="label-inst-sm text-[#1F1A15]/45 block mb-2">Raised</span>
                      <span className="font-serif text-lg text-[#1F1A15]">
                        KSh {Number(investment.amountRaised || 0).toLocaleString()}
                      </span>
                    </div>
                    <div>
                      <span className="label-inst-sm text-[#1F1A15]/45 block mb-2">Target</span>
                      <span className="font-serif text-lg text-[#1F1A15]">
                        KSh {Number(investment.fundingTarget || 0).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Opportunity Overview */}
              <article className="bg-white border border-[var(--line)] p-8 lg:p-12 anim-fade-up d-1 relative">
                <div className="absolute top-0 left-0 w-16 h-px bg-[#A8763E]" />

                <div className="flex items-center gap-4 mb-8">
                  <span className="label-inst text-[#1F1A15]/45">01 — Overview</span>
                  <span className="w-8 h-px bg-[#A8763E]" />
                </div>

                <h2 className="font-serif text-[1.75rem] lg:text-[2.25rem] font-normal tracking-[-0.01em] text-[#1F1A15] leading-[1.15] mb-8 max-w-[24ch]">
                  Opportunity overview & details
                </h2>

                <div className="prose-inst border-t border-[var(--line)] pt-8">
                  {investment.fullDescription}
                </div>
              </article>

              {/* Return Structure */}
              {investment.showReturnInformation && investment.returnDescription && (
                <article className="bg-white border border-[var(--line)] p-8 lg:p-12 anim-fade-up d-2 relative">
                  <div className="absolute top-0 left-0 w-16 h-px bg-[#A8763E]" />

                  <div className="flex items-center gap-4 mb-8">
                    <span className="label-inst text-[#1F1A15]/45">02 — Returns</span>
                    <span className="w-8 h-px bg-[#A8763E]" />
                  </div>

                  <h2 className="font-serif text-[1.75rem] lg:text-[2.25rem] font-normal tracking-[-0.01em] text-[#1F1A15] leading-[1.15] mb-8 max-w-[24ch]">
                    Return structure & projections
                  </h2>

                  {/* Return type header */}
                  <div className="flex items-center gap-4 mb-6">
                    <span className="label-inst text-[#A8763E]">
                      Return Type · {investment.returnType}
                    </span>
                  </div>

                  {/* Return description box */}
                  <div className="border-l-2 border-[#A8763E] bg-[#A8763E]/[0.06] px-6 py-5 mb-6">
                    <p className="text-[0.95rem] leading-[1.85] text-[#1F1A15]/85">
                      {investment.returnDescription}
                    </p>
                  </div>

                  {/* Expected return data row */}
                  {investment.expectedReturn && (
                    <div className="pt-6 border-t border-[var(--line)] flex items-baseline justify-between">
                      <span className="label-inst text-[#1F1A15]/45">Expected Return Benchmark</span>
                      <span className="font-serif text-2xl text-[#1F1A15] tracking-[-0.02em]">
                        {investment.expectedReturn}
                      </span>
                    </div>
                  )}
                </article>
              )}

              {/* Public Documents & Links */}
              {((investment.showDocuments && investment.documents.length > 0) ||
                (investment.showLinks && investment.links.length > 0)) && (
                <article className="bg-white border border-[var(--line)] p-8 lg:p-12 anim-fade-up d-3 relative">
                  <div className="absolute top-0 left-0 w-16 h-px bg-[#A8763E]" />

                  <div className="flex items-center gap-4 mb-8">
                    <span className="label-inst text-[#1F1A15]/45">03 — Resources</span>
                    <span className="w-8 h-px bg-[#A8763E]" />
                  </div>

                  <h2 className="font-serif text-[1.75rem] lg:text-[2.25rem] font-normal tracking-[-0.01em] text-[#1F1A15] leading-[1.15] mb-8 max-w-[24ch]">
                    Public documentation & resources
                  </h2>

                  {/* Documents */}
                  {investment.showDocuments && investment.documents.length > 0 && (
                    <div className="mb-8">
                      <span className="label-inst-sm text-[#1F1A15]/45 block mb-4">
                        Available Documents
                      </span>
                      <div className="border-t border-[var(--line)]">
                        {investment.documents.map((doc: any) => (
                          <a
                            key={doc.id}
                            href={doc.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center justify-between gap-6 py-5 border-b border-[var(--line)] hover:pl-2 transition-all duration-500"
                          >
                            <div className="flex items-start gap-5 min-w-0">
                              <FileText className="w-4 h-4 text-[#A8763E] flex-shrink-0 mt-1" strokeWidth={1.5} />
                              <div className="min-w-0">
                                <p className="text-sm font-medium text-[#1F1A15] truncate">
                                  {doc.title}
                                </p>
                                {doc.description && (
                                  <p className="text-xs text-[#1F1A15]/50 mt-1 font-mono">
                                    {doc.description}
                                  </p>
                                )}
                              </div>
                            </div>
                            <span className="label-inst-sm text-[#1F1A15]/60 group-hover:text-[#A8763E] whitespace-nowrap flex items-center gap-2 transition-colors">
                              View / Download
                              <ExternalLink className="w-3 h-3" strokeWidth={1.5} />
                            </span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Links */}
                  {investment.showLinks && investment.links.length > 0 && (
                    <div className={investment.showDocuments && investment.documents.length > 0 ? 'pt-8 border-t border-[var(--line)]' : ''}>
                      <span className="label-inst-sm text-[#1F1A15]/45 block mb-4">
                        External Links
                      </span>
                      <div className="border-t border-[var(--line)]">
                        {investment.links.map((link: any) => (
                          <a
                            key={link.id}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center justify-between gap-6 py-5 border-b border-[var(--line)] hover:pl-2 transition-all duration-500"
                          >
                            <div className="flex items-start gap-5 min-w-0">
                              <ExternalLink className="w-4 h-4 text-[#A8763E] flex-shrink-0 mt-1" strokeWidth={1.5} />
                              <div className="min-w-0">
                                <p className="text-sm font-medium text-[#1F1A15] truncate">
                                  {link.title}
                                </p>
                                {link.description && (
                                  <p className="text-xs text-[#1F1A15]/50 mt-1 font-mono">
                                    {link.description}
                                  </p>
                                )}
                              </div>
                            </div>
                            <span className="label-inst-sm text-[#1F1A15]/60 group-hover:text-[#A8763E] whitespace-nowrap flex items-center gap-2 transition-colors">
                              Open Link
                              <ExternalLink className="w-3 h-3" strokeWidth={1.5} />
                            </span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </article>
              )}

            </div>

            {/* RIGHT: Inquiry Form (sticky) */}
            <div className="col-span-12 lg:col-span-4">
              <div className="lg:sticky lg:top-24 anim-fade-up d-4">
                <InquiryForm investmentId={investment.id} investmentTitle={investment.title} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. FOOTER — SHARED COMPONENT
          ========================================================================= */}
      <Footer />

    </div>
  )
}