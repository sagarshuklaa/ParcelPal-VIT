import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'

export const metadata: Metadata = {
  title: 'ParcelPal VIT - Campus Delivery Network',
  description: 'Peer-to-peer parcel and food delivery for VIT Bhopal students.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="max-w-2xl mx-auto px-4 pb-20">
          {children}
        </main>
      </body>
    </html>
  )
}