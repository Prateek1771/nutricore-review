import { useEffect, useState } from 'react'
import { NcButtonPrimary } from './ui/nc-button'

const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'App Pages', href: '#pages' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Feedback', href: '#feedback' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-nc-bg/80 backdrop-blur-xl border-b border-black/[0.06] shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <span className="w-7 h-7 rounded-lg bg-nc-dark flex items-center justify-center">
            <span className="text-white text-xs font-bold font-serif">N</span>
          </span>
          <span className="font-semibold text-nc-text text-sm tracking-tight">NutriCore</span>
        </a>

        {/* Links */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="px-3 py-1.5 text-sm text-nc-text-secondary hover:text-nc-text rounded-full hover:bg-black/5 transition-all duration-200"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <NcButtonPrimary size="sm" onClick={() => document.getElementById('feedback')?.scrollIntoView({ behavior: 'smooth' })}>
          Leave Feedback
        </NcButtonPrimary>
      </div>
    </nav>
  )
}
