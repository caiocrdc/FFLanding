import { useEffect, useRef, useState } from 'react'
import {
  FaBars,
  FaCheckCircle,
  FaClock,
  FaHeart,
  FaInstagram,
  FaMapMarkerAlt,
  FaPills,
  FaShieldAlt,
  FaTimes,
  FaUsers,
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
    crf: 'CRF-CE nº 5678',
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

const highlights = [
  {
    title: 'Atendimento Humanizado',
    description: 'Você é tratado com atenção, respeito e acolhimento',
    icon: FaHeart,
  },
  {
    title: 'Produtos de Qualidade',
    description: 'Medicamentos e insumos com procedência garantida',
    icon: FaCheckCircle,
  },
  {
    title: 'Equipe Especializada',
    description: 'Profissionais dedicados a oferecer o melhor cuidado',
    icon: FaUsers,
  },
]

const navLinks = [
  { href: '#inicio', label: 'Início' },
  { href: '#popular', label: 'Farmácia Popular' },
  { href: '#unidades', label: 'Nossas Unidades' },
]

function InstagramLinks({ onNavigate }) {
  return (
    <>
      <a
        href="https://www.instagram.com/fernandesfarma"
        target="_blank"
        rel="noreferrer"
        onClick={onNavigate}
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

function App() {
  const isDesktop = useIsDesktop()
  const windowSize = useWindowSize()

  const [igOpen, setIgOpen] = useState(false)
  const igRef = useRef(null)

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
      // Snap to whichever edge (left/right) the bubble is closest to on release.
      const center = dragPos.x + BUBBLE_SIZE / 2
      setIgSnap(center < window.innerWidth / 2 ? 'left' : 'right')
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
    : EDGE_MARGIN

  const defaultY = windowSize.height - BUBBLE_SIZE - EDGE_MARGIN
  const maxY = windowSize.height - BUBBLE_SIZE - EDGE_MARGIN
  const snappedY = igY === null ? defaultY : Math.min(Math.max(igY, EDGE_MARGIN), maxY)

  const bubbleX = dragPos ? dragPos.x : snappedX
  const bubbleY = dragPos ? dragPos.y : snappedY

  return (
    <div className="min-h-screen bg-[#f8faf8] text-[#1f2a1f]">
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
            <a href="#popular" className="text-sm text-[#455547] transition hover:text-[#2e7d32]">
              Farmácia Popular
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

              {menuOpen ? (
                <div className="absolute right-0 z-50 mt-2 w-60 max-w-[calc(100vw-2rem)] rounded-xl border border-[#dfe7df] bg-white p-2 shadow-lg">
                  {navLinks.map((link, index) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className={`block rounded-lg px-3 py-3 text-sm leading-snug transition hover:bg-[#f1f8f2] active:bg-[#e9f4ea] ${
                        index === 0 ? 'font-semibold text-[#2e7d32]' : 'text-[#455547] hover:text-[#2e7d32]'
                      }`}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              ) : null}
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

                {igOpen ? (
                  <div className="absolute right-0 z-50 mt-2 w-72 max-w-[calc(100vw-2rem)] rounded-xl border border-[#dfe7df] bg-white p-2 shadow-lg sm:w-80">
                    <InstagramLinks onNavigate={() => setIgOpen(false)} />
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      </header>

      <section id="inicio" className="px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[32px] shadow-[0_20px_60px_rgba(27,77,30,0.16)]">
          <div className="relative min-h-[420px] overflow-hidden sm:min-h-[500px] lg:min-h-[640px]">
            <img
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1400&q=80"
              alt="Ambiente profissional de farmácia"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(11,41,14,0.9)_0%,rgba(27,77,30,0.7)_50%,rgba(27,77,30,0.25)_100%)]" />

            <div className="relative z-10 flex h-full min-h-[420px] flex-col justify-center px-6 py-10 text-white sm:min-h-[500px] sm:px-8 sm:py-12 lg:min-h-[640px] lg:px-12 lg:py-16">
              <div className="mb-6 inline-flex w-fit items-center rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur">
                <FaShieldAlt className="mr-2 text-base" />
                Farmácia com credibilidade e acolhimento
              </div>
              <h1 className="max-w-2xl text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
                Sua saúde em boas mãos
              </h1>
              <p className="mt-4 max-w-xl text-lg text-white/90 sm:text-xl">
                Atendimento humanizado, produtos de qualidade e uma equipe comprometida com o cuidado da sua família
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#unidades"
                  className="inline-flex items-center justify-center rounded-full bg-[#2e7d32] px-7 py-3 font-semibold text-white transition hover:scale-[0.98]"
                >
                  Encontre sua unidade
                </a>
                <a
                  href="#popular"
                  className="inline-flex items-center justify-center rounded-full border border-white/70 bg-white/10 px-7 py-3 font-semibold text-white backdrop-blur transition hover:bg-white/20"
                >
                  Veja mais sobre a farmácia
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#dfe7df] bg-[#e9f4ea] px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 lg:flex-row lg:justify-center lg:gap-10">
          {highlights.map((item) => {
            const Icon = item.icon

            return (
              <div key={item.title} className="flex items-start gap-3 rounded-2xl bg-white/80 p-4 shadow-sm">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#dbeedc] text-[#2e7d32]">
                  <Icon className="text-2xl" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-[#1b4d1e]">{item.title}</h2>
                  <p className="mt-1 text-sm text-[#5a6a5f]">{item.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <section id="popular" className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-[28px] border border-[#dfe7df] bg-white p-8 text-center shadow-sm sm:p-12">
          <div className="mb-5 flex justify-center">
            <FarmaciaPopularBadge />
          </div>
          <h2 className="text-3xl font-bold text-[#1b4d1e] sm:text-4xl">
            Aqui tem Farmácia Popular
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-[#5a6a5f]">
            Nossa unidade do Centro é credenciada ao programa, oferecendo medicamentos gratuitos ou com até 90% de desconto para você e sua família
          </p>
          <a
            href="https://www.gov.br/saude/farmaciapopular"
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-[#2e7d32] px-7 py-3 font-semibold text-white transition hover:scale-[0.98]"
          >
            Saiba mais sobre o programa
          </a>
        </div>
      </section>

      <section id="unidades" className="px-4 py-4 pb-16 sm:px-6 lg:px-8">
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
                  className={`rounded-[26px] p-[2px] shadow-sm ${borderGradient}`}
                >
                  <article className="flex h-full flex-col rounded-[24px] bg-white p-6 sm:p-7">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#2e7d32]">
                          {unit.tag}
                        </p>
                        <h3 className="mt-2 text-2xl font-semibold text-[#1b4d1e]">{unit.title}</h3>
                      </div>
                      {unit.popular ? <FarmaciaPopularBadge compact /> : null}
                    </div>

                    <div className="mt-6 flex-1 space-y-4 text-[#5a6a5f]">
                      <div className="flex items-start gap-3">
                        <FaMapMarkerAlt className="mt-1 shrink-0 text-[#2e7d32]" />
                        <p className="font-semibold text-[#1b4d1e]">{unit.address}</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <FaClock className="mt-1 shrink-0 text-[#2e7d32]" />
                        <p className="text-sm">{unit.hours}</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <FaCheckCircle className="mt-1 shrink-0 text-[#2e7d32]" />
                        <p className="text-sm font-medium text-[#1b4d1e]">{unit.crf}</p>
                      </div>
                    </div>

                    <div className="mt-8 flex flex-col gap-3">
                      <a
                        href={unit.mapsUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#1b5e20] px-5 py-3.5 text-sm font-semibold text-white shadow-[0_6px_20px_rgba(27,94,32,0.4)] transition hover:scale-[0.98] active:scale-95"
                      >
                        <FaMapMarkerAlt className="h-4 w-4" />
                        Ver no Mapa
                      </a>
                      <a
                        href={WHATSAPP_URL}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#2e7d32] bg-white px-5 py-3 text-sm font-semibold text-[#2e7d32] transition hover:bg-[#f1f8f2] active:scale-95"
                      >
                        <FaWhatsapp className="h-4 w-4" />
                        Entrar em contato
                      </a>
                    </div>
                  </article>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <footer className="border-t border-[#dfe7df] bg-[#e9f4ea] px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 text-center text-[#5a6a5f] md:flex-row md:items-center md:justify-between md:text-left">
          <div>
            <p className="text-lg font-semibold text-[#1b4d1e]">Fernandes Farma</p>
            <p className="mt-1 text-sm">Cuidando de você com acolhimento e profissionalismo</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-sm md:justify-end">
            <a href="#inicio" className="transition hover:text-[#2e7d32]">Início</a>
            <a href="#unidades" className="transition hover:text-[#2e7d32]">Unidades</a>
            <a href="#popular" className="transition hover:text-[#2e7d32]">Farmácia Popular</a>
          </div>
        </div>
      </footer>

      {/* Draggable floating Instagram bubble — mobile only. Defaults to bottom-right and
          always snaps back to the nearest screen edge when released; it's re-clamped on
          every resize so it can never end up hidden past the edge of a shrunk window. */}
      {!isDesktop ? (
        <div
          ref={igRef}
          className="fixed z-50"
          style={{ left: `${bubbleX}px`, top: `${bubbleY}px` }}
        >
          {igOpen ? (
            <div
              className={`absolute bottom-full z-50 mb-2 w-72 max-w-[calc(100vw-2rem)] rounded-xl border border-[#dfe7df] bg-white p-2 shadow-lg sm:w-80 ${
                igSnap === 'right' ? 'right-0' : 'left-0'
              }`}
            >
              <InstagramLinks onNavigate={() => setIgOpen(false)} />
            </div>
          ) : null}

          <button
            onPointerDown={handleBubblePointerDown}
            onPointerMove={handleBubblePointerMove}
            onPointerUp={finishDrag}
            onPointerCancel={finishDrag}
            className="flex h-14 w-14 touch-none select-none items-center justify-center rounded-full bg-[#2e7d32] text-white shadow-[0_8px_24px_rgba(27,77,30,0.35)] transition-transform active:scale-95"
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