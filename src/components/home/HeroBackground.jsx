import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * Slowly cycles through background images with crossfade + Ken Burns.
 * Opacity is kept very low so the light typography dominates entirely.
 *
 * To replace placeholders: swap the URLs in the `IMAGES` array below.
 * Recommended: full-bleed landscape photos of robotics projects, 1920×1080+.
 */
const IMAGES = [
  'https://picsum.photos/seed/robotics-a/1920/1080',
  'https://picsum.photos/seed/robotics-b/1920/1080',
  'https://picsum.photos/seed/robotics-c/1920/1080',
]

const CYCLE_DURATION = 6000 // ms per image

export default function HeroBackground() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setIndex(i => (i + 1) % IMAGES.length)
    }, CYCLE_DURATION)
    return () => clearInterval(id)
  }, [])

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <AnimatePresence mode="sync">
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.8, ease: 'easeInOut' }}
        >
          {/* Ken Burns — slow zoom over the full cycle duration */}
          <motion.img
            src={IMAGES[index]}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              filter: 'grayscale(0.55) contrast(0.9)',
              opacity: 0.14,
              willChange: 'transform',
            }}
            initial={{ scale: 1.0 }}
            animate={{ scale: 1.07 }}
            transition={{
              duration: CYCLE_DURATION / 1000 + 2,
              ease: 'linear',
            }}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
