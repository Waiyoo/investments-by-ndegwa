// components/public/inquiry-form.tsx
'use client'

import { useState } from 'react'
import { submitInvestmentInquiry } from '@/app/actions/public'
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'

export default function InquiryForm({ investmentId, investmentTitle }: { investmentId: string; investmentTitle: string }) {
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)
    setErrorMessage(null)

    const formData = new FormData(e.currentTarget)
    const payload = {
      investmentOpportunityId: investmentId,
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      amountInterested: formData.get('amountInterested') ? Number(formData.get('amountInterested')) : undefined,
      message: formData.get('message') as string,
    }

    try {
      const res = await submitInvestmentInquiry(payload)
      if (res.success) {
        setSuccess(true)
      } else {
        setErrorMessage(res.error || 'Failed to submit inquiry. Please check your information.')
      }
    } catch (err) {
      setErrorMessage('An unexpected error occurred. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
      <div className="space-y-2 mb-6">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Express Interest</h3>
        <p className="text-xs text-slate-500">
          Enquiring for: <strong className="text-emerald-600 dark:text-emerald-400">{investmentTitle}</strong>
        </p>
      </div>

      {success ? (
        <div className="p-6 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-500/20 text-center space-y-3">
          <CheckCircle2 className="w-12 h-12 text-emerald-600 dark:text-emerald-400 mx-auto" />
          <h4 className="font-bold text-slate-900 dark:text-white text-base">Inquiry Successfully Submitted</h4>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Thank you for your interest. Our advisory team will review your submission and contact you shortly at the provided phone number or email address.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {errorMessage && (
            <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/50 border border-red-500/20 flex items-center gap-2 text-xs text-red-600 dark:text-red-400">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Your Full Name *</label>
            <input
              type="text"
              name="name"
              required
              placeholder="e.g. David Ndegwa"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Email Address *</label>
            <input
              type="email"
              name="email"
              required
              placeholder="e.g. david@example.com"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Phone Number *</label>
            <input
              type="tel"
              name="phone"
              required
              placeholder="e.g. +254 700 000000"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Amount Interested (KSh) (Optional)</label>
            <input
              type="number"
              name="amountInterested"
              placeholder="e.g. 5000000"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Message / Questions *</label>
            <textarea
              name="message"
              required
              rows={4}
              placeholder="Please share any questions or specify your investment objectives..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full flex items-center justify-center py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-400 text-white font-medium text-sm transition-all shadow-sm"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Submitting Inquiry...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Submit Investment Interest
              </>
            )}
          </button>
        </form>
      )}
    </div>
  )
}