// app/admin/page.tsx
import Link from 'next/link'
import { ShieldCheck, LayoutDashboard, Briefcase, Users, FileText, Settings, LogOut } from 'lucide-react'

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 hidden md:flex flex-col">
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold">
            NI
          </div>
          <div>
            <h1 className="font-bold text-sm text-slate-900 dark:text-white">Ndegwa Admin</h1>
            <p className="text-xs text-emerald-600 dark:text-emerald-400">Management Portal</p>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <Link href="/admin" className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 font-medium text-sm">
            <LayoutDashboard className="w-4 h-4" /> Dashboard
          </Link>
          <Link href="/admin/investments" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium text-sm">
            <Briefcase className="w-4 h-4" /> Investments
          </Link>
          <Link href="/admin/inquiries" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium text-sm">
            <Users className="w-4 h-4" /> Inquiries
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium text-sm">
            <Settings className="w-4 h-4" /> Settings
          </Link>
        </nav>
        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <Link href="/" className="flex items-center gap-2 text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white">
            <LogOut className="w-4 h-4" /> Exit to Public Site
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Admin Dashboard</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Welcome back. Manage your investment opportunities and investor inquiries.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Investments</h3>
            <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">--</p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Pending Inquiries</h3>
            <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">--</p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Active Status</h3>
            <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mt-2">Online</p>
          </div>
        </div>
      </main>
    </div>
  )
}