// app/layout.tsx
import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/public/navbar'
import Footer from '@/components/public/footer'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://ndegwa-investments.co.ke'),
  title: {
    default: 'Ndegwa Investments | Curated Investment Opportunities in East Africa',
    template: '%s | Ndegwa Investments',
  },
  description: 'Connecting discerning investors with vetted commercial, real estate, and agricultural investment opportunities in Kenya and East Africa.',
  keywords: ['investments', 'Kenya', 'East Africa', 'real estate', 'agriculture', 'wealth management', 'business opportunities'],
  openGraph: {
    type: 'website',
    locale: 'en_KE',
    url: 'https://ndegwa-investments.co.ke',
    siteName: 'Ndegwa Investments',
    title: 'Ndegwa Investments | Curated Opportunities',
    description: 'Vetted investment opportunities connecting capital with high-potential ventures.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${jakarta.variable} h-full`} suppressHydrationWarning>
      <body className="font-sans antialiased bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 min-h-screen flex flex-col selection:bg-emerald-500 selection:text-white">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  )
}