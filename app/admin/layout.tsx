// app/admin/layout.tsx
import Link from 'next/link'
import { LayoutDashboard, Briefcase, Users, FileText, Settings, LogOut, ShieldCheck } from 'lucide-react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = cookies().get('ndegwa_admin_session')

  // If not logged in and not on login page, layout will protect children
  // (Individual pages also verify session server-side)

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Investments', href: '/admin/investments', icon: Briefcase },
    { name: 'Inquiries', href: '/admin/inquiries', icon: Users },
    { name: 'Categories', href: '/admin/categories', icon: FileText },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1F1A15] flex flex-col lg:flex-row overflow-x-hidden antialiased">

      {/* =========================================================================
          GLOBAL STYLES — Institutional Admin System
          ========================================================================= */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Inter:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap');

            .font-serif { font-family: 'Cormorant Garamond', Georgia, serif; font-optical-sizing: auto; }
            .font-sans { font-family: 'Inter', system-ui, sans-serif; }
            .font-mono { font-family: 'IBM Plex Mono', ui-monospace, monospace; }

            :root {
              --accent: #A8763E;
              --accent-deep: #7A5222;
              --accent-soft: #C9A46A;
              --ink: #1F1A15;
              --ink-soft: #2B241D;
              --paper: #FAF7F2;
              --bone: #F1EBE1;
              --dark: #231C16;
              --line: rgba(31,26,21,0.10);
              --line-strong: rgba(31,26,21,0.20);
            }

            @keyframes blink {
              0%, 55% { opacity: 1; }
              56%, 100% { opacity: 0.35; }
            }

            .anim-blink { animation: blink 2s steps(1) infinite; }

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
            ::-webkit-scrollbar-track { background: #FAF7F2; }
            ::-webkit-scrollbar-thumb { background: rgba(31,26,21,0.22); }
            ::-webkit-scrollbar-thumb:hover { background: #A8763E; }
          `,
        }}
      />

      {/* =========================================================================
          SIDEBAR — INSTITUTIONAL NAV (Dark)
          ========================================================================= */}
      <aside className="w-full lg:w-72 bg-[#231C16] text-white flex flex-col justify-between shrink-0 lg:sticky lg:top-0 lg:h-screen">

        {/* Wordmark block */}
        <div>
          <div className="px-6 py-6 border-b border-white/10">
            <Link href="/admin" className="flex items-baseline gap-3">
              <span className="font-serif text-[1.6rem] font-medium tracking-tight text-white">
                Ndegwa
              </span>
              <span className="label-inst-sm text-white/50">
                Admin
              </span>
            </Link>
            <div className="flex items-center gap-2 mt-4">
              <span className="w-1.5 h-1.5 bg-[#A8763E] rounded-full anim-blink" />
              <span className="label-inst-sm text-white/40">
                Management Portal
              </span>
            </div>
          </div>

          {/* Nav section label */}
          <div className="px-6 pt-6 pb-3">
            <span className="label-inst-sm text-white/35">Navigation</span>
          </div>

          {/* Nav */}
          <nav className="px-4 pb-4 space-y-0.5">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="group relative flex items-center gap-3 px-4 py-3 text-sm text-white/60 hover:bg-white/[0.04] hover:text-white transition-colors duration-300"
                >
                  {/* Left accent on hover */}
                  <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#A8763E] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <Icon className="w-4 h-4 text-white/50 group-hover:text-[#C9A46A] transition-colors duration-300" strokeWidth={1.5} />

                  <span className="font-medium">{item.name}</span>
                </Link>
              )
            })}
          </nav>

          {/* System section label */}
          <div className="px-6 pt-6 pb-3 border-t border-white/10 mt-4">
            <span className="label-inst-sm text-white/35">System</span>
          </div>

          {/* Secondary nav — settings duplicate for institutional pattern */}
          <nav className="px-4 pb-4 space-y-0.5">
            <Link
              href="/admin/settings"
              className="group relative flex items-center gap-3 px-4 py-3 text-sm text-white/60 hover:bg-white/[0.04] hover:text-white transition-colors duration-300"
            >
              <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#A8763E] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Settings className="w-4 h-4 text-white/50 group-hover:text-[#C9A46A] transition-colors duration-300" strokeWidth={1.5} />
              <span className="font-medium">Settings</span>
            </Link>
          </nav>
        </div>

        {/* Bottom — view site link */}
        <div className="p-4 border-t border-white/10">
          <Link
            href="/"
            target="_blank"
            className="group flex items-center justify-between gap-3 border border-white/20 hover:border-[#C9A46A]/60 hover:bg-white/[0.04] text-white/85 label-inst-sm px-4 py-3.5 transition-colors duration-300 w-full"
          >
            <span className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 bg-[#A8763E] rounded-full anim-blink" />
              <span>View Live Website</span>
            </span>
            <span className="font-mono text-white/50 group-hover:text-[#C9A46A] transition-colors duration-300">
              →
            </span>
          </Link>

          {/* Session status */}
          <div className="flex items-center gap-3 mt-4 px-1">
            <ShieldCheck className="w-3 h-3 text-[#C9A46A]" strokeWidth={1.75} />
            <span className="label-inst-sm text-white/35">
              {session ? 'Authenticated' : 'Guest Session'}
            </span>
          </div>
        </div>
      </aside>

      {/* =========================================================================
          MAIN CONTENT AREA
          ========================================================================= */}
      <main className="flex-1 min-w-0 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}