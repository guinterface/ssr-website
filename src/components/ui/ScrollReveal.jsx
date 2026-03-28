import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

/**
 * Wraps children in a fade-up reveal triggered when the element enters the viewport.
 * Props:
 *   delay    — stagger delay in seconds (default 0)
 *   y        — vertical offset to animate from (default 24)
 *   duration — animation duration in seconds (default 0.5)
 *   once     — only animate once (default true)
 */
export default function ScrollReveal({ children, delay = 0, y = 24, duration = 0.5, once = true, className = '' }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once, margin: '0px 0px -60px 0px' })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration, delay, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  )
}
