// app/investments/page.tsx
import { getPublicInvestments } from '@/app/actions/public'
import { prisma } from '@/lib/db/prisma'
import Link from 'next/link'
import {
  Search,
  Filter,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  SlidersHorizontal,
  Building2,
  Globe,
  Award,
  TrendingUp,
} from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function InvestmentsPage({
  searchParams,
}: {
  searchParams: { category?: string; status?: string; search?: string; sort?: string }
}) {
  const queryParams = await searchParams

  let investments: any[] = []
  let categories: any[] = []
  let statuses: any[] = []

  try {
    investments = await getPublicInvestments({
      category: queryParams.category,
      status: queryParams.status,
      search: queryParams.search,
      sort: (queryParams.sort as any) || 'newest',
    })

    categories = await prisma.investmentCategory.findMany({
      where: { active: true },
      orderBy: { ordering: 'asc' },
    })

    statuses = await prisma.investmentStatus.findMany({
      where: { active: true },
      orderBy: { ordering: 'asc' },
    })
  } catch (err) {
    console.error('Failed to load investments discovery data:', err)
  }

  const activeFilterCount = [
    queryParams.category,
    queryParams.status,
    queryParams.search,
  ].filter(Boolean).length

  return (
    <div className="flex flex-col min-h-screen bg-[#FBFBF9] text-[#0E0E0E] overflow-x-hidden antialiased">

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
              --red: #B01E28;
              --red-deep: #7A1219;
              --ink: #0E0E0E;
              --ink-soft: #1A1A1A;
              --paper: #FBFBF9;
              --bone: #F2F0EB;
              --line: rgba(14,14,14,0.10);
              --line-strong: rgba(14,14,14,0.20);
            }

            @keyframes fadeUp {
              from { opacity: 0; transform: translateY(24px); }
              to { opacity: 1; transform: translateY(0); }
            }
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes slowPan {
              0%, 100% { transform: scale(1.05) translate(0, 0); }
              50% { transform: scale(1.10) translate(-1%, -0.5%); }
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

            .anim-fade-up { animation: fadeUp 1.1s cubic-bezier(0.22,1,0.36,1) both; }
            .anim-fade-in { animation: fadeIn 1.4s cubic-bezier(0.22,1,0.36,1) both; }
            .anim-slow-pan { animation: slowPan 32s ease-in-out infinite; }
            .anim-draw-x { animation: drawLineX 1.6s cubic-bezier(0.77,0,0.175,1) both; transform-origin: left; }
            .anim-blink { animation: blink 2s steps(1) infinite; }
            .anim-marquee-slow { animation: marqueeSlow 90s linear infinite; }

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

            /* Institutional image treatment */
            .img-inst { filter: saturate(0.55) contrast(1.02) brightness(0.98); }
            .img-inst-hero { filter: saturate(0.5) contrast(1.05) brightness(0.88); }

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

            /* Line clamp */
            .line-clamp-2 {
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              overflow: hidden;
            }

            /* Custom select arrow */
            .select-inst {
              appearance: none;
              -webkit-appearance: none;
              background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%23B01E28' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
              background-repeat: no-repeat;
              background-position: right 1.15rem center;
              padding-right: 2.75rem;
            }

            ::-webkit-scrollbar { width: 10px; height: 10px; }
            ::-webkit-scrollbar-track { background: #FBFBF9; }
            ::-webkit-scrollbar-thumb { background: rgba(14,14,14,0.22); }
            ::-webkit-scrollbar-thumb:hover { background: #B01E28; }
          `,
        }}
      />

      {/* =========================================================================
          1. PAGE HEADER — INSTITUTIONAL DISCOVERY PORTAL
          ========================================================================= */}
      <section className="relative bg-[#0E0E0E] text-white overflow-hidden">

        {/* Background image — corporate architecture */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2600&q=90"
            alt=""
            className="w-full h-full object-cover opacity-[0.20] img-inst-hero anim-slow-pan"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0E0E0E] via-[#0E0E0E]/88 to-[#0E0E0E]/55" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E0E] via-transparent to-[#0E0E0E]/40" />
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-10 pt-32 lg:pt-40 pb-16 lg:pb-20">

          {/* Top bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 mb-12 border-b border-white/12 anim-fade-up">
            <div className="flex items-center gap-4">
              <span className="w-10 h-px bg-[#B01E28]" />
              <span className="label-inst text-white/60">
                Discovery Portal · Live Opportunities
              </span>
            </div>
            <div className="flex items-center gap-3 label-inst text-white/45">
              <span className="w-1.5 h-1.5 bg-[#B01E28] rounded-full anim-blink" />
              Updated Continuously
            </div>
          </div>

          {/* Headline */}
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-8">
              <h1 className="font-serif font-light text-white text-[2.75rem] sm:text-[4rem] lg:text-[5.5rem] leading-[1.02] tracking-[-0.02em] mb-8 max-w-[20ch] anim-fade-up d-1">
                Investment <em className="italic font-normal text-[#B01E28]">opportunities</em>.
              </h1>

              <p className="text-lg lg:text-xl text-white/70 leading-[1.75] font-light max-w-[56ch] anim-fade-up d-3">
                Explore and filter curated investment opportunities. Select any opportunity to review detailed documentation, return structures, and express your interest.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. KEY STATS STRIP
          ========================================================================= */}
      <section className="bg-[#FBFBF9] border-b border-[var(--line)]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-[var(--line)]">
            {[
              { v: investments.length, k: 'Active Opportunities' },
              { v: categories.length, k: 'Sectors Covered' },
              { v: '100%', k: 'Vetted & Verified' },
              { v: 'Nairobi', k: 'Headquartered' },
            ].map((s, i) => (
              <div
                key={i}
                className="py-10 px-6 lg:px-8 anim-fade-up"
                style={{ animationDelay: `${0.1 + i * 0.1}s` }}
              >
                <span className="font-serif text-3xl lg:text-[2.25rem] font-light text-[#0E0E0E] block mb-3 tracking-[-0.02em]">
                  {s.v}
                </span>
                <span className="label-inst text-[#0E0E0E]/45">{s.k}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. MARQUEE STRIP
          ========================================================================= */}
      <div className="bg-[#0E0E0E] text-white border-b border-white/10 py-5 overflow-hidden">
        <div className="flex whitespace-nowrap anim-marquee-slow w-max label-inst text-white/35">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex items-center">
              {['Real Estate', 'Agriculture', 'Commercial', 'Private Equity', 'Sustainable Growth', 'Nairobi · Kenya'].map((item) => (
                <span key={item} className="flex items-center">
                  <span className="px-10">{item}</span>
                  <span className="w-1 h-1 rounded-full bg-[#B01E28]" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* =========================================================================
          4. FILTER BAR — INSTITUTIONAL SEARCH
          ========================================================================= */}
      <section className="relative bg-[#FBFBF9] py-16 lg:py-20 border-b border-[var(--line)] overflow-hidden">

        {/* Ghosted executive image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2400&q=80"
            alt=""
            className="w-full h-full object-cover opacity-[0.03] img-inst anim-slow-pan"
          />
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-10">

          {/* Section header */}
          <div className="grid grid-cols-12 gap-8 mb-12 items-end">
            <div className="col-span-12 lg:col-span-3">
              <span className="label-inst text-[#0E0E0E]/45 block mb-4">01 — Filter & Refine</span>
              <span className="w-10 h-px bg-[#B01E28] block" />
            </div>
            <div className="col-span-12 lg:col-span-9 flex flex-wrap items-end justify-between gap-6">
              <h2 className="font-serif font-light text-[2rem] sm:text-[2.5rem] lg:text-[3rem] leading-[1.05] tracking-[-0.02em] text-[#0E0E0E] max-w-[24ch]">
                Refine your <em className="italic font-normal text-[#B01E28]">search</em>.
              </h2>

              {activeFilterCount > 0 && (
                <span className="inline-flex items-center gap-3 label-inst text-[#B01E28] border border-[#B01E28]/40 px-4 py-2.5 bg-[#B01E28]/5">
                  <SlidersHorizontal className="w-3.5 h-3.5" strokeWidth={1.5} />
                  {activeFilterCount} {activeFilterCount === 1 ? 'Filter' : 'Filters'} Active
                </span>
              )}
            </div>
          </div>

          {/* Filter form */}
          <form
            method="GET"
            className="relative bg-white border border-[var(--line)] p-6 lg:p-8 anim-fade-up"
          >
            {/* Top red hairline */}
            <div className="absolute top-0 left-0 w-24 h-px bg-[#B01E28]" />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">

              {/* Search */}
              <div className="relative md:col-span-1">
                <label className="label-inst-sm text-[#0E0E0E]/45 block mb-3">
                  Search
                </label>
                <div className="relative">
                  <Search
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B01E28] pointer-events-none"
                    strokeWidth={1.5}
                  />
                  <input
                    type="text"
                    name="search"
                    defaultValue={queryParams.search || ''}
                    placeholder="Search opportunities..."
                    className="w-full pl-11 pr-4 py-3.5 bg-[#F2F0EB] border border-transparent text-sm text-[#0E0E0E] placeholder-[#0E0E0E]/35 focus:outline-none focus:border-[#B01E28] focus:bg-white transition-all duration-300"
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="label-inst-sm text-[#0E0E0E]/45 block mb-3">
                  Category
                </label>
                <select
                  name="category"
                  defaultValue={queryParams.category || ''}
                  className="select-inst w-full px-4 py-3.5 bg-[#F2F0EB] border border-transparent text-sm text-[#0E0E0E] focus:outline-none focus:border-[#B01E28] focus:bg-white transition-all duration-300 cursor-pointer"
                >
                  <option value="">All Categories</option>
                  {categories.map((c: any) => (
                    <option key={c.id} value={c.slug}>{c.name}</option>
                  ))}
                </select>
              </div>

              {/* Status */}
              <div>
                <label className="label-inst-sm text-[#0E0E0E]/45 block mb-3">
                  Status
                </label>
                <select
                  name="status"
                  defaultValue={queryParams.status || ''}
                  className="select-inst w-full px-4 py-3.5 bg-[#F2F0EB] border border-transparent text-sm text-[#0E0E0E] focus:outline-none focus:border-[#B01E28] focus:bg-white transition-all duration-300 cursor-pointer"
                >
                  <option value="">All Statuses</option>
                  {statuses.map((s: any) => (
                    <option key={s.id} value={s.slug}>{s.name}</option>
                  ))}
                </select>
              </div>

              {/* Actions */}
              <div>
                <label className="label-inst-sm text-[#0E0E0E]/45 block mb-3 opacity-0 select-none pointer-events-none" aria-hidden="true">
                  &nbsp;
                </label>
                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="group/btn flex-1 inline-flex items-center justify-center gap-3 bg-[#B01E28] hover:bg-[#0E0E0E] text-white label-inst px-5 py-3.5 transition-colors duration-500"
                  >
                    <Filter className="w-3.5 h-3.5" strokeWidth={1.75} />
                    Filter
                  </button>
                  <Link
                    href="/investments"
                    className="inline-flex items-center justify-center bg-[#F2F0EB] hover:bg-[#0E0E0E] text-[#0E0E0E] hover:text-white label-inst px-5 py-3.5 border border-[var(--line)] hover:border-[#0E0E0E] transition-colors duration-500"
                  >
                    Reset
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>

      {/* =========================================================================
          5. RESULTS GRID — INSTITUTIONAL PORTFOLIO
          ========================================================================= */}
      <section className="relative bg-[#FBFBF9] py-20 lg:py-28 border-b border-[var(--line)] overflow-hidden">

        {/* Ghosted financial backdrop */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=2400&q=80"
            alt=""
            className="w-full h-full object-cover opacity-[0.03] img-inst anim-slow-pan"
          />
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-10">

          {/* Results header */}
          <div className="grid grid-cols-12 gap-8 mb-16 items-end">
            <div className="col-span-12 lg:col-span-9">
              <span className="label-inst text-[#0E0E0E]/45 block mb-4">02 — Active Portfolio</span>
              <span className="w-10 h-px bg-[#B01E28] block mb-6" />
              <h2 className="font-serif font-light text-[2rem] sm:text-[2.75rem] lg:text-[3.5rem] leading-[1.05] tracking-[-0.02em] text-[#0E0E0E] max-w-[26ch]">
                {investments.length === 0 ? (
                  <>No <em className="italic font-normal text-[#B01E28]">matching</em> opportunities.</>
                ) : (
                  <>{investments.length} {investments.length === 1 ? 'opportunity' : 'opportunities'} to <em className="italic font-normal text-[#B01E28]">explore</em>.</>
                )}
              </h2>
            </div>

            <div className="col-span-12 lg:col-span-3 lg:text-right">
              <div className="inline-flex items-center gap-3 label-inst text-[#0E0E0E]/55 border border-[var(--line)] px-4 py-2.5 bg-white">
                <ShieldCheck className="w-3.5 h-3.5 text-[#B01E28]" strokeWidth={1.5} />
                Independently Vetted
              </div>
            </div>
          </div>

          {/* Empty state */}
          {investments.length === 0 ? (
            <div className="relative bg-white border border-[var(--line)] p-16 lg:p-24 text-center anim-fade-up">
              {/* Top red hairline */}
              <div className="absolute top-0 left-0 w-24 h-px bg-[#B01E28]" />

              <div className="w-16 h-16 mx-auto mb-8 border border-[#0E0E0E] flex items-center justify-center text-[#0E0E0E]">
                <Search className="w-6 h-6" strokeWidth={1.5} />
              </div>

              <h3 className="font-serif text-[1.75rem] lg:text-[2.25rem] font-normal tracking-[-0.01em] text-[#0E0E0E] mb-4">
                No matching opportunities found
              </h3>

              <p className="text-[0.95rem] leading-[1.85] text-[#0E0E0E]/60 max-w-md mx-auto mb-10">
                Try adjusting your search criteria or clearing filters to view all active investment opportunities.
              </p>

              <Link
                href="/investments"
                className="group inline-flex items-center gap-4 bg-[#B01E28] hover:bg-[#0E0E0E] text-white label-inst px-8 py-4 transition-colors duration-500"
              >
                Clear All Filters
                <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" strokeWidth={1.5} />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {investments.map((inv: any, idx: number) => (
                <article
                  key={inv.id}
                  className="group relative bg-white border border-[var(--line)] flex flex-col anim-fade-up transition-shadow duration-500 hover:shadow-[0_24px_60px_-32px_rgba(14,14,14,0.28)]"
                  style={{ animationDelay: `${Math.min(idx * 0.08, 0.5)}s` }}
                >
                  {/* Red hairline top that extends on hover */}
                  <div className="absolute top-0 left-0 w-12 h-px bg-[#B01E28] group-hover:w-32 transition-all duration-700 z-10" />

                  <div className="flex-1 flex flex-col p-8 lg:p-9">

                    {/* Category + location */}
                    <div className="flex items-center justify-between gap-3 mb-8">
                      <span className="label-inst-sm text-[#B01E28] border border-[#B01E28]/30 px-3 py-1.5 bg-[#B01E28]/[0.04]">
                        {inv.category.name}
                      </span>
                      <span className="flex items-center gap-2 label-inst-sm text-[#0E0E0E]/45">
                        <MapPin className="w-3 h-3 text-[#B01E28]" strokeWidth={1.75} />
                        {inv.location}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-[1.5rem] lg:text-[1.75rem] font-normal leading-[1.2] tracking-[-0.01em] text-[#0E0E0E] mb-4 group-hover:text-[#B01E28] transition-colors duration-500">
                      {inv.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm leading-[1.75] text-[#0E0E0E]/60 line-clamp-2 mb-8">
                      {inv.shortDescription}
                    </p>

                    <div className="flex-1" />

                    {/* Data block */}
                    <div className="border-t border-[var(--line)] pt-6 space-y-5">

                      {/* Target capital */}
                      {inv.fundingTarget && (
                        <div className="flex justify-between items-baseline">
                          <span className="label-inst-sm text-[#0E0E0E]/45">Target Capital</span>
                          <span className="font-serif text-lg text-[#0E0E0E]">
                            KSh {Number(inv.fundingTarget).toLocaleString()}
                          </span>
                        </div>
                      )}

                      {/* Funding progress */}
                      {inv.fundingProgress && (
                        <div className="space-y-3">
                          <div className="flex justify-between items-baseline">
                            <span className="label-inst-sm text-[#0E0E0E]/45">Funding Progress</span>
                            <span className="font-serif text-lg text-[#B01E28]">
                              {inv.fundingProgress}%
                            </span>
                          </div>
                          <div className="w-full bg-[#F2F0EB] h-1.5 relative overflow-hidden">
                            <div
                              className="absolute top-0 left-0 h-full bg-[#B01E28] transition-all duration-1000"
                              style={{ width: `${Math.min(Number(inv.fundingProgress), 100)}%` }}
                            />
                          </div>
                        </div>
                      )}

                      {/* Return description */}
                      {inv.returnDescription && (
                        <div className="border-l-2 border-[#B01E28] bg-[#B01E28]/[0.04] px-4 py-3">
                          <span className="label-inst-sm text-[#B01E28] block mb-2">
                            Projected Return
                          </span>
                          <p className="text-xs leading-[1.7] text-[#0E0E0E]/75">
                            {inv.returnDescription}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* CTA pinned to bottom */}
                  <div className="p-8 lg:p-9 pt-0">
                    <Link
                      href={`/investments/${inv.slug}`}
                      className="group/cta flex items-center justify-between gap-4 bg-[#0E0E0E] group-hover:bg-[#B01E28] text-white label-inst px-5 py-4 transition-colors duration-500 w-full"
                    >
                      <span>View Details</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover/cta:translate-x-1" strokeWidth={1.5} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* =========================================================================
          6. TRUST BAR — INSTITUTIONAL CREDIBILITY
          ========================================================================= */}
      <section className="bg-[#0E0E0E] text-white border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/10">
            {[
              { icon: ShieldCheck, k: 'Rigorous Vetting', v: '100%' },
              { icon: Award, k: 'Institutional Grade', v: 'Verified' },
              { icon: Globe, k: 'Local Expertise', v: 'Nairobi' },
              { icon: TrendingUp, k: 'Vetted Pipeline', v: 'KSh 2.4B+' },
            ].map((item, idx) => (
              <div key={idx} className="py-10 px-6 lg:px-8 group">
                <div className="flex items-center justify-between mb-6">
                  <item.icon className="w-5 h-5 text-[#B01E28]" strokeWidth={1.25} />
                  <span className="font-mono text-[0.65rem] text-white/35">
                    / 0{idx + 1}
                  </span>
                </div>
                <div className="font-serif text-2xl lg:text-3xl font-light mb-3 tracking-[-0.02em] text-white">
                  {item.v}
                </div>
                <div className="label-inst text-white/45">{item.k}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. CTA — FINAL CONVERSION
          ========================================================================= */}
      <section className="relative bg-[#0E0E0E] text-white overflow-hidden">

        {/* Executive meeting backdrop */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1542744094-3a31246264d0?auto=format&fit=crop&w=2400&q=85"
            alt=""
            className="w-full h-full object-cover opacity-[0.20] img-inst-hero anim-slow-pan"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0E0E0E] via-[#0E0E0E]/88 to-[#0E0E0E]/55" />
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-10 py-24 lg:py-32">
          <div className="grid grid-cols-12 gap-8 items-end">

            {/* Left — headline */}
            <div className="col-span-12 lg:col-span-7">
              <div className="flex items-center gap-4 mb-10 anim-fade-up">
                <span className="label-inst text-white/45">03 — Next Steps</span>
                <span className="w-10 h-px bg-[#B01E28]" />
              </div>

              <h2 className="font-serif font-light text-[2rem] sm:text-[3rem] lg:text-[4rem] leading-[1.05] tracking-[-0.02em] text-white max-w-[22ch] mb-8 anim-fade-up d-1">
                Have questions about an <em className="italic font-normal text-[#B01E28]">opportunity</em>?
              </h2>

              <p className="text-lg leading-[1.75] text-white/70 font-light max-w-lg anim-fade-up d-3">
                Reach out to our Nairobi headquarters for detailed information on any listing, or to discuss partnership structures directly with our advisory team.
              </p>
            </div>

            {/* Right — CTA buttons */}
            <div className="col-span-12 lg:col-span-5 lg:pl-16 lg:border-l lg:border-white/15 anim-fade-in d-5">
              <span className="label-inst text-white/45 block mb-8">Engage</span>

              <div className="flex flex-col gap-0">
                <Link
                  href="/contact"
                  className="group flex items-center justify-between gap-6 bg-[#B01E28] hover:bg-white hover:text-[#0E0E0E] text-white label-inst px-8 py-5 transition-colors duration-500"
                >
                  <span>Contact Our Team</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" strokeWidth={1.5} />
                </Link>
                <Link
                  href="/about"
                  className="group flex items-center justify-between gap-6 border border-white/30 hover:border-white text-white label-inst px-8 py-5 transition-colors duration-500 border-t-0"
                >
                  <span>Learn About Us</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" strokeWidth={1.5} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          8. FOOTER — INSTITUTIONAL MASTHEAD
          ========================================================================= */}
      <footer className="bg-[#0E0E0E] text-white border-t border-white/10">

        {/* Top marquee */}
        <div className="border-b border-white/10 py-5 overflow-hidden">
          <div className="flex whitespace-nowrap anim-marquee-slow w-max label-inst text-white/30">
            {[0, 1].map((dup) => (
              <div key={dup} className="flex items-center">
                {['Private Capital', 'Real Estate', 'Agriculture', 'Commercial', 'East Africa', 'Nairobi', 'MMXXVI'].map((item) => (
                  <span key={item} className="flex items-center">
                    <span className="px-10">{item}</span>
                    <span className="w-1 h-1 rounded-full bg-[#B01E28]" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Masthead */}
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-16 lg:py-20">
          <div className="grid grid-cols-12 gap-8 lg:gap-16">

            <div className="col-span-12 lg:col-span-5">
              <span className="font-serif text-3xl lg:text-[2.5rem] font-normal tracking-tight text-white block mb-6">
                Ndegwa Investments
              </span>
              <p className="text-sm leading-[1.8] text-white/50 max-w-md mb-8">
                A Nairobi-based private investment firm. Curated capital for considered growth across real estate, agriculture, and commercial sectors in Kenya.
              </p>
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-[#B01E28] rounded-full anim-blink" />
                <span className="label-inst text-white/45">
                  Vol. 01 · MMXXVI
                </span>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <span className="label-inst text-white/45 block mb-6">Firm</span>
                <ul className="flex flex-col gap-4">
                  {[
                    { l: 'Home', h: '/' },
                    { l: 'About', h: '/about' },
                    { l: 'Contact', h: '/contact' },
                  ].map((item) => (
                    <li key={item.l}>
                      <Link href={item.h} className="text-sm text-white/70 hover:text-[#B01E28] transition-colors">
                        {item.l}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="label-inst text-white/45 block mb-6">Platform</span>
                <ul className="flex flex-col gap-4">
                  {[
                    { l: 'Opportunities', h: '/investments' },
                    { l: 'Process', h: '/about' },
                    { l: 'Standards', h: '/about' },
                  ].map((item) => (
                    <li key={item.l}>
                      <Link href={item.h} className="text-sm text-white/70 hover:text-[#B01E28] transition-colors">
                        {item.l}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="label-inst text-white/45 block mb-6">Contact</span>
                <ul className="flex flex-col gap-4">
                  <li>
                    <a href="tel:+254799357038" className="text-sm text-white/70 hover:text-[#B01E28] transition-colors">
                      +254 799 357 038
                    </a>
                  </li>
                  <li>
                    <a href="mailto:advisory@ndegwainvestments.com" className="text-sm text-white/70 hover:text-[#B01E28] transition-colors break-all">
                      advisory@ndegwainvestments.com
                    </a>
                  </li>
                  <li className="text-sm text-white/50">
                    Nairobi, Kenya
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <span className="label-inst text-white/35">
              © 2026 Ndegwa Investments — All rights reserved
            </span>
            <div className="flex items-center gap-6 label-inst text-white/35">
              <span>Nairobi · 01°17'S 36°49'E</span>
              <span className="w-px h-3 bg-white/15" />
              <span>EN</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  )
}