import Link from 'next/link'
import { Rocket, Package, UtensilsCrossed, Coins, BarChart3 } from 'lucide-react'

export default function Home() {
  return (
    <div className="fade-up">
      <div style={{ padding: '48px 0 28px', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(110,231,183,0.1)', border: '0.5px solid rgba(110,231,183,0.25)', borderRadius: 20, padding: '5px 14px', fontSize: 12, color: 'var(--accent)', marginBottom: 20 }}>
          Just launched at VIT Bhopal
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(30px,7vw,42px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: -1.5, color: '#fff', marginBottom: 12 }}>
          Deliver and Earn on your campus
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 14, maxWidth: 340, margin: '0 auto 28px', lineHeight: 1.7 }}>
          Post a request in seconds. Get your parcel or food delivered by a fellow VIT student for just Rs.10 to Rs.20.
        </p>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 40 }}>
          <Link href="/request" style={{ textDecoration: 'none' }}>
            <button style={{ background: 'var(--accent)', color: '#0a0a0f', border: 'none', borderRadius: 10, padding: '12px 24px', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>
              Post First Request
            </button>
          </Link>
          <Link href="/live" style={{ textDecoration: 'none' }}>
            <button style={{ background: 'transparent', color: 'var(--text)', border: '0.5px solid rgba(255,255,255,0.2)', borderRadius: 10, padding: '12px 24px', fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: 14, cursor: 'pointer' }}>
              Start Earning
            </button>
          </Link>
        </div>
      </div>

      <div style={{ background: 'rgba(110,231,183,0.06)', border: '0.5px solid rgba(110,231,183,0.2)', borderRadius: 16, padding: 20, textAlign: 'center', marginBottom: 24 }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 6 }}>We just launched - be among the first!</h3>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.7 }}>
          No deliveries yet, no earnings yet - because you have not started yet.
          Every big platform started with 0. Be the one who changes that.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 24 }}>
        {[{ num: '0', label: 'Deliveries', hint: 'Be first' },{ num: '0', label: 'Earned', hint: 'Start now' },{ num: '0', label: 'Students', hint: 'Join' }].map(s => (
          <div key={s.label} style={{ background: 'var(--bg-card)', border: '0.5px solid var(--border)', borderRadius: 14, padding: 16, textAlign: 'center' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color: 'rgba(255,255,255,0.2)' }}>{s.num}</span>
            <div style={{ fontSize: 11, color: 'var(--text-faint)', marginTop: 4 }}>{s.label}</div>
            <div style={{ fontSize: 11, color: 'var(--accent)', marginTop: 5 }}>{s.hint}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 12, marginBottom: 32 }}>
        {[
          { icon: Package, title: 'Parcel Pickup', desc: 'Get Amazon and Flipkart parcels from the gate to your hostel.', href: '/request' },
          { icon: UtensilsCrossed, title: 'Food Delivery', desc: 'Order from Mayuri, Underbelly and Safal Mart anytime.', href: '/request' },
          { icon: Coins, title: 'Earn Rs.10-20', desc: 'Accept requests while walking across campus.', href: '/live' },
          { icon: BarChart3, title: 'Track Earnings', desc: 'Dashboard with your deliveries, earnings and leaderboard.', href: '/dashboard' },
        ].map(({ icon: Icon, title, desc, href }) => (
          <Link key={title} href={href} style={{ textDecoration: 'none' }}>
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '0.5px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: 18, cursor: 'pointer', height: '100%' }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(110,231,183,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12, color: 'var(--accent)' }}>
                <Icon size={18} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 5 }}>{title}</h3>
              <p style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.5 }}>{desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}