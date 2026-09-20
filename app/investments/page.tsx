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
  CheckCircle2,
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
    <div className="flex flex-col min-h-screen bg-[#faf8f5] dark:bg-[#0a0e17] text-[#0a0e17] dark:text-[#faf8f5] transition-colors duration-500 overflow-x-hidden">

      {/* =========================================================================
          GLOBAL STYLES — Fonts, animations, textures
          ========================================================================= */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&family=Syne:wght@400;500;600;700;800&display=swap');

            .font-display { font-family: 'Syne', system-ui, sans-serif; }
            .font-body { font-family: 'Manrope', system-ui, sans-serif; }

            @keyframes revealLine {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }
            @keyframes slideUp {
              from { transform: translateY(105%); opacity: 0; }
              to { transform: translateY(0); opacity: 1; }
            }
            @keyframes panBg {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
            @keyframes slowZoom {
              0% { transform: scale(1.08); }
              100% { transform: scale(1); }
            }
            @keyframes floatBlob {
              0%, 100% { transform: translate(0, 0) scale(1); }
              50% { transform: translate(20px, -20px) scale(1.05); }
            }
            @keyframes rotateSlow {
              to { transform: rotate(360deg); }
            }
            @keyframes marqueeScroll {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            @keyframes pulseDot {
              0%, 100% { transform: scale(1); opacity: 1; }
              50% { transform: scale(1.4); opacity: 0.6; }
            }

            .anim-reveal { animation: revealLine 1.2s cubic-bezier(0.16, 1, 0.3, 1) both; }
            .anim-slide-up { animation: slideUp 1.1s cubic-bezier(0.16, 1, 0.3, 1) both; }
            .anim-pan-bg { animation: panBg 30s ease-in-out infinite; }
            .anim-slow-zoom { animation: slowZoom 25s ease-in-out infinite alternate; }
            .anim-float-blob { animation: floatBlob 8s ease-in-out infinite; }
            .anim-rotate-slow { animation: rotateSlow 20s linear infinite; }
            .anim-marquee { animation: marqueeScroll 40s linear infinite; }
            .anim-pulse-dot { animation: pulseDot 2s ease-in-out infinite; }

            .delay-100 { animation-delay: 0.1s; }
            .delay-250 { animation-delay: 0.25s; }
            .delay-400 { animation-delay: 0.4s; }
            .delay-600 { animation-delay: 0.6s; }
            .delay-1000 { animation-delay: 1s; }

            .text-outline {
              -webkit-text-stroke: 1.5px rgba(250, 248, 245, 0.7);
              color: transparent;
            }

            .bg-grid {
              background-image:
                linear-gradient(rgba(10, 14, 23, 0.045) 1px, transparent 1px),
                linear-gradient(90deg, rgba(10, 14, 23, 0.045) 1px, transparent 1px);
              background-size: 48px 48px;
            }
            .bg-grid-light {
              background-image:
                linear-gradient(rgba(250, 248, 245, 0.06) 1px, transparent 1px),
                linear-gradient(90deg, rgba(250, 248, 245, 0.06) 1px, transparent 1px);
              background-size: 60px 60px;
            }

            .bg-stripes {
              background-image: repeating-linear-gradient(
                45deg,
                rgba(15, 155, 108, 0.06) 0px,
                rgba(15, 155, 108, 0.06) 2px,
                transparent 2px,
                transparent 18px
              );
            }

            .line-clamp-2 {
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              overflow: hidden;
            }

            ::-webkit-scrollbar { width: 8px; height: 8px; }
            ::-webkit-scrollbar-track { background: transparent; }
            ::-webkit-scrollbar-thumb { background: rgba(15, 155, 108, 0.3); border-radius: 4px; }
            ::-webkit-scrollbar-thumb:hover { background: rgba(15, 155, 108, 0.6); }

            .select-custom {
              appearance: none;
              -webkit-appearance: none;
              background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%230f9b6c' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
              background-repeat: no-repeat;
              background-position: right 1rem center;
              padding-right: 2.5rem;
            }
          `,
        }}
      />

      {/* =========================================================================
          1. PAGE HEADER — CINEMATIC WITH NAIROBI SKYLINE
          ========================================================================= */}
      <section className="relative pt-40 pb-16 lg:pt-52 lg:pb-24 overflow-hidden bg-[#0a0e17]">

        {/* Layer 1: Nairobi skyline */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2200&q=85"
            alt="Nairobi skyline"
            className="w-full h-full object-cover opacity-40 anim-slow-zoom"
          />
        </div>

        {/* Layer 2: Gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_80%,rgba(15,155,108,0.35),transparent_55%),linear-gradient(180deg,rgba(10,14,23,0.7)_0%,rgba(10,14,23,0.95)_100%)] z-[1]" />

        {/* Layer 3: Corporate grid */}
        <div
          className="absolute inset-0 z-[1] opacity-[0.06]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(250,248,245,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(250,248,245,0.6) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Layer 4: Floating emerald blob */}
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-[120px] pointer-events-none anim-float-blob z-[2]" />

        {/* Layer 5: Emerald accent line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/60 to-transparent z-[2]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">

          {/* Top editorial line */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 mb-12 border-b border-white/15 anim-reveal">
            <div className="flex items-center gap-4 text-emerald-300 text-xs font-semibold tracking-[0.3em] uppercase">
              <span className="w-10 h-px bg-emerald-300" />
              Discovery Portal
            </div>
            <div className="text-white/50 text-xs tracking-[0.2em] uppercase font-medium flex items-center gap-3">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 anim-pulse-dot" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              Live Opportunities · Updated Continuously
            </div>
          </div>

          {/* Headline */}
          <div className="max-w-4xl">
            <h1 className="font-display font-extrabold text-white text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[0.95] tracking-[-0.045em] mb-8">
              <span className="block overflow-hidden">
                <span className="inline-block anim-slide-up">Investment</span>
              </span>
              <span className="block overflow-hidden">
                <span className="inline-block anim-slide-up delay-250">
                  <span className="text-outline">Opportunities.</span>
                </span>
              </span>
            </h1>

            <p className="text-lg lg:text-xl text-white/75 leading-relaxed font-light max-w-2xl anim-reveal delay-600">
              Explore and filter curated investment opportunities. Select any opportunity to review detailed documentation, return structures, and express your interest.
            </p>
          </div>

          {/* Quick stats row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-14 pt-8 border-t border-white/15 anim-reveal delay-1000">
            <div className="flex flex-col gap-1">
              <span className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
                {investments.length}
              </span>
              <span className="text-[0.65rem] uppercase tracking-[0.15em] text-white/45 font-medium">
                Active Opportunities
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
                {categories.length}
              </span>
              <span className="text-[0.65rem] uppercase tracking-[0.15em] text-white/45 font-medium">
                Sectors Covered
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
                100%
              </span>
              <span className="text-[0.65rem] uppercase tracking-[0.15em] text-white/45 font-medium">
                Vetted & Verified
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
                Nairobi
              </span>
              <span className="text-[0.65rem] uppercase tracking-[0.15em] text-white/45 font-medium">
                Headquartered
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. MARQUEE — CONTINUITY
          ========================================================================= */}
      <div className="bg-[#0a0e17] text-[#faf8f5] py-5 overflow-hidden border-y border-white/10">
        <div className="flex gap-16 whitespace-nowrap anim-marquee w-max">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex gap-16 items-center">
              {['Real Estate', 'Agriculture', 'Commercial', 'Private Equity', 'Sustainable Growth'].map((item) => (
                <span key={item} className="font-display text-xl sm:text-2xl font-semibold tracking-tight text-white/85 flex items-center gap-16">
                  {item}
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* =========================================================================
          3. FILTER BAR — ELEVATED GLASS CARD
          ========================================================================= */}
      <section className="relative pt-16 lg:pt-20 bg-[#faf8f5] dark:bg-[#0a0e17] overflow-hidden">

        {/* Executive backdrop */}
        <div
          className="absolute inset-0 z-0 opacity-[0.05] dark:opacity-[0.07] bg-cover bg-center anim-pan-bg"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=80')",
          }}
        />

        {/* Corporate grid */}
        <div className="absolute inset-0 z-[1] bg-grid opacity-40 dark:opacity-20" />

        {/* Emerald radial */}
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-emerald-500/8 rounded-full blur-[120px] pointer-events-none z-[1]" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-4 lg:gap-16 mb-10">
            <div className="flex items-center gap-3 text-emerald-600 dark:text-emerald-400 text-xs font-bold tracking-[0.3em] uppercase">
              <span className="w-6 h-px bg-emerald-600 dark:bg-emerald-400" />
              Filter & Refine
            </div>
            <div className="flex items-center justify-between flex-wrap gap-3">
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-[-0.03em] text-[#0a0e17] dark:text-[#faf8f5]">
                Refine Your{' '}
                <em className="italic font-normal text-emerald-600 dark:text-emerald-400">Search.</em>
              </h2>
              {activeFilterCount > 0 && (
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400">
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  {activeFilterCount} {activeFilterCount === 1 ? 'filter' : 'filters'} active
                </span>
              )}
            </div>
          </div>

          {/* Filter form */}
          <form
            method="GET"
            className="relative rounded-3xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border border-[#e8e4dc] dark:border-white/10 p-6 lg:p-8 shadow-[0_20px_50px_-20px_rgba(10,14,23,0.15)] overflow-hidden"
          >

            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/60 to-transparent" />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

              {/* Search */}
              <div className="relative md:col-span-1">
                <label className="block text-[0.65rem] font-bold tracking-[0.15em] uppercase text-[#8a8577] dark:text-white/40 mb-2">
                  Search
                </label>
                <div className="relative">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-600 dark:text-emerald-400 pointer-events-none" />
                  <input
                    type="text"
                    name="search"
                    defaultValue={queryParams.search || ''}
                    placeholder="Search opportunities..."
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#faf8f5] dark:bg-slate-800/60 border border-[#e8e4dc] dark:border-white/10 text-sm text-[#0a0e17] dark:text-[#faf8f5] placeholder-[#8a8577] dark:placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500/50 transition-all"
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-[0.65rem] font-bold tracking-[0.15em] uppercase text-[#8a8577] dark:text-white/40 mb-2">
                  Category
                </label>
                <select
                  name="category"
                  defaultValue={queryParams.category || ''}
                  className="select-custom w-full px-4 py-3 rounded-xl bg-[#faf8f5] dark:bg-slate-800/60 border border-[#e8e4dc] dark:border-white/10 text-sm text-[#0a0e17] dark:text-[#faf8f5] focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500/50 transition-all cursor-pointer"
                >
                  <option value="">All Categories</option>
                  {categories.map((c: any) => (
                    <option key={c.id} value={c.slug}>{c.name}</option>
                  ))}
                </select>
              </div>

              {/* Status */}
              <div>
                <label className="block text-[0.65rem] font-bold tracking-[0.15em] uppercase text-[#8a8577] dark:text-white/40 mb-2">
                  Status
                </label>
                <select
                  name="status"
                  defaultValue={queryParams.status || ''}
                  className="select-custom w-full px-4 py-3 rounded-xl bg-[#faf8f5] dark:bg-slate-800/60 border border-[#e8e4dc] dark:border-white/10 text-sm text-[#0a0e17] dark:text-[#faf8f5] focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500/50 transition-all cursor-pointer"
                >
                  <option value="">All Statuses</option>
                  {statuses.map((s: any) => (
                    <option key={s.id} value={s.slug}>{s.name}</option>
                  ))}
                </select>
              </div>

              {/* Actions */}
              <div>
                <label className="block text-[0.65rem] font-bold tracking-[0.15em] uppercase text-[#8a8577] dark:text-white/40 mb-2">
                  &nbsp;
                </label>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all duration-500 shadow-[0_10px_25px_-10px_rgba(15,155,108,0.6)] hover:shadow-[0_15px_30px_-10px_rgba(15,155,108,0.7)] active:scale-[0.98] group/btn"
                  >
                    <Filter className="w-4 h-4" />
                    Filter
                  </button>
                  <Link
                    href="/investments"
                    className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-[#faf8f5] dark:bg-slate-800/60 hover:bg-[#e8e4dc]/60 dark:hover:bg-slate-800 border border-[#e8e4dc] dark:border-white/10 text-[#0a0e17] dark:text-[#faf8f5] font-semibold text-sm transition-all duration-300"
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
          4. RESULTS GRID — CINEMATIC WITH FINANCIAL BACKDROP
          ========================================================================= */}
      <section className="relative py-16 lg:py-24 bg-[#faf8f5] dark:bg-[#0a0e17] overflow-hidden">

        {/* Financial backdrop */}
        <div
          className="absolute inset-0 z-0 opacity-[0.06] dark:opacity-[0.08] bg-cover bg-center anim-pan-bg"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=2000&q=80')",
          }}
        />

        {/* Corporate grid */}
        <div className="absolute inset-0 z-[1] bg-grid opacity-50 dark:opacity-20" />

        {/* Gradient fade */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#faf8f5]/95 via-[#faf8f5]/88 to-[#faf8f5]/95 dark:from-[#0a0e17]/95 dark:via-[#0a0e17]/88 dark:to-[#0a0e17]/95" />

        {/* Emerald radial accent */}
        <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-emerald-500/8 rounded-full blur-[120px] pointer-events-none z-[1]" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">

          {/* Results header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-10">
            <div>
              <div className="flex items-center gap-3 text-emerald-600 dark:text-emerald-400 text-xs font-bold tracking-[0.3em] uppercase mb-3">
                <span className="w-6 h-px bg-emerald-600 dark:bg-emerald-400" />
                Active Portfolio
              </div>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.035em] leading-[1.05] text-[#0a0e17] dark:text-[#faf8f5]">
                {investments.length === 0 ? (
                  <>No <em className="italic font-normal text-emerald-600 dark:text-emerald-400">Matching</em> Opportunities.</>
                ) : (
                  <>{investments.length} {investments.length === 1 ? 'Opportunity' : 'Opportunities'} to <em className="italic font-normal text-emerald-600 dark:text-emerald-400">Explore.</em></>
                )}
              </h2>
            </div>

            <div className="inline-flex items-center gap-2 text-xs text-[#8a8577] dark:text-white/40 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              Every listing is independently vetted
            </div>
          </div>

          {/* Empty state */}
          {investments.length === 0 ? (
            <div className="relative rounded-3xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border border-[#e8e4dc] dark:border-white/10 overflow-hidden">
              {/* Top accent */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/60 to-transparent" />

              <div className="p-12 lg:p-16 text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 relative">
                  <Search className="w-7 h-7 relative z-10" />
                  <span className="absolute inset-0 rounded-2xl border border-dashed border-emerald-600/30 anim-rotate-slow" />
                </div>

                <h3 className="font-display text-2xl font-bold tracking-[-0.02em] text-[#0a0e17] dark:text-[#faf8f5] mb-3">
                  No matching opportunities found
                </h3>
                <p className="text-sm text-[#5a5750] dark:text-slate-400 max-w-md mx-auto mb-8 leading-relaxed">
                  Try adjusting your search criteria or clearing filters to view all active investment opportunities.
                </p>
                <Link
                  href="/investments"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all duration-500 shadow-[0_15px_30px_-10px_rgba(15,155,108,0.6)] hover:-translate-y-0.5 group"
                >
                  Clear All Filters
                  <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
              {investments.map((inv: any, idx: number) => (
                <div
                  key={inv.id}
                  className="group relative rounded-3xl bg-white/90 dark:bg-slate-900/70 backdrop-blur-sm border border-[#e8e4dc] dark:border-white/10 overflow-hidden transition-all duration-700 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-25px_rgba(15,155,108,0.3)] hover:border-emerald-500/40 flex flex-col"
                  style={{ animationDelay: `${Math.min(idx * 0.08, 0.5)}s` }}
                >
                  {/* Hover radial glow */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(52,211,153,0.12),transparent_45%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                  {/* Top accent line */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10 p-7 lg:p-8 flex-1 flex flex-col">

                    {/* Top row: category + location */}
                    <div className="flex items-center justify-between gap-2 mb-6">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[0.65rem] font-bold tracking-[0.1em] uppercase bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25">
                        <Building2 className="w-3 h-3" />
                        {inv.category.name}
                      </span>
                      <span className="text-xs text-[#8a8577] dark:text-white/45 flex items-center gap-1.5 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        {inv.location}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-display text-xl lg:text-2xl font-bold tracking-[-0.025em] leading-tight text-[#0a0e17] dark:text-[#faf8f5] mb-3 transition-colors duration-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                      {inv.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-[#5a5750] dark:text-slate-400 line-clamp-2 leading-relaxed mb-6">
                      {inv.shortDescription}
                    </p>

                    {/* Spacer */}
                    <div className="flex-1" />

                    {/* Data block */}
                    <div className="pt-5 border-t border-[#e8e4dc] dark:border-white/10 space-y-3">

                      {/* Target capital */}
                      {inv.fundingTarget && (
                        <div className="flex justify-between items-baseline text-sm">
                          <span className="text-[0.7rem] uppercase tracking-[0.15em] font-semibold text-[#8a8577] dark:text-white/40">
                            Target Capital
                          </span>
                          <span className="font-display font-bold text-[#0a0e17] dark:text-[#faf8f5] tracking-tight">
                            KSh {Number(inv.fundingTarget).toLocaleString()}
                          </span>
                        </div>
                      )}

                      {/* Funding progress */}
                      {inv.fundingProgress && (
                        <div className="space-y-2">
                          <div className="flex justify-between items-baseline text-sm">
                            <span className="text-[0.7rem] uppercase tracking-[0.15em] font-semibold text-[#8a8577] dark:text-white/40">
                              Funding Progress
                            </span>
                            <span className="font-display font-bold text-emerald-600 dark:text-emerald-400 tracking-tight">
                              {inv.fundingProgress}%
                            </span>
                          </div>
                          <div className="w-full bg-[#e8e4dc] dark:bg-white/10 h-1.5 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-1000 bg-gradient-to-r from-emerald-500 to-emerald-400"
                              style={{ width: `${Math.min(Number(inv.fundingProgress), 100)}%` }}
                            />
                          </div>
                        </div>
                      )}

                      {/* Return description */}
                      {inv.returnDescription && (
                        <div className="p-3.5 rounded-xl bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/15 text-xs text-[#5a5750] dark:text-slate-300 leading-relaxed">
                          <span className="font-bold text-emerald-600 dark:text-emerald-400 tracking-wide uppercase text-[0.65rem] block mb-1">
                            Projected Return
                          </span>
                          {inv.returnDescription}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* CTA — pinned to bottom */}
                  <div className="relative z-10 p-7 lg:p-8 pt-0">
                    <Link
                      href={`/investments/${inv.slug}`}
                      className="w-full inline-flex items-center justify-between gap-3 py-3.5 px-5 rounded-xl bg-[#0a0e17] hover:bg-emerald-600 dark:bg-slate-800 dark:hover:bg-emerald-600 text-white font-semibold text-sm transition-all duration-500 group/cta"
                    >
                      View Details & Express Interest
                      <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover/cta:translate-x-1" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* =========================================================================
          5. TRUST BAR — CORPORATE CREDIBILITY STRIP
          ========================================================================= */}
      <section className="relative py-16 bg-[#0a0e17] text-[#faf8f5] overflow-hidden border-t border-white/10">

        {/* Skyline silhouette */}
        <div
          className="absolute inset-0 z-0 opacity-[0.08] bg-cover bg-bottom"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1611348586804-61bf6c080437?auto=format&fit=crop&w=2000&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17]/95 via-[#0a0e17]/85 to-[#0a0e17]/95 z-[1]" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { icon: ShieldCheck, label: 'Rigorous Vetting', value: '100%' },
              { icon: Award, label: 'Institutional Grade', value: 'Verified' },
              { icon: Globe, label: 'Local Expertise', value: 'Nairobi' },
              { icon: TrendingUp, label: 'Vetted Pipeline', value: 'KSh 2.4B+' },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center gap-3 group">
                <span className="w-12 h-12 rounded-2xl bg-emerald-400/10 border border-emerald-400/25 flex items-center justify-center text-emerald-300 transition-all duration-500 group-hover:bg-emerald-400/20 group-hover:scale-110">
                  <item.icon className="w-5 h-5" />
                </span>
                <span className="font-display text-xl lg:text-2xl font-bold tracking-tight text-white">
                  {item.value}
                </span>
                <span className="text-[0.7rem] uppercase tracking-[0.15em] text-white/45 font-medium">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. CTA — FINAL CONVERSION BAND
          ========================================================================= */}
      <section className="relative py-24 lg:py-28 overflow-hidden bg-[#0a0e17] text-[#faf8f5]">

        {/* Executive meeting backdrop */}
        <div
          className="absolute inset-0 z-0 opacity-[0.12] bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1542744094-3a31246264d0?auto=format&fit=crop&w=2000&q=80')",
          }}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17]/95 via-[#0a0e17]/88 to-[#0a0e17]/95 z-[1]" />

        {/* Emerald glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-emerald-500/15 rounded-full blur-[140px] pointer-events-none z-[1]" />

        <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10 text-center">

          <div className="inline-flex items-center gap-3 text-emerald-300 text-xs font-bold tracking-[0.3em] uppercase mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            Speak With Our Team
          </div>

          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.035em] leading-[1.05] mb-6">
            Have Questions About an{' '}
            <em className="italic font-normal text-emerald-300">Opportunity?</em>
          </h2>

          <p className="text-base lg:text-lg text-white/65 max-w-2xl mx-auto leading-relaxed mb-10">
            Reach out to our Nairobi headquarters for detailed information on any listing, or to discuss partnership structures directly with our advisory team.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-3 px-7 py-4 rounded-full bg-emerald-600 hover:bg-emerald-400 text-white font-semibold text-sm transition-all duration-500 shadow-[0_15px_30px_-10px_rgba(15,155,108,0.6)] hover:shadow-[0_25px_40px_-12px_rgba(52,211,153,0.7)] hover:-translate-y-1 group"
            >
              Contact Our Team
              <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-500 group-hover:translate-x-1 group-hover:-rotate-45">
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center px-7 py-4 rounded-full border border-white/30 text-white font-semibold text-sm transition-all duration-500 hover:bg-white/10 hover:border-white backdrop-blur-sm"
            >
              Learn About Us
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. FOOTER STRIP
          ========================================================================= */}
      <footer className="bg-[#0a0e17] text-white/40 py-10 text-center text-xs tracking-[0.05em] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <span>© 2026 Ndegwa Investments · Curated Capital for Considered Growth</span>
          <span className="flex items-center gap-2">
            <MapPin className="w-3 h-3 text-emerald-300" />
            <span className="text-emerald-300">Nairobi, Kenya</span>
          </span>
        </div>
      </footer>

    </div>
  )
}