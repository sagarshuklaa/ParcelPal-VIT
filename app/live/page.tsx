'use client'
import { useState } from 'react'
import { MapPin, CheckCircle, XCircle } from 'lucide-react'

export default function LivePage() {
  const [step, setStep] = useState<'browse'|'form'|'active'|'payment'>('browse')
  const [carrierName, setCarrierName] = useState('')
  const [carrierContact, setCarrierContact] = useState('')
  const [paymentReceived, setPaymentReceived] = useState<boolean|null>(null)

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
          <p style={{ fontSize: 13, color: '#fb7185', lineHeight: 1.7, margin: 0 }}>
            Please ask the requester for cash payment before handing over the item. If they refuse, contact the ParcelPal admin.
          </p>
        </div>
      )}

      {paymentReceived === true && (
        <div style={{ background: 'rgba(110,231,183,0.06)', border: '0.5px solid rgba(110,231,183,0.2)', borderRadius: 12, padding: 16, marginBottom: 20 }}>
          <p style={{ fontSize: 13, color: 'var(--accent)', lineHeight: 1.7, margin: 0 }}>
            Great! Thank you for completing the delivery. Your record has been updated.
          </p>
        </div>
      )}

      {paymentReceived !== null && (
        <button onClick={() => { setStep('browse'); setCarrierName(''); setCarrierContact(''); setPaymentReceived(null) }} style={{ width: '100%', background: 'var(--accent)', color: '#0a0a0f', border: 'none', borderRadius: 12, padding: 14, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>
          Done - Back to Requests
        </button>
      )}
    </div>
  )

  if (step === 'active') return (
    <div className="fade-up" style={{ paddingTop: 28 }}>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 6 }}>Active Delivery</h1>
      <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 24 }}>You have accepted this request</p>

      <div style={{ background: 'rgba(110,231,183,0.06)', border: '0.5px solid rgba(110,231,183,0.2)', borderRadius: 16, padding: 20, marginBottom: 20 }}>
        <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12, fontWeight: 600 }}>Your Details</div>
        <div style={{ fontSize: 14, color: '#fff', marginBottom: 4 }}>{carrierName}</div>
        <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{carrierContact}</div>
      </div>

      <div style={{ background: 'rgba(251,191,36,0.06)', border: '0.5px solid rgba(251,191,36,0.2)', borderRadius: 12, padding: 16, marginBottom: 24 }}>
        <p style={{ fontSize: 12, color: '#fbbf24', lineHeight: 1.7, margin: 0 }}>
          Collect cash from the requester when you hand over the item. Do not hand over without payment.
        </p>
      </div>

      <button onClick={() => setStep('payment')} style={{ width: '100%', background: 'var(--accent)', color: '#0a0a0f', border: 'none', borderRadius: 12, padding: 14, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>
        Mark as Delivered
      </button>
    </div>
  )

  if (step === 'form') return (
    <div className="fade-up" style={{ paddingTop: 28 }}>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 6 }}>Your Details</h1>
      <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 24 }}>Required for security before accepting a delivery</p>

      <div style={{ marginBottom: 16 }}>
        <label style={labelStyle}>Your Name</label>
        <input value={carrierName} onChange={e => setCarrierName(e.target.value)} placeholder="Full name" style={inputStyle} />
      </div>

      <div style={{ marginBottom: 24 }}>
        <label style={labelStyle}>Your Contact Number</label>
        <input value={carrierContact} onChange={e => setCarrierContact(e.target.value)} placeholder="10-digit mobile number" type="tel" style={inputStyle} />
      </div>

      <button onClick={() => { if(carrierName && carrierContact) setStep('active') }} style={{ width: '100%', background: carrierName && carrierContact ? 'var(--accent)' : 'rgba(255,255,255,0.1)', color: carrierName && carrierContact ? '#0a0a0f' : 'rgba(255,255,255,0.3)', border: 'none', borderRadius: 12, padding: 14, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, cursor: carrierName && carrierContact ? 'pointer' : 'not-allowed' }}>
        Confirm and Accept
      </button>
    </div>
  )

  return (
    <div className="fade-up" style={{ paddingTop: 28 }}>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 6 }}>Live Requests</h1>
      <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 24 }}>Accept a delivery near your route and earn</p>

      <div style={{ textAlign: 'center', padding: '60px 24px', background: 'var(--bg-card)', border: '0.5px solid var(--border)', borderRadius: 16, marginBottom: 16 }}>
        <MapPin size={40} style={{ color: 'rgba(255,255,255,0.1)', marginBottom: 16 }} />
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, color: 'rgba(255,255,255,0.3)', marginBottom: 8 }}>No active requests yet</h3>
        <p style={{ fontSize: 13, color: 'var(--text-faint)', lineHeight: 1.7, maxWidth: 240, margin: '0 auto 24px' }}>
          Once someone posts a delivery request, it will show up here.
        </p>
        <button onClick={() => setStep('form')} style={{ background: 'var(--accent)', color: '#0a0a0f', border: 'none', borderRadius: 10, padding: '12px 24px', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>
          I am ready to deliver
        </button>
      </div>
    </div>
  )
}