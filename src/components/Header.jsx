import { FaBars, FaInstagram, FaTimes, FaWhatsapp } from 'react-icons/fa'
import InstagramLinks from './InstagramLinks'
import { locations, navLinks } from '../data/siteData'
import logo from '../assets/logo-fernandes-farma.png'

export default function Header({
  igOpen,
  setIgOpen,
  igRef,
  desktopWhatsappOpen,
  setDesktopWhatsappOpen,
  desktopWhatsappRef,
  menuOpen,
  setMenuOpen,
  menuRef,
}) {
  return (
    <header className="sticky top-0 z-50 border-b border-[#dfe7df] bg-[#f8faf8]/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a href="#inicio" className="flex items-center gap-3">
          <img
            src={logo}
            alt="Fernandes Farma"
            className="h-9 w-auto max-w-[145px] object-contain sm:h-10"
          />
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          <a href="#convenios" className="text-sm font-medium text-[#30483a] transition hover:text-[#1b5e20]">
            Convênios Aceitos
          </a>
          <a href="#unidades" className="text-sm font-medium text-[#30483a] transition hover:text-[#1b5e20]">
            Nossas Unidades
          </a>
        </nav>

        <div className="flex items-center gap-2">
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
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  tabIndex={menuOpen ? 0 : -1}
                  className="block rounded-lg px-3 py-3 text-sm leading-snug text-[#455547] transition hover:bg-[#e7f4eb] hover:text-[#2e7d32] active:bg-[#d8eddf]"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

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

          <div className="relative hidden md:block">
            <button
              onClick={() => setDesktopWhatsappOpen((open) => !open)}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-[#2e7d32] text-white transition hover:scale-105 active:scale-95"
              aria-label="WhatsApp"
              aria-expanded={desktopWhatsappOpen}
              aria-haspopup="true"
              type="button"
            >
            <FaWhatsapp className="h-5 w-5" />
            </button>
            <div
              ref={desktopWhatsappRef}
              className={`instagram-popover absolute right-0 top-full z-50 mt-2 w-72 max-w-[calc(100vw-2rem)] rounded-2xl border border-white/70 bg-white p-2 text-left shadow-[0_16px_40px_rgba(18,60,53,0.16)] backdrop-blur-md sm:w-80 ${desktopWhatsappOpen ? 'instagram-popover-open' : ''}`}
              aria-hidden={!desktopWhatsappOpen}
            >
              {locations.map((unit, index) => (
                <a
                  key={unit.title}
                  href={unit.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setDesktopWhatsappOpen(false)}
                  tabIndex={desktopWhatsappOpen ? 0 : -1}
                  className={`block rounded-lg px-3 py-3 text-sm leading-snug text-[#1b4d1e] transition hover:bg-[#f1f8f2] active:bg-[#e9f4ea] ${index > 0 ? 'mt-1' : ''}`}
                >
                  <span className="flex items-center gap-2 font-semibold">
                    <FaWhatsapp className="h-4 w-4 text-[#2e7d32]" />
                    {unit.title}
                  </span>
                  <span className="mt-1 block text-[#2e7d32]">Entrar em contato</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
