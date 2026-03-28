import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { usePageTitle } from '../hooks/usePageTitle'

const EMAIL     = 'stanfordroboclub@gmail.com'
const SLACK_URL = 'https://join.slack.com/t/stanfordrobotics/shared_invite/placeholder'

function fadeUp(delay = 0) {
  return {
    initial:    { opacity: 0, y: 22 },
    animate:    { opacity: 1, y: 0  },
    transition: { duration: 0.55, delay, ease: [0.4, 0, 0.2, 1] },
  }
}

// ── Arrow SVG ─────────────────────────────────────────────────────
function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M2.5 7h9M7.5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

// ── Slack icon SVG ────────────────────────────────────────────────
function SlackIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"/>
    </svg>
  )
}

// ── Divider ───────────────────────────────────────────────────────
function Divider() {
  return (
    <div style={{
      height:          '1px',
      backgroundColor: 'var(--color-border)',
      margin:          '88px 0',
    }} />
  )
}

// ── Section label ─────────────────────────────────────────────────
function Label({ children }) {
  return (
    <p style={{
      fontFamily:    'Inter, sans-serif',
      fontSize:      '11px',
      fontWeight:    600,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color:         'var(--color-accent)',
      margin:        '0 0 20px',
    }}>
      {children}
    </p>
  )
}

// ── Scroll-triggered wrapper ──────────────────────────────────────
function Reveal({ children, delay = 0 }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -60px 0px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────────
// SECTION 1 — Join the Club
// ─────────────────────────────────────────────────────────────────
function JoinSection() {
  return (
    <div className="contact-split">
      {/* Left — copy */}
      <div>
        <motion.div {...fadeUp(0.1)}>
          <Label>For Students</Label>
        </motion.div>
        <motion.h2
          {...fadeUp(0.2)}
          style={{
            fontFamily:    '"Space Grotesk", sans-serif',
            fontSize:      'clamp(32px, 5vw, 52px)',
            fontWeight:    600,
            lineHeight:    1.05,
            letterSpacing: '-0.035em',
            color:         'var(--color-text-primary)',
            margin:        '0 0 28px',
          }}
        >
          Join the club.<br />Build something real.
        </motion.h2>
        <motion.p
          {...fadeUp(0.3)}
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize:   'clamp(15px, 1.6vw, 17px)',
            lineHeight: 1.75,
            color:      'var(--color-text-secondary)',
            margin:     '0 0 40px',
            maxWidth:   '44ch',
          }}
        >
          We welcome undergrads and grad students from any major — CS, ME, EE, design, and beyond.
          Applications open at the start of each quarter.
        </motion.p>
        <motion.div
          {...fadeUp(0.4)}
          style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}
        >
          {/* Primary */}
          <Link
            to="/contact"
            style={{
              display:         'inline-flex',
              alignItems:      'center',
              gap:             '8px',
              backgroundColor: 'var(--color-accent)',
              color:           '#fff',
              fontFamily:      'Inter, sans-serif',
              fontSize:        '13px',
              fontWeight:      600,
              letterSpacing:   '0.05em',
              textTransform:   'uppercase',
              padding:         '14px 26px',
              borderRadius:    '4px',
              textDecoration:  'none',
              transition:      'opacity 0.2s ease, transform 0.2s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.87'; e.currentTarget.style.transform = 'translateY(-1px)' }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1';    e.currentTarget.style.transform = 'translateY(0)' }}
          >
            Join Us <Arrow />
          </Link>
          {/* Secondary — Slack */}
          <a
            href={SLACK_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display:        'inline-flex',
              alignItems:     'center',
              gap:            '8px',
              color:          'var(--color-text-secondary)',
              fontFamily:     'Inter, sans-serif',
              fontSize:       '13px',
              fontWeight:     600,
              letterSpacing:  '0.05em',
              textTransform:  'uppercase',
              padding:        '13px 22px',
              borderRadius:   '4px',
              border:         '1px solid var(--color-border)',
              textDecoration: 'none',
              transition:     'border-color 0.2s ease, color 0.2s ease, transform 0.2s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-text-tertiary)'; e.currentTarget.style.color = 'var(--color-text-primary)'; e.currentTarget.style.transform = 'translateY(-1px)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border)';         e.currentTarget.style.color = 'var(--color-text-secondary)'; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            <SlackIcon /> Join our Slack
          </a>
        </motion.div>
      </div>

      {/* Right — what to expect */}
      <Reveal delay={0.15}>
        <div style={{
          display:       'flex',
          flexDirection: 'column',
          gap:           '28px',
          paddingTop:    '48px',
        }}>
          {[
            { n: '01', heading: 'Any major welcome', body: 'Mechanical, electrical, CS, design — all perspectives make better robots.' },
            { n: '02', heading: 'Hands-on from day one', body: 'Join an active team or pitch your own idea. We skip the busywork.' },
            { n: '03', heading: 'Real hardware, real stakes', body: 'We compete, demo publicly, and collaborate with Stanford labs and industry.' },
          ].map(({ n, heading, body }) => (
            <div key={n} style={{ display: 'flex', gap: '20px' }}>
              <span style={{
                fontFamily:    'Inter, sans-serif',
                fontSize:      '11px',
                fontWeight:    700,
                letterSpacing: '0.08em',
                color:         'var(--color-text-tertiary)',
                paddingTop:    '3px',
                flexShrink:    0,
                width:         '22px',
              }}>
                {n}
              </span>
              <div>
                <p style={{
                  fontFamily:    '"Space Grotesk", sans-serif',
                  fontSize:      '16px',
                  fontWeight:    600,
                  letterSpacing: '-0.015em',
                  color:         'var(--color-text-primary)',
                  margin:        '0 0 6px',
                }}>
                  {heading}
                </p>
                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize:   '14px',
                  lineHeight: 1.7,
                  color:      'var(--color-text-secondary)',
                  margin:     0,
                }}>
                  {body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────
// SECTION 2 — General Contact
// ─────────────────────────────────────────────────────────────────
function ContactSection() {
  return (
    <Reveal>
      <div className="contact-split-center">
        <div>
          <Label>General Inquiries</Label>
          <a
            href={`mailto:${EMAIL}`}
            style={{
              display:       'block',
              fontFamily:    '"Space Grotesk", sans-serif',
              fontSize:      'clamp(22px, 3.5vw, 36px)',
              fontWeight:    500,
              letterSpacing: '-0.025em',
              lineHeight:    1.1,
              color:         'var(--color-text-primary)',
              textDecoration:'none',
              marginBottom:  '16px',
              transition:    'color 0.2s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-accent)'      }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-text-primary)' }}
          >
            {EMAIL}
          </a>
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize:   '14px',
            lineHeight: 1.7,
            color:      'var(--color-text-tertiary)',
            margin:     0,
          }}>
            We typically respond within 2 business days.
          </p>
        </div>
        <div className="contact-border-left" style={{
          borderLeft:  '1px solid var(--color-border)',
          paddingLeft: 'clamp(32px, 5vw, 64px)',
        }}>
          <p style={{
            fontFamily:    '"Space Grotesk", sans-serif',
            fontSize:      'clamp(17px, 2vw, 21px)',
            fontWeight:    500,
            lineHeight:    1.5,
            letterSpacing: '-0.015em',
            color:         'var(--color-text-secondary)',
            margin:        '0 0 24px',
          }}>
            Questions about membership, events, or the club in general? Email us directly — no form, no wait.
          </p>
          <a
            href={`mailto:${EMAIL}`}
            style={{
              display:        'inline-flex',
              alignItems:     'center',
              gap:            '6px',
              fontFamily:     'Inter, sans-serif',
              fontSize:       '13px',
              fontWeight:     600,
              letterSpacing:  '0.05em',
              textTransform:  'uppercase',
              color:          'var(--color-accent)',
              textDecoration: 'none',
              transition:     'gap 0.2s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.gap = '10px' }}
            onMouseLeave={e => { e.currentTarget.style.gap = '6px'  }}
          >
            Send us an email <Arrow />
          </a>
        </div>
      </div>
    </Reveal>
  )
}

// ─────────────────────────────────────────────────────────────────
// SECTION 3 — Sponsor / Partner
// ─────────────────────────────────────────────────────────────────
const PARTNER_POINTS = [
  { heading: 'Community Reach', body: 'Gain exposure to top engineering talent across interdisciplinary fields and grade levels.' },
  { heading: 'Recruiting',      body: 'Run an informational session or workshop at Stanford hosted by us.' },
  { heading: 'Branding',        body: 'Your logo on our website, materials, and outreach. Attend our annual robotics showcase.' },
]

function PartnerSection() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -60px 0px' })

  const c = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }
  const v = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } } }

  return (
    <div>
      <Reveal>
        <div style={{ marginBottom: '52px' }}>
          <Label>For Organizations</Label>
          <h2 style={{
            fontFamily:    '"Space Grotesk", sans-serif',
            fontSize:      'clamp(28px, 4vw, 46px)',
            fontWeight:    600,
            lineHeight:    1.05,
            letterSpacing: '-0.03em',
            color:         'var(--color-text-primary)',
            margin:        '0 0 20px',
            maxWidth:      '20ch',
          }}>
            Partner with Stanford Student Robotics.
          </h2>
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize:   'clamp(15px, 1.6vw, 17px)',
            lineHeight: 1.75,
            color:      'var(--color-text-secondary)',
            margin:     0,
            maxWidth:   '52ch',
          }}>
            Sponsoring SSR puts your brand in front of the brightest engineering talent at one of the world's leading research universities.
          </p>
        </div>
      </Reveal>

      {/* 3-column value points */}
      <motion.div
        ref={ref}
        variants={c}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="partner-value-grid"
        style={{ marginBottom: '52px' }}
      >
        {PARTNER_POINTS.map(({ heading, body }) => (
          <motion.div key={heading} variants={v}>
            <div style={{
              width:           '2px',
              height:          '28px',
              backgroundColor: 'var(--color-accent)',
              marginBottom:    '18px',
              opacity:         0.7,
            }} />
            <p style={{
              fontFamily:    '"Space Grotesk", sans-serif',
              fontSize:      '16px',
              fontWeight:    600,
              letterSpacing: '-0.015em',
              color:         'var(--color-text-primary)',
              margin:        '0 0 10px',
            }}>
              {heading}
            </p>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize:   '14px',
              lineHeight: 1.72,
              color:      'var(--color-text-secondary)',
              margin:     0,
            }}>
              {body}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* CTA */}
      <Reveal delay={0.1}>
        <a
          href={`mailto:${EMAIL}`}
          style={{
            display:        'inline-flex',
            alignItems:     'center',
            gap:            '8px',
            fontFamily:     'Inter, sans-serif',
            fontSize:       '13px',
            fontWeight:     600,
            letterSpacing:  '0.05em',
            textTransform:  'uppercase',
            color:          'var(--color-accent)',
            textDecoration: 'none',
            transition:     'gap 0.2s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.gap = '12px' }}
          onMouseLeave={e => { e.currentTarget.style.gap = '8px'  }}
        >
          Partner with us <Arrow />
        </a>
      </Reveal>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────
export default function Contact() {
  usePageTitle('Contact')
  return (
    <main style={{ paddingTop: 'var(--nav-height)' }}>

      {/* Page header */}
      <div className="container" style={{ paddingTop: 'clamp(48px, 8vw, 96px)', paddingBottom: '72px' }}>
        <motion.p
          {...fadeUp(0.05)}
          style={{
            fontFamily:    'Inter, sans-serif',
            fontSize:      '11px',
            fontWeight:    600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color:         'var(--color-text-tertiary)',
            margin:        '0 0 16px',
          }}
        >
          05 · Contact
        </motion.p>
        <motion.h1
          {...fadeUp(0.15)}
          style={{
            fontFamily:    '"Space Grotesk", sans-serif',
            fontSize:      'clamp(36px, 6vw, 64px)',
            fontWeight:    600,
            lineHeight:    1.0,
            letterSpacing: '-0.04em',
            color:         'var(--color-text-primary)',
            margin:        0,
          }}
        >
          Join & Collaborate
        </motion.h1>
      </div>

      <div className="container" style={{ paddingBottom: 'clamp(64px, 10vw, 120px)' }}>
        <JoinSection />
        <Divider />
        <ContactSection />
        <Divider />
        <PartnerSection />
      </div>

    </main>
  )
}
