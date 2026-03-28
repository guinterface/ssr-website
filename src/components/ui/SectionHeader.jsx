import ScrollReveal from './ScrollReveal'

/**
 * Consistent section header used across all pages.
 * Props:
 *   counter — e.g. "01" (optional)
 *   title   — main heading
 *   subtitle — supporting text (optional)
 *   center  — center-align (default false)
 */
export default function SectionHeader({ counter, title, subtitle, center = false }) {
  return (
    <ScrollReveal className={`mb-16 ${center ? 'text-center' : ''}`}>
      {counter && (
        <p
          className="text-label uppercase mb-4"
          style={{ color: 'var(--color-accent)', letterSpacing: '0.1em' }}
        >
          {counter}
        </p>
      )}
      <h2
        className="font-display"
        style={{
          fontFamily: '"Space Grotesk", sans-serif',
          fontSize: '36px',
          lineHeight: '1.15',
          letterSpacing: '-0.02em',
          fontWeight: 500,
          color: 'var(--color-text-primary)',
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className="mt-4 max-w-prose"
          style={{
            fontSize: '17px',
            lineHeight: '1.75',
            color: 'var(--color-text-secondary)',
            marginLeft: center ? 'auto' : undefined,
            marginRight: center ? 'auto' : undefined,
          }}
        >
          {subtitle}
        </p>
      )}
    </ScrollReveal>
  )
}
