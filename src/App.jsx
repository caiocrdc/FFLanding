import { useEffect, useRef, useState } from 'react'
import {
  FaCheckCircle,
  FaClock,
  FaHeart,
  FaInstagram,
  FaMapMarkerAlt,
  FaPills,
  FaShieldAlt,
  FaUsers,
  FaWhatsapp,
} from 'react-icons/fa'

const WHATSAPP_URL = 'https://wa.me/5588996849190'

function buildMapsUrl(plusCode) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(plusCode)}`
}

const locations = [
  {
    title: 'Centro',
    tag: 'Farmácia',
    popular: true,
    address: 'Rua Zé Biru, 1321 – Centro, Icapuí – CE',
    plusCode: '7JQV+3W Icapuí, Ceará',
    hours: 'Seg–Sáb: 07:00–21:00; Dom: 08:00–12:00 e 16:00–20:00',
    crf: 'CRF-CE nº 1234',
  },
  {
    title: 'Ibicuitaba',
    tag: 'Posto de Medicamentos',
    popular: false,
    address: 'Rua Coronel Ricardo de Holanda – Ibicuitaba, Icapuí – CE',
    plusCode: '7M6P+8F Ibicuitaba, Icapuí - CE',
    hours: 'Seg–Sex: 07:00–12:00 e 14:00–19:00; Finais de semana: Fechado',
    crf: 'CRF-CE nº 5678',
  },
  {
    title: 'Redonda',
    tag: 'Farmácia',
    popular: false,
    address: 'Estrada da Serra de Redonda, S/N – Redonda, Icapuí – CE',
    plusCode: '8GXF+9Q Icapuí, Ceará',
    hours: 'Seg–Sex: 08:00–12:00 e 14:00–19:00; Sáb–Dom: 08:00–12:00 e 14:00–18:00',
    crf: 'CRF-CE nº 9012',
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
    description: 'Você é tratado com atenção, respeito e acolhimento.',
    icon: FaHeart,
  },
  {
    title: 'Produtos de Qualidade',
    description: 'Medicamentos e insumos com procedência garantida.',
    icon: FaCheckCircle,
  },
  {
    title: 'Equipe Especializada',
    description: 'Profissionais dedicados a oferecer o melhor cuidado.',
    icon: FaUsers,
  },
]

function App() {
  const [igOpen, setIgOpen] = useState(false)
  const igRef = useRef(null)

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
                <a
                  href="https://www.instagram.com/fernandesfarma"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setIgOpen(false)}
                  className="block rounded-lg px-3 py-3 text-sm leading-snug text-[#1b4d1e] transition hover:bg-[#f1f8f2] active:bg-[#e9f4ea]"
                >
                  <span className="block font-semibold">Instagram Matriz (Centro)</span>
                  <span className="text-[#2e7d32]">@fernandesfarma</span>
                </a>
                <a
                  href="https://www.instagram.com/fernandesfarmaredonda"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setIgOpen(false)}
                  className="mt-1 block rounded-lg px-3 py-3 text-sm leading-snug text-[#1b4d1e] transition hover:bg-[#f1f8f2] active:bg-[#e9f4ea]"
                >
                  <span className="block font-semibold">Instagram Filial (Redonda)</span>
                  <span className="text-[#2e7d32]">@fernandesfarmaredonda</span>
                </a>
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
                Sua saúde em boas mãos.
              </h1>
              <p className="mt-4 max-w-xl text-lg text-white/90 sm:text-xl">
                Atendimento humanizado, produtos de qualidade e uma equipe comprometida com o cuidado da sua família.
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
            Aqui tem Farmácia Popular.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-[#5a6a5f]">
            Nossa unidade do Centro é credenciada ao programa, oferecendo medicamentos gratuitos ou com até 90% de desconto para você e sua família.
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
              Estamos presentes onde você precisa.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-[#5a6a5f]">
              Encontre a unidade mais conveniente e fale com nossa equipe para atendimento rápido.
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
                        href={buildMapsUrl(unit.plusCode)}
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
            <p className="mt-1 text-sm">Cuidando de você com acolhimento e profissionalismo.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-sm md:justify-end">
            <a href="#inicio" className="transition hover:text-[#2e7d32]">Início</a>
            <a href="#unidades" className="transition hover:text-[#2e7d32]">Unidades</a>
            <a href="#popular" className="transition hover:text-[#2e7d32]">Farmácia Popular</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
