// app/investments/page.tsx
import { getPublicInvestments } from '@/app/actions/public'
import { prisma } from '@/lib/db/prisma'
import Link from 'next/link'
import { Search, Filter, MapPin, ArrowRight, ShieldCheck } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function InvestmentsPage({
  searchParams,
}: {
  searchParams: { category?: string; status?: string; search?: string; sort?: string }
}) {
  const queryParams = await searchParams

  let investments: any[] = []
  let categories: any[] = []
  let statuses: any[] = []

  try {
    investments = await getPublicInvestments({
      category: queryParams.category,
      status: queryParams.status,
      search: queryParams.search,
      sort: (queryParams.sort as any) || 'newest',
    })

    categories = await prisma.investmentCategory.findMany({
      where: { active: true },
      orderBy: { ordering: 'asc' },
    })

    statuses = await prisma.investmentStatus.findMany({
      where: { active: true },
      orderBy: { ordering: 'asc' },
    })
  } catch (err) {
    console.error('Failed to load investments discovery data:', err)
  }
  
  return (
    <div className="py-12 bg-slate-50 dark:bg-slate-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="max-w-3xl space-y-3">
          <span className="text-emerald-600 dark:text-emerald-400 font-semibold text-xs tracking-wider uppercase">
            Discovery Portal
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            Investment Opportunities
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            Explore and filter curated investment opportunities. Select any opportunity to review detailed documentation, return structures, and express your interest.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <form method="GET" className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              name="search"
              defaultValue={queryParams.search || ''}
              placeholder="Search opportunities..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <select
              name="category"
              defaultValue={queryParams.category || ''}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="">All Categories</option>
              {categories.map((c: any) => (
                <option key={c.id} value={c.slug}>{c.name}</option>
              ))}
            </select>
          </div>

          <div>
            <select
              name="status"
              defaultValue={queryParams.status || ''}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="">All Statuses</option>
              {statuses.map((s: any) => (
                <option key={s.id} value={s.slug}>{s.name}</option>
              ))}
            </select>
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-sm transition-colors shadow-sm"
            >
              Filter
            </button>
            <Link
              href="/investments"
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium text-sm text-center flex items-center justify-center"
            >
              Reset
            </Link>
          </div>
        </form>

        {/* Results Grid */}
        {investments.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">No matching opportunities found</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
              Try adjusting your search criteria or clearing filters to view all active investment opportunities.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {investments.map((inv: any) => (
              <div
                key={inv.id}
                className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
                      {inv.category.name}
                    </span>
                    <span className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                      <MapPin className="w-3.5 h-3.5" /> {inv.location}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {inv.title}
                  </h3>

                  <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                    {inv.shortDescription}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                    {inv.fundingTarget && (
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-500">Target Capital:</span>
                        <span className="font-semibold text-slate-900 dark:text-white">
                          KSh {Number(inv.fundingTarget).toLocaleString()}
                        </span>
                      </div>
                    )}
                    {inv.fundingProgress && (
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-500">Funding Progress:</span>
                          <span className="font-semibold text-emerald-600 dark:text-emerald-400">{inv.fundingProgress}%</span>
                        </div>
                        <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                          <div 
                            className="bg-emerald-600 h-full rounded-full transition-all" 
                            style={{ width: `${Math.min(Number(inv.fundingProgress), 100)}%` }}
                          />
                        </div>
                      </div>
                    )}
                    {inv.returnDescription && (
                      <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 text-xs text-slate-600 dark:text-slate-300">
                        <span className="font-semibold text-emerald-600 dark:text-emerald-400">Return:</span> {inv.returnDescription}
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    href={`/investments/${inv.slug}`}
                    className="w-full flex items-center justify-center py-2.5 rounded-xl bg-slate-900 hover:bg-emerald-600 dark:bg-slate-800 dark:hover:bg-emerald-600 text-white font-medium text-sm transition-colors"
                  >
                    View Details & Express Interest
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}