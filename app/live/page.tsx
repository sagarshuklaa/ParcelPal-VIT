'use client'
import { useState, useEffect } from 'react'
import { MapPin, Package, UtensilsCrossed, Pencil, Check, XCircle, CheckCircle, Clock, ArrowLeft } from 'lucide-react'
import { supabase } from '@/lib/supabase'

type Request = {
  id: string
  type: string
  pickup_location: string
  drop_location: string
  description: string
  fee: number
  status: string
  requester_name: string
  requester_contact: string
  carrier_name: string | null
  carrier_contact: string | null
  note: string
  created_at: string
}

function timeAgo(dateStr: string) {
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000)
  if (diff < 60) return `${diff}s ago`
  if (diff < 3600) return `${Math.floor(diff/60)}m ago`
  return `${Math.floor(diff/3600)}h ago`
}

function typeIcon(type: string) {
  if (type === 'food') return <UtensilsCrossed size={15} />
  if (type === 'stationery') return <Pencil size={15} />
  return <Package size={15} />
}

function typeColor(type: string) {
  if (type === 'food') return { bg: 'rgba(251,191,36,0.15)', color: '#fbbf24' }
  if (type === 'stationery') return { bg: 'rgba(167,139,250,0.15)', color: '#a78bfa' }
  return { bg: 'rgba(110,231,183,0.15)', color: 'var(--accent)' }
}

const inp = { width:'100%', background:'rgba(255,255,255,0.05)', border:'0.5px solid rgba(255,255,255,0.1)', borderRadius:10, padding:'12px 14px', color:'var(--text)', fontFamily:'var(--font-body)', fontSize:14, outline:'none' } as React.CSSProperties
const lbl = { display:'block', fontSize:11, fontWeight:600, color:'var(--text-muted)', marginBottom:7, letterSpacing:'0.6px', textTransform:'uppercase' } as React.CSSProperties

export default function LivePage() {
  const [step, setStep] = useState<'browse'|'form'|'active'|'payment'>('browse')
  const [requests, setRequests] = useState<Request[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<Request|null>(null)
  const [carrierName, setCarrierName] = useState('')
  const [carrierContact, setCarrierContact] = useState('')
  const [paymentReceived, setPaymentReceived] = useState<boolean|null>(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetchRequests()
    const channel = supabase.channel('live-requests')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'delivery_requests' }, fetchRequests)
      .subscribe()
    return () => { supabase.removeChannel(channel) }
  }, [])

  async function fetchRequests() {
    setLoading(true)
    const { data } = await supabase.from('delivery_requests').select('*').eq('status', 'open').order('created_at', { ascending: false })
    setRequests(data || [])
    setLoading(false)
  }

  async function acceptRequest() {
    if (!carrierName || !carrierContact || !selected) return
    setSubmitting(true)
    await supabase.from('delivery_requests').update({ status: 'accepted', carrier_name: carrierName, carrier_contact: carrierContact }).eq('id', selected.id)
    setSubmitting(false)
    setStep('active')
  }

  async function markDelivered() {
    if (!selected) return
    await supabase.from('delivery_requests').update({ status: 'delivered' }).eq('id', selected.id)
    setStep('payment')
  }

  function reset() {
    setStep('browse'); setSelected(null); setCarrierName(''); setCarrierContact(''); setPaymentReceived(null); fetchRequests()
  }

  // PAYMENT
  if (step === 'payment') return (
    <div style={{ paddingTop:20 }}>
      <button onClick={reset} style={{ display:'flex', alignItems:'center', gap:6, background:'none', border:'none', color:'var(--text-muted)', cursor:'pointer', fontFamily:'var(--font-body)', fontSize:13, marginBottom:16, padding:0 }}>
        <ArrowLeft size={16} /> Back
      </button>
      <h1 style={{ fontFamily:'var(--font-display)', fontSize:22, fontWeight:800, color:'#fff', marginBottom:6 }}>Payment</h1>
      <p style={{ color:'var(--text-muted)', fontSize:13, marginBottom:24 }}>Did you receive the cash payment?</p>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:20 }}>
        <button onClick={() => setPaymentReceived(true)} style={{ padding:20, borderRadius:14, cursor:'pointer', border:paymentReceived===true?'1.5px solid var(--accent)':'0.5px solid rgba(255,255,255,0.1)', background:paymentReceived===true?'rgba(110,231,183,0.08)':'rgba(255,255,255,0.03)', color:paymentReceived===true?'var(--accent)':'rgba(255,255,255,0.5)', fontFamily:'var(--font-body)', textAlign:'center' }}>
          <CheckCircle size={28} style={{ marginBottom:8 }} />
          <div style={{ fontSize:14, fontWeight:600 }}>Yes, Received</div>
        </button>
        <button onClick={() => setPaymentReceived(false)} style={{ padding:20, borderRadius:14, cursor:'pointer', border:paymentReceived===false?'1.5px solid #fb7185':'0.5px solid rgba(255,255,255,0.1)', background:paymentReceived===false?'rgba(251,113,133,0.08)':'rgba(255,255,255,0.03)', color:paymentReceived===false?'#fb7185':'rgba(255,255,255,0.5)', fontFamily:'var(--font-body)', textAlign:'center' }}>
          <XCircle size={28} style={{ marginBottom:8 }} />
          <div style={{ fontSize:14, fontWeight:600 }}>Not Yet</div>
        </button>
      </div>
      {paymentReceived===false && <div style={{ background:'rgba(251,113,133,0.08)', border:'0.5px solid rgba(251,113,133,0.25)', borderRadius:12, padding:16, marginBottom:16 }}><p style={{ fontSize:13, color:'#fb7185', lineHeight:1.7, margin:0 }}>Ask requester for cash before handing over the item.</p></div>}
      {paymentReceived===true && <div style={{ background:'rgba(110,231,183,0.06)', border:'0.5px solid rgba(110,231,183,0.2)', borderRadius:12, padding:16, marginBottom:16 }}><p style={{ fontSize:13, color:'var(--accent)', lineHeight:1.7, margin:0 }}>Rs.{selected?.fee} earned! Thank you for the delivery.</p></div>}
      {paymentReceived!==null && <button onClick={reset} style={{ width:'100%', background:'var(--accent)', color:'#0a0a0f', border:'none', borderRadius:12, padding:14, fontFamily:'var(--font-display)', fontWeight:700, fontSize:15, cursor:'pointer' }}>Done - Back to Requests</button>}
    </div>
  )

  // ACTIVE DELIVERY - Uber style
  if (step === 'active') return (
    <div style={{ paddingTop:20 }}>
      <h1 style={{ fontFamily:'var(--font-display)', fontSize:22, fontWeight:800, color:'#fff', marginBottom:6 }}>Active Delivery</h1>
      <p style={{ color:'var(--text-muted)', fontSize:13, marginBottom:20 }}>You have accepted this request</p>

      <div style={{ background:'var(--bg-card)', border:'0.5px solid var(--border)', borderRadius:16, padding:20, marginBottom:16 }}>
        <div style={{ display:'flex', alignItems:'flex-start', gap:14 }}>
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', paddingTop:3 }}>
            <div style={{ width:10, height:10, borderRadius:'50%', background:'var(--accent)' }} />
            <div style={{ width:1, height:32, background:'rgba(255,255,255,0.15)', margin:'4px 0' }} />
            <div style={{ width:10, height:10, borderRadius:2, background:'#fb7185' }} />
          </div>
          <div style={{ flex:1 }}>
            <div style={{ marginBottom:16 }}>
              <div style={{ fontSize:11, color:'var(--text-muted)', marginBottom:3, textTransform:'uppercase', letterSpacing:0.5 }}>Pickup from</div>
              <div style={{ fontSize:15, fontWeight:600, color:'#fff' }}>{selected?.pickup_location}</div>
              {selected?.description && <div style={{ fontSize:12, color:'var(--text-muted)', marginTop:3 }}>{selected.description}</div>}
            </div>
            <div>
              <div style={{ fontSize:11, color:'var(--text-muted)', marginBottom:3, textTransform:'uppercase', letterSpacing:0.5 }}>Deliver to</div>
              <div style={{ fontSize:15, fontWeight:600, color:'#fff' }}>{selected?.drop_location}</div>
              {selected?.note && <div style={{ fontSize:12, color:'var(--text-muted)', marginTop:3 }}>Note: {selected.note}</div>}
            </div>
          </div>
          <div style={{ fontFamily:'var(--font-display)', fontSize:18, fontWeight:800, color:'var(--accent)' }}>Rs.{selected?.fee}</div>
        </div>
      </div>

      <div style={{ background:'rgba(110,231,183,0.06)', border:'0.5px solid rgba(110,231,183,0.2)', borderRadius:16, padding:18, marginBottom:16 }}>
        <div style={{ fontSize:11, color:'var(--text-muted)', textTransform:'uppercase', letterSpacing:1, marginBottom:12, fontWeight:600 }}>Requester</div>
        <div style={{ display:'flex', alignItems:'center', gap:12 }}>
          <div style={{ width:44, height:44, borderRadius:'50%', background:'rgba(110,231,183,0.15)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--font-display)', fontSize:16, fontWeight:700, color:'var(--accent)' }}>
            {selected?.requester_name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <div style={{ fontSize:15, fontWeight:600, color:'#fff' }}>{selected?.requester_name}</div>
            <a href={`tel:${selected?.requester_contact}`} style={{ fontSize:13, color:'var(--accent)', textDecoration:'none' }}>📞 {selected?.requester_contact}</a>
          </div>
        </div>
      </div>

      <div style={{ background:'rgba(251,191,36,0.06)', border:'0.5px solid rgba(251,191,36,0.2)', borderRadius:12, padding:14, marginBottom:20 }}>
        <p style={{ fontSize:12, color:'#fbbf24', lineHeight:1.6, margin:0 }}>Collect Rs.{selected?.fee} cash from requester when you hand over the item.</p>
      </div>

      <button onClick={markDelivered} style={{ width:'100%', background:'var(--accent)', color:'#0a0a0f', border:'none', borderRadius:12, padding:14, fontFamily:'var(--font-display)', fontWeight:700, fontSize:15, cursor:'pointer' }}>
        Mark as Delivered
      </button>
    </div>
  )

  // CARRIER FORM
  if (step === 'form') return (
    <div style={{ paddingTop:20 }}>
      <button onClick={() => setStep('browse')} style={{ display:'flex', alignItems:'center', gap:6, background:'none', border:'none', color:'var(--text-muted)', cursor:'pointer', fontFamily:'var(--font-body)', fontSize:13, marginBottom:16, padding:0 }}>
        <ArrowLeft size={16} /> Back
      </button>
      <h1 style={{ fontFamily:'var(--font-display)', fontSize:22, fontWeight:800, color:'#fff', marginBottom:6 }}>Accept Delivery</h1>
      <p style={{ color:'var(--text-muted)', fontSize:13, marginBottom:20 }}>Enter your details to confirm</p>

      <div style={{ background:'var(--bg-card)', border:'0.5px solid var(--border)', borderRadius:14, padding:16, marginBottom:20 }}>
        <div style={{ display:'flex', alignItems:'flex-start', gap:12 }}>
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', paddingTop:2 }}>
            <div style={{ width:8, height:8, borderRadius:'50%', background:'var(--accent)' }} />
            <div style={{ width:1, height:24, background:'rgba(255,255,255,0.15)', margin:'3px 0' }} />
            <div style={{ width:8, height:8, borderRadius:2, background:'#fb7185' }} />
          </div>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:13, color:'#fff', fontWeight:500, marginBottom:8 }}>{selected?.pickup_location}</div>
            <div style={{ fontSize:13, color:'#fff', fontWeight:500 }}>{selected?.drop_location}</div>
          </div>
          <div style={{ fontFamily:'var(--font-display)', fontSize:18, fontWeight:800, color:'var(--accent)' }}>Rs.{selected?.fee}</div>
        </div>
        {selected?.description && <div style={{ fontSize:12, color:'var(--text-muted)', marginTop:10, paddingTop:10, borderTop:'0.5px solid var(--border)' }}>{selected.description}</div>}
      </div>

      <div style={{ marginBottom:16 }}>
        <label style={lbl}>Your Name</label>
        <input value={carrierName} onChange={e => setCarrierName(e.target.value)} placeholder="Full name" style={inp} />
      </div>
      <div style={{ marginBottom:24 }}>
        <label style={lbl}>Your Contact Number</label>
        <input value={carrierContact} onChange={e => setCarrierContact(e.target.value)} placeholder="10-digit mobile number" type="tel" style={inp} />
      </div>
      <button onClick={acceptRequest} disabled={submitting || !carrierName || !carrierContact} style={{ width:'100%', background:carrierName&&carrierContact?'var(--accent)':'rgba(255,255,255,0.1)', color:carrierName&&carrierContact?'#0a0a0f':'rgba(255,255,255,0.3)', border:'none', borderRadius:12, padding:14, fontFamily:'var(--font-display)', fontWeight:700, fontSize:15, cursor:carrierName&&carrierContact?'pointer':'not-allowed' }}>
        {submitting ? 'Accepting...' : 'Confirm and Accept'}
      </button>
    </div>
  )

  // BROWSE
  return (
    <div style={{ paddingTop:20 }}>
      <button onClick={() => window.history.back()} style={{ display:'flex', alignItems:'center', gap:6, background:'none', border:'none', color:'var(--text-muted)', cursor:'pointer', fontFamily:'var(--font-body)', fontSize:13, marginBottom:16, padding:0 }}>
        <ArrowLeft size={16} /> Back
      </button>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:6 }}>
        <h1 style={{ fontFamily:'var(--font-display)', fontSize:22, fontWeight:800, color:'#fff' }}>Live Requests</h1>
        {!loading && requests.length > 0 && (
          <div style={{ display:'flex', alignItems:'center', gap:6 }}>
            <div style={{ width:7, height:7, borderRadius:'50%', background:'var(--accent)' }} />
            <span style={{ fontSize:12, color:'var(--accent)' }}>{requests.length} open</span>
          </div>
        )}
      </div>
      <p style={{ color:'var(--text-muted)', fontSize:13, marginBottom:24 }}>Accept a delivery near your route and earn</p>

      {loading ? (
        <div style={{ textAlign:'center', padding:'60px 0', color:'var(--text-muted)', fontSize:14 }}>
          <Clock size={28} style={{ marginBottom:12, opacity:0.3 }} /><div>Loading...</div>
        </div>
      ) : requests.length === 0 ? (
        <div style={{ textAlign:'center', padding:'60px 24px', background:'var(--bg-card)', border:'0.5px solid var(--border)', borderRadius:16 }}>
          <MapPin size={40} style={{ color:'rgba(255,255,255,0.1)', marginBottom:16 }} />
          <h3 style={{ fontFamily:'var(--font-display)', fontSize:16, fontWeight:700, color:'rgba(255,255,255,0.3)', marginBottom:8 }}>No active requests yet</h3>
          <p style={{ fontSize:13, color:'var(--text-faint)', lineHeight:1.7, maxWidth:240, margin:'0 auto' }}>Once someone posts a request, it shows up here in real time.</p>
        </div>
      ) : requests.map(req => {
        const tc = typeColor(req.type)
        return (
          <div key={req.id} style={{ background:'var(--bg-card)', border:'0.5px solid var(--border)', borderRadius:16, padding:16, marginBottom:12 }}>
            <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:12 }}>
              <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                <div style={{ width:34, height:34, borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', background:tc.bg, color:tc.color, flexShrink:0 }}>{typeIcon(req.type)}</div>
                <div>
                  <div style={{ fontSize:13, fontWeight:600, color:'#fff', textTransform:'capitalize' }}>{req.type} delivery</div>
                  <div style={{ fontSize:11, color:'var(--text-muted)', display:'flex', alignItems:'center', gap:4, marginTop:2 }}><Clock size={10} /> {timeAgo(req.created_at)}</div>
                </div>
              </div>
              <div style={{ fontFamily:'var(--font-display)', fontSize:18, fontWeight:800, color:'var(--accent)' }}>+Rs.{req.fee}</div>
            </div>

            <div style={{ display:'flex', alignItems:'flex-start', gap:12, padding:'12px 14px', background:'rgba(255,255,255,0.03)', borderRadius:10, marginBottom:10 }}>
              <div style={{ display:'flex', flexDirection:'column', alignItems:'center', paddingTop:4 }}>
                <div style={{ width:8, height:8, borderRadius:'50%', background:'var(--accent)' }} />
                <div style={{ width:1, height:20, background:'rgba(255,255,255,0.15)', margin:'3px 0' }} />
                <div style={{ width:8, height:8, borderRadius:2, background:'#fb7185' }} />
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:13, color:'#fff', fontWeight:500, marginBottom:8 }}>{req.pickup_location}</div>
                <div style={{ fontSize:13, color:'#fff', fontWeight:500 }}>{req.drop_location}</div>
              </div>
            </div>

            {req.description && <div style={{ fontSize:12, color:'var(--text-muted)', padding:'8px 12px', background:'rgba(255,255,255,0.02)', borderRadius:8, marginBottom:10 }}>{req.description}</div>}

            <div style={{ display:'flex', alignItems:'center', marginBottom:12 }}>
              <div style={{ width:24, height:24, borderRadius:'50%', background:'rgba(110,231,183,0.12)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:700, color:'var(--accent)', marginRight:7 }}>
                {req.requester_name.charAt(0).toUpperCase()}
              </div>
              <span style={{ fontSize:12, color:'var(--text-muted)' }}>by {req.requester_name}</span>
            </div>

            <button onClick={() => { setSelected(req); setStep('form') }} style={{ width:'100%', background:'rgba(110,231,183,0.1)', border:'0.5px solid rgba(110,231,183,0.3)', borderRadius:10, padding:12, color:'var(--accent)', fontFamily:'var(--font-display)', fontWeight:700, fontSize:13, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:6 }}>
              <Check size={14} /> Accept - Earn Rs.{req.fee}
            </button>
          </div>
        )
      })}
    </div>
  )
}