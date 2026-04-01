import ScrollReveal from './ScrollReveal'
import Button from './Button'

const SLACK_URL = 'https://join.slack.com/t/stanfordrobotics/shared_invite/placeholder'

export default function JoinCta({
  headline  = 'Build with us.',
  body      = 'We welcome students from any major who want to get their hands dirty with real hardware, software, and systems.',
  label     = 'Join Us',
  to        = '/contact',
  showSlack = true,
}) {
  return (
    <section style={{ borderTop: '1px solid var(--color-border)', paddingTop: '96px', paddingBottom: '96px' }}>
      <div className="container">
        <ScrollReveal>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '32px', maxWidth: '640px' }}>

            <span style={{
              fontFamily:    'Plus Jakarta Sans, sans-serif',
              fontSize:      '11px',
              fontWeight:    600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color:         'var(--color-accent)',
            }}>
              Get Involved
            </span>

            <h2 style={{
              fontFamily:    '"Space Grotesk", sans-serif',
              fontSize:      'clamp(32px, 5vw, 52px)',
              fontWeight:    600,
              lineHeight:    1.1,
              letterSpacing: '-0.03em',
              color:         'var(--color-text-primary)',
              margin:        0,
            }}>
              {headline}
            </h2>

            {body && (
              <p style={{
                fontFamily: 'Plus Jakarta Sans, sans-serif',
                fontSize:   '16px',
                lineHeight: 1.7,
                color:      'var(--color-text-secondary)',
                margin:     0,
                maxWidth:   '520px',
              }}>
                {body}
              </p>
            )}

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <Button to={to}>{label}</Button>
              {showSlack && (
                <Button href={SLACK_URL} variant="ghost" icon="slack">Join our Slack</Button>
              )}
            </div>

          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
