import { Link, NavLink } from 'react-router-dom'
import { useTheme } from '../../hooks/useTheme'

const EMAIL     = 'stanfordroboclub@gmail.com'
const SLACK_URL = 'https://join.slack.com/t/stanfordrobotics/shared_invite/placeholder'

const NAV_LINKS = [
  { label: 'Projects',   to: '/projects'  },
  { label: 'Leadership', to: '/leadership'},
  { label: 'Events',     to: '/events'    },
  { label: 'Sponsors',   to: '/sponsors'  },
  { label: 'Contact',    to: '/contact'   },
]

export default function Footer() {
  const { dark } = useTheme()

  return (
    <footer style={{
      borderTop:       '1px solid var(--color-border)',
      backgroundColor: 'var(--color-surface-muted)',
    }}>
      <div className="container" style={{ paddingTop: '64px', paddingBottom: '40px' }}>

        {/* Three-column top row */}
        <div
          className="footer-grid"
          style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap:                 'clamp(32px, 6vw, 80px)',
            paddingBottom:       '48px',
            borderBottom:        '1px solid var(--color-border)',
            alignItems:          'start',
          }}
        >

          {/* Col 1 — Brand */}
          <div>
            <Link to="/" style={{ display: 'inline-block', marginBottom: '20px' }}>
              <img
                src={dark ? '/dark-logo.png' : '/light-logo.png'}
                alt="Stanford Student Robotics"
                style={{ height: '28px', width: 'auto', display: 'block' }}
              />
            </Link>
            <p style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize:   '13px',
              lineHeight: 1.7,
              color:      'var(--color-text-tertiary)',
              margin:     0,
              maxWidth:   '26ch',
            }}>
              Stanford's interdisciplinary student robotics club. Open to all majors, no experience required.
            </p>
          </div>

          {/* Col 2 — Navigation */}
          <div>
            <p style={{
              fontFamily:    "'Plus Jakarta Sans', sans-serif",
              fontSize:      '10px',
              fontWeight:    700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color:         'var(--color-text-tertiary)',
              margin:        '0 0 16px',
            }}>
              Pages
            </p>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {NAV_LINKS.map(({ label, to }) => (
                <NavLink
                  key={to}
                  to={to}
                  style={({ isActive }) => ({
                    fontFamily:     "'Plus Jakarta Sans', sans-serif",
                    fontSize:       '13px',
                    fontWeight:     500,
                    color:          isActive ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                    textDecoration: 'none',
                    transition:     'color 0.15s ease',
                  })}
                >
                  {label}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Col 3 — Contact */}
          <div>
            <p style={{
              fontFamily:    "'Plus Jakarta Sans', sans-serif",
              fontSize:      '10px',
              fontWeight:    700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color:         'var(--color-text-tertiary)',
              margin:        '0 0 16px',
            }}>
              Contact
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <a
                href={`mailto:${EMAIL}`}
                style={{
                  fontFamily:     "'Plus Jakarta Sans', sans-serif",
                  fontSize:       '13px',
                  fontWeight:     500,
                  color:          'var(--color-text-secondary)',
                  textDecoration: 'none',
                  transition:     'color 0.15s ease',
                }}
              >
                {EMAIL}
              </a>
              <a
                href={SLACK_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily:     "'Plus Jakarta Sans', sans-serif",
                  fontSize:       '13px',
                  fontWeight:     500,
                  color:          'var(--color-text-secondary)',
                  textDecoration: 'none',
                  transition:     'color 0.15s ease',
                }}
              >
                Slack community ↗
              </a>
            </div>
          </div>

        </div>

        {/* Bottom row */}
        <div style={{
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'space-between',
          paddingTop:     '24px',
          flexWrap:       'wrap',
          gap:            '12px',
        }}>
          <p style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize:   '11px',
            fontWeight: 500,
            color:      'var(--color-text-tertiary)',
            margin:     0,
          }}>
            © {new Date().getFullYear()} Stanford Student Robotics
          </p>
          <p style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize:   '11px',
            color:      'var(--color-text-tertiary)',
            margin:     0,
          }}>
            Stanford University · Palo Alto, CA
          </p>
        </div>

      </div>
    </footer>
  )
}
