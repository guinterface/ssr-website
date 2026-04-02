import { useRef, useState } from 'react'
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

function Label({ children }) {
  return (
    <p style={{
      fontFamily:    'Plus Jakarta Sans, sans-serif',
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

// ── Slack icon SVG ────────────────────────────────────────────────
function SlackIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"/>
    </svg>
  )
}

function MailIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.6"/>
      <path d="M2 8l10 7 10-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  )
}

// ─────────────────────────────────────────────────────────────────
// HEADER — Two-column: identity left, email right
// ─────────────────────────────────────────────────────────────────
function ContactHeader() {
  const [emailHovered, setEmailHovered] = useState(false)
  const [slackHovered, setSlackHovered] = useState(false)

  return (
    <div className="container contact-header-grid" style={{
      paddingTop:    'clamp(48px, 8vw, 96px)',
      paddingBottom: 'clamp(56px, 7vw, 88px)',
      display:       'grid',
      gridTemplateColumns: '1fr 1fr',
      gap:           'clamp(40px, 7vw, 100px)',
      alignItems:    'end',
    }}>
      {/* Left — identity */}
      <div>
        <motion.p
          {...fadeUp(0.05)}
          style={{
            fontFamily:    'Plus Jakarta Sans, sans-serif',
            fontSize:      '11px',
            fontWeight:    600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color:         'var(--color-accent)',
            margin:        '0 0 16px',
          }}
        >
          05 · Contact
        </motion.p>
        <motion.h1
          {...fadeUp(0.12)}
          style={{
            fontFamily:    '"Space Grotesk", sans-serif',
            fontSize:      'clamp(36px, 6vw, 64px)',
            fontWeight:    600,
            lineHeight:    1.0,
            letterSpacing: '-0.04em',
            color:         'var(--color-text-primary)',
            margin:        '0 0 20px',
          }}
        >
          Get in Touch
        </motion.h1>
        <motion.p
          {...fadeUp(0.2)}
          style={{
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            fontSize:   'clamp(14px, 1.5vw, 16px)',
            lineHeight: 1.7,
            color:      'var(--color-text-secondary)',
            margin:     0,
            maxWidth:   '38ch',
          }}
        >
          Students, researchers, sponsors, and press — we read everything.
        </motion.p>
      </div>

      {/* Right — primary contact, large and immediate */}
      <motion.div {...fadeUp(0.18)}>
        {/* Email */}
        <p style={{
          fontFamily:    'Plus Jakarta Sans, sans-serif',
          fontSize:      '10px',
          fontWeight:    700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color:         'var(--color-text-tertiary)',
          margin:        '0 0 10px',
        }}>
          Email
        </p>
        <a
          href={`mailto:${EMAIL}`}
          onMouseEnter={() => setEmailHovered(true)}
          onMouseLeave={() => setEmailHovered(false)}
          style={{
            display:       'block',
            fontFamily:    '"Space Grotesk", sans-serif',
            fontSize:      'clamp(18px, 2.4vw, 30px)',
            fontWeight:    500,
            letterSpacing: '-0.025em',
            lineHeight:    1.1,
            color:         emailHovered ? 'var(--color-accent)' : 'var(--color-text-primary)',
            textDecoration: 'none',
            marginBottom:  '28px',
            transition:    'color 0.18s ease',
          }}
        >
          {EMAIL}
        </a>

        {/* Divider */}
        <div style={{ height: '1px', backgroundColor: 'var(--color-border)', marginBottom: '28px' }} />

        {/* Slack */}
        <p style={{
          fontFamily:    'Plus Jakarta Sans, sans-serif',
          fontSize:      '10px',
          fontWeight:    700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color:         'var(--color-text-tertiary)',
          margin:        '0 0 10px',
        }}>
          Slack
        </p>
        <a
          href={SLACK_URL}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setSlackHovered(true)}
          onMouseLeave={() => setSlackHovered(false)}
          style={{
            display:        'inline-flex',
            alignItems:     'center',
            gap:            '8px',
            fontFamily:     'Plus Jakarta Sans, sans-serif',
            fontSize:       'clamp(13px, 1.4vw, 15px)',
            fontWeight:     500,
            color:          slackHovered ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
            textDecoration: 'none',
            transition:     'color 0.18s ease',
          }}
        >
          <SlackIcon size={15} />
          Join our Slack community ↗
        </a>
      </motion.div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────
// SECTION 1 — For Students (full-bleed muted band)
// ─────────────────────────────────────────────────────────────────
const PILLARS = [
  { heading: 'Any major welcome',      body: 'Mechanical, electrical, CS, design — all perspectives make better robots.' },
  { heading: 'Hands-on from day one',  body: 'Join an active team or pitch your own idea. We skip the busywork.' },
  { heading: 'Real hardware, real stakes', body: 'We compete, demo publicly, and collaborate with Stanford labs and industry.' },
]

function JoinSection() {
  return (
    <section style={{
      backgroundColor: 'var(--color-surface-muted)',
      borderTop:       '1px solid var(--color-border)',
      borderBottom:    '1px solid var(--color-border)',
    }}>
      <div className="container" style={{
        paddingTop:    'clamp(56px, 7vw, 88px)',
        paddingBottom: 'clamp(56px, 7vw, 88px)',
      }}>
        <div style={{
          display:             'grid',
          gridTemplateColumns: '1fr 1fr',
          gap:                 'clamp(40px, 7vw, 100px)',
          alignItems:          'start',
        }}>

          {/* Left — copy + CTA */}
          <div>
            <Reveal>
              <Label>For Students</Label>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 style={{
                fontFamily:    '"Space Grotesk", sans-serif',
                fontSize:      'clamp(28px, 4vw, 46px)',
                fontWeight:    600,
                lineHeight:    1.05,
                letterSpacing: '-0.035em',
                color:         'var(--color-text-primary)',
                margin:        '0 0 20px',
              }}>
                Join the club.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p style={{
                fontFamily: 'Plus Jakarta Sans, sans-serif',
                fontSize:   'clamp(14px, 1.5vw, 16px)',
                lineHeight: 1.75,
                color:      'var(--color-text-secondary)',
                margin:     '0 0 36px',
                maxWidth:   '40ch',
              }}>
                Open to undergrads and grad students from any department.
                Show up to a meeting or message us on Slack to get started.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <a
                href={SLACK_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display:         'inline-flex',
                  alignItems:      'center',
                  gap:             '8px',
                  backgroundColor: 'var(--color-accent)',
                  color:           '#fff',
                  fontFamily:      'Plus Jakarta Sans, sans-serif',
                  fontSize:        '13px',
                  fontWeight:      600,
                  letterSpacing:   '0.05em',
                  textTransform:   'uppercase',
                  padding:         '13px 24px',
                  borderRadius:    '4px',
                  textDecoration:  'none',
                  transition:      'opacity 0.2s ease, transform 0.2s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.opacity = '0.87'; e.currentTarget.style.transform = 'translateY(-1px)' }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '1';    e.currentTarget.style.transform = 'translateY(0)'    }}
              >
                <SlackIcon size={14} />
                Join our Slack
              </a>
            </Reveal>
          </div>

          {/* Right — pillar cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', paddingTop: '4px' }}>
            {PILLARS.map(({ heading, body }, i) => (
              <Reveal key={heading} delay={0.08 + i * 0.07}>
                <motion.div
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    padding:         '22px 26px',
                    borderLeft:      '2px solid var(--color-accent)',
                    backgroundColor: 'var(--color-surface)',
                  }}
                >
                  <p style={{
                    fontFamily:    '"Space Grotesk", sans-serif',
                    fontSize:      '15px',
                    fontWeight:    600,
                    letterSpacing: '-0.01em',
                    color:         'var(--color-text-primary)',
                    margin:        '0 0 6px',
                  }}>
                    {heading}
                  </p>
                  <p style={{
                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                    fontSize:   '14px',
                    lineHeight: 1.65,
                    color:      'var(--color-text-secondary)',
                    margin:     0,
                  }}>
                    {body}
                  </p>
                </motion.div>
              </Reveal>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────
// SECTION 2 — Contact channels
// ─────────────────────────────────────────────────────────────────
function ChannelCard({ icon, method, address, href, description, external }) {
  const [hovered, setHovered] = useState(false)
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display:         'flex',
        flexDirection:   'column',
        gap:             '16px',
        padding:         'clamp(24px, 3vw, 36px)',
        backgroundColor: 'var(--color-surface)',
        border:          `1px solid ${hovered ? 'var(--color-text-tertiary)' : 'var(--color-border)'}`,
        borderRadius:    '8px',
        textDecoration:  'none',
        transition:      'border-color 0.18s ease, box-shadow 0.18s ease',
        boxShadow:       hovered ? '0 4px 24px rgba(0,0,0,0.07)' : '0 1px 4px rgba(0,0,0,0.04)',
        cursor:          'pointer',
      }}
    >
      {/* Icon */}
      <div style={{
        width:           '36px',
        height:          '36px',
        borderRadius:    '8px',
        backgroundColor: 'var(--color-surface-muted)',
        border:          '1px solid var(--color-border)',
        display:         'flex',
        alignItems:      'center',
        justifyContent:  'center',
        color:           'var(--color-text-secondary)',
      }}>
        {icon}
      </div>

      {/* Method label */}
      <div>
        <p style={{
          fontFamily:    'Plus Jakarta Sans, sans-serif',
          fontSize:      '10px',
          fontWeight:    700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color:         'var(--color-text-tertiary)',
          margin:        '0 0 6px',
        }}>
          {method}
        </p>
        <p style={{
          fontFamily:    '"Space Grotesk", sans-serif',
          fontSize:      'clamp(14px, 1.6vw, 17px)',
          fontWeight:    500,
          letterSpacing: '-0.015em',
          color:         hovered ? 'var(--color-accent)' : 'var(--color-text-primary)',
          margin:        0,
          transition:    'color 0.18s ease',
          wordBreak:     'break-all',
        }}>
          {address}
        </p>
      </div>

      {/* Description */}
      <p style={{
        fontFamily: 'Plus Jakarta Sans, sans-serif',
        fontSize:   '13px',
        lineHeight: 1.65,
        color:      'var(--color-text-tertiary)',
        margin:     0,
        marginTop:  'auto',
      }}>
        {description}
      </p>
    </a>
  )
}

function ContactChannels() {
  return (
    <section style={{ paddingTop: 'clamp(56px, 7vw, 88px)', paddingBottom: 'clamp(56px, 7vw, 88px)' }}>
      <div className="container">
        <Reveal>
          <p style={{
            fontFamily:    'Plus Jakarta Sans, sans-serif',
            fontSize:      '11px',
            fontWeight:    600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color:         'var(--color-accent)',
            margin:        '0 0 32px',
          }}>
            How to reach us
          </p>
        </Reveal>
        <div style={{
          display:             'grid',
          gridTemplateColumns: '1fr 1fr',
          gap:                 '16px',
        }}
          className="contact-channels-grid"
        >
          <Reveal delay={0.06}>
            <ChannelCard
              icon={<MailIcon size={17} />}
              method="Email"
              address={EMAIL}
              href={`mailto:${EMAIL}`}
              description="For general questions, partnership inquiries, and press."
            />
          </Reveal>
          <Reveal delay={0.12}>
            <ChannelCard
              icon={<SlackIcon size={17} />}
              method="Slack"
              address="stanfordrobotics.slack.com"
              href={SLACK_URL}
              description="Day-to-day questions, community, and the fastest way to meet the team."
              external
            />
          </Reveal>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────
// SECTION 3 — For Organizations (contained bordered panel)
// ─────────────────────────────────────────────────────────────────
function PartnerSection() {
  const [hovered, setHovered] = useState(false)

  return (
    <section style={{
      borderTop:       '1px solid var(--color-border)',
      paddingTop:      'clamp(56px, 7vw, 88px)',
      paddingBottom:   'clamp(64px, 8vw, 112px)',
    }}>
      <div className="container">
        <Reveal>
          {/* Panel */}
          <div style={{
            border:       '1px solid var(--color-border)',
            borderRadius: '10px',
            padding:      'clamp(32px, 4vw, 56px)',
            backgroundColor: 'var(--color-surface)',
            display:      'grid',
            gridTemplateColumns: '1fr 1fr',
            gap:          'clamp(32px, 6vw, 80px)',
            alignItems:   'center',
          }}
            className="partner-panel"
          >
            {/* Left — copy */}
            <div>
              <Label>For Organizations</Label>
              <h2 style={{
                fontFamily:    '"Space Grotesk", sans-serif',
                fontSize:      'clamp(24px, 3.5vw, 38px)',
                fontWeight:    600,
                lineHeight:    1.1,
                letterSpacing: '-0.03em',
                color:         'var(--color-text-primary)',
                margin:        '0 0 20px',
              }}>
                Partner with Stanford Student Robotics.
              </h2>
              <p style={{
                fontFamily: 'Plus Jakarta Sans, sans-serif',
                fontSize:   'clamp(14px, 1.4vw, 16px)',
                lineHeight: 1.75,
                color:      'var(--color-text-secondary)',
                margin:     0,
              }}>
                Sponsoring SSR connects your organization directly with top engineering talent at Stanford — across CS, ME, EE, and design.
              </p>
            </div>

            {/* Right — contact block */}
            <div style={{
              borderLeft:  '1px solid var(--color-border)',
              paddingLeft: 'clamp(24px, 4vw, 48px)',
            }}
              className="partner-panel-right"
            >
              <p style={{
                fontFamily:    'Plus Jakarta Sans, sans-serif',
                fontSize:      '10px',
                fontWeight:    700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color:         'var(--color-text-tertiary)',
                margin:        '0 0 10px',
              }}>
                Start the conversation
              </p>
              <a
                href={`mailto:${EMAIL}`}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                style={{
                  display:       'block',
                  fontFamily:    '"Space Grotesk", sans-serif',
                  fontSize:      'clamp(16px, 2vw, 22px)',
                  fontWeight:    500,
                  letterSpacing: '-0.02em',
                  color:         hovered ? 'var(--color-accent)' : 'var(--color-text-primary)',
                  textDecoration: 'none',
                  marginBottom:  '16px',
                  transition:    'color 0.18s ease',
                  wordBreak:     'break-all',
                }}
              >
                {EMAIL}
              </a>
              <p style={{
                fontFamily: 'Plus Jakarta Sans, sans-serif',
                fontSize:   '13px',
                lineHeight: 1.65,
                color:      'var(--color-text-tertiary)',
                margin:     0,
              }}>
                Tell us about your organization and what you're looking for. We'll take it from there.
              </p>
            </div>

          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────
export default function Contact() {
  usePageTitle('Contact')
  return (
    <main style={{ paddingTop: 'var(--nav-height)' }}>
      <ContactHeader />
      <JoinSection />
      <ContactChannels />
      <PartnerSection />
    </main>
  )
}
