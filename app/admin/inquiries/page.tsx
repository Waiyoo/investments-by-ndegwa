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
    <div className="flex flex-col min-h-screen bg-[#FAF7F2] text-[#1F1A15] overflow-x-hidden antialiased">

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

      <div className="p-6 lg:p-10 max-w-[1600px] w-full mx-auto">

        {/* =========================================================================
            PAGE HEADING — INSTITUTIONAL
            ========================================================================= */}
        <div className="grid grid-cols-12 gap-8 mb-12 items-end anim-fade-up">
          <div className="col-span-12 lg:col-span-8">
            <div className="flex items-center gap-4 mb-6">
              <span className="label-inst text-[#1F1A15]/45">Inbox</span>
              <span className="w-10 h-px bg-[#A8763E]" />
            </div>
            <h1 className="font-serif font-light text-[2.5rem] sm:text-[3rem] lg:text-[3.5rem] leading-[1.02] tracking-[-0.02em] text-[#1F1A15] mb-5">
              Investment inquiries.
            </h1>
            <p className="text-[0.95rem] leading-[1.75] text-[#1F1A15]/60 max-w-xl">
              Manage inquiries submitted by potential investors.
            </p>
          </div>

          <div className="col-span-12 lg:col-span-4 lg:text-right">
            <span className="inline-flex items-center gap-3 label-inst text-[#1F1A15]/60 border border-[var(--line)] px-4 py-2.5 bg-white">
              <span className="w-1.5 h-1.5 bg-[#A8763E] rounded-full anim-blink" />
              {inquiries.length} {inquiries.length === 1 ? 'Inquiry' : 'Inquiries'}
            </span>
          </div>
        </div>

        {/* =========================================================================
            INQUIRIES TABLE
            ========================================================================= */}
        <div className="relative bg-white border border-[var(--line)] anim-fade-up d-2">
          {/* Top accent hairline */}
          <div className="absolute top-0 left-0 w-24 h-px bg-[#A8763E]" />

          {inquiries.length === 0 ? (
            /* Empty state */
            <div className="p-16 lg:p-24 text-center">
              <div className="w-16 h-16 mx-auto mb-8 border border-[#1F1A15] flex items-center justify-center text-[#1F1A15]">
                <Mail className="w-6 h-6" strokeWidth={1.5} />
              </div>

              <h3 className="font-serif text-[1.75rem] lg:text-[2.25rem] font-normal tracking-[-0.01em] text-[#1F1A15] mb-4">
                No investment inquiries yet
              </h3>

              <p className="text-[0.95rem] leading-[1.85] text-[#1F1A15]/60 max-w-md mx-auto">
                Investor inquiries submitted through investment detail pages will appear here.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                {/* Header */}
                <thead className="border-b border-[var(--line)]">
                  <tr>
                    {[
                      { label: 'Investor', align: 'left' },
                      { label: 'Investment', align: 'left' },
                      { label: 'Amount', align: 'left' },
                      { label: 'Status', align: 'left' },
                      { label: 'Date', align: 'left' },
                      { label: 'Action', align: 'right' },
                    ].map((col, i) => (
                      <th
                        key={i}
                        className={`px-6 lg:px-8 py-5 label-inst text-[#1F1A15]/45 ${
                          col.align === 'right' ? 'text-right' : 'text-left'
                        }`}
                      >
                        {col.label}
                      </th>
                    ))}
                  </tr>
                </thead>

                {/* Body */}
                <tbody>
                  {inquiries.map((inquiry, idx) => (
                    <tr
                      key={inquiry.id}
                      className="border-b border-[var(--line)] last:border-b-0 hover:bg-[#F1EBE1]/50 transition-colors duration-300 anim-fade-up"
                      style={{ animationDelay: `${Math.min(idx * 0.04, 0.4)}s` }}
                    >
                      {/* Investor */}
                      <td className="px-6 lg:px-8 py-6 align-top">
                        <div className="font-serif text-base font-normal text-[#1F1A15] mb-3">
                          {inquiry.name}
                        </div>

                        <div className="flex items-center gap-3 label-inst-sm text-[#1F1A15]/50 mb-2">
                          <Mail className="w-3 h-3 text-[#A8763E]" strokeWidth={1.75} />
                          <span className="normal-case tracking-normal text-[0.75rem] font-mono">{inquiry.email}</span>
                        </div>

                        <div className="flex items-center gap-3 label-inst-sm text-[#1F1A15]/50">
                          <Phone className="w-3 h-3 text-[#A8763E]" strokeWidth={1.75} />
                          <span className="normal-case tracking-normal text-[0.75rem] font-mono">{inquiry.phone}</span>
                        </div>
                      </td>

                      {/* Investment */}
                      <td className="px-6 lg:px-8 py-6 align-top">
                        <span className="font-serif text-base font-normal text-[#1F1A15]">
                          {inquiry.investmentOpportunity.title}
                        </span>
                      </td>

                      {/* Amount */}
                      <td className="px-6 lg:px-8 py-6 align-top">
                        <span className="font-mono text-[0.8rem] text-[#1F1A15]/85">
                          {inquiry.amountInterested
                            ? `KSh ${Number(inquiry.amountInterested).toLocaleString()}`
                            : 'Not specified'}
                        </span>
                      </td>

                      {/* Status — institutional chip */}
                      <td className="px-6 lg:px-8 py-6 align-top">
                        <span
                          className={`inline-flex items-center gap-2 px-3 py-1.5 label-inst-sm border ${
                            inquiry.status === 'NEW'
                              ? 'border-[#A8763E]/40 text-[#7A5222] bg-[#A8763E]/[0.06]'
                              : inquiry.status === 'CONTACTED'
                                ? 'border-[#1F1A15]/30 text-[#1F1A15]/70 bg-[#F1EBE1]'
                                : 'border-[#1F1A15]/20 text-[#1F1A15]/50 bg-transparent'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 ${
                              inquiry.status === 'NEW'
                                ? 'bg-[#A8763E] rounded-full anim-blink'
                                : inquiry.status === 'CONTACTED'
                                  ? 'bg-[#1F1A15]/50 rounded-full'
                                  : 'bg-[#1F1A15]/30 rounded-full'
                            }`}
                          />
                          {inquiry.status}
                        </span>
                      </td>

                      {/* Date */}
                      <td className="px-6 lg:px-8 py-6 align-top">
                        <span className="font-mono text-[0.75rem] text-[#1F1A15]/55 whitespace-nowrap">
                          {new Date(inquiry.createdAt).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </span>
                      </td>

                      {/* Action */}
                      <td className="px-6 lg:px-8 py-6 align-top text-right">
                        <Link
                          href={`/admin/inquiries/${inquiry.id}`}
                          className="group inline-flex items-center gap-3 border border-[#1F1A15] hover:bg-[#1F1A15] hover:text-white text-[#1F1A15] label-inst-sm px-4 py-2.5 transition-colors duration-500"
                        >
                          <Eye className="w-3 h-3" strokeWidth={1.75} />
                          <span>View</span>
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
    </div>
  )
}