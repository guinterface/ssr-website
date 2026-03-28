import { useState } from 'react'
import { motion } from 'framer-motion'
import { ProjectImage, CategoryTag } from './projectUtils'

// ─────────────────────────────────────────────────────────────────
// Design tokens — vary by slot hierarchy level
// ─────────────────────────────────────────────────────────────────

// Title typography
const TITLE = {
  hero: { size: 'clamp(32px, 5vw, 64px)',   weight: 700, ls: '-0.045em', lh: 0.94 },
  lg:   { size: 'clamp(22px, 2.8vw, 34px)', weight: 600, ls: '-0.03em',  lh: 1.0  },
  md:   { size: 'clamp(18px, 2.2vw, 26px)', weight: 600, ls: '-0.028em', lh: 1.05 },
  sm:   { size: 'clamp(16px, 1.8vw, 22px)', weight: 600, ls: '-0.025em', lh: 1.08 },
}

// Gradient — stronger for smaller slots (image is shorter, text needs more contrast)
const GRADIENT = {
  hero: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.30) 48%, rgba(0,0,0,0.06) 72%, transparent 100%)',
  lg:   'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.38) 55%, rgba(0,0,0,0.10) 80%, transparent 100%)',
  md:   'linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.48) 62%, rgba(0,0,0,0.18) 100%)',
  sm:   'linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.55) 70%, rgba(0,0,0,0.22) 100%)',
}

// Inner padding — generous for large slots, compact for small
const PAD = {
  hero: 'clamp(20px, 3.5vw, 44px)',
  lg:   'clamp(14px, 2.5vw, 28px)',
  md:   '12px 14px',
  sm:   '12px 14px',
}

// Show description only where there's room
const SHOW_DESC = { hero: true, lg: true, md: true, sm: true }
// Description line clamp per level
const DESC_LINES = { hero: 2, lg: 1, md: 1, sm: 1 }

// ─────────────────────────────────────────────────────────────────
// EditorialBlock — fully image-first.
//
// The project name, category, and (for larger slots) a short
// description are all rendered INSIDE the image via a gradient
// overlay. No text lives below the image.
// ─────────────────────────────────────────────────────────────────
function EditorialBlock({
  project,
  onSelect,
  imageHeight,
  level = 'md',
  style = {},
}) {
  const [hovered, setHovered] = useState(false)
  const t = TITLE[level]

  return (
    <motion.div
      onClick={() => onSelect(project)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -50px 0px' }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      style={{ cursor: 'pointer', ...style }}
    >
      <div style={{
        height:          imageHeight,
        overflow:        'hidden',
        position:        'relative',
        backgroundColor: 'var(--color-surface-muted)',
      }}>

        {/* ── Photo ── */}
        <ProjectImage
          project={project}
          style={{
            transform:  hovered ? 'scale(1.07)' : 'scale(1.02)',
            transition: 'transform 0.85s cubic-bezier(0.4,0,0.2,1)',
          }}
        />

        {/* ── Gradient overlay — darkens the image for text legibility ── */}
        <div style={{
          position:      'absolute',
          inset:         0,
          background:    GRADIENT[level],
          pointerEvents: 'none',
          // Slightly deepen on hover so text stays crisp while photo scales
          opacity:       hovered ? 1.0 : 0.92,
          transition:    'opacity 0.3s ease',
        }} />

        {/* ── Text content burned into the image ── */}
        <div style={{
          position:       'absolute',
          inset:          0,
          display:        'flex',
          flexDirection:  'column',
          justifyContent: 'flex-end',
          padding:        PAD[level],
          pointerEvents:  'none',
        }}>
          {/* Category tag */}
          <div style={{ marginBottom: level === 'sm' ? '5px' : '8px' }}>
            <CategoryTag category={project.category} />
          </div>

          {/* Title */}
          <h2 style={{
            fontFamily:    '"Space Grotesk", sans-serif',
            fontSize:      t.size,
            fontWeight:    t.weight,
            lineHeight:    t.lh,
            letterSpacing: t.ls,
            color:         '#fff',
            margin:        SHOW_DESC[level] ? '0 0 10px' : '0',
            maxWidth:      level === 'hero' ? '16ch' : level === 'lg' ? '20ch' : '22ch',
            // Hover: title brightens very slightly
            textShadow:    hovered ? '0 1px 8px rgba(0,0,0,0.4)' : 'none',
            transition:    'text-shadow 0.25s ease',
          }}>
            {project.title}
          </h2>

          {/* Description — hero and lg only */}
          {SHOW_DESC[level] && project.description && (
            <p style={{
              fontFamily:      'Inter, sans-serif',
              fontSize:        level === 'hero' ? 'clamp(12px, 1.1vw, 14px)' : '12px',
              lineHeight:      1.6,
              color:           'rgba(255,255,255,0.65)',
              margin:          0,
              maxWidth:        level === 'hero' ? '48ch' : '36ch',
              display:         '-webkit-box',
              WebkitLineClamp: DESC_LINES[level],
              WebkitBoxOrient: 'vertical',
              overflow:        'hidden',
            }}>
              {project.description}
            </p>
          )}
        </div>

        {/* ── Hover arrow — top-right corner ── */}
        <div style={{
          position:        'absolute',
          top:             '14px',
          right:           '14px',
          width:           '32px',
          height:          '32px',
          borderRadius:    '50%',
          backgroundColor: 'rgba(255,255,255,0.15)',
          backdropFilter:  'blur(8px)',
          display:         'flex',
          alignItems:      'center',
          justifyContent:  'center',
          opacity:         hovered ? 1 : 0,
          transform:       hovered ? 'scale(1)' : 'scale(0.7)',
          transition:      'opacity 0.22s ease, transform 0.22s ease',
        }}>
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
            <path d="M2.5 7h9M7.5 3l4 4-4 4" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

      </div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────────
// Overflow editorial bands — for any projects beyond slot 9.
// Alternating asymmetric pairs so overflow never becomes a grid.
// ─────────────────────────────────────────────────────────────────
function OverflowBands({ projects, onSelect }) {
  const bands = []
  let i = 0

  while (i < projects.length) {
    if (i + 1 >= projects.length) {
      // Lone remainder → full-width, lg treatment
      bands.push(
        <EditorialBlock
          key={projects[i].id}
          project={projects[i]}
          onSelect={onSelect}
          imageHeight="clamp(200px, 24vw, 300px)"
          level="lg"
          style={{ width: '100%' }}
        />
      )
      i++
    } else {
      const even = (bands.length % 2) === 0
      bands.push(
        <div
          key={`overflow-${i}`}
          style={{
            display:             'grid',
            gridTemplateColumns: even
              ? 'minmax(0,4fr) minmax(0,8fr)'
              : 'minmax(0,8fr) minmax(0,4fr)',
            gap:         '4px',
            alignItems:  'start',
          }}
        >
          {even ? (
            <>
              <EditorialBlock
                project={projects[i]}
                onSelect={onSelect}
                imageHeight="clamp(200px,24vw,300px)"
                level="md"
              />
              <EditorialBlock
                project={projects[i + 1]}
                onSelect={onSelect}
                imageHeight="clamp(260px,32vw,400px)"
                level="lg"
              />
            </>
          ) : (
            <>
              <EditorialBlock
                project={projects[i]}
                onSelect={onSelect}
                imageHeight="clamp(260px,32vw,400px)"
                level="lg"
              />
              <EditorialBlock
                project={projects[i + 1]}
                onSelect={onSelect}
                imageHeight="clamp(200px,24vw,300px)"
                level="md"
              />
            </>
          )}
        </div>
      )
      i += 2
    }
  }

  return <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>{bands}</div>
}

// ─────────────────────────────────────────────────────────────────
// Main layout — 5 editorial bands
//
//  Band A  Hero split         [0, 1, 2]   8fr / 4fr, hero spans 2 rows
//  Band B  Asymmetric pair    [3, 4]      5fr / 7fr, heights differ
//  Band C  Triple stagger     [5, 6, 7]   4fr / 5fr / 3fr, mid pulled up
//  Band D  Full-width         [8]         panorama
//  Overflow  Editorial pairs  [9+]        alternating asymmetric
// ─────────────────────────────────────────────────────────────────
export default function ProjectsLayout({ projects, onSelect }) {
  if (!projects?.length) return null
  const p = projects

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>

      {/* ── BAND A ── */}
      {(p[0] || p[1] || p[2]) && (
        <div className="mag-row-a">
          {p[0] && (
            <div style={{ gridColumn: '1', gridRow: '1 / 3' }}>
              <EditorialBlock
                project={p[0]}
                onSelect={onSelect}
                imageHeight="clamp(300px, 54vw, 620px)"
                level="hero"
              />
            </div>
          )}
          {p[1] && (
            <div style={{ gridColumn: '2', gridRow: '1' }}>
              <EditorialBlock
                project={p[1]}
                onSelect={onSelect}
                imageHeight="clamp(220px, 25vw, 310px)"
                level="sm"
              />
            </div>
          )}
          {p[2] && (
            <div style={{ gridColumn: '2', gridRow: '2' }}>
              <EditorialBlock
                project={p[2]}
                onSelect={onSelect}
                imageHeight="clamp(205px, 22vw, 275px)"
                level="sm"
              />
            </div>
          )}
        </div>
      )}

      {/* ── BAND B ── */}
      {(p[3] || p[4]) && (
        <div className="mag-row-b" style={{ alignItems: 'start' }}>
          {p[3] && (
            <EditorialBlock
              project={p[3]}
              onSelect={onSelect}
              imageHeight="clamp(200px, 26vw, 320px)"
              level="md"
            />
          )}
          {p[4] && (
            <EditorialBlock
              project={p[4]}
              onSelect={onSelect}
              imageHeight="clamp(260px, 36vw, 440px)"
              level="lg"
            />
          )}
        </div>
      )}

      {/* ── BAND C ── */}
      {(p[5] || p[6] || p[7]) && (
        <div className="mag-row-c" style={{ alignItems: 'start' }}>
          {p[5] && (
            <EditorialBlock
              project={p[5]}
              onSelect={onSelect}
              imageHeight="clamp(205px, 21vw, 275px)"
              level="sm"
            />
          )}
          {p[6] && (
            <EditorialBlock
              project={p[6]}
              onSelect={onSelect}
              imageHeight="clamp(230px, 30vw, 370px)"
              level="md"
              style={{ transform: 'translateY(-18px)' }}
            />
          )}
          {p[7] && (
            <EditorialBlock
              project={p[7]}
              onSelect={onSelect}
              imageHeight="clamp(190px, 18vw, 250px)"
              level="sm"
            />
          )}
        </div>
      )}

      {/* ── BAND D ── */}
      {p[8] && (
        <EditorialBlock
          project={p[8]}
          onSelect={onSelect}
          imageHeight="clamp(200px, 24vw, 300px)"
          level="lg"
          style={{ width: '100%' }}
        />
      )}

      {/* ── OVERFLOW ── */}
      {projects.length > 9 && (
        <OverflowBands projects={projects.slice(9)} onSelect={onSelect} />
      )}

    </div>
  )
}
