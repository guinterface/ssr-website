import { Link, NavLink } from 'react-router-dom'
import { useTheme } from '../../hooks/useTheme'

const EMAIL     = 'stanfordroboclub@gmail.com'
const SLACK_URL = 'https://join.slack.com/t/stanfordrobotics/shared_invite/placeholder'

const NAV_LINKS = [
  { label: 'Home',       to: '/'          },
  { label: 'Projects',   to: '/projects'  },
  { label: 'Leadership', to: '/leadership'},
  { label: 'Events',     to: '/events'    },
  { label: 'Sponsors',   to: '/sponsors'  },
  { label: 'Contact',    to: '/contact'   },
]

export default function Footer() {
  const { dark } = useTheme()
  return (
    <footer className="border-t border-border">
      <div className="container py-12">

        {/* Top row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-8 border-b border-border">

          {/* Logo + tagline */}
          <Link to="/" className="flex items-center no-underline">
            <img
              src={dark ? '/dark-logo.png' : '/light-logo.png'}
              alt="Stanford Student Robotics"
              style={{ height: '28px', width: 'auto', display: 'block' }}
            />
          </Link>

          {/* Contact + Slack */}
          <div className="flex items-center gap-5 flex-wrap">
            <a
              href={`mailto:${EMAIL}`}
              className="text-label text-text-tertiary hover:text-text-secondary no-underline transition-colors duration-200"
              style={{ letterSpacing: '0.02em' }}
            >
              {EMAIL}
            </a>
            <a
              href={SLACK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-label uppercase text-text-tertiary hover:text-text-secondary no-underline transition-colors duration-200"
              style={{ letterSpacing: '0.08em' }}
            >
              Join our Slack ↗
            </a>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8">
          <nav className="flex items-center gap-6 flex-wrap justify-center">
            {NAV_LINKS.map(({ label, to }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className="text-label uppercase text-text-tertiary hover:text-text-secondary no-underline transition-colors duration-200"
              >
                {label}
              </NavLink>
            ))}
          </nav>

          <p className="text-label uppercase text-text-tertiary">
            © {new Date().getFullYear()} Stanford Student Robotics
          </p>
        </div>

      </div>
    </footer>
  )
}
