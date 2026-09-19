// app/admin/inquiries/page.tsx
import { db } from '@/lib/db'
import { Mail, Phone, Eye } from 'lucide-react'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function AdminInquiriesPage() {
  const inquiries = await db.investmentInquiry.findMany({
    include: {
      investmentOpportunity: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Investment Inquiries
        </h1>

        <p className="mt-1 text-slate-600 dark:text-slate-400">
          Manage inquiries submitted by potential investors.
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
        {inquiries.length === 0 ? (
          <div className="p-10 text-center text-slate-500 dark:text-slate-400">
            No investment inquiries yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800">
                <tr>
                  <th className="p-4 text-left text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Investor
                  </th>

                  <th className="p-4 text-left text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Investment
                  </th>

                  <th className="p-4 text-left text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Amount
                  </th>

                  <th className="p-4 text-left text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Status
                  </th>

                  <th className="p-4 text-left text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Date
                  </th>

                  <th className="p-4 text-right text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {inquiries.map((inquiry) => (
                  <tr
                    key={inquiry.id}
                    className="border-b border-slate-100 last:border-0 dark:border-slate-800"
                  >
                    <td className="p-4">
                      <div className="font-semibold text-slate-900 dark:text-white">
                        {inquiry.name}
                      </div>

                      <div className="mt-1 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                        <Mail className="h-4 w-4" />
                        {inquiry.email}
                      </div>

                      <div className="mt-1 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                        <Phone className="h-4 w-4" />
                        {inquiry.phone}
                      </div>
                    </td>

                    <td className="p-4">
                      <div className="font-medium text-slate-900 dark:text-white">
                        {inquiry.investmentOpportunity.title}
                      </div>
                    </td>

                    <td className="p-4 text-slate-700 dark:text-slate-300">
                      {inquiry.amountInterested
                        ? `KSh ${Number(
                            inquiry.amountInterested
                          ).toLocaleString()}`
                        : 'Not specified'}
                    </td>

                    <td className="p-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                          inquiry.status === 'NEW'
                            ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                            : inquiry.status === 'CONTACTED'
                              ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                              : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                        }`}
                      >
                        {inquiry.status}
                      </span>
                    </td>

                    <td className="p-4 text-sm text-slate-600 dark:text-slate-400">
                      {new Date(inquiry.createdAt).toLocaleDateString()}
                    </td>

                    <td className="p-4 text-right">
                      <Link
                        href={`/admin/inquiries/${inquiry.id}`}
                        className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                      >
                        <Eye className="h-4 w-4" />
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}