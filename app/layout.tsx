// app/layout.tsx
import type { Metadata } from 'next'
import { Inter, Cormorant_Garamond, IBM_Plex_Mono } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/public/navbar'
import Footer from '@/components/public/footer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
})

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500', '600'],
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
    <html
      lang="en"
      className={`${inter.variable} ${cormorant.variable} ${plexMono.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased bg-[#FBFBF9] text-[#0E0E0E] min-h-screen flex flex-col selection:bg-[#B01E28] selection:text-white">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  )
}