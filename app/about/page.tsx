// app/about/page.tsx
import Link from 'next/link'
import {
  ShieldCheck,
  Building2,
  Target,
  ArrowRight,
  Globe,
  Lock,
  Award,
  TrendingUp,
  CheckCircle2,
  MapPin,
  Briefcase,
  Users,
  Sparkles,
} from 'lucide-react'

export const metadata = {
  title: 'About Ndegwa Investments',
  description:
    'Learn about Ndegwa Investments, our mission, and our approach to presenting vetted investment opportunities in East Africa.',
}

export default function AboutPage() {
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

            /* Institutional label */
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
          1. PAGE HEADER — INSTITUTIONAL CORPORATE PROFILE
          ========================================================================= */}
      <section className="relative bg-[#0E0E0E] text-white overflow-hidden">

        {/* Background image — corporate architecture */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2600&q=90"
            alt=""
            className="w-full h-full object-cover opacity-[0.22] img-inst-hero anim-slow-pan"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0E0E0E] via-[#0E0E0E]/88 to-[#0E0E0E]/55" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E0E] via-transparent to-[#0E0E0E]/40" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-10 pt-32 lg:pt-40 pb-20 lg:pb-28">
          <div className="grid grid-cols-12 gap-8">

            {/* Left — the statement */}
            <div className="col-span-12 lg:col-span-8">
              <div className="flex items-center gap-4 mb-10 anim-fade-up">
                <span className="w-12 h-px bg-[#B01E28]" />
                <span className="label-inst text-white/60">
                  Corporate Profile · Est. 2016 · Nairobi
                </span>
              </div>

              <h1 className="font-serif font-light text-white text-[2.75rem] sm:text-[4rem] lg:text-[5.5rem] leading-[1.02] tracking-[-0.02em] mb-12 max-w-[22ch]">
                <span className="block anim-fade-up d-1">About</span>
                <span className="block anim-fade-up d-2">
                  Ndegwa <em className="italic font-normal text-[#B01E28]">Investments</em>.
                </span>
              </h1>

              <p className="text-lg lg:text-xl text-white/70 leading-[1.75] font-light max-w-[56ch] anim-fade-up d-4">
                Headquartered in Nairobi, Kenya, Ndegwa Investments is a specialized investment-opportunity presentation and lead-generation platform connecting qualified capital with high-potential commercial ventures.
              </p>
            </div>

            {/* Right — key facts panel */}
            <div className="col-span-12 lg:col-span-4 lg:border-l lg:border-white/15 lg:pl-16 flex flex-col justify-end anim-fade-in d-6">
              <div className="mb-6">
                <span className="label-inst text-white/45 block mb-3">Corporate Record</span>
                <span className="w-8 h-px bg-[#B01E28] block" />
              </div>

              <div className="flex flex-col">
                {[
                  { k: 'Legal Form', v: 'Private Ltd' },
                  { k: 'Headquarters', v: 'Nairobi, KE' },
                  { k: 'Founded', v: '2016' },
                  { k: 'Focus', v: 'East Africa' },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-baseline justify-between py-5 border-b border-white/12 last:border-b-0"
                  >
                    <span className="label-inst text-white/50">{item.k}</span>
                    <span className="font-serif text-lg text-white">{item.v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. KEY METRICS STRIP
          ========================================================================= */}
      <section className="bg-[#FBFBF9] border-b border-[var(--line)]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-[var(--line)]">
            {[
              { v: 'KSh 2.4B+', k: 'Vetted Pipeline' },
              { v: '100%', k: 'Rigorous Underwriting' },
              { v: '03', k: 'Core Sectors' },
              { v: '10+', k: 'Years Advisory' },
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
          3. MARQUEE STRIP — INSTITUTIONAL VALUES
          ========================================================================= */}
      <div className="bg-[#0E0E0E] text-white border-b border-white/10 py-5 overflow-hidden">
        <div className="flex whitespace-nowrap anim-marquee-slow w-max label-inst text-white/40">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex items-center">
              {['Integrity', 'Transparency', 'Rigour', 'Partnership', 'Long-Term Value', 'East Africa', 'Nairobi'].map((item) => (
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
          4. MISSION & PURPOSE — SPLIT EDITORIAL
          ========================================================================= */}
      <section className="relative bg-[#FBFBF9] py-24 lg:py-40 border-b border-[var(--line)] overflow-hidden">

        {/* Ghosted strategy image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=2400&q=80"
            alt=""
            className="w-full h-full object-cover opacity-[0.035] img-inst anim-slow-pan"
          />
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-10">

          {/* Section header */}
          <div className="grid grid-cols-12 gap-8 mb-20 items-end">
            <div className="col-span-12 lg:col-span-3">
              <span className="label-inst text-[#0E0E0E]/45 block mb-4">01 — Foundation</span>
              <span className="w-10 h-px bg-[#B01E28] block" />
            </div>
            <div className="col-span-12 lg:col-span-9">
              <h2 className="font-serif font-light text-[2rem] sm:text-[3rem] lg:text-[3.75rem] leading-[1.05] tracking-[-0.02em] text-[#0E0E0E] max-w-[24ch] anim-fade-up">
                A platform built on <em className="italic font-normal text-[#B01E28]">discipline</em> and clarity.
              </h2>
            </div>
          </div>

          {/* Two-card grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">

            {/* Mission card */}
            <article className="group relative bg-white border border-[var(--line)] p-10 lg:p-14 transition-shadow duration-500 hover:shadow-[0_24px_60px_-32px_rgba(14,14,14,0.28)] anim-fade-up">
              {/* Red hairline top */}
              <div className="absolute top-0 left-0 w-16 h-px bg-[#B01E28] group-hover:w-32 transition-all duration-700" />

              <div className="flex items-start justify-between mb-10">
                <div className="w-14 h-14 border border-[#0E0E0E] flex items-center justify-center text-[#0E0E0E]">
                  <Target className="w-5 h-5" strokeWidth={1.5} />
                </div>
                <span className="font-mono text-[0.7rem] text-[#0E0E0E]/35">
                  / 01
                </span>
              </div>

              <h3 className="font-serif text-[1.75rem] lg:text-[2.25rem] font-normal tracking-[-0.01em] text-[#0E0E0E] leading-[1.15] mb-5 max-w-[22ch]">
                Our core purpose
              </h3>

              <p className="text-[0.95rem] leading-[1.85] text-[#0E0E0E]/65 mb-8">
                We bridge the information gap between project sponsors and discerning investors. By providing rigorous transparency, detailed documentation, and structured opportunity presentations, we facilitate meaningful capital partnerships.
              </p>

              {/* Feature list */}
              <div className="flex flex-col border-t border-[var(--line)] pt-6">
                {[
                  'Detailed opportunity documentation',
                  'Structured investor presentations',
                  'Direct sponsor consultation',
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-4 py-3.5 border-b border-[var(--line)] last:border-b-0"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#B01E28] flex-shrink-0" strokeWidth={1.5} />
                    <span className="text-sm text-[#0E0E0E]/75">{item}</span>
                  </div>
                ))}
              </div>
            </article>

            {/* Standards card */}
            <article
              className="group relative bg-white border border-[var(--line)] p-10 lg:p-14 transition-shadow duration-500 hover:shadow-[0_24px_60px_-32px_rgba(14,14,14,0.28)] anim-fade-up d-2"
            >
              {/* Red hairline top */}
              <div className="absolute top-0 left-0 w-16 h-px bg-[#B01E28] group-hover:w-32 transition-all duration-700" />

              <div className="flex items-start justify-between mb-10">
                <div className="w-14 h-14 border border-[#0E0E0E] flex items-center justify-center text-[#0E0E0E]">
                  <ShieldCheck className="w-5 h-5" strokeWidth={1.5} />
                </div>
                <span className="font-mono text-[0.7rem] text-[#0E0E0E]/35">
                  / 02
                </span>
              </div>

              <h3 className="font-serif text-[1.75rem] lg:text-[2.25rem] font-normal tracking-[-0.01em] text-[#0E0E0E] leading-[1.15] mb-5 max-w-[22ch]">
                Rigorous standards
              </h3>

              <p className="text-[0.95rem] leading-[1.85] text-[#0E0E0E]/65 mb-8">
                We maintain strict adherence to professional presentation standards. We do not engage in brokerage, forex trading, or payment processing — our focus remains strictly on high-quality opportunity presentation.
              </p>

              <div className="flex flex-col border-t border-[var(--line)] pt-6">
                {[
                  'No brokerage or forex trading',
                  'No payment processing',
                  'Presentation-focused platform',
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-4 py-3.5 border-b border-[var(--line)] last:border-b-0"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#B01E28] flex-shrink-0" strokeWidth={1.5} />
                    <span className="text-sm text-[#0E0E0E]/75">{item}</span>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. OUR APPROACH — DARK INSTITUTIONAL
          ========================================================================= */}
      <section className="relative bg-[#0E0E0E] text-white border-b border-white/10 overflow-hidden">

        {/* Ghosted financial backdrop */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=2400&q=80"
            alt=""
            className="w-full h-full object-cover opacity-[0.08] img-inst anim-slow-pan"
          />
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-10 py-24 lg:py-40">

          {/* Header */}
          <div className="grid grid-cols-12 gap-8 mb-20 items-end">
            <div className="col-span-12 lg:col-span-3">
              <span className="label-inst text-white/45 block mb-4">02 — Approach</span>
              <span className="w-10 h-px bg-[#B01E28] block" />
            </div>
            <div className="col-span-12 lg:col-span-9">
              <h2 className="font-serif font-light text-[2rem] sm:text-[3rem] lg:text-[3.75rem] leading-[1.05] tracking-[-0.02em] text-white max-w-[26ch] anim-fade-up">
                Three principles that <em className="italic font-normal text-[#B01E28]">guide</em> everything we do.
              </h2>
            </div>
          </div>

          {/* Principles grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 border-t border-white/12">
            {[
              {
                icon: Globe,
                num: '01',
                title: 'Local roots, global reach',
                desc: 'Anchored in Nairobi with deep regional networks across Kenya, we connect East African enterprises with qualified domestic and international capital.',
              },
              {
                icon: Lock,
                num: '02',
                title: 'Verified documentation',
                desc: 'Every opportunity presented on our platform is supported by complete financial records, legal verification, and transparent risk disclosure.',
              },
              {
                icon: TrendingUp,
                num: '03',
                title: 'Long-term value focus',
                desc: 'We prioritise sustainable ventures in agriculture, commercial development, and real estate that deliver reliable yields over short-term speculation.',
              },
            ].map((item, idx) => (
              <article
                key={idx}
                className={`group relative py-12 lg:py-16 ${
                  idx < 2 ? 'lg:border-r border-white/12' : ''
                } ${idx < 2 ? 'border-b lg:border-b-0 border-white/12' : ''} ${
                  idx === 0 ? 'lg:pr-12' : idx === 1 ? 'lg:px-12' : 'lg:pl-12'
                }`}
              >
                {/* Number + icon */}
                <div className="flex items-baseline justify-between mb-10">
                  <span className="font-serif text-6xl lg:text-7xl font-light text-[#B01E28] leading-none">
                    {item.num}
                  </span>
                  <item.icon className="w-6 h-6 text-white/40" strokeWidth={1.25} />
                </div>

                <h3 className="font-serif text-2xl lg:text-[1.75rem] font-normal tracking-[-0.01em] text-white leading-[1.2] mb-5 max-w-[22ch]">
                  {item.title}
                </h3>

                <p className="text-[0.95rem] leading-[1.8] text-white/60 font-light">
                  {item.desc}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. SCOPE OF ENGAGEMENT — WHAT WE DO / DON'T
          ========================================================================= */}
      <section className="relative bg-[#F2F0EB] border-b border-[var(--line)] overflow-hidden">

        {/* Ghosted executive image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2400&q=80"
            alt=""
            className="w-full h-full object-cover opacity-[0.04] img-inst anim-slow-pan"
          />
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-10 py-24 lg:py-32">

          {/* Header */}
          <div className="grid grid-cols-12 gap-8 mb-20 items-end">
            <div className="col-span-12 lg:col-span-3">
              <span className="label-inst text-[#0E0E0E]/45 block mb-4">03 — Scope</span>
              <span className="w-10 h-px bg-[#B01E28] block" />
            </div>
            <div className="col-span-12 lg:col-span-9">
              <h2 className="font-serif font-light text-[2rem] sm:text-[3rem] lg:text-[3.75rem] leading-[1.05] tracking-[-0.02em] text-[#0E0E0E] max-w-[24ch] anim-fade-up">
                What we <em className="italic font-normal text-[#B01E28]">do</em> — and what we don't.
              </h2>
            </div>
          </div>

          {/* Two-panel grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">

            {/* What we do */}
            <div className="bg-white border border-[var(--line)] p-10 lg:p-14 anim-fade-up">
              <div className="flex items-center gap-5 mb-10 pb-8 border-b border-[var(--line)]">
                <span className="w-12 h-12 border border-[#B01E28] flex items-center justify-center text-[#B01E28]">
                  <CheckCircle2 className="w-5 h-5" strokeWidth={1.5} />
                </span>
                <div>
                  <span className="label-inst text-[#0E0E0E]/45 block mb-1">Scope</span>
                  <h3 className="font-serif text-[1.5rem] lg:text-[1.75rem] font-normal tracking-[-0.01em] text-[#0E0E0E]">
                    What we do
                  </h3>
                </div>
              </div>

              <div className="flex flex-col">
                {[
                  { icon: Building2, text: 'Present vetted commercial opportunities' },
                  { icon: Briefcase, text: 'Provide structured documentation to investors' },
                  { icon: Users, text: 'Facilitate direct sponsor-investor consultation' },
                  { icon: Award, text: 'Maintain rigorous presentation standards' },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="group flex items-center gap-5 py-5 border-b border-[var(--line)] last:border-b-0 transition-all duration-500 hover:pl-2"
                  >
                    <item.icon className="w-4 h-4 text-[#B01E28] flex-shrink-0" strokeWidth={1.5} />
                    <span className="text-sm text-[#0E0E0E]/85">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* What we don't do */}
            <div className="bg-white border border-[var(--line)] p-10 lg:p-14 anim-fade-up d-2">
              <div className="flex items-center gap-5 mb-10 pb-8 border-b border-[var(--line)]">
                <span className="w-12 h-12 border border-[#0E0E0E]/25 flex items-center justify-center text-[#0E0E0E]/60">
                  <Lock className="w-5 h-5" strokeWidth={1.5} />
                </span>
                <div>
                  <span className="label-inst text-[#0E0E0E]/45 block mb-1">Boundary</span>
                  <h3 className="font-serif text-[1.5rem] lg:text-[1.75rem] font-normal tracking-[-0.01em] text-[#0E0E0E]">
                    What we don't do
                  </h3>
                </div>
              </div>

              <div className="flex flex-col">
                {[
                  'Engage in brokerage services',
                  'Operate forex or trading activities',
                  'Process investor payments directly',
                  'Guarantee returns or outcomes',
                ].map((text, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-5 py-5 border-b border-[var(--line)] last:border-b-0 transition-all duration-500 hover:pl-2"
                  >
                    <span className="w-1.5 h-1.5 bg-[#0E0E0E]/40 flex-shrink-0" />
                    <span className="text-sm text-[#0E0E0E]/60">
                      {text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. CTA — CONVERSION BAND
          ========================================================================= */}
      <section className="relative bg-[#0E0E0E] text-white overflow-hidden">

        {/* Skyline backdrop */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1611348586804-61bf6c080437?auto=format&fit=crop&w=2400&q=85"
            alt=""
            className="w-full h-full object-cover opacity-[0.20] img-inst-hero anim-slow-pan"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0E0E0E] via-[#0E0E0E]/85 to-[#0E0E0E]/55" />
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-10 py-24 lg:py-32">
          <div className="grid grid-cols-12 gap-8 items-end">

            {/* Left — headline */}
            <div className="col-span-12 lg:col-span-7">
              <div className="flex items-center gap-4 mb-10 anim-fade-up">
                <span className="label-inst text-white/45">04 — Next Steps</span>
                <span className="w-10 h-px bg-[#B01E28]" />
              </div>

              <h2 className="font-serif font-light text-[2rem] sm:text-[3rem] lg:text-[4rem] leading-[1.05] tracking-[-0.02em] text-white max-w-[20ch] mb-8 anim-fade-up d-1">
                Ready to explore <em className="italic font-normal text-[#B01E28]">active</em> opportunities?
              </h2>

              <p className="text-lg leading-[1.75] text-white/70 font-light max-w-lg mb-0 anim-fade-up d-3">
                Browse our current catalog of verified investment opportunities across real estate, agriculture, and commercial sectors in Kenya.
              </p>
            </div>

            {/* Right — CTA buttons */}
            <div className="col-span-12 lg:col-span-5 lg:pl-16 lg:border-l lg:border-white/15 anim-fade-in d-5">
              <span className="label-inst text-white/45 block mb-8">Engage</span>

              <div className="flex flex-col gap-0">
                <Link
                  href="/investments"
                  className="group flex items-center justify-between gap-6 bg-[#B01E28] hover:bg-white hover:text-[#0E0E0E] text-white label-inst px-8 py-5 transition-colors duration-500"
                >
                  <span>Browse Opportunities</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/contact"
                  className="group flex items-center justify-between gap-6 border border-white/30 hover:border-white text-white label-inst px-8 py-5 transition-colors duration-500 border-t-0"
                >
                  <span>Schedule Consultation</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
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