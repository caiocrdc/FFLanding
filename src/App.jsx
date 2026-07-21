const locations = [
  {
    title: 'Centro',
    tag: 'Farmácia',
    badge: 'Farmácia Popular',
    address: 'Icapuí – CE',
    hours: 'Seg a Sex: 07h–19h | Sáb: 07h–13h',
    crf: 'CRF-CE nº 1234',
    featured: true,
  },
  {
    title: 'Ibicuitaba',
    tag: 'Posto de Medicamentos',
    address: 'Icapuí – CE',
    hours: 'Seg a Sex: 08h–17h',
    crf: 'CRF-CE nº 5678',
  },
  {
    title: 'Redonda',
    tag: 'Posto de Medicamentos',
    address: 'Icapuí – CE',
    hours: 'Seg a Sex: 08h–17h',
    crf: 'CRF-CE nº 9012',
  },
]

const highlights = [
  {
    title: 'Atendimento Humanizado',
    description: 'Você é tratado com atenção, respeito e acolhimento.',
    icon: 'favorite',
  },
  {
    title: 'Produtos de Qualidade',
    description: 'Medicamentos e insumos com procedência garantida.',
    icon: 'verified',
  },
  {
    title: 'Equipe Especializada',
    description: 'Profissionais dedicados a oferecer o melhor cuidado.',
    icon: 'group',
  },
]

function App() {
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
            <a href="#unidades" className="text-sm text-[#455547] transition hover:text-[#2e7d32]">
              Nossas Unidades
            </a>
            <a href="#popular" className="text-sm text-[#455547] transition hover:text-[#2e7d32]">
              Farmácia Popular
            </a>
          </nav>

          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noreferrer"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-[#2e7d32] text-white transition hover:scale-105"
            aria-label="Instagram"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
              <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 0 1 12 7.5Zm0 2A2.5 2.5 0 1 0 14.5 12 2.5 2.5 0 0 0 12 9.5Zm5.25-2.75a1.25 1.25 0 1 1-1.25 1.25 1.25 1.25 0 0 1 1.25-1.25Z" />
            </svg>
          </a>
        </div>
      </header>

      <section id="inicio" className="px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="mx-auto flex max-w-7xl flex-col overflow-hidden rounded-[32px] bg-[#1b4d1e] shadow-[0_20px_60px_rgba(27,77,30,0.16)] lg:min-h-[640px] lg:flex-row">
          <div className="relative flex-1 min-h-[320px] lg:min-h-auto">
            <img
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1400&q=80"
              alt="Ambiente profissional de farmácia"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0f2910]/80 via-[#1b4d1e]/60 to-transparent" />
          </div>

          <div className="flex flex-1 flex-col justify-center px-6 py-10 text-white sm:px-8 lg:px-12 lg:py-16">
            <div className="mb-6 inline-flex w-fit items-center rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur">
              <span className="mr-2 text-base">🛡️</span>
              Farmácia com credibilidade e acolhimento
            </div>
            <h1 className="max-w-2xl text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
              Sua saúde em boas mãos.
            </h1>
            <p className="mt-4 max-w-xl text-lg text-white/85 sm:text-xl">
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
                className="inline-flex items-center justify-center rounded-full border border-white/70 px-7 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                Veja mais sobre a farmácia
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#dfe7df] bg-[#e9f4ea] px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 lg:flex-row lg:justify-center lg:gap-10">
          {highlights.map((item) => (
            <div key={item.title} className="flex items-start gap-3 rounded-2xl bg-white/80 p-4 shadow-sm">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#dbeedc] text-[#2e7d32]">
                <span className="material-symbols-outlined text-2xl">{item.icon}</span>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-[#1b4d1e]">{item.title}</h2>
                <p className="mt-1 text-sm text-[#5a6a5f]">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="popular" className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-[28px] border border-[#dfe7df] bg-white p-8 text-center shadow-sm sm:p-12">
          <div className="mb-5 inline-flex items-center rounded-full bg-[#e9f4ea] px-4 py-2 text-sm font-semibold text-[#2e7d32]">
            <span className="mr-2 text-lg">⚖️</span>
            Farmácia Popular
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
            {locations.map((unit) => (
              <article
                key={unit.title}
                className={`rounded-[24px] border bg-white p-7 shadow-sm ${unit.featured ? 'border-[#2e7d32] bg-[#f4fbf4]' : 'border-[#dfe7df]'}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#2e7d32]">{unit.tag}</p>
                    <h3 className="mt-2 text-2xl font-semibold text-[#1b4d1e]">{unit.title}</h3>
                  </div>
                  {unit.badge ? (
                    <span className="rounded-full bg-[#2e7d32] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                      {unit.badge}
                    </span>
                  ) : null}
                </div>

                <div className="mt-6 space-y-4 text-[#5a6a5f]">
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-[#2e7d32]">location_on</span>
                    <div>
                      <p className="font-semibold text-[#1b4d1e]">{unit.address}</p>
                      <a href="#" className="mt-1 inline-flex text-sm text-[#2e7d32] hover:underline">
                        Ver no mapa
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-[#2e7d32]">schedule</span>
                    <p className="text-sm">{unit.hours}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-[#2e7d32]">verified</span>
                    <p className="text-sm font-medium text-[#1b4d1e]">{unit.crf}</p>
                  </div>
                </div>

                <a
                  href="https://wa.me/5585000000000"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-8 inline-flex items-center justify-center rounded-full bg-[#2e7d32] px-5 py-3 text-sm font-semibold text-white transition hover:scale-[0.98]"
                >
                  Entrar em contato
                </a>
              </article>
            ))}
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
