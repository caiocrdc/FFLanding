export default function FooterSection({ sectionRef, isVisible }) {
  return (
    <footer
      ref={sectionRef}
      className={`reveal-section relative isolate overflow-hidden border-t border-[#dfe7df] bg-[#e9f4ea] px-4 py-8 sm:px-6 lg:px-8 ${isVisible ? 'is-visible' : ''}`}
    >
      <div className="pointer-events-none absolute -bottom-28 left-[18%] h-64 w-64 rounded-[46%_54%_62%_38%] bg-gradient-to-tr from-[#9ed0dc]/25 to-[#b8e7c5]/20 blur-3xl motion-safe:animate-[convenios-drift_12s_ease-in-out_infinite]" />
      <div className="mx-auto flex max-w-7xl flex-col gap-6 text-center text-[#5a6a5f] md:flex-row md:items-center md:justify-between md:text-left">
        <div>
          <div className="flex items-center justify-center gap-3 md:justify-start">
            <img
              src="/logo-fernandes-farma.png"
              alt="Fernandes Farma"
              className="h-12 w-auto max-w-[175px] object-contain"
            />
            <p className="text-lg font-semibold text-[#1b4d1e]">Fernandes Farma</p>
          </div>
          <p className="mt-1 text-sm">Cuidando de você</p>
        </div>
        <div className="flex flex-wrap justify-center gap-5 text-sm font-medium text-[#30483a] md:justify-end">
          <a href="#inicio" className="transition hover:text-[#1b5e20]">Início</a>
          <a href="#unidades" className="transition hover:text-[#1b5e20]">Unidades</a>
          <a href="#convenios" className="transition hover:text-[#1b5e20]">Convênios Aceitos</a>
        </div>
      </div>
    </footer>
  )
}
