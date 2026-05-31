'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Package, Home, MapPin, LayoutDashboard } from 'lucide-react'

const links = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/request', label: 'Request', icon: Package },
  { href: '/live', label: 'Live', icon: MapPin },
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
]

export default function Navbar() {
  const path = usePathname()
  return (
    <>
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', borderBottom: '0.5px solid rgba(255,255,255,0.08)', background: 'rgba(10,10,15,0.95)', backdropFilter: 'blur(12px)', position: 'sticky', top: 0, zIndex: 50 }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 20, letterSpacing: '-0.5px', color: '#fff' }}>
            Parcel<span style={{ color: 'var(--accent)' }}>Pal</span>
          </span>
        </Link>
        <span style={{ background: 'rgba(110,231,183,0.1)', color: 'var(--accent)', border: '0.5px solid var(--accent-border)', borderRadius: 20, padding: '4px 12px', fontSize: 12, fontWeight: 500 }}>
          VIT Bhopal
        </span>
      </header>
      <nav style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: 'rgba(10,10,15,0.97)', borderTop: '0.5px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)', display: 'flex', justifyContent: 'space-around', padding: '10px 0 14px', zIndex: 50 }}>
        {links.map(({ href, label, icon: Icon }) => {
          const active = path === href
          return (
            <Link key={href} href={href} style={{ textDecoration: 'none' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, padding: '6px 20px', borderRadius: 10, background: active ? 'rgba(110,231,183,0.1)' : 'transparent' }}>
                <Icon size={20} color={active ? 'var(--accent)' : 'rgba(255,255,255,0.35)'} />
                <span style={{ fontSize: 11, fontWeight: active ? 600 : 400, color: active ? 'var(--accent)' : 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-body)' }}>
                  {label}
                </span>
              </div>
            </Link>
          )
        })}
      </nav>
    </>
  )
}