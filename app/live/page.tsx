'use client'
import Link from 'next/link'
import { MapPin } from 'lucide-react'

export default function LivePage() {
  return (
    <div className="fade-up" style={{ paddingTop: 28 }}>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 6 }}>Live Requests</h1>
      <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 24 }}>Accept a delivery near your route and earn</p>

      <div style={{ textAlign: 'center', padding: '60px 24px', background: 'var(--bg-card)', border: '0.5px solid var(--border)', borderRadius: 16 }}>
        <MapPin size={40} style={{ color: 'rgba(255,255,255,0.1)', marginBottom: 16 }} />
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, color: 'rgba(255,255,255,0.3)', marginBottom: 8 }}>No active requests yet</h3>
        <p style={{ fontSize: 13, color: 'var(--text-faint)', lineHeight: 1.7, maxWidth: 240, margin: '0 auto 24px' }}>
          Once someone posts a delivery request, it will show up here. Be the first to post one!
        </p>
        <Link href="/request" style={{ textDecoration: 'none' }}>
          <button style={{ background: 'var(--accent)', color: '#0a0a0f', border: 'none', borderRadius: 10, padding: '12px 24px', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>
            Post the first request
          </button>
        </Link>
      </div>
    </div>
  )
}