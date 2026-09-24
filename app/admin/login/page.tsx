// app/admin/login/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ShieldCheck, Lock, Mail, ArrowRight } from 'lucide-react'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (res.ok) {
        router.push('/admin')
        router.refresh()
      } else {
        const data = await res.json()
        setError(data.message || 'Invalid credentials')
      }
    } catch (err) {
      setError('An error occurred during login. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#231C16] px-4 py-16 overflow-hidden">

      {/* =========================================================================
          GLOBAL STYLES — Institutional Admin Login System
          ========================================================================= */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Inter:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap');

            .login-serif { font-family: 'Cormorant Garamond', Georgia, serif; font-optical-sizing: auto; }
            .login-sans { font-family: 'Inter', system-ui, sans-serif; }
            .login-mono { font-family: 'IBM Plex Mono', ui-monospace, monospace; }

            @keyframes fadeUp {
              from { opacity: 0; transform: translateY(16px); }
              to { opacity: 1; transform: translateY(0); }
            }
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes blink {
              0%, 55% { opacity: 1; }
              56%, 100% { opacity: 0.35; }
            }
            @keyframes slowPan {
              0%, 100% { transform: scale(1.05) translate(0, 0); }
              50% { transform: scale(1.10) translate(-1%, -0.5%); }
            }

            .login-anim-fade-up { animation: fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) both; }
            .login-anim-fade-in { animation: fadeIn 1.2s cubic-bezier(0.22,1,0.36,1) both; }
            .login-anim-blink { animation: blink 2s steps(1) infinite; }
            .login-anim-slow-pan { animation: slowPan 32s ease-in-out infinite; }

            .login-d-1 { animation-delay: 0.1s; }
            .login-d-2 { animation-delay: 0.2s; }
            .login-d-3 { animation-delay: 0.3s; }

            /* Institutional label */
            .login-label {
              font-family: 'IBM Plex Mono', monospace;
              font-size: 0.65rem;
              letter-spacing: 0.32em;
              text-transform: uppercase;
              font-weight: 500;
            }
            .login-label-sm {
              font-family: 'IBM Plex Mono', monospace;
              font-size: 0.6rem;
              letter-spacing: 0.28em;
              text-transform: uppercase;
              font-weight: 500;
            }

            /* Image treatment */
            .login-img-inst {
              filter: saturate(0.55) contrast(1.05) brightness(0.55) sepia(0.15);
            }
          `,
        }}
      />

      {/* =========================================================================
          BACKGROUND IMAGE — Corporate architecture, treated
          ========================================================================= */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2600&q=90"
          alt=""
          className="w-full h-full object-cover opacity-[0.18] login-img-inst login-anim-slow-pan"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#231C16] via-[#231C16]/90 to-[#231C16]/70" />
      </div>

      {/* =========================================================================
          LOGIN CARD — INSTITUTIONAL
          ========================================================================= */}
      <div className="relative z-10 max-w-md w-full bg-[#FAF7F2] border border-white/10 login-anim-fade-up">

        {/* Top accent rule */}
        <span className="absolute top-0 left-0 right-0 h-px bg-[#A8763E]" />

        <div className="p-8 lg:p-10">

          {/* Header */}
          <div className="text-center mb-10">
            {/* Icon */}
            <div className="mx-auto w-14 h-14 border border-[#A8763E] flex items-center justify-center text-[#A8763E] mb-6 login-anim-fade-in login-d-1">
              <ShieldCheck className="w-6 h-6" strokeWidth={1.5} />
            </div>

            {/* Label */}
            <div className="flex items-center justify-center gap-3 mb-4 login-anim-fade-in login-d-1">
              <span className="w-6 h-px bg-[#A8763E]" />
              <span className="login-label text-[#1F1A15]/45">Secure Access</span>
              <span className="w-6 h-px bg-[#A8763E]" />
            </div>

            {/* Title */}
            <h1 className="login-serif text-[2rem] lg:text-[2.25rem] font-light tracking-[-0.01em] leading-[1.1] text-[#1F1A15] mb-3 login-anim-fade-up login-d-2">
              Admin Portal.
            </h1>

            <p className="text-sm leading-[1.7] text-[#1F1A15]/55 login-anim-fade-up login-d-2">
              PY Capital · Secure Management
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-6 px-4 py-3 border border-[#A8763E]/40 bg-[#A8763E]/[0.08] text-sm text-[#7A5222] leading-[1.6] login-anim-fade-up">
              {error}
            </div>
          )}

          {/* Form */}
          <form className="space-y-5" onSubmit={handleLogin}>
            {/* Email */}
            <div className="space-y-2 login-anim-fade-up login-d-3">
              <label className="login-label text-[#1F1A15]/60 block">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1F1A15]/40 pointer-events-none" strokeWidth={1.5} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@ndegwainvestments.com"
                  className="w-full pl-12 pr-4 py-3 bg-white border border-[rgba(31,26,21,0.15)] text-sm text-[#1F1A15] placeholder:text-[#1F1A15]/35 focus:outline-none focus:border-[#A8763E] focus:ring-1 focus:ring-[#A8763E]/30 transition-colors login-sans"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2 login-anim-fade-up login-d-3">
              <label className="login-label text-[#1F1A15]/60 block">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1F1A15]/40 pointer-events-none" strokeWidth={1.5} />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3 bg-white border border-[rgba(31,26,21,0.15)] text-sm text-[#1F1A15] placeholder:text-[#1F1A15]/35 focus:outline-none focus:border-[#A8763E] focus:ring-1 focus:ring-[#A8763E]/30 transition-colors login-sans"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="group w-full flex items-center justify-between gap-4 bg-[#A8763E] hover:bg-[#1F1A15] disabled:bg-[#A8763E]/40 disabled:cursor-not-allowed text-white login-label px-6 py-4 transition-colors duration-500 mt-2"
            >
              <span>{loading ? 'Authenticating…' : 'Sign In to Dashboard'}</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" strokeWidth={1.75} />
            </button>
          </form>

          {/* Footer link */}
          <div className="mt-8 pt-6 border-t border-[rgba(31,26,21,0.10)] text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-3 login-label-sm text-[#1F1A15]/55 hover:text-[#A8763E] transition-colors duration-300"
            >
              <span className="w-4 h-px bg-current" />
              <span>Return to Public Website</span>
            </Link>
          </div>
        </div>

        {/* Bottom institutional mark */}
        <div className="px-8 lg:px-10 pb-6 flex items-center justify-between login-label-sm text-[#1F1A15]/35">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#A8763E] rounded-full login-anim-blink" />
            <span>Authorized Personnel Only</span>
          </span>
          <span className="login-mono">Vol. 01 · MMXXVI</span>
        </div>
      </div>
    </div>
  )
}