import { motion } from 'framer-motion'
import { usePageTitle } from '../hooks/usePageTitle'
import Button from '../components/ui/Button'

export default function NotFound() {
  usePageTitle('Page Not Found')

  return (
    <main
      style={{
        paddingTop:     'var(--nav-height)',
        minHeight:      '100dvh',
        display:        'flex',
        flexDirection:  'column',
        alignItems:     'center',
        justifyContent: 'center',
        padding:        '0 24px',
        textAlign:      'center',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}
      >
        {/* Large 404 */}
        <span style={{
          fontFamily:    '"Space Grotesk", sans-serif',
          fontSize:      'clamp(80px, 18vw, 160px)',
          fontWeight:    700,
          lineHeight:    1,
          letterSpacing: '-0.06em',
          color:         'var(--color-accent)',
          opacity:       0.18,
          userSelect:    'none',
        }}>
          404
        </span>

        <div style={{ marginTop: '-32px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
          <h1 style={{
            fontFamily:    '"Space Grotesk", sans-serif',
            fontSize:      'clamp(22px, 3vw, 30px)',
            fontWeight:    600,
            letterSpacing: '-0.025em',
            color:         'var(--color-text-primary)',
            margin:        0,
          }}>
            Page not found.
          </h1>
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize:   '15px',
            lineHeight: 1.7,
            color:      'var(--color-text-secondary)',
            margin:     0,
            maxWidth:   '36ch',
          }}>
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <Button to="/">Back to home</Button>
      </motion.div>
    </main>
  )
}
