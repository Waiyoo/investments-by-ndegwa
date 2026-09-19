// app/about/page.tsx
import Link from 'next/link'
import { ShieldCheck, Building2, Target, ArrowRight } from 'lucide-react'

export const metadata = {
  title: 'About Ndegwa Investments',
  description: 'Learn about Ndegwa Investments, our mission, and our approach to presenting vetted investment opportunities in East Africa.',
}

export default function AboutPage() {
  return (
    <div className="py-16 bg-slate-50 dark:bg-slate-950 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="space-y-4 text-center max-w-2xl mx-auto">
          <span className="text-emerald-600 dark:text-emerald-400 font-semibold text-xs tracking-wider uppercase">
            Corporate Profile
          </span>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            About Ndegwa Investments
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed">
            Headquartered in Nairobi, Kenya, Ndegwa Investments is a specialized investment-opportunity presentation and lead-generation platform connecting qualified capital with high-potential commercial ventures.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-600/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Target className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Our Core Purpose</h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              We bridge the information gap between project sponsors and discerning investors. By providing rigorous transparency, detailed documentation, and structured opportunity presentations, we facilitate meaningful capital partnerships.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-600/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Rigorous Standards</h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              We maintain strict adherence to professional presentation standards. We do not engage in brokerage, forex trading, or payment processing—our focus remains strictly on high-quality opportunity presentation.
            </p>
          </div>
        </div>

        <div className="p-8 rounded-2xl bg-emerald-900 text-white space-y-6 text-center">
          <h2 className="text-2xl font-bold">Ready to Explore Active Opportunities?</h2>
          <p className="text-emerald-200 text-sm max-w-lg mx-auto">
            Browse our current catalog of verified investment opportunities across real estate, agriculture, and commercial sectors in Kenya.
          </p>
          <div>
            <Link
              href="/investments"
              className="inline-flex items-center px-8 py-3.5 rounded-xl bg-white text-slate-900 hover:bg-emerald-50 font-semibold text-sm transition-colors"
            >
              Browse Opportunities <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}