import { FaShieldAlt } from 'react-icons/fa'

export default function HeroSection() {
  return (
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
  )
}
