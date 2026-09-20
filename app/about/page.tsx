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

            .anim-reveal { animation: revealLine 1.2s cubic-bezier(0.16, 1, 0.3, 1) both; }
            .anim-slide-up { animation: slideUp 1.1s cubic-bezier(0.16, 1, 0.3, 1) both; }
            .anim-pan-bg { animation: panBg 30s ease-in-out infinite; }
            .anim-slow-zoom { animation: slowZoom 25s ease-in-out infinite alternate; }
            .anim-float-blob { animation: floatBlob 8s ease-in-out infinite; }
            .anim-rotate-slow { animation: rotateSlow 20s linear infinite; }
            .anim-marquee { animation: marqueeScroll 40s linear infinite; }

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

            ::-webkit-scrollbar { width: 8px; height: 8px; }
            ::-webkit-scrollbar-track { background: transparent; }
            ::-webkit-scrollbar-thumb { background: rgba(15, 155, 108, 0.3); border-radius: 4px; }
            ::-webkit-scrollbar-thumb:hover { background: rgba(15, 155, 108, 0.6); }
          `,
        }}
      />

      {/* =========================================================================
          1. PAGE HEADER — CINEMATIC WITH NAIROBI SKYLINE
          ========================================================================= */}
      <section className="relative pt-40 pb-20 lg:pt-52 lg:pb-28 overflow-hidden bg-[#0a0e17]">

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

        {/* Layer 5: Emerald top accent line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/60 to-transparent z-[2]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">

          {/* Top editorial line */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 mb-12 border-b border-white/15 anim-reveal">
            <div className="flex items-center gap-4 text-emerald-300 text-xs font-semibold tracking-[0.3em] uppercase">
              <span className="w-10 h-px bg-emerald-300" />
              Corporate Profile
            </div>
            <div className="text-white/50 text-xs tracking-[0.2em] uppercase font-medium flex items-center gap-3">
              <Award className="w-3.5 h-3.5 text-emerald-300" />
              Est. Nairobi · East Africa
            </div>
          </div>

          {/* Headline */}
          <div className="max-w-4xl">
            <h1 className="font-display font-extrabold text-white text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[0.95] tracking-[-0.045em] mb-8">
              <span className="block overflow-hidden">
                <span className="inline-block anim-slide-up">About</span>
              </span>
              <span className="block overflow-hidden">
                <span className="inline-block anim-slide-up delay-250">
                  <span className="text-outline">Ndegwa</span>{' '}
                  <em className="italic font-normal text-emerald-300">Investments.</em>
                </span>
              </span>
            </h1>

            <p className="text-lg lg:text-xl text-white/75 leading-relaxed font-light max-w-2xl anim-reveal delay-600">
              Headquartered in Nairobi, Kenya, Ndegwa Investments is a specialized investment-opportunity presentation and lead-generation platform connecting qualified capital with high-potential commercial ventures.
            </p>
          </div>

          {/* Quick stats bar */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-14 pt-8 border-t border-white/15 anim-reveal delay-1000">
            {[
              { value: 'KSh 2.4B+', label: 'Vetted Pipeline' },
              { value: '100%', label: 'Rigorous Underwriting' },
              { value: 'Nairobi', label: 'Headquartered' },
              { value: '10+', label: 'Years Advisory' },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col gap-1">
                <span className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {stat.value}
                </span>
                <span className="text-[0.65rem] uppercase tracking-[0.15em] text-white/45 font-medium">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. MARQUEE STRIP — CONTINUITY WITH HOMEPAGE
          ========================================================================= */}
      <div className="bg-[#0a0e17] text-[#faf8f5] py-5 overflow-hidden border-y border-white/10">
        <div className="flex gap-16 whitespace-nowrap anim-marquee w-max">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex gap-16 items-center">
              {['Integrity', 'Transparency', 'Rigour', 'Partnership', 'Long-Term Value'].map((item) => (
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
          3. MISSION & PURPOSE — SPLIT EDITORIAL WITH STRATEGY BACKDROP
          ========================================================================= */}
      <section className="relative py-24 lg:py-32 bg-[#faf8f5] dark:bg-[#0a0e17] overflow-hidden">

        {/* Strategy backdrop */}
        <div
          className="absolute inset-0 z-0 opacity-[0.07] dark:opacity-[0.09] bg-cover bg-center anim-pan-bg"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=2000&q=80')",
          }}
        />

        {/* Corporate grid */}
        <div className="absolute inset-0 z-[1] bg-grid opacity-60 dark:opacity-30" />

        {/* Gradient fade */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#faf8f5]/95 via-[#faf8f5]/85 to-[#faf8f5]/95 dark:from-[#0a0e17]/95 dark:via-[#0a0e17]/85 dark:to-[#0a0e17]/95" />

        {/* Emerald radial */}
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none z-[1]" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">

          {/* Section head */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6 lg:gap-16 mb-16 lg:mb-20">
            <div className="flex items-center gap-3 text-emerald-600 dark:text-emerald-400 text-xs font-bold tracking-[0.3em] uppercase">
              <span className="w-6 h-px bg-emerald-600 dark:bg-emerald-400" />
              Our Foundation
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.035em] leading-[1.05] text-[#0a0e17] dark:text-[#faf8f5]">
              A Platform Built on{' '}
              <em className="italic font-normal text-emerald-600 dark:text-emerald-400">Discipline</em> and Clarity.
            </h2>
          </div>

          {/* Two column — Mission + Standards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

            {/* Mission */}
            <div className="group relative p-10 lg:p-12 rounded-3xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border border-[#e8e4dc] dark:border-white/10 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_60px_-20px_rgba(15,155,108,0.2)] hover:border-emerald-500/40 overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none transition-opacity duration-500 group-hover:opacity-100 opacity-0" />

              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-500/20 mb-6 relative">
                  <Target className="w-6 h-6 relative z-10" />
                  <span className="absolute inset-0 rounded-2xl border border-dashed border-emerald-600/30 anim-rotate-slow" />
                </div>

                <span className="block font-display text-xs font-semibold text-[#8a8577] dark:text-white/40 tracking-[0.2em] mb-4">
                  / 01
                </span>

                <h3 className="font-display text-2xl lg:text-3xl font-bold tracking-[-0.025em] leading-tight text-[#0a0e17] dark:text-[#faf8f5] mb-4">
                  Our Core Purpose
                </h3>

                <p className="text-[0.95rem] text-[#5a5750] dark:text-slate-400 leading-relaxed">
                  We bridge the information gap between project sponsors and discerning investors. By providing rigorous transparency, detailed documentation, and structured opportunity presentations, we facilitate meaningful capital partnerships.
                </p>

                {/* Mini feature list */}
                <div className="flex flex-col gap-2 mt-6 pt-6 border-t border-[#e8e4dc] dark:border-white/10">
                  {['Detailed opportunity documentation', 'Structured investor presentations', 'Direct sponsor consultation'].map((item) => (
                    <div key={item} className="flex items-center gap-3 text-sm text-[#5a5750] dark:text-slate-400">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Standards */}
            <div className="group relative p-10 lg:p-12 rounded-3xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border border-[#e8e4dc] dark:border-white/10 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_60px_-20px_rgba(15,155,108,0.2)] hover:border-emerald-500/40 overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none transition-opacity duration-500 group-hover:opacity-100 opacity-0" />

              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-500/20 mb-6 relative">
                  <ShieldCheck className="w-6 h-6 relative z-10" />
                  <span className="absolute inset-0 rounded-2xl border border-dashed border-emerald-600/30 anim-rotate-slow" />
                </div>

                <span className="block font-display text-xs font-semibold text-[#8a8577] dark:text-white/40 tracking-[0.2em] mb-4">
                  / 02
                </span>

                <h3 className="font-display text-2xl lg:text-3xl font-bold tracking-[-0.025em] leading-tight text-[#0a0e17] dark:text-[#faf8f5] mb-4">
                  Rigorous Standards
                </h3>

                <p className="text-[0.95rem] text-[#5a5750] dark:text-slate-400 leading-relaxed">
                  We maintain strict adherence to professional presentation standards. We do not engage in brokerage, forex trading, or payment processing—our focus remains strictly on high-quality opportunity presentation.
                </p>

                {/* Mini feature list */}
                <div className="flex flex-col gap-2 mt-6 pt-6 border-t border-[#e8e4dc] dark:border-white/10">
                  {['No brokerage or forex trading', 'No payment processing', 'Presentation-focused platform'].map((item) => (
                    <div key={item} className="flex items-center gap-3 text-sm text-[#5a5750] dark:text-slate-400">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. OUR APPROACH — DARK EDITORIAL WITH FINANCIAL BACKDROP
          ========================================================================= */}
      <section className="relative py-24 lg:py-32 bg-[#0a0e17] text-[#faf8f5] overflow-hidden">

        {/* Financial backdrop */}
        <div
          className="absolute inset-0 z-0 opacity-[0.08] bg-cover bg-center anim-pan-bg"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=2000&q=80')",
          }}
        />

        {/* Corporate grid overlay */}
        <div className="absolute inset-0 z-[1] bg-grid-light opacity-60" />

        {/* Radial emerald glow */}
        <div className="absolute top-0 -left-1/4 w-[60%] h-full bg-[radial-gradient(ellipse_at_center,rgba(15,155,108,0.18),transparent_60%)] pointer-events-none z-[1]" />

        {/* Bottom emerald glow */}
        <div className="absolute -bottom-40 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none z-[1]" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">

          {/* Section head */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6 lg:gap-16 mb-16">
            <div className="flex items-center gap-3 text-emerald-300 text-xs font-bold tracking-[0.3em] uppercase">
              <span className="w-6 h-px bg-emerald-300" />
              Our Approach
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.035em] leading-[1.05]">
              Three Principles that{' '}
              <em className="italic font-normal text-emerald-300">Guide</em> Everything We Do.
            </h2>
          </div>

          {/* Principle grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Globe,
                num: '01',
                title: 'Local Roots, Global Reach',
                desc: 'Anchored in Nairobi with deep regional networks across Kenya, we connect East African enterprises with qualified domestic and international capital.',
              },
              {
                icon: Lock,
                num: '02',
                title: 'Verified Documentation',
                desc: 'Every opportunity presented on our platform is supported by complete financial records, legal verification, and transparent risk disclosure.',
              },
              {
                icon: TrendingUp,
                num: '03',
                title: 'Long-Term Value Focus',
                desc: 'We prioritise sustainable ventures in agriculture, commercial development, and real estate that deliver reliable yields over short-term speculation.',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="group relative rounded-3xl bg-white/[0.04] backdrop-blur-sm border border-white/10 p-8 flex flex-col overflow-hidden transition-all duration-700 hover:-translate-y-1.5 hover:border-emerald-400/40 hover:bg-white/[0.07]"
              >
                {/* Hover glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(52,211,153,0.1),transparent_40%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-400/10 border border-emerald-400/25 flex items-center justify-center text-emerald-300 relative">
                      <item.icon className="w-5 h-5 relative z-10" />
                      <span className="absolute inset-0 rounded-2xl border border-dashed border-emerald-400/30 anim-rotate-slow" />
                    </div>
                    <span className="font-display text-xs font-semibold tracking-[0.2em] text-white/30">
                      / {item.num}
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-bold tracking-[-0.02em] leading-tight text-white mb-4 transition-colors duration-300 group-hover:text-emerald-300">
                    {item.title}
                  </h3>

                  <p className="text-sm text-white/60 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. WHAT WE ARE NOT — CLARITY SECTION (Corporate transparency)
          ========================================================================= */}
      <section className="relative py-24 lg:py-32 bg-[#f5f0e8] dark:bg-[#0a0e17] overflow-hidden">

        {/* Executive backdrop */}
        <div
          className="absolute inset-0 z-0 opacity-[0.06] dark:opacity-[0.08] bg-cover bg-center anim-pan-bg"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=80')",
          }}
        />

        {/* Diagonal stripes */}
        <div className="absolute inset-0 z-[1] bg-stripes opacity-40 dark:opacity-30" />

        {/* Gradient fade */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#f5f0e8]/95 via-[#f5f0e8]/88 to-[#f5f0e8]/95 dark:from-[#0a0e17]/95 dark:via-[#0a0e17]/88 dark:to-[#0a0e17]/95" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6 lg:gap-16 mb-16">
            <div className="flex items-center gap-3 text-emerald-600 dark:text-emerald-400 text-xs font-bold tracking-[0.3em] uppercase">
              <span className="w-6 h-px bg-emerald-600 dark:bg-emerald-400" />
              Scope of Engagement
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.035em] leading-[1.05] text-[#0a0e17] dark:text-[#faf8f5]">
              What We <em className="italic font-normal text-emerald-600 dark:text-emerald-400">Do</em> — and What We Don't.
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* What we do */}
            <div className="rounded-3xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border border-[#e8e4dc] dark:border-white/10 p-10 lg:p-12 transition-all duration-500 hover:border-emerald-500/40">
              <div className="flex items-center gap-3 mb-8">
                <span className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-5 h-5" />
                </span>
                <h3 className="font-display text-2xl font-bold tracking-[-0.025em] text-[#0a0e17] dark:text-[#faf8f5]">
                  What We Do
                </h3>
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
                    className="group flex items-center gap-4 py-4 border-b border-[#e8e4dc] dark:border-white/10 last:border-b-0 transition-all duration-300 hover:pl-2"
                  >
                    <item.icon className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                    <span className="text-sm text-[#0a0e17] dark:text-[#faf8f5] font-medium">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* What we don't do */}
            <div className="rounded-3xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border border-[#e8e4dc] dark:border-white/10 p-10 lg:p-12 transition-all duration-500 hover:border-[#c9a961]/50">
              <div className="flex items-center gap-3 mb-8">
                <span className="w-10 h-10 rounded-xl bg-[#c9a961]/10 border border-[#c9a961]/25 flex items-center justify-center text-[#c9a961]">
                  <Lock className="w-5 h-5" />
                </span>
                <h3 className="font-display text-2xl font-bold tracking-[-0.025em] text-[#0a0e17] dark:text-[#faf8f5]">
                  What We Don't Do
                </h3>
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
                    className="flex items-center gap-4 py-4 border-b border-[#e8e4dc] dark:border-white/10 last:border-b-0 transition-all duration-300 hover:pl-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c9a961] flex-shrink-0" />
                    <span className="text-sm text-[#5a5750] dark:text-slate-400 font-medium">
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
          6. CTA — FINAL CONVERSION BAND
          ========================================================================= */}
      <section className="relative py-24 lg:py-28 overflow-hidden bg-[#0a0e17] text-[#faf8f5]">

        {/* Skyline silhouette */}
        <div
          className="absolute inset-0 z-0 opacity-[0.12] bg-cover bg-bottom"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1611348586804-61bf6c080437?auto=format&fit=crop&w=2000&q=80')",
          }}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17]/95 via-[#0a0e17]/85 to-[#0a0e17]/95 z-[1]" />

        {/* Emerald glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-emerald-500/15 rounded-full blur-[140px] pointer-events-none z-[1]" />

        <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10 text-center">

          <div className="inline-flex items-center gap-3 text-emerald-300 text-xs font-bold tracking-[0.3em] uppercase mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            Ready to Explore
          </div>

          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.035em] leading-[1.05] mb-6">
            Ready to Explore{' '}
            <em className="italic font-normal text-emerald-300">Active</em> Opportunities?
          </h2>

          <p className="text-base lg:text-lg text-white/65 max-w-2xl mx-auto leading-relaxed mb-10">
            Browse our current catalog of verified investment opportunities across real estate, agriculture, and commercial sectors in Kenya.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/investments"
              className="inline-flex items-center justify-center gap-3 px-7 py-4 rounded-full bg-emerald-600 hover:bg-emerald-400 text-white font-semibold text-sm transition-all duration-500 shadow-[0_15px_30px_-10px_rgba(15,155,108,0.6)] hover:shadow-[0_25px_40px_-12px_rgba(52,211,153,0.7)] hover:-translate-y-1 group"
            >
              Browse Opportunities
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