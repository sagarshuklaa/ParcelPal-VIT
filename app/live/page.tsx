'use client'
import { useState, useEffect } from 'react'
import { MapPin, Package, UtensilsCrossed, Check, XCircle, CheckCircle } from 'lucide-react'
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
  note: string
  created_at: string
}

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
    const channel = supabase.channel('requests').on('postgres_changes', { event: '*', schema: 'public', table: 'delivery_requests' }, () => fetchRequests()).subscribe()
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

  const inputStyle = { width: '100%', background: 'rgba(255,255,255,0.05)', border: '0.5px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '11px 14px', color: 'var(--text)', fontFamily: 'var(--font-body)', fontSize: 14, outline: 'none' } as React.CSSProperties
  const labelStyle = { display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 7, letterSpacing: '0.6px', textTransform: 'uppercase' } as React.CSSProperties

  if (step === 'payment') return (
    <div className="fade-up" style={{ paddingTop: 28 }}>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 6 }}>Payment Confirmation</h1>
      <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 24 }}>Did you receive the cash payment from the requester?</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
        <button onClick={() => setPaymentReceived(true)} style={{ padding: 20, borderRadius: 14, cursor: 'pointer', border: paymentReceived === true ? '1.5px solid var(--accent)' : '0.5px solid rgba(255,255,255,0.1)', background: paymentReceived === true ? 'rgba(110,231,183,0.08)' : 'rgba(255,255,255,0.03)', color: paymentReceived === true ? 'var(--accent)' : 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)', transition: 'all 0.2s', textAlign: 'center' }}>
          <CheckCircle size={28} style={{ marginBottom: 8 }} />
          <div style={{ fontSize: 14, fontWeight: 600 }}>Yes, Received</div>
        </button>
        <button onClick={() => setPaymentReceived(false)} style={{ padding: 20, borderRadius: 14, cursor: 'pointer', border: paymentReceived === false ? '1.5px solid #fb7185' : '0.5px solid rgba(255,255,255,0.1)', background: paymentReceived === false ? 'rgba(251,113,133,0.08)' : 'rgba(255,255,255,0.03)', color: paymentReceived === false ? '#fb7185' : 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)', transition: 'all 0.2s', textAlign: 'center' }}>
          <XCircle size={28} style={{ marginBottom: 8 }} />
          <div style={{ fontSize: 14, fontWeight: 600 }}>Not Yet</div>
        </button>
      </div>
      {paymentReceived === false && (
        <div style={{ background: 'rgba(251,113,133,0.08)', border: '0.5px solid rgba(251,113,133,0.25)', borderRadius: 12, padding: 16, marginBottom: 20 }}>
          <p style={{ fontSize: 13, color: '#fb7185', lineHeight: 1.7, margin: 0 }}>Please ask the requester for cash payment before handing over the item.</p>
        </div>
      )}
      {paymentReceived === true && (
        <div style={{ background: 'rgba(110,231,183,0.06)', border: '0.5px solid rgba(110,231,183,0.2)', borderRadius: 12, padding: 16, marginBottom: 20 }}>
          <p style={{ fontSize: 13, color: 'var(--accent)', lineHeight: 1.7, margin: 0 }}>Great! Thank you for completing the delivery.</p>
        </div>
      )}
      {paymentReceived !== null && (
        <button onClick={() => { setStep('browse'); setSelected(null); setCarrierName(''); setCarrierContact(''); setPaymentReceived(null); fetchRequests() }} style={{ width: '100%', background: 'var(--accent)', color: '#0a0a0f', border: 'none', borderRadius: 12, padding: 14, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>
          Done - Back to Requests
        </button>
      )}
    </div>
  )

  if (step === 'active') return (
    <div className="fade-up" style={{ paddingTop: 28 }}>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 6 }}>Active Delivery</h1>
      <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 24 }}>You have accepted this request</p>
      <div style={{ background: 'rgba(110,231,183,0.06)', border: '0.5px solid rgba(110,231,183,0.2)', borderRadius: 16, padding: 20, marginBottom: 16 }}>
        <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12, fontWeight: 600 }}>Request Details</div>
        <div style={{ fontSize: 14, color: '#fff', marginBottom: 4 }}>{selected?.pickup_location} to {selected?.drop_location}</div>
        {selected?.description && <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 4 }}>{selected.description}</div>}
        {selected?.note && <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>Note: {selected.note}</div>}
      </div>
      <div style={{ background: 'var(--bg-card)', border: '0.5px solid var(--border)', borderRadius: 16, padding: 20, marginBottom: 16 }}>
        <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12, fontWeight: 600 }}>Requester Contact</div>
        <div style={{ fontSize: 14, color: '#fff', marginBottom: 4 }}>{selected?.requester_name}</div>
        <div style={{ fontSize: 13, color: 'var(--accent)' }}>{selected?.requester_contact}</div>
      </div>
      <div style={{ background: 'rgba(251,191,36,0.06)', border: '0.5px solid rgba(251,191,36,0.2)', borderRadius: 12, padding: 16, marginBottom: 24 }}>
        <p style={{ fontSize: 12, color: '#fbbf24', lineHeight: 1.7, margin: 0 }}>Collect Rs.{selected?.fee} cash from the requester when you hand over the item.</p>
      </div>
      <button onClick={markDelivered} style={{ width: '100%', background: 'var(--accent)', color: '#0a0a0f', border: 'none', borderRadius: 12, padding: 14, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>
        Mark as Delivered
      </button>
    </div>
  )

  if (step === 'form') return (
    <div className="fade-up" style={{ paddingTop: 28 }}>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 6 }}>Your Details</h1>
      <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 24 }}>Required for security before accepting</p>
      <div style={{ background: 'var(--bg-card)', border: '0.5px solid var(--border)', borderRadius: 14, padding: 16, marginBottom: 20 }}>
        <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 4 }}>Delivering</div>
        <div style={{ fontSize: 14, color: '#fff', fontWeight: 500 }}>{selected?.pickup_location} to {selected?.drop_location}</div>
        <div style={{ fontSize: 13, color: 'var(--accent)', marginTop: 4 }}>Earn Rs.{selected?.fee}</div>
      </div>
      <div style={{ marginBottom: 16 }}>
        <label style={labelStyle}>Your Name</label>
        <input value={carrierName} onChange={e => setCarrierName(e.target.value)} placeholder="Full name" style={inputStyle} />
      </div>
      <div style={{ marginBottom: 24 }}>
        <label style={labelStyle}>Your Contact Number</label>
        <input value={carrierContact} onChange={e => setCarrierContact(e.target.value)} placeholder="10-digit mobile number" type="tel" style={inputStyle} />
      </div>
      <button onClick={acceptRequest} disabled={submitting || !carrierName || !carrierContact} style={{ width: '100%', background: carrierName && carrierContact ? 'var(--accent)' : 'rgba(255,255,255,0.1)', color: carrierName && carrierContact ? '#0a0a0f' : 'rgba(255,255,255,0.3)', border: 'none', borderRadius: 12, padding: 14, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, cursor: carrierName && carrierContact ? 'pointer' : 'not-allowed' }}>
        {submitting ? 'Accepting...' : 'Confirm and Accept'}
      </button>
    </div>
  )

  return (
    <div className="fade-up" style={{ paddingTop: 28 }}>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 6 }}>Live Requests</h1>
      <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 24 }}>Accept a delivery near your route and earn</p>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px 24px', color: 'var(--text-muted)', fontSize: 14 }}>Loading requests...</div>
      ) : requests.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 24px', background: 'var(--bg-card)', border: '0.5px solid var(--border)', borderRadius: 16 }}>
          <MapPin size={40} style={{ color: 'rgba(255,255,255,0.1)', marginBottom: 16 }} />
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, color: 'rgba(255,255,255,0.3)', marginBottom: 8 }}>No active requests yet</h3>
          <p style={{ fontSize: 13, color: 'var(--text-faint)', lineHeight: 1.7, maxWidth: 240, margin: '0 auto' }}>Once someone posts a delivery request, it will show up here.</p>
        </div>
      ) : (
        requests.map(req => (
          <div key={req.id} style={{ background: 'var(--bg-card)', border: '0.5px solid var(--border)', borderRadius: 14, padding: 16, marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', background: req.type === 'food' ? 'rgba(251,191,36,0.15)' : 'rgba(110,231,183,0.15)', color: req.type === 'food' ? '#fbbf24' : 'var(--accent)' }}>
                  {req.type === 'food' ? <UtensilsCrossed size={15} /> : <Package size={15} />}
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 500, color: '#fff' }}>{req.pickup_location}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2, display: 'flex', alignItems: 'center', gap: 4 }}><MapPin size={11} /> {req.drop_location}</div>
                </div>
              </div>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, color: 'var(--accent)', background: 'rgba(110,231,183,0.1)', border: '0.5px solid rgba(110,231,183,0.25)', borderRadius: 8, padding: '4px 10px' }}>+Rs.{req.fee}</span>
            </div>
            {req.description && <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 8, padding: '8px 10px', background: 'rgba(255,255,255,0.03)', borderRadius: 8 }}>{req.description}</div>}
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 10 }}>By: {req.requester_name}</div>
            <button onClick={() => { setSelected(req); setStep('form') }} style={{ width: '100%', background: 'rgba(110,231,183,0.1)', border: '0.5px solid rgba(110,231,183,0.3)', borderRadius: 10, padding: 11, color: 'var(--accent)', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
              <Check size={14} /> Accept - Earn Rs.{req.fee}
            </button>
          </div>
        ))
      )}
    </div>
  )
}