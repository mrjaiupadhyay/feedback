import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Feedback System',
  description: 'A modern feedback collection system',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
