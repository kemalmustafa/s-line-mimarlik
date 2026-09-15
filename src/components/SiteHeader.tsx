'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

const links = [
  { href: '/', label: 'Anasayfa' },
  { href: '/hakkimizda', label: 'Hakkımızda' },
  { href: '/hizmetler', label: 'Hizmetlerimiz' },
  { href: '/projeler', label: 'Projelerimiz' },
  { href: '/iletisim', label: 'İletişim' },
]

export default function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)

  const isHome = pathname === '/'

  function isActive(href: string) {
    return href === '/'
      ? pathname === '/'
      : pathname === href || pathname.startsWith(`${href}/`)
  }

  useEffect(() => {
    if (!open) return

    function handleKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }

    function handleOutsideClick(event: PointerEvent) {
      if (
        event.target instanceof Node &&
        !headerRef.current?.contains(event.target)
      ) {
        setOpen(false)
      }
    }

    function handleResize() {
      if (window.innerWidth >= 1024) {
        setOpen(false)
      }
    }

    window.addEventListener('keydown', handleKey)
    window.addEventListener('pointerdown', handleOutsideClick)
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('keydown', handleKey)
      window.removeEventListener('pointerdown', handleOutsideClick)
      window.removeEventListener('resize', handleResize)
    }
  }, [open])

  return (
    <header
      ref={headerRef}
      className={`sline-header ${isHome ? 'sline-header--home' : ''}`}
    >
      <div className="sline-header__bar">
        <Link
          href="/"
          aria-label="S-Line Dekorasyon anasayfa"
          onClick={() => setOpen(false)}
          className="sline-header__brand"
        >
          <span>S-LINE</span>
          <small>DEKORASYON</small>
        </Link>

        <nav
          className="sline-header__desktop"
          aria-label="Ana menü"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={
                isActive(link.href)
                  ? pathname === link.href
                    ? 'page'
                    : 'location'
                  : undefined
              }
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/iletisim"
          className="sline-header__contact"
        >
          Projenizi konuşalım <span aria-hidden="true">↗</span>
        </Link>

        <button
          ref={toggleRef}
          id="mobile-menu-toggle"
          type="button"
          className="sline-header__toggle"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? 'Menüyü kapat' : 'Menüyü aç'}
          onClick={() => setOpen((previous) => !previous)}
        >
          <span
            aria-hidden="true"
            className={`sline-menu-icon ${open ? 'is-open' : ''}`}
          >
            <span />
            <span />
            <span />
          </span>
        </button>
      </div>

      <div
        className={`sline-menu-panel ${open ? 'is-open' : ''}`}
        inert={!open}
      >
        <div className="sline-menu-panel__clip">
          <nav
            id="mobile-navigation"
            aria-label="Mobil ana menü"
            className="sline-menu-links"
          >
            {links.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                aria-current={
                  isActive(link.href)
                    ? pathname === link.href
                      ? 'page'
                      : 'location'
                    : undefined
                }
                style={{
                  transitionDelay: open
                    ? `${60 + index * 45}ms`
                    : '0ms',
                }}
              >
                <span>{link.label}</span>
                <span aria-hidden="true">↗</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}