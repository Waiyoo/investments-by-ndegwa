// components/public/footer.tsx
import Link from 'next/link'
import { Phone, MapPin, ShieldAlert, ArrowRight, ArrowUpRight, Lock } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-[#1A1410] text-white overflow-hidden">

      {/* =========================================================================
          GLOBAL STYLES — Institutional Footer System
          ========================================================================= */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Inter:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap');

            .foot-serif { font-family: 'Cormorant Garamond', Georgia, serif; font-optical-sizing: auto; }
            .foot-sans { font-family: 'Inter', system-ui, sans-serif; }
            .foot-mono { font-family: 'IBM Plex Mono', ui-monospace, monospace; }

            @keyframes blink {
              0%, 55% { opacity: 1; }
              56%, 100% { opacity: 0.25; }
            }
            .anim-blink { animation: blink 2.4s steps(1) infinite; }

            @keyframes footerMarquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .anim-marquee { animation: footerMarquee 110s linear infinite; }

            @keyframes pulse-ring {
              0% { transform: scale(0.95); opacity: 0.7; }
              70% { transform: scale(1.6); opacity: 0; }
              100% { transform: scale(1.6); opacity: 0; }
            }
            .anim-pulse-ring { animation: pulse-ring 2.4s cubic-bezier(0.4, 0, 0.6, 1) infinite; }

            /* Slow drifting gradient behind wordmark */
            @keyframes drift {
              0%, 100% { transform: translate(0%, 0%) scale(1); }
              50% { transform: translate(2%, -1%) scale(1.05); }
            }
            .anim-drift { animation: drift 26s ease-in-out infinite; }

            .foot-label {
              font-family: 'IBM Plex Mono', monospace;
              font-size: 0.65rem;
              letter-spacing: 0.32em;
              text-transform: uppercase;
              font-weight: 500;
            }
            .foot-label-sm {
              font-family: 'IBM Plex Mono', monospace;
              font-size: 0.6rem;
              letter-spacing: 0.28em;
              text-transform: uppercase;
              font-weight: 500;
            }

            /* Fine grid texture — subtle bronze-tinted lattice */
            .foot-grid-bg {
              background-image:
                linear-gradient(rgba(168,118,62,0.028) 1px, transparent 1px),
                linear-gradient(90deg, rgba(168,118,62,0.028) 1px, transparent 1px);
              background-size: 64px 64px;
            }

            /* Bronze accent rule with soft glow */
            .foot-rule {
              background: linear-gradient(
                90deg,
                transparent,
                rgba(168,118,62,0.55) 20%,
                rgba(201,164,106,0.75) 50%,
                rgba(168,118,62,0.55) 80%,
                transparent
              );
            }

            /* Link underline animation — bronze */
            .foot-link-underline {
              position: relative;
            }
            .foot-link-underline::after {
              content: '';
              position: absolute;
              bottom: -2px;
              left: 0;
              width: 0;
              height: 1px;
              background: linear-gradient(90deg, #A8763E, #C9A46A);
              transition: width 0.4s cubic-bezier(0.22, 1, 0.36, 1);
            }
            .foot-link-underline:hover::after {
              width: 100%;
            }

            /* Italic gold underline for wordmark */
            .foot-wordmark-accent {
              background: linear-gradient(180deg, #C9A46A 0%, #A8763E 100%);
              -webkit-background-clip: text;
              background-clip: text;
              -webkit-text-fill-color: transparent;
            }
          `,
        }}
      />

      {/* =========================================================================
          AMBIENT LAYERS — Warm glow + grid texture
          ========================================================================= */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
      >
        {/* Top bronze glow */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 40% at 30% 0%, rgba(168,118,62,0.10), transparent 65%)',
          }}
        />
        {/* Subtle secondary glow bottom-right */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 50% 30% at 90% 100%, rgba(201,164,106,0.05), transparent 70%)',
          }}
        />
      </div>

      {/* Grid texture overlay */}
      <div aria-hidden className="pointer-events-none absolute inset-0 foot-grid-bg opacity-100" />

      {/* =========================================================================
          TOP MARQUEE STRIP — Curated scroll
          ========================================================================= */}
      <div className="relative border-b border-white/[0.06] py-4 overflow-hidden">
        <div className="anim-marquee flex whitespace-nowrap w-max foot-label text-white/25">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex items-center">
              {[
                'Private Capital',
                'Curated Opportunities',
                'Direct Engagement',
                'Institutional Grade',
                'East Africa',
                'Nairobi',
                'MMXXVI',
                'Vetted Ventures',
                'Qualified Capital',
              ].map((item) => (
                <span key={item} className="flex items-center">
                  <span className="px-8">{item}</span>
                  <span className="w-1 h-1 rounded-full bg-[#A8763E]/70" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* =========================================================================
          MAIN FOOTER — INSTITUTIONAL MASTHEAD
          ========================================================================= */}
      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10">

        {/* ---------- BRAND MASTHEAD ---------- */}
        <div className="relative pt-16 lg:pt-20 pb-12 lg:pb-14 border-b border-white/[0.06]">

          {/* Drifting bronze halo behind wordmark */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-20 -left-20 w-[600px] h-[600px] anim-drift"
            style={{
              background:
                'radial-gradient(circle at center, rgba(168,118,62,0.08), transparent 60%)',
            }}
          />

          <div className="relative grid grid-cols-12 gap-8 lg:gap-16 items-end">

            {/* Wordmark block */}
            <div className="col-span-12 lg:col-span-7">
              <div className="flex items-center gap-3 mb-5">
                <span className="relative flex items-center justify-center">
                  <span className="absolute w-2 h-2 rounded-full bg-[#A8763E]/40 anim-pulse-ring" />
                  <span className="relative w-1.5 h-1.5 bg-[#A8763E] rounded-full" />
                </span>
                <span className="foot-label text-white/40">
                  Est. MMXVI · Nairobi
                </span>
              </div>

              <h2 className="foot-serif text-[3.25rem] sm:text-[4.5rem] lg:text-[5.5rem] font-light leading-[0.95] tracking-tight text-white">
                PY{' '}
                <span className="italic font-normal foot-wordmark-accent">
                  Capital
                </span>
              </h2>

              <p className="mt-6 text-sm leading-[1.85] text-white/50 max-w-lg font-light">
                A Nairobi-based private investment firm presenting curated, rigorously
                vetted opportunities across East Africa for qualified capital partners.
              </p>

              {/* Thin bronze underline accent */}
              <div className="mt-8 h-px w-24 foot-rule" />
            </div>

            {/* Regulatory seal — framed like a document */}
            <div className="col-span-12 lg:col-span-5 lg:pl-10 lg:border-l lg:border-white/[0.06]">
              <div className="relative border border-white/[0.08] bg-white/[0.02] p-6 backdrop-blur-sm">
                {/* Corner accent mark */}
                <span className="absolute top-0 right-0 w-6 h-px bg-[#A8763E]" />
                <span className="absolute top-0 right-0 w-px h-6 bg-[#A8763E]" />

                <div className="flex items-center gap-3 mb-4">
                  <ShieldAlert className="w-4 h-4 text-[#C9A46A] flex-shrink-0" strokeWidth={1.5} />
                  <span className="foot-label text-[#C9A46A]">
                    Regulatory Notice
                  </span>
                </div>
                <div className="h-px w-full foot-rule mb-4" />
                <p className="text-xs leading-[1.85] text-white/55 font-light">
                  PY Capital operates exclusively as an investment-opportunity presentation
                  and lead-generation platform. We do not operate as a brokerage, forex
                  platform, or online payment processor.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ---------- NAVIGATION & CONTACT GRID ---------- */}
        <div className="py-12 lg:py-16 border-b border-white/[0.06]">
          <div className="grid grid-cols-12 gap-10 lg:gap-16">

            {/* Column: Navigation */}
            <div className="col-span-12 sm:col-span-6 lg:col-span-3">
              <div className="flex items-center gap-3 mb-7">
                <span className="foot-label text-white/40">Navigation</span>
                <span className="flex-1 h-px bg-white/[0.06]" />
              </div>

              <ul className="flex flex-col gap-5">
                {[
                  { label: 'Browse Opportunities', href: '/investments' },
                  { label: 'About PY Capital', href: '/about' },
                  { label: 'Contact Our Team', href: '/contact' },
                ].map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="group flex items-center justify-between gap-3 text-[0.95rem] text-white/65 hover:text-white transition-colors duration-300 font-light"
                    >
                      <span className="foot-link-underline">{item.label}</span>
                      <ArrowUpRight
                        className="w-3.5 h-3.5 text-white/25 group-hover:text-[#C9A46A] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
                        strokeWidth={1.5}
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column: Principles */}
            <div className="col-span-12 sm:col-span-6 lg:col-span-3">
              <div className="flex items-center gap-3 mb-7">
                <span className="foot-label text-white/40">Principles</span>
                <span className="flex-1 h-px bg-white/[0.06]" />
              </div>

              <ul className="flex flex-col gap-5">
                {[
                  'Rigorous Vetting',
                  'Transparent Disclosure',
                  'Direct Engagement',
                  'Long-Horizon Stewardship',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-[0.95rem] text-white/55 font-light">
                    <span className="w-1 h-1 rounded-full bg-[#A8763E]/70 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column: Headquarters */}
            <div className="col-span-12 sm:col-span-6 lg:col-span-3">
              <div className="flex items-center gap-3 mb-7">
                <span className="foot-label text-white/40">Headquarters</span>
                <span className="flex-1 h-px bg-white/[0.06]" />
              </div>

              <ul className="flex flex-col gap-6">
                <li className="grid grid-cols-[auto_1fr] gap-4">
                  <MapPin className="w-4 h-4 text-[#C9A46A] mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                  <div>
                    <span className="foot-label-sm text-white/35 block mb-1.5">
                      Location
                    </span>
                    <span className="foot-serif text-lg text-white/90">
                      Nairobi, Kenya
                    </span>
                    <span className="block foot-mono text-[0.65rem] text-white/35 mt-1">
                      01°17'S · 36°49'E
                    </span>
                  </div>
                </li>

                <li className="grid grid-cols-[auto_1fr] gap-4">
                  <Phone className="w-4 h-4 text-[#C9A46A] mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                  <div>
                    <span className="foot-label-sm text-white/35 block mb-1.5">
                      Advisory Line
                    </span>
                    <a
                      href="tel:+254 724 535 062"
                      className="foot-serif text-lg text-white/90 hover:text-[#C9A46A] transition-colors duration-300 block"
                    >
                      +254 724 535 062
                    </a>
                    <span className="block foot-mono text-[0.65rem] text-white/35 mt-1">
                      Mon–Fri · 08:00–18:00 EAT
                    </span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Column: Access */}
            <div className="col-span-12 sm:col-span-6 lg:col-span-3">
              <div className="flex items-center gap-3 mb-7">
                <span className="foot-label text-white/40">Access</span>
                <span className="flex-1 h-px bg-white/[0.06]" />
              </div>

              <Link
                href="/admin/login"
                className="group relative block border border-white/[0.08] bg-white/[0.015] hover:bg-white/[0.03] hover:border-[#A8763E]/40 transition-all duration-300 p-5"
              >
                {/* Top corner accent */}
                <span className="absolute top-0 left-0 w-5 h-px bg-[#A8763E]/0 group-hover:bg-[#A8763E] transition-colors duration-300" />
                <span className="absolute top-0 left-0 w-px h-5 bg-[#A8763E]/0 group-hover:bg-[#A8763E] transition-colors duration-300" />

                <div className="flex items-center justify-between mb-3">
                  <Lock className="w-3.5 h-3.5 text-white/35 group-hover:text-[#C9A46A] transition-colors duration-300" strokeWidth={1.5} />
                  <ArrowRight
                    className="w-3.5 h-3.5 text-white/25 group-hover:text-[#C9A46A] group-hover:translate-x-0.5 transition-all duration-300"
                    strokeWidth={1.5}
                  />
                </div>
                <span className="foot-label-sm text-white/40 group-hover:text-white/70 transition-colors duration-300 block">
                  Administrator Portal
                </span>
              </Link>

              <div className="mt-6 flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#A8763E]/70 anim-blink" />
                <span className="foot-label-sm text-white/35">
                  Advisory Desk Open
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          BOTTOM BAR — INSTITUTIONAL COLOPHON
          ========================================================================= */}
      <div className="relative border-t border-white/[0.06]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-7">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-5">

            {/* Copyright */}
            <div className="flex items-center gap-4">
              <span className="foot-label text-white/30">
                © {currentYear} PY Capital
              </span>
              <span className="w-px h-3 bg-white/10" />
              <span className="foot-label text-white/30">
                All rights reserved
              </span>
            </div>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 foot-label text-white/30">
              <span>Nairobi · 01°17'S 36°49'E</span>
              <span className="hidden sm:block w-px h-3 bg-white/10" />
              <span>Currency · KSh</span>
              <span className="hidden sm:block w-px h-3 bg-white/10" />
              <span className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-[#A8763E]" />
                Vol. 01 · MMXXVI
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}