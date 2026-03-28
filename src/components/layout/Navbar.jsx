import { useState, useEffect, useRef } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../../hooks/useTheme'
import { useFocusTrap } from '../../hooks/useFocusTrap'

const NAV_LINKS = [
  { label: 'Home',       to: '/'          },
  { label: 'Projects',   to: '/projects'  },
  { label: 'Leadership', to: '/leadership'},
  { label: 'Events',     to: '/events'    },
  { label: 'Sponsors',   to: '/sponsors'  },
  { label: 'Contact',    to: '/contact'   },
]

export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { dark, toggle } = useTheme()
  const drawerRef = useRef(null)
  useFocusTrap(drawerRef, drawerOpen)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [drawerOpen])

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50"
        style={{ height: 'var(--nav-height)', borderBottom: '1px solid' }}
        animate={{
          backgroundColor: scrolled
            ? (dark ? 'rgba(26,26,26,0.92)' : 'rgba(255,255,255,0.92)')
            : (dark ? 'rgba(26,26,26,0)'    : 'rgba(255,255,255,0)'),
          borderBottomColor: scrolled
            ? (dark ? '#2E2E2E' : '#E2E2E0')
            : (dark ? 'rgba(46,46,46,0)' : 'rgba(226,226,224,0)'),
          backdropFilter: scrolled ? 'blur(12px)' : 'blur(0px)',
        }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
      >
        <div className="container h-full flex items-center justify-between">

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 no-underline group"
            onClick={() => setDrawerOpen(false)}
          >
            <img
              src={dark ? '/dark-logo.png' : '/light-logo.png'}
              alt="Stanford Student Robotics"
              style={{ height: '32px', width: 'auto', display: 'block', flexShrink: 0 }}
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(({ label, to }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `relative text-nav no-underline transition-colors duration-200 group ${
                    isActive
                      ? 'text-accent'
                      : 'text-text-secondary hover:text-text-primary'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {label}
                    <span
                      className="absolute -bottom-0.5 left-0 h-px bg-accent transition-all duration-300"
                      style={{ width: isActive ? '100%' : '0%' }}
                    />
                  </>
                )}
              </NavLink>
            ))}

            {/* Dark mode toggle */}
            <button
              onClick={toggle}
              aria-label="Toggle dark mode"
              style={{
                background:  'none',
                border:      'none',
                cursor:      'pointer',
                padding:     '4px',
                color:       'var(--color-text-secondary)',
                display:     'flex',
                alignItems:  'center',
                transition:  'color 0.2s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-text-primary)' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-text-secondary)' }}
            >
              {dark ? (
                // Sun icon
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5"/>
                  <line x1="12" y1="1" x2="12" y2="3"/>
                  <line x1="12" y1="21" x2="12" y2="23"/>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                  <line x1="1" y1="12" x2="3" y2="12"/>
                  <line x1="21" y1="12" x2="23" y2="12"/>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                </svg>
              ) : (
                // Moon icon
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              )}
            </button>

            {/* Join Us CTA button */}
            <Link
              to="/contact"
              style={{
                backgroundColor: 'var(--color-accent)',
                color:           '#fff',
                fontFamily:      'Inter, sans-serif',
                fontSize:        '12px',
                fontWeight:      600,
                letterSpacing:   '0.06em',
                textTransform:   'uppercase',
                padding:         '8px 18px',
                borderRadius:    '4px',
                textDecoration:  'none',
                transition:      'opacity 0.2s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '0.85' }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
            >
              Join Us
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5 cursor-pointer bg-transparent border-none"
            onClick={() => setDrawerOpen(v => !v)}
            aria-label="Toggle navigation"
          >
            <motion.span
              className="block w-5 h-px bg-text-primary origin-center"
              animate={drawerOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block w-5 h-px bg-text-primary origin-center"
              animate={drawerOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
            />
          </button>

        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            {/* Scrim */}
            <motion.div
              className="fixed inset-0 z-40 bg-black/30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setDrawerOpen(false)}
            />

            {/* Drawer panel */}
            <motion.nav
              ref={drawerRef}
              aria-label="Mobile navigation"
              className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-surface flex flex-col pt-24 pb-12 px-8"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <div className="flex flex-col gap-6">
                {NAV_LINKS.map(({ label, to }) => (
                  <NavLink
                    key={to}
                    to={to}
                    end={to === '/'}
                    onClick={() => setDrawerOpen(false)}
                    className={({ isActive }) =>
                      `text-title font-display no-underline transition-colors duration-200 ${
                        isActive ? 'text-accent' : 'text-text-primary'
                      }`
                    }
                    style={{ fontSize: '22px', fontFamily: '"Space Grotesk", sans-serif', fontWeight: 500 }}
                  >
                    {label}
                  </NavLink>
                ))}
              </div>

              <div className="mt-auto">
                <Link
                  to="/contact"
                  onClick={() => setDrawerOpen(false)}
                  style={{
                    display:         'block',
                    backgroundColor: 'var(--color-accent)',
                    color:           '#fff',
                    fontFamily:      'Inter, sans-serif',
                    fontSize:        '13px',
                    fontWeight:      600,
                    letterSpacing:   '0.06em',
                    textTransform:   'uppercase',
                    padding:         '14px 20px',
                    borderRadius:    '4px',
                    textDecoration:  'none',
                    textAlign:       'center',
                    marginBottom:    '24px',
                  }}
                >
                  Join Us
                </Link>
                <div className="w-8 h-px bg-border mb-4" />
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <p className="text-label uppercase text-text-tertiary">Stanford Student Robotics</p>
                  <button
                    onClick={toggle}
                    aria-label="Toggle dark mode"
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-tertiary)', padding: '4px' }}
                  >
                    {dark ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="5"/>
                        <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
                        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                        <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
                        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
