import { useState, useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { usePageTitle }  from '../hooks/usePageTitle'
import SectionHeader from '../components/ui/SectionHeader'
import sponsors      from '../data/sponsors.json'

// ─────────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────────
const industry      = sponsors.filter(s => s.group === 'industry')
const institutional = sponsors.filter(s => s.group === 'institutional')
const partners      = sponsors.filter(s => s.group === 'partner')

// ─────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────
function buildTrack(arr, minCount = 14) {
  const times = Math.ceil(minCount / arr.length)
  const set   = Array.from({ length: times * arr.length }, (_, i) => arr[i % arr.length])
  return [...set, ...set]
}

// ─────────────────────────────────────────────────────────────────
// SECTION 1 — Featured sponsors: Boeing + Blue Origin
// Static, large, clearly dominant — visual anchors
// ─────────────────────────────────────────────────────────────────
function FeaturedSponsors() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -40px 0px' })

  const c = { hidden: {}, visible: { transition: { staggerChildren: 0.14 } } }
  const v = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } } }

  return (
    <div style={{ marginBottom: '72px' }}>
      {/* Label */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '48px' }}>
        <span style={{
          fontFamily:    'Plus Jakarta Sans, sans-serif',
          fontSize:      '10px',
          fontWeight:    700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color:         'var(--color-text-tertiary)',
          flexShrink:    0,
        }}>
          Industry Sponsors
        </span>
        <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--color-border)' }} />
      </div>

      {/* Logo row — static, centered, large */}
      <motion.div
        ref={ref}
        variants={c}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        style={{
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'center',
          gap:            'clamp(48px, 10vw, 120px)',
          flexWrap:       'wrap',
          padding:        '0 24px',
        }}
      >
        {industry.map(s => (
          <motion.div key={s.id} variants={v}>
            <FeaturedLogoItem sponsor={s} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

function FeaturedLogoItem({ sponsor }) {
  const [hovered, setHovered] = useState(false)
  const Tag       = sponsor.website ? 'a' : 'div'
  const linkProps = sponsor.website
    ? { href: sponsor.website, target: '_blank', rel: 'noopener noreferrer' }
    : {}

  return (
    <Tag
      {...linkProps}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        textDecoration: 'none',
        opacity:        hovered ? 1 : 0.9,
        transform:      hovered ? 'scale(1.04)' : 'scale(1)',
        transition:     'opacity 0.25s ease, transform 0.3s ease',
        cursor:         sponsor.website ? 'pointer' : 'default',
      }}
    >
      {sponsor.logo ? (
        <img
          src={sponsor.logo}
          alt={sponsor.name}
          draggable={false}
          style={{
            height:    'clamp(48px, 6vw, 72px)',
            width:     'auto',
            maxWidth:  '220px',
            objectFit: 'contain',
            display:   'block',
            userSelect:'none',
          }}
        />
      ) : (
        <span style={{
          fontFamily:    '"Space Grotesk", sans-serif',
          fontSize:      '22px',
          fontWeight:    600,
          color:         'var(--color-text-primary)',
          letterSpacing: '-0.02em',
        }}>
          {sponsor.name}
        </span>
      )}
    </Tag>
  )
}

// ─────────────────────────────────────────────────────────────────
// SECTION 2 — Scrolling bands: institutional + partners
// Very slow motion, varied speeds, slight vertical offsets
// ─────────────────────────────────────────────────────────────────

function LogoItem({ sponsor, height = 38 }) {
  const Tag       = sponsor.website ? 'a' : 'div'
  const linkProps = sponsor.website
    ? { href: sponsor.website, target: '_blank', rel: 'noopener noreferrer' }
    : {}

  return (
    <Tag
      {...linkProps}
      style={{
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        flexShrink:     0,
        textDecoration: 'none',
        padding:        '0 56px',   // generous horizontal breathing room
        opacity:        0.75,
        transition:     'opacity 0.25s ease, transform 0.3s ease',
      }}
      onMouseEnter={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'scale(1.07)' }}
      onMouseLeave={e => { e.currentTarget.style.opacity = '0.75'; e.currentTarget.style.transform = 'scale(1)' }}
    >
      {sponsor.logo ? (
        <img
          src={sponsor.logo}
          alt={sponsor.name}
          draggable={false}
          style={{
            height:    `${height}px`,
            width:     'auto',
            maxWidth:  '150px',
            objectFit: 'contain',
            display:   'block',
            userSelect:'none',
          }}
        />
      ) : (
        <span style={{
          fontFamily:    '"Space Grotesk", sans-serif',
          fontSize:      '14px',
          fontWeight:    600,
          color:         'var(--color-text-secondary)',
          whiteSpace:    'nowrap',
          letterSpacing: '-0.01em',
        }}>
          {sponsor.name}
        </span>
      )}
    </Tag>
  )
}

// Row config: duration slowed significantly, vertical offsets for irregularity
const BAND_ROWS = [
  {
    key:        'institutional',
    label:      'Institutional Funding',
    sponsors:   institutional,
    duration:   90,           // very slow — barely perceptible
    reverse:    false,
    logoHeight: 36,
    yOffset:    0,
  },
  {
    key:        'partners',
    label:      'Strategic Partners',
    sponsors:   partners,
    duration:   75,
    reverse:    true,
    logoHeight: 32,
    yOffset:    0,
  },
]

function MarqueeBand({ sponsors: list, duration, reverse, logoHeight, yOffset = 0 }) {
  const [paused, setPaused] = useState(false)
  const reducedMotion = useReducedMotion()
  const track = buildTrack(list)

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{
        overflow:        'hidden',
        width:           '100%',
        transform:       `translateY(${yOffset}px)`,
        // Soft edge fade
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
        maskImage:       'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
      }}
    >
      <div
        style={{
          display:            'flex',
          alignItems:         'center',
          width:              'max-content',
          animation:          reducedMotion ? 'none' : `${reverse ? 'marquee-rev' : 'marquee-fwd'} ${duration}s linear infinite`,
          animationPlayState: paused ? 'paused' : 'running',
        }}
      >
        {track.map((s, i) => (
          <LogoItem key={i} sponsor={s} height={logoHeight} />
        ))}
      </div>
    </div>
  )
}

function ScrollingBands() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -40px 0px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      style={{ display: 'flex', flexDirection: 'column', gap: '52px' }}
    >
      {BAND_ROWS.map(({ key, label, sponsors: list, duration, reverse, logoHeight, yOffset }) => (
        <div key={key}>
          {/* Label */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '28px' }}>
            <span style={{
              fontFamily:    'Plus Jakarta Sans, sans-serif',
              fontSize:      '10px',
              fontWeight:    700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color:         'var(--color-text-tertiary)',
              flexShrink:    0,
            }}>
              {label}
            </span>
            <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--color-border)' }} />
          </div>

          <MarqueeBand
            sponsors={list}
            duration={duration}
            reverse={reverse}
            logoHeight={logoHeight}
            yOffset={yOffset}
          />
        </div>
      ))}
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────────
// Why sponsor — value proposition (unchanged)
// ─────────────────────────────────────────────────────────────────
const VALUE_POINTS = [
  {
    heading:     'Community Reach',
    description: 'Gain exposure to top engineering talent at Stanford across interdisciplinary fields and grade levels — from freshmen to PhD researchers.',
  },
  {
    heading:     'Recruiting',
    description: 'Run an informational session or workshop at Stanford hosted by us. Meet students hands-on and build your recruiting pipeline directly.',
  },
  {
    heading:     'Branding',
    description: 'Your logo on our website, materials, and outreach. Attend our annual flagship robotics showcase and demo days as a featured partner.',
  },
]

function CtaPanel() {
  const [hovered, setHovered] = useState(false)
  return (
    <div style={{
      display:             'grid',
      gridTemplateColumns: '1fr 1fr',
      gap:                 'clamp(32px, 6vw, 80px)',
      alignItems:          'center',
      padding:             'clamp(28px, 4vw, 48px) clamp(28px, 4vw, 48px)',
      border:              '1px solid var(--color-border)',
      borderRadius:        '10px',
      backgroundColor:     'var(--color-surface)',
    }}>
      <div>
        <p style={{
          fontFamily:    '"Space Grotesk", sans-serif',
          fontSize:      'clamp(17px, 2vw, 22px)',
          fontWeight:    600,
          letterSpacing: '-0.02em',
          color:         'var(--color-text-primary)',
          margin:        '0 0 8px',
        }}>
          Interested in sponsoring?
        </p>
        <p style={{
          fontFamily: 'Plus Jakarta Sans, sans-serif',
          fontSize:   '14px',
          lineHeight: 1.65,
          color:      'var(--color-text-secondary)',
          margin:     0,
        }}>
          Reach out and we'll send over our sponsorship deck.
        </p>
      </div>
      <div style={{
        borderLeft:  '1px solid var(--color-border)',
        paddingLeft: 'clamp(24px, 4vw, 48px)',
      }}>
        <p style={{
          fontFamily:    'Plus Jakarta Sans, sans-serif',
          fontSize:      '10px',
          fontWeight:    700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color:         'var(--color-text-tertiary)',
          margin:        '0 0 8px',
        }}>
          Email us directly
        </p>
        <a
          href="mailto:stanfordroboclub@gmail.com"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            fontFamily:     '"Space Grotesk", sans-serif',
            fontSize:       'clamp(14px, 1.6vw, 18px)',
            fontWeight:     500,
            letterSpacing:  '-0.02em',
            color:          hovered ? 'var(--color-accent)' : 'var(--color-text-primary)',
            textDecoration: 'none',
            transition:     'color 0.18s ease',
            display:        'block',
          }}
        >
          stanfordroboclub@gmail.com
        </a>
      </div>
    </div>
  )
}

function WhySponsor() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -40px 0px' })

  const container = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }
  const item      = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.48, ease: [0.4, 0, 0.2, 1] } } }

  return (
    <div style={{ marginTop: '96px', paddingTop: '72px', borderTop: '1px solid var(--color-border)' }}>
      <div style={{ marginBottom: '48px' }}>
        <p style={{
          fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '11px', fontWeight: 600,
          letterSpacing: '0.1em', textTransform: 'uppercase',
          color: 'var(--color-accent)', margin: '0 0 14px',
        }}>
          Partner With Us
        </p>
        <h2 style={{
          fontFamily: '"Space Grotesk", sans-serif',
          fontSize: 'clamp(26px, 3.5vw, 40px)', fontWeight: 600,
          lineHeight: 1.1, letterSpacing: '-0.03em',
          color: 'var(--color-text-primary)', margin: 0, maxWidth: '22ch',
        }}>
          Support the next generation of roboticists.
        </h2>
      </div>

      <motion.div
        ref={ref}
        variants={container}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="grid grid-cols-1 sm:grid-cols-3 gap-8"
        style={{ marginBottom: '56px' }}
      >
        {VALUE_POINTS.map(({ heading, description }) => (
          <motion.div key={heading} variants={item}>
            <div style={{ width: '2px', height: '28px', backgroundColor: 'var(--color-accent)', marginBottom: '18px', opacity: 0.7 }} />
            <h3 style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: '17px', fontWeight: 600, letterSpacing: '-0.018em', color: 'var(--color-text-primary)', margin: '0 0 10px' }}>
              {heading}
            </h3>
            <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '14px', lineHeight: 1.72, color: 'var(--color-text-secondary)', margin: 0 }}>
              {description}
            </p>
          </motion.div>
        ))}
      </motion.div>

      <CtaPanel />
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────
export default function Sponsors() {
  usePageTitle('Sponsors')
  return (
    <main style={{ paddingTop: 'var(--nav-height)' }}>
      <section className="section container">
        <SectionHeader
          counter="03 · SPONSORS"
          title="Our Partners"
          subtitle="The organizations and institutions that make Stanford Student Robotics possible. We're grateful for their support."
        />

        {/* Boeing + Blue Origin — static, dominant */}
        <FeaturedSponsors />

        {/* Hairline separator */}
        <div style={{ height: '1px', backgroundColor: 'var(--color-border)', marginBottom: '72px' }} />

        {/* Institutional + partners — slow scrolling bands */}
        <ScrollingBands />

        <WhySponsor />
      </section>
    </main>
  )
}
