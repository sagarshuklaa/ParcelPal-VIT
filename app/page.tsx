import Link from 'next/link'
import { Package, UtensilsCrossed, Coins, BarChart3 } from 'lucide-react'

export default function Home() {
  return (
    <div className="fade-up">
      <div style={{ padding: '32px 0 24px', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(110,231,183,0.1)', border: '0.5px solid rgba(110,231,183,0.25)', borderRadius: 20, padding: '5px 14px', fontSize: 12, color: 'var(--accent)', marginBottom: 16 }}>
          Just launched at VIT Bhopal
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 800, lineHeight: 1.1, letterSpacing: -1, color: '#fff', marginBottom: 10 }}>
          Deliver and Earn<br />
          <span style={{ color: 'var(--accent)' }}>on your campus</span>
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 13, maxWidth: 320, margin: '0 auto 24px', lineHeight: 1.7 }}>
          Get your parcel or food delivered by a fellow VIT student for just Rs.10 to Rs.20.
        </p>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 28 }}>
          <Link href="/request" style={{ textDecoration: 'none' }}>
            <button style={{ background: 'var(--accent)', color: '#0a0a0f', border: 'none', borderRadius: 10, padding: '13px 28px', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>
              Post a Request
            </button>
          </Link>
          <Link href="/live" style={{ textDecoration: 'none' }}>
            <button style={{ background: 'transparent', color: 'var(--text)', border: '0.5px solid rgba(255,255,255,0.2)', borderRadius: 10, padding: '13px 28px', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 15, cursor: 'pointer' }}>
              Start Earning
            </button>
          </Link>
        </div>
      </div>

      <div style={{ background: 'rgba(110,231,183,0.06)', border: '0.5px solid rgba(110,231,183,0.2)', borderRadius: 16, padding: 18, textAlign: 'center', marginBottom: 20 }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 6 }}>Just launched - be among the first!</h3>
        <p style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
          Every big platform started with 0. Be the one who changes that.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, marginBottom: 20 }}>
        {[
          { num: '0', label: 'Deliveries', hint: 'Be first' },
          { num: 'Rs.0', label: 'Earned', hint: 'Start now' },
          { num: '0', label: 'Students', hint: 'Join' }
        ].map(s => (
          <div key={s.label} style={{ background: 'var(--bg-card)', border: '0.5px solid var(--border)', borderRadius: 12, padding: '14px 8px', textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, color: 'rgba(255,255,255,0.25)', marginBottom: 3 }}>{s.num}</div>
            <div style={{ fontSize: 11, color: 'var(--text-faint)', marginBottom: 4 }}>{s.label}</div>
            <div style={{ fontSize: 11, color: 'var(--accent)' }}>{s.hint}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 12, marginBottom: 32 }}>
        {[
          { icon: Package, title: 'Parcel Pickup', desc: 'Amazon and Flipkart parcels from the gate to your hostel.', href: '/request' },
          { icon: UtensilsCrossed, title: 'Food Delivery', desc: 'Order from Mayuri, Underbelly, Dakshin and Bistro.', href: '/request' },
          { icon: Coins, title: 'Earn Rs.10-20', desc: 'Accept requests while walking across campus.', href: '/live' },
          { icon: BarChart3, title: 'Track Earnings', desc: 'Dashboard with deliveries, earnings and leaderboard.', href: '/dashboard' },
        ].map(({ icon: Icon, title, desc, href }) => (
          <Link key={title} href={href} style={{ textDecoration: 'none' }}>
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '0.5px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: 16, height: '100%' }}>
              <div style={{ width: 34, height: 34, borderRadius: 9, background: 'rgba(110,231,183,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10, color: 'var(--accent)' }}>
                <Icon size={17} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 700, color: '#fff', marginBottom: 4 }}>{title}</h3>
              <p style={{ fontSize: 11, color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>{desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}