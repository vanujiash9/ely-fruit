import { useState } from "react"
import ProductCard from "./components/catalog/ProductCard"
import { ChatIcon, PhoneIcon } from "./components/catalog/CatalogIcons"
import { business } from "./features/business/business-data"
import { filters, products } from "./features/catalog/catalog-data"

const priceLabels: Record<string, string> = {
  "399K": "Khởi đầu tinh tế",
  "499K": "Quà tặng thanh tao",
  "599K": "Lời chúc trọn đầy",
  "699K": "Trao gửi thịnh vượng",
  "800K": "Tuyển phẩm cao cấp",
  "1 triệu": "Tinh hoa thượng hạng",
}

export default function App() {
  const [selectedRange, setSelectedRange] = useState("Tất cả")
  const visibleRanges = selectedRange === "Tất cả" ? filters.slice(1) : [selectedRange]

  return <div id="top" className="min-h-screen bg-[#f7f4ec] text-[#173f33]">
    <header className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:py-7">
      <a href="#top" className="flex items-center gap-3"><img src="/logo.png" alt="Ely Fruit" width={56} height={56} className="h-14 w-14 rounded-full border border-[#173f33]/25 object-contain bg-white p-1" /><div><p className="font-serif text-2xl font-semibold leading-none tracking-[0.06em]">Ely Fruit</p><p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#9c7944]">Trái cây nhập khẩu</p></div></a>
      <span className="hidden text-[10px] font-semibold uppercase tracking-[0.12em] text-[#7a867f] sm:block">Tư vấn quà tặng</span>
    </header>
    <main>
      <section className="mx-auto max-w-7xl px-5 pb-7 pt-6 sm:px-8 sm:pb-10 sm:pt-10"><div className="max-w-2xl"><div className="mb-4 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.16em] text-[#9c7944]"><span className="h-px w-8 bg-[#bd9b5f]" /> Bộ sưu tập theo ngân sách</div><h1 className="font-serif text-[3.15rem] leading-[0.92] tracking-[-0.045em] sm:text-7xl">Giỏ quà trái cây<br /><span className="text-[#9c7944]">theo ngân sách</span></h1><p className="mt-4 max-w-xl text-sm leading-6 text-[#5e6d65]">{business.description} Tham khảo mẫu quà theo ngân sách và liên hệ để được tư vấn.</p></div></section>
      <div className="sticky top-0 z-40 border-y border-[#173f33]/8 bg-[#f7f4ec]/95"><div className="no-scrollbar mx-auto flex max-w-7xl gap-2 overflow-x-auto px-5 py-3 sm:px-8">{filters.map((filter) => <button key={filter} type="button" onClick={() => setSelectedRange(filter)} className={`shrink-0 rounded-full px-4 py-2.5 text-xs font-bold transition-colors ${filter === selectedRange ? "bg-[#173f33] text-white" : "border border-[#173f33]/12 bg-white/70 text-[#52645b] hover:border-[#173f33]/30"}`}>{filter === "Tất cả" ? "Tất cả mức giá" : filter}</button>)}</div></div>
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-8 sm:pt-10">
        <div className="space-y-14">{visibleRanges.map((range) => { const groupProducts = products.filter((product) => product.range === range); return <section key={range} aria-labelledby={`group-${range}`}><div className="mb-5 flex items-end justify-between border-b border-[#173f33]/10 pb-3"><div><p className="mb-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#9c7944]">Ngân sách {range}</p><h2 id={`group-${range}`} className="font-serif text-2xl sm:text-3xl">{priceLabels[range] ?? "Tuyển chọn Ely Fruit"}</h2></div><p className="text-[11px] text-[#7a867f]">{groupProducts.length} mẫu</p></div><div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">{groupProducts.map((product) => <ProductCard key={product.code} product={product} />)}</div></section> })}</div>
        {visibleRanges.length === 0 && <div className="rounded-3xl bg-white px-6 py-14 text-center"><p className="font-serif text-2xl">Mẫu mới đang được cập nhật</p></div>}
      </div>
    </main>
    <footer className="border-t border-[#173f33]/10 bg-[#f0ecdf] px-5 pb-32 pt-9 sm:px-8 sm:pb-10"><div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1fr_1.2fr_1.4fr]"><div className="min-w-0"><p className="font-serif text-2xl">{business.name}</p><p className="mt-2 max-w-sm text-xs leading-6 text-[#68766f]">Trái cây, bánh kẹo nhập khẩu · Giỏ quà cao cấp · Mâm lễ, tráp cưới hỏi.</p></div><address className="min-w-0 break-words text-xs not-italic leading-6 text-[#4e6058]"><p>Điện thoại: <a className="underline underline-offset-4" href={`tel:${business.phone}`}>{business.phoneLabel}</a></p><p>{business.address}</p><p>Giờ mở cửa: {business.openingHoursLabel}</p><p><a className="underline underline-offset-4" href={business.maps}>Xem trên Google Maps</a></p><p><a className="underline underline-offset-4" href={`mailto:${business.email}`}>{business.email}</a></p><p><a className="underline underline-offset-4" href={business.facebook}>{business.name} trên Facebook</a> · <a className="underline underline-offset-4" href={business.tiktok}>TikTok</a></p></address><div className="min-w-0 overflow-hidden rounded-2xl border border-[#173f33]/15 bg-white"><iframe title={`Bản đồ cửa hàng ${business.name}`} src={`https://www.google.com/maps?q=${encodeURIComponent(`${business.name}, ${business.address}`)}&output=embed`} width="100%" height={280} loading="lazy" referrerPolicy="strict-origin-when-cross-origin" className="block w-full border-0" /><a href={business.maps} className="flex min-h-11 items-center justify-center px-4 py-3 text-xs font-semibold text-[#173f33] underline underline-offset-4 transition-colors hover:bg-[#f7f4ec] focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[#173f33]">Mở Google Maps · Chỉ đường đến cửa hàng</a></div></div></footer>
    <div className="fixed inset-x-0 bottom-0 z-50 border-t bg-white/92 p-3 sm:hidden"><div className="mx-auto flex max-w-md gap-2.5"><a href={business.facebook} className="flex h-13 flex-1 items-center justify-center gap-2 rounded-2xl bg-[#087fce] text-sm font-bold text-white"><ChatIcon className="h-5 w-5" /> Facebook</a><a href={`tel:${business.phone}`} className="flex h-13 flex-1 items-center justify-center gap-2 rounded-2xl bg-[#173f33] text-sm font-bold text-white"><PhoneIcon className="h-5 w-5" /> Gọi ngay</a></div></div>
  </div>
}
