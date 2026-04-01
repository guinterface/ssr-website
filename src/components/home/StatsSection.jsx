import { useRef, useState, useEffect } from 'react'
import { useInView }  from 'framer-motion'
import ScrollReveal   from '../ui/ScrollReveal'

const STATS = [
  { value: 60,  suffix: '+', label: 'Active Members'  },
  { value: 23,  suffix: '',  label: 'Robots Built'    },
  { value: 10,  suffix: '',  label: 'Teams'           },
  { value: 3,   suffix: '',  label: 'Competitions'    },
]

function StatItem({ value, suffix, label }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -40px 0px' })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return

    const duration = 1600 // ms
    let startTime  = null

    const tick = (timestamp) => {
      if (!startTime) startTime = timestamp
      const elapsed  = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease-out cubic — fast start, decelerates into the final value
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * value))
      if (progress < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  }, [inView, value])

  return (
    <div
      ref={ref}
      className="flex flex-col items-center text-center"
      style={{ flex: '1 1 0', minWidth: '120px' }}
    >
      <span
        style={{
          fontFamily: '"Space Grotesk", sans-serif',
          fontSize: 'clamp(48px, 5vw, 68px)',
          fontWeight: 600,
          lineHeight: 1,
          letterSpacing: '-0.03em',
          color: 'var(--color-text-primary)',
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {count}{suffix}
      </span>
      <span
        style={{
          fontFamily: 'Plus Jakarta Sans, sans-serif',
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--color-text-tertiary)',
          marginTop: '12px',
        }}
      >
        {label}
      </span>
    </div>
  )
}

export default function StatsSection() {
  return (
    <section className="section" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="container">

        {/* Section eyebrow */}
        <ScrollReveal>
          <p
            className="text-center mb-16"
            style={{
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--color-accent)',
            }}
          >
            By the numbers
          </p>
        </ScrollReveal>

        {/* Stats row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            gap: 'clamp(32px, 6vw, 80px)',
            flexWrap: 'wrap',
          }}
        >
          {STATS.map((stat, i) => (
            <div key={i} className="flex items-stretch gap-0">
              <StatItem {...stat} />
              {/* Thin vertical divider between items */}
              {i < STATS.length - 1 && (
                <div
                  aria-hidden="true"
                  style={{
                    width: '1px',
                    alignSelf: 'stretch',
                    backgroundColor: 'var(--color-border)',
                    marginLeft: 'clamp(16px, 3vw, 40px)',
                    flexShrink: 0,
                  }}
                />
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
