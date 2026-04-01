import { useState } from 'react'
import { motion } from 'framer-motion'
import { ProjectImage, CategoryTag, StatusDot } from './projectUtils'

/**
 * Editorial project card.
 *
 * Design: the image "floats" — it sits in its own inset container that
 * extends above the card's top border. This creates a layered, non-generic
 * look. The card body underneath has clear typographic hierarchy.
 *
 * overflow: visible on the article lets the image container poke above.
 * The parent grid adds paddingTop to compensate (see ProjectGrid).
 */
export default function ProjectCard({ project, onSelect, variants }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.article
      variants={variants}
      onClick={() => onSelect(project)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius:    '14px',
        overflow:        'visible',
        backgroundColor: 'var(--color-surface)',
        border:          `1px solid ${hovered ? '#BEBCBA' : 'var(--color-border)'}`,
        boxShadow:       hovered
          ? '0 20px 56px rgba(0,0,0,0.11)'
          : '0 2px 8px rgba(0,0,0,0.04)',
        cursor:    'pointer',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        transition:'border-color 0.25s ease, box-shadow 0.3s ease, transform 0.3s ease',
        position:  'relative',
      }}
    >
      {/* ── Floating image ──────────────────────────────────
          Inset 12px on each side, extends 22px above card boundary.
          Own border-radius and shadow give it a "card on top of card" feel.  */}
      <div style={{
        margin:       '-22px 12px 0',
        height:       '210px',
        borderRadius: '10px',
        overflow:     'hidden',
        boxShadow:    hovered
          ? '0 12px 36px rgba(0,0,0,0.18)'
          : '0 6px 20px rgba(0,0,0,0.12)',
        transition:   'box-shadow 0.3s ease',
        position:     'relative',
        zIndex:       1,
      }}>
        <ProjectImage
          project={project}
          style={{
            transform:  hovered ? 'scale(1.07)' : 'scale(1.02)',
            transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />
      </div>

      {/* ── Card body ─────────────────────────────────────── */}
      <div style={{ padding: '20px 22px 28px' }}>

        {/* Category + status */}
        <div style={{
          display:      'flex',
          alignItems:   'center',
          gap:          '8px',
          marginBottom: '14px',
          flexWrap:     'wrap',
        }}>
          <CategoryTag category={project.category} />
          <StatusDot   status={project.status}   />
        </div>

        {/* Title */}
        <h3 style={{
          fontFamily:    '"Space Grotesk", sans-serif',
          fontSize:      '18px',
          fontWeight:    600,
          lineHeight:    1.2,
          letterSpacing: '-0.02em',
          color:         'var(--color-text-primary)',
          marginBottom:  '10px',
        }}>
          {project.title}
        </h3>

        {/* Description — 2-line clamp */}
        <p style={{
          fontFamily:      'Plus Jakarta Sans, sans-serif',
          fontSize:        '13px',
          lineHeight:      1.7,
          color:           'var(--color-text-secondary)',
          display:         '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow:        'hidden',
          margin:          0,
        }}>
          {project.description}
        </p>

      </div>
    </motion.article>
  )
}
