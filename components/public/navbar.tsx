// components/public/navbar.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Menu, X, ShieldCheck, ChevronRight } from 'lucide-react'

export default function Navbar() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Investments', href: '/investments' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 border-b ${
        scrolled
          ? 'bg-[#FBFBF9]/95 backdrop-blur-md border-[rgba(14,14,14,0.10)]'
          : 'bg-[#FBFBF9] border-transparent'
      }`}
    >
      {/* =========================================================================
          GLOBAL STYLES — Institutional Navbar System
          ========================================================================= */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Inter:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap');

            .nav-serif { font-family: 'Cormorant Garamond', Georgia, serif; font-optical-sizing: auto; }
            .nav-sans { font-family: 'Inter', system-ui, sans-serif; }
            .nav-mono { font-family: 'IBM Plex Mono', ui-monospace, monospace; }

            @keyframes blink {
              0%, 55% { opacity: 1; }
              56%, 100% { opacity: 0.35; }
            }
            @keyframes navFadeIn {
              from { opacity: 0; transform: translateY(-8px); }
              to { opacity: 1; transform: translateY(0); }
            }

            .anim-blink { animation: blink 2s steps(1) infinite; }
            .anim-nav-fade { animation: navFadeIn 0.4s cubic-bezier(0.22,1,0.36,1) both; }

            /* Institutional label */
            .nav-label {
              font-family: 'IBM Plex Mono', monospace;
              font-size: 0.65rem;
              letter-spacing: 0.28em;
              text-transform: uppercase;
              font-weight: 500;
            }
            .nav-label-sm {
              font-family: 'IBM Plex Mono', monospace;
              font-size: 0.6rem;
              letter-spacing: 0.24em;
              text-transform: uppercase;
              font-weight: 500;
            }
          `,
        }}
      />

      {/* =========================================================================
          TOP UTILITY STRIP — visible on scroll, hidden at top
          ========================================================================= */}
      <div
        className={`hidden lg:block bg-[#0E0E0E] text-white transition-all duration-500 overflow-hidden ${
          scrolled ? 'max-h-0 opacity-0' : 'max-h-12 opacity-100'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 h-9 flex items-center justify-between">
          <div className="flex items-center gap-6 nav-label-sm text-white/60">
            <span className="text-white/85">Ndegwa Investments</span>
            <span className="w-px h-3 bg-white/20" />
            <span>Private Markets · East Africa</span>
          </div>
          <div className="flex items-center gap-6 nav-label-sm text-white/50">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#B01E28] rounded-full anim-blink" />
              Nairobi · 01°17'S 36°49'E
            </span>
            <span className="w-px h-3 bg-white/20" />
            <span>EN · KES</span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          MAIN NAVIGATION BAR
          ========================================================================= */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 h-20 flex items-center justify-between gap-6">

        {/* Wordmark */}
        <Link href="/" className="flex items-baseline gap-3 group">
          <span className="nav-serif text-[1.6rem] font-medium tracking-tight text-[#0E0E0E]">
            Ndegwa
          </span>
          <span className="hidden sm:inline nav-label text-[#0E0E0E]/50 group-hover:text-[#B01E28] transition-colors duration-300">
            Investments
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative py-2 nav-label transition-colors duration-300 ${
                  isActive
                    ? 'text-[#B01E28]'
                    : 'text-[#0E0E0E]/70 hover:text-[#0E0E0E]'
                }`}
              >
                {link.name}
                {/* Active underline — red hairline */}
                <span
                  className={`absolute -bottom-0.5 left-0 h-px bg-[#B01E28] transition-all duration-500 ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            )
          })}
        </nav>

        {/* Right — CTA + mobile menu */}
        <div className="flex items-center gap-3">

          {/* Desktop: Access platform CTA */}
          <Link
            href="/investments"
            className="hidden lg:inline-flex items-center gap-3 bg-[#0E0E0E] hover:bg-[#B01E28] text-white nav-label px-5 py-3 transition-colors duration-500"
          >
            Explore Opportunities
            <ChevronRight className="w-3.5 h-3.5" strokeWidth={1.75} />
          </Link>

          {/* Mobile: Phone-style compact CTA */}
          <Link
            href="/investments"
            className="lg:hidden inline-flex items-center gap-2 bg-[#0E0E0E] hover:bg-[#B01E28] text-white nav-label-sm px-4 py-2.5 transition-colors duration-500"
          >
            Explore
            <ChevronRight className="w-3 h-3" strokeWidth={1.75} />
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-10 h-10 flex items-center justify-center border border-[rgba(14,14,14,0.15)] hover:border-[#B01E28] text-[#0E0E0E] hover:text-[#B01E28] transition-colors duration-300"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-4 h-4" strokeWidth={1.75} />
            ) : (
              <Menu className="w-4 h-4" strokeWidth={1.75} />
            )}
          </button>
        </div>
      </div>

      {/* =========================================================================
          MOBILE NAVIGATION DRAWER — Institutional
          ========================================================================= */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[rgba(14,14,14,0.10)] bg-[#FBFBF9] anim-nav-fade">
          <div className="px-6 py-6 space-y-1">

            {/* Section label */}
            <div className="flex items-center gap-4 pb-4 mb-4 border-b border-[rgba(14,14,14,0.10)]">
              <span className="nav-label text-[#0E0E0E]/45">Navigation</span>
              <span className="flex-1 h-px bg-[#B01E28]/30" />
            </div>

            {/* Nav links */}
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`group flex items-center justify-between gap-4 py-3.5 border-b border-[rgba(14,14,14,0.10)] last:border-b-0 transition-colors duration-300 ${
                    isActive
                      ? 'text-[#B01E28]'
                      : 'text-[#0E0E0E]/75 hover:text-[#0E0E0E]'
                  }`}
                >
                  <span className="nav-serif text-[1.35rem] font-normal tracking-[-0.01em]">
                    {link.name}
                  </span>
                  <span className="flex items-center gap-3">
                    {isActive && (
                      <span className="w-1.5 h-1.5 bg-[#B01E28] rounded-full anim-blink" />
                    )}
                    <ChevronRight
                      className={`w-4 h-4 transition-transform duration-300 ${
                        isActive
                          ? 'text-[#B01E28]'
                          : 'text-[#0E0E0E]/30 group-hover:translate-x-0.5'
                      }`}
                      strokeWidth={1.5}
                    />
                  </span>
                </Link>
              )
            })}

            {/* Mobile CTA — institutional */}
            <div className="pt-6 mt-4 border-t border-[rgba(14,14,14,0.10)]">
              <Link
                href="/investments"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-between gap-3 bg-[#B01E28] hover:bg-[#0E0E0E] text-white nav-label px-6 py-4 transition-colors duration-500"
              >
                <span>Explore Opportunities</span>
                <ChevronRight className="w-4 h-4" strokeWidth={1.75} />
              </Link>

              {/* Contact line */}
              <div className="flex items-center justify-between mt-6 pt-5 border-t border-[rgba(14,14,14,0.10)]">
                <span className="nav-label-sm text-[#0E0E0E]/45">Advisory Line</span>
                <a
                  href="tel:+254799357038"
                  className="nav-mono text-xs text-[#0E0E0E]/80 hover:text-[#B01E28] transition-colors"
                >
                  +254 799 357 038
                </a>
              </div>

              {/* Trust mark */}
              <div className="flex items-center gap-3 mt-4">
                <ShieldCheck className="w-3.5 h-3.5 text-[#B01E28]" strokeWidth={1.75} />
                <span className="nav-label-sm text-[#0E0E0E]/45">
                  Vetted · Institutional Grade
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}