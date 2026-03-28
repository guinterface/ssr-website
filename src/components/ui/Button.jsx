import { Link } from 'react-router-dom'
import { duration, ease } from '../../lib/motion'

// ── Arrow icon ────────────────────────────────────────────────────
function Arrow({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M2.5 7h9M7.5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

// ── Slack icon ────────────────────────────────────────────────────
function SlackIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"/>
    </svg>
  )
}

const BASE = {
  display:       'inline-flex',
  alignItems:    'center',
  gap:           '8px',
  fontFamily:    'Inter, sans-serif',
  fontSize:      '13px',
  fontWeight:    600,
  letterSpacing: '0.05em',
  textTransform: 'uppercase',
  borderRadius:  '4px',
  textDecoration:'none',
  cursor:        'pointer',
  border:        'none',
  transition:    `opacity ${duration.base}s ease, transform ${duration.base}s ease, border-color ${duration.base}s ease, color ${duration.base}s ease`,
}

const VARIANTS = {
  primary: {
    backgroundColor: 'var(--color-accent)',
    color:           '#fff',
    padding:         '13px 26px',
  },
  ghost: {
    backgroundColor: 'transparent',
    color:           'var(--color-text-secondary)',
    padding:         '12px 24px',
    border:          '1px solid var(--color-border)',
  },
  outline: {
    backgroundColor: 'transparent',
    color:           'var(--color-accent)',
    padding:         '12px 24px',
    border:          '1px solid var(--color-border)',
  },
}

function hover(el, variant) {
  if (variant === 'primary') {
    el.style.opacity   = '0.88'
    el.style.transform = 'translateY(-1px)'
  } else if (variant === 'ghost') {
    el.style.borderColor = 'var(--color-text-tertiary)'
    el.style.color       = 'var(--color-text-primary)'
    el.style.transform   = 'translateY(-1px)'
  } else if (variant === 'outline') {
    el.style.borderColor = 'var(--color-accent)'
    el.style.transform   = 'translateY(-1px)'
  }
}

function leave(el, variant) {
  el.style.opacity     = '1'
  el.style.transform   = 'translateY(0)'
  if (variant === 'ghost') {
    el.style.borderColor = 'var(--color-border)'
    el.style.color       = 'var(--color-text-secondary)'
  } else if (variant === 'outline') {
    el.style.borderColor = 'var(--color-border)'
  }
}

/**
 * Button — unified interactive element.
 *
 * Props:
 *   variant  — 'primary' | 'ghost' | 'outline'  (default 'primary')
 *   to       — internal React Router path (renders <Link>)
 *   href     — external URL (renders <a target="_blank">)
 *   onClick  — click handler (renders <button>)
 *   icon     — 'arrow' | 'slack' | null
 *   children — button label
 */
export default function Button({
  variant  = 'primary',
  to,
  href,
  onClick,
  icon     = 'arrow',
  children,
  style    = {},
}) {
  const merged = { ...BASE, ...VARIANTS[variant], ...style }
  const events = {
    onMouseEnter: e => hover(e.currentTarget, variant),
    onMouseLeave: e => leave(e.currentTarget, variant),
  }

  const content = (
    <>
      {icon === 'slack' && <SlackIcon />}
      {children}
      {icon === 'arrow' && <Arrow />}
    </>
  )

  if (to) {
    return <Link to={to} style={merged} {...events}>{content}</Link>
  }
  if (href) {
    return <a href={href} target="_blank" rel="noopener noreferrer" style={merged} {...events}>{content}</a>
  }
  return <button type="button" onClick={onClick} style={merged} {...events}>{content}</button>
}
