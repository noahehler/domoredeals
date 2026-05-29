import type { ReactNode } from 'react'
import Link from 'next/link'

const NAV = [
  { href: '/admin',           label: 'Dashboard',  icon: '▦' },
  { href: '/admin/contacts',  label: 'Contacts',   icon: '◎' },
  { href: '/admin/campaigns', label: 'Campaigns',  icon: '✉' },
  { href: '/admin/import',    label: 'Import CSV', icon: '↑' },
]

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen" style={{ backgroundColor: '#f3f4f6' }}>
      {/* Sidebar */}
      <aside
        className="w-56 flex-shrink-0 flex flex-col"
        style={{ backgroundColor: '#0f1f3d' }}
      >
        {/* Logo */}
        <div className="px-6 py-5 border-b" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
          <span
            className="text-lg font-bold text-white"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Do<span style={{ color: '#c9a84c' }}>More</span>Deals
          </span>
          <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>
            Admin
          </p>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
              style={{ color: 'rgba(255,255,255,0.7)' }}
            >
              <span style={{ color: '#c9a84c', fontSize: '16px' }}>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-6 py-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
          <Link
            href="/"
            className="text-xs"
            style={{ color: 'rgba(255,255,255,0.4)' }}
          >
            ← Back to site
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto p-8">
        {children}
      </main>
    </div>
  )
}
