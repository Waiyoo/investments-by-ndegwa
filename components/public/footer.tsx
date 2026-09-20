// components/public/footer.tsx
import Link from 'next/link'
import { Phone, MapPin, ShieldAlert, ArrowRight } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#0E0E0E] text-white border-t border-white/10">

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
              56%, 100% { opacity: 0.35; }
            }

            .anim-blink { animation: blink 2s steps(1) infinite; }

            /* Institutional label */
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
          `,
        }}
      />

      {/* =========================================================================
          TOP MARQUEE STRIP
          ========================================================================= */}
      <div className="border-b border-white/10 py-5 overflow-hidden">
        <div
          className="flex whitespace-nowrap w-max foot-label text-white/30"
          style={{ animation: 'footerMarquee 90s linear infinite' }}
        >
          {[0, 1].map((dup) => (
            <div key={dup} className="flex items-center">
              {[
                'Private Capital',
                'Real Estate',
                'Agriculture',
                'Commercial',
                'East Africa',
                'Nairobi',
                'MMXXVI',
              ].map((item) => (
                <span key={item} className="flex items-center">
                  <span className="px-10">{item}</span>
                  <span className="w-1 h-1 rounded-full bg-[#B01E28]" />
                </span>
              ))}
            </div>
          ))}
        </div>
        <style
          dangerouslySetInnerHTML={{
            __html: `
              @keyframes footerMarquee {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
            `,
          }}
        />
      </div>

      {/* =========================================================================
          MAIN FOOTER CONTENT — INSTITUTIONAL MASTHEAD
          ========================================================================= */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-16 lg:py-20">
        <div className="grid grid-cols-12 gap-8 lg:gap-16">

          {/* Column 1: Wordmark + Description + Disclaimer */}
          <div className="col-span-12 lg:col-span-5">

            {/* Wordmark — typographic */}
            <div className="mb-8">
              <span className="foot-serif text-3xl lg:text-[2.5rem] font-normal tracking-tight text-white block mb-3">
                Ndegwa Investments
              </span>
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-[#B01E28] rounded-full anim-blink" />
                <span className="foot-label text-white/45">
                  Vol. 01 · MMXXVI
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm leading-[1.8] text-white/50 max-w-md mb-8">
              Presenting curated, high-potential commercial, agricultural, and real estate investment opportunities in Nairobi and across Kenya. Connecting qualified capital with vetted ventures.
            </p>

            {/* Regulatory Disclaimer — institutional notice */}
            <div className="border-l-2 border-[#B01E28] bg-[#B01E28]/[0.04] px-5 py-4">
              <div className="flex items-center gap-3 mb-3">
                <ShieldAlert className="w-3.5 h-3.5 text-[#B01E28] flex-shrink-0" strokeWidth={1.75} />
                <span className="foot-label text-[#B01E28]">
                  Regulatory Notice
                </span>
              </div>
              <p className="text-xs leading-[1.75] text-white/60">
                Ndegwa Investments operates exclusively as an investment-opportunity presentation and lead-generation platform. We do not operate as a brokerage, forex platform, or online payment processor.
              </p>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="col-span-6 lg:col-span-3">
            <div className="mb-6 pb-3 border-b border-white/10">
              <span className="foot-label text-white/45">Navigation</span>
            </div>

            <ul className="flex flex-col gap-5">
              {[
                { label: 'Browse Opportunities', href: '/investments' },
                { label: 'About Ndegwa Investments', href: '/about' },
                { label: 'Contact Our Team', href: '/contact' },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group flex items-center justify-between gap-3 text-sm text-white/70 hover:text-white transition-colors duration-300"
                  >
                    <span>{item.label}</span>
                    <ArrowRight
                      className="w-3.5 h-3.5 text-white/30 group-hover:text-[#B01E28] group-hover:translate-x-0.5 transition-all duration-300"
                      strokeWidth={1.5}
                    />
                  </Link>
                </li>
              ))}

              {/* Admin portal — subtle, institutional */}
              <li className="pt-4 mt-2 border-t border-white/10">
                <Link
                  href="/admin/login"
                  className="group flex items-center justify-between gap-3 foot-label-sm text-white/35 hover:text-[#B01E28] transition-colors duration-300"
                >
                  <span>Administrator Portal</span>
                  <ArrowRight
                    className="w-3 h-3 group-hover:translate-x-0.5 transition-transform duration-300"
                    strokeWidth={1.5}
                  />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div className="col-span-6 lg:col-span-4">
            <div className="mb-6 pb-3 border-b border-white/10">
              <span className="foot-label text-white/45">Headquarters</span>
            </div>

            <ul className="flex flex-col gap-6">

              {/* Location */}
              <li className="grid grid-cols-[auto_1fr] gap-4">
                <MapPin className="w-4 h-4 text-[#B01E28] mt-1 flex-shrink-0" strokeWidth={1.5} />
                <div>
                  <span className="foot-label-sm text-white/45 block mb-2">
                    Location
                  </span>
                  <span className="foot-serif text-lg text-white">
                    Nairobi, Kenya
                  </span>
                </div>
              </li>

              {/* Phone */}
              <li className="grid grid-cols-[auto_1fr] gap-4">
                <Phone className="w-4 h-4 text-[#B01E28] mt-1 flex-shrink-0" strokeWidth={1.5} />
                <div>
                  <span className="foot-label-sm text-white/45 block mb-2">
                    Advisory Line
                  </span>
                  <a
                    href="tel:+254799357038"
                    className="foot-serif text-lg text-white hover:text-[#B01E28] transition-colors duration-300 block"
                  >
                    +254 799 357 038
                  </a>
                  <a
                    href="tel:+254799357038"
                    className="foot-mono text-xs text-white/45 hover:text-[#B01E28] transition-colors duration-300 mt-1 block"
                  >
                    0799357038
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* =========================================================================
          BOTTOM BAR — INSTITUTIONAL
          ========================================================================= */}
      <div className="border-t border-white/10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">

            {/* Copyright */}
            <span className="foot-label text-white/35">
              © {new Date().getFullYear()} Ndegwa Investments — All rights reserved
            </span>

            {/* Meta */}
            <div className="flex items-center gap-6 foot-label text-white/35">
              <span>Nairobi · 01°17'S 36°49'E</span>
              <span className="w-px h-3 bg-white/15" />
              <span>Currency · KSh</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}