/**
 * Infinite horizontal scrolling strip.
 * Duplicates items so the loop is seamless.
 * Pauses on hover.
 *
 * Props:
 *   items    — array of strings to display
 *   speed    — scroll duration in seconds (default 40)
 */
export default function Marquee({ items = [], speed = 40 }) {
  // Duplicate items to fill the strip and allow seamless looping
  const repeated = [...items, ...items]

  return (
    <div
      className="overflow-hidden border-t border-b border-border"
      style={{ backgroundColor: 'var(--color-surface-muted)' }}
    >
      <div
        className="flex items-center"
        style={{ height: '52px' }}
      >
        <div
          className="flex items-center gap-0 whitespace-nowrap"
          style={{
            animation: `marquee ${speed}s linear infinite`,
            willChange: 'transform',
          }}
          onMouseEnter={e => (e.currentTarget.style.animationPlayState = 'paused')}
          onMouseLeave={e => (e.currentTarget.style.animationPlayState = 'running')}
        >
          {repeated.map((item, i) => (
            <span key={i} className="flex items-center">
              <span
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '11px',
                  fontWeight: 500,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--color-text-tertiary)',
                  paddingLeft: '48px',
                  paddingRight: '48px',
                  whiteSpace: 'nowrap',
                }}
              >
                {item}
              </span>
              {/* Separator */}
              <span
                aria-hidden="true"
                style={{
                  display: 'inline-block',
                  width: '3px',
                  height: '3px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-accent)',
                  opacity: 0.5,
                  flexShrink: 0,
                }}
              />
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}
