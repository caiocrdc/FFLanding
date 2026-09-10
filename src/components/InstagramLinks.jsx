export default function InstagramLinks({ onNavigate, isOpen = true }) {
  return (
    <>
      <a
        href="https://www.instagram.com/fernandesfarma"
        target="_blank"
        rel="noreferrer"
        onClick={onNavigate}
        tabIndex={isOpen ? 0 : -1}
        className="block rounded-lg px-3 py-3 text-sm leading-snug text-[#1b4d1e] transition hover:bg-[#f1f8f2] active:bg-[#e9f4ea]"
      >
        <span className="block font-semibold">Instagram Matriz (Centro)</span>
        <span className="text-[#2e7d32]">@fernandesfarma</span>
      </a>
      <a
        href="https://www.instagram.com/fernandesfarmaredonda"
        target="_blank"
        rel="noreferrer"
        onClick={onNavigate}
        tabIndex={isOpen ? 0 : -1}
        className="mt-1 block rounded-lg px-3 py-3 text-sm leading-snug text-[#1b4d1e] transition hover:bg-[#f1f8f2] active:bg-[#e9f4ea]"
      >
        <span className="block font-semibold">Instagram Filial (Redonda)</span>
        <span className="text-[#2e7d32]">@fernandesfarmaredonda</span>
      </a>
    </>
  )
}
