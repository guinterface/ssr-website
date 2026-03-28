import { useEffect } from 'react'

const SITE = 'Stanford Student Robotics'

/**
 * Sets document.title on mount and resets on unmount.
 * Usage: usePageTitle('Projects')
 * Result: "Projects — Stanford Student Robotics"
 */
export function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} — ${SITE}` : SITE
    return () => { document.title = SITE }
  }, [title])
}
