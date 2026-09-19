// app/contact/page.tsx
import { Phone, MapPin, ShieldAlert } from 'lucide-react'

export const metadata = {
  title: 'Contact Ndegwa Investments',
  description: 'Contact Ndegwa Investments headquarters in Nairobi, Kenya. Get in touch with our team for investment inquiries.',
}

export default function ContactPage() {
  return (
    <div className="py-16 bg-slate-50 dark:bg-slate-950 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="space-y-4 text-center max-w-2xl mx-auto">
          <span className="text-emerald-600 dark:text-emerald-400 font-semibold text-xs tracking-wider uppercase">
            Get in Touch
          </span>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            Contact Ndegwa Investments
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed">
            Reach out to our Nairobi headquarters for inquiries regarding our presented investment opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Headquarters Information</h2>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-600/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white text-sm">Location</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">Nairobi, Kenya</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-600/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white text-sm">Direct Phone</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">+254 799 357 038</p>
                  <p className="text-slate-500 text-xs">0799357038</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Advisory Notice</h2>
            <div className="space-y-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              <p>
                Ndegwa Investments does not maintain a general public email address at this time. All inquiries should be directed via phone or through specific investment inquiry forms on our platform.
              </p>
              <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-500/20 text-xs text-amber-700 dark:text-amber-400 flex items-start gap-2">
                <ShieldAlert className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>We never request funds via unsecured channels or payment processors.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}