// components/public/footer.tsx
import Link from 'next/link'
import { Phone, MapPin, ShieldAlert, ArrowRight } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-12 border-b border-slate-800">
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-500 flex items-center justify-center text-white font-bold">
                NI
              </div>
              <span className="font-bold text-xl text-white tracking-tight">
                Ndegwa Investments
              </span>
            </div>
            <p className="text-slate-400 text-sm max-w-md leading-relaxed">
              Presenting curated, high-potential commercial, agricultural, and real estate investment opportunities in Nairobi and across Kenya. Connecting qualified capital with vetted ventures.
            </p>
            <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/50 text-xs text-slate-400 space-y-1.5">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                <ShieldAlert className="w-4 h-4 flex-shrink-0" />
                <span>Regulatory Disclaimer & Notice</span>
              </div>
              <p>
                Ndegwa Investments operates exclusively as an investment-opportunity presentation and lead-generation platform. We do not operate as a brokerage, forex platform, or online payment processor.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/investments" className="hover:text-emerald-400 transition-colors">
                  Browse Opportunities
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-emerald-400 transition-colors">
                  About Ndegwa Investments
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-emerald-400 transition-colors">
                  Contact Our Team
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="hover:text-emerald-400 transition-colors text-xs text-slate-500">
                  Administrator Portal
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">
              Headquarters
            </h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>Nairobi, Kenya</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <div className="flex flex-col">
                  <span>+254 799 357 038</span>
                  <span className="text-xs text-slate-500">0799357038</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Ndegwa Investments. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Nairobi, Kenya</span>
            <span>Currency: KSh</span>
          </div>
        </div>
      </div>
    </footer>
  )
}