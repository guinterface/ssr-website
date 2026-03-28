import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ProjectImage, CategoryTag, StatusDot } from './projectUtils'
import TextLink from '../ui/TextLink'
import { useFocusTrap } from '../../hooks/useFocusTrap'

export default function ProjectModal({ project, onClose }) {
  const panelRef = useRef(null)
  useFocusTrap(panelRef, !!project)

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  useEffect(() => {
    document.body.style.overflow = project ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [project])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="scrim"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{   opacity: 0 }}
          transition={{ duration: 0.22 }}
          onClick={onClose}
          style={{
            position:        'fixed',
            inset:           0,
            zIndex:          200,
            backgroundColor: 'rgba(8, 8, 8, 0.55)',
            backdropFilter:  'blur(8px)',
            display:         'flex',
            alignItems:      'center',
            justifyContent:  'center',
            padding:         '24px',
          }}
        >
          <motion.div
            key="panel"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={project?.title}
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1,    y: 0  }}
            exit={{   opacity: 0, scale: 0.97, y: 12  }}
            transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
            onClick={e => e.stopPropagation()}
            style={{
              position:        'relative',
              backgroundColor: 'var(--color-surface)',
              borderRadius:    '14px',
              width:           '100%',
              maxWidth:        '800px',
              maxHeight:       '90vh',
              overflowY:       'auto',
              boxShadow:       '0 40px 100px rgba(0,0,0,0.22)',
            }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              aria-label="Close modal"
              style={{
                position:        'absolute',
                top:             '16px',
                right:           '16px',
                zIndex:          10,
                width:           '34px',
                height:          '34px',
                borderRadius:    '50%',
                border:          '1px solid rgba(255,255,255,0.25)',
                backgroundColor: 'rgba(0,0,0,0.35)',
                backdropFilter:  'blur(6px)',
                color:           'rgba(255,255,255,0.8)',
                cursor:          'pointer',
                display:         'flex',
                alignItems:      'center',
                justifyContent:  'center',
                fontSize:        '18px',
                lineHeight:      1,
                transition:      'background-color 0.18s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.6)' }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.35)' }}
            >
              ×
            </button>

            {/* Hero image — taller than card, no border-radius conflicts */}
            <div style={{
              aspectRatio:  '16 / 8',
              overflow:     'hidden',
              borderRadius: '14px 14px 0 0',
            }}>
              <ProjectImage project={project} />
            </div>

            {/* Body */}
            <div style={{ padding: '40px 44px 52px' }}>

              {/* Meta row */}
              <div style={{
                display:      'flex',
                alignItems:   'center',
                gap:          '10px',
                marginBottom: '20px',
                flexWrap:     'wrap',
              }}>
                <CategoryTag category={project.category} />
                <StatusDot   status={project.status}   />
              </div>

              {/* Title */}
              <h2 style={{
                fontFamily:    '"Space Grotesk", sans-serif',
                fontSize:      'clamp(22px, 3.5vw, 30px)',
                fontWeight:    600,
                lineHeight:    1.12,
                letterSpacing: '-0.03em',
                color:         'var(--color-text-primary)',
                marginBottom:  '20px',
                marginTop:     0,
              }}>
                {project.title}
              </h2>

              {/* Description */}
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize:   '15px',
                lineHeight: 1.85,
                color:      'var(--color-text-secondary)',
                margin:     '0 0 24px',
              }}>
                {project.description}
              </p>

              {/* Full page link */}
              <TextLink to={`/projects/${project.id}`} size="sm">View full page</TextLink>

              {/* Links section — rendered only when data exists */}
              {project.links?.length > 0 && (
                <>
                  <div style={{ height: '1px', backgroundColor: 'var(--color-border)', margin: '32px 0 24px' }} />
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    {project.links.map(link => (
                      <a
                        key={link.url}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display:        'inline-flex',
                          alignItems:     'center',
                          gap:            '6px',
                          fontFamily:     'Inter, sans-serif',
                          fontSize:       '13px',
                          fontWeight:     600,
                          letterSpacing:  '0.03em',
                          textTransform:  'uppercase',
                          color:          'var(--color-accent)',
                          textDecoration: 'none',
                          padding:        '8px 16px',
                          border:         '1px solid var(--color-border)',
                          borderRadius:   '6px',
                          transition:     'border-color 0.2s ease',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-accent)' }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border)' }}
                      >
                        {link.label}
                        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
                          <path d="M1.5 9.5l8-8M3.5 1.5h6v6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </a>
                    ))}
                  </div>
                </>
              )}

              {/* Members section — rendered only when data exists */}
              {project.members?.length > 0 && (
                <>
                  <div style={{ height: '1px', backgroundColor: 'var(--color-border)', margin: '32px 0 24px' }} />
                  <p style={{
                    fontFamily:    'Inter, sans-serif',
                    fontSize:      '11px',
                    fontWeight:    600,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color:         'var(--color-accent)',
                    marginBottom:  '14px',
                    marginTop:     0,
                  }}>
                    Project Leads
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {project.members.map(name => (
                      <span key={name} style={{
                        fontFamily:      'Inter, sans-serif',
                        fontSize:        '13px',
                        fontWeight:      500,
                        color:           'var(--color-text-secondary)',
                        backgroundColor: 'var(--color-surface-muted)',
                        border:          '1px solid var(--color-border)',
                        borderRadius:    '6px',
                        padding:         '6px 14px',
                      }}>
                        {name}
                      </span>
                    ))}
                  </div>
                </>
              )}

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
