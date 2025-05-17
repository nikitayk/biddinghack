import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: "BIDWIT - AI RTB Bidding Optimizer",
  description: "AI-powered Real-Time Bidding platform for digital ad campaigns",

}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}



