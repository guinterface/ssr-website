import { useState } from 'react'
import { Link } from 'react-router-dom'
import ScrollReveal from '../ui/ScrollReveal'

function SponsorTile({ sponsor }) {
  const [hovered, setHovered] = useState(false)

  const tile = (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display:         'flex',
        alignItems:      'center',
        justifyContent:  'center',
        width:           '152px',
        height:          '72px',
        borderRadius:    '8px',
        border:          `1px solid ${hovered ? '#C4C4C2' : 'var(--color-border)'}`,
        backgroundColor: 'var(--color-surface)',
        flexShrink:      0,
        boxShadow:       hovered ? '0 4px 16px rgba(0,0,0,0.06)' : 'none',
        transition:      'border-color 0.25s ease, box-shadow 0.25s ease',
        cursor:          sponsor.website ? 'pointer' : 'default',
        padding:         '12px 16px',
      }}
    >
      <img
        src={sponsor.logo}
        alt={sponsor.name}
        style={{
          maxWidth:   '112px',
          maxHeight:  '40px',
          width:      '100%',
          objectFit:  'contain',
          display:    'block',
          filter:     hovered ? 'grayscale(0)' : 'grayscale(1)',
          opacity:    hovered ? 1 : 0.72,
          transition: 'filter 0.3s ease, opacity 0.3s ease',
        }}
      />
    </div>
  )

  if (sponsor.website) {
    return (
      <a
        href={sponsor.website}
        target="_blank"
        rel="noopener noreferrer"
        title={sponsor.name}
        style={{ textDecoration: 'none' }}
      >
        {tile}
      </a>
    )
  }

  return tile
}

export default function SponsorsPreview({ sponsors = [] }) {
  return (
    <section
      className="section"
      style={{ backgroundColor: 'var(--color-surface-muted)' }}
    >
      <div className="container">

        <ScrollReveal>
          <p style={{
            fontFamily:    'Plus Jakarta Sans, sans-serif',
            fontSize:      '11px',
            fontWeight:    600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color:         'var(--color-text-tertiary)',
            textAlign:     'center',
            marginBottom:  '48px',
          }}>
            Supported by
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div style={{
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
            flexWrap:       'wrap',
            gap:            '14px',
          }}>
            {sponsors.map(s => <SponsorTile key={s.id} sponsor={s} />)}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <Link
              to="/sponsors"
              style={{
                fontFamily:     'Plus Jakarta Sans, sans-serif',
                fontSize:       '13px',
                fontWeight:     500,
                letterSpacing:  '0.02em',
                color:          'var(--color-accent)',
                textDecoration: 'none',
                display:        'inline-flex',
                alignItems:     'center',
                gap:            '6px',
                transition:     'gap 0.2s ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.gap = '10px')}
              onMouseLeave={e => (e.currentTarget.style.gap = '6px')}
            >
              View all sponsors
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </ScrollReveal>

      </div>
    </section>
  )
}
