import { FaTags } from 'react-icons/fa'
import farmapopLogo from '../assets/farmapop.png'

export function FarmaciaPopularBadge({ compact = false }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full bg-gradient-to-r from-[#c62828] via-[#d32f2f] to-[#e53935] font-semibold uppercase tracking-[0.15em] text-white shadow-[0_4px_12px_rgba(198,40,40,0.35)] ${
        compact ? 'px-2.5 py-1 text-[10px]' : 'px-4 py-2 text-xs'
      }`}
    >
      <img
        src={farmapopLogo}
        alt=""
        className={compact ? 'h-5 w-5 object-contain' : 'h-6 w-6 object-contain'}
      />
      Farmácia Popular
    </span>
  )
}

export function PbmBadge({ compact = false }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#b9d9ed]/70 bg-[#d9edf8]/70 font-semibold uppercase tracking-[0.15em] text-[#18527a] shadow-[0_8px_24px_rgba(24,82,122,0.14)] backdrop-blur-md ${
        compact ? 'px-2.5 py-1 text-[10px]' : 'px-4 py-2 text-xs'
      }`}
    >
      <FaTags className={compact ? 'text-xs' : 'text-sm'} />
      PBM
    </span>
  )
}
