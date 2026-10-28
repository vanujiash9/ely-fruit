import { FormEvent, useEffect, useMemo, useState } from 'react'
import {
  ArrowRight,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Gift,
  HeartHandshake,
  MapPin,
  Menu,
  MessageCircle,
  Music2,
  Phone,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  Store,
  Truck,
  X,
  ZoomIn,
} from 'lucide-react'

const PHONE = '0981.370.970'
const PHONE_LINK = 'tel:0981370970'
const ADDRESS = 'Số 22 đường 30/4, Phú Lợi, Thủ Dầu Một, HCM'
const MAP_URL = 'https://maps.app.goo.gl/JwQ1uLf4Ym1GPQWL6?g_st=ic'
const FACEBOOK_URL = 'https://www.facebook.com/share/1DXwAhtZ7R/?mibextid=wwXIfr'
const TIKTOK_URL = 'https://www.tiktok.com/@ely.fruit.bnh.dng?_r=1&_t=ZS-9AvYsctqiqz'

const images = {
  hero: '/products/ely10-front.webp',
  basket: '/products/ely06-front.webp',
  apples: '/products/ely07-front.webp',
  fruitBox: '/products/ely11-front.webp',
  boxes: '/products/kh13-front.webp',
  market: 'https://images.unsplash.com/photo-1609780447631-05b93e5a88ea?auto=format&fit=crop&w=1400&q=85',
  fruit: '/products/kh07-front.webp',
  store: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?auto=format&fit=crop&w=1200&q=85',
  grapes: '/products/kh11-front.webp',
  gift: '/products/kh01-front.webp',
}

type Product = {
  slug: string
  name: string
  code: string
  price: string
  priceValue: number
  ingredients: string
  tag?: string
  image: string
  imageBack: string
  occasion: string
  type: string
}

const products: Product[] = [
  { slug: 'ely-06', name: 'Giỏ Trái Cây Ely 06', code: 'ELY06', price: '800.000đ', priceValue: 800000, ingredients: 'Hoa tươi, cam Nam Phi, lê nâu, táo xanh, táo Dazzle, táo Envy, quýt Úc và táo Nam Phi.', tag: 'Bán chạy', image: '/products/ely06-front.webp', imageBack: '/products/ely06-back.webp', occasion: 'Sinh nhật', type: 'Giỏ trái cây' },
  { slug: 'ely-07', name: 'Giỏ Trái Cây Ely 07', code: 'ELY07', price: '800.000đ', priceValue: 800000, ingredients: 'Hoa tươi, cam Nam Phi, lê nâu, táo xanh, táo Dazzle, kiwi vàng, quýt Úc và táo Nam Phi.', tag: 'Mẫu mới', image: '/products/ely07-front.webp', imageBack: '/products/ely07-back.webp', occasion: 'Cảm ơn', type: 'Giỏ trái cây' },
  { slug: 'ely-10', name: 'Giỏ Trái Cây Ely 10', code: 'ELY10', price: '1.000.000đ', priceValue: 1000000, ingredients: 'Hoa tươi, cam Nam Phi, lê sữa, táo xanh, táo Dazzle, quýt Úc, kiwi vàng, nho mẫu đơn, lê Hà Giang và táo Nam Phi.', tag: 'Cao cấp', image: '/products/ely10-front.webp', imageBack: '/products/ely10-back.webp', occasion: 'Biếu đối tác', type: 'Giỏ trái cây' },
  { slug: 'ely-11', name: 'Giỏ Trái Cây Ely 11', code: 'ELY11', price: '1.000.000đ', priceValue: 1000000, ingredients: 'Hoa tươi, cam Nam Phi, lê sữa, táo xanh, táo Dazzle, quýt Úc, kiwi vàng, nho mẫu đơn, lê Hà Giang và táo Nam Phi.', tag: 'Cao cấp', image: '/products/ely11-front.webp', imageBack: '/products/ely11-back.webp', occasion: 'Quà doanh nghiệp', type: 'Giỏ trái cây' },
  { slug: 'kh-01', name: 'Giỏ Trái Cây KH 01', code: 'KH01', price: '499.000đ', priceValue: 499000, ingredients: 'Cam Nam Phi, lê nâu, táo xanh, táo Dazzle, quýt Úc, kiwi vàng và táo Nam Phi.', tag: 'Giá tốt', image: '/products/kh01-front.webp', imageBack: '/products/kh01-back.webp', occasion: 'Thăm bệnh', type: 'Giỏ trái cây' },
  { slug: 'kh-07', name: 'Giỏ Trái Cây KH 07', code: 'KH07', price: '599.000đ', priceValue: 599000, ingredients: 'Cam Nam Phi, lê sữa, táo Dazzle, quýt Úc, táo Nam Phi và táo xanh.', image: '/products/kh07-front.webp', imageBack: '/products/kh07-back.webp', occasion: 'Gia đình', type: 'Giỏ trái cây' },
  { slug: 'kh-11', name: 'Giỏ Trái Cây KH 11', code: 'KH11', price: '699.000đ', priceValue: 699000, ingredients: 'Nho đen, lê sữa, cam Nam Phi, táo xanh, táo Dazzle, quýt Úc, kiwi vàng và táo Nam Phi.', tag: 'Bán chạy', image: '/products/kh11-front.webp', imageBack: '/products/kh11-back.webp', occasion: 'Sinh nhật', type: 'Giỏ trái cây' },
  { slug: 'kh-13', name: 'Giỏ Trái Cây KH 13', code: 'KH13', price: '800.000đ', priceValue: 800000, ingredients: 'Dưa Đài Queen, lê nâu, cam Nam Phi, táo Dazzle, quýt Úc, nho mẫu đơn và táo Nam Phi.', tag: 'Cao cấp', image: '/products/kh13-front.webp', imageBack: '/products/kh13-back.webp', occasion: 'Biếu đối tác', type: 'Giỏ trái cây' },
]

const categories = [
  ['Giỏ quà trái cây', 'Trái cây tươi tuyển chọn, gói mới mỗi ngày.', images.basket],
  ['Hộp quà cao cấp', 'Chỉn chu từ chất liệu hộp đến từng món quà.', images.boxes],
  ['Trái cây nhập khẩu', 'Nguồn gốc rõ ràng, tươi ngon theo mùa.', images.fruit],
  ['Giỏ quà doanh nghiệp', 'Cá nhân hóa theo ngân sách và thương hiệu.', images.fruitBox],
  ['Giỏ quà Tết', 'Sắc xuân sang trọng, trao gửi thịnh vượng.', images.gift],
  ['Mâm lễ & Tráp cưới', 'Trang trọng, đúng nghi thức và giao đúng giờ.', images.grapes],
]

const catalogues = [
  ['Catalogue Giỏ Quà Trái Cây', '48 mẫu', images.basket],
  ['Catalogue Giỏ Quà Cao Cấp', '32 mẫu', images.apples],
  ['Catalogue Quà Doanh Nghiệp', '26 mẫu', images.fruitBox],
  ['Catalogue Giỏ Quà Tết', '36 mẫu', images.gift],
  ['Catalogue Mâm Lễ', '18 mẫu', images.grapes],
  ['Catalogue Tráp Cưới Hỏi', '24 mẫu', images.boxes],
  ['Catalogue Trái Cây Nhập Khẩu', '42 sản phẩm', images.fruit],
  ['Catalogue Quà Sinh Nhật', '28 mẫu', images.hero],
]

const faqs = [
  ['Ely Fruit có giao giỏ quà tận nơi không?', 'Có. Ely Fruit hỗ trợ giao hàng tận nơi tại Thủ Dầu Một và các khu vực lân cận. Thời gian, phí giao hàng sẽ được tư vấn cụ thể theo địa chỉ nhận.'],
  ['Có thể đặt giỏ quà theo ngân sách không?', 'Hoàn toàn có thể. Bạn chỉ cần cho biết ngân sách, đối tượng và dịp tặng, đội ngũ sẽ đề xuất mẫu phù hợp nhất.'],
  ['Giỏ quà có thể thay đổi loại trái cây không?', 'Có. Thành phần có thể điều chỉnh theo sở thích, tình trạng trái cây theo mùa và mức ngân sách của bạn.'],
  ['Ely Fruit có nhận làm quà doanh nghiệp số lượng lớn không?', 'Có. Chúng tôi nhận đơn số lượng lớn, hỗ trợ thiết kế theo nhận diện và giao đến nhiều địa chỉ.'],
  ['Có thể thêm thiệp hoặc logo doanh nghiệp không?', 'Có. Ely Fruit hỗ trợ thiệp chúc mừng, tag tên và logo doanh nghiệp tùy theo số lượng đặt.'],
  ['Ely Fruit có làm mâm lễ và tráp cưới hỏi không?', 'Có. Chúng tôi tư vấn mâm lễ, tráp cưới hỏi theo yêu cầu, phong cách và thời gian tổ chức.'],
  ['Có thể xem sản phẩm trực tiếp tại cửa hàng không?', `Có. Mời bạn ghé cửa hàng tại ${ADDRESS}, mở cửa từ 07:30–21:00 mỗi ngày.`],
]

function routeTo(path: string) {
  window.location.hash = path
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function Button({ children, href, variant = 'primary', onClick, type = 'button', className = '' }: { children: React.ReactNode; href?: string; variant?: 'primary' | 'secondary' | 'cream' | 'ghost'; onClick?: () => void; type?: 'button' | 'submit'; className?: string }) {
  const classes = `btn btn-${variant} ${className}`
  return href ? <a className={classes} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">{children}</a> : <button className={classes} onClick={onClick} type={type}>{children}</button>
}

function Logo({ light = false }: { light?: boolean }) {
  return (
    <button className={`logo-lockup ${light ? 'logo-light' : ''}`} onClick={() => routeTo('/')}>
      <img src="/ely-fruit-logo.png" alt="Ely Fruit" />
      <span><strong>ELY FRUIT</strong><small>Fresh • Gift • Love</small></span>
    </button>
  )
}

function Header() {
  const [open, setOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const links = [
    ['Trang chủ', '/'], ['Trái cây', '/gifts'], ['Về Ely Fruit', '/about'],
  ]
  const giftLinks = [
    ['Giỏ quà trái cây', '/gifts'],
    ['Quà sinh nhật', '/gifts'],
    ['Mâm lễ & Tráp cưới', '/catalogue'],
    ['Giỏ quà Tết', '/catalogue'],
    ['Catalogue tổng hợp', '/catalogue'],
  ]
  return (
    <>
      <div className="topbar">
        <div className="container topbar-inner">
          <span><MapPin size={14} /> {ADDRESS}</span>
          <span><Clock3 size={14} /> Mở cửa hôm nay: 07:30–21:00</span>
        </div>
      </div>
      <header className="header">
        <div className="container header-inner">
          <button className="icon-btn mobile-only" onClick={() => setOpen(true)} aria-label="Mở menu"><Menu /></button>
          <Logo />
          <nav className="desktop-nav">
            <button onClick={() => routeTo('/')}>Trang chủ</button>
            <div className="nav-dropdown">
              <button onClick={() => routeTo('/gifts')}>Giỏ quà <ChevronDown size={14} /></button>
              <div className="nav-dropdown-menu">
                <span>Chọn theo nhu cầu</span>
                {giftLinks.map(([label, path]) => <button key={label} onClick={() => routeTo(path)}>{label}<ArrowRight size={14} /></button>)}
              </div>
            </div>
            {links.slice(1).map(([label, path]) => <button key={label} onClick={() => routeTo(path)}>{label}</button>)}
          </nav>
          <div className="header-actions">
            <button className="icon-btn search-button" onClick={() => setSearchOpen(!searchOpen)} aria-label="Tìm kiếm"><Search /></button>
            <a className="hotline desktop-hotline" href={PHONE_LINK}><Phone size={17} /><span><small>Hotline</small>{PHONE}</span></a>
            <Button href={PHONE_LINK} className="desktop-cta order-pulse"><Phone size={16} /> Liên hệ đặt hàng</Button>
            <a className="mobile-call" href={PHONE_LINK}><Phone size={19} /></a>
          </div>
        </div>
        {searchOpen && <div className="search-panel container"><Search size={20} /><input autoFocus placeholder="Tìm giỏ quà, mã sản phẩm, dịp tặng..." /><button onClick={() => routeTo('/gifts')}>Tìm kiếm</button></div>}
      </header>
      <div className={`mobile-drawer ${open ? 'is-open' : ''}`}>
        <button className="drawer-backdrop" onClick={() => setOpen(false)} aria-label="Đóng menu" />
        <div className="drawer-panel">
          <div className="drawer-head"><Logo /><button className="icon-btn" onClick={() => setOpen(false)}><X /></button></div>
          <nav>
            <button onClick={() => { routeTo('/'); setOpen(false) }}>Trang chủ<ArrowRight size={16} /></button>
            <button onClick={() => { routeTo('/gifts'); setOpen(false) }}>Giỏ quà<ArrowRight size={16} /></button>
            <div className="drawer-subnav">{giftLinks.slice(1).map(([label, path]) => <button key={label} onClick={() => { routeTo(path); setOpen(false) }}>{label}</button>)}</div>
            {links.slice(1).map(([label, path]) => <button key={label} onClick={() => { routeTo(path); setOpen(false) }}>{label}<ArrowRight size={16} /></button>)}
          </nav>
          <div className="drawer-contact"><small>Tư vấn & đặt hàng</small><a href={PHONE_LINK}>{PHONE}</a><p>07:30–21:00 mỗi ngày</p></div>
        </div>
      </div>
    </>
  )
}

function SectionHeading({ eyebrow, title, text, action }: { eyebrow?: string; title: string; text?: string; action?: React.ReactNode }) {
  return <div className="section-heading"><div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{text && <p>{text}</p>}</div>{action}</div>
}

function ProductCard({ product }: { product: Product }) {
  return (
    <article className="product-card">
      <button className="product-image" onClick={() => routeTo(`/product/${product.slug}`)}>
        <img className="front-image" src={product.image} alt={product.name} />
        <img className="back-image" src={product.imageBack} alt={`${product.name} mặt sau`} />
        {product.tag && <span className="tag">{product.tag}</span>}
        <span className="photo-count">● ○ <small>2 ảnh</small></span>
      </button>
      <div className="product-info">
        <span className="product-code">{product.code}</span>
        <button className="product-title" onClick={() => routeTo(`/product/${product.slug}`)}>{product.name}</button>
        <strong className="price">{product.price}</strong>
        <p>{product.ingredients}</p>
        <div className="product-actions">
          <Button onClick={() => routeTo(`/product/${product.slug}`)} variant="secondary">Xem chi tiết</Button>
          <a href={PHONE_LINK}>Liên hệ đặt hàng <ArrowRight size={14} /></a>
        </div>
      </div>
    </article>
  )
}

function CategoryGrid() {
  return <div className="category-grid">{categories.map(([name, desc, image], index) => (
    <article className={`category-card category-${index + 1}`} key={name}>
      <img src={image} alt={name} />
      <div className="category-overlay"><span>0{index + 1}</span><h3>{name}</h3><p>{desc}</p><button onClick={() => routeTo('/gifts')}>Xem sản phẩm <ArrowRight size={16} /></button></div>
    </article>
  ))}</div>
}

function FilterBar({ active, setActive }: { active: string; setActive: (value: string) => void }) {
  const [open, setOpen] = useState(false)
  const groups = [
    ['Khoảng giá', ['499.000đ', '599.000đ', '699.000đ', '800.000đ', '1.000.000đ']],
    ['Dịp tặng', ['Tết', 'Sinh nhật', 'Biếu đối tác', 'Quà doanh nghiệp', 'Thăm bệnh', 'Cảm ơn', 'Cưới hỏi']],
    ['Loại sản phẩm', ['Giỏ trái cây', 'Hộp quà', 'Set quà cao cấp', 'Mâm lễ', 'Tráp cưới']],
    ['Phong cách', ['Sang trọng', 'Hiện đại', 'Tối giản', 'Truyền thống']],
  ]
  const content = <>{groups.map(([title, options]) => <div className="filter-group" key={title as string}><h4>{title}</h4>{(options as string[]).map(option => <label key={option}><input type="radio" name="filter" checked={active === option} onChange={() => setActive(option)} /><span>{option}</span></label>)}</div>)}</>
  return (
    <>
      <aside className="filter-sidebar">{content}</aside>
      <button className="mobile-filter-button" onClick={() => setOpen(true)}>Bộ lọc <span>{active ? '1' : '0'}</span></button>
      <div className={`filter-sheet ${open ? 'is-open' : ''}`}><button className="drawer-backdrop" onClick={() => setOpen(false)} /><div className="filter-sheet-panel"><div className="sheet-handle" /><div className="sheet-head"><h3>Bộ lọc sản phẩm</h3><button onClick={() => setOpen(false)}><X /></button></div><div className="sheet-content">{content}</div><Button onClick={() => setOpen(false)}>Xem sản phẩm phù hợp</Button></div></div>
    </>
  )
}

function TrustStrip() {
  const items = [[ShieldCheck, 'Trái cây tuyển chọn', 'Kiểm tra kỹ trước khi gói'], [Gift, 'Gói quà theo yêu cầu', 'Mỗi món quà là một thiết kế'], [HeartHandshake, 'Tư vấn trực tiếp', 'Theo ngân sách và dịp tặng'], [Truck, 'Giao hàng tận nơi', 'Nhanh chóng, cẩn thận']]
  return <div className="trust-strip container">{items.map(([Icon, title, text]) => { const C = Icon as typeof ShieldCheck; return <div key={title as string}><C /><span><strong>{title as string}</strong><small>{text as string}</small></span></div> })}</div>
}

function Hero() {
  return (
    <section className="hero">
      <div className="container hero-grid">
        <div className="hero-content">
          <span className="eyebrow">Trao tặng điều tươi lành</span>
          <h1>Giỏ Quà Cao Cấp <em>Ely Fruit</em></h1>
          <p>Trái cây nhập khẩu, giỏ quà, mâm lễ và tráp cưới hỏi tại Thủ Dầu Một.</p>
          <div className="hero-buttons"><Button onClick={() => routeTo('/gifts')}>Xem giỏ quà <ArrowRight size={18} /></Button><Button href={FACEBOOK_URL} variant="cream">Liên hệ tư vấn</Button></div>
          <div className="hero-meta"><a href={PHONE_LINK}><Phone size={17} />{PHONE}</a><span><Clock3 size={17} />07:30–21:00</span><span><MapPin size={17} />Thủ Dầu Một</span></div>
        </div>
        <div className="hero-visual">
          <div className="hero-image-main"><img src={images.hero} alt="Giỏ trái cây cao cấp Ely Fruit" /></div>
          <div className="hero-image-small"><img src={images.apples} alt="Trái cây nhập khẩu tuyển chọn" /></div>
          <div className="hero-badge"><Sparkles size={18} /><span><strong>Gói mới mỗi ngày</strong><small>Tươi ngon & chỉn chu</small></span></div>
        </div>
      </div>
      <TrustStrip />
    </section>
  )
}

function LocalSection() {
  return (
    <section className="section local-section">
      <div className="container local-grid">
        <div className="local-content">
          <span className="eyebrow">Cửa hàng tại Thủ Dầu Một</span>
          <h2>Ely Fruit – Giỏ Quà & Trái Cây Cao Cấp tại Thủ Dầu Một</h2>
          <p>Ely Fruit phục vụ giỏ quà Thủ Dầu Một, giỏ trái cây Thủ Dầu Một và trái cây nhập khẩu Thủ Dầu Một với lựa chọn đa dạng. Chúng tôi cũng nhận giỏ quà Bình Dương, mâm lễ cưới hỏi và tráp cưới hỏi theo yêu cầu.</p>
          <div className="contact-lines"><div><MapPin /><span><small>Địa chỉ</small><strong>{ADDRESS}</strong></span></div><div><Clock3 /><span><small>Giờ mở cửa</small><strong>07:30–21:00, tất cả các ngày</strong></span></div><div><Phone /><span><small>Hotline</small><strong>{PHONE}</strong></span></div></div>
          <Button href={MAP_URL}>Xem trên Google Maps <ArrowRight size={18} /></Button>
        </div>
        <div className="map-card">
          <iframe
            className="real-map"
            src="https://www.google.com/maps?q=S%E1%BB%91+22+%C4%91%C6%B0%E1%BB%9Dng+30%2F4%2C+Ph%C3%BA+L%E1%BB%A3i%2C+Th%E1%BB%A7+D%E1%BA%A7u+M%E1%BB%99t&output=embed"
            title="Bản đồ cửa hàng Ely Fruit tại Thủ Dầu Một"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
          <div className="map-info"><img src="/ely-fruit-logo.png" alt="" /><span><strong>Ely Fruit</strong><small>Phú Lợi, Thủ Dầu Một</small></span><a href={MAP_URL} target="_blank" rel="noreferrer"><ArrowRight /></a></div>
        </div>
      </div>
    </section>
  )
}

function FAQSection() {
  const [open, setOpen] = useState(0)
  return <section className="section faq-section"><div className="container faq-grid"><div className="faq-intro"><span className="eyebrow">Câu hỏi thường gặp</span><h2>Thông tin trước khi đặt quà</h2><p>Mọi món quà đều có thể được tư vấn và điều chỉnh để phù hợp hơn với người nhận.</p><Button href={FACEBOOK_URL} variant="secondary">Gửi câu hỏi cho Ely Fruit</Button></div><div className="accordion">{faqs.map(([q, a], i) => <article className={open === i ? 'open' : ''} key={q}><button onClick={() => setOpen(open === i ? -1 : i)}><span>{q}</span><ChevronDown /></button><div><p>{a}</p></div></article>)}</div></div></section>
}

function ContactForm({ compact = false }: { compact?: boolean }) {
  const [sent, setSent] = useState(false)
  function submit(e: FormEvent) { e.preventDefault(); setSent(true) }
  return (
    <form className={`contact-form ${compact ? 'compact-form' : ''}`} onSubmit={submit}>
      {sent ? <div className="form-success"><span><Check /></span><h3>Đã ghi nhận yêu cầu</h3><p>Cảm ơn bạn. Vui lòng gọi {PHONE} để được tư vấn ngay.</p><Button onClick={() => setSent(false)} variant="secondary">Gửi yêu cầu khác</Button></div> : <>
        <div className="field-row"><label>Họ và tên<input required placeholder="Nguyễn Anh" /></label><label>Số điện thoại<input required type="tel" placeholder="09xx xxx xxx" /></label></div>
        <div className="field-row"><label>Dịp tặng<select defaultValue=""><option value="" disabled>Chọn dịp tặng</option><option>Sinh nhật</option><option>Biếu đối tác</option><option>Quà doanh nghiệp</option><option>Cưới hỏi</option><option>Khác</option></select></label><label>Ngân sách<select defaultValue=""><option value="" disabled>Chọn ngân sách</option><option>Dưới 500.000đ</option><option>500.000đ–1.000.000đ</option><option>1.000.000đ</option></select></label></div>
        <label>Số lượng<input type="number" min="1" placeholder="Ví dụ: 2" /></label>
        <label>Ghi chú<textarea rows={compact ? 3 : 4} placeholder="Bạn muốn giỏ quà gồm những gì, giao khi nào..." /></label>
        <Button type="submit">Gửi yêu cầu tư vấn <Send size={17} /></Button>
        <small className="privacy-note">Ely Fruit chỉ dùng thông tin để tư vấn đơn hàng của bạn.</small>
      </>}
    </form>
  )
}

function ContactSection() {
  return <section className="section contact-section"><div className="container contact-wrap"><div className="contact-copy"><span className="eyebrow">Tư vấn riêng cho bạn</span><h2>Bạn cần tư vấn giỏ quà?</h2><p>Để lại nhu cầu, Ely Fruit sẽ gợi ý mẫu phù hợp với dịp tặng và ngân sách.</p><div className="contact-mini"><a href={PHONE_LINK}><Phone /> <span><small>Gọi trực tiếp</small><strong>{PHONE}</strong></span></a><a href={FACEBOOK_URL} target="_blank" rel="noreferrer"><MessageCircle /> <span><small>Nhắn tin nhanh</small><strong>Facebook Ely Fruit</strong></span></a></div></div><ContactForm compact /></div></section>
}

function HomePage() {
  return <>
    <Hero />
    <main>
      <section className="section categories-section"><div className="container"><SectionHeading eyebrow="Danh mục" title="Chọn quà theo nhu cầu" text="Tìm nhanh giỏ quà, trái cây, mâm lễ và quà doanh nghiệp phù hợp." action={<Button onClick={() => routeTo('/catalogue')} variant="ghost">Xem catalogue <ArrowRight size={17} /></Button>} /><CategoryGrid /></div></section>
      <section className="section products-section"><div className="container"><SectionHeading eyebrow="Sản phẩm" title="Giỏ quà nổi bật" text="Giá, mã sản phẩm và thành phần được hiển thị rõ ràng để bạn dễ lựa chọn." action={<Button onClick={() => routeTo('/gifts')} variant="secondary">Xem tất cả</Button>} /><div className="product-grid">{products.slice(0, 8).map(p => <ProductCard key={p.slug} product={p} />)}</div></div></section>
      <LocalSection />
      <FAQSection />
      <ContactSection />
    </main>
  </>
}

function Breadcrumb({ items }: { items: string[] }) {
  return <div className="breadcrumb"><button onClick={() => routeTo('/')}>Trang chủ</button>{items.map(item => <span key={item}><ChevronRight />{item}</span>)}</div>
}

function PageHero({ eyebrow, title, text, image }: { eyebrow: string; title: string; text: string; image?: string }) {
  return <section className="page-hero"><div className="container page-hero-grid"><div><Breadcrumb items={[title]} /><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{text}</p></div>{image && <img src={image} alt={title} />}</div></section>
}

function GiftsPage() {
  const [active, setActive] = useState('')
  const [sort, setSort] = useState('Nổi bật')
  const shown = useMemo(() => {
    let list = [...products]
    if (active.endsWith('đ')) list = list.filter(p => p.price === active)
    else if (['Giỏ trái cây', 'Hộp quà', 'Set quà cao cấp'].includes(active)) list = list.filter(p => p.type === active)
    else if (active) list = list.filter(p => p.occasion === active || p.tag === active)
    if (sort.includes('thấp')) list.sort((a, b) => a.priceValue - b.priceValue)
    if (sort.includes('cao')) list.sort((a, b) => b.priceValue - a.priceValue)
    return list
  }, [active, sort])
  return <>
    <PageHero eyebrow="Giỏ quà Ely Fruit" title="Giỏ Quà Cao Cấp" text="Các mẫu giỏ quà tại Thủ Dầu Một có giá, mã hàng và thành phần rõ ràng. Lọc nhanh theo ngân sách, dịp tặng hoặc loại sản phẩm." image={images.basket} />
    <main className="listing-section container">
      <div className="listing-toolbar"><div><strong>{shown.length} sản phẩm</strong><span>Được tuyển chọn dành cho bạn</span></div><label>Sắp xếp<select value={sort} onChange={e => setSort(e.target.value)}><option>Nổi bật</option><option>Mới nhất</option><option>Giá thấp → cao</option><option>Giá cao → thấp</option></select></label></div>
      {active && <div className="active-filters"><span>Đang lọc:</span><button onClick={() => setActive('')}>{active}<X size={14} /></button><button className="clear-filter" onClick={() => setActive('')}>Xóa tất cả</button></div>}
      <div className="listing-layout"><FilterBar active={active} setActive={setActive} /><div>{shown.length ? <div className="product-grid listing-grid">{shown.map(p => <ProductCard key={p.slug} product={p} />)}</div> : <div className="empty-state"><Gift /><h3>Chưa có sản phẩm phù hợp</h3><p>Hãy thử một tiêu chí khác hoặc liên hệ để Ely Fruit thiết kế riêng.</p><Button onClick={() => setActive('')}>Xem tất cả sản phẩm</Button></div>}</div></div>
    </main>
    <ContactSection />
  </>
}

function ProductPage({ slug }: { slug: string }) {
  const product = products.find(p => p.slug === slug) || products[0]
  const gallery = [product.image, product.imageBack]
  const [activeImage, setActiveImage] = useState(0)
  const [zoom, setZoom] = useState(false)
  return <>
    <main className="product-page container">
      <Breadcrumb items={['Giỏ quà', product.name]} />
      <div className="product-detail">
        <div className="gallery">
          <div className="gallery-main"><img src={gallery[activeImage]} alt={`${product.name} ảnh ${activeImage + 1}`} /><button onClick={() => setZoom(true)}><ZoomIn /> Phóng to</button><button className="gallery-prev" onClick={() => setActiveImage((activeImage + gallery.length - 1) % gallery.length)}><ChevronLeft /></button><button className="gallery-next" onClick={() => setActiveImage((activeImage + 1) % gallery.length)}><ChevronRight /></button></div>
          <div className="gallery-thumbs">{gallery.map((img, i) => <button className={i === activeImage ? 'active' : ''} onClick={() => setActiveImage(i)} key={img}><img src={img} alt={i === 0 ? 'Mặt trước' : i === 1 ? 'Mặt sau' : 'Chi tiết sản phẩm'} /><span>{i === 0 ? 'Mặt trước' : i === 1 ? 'Mặt sau' : 'Chi tiết'}</span></button>)}</div>
        </div>
        <div className="detail-info">
          {product.tag && <span className="tag inline-tag">{product.tag}</span>}
          <h1>{product.name}</h1>
          <div className="detail-code">Mã sản phẩm: <strong>{product.code}</strong></div>
          <div className="detail-price">{product.price}</div>
          <div className="stock"><span /> Sẵn sàng tư vấn & thực hiện</div>
          <p className="lead">Một lựa chọn trang nhã với trái cây nhập khẩu tươi ngon, phù hợp để gửi lời chúc tinh tế đến người nhận.</p>
          <div className="detail-specs"><div><small>Thành phần chính</small><p>{product.ingredients}</p></div><div><small>Phù hợp tặng</small><p>Gia đình, bạn bè, đối tác, khách hàng và cấp trên.</p></div><div><small>Dịp tặng phù hợp</small><p>{product.occasion}, cảm ơn, chúc mừng và thăm hỏi.</p></div></div>
          <div className="detail-actions"><Button href={PHONE_LINK}><Phone size={18} /> Gọi {PHONE}</Button><Button href={FACEBOOK_URL} variant="secondary"><MessageCircle size={18} /> Liên hệ tư vấn</Button><Button href={FACEBOOK_URL} variant="ghost"><MessageCircle size={18} /> Xem Facebook</Button></div>
        </div>
      </div>
      <div className="product-copy"><article><span className="eyebrow">Chi tiết sản phẩm</span><h2>Món quà tươi lành, được chuẩn bị bằng sự chỉn chu</h2><p>{product.name} được phối hợp hài hòa giữa hương vị, màu sắc và hình thức. Mỗi loại trái cây đều được kiểm tra trước khi sắp xếp và hoàn thiện tại cửa hàng.</p><h3>Hướng dẫn bảo quản</h3><p>Nên sử dụng sớm để đảm bảo độ tươi ngon. Bảo quản nơi thoáng mát hoặc ngăn mát tủ lạnh tùy loại trái cây.</p></article><aside><h3>Chính sách giao hàng</h3><ul><li><Check /> Hỗ trợ giao tận nơi</li><li><Check /> Xác nhận mẫu trước khi giao</li><li><Check /> Tư vấn khung giờ phù hợp</li><li><Check /> Hỗ trợ thiệp theo yêu cầu</li></ul></aside></div>
      <section className="related"><SectionHeading eyebrow="Có thể bạn sẽ thích" title="Sản phẩm tương tự" /><div className="product-grid">{products.filter(p => p.slug !== product.slug).slice(0, 4).map(p => <ProductCard key={p.slug} product={p} />)}</div></section>
    </main>
    <FAQSection />
    {zoom && <div className="lightbox"><button onClick={() => setZoom(false)}><X /></button><img src={gallery[activeImage]} alt={product.name} /></div>}
  </>
}

function CataloguePage() {
  return <>
    <PageHero eyebrow="Danh mục sản phẩm" title="Catalogue Ely Fruit" text="Xem nhanh giỏ quà, quà doanh nghiệp, mâm lễ, tráp cưới hỏi và trái cây nhập khẩu." image={images.boxes} />
    <main className="section container">
      <div className="catalogue-intro"><span>08 bộ sưu tập</span><p>Mỗi catalogue là một tuyển tập gợi ý được cập nhật theo mùa, giúp bạn chọn quà nhanh hơn mà vẫn giữ dấu ấn riêng.</p></div>
      <div className="catalogue-grid">{catalogues.map(([name, count, image], i) => <article key={name}><div className="catalogue-cover"><img src={image} alt={name} /><span>ELY<br />FRUIT</span><small>COLLECTION / 2025</small></div><div className="catalogue-info"><span>0{i + 1}</span><div><h2>{name}</h2><p>{count} · Tuyển chọn theo mùa</p><button onClick={() => routeTo('/gifts')}>Xem catalogue <ArrowRight /></button></div></div></article>)}</div>
    </main>
    <ContactSection />
  </>
}

function AboutPage() {
  return <>
    <PageHero eyebrow="Về thương hiệu" title="Về Ely Fruit" text="Cửa hàng trái cây và quà tặng cao cấp tại Thủ Dầu Một, chú trọng chất lượng thật và cách chuẩn bị chỉn chu." image={images.market} />
    <main>
      <section className="section container about-story"><div><span className="eyebrow">Ely Fruit là ai?</span><h2>Một cửa hàng địa phương với tiêu chuẩn quà tặng chỉn chu</h2></div><div><p>Ely Fruit chuyên trái cây tươi, trái cây nhập khẩu, bánh kẹo nhập khẩu, giỏ quà cao cấp, mâm lễ và tráp cưới hỏi tại Thủ Dầu Một.</p><p>Chúng tôi không chỉ bán một sản phẩm có sẵn. Mỗi nhu cầu đều được tư vấn theo dịp tặng, người nhận, ngân sách và thông điệp bạn muốn gửi trao.</p></div></section>
      <section className="values-section"><div className="container values-grid">{[[ShieldCheck, 'Tuyển chọn kỹ', 'Ưu tiên độ tươi, nguồn gốc và hình thức trước khi gói.'], [Sparkles, 'Hoàn thiện đẹp', 'Phối màu, chất liệu và thiệp thành một tổng thể tinh tế.'], [HeartHandshake, 'Tư vấn thật', 'Đề xuất đúng nhu cầu, không làm phức tạp việc chọn quà.'], [Store, 'Cửa hàng thực tế', 'Dễ dàng ghé xem và trao đổi trực tiếp tại Thủ Dầu Một.']].map(([Icon, title, text]) => { const C = Icon as typeof ShieldCheck; return <article key={title as string}><C /><h3>{title as string}</h3><p>{text as string}</p></article> })}</div></section>
      <section className="section container about-gallery"><div className="wide"><img src={images.store} alt="Không gian cửa hàng Ely Fruit" /></div><div><img src={images.fruit} alt="Trái cây tươi" /></div><div><img src={images.basket} alt="Giỏ quà trái cây" /></div></section>
      <LocalSection />
      <ContactSection />
    </main>
  </>
}

function ContactRail() {
  return <aside className="contact-rail" aria-label="Liên hệ Ely Fruit">
    <span>Liên hệ</span>
    <a className="rail-phone" href={PHONE_LINK} aria-label={`Gọi ${PHONE}`}><Phone /></a>
    <a href={FACEBOOK_URL} target="_blank" rel="noreferrer" aria-label="Facebook Ely Fruit"><img src="https://cdn.simpleicons.org/facebook/1877F2" alt="Facebook" /></a>
    <a href={TIKTOK_URL} target="_blank" rel="noreferrer" aria-label="TikTok Ely Fruit"><img src="https://cdn.simpleicons.org/tiktok/111111" alt="TikTok" /></a>
    <a href={MAP_URL} target="_blank" rel="noreferrer" aria-label="Google Maps Ely Fruit"><img src="https://cdn.simpleicons.org/googlemaps/4285F4" alt="Google Maps" /></a>
  </aside>
}

function Footer() {
  return (
    <>
      <footer className="footer"><div className="container footer-grid"><div className="footer-brand"><Logo light /><p>Trái cây, bánh kẹo nhập khẩu · Giỏ quà cao cấp · Mâm lễ, tráp cưới hỏi.</p><div className="footer-social"><a href={FACEBOOK_URL} target="_blank" rel="noreferrer" aria-label="Facebook Ely Fruit"><MessageCircle /></a><a href={TIKTOK_URL} target="_blank" rel="noreferrer" aria-label="TikTok Ely Fruit"><Music2 /></a><a href={MAP_URL} target="_blank" rel="noreferrer" aria-label="Google Maps Ely Fruit"><MapPin /></a></div></div><nav aria-label="Liên kết chân trang"><h3>Khám phá</h3><a href="#/">Trang chủ</a><a href="#/gifts">Giỏ quà trái cây</a><a href="#/catalogue">Catalogue</a><a href="#/about">Về Ely Fruit</a><a href="#/contact">Liên hệ</a></nav><div><h3>Liên hệ</h3><a href={PHONE_LINK}>{PHONE}</a><a href="mailto:ctythucphamelyfruit@gmail.com">ctythucphamelyfruit@gmail.com</a><a href={MAP_URL} target="_blank" rel="noreferrer">Địa chỉ cửa hàng</a><p>{ADDRESS}</p><p>07:30–21:00 mỗi ngày</p></div><div className="footer-cta"><span className="eyebrow">Cần tư vấn ngay?</span><h3>Chúng tôi giúp bạn chọn món quà phù hợp.</h3><Button href={PHONE_LINK} variant="cream"><Phone /> Gọi {PHONE}</Button></div></div><div className="container footer-bottom"><span>© 2025 Ely Fruit. All rights reserved.</span><span>Tươi lành trong từng món quà.</span></div></footer>
      <div className="mobile-sticky"><a href={PHONE_LINK}><Phone /> Gọi ngay</a><a href={FACEBOOK_URL} target="_blank" rel="noreferrer"><MessageCircle /> Liên hệ</a></div>
    </>
  )
}

export default function App() {
  const [path, setPath] = useState(window.location.hash.slice(1) || '/')
  useEffect(() => {
    const onHash = () => setPath(window.location.hash.slice(1) || '/')
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])
  useEffect(() => {
    const titles: Record<string, string> = {
      '/': 'Ely Fruit | Giỏ quà cao cấp tại Thủ Dầu Một',
      '/gifts': 'Giỏ quà cao cấp | Ely Fruit Thủ Dầu Một',
      '/catalogue': 'Catalogue giỏ quà, mâm lễ | Ely Fruit',
      '/about': 'Về Ely Fruit | Trái cây và quà tặng Thủ Dầu Một',
    }
    document.title = path.startsWith('/product/') ? 'Chi tiết giỏ trái cây | Ely Fruit' : (titles[path] || titles['/'])
    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.name = 'description'
      document.head.appendChild(meta)
    }
    meta.content = 'Ely Fruit cung cấp giỏ quà, giỏ trái cây nhập khẩu, mâm lễ và tráp cưới hỏi tại Thủ Dầu Một. Liên hệ 0981.370.970.'
    const schema = document.createElement('script')
    schema.type = 'application/ld+json'
    schema.id = 'ely-fruit-local-business'
    schema.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      '@id': `${window.location.origin}/#business`,
      name: 'Ely Fruit',
      url: window.location.origin,
      telephone: '+84981370970',
      email: 'ctythucphamelyfruit@gmail.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Số 22 đường 30/4, Phú Lợi',
        addressLocality: 'Thủ Dầu Một',
        addressRegion: 'Hồ Chí Minh',
        addressCountry: 'VN',
      },
      openingHoursSpecification: [{
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '07:30',
        closes: '21:00',
      }],
      sameAs: [FACEBOOK_URL, TIKTOK_URL, MAP_URL],
    })
    document.getElementById(schema.id)?.remove()
    document.head.appendChild(schema)
    return () => schema.remove()
  }, [path])
  let page: React.ReactNode
  if (path === '/gifts') page = <GiftsPage />
  else if (path.startsWith('/product/')) page = <ProductPage slug={path.split('/').pop() || ''} />
  else if (path === '/catalogue') page = <CataloguePage />
  else if (path === '/about') page = <AboutPage />
  else page = <HomePage />
  return <><Header /><ContactRail />{page}<Footer /></>
}
