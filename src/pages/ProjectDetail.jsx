import { useParams, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { usePageTitle } from '../hooks/usePageTitle'
import { ProjectImage, CategoryTag, StatusDot } from '../components/projects/projectUtils'
import TextLink from '../components/ui/TextLink'
import projects from '../data/projects.json'

export default function ProjectDetail() {
  const { id } = useParams()
  const project = projects.find(p => p.id === id)

  usePageTitle(project ? project.title : 'Project Not Found')

  if (!project) return <Navigate to="/projects" replace />

  return (
    <main style={{ paddingTop: 'var(--nav-height)', minHeight: '100dvh', backgroundColor: 'var(--color-bg)' }}>

      {/* Back link */}
      <div className="container" style={{ paddingTop: '32px', paddingBottom: '8px' }}>
        <TextLink to="/projects" back muted size="sm">All Projects</TextLink>
      </div>

      {/* Hero image */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className="container"
        style={{ paddingTop: '20px' }}
      >
        <div style={{
          aspectRatio:     '2 / 1',
          overflow:        'hidden',
          borderRadius:    '6px',
          backgroundColor: '#0a0a0a',
        }}>
          <ProjectImage project={project} />
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
        className="container"
        style={{ paddingTop: '48px', paddingBottom: '120px', maxWidth: '760px' }}
      >
        {/* Meta */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
          <CategoryTag category={project.category} />
          <StatusDot status={project.status} />
        </div>

        {/* Title */}
        <h1 style={{
          fontFamily:    '"Space Grotesk", sans-serif',
          fontSize:      'clamp(28px, 5vw, 48px)',
          fontWeight:    700,
          lineHeight:    1.0,
          letterSpacing: '-0.04em',
          color:         'var(--color-text-primary)',
          margin:        '0 0 28px',
        }}>
          {project.title}
        </h1>

        {/* Divider */}
        <div style={{ height: '1px', backgroundColor: 'var(--color-border)', marginBottom: '32px' }} />

        {/* Description */}
        <p style={{
          fontFamily: 'Plus Jakarta Sans, sans-serif',
          fontSize:   'clamp(15px, 1.8vw, 18px)',
          lineHeight: 1.85,
          color:      'var(--color-text-secondary)',
          margin:     0,
        }}>
          {project.description}
        </p>

        {/* Links */}
        {project.links?.length > 0 && (
          <>
            <div style={{ height: '1px', backgroundColor: 'var(--color-border)', margin: '40px 0 28px' }} />
            <p style={{
              fontFamily:    'Plus Jakarta Sans, sans-serif',
              fontSize:      '11px',
              fontWeight:    600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color:         'var(--color-accent)',
              margin:        '0 0 16px',
            }}>
              Links
            </p>
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
                    fontFamily:     'Plus Jakarta Sans, sans-serif',
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

        {/* Members */}
        {project.members?.length > 0 && (
          <>
            <div style={{ height: '1px', backgroundColor: 'var(--color-border)', margin: '40px 0 28px' }} />
            <p style={{
              fontFamily:    'Plus Jakarta Sans, sans-serif',
              fontSize:      '11px',
              fontWeight:    600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color:         'var(--color-accent)',
              margin:        '0 0 16px',
            }}>
              Project Leads
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {project.members.map(name => (
                <span key={name} style={{
                  fontFamily:      'Plus Jakarta Sans, sans-serif',
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

      </motion.div>
    </main>
  )
}
