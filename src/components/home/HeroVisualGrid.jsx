import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

/**
 * Multi-screen visual grid — hero background.
 *
 * Column drift runs as pure CSS @keyframes (compositor thread / GPU).
 * Framer Motion is only used for image crossfades (event-driven, infrequent).
 * This keeps the JS main thread free during scroll.
 */

// ── Hero-specific image set ──────────────────────────────────────
const HERO_IMAGES = [
  'https://framerusercontent.com/images/ehNNRL5xNGVKnx4m12R8JwScbSM.jpeg',
  'https://framerusercontent.com/images/VXmbCMerLVJqJCKMiZTebE04Uc.jpg',
  'https://framerusercontent.com/images/oabq6wjat1y77ujfi5j9oY4e8.png',
  'https://framerusercontent.com/images/Ad6AvP3JLRvy6GJopB9iViaCMao.jpg',
  'https://framerusercontent.com/images/qKXaRQ4aINwEN39sMNYQIVU0.jpg',
  'https://framerusercontent.com/images/b8s8hJIhAKpi8NQf5e6d4STCXJ0.jpg',
  'https://framerusercontent.com/images/uSUZjMoAtIsWgga8Afbu2HlUHWc.jpg',
  'https://framerusercontent.com/images/xkx3cNluBpAxvyefBkIh8XshH0.jpg',
  'https://framerusercontent.com/images/3xextbWKJqHLvfM0fQmqWEoA.jpeg',
  'https://framerusercontent.com/images/BgO0Obc7DIeb37RG8hunOd6UXM.jpg',
  'https://framerusercontent.com/images/CJ3I8sRu0zXWxbSkPfQzJTk8iEs.jpg',
  'https://framerusercontent.com/images/nqkUrmlP0G08g29tvyQP3yszCs.jpg',
  'https://framerusercontent.com/images/ZMoYvSCWiJlevoWgySIAB14kkPI.png',
  'https://framerusercontent.com/images/XiEks2CLPAORqXYPEIbWseYQZd4.jpg',
  'https://framerusercontent.com/images/PqEksSoJAShvlxK5rgzhEGvqQc.jpg',
  'https://framerusercontent.com/images/hurewrph4R9MzZvKvXBIetMY8GQ.jpg',
  'https://framerusercontent.com/images/YJPBFXJGTUO60UjYsJKPpKsdJKI.webp',
  'https://framerusercontent.com/images/CuolhcUF9XbHOTYFy97Gl2HbUg.png',
  'https://framerusercontent.com/images/4W5A6PUMfT2kNaH7svwU9GYSU.jpg',
  'https://framerusercontent.com/images/E8XcDG4ryZstV3CL6HIirsOs1EA.jpg',
]

// ── Grid dimensions ──────────────────────────────────────────────
const COLS = 8
const ROWS = 5

// ── Column motion ────────────────────────────────────────────────
// yOffset: travel distance in px (sign sets direction).
// duration/delay: desynchronise columns so they never peak together.
const COLUMN_MOTION = [
  { yOffset: -48, duration:  8, delay: 0.0 },
  { yOffset:  36, duration: 10, delay: 1.2 },
  { yOffset: -56, duration:  7, delay: 2.5 },
  { yOffset:  32, duration: 11, delay: 0.4 },
  { yOffset: -40, duration:  9, delay: 1.8 },
  { yOffset:  50, duration:  9, delay: 3.2 },
  { yOffset: -44, duration: 10, delay: 0.8 },
  { yOffset:  30, duration:  8, delay: 2.0 },
]

// ── Image cell layout ────────────────────────────────────────────
const IMAGE_CELLS = new Set([
   0,  2,  4,  6,
   9, 11, 13, 15,
  16, 23,
  25, 28, 30,
  32, 34, 37,
])

export default function HeroVisualGrid() {
  const reducedMotion = useReducedMotion()

  const [cellMap, setCellMap] = useState(() => {
    const map = {}
    let i = 0
    IMAGE_CELLS.forEach(idx => { map[idx] = i++ % HERO_IMAGES.length })
    return map
  })

  const pointer        = useRef(0)
  const imageCellArray = Array.from(IMAGE_CELLS)

  useEffect(() => {
    const id = setInterval(() => {
      const cellIdx = imageCellArray[pointer.current % imageCellArray.length]
      setCellMap(prev => ({ ...prev, [cellIdx]: (prev[cellIdx] + 1) % HERO_IMAGES.length }))
      pointer.current++
    }, 2500)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <div
        style={{
          position:      'absolute',
          top:           '-20px',
          left:          '-20px',
          right:         '-20px',
          bottom:        '-20px',
          display:       'flex',
          flexDirection: 'row',
          gap:           '10px',
          padding:       '10px',
          contain:       'layout paint',
        }}
      >
        {Array.from({ length: COLS }, (_, col) => {
          const cm = COLUMN_MOTION[col]

          return (
            <div
              key={col}
              style={{
                flex:          '1',
                display:       'flex',
                flexDirection: 'column',
                gap:           '10px',
                willChange:    'transform',
                // CSS animation — runs on compositor thread, never blocks scroll
                ...(reducedMotion ? {} : {
                  animation:     `hero-col-drift ${cm.duration}s cubic-bezier(0.45, 0, 0.55, 1) ${cm.delay}s infinite`,
                  '--col-y':     `${cm.yOffset}px`,
                }),
              }}
            >
              {Array.from({ length: ROWS }, (_, row) => {
                const flatIdx  = row * COLS + col
                const hasImage = IMAGE_CELLS.has(flatIdx)
                const imgUrl   = hasImage ? HERO_IMAGES[cellMap[flatIdx]] : null

                return (
                  <div key={row} style={{ flex: '1' }}>
                    <GridCell imgUrl={imgUrl} />
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── Individual tile ──────────────────────────────────────────────
function GridCell({ imgUrl }) {
  return (
    <div
      style={{
        height:       '100%',
        borderRadius: '20px',
        overflow:     'hidden',
        position:     'relative',
        border:       imgUrl ? '1px solid var(--color-border)' : 'none',
      }}
    >
      {/* No mode="wait" — crossfade is simultaneous (old fades out as new fades in) */}
      <AnimatePresence>
        {imgUrl && (
          <motion.img
            key={imgUrl}
            src={imgUrl}
            alt=""
            loading="lazy"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.26 }}
            exit={{    opacity: 0   }}
            transition={{ duration: 1.8, ease: 'easeInOut' }}
            style={{
              position:  'absolute',
              inset:     0,
              width:     '100%',
              height:    '100%',
              objectFit: 'cover',
              filter:    'grayscale(0.5) contrast(0.92)',
            }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
