import { useState } from "react"
import ProductCard from "./components/catalog/ProductCard"
import { ChatIcon, PhoneIcon, ZaloIcon } from "./components/catalog/CatalogIcons"
import { filters, products } from "./features/catalog/catalog-data"

export default function App() {
  const [selectedRange, setSelectedRange] = useState("Tất cả")
  const [visibleCount, setVisibleCount] = useState(8)
  const filteredProducts = selectedRange === "Tất cả" ? products.slice(0, visibleCount) : products.filter((product) => product.range === selectedRange)
  const visibleGroups = (selectedRange === "Tất cả" ? filters.slice(1) : [selectedRange]).filter((range) => filteredProducts.some((product) => product.range === range))

  return <div id="top" className="min-h-screen bg-[#f7f4ec] text-[#173f33]">
    <header className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:py-7">
      <a href="#top" className="flex items-center gap-3"><img src="/logo.png" alt="ELY FRUIT" width={56} height={56} className="h-14 w-14 rounded-full border border-[#173f33]/25 object-contain bg-white p-1" /><div><p className="font-serif text-2xl font-semibold leading-none tracking-[0.06em]">ELY FRUIT</p><p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#9c7944]">Trái cây nhập khẩu</p></div></a>
      <div className="hidden items-center gap-2 sm:flex"><span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#7a867f]">Tư vấn quà tặng</span></div>
    </header>
    <main>
      <section className="mx-auto max-w-7xl px-5 pb-6 pt-6 sm:px-8 sm:pb-8 sm:pt-10"><div className="max-w-2xl"><div className="mb-4 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.16em] text-[#9c7944]"><span className="h-px w-8 bg-[#bd9b5f]" /> Trái cây nhập khẩu · quà tặng cao cấp</div><h1 className="font-serif text-[3.15rem] leading-[0.92] tracking-[-0.045em] sm:text-7xl">Giỏ trái cây<br /><span className="text-[#9c7944]">trao trọn tinh hoa</span></h1><p className="mt-4 max-w-xl text-sm leading-6 text-[#5e6d65]">Trái cây - bánh kẹo nhập khẩu, giỏ trái cây cao cấp, thiết kế mâm lễ và tráp cưới hỏi.</p><p className="mt-3 text-xs font-semibold leading-5 text-[#173f33]">Số 22 Đường 30/4 · Thủ Dầu Một · Bình Dương</p></div></section>
      <div className="sticky top-0 z-40 border-y border-[#173f33]/8 bg-[#f7f4ec]/95"><div className="no-scrollbar mx-auto flex max-w-7xl gap-2 overflow-x-auto px-5 py-3 sm:px-8">{filters.map((filter) => <button key={filter} type="button" onClick={() => { setSelectedRange(filter); setVisibleCount(8) }} className={`shrink-0 rounded-full px-4 py-2.5 text-xs font-bold ${filter === selectedRange ? "bg-[#173f33] text-white" : "border border-[#173f33]/12 bg-white/70 text-[#52645b]"}`}>{filter}</button>)}</div></div>
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-8 sm:pt-10">
        {visibleGroups.length > 0 ? <div className="space-y-14">{visibleGroups.map((range) => { const groupProducts = filteredProducts.filter((product) => product.range === range); return <section key={range} aria-labelledby={`group-${range}`}><div className="mb-5 flex items-end justify-between border-b border-[#173f33]/10 pb-3"><h2 id={`group-${range}`} className="font-serif text-2xl">Giỏ quà {range}</h2><p className="text-[11px] text-[#7a867f]">{groupProducts.length} mẫu</p></div><div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">{groupProducts.map((product) => <ProductCard key={product.code} product={product} />)}</div></section> })}</div> : <div className="rounded-3xl bg-white px-6 py-14 text-center"><p className="font-serif text-2xl">Mẫu mới đang được cập nhật</p></div>}
        {selectedRange === "Tất cả" && visibleCount < products.length && <button type="button" onClick={() => setVisibleCount((count) => count + 8)} className="mx-auto mt-10 block rounded-full bg-[#173f33] px-6 py-3 text-sm font-bold text-white">Xem thêm sản phẩm</button>}
      </div>
    </main>
    <footer className="border-t border-[#173f33]/10 bg-[#f0ecdf] px-5 pb-32 pt-9 sm:px-8 sm:pb-10"><div className="mx-auto flex max-w-7xl justify-between"><div><p className="font-serif text-2xl">ELY FRUIT</p><p className="mt-2 text-xs text-[#68766f]">Trái cây nhập khẩu & quà tặng tinh tế.</p></div><div className="text-xs leading-6 text-[#4e6058] sm:text-right"><p>Hotline · Zalo: 0900 000 000</p><p>Số 22 Đường 30/4, Thủ Dầu Một, Bình Dương</p></div></div></footer>
    <div className="fixed inset-x-0 bottom-0 z-50 border-t bg-white/92 p-3 sm:hidden"><div className="mx-auto flex max-w-md gap-2.5"><a href="https://zalo.me/0900000000" className="flex h-13 flex-1 items-center justify-center gap-2 rounded-2xl bg-[#087fce] text-sm font-bold text-white"><ZaloIcon className="h-5 w-5" /> Nhắn Zalo</a><a href="tel:0900000000" className="flex h-13 flex-1 items-center justify-center gap-2 rounded-2xl bg-[#173f33] text-sm font-bold text-white"><PhoneIcon className="h-5 w-5" /> Gọi ngay</a></div></div>
  </div>
}
