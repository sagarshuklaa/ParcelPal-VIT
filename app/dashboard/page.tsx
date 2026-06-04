'use client'
import { Package, Star, TrendingUp, Trophy, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  return (
    <div style={{ paddingTop:20 }}>
      <button onClick={() => window.history.back()} style={{ display:'flex', alignItems:'center', gap:6, background:'none', border:'none', color:'var(--text-muted)', cursor:'pointer', fontFamily:'var(--font-body)', fontSize:13, marginBottom:16, padding:0 }}>
        <ArrowLeft size={16} /> Back
      </button>

      <div style={{ display:'flex', alignItems:'center', gap:14, marginBottom:24 }}>
        <div style={{ width:52, height:52, borderRadius:14, background:'rgba(110,231,183,0.15)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--font-display)', fontSize:18, fontWeight:700, color:'var(--accent)' }}>?</div>
        <div>
          <div style={{ fontFamily:'var(--font-display)', fontSize:17, fontWeight:700, color:'#fff' }}>Welcome!</div>
          <div style={{ fontSize:12, color:'var(--text-muted)', marginTop:2 }}>Start delivering to track your earnings</div>
        </div>
      </div>

      <div style={{ background:'var(--bg-card)', border:'0.5px solid var(--border)', borderRadius:16, padding:20, marginBottom:16, textAlign:'center' }}>
        <div style={{ fontSize:12, color:'var(--text-muted)', marginBottom:6 }}>Total Earnings</div>
        <div style={{ fontFamily:'var(--font-display)', fontSize:40, fontWeight:800, color:'rgba(255,255,255,0.15)', letterSpacing:-1 }}>Rs.0</div>
        <div style={{ fontSize:12, color:'var(--accent)', marginTop:8 }}>Accept your first delivery to start earning</div>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10, marginBottom:28 }}>
        {[{icon:Package,label:'Deliveries',val:'0'},{icon:Star,label:'Rating',val:'-'},{icon:TrendingUp,label:'Rank',val:'-'}].map(({icon:Icon,label,val}) => (
          <div key={label} style={{ background:'var(--bg-card)', border:'0.5px solid var(--border)', borderRadius:12, padding:12, textAlign:'center' }}>
            <div style={{ fontFamily:'var(--font-display)', fontSize:20, fontWeight:700, color:'rgba(255,255,255,0.2)' }}>{val}</div>
            <div style={{ fontSize:11, color:'var(--text-faint)', marginTop:2 }}>{label}</div>
          </div>
        ))}
      </div>

      <div style={{ fontSize:11, fontWeight:600, color:'var(--text-muted)', letterSpacing:1, textTransform:'uppercase', marginBottom:12 }}>Leaderboard</div>

      <div style={{ background:'var(--bg-card)', border:'0.5px solid var(--border)', borderRadius:14, padding:'48px 24px', textAlign:'center', marginBottom:12 }}>
        <Trophy size={36} style={{ color:'rgba(255,255,255,0.1)', marginBottom:14 }} />
        <div style={{ fontFamily:'var(--font-display)', fontSize:15, fontWeight:700, color:'rgba(255,255,255,0.25)', marginBottom:8 }}>Leaderboard is empty</div>
        <p style={{ fontSize:13, color:'var(--text-faint)', lineHeight:1.7, maxWidth:220, margin:'0 auto 20px' }}>
          Complete the first delivery and claim the <span style={{ color:'#fbbf24' }}>number 1 spot</span>
        </p>
        <Link href="/live" style={{ textDecoration:'none' }}>
          <button style={{ background:'var(--accent)', color:'#0a0a0f', border:'none', borderRadius:10, padding:'11px 22px', fontFamily:'var(--font-display)', fontWeight:700, fontSize:13, cursor:'pointer' }}>
            See live requests
          </button>
        </Link>
      </div>
    </div>
  )
}