import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import ErrorBoundary from '@/components/ErrorBoundary'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
})

export const metadata: Metadata = {
  title: 'Interactive Calendar',
  description: 'A premium, production-quality interactive calendar component for planning your days with elegance',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </body>
    </html>
  )
}