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
        <main style={{ maxWidth: 680, margin: '0 auto', padding: '0 16px 100px 16px' }}>
          {children}
        </main>
      </body>
    </html>
  )
}