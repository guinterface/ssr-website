// ─────────────────────────────────────────────────────────────────
// Shared motion tokens — single source of truth for all animations.
// Import these instead of writing magic numbers inline.
// ─────────────────────────────────────────────────────────────────

/** Primary easing curve — smooth in/out (Material Design standard) */
export const ease = [0.4, 0, 0.2, 1]

/** Decelerate — for elements entering the screen */
export const easeOut = [0, 0, 0.2, 1]

/** Accelerate — for elements leaving the screen */
export const easeIn = [0.4, 0, 1, 1]

/** Duration scale in seconds */
export const duration = {
  fast:     0.15,  // micro-interactions (icon swaps, color changes)
  base:     0.25,  // hover states, simple transitions
  moderate: 0.45,  // reveals, entrance animations
  slow:     0.65,  // image animations, complex enters
}

/** Stagger delay between sibling elements */
export const stagger = {
  xs: 0.04,
  sm: 0.07,
  md: 0.10,
  lg: 0.14,
}

/**
 * fadeUp — pre-built props for simple entrance animations.
 * Usage: <motion.div {...fadeUp(0.1)} />
 */
export const fadeUp = (delay = 0, y = 20) => ({
  initial:    { opacity: 0, y },
  animate:    { opacity: 1, y: 0 },
  transition: { duration: duration.moderate, delay, ease },
})

/**
 * fadeUpVariant — for use with motion variants (staggered containers).
 * Usage: variants={{ hidden: …, visible: … }}
 */
export const fadeUpVariant = {
  hidden:  { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y:       0,
    transition: { duration: duration.moderate, delay, ease },
  }),
}

/** Container variant — staggers children automatically */
export const staggerContainer = (staggerChildren = stagger.sm, delayChildren = 0) => ({
  hidden:  {},
  visible: { transition: { staggerChildren, delayChildren } },
})
