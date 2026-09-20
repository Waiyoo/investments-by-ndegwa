// app/contact/page.tsx
import Link from 'next/link'
import {
  Phone,
  MapPin,
  ShieldAlert,
  Mail,
  Clock,
  Building2,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Award,
  Globe,
  Lock,
  Sparkles,
} from 'lucide-react'

export const metadata = {
  title: 'Contact Ndegwa Investments',
  description:
    'Contact Ndegwa Investments headquarters in Nairobi, Kenya. Get in touch with our team for investment inquiries.',
}

export default function ContactPage() {
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

            .label-inst-sm {
              font-family: 'IBM Plex Mono', monospace;
              font-size: 0.6rem;
              letter-spacing: 0.28em;
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
          1. PAGE HEADER — INSTITUTIONAL CORPORATE CONTACT
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
                  Get in touch · Nairobi · Mon–Fri
                </span>
              </div>

              <h1 className="font-serif font-light text-white text-[2.75rem] sm:text-[4rem] lg:text-[5.5rem] leading-[1.02] tracking-[-0.02em] mb-12 max-w-[22ch]">
                <span className="block anim-fade-up d-1">Contact</span>
                <span className="block anim-fade-up d-2">
                  Ndegwa <em className="italic font-normal text-[#B01E28]">Investments</em>.
                </span>
              </h1>

              <p className="text-lg lg:text-xl text-white/70 leading-[1.75] font-light max-w-[56ch] mb-12 anim-fade-up d-4">
                Reach out to our Nairobi headquarters for inquiries regarding our presented investment opportunities.
              </p>

              {/* Contact chips — mono labels */}
              <div className="flex flex-wrap gap-0 anim-fade-up d-5">
                {[
                  { icon: Phone, label: '+254 799 357 038' },
                  { icon: MapPin, label: 'Nairobi · Kenya' },
                  { icon: Clock, label: 'Mon–Fri · 8am–6pm EAT' },
                ].map((chip, i) => (
                  <div
                    key={i}
                    className="inline-flex items-center gap-3 border border-white/20 px-5 py-3.5 -ml-px first:ml-0"
                  >
                    <chip.icon className="w-3.5 h-3.5 text-[#B01E28]" strokeWidth={1.5} />
                    <span className="label-inst text-white/85">{chip.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — availability panel */}
            <div className="col-span-12 lg:col-span-4 lg:border-l lg:border-white/15 lg:pl-16 flex flex-col justify-end anim-fade-in d-6">
              <div className="mb-6">
                <span className="label-inst text-white/45 block mb-3">Status</span>
                <span className="w-8 h-px bg-[#B01E28] block" />
              </div>

              <div className="flex items-center gap-3 mb-8">
                <span className="w-1.5 h-1.5 bg-[#B01E28] rounded-full anim-blink" />
                <span className="label-inst text-white/85">Available Now</span>
              </div>

              <div className="flex flex-col">
                {[
                  { k: 'Time Zone', v: 'EAT (UTC+3)' },
                  { k: 'Response', v: 'Within 24h' },
                  { k: 'Channel', v: 'Direct Line' },
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
          2. MARQUEE STRIP — INSTITUTIONAL COMMUNICATION VALUES
          ========================================================================= */}
      <div className="bg-[#0E0E0E] text-white border-b border-white/10 py-5 overflow-hidden">
        <div className="flex whitespace-nowrap anim-marquee-slow w-max label-inst text-white/40">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex items-center">
              {['Direct Line', 'Local Presence', 'Verified Channels', 'Nairobi Based', 'Investor First'].map((item) => (
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
          3. PRIMARY CONTACT CARDS — HEADQUARTERS + ADVISORY
          ========================================================================= */}
      <section className="relative bg-[#FBFBF9] py-24 lg:py-40 border-b border-[var(--line)] overflow-hidden">

        {/* Ghosted executive image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2400&q=80"
            alt=""
            className="w-full h-full object-cover opacity-[0.035] img-inst anim-slow-pan"
          />
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-10">

          {/* Section header */}
          <div className="grid grid-cols-12 gap-8 mb-20 items-end">
            <div className="col-span-12 lg:col-span-3">
              <span className="label-inst text-[#0E0E0E]/45 block mb-4">01 — Direct Lines</span>
              <span className="w-10 h-px bg-[#B01E28] block" />
            </div>
            <div className="col-span-12 lg:col-span-9">
              <h2 className="font-serif font-light text-[2rem] sm:text-[3rem] lg:text-[3.75rem] leading-[1.05] tracking-[-0.02em] text-[#0E0E0E] max-w-[24ch] anim-fade-up">
                Where to find us, and how we <em className="italic font-normal text-[#B01E28]">communicate</em>.
              </h2>
            </div>
          </div>

          {/* Two-card grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">

            {/* Headquarters card */}
            <article className="group relative bg-white border border-[var(--line)] p-10 lg:p-14 transition-shadow duration-500 hover:shadow-[0_24px_60px_-32px_rgba(14,14,14,0.28)] anim-fade-up">
              {/* Red hairline top */}
              <div className="absolute top-0 left-0 w-16 h-px bg-[#B01E28] group-hover:w-32 transition-all duration-700" />

              <div className="flex items-start justify-between mb-10">
                <div className="w-14 h-14 border border-[#0E0E0E] flex items-center justify-center text-[#0E0E0E]">
                  <Building2 className="w-5 h-5" strokeWidth={1.5} />
                </div>
                <span className="font-mono text-[0.7rem] text-[#0E0E0E]/35">
                  / 01
                </span>
              </div>

              <h3 className="font-serif text-[1.75rem] lg:text-[2.25rem] font-normal tracking-[-0.01em] text-[#0E0E0E] leading-[1.15] mb-8 max-w-[22ch]">
                Headquarters information
              </h3>

              <div className="flex flex-col border-t border-[var(--line)]">

                {/* Location */}
                <div className="grid grid-cols-[auto_1fr] gap-5 py-6 border-b border-[var(--line)]">
                  <MapPin className="w-4 h-4 text-[#B01E28] mt-1 flex-shrink-0" strokeWidth={1.5} />
                  <div>
                    <span className="label-inst-sm text-[#0E0E0E]/45 block mb-2">Location</span>
                    <p className="text-[0.95rem] text-[#0E0E0E]/85">Nairobi, Kenya</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="grid grid-cols-[auto_1fr] gap-5 py-6 border-b border-[var(--line)]">
                  <Phone className="w-4 h-4 text-[#B01E28] mt-1 flex-shrink-0" strokeWidth={1.5} />
                  <div>
                    <span className="label-inst-sm text-[#0E0E0E]/45 block mb-2">Direct Phone</span>
                    <a
                      href="tel:+254799357038"
                      className="block text-[0.95rem] text-[#0E0E0E]/85 hover:text-[#B01E28] transition-colors font-medium"
                    >
                      +254 799 357 038
                    </a>
                    <a
                      href="tel:+254799357038"
                      className="block text-xs font-mono text-[#0E0E0E]/45 hover:text-[#B01E28] transition-colors mt-1"
                    >
                      0799357038
                    </a>
                  </div>
                </div>

                {/* Hours */}
                <div className="grid grid-cols-[auto_1fr] gap-5 py-6 border-b border-[var(--line)] last:border-b-0">
                  <Clock className="w-4 h-4 text-[#B01E28] mt-1 flex-shrink-0" strokeWidth={1.5} />
                  <div>
                    <span className="label-inst-sm text-[#0E0E0E]/45 block mb-2">Office Hours</span>
                    <p className="text-[0.95rem] text-[#0E0E0E]/85">
                      Monday – Friday · 8:00am – 6:00pm EAT
                    </p>
                    <p className="text-xs font-mono text-[#0E0E0E]/45 mt-1">
                      Closed on public holidays
                    </p>
                  </div>
                </div>
              </div>

              {/* Call CTA */}
              <a
                href="tel:+254799357038"
                className="group/cta flex items-center justify-between gap-6 bg-[#B01E28] hover:bg-[#0E0E0E] text-white label-inst px-6 py-5 mt-8 transition-colors duration-500"
              >
                <span className="flex items-center gap-3">
                  <Phone className="w-4 h-4" strokeWidth={1.5} />
                  Call Our Office
                </span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-500 group-hover/cta:rotate-45" />
              </a>
            </article>

            {/* Advisory Notice card */}
            <article
              className="group relative bg-white border border-[var(--line)] p-10 lg:p-14 transition-shadow duration-500 hover:shadow-[0_24px_60px_-32px_rgba(14,14,14,0.28)] anim-fade-up d-2"
            >
              {/* Red hairline top */}
              <div className="absolute top-0 left-0 w-16 h-px bg-[#B01E28] group-hover:w-32 transition-all duration-700" />

              <div className="flex items-start justify-between mb-10">
                <div className="w-14 h-14 border border-[#0E0E0E]/25 flex items-center justify-center text-[#0E0E0E]/60">
                  <ShieldAlert className="w-5 h-5" strokeWidth={1.5} />
                </div>
                <span className="font-mono text-[0.7rem] text-[#0E0E0E]/35">
                  / 02
                </span>
              </div>

              <h3 className="font-serif text-[1.75rem] lg:text-[2.25rem] font-normal tracking-[-0.01em] text-[#0E0E0E] leading-[1.15] mb-6 max-w-[22ch]">
                Advisory notice
              </h3>

              <p className="text-[0.95rem] leading-[1.85] text-[#0E0E0E]/65 mb-6">
                Ndegwa Investments does not maintain a general public email address at this time. All inquiries should be directed via phone or through specific investment inquiry forms on our platform.
              </p>

              {/* Warning box — institutional alert */}
              <div className="border-l-2 border-[#B01E28] bg-[#B01E28]/5 px-5 py-4 mb-8">
                <div className="flex items-start gap-3">
                  <ShieldAlert className="w-4 h-4 text-[#B01E28] flex-shrink-0 mt-0.5" strokeWidth={1.75} />
                  <span className="text-[0.85rem] leading-[1.7] text-[#0E0E0E]/80 font-medium">
                    We never request funds via unsecured channels or payment processors.
                  </span>
                </div>
              </div>

              {/* Trust guidelines */}
              <div className="flex flex-col border-t border-[var(--line)]">
                {[
                  'All communication is initiated by the investor',
                  'No upfront payment is ever requested',
                  'Investment inquiry forms route directly to our team',
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 py-4 border-b border-[var(--line)] last:border-b-0 transition-all duration-500 hover:pl-2"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#B01E28] flex-shrink-0" strokeWidth={1.5} />
                    <span className="text-sm text-[#0E0E0E]/75">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. COMMUNICATION GUIDELINES — DARK INSTITUTIONAL
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
              <span className="label-inst text-white/45 block mb-4">02 — Guidelines</span>
              <span className="w-10 h-px bg-[#B01E28] block" />
            </div>
            <div className="col-span-12 lg:col-span-9">
              <h2 className="font-serif font-light text-[2rem] sm:text-[3rem] lg:text-[3.75rem] leading-[1.05] tracking-[-0.02em] text-white max-w-[26ch] anim-fade-up">
                How we <em className="italic font-normal text-[#B01E28]">engage</em> with investors.
              </h2>
            </div>
          </div>

          {/* Guidelines grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 border-t border-white/12">
            {[
              {
                icon: Phone,
                num: '01',
                title: 'Direct phone first',
                desc: 'All primary inquiries are handled via our direct Nairobi line, ensuring personal, accountable communication with our advisory team.',
              },
              {
                icon: Lock,
                num: '02',
                title: 'Secure inquiry forms',
                desc: 'Investment-specific inquiries are submitted through verified platform forms that route directly to our internal review team.',
              },
              {
                icon: Globe,
                num: '03',
                title: 'No public email',
                desc: 'We do not publish a general email address. This protects both our investors and our team from unverified and impersonation-based outreach.',
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
          5. LOCATION BLOCK — FULL-BLEED EDITORIAL
          ========================================================================= */}
      <section className="relative bg-[#F2F0EB] border-b border-[var(--line)] overflow-hidden">

        {/* Ghosted blueprint */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=2400&q=80"
            alt=""
            className="w-full h-full object-cover opacity-[0.04] img-inst anim-slow-pan"
          />
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-10 py-24 lg:py-32">

          {/* Header */}
          <div className="grid grid-cols-12 gap-8 mb-16 items-end">
            <div className="col-span-12 lg:col-span-3">
              <span className="label-inst text-[#0E0E0E]/45 block mb-4">03 — Location</span>
              <span className="w-10 h-px bg-[#B01E28] block" />
            </div>
            <div className="col-span-12 lg:col-span-9">
              <h2 className="font-serif font-light text-[2rem] sm:text-[3rem] lg:text-[3.75rem] leading-[1.05] tracking-[-0.02em] text-[#0E0E0E] max-w-[24ch] anim-fade-up">
                Headquartered in <em className="italic font-normal text-[#B01E28]">Nairobi</em>, Kenya.
              </h2>
            </div>
          </div>

          {/* Location card with full image */}
          <div className="relative overflow-hidden bg-[#0E0E0E] min-h-[520px] flex flex-col justify-end group anim-fade-up">

            {/* Background image */}
            <img
              src="https://images.unsplash.com/photo-1611348586804-61bf6c080437?auto=format&fit=crop&w=2400&q=85"
              alt="Nairobi"
              className="absolute inset-0 w-full h-full object-cover opacity-55 img-inst-hero transition-transform duration-[1400ms] group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E0E] via-[#0E0E0E]/75 to-[#0E0E0E]/30" />

            {/* Content */}
            <div className="relative z-10 p-10 lg:p-16 text-white">
              <div className="grid grid-cols-12 gap-8 items-end">
                <div className="col-span-12 lg:col-span-8">
                  <span className="flex items-center gap-3 label-inst text-[#B01E28] mb-6">
                    <MapPin className="w-3.5 h-3.5" strokeWidth={1.5} />
                    Nairobi · Kenya
                  </span>

                  <h3 className="font-serif font-light text-[2rem] sm:text-[2.5rem] lg:text-[3.5rem] leading-[1.05] tracking-[-0.02em] mb-8 max-w-[22ch]">
                    Our team operates from Kenya's commercial capital — the <em className="italic font-normal text-[#B01E28]">gateway</em> to East African markets.
                  </h3>

                  <p className="text-base lg:text-lg text-white/70 leading-[1.75] font-light max-w-2xl mb-10">
                    Being anchored in Nairobi gives us direct access to regional deal flow, sponsor networks, and on-the-ground verification of every opportunity we present.
                  </p>
                </div>

                {/* Tag stack right */}
                <div className="col-span-12 lg:col-span-4 lg:border-l lg:border-white/15 lg:pl-10 flex flex-col">
                  {[
                    { k: 'Region', v: 'East Africa Hub' },
                    { k: 'Networks', v: 'Regional' },
                    { k: 'Verification', v: 'On-Ground' },
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
        </div>
      </section>

      {/* =========================================================================
          6. CTA — FINAL CONVERSION
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
                <span className="label-inst text-white/45">04 — Next Steps</span>
                <span className="w-10 h-px bg-[#B01E28]" />
              </div>

              <h2 className="font-serif font-light text-[2rem] sm:text-[3rem] lg:text-[4rem] leading-[1.05] tracking-[-0.02em] text-white max-w-[22ch] mb-8 anim-fade-up d-1">
                Discover <em className="italic font-normal text-[#B01E28]">curated</em> investment opportunities.
              </h2>

              <p className="text-lg leading-[1.75] text-white/70 font-light max-w-lg anim-fade-up d-3">
                Browse our current portfolio of vetted commercial, agricultural, and real estate ventures across Kenya.
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
                  href="/about"
                  className="group flex items-center justify-between gap-6 border border-white/30 hover:border-white text-white label-inst px-8 py-5 transition-colors duration-500 border-t-0"
                >
                  <span>Learn About Us</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. FOOTER — INSTITUTIONAL MASTHEAD
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