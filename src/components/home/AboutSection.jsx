import { motion } from 'framer-motion'
import ScrollReveal from '../ui/ScrollReveal'

const PILLARS = [
  {
    label: 'Build',
    body:  'You will have the chance to engage directly with the design and construction of real robots, from first sketch to final demo.',
  },
  {
    label: 'Collaborate',
    body:  'Mechanical, electrical, software, or whatever your expertise may be, you are welcome here.',
  },
  {
    label: 'Learn',
    body:  'No experience needed, just curiosity. You will grow through doing, guided by peers who have been exactly where you are.',
  },
]

export default function AboutSection() {
  return (
    <section className="section" style={{ backgroundColor: 'var(--color-surface-muted)' }}>
      <div className="container">

        {/* Two-column layout */}
        <div className="about-split">

          {/* Left — headline + copy */}
          <div>
            <ScrollReveal>
              <p style={{
                fontFamily:    'Plus Jakarta Sans, sans-serif',
                fontSize:      '11px',
                fontWeight:    600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color:         'var(--color-accent)',
                marginBottom:  '20px',
              }}>
                Who we are
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.05}>
              <h2 style={{
                fontFamily:    '"Space Grotesk", sans-serif',
                fontSize:      'clamp(30px, 4vw, 52px)',
                fontWeight:    700,
                lineHeight:    1.0,
                letterSpacing: '-0.04em',
                color:         'var(--color-text-primary)',
                margin:        '0 0 28px',
              }}>
                Stanford's home<br />
                for hands-on robotics.
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <p style={{
                fontFamily: 'Plus Jakarta Sans, sans-serif',
                fontSize:   'clamp(14px, 1.5vw, 16px)',
                lineHeight: 1.75,
                color:      'var(--color-text-secondary)',
                maxWidth:   '48ch',
                margin:     0,
              }}>
                We're an interdisciplinary student organization building autonomous systems. Open to undergrads and grad students across all departments, no experience required.
              </p>
            </ScrollReveal>
          </div>

          {/* Right — pillar cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {PILLARS.map(({ label, body }, i) => (
              <ScrollReveal key={label} delay={0.1 + i * 0.07}>
                <motion.div
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    padding:      '24px 28px',
                    borderLeft:   '2px solid var(--color-accent)',
                    backgroundColor: 'var(--color-surface)',
                    cursor:       'default',
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
                    {label}
                  </p>
                  <p style={{
                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                    fontSize:   '14px',
                    lineHeight: 1.6,
                    color:      'var(--color-text-secondary)',
                    margin:     0,
                  }}>
                    {body}
                  </p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
