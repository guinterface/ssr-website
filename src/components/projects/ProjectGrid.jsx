import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import ProjectCard from './ProjectCard'

const container = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.07 } },
}

const item = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
}

export default function ProjectGrid({ projects, onSelect }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -80px 0px' })

  return (
    <motion.div
      ref={ref}
      variants={container}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-8"
      style={{ paddingTop: '28px' }}  // absorbs the 22px image overflow above each card
    >
      {projects.map(p => (
        <ProjectCard key={p.id} project={p} onSelect={onSelect} variants={item} />
      ))}
    </motion.div>
  )
}
