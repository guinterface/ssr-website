import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

// Route-level code splitting — each page loads only when first visited
const Home          = lazy(() => import('./pages/Home'))
const Projects      = lazy(() => import('./pages/Projects'))
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'))
const Leadership    = lazy(() => import('./pages/Leadership'))
const Events        = lazy(() => import('./pages/Events'))
const Sponsors      = lazy(() => import('./pages/Sponsors'))
const Contact       = lazy(() => import('./pages/Contact'))
const NotFound      = lazy(() => import('./pages/NotFound'))

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  enter:   { opacity: 1, y: 0,  transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } },
  exit:    { opacity: 0, y: -8, transition: { duration: 0.25, ease: [0.4, 0, 1, 1] } },
}

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="enter"
        exit="exit"
      >
        <Suspense fallback={null}>
          <Routes location={location}>
            <Route path="/"               element={<Home />}          />
            <Route path="/projects"       element={<Projects />}      />
            <Route path="/projects/:id"   element={<ProjectDetail />} />
            <Route path="/leadership"     element={<Leadership />}    />
            <Route path="/events"         element={<Events />}        />
            <Route path="/sponsors"       element={<Sponsors />}      />
            <Route path="/contact"        element={<Contact />}       />
            <Route path="*"              element={<NotFound />}      />
          </Routes>
        </Suspense>
        <Footer />
      </motion.div>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      {/* Skip navigation — visually hidden, visible on focus for keyboard users */}
      <a
        href="#main-content"
        style={{
          position:   'absolute',
          top:        '-100%',
          left:       '16px',
          zIndex:     9999,
          padding:    '8px 16px',
          background: 'var(--color-accent)',
          color:      '#fff',
          fontFamily: 'Inter, sans-serif',
          fontSize:   '13px',
          fontWeight: 600,
          borderRadius: '0 0 4px 4px',
          textDecoration: 'none',
          transition: 'top 0.15s ease',
        }}
        onFocus={e  => { e.currentTarget.style.top = '0' }}
        onBlur={e   => { e.currentTarget.style.top = '-100%' }}
      >
        Skip to main content
      </a>
      <Navbar />
      <div id="main-content">
        <AnimatedRoutes />
      </div>
    </BrowserRouter>
  )
}
