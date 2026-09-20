// app/page.tsx
import Link from 'next/link'
import { getPublicInvestments } from '@/app/actions/public'
import {
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Building2,
  Sprout,
  CheckCircle2,
  Phone,
  MapPin,
  Sparkles,
  Globe,
  Lock,
  Award,
  BarChart3,
  ArrowUpRight,
  Mail,
  Briefcase,
} from 'lucide-react'

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
    <div className="flex flex-col min-h-screen bg-[#faf8f5] dark:bg-[#0a0e17] text-[#0a0e17] dark:text-[#faf8f5] transition-colors duration-500 overflow-x-hidden">

      {/* =========================================================================
          GLOBAL STYLES — Fonts, animations, custom utilities
          ========================================================================= */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&family=Syne:wght@400;500;600;700;800&display=swap');

            .font-display { font-family: 'Syne', system-ui, sans-serif; }
            .font-body { font-family: 'Manrope', system-ui, sans-serif; }

            @keyframes slideUp {
              from { transform: translateY(105%); opacity: 0; }
              to { transform: translateY(0); opacity: 1; }
            }
            @keyframes revealLine {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }
            @keyframes slowZoom {
              0% { transform: scale(1.08); }
              100% { transform: scale(1); }
            }
            @keyframes scrollDown {
              0% { transform: translateY(-100%); }
              100% { transform: translateY(400%); }
            }
            @keyframes marqueeScroll {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            @keyframes rotateSlow {
              to { transform: rotate(360deg); }
            }
            @keyframes floatBlob {
              0%, 100% { transform: translate(0, 0) scale(1); }
              50% { transform: translate(20px, -20px) scale(1.05); }
            }
            @keyframes panBg {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }

            .anim-slide-up { animation: slideUp 1.1s cubic-bezier(0.16, 1, 0.3, 1) both; }
            .anim-reveal { animation: revealLine 1.2s cubic-bezier(0.16, 1, 0.3, 1) both; }
            .anim-slow-zoom { animation: slowZoom 25s ease-in-out infinite alternate; }
            .anim-marquee { animation: marqueeScroll 40s linear infinite; }
            .anim-rotate-slow { animation: rotateSlow 20s linear infinite; }
            .anim-float-blob { animation: floatBlob 8s ease-in-out infinite; }
            .anim-pan-bg { animation: panBg 30s ease-in-out infinite; }

            .delay-100 { animation-delay: 0.1s; }
            .delay-250 { animation-delay: 0.25s; }
            .delay-400 { animation-delay: 0.4s; }
            .delay-600 { animation-delay: 0.6s; }
            .delay-1000 { animation-delay: 1s; }

            .text-outline {
              -webkit-text-stroke: 1.5px rgba(250, 248, 245, 0.7);
              color: transparent;
            }

            .grain::before {
              content: '';
              position: fixed;
              inset: 0;
              pointer-events: none;
              z-index: 9999;
              opacity: 0.035;
              background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
            }

            /* Corporate grid texture */
            .bg-grid {
              background-image:
                linear-gradient(rgba(10, 14, 23, 0.045) 1px, transparent 1px),
                linear-gradient(90deg, rgba(10, 14, 23, 0.045) 1px, transparent 1px);
              background-size: 48px 48px;
            }
            .dark .bg-grid,
            @media (prefers-color-scheme: dark) {
              .bg-grid {
                background-image:
                  linear-gradient(rgba(250, 248, 245, 0.05) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(250, 248, 245, 0.05) 1px, transparent 1px);
              }
            }

            /* Diagonal corporate stripes */
            .bg-stripes {
              background-image: repeating-linear-gradient(
                45deg,
                rgba(15, 155, 108, 0.06) 0px,
                rgba(15, 155, 108, 0.06) 2px,
                transparent 2px,
                transparent 18px
              );
            }

            ::-webkit-scrollbar { width: 8px; height: 8px; }
            ::-webkit-scrollbar-track { background: transparent; }
            ::-webkit-scrollbar-thumb { background: rgba(15, 155, 108, 0.3); border-radius: 4px; }
            ::-webkit-scrollbar-thumb:hover { background: rgba(15, 155, 108, 0.6); }

            @media (min-width: 1024px) {
              .pillar-border-r { border-right-width: 1px; }
            }
          `,
        }}
      />

      {/* =========================================================================
          1. HERO — CINEMATIC NAIROBI SKYLINE
          ========================================================================= */}
      <section className="relative min-h-screen flex items-end pb-20 lg:pb-24 overflow-hidden bg-[#0a0e17]">

        {/* Layer 1: Nairobi skyline */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2200&q=85"
            alt="Nairobi skyline"
            className="w-full h-full object-cover opacity-45 anim-slow-zoom"
          />
        </div>

        {/* Layer 2: Gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_80%,rgba(15,155,108,0.35),transparent_55%),linear-gradient(180deg,rgba(10,14,23,0.7)_0%,rgba(10,14,23,0.95)_100%)] z-[1]" />

        {/* Layer 3: Corporate grid overlay */}
        <div
          className="absolute inset-0 z-[1] opacity-[0.06]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(250,248,245,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(250,248,245,0.6) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Layer 4: Floating emerald light blob */}
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-[120px] pointer-events-none anim-float-blob z-[2]" />

        {/* Layer 5: Gold accent line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/60 to-transparent z-[2]" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 pt-32">

          {/* Top editorial line */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 mb-12 border-b border-white/15 anim-reveal">
            <div className="flex items-center gap-4 text-emerald-300 text-xs font-semibold tracking-[0.3em] uppercase">
              <span className="w-10 h-px bg-emerald-300" />
              Est. Nairobi · East Africa
            </div>
            <div className="text-white/50 text-xs tracking-[0.2em] uppercase font-medium flex items-center gap-3">
              <Award className="w-3.5 h-3.5 text-emerald-300" />
              Private Capital · 2026
            </div>
          </div>

          {/* Giant kinetic headline */}
          <h1 className="font-display font-extrabold text-white text-5xl sm:text-7xl lg:text-8xl xl:text-[8.5rem] leading-[0.92] tracking-[-0.045em] mb-12">
            <span className="block overflow-hidden">
              <span className="inline-block anim-slide-up">Curated</span>
            </span>
            <span className="block overflow-hidden">
              <span className="inline-block anim-slide-up delay-250">
                <span className="text-outline">Capital</span>{' '}
                <em className="italic font-normal text-emerald-300">for</em>
              </span>
            </span>
            <span className="block overflow-hidden">
              <span className="inline-block anim-slide-up delay-400">
                Considered Growth.
              </span>
            </span>
          </h1>

          {/* Bottom row */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-16 items-end anim-reveal delay-600">

            <div>
              <p className="text-lg text-white/75 leading-relaxed font-light max-w-xl mb-8">
                A premier <strong className="text-white font-medium">Nairobi-based private investment firm</strong> connecting qualified global and regional capital with rigorously vetted commercial, agricultural, and real estate ventures across Kenya.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/investments"
                  className="inline-flex items-center justify-center gap-3 px-7 py-4 rounded-full bg-emerald-600 hover:bg-emerald-400 text-white font-semibold text-sm transition-all duration-500 shadow-[0_15px_30px_-10px_rgba(15,155,108,0.6)] hover:shadow-[0_25px_40px_-12px_rgba(52,211,153,0.7)] hover:-translate-y-1 group"
                >
                  Explore Offerings
                  <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-500 group-hover:translate-x-1 group-hover:-rotate-45">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-7 py-4 rounded-full border border-white/30 text-white font-semibold text-sm transition-all duration-500 hover:bg-white/10 hover:border-white backdrop-blur-sm"
                >
                  Schedule a Consultation
                </Link>
              </div>
            </div>

            {/* Stats — vertical editorial */}
            <div className="flex flex-col gap-5 lg:border-l lg:border-white/15 lg:pl-8 pt-6 lg:pt-0 border-t lg:border-t-0 border-white/15">
              <div className="flex items-baseline gap-3">
                <span className="font-display text-2xl font-bold text-white tracking-tight">KSh 2.4B+</span>
                <span className="text-[0.7rem] uppercase tracking-[0.15em] text-white/50 font-medium">Vetted Pipeline</span>
              </div>
              <div className="flex items-baseline gap-3">
                <span className="font-display text-2xl font-bold text-white tracking-tight">100%</span>
                <span className="text-[0.7rem] uppercase tracking-[0.15em] text-white/50 font-medium">Rigorous Underwriting</span>
              </div>
              <div className="flex items-baseline gap-3">
                <span className="font-display text-2xl font-bold text-white tracking-tight">Nairobi</span>
                <span className="text-[0.7rem] uppercase tracking-[0.15em] text-white/50 font-medium">Headquartered Hub</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3 text-white/40 text-[0.65rem] tracking-[0.3em] uppercase anim-reveal delay-1000">
          Scroll
          <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/3 bg-emerald-300" style={{ animation: 'scrollDown 2s ease-in-out infinite' }} />
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. MARQUEE — CREATIVE INTERLUDE STRIP
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
          3. PILLARS — EDITORIAL GRID WITH ARCHITECTURAL BACKDROP
          ========================================================================= */}
      <section className="relative py-24 lg:py-32 bg-[#faf8f5] dark:bg-[#0a0e17] overflow-hidden">

        {/* Background image layer — modern architectural */}
        <div
          className="absolute inset-0 z-0 opacity-[0.07] dark:opacity-[0.09] bg-cover bg-center anim-pan-bg"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=2000&q=80')",
          }}
        />

        {/* Corporate grid overlay */}
        <div className="absolute inset-0 z-[1] bg-grid opacity-60 dark:opacity-40" />

        {/* Gradient fade */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#faf8f5]/95 via-[#faf8f5]/85 to-[#faf8f5]/95 dark:from-[#0a0e17]/95 dark:via-[#0a0e17]/85 dark:to-[#0a0e17]/95" />

        {/* Subtle emerald radial top-right */}
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none z-[1]" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">

          {/* Section head */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6 lg:gap-16 mb-16 lg:mb-20">
            <div className="flex items-center gap-3 text-emerald-600 dark:text-emerald-400 text-xs font-bold tracking-[0.3em] uppercase">
              <span className="w-6 h-px bg-emerald-600 dark:bg-emerald-400" />
              Core Pillars
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.035em] leading-[1.05] text-[#0a0e17] dark:text-[#faf8f5]">
              Built on Precision,{' '}
              <em className="italic font-normal text-emerald-600 dark:text-emerald-400">Trust</em>, and Long-Term Value.
            </h2>
          </div>

          {/* Pillars grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 border-t border-[#e8e4dc] dark:border-white/10">
            {[
              { icon: Globe, title: "Local Expertise, Global Vision", desc: "Anchored in Nairobi with extensive grassroots networks across Kenya, we bridge the gap between high-growth East African enterprises and discerning institutional and private investors." },
              { icon: Lock, title: "Rigorous Underwriting", desc: "Every project featured on our platform undergoes stringent financial auditing, legal verification, and risk assessment to protect investor capital and optimize risk-adjusted returns." },
              { icon: TrendingUp, title: "Sustainable Value Creation", desc: "We focus on high-impact sectors including scalable agriculture, commercial developments, and urban real estate that drive long-term economic growth and reliable yields." },
            ].map((pillar, idx) => (
              <div
                key={idx}
                className={`group py-12 px-0 lg:px-10 relative transition-all duration-500 ${
                  idx < 2 ? 'lg:border-r border-[#e8e4dc] dark:border-white/10' : ''
                } ${idx < 2 ? 'border-b lg:border-b-0 border-[#e8e4dc] dark:border-white/10' : ''}`}
              >
                <div className="w-12 h-12 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-6 relative">
                  <pillar.icon className="w-6 h-6 relative z-10" />
                  <span className="absolute inset-0 rounded-full border border-dashed border-emerald-600/40 dark:border-emerald-400/40 anim-rotate-slow" />
                </div>
                <span className="block font-display text-xs font-semibold text-[#8a8577] dark:text-white/40 tracking-[0.2em] mb-6">
                  / 0{idx + 1}
                </span>
                <h3 className="font-display text-2xl font-bold tracking-[-0.025em] leading-tight text-[#0a0e17] dark:text-[#faf8f5] mb-4 transition-colors duration-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                  {pillar.title}
                </h3>
                <p className="text-[0.95rem] text-[#5a5750] dark:text-slate-400 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. FEATURED OPPORTUNITIES — DARK CINEMATIC WITH FINANCIAL BACKDROP
          ========================================================================= */}
      <section className="relative py-24 lg:py-32 bg-[#0a0e17] text-[#faf8f5] overflow-hidden">

        {/* Background image — financial analytics / trading floor */}
        <div
          className="absolute inset-0 z-0 opacity-[0.08] bg-cover bg-center anim-pan-bg"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=2000&q=80')",
          }}
        />

        {/* Corporate grid overlay */}
        <div
          className="absolute inset-0 z-[1] opacity-[0.05]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(250,248,245,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(250,248,245,0.6) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Radial emerald glow */}
        <div className="absolute top-0 -left-1/4 w-[60%] h-full bg-[radial-gradient(ellipse_at_center,rgba(15,155,108,0.18),transparent_60%)] pointer-events-none z-[1]" />

        {/* Bottom emerald glow */}
        <div className="absolute -bottom-40 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none z-[1]" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">

          {/* Section head */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6 lg:gap-16 mb-16">
            <div className="flex items-center gap-3 text-emerald-300 text-xs font-bold tracking-[0.3em] uppercase">
              <span className="w-6 h-px bg-emerald-300" />
              Active Portfolio
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.035em] leading-[1.05]">
              Featured{' '}
              <em className="italic font-normal text-emerald-300">Investment</em> Opportunities.
            </h2>
          </div>

          {featuredInvestments.length === 0 ? (
            <div className="text-center py-20 rounded-3xl bg-white/5 border border-white/10">
              <p className="text-white/50 text-sm font-medium">
                No active investment opportunities are currently published. Please check back shortly.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredInvestments.map((inv) => (
                <div
                  key={inv.id}
                  className="group relative rounded-3xl bg-white/[0.04] backdrop-blur-sm border border-white/10 p-8 flex flex-col overflow-hidden transition-all duration-700 hover:-translate-y-1.5 hover:border-emerald-400/40 hover:bg-white/[0.07]"
                >
                  {/* hover radial glow */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(52,211,153,0.1),transparent_40%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                  <div className="relative z-10 flex flex-col h-full">
                    {/* Top meta */}
                    <div className="flex justify-between items-center mb-8">
                      <span className="px-3.5 py-1.5 rounded-full text-[0.65rem] font-bold tracking-[0.15em] uppercase text-emerald-300 border border-emerald-400/30 bg-emerald-400/10">
                        {inv.category.name}
                      </span>
                      <span className="text-xs text-white/50 flex items-center gap-1.5 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-emerald-300" />
                        {inv.location}
                      </span>
                    </div>

                    <h3 className="font-display text-2xl font-bold tracking-[-0.025em] leading-tight text-white mb-4 transition-colors duration-300 group-hover:text-emerald-300">
                      {inv.title}
                    </h3>

                    <p className="text-sm text-white/60 leading-relaxed line-clamp-2 mb-8">
                      {inv.shortDescription}
                    </p>

                    <div className="flex-1" />

                    <div className="border-t border-white/10 pt-6 mb-6 space-y-3">
                      {inv.fundingTarget && (
                        <div className="flex justify-between text-sm">
                          <span className="text-white/45 font-medium">Target Capital</span>
                          <span className="font-display font-bold text-white tracking-tight">
                            KSh {Number(inv.fundingTarget).toLocaleString()}
                          </span>
                        </div>
                      )}
                      {inv.returnDescription && (
                        <div className="text-xs text-emerald-300 bg-emerald-400/10 border border-emerald-400/20 px-4 py-3 rounded-xl font-semibold leading-relaxed">
                          {inv.returnDescription}
                        </div>
                      )}
                    </div>

                    <Link
                      href={`/investments/${inv.slug}`}
                      className="flex items-center justify-between gap-3 bg-emerald-600 hover:bg-emerald-400 text-white font-semibold text-sm py-4 px-5 rounded-xl transition-all duration-500 group/btn"
                    >
                      View Opportunity Details
                      <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover/btn:translate-x-1" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              href="/investments"
              className="inline-flex items-center gap-3 text-emerald-300 font-semibold text-sm transition-all duration-500 hover:gap-5"
            >
              View All Opportunities
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. HOW IT WORKS — NUMBERED EDITORIAL WITH STRATEGY BACKDROP
          ========================================================================= */}
      <section className="relative py-24 lg:py-32 bg-[#f5f0e8] dark:bg-[#0a0e17] overflow-hidden">

        {/* Strategy / planning background */}
        <div
          className="absolute inset-0 z-0 opacity-[0.08] dark:opacity-[0.1] bg-cover bg-center anim-pan-bg"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=2000&q=80')",
          }}
        />

        {/* Diagonal stripes texture */}
        <div className="absolute inset-0 z-[1] bg-stripes opacity-40 dark:opacity-30" />

        {/* Gradient fade */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#f5f0e8]/95 via-[#f5f0e8]/88 to-[#f5f0e8]/95 dark:from-[#0a0e17]/95 dark:via-[#0a0e17]/88 dark:to-[#0a0e17]/95" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6 lg:gap-16 mb-16">
            <div className="flex items-center gap-3 text-emerald-600 dark:text-emerald-400 text-xs font-bold tracking-[0.3em] uppercase">
              <span className="w-6 h-px bg-emerald-600 dark:bg-emerald-400" />
              How It Works
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.035em] leading-[1.05] text-[#0a0e17] dark:text-[#faf8f5]">
              Three Steps to{' '}
              <em className="italic font-normal text-emerald-600 dark:text-emerald-400">Considered</em> Engagement.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12">
            {[
              { step: "01", title: "Browse & Evaluate", desc: "Explore published investment opportunities across real estate, agriculture, and commercial sectors with complete visibility into targets, returns, and documentation." },
              { step: "02", title: "Express Interest", desc: "Submit your investment interest securely through our inquiry form, specifying your intended capital allocation and questions for the advisory team." },
              { step: "03", title: "Direct Consultation", desc: "Our team reviews your submission and schedules a direct consultation to discuss project documentation, terms, and partnership modalities." },
            ].map((item, idx) => (
              <div
                key={idx}
                className="group relative pt-12 border-t-2 border-[#0a0e17] dark:border-[#faf8f5]"
              >
                <span className="absolute -top-[7px] left-0 w-3 h-3 rounded-full bg-emerald-600 shadow-[0_0_0_6px_#f5f0e8,0_0_0_7px_#0f9b6c] dark:shadow-[0_0_0_6px_#0a0e17,0_0_0_7px_#0f9b6c]" />

                <div className="font-display text-6xl lg:text-7xl font-extrabold tracking-[-0.05em] leading-none text-[#0a0e17]/15 dark:text-[#faf8f5]/15 mb-6 transition-all duration-500 group-hover:text-emerald-600 group-hover:opacity-100 dark:group-hover:text-emerald-400">
                  {item.step}
                </div>
                <h3 className="font-display text-2xl font-bold tracking-[-0.02em] text-[#0a0e17] dark:text-[#faf8f5] mb-3">
                  {item.title}
                </h3>
                <p className="text-[0.95rem] text-[#5a5750] dark:text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. WHY CHOOSE + CONTACT — SPLIT EDITORIAL WITH EXECUTIVE BACKDROP
          ========================================================================= */}
      <section className="relative py-24 lg:py-32 bg-[#faf8f5] dark:bg-[#0a0e17] overflow-hidden">

        {/* Executive office backdrop */}
        <div
          className="absolute inset-0 z-0 opacity-[0.06] dark:opacity-[0.08] bg-cover bg-center anim-pan-bg"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=80')",
          }}
        />

        {/* Corporate grid overlay */}
        <div className="absolute inset-0 z-[1] bg-grid opacity-40 dark:opacity-30" />

        {/* Gradient fade */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#faf8f5]/92 via-[#faf8f5]/85 to-[#faf8f5]/92 dark:from-[#0a0e17]/92 dark:via-[#0a0e17]/85 dark:to-[#0a0e17]/92" />

        {/* Emerald radial accent */}
        <div className="absolute top-1/2 -left-40 w-[500px] h-[500px] bg-emerald-500/8 rounded-full blur-[140px] pointer-events-none z-[1]" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-20 items-start">

            {/* Left — Why choose */}
            <div>
              <div className="flex items-center gap-3 text-emerald-600 dark:text-emerald-400 text-xs font-bold tracking-[0.3em] uppercase mb-4">
                <span className="w-6 h-px bg-emerald-600 dark:bg-emerald-400" />
                Institutional Standards
              </div>
              <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-[-0.035em] leading-[1.05] text-[#0a0e17] dark:text-[#faf8f5] mb-5">
                Why Consider{' '}
                <em className="italic font-normal text-emerald-600 dark:text-emerald-400">Ndegwa</em>?
              </h2>
              <p className="text-base text-[#5a5750] dark:text-slate-400 leading-relaxed max-w-lg mb-8">
                We maintain rigorous standards in sourcing and presenting investment opportunities. Every project undergoes thorough evaluation before publication on our platform.
              </p>

              <div className="flex flex-col border-t border-[#e8e4dc] dark:border-white/10">
                {[
                  { title: "Rigorous Opportunity Selection", desc: "Carefully vetted ventures with clear operational models and market demand in Kenya." },
                  { title: "Transparent Presentation", desc: "Explicit disclosure of funding targets, return structures, risk profiles, and documentation." },
                  { title: "Direct Local Presence", desc: "Based in Nairobi, Kenya, providing local expertise and accessible advisory support." },
                ].map((feat, i) => (
                  <div
                    key={i}
                    className="group grid grid-cols-[40px_1fr] gap-5 py-6 border-b border-[#e8e4dc] dark:border-white/10 transition-all duration-500 hover:pl-2"
                  >
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mt-1" />
                    <div>
                      <h4 className="font-display text-base font-bold tracking-[-0.015em] text-[#0a0e17] dark:text-[#faf8f5] mb-1.5">
                        {feat.title}
                      </h4>
                      <p className="text-sm text-[#5a5750] dark:text-slate-400 leading-relaxed">
                        {feat.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Contact card with executive office image */}
            <div className="relative rounded-3xl overflow-hidden min-h-[520px] flex flex-col justify-end p-10 lg:p-12 text-[#faf8f5] bg-[#0a0e17] group">
              <img
                src="https://images.unsplash.com/photo-1542744094-3a31246264d0?auto=format&fit=crop&w=1000&q=80"
                alt="Nairobi office"
                className="absolute inset-0 w-full h-full object-cover opacity-40 z-0 transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17]/40 via-[#0a0e17]/75 to-[#0a0e17]/95 z-[1]" />

              {/* Emerald glow inside card */}
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-emerald-500/25 rounded-full blur-[80px] z-[1] pointer-events-none" />

              <div className="relative z-10">
                <span className="block text-[0.65rem] font-bold tracking-[0.3em] uppercase text-emerald-300 mb-4">
                  Get in Touch
                </span>
                <h3 className="font-display text-3xl lg:text-4xl font-bold tracking-[-0.03em] leading-[1.1] mb-6">
                  Speak with our
                  <br />
                  Nairobi team.
                </h3>

                <div className="flex flex-col gap-4 mb-8">
                  <div className="flex items-center gap-4 text-sm text-white/85">
                    <span className="w-9 h-9 rounded-xl bg-emerald-400/10 border border-emerald-400/25 flex items-center justify-center text-emerald-300 flex-shrink-0">
                      <Phone className="w-4 h-4" />
                    </span>
                    <span className="font-medium">+254 799 357 038</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-white/85">
                    <span className="w-9 h-9 rounded-xl bg-emerald-400/10 border border-emerald-400/25 flex items-center justify-center text-emerald-300 flex-shrink-0">
                      <Mail className="w-4 h-4" />
                    </span>
                    <span className="font-medium">advisory@ndegwainvestments.com</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-white/85">
                    <span className="w-9 h-9 rounded-xl bg-emerald-400/10 border border-emerald-400/25 flex items-center justify-center text-emerald-300 flex-shrink-0">
                      <MapPin className="w-4 h-4" />
                    </span>
                    <span className="font-medium">Nairobi Headquarters, Kenya</span>
                  </div>
                </div>

                <Link
                  href="/contact"
                  className="w-full flex items-center justify-center gap-3 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-400 text-white font-semibold text-sm transition-all duration-500 shadow-[0_15px_30px_-10px_rgba(15,155,108,0.6)]"
                >
                  Send an Inquiry Message
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. CORPORATE TRUST BAR — NEW SECTION
          ========================================================================= */}
      <section className="relative py-16 bg-[#0a0e17] text-[#faf8f5] overflow-hidden border-t border-white/10">

        {/* Subtle skyline silhouette */}
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
              { icon: ShieldCheck, label: 'Fully Vetted Deals', value: '100%' },
              { icon: BarChart3, label: 'Capital Deployed', value: 'KSh 2.4B+' },
              { icon: Building2, label: 'Active Sectors', value: '3+' },
              { icon: Award, label: 'Years Advisory', value: '10+' },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center gap-3 group">
                <span className="w-12 h-12 rounded-2xl bg-emerald-400/10 border border-emerald-400/25 flex items-center justify-center text-emerald-300 transition-all duration-500 group-hover:bg-emerald-400/20 group-hover:scale-110">
                  <item.icon className="w-5 h-5" />
                </span>
                <span className="font-display text-2xl font-bold tracking-tight text-white">
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
          8. FOOTER STRIP
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