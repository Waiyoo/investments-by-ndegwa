// app/admin/page.tsx
import Link from 'next/link'
import {
  ShieldCheck,
  LayoutDashboard,
  Briefcase,
  Users,
  Settings,
  LogOut,
  ArrowUpRight,
  TrendingUp,
  Clock,
  FileText,
  CheckCircle2,
  Bell,
  Search,
  Menu,
  Plus,
} from 'lucide-react'

export const metadata = {
  title: 'Admin Dashboard · PY Capital',
}

export default function AdminDashboardPage() {
  return (
    <div className="flex min-h-screen bg-[#FAF7F2] text-[#1F1A15] font-sans overflow-x-hidden antialiased">

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

            .anim-fade-up { animation: fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) both; }
            .anim-fade-in { animation: fadeIn 1s cubic-bezier(0.22,1,0.36,1) both; }
            .anim-blink { animation: blink 2s steps(1) infinite; }

            .d-1 { animation-delay: 0.08s; }
            .d-2 { animation-delay: 0.16s; }
            .d-3 { animation-delay: 0.24s; }
            .d-4 { animation-delay: 0.32s; }

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

            ::-webkit-scrollbar { width: 8px; height: 8px; }
            ::-webkit-scrollbar-track { background: transparent; }
            ::-webkit-scrollbar-thumb { background: rgba(31,26,21,0.20); }
            ::-webkit-scrollbar-thumb:hover { background: #A8763E; }
          `,
        }}
      />

      {/* =========================================================================
          SIDEBAR — INSTITUTIONAL NAV
          ========================================================================= */}
      <aside className="hidden lg:flex w-64 xl:w-72 flex-col bg-[#231C16] text-white sticky top-0 h-screen border-r border-white/10">

        {/* Wordmark */}
        <div className="px-6 py-6 border-b border-white/10">
          <Link href="/" className="flex items-baseline gap-3">
            <span className="font-serif text-[1.6rem] font-medium tracking-tight text-white">
              PY Capital
            </span>
            <span className="label-inst-sm text-white/50">
              Admin
            </span>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-0.5 overflow-y-auto">

          <div className="px-3 pb-3 pt-4">
            <span className="label-inst-sm text-white/35">Main</span>
          </div>

          {[
            { icon: LayoutDashboard, label: 'Dashboard', href: '/admin', active: true },
            { icon: Briefcase, label: 'Investments', href: '/admin/investments' },
            { icon: Users, label: 'Inquiries', href: '/admin/inquiries', badge: '3' },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`group flex items-center justify-between gap-3 px-4 py-3 text-sm transition-colors duration-300 relative ${
                item.active
                  ? 'bg-white/[0.06] text-white'
                  : 'text-white/60 hover:bg-white/[0.03] hover:text-white'
              }`}
            >
              {/* Active accent bar */}
              {item.active && (
                <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#A8763E]" />
              )}
              <span className="flex items-center gap-3">
                <item.icon className="w-4 h-4" strokeWidth={1.5} />
                <span className="font-medium">{item.label}</span>
              </span>
              {item.badge && (
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 ${
                    item.active
                      ? 'bg-[#A8763E] text-white'
                      : 'bg-[#A8763E]/80 text-white'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          ))}

          <div className="px-3 pb-3 pt-8">
            <span className="label-inst-sm text-white/35">System</span>
          </div>

          <Link
            href="/admin/settings"
            className="group flex items-center gap-3 px-4 py-3 text-sm font-medium text-white/60 hover:bg-white/[0.03] hover:text-white transition-colors duration-300"
          >
            <Settings className="w-4 h-4" strokeWidth={1.5} />
            Settings
          </Link>
        </nav>

        {/* User + Exit */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 px-2 py-2">
            <span className="w-9 h-9 border border-[#A8763E] flex items-center justify-center text-white text-[0.7rem] font-mono">
              AD
            </span>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-medium text-white truncate">
                Admin User
              </div>
              <div className="text-[0.65rem] font-mono text-white/45 truncate mt-0.5">
                admin@ndegwa.co.ke
              </div>
            </div>
          </div>
          <Link
            href="/"
            className="mt-3 flex items-center gap-2 px-2 py-2 text-[0.7rem] font-mono tracking-[0.15em] uppercase text-white/45 hover:text-[#C9A46A] transition-colors duration-300"
          >
            <LogOut className="w-3 h-3" strokeWidth={1.5} />
            Exit to Public Site
          </Link>
        </div>
      </aside>

      {/* =========================================================================
          MAIN
          ========================================================================= */}
      <main className="flex-1 min-w-0">

        {/* Topbar */}
        <header className="sticky top-0 z-30 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[var(--line)]">
          <div className="flex items-center justify-between gap-4 px-6 lg:px-10 h-16 lg:h-20">

            {/* Mobile logo */}
            <div className="flex items-center gap-3 lg:hidden">
              <button
                aria-label="Menu"
                className="w-10 h-10 flex items-center justify-center border border-[var(--line)]"
              >
                <Menu className="w-4 h-4" strokeWidth={1.5} />
              </button>
              <span className="font-serif text-xl font-medium text-[#1F1A15]">
                PY Capital
              </span>
            </div>

            {/* Search */}
            <div className="hidden md:flex items-center gap-3 flex-1 max-w-md">
              <div className="relative w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1F1A15]/40" strokeWidth={1.5} />
                <input
                  type="text"
                  placeholder="Search investments, inquiries…"
                  className="w-full pl-11 pr-4 py-3 bg-white border border-[var(--line)] text-sm text-[#1F1A15] placeholder:text-[#1F1A15]/35 focus:outline-none focus:border-[#A8763E] transition-colors duration-300"
                />
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
              <button
                aria-label="Notifications"
                className="relative w-10 h-10 flex items-center justify-center border border-[var(--line)] hover:border-[#A8763E] hover:text-[#A8763E] text-[#1F1A15] transition-colors duration-300"
              >
                <Bell className="w-4 h-4" strokeWidth={1.5} />
                <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-[#A8763E] rounded-full anim-blink" />
              </button>
              <Link
                href="/admin/investments/new"
                className="hidden sm:inline-flex items-center gap-3 bg-[#A8763E] hover:bg-[#1F1A15] text-white label-inst px-5 py-3 transition-colors duration-500"
              >
                <Plus className="w-3.5 h-3.5" strokeWidth={2} />
                New Investment
              </Link>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-6 lg:p-10 max-w-[1600px]">

          {/* Page heading */}
          <div className="grid grid-cols-12 gap-8 mb-16 items-end anim-fade-up">
            <div className="col-span-12 lg:col-span-8">
              <div className="flex items-center gap-4 mb-6">
                <span className="label-inst text-[#1F1A15]/45">01 — Dashboard</span>
                <span className="w-10 h-px bg-[#A8763E]" />
              </div>
              <h1 className="font-serif font-light text-[2.5rem] sm:text-[3rem] lg:text-[3.5rem] leading-[1.02] tracking-[-0.02em] text-[#1F1A15] mb-5">
                Welcome back.
              </h1>
              <p className="text-[0.95rem] leading-[1.75] text-[#1F1A15]/60 max-w-xl">
                Manage your investment opportunities, monitor inquiries, and keep your publishing pipeline moving.
              </p>
            </div>
            <div className="col-span-12 lg:col-span-4 lg:text-right">
              <span className="inline-flex items-center gap-3 label-inst text-[#1F1A15]/60 border border-[var(--line)] px-4 py-2.5 bg-white">
                <span className="w-1.5 h-1.5 bg-[#A8763E] rounded-full anim-blink" />
                System Online
              </span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">

            {/* Total investments */}
            <div className="group bg-white border border-[var(--line)] p-8 anim-fade-up d-1 transition-shadow duration-500 hover:shadow-[0_24px_60px_-32px_rgba(58,42,24,0.28)] relative">
              <div className="absolute top-0 left-0 w-12 h-px bg-[#A8763E] group-hover:w-24 transition-all duration-700" />

              <div className="flex items-center justify-between mb-8">
                <Briefcase className="w-5 h-5 text-[#1F1A15]" strokeWidth={1.5} />
                <span className="label-inst-sm text-[#A8763E]">
                  +12%
                </span>
              </div>

              <span className="label-inst text-[#1F1A15]/45 block mb-4">
                Total Investments
              </span>

              <span className="font-serif text-[2.75rem] lg:text-5xl font-light tracking-[-0.02em] text-[#1F1A15] block mb-5">
                24
              </span>

              <div className="pt-5 border-t border-[var(--line)] flex items-center justify-between">
                <span className="label-inst-sm text-[#1F1A15]/45">Published</span>
                <span className="text-xs text-[#1F1A15]/75 font-medium">18</span>
              </div>
              <div className="pt-3 flex items-center justify-between">
                <span className="label-inst-sm text-[#1F1A15]/45">Drafts</span>
                <span className="text-xs text-[#1F1A15]/75 font-medium">6</span>
              </div>
            </div>

            {/* Pending inquiries */}
            <div className="group bg-white border border-[var(--line)] p-8 anim-fade-up d-2 transition-shadow duration-500 hover:shadow-[0_24px_60px_-32px_rgba(58,42,24,0.28)] relative">
              <div className="absolute top-0 left-0 w-12 h-px bg-[#A8763E] group-hover:w-24 transition-all duration-700" />

              <div className="flex items-center justify-between mb-8">
                <Users className="w-5 h-5 text-[#1F1A15]" strokeWidth={1.5} />
                <span className="label-inst-sm text-[#A8763E] flex items-center gap-1.5">
                  <Clock className="w-2.5 h-2.5" strokeWidth={2} />
                  Action
                </span>
              </div>

              <span className="label-inst text-[#1F1A15]/45 block mb-4">
                Pending Inquiries
              </span>

              <span className="font-serif text-[2.75rem] lg:text-5xl font-light tracking-[-0.02em] text-[#1F1A15] block mb-5">
                07
              </span>

              <div className="pt-5 border-t border-[var(--line)] flex items-center justify-between">
                <span className="label-inst-sm text-[#1F1A15]/45">Today</span>
                <span className="text-xs text-[#A8763E] font-medium">+3 new</span>
              </div>
              <div className="pt-3 flex items-center justify-between">
                <span className="label-inst-sm text-[#1F1A15]/45">This week</span>
                <span className="text-xs text-[#1F1A15]/75 font-medium">12</span>
              </div>
            </div>

            {/* Vetted capital */}
            <div className="group bg-white border border-[var(--line)] p-8 anim-fade-up d-3 transition-shadow duration-500 hover:shadow-[0_24px_60px_-32px_rgba(58,42,24,0.28)] relative">
              <div className="absolute top-0 left-0 w-12 h-px bg-[#A8763E] group-hover:w-24 transition-all duration-700" />

              <div className="flex items-center justify-between mb-8">
                <TrendingUp className="w-5 h-5 text-[#1F1A15]" strokeWidth={1.5} />
                <span className="label-inst-sm text-[#A8763E]">
                  +8%
                </span>
              </div>

              <span className="label-inst text-[#1F1A15]/45 block mb-4">
                Vetted Capital
              </span>

              <span className="font-serif text-[2.25rem] lg:text-[2.5rem] font-light tracking-[-0.02em] text-[#1F1A15] block mb-5">
                KSh 2.4B
              </span>

              <div className="pt-5 border-t border-[var(--line)] flex items-center justify-between">
                <span className="label-inst-sm text-[#1F1A15]/45">Status</span>
                <span className="text-xs text-[#1F1A15]/75 font-medium">Active</span>
              </div>
              <div className="pt-3 flex items-center justify-between">
                <span className="label-inst-sm text-[#1F1A15]/45">Coverage</span>
                <span className="text-xs text-[#1F1A15]/75 font-medium">All listings</span>
              </div>
            </div>

            {/* System status — dark card */}
            <div className="group bg-[#231C16] text-white border border-[#231C16] p-8 anim-fade-up d-4 relative">
              <div className="absolute top-0 left-0 w-12 h-px bg-[#A8763E] group-hover:w-24 transition-all duration-700" />

              <div className="flex items-center justify-between mb-8">
                <ShieldCheck className="w-5 h-5 text-white" strokeWidth={1.5} />
                <span className="label-inst-sm text-[#C9A46A] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-[#A8763E] rounded-full anim-blink" />
                  Live
                </span>
              </div>

              <span className="label-inst text-white/45 block mb-4">
                System Status
              </span>

              <span className="font-serif text-[2.75rem] lg:text-5xl font-light tracking-[-0.02em] text-white block mb-5">
                Online
              </span>

              <div className="pt-5 border-t border-white/15 flex items-center justify-between">
                <span className="label-inst-sm text-white/45">Uptime</span>
                <span className="text-xs text-white/85 font-medium">99.98%</span>
              </div>
              <div className="pt-3 flex items-center justify-between">
                <span className="label-inst-sm text-white/45">Services</span>
                <span className="text-xs text-white/85 font-medium">Operational</span>
              </div>
            </div>
          </div>

          {/* Two column — Recent activity + Quick actions */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-6">

            {/* Recent activity */}
            <div className="bg-white border border-[var(--line)] anim-fade-up d-3">

              <div className="flex items-center justify-between px-8 py-6 border-b border-[var(--line)]">
                <div>
                  <div className="flex items-center gap-4 mb-2">
                    <span className="label-inst text-[#1F1A15]/45">02 — Activity</span>
                    <span className="w-8 h-px bg-[#A8763E]" />
                  </div>
                  <h2 className="font-serif text-[1.5rem] lg:text-[1.75rem] font-normal tracking-[-0.01em] text-[#1F1A15]">
                    Recent Activity
                  </h2>
                </div>
                <Link
                  href="/admin/activity"
                  className="inline-flex items-center gap-2 label-inst-sm text-[#1F1A15]/60 hover:text-[#A8763E] transition-colors duration-300"
                >
                  View all
                  <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.5} />
                </Link>
              </div>

              <div className="divide-y divide-[var(--line)]">
                {[
                  { icon: Briefcase, title: 'New investment published', meta: 'Kilimani Commercial Tower · 2h ago' },
                  { icon: Users, title: 'Investor inquiry received', meta: 'James M. · Karen Estate Project · 4h ago' },
                  { icon: CheckCircle2, title: 'Investment approved', meta: 'Ruiru Agribusiness · 1d ago' },
                  { icon: FileText, title: 'Documentation updated', meta: 'Westlands Mixed-Use · 2d ago' },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-5 px-8 py-5 hover:bg-[#F1EBE1]/50 transition-colors duration-300 group"
                  >
                    <span className="w-10 h-10 border border-[var(--line)] flex items-center justify-center text-[#1F1A15] flex-shrink-0 group-hover:border-[#A8763E] group-hover:text-[#A8763E] transition-colors duration-300">
                      <item.icon className="w-4 h-4" strokeWidth={1.5} />
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-[#1F1A15] truncate">
                        {item.title}
                      </div>
                      <div className="text-xs font-mono text-[#1F1A15]/45 truncate mt-1">
                        {item.meta}
                      </div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-[#1F1A15]/30 flex-shrink-0 group-hover:text-[#A8763E] transition-colors duration-300" strokeWidth={1.5} />
                  </div>
                ))}
              </div>
            </div>

            {/* Quick actions */}
            <div className="bg-white border border-[var(--line)] anim-fade-up d-4">

              <div className="px-8 py-6 border-b border-[var(--line)]">
                <div className="flex items-center gap-4 mb-2">
                  <span className="label-inst text-[#1F1A15]/45">03 — Shortcuts</span>
                  <span className="w-8 h-px bg-[#A8763E]" />
                </div>
                <h2 className="font-serif text-[1.5rem] lg:text-[1.75rem] font-normal tracking-[-0.01em] text-[#1F1A15]">
                  Quick Actions
                </h2>
              </div>

              <div className="p-5 space-y-2">
                {[
                  { icon: Plus, label: 'Add New Investment', href: '/admin/investments/new', primary: true },
                  { icon: Users, label: 'Review Inquiries', href: '/admin/inquiries', badge: '7' },
                  { icon: Briefcase, label: 'Manage Portfolio', href: '/admin/investments' },
                  { icon: FileText, label: 'Content Library', href: '/admin/content' },
                ].map((action) => (
                  <Link
                    key={action.label}
                    href={action.href}
                    className={`group flex items-center justify-between gap-3 px-5 py-4 text-sm font-medium transition-colors duration-500 ${
                      action.primary
                        ? 'bg-[#A8763E] hover:bg-[#1F1A15] text-white'
                        : 'bg-[#F1EBE1] hover:bg-[#1F1A15] text-[#1F1A15] hover:text-white'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <action.icon className="w-4 h-4" strokeWidth={1.5} />
                      <span className="label-inst">{action.label}</span>
                    </span>
                    <span className="flex items-center gap-2">
                      {action.badge && (
                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 ${
                            action.primary
                              ? 'bg-white/25 text-white'
                              : 'bg-[#A8763E] text-white'
                          }`}
                        >
                          {action.badge}
                        </span>
                      )}
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.5} />
                    </span>
                  </Link>
                ))}
              </div>

              {/* Tip — institutional */}
              <div className="m-5 mt-0 bg-[#231C16] text-white p-6 relative">
                <div className="absolute top-0 left-0 w-12 h-px bg-[#A8763E]" />
                <div className="flex items-center gap-2 mb-3">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C9A46A]" strokeWidth={1.5} />
                  <span className="label-inst-sm text-[#C9A46A]">
                    Compliance Note
                  </span>
                </div>
                <p className="text-xs leading-[1.75] text-white/65 font-light">
                  Ensure every published opportunity includes complete documentation and risk disclosure before it goes live.
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-16 pt-6 border-t border-[var(--line)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <span className="label-inst text-[#1F1A15]/35">
              © 2026 PY Capital — Admin Portal
            </span>
            <div className="flex items-center gap-6 label-inst text-[#1F1A15]/35">
              <span className="flex items-center gap-2">
                <span className="w-1 h-1 bg-[#A8763E] rounded-full anim-blink" />
                Nairobi · KE
              </span>
              <span className="w-px h-3 bg-[#1F1A15]/15" />
              <span>v1.0</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}