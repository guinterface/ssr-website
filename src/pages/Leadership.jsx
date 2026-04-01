import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { usePageTitle }   from '../hooks/usePageTitle'
import SectionHeader  from '../components/ui/SectionHeader'
import LeadershipCard from '../components/leadership/LeadershipCard'
import JoinCta        from '../components/ui/JoinCta'
import members        from '../data/leadership.json'

// ── Stagger variants ──────────────────────────────────────────────
const container = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.06 } },
}
const item = {
  hidden:  { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
  },
}

// ── Group config ──────────────────────────────────────────────────
// Order and display labels for each group key.
const GROUP_ORDER = ['Leadership', 'Board', 'Team Leads']

// ── Grid ──────────────────────────────────────────────────────────
function LeadershipGrid({ members }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -80px 0px' })

  return (
    <motion.div
      ref={ref}
      variants={container}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-7 gap-y-12"
    >
      {members.map(member => (
        <LeadershipCard key={member.id} member={member} variants={item} />
      ))}
    </motion.div>
  )
}

// ── Section divider ───────────────────────────────────────────────
function GroupDivider({ label }) {
  return (
    <div
      style={{
        display:    'flex',
        alignItems: 'center',
        gap:        '20px',
        margin:     '72px 0 48px',
      }}
    >
      <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--color-border)' }} />
      <span style={{
        fontFamily:    'Plus Jakarta Sans, sans-serif',
        fontSize:      '11px',
        fontWeight:    600,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color:         'var(--color-text-tertiary)',
        flexShrink:    0,
      }}>
        {label}
      </span>
      <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--color-border)' }} />
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────
export default function Leadership() {
  usePageTitle('Leadership')
  // Group members preserving GROUP_ORDER; fall back to ungrouped if no group field
  const hasGroups = members.some(m => m.group)

  const groups = hasGroups
    ? GROUP_ORDER
        .map(g => ({ label: g, members: members.filter(m => m.group === g) }))
        .filter(g => g.members.length > 0)
    : [{ label: null, members }]

  return (
    <main style={{ paddingTop: 'var(--nav-height)' }}>
      <section className="section container">
        <SectionHeader
          counter="02 · LEADERSHIP"
          title="The Team"
          subtitle="The officers and leads who keep Stanford Student Robotics running."
        />

        {groups.map((group, i) => (
          <div key={group.label ?? 'all'}>
            {/* Show divider between groups; first group gets no top divider */}
            {i > 0 && <GroupDivider label={group.label} />}
            {/* First group gets its own inline label above the grid */}
            {i === 0 && group.label && (
              <p style={{
                fontFamily:    'Plus Jakarta Sans, sans-serif',
                fontSize:      '11px',
                fontWeight:    600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color:         'var(--color-text-tertiary)',
                marginBottom:  '36px',
              }}>
                {group.label}
              </p>
            )}
            <LeadershipGrid members={group.members} />
          </div>
        ))}

        <JoinCta
          headline="Want to get more involved?"
          body="Reach out if you are passionate about robotics and want to help shape the direction of the club. We are always looking for people who want to contribute."
          label="Get in Touch"
        />
      </section>
    </main>
  )
}
