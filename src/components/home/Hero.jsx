import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import HeroVisualGrid from './HeroVisualGrid'

/**
 * Entrance animation sequence:
 *  0.2s  — university line fades up
 *  0.45s — club name fades up
 *  0.7s  — divider draws from center
 *  0.85s — motto fades up
 *  1.1s  — scroll indicator appears
 */
const fadeUp = (delay) => ({
  initial:    { opacity: 0, y: 20 },
  animate:    { opacity: 1, y: 0  },
  transition: { duration: 0.75, delay, ease: [0.4, 0, 0.2, 1] },
})

const MOTTO = 'Building the engineers who build the future.'

export default function Hero() {
  const reducedMotion = useReducedMotion()
  const { scrollY } = useScroll()
  // As user scrolls through the hero section (0 → viewport height),
  // the grid fades out and drifts upward — creating a parallax depth effect.
  const gridOpacity = useTransform(scrollY, [0, 500], [1, 0])
  const gridY       = useTransform(scrollY, [0, 500], [0, -40])

  return (
    <section
      className="relative flex flex-col items-center justify-center overflow-hidden"
      style={{ height: '100dvh', minHeight: '600px' }}
    >

      {/* ── Visual grid background ────────────────────────── */}
      <motion.div
        className="absolute inset-0"
        style={reducedMotion ? {} : { opacity: gridOpacity, y: gridY }}
      >
        <HeroVisualGrid />
      </motion.div>

      {/* ── Vignette layers ──────────────────────────────────
          Two stacked gradients:
          1. Edge fade — pulls the grid back at the perimeter
          2. Center glow — brightens directly behind the text      */}
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

      {/* ── Hero content ─────────────────────────────────── */}
      <div
        className="relative z-10 flex flex-col items-center text-center"
        style={{ padding: '0 24px' }}
      >

        {/* University line */}
        <motion.p
          {...fadeUp(0.2)}
          style={{
            fontFamily:    'Inter, sans-serif',
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

        {/* Club name — dominant element */}
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

        {/* Divider — draws outward from center */}
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

        {/* Motto */}
        <motion.p
          {...fadeUp(0.85)}
          style={{
            fontFamily:    'Inter, sans-serif',
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

      {/* ── Scroll indicator ─────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            width:           '1px',
            height:          '40px',
            backgroundColor: 'var(--color-text-tertiary)',
            opacity:         0.45,
          }}
        />
      </motion.div>

    </section>
  )
}
