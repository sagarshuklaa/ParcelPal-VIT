'use client'
import { useState } from 'react'
import { Package, UtensilsCrossed, Send, Pencil, Trash2 } from 'lucide-react'
import { supabase } from '@/lib/supabase'

const HOSTELS = ['B1','B2','B3','B4','B5','B6','B7','B8','G1','G2','Special Block','Parcel Area','Main Gate','MPH']
const PICKUPS = ['Main Gate (Amazon/Flipkart)','Side Gate','Security Cabin','Parcel Area']
const FOOD_PLACES = ['Mayuri-AB','Mayuri-SplB','Underbelly-AB','Dakshin','Bistro']

type Request = {
  id: string
  type: string
  pickup_location: string
  drop_location: string
  description: string
  fee: number
  status: string
  requester_name: string
  created_at: string
}

export default function RequestPage() {
  const [type, setType] = useState<'parcel'|'food'|'stationery'>('parcel')
  const [pickup, setPickup] = useState(PICKUPS[0])
  const [drop, setDrop] = useState(HOSTELS[0])
  const [foodFrom, setFoodFrom] = useState(FOOD_PLACES[0])
  const [foodNote, setFoodNote] = useState('')
  const [stationeryNote, setStationeryNote] = useState('')
  const [stationeryFee, setStationeryFee] = useState(2)
  const [note, setNote] = useState('')
  const [requesterName, setRequesterName] = useState('')
  const [requesterContact, setRequesterContact] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [myRequests, setMyRequests] = useState<Request[]>([])
  const [tab, setTab] = useState<'new'|'mine'>('new')

  const fee = type === 'parcel' ? 10 : type === 'food' ? 15 : stationeryFee

  async function fetchMyRequests() {
    const name = localStorage.getItem('pp_name')
    if (!name) return
    const { data } = await supabase.from('delivery_requests').select('*').eq('requester_name', name).order('created_at', { ascending: false })
    setMyRequests(data || [])
  }

  async function handleSubmit() {
    if (!requesterName || !requesterContact) { setError('Please enter your name and contact number.'); return }
    if (type === 'stationery' && !stationeryNote) { setError('Please describe what you need from the stationery shop.'); return }
    setLoading(true)
    setError('')
    const { error: err } = await supabase.from('delivery_requests').insert({
      type,
      pickup_location: type === 'parcel' ? pickup : type === 'food' ? foodFrom : 'Stationery Shop',
      drop_location: drop,
      description: type === 'food' ? foodNote : type === 'stationery' ? stationeryNote : '',
      fee,
      requester_name: requesterName,
      requester_contact: requesterContact,
      note,
      status: 'open',
    })
    setLoading(false)
    if (err) { setError('Something went wrong. Please try again.'); return }
    localStorage.setItem('pp_name', requesterName)
    setSubmitted(true)
  }

  async function cancelRequest(id: string) {
    await supabase.from('delivery_requests').update({ status: 'cancelled' }).eq('id', id)
    fetchMyRequests()
  }

  const inputStyle = { width: '100%', background: 'rgba(255,255,255,0.05)', border: '0.5px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '11px 14px', color: 'var(--text)', fontFamily: 'var(--font-body)', fontSize: 14, outline: 'none' } as React.CSSProperties
  const labelStyle = { display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 7, letterSpacing: '0.6px', textTransform: 'uppercase' } as React.CSSProperties

  if (submitted) return (
    <div className="fade-up" style={{ textAlign: 'center', padding: '80px 24px' }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>🎉</div>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 10 }}>Request Posted!</h2>
      <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 28, lineHeight: 1.7 }}>Your request is now live. A delivery person will contact you shortly. Keep your phone handy.</p>
      <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
        <button onClick={() => { setSubmitted(false); setNote(''); setFoodNote(''); setStationeryNote('') }} style={{ background: 'var(--accent)', color: '#0a0a0f', border: 'none', borderRadius: 12, padding: '13px 28px', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>
          Post Another
        </button>
        <button onClick={() => { setSubmitted(false); setTab('mine'); fetchMyRequests() }} style={{ background: 'transparent', color: 'var(--text)', border: '0.5px solid rgba(255,255,255,0.2)', borderRadius: 12, padding: '13px 28px', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>
          My Requests
        </button>
      </div>
    </div>
  )

  return (
    <div className="fade-up" style={{ paddingTop: 28 }}>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 16 }}>Requests</h1>

      <div style={{ display: 'flex', gap: 4, background: 'rgba(255,255,255,0.05)', borderRadius: 12, padding: 4, marginBottom: 24 }}>
        {(['new','mine'] as const).map(t => (
          <button key={t} onClick={() => { setTab(t); if(t==='mine') fetchMyRequests() }} style={{ flex: 1, padding: '9px', borderRadius: 9, border: 'none', background: tab === t ? 'var(--accent)' : 'transparent', color: tab === t ? '#0a0a0f' : 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)', fontWeight: tab === t ? 600 : 400, fontSize: 13, cursor: 'pointer', transition: 'all 0.2s' }}>
            {t === 'new' ? 'New Request' : 'My Requests'}
          </button>
        ))}
      </div>

      {tab === 'mine' ? (
        <div>
          {myRequests.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px 24px', background: 'var(--bg-card)', border: '0.5px solid var(--border)', borderRadius: 14 }}>
              <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>No requests found. Post one first!</p>
            </div>
          ) : myRequests.map(req => (
            <div key={req.id} style={{ background: 'var(--bg-card)', border: '0.5px solid var(--border)', borderRadius: 14, padding: 16, marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 500, color: '#fff', marginBottom: 4 }}>{req.pickup_location} → {req.drop_location}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Rs.{req.fee} · {req.type} · {new Date(req.created_at).toLocaleTimeString('en-IN', {hour:'2-digit',minute:'2-digit'})}</div>
                </div>
                <span style={{ fontSize: 11, padding: '3px 9px', borderRadius: 6, fontWeight: 500, background: req.status === 'open' ? 'rgba(110,231,183,0.12)' : req.status === 'accepted' ? 'rgba(251,191,36,0.12)' : req.status === 'delivered' ? 'rgba(110,231,183,0.12)' : 'rgba(251,113,133,0.12)', color: req.status === 'open' ? 'var(--accent)' : req.status === 'accepted' ? '#fbbf24' : req.status === 'delivered' ? 'var(--accent)' : '#fb7185' }}>
                  {req.status}
                </span>
              </div>
              {req.status === 'open' && (
                <button onClick={() => cancelRequest(req.id)} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(251,113,133,0.08)', border: '0.5px solid rgba(251,113,133,0.25)', borderRadius: 8, padding: '8px 12px', color: '#fb7185', fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 500, cursor: 'pointer', marginTop: 8 }}>
                  <Trash2 size={13} /> Cancel Request
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <>
          <div style={{ background: 'rgba(251,191,36,0.06)', border: '0.5px solid rgba(251,191,36,0.25)', borderRadius: 12, padding: '14px 16px', marginBottom: 22 }}>
            <p style={{ fontSize: 12, color: '#fbbf24', lineHeight: 1.7, margin: 0 }}>Payment is done directly to the delivery person in cash. Do not pay anyone in advance.</p>
          </div>

          {/* Type selector */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 22 }}>
            {([
              { key: 'parcel', label: 'Parcel', icon: <Package size={20}/> },
              { key: 'food', label: 'Food', icon: <UtensilsCrossed size={20}/> },
              { key: 'stationery', label: 'Stationery', icon: <Pencil size={20}/> },
            ] as const).map(t => (
              <button key={t.key} onClick={() => setType(t.key)} style={{ padding: '12px 6px', borderRadius: 12, cursor: 'pointer', textAlign: 'center', border: type === t.key ? '1.5px solid var(--accent)' : '0.5px solid rgba(255,255,255,0.1)', background: type === t.key ? 'rgba(110,231,183,0.08)' : 'rgba(255,255,255,0.03)', color: type === t.key ? 'var(--accent)' : 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)', transition: 'all 0.2s' }}>
                <div style={{ marginBottom: 5, display: 'flex', justifyContent: 'center' }}>{t.icon}</div>
                <span style={{ fontSize: 12, fontWeight: 500 }}>{t.label}</span>
              </button>
            ))}
          </div>

          {/* Type-specific fields */}
          {type === 'parcel' && (
            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>Pickup Location</label>
              <select value={pickup} onChange={e => setPickup(e.target.value)} style={inputStyle}>
                {PICKUPS.map(p => <option key={p} style={{ background: '#1a1a2e' }}>{p}</option>)}
              </select>
            </div>
          )}

          {type === 'food' && (
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

          {type === 'stationery' && (
            <>
              <div style={{ background: 'rgba(110,231,183,0.06)', border: '0.5px solid rgba(110,231,183,0.15)', borderRadius: 10, padding: '12px 14px', marginBottom: 16 }}>
                <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: 0, lineHeight: 1.6 }}>Stationery items are small — set a fair fee (Rs.1–4) for the carrier based on effort.</p>
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>What do you need?</label>
                <textarea value={stationeryNote} onChange={e => setStationeryNote(e.target.value)} placeholder="e.g. 1 blue pen, 2 A4 sheets, 1 eraser..." rows={3} style={{ ...inputStyle, resize: 'none' }} />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>Carrier Fee (Rs.1 – Rs.4)</label>
                <div style={{ display: 'flex', gap: 8 }}>
                  {[1,2,3,4].map(n => (
                    <button key={n} onClick={() => setStationeryFee(n)} style={{ flex: 1, padding: '11px 0', borderRadius: 10, border: stationeryFee === n ? '1.5px solid var(--accent)' : '0.5px solid rgba(255,255,255,0.1)', background: stationeryFee === n ? 'rgba(110,231,183,0.08)' : 'rgba(255,255,255,0.03)', color: stationeryFee === n ? 'var(--accent)' : 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>
                      Rs.{n}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Deliver To */}
          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>Deliver To</label>
            <select value={drop} onChange={e => setDrop(e.target.value)} style={inputStyle}>
              {HOSTELS.map(h => <option key={h} style={{ background: '#1a1a2e' }}>{h}</option>)}
            </select>
          </div>

          {/* Requester details */}
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

          {/* Fee summary */}
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
        </>
      )}
    </div>
  )
}