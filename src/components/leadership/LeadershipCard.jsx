import { useState } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from 'framer-motion'

// ── Image resolver ────────────────────────────────────────────────
// Uses the member's real image URL when present.
// Falls back to a gradient placeholder (never a broken image).
function hasRealImage(member) {
  return (
    member.image &&
    member.image !== '' &&
    member.image !== null &&
    !member.image.startsWith('/placeholders')
  )
}

// ── Gradient placeholder ──────────────────────────────────────────
// Dark, minimal — consistent with the project card placeholders.
function MemberPlaceholder({ member, style }) {
  const initials = member.name
    .split(' ')
    .map(w => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  return (
    <div
      style={{
        width:           '100%',
        height:          '100%',
        background:      'linear-gradient(160deg, var(--color-placeholder-a) 0%, var(--color-placeholder-b) 100%)',
        display:         'flex',
        alignItems:      'center',
        justifyContent:  'center',
        position:        'relative',
        overflow:        'hidden',
        ...style,
      }}
    >
      {/* Dot grid */}
      <div style={{
        position:        'absolute',
        inset:           0,
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
        backgroundSize:  '20px 20px',
        pointerEvents:   'none',
      }} />
      {/* Initials */}
      <span style={{
        position:      'relative',
        fontFamily:    '"Space Grotesk", sans-serif',
        fontSize:      '28px',
        fontWeight:    600,
        color:         'rgba(255,255,255,0.55)',
        letterSpacing: '-0.02em',
        userSelect:    'none',
      }}>
        {initials}
      </span>
    </div>
  )
}

// ── Card ──────────────────────────────────────────────────────────
export default function LeadershipCard({ member, variants }) {
  const [hovered,     setHovered]     = useState(false)
  const [imgLoaded,   setImgLoaded]   = useState(false)
  const [mousePos,    setMousePos]    = useState({ x: 0, y: 0 })
  const reducedMotion = useReducedMotion()
  const showImage = hasRealImage(member)

  // 3D tilt — compute rotateX/Y from mouse position within card
  function onMouseMove(e) {
    if (reducedMotion) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width  - 0.5  // -0.5 → 0.5
    const y = (e.clientY - rect.top)  / rect.height - 0.5
    setMousePos({ x, y })
  }

  const tiltStyle = hovered && !reducedMotion
    ? {
        transform:    `perspective(600px) rotateY(${mousePos.x * 8}deg) rotateX(${-mousePos.y * 8}deg) translateY(-5px)`,
        boxShadow:    '0 16px 40px rgba(0,0,0,0.09)',
      }
    : {
        transform:    'perspective(600px) rotateY(0deg) rotateX(0deg) translateY(0)',
        boxShadow:    'none',
      }

  return (
    <motion.div
      variants={variants}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setMousePos({ x: 0, y: 0 }) }}
      onMouseMove={onMouseMove}
      style={{
        ...tiltStyle,
        borderRadius: '8px',
        transition:   'transform 0.25s cubic-bezier(0.4,0,0.2,1), box-shadow 0.25s ease',
        willChange:   'transform',
      }}
    >
      {/* Portrait — 3:4 */}
      <div style={{
        aspectRatio:     '3 / 4',
        overflow:        'hidden',
        borderRadius:    '8px',
        backgroundColor: 'var(--color-surface-muted)',
        position:        'relative',
      }}>
        {showImage ? (
          <>
            {/* Blur-up skeleton */}
            <div style={{
              position:   'absolute',
              inset:      0,
              background: 'linear-gradient(160deg, var(--color-placeholder-a) 0%, var(--color-placeholder-b) 100%)',
              opacity:    imgLoaded ? 0 : 1,
              transition: 'opacity 0.4s ease',
              pointerEvents: 'none',
            }} />
            <img
              src={member.image}
              alt={member.name}
              loading="lazy"
              decoding="async"
              onLoad={() => setImgLoaded(true)}
              style={{
                width:      '100%',
                height:     '100%',
                objectFit:  'cover',
                display:    'block',
                opacity:    imgLoaded ? 1 : 0,
                transform:  hovered ? 'scale(1.05)' : 'scale(1)',
                transition: 'transform 0.55s cubic-bezier(0.4,0,0.2,1), opacity 0.4s ease',
              }}
            />
          </>
        ) : (
          <MemberPlaceholder
            member={member}
            style={{
              transform:  hovered ? 'scale(1.05)' : 'scale(1)',
              transition: 'transform 0.55s cubic-bezier(0.4,0,0.2,1)',
            }}
          />
        )}
      </div>

      {/* Text */}
      <div style={{ padding: '18px 2px 10px' }}>
        <p style={{
          fontFamily:    '"Space Grotesk", sans-serif',
          fontSize:      '15px',
          fontWeight:    600,
          lineHeight:    1.25,
          letterSpacing: '-0.01em',
          color:         'var(--color-text-primary)',
          marginBottom:  '8px',
        }}>
          {member.name}
        </p>
        <p style={{
          fontFamily:    'Inter, sans-serif',
          fontSize:      '11px',
          fontWeight:    600,
          letterSpacing: '0.07em',
          textTransform: 'uppercase',
          color:         hovered ? 'var(--color-accent)' : 'var(--color-text-tertiary)',
          transition:    'color 0.2s ease',
          lineHeight:    1.4,
          marginBottom:  '4px',
        }}>
          {member.role}
        </p>
      </div>
    </motion.div>
  )
}
