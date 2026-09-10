import { useEffect, useRef, useState } from 'react'
import {
  FaBars,
  FaCheckCircle,
  FaClock,
  FaInstagram,
  FaMapMarkerAlt,
  FaPills,
  FaShieldAlt,
  FaTags,
  FaTimes,
  FaWhatsapp,
} from 'react-icons/fa'

const WHATSAPP_URL = 'https://wa.me/5588996849190'
const DESKTOP_BREAKPOINT = 768 // matches Tailwind's `md` breakpoint
const BUBBLE_SIZE = 56 // px, matches h-14 w-14
const EDGE_MARGIN = 24 // px, distance kept from the screen edges

const locations = [
  {
    title: 'Centro',
    tag: 'Farmácia',
    popular: true,
    address: 'Rua Zé Biru, 1321 – Centro, Icapuí – CE',
    mapsUrl: 'https://maps.app.goo.gl/kxfjrDKhFsRT4Ny86',
    hours: 'Seg–Sáb: 07:00–21:00; Dom: 08:00–12:00 e 16:00–20:00',
    crf: 'CRF-CE nº 1234',
  },
  {
    title: 'Redonda',
    tag: 'Farmácia',
    popular: false,
    address: 'Estrada da Serra de Redonda, S/N – Redonda, Icapuí – CE',
    mapsUrl: 'https://maps.app.goo.gl/3MVxVKgSChWoD9e77',
    hours: 'Seg–Sex: 08:00–12:00 e 14:00–19:00; Sáb–Dom: 08:00–12:00 e 14:00–18:00',
    crf: 'CRF-CE nº 9012',
  },
  {
    title: 'Ibicuitaba',
    tag: 'Posto de Medicamentos',
    popular: false,
    address: 'Rua Coronel Ricardo de Holanda – Ibicuitaba, Icapuí – CE',
    mapsUrl: 'https://maps.app.goo.gl/TwFUpcG5MjtRqq8u8',
    hours: 'Seg–Sex: 07:00–12:00 e 14:00–19:00; Finais de semana: Fechado',
    // No CRF here on purpose — a "posto de medicamentos" isn't required to have one.
  },
]

function FarmaciaPopularBadge({ compact = false }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full bg-gradient-to-r from-[#c62828] via-[#d32f2f] to-[#e53935] font-semibold uppercase tracking-[0.15em] text-white shadow-[0_4px_12px_rgba(198,40,40,0.35)] ${
        compact ? 'px-2.5 py-1 text-[10px]' : 'px-4 py-2 text-xs'
      }`}
    >
      <FaPills className={compact ? 'text-xs' : 'text-sm'} />
      Farmácia Popular
    </span>
  )
}

function PbmBadge({ compact = false }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#b9d9ed]/70 bg-[#d9edf8]/70 font-semibold uppercase tracking-[0.15em] text-[#18527a] shadow-[0_8px_24px_rgba(24,82,122,0.14)] backdrop-blur-md ${
        compact ? 'px-2.5 py-1 text-[10px]' : 'px-4 py-2 text-xs'
      }`}
    >
      <FaTags className={compact ? 'text-xs' : 'text-sm'} />
      PBM
    </span>
  )
}

const navLinks = [
  { href: '#inicio', label: 'Início' },
  { href: '#convenios', label: 'Convênios Aceitos' },
  { href: '#unidades', label: 'Nossas Unidades' },
]

function InstagramLinks({ onNavigate, isOpen = true }) {
  return (
    <>
      <a
        href="https://www.instagram.com/fernandesfarma"
        target="_blank"
        rel="noreferrer"
        onClick={onNavigate}
        tabIndex={isOpen ? 0 : -1}
        className="block rounded-lg px-3 py-3 text-sm leading-snug text-[#1b4d1e] transition hover:bg-[#f1f8f2] active:bg-[#e9f4ea]"
      >
        <span className="block font-semibold">Instagram Matriz (Centro)</span>
        <span className="text-[#2e7d32]">@fernandesfarma</span>
      </a>
      <a
        href="https://www.instagram.com/fernandesfarmaredonda"
        target="_blank"
        rel="noreferrer"
        onClick={onNavigate}
        tabIndex={isOpen ? 0 : -1}
        className="mt-1 block rounded-lg px-3 py-3 text-sm leading-snug text-[#1b4d1e] transition hover:bg-[#f1f8f2] active:bg-[#e9f4ea]"
      >
        <span className="block font-semibold">Instagram Filial (Redonda)</span>
        <span className="text-[#2e7d32]">@fernandesfarmaredonda</span>
      </a>
    </>
  )
}

function useIsDesktop(breakpoint = DESKTOP_BREAKPOINT) {
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth >= breakpoint : true
  )

  useEffect(() => {
    const mql = window.matchMedia(`(min-width: ${breakpoint}px)`)
    function handleChange(event) {
      setIsDesktop(event.matches)
    }
    setIsDesktop(mql.matches)
    mql.addEventListener('change', handleChange)
    return () => mql.removeEventListener('change', handleChange)
  }, [breakpoint])

  return isDesktop
}

function useWindowSize() {
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

function useScrollReveal() {
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

function App() {
  const isDesktop = useIsDesktop()
  const windowSize = useWindowSize()
  const [conveniosRef, conveniosVisible] = useScrollReveal()
  const [unidadesRef, unidadesVisible] = useScrollReveal()
  const [footerRef, footerVisible] = useScrollReveal()

  const [igOpen, setIgOpen] = useState(false)
  const igRef = useRef(null)

  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)

  // Which edge the floating bubble is snapped to, and its vertical position.
  // igY = null means "default", i.e. anchored near the bottom.
  const [igSnap, setIgSnap] = useState('right') // 'left' | 'center' | 'right'
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
      // Preserve the floating composition by snapping to the nearest of three horizontal anchors.
      const anchors = {
        left: EDGE_MARGIN,
        center: window.innerWidth / 2 - BUBBLE_SIZE / 2,
        right: window.innerWidth - BUBBLE_SIZE - EDGE_MARGIN,
      }
      const nearestAnchor = Object.entries(anchors).reduce((nearest, [name, x]) => (
        Math.abs(dragPos.x - x) < Math.abs(dragPos.x - anchors[nearest]) ? name : nearest
      ), 'center')
      setIgSnap(nearestAnchor)
      setIgY(dragPos.y)
      setDragPos(null)
    } else if (!state.moved) {
      setIgOpen((s) => !s)
    }
  }

  // Resolve the bubble's live position: snapped edge (x) + clamped vertical position (y),
  // recalculated from the current window size so it can never end up off-screen after a resize.
  const snappedX = igSnap === 'right'
    ? windowSize.width - BUBBLE_SIZE - EDGE_MARGIN
    : igSnap === 'left'
      ? EDGE_MARGIN
      : windowSize.width / 2 - BUBBLE_SIZE / 2

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
      <header className="sticky top-0 z-50 border-b border-[#dfe7df] bg-[#f8faf8]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <a href="#inicio" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2e7d32] text-lg font-semibold text-white">
              F
            </div>
            <div>
              <p className="text-base font-semibold text-[#1b4d1e]">Fernandes Farma</p>
              <p className="text-sm text-[#5a6a5f]">Cuidando de você</p>
            </div>
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            <a href="#inicio" className="text-sm font-semibold text-[#2e7d32]">
              Início
            </a>
            <a href="#convenios" className="text-sm text-[#455547] transition hover:text-[#2e7d32]">
              Convênios Aceitos
            </a>
            <a href="#unidades" className="text-sm text-[#455547] transition hover:text-[#2e7d32]">
              Nossas Unidades
            </a>
          </nav>

          <div className="flex items-center gap-2">
            {/* Mobile hamburger menu (mobile only) */}
            <div className="relative md:hidden" ref={menuRef}>
              <button
                onClick={() => setMenuOpen((s) => !s)}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-[#2e7d32] text-white transition hover:scale-105 active:scale-95"
                aria-label="Abrir menu de navegação"
                aria-expanded={menuOpen}
                aria-haspopup="true"
                type="button"
              >
                {menuOpen ? <FaTimes className="h-5 w-5" /> : <FaBars className="h-5 w-5" />}
              </button>

              <div
                className={`menu-popover absolute right-0 z-50 mt-2 w-60 max-w-[calc(100vw-2rem)] rounded-xl border border-white/70 bg-white p-2 shadow-[0_16px_40px_rgba(18,60,53,0.16)] backdrop-blur-md ${menuOpen ? 'menu-popover-open' : ''}`}
                aria-hidden={!menuOpen}
              >
                {navLinks.map((link, index) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    tabIndex={menuOpen ? 0 : -1}
                    className={`block rounded-lg px-3 py-3 text-sm leading-snug transition hover:bg-[#e7f4eb] active:bg-[#d8eddf] ${
                      index === 0 ? 'font-semibold text-[#1b5e20]' : 'text-[#455547] hover:text-[#2e7d32]'
                    }`}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Instagram button in the header — desktop only. On mobile it's replaced by the draggable floating bubble below. */}
            {isDesktop ? (
              <div className="relative" ref={igRef}>
                <button
                  onClick={() => setIgOpen((s) => !s)}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-[#2e7d32] text-white transition hover:scale-105 active:scale-95"
                  aria-label="Instagram"
                  aria-expanded={igOpen}
                  aria-haspopup="true"
                  type="button"
                >
                  <FaInstagram className="h-5 w-5" />
                </button>

                <div
                  className={`instagram-popover absolute right-0 z-50 mt-2 w-72 max-w-[calc(100vw-2rem)] rounded-2xl border border-white/70 bg-white p-2 shadow-[0_16px_40px_rgba(18,60,53,0.16)] backdrop-blur-md sm:w-80 ${igOpen ? 'instagram-popover-open' : ''}`}
                  aria-hidden={!igOpen}
                >
                  <InstagramLinks onNavigate={() => setIgOpen(false)} isOpen={igOpen} />
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </header>

      <section id="inicio" className="relative overflow-hidden px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="pointer-events-none absolute -left-24 top-16 h-72 w-72 rounded-full bg-[#b7e4d1]/50 blur-3xl motion-safe:animate-[hero-atmosphere_14s_ease-in-out_infinite]" />
        <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-[#8fd0ac]/35 blur-3xl motion-safe:animate-[hero-atmosphere_17s_ease-in-out_infinite_reverse]" />
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem_3.5rem_2rem_3.5rem] border border-white/70 bg-[#123c35] shadow-[0_24px_70px_rgba(18,60,53,0.2)] sm:rounded-[2.5rem_4.5rem_2.5rem_4.5rem]">
          <div className="relative min-h-[480px] overflow-hidden sm:min-h-[540px] lg:min-h-[650px]">
            <img
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1400&q=80"
              alt="Ambiente profissional de farmácia"
              className="absolute inset-0 h-full w-full object-cover object-[58%_center] transition-transform duration-[1200ms] ease-out hover:scale-105"
            />
            <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(8,47,39,0.94)_0%,rgba(18,60,53,0.76)_43%,rgba(18,60,53,0.18)_100%)]" />
            <div className="hero-gradient-motion pointer-events-none absolute inset-0" />
            <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[#a8e0c2]/25 blur-3xl motion-safe:animate-[hero-float_9s_ease-in-out_infinite]" />
            <div className="pointer-events-none absolute bottom-[-7rem] left-[38%] h-80 w-80 rounded-full bg-[#78c49a]/20 blur-3xl motion-safe:animate-[hero-float_12s_ease-in-out_infinite_reverse]" />

            <div className="relative z-10 flex h-full min-h-[480px] flex-col justify-center px-6 py-12 text-white sm:min-h-[540px] sm:px-10 sm:py-14 lg:min-h-[650px] lg:px-16 lg:py-20">
              <div className="mb-7 inline-flex w-fit items-center rounded-full border border-white/25 bg-white/12 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#e2f5e9] shadow-[0_8px_30px_rgba(0,0,0,0.12)] backdrop-blur-md">
                <FaShieldAlt className="mr-2 text-base" />
                Farmácia com credibilidade e acolhimento
              </div>
              <h1 className="max-w-2xl text-4xl font-extrabold leading-[1.02] tracking-[-0.03em] sm:text-6xl lg:text-7xl">
                Sua saúde em boas mãos
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-white/85 sm:text-xl">
                Atendimento humanizado, produtos de qualidade e uma equipe comprometida com o cuidado da sua família
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#unidades"
                  className="inline-flex items-center justify-center rounded-full bg-[#b8e7c5] px-7 py-3.5 font-bold text-[#123c35] shadow-[0_10px_28px_rgba(184,231,197,0.22)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#d4f2da] hover:shadow-[0_16px_34px_rgba(184,231,197,0.3)] active:translate-y-0"
                >
                  Encontre sua unidade
                </a>
                <a
                  href="#convenios"
                  className="inline-flex items-center justify-center rounded-full border border-white/35 bg-white/10 px-7 py-3.5 font-semibold text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-white/60 hover:bg-white/18 active:translate-y-0"
                >
                  Veja mais sobre a farmácia
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="convenios"
        ref={conveniosRef}
        className={`reveal-section relative isolate overflow-x-clip px-4 py-16 sm:px-6 lg:px-8 lg:py-24 ${conveniosVisible ? 'is-visible' : ''}`}
      >
        <div className="pointer-events-none absolute -right-20 top-12 -z-10 h-72 w-72 rounded-[46%_54%_62%_38%] bg-gradient-to-br from-[#b8e7c5]/70 to-[#9ed0dc]/30 blur-2xl motion-safe:animate-[convenios-drift_8s_ease-in-out_infinite]" />
        <div className="pointer-events-none absolute right-[13%] top-28 -z-10 hidden h-20 w-20 rotate-12 items-center justify-center rounded-full border border-white/80 bg-white/45 text-[#2e7d32]/50 shadow-[0_12px_30px_rgba(27,77,30,0.1)] backdrop-blur-md motion-safe:animate-[convenios-drift_6s_ease-in-out_infinite_reverse] md:flex">
          <FaPills className="text-2xl" />
        </div>

        <div className="relative mx-auto max-w-6xl">
          <div className="mb-12 max-w-2xl lg:ml-10">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#2e7d32]">Convênios Aceitos</p>
            <h2 className="mt-3 text-3xl font-bold leading-tight text-[#1b4d1e] sm:text-4xl lg:text-5xl">
              Programas que ajudam no seu bolso
            </h2>
            <p className="mt-4 max-w-xl text-lg text-[#5a6a5f]">
              Participamos de programas que tornam seus medicamentos mais acessíveis.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-[0.9fr_1.1fr] md:items-start md:gap-0">
            <div className="relative z-10 rounded-[28px_40px_28px_40px] border border-[#c9ddd0] bg-white p-8 text-center shadow-[0_20px_48px_rgba(18,60,53,0.14)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_26px_58px_rgba(18,60,53,0.2)] md:mt-8">
              <div className="mb-5 flex justify-center">
                <FarmaciaPopularBadge />
              </div>
              <h3 className="text-2xl font-bold text-[#1b4d1e]">Aqui tem Farmácia Popular</h3>
              <p className="mx-auto mt-4 max-w-md text-[#5a6a5f]">
                Nossa unidade do Centro é credenciada ao programa, oferecendo medicamentos gratuitos ou com até 90% de desconto para você e sua família.
              </p>
              <a
                href="https://www.gov.br/saude/farmaciapopular"
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex items-center justify-center rounded-full border border-[#75b9c7]/60 bg-white/45 px-7 py-3 font-semibold text-[#123c35] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-[#75b9c7] hover:bg-white/70"
              >
                Saiba mais sobre o programa
              </a>
            </div>

            <div className="relative z-20 rounded-[36px_24px_36px_24px] border border-[#c9ddd0] bg-[#eff9f1]/95 p-8 text-center shadow-[0_24px_56px_rgba(18,60,53,0.18)] backdrop-blur-md transition-all duration-300 hover:-translate-y-3 hover:shadow-[0_30px_64px_rgba(18,60,53,0.24)] md:-ml-8 md:-mt-4 lg:-ml-16">
              <div className="mb-5 flex justify-center">
                <PbmBadge />
              </div>
              <h3 className="text-2xl font-bold text-[#1b4d1e]">PBM — Descontos em Medicamentos</h3>
              <p className="mx-auto mt-4 max-w-md text-[#5a6a5f]">
                Também participamos do PBM (Programa de Benefício em Medicamentos), com descontos oferecidos pelos laboratórios em diversos medicamentos de uso contínuo.
              </p>
              <a
                href="https://pbm.portaldadrogaria.com.br/blog/pbm-tudo-o-que-voce-precisa-saber"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center justify-center rounded-full border border-[#75b9c7]/60 bg-white/45 px-7 py-3 font-semibold text-[#123c35] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-[#75b9c7] hover:bg-white/70"
              >
                Saiba mais sobre o programa
              </a>
            </div>
          </div>
        </div>
      </section>

      <section
        id="unidades"
        ref={unidadesRef}
        className={`reveal-section relative isolate overflow-x-clip px-4 py-4 pb-16 sm:px-6 lg:px-8 ${unidadesVisible ? 'is-visible' : ''}`}
      >
        <div className="pointer-events-none absolute -right-24 top-16 -z-10 h-72 w-72 rounded-[54%_46%_38%_62%] bg-gradient-to-bl from-[#9ed0dc]/35 to-[#b8e7c5]/15 blur-3xl motion-safe:animate-[convenios-drift_10s_ease-in-out_infinite_reverse]" />
        <div className="pointer-events-none absolute left-[7%] top-28 -z-10 hidden h-14 w-14 -rotate-12 items-center justify-center rounded-full border border-white/80 bg-white/35 text-[#75b9c7]/45 shadow-[0_10px_26px_rgba(18,60,53,0.08)] backdrop-blur-md motion-safe:animate-[convenios-drift_8s_ease-in-out_infinite] lg:flex">
          <FaPills className="text-lg" />
        </div>
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#2e7d32]">Nossas unidades</p>
            <h2 className="mt-3 text-3xl font-bold text-[#1b4d1e] sm:text-4xl">
              Estamos presentes onde você precisa
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-[#5a6a5f]">
              Encontre a unidade mais conveniente e fale com nossa equipe para atendimento rápido
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {locations.map((unit) => {
              const borderGradient = unit.popular
                ? 'bg-gradient-to-br from-[#c62828] via-[#d32f2f] to-[#b71c1c]'
                : 'bg-gradient-to-br from-[#2e7d32] via-[#388e3c] to-[#1b5e20]'

              return (
                <div
                  key={unit.title}
                  className={unit.popular
                    ? 'rounded-[26px] bg-gradient-to-br from-[#c62828] via-[#d32f2f] to-[#b71c1c] p-[2px] shadow-sm'
                    : `rounded-[26px] p-[2px] shadow-sm ${borderGradient}`}
                >
                  <article className="flex h-full flex-col rounded-[24px] bg-white p-6 sm:p-7">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#708078]">
                          {unit.tag}
                        </p>
                        <h3 className="mt-2 text-3xl font-bold tracking-[-0.02em] text-[#1b4d1e]">{unit.title}</h3>
                      </div>
                      {unit.popular ? (
                        <div className="flex flex-wrap items-center gap-2">
                          <FarmaciaPopularBadge compact />
                          <PbmBadge compact />
                        </div>
                      ) : null}
                    </div>

                    <div className="mt-8 flex-1 text-[#5a6a5f]">
                      <div className="flex items-start gap-3">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f1f5f1] text-[#2e7d32]">
                          <FaMapMarkerAlt className="text-sm" />
                        </span>
                        <p className="pt-1 font-semibold leading-relaxed text-[#1b4d1e]">{unit.address}</p>
                      </div>
                      <div className="mt-7 space-y-4 border-t border-[#e8eee9] pt-5">
                        <div className="flex items-start gap-3">
                          <FaClock className="mt-1 shrink-0 text-[#839188]" />
                          <p className="text-sm leading-relaxed">{unit.hours}</p>
                        </div>
                        {unit.crf ? (
                          <div className="flex items-start gap-3">
                            <FaCheckCircle className="mt-1 shrink-0 text-[#839188]" />
                            <p className="text-sm leading-relaxed">{unit.crf}</p>
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <a
                      href={unit.mapsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#1b5e20] px-5 py-3.5 text-sm font-semibold text-white shadow-[0_6px_20px_rgba(27,94,32,0.4)] transition-all duration-300 hover:scale-[0.98] active:scale-95"
                    >
                      <FaMapMarkerAlt className="h-4 w-4" />
                      Ver no Mapa
                    </a>
                  </article>
                </div>
              )
            })}
          </div>

          {/* Shared WhatsApp contact — replaces the old per-card buttons, since they all pointed to the same number anyway. */}
          <div className="mt-8 flex flex-col items-center gap-4 rounded-[26px] border border-[#dfe7df] bg-white p-6 text-center shadow-sm sm:flex-row sm:justify-between sm:p-8 sm:text-left">
            <div>
              <h3 className="text-lg font-semibold text-[#1b4d1e]">Prefere falar direto com a gente?</h3>
              <p className="mt-1 text-sm text-[#5a6a5f]">Fale com nossa equipe pelo WhatsApp e tire suas dúvidas rapidinho.</p>
            </div>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#2e7d32] bg-white px-6 py-3 text-sm font-semibold text-[#2e7d32] transition hover:bg-[#f1f8f2] active:scale-95 sm:w-auto"
            >
              <FaWhatsapp className="h-4 w-4" />
              Falar no WhatsApp
            </a>
          </div>
        </div>
      </section>

      <footer
        ref={footerRef}
        className={`reveal-section relative isolate overflow-hidden border-t border-[#dfe7df] bg-[#e9f4ea] px-4 py-8 sm:px-6 lg:px-8 ${footerVisible ? 'is-visible' : ''}`}
      >
        <div className="pointer-events-none absolute -bottom-28 left-[18%] h-64 w-64 rounded-[46%_54%_62%_38%] bg-gradient-to-tr from-[#9ed0dc]/25 to-[#b8e7c5]/20 blur-3xl motion-safe:animate-[convenios-drift_12s_ease-in-out_infinite]" />
        <div className="mx-auto flex max-w-7xl flex-col gap-6 text-center text-[#5a6a5f] md:flex-row md:items-center md:justify-between md:text-left">
          <div>
            <p className="text-lg font-semibold text-[#1b4d1e]">Fernandes Farma</p>
            <p className="mt-1 text-sm">Cuidando de você com acolhimento e profissionalismo</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-sm md:justify-end">
            <a href="#inicio" className="transition hover:text-[#2e7d32]">Início</a>
            <a href="#unidades" className="transition hover:text-[#2e7d32]">Unidades</a>
            <a href="#convenios" className="transition hover:text-[#2e7d32]">Convênios Aceitos</a>
          </div>
        </div>
      </footer>

      {/* Draggable floating Instagram bubble — mobile only. Defaults to bottom-right and
          always snaps back to the nearest screen edge when released; it's re-clamped on
          every resize so it can never end up hidden past the edge of a shrunk window. */}
      {!isDesktop ? (
        <div
          ref={igRef}
          className={`fixed z-50 ${!dragPos && igSnap === 'center' ? '-translate-x-1/2' : ''}`}
          style={{ left: `${bubbleX}px`, top: `${bubbleY}px` }}
        >
          <div
            className={`instagram-popover absolute bottom-full z-50 mb-2 w-72 max-w-[calc(100vw-2rem)] rounded-2xl border border-white/70 bg-white p-2 shadow-[0_16px_40px_rgba(18,60,53,0.16)] backdrop-blur-md sm:w-80 ${
              igSnap === 'right' ? 'right-0' : igSnap === 'left' ? 'left-0' : 'left-1/2 -translate-x-1/2'
            } ${igOpen ? 'instagram-popover-open' : ''}`}
            aria-hidden={!igOpen}
          >
            <InstagramLinks onNavigate={() => setIgOpen(false)} isOpen={igOpen} />
          </div>

          <button
            onPointerDown={handleBubblePointerDown}
            onPointerMove={handleBubblePointerMove}
            onPointerUp={finishDrag}
            onPointerCancel={finishDrag}
            className="motion-safe:animate-[bubble-float_5s_ease-in-out_infinite] flex h-16 w-16 touch-none select-none items-center justify-center rounded-[45%_55%_52%_48%] bg-[#2e7d32] text-white shadow-[0_14px_34px_rgba(27,77,30,0.32)] transition-transform duration-300 active:scale-95"
            aria-label="Instagram"
            aria-expanded={igOpen}
            aria-haspopup="true"
            type="button"
          >
            <FaInstagram className="h-6 w-6" />
          </button>
        </div>
      ) : null}
    </div>
  )
}

export default App