import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Pizzeria Romantica | Authentic Italian Pizza in Hagen',
  description: 'Experience authentic Italian pizza in Hagen, Germany. Family recipes, cozy atmosphere, generous portions. Dine-in, takeout & delivery available. ⭐ 4.8 rating.',
  keywords: ['pizza', 'italian restaurant', 'hagen', 'pizzeria', 'romantica', 'delivery', 'takeout'],
  openGraph: {
    title: 'Pizzeria Romantica | Authentic Italian Pizza in Hagen',
    description: 'Experience authentic Italian pizza in Hagen, Germany. Family recipes, cozy atmosphere, generous portions.',
    type: 'website',
    locale: 'de_DE',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FAF6F0' },
    { media: '(prefers-color-scheme: dark)', color: '#1A1512' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="de" className={`${inter.variable} ${playfair.variable} bg-background`} suppressHydrationWarning>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
