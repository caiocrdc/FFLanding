import { FaInstagram } from 'react-icons/fa'
import InstagramLinks from './InstagramLinks'

export default function FloatingInstagram({
  igRef,
  igOpen,
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
      ref={igRef}
      className={`fixed z-50 ${isDragging ? '' : 'instagram-bubble-snap'}`}
      style={{ left: `${bubbleX}px`, top: `${bubbleY}px` }}
    >
      <div
        className={`instagram-popover absolute bottom-full z-50 mb-2 w-72 max-w-[calc(100vw-2rem)] rounded-2xl border border-white/70 bg-white p-2 shadow-[0_16px_40px_rgba(18,60,53,0.16)] backdrop-blur-md sm:w-80 ${
          igSnap === 'right' ? 'right-0' : 'left-0'
        } ${igOpen ? 'instagram-popover-open' : ''}`}
        aria-hidden={!igOpen}
      >
        <InstagramLinks onNavigate={onNavigate} isOpen={igOpen} />
      </div>

      <button
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
        className="motion-safe:animate-[bubble-float_5s_ease-in-out_infinite] flex h-16 w-16 touch-none select-none items-center justify-center rounded-[45%_55%_52%_48%] bg-[#2e7d32] text-white shadow-[0_14px_34px_rgba(27,77,30,0.32)] transition-transform duration-300 active:scale-95"
        aria-label="Instagram"
        aria-expanded={igOpen}
        aria-haspopup="true"
        type="button"
      >
        <FaInstagram className="h-6 w-6" />
      </button>
    </div>
  )
}
