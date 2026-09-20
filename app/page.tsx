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
            @keyframes scaleIn {
              from { opacity: 0; transform: scale(1.06); }
              to { opacity: 1; transform: scale(1); }
            }
            @keyframes slowPan {
              0%, 100% { transform: scale(1.05) translate(0, 0); }
              50% { transform: scale(1.10) translate(-1%, -0.5%); }
            }
            @keyframes drawLineX {
              from { transform: scaleX(0); }
              to { transform: scaleX(1); }
            }
            @keyframes tickerX {
              0% { transform: translateX(0); }
              to { transform: translateX(-50%); }
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
            .anim-scale-in { animation: scaleIn 1.8s cubic-bezier(0.22,1,0.36,1) both; }
            .anim-slow-pan { animation: slowPan 32s ease-in-out infinite; }
            .anim-ticker { animation: tickerX 70s linear infinite; }
            .anim-blink { animation: blink 2s steps(1) infinite; }
            .anim-draw-x { animation: drawLineX 1.6s cubic-bezier(0.77,0,0.175,1) both; transform-origin: left; }
            .anim-marquee-slow { animation: marqueeSlow 90s linear infinite; }

            .d-1 { animation-delay: 0.15s; }
            .d-2 { animation-delay: 0.30s; }
            .d-3 { animation-delay: 0.45s; }
            .d-4 { animation-delay: 0.60s; }
            .d-5 { animation-delay: 0.75s; }
            .d-6 { animation-delay: 0.90s; }

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

            /* Tracking utilities */
            .tracking-xxl { letter-spacing: 0.5em; }
            .tracking-xl { letter-spacing: 0.32em; }
            .tracking-lg { letter-spacing: 0.20em; }

            /* Small caps institutional label */
            .label-inst {
              font-family: 'IBM Plex Mono', monospace;
              font-size: 0.65rem;
              letter-spacing: 0.32em;
              text-transform: uppercase;
              font-weight: 500;
            }

            ::-webkit-scrollbar { width: 10px; height: 10px; }
            ::-webkit-scrollbar-track { background: #FBFBF9; }
            ::-webkit-scrollbar-thumb { background: rgba(14,14,14,0.22); }
            ::-webkit-scrollbar-thumb:hover { background: #B01E28; }
          `,
        }}
      />

      {/* =========================================================================
          1. HERO — INSTITUTIONAL AUTHORITY
          ========================================================================= */}
      <section className="relative bg-[#0E0E0E] text-white overflow-hidden">

        {/* Background image — corporate architecture, treated */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2600&q=90"
            alt=""
            className="w-full h-full object-cover opacity-[0.28] img-inst-hero anim-slow-pan"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0E0E0E] via-[#0E0E0E]/85 to-[#0E0E0E]/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E0E] via-transparent to-[#0E0E0E]/50" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-12 gap-8 min-h-[88vh] pt-32 lg:pt-40 pb-20 lg:pb-0">

            {/* Left — the statement */}
            <div className="col-span-12 lg:col-span-7 flex flex-col justify-center">
              <div className="flex items-center gap-4 mb-10 anim-fade-up">
                <span className="w-12 h-px bg-[#B01E28]" />
                <span className="label-inst text-white/60">
                  Private Capital · Est. 2016 · Nairobi
                </span>
              </div>

              <h1 className="font-serif font-light text-white text-[2.75rem] sm:text-[4rem] lg:text-[5.75rem] leading-[1.02] tracking-[-0.02em] mb-12 max-w-[20ch]">
                <span className="block anim-fade-up d-1">Institutional</span>
                <span className="block anim-fade-up d-2">
                  discipline. <em className="italic font-normal text-[#B01E28]">Considered</em>
                </span>
                <span className="block anim-fade-up d-3">capital.</span>
              </h1>

              <p className="text-lg lg:text-xl text-white/70 leading-[1.75] font-light max-w-[52ch] mb-14 anim-fade-up d-4">
                A Nairobi-based private investment firm connecting qualified global and regional capital with rigorously vetted commercial, agricultural, and real estate ventures across Kenya.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch gap-0 max-w-2xl anim-fade-up d-5">
                <Link
                  href="/investments"
                  className="group flex items-center justify-between gap-6 bg-[#B01E28] hover:bg-white hover:text-[#0E0E0E] text-white label-inst px-8 py-5 transition-colors duration-500 flex-1"
                >
                  <span>Explore Offerings</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-500 group-hover:rotate-45" />
                </Link>
                <Link
                  href="/contact"
                  className="group flex items-center justify-between gap-6 border border-white/30 hover:border-white text-white label-inst px-8 py-5 transition-colors duration-500 flex-1 sm:border-l-0"
                >
                  <span>Advisory Enquiry</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Right — key metrics panel */}
            <div className="col-span-12 lg:col-span-5 relative lg:border-l lg:border-white/15 lg:pl-16 flex flex-col justify-center anim-fade-in d-6">
              <div className="mb-8">
                <span className="label-inst text-white/45 block mb-3">Firm at a glance</span>
                <span className="w-8 h-px bg-[#B01E28] block" />
              </div>

              <div className="flex flex-col">
                {[
                  { k: 'Vetted Pipeline', v: 'KSh 2.4B+' },
                  { k: 'Underwritten', v: '100%' },
                  { k: 'Core Sectors', v: '03' },
                  { k: 'Years Advisory', v: '10+' },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-baseline justify-between py-6 border-b border-white/12 last:border-b-0"
                  >
                    <span className="label-inst text-white/50">{item.k}</span>
                    <span className="font-serif text-3xl lg:text-[2.25rem] font-light text-white">
                      {item.v}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. COMPLIANCE / CREDENTIALS STRIP
          ========================================================================= */}
      <section className="bg-[#FBFBF9] border-b border-[var(--line)]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-10 gap-y-6">
            {[
              { k: 'Regulatory', v: 'CMA Guided' },
              { k: 'Audit', v: 'Big Four Verified' },
              { k: 'Legal', v: 'Kenyan Counsel' },
              { k: 'Custody', v: 'Institutional Grade' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <CheckCircle2 className="w-4 h-4 text-[#B01E28] flex-shrink-0" strokeWidth={1.5} />
                <div>
                  <span className="label-inst text-[#0E0E0E]/45 block mb-1">{item.k}</span>
                  <span className="text-sm text-[#0E0E0E]/85 font-medium">{item.v}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. FIRM INTRODUCTION — MANIFESTO
          ========================================================================= */}
      <section id="firm" className="relative bg-[#FBFBF9] py-24 lg:py-40 border-b border-[var(--line)] overflow-hidden">

        {/* Ghosted image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=2400&q=80"
            alt=""
            className="w-full h-full object-cover opacity-[0.035] img-inst anim-slow-pan"
          />
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-10">

          {/* Section header */}
          <div className="grid grid-cols-12 gap-8 mb-20 items-end">
            <div className="col-span-12 lg:col-span-3">
              <span className="label-inst text-[#0E0E0E]/45 block mb-4">01 — The Firm</span>
              <span className="w-10 h-px bg-[#B01E28] block" />
            </div>
            <div className="col-span-12 lg:col-span-9">
              <p className="font-serif font-light text-[1.75rem] sm:text-[2.5rem] lg:text-[3.25rem] leading-[1.22] tracking-[-0.015em] text-[#0E0E0E] max-w-[30ch] anim-fade-up">
                We hold a long view. Capital placed with patience compounds in ways quarterly thinking cannot <em className="italic font-normal text-[#B01E28]">imagine</em>.
              </p>
            </div>
          </div>

          {/* Two-column body */}
          <div className="grid grid-cols-12 gap-8 lg:gap-16">
            <div className="col-span-12 lg:col-span-3 lg:col-start-4">
              <p className="text-[0.95rem] leading-[1.85] text-[#0E0E0E]/70 anim-fade-up d-1">
                Ndegwa Investments was founded on a straightforward conviction: that high-quality private market opportunities in East Africa deserve institutional-grade structuring, transparent disclosure, and long-horizon stewardship.
              </p>
            </div>
            <div className="col-span-12 lg:col-span-3">
              <p className="text-[0.95rem] leading-[1.85] text-[#0E0E0E]/70 anim-fade-up d-2">
                Our role is deliberately quiet. We source, we vet, we present. Every venture published on our platform has been audited, legally verified, and measured against market demand across Kenya's most active sectors.
              </p>
            </div>
            <div className="col-span-12 lg:col-span-3">
              <p className="text-[0.95rem] leading-[1.85] text-[#0E0E0E]/70 anim-fade-up d-3">
                We serve a small circle of institutional and private partners who share our tempo — long horizons, rigorous standards, and a preference for substance over signal in everything we do.
              </p>
            </div>
          </div>

          {/* Stat row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-10 mt-24 pt-12 border-t border-[var(--line)]">
            {[
              { v: 'KSh 2.4B+', k: 'Capital pipeline' },
              { v: '100%', k: 'Underwritten deals' },
              { v: '03', k: 'Active sectors' },
              { v: '10+', k: 'Years of advisory' },
            ].map((s, i) => (
              <div key={i} className="anim-fade-up" style={{ animationDelay: `${0.1 + i * 0.1}s` }}>
                <span className="font-serif text-4xl lg:text-5xl font-light text-[#0E0E0E] block mb-3 tracking-[-0.02em]">
                  {s.v}
                </span>
                <span className="label-inst text-[#0E0E0E]/45">{s.k}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. SECTOR COVERAGE — INSTITUTIONAL PLATES
          ========================================================================= */}
      <section className="relative bg-[#F2F0EB] border-b border-[var(--line)] overflow-hidden">

        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-24 lg:py-32">

          {/* Header */}
          <div className="grid grid-cols-12 gap-8 mb-16 items-end">
            <div className="col-span-12 lg:col-span-3">
              <span className="label-inst text-[#0E0E0E]/45 block mb-4">Coverage</span>
              <span className="w-10 h-px bg-[#B01E28] block" />
            </div>
            <div className="col-span-12 lg:col-span-9">
              <h2 className="font-serif font-light text-[2rem] sm:text-[3rem] lg:text-[3.75rem] leading-[1.05] tracking-[-0.02em] text-[#0E0E0E] max-w-[22ch]">
                Three sectors. <em className="italic font-normal text-[#B01E28]">One</em> discipline.
              </h2>
            </div>
          </div>

          {/* Sector plates */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                num: '01',
                title: 'Real Estate',
                desc: 'Residential, commercial and mixed-use developments across Nairobi and secondary growth corridors.',
                img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1400&q=85',
                tags: ['Mixed-use', 'Residential', 'Land'],
              },
              {
                num: '02',
                title: 'Agriculture',
                desc: 'Scalable, export-ready agricultural ventures with strong off-take structures and verified operational models.',
                img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1400&q=85',
                tags: ['Export', 'Value-add', 'Land'],
              },
              {
                num: '03',
                title: 'Commercial',
                desc: 'Institutional-grade commercial assets and operating businesses with stable, long-term cash-flow profiles.',
                img: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=85',
                tags: ['Operating', 'Cash-flow', 'Lease'],
              },
            ].map((sector, idx) => (
              <article
                key={idx}
                className="group relative bg-white border border-[var(--line)] overflow-hidden anim-fade-up"
                style={{ animationDelay: `${0.1 + idx * 0.1}s` }}
              >
                {/* Image plate */}
                <div className="relative aspect-[5/4] overflow-hidden bg-[#0E0E0E]">
                  <img
                    src={sector.img}
                    alt={sector.title}
                    className="w-full h-full object-cover img-inst opacity-95 transition-transform duration-[1400ms] group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E0E]/60 via-transparent to-transparent" />

                  <span className="absolute top-5 left-5 label-inst text-white/90 bg-[#0E0E0E]/50 backdrop-blur-sm px-3 py-1.5">
                    Sector · {sector.num}
                  </span>
                </div>

                {/* Content */}
                <div className="p-8 lg:p-10">
                  <h3 className="font-serif text-[1.75rem] lg:text-[2rem] font-normal tracking-[-0.01em] text-[#0E0E0E] mb-4">
                    {sector.title}
                  </h3>
                  <p className="text-sm leading-[1.75] text-[#0E0E0E]/65 mb-8">
                    {sector.desc}
                  </p>

                  {/* Tag row */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {sector.tags.map((tag) => (
                      <span
                        key={tag}
                        className="label-inst text-[#0E0E0E]/55 border border-[var(--line-strong)] px-3 py-1.5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link
                    href="/investments"
                    className="group/link inline-flex items-center gap-3 label-inst text-[#0E0E0E] hover:text-[#B01E28] transition-colors pt-6 border-t border-[var(--line)] w-full"
                  >
                    View opportunities
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-500 group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. DOCTRINE — INSTITUTIONAL PRINCIPLES
          ========================================================================= */}
      <section id="doctrine" className="relative bg-[#0E0E0E] text-white border-b border-white/10 overflow-hidden">

        {/* Subtle bg */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=2400&q=80"
            alt=""
            className="w-full h-full object-cover opacity-[0.06] img-inst anim-slow-pan"
          />
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-10 py-24 lg:py-40">

          {/* Header */}
          <div className="grid grid-cols-12 gap-8 mb-20 items-end">
            <div className="col-span-12 lg:col-span-3">
              <span className="label-inst text-white/45 block mb-4">02 — Doctrine</span>
              <span className="w-10 h-px bg-[#B01E28] block" />
            </div>
            <div className="col-span-12 lg:col-span-9">
              <h2 className="font-serif font-light text-[2rem] sm:text-[3rem] lg:text-[4rem] leading-[1.05] tracking-[-0.02em] text-white max-w-[24ch]">
                Built on precision, <em className="italic font-normal text-[#B01E28]">trust</em>, and the long arc of value.
              </h2>
            </div>
          </div>

          {/* Principles */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 border-t border-white/12">
            {[
              {
                num: '01',
                icon: Globe,
                title: 'Local expertise, global vision',
                desc: 'Anchored in Nairobi with extensive grassroots networks across Kenya, we bridge the gap between high-growth East African enterprises and discerning institutional and private investors.',
              },
              {
                num: '02',
                icon: Lock,
                title: 'Rigorous underwriting',
                desc: 'Every project featured on our platform undergoes stringent financial auditing, legal verification, and risk assessment to protect investor capital and optimize risk-adjusted returns.',
              },
              {
                num: '03',
                icon: TrendingUp,
                title: 'Sustainable value creation',
                desc: 'We focus on high-impact sectors including scalable agriculture, commercial developments, and urban real estate that drive long-term economic growth and reliable yields.',
              },
            ].map((p, idx) => (
              <article
                key={idx}
                className={`group relative py-12 lg:py-16 ${
                  idx < 2 ? 'lg:border-r border-white/12' : ''
                } ${idx < 2 ? 'border-b lg:border-b-0 border-white/12' : ''} ${
                  idx === 0 ? 'lg:pr-12' : idx === 1 ? 'lg:px-12' : 'lg:pl-12'
                }`}
              >
                {/* Number */}
                <div className="flex items-baseline justify-between mb-10">
                  <span className="font-serif text-6xl lg:text-7xl font-light text-[#B01E28] leading-none">
                    {p.num}
                  </span>
                  <p.icon className="w-6 h-6 text-white/40" strokeWidth={1.25} />
                </div>

                <h3 className="font-serif text-2xl lg:text-[1.75rem] font-normal tracking-[-0.01em] text-white leading-[1.2] mb-5 max-w-[22ch]">
                  {p.title}
                </h3>

                <p className="text-[0.95rem] leading-[1.8] text-white/60 font-light">
                  {p.desc}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. FEATURED OPPORTUNITIES — INSTITUTIONAL PORTFOLIO
          ========================================================================= */}
      <section className="relative bg-[#FBFBF9] border-b border-[var(--line)] py-24 lg:py-40">

        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">

          {/* Section header */}
          <div className="grid grid-cols-12 gap-8 mb-16 items-end">
            <div className="col-span-12 lg:col-span-3">
              <span className="label-inst text-[#0E0E0E]/45 block mb-4">03 — Portfolio</span>
              <span className="w-10 h-px bg-[#B01E28] block" />
            </div>
            <div className="col-span-12 lg:col-span-6">
              <h2 className="font-serif font-light text-[2rem] sm:text-[3rem] lg:text-[3.75rem] leading-[1.05] tracking-[-0.02em] text-[#0E0E0E] max-w-[20ch]">
                Featured <em className="italic font-normal text-[#B01E28]">opportunities</em>.
              </h2>
            </div>
            <div className="col-span-12 lg:col-span-3 lg:text-right">
              <Link
                href="/investments"
                className="group inline-flex items-center gap-3 label-inst text-[#0E0E0E] hover:text-[#B01E28] transition-colors"
              >
                View all investments
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-500 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {featuredInvestments.length === 0 ? (
            <div className="text-center py-24 border border-[var(--line)]">
              <p className="label-inst text-[#0E0E0E]/45">
                — No active opportunities published —
              </p>
              <p className="text-sm text-[#0E0E0E]/55 mt-3">
                Please check back shortly.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
              {featuredInvestments.map((inv, idx) => (
                <article
                  key={inv.id}
                  className="group relative bg-white border border-[var(--line)] flex flex-col anim-fade-up transition-shadow duration-500 hover:shadow-[0_24px_60px_-32px_rgba(14,14,14,0.28)]"
                  style={{ animationDelay: `${0.1 + idx * 0.1}s` }}
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#0E0E0E]">
                    <img
                      src={
                        idx === 0
                          ? 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1400&q=85'
                          : idx === 1
                          ? 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1400&q=85'
                          : 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=85'
                      }
                      alt={inv.title}
                      className="w-full h-full object-cover img-inst transition-transform duration-[1400ms] group-hover:scale-[1.05]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E0E]/50 via-transparent to-transparent" />

                    {/* Category + Index */}
                    <div className="absolute top-5 left-5 right-5 flex items-start justify-between">
                      <span className="label-inst text-white bg-[#0E0E0E]/60 backdrop-blur-sm px-3 py-1.5">
                        {inv.category.name}
                      </span>
                      <span className="font-mono text-[0.7rem] text-white/80 bg-[#0E0E0E]/50 backdrop-blur-sm px-2.5 py-1.5">
                        0{idx + 1} / 0{featuredInvestments.length}
                      </span>
                    </div>

                    {/* Location bottom */}
                    <div className="absolute bottom-5 left-5 flex items-center gap-2 text-white">
                      <MapPin className="w-3.5 h-3.5 text-[#B01E28]" strokeWidth={1.75} />
                      <span className="label-inst text-white/90">{inv.location}</span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="flex flex-col flex-1 p-8 lg:p-9">
                    <h3 className="font-serif text-[1.5rem] lg:text-[1.75rem] font-normal leading-[1.2] tracking-[-0.01em] text-[#0E0E0E] mb-4 group-hover:text-[#B01E28] transition-colors duration-500">
                      {inv.title}
                    </h3>

                    <p className="text-sm leading-[1.75] text-[#0E0E0E]/60 line-clamp-3 mb-8">
                      {inv.shortDescription}
                    </p>

                    <div className="flex-1" />

                    {/* Data rows */}
                    <div className="border-t border-[var(--line)] pt-6 mb-6 space-y-3">
                      {inv.fundingTarget && (
                        <div className="flex items-baseline justify-between">
                          <span className="label-inst text-[#0E0E0E]/45">Target Capital</span>
                          <span className="font-serif text-lg text-[#0E0E0E]">
                            KSh {Number(inv.fundingTarget).toLocaleString()}
                          </span>
                        </div>
                      )}
                      {inv.returnDescription && (
                        <div className="flex items-baseline justify-between gap-4">
                          <span className="label-inst text-[#0E0E0E]/45">Return Profile</span>
                          <span className="font-mono text-[0.7rem] text-[#B01E28] text-right">
                            {inv.returnDescription}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* CTA */}
                    <Link
                      href={`/investments/${inv.slug}`}
                      className="group/btn flex items-center justify-between gap-3 bg-[#0E0E0E] hover:bg-[#B01E28] text-white label-inst px-6 py-4 transition-colors duration-500 w-full"
                    >
                      View Opportunity
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-500 group-hover/btn:translate-x-1" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* =========================================================================
          7. PROCESS — INSTITUTIONAL PROTOCOL
          ========================================================================= */}
      <section id="process" className="relative bg-[#F2F0EB] border-b border-[var(--line)] overflow-hidden">

        {/* Ghosted bg */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=2400&q=80"
            alt=""
            className="w-full h-full object-cover opacity-[0.04] img-inst anim-slow-pan"
          />
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-10 py-24 lg:py-32">

          {/* Header */}
          <div className="grid grid-cols-12 gap-8 mb-20 items-end">
            <div className="col-span-12 lg:col-span-3">
              <span className="label-inst text-[#0E0E0E]/45 block mb-4">04 — Protocol</span>
              <span className="w-10 h-px bg-[#B01E28] block" />
            </div>
            <div className="col-span-12 lg:col-span-6">
              <h2 className="font-serif font-light text-[2rem] sm:text-[3rem] lg:text-[3.75rem] leading-[1.05] tracking-[-0.02em] text-[#0E0E0E] max-w-[20ch]">
                A disciplined <em className="italic font-normal text-[#B01E28]">process</em>.
              </h2>
            </div>
            <div className="col-span-12 lg:col-span-3">
              <p className="text-sm leading-[1.75] text-[#0E0E0E]/65">
                Three steps take you from browsing to direct advisory. No intermediaries, no noise.
              </p>
            </div>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-[#0E0E0E]/15">
            {[
              { num: '01', title: 'Browse & Evaluate', desc: 'Explore published investment opportunities across real estate, agriculture, and commercial sectors with complete visibility into targets, returns, and documentation.' },
              { num: '02', title: 'Express Interest', desc: 'Submit your investment interest securely through our inquiry form, specifying your intended capital allocation and questions for the advisory team.' },
              { num: '03', title: 'Direct Consultation', desc: 'Our team reviews your submission and schedules a direct consultation to discuss project documentation, terms, and partnership modalities.' },
            ].map((item, idx) => (
              <div
                key={idx}
                className={`group relative py-12 lg:py-16 ${
                  idx < 2 ? 'lg:border-r border-[#0E0E0E]/15' : ''
                } ${idx < 2 ? 'border-b md:border-b-0 border-[#0E0E0E]/15' : ''} ${
                  idx === 0 ? 'lg:pr-12' : idx === 1 ? 'lg:px-12' : 'lg:pl-12'
                }`}
              >
                {/* Number */}
                <div className="font-serif text-[4rem] lg:text-[5rem] font-light leading-none text-[#B01E28]/30 group-hover:text-[#B01E28] transition-colors duration-700 mb-8">
                  {item.num}
                </div>

                <div className="w-full h-px bg-[#0E0E0E]/15 mb-8 anim-draw-x" style={{ animationDelay: `${0.3 + idx * 0.15}s` }} />

                <h3 className="font-serif text-[1.5rem] lg:text-[1.75rem] font-normal tracking-[-0.01em] text-[#0E0E0E] mb-4">
                  {item.title}
                </h3>
                <p className="text-sm leading-[1.8] text-[#0E0E0E]/65">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          8. LEADERSHIP MESSAGE — SPLIT INSTITUTIONAL
          ========================================================================= */}
      <section className="relative bg-[#FBFBF9] border-b border-[var(--line)] overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[720px]">

          {/* Image panel */}
          <div className="relative overflow-hidden bg-[#0E0E0E]">
            <img
              src="https://images.unsplash.com/photo-1542744094-3a31246264d0?auto=format&fit=crop&w=1600&q=85"
              alt=""
              className="absolute inset-0 w-full h-full object-cover opacity-75 img-inst anim-slow-pan"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E0E] via-[#0E0E0E]/30 to-transparent" />

            <div className="relative z-10 h-full flex flex-col justify-between p-10 lg:p-16 text-white min-h-[500px]">
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-[#B01E28] rounded-full anim-blink" />
                <span className="label-inst text-white/70">Fig. 05 · Nairobi HQ</span>
              </div>

              <div>
                <span className="font-serif text-[#B01E28] text-7xl leading-none block mb-8">"</span>
                <blockquote className="font-serif font-light italic text-[1.75rem] lg:text-[2.25rem] leading-[1.25] tracking-[-0.015em] mb-8 max-w-[26ch]">
                  Capital is a tool. Discipline is the strategy. Considered engagement is what compounds value over decades.
                </blockquote>
                <div className="flex items-center gap-4">
                  <span className="w-12 h-px bg-[#B01E28]" />
                  <span className="label-inst text-white/60">
                    Investment Committee
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Content panel */}
          <div className="relative bg-[#FBFBF9] p-10 lg:p-16 flex flex-col justify-center">

            {/* Ghost */}
            <div className="absolute inset-0 z-0">
              <img
                src="https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1400&q=80"
                alt=""
                className="w-full h-full object-cover opacity-[0.03] img-inst"
              />
            </div>

            <div className="relative z-10 max-w-xl">
              <span className="label-inst text-[#0E0E0E]/45 block mb-4">05 — Standards</span>
              <span className="w-10 h-px bg-[#B01E28] block mb-10" />

              <h2 className="font-serif font-light text-[2rem] sm:text-[3rem] lg:text-[3.5rem] leading-[1.05] tracking-[-0.02em] text-[#0E0E0E] mb-8 max-w-[16ch]">
                Why partners choose <em className="italic font-normal text-[#B01E28]">Ndegwa</em>.
              </h2>

              <p className="text-[0.95rem] leading-[1.85] text-[#0E0E0E]/65 mb-12 max-w-lg">
                We maintain rigorous standards in sourcing and presenting investment opportunities. Every project undergoes thorough evaluation before publication on our platform.
              </p>

              <div className="flex flex-col border-t border-[var(--line)]">
                {[
                  { title: 'Rigorous opportunity selection', desc: 'Carefully vetted ventures with clear operational models and demonstrated market demand in Kenya.' },
                  { title: 'Transparent presentation', desc: 'Explicit disclosure of funding targets, return structures, risk profiles, and supporting documentation.' },
                  { title: 'Direct local presence', desc: 'Based in Nairobi, providing local expertise and accessible advisory support to qualified partners.' },
                ].map((feat, i) => (
                  <div
                    key={i}
                    className="group grid grid-cols-[40px_1fr] gap-6 py-7 border-b border-[var(--line)] transition-all duration-500 hover:pl-2"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#B01E28] mt-1" strokeWidth={1.5} />
                    <div>
                      <h4 className="font-serif text-[1.15rem] lg:text-[1.25rem] font-normal tracking-[-0.005em] text-[#0E0E0E] mb-2">
                        {feat.title}
                      </h4>
                      <p className="text-sm leading-[1.75] text-[#0E0E0E]/60">
                        {feat.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          9. TRUST BAR — DATA STRIP
          ========================================================================= */}
      <section className="bg-[#0E0E0E] text-white border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/10">
            {[
              { icon: ShieldCheck, k: 'Vetted deals', v: '100%' },
              { icon: BarChart3, k: 'Capital deployed', v: 'KSh 2.4B+' },
              { icon: Building2, k: 'Active sectors', v: '03' },
              { icon: Award, k: 'Years advisory', v: '10+' },
            ].map((item, idx) => (
              <div key={idx} className="py-10 px-6 lg:px-8 group">
                <div className="flex items-center justify-between mb-6">
                  <item.icon className="w-5 h-5 text-[#B01E28]" strokeWidth={1.25} />
                  <span className="font-mono text-[0.65rem] text-white/35">
                    / 0{idx + 1}
                  </span>
                </div>
                <div className="font-serif text-3xl lg:text-4xl font-light mb-2 tracking-[-0.02em] text-white">
                  {item.v}
                </div>
                <div className="label-inst text-white/45">{item.k}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          10. CONTACT — INSTITUTIONAL ENQUIRY
          ========================================================================= */}
      <section className="relative bg-[#0E0E0E] text-white overflow-hidden">

        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=2400&q=85"
            alt=""
            className="w-full h-full object-cover opacity-[0.22] img-inst-hero anim-slow-pan"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0E0E0E] via-[#0E0E0E]/85 to-[#0E0E0E]/50" />
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-10 py-24 lg:py-40">
          <div className="grid grid-cols-12 gap-8 lg:gap-16 items-end">

            {/* Left */}
            <div className="col-span-12 lg:col-span-7">
              <div className="flex items-center gap-4 mb-10">
                <span className="label-inst text-white/45">06 — Contact</span>
                <span className="w-10 h-px bg-[#B01E28]" />
              </div>

              <h2 className="font-serif font-light text-[2rem] sm:text-[3rem] lg:text-[4rem] leading-[1.05] tracking-[-0.02em] mb-10 max-w-[16ch]">
                Speak with our <em className="italic font-normal text-[#B01E28]">Nairobi</em> team.
              </h2>

              <p className="text-lg leading-[1.75] text-white/70 font-light max-w-lg mb-12">
                Whether you're a qualified investor, institutional partner, or a venture seeking capital — we welcome a direct, considered conversation.
              </p>

              <div className="flex flex-col sm:flex-row gap-0 max-w-2xl">
                <Link
                  href="/contact"
                  className="group flex items-center justify-between gap-6 bg-white text-[#0E0E0E] label-inst px-8 py-5 hover:bg-[#B01E28] hover:text-white transition-colors duration-500 flex-1"
                >
                  <span>Send an Inquiry</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-500 group-hover:rotate-45" />
                </Link>
                <Link
                  href="/investments"
                  className="group flex items-center justify-between gap-6 border border-white/30 hover:border-white text-white label-inst px-8 py-5 transition-colors duration-500 flex-1 sm:border-l-0"
                >
                  <span>View Portfolio</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Right — contact panel */}
            <div className="col-span-12 lg:col-span-5 lg:pl-16 lg:border-l lg:border-white/15">
              <span className="label-inst text-white/45 block mb-8">Direct lines</span>

              <div className="flex flex-col">
                <div className="flex items-start gap-6 py-6 border-b border-white/12">
                  <Phone className="w-4 h-4 text-[#B01E28] mt-1 flex-shrink-0" strokeWidth={1.5} />
                  <div>
                    <span className="label-inst text-white/45 block mb-2">Advisory Desk</span>
                    <span className="font-serif text-xl text-white">+254 799 357 038</span>
                  </div>
                </div>

                <div className="flex items-start gap-6 py-6 border-b border-white/12">
                  <Mail className="w-4 h-4 text-[#B01E28] mt-1 flex-shrink-0" strokeWidth={1.5} />
                  <div>
                    <span className="label-inst text-white/45 block mb-2">Email</span>
                    <span className="font-serif text-xl text-white break-all">
                      advisory@ndegwainvestments.com
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-6 py-6">
                  <MapPin className="w-4 h-4 text-[#B01E28] mt-1 flex-shrink-0" strokeWidth={1.5} />
                  <div>
                    <span className="label-inst text-white/45 block mb-2">Headquarters</span>
                    <span className="font-serif text-xl text-white">Nairobi, Kenya</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          11. FOOTER — INSTITUTIONAL MASTHEAD
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

            {/* Wordmark block */}
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

            {/* Nav columns */}
            <div className="col-span-12 lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <span className="label-inst text-white/45 block mb-6">Firm</span>
                <ul className="flex flex-col gap-4">
                  {['About', 'Doctrine', 'Team', 'Careers'].map((l) => (
                    <li key={l}>
                      <Link href="#" className="text-sm text-white/70 hover:text-[#B01E28] transition-colors">
                        {l}
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
                    { l: 'Process', h: '#process' },
                    { l: 'Standards', h: '#doctrine' },
                    { l: 'Advisory', h: '/contact' },
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

        {/* Bottom bar */}
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