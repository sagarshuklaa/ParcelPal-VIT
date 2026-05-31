'use client'
import { useState } from 'react'
import { Mail, Lock, User, Building } from 'lucide-react'

export default function AuthPage() {
  const [mode, setMode] = useState<'login'|'signup'>('login')

  const inputStyle = { width: '100%', background: 'rgba(255,255,255,0.05)', border: '0.5px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '11px 14px 11px 40px', color: 'var(--text)', fontFamily: 'var(--font-body)', fontSize: 14, outline: 'none' } as React.CSSProperties

  return (
    <div className="fade-up" style={{ paddingTop: 48, maxWidth: 380, margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800, color: '#fff', marginBottom: 8 }}>
          {mode === 'login' ? 'Welcome back' : 'Join ParcelPal'}
        </h1>
        <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>
          {mode === 'login' ? 'Log in to your VIT account' : 'Create your account with VIT email'}
        </p>
      </div>

      <div style={{ background: 'var(--bg-card)', border: '0.5px solid var(--border)', borderRadius: 18, padding: 24 }}>
        {mode === 'signup' && (
          <>
            <div style={{ marginBottom: 14, position: 'relative' }}>
              <User size={15} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input placeholder="Full name" style={inputStyle} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
              <div style={{ position: 'relative' }}>
                <Building size={15} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input placeholder="Block (A/B/C)" style={inputStyle} />
              </div>
              <input placeholder="Room No." style={{ ...inputStyle, paddingLeft: 14 }} />
            </div>
          </>
        )}

        <div style={{ marginBottom: 14, position: 'relative' }}>
          <Mail size={15} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input placeholder="name@vitstudent.ac.in" type="email" style={inputStyle} />
        </div>

        <div style={{ marginBottom: 20, position: 'relative' }}>
          <Lock size={15} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input placeholder="Password" type="password" style={inputStyle} />
        </div>

        <button style={{ width: '100%', background: 'var(--accent)', color: '#0a0a0f', border: 'none', borderRadius: 12, padding: 13, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>
          {mode === 'login' ? 'Log In' : 'Create Account'}
        </button>

        <div style={{ textAlign: 'center', marginTop: 16, fontSize: 13, color: 'var(--text-muted)' }}>
          {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <button onClick={() => setMode(mode === 'login' ? 'signup' : 'login')} style={{ background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 500 }}>
            {mode === 'login' ? 'Sign up' : 'Log in'}
          </button>
        </div>
      </div>

      <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--text-faint)', marginTop: 16 }}>
        Only @vitstudent.ac.in emails allowed
      </p>
    </div>
  )
}
