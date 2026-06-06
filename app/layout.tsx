import type { Metadata } from 'next'
import { Inter, Fira_Code } from 'next/font/google'
import { Providers } from './providers'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const firaCode = Fira_Code({
  subsets: ['latin'],
  variable: '--font-fira-code',
  weight: ['300', '400', '500'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Shailendra Singh — Senior Backend & AI Platform Engineer',
  description:
    'Architecting high-performance distributed systems and AI-powered platforms. Senior Java Backend Engineer at SAP.',
  keywords: ['Backend Engineer', 'AI Platform', 'Distributed Systems', 'Java', 'LangGraph', 'SAP'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${firaCode.variable} font-sans antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
