import { useEffect } from 'react'

const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ')

/**
 * useFocusTrap — traps keyboard focus inside `ref` while `active` is true.
 *
 * On activation:   focuses the first focusable child.
 * On Tab:          cycles through focusable children.
 * On Shift+Tab:    cycles backwards.
 * On deactivation: restores focus to the element that was focused before.
 */
export function useFocusTrap(ref, active) {
  useEffect(() => {
    if (!active || !ref.current) return

    const previous = document.activeElement
    const el = ref.current
    const focusable = () => Array.from(el.querySelectorAll(FOCUSABLE)).filter(n => !n.closest('[hidden]'))

    // Focus first element
    const first = focusable()[0]
    if (first) first.focus()

    function onKeyDown(e) {
      if (e.key !== 'Tab') return
      const nodes = focusable()
      if (!nodes.length) { e.preventDefault(); return }
      const first = nodes[0]
      const last  = nodes[nodes.length - 1]
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus() }
      } else {
        if (document.activeElement === last)  { e.preventDefault(); first.focus() }
      }
    }

    el.addEventListener('keydown', onKeyDown)
    return () => {
      el.removeEventListener('keydown', onKeyDown)
      if (previous && previous.focus) previous.focus()
    }
  }, [active, ref])
}
