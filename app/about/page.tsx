import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function AboutPage() {
  return (
    <div style={{ paddingTop:20, paddingBottom:40 }}>
      <Link href="/" style={{ display:'inline-flex', alignItems:'center', gap:6, color:'var(--text-muted)', textDecoration:'none', fontSize:13, marginBottom:16, fontFamily:'var(--font-body)' }}>
        <ArrowLeft size={16} /> Back
      </Link>

      <h1 style={{ fontFamily:'var(--font-display)', fontSize:22, fontWeight:800, color:'#fff', marginBottom:6 }}>About ParcelPal</h1>
      <p style={{ color:'var(--text-muted)', fontSize:13, marginBottom:28 }}>How it works and rules everyone must follow</p>

      <div style={{ background:'rgba(110,231,183,0.06)', border:'0.5px solid rgba(110,231,183,0.2)', borderRadius:16, padding:20, marginBottom:20 }}>
        <h2 style={{ fontFamily:'var(--font-display)', fontSize:16, fontWeight:700, color:'#fff', marginBottom:12 }}>What is ParcelPal?</h2>
        <p style={{ fontSize:13, color:'var(--text-muted)', lineHeight:1.8, margin:0 }}>
          ParcelPal is a peer-to-peer campus delivery platform for VIT Bhopal students. Post a request and a fellow student will deliver your parcel or food for a small cash fee.
        </p>
      </div>

      <div style={{ background:'var(--bg-card)', border:'0.5px solid var(--border)', borderRadius:16, padding:20, marginBottom:20 }}>
        <h2 style={{ fontFamily:'var(--font-display)', fontSize:16, fontWeight:700, color:'#fff', marginBottom:16 }}>How It Works</h2>
        {[
          { num:'01', title:'Post a Request', desc:'Choose parcel, food, or stationery. Enter pickup, drop location, your name and contact.' },
          { num:'02', title:'Carrier Accepts', desc:'A nearby student sees your request, enters their details and accepts it.' },
          { num:'03', title:'Item is Delivered', desc:'The carrier brings your item to your hostel or location.' },
          { num:'04', title:'Pay Cash Directly', desc:'Pay the delivery fee in cash to the carrier. No online payment needed.' },
        ].map(s => (
          <div key={s.num} style={{ display:'flex', gap:14, marginBottom:16 }}>
            <div style={{ fontFamily:'var(--font-display)', fontSize:18, fontWeight:800, color:'var(--accent)', opacity:0.4, flexShrink:0, width:28 }}>{s.num}</div>
            <div>
              <div style={{ fontSize:14, fontWeight:600, color:'#fff', marginBottom:3 }}>{s.title}</div>
              <div style={{ fontSize:13, color:'var(--text-muted)', lineHeight:1.6 }}>{s.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ background:'var(--bg-card)', border:'0.5px solid var(--border)', borderRadius:16, padding:20, marginBottom:20 }}>
        <h2 style={{ fontFamily:'var(--font-display)', fontSize:16, fontWeight:700, color:'#fff', marginBottom:4 }}>Delivery Fees</h2>
        <p style={{ fontSize:12, color:'var(--text-muted)', marginBottom:16 }}>Paid in cash directly to the carrier</p>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:10 }}>
          {[
            { fee:'Rs.10', label:'Parcel Pickup', color:'var(--accent)', bg:'rgba(110,231,183,0.06)', border:'rgba(110,231,183,0.2)' },
            { fee:'Rs.15', label:'Food Order', color:'#fbbf24', bg:'rgba(251,191,36,0.06)', border:'rgba(251,191,36,0.2)' },
            { fee:'Rs.1-4', label:'Stationery', color:'#a78bfa', bg:'rgba(167,139,250,0.06)', border:'rgba(167,139,250,0.2)' },
          ].map(f => (
            <div key={f.label} style={{ background:f.bg, border:`0.5px solid ${f.border}`, borderRadius:12, padding:14, textAlign:'center' }}>
              <div style={{ fontFamily:'var(--font-display)', fontSize:18, fontWeight:800, color:f.color, marginBottom:4 }}>{f.fee}</div>
              <div style={{ fontSize:11, color:'var(--text-muted)' }}>{f.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background:'rgba(251,113,133,0.06)', border:'0.5px solid rgba(251,113,133,0.2)', borderRadius:16, padding:20, marginBottom:20 }}>
        <h2 style={{ fontFamily:'var(--font-display)', fontSize:16, fontWeight:700, color:'#fff', marginBottom:16 }}>Rules</h2>
        {[
          'Always share your real name and contact number.',
          'Payment is always in cash directly to the carrier. No advance payment.',
          'Carrier must not open, tamper with, or damage any parcel.',
          'Requester must be reachable on their contact number.',
          'Do not use ParcelPal for illegal items or anything banned on campus.',
          'Do not use ParcelPal for alcohol or tobacco products.',
          'Carrier can cancel before pickup if unable to complete.',
          'Misuse will result in permanent ban.',
        ].map((rule, i) => (
          <div key={i} style={{ display:'flex', gap:10, marginBottom:12 }}>
            <div style={{ width:6, height:6, borderRadius:'50%', background:'#fb7185', marginTop:6, flexShrink:0 }} />
            <div style={{ fontSize:13, color:'var(--text-muted)', lineHeight:1.7 }}>{rule}</div>
          </div>
        ))}
      </div>

      <div style={{ background:'var(--bg-card)', border:'0.5px solid var(--border)', borderRadius:16, padding:20, marginBottom:20 }}>
        <h2 style={{ fontFamily:'var(--font-display)', fontSize:16, fontWeight:700, color:'#fff', marginBottom:12 }}>Safety Tips</h2>
        {[
          'Only accept requests from VIT Bhopal students.',
          'Meet in common areas like hostel lobbies, not inside rooms.',
          'If something feels wrong, cancel and report it.',
          'Keep a screenshot of request details before accepting.',
        ].map((tip, i) => (
          <div key={i} style={{ display:'flex', gap:10, marginBottom:10 }}>
            <div style={{ fontSize:13, color:'var(--accent)', flexShrink:0 }}>✓</div>
            <div style={{ fontSize:13, color:'var(--text-muted)', lineHeight:1.6 }}>{tip}</div>
          </div>
        ))}
      </div>

      <div style={{ background:'rgba(110,231,183,0.04)', border:'0.5px solid rgba(110,231,183,0.15)', borderRadius:12, padding:16, textAlign:'center' }}>
        <p style={{ fontSize:13, color:'var(--text-muted)', lineHeight:1.7, margin:'0 0 12px' }}>Built by students, for students at VIT Bhopal.</p>
        <Link href="/" style={{ textDecoration:'none' }}>
          <button style={{ background:'var(--accent)', color:'#0a0a0f', border:'none', borderRadius:10, padding:'11px 22px', fontFamily:'var(--font-display)', fontWeight:700, fontSize:13, cursor:'pointer' }}>Get Started</button>
        </Link>
      </div>
    </div>
  )
}