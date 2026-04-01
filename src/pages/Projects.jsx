import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { usePageTitle }   from '../hooks/usePageTitle'
import SectionHeader    from '../components/ui/SectionHeader'
import ProjectsLayout   from '../components/projects/ProjectsLayout'
import ProjectModal     from '../components/projects/ProjectModal'
import JoinCta          from '../components/ui/JoinCta'
import projects         from '../data/projects.json'

// Derive category list from data — no hardcoding
const ALL_CATEGORIES = ['All', ...Array.from(new Set(projects.map(p => p.category))).sort()]

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function Projects() {
  usePageTitle('Projects')
  const [selected, setSelected] = useState(null)
  const [params, setParams] = useSearchParams()
  const activeCategory = params.get('category') || 'All'

  // Shuffle once per mount — stable for the full session
  const shuffledProjects = useMemo(() => [
    ...shuffle(projects.filter(p => p.featured)),
    ...shuffle(projects.filter(p => !p.featured)),
  ], []) // eslint-disable-line react-hooks/exhaustive-deps

  const filtered = activeCategory === 'All'
    ? shuffledProjects
    : shuffledProjects.filter(p => p.category === activeCategory)

  function setCategory(cat) {
    if (cat === 'All') {
      setParams({})
    } else {
      setParams({ category: cat })
    }
  }

  return (
    <>
      <main id="main-content" style={{ paddingTop: 'var(--nav-height)' }}>
        <section className="section container">

          <SectionHeader
            counter="01 · PROJECTS"
            title="Our Work"
            subtitle="A selection of the robots, systems, and platforms we've built across
                      competition, research, and independent exploration."
          />

          {/* Category filter bar */}
          <div style={{
            display:    'flex',
            flexWrap:   'wrap',
            gap:        '8px',
            marginBottom: '32px',
          }}>
            {ALL_CATEGORIES.map(cat => {
              const active = cat === activeCategory
              return (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  style={{
                    fontFamily:      'Plus Jakarta Sans, sans-serif',
                    fontSize:        '12px',
                    fontWeight:      600,
                    letterSpacing:   '0.06em',
                    textTransform:   'uppercase',
                    padding:         '7px 16px',
                    borderRadius:    '100px',
                    border:          `1px solid ${active ? 'var(--color-accent)' : 'var(--color-border)'}`,
                    backgroundColor: active ? 'var(--color-accent)' : 'transparent',
                    color:           active ? '#fff' : 'var(--color-text-secondary)',
                    cursor:          'pointer',
                    transition:      'all 0.18s ease',
                  }}
                  onMouseEnter={e => {
                    if (!active) {
                      e.currentTarget.style.borderColor = 'var(--color-text-tertiary)'
                      e.currentTarget.style.color = 'var(--color-text-primary)'
                    }
                  }}
                  onMouseLeave={e => {
                    if (!active) {
                      e.currentTarget.style.borderColor = 'var(--color-border)'
                      e.currentTarget.style.color = 'var(--color-text-secondary)'
                    }
                  }}
                >
                  {cat}
                </button>
              )
            })}
          </div>

          <AnimatePresence mode="wait">
            {filtered.length > 0 ? (
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{   opacity: 0, y: -4 }}
                transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
              >
                <ProjectsLayout projects={filtered} onSelect={setSelected} />
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{   opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{
                  padding:      '80px 0',
                  textAlign:    'center',
                  border:       '1px dashed var(--color-border)',
                  borderRadius: '8px',
                }}
              >
                <p style={{
                  fontFamily: '"Space Grotesk", sans-serif',
                  fontSize:   '18px',
                  fontWeight: 500,
                  color:      'var(--color-text-tertiary)',
                  margin:     0,
                }}>
                  No projects in this category yet.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <JoinCta
            headline="Want to work on projects like these?"
            body="Join a team, pitch your own idea, or help an existing project grow. We welcome members who want to make real things."
          />

        </section>
      </main>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </>
  )
}
