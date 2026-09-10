import { useEffect, useRef, useState } from 'react'
import { DESKTOP_BREAKPOINT } from '../data/siteData'

export function useIsDesktop(breakpoint = DESKTOP_BREAKPOINT) {
  const [isDesktop, setIsDesktop] = useState(() => (
    typeof window !== 'undefined' ? window.innerWidth >= breakpoint : true
  ))

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(min-width: ${breakpoint}px)`)
    function handleChange(event) {
      setIsDesktop(event.matches)
    }
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [breakpoint])

  return isDesktop
}

export function useWindowSize() {
  const [size, setSize] = useState(() => ({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  }))

  useEffect(() => {
    function handleResize() {
      setSize({ width: window.innerWidth, height: window.innerHeight })
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return size
}

export function useScrollReveal() {
  const elementRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = elementRef.current
    if (!element || typeof IntersectionObserver === 'undefined') {
      setIsVisible(true)
      return undefined
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
        observer.disconnect()
      }
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' })

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return [elementRef, isVisible]
}
