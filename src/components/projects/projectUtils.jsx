/**
 * Shared utilities for the Projects section.
 * All project rendering logic derives from projects.json — no hardcoding.
 */
import { useState } from 'react'

// ── Category style map ───────────────────────────────────────────
const CATEGORY_STYLES = {
  'Aerial':       { color: '#3B5BDB', bg: '#EDF2FF', gradientA: '#0F172A', gradientB: '#1E3A5F' },
  'Underwater':   { color: '#0C7A65', bg: '#E6F7F4', gradientA: '#0F2027', gradientB: '#0C4A6E' },
  'Ground':       { color: '#78350F', bg: '#FEF3C7', gradientA: '#1C1714', gradientB: '#292218' },
  'Conservation': { color: '#2D8A0C', bg: '#EDFCE8', gradientA: '#0F1F0C', gradientB: '#14532D' },
  'Sensing':      { color: '#6D28D9', bg: '#F5F3FF', gradientA: '#150D2A', gradientB: '#2E1065' },
  'Competition':  { color: '#9F1239', bg: '#FFF1F2', gradientA: '#1C0A0D', gradientB: '#881337' },
  'Fun':          { color: '#C05621', bg: '#FFF3E8', gradientA: '#1C1208', gradientB: '#431407' },
}
const FALLBACK_STYLE = { color: '#5C5C5C', bg: '#F0F0EE', gradientA: '#141414', gradientB: '#262626' }

export function getCategoryStyle(category) {
  return CATEGORY_STYLES[category] ?? FALLBACK_STYLE
}

// ── CategoryTag ──────────────────────────────────────────────────
export function CategoryTag({ category }) {
  if (!category) return null
  const s = getCategoryStyle(category)
  return (
    <span style={{
      display:         'inline-flex',
      alignItems:      'center',
      fontFamily:      'Plus Jakarta Sans, sans-serif',
      fontSize:        '10px',
      fontWeight:      600,
      letterSpacing:   '0.09em',
      textTransform:   'uppercase',
      color:           s.color,
      backgroundColor: s.bg,
      borderRadius:    '4px',
      padding:         '3px 8px',
      flexShrink:      0,
    }}>
      {category}
    </span>
  )
}

// ── StatusDot ────────────────────────────────────────────────────
export function StatusDot({ status }) {
  if (!status) return null
  const active = status === 'Active'
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', flexShrink: 0 }}>
      <div style={{
        width:           '6px',
        height:          '6px',
        borderRadius:    '50%',
        backgroundColor: active ? '#16A34A' : '#9CA3AF',
        flexShrink:      0,
      }} />
      <span style={{
        fontFamily: 'Plus Jakarta Sans, sans-serif',
        fontSize:   '11px',
        fontWeight: 500,
        color:      'var(--color-text-tertiary)',
      }}>
        {status}
      </span>
    </div>
  )
}

// ── Gradient placeholder (no image available) ────────────────────
// Dark gradient tinted by category, with a subtle dot grid and
// centered title. Visually consistent across all cards.
function ProjectPlaceholder({ project, style }) {
  const { gradientA, gradientB, color } = getCategoryStyle(project.category)

  return (
    <div
      style={{
        width:    '100%',
        height:   '100%',
        display:  'flex',
        alignItems:     'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: `linear-gradient(150deg, ${gradientA} 0%, ${gradientB} 100%)`,
        ...style,
      }}
    >
      {/* Dot grid overlay */}
      <div style={{
        position: 'absolute',
        inset:    0,
        backgroundImage:
          'radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
        pointerEvents: 'none',
      }} />

      {/* Category accent bar at bottom */}
      <div style={{
        position:        'absolute',
        bottom:          0,
        left:            0,
        right:           0,
        height:          '3px',
        backgroundColor: color,
        opacity:         0.55,
      }} />

      {/* Centered title */}
      <div style={{ position: 'relative', textAlign: 'center', padding: '20px 24px' }}>
        <p style={{
          fontFamily:    '"Space Grotesk", sans-serif',
          fontSize:      '14px',
          fontWeight:    600,
          letterSpacing: '-0.01em',
          lineHeight:    1.35,
          color:         'rgba(255,255,255,0.7)',
          margin:        0,
        }}>
          {project.title}
        </p>
      </div>
    </div>
  )
}

// ── ProjectImage ─────────────────────────────────────────────────
// Drop-in replacement for <img> in all project cards.
// Renders the real image if available; falls back to ProjectPlaceholder.
// Uses blur-up: shows a tinted skeleton while the image loads, then
// cross-fades to the real image on load.
export function ProjectImage({ project, style }) {
  const [loaded, setLoaded] = useState(false)
  const { gradientA, gradientB } = getCategoryStyle(project.category)

  const hasImage =
    project.image &&
    project.image !== '' &&
    !project.image.startsWith('/placeholders')

  if (hasImage) {
    return (
      <div style={{ width: '100%', height: '100%', position: 'relative', ...style }}>
        {/* Skeleton — visible until image loads */}
        <div style={{
          position:   'absolute',
          inset:      0,
          background: `linear-gradient(150deg, ${gradientA} 0%, ${gradientB} 100%)`,
          opacity:    loaded ? 0 : 1,
          transition: 'opacity 0.4s ease',
          pointerEvents: 'none',
        }} />
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          style={{
            width:      '100%',
            height:     '100%',
            objectFit:  'cover',
            display:    'block',
            opacity:    loaded ? 1 : 0,
            transition: 'opacity 0.4s ease',
          }}
        />
      </div>
    )
  }

  return <ProjectPlaceholder project={project} style={style} />
}
