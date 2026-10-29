import { useState } from "react"
import type { Product } from "../../features/catalog/catalog-data"
import { ChatIcon, ChevronIcon } from "./CatalogIcons"
import { business } from "../../features/business/business-data"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const [open, setOpen] = useState(false)

  return (
    <article className="overflow-hidden rounded-2xl border border-[#173f33]/8 bg-white shadow-[0_10px_30px_rgba(26,57,45,0.05)] sm:rounded-[1.5rem]">
      <div className="relative aspect-square overflow-hidden bg-[#ebe8de] sm:aspect-[4/3]">
        <img src={product.image} alt={`${product.code} — ${product.name}`} width={900} height={675} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.02]" />
        <span className="absolute left-2.5 top-2.5 rounded-full border border-white/70 bg-white/92 px-2 py-1.5 text-[8px] font-bold tracking-[0.12em] text-[#173f33] shadow-sm sm:left-4 sm:top-4 sm:px-3 sm:py-2 sm:text-[10px] sm:tracking-[0.16em]">MẪU {product.code}</span>
      </div>
      <div className="p-3.5 sm:p-5">
        <div className="flex flex-col items-start gap-1.5 sm:flex-row sm:justify-between sm:gap-3"><h3 className="font-serif text-base leading-tight text-[#173f33] sm:text-xl">{product.name}</h3><p className="shrink-0 text-[15px] font-bold tracking-[-0.03em] text-[#173f33] sm:text-lg">{product.price}</p></div>
        <button type="button" onClick={() => setOpen((current) => !current)} aria-expanded={open} className="mt-3 flex w-full items-center justify-between border-y border-[#173f33]/8 py-2.5 text-left text-[10px] font-semibold text-[#5e6d65] sm:mt-4 sm:py-3 sm:text-xs"><span>{open ? "Thu gọn" : "Xem thành phần"}</span><ChevronIcon open={open} /></button>
        {open && <div className="border-b border-[#173f33]/8 py-3"><ul className="grid gap-x-4 gap-y-1.5 text-[10px] leading-4 text-[#68766f] sm:grid-cols-2 sm:gap-y-2 sm:text-xs sm:leading-5">{product.ingredients.map((item) => <li key={item} className="flex gap-2"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#bd9b5f]" />{item}</li>)}</ul></div>}
        <a href={business.facebook} aria-label={`Liên hệ qua Facebook về mẫu ${product.code}`} className="mt-3 flex items-center justify-center gap-1.5 rounded-xl bg-[#173f33] px-2 py-2.5 text-[10px] font-bold text-white transition-colors hover:bg-[#245b49] sm:mt-4 sm:gap-2 sm:px-4 sm:py-3 sm:text-xs"><ChatIcon className="h-4 w-4" /><span className="sm:hidden">Tư vấn mẫu</span><span className="hidden sm:inline">Liên hệ về mẫu này</span></a>
      </div>
    </article>
  )
}
