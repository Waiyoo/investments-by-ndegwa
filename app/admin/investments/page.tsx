// app/admin/investments/page.tsx
import { db } from '@/lib/db'
import Link from 'next/link'
import { Plus, Briefcase, Eye, Edit } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function AdminInvestmentsPage() {
  const investments = await db.investmentOpportunity.findMany({
    include: {
      category: true,
      status: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Investments Management
          </h1>

          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Create, update, and manage public investment opportunities.
          </p>
        </div>

        <Link
          href="/admin/investments/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm transition-all shadow-sm shadow-emerald-600/20"
        >
          <Plus className="w-4 h-4" />
          New Investment
        </Link>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <th className="p-4">Title / Slug</th>
                <th className="p-4">Category</th>
                <th className="p-4">Funding Target</th>
                <th className="p-4">Min. Investment</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-sm">
              {investments.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="p-8 text-center text-slate-500 dark:text-slate-400"
                  >
                    No investment opportunities found. Click "New Investment" to create one.
                  </td>
                </tr>
              ) : (
                investments.map((inv) => (
                  <tr
                    key={inv.id}
                    className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <td className="p-4 font-medium text-slate-900 dark:text-white">
                      {inv.title}

                      <span className="block text-xs font-normal text-slate-400">
                        /{inv.slug}
                      </span>
                    </td>

                    <td className="p-4 text-slate-600 dark:text-slate-300">
                      {inv.category?.name || 'Uncategorized'}
                    </td>

                    <td className="p-4 text-slate-900 dark:text-white font-semibold">
                      {inv.fundingTarget
                        ? `KSh ${Number(inv.fundingTarget).toLocaleString()}`
                        : 'Not specified'}
                    </td>

                    <td className="p-4 text-slate-600 dark:text-slate-300">
                      {inv.minimumInvestment
                        ? `KSh ${Number(inv.minimumInvestment).toLocaleString()}`
                        : 'Not specified'}
                    </td>

                    <td className="p-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                          inv.published
                            ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400'
                            : 'bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400'
                        }`}
                      >
                        {inv.published ? 'PUBLISHED' : 'DRAFT'}
                      </span>
                    </td>

                    <td className="p-4 text-right space-x-2">
                      <Link
                        href={`/investments/${inv.slug}`}
                        target="_blank"
                        className="inline-flex p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                        title="View Public Page"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>

                      <Link
                        href={`/admin/investments/${inv.id}/edit`}
                        className="inline-flex p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/50"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}