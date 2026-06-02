import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="fade-up" style={{ paddingTop: 28, paddingBottom: 40 }}>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 6 }}>About ParcelPal</h1>
      <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 28 }}>How it works and rules everyone must follow</p>

      <div style={{ background: 'rgba(110,231,183,0.06)', border: '0.5px solid rgba(110,231,183,0.2)', borderRadius: 16, padding: 20, marginBottom: 20 }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 12 }}>What is ParcelPal?</h2>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.8, margin: 0 }}>
          ParcelPal is a peer-to-peer campus delivery platform built for VIT Bhopal students. 
          If you are busy and need someone to pick up your parcel from the gate or get food from the canteen, 
          post a request and a fellow student will do it for a small fee. 
          If you are already walking that way, accept a request and earn Rs.10 to Rs.20.
        </p>
      </div>

      <div style={{ background: 'var(--bg-card)', border: '0.5px solid var(--border)', borderRadius: 16, padding: 20, marginBottom: 20 }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 16 }}>How It Works</h2>
        {[
          { num: '01', title: 'Post a Request', desc: 'Enter pickup location, drop location, your name and contact. Choose parcel or food.' },
          { num: '02', title: 'Delivery Person Accepts', desc: 'A nearby student sees your request, enters their name and contact, and accepts it.' },
          { num: '03', title: 'Item is Delivered', desc: 'The delivery person brings your item to your hostel room or location.' },
          { num: '04', title: 'Pay Cash Directly', desc: 'Pay the delivery fee in cash directly to the delivery person. No online payment needed.' },
        ].map(s => (
          <div key={s.num} style={{ display: 'flex', gap: 14, marginBottom: 16 }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 800, color: 'var(--accent)', opacity: 0.4, flexShrink: 0, width: 28 }}>{s.num}</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#fff', marginBottom: 3 }}>{s.title}</div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6 }}>{s.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ background: 'var(--bg-card)', border: '0.5px solid var(--border)', borderRadius: 16, padding: 20, marginBottom: 20 }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 4 }}>Delivery Fees</h2>
        <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 16 }}>Paid in cash directly to the delivery person</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <div style={{ background: 'rgba(110,231,183,0.06)', border: '0.5px solid rgba(110,231,183,0.2)', borderRadius: 12, padding: 16, textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 800, color: 'var(--accent)', marginBottom: 4 }}>Rs.10</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Parcel Pickup</div>
          </div>
          <div style={{ background: 'rgba(251,191,36,0.06)', border: '0.5px solid rgba(251,191,36,0.2)', borderRadius: 12, padding: 16, textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 800, color: '#fbbf24', marginBottom: 4 }}>Rs.15</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Food Order</div>
          </div>
        </div>
      </div>

      <div style={{ background: 'rgba(251,113,133,0.06)', border: '0.5px solid rgba(251,113,133,0.2)', borderRadius: 16, padding: 20, marginBottom: 20 }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 16 }}>Rules and Regulations</h2>
        {[
          { rule: 'Always share your real name and contact number when posting or accepting a request.' },
          { rule: 'Payment is always in cash, directly between requester and delivery person. No advance payment.' },
          { rule: 'Delivery person must not open, tamper with, or damage any parcel.' },
          { rule: 'Requester must be available on their contact number when delivery is on the way.' },
          { rule: 'Do not use ParcelPal for illegal items, alcohol, or anything banned on campus.' },
          { rule: 'Delivery person can cancel a request before pickup if unable to complete it.' },
          { rule: 'Disputes between students are their own responsibility. ParcelPal is only a platform.' },
          { rule: 'Misuse of the platform will result in permanent ban from ParcelPal.' },
        ].map((item, i) => (
          <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#fb7185', marginTop: 6, flexShrink: 0 }} />
            <div style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.7 }}>{item.rule}</div>
          </div>
        ))}
      </div>

      <div style={{ background: 'var(--bg-card)', border: '0.5px solid var(--border)', borderRadius: 16, padding: 20, marginBottom: 20 }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 12 }}>Safety Tips</h2>
        {[
          'Only accept requests from VIT Bhopal students.',
          'Meet in common areas like hostel lobbies or canteen — not inside rooms.',
          'If something feels wrong, cancel the request and report it.',
          'Keep a screenshot of the request details before accepting.',
        ].map((tip, i) => (
          <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
            <div style={{ fontSize: 13, color: 'var(--accent)', flexShrink: 0 }}>✓</div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6 }}>{tip}</div>
          </div>
        ))}
      </div>

      <div style={{ background: 'rgba(110,231,183,0.04)', border: '0.5px solid rgba(110,231,183,0.15)', borderRadius: 12, padding: 16, textAlign: 'center' }}>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.7, margin: '0 0 12px' }}>
          Built by students, for students at VIT Bhopal.
        </p>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <button style={{ background: 'var(--accent)', color: '#0a0a0f', border: 'none', borderRadius: 10, padding: '11px 22px', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>
            Get Started
          </button>
        </Link>
      </div>
    </div>
  )
}