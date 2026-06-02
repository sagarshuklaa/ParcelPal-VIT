'use client'
import { useState } from 'react'
import { Package, UtensilsCrossed, Send } from 'lucide-react'
import { supabase } from '@/lib/supabase'

const HOSTELS = ['Hostel Block A','Hostel Block B','Hostel Block C','Boys Hostel','Girls Hostel','Library']
const PICKUPS = ['Main Gate (Amazon/Flipkart)','Side Gate','Security Cabin','Safal Mart','Mayuri','Underbelly']
const FOOD_PLACES = ['Mayuri','Underbelly','Safal Mart']

export default function RequestPage() {
  const [type, setType] = useState<'parcel'|'food'>('parcel')
  const [pickup, setPickup] = useState(PICKUPS[0])
  const [drop, setDrop] = useState(HOSTELS[0])
  const [foodFrom, setFoodFrom] = useState(FOOD_PLACES[0])
  const [foodNote, setFoodNote] = useState('')
  const [note, setNote] = useState('')
  const [requesterName, setRequesterName] = useState('')
  const [requesterContact, setRequesterContact] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const fee = type === 'parcel' ? 10 : 15

  async function handleSubmit() {
    if (!requesterName || !requesterContact) {
      setError('Please enter your name and contact number.')
      return
    }
    setLoading(true)
    setError('')
    const { error: err } = await supabase.from('delivery_requests').insert({
      type,
      pickup_location: type === 'parcel' ? pickup : foodFrom,
      drop_location: drop,
      description: type === 'food' ? foodNote : '',
      fee,
      requester_name: requesterName,
      requester_contact: requesterContact,
      note,
      status: 'open',
    })
    setLoading(false)
    if (err) { setError('Something went wrong. Please try again.'); return }
    setSubmitted(true)
  }

  if (submitted) return (
    <div className="fade-up" style={{ textAlign: 'center', padding: '80px 24px' }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>🎉</div>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 10 }}>Request Posted!</h2>
      <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 28, lineHeight: 1.7 }}>Your request is now live. A delivery person will contact you shortly. Please keep your phone handy.</p>
      <button onClick={() => { setSubmitted(false); setRequesterName(''); setRequesterContact(''); setNote(''); setFoodNote('') }} style={{ background: 'var(--accent)', color: '#0a0a0f', border: 'none', borderRadius: 12, padding: '13px 28px', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>
        Post Another
      </button>
    </div>
  )

  const inputStyle = { width: '100%', background: 'rgba(255,255,255,0.05)', border: '0.5px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '11px 14px', color: 'var(--text)', fontFamily: 'var(--font-body)', fontSize: 14, outline: 'none' } as React.CSSProperties
  const labelStyle = { display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 7, letterSpacing: '0.6px', textTransform: 'uppercase' } as React.CSSProperties

  return (
    <div className="fade-up" style={{ paddingTop: 28 }}>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 6 }}>New Request</h1>
      <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 16 }}>Post a delivery - it goes live immediately</p>

      <div style={{ background: 'rgba(251,191,36,0.06)', border: '0.5px solid rgba(251,191,36,0.25)', borderRadius: 12, padding: '14px 16px', marginBottom: 22 }}>
        <p style={{ fontSize: 12, color: '#fbbf24', lineHeight: 1.7, margin: 0 }}>
          Payment is done directly to the delivery person in cash when they hand over your item. Do not pay anyone in advance.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 22 }}>
        {(['parcel','food'] as const).map(t => (
          <button key={t} onClick={() => setType(t)} style={{ padding: 14, borderRadius: 12, cursor: 'pointer', textAlign: 'center', border: type === t ? '1.5px solid var(--accent)' : '0.5px solid rgba(255,255,255,0.1)', background: type === t ? 'rgba(110,231,183,0.08)' : 'rgba(255,255,255,0.03)', color: type === t ? 'var(--accent)' : 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)', transition: 'all 0.2s' }}>
            <div style={{ marginBottom: 6, display: 'flex', justifyContent: 'center' }}>{t === 'parcel' ? <Package size={22} /> : <UtensilsCrossed size={22} />}</div>
            <span style={{ fontSize: 13, fontWeight: 500 }}>{t === 'parcel' ? 'Parcel Pickup' : 'Food Order'}</span>
          </button>
        ))}
      </div>

      {type === 'parcel' ? (
        <div style={{ marginBottom: 16 }}>
          <label style={labelStyle}>Pickup Location</label>
          <select value={pickup} onChange={e => setPickup(e.target.value)} style={inputStyle}>
            {PICKUPS.map(p => <option key={p} style={{ background: '#1a1a2e' }}>{p}</option>)}
          </select>
        </div>
      ) : (
        <>
          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>Order From</label>
            <select value={foodFrom} onChange={e => setFoodFrom(e.target.value)} style={inputStyle}>
              {FOOD_PLACES.map(p => <option key={p} style={{ background: '#1a1a2e' }}>{p}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>What do you want?</label>
            <textarea value={foodNote} onChange={e => setFoodNote(e.target.value)} placeholder="e.g. 2 veg rolls, 1 chai..." rows={3} style={{ ...inputStyle, resize: 'none' }} />
          </div>
        </>
      )}

      <div style={{ marginBottom: 16 }}>
        <label style={labelStyle}>Deliver To</label>
        <select value={drop} onChange={e => setDrop(e.target.value)} style={inputStyle}>
          {HOSTELS.map(h => <option key={h} style={{ background: '#1a1a2e' }}>{h}</option>)}
        </select>
      </div>

      <div style={{ marginBottom: 16 }}>
        <label style={labelStyle}>Your Name</label>
        <input value={requesterName} onChange={e => setRequesterName(e.target.value)} placeholder="Full name" style={inputStyle} />
      </div>

      <div style={{ marginBottom: 16 }}>
        <label style={labelStyle}>Your Contact Number</label>
        <input value={requesterContact} onChange={e => setRequesterContact(e.target.value)} placeholder="10-digit mobile number" type="tel" style={inputStyle} />
      </div>

      <div style={{ marginBottom: 22 }}>
        <label style={labelStyle}>Note for carrier</label>
        <input value={note} onChange={e => setNote(e.target.value)} placeholder="Any special instructions..." style={inputStyle} />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(110,231,183,0.06)', border: '0.5px solid rgba(110,231,183,0.2)', borderRadius: 12, padding: '14px 16px', marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>Delivery fee</div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 2 }}>Pay cash to delivery person</div>
        </div>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, color: 'var(--accent)' }}>Rs.{fee}</span>
      </div>

      {error && <div style={{ background: 'rgba(251,113,133,0.1)', border: '0.5px solid rgba(251,113,133,0.3)', borderRadius: 10, padding: '10px 14px', marginBottom: 16, fontSize: 13, color: '#fb7185' }}>{error}</div>}

      <button onClick={handleSubmit} disabled={loading} style={{ width: '100%', background: loading ? 'rgba(110,231,183,0.4)' : 'var(--accent)', color: '#0a0a0f', border: 'none', borderRadius: 12, padding: 14, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
        <Send size={16} /> {loading ? 'Posting...' : 'Post Request'}
      </button>
    </div>
  )
}