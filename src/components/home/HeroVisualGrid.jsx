import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

/**
 * Multi-screen visual grid — hero background.
 *
 * Motion architecture (two independent layers):
 *
 *   Layer 1 — Column drift
 *     Each of the 8 columns oscillates on Y with a unique amplitude,
 *     duration, and start delay. Adjacent columns alternate direction
 *     (up vs down) so the grid undulates rather than rising as one unit.
 *     Speeds range 16–25s so columns never synchronise.
 *
 *   Layer 2 — Tile micro-oscillation
 *     Each image tile adds a very small independent Y movement (±2–4px)
 *     on top of its column's motion. Duration is in the 7–13s range —
 *     faster than columns but still imperceptible as speed.
 *     Empty cells are static (no wasted animation budget).
 *
 * Everything else (image cycling, crossfade, opacity, composition) is
 * unchanged from the previous version.
 */

// ── Hero-specific image set ──────────────────────────────────────
// Real images from stanfordssr.org homepage grid (20 photos).
// Distinct from project images — used only in this background system.
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
const COLS  = 8
const ROWS  = 5

// ── Column motion ────────────────────────────────────────────────
// yOffset: how far each column travels (px). Alternating sign creates
// the undulating wave effect across the grid.
// duration: seconds for one full oscillation. Deliberately irregular
// so no two columns ever reach their peaks at the same time.
// delay: seconds before the animation starts — further desynchronises.
const COLUMN_MOTION = [
  { yOffset: -26, duration: 14, delay: 0.0 }, // col 0 — up
  { yOffset:  18, duration: 17, delay: 1.5 }, // col 1 — down
  { yOffset: -32, duration: 12, delay: 3.0 }, // col 2 — up, most travel
  { yOffset:  16, duration: 19, delay: 0.5 }, // col 3 — down
  { yOffset: -20, duration: 15, delay: 2.0 }, // col 4 — up
  { yOffset:  26, duration: 15, delay: 4.0 }, // col 5 — down
  { yOffset: -22, duration: 17, delay: 1.0 }, // col 6 — up
  { yOffset:  14, duration: 13, delay: 2.5 }, // col 7 — down
]

// ── Tile micro-oscillation ───────────────────────────────────────
// Applied only to image cells (16 cells). Amplitude: ±2–4px.
// Duration: 7–13s — faster than columns but still slow in absolute terms.
// These are additive on top of the column movement.
const TILE_MICRO = {
   0: { y:  7, dur:  5.5 },
   2: { y: -9, dur:  7.0 },
   4: { y:  6, dur:  8.5 },
   6: { y: -7, dur:  6.0 },
   9: { y:  9, dur:  7.5 },
  11: { y: -6, dur:  9.0 },
  13: { y:  8, dur:  5.8 },
  15: { y: -9, dur:  7.2 },
  16: { y:  6, dur:  8.8 },
  23: { y: -7, dur:  6.5 },
  25: { y:  9, dur:  8.0 },
  28: { y: -6, dur:  9.5 },
  30: { y:  8, dur:  5.8 },
  32: { y: -9, dur:  7.2 },
  34: { y:  6, dur:  8.8 },
  37: { y: -7, dur:  6.2 },
}

// ── Image cell layout ────────────────────────────────────────────
// Hand-crafted — see previous version for composition rationale.
const IMAGE_CELLS = new Set([
  0, 2, 4, 6,         // row 0 — even cols
  9, 11, 13, 15,      // row 1 — odd cols
  16, 23,             // row 2 — outer corners only (center stays clear)
  25, 28, 30,         // row 3 — irregular
  32, 34, 37,         // row 4 — irregular, right side sparse
])

export default function HeroVisualGrid() {
  const reducedMotion = useReducedMotion()

  // cellMap: flatIndex → HERO_IMAGES index
  const [cellMap, setCellMap] = useState(() => {
    const map = {}
    let i = 0
    IMAGE_CELLS.forEach(idx => {
      map[idx] = i++ % HERO_IMAGES.length
    })
    return map
  })

  const pointer = useRef(0)
  const imageCellArray = Array.from(IMAGE_CELLS)

  useEffect(() => {
    const id = setInterval(() => {
      const cellIdx = imageCellArray[pointer.current % imageCellArray.length]
      setCellMap(prev => ({
        ...prev,
        [cellIdx]: (prev[cellIdx] + 1) % HERO_IMAGES.length,
      }))
      pointer.current++
    }, 2500)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">

      {/*
        Outer container: position absolute, extends 20px beyond each edge
        so column drift never reveals a gap at the boundary.

        Layout: flex row of 8 columns.
        Each column: motion.div with its own Y oscillation.
        Each cell: flex child with optional tile micro-oscillation.
      */}
      <div
        style={{
          position: 'absolute',
          top:    '-20px',
          left:   '-20px',
          right:  '-20px',
          bottom: '-20px',
          display: 'flex',
          flexDirection: 'row',
          gap: '10px',
          padding: '10px',
        }}
      >
        {Array.from({ length: COLS }, (_, col) => {
          const cm = COLUMN_MOTION[col]

          return (
            <motion.div
              key={col}
              style={{
                flex: '1',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                willChange: 'transform',
              }}
              animate={reducedMotion ? {} : { y: [0, cm.yOffset, 0] }}
              transition={{
                duration:   cm.duration,
                delay:      cm.delay,
                repeat:     Infinity,
                repeatType: 'mirror',
                ease:       'easeInOut',
              }}
            >
              {Array.from({ length: ROWS }, (_, row) => {
                const flatIdx  = row * COLS + col
                const hasImage = IMAGE_CELLS.has(flatIdx)
                const imgUrl   = hasImage ? HERO_IMAGES[cellMap[flatIdx]] : null
                const micro    = TILE_MICRO[flatIdx]

                // Image cells get micro-oscillation; empty cells are static divs
                const CellWrapper = micro ? motion.div : 'div'
                const wrapperProps = (micro && !reducedMotion)
                  ? {
                      animate:    { y: [0, micro.y, 0] },
                      transition: {
                        duration:   micro.dur,
                        repeat:     Infinity,
                        repeatType: 'mirror',
                        ease:       'easeInOut',
                      },
                    }
                  : {}

                return (
                  <CellWrapper
                    key={row}
                    style={{ flex: '1' }}
                    {...wrapperProps}
                  >
                    <GridCell imgUrl={imgUrl} />
                  </CellWrapper>
                )
              })}
            </motion.div>
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
        border: imgUrl ? '1px solid var(--color-border)' : 'none',
      }}
    >
      <AnimatePresence mode="wait">
        {imgUrl && (
          <motion.img
            key={imgUrl}
            src={imgUrl}
            alt=""
            loading="lazy"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.26 }}
            exit={{   opacity: 0   }}
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
