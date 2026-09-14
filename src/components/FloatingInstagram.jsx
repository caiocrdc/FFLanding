import { FaWhatsapp } from 'react-icons/fa'
import { locations } from '../data/siteData'

export default function FloatingInstagram({
  whatsappRef,
  whatsappOpen,
  igSnap,
  isDragging,
  bubbleX,
  bubbleY,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onPointerCancel,
  onNavigate,
}) {
  return (
    <div
      ref={whatsappRef}
      className={`fixed z-50 ${isDragging ? '' : 'instagram-bubble-snap'}`}
      style={{ left: `${bubbleX}px`, top: `${bubbleY}px` }}
    >
      <div
        className={`instagram-popover absolute bottom-full z-50 mb-2 w-72 max-w-[calc(100vw-2rem)] rounded-2xl border border-white/70 bg-white p-2 shadow-[0_16px_40px_rgba(18,60,53,0.16)] backdrop-blur-md sm:w-80 ${
          igSnap === 'right' ? 'right-0' : 'left-0'
        } ${whatsappOpen ? 'instagram-popover-open' : ''}`}
        aria-hidden={!whatsappOpen}
      >
        {locations.map((unit, index) => (
          <a
            key={unit.title}
            href={unit.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            onClick={onNavigate}
            tabIndex={whatsappOpen ? 0 : -1}
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

      <button
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
        className="motion-safe:animate-[bubble-float_5s_ease-in-out_infinite] flex h-16 w-16 touch-none select-none items-center justify-center rounded-[45%_55%_52%_48%] bg-[#2e7d32] text-white shadow-[0_14px_34px_rgba(27,77,30,0.32)] transition-transform duration-300 active:scale-95"
        aria-label="Abrir WhatsApp"
        aria-expanded={whatsappOpen}
        aria-haspopup="true"
        type="button"
      >
        <FaWhatsapp className="h-6 w-6" />
      </button>
    </div>
  )
}
