import { useEffect, useRef, useState } from 'react'
import {
  FaPills,
} from 'react-icons/fa'
import Header from './components/Header'
import FloatingInstagram from './components/FloatingInstagram'
import HeroSection from './sections/HeroSection'
import ConveniosSection from './sections/ConveniosSection'
import UnitsSection from './sections/UnitsSection'
import FooterSection from './sections/FooterSection'
import { useIsDesktop, useScrollReveal, useWindowSize } from './hooks/useViewport'
import {
  BUBBLE_SIZE,
  EDGE_MARGIN,
} from './data/siteData'

function App() {
  const isDesktop = useIsDesktop()
  const windowSize = useWindowSize()
  const [conveniosRef, conveniosVisible] = useScrollReveal()
  const [unidadesRef, unidadesVisible] = useScrollReveal()
  const [footerRef, footerVisible] = useScrollReveal()

  const [igOpen, setIgOpen] = useState(false)
  const igRef = useRef(null)
  const [whatsappOpen, setWhatsappOpen] = useState(false)
  const whatsappRef = useRef(null)

  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)

  // Which edge the floating bubble is snapped to, and its vertical position.
  // igY = null means "default", i.e. anchored near the bottom.
  const [igSnap, setIgSnap] = useState('right') // 'left' | 'right'
  const [igY, setIgY] = useState(null)
  // Position used only while actively dragging (follows the finger/cursor freely).
  const [dragPos, setDragPos] = useState(null)
  const dragStateRef = useRef({ dragging: false, moved: false, startX: 0, startY: 0, offsetX: 0, offsetY: 0 })

  useEffect(() => {
    if (!igOpen) return

    function handleClickOutside(event) {
      if (igRef.current && !igRef.current.contains(event.target)) {
        setIgOpen(false)
      }
    }

    function handleEscape(event) {
      if (event.key === 'Escape') setIgOpen(false)
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [igOpen])

  useEffect(() => {
    if (!whatsappOpen) return

    function handleClickOutside(event) {
      if (whatsappRef.current && !whatsappRef.current.contains(event.target)) {
        setWhatsappOpen(false)
      }
    }

    function handleEscape(event) {
      if (event.key === 'Escape') setWhatsappOpen(false)
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [whatsappOpen])

  useEffect(() => {
    if (!menuOpen) return

    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false)
      }
    }

    function handleEscape(event) {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [menuOpen])

  function handleBubblePointerDown(event) {
    const rect = event.currentTarget.getBoundingClientRect()
    dragStateRef.current = {
      dragging: true,
      moved: false,
      startX: event.clientX,
      startY: event.clientY,
      offsetX: event.clientX - rect.left,
      offsetY: event.clientY - rect.top,
    }
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  function handleBubblePointerMove(event) {
    const state = dragStateRef.current
    if (!state.dragging) return

    if (Math.abs(event.clientX - state.startX) > 4 || Math.abs(event.clientY - state.startY) > 4) {
      state.moved = true
    }

    const maxX = window.innerWidth - BUBBLE_SIZE - EDGE_MARGIN
    const maxY = window.innerHeight - BUBBLE_SIZE - EDGE_MARGIN

    setDragPos({
      x: Math.min(Math.max(event.clientX - state.offsetX, EDGE_MARGIN), maxX),
      y: Math.min(Math.max(event.clientY - state.offsetY, EDGE_MARGIN), maxY),
    })
  }

  function finishDrag(event) {
    const state = dragStateRef.current
    state.dragging = false
    event.currentTarget.releasePointerCapture(event.pointerId)

    if (state.moved && dragPos) {
      // Snap every release to the nearest screen edge, never to the middle.
      const bubbleCenter = dragPos.x + BUBBLE_SIZE / 2
      setIgSnap(bubbleCenter < window.innerWidth / 2 ? 'left' : 'right')
      setIgY(dragPos.y)
      setDragPos(null)
    } else if (!state.moved) {
      setWhatsappOpen((s) => !s)
    }
  }

  // Resolve the bubble's live position: snapped edge (x) + clamped vertical position (y),
  // recalculated from the current window size so it can never end up off-screen after a resize.
  const snappedX = igSnap === 'right'
    ? windowSize.width - BUBBLE_SIZE - EDGE_MARGIN
    : EDGE_MARGIN

  const defaultY = windowSize.height - BUBBLE_SIZE - EDGE_MARGIN
  const maxY = windowSize.height - BUBBLE_SIZE - EDGE_MARGIN
  const snappedY = igY === null ? defaultY : Math.min(Math.max(igY, EDGE_MARGIN), maxY)

  const bubbleX = dragPos ? dragPos.x : snappedX
  const bubbleY = dragPos ? dragPos.y : snappedY

  return (
    <div className="relative isolate min-h-screen overflow-x-clip bg-[#f8faf8] text-[#1f2a1f]">
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -left-32 top-[24%] h-96 w-96 rounded-[46%_54%_62%_38%] bg-gradient-to-br from-[#b8e7c5]/30 to-[#9ed0dc]/15 blur-3xl motion-safe:animate-[convenios-drift_11s_ease-in-out_infinite]" />
        <div className="absolute -right-28 top-[62%] h-80 w-80 rounded-[54%_46%_38%_62%] bg-gradient-to-tl from-[#9ed0dc]/25 to-[#b8e7c5]/10 blur-3xl motion-safe:animate-[convenios-drift_13s_ease-in-out_infinite_reverse]" />
        <div className="absolute left-[9%] top-[42%] hidden h-16 w-16 -rotate-12 items-center justify-center rounded-full border border-white/70 bg-white/30 text-[#75b9c7]/40 shadow-[0_10px_26px_rgba(18,60,53,0.08)] backdrop-blur-md motion-safe:animate-[convenios-drift_9s_ease-in-out_infinite] lg:flex">
          <FaPills className="text-xl" />
        </div>
        <div className="absolute right-[16%] top-[78%] hidden h-12 w-12 rotate-12 items-center justify-center rounded-full border border-white/70 bg-white/25 text-[#b8e7c5]/70 shadow-[0_10px_26px_rgba(18,60,53,0.08)] backdrop-blur-md motion-safe:animate-[convenios-drift_10s_ease-in-out_infinite_reverse] md:flex">
          <FaPills className="text-base" />
        </div>
      </div>
      <Header
        igOpen={igOpen}
        setIgOpen={setIgOpen}
        igRef={igRef}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        menuRef={menuRef}
      />

      <HeroSection />

      <ConveniosSection sectionRef={conveniosRef} isVisible={conveniosVisible} />

      <UnitsSection sectionRef={unidadesRef} isVisible={unidadesVisible} />

      <FooterSection sectionRef={footerRef} isVisible={footerVisible} />

      {/* Draggable floating WhatsApp bubble — mobile only. Defaults to bottom-right and
          always snaps back to the nearest screen edge when released; it's re-clamped on
          every resize so it can never end up hidden past the edge of a shrunk window. */}
      {!isDesktop ? (
        <FloatingInstagram
          whatsappRef={whatsappRef}
          whatsappOpen={whatsappOpen}
          igSnap={igSnap}
          isDragging={Boolean(dragPos)}
          bubbleX={bubbleX}
          bubbleY={bubbleY}
          onPointerDown={handleBubblePointerDown}
          onPointerMove={handleBubblePointerMove}
          onPointerUp={finishDrag}
          onPointerCancel={finishDrag}
          onNavigate={() => setWhatsappOpen(false)}
        />
      ) : null}
    </div>
  )
}

export default App