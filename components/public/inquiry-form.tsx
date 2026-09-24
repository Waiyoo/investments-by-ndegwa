// components/public/inquiry-form.tsx
'use client'

import { useState } from 'react'
import { submitInvestmentInquiry } from '@/app/actions/public'
import { Send, CheckCircle2, AlertCircle, Loader2, ShieldCheck, Lock, Clock } from 'lucide-react'

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
    <div className="bg-[#FAF7F2] border border-[rgba(31,26,21,0.10)] relative overflow-hidden">

      {/* Top accent rule */}
      <span className="absolute top-0 left-0 right-0 h-px bg-[#A8763E]" />

      {/* Header */}
      <div className="p-8 lg:p-10 border-b border-[rgba(31,26,21,0.10)]">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-8 h-px bg-[#A8763E]" />
          <span className="label-inst text-[#1F1A15]/45">Reserve Participation</span>
        </div>
        <h3 className="font-serif text-[1.75rem] lg:text-[2rem] font-normal tracking-[-0.01em] text-[#1F1A15] mb-3">
          Secure your allocation.
        </h3>
        <p className="text-sm leading-[1.7] text-[#1F1A15]/60">
          Registering for: <strong className="font-serif text-[#A8763E] font-normal text-base">{investmentTitle}</strong>
        </p>
      </div>

      {success ? (
        <div className="p-8 lg:p-10 space-y-6">
          <div className="flex items-start gap-4">
            <CheckCircle2 className="w-8 h-8 text-[#A8763E] flex-shrink-0 mt-0.5" strokeWidth={1.25} />
            <div className="space-y-3">
              <h4 className="font-serif text-[1.5rem] font-normal text-[#1F1A15]">
                Participation reserved.
              </h4>
              <p className="text-sm leading-[1.75] text-[#1F1A15]/65">
                Your submission has been logged. Our advisory team will review your allocation and reach out within one business day to confirm deposit instructions and complete the funding process.
              </p>
            </div>
          </div>

          {/* Next-step checklist */}
          <div className="border-t border-[rgba(31,26,21,0.10)] pt-6 space-y-4">
            {[
              { icon: Clock, k: 'Next step', v: 'Advisory review within 24 hours' },
              { icon: ShieldCheck, k: 'Verification', v: 'Compliance & KYC confirmation' },
              { icon: Lock, k: 'Funding', v: 'Secure deposit instructions issued' },
            ].map((step, i) => (
              <div key={i} className="flex items-center gap-4">
                <step.icon className="w-4 h-4 text-[#A8763E] flex-shrink-0" strokeWidth={1.5} />
                <div className="flex-1 flex items-baseline justify-between gap-4">
                  <span className="label-inst text-[#1F1A15]/45">{step.k}</span>
                  <span className="text-sm text-[#1F1A15]/85 text-right">{step.v}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="p-8 lg:p-10 space-y-5">

          {errorMessage && (
            <div className="p-4 border border-[#A8763E]/30 bg-[#A8763E]/[0.06] flex items-start gap-3 text-sm text-[#7A5222]">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
              <span className="leading-[1.6]">{errorMessage}</span>
            </div>
          )}

          <div className="space-y-2">
            <label className="label-inst text-[#1F1A15]/60 block">Full Name <span className="text-[#A8763E]">*</span></label>
            <input
              type="text"
              name="name"
              required
              placeholder="e.g. David Ndegwa"
              className="w-full px-4 py-3 bg-white border border-[rgba(31,26,21,0.15)] text-sm text-[#1F1A15] placeholder:text-[#1F1A15]/35 focus:outline-none focus:border-[#A8763E] focus:ring-1 focus:ring-[#A8763E]/30 transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="label-inst text-[#1F1A15]/60 block">Email <span className="text-[#A8763E]">*</span></label>
              <input
                type="email"
                name="email"
                required
                placeholder="david@example.com"
                className="w-full px-4 py-3 bg-white border border-[rgba(31,26,21,0.15)] text-sm text-[#1F1A15] placeholder:text-[#1F1A15]/35 focus:outline-none focus:border-[#A8763E] focus:ring-1 focus:ring-[#A8763E]/30 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="label-inst text-[#1F1A15]/60 block">Phone <span className="text-[#A8763E]">*</span></label>
              <input
                type="tel"
                name="phone"
                required
                placeholder="+254 700 000000"
                className="w-full px-4 py-3 bg-white border border-[rgba(31,26,21,0.15)] text-sm text-[#1F1A15] placeholder:text-[#1F1A15]/35 focus:outline-none focus:border-[#A8763E] focus:ring-1 focus:ring-[#A8763E]/30 transition-colors"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="label-inst text-[#1F1A15]/60 block">
              Intended Deposit (KSh) <span className="text-[#1F1A15]/35 normal-case tracking-normal">— optional</span>
            </label>
            <input
              type="number"
              name="amountInterested"
              placeholder="e.g. 5000000"
              className="w-full px-4 py-3 bg-white border border-[rgba(31,26,21,0.15)] text-sm text-[#1F1A15] placeholder:text-[#1F1A15]/35 focus:outline-none focus:border-[#A8763E] focus:ring-1 focus:ring-[#A8763E]/30 transition-colors font-mono"
            />
            <p className="text-xs text-[#1F1A15]/50 leading-[1.6] pt-1">
              Indicating an amount helps us prepare the correct allocation documents. No commitment is made at this stage.
            </p>
          </div>

          <div className="space-y-2">
            <label className="label-inst text-[#1F1A15]/60 block">Message / Questions <span className="text-[#A8763E]">*</span></label>
            <textarea
              name="message"
              required
              rows={4}
              placeholder="Share any questions, or specify your objectives for this investment..."
              className="w-full px-4 py-3 bg-white border border-[rgba(31,26,21,0.15)] text-sm text-[#1F1A15] placeholder:text-[#1F1A15]/35 focus:outline-none focus:border-[#A8763E] focus:ring-1 focus:ring-[#A8763E]/30 transition-colors resize-none leading-[1.7]"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="group w-full flex items-center justify-between gap-4 bg-[#A8763E] hover:bg-[#1F1A15] disabled:bg-[#A8763E]/40 disabled:cursor-not-allowed text-white label-inst px-6 py-4 transition-colors duration-500"
          >
            {submitting ? (
              <>
                <span className="flex items-center gap-3">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Reserving your allocation…</span>
                </span>
              </>
            ) : (
              <>
                <span className="flex items-center gap-3">
                  <Send className="w-4 h-4" />
                  <span>Reserve Deposit</span>
                </span>
                <span className="text-white/70 text-[0.6rem] tracking-[0.24em]">
                  STEP 01 / 03
                </span>
              </>
            )}
          </button>

          {/* Trust signals */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[rgba(31,26,21,0.10)]">
            {[
              { icon: ShieldCheck, k: 'Secure' },
              { icon: Lock, k: 'Confidential' },
              { icon: Clock, k: '24h Reply' },
            ].map((t, i) => (
              <div key={i} className="flex items-center gap-2 justify-center">
                <t.icon className="w-3.5 h-3.5 text-[#A8763E]" strokeWidth={1.5} />
                <span className="label-inst text-[#1F1A15]/50">{t.k}</span>
              </div>
            ))}
          </div>
        </form>
      )}
    </div>
  )
}