import { FaPills } from 'react-icons/fa'
import { FarmaciaPopularBadge, PbmBadge } from '../components/ProgramBadges'

export default function ConveniosSection({ sectionRef, isVisible }) {
  return (
    <section
      id="convenios"
      ref={sectionRef}
      className={`reveal-section relative isolate overflow-x-clip px-4 py-16 sm:px-6 lg:px-8 lg:py-24 ${isVisible ? 'is-visible' : ''}`}
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
  )
}
