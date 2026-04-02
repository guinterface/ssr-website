import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useReducedMotion, useInView } from 'framer-motion'
import HeroVisualGrid from './HeroVisualGrid'
import events from '../../data/events.json'

// ── Resolve which event to surface ───────────────────────────────
const TODAY = new Date().toISOString().slice(0, 10)
const upcoming = events
  .filter(e => e.date >= TODAY)
  .sort((a, b) => a.date.localeCompare(b.date))
const past = events
  .filter(e => e.date < TODAY)
  .sort((a, b) => b.date.localeCompare(a.date))
const FEATURED_EVENT   = upcoming[0] ?? past[0] ?? null
const IS_UPCOMING      = upcoming.length > 0

function fmtDate(dateStr) {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  })
}

const fadeUp = (delay) => ({
  initial:    { opacity: 0, y: 20 },
  animate:    { opacity: 1, y: 0  },
  transition: { duration: 0.75, delay, ease: [0.4, 0, 0.2, 1] },
})

const MOTTO = 'Building the engineers who build the future.'

const STATS = [
  { value: 60,  suffix: '+', label: 'Active Members', live: true  },
  { value: 23,  suffix: '',  label: 'Robots Built',   live: false },
  { value: 10,  suffix: '',  label: 'Teams',          live: false },
  { value: 3,   suffix: '',  label: 'Competitions',   live: false },
]

// ── Event strip — compact activity log row ───────────────────────
function HudEventRow() {
  const [hovered, setHovered] = useState(false)
  if (!FEATURED_EVENT) return null

  return (
    <Link
      to="/events"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'space-between',
        gap:            '16px',
        maxWidth:       'var(--content-max)',
        margin:         '0 auto',
        padding:        '9px var(--gutter)',
        textDecoration: 'none',
        opacity:        hovered ? 1 : 0.8,
        transition:     'opacity 0.15s ease',
      }}
    >
      {/* Left — status + title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
        {/* Status dot */}
        <span style={{
          display:         'inline-block',
          width:           '5px',
          height:          '5px',
          borderRadius:    '50%',
          backgroundColor: IS_UPCOMING ? '#16A34A' : 'var(--color-text-tertiary)',
          flexShrink:      0,
          animation:       IS_UPCOMING ? 'hud-pulse 2.2s ease-in-out infinite' : 'none',
        }} />

        {/* Label */}
        <span style={{
          fontFamily:    'Plus Jakarta Sans, sans-serif',
          fontSize:      '9px',
          fontWeight:    700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color:         IS_UPCOMING ? '#16A34A' : 'var(--color-text-tertiary)',
          flexShrink:    0,
        }}>
          {IS_UPCOMING ? 'Upcoming' : 'Last event'}
        </span>

        {/* Separator */}
        <span style={{ color: 'var(--color-border)', fontSize: '11px', flexShrink: 0 }}>·</span>

        {/* Title */}
        <span style={{
          fontFamily:   '"Space Grotesk", sans-serif',
          fontSize:     '12px',
          fontWeight:   600,
          letterSpacing: '-0.01em',
          color:        'var(--color-text-primary)',
          overflow:     'hidden',
          textOverflow: 'ellipsis',
          whiteSpace:   'nowrap',
        }}>
          {FEATURED_EVENT.title}
        </span>
      </div>

      {/* Right — date + location + arrow */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
        <span style={{
          fontFamily:  'Plus Jakarta Sans, sans-serif',
          fontSize:    '11px',
          fontWeight:  500,
          color:       'var(--color-text-tertiary)',
          letterSpacing: '0.01em',
        }}>
          {fmtDate(FEATURED_EVENT.date)}
        </span>
        {FEATURED_EVENT.location && (
          <>
            <span style={{ color: 'var(--color-border)', fontSize: '11px' }}>·</span>
            <span style={{
              fontFamily:   'Plus Jakarta Sans, sans-serif',
              fontSize:     '11px',
              color:        'var(--color-text-tertiary)',
              maxWidth:     '18ch',
              overflow:     'hidden',
              textOverflow: 'ellipsis',
              whiteSpace:   'nowrap',
            }}>
              {FEATURED_EVENT.location}
            </span>
          </>
        )}
        <span style={{
          fontFamily: 'Plus Jakarta Sans, sans-serif',
          fontSize:   '11px',
          color:      hovered ? 'var(--color-text-secondary)' : 'var(--color-text-tertiary)',
          transition: 'color 0.15s ease',
        }}>
          →
        </span>
      </div>
    </Link>
  )
}

// ── Stat item — counter + fill bar, telemetry style ──────────────
function HudStat({ value, suffix, label, live, delay = 0, first = false }) {
  const ref           = useRef(null)
  const inView        = useInView(ref, { once: true })
  const [count,    setCount]    = useState(0)
  const [progress, setProgress] = useState(0)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (!inView) return
    if (reducedMotion) { setCount(value); setProgress(1); return }
    const duration = 1600
    let startTime = null
    let rafId
    const timeout = setTimeout(() => {
      const tick = (ts) => {
        if (!startTime) startTime = ts
        const p      = Math.min((ts - startTime) / duration, 1)
        const eased  = 1 - Math.pow(1 - p, 3)
        setCount(Math.round(eased * value))
        setProgress(eased)
        if (p < 1) rafId = requestAnimationFrame(tick)
      }
      rafId = requestAnimationFrame(tick)
    }, delay)
    return () => { clearTimeout(timeout); cancelAnimationFrame(rafId) }
  }, [inView, value, delay, reducedMotion])

  return (
    <div
      ref={ref}
      style={{
        flex:        '1 1 0',
        minWidth:    '100px',
        padding:     '0 clamp(12px, 2vw, 28px)',
        borderLeft:  first ? 'none' : '1px solid var(--color-border)',
      }}
    >
      {/* Number + live dot */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '7px', marginBottom: '5px' }}>
        {live && (
          <span
            aria-hidden="true"
            style={{
              display:         'inline-block',
              width:           '5px',
              height:          '5px',
              borderRadius:    '50%',
              backgroundColor: '#16A34A',
              flexShrink:      0,
              alignSelf:       'center',
              animation:       'hud-pulse 2.2s ease-in-out infinite',
            }}
          />
        )}
        <span style={{
          fontFamily:         '"Space Grotesk", sans-serif',
          fontSize:           'clamp(26px, 2.8vw, 40px)',
          fontWeight:         600,
          lineHeight:         1,
          letterSpacing:      '-0.03em',
          color:              'var(--color-text-primary)',
          fontVariantNumeric: 'tabular-nums',
        }}>
          {count}{suffix}
        </span>
      </div>

      {/* Label */}
      <p style={{
        fontFamily:    'Plus Jakarta Sans, sans-serif',
        fontSize:      '10px',
        fontWeight:    600,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color:         'var(--color-text-tertiary)',
        margin:        '0 0 10px',
      }}>
        {label}
      </p>

      {/* Fill bar — tracks counter progress */}
      <div style={{ height: '1px', backgroundColor: 'var(--color-border)' }}>
        <div style={{
          height:          '100%',
          width:           `${progress * 100}%`,
          backgroundColor: 'var(--color-accent)',
        }} />
      </div>
    </div>
  )
}

// ── Hero ─────────────────────────────────────────────────────────
export default function Hero() {
  const reducedMotion = useReducedMotion()
  const { scrollY }   = useScroll()
  const gridOpacity   = useTransform(scrollY, [0, 400], [1, 0])
  const gridY         = useTransform(scrollY, [0, 400], [0, -30])

  return (
    <section
      style={{
        position:  'relative',
        height:    '100dvh',
        minHeight: '640px',
        overflow:  'hidden',
      }}
    >
      {/* ── Grid background ──────────────────────────────── */}
      <motion.div
        className="absolute inset-0"
        style={reducedMotion ? {} : { opacity: gridOpacity, y: gridY, willChange: 'opacity, transform' }}
      >
        <HeroVisualGrid />
      </motion.div>

      {/* ── Vignette ─────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: [
            'radial-gradient(ellipse 90% 80% at 50% 50%, transparent 30%, rgba(var(--color-bg-rgb), 0.82) 100%)',
            'radial-gradient(ellipse 48% 42% at 50% 50%, rgba(var(--color-bg-rgb), 0.72) 0%, transparent 100%)',
          ].join(', '),
        }}
      />

      {/* ── Hero text — centered in upper portion ────────── */}
      <div
        className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center"
        style={{ padding: '0 24px', paddingBottom: '200px' }}
      >
        <motion.p
          {...fadeUp(0.2)}
          style={{
            fontFamily:    'Plus Jakarta Sans, sans-serif',
            fontSize:      'clamp(12px, 1.4vw, 15px)',
            fontWeight:    600,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color:         'var(--color-accent)',
            marginBottom:  '20px',
          }}
        >
          Stanford University
        </motion.p>

        <motion.h1
          {...fadeUp(0.45)}
          style={{
            fontFamily:    '"Space Grotesk", sans-serif',
            fontSize:      'clamp(42px, 7.5vw, 80px)',
            fontWeight:    600,
            lineHeight:    1.0,
            letterSpacing: '-0.035em',
            color:         'var(--color-text-primary)',
          }}
        >
          Stanford Student Robotics
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.65, delay: 0.7, ease: [0.4, 0, 0.2, 1] }}
          style={{
            width:           '40px',
            height:          '1px',
            backgroundColor: 'var(--color-accent)',
            margin:          '36px auto',
            transformOrigin: 'center',
          }}
        />

        <motion.p
          {...fadeUp(0.85)}
          style={{
            fontFamily:    'Plus Jakarta Sans, sans-serif',
            fontSize:      'clamp(14px, 1.8vw, 16px)',
            fontWeight:    400,
            fontStyle:     'italic',
            lineHeight:    1.75,
            color:         'var(--color-text-secondary)',
            maxWidth:      '36ch',
            letterSpacing: '0.01em',
          }}
        >
          {MOTTO}
        </motion.p>
      </div>

      {/* ── Event strip — just below the navbar ─────────── */}
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0  }}
        transition={{ duration: 0.45, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
        style={{
          position:             'absolute',
          top:                  'var(--nav-height)',
          left:                 0,
          right:                0,
          zIndex:               10,
          borderBottom:         '1px solid var(--color-border)',
          backgroundColor:      'rgba(var(--color-bg-rgb), 0.75)',
          backdropFilter:       'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
      >
        <HudEventRow />
      </motion.div>

      {/* ── Stats HUD — overlays bottom of hero ──────────── */}
      {/*
        clip-path creates a diagonal top edge: right side flush,
        left side starts 28px lower — a non-horizontal boundary
        that separates this panel from the hero field above.
      */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0  }}
        transition={{ duration: 0.55, delay: 1.1, ease: [0.4, 0, 0.2, 1] }}
        style={{
          position:              'absolute',
          bottom:                0,
          left:                  0,
          right:                 0,
          zIndex:                10,
          backgroundColor:       'rgba(var(--color-bg-rgb), 0.90)',
          backdropFilter:        'blur(20px)',
          WebkitBackdropFilter:  'blur(20px)',
          clipPath:              'polygon(0 28px, 100% 0, 100% 100%, 0 100%)',
          WebkitClipPath:        'polygon(0 28px, 100% 0, 100% 100%, 0 100%)',
        }}
      >
        <div style={{
          maxWidth: 'var(--content-max)',
          margin:   '0 auto',
          padding:  'clamp(44px, 5vw, 56px) var(--gutter) clamp(28px, 3vw, 36px)',
          display:  'flex',
        }}>
          {STATS.map((stat, i) => (
            <HudStat
              key={stat.label}
              {...stat}
              delay={i * 100}
              first={i === 0}
            />
          ))}
        </div>
      </motion.div>

    </section>
  )
}
