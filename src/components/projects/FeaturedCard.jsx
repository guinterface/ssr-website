import { useState } from 'react'
import { motion } from 'framer-motion'
import { ProjectImage, CategoryTag, StatusDot } from './projectUtils'

/**
 * Horizontal featured card.
 * Image fills the left side (fixed width); content sits on the right.
 *
 * Props:
 *   project  — project object from projects.json
 *   onSelect — called with the project on click
 *   large    — first featured card gets taller, more generous treatment
 *   variants — Framer Motion stagger variants
 */
export default function FeaturedCard({ project, onSelect, large = false, variants }) {
  const [hovered, setHovered] = useState(false)

  const height     = large ? '380px' : '292px'
  const imgWidth   = large ? '48%'   : '44%'
  const contentPad = large ? '44px 48px' : '32px 36px'
  const titleSize  = large ? 'clamp(20px, 2.2vw, 26px)' : '20px'

  return (
    <motion.article
      variants={variants}
      onClick={() => onSelect(project)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display:         'flex',
        height,
        borderRadius:    '14px',
        overflow:        'hidden',
        backgroundColor: 'var(--color-surface)',
        border:          `1px solid ${hovered ? '#BEBCBA' : 'var(--color-border)'}`,
        boxShadow:       hovered
          ? '0 20px 56px rgba(0,0,0,0.12)'
          : '0 2px 8px rgba(0,0,0,0.04)',
        cursor:    'pointer',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        transition:'border-color 0.28s ease, box-shadow 0.32s ease, transform 0.3s ease',
      }}
    >
      {/* ── Image side ─────────────────────────────────── */}
      <div style={{ width: imgWidth, flexShrink: 0, overflow: 'hidden' }}>
        <ProjectImage
          project={project}
          style={{
            transform:  hovered ? 'scale(1.07)' : 'scale(1.02)',
            transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />
      </div>

      {/* ── Content side ──────────────────────────────── */}
      <div style={{
        flex:           1,
        padding:        contentPad,
        display:        'flex',
        flexDirection:  'column',
        justifyContent: 'space-between',
        minWidth:       0,
        borderLeft:     '1px solid var(--color-border)',
      }}>

        {/* Top: category + status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <CategoryTag category={project.category} />
          <StatusDot   status={project.status}   />
        </div>

        {/* Middle: title + description */}
        <div>
          <h3 style={{
            fontFamily:    '"Space Grotesk", sans-serif',
            fontSize:      titleSize,
            fontWeight:    600,
            lineHeight:    1.15,
            letterSpacing: '-0.025em',
            color:         'var(--color-text-primary)',
            marginBottom:  '14px',
          }}>
            {project.title}
          </h3>
          <p style={{
            fontFamily:      'Plus Jakarta Sans, sans-serif',
            fontSize:        '14px',
            lineHeight:      1.75,
            color:           'var(--color-text-secondary)',
            margin:          0,
            display:         '-webkit-box',
            WebkitLineClamp: large ? 4 : 3,
            WebkitBoxOrient: 'vertical',
            overflow:        'hidden',
          }}>
            {project.description}
          </p>
        </div>

        {/* Bottom: CTA arrow */}
        <div style={{
          display:    'inline-flex',
          alignItems: 'center',
          gap:        hovered ? '9px' : '5px',
          fontFamily: 'Plus Jakarta Sans, sans-serif',
          fontSize:   '12px',
          fontWeight: 600,
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          color:      hovered ? 'var(--color-accent)' : 'var(--color-text-tertiary)',
          transition: 'gap 0.22s ease, color 0.22s ease',
          userSelect: 'none',
        }}>
          Explore
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M2.5 7h9M7.5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

      </div>
    </motion.article>
  )
}
