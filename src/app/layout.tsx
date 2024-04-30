import './globals.css'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Lingos AI',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}
