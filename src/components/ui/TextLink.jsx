import { Link } from 'react-router-dom'
import { useState } from 'react'

/**
 * TextLink — animated arrow link, used for in-page CTAs and "view more" actions.
 *
 * Props:
 *   to       — internal React Router path
 *   href     — external URL
 *   onClick  — click handler
 *   back     — show back arrow (←) instead of forward (→)
 *   size     — 'sm' | 'md' (default 'md')
 *   muted    — use text-tertiary color instead of accent
 *   children — link label
 */
export default function TextLink({
  to,
  href,
  onClick,
  back    = false,
  size    = 'md',
  muted   = false,
  children,
  style   = {},
}) {
  const [hovered, setHovered] = useState(false)

  const styles = {
    display:       'inline-flex',
    alignItems:    'center',
    gap:           hovered ? '10px' : '6px',
    fontFamily:    'Plus Jakarta Sans, sans-serif',
    fontSize:      size === 'sm' ? '12px' : '13px',
    fontWeight:    600,
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    color:         muted ? 'var(--color-text-tertiary)' : 'var(--color-accent)',
    textDecoration:'none',
    cursor:        'pointer',
    background:    'none',
    border:        'none',
    padding:       0,
    transition:    'gap 0.2s ease, color 0.2s ease',
    ...style,
  }

  const onEnter = () => setHovered(true)
  const onLeave = () => setHovered(false)

  // Arrows
  const ArrowFwd = () => (
    <svg width="11" height="11" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M2.5 7h9M7.5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
  const ArrowBack = () => (
    <svg width="11" height="11" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M11.5 7h-9M5.5 3l-4 4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )

  const content = (
    <>
      {back && <ArrowBack />}
      {children}
      {!back && <ArrowFwd />}
    </>
  )

  if (to) {
    return <Link to={to} style={styles} onMouseEnter={onEnter} onMouseLeave={onLeave}>{content}</Link>
  }
  if (href) {
    return <a href={href} target="_blank" rel="noopener noreferrer" style={styles} onMouseEnter={onEnter} onMouseLeave={onLeave}>{content}</a>
  }
  return <button type="button" onClick={onClick} style={styles} onMouseEnter={onEnter} onMouseLeave={onLeave}>{content}</button>
}
