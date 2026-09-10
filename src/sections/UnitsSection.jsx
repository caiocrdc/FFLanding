import { FaCheckCircle, FaClock, FaMapMarkerAlt, FaPills, FaWhatsapp } from 'react-icons/fa'
import { FarmaciaPopularBadge, PbmBadge } from '../components/ProgramBadges'
import { locations, WHATSAPP_URL } from '../data/siteData'

export default function UnitsSection({ sectionRef, isVisible }) {
  return (
    <section
      id="unidades"
      ref={sectionRef}
      className={`reveal-section relative isolate overflow-x-clip px-4 py-4 pb-16 sm:px-6 lg:px-8 ${isVisible ? 'is-visible' : ''}`}
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
                className={`rounded-[26px] p-[2px] shadow-sm ${borderGradient}`}
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
  )
}
