/**
 * Slow auto-scrolling strip of project image cards.
 * Replaces the text-only Marquee with a more visual, substantive section.
 *
 * Images: uses picsum placeholders keyed by project ID.
 * To replace: update the `image` field in projects.json with real paths.
 *
 * Props:
 *   projects — array from projects.json
 *   speed    — CSS animation duration in seconds (default 65)
 */

import { useReducedMotion } from 'framer-motion'

const CARD_WIDTH  = 280 // px
const CARD_HEIGHT = 190 // px — 16:11 ish, feels grounded

function getImage(project) {
  if (
    project.image &&
    project.image !== null &&
    !project.image.startsWith('/placeholders') &&
    !project.image.startsWith('/images/')
  ) {
    return project.image
  }
  return `https://picsum.photos/seed/src-${project.id}/560/380`
}

export default function ImageStrip({ projects = [], speed = 65 }) {
  const reducedMotion = useReducedMotion()
  const items = reducedMotion ? projects : [...projects, ...projects] // duplicate for seamless loop

  return (
    <div
      style={{ backgroundColor: 'var(--color-surface-muted)' }}
      className="overflow-hidden border-t border-b border-border"
    >
      {/* Top micro-label */}
      <div className="container py-5 pb-0">
        <p
          style={{
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--color-text-tertiary)',
          }}
        >
          Selected Work
        </p>
      </div>

      {/* Scrolling strip */}
      <div className="py-6 overflow-hidden">
        <div
          style={{
            display: 'flex',
            gap: '20px',
            width: 'max-content',
            animation: reducedMotion ? 'none' : `imageScroll ${speed}s linear infinite`,
            willChange: 'transform',
          }}
          onMouseEnter={e => (e.currentTarget.style.animationPlayState = 'paused')}
          onMouseLeave={e => (e.currentTarget.style.animationPlayState = 'running')}
        >
          {items.map((project, i) => (
            <div
              key={i}
              style={{
                width: `${CARD_WIDTH}px`,
                flexShrink: 0,
              }}
            >
              {/* Image container */}
              <div
                style={{
                  width: '100%',
                  height: `${CARD_HEIGHT}px`,
                  overflow: 'hidden',
                  borderRadius: '6px',
                  backgroundColor: 'var(--color-border)',
                }}
              >
                <img
                  src={getImage(project)}
                  alt={project.title}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.6s ease',
                    transform: 'scale(1.0)',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.04)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1.0)')}
                />
              </div>

              {/* Caption */}
              <p
                style={{
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                  fontSize: '12px',
                  fontWeight: 500,
                  letterSpacing: '0.04em',
                  color: 'var(--color-text-tertiary)',
                  marginTop: '10px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {project.title}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
