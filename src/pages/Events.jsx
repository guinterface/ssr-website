import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePageTitle }  from '../hooks/usePageTitle'
import SectionHeader from '../components/ui/SectionHeader'
import eventsData    from '../data/events.json'

// ─────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────

const CATEGORY_STYLES = {
  Showcase:    { color: '#8C1515', bg: '#FDF0F0' },
  Workshop:    { color: '#0C7A65', bg: '#E6F7F4' },
  Conference:  { color: '#3B5BDB', bg: '#EDF2FF' },
  Competition: { color: '#6D28D9', bg: '#F5F3FF' },
  Seminar:     { color: '#B45309', bg: '#FFFBEB' },
  Social:      { color: '#0E7490', bg: '#E0F7FA' },
}

function getCategoryStyle(cat) {
  return CATEGORY_STYLES[cat] ?? { color: '#555', bg: '#F0F0EE' }
}

function CategoryPill({ category }) {
  const { color, bg } = getCategoryStyle(category)
  return (
    <span style={{
      display:         'inline-block',
      padding:         '2px 9px',
      borderRadius:    '100px',
      backgroundColor: bg,
      color,
      fontFamily:      'Inter, sans-serif',
      fontSize:        '10px',
      fontWeight:      600,
      letterSpacing:   '0.07em',
      textTransform:   'uppercase',
    }}>
      {category}
    </span>
  )
}

function formatDate(dateStr) {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', {
    weekday: 'short', month: 'long', day: 'numeric', year: 'numeric',
  })
}

// Default view: earliest event's month
function getInitialMonth() {
  const earliest = eventsData.reduce((min, e) => e.date < min ? e.date : min, eventsData[0].date)
  const [y, m] = earliest.split('-').map(Number)
  return { year: y, month: m - 1 }
}

// ─────────────────────────────────────────────────────────────────
// Calendar
// ─────────────────────────────────────────────────────────────────

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function Calendar({ viewYear, viewMonth, onPrev, onNext, eventDates, selectedDate, onSelectDate }) {
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()
  const firstDay    = new Date(viewYear, viewMonth, 1).getDay()
  const monthLabel  = new Date(viewYear, viewMonth, 1)
    .toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

  const cells = []
  for (let i = 0; i < firstDay; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)
  // pad to complete last row
  while (cells.length % 7 !== 0) cells.push(null)

  return (
    <div style={{
      borderRadius:    '12px',
      overflow:        'hidden',
      border:          '1px solid var(--color-border)',
      backgroundColor: 'var(--color-surface)',
      boxShadow:       '0 2px 12px rgba(0,0,0,0.06)',
    }}>
      {/* Header bar — cardinal red */}
      <div style={{
        backgroundColor: 'var(--color-accent)',
        padding:         '18px 20px',
        display:         'flex',
        alignItems:      'center',
        justifyContent:  'space-between',
      }}>
        <NavButton onClick={onPrev}>‹</NavButton>
        <span style={{
          fontFamily:    '"Space Grotesk", sans-serif',
          fontSize:      '15px',
          fontWeight:    600,
          letterSpacing: '-0.01em',
          color:         '#fff',
        }}>
          {monthLabel}
        </span>
        <NavButton onClick={onNext}>›</NavButton>
      </div>

      {/* Weekday labels */}
      <div style={{
        display:               'grid',
        gridTemplateColumns:   'repeat(7, 1fr)',
        padding:               '14px 12px 6px',
        borderBottom:          '1px solid var(--color-border)',
      }}>
        {WEEKDAYS.map(d => (
          <div key={d} style={{
            textAlign:     'center',
            fontFamily:    'Inter, sans-serif',
            fontSize:      '9px',
            fontWeight:    700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color:         'var(--color-text-tertiary)',
            padding:       '4px 0',
          }}>
            {d[0]}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div style={{
        display:             'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        padding:             '8px 12px 16px',
        gap:                 '2px',
      }}>
        {cells.map((day, i) => {
          if (!day) return <div key={i} />
          const dateStr   = `${viewYear}-${String(viewMonth + 1).padStart(2,'0')}-${String(day).padStart(2,'0')}`
          const hasEvent  = eventDates.has(dateStr)
          const isSelected = selectedDate === dateStr

          return (
            <button
              key={i}
              onClick={() => hasEvent && onSelectDate(isSelected ? null : dateStr)}
              style={{
                width:           '100%',
                aspectRatio:     '1',
                border:          'none',
                borderRadius:    '50%',
                backgroundColor: isSelected
                  ? 'var(--color-accent)'
                  : hasEvent
                    ? 'rgba(140,21,21,0.09)'
                    : 'transparent',
                color:           isSelected
                  ? '#fff'
                  : hasEvent
                    ? 'var(--color-accent)'
                    : 'var(--color-text-primary)',
                fontFamily:      'Inter, sans-serif',
                fontSize:        '12px',
                fontWeight:      hasEvent ? 700 : 400,
                cursor:          hasEvent ? 'pointer' : 'default',
                transition:      'background-color 0.15s ease, color 0.15s ease',
                display:         'flex',
                alignItems:      'center',
                justifyContent:  'center',
                position:        'relative',
                padding:         0,
              }}
            >
              {day}
              {/* Event dot */}
              {hasEvent && !isSelected && (
                <span style={{
                  position:        'absolute',
                  bottom:          '3px',
                  left:            '50%',
                  transform:       'translateX(-50%)',
                  width:           '3px',
                  height:          '3px',
                  borderRadius:    '50%',
                  backgroundColor: 'var(--color-accent)',
                  pointerEvents:   'none',
                }} />
              )}
            </button>
          )
        })}
      </div>

      {/* Legend */}
      <div style={{
        borderTop:  '1px solid var(--color-border)',
        padding:    '12px 20px',
        display:    'flex',
        alignItems: 'center',
        gap:        '8px',
      }}>
        <div style={{
          width: '8px', height: '8px', borderRadius: '50%',
          backgroundColor: 'rgba(140,21,21,0.12)',
          border: '1.5px solid var(--color-accent)',
        }} />
        <span style={{
          fontFamily:  'Inter, sans-serif',
          fontSize:    '11px',
          color:       'var(--color-text-tertiary)',
          letterSpacing: '0.01em',
        }}>
          Event scheduled
        </span>
        {selectedDate && (
          <button
            onClick={() => onSelectDate(null)}
            style={{
              marginLeft:      'auto',
              background:      'none',
              border:          'none',
              fontFamily:      'Inter, sans-serif',
              fontSize:        '11px',
              fontWeight:      600,
              color:           'var(--color-accent)',
              cursor:          'pointer',
              letterSpacing:   '0.02em',
              padding:         0,
            }}
          >
            Clear filter ×
          </button>
        )}
      </div>
    </div>
  )
}

function NavButton({ onClick, children }) {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background:   'none',
        border:       'none',
        color:        hovered ? '#fff' : 'rgba(255,255,255,0.65)',
        cursor:       'pointer',
        fontSize:     '20px',
        lineHeight:   1,
        padding:      '4px 8px',
        borderRadius: '4px',
        backgroundColor: hovered ? 'rgba(255,255,255,0.15)' : 'transparent',
        transition:   'color 0.15s ease, background-color 0.15s ease',
      }}
    >
      {children}
    </button>
  )
}

// ─────────────────────────────────────────────────────────────────
// Event card — clean white card, structured
// ─────────────────────────────────────────────────────────────────

function EventCard({ event, isPast = false }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: isPast ? 0.55 : 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: 'var(--color-surface)',
        border:          `1px solid ${hovered ? '#C8C6C4' : 'var(--color-border)'}`,
        borderRadius:    '10px',
        padding:         '20px 22px',
        boxShadow:       hovered ? '0 4px 20px rgba(0,0,0,0.08)' : '0 1px 4px rgba(0,0,0,0.04)',
        transition:      'border-color 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease',
        cursor:          'default',
        opacity:         isPast && hovered ? 0.85 : undefined,
      }}
    >
      {/* Top row: category + date + past badge */}
      <div style={{
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'space-between',
        gap:            '10px',
        marginBottom:   '10px',
        flexWrap:       'wrap',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <CategoryPill category={event.category} />
          {isPast && (
            <span style={{
              fontFamily:      'Inter, sans-serif',
              fontSize:        '10px',
              fontWeight:      600,
              letterSpacing:   '0.07em',
              textTransform:   'uppercase',
              color:           'var(--color-text-tertiary)',
              backgroundColor: 'var(--color-surface-muted)',
              borderRadius:    '100px',
              padding:         '2px 8px',
              border:          '1px solid var(--color-border)',
            }}>
              Completed
            </span>
          )}
        </div>
        <span style={{
          fontFamily:  'Inter, sans-serif',
          fontSize:    '11px',
          fontWeight:  500,
          color:       'var(--color-text-tertiary)',
          letterSpacing: '0.01em',
          flexShrink:  0,
        }}>
          {formatDate(event.date)}
        </span>
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily:    '"Space Grotesk", sans-serif',
        fontSize:      '16px',
        fontWeight:    600,
        lineHeight:    1.2,
        letterSpacing: '-0.018em',
        color:         'var(--color-text-primary)',
        margin:        '0 0 8px',
      }}>
        {event.title}
      </h3>

      {/* Description */}
      <p style={{
        fontFamily:      'Inter, sans-serif',
        fontSize:        '13px',
        lineHeight:      1.72,
        color:           'var(--color-text-secondary)',
        margin:          '0 0 12px',
        display:         '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow:        'hidden',
      }}>
        {event.description}
      </p>

      {/* Location */}
      {event.location && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
            <path d="M6 1a3.5 3.5 0 0 1 3.5 3.5c0 2.5-3.5 6.5-3.5 6.5S2.5 7 2.5 4.5A3.5 3.5 0 0 1 6 1z"
              stroke="var(--color-text-tertiary)" strokeWidth="1.2"/>
            <circle cx="6" cy="4.5" r="1" fill="var(--color-text-tertiary)"/>
          </svg>
          <span style={{
            fontFamily:  'Inter, sans-serif',
            fontSize:    '11px',
            color:       'var(--color-text-tertiary)',
            letterSpacing: '0.01em',
          }}>
            {event.location}
          </span>
        </div>
      )}
    </motion.article>
  )
}

// ─────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────

const TODAY = new Date().toISOString().slice(0, 10) // 'YYYY-MM-DD'

export default function Events() {
  usePageTitle('Events')
  const [tab,          setTab]          = useState('upcoming') // 'upcoming' | 'past'
  const init = getInitialMonth()
  const [viewYear,     setViewYear]     = useState(init.year)
  const [viewMonth,    setViewMonth]    = useState(init.month)
  const [selectedDate, setSelectedDate] = useState(null)

  // Filter events by tab
  const tabEvents = useMemo(
    () => tab === 'upcoming'
      ? eventsData.filter(e => e.date >= TODAY)
      : eventsData.filter(e => e.date < TODAY).reverse(),
    [tab]
  )

  // Set of date strings with events (filtered by tab)
  const eventDates = useMemo(
    () => new Set(tabEvents.map(e => e.date)),
    [tabEvents]
  )

  function prevMonth() {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11) }
    else setViewMonth(m => m - 1)
    setSelectedDate(null)
  }

  function nextMonth() {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0) }
    else setViewMonth(m => m + 1)
    setSelectedDate(null)
  }

  // Visible events: if date selected → that date only; else → current view month
  const visibleEvents = useMemo(() => {
    if (selectedDate) {
      return tabEvents.filter(e => e.date === selectedDate)
    }
    return tabEvents
      .filter(e => {
        const [ey, em] = e.date.split('-').map(Number)
        return ey === viewYear && em - 1 === viewMonth
      })
      .sort((a, b) => a.date.localeCompare(b.date))
  }, [selectedDate, viewYear, viewMonth, tabEvents])

  const listHeading = selectedDate
    ? new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
    : new Date(viewYear, viewMonth, 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

  return (
    <main style={{ paddingTop: 'var(--nav-height)' }}>
      <section className="section container">

        <SectionHeader
          counter="04 · EVENTS"
          title="What's Happening"
          subtitle="Workshops, showcases, competitions, and socials. There's always something going on."
        />

        {/* Upcoming / Past tabs */}
        <div style={{ display: 'flex', gap: '4px', marginBottom: '32px', borderBottom: '1px solid var(--color-border)', paddingBottom: '0' }}>
          {['upcoming', 'past'].map(t => (
            <button
              key={t}
              onClick={() => { setTab(t); setSelectedDate(null) }}
              style={{
                fontFamily:      'Inter, sans-serif',
                fontSize:        '13px',
                fontWeight:      600,
                letterSpacing:   '0.04em',
                textTransform:   'uppercase',
                padding:         '10px 20px',
                border:          'none',
                borderBottom:    `2px solid ${t === tab ? 'var(--color-accent)' : 'transparent'}`,
                backgroundColor: 'transparent',
                color:           t === tab ? 'var(--color-accent)' : 'var(--color-text-tertiary)',
                cursor:          'pointer',
                transition:      'color 0.18s ease, border-color 0.18s ease',
                marginBottom:    '-1px',
              }}
            >
              {t === 'upcoming' ? 'Upcoming' : 'Past'}
            </button>
          ))}
        </div>

        {/* Two-column layout */}
        <div className="events-layout">
          {/* LEFT — Calendar (sticky) */}
          <div className="calendar-sticky">
            <Calendar
              viewYear={viewYear}
              viewMonth={viewMonth}
              onPrev={prevMonth}
              onNext={nextMonth}
              eventDates={eventDates}
              selectedDate={selectedDate}
              onSelectDate={setSelectedDate}
            />
          </div>

          {/* RIGHT — Event list */}
          <div>
            {/* List heading */}
            <div style={{
              display:       'flex',
              alignItems:    'baseline',
              gap:           '10px',
              marginBottom:  '20px',
            }}>
              <h2 style={{
                fontFamily:    '"Space Grotesk", sans-serif',
                fontSize:      '18px',
                fontWeight:    600,
                letterSpacing: '-0.02em',
                color:         'var(--color-text-primary)',
                margin:        0,
              }}>
                {listHeading}
              </h2>
              <span style={{
                fontFamily: 'Inter, sans-serif',
                fontSize:   '12px',
                color:      'var(--color-text-tertiary)',
              }}>
                {visibleEvents.length} event{visibleEvents.length !== 1 ? 's' : ''}
              </span>
            </div>

            {/* Cards */}
            <AnimatePresence mode="popLayout">
              {visibleEvents.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {visibleEvents.map(e => (
                    <EventCard key={e.id} event={e} isPast={tab === 'past'} />
                  ))}
                </div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{
                    padding:    '60px 24px',
                    textAlign:  'center',
                    border:     '1px dashed var(--color-border)',
                    borderRadius: '10px',
                  }}
                >
                  <p style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize:   '14px',
                    color:      'var(--color-text-tertiary)',
                    margin:     0,
                  }}>
                    No events this day.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </section>
    </main>
  )
}
