'use client'

import { useState } from 'react'
import { ArrowUpRight, Send, MessageCircle, Mail, CheckCircle2, AlertCircle } from 'lucide-react'

type Status = 'idle' | 'sending' | 'sent' | 'error'

export default function ContactForm() {
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [need, setNeed] = useState('')
  const [channel, setChannel] = useState<'email' | 'whatsapp'>('email')
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name || !contact || !need) {
      setError('Please fill in your name, contact, and what you need.')
      return
    }
    setError('')
    setStatus('sending')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, contact, need, channel }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to send')

      // If WhatsApp, open the link returned by the API
      if (data.whatsappUrl) {
        window.open(data.whatsappUrl, '_blank', 'noopener')
      }

      setStatus('sent')
      setName(''); setContact(''); setNeed('')
    } catch (err: any) {
      setError(err.message || 'Something went wrong.')
      setStatus('error')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-[var(--line)] p-10 lg:p-14 anim-fade-up"
    >
      <span className="label-inst text-[#1F1A15]/45 block mb-3">Inquiry form</span>
      <h3 className="font-serif text-[1.75rem] lg:text-[2.25rem] font-normal text-[#1F1A15] leading-[1.15] mb-8 max-w-[22ch]">
        Tell us what you need.
      </h3>

      <div className="flex flex-col gap-5">
        {/* Name */}
        <label className="flex flex-col gap-2">
          <span className="label-inst-sm text-[#1F1A15]/55">Full name</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-[var(--line)] bg-transparent px-4 py-3 text-[0.95rem] text-[#1F1A15] outline-none focus:border-[#A8763E] transition-colors"
            placeholder="Jane Doe"
            required
          />
        </label>

        {/* Contact */}
        <label className="flex flex-col gap-2">
          <span className="label-inst-sm text-[#1F1A15]/55">Email or phone</span>
          <input
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className="border border-[var(--line)] bg-transparent px-4 py-3 text-[0.95rem] text-[#1F1A15] outline-none focus:border-[#A8763E] transition-colors"
            placeholder="you@example.com  ·  +254…"
            required
          />
        </label>

        {/* Need */}
        <label className="flex flex-col gap-2">
          <span className="label-inst-sm text-[#1F1A15]/55">What do you need?</span>
          <textarea
            value={need}
            onChange={(e) => setNeed(e.target.value)}
            rows={5}
            className="border border-[var(--line)] bg-transparent px-4 py-3 text-[0.95rem] text-[#1F1A15] outline-none focus:border-[#A8763E] transition-colors resize-none"
            placeholder="Describe your investment inquiry, question, or request…"
            required
          />
        </label>

        {/* Channel */}
        <div className="flex flex-col gap-2">
          <span className="label-inst-sm text-[#1F1A15]/55">Preferred channel</span>
          <div className="grid grid-cols-2 gap-0 border border-[var(--line)]">
            <button
              type="button"
              onClick={() => setChannel('email')}
              className={`flex items-center justify-center gap-2 py-3 label-inst transition-colors ${
                channel === 'email'
                  ? 'bg-[#A8763E] text-white'
                  : 'bg-transparent text-[#1F1A15]/70 hover:bg-[#A8763E]/10'
              }`}
            >
              <Mail className="w-3.5 h-3.5" strokeWidth={1.5} /> Email
            </button>
            <button
              type="button"
              onClick={() => setChannel('whatsapp')}
              className={`flex items-center justify-center gap-2 py-3 label-inst transition-colors border-l border-[var(--line)] ${
                channel === 'whatsapp'
                  ? 'bg-[#A8763E] text-white'
                  : 'bg-transparent text-[#1F1A15]/70 hover:bg-[#A8763E]/10'
              }`}
            >
              <MessageCircle className="w-3.5 h-3.5" strokeWidth={1.5} /> WhatsApp
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="flex items-start gap-3 border-l-2 border-red-500 bg-red-500/5 px-4 py-3">
            <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" strokeWidth={1.75} />
            <span className="text-sm text-red-700">{error}</span>
          </div>
        )}

        {/* Success */}
        {status === 'sent' && (
          <div className="flex items-start gap-3 border-l-2 border-[#A8763E] bg-[#A8763E]/[0.06] px-4 py-3">
            <CheckCircle2 className="w-4 h-4 text-[#A8763E] flex-shrink-0 mt-0.5" strokeWidth={1.75} />
            <span className="text-sm text-[#1F1A15]/80">
              Your message has been sent. We'll respond within 24 hours.
            </span>
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={status === 'sending'}
          className="group flex items-center justify-between gap-6 bg-[#A8763E] hover:bg-[#1F1A15] disabled:opacity-60 disabled:cursor-not-allowed text-white label-inst px-6 py-5 mt-2 transition-colors duration-500"
        >
          <span className="flex items-center gap-3">
            <Send className="w-4 h-4" strokeWidth={1.5} />
            {status === 'sending' ? 'Sending…' : 'Send Message'}
          </span>
          <ArrowUpRight className="w-4 h-4 transition-transform duration-500 group-hover:rotate-45" />
        </button>
      </div>
    </form>
  )
}