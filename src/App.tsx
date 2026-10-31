import { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ProductCard } from './components/ProductCard'
import { PageHero } from './components/PageHero'
import { fruitProducts, products, sortProductsByPrice, type FruitProduct, type Product } from './data/catalog'
import { ADDRESS, EMAIL, FACEBOOK_URL, MAP_URL, OPENING_HOURS, PHONE, PHONE_LINK, PRICE_RANGE, SITE_URL, SOCIAL_IMAGE_PATH, TIKTOK_URL, TRUST_METRICS, ZALO_URL } from './data/site'
import { getPageTitle, getRoute } from './app/routing'
import { guides, guideSources, type Guide, type GuideImage } from './data/guides'
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
  PackageCheck,
  Phone,
  Search,
  Send,
  ShieldCheck,
  SquareArrowOutUpRight,
  Sparkles,
  Store,
  X,
  ZoomIn,
} from 'lucide-react'


const images = {
  hero: '/products/hero-fruit-basket.png',
  basket: '/products/ely06-front.png',
  apples: '/products/ely07-front.png',
  fruitBox: '/products/ely11-front.png',
  boxes: '/products/kh13-front.png',
  market: 'https://images.unsplash.com/photo-1609780447631-05b93e5a88ea?auto=format&fit=crop&w=1400&q=85',
  fruit: '/products/kh07-front.png',
  store: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?auto=format&fit=crop&w=1200&q=85',
  grapes: '/products/kh11-front.png',
  gift: '/products/kh01-front.png',
  ceremonialTray: '/catalogue/774362917_122119190679389872_5327334756948379778_n.jpg',
  weddingTray: '/catalogue/774382389_122119926015389872_2431011871162465769_n.jpg',
  colleagueGift: '/catalogue/781805005_122121104535389872_8987291988136903197_n.jpg',
  importedFruit: '/catalogue/787459582_122123550429389872_2941272962711906410_n.jpg',
  premiumGiftBox: '/catalogue/793924956_122124875997389872_422513923435991868_n.jpg',
  tetBasket: '/catalogue/812427189_122127112641389872_1347517099385289311_n.jpg',
  heroGiftBasket: '/hero/760654682_122115472743389872_8303192440324641836_n.jpg',
  heroCorporateGift: '/hero/772853552_122118641781389872_3702766060213897876_n (1).jpg',
  heroTetGift: '/hero/773981840_122119689135389872_7635825443695055975_n.jpg',
  heroAccent: '/hero/783255795_122121343185389872_4119006571327875134_n.jpg',
}

const categories = [
  ['Mâm lễ gia tiên', 'Chuẩn bị trang trọng, cân đối cho ngày lễ quan trọng.', images.ceremonialTray],
  ['Tráp lễ cưới hỏi', 'Chỉn chu từng lễ vật để gửi trọn lời chúc phúc.', images.weddingTray],
  ['Quà tặng đồng nghiệp', 'Lời cảm ơn tinh tế cho những người cùng đồng hành.', images.colleagueGift],
  ['Trái cây nhập khẩu', 'Nguồn gốc rõ ràng, tươi ngon theo mùa.', images.importedFruit],
  ['Hộp quà cao cấp', 'Chỉn chu từ chất liệu hộp đến từng món quà.', images.premiumGiftBox],
  ['Giỏ quà Tết', 'Sắc xuân sang trọng, trao gửi thịnh vượng.', images.tetBasket],
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

const MOBILE_ADDRESS = '22 Đ. 30/4, Phú Lợi, Thủ Dầu Một'

const faqs = [
  ['Ely Fruit có giao giỏ quà tận nơi không?', 'Có. Ely Fruit hỗ trợ giao hàng tại Thủ Dầu Một và các khu vực lân cận. Thời gian, phí giao hàng sẽ được tư vấn theo địa chỉ nhận.'],
  ['Đặt giỏ quà nhanh cần gửi thông tin gì?', 'Bạn có thể gọi trực tiếp để chốt nhanh, hoặc nhắn Zalo kèm ảnh mẫu, ngân sách, địa chỉ giao và thời gian mong muốn để Ely Fruit tư vấn.'],
  ['Có thể đặt giỏ quà theo ngân sách không?', 'Hoàn toàn có thể. Bạn chỉ cần cho biết ngân sách, đối tượng và dịp tặng, đội ngũ sẽ đề xuất mẫu phù hợp nhất.'],
  ['Giỏ quà có thể thay đổi loại trái cây không?', 'Có. Thành phần có thể điều chỉnh theo sở thích, tình trạng trái cây theo mùa và mức ngân sách của bạn.'],
  ['Ely Fruit có nhận làm quà doanh nghiệp số lượng lớn không?', 'Có. Chúng tôi nhận đơn số lượng lớn, hỗ trợ thiết kế theo nhận diện và giao đến nhiều địa chỉ.'],
  ['Có thể thêm thiệp hoặc logo doanh nghiệp không?', 'Có. Ely Fruit hỗ trợ thiệp chúc mừng, tag tên và logo doanh nghiệp tùy theo số lượng đặt.'],
  ['Ely Fruit có làm mâm lễ và tráp cưới hỏi không?', 'Có. Chúng tôi tư vấn mâm lễ, tráp cưới hỏi theo yêu cầu, phong cách và thời gian tổ chức.'],
  ['Có thể xem sản phẩm trực tiếp tại cửa hàng không?', `Có. Mời bạn ghé cửa hàng tại ${ADDRESS}, mở cửa từ 07:30–21:00 mỗi ngày.`],
]

function getProductGuide(product: Product): typeof guides[number] {
  const fallbackGuide = guides[1]!
  if (product.occasion === 'Biếu đối tác' || product.occasion === 'Quà doanh nghiệp') {
    return guides.find(guide => guide.slug === 'gio-trai-cay-bieu-tang-doi-tac') ?? fallbackGuide
  }
  if (product.occasion === 'Thăm bệnh') {
    return guides.find(guide => guide.slug === 'qua-tham-benh-nen-chon-trai-cay-nao') ?? fallbackGuide
  }
  return guides.find(guide => guide.slug === 'gio-trai-cay-500k-nen-chon-gi') ?? fallbackGuide
}

function getScrollBehavior(): ScrollBehavior {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
}

function scrollToHash(hash: string): void {
  window.requestAnimationFrame(() => {
    document.querySelector(hash)?.scrollIntoView({ behavior: getScrollBehavior(), block: 'start' })
  })
}

function routeTo(path: string): void {
  const nextUrl = new URL(path, window.location.origin)
  const isCurrentPage = nextUrl.pathname === window.location.pathname && !nextUrl.hash

  window.history.pushState(null, '', `${nextUrl.pathname}${nextUrl.hash}`)
  window.dispatchEvent(new PopStateEvent('popstate'))

  if (nextUrl.hash) scrollToHash(nextUrl.hash)
  else if (isCurrentPage) window.scrollTo({ top: 0, behavior: getScrollBehavior() })
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

function Header({ currentPath }: { currentPath: string }) {
  const [open, setOpen] = useState(false)
  const [openDrawerSection, setOpenDrawerSection] = useState<'products' | 'guides' | null>(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const links = [
    ['Trang chủ', '/'],
    ['Quy trình', '/#process'],
    ['Về Ely Fruit', '/#about'],
    ['Liên hệ', '/#contact'],
  ]
  const giftLinks = [
    ['Trái cây bán lẻ', '/trai-cay'],
    ['Xem tất cả giỏ quà', '/gio-trai-cay'],
    ['Giỏ quà trái cây', '/gio-trai-cay'],
    ['Quà sinh nhật', '/gio-trai-cay/sinh-nhat'],
    ['Mâm lễ & Tráp cưới', '/catalogue'],
    ['Giỏ quà Tết', '/gio-qua-tet'],
    ['Theo giá 399.000đ', '/gio-trai-cay/399k'],
    ['Theo giá 499.000đ', '/gio-trai-cay/499k'],
    ['Theo giá 599.000đ', '/gio-trai-cay/599k'],
    ['Catalogue tổng hợp', '/catalogue'],
  ]
  const guideLinks = [
    ['Tất cả cẩm nang', '/guide'],
    ...guides.slice(0, 3).map(guide => [guide.title, `/guide/${guide.slug}`]),
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
            <a className={currentPath === '/' ? 'is-active' : ''} href="/">Trang chủ</a>
            <div className={`nav-dropdown ${currentPath.startsWith('/gio-') || currentPath.startsWith('/trai-cay') || currentPath.startsWith('/san-pham') || currentPath === '/catalogue' ? 'is-active' : ''}`}>
              <a href="/#products" aria-haspopup="true">Sản phẩm <ChevronDown size={14} /></a>
              <div className="nav-dropdown-menu nav-dropdown-wide">
                <span>Giỏ quà Ely Fruit · Thủ Dầu Một</span>
                {giftLinks.map(([label, path]) => <a key={label} href={path}>{label}<ArrowRight size={14} /></a>)}
              </div>
            </div>
            {links.slice(1, 3).map(([label, path]) => <a key={label} href={path}>{label}</a>)}
            <div className={`nav-dropdown ${currentPath.startsWith('/guide') ? 'is-active' : ''}`}>
              <a href="/#guides" aria-haspopup="true">Cẩm nang <ChevronDown size={14} /></a>
              <div className="nav-dropdown-menu nav-dropdown-wide guide-menu">
                <span>Chọn quà có gu</span>
                {guideLinks.map(([label, path]) => <a key={path} href={path}>{label}<ArrowRight size={14} /></a>)}
              </div>
            </div>
            <a href="/#contact">Liên hệ</a>
          </nav>
          <div className="header-actions">
            <button className="icon-btn search-button" onClick={() => setSearchOpen(!searchOpen)} aria-label="Tìm kiếm"><Search /></button>
            <a className="hotline desktop-hotline" href={PHONE_LINK}><Phone size={17} /><span><small>Hotline</small>{PHONE}</span></a>
            <Button href={PHONE_LINK} className="desktop-cta order-pulse"><Phone size={16} /> Gọi đặt nhanh</Button>
            <a className="mobile-call" href={PHONE_LINK}><Phone size={19} /></a>
          </div>
        </div>
        {searchOpen && <div className="search-panel container"><Search size={20} /><input autoFocus placeholder="Tìm giỏ quà, mã sản phẩm, dịp tặng..." /><button onClick={() => routeTo('/gio-trai-cay')}>Tìm kiếm</button></div>}
      </header>
      <div className={`mobile-drawer ${open ? 'is-open' : ''}`}>
        <button className="drawer-backdrop" onClick={() => setOpen(false)} aria-label="Đóng menu" />
        <div className="drawer-panel">
          <div className="drawer-head"><Logo /><button className="icon-btn" onClick={() => setOpen(false)}><X /></button></div>
          <nav>
            <a href="/" onClick={() => setOpen(false)}>Trang chủ<ArrowRight size={16} /></a>
            <section className={`drawer-nav-group ${openDrawerSection === 'products' ? 'is-open' : ''}`}>
              <button type="button" onClick={() => setOpenDrawerSection(section => section === 'products' ? null : 'products')} aria-expanded={openDrawerSection === 'products'}>Sản phẩm<ChevronDown size={18} /></button>
              <div className="drawer-subnav">
                {giftLinks.map(([label, path]) => <a href={path} key={label} onClick={() => setOpen(false)}>{label}</a>)}
              </div>
            </section>
            {links.slice(1, 3).map(([label, path]) => <a href={path} key={label} onClick={() => setOpen(false)}>{label}<ArrowRight size={16} /></a>)}
            <section className={`drawer-nav-group ${openDrawerSection === 'guides' ? 'is-open' : ''}`}>
              <button type="button" onClick={() => setOpenDrawerSection(section => section === 'guides' ? null : 'guides')} aria-expanded={openDrawerSection === 'guides'}>Cẩm nang<ChevronDown size={18} /></button>
              <div className="drawer-subnav">{guideLinks.map(([label, path]) => <a href={path} key={path} onClick={() => setOpen(false)}>{label}</a>)}</div>
            </section>
            <a href="/#contact" onClick={() => setOpen(false)}>Liên hệ<ArrowRight size={16} /></a>
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

function CategoryGrid() {
  return <div className="category-grid">{categories.map(([name, desc, image], index) => (
    <article className={`category-card category-${index + 1}`} key={name}>
      <img src={image} alt={name} />
      <div className="category-overlay"><span>0{index + 1}</span><h3>{name}</h3><p>{desc}</p><button onClick={() => routeTo(name === 'Trái cây nhập khẩu' ? '/trai-cay' : '/gio-trai-cay')}>Xem sản phẩm <ArrowRight size={16} /></button></div>
    </article>
  ))}</div>
}

function FilterBar({ active, setActive }: { active: string; setActive: (value: string) => void }) {
  const [open, setOpen] = useState(false)
  const groups = [
    ['Khoảng giá', ['399.000đ', '499.000đ', '599.000đ', '699.000đ', '800.000đ', '1.000.000đ', '1.200.000đ', '1.800.000đ', '2.000.000đ']],
    ['Dịp tặng', ['Tết', 'Sinh nhật', 'Biếu đối tác', 'Quà doanh nghiệp', 'Thăm bệnh', 'Cảm ơn', 'Cưới hỏi']],
    ['Loại sản phẩm', ['Giỏ trái cây', 'Hộp quà', 'Set quà cao cấp', 'Mâm lễ', 'Tráp cưới']],
    ['Phong cách', ['Sang trọng', 'Hiện đại', 'Tối giản', 'Truyền thống']],
  ]
  const content = <>{groups.map(([title, options]) => <div className="filter-group" key={title as string}><h4>{title}</h4>{(options as string[]).map(option => <label className={active === option ? 'is-selected' : ''} key={option}><input type="radio" name="filter" checked={active === option} onChange={() => { setActive(option); setOpen(false) }} /><span>{option}</span></label>)}</div>)}</>
  return (
    <>
      <aside className="filter-sidebar">{content}</aside>
      <button className={`mobile-filter-button ${active ? 'has-filter' : ''}`} onClick={() => setOpen(true)}><span>{active ? `Đang lọc: ${active}` : 'Bộ lọc sản phẩm'}</span><strong>{active ? '1' : '0'}</strong></button>
      <div className={`filter-sheet ${open ? 'is-open' : ''}`}><button className="drawer-backdrop" onClick={() => setOpen(false)} /><div className="filter-sheet-panel"><div className="sheet-handle" /><div className="sheet-head"><h3>Bộ lọc sản phẩm</h3><button onClick={() => setOpen(false)}><X /></button></div><div className="sheet-content">{content}</div><Button onClick={() => setOpen(false)}>Xem sản phẩm phù hợp</Button></div></div>
    </>
  )
}

function TrustMetrics() {
  return <section className="trust-metrics" aria-label="Những con số được khách hàng tin tưởng"><div className="container trust-metrics-grid"><div className="trust-metrics-intro"><span className="eyebrow">Được tin chọn tại Thủ Dầu Một</span><p>Những con số được công khai từ các kênh của Ely Fruit và hành trình phục vụ khách hàng.</p></div>{TRUST_METRICS.map(metric => { const content = <><strong>{metric.value}</strong><span>{metric.label}</span><small>{metric.detail}</small></>; return metric.href ? <a key={metric.label} href={metric.href} target="_blank" rel="noreferrer">{content}<SquareArrowOutUpRight size={15} /></a> : <div key={metric.label}>{content}</div> })}</div></section>
}

interface HeroProps {
  onVisibilityChange: (isVisible: boolean) => void
}

function Hero({ onVisibilityChange }: HeroProps) {
  const heroRef = useRef<HTMLElement>(null)
  const [isHeroVisible, setIsHeroVisible] = useState(true)

  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return

    const observer = new IntersectionObserver(([entry]) => {
      setIsHeroVisible(entry.isIntersecting)
      onVisibilityChange(entry.isIntersecting)
    }, { threshold: .35 })
    observer.observe(hero)
    return () => observer.disconnect()
  }, [onVisibilityChange])

  return (
    <section className="hero" id="home-hero" ref={heroRef}>
      <img className="hero-banner" src="/hero/ely-fruit-banner.png" alt="Hộp quà trái cây cao cấp Ely Fruit với dưa lưới, dâu, nho xanh, táo, cam và kiwi" fetchPriority="high" />
      <div className="container hero-grid">
        <div className={isHeroVisible ? 'hero-content is-visible' : 'hero-content'}>
          <span className="eyebrow hero-reveal hero-reveal-eyebrow">Trao tặng điều tươi lành</span>
          <h1><span className="hero-reveal hero-reveal-title">Giỏ quà cao cấp</span><em className="hero-reveal hero-reveal-brand">Ely Fruit</em></h1>
          <p className="hero-reveal hero-reveal-copy">Trái cây nhập khẩu, giỏ quà, mâm lễ và tráp cưới hỏi tại Thủ Dầu Một.</p>
          <div className="hero-buttons hero-reveal hero-reveal-actions"><Button onClick={() => routeTo('/gio-trai-cay')}>Xem giỏ quà <ArrowRight size={18} /></Button><Button href={ZALO_URL} variant="cream" className="mobile-zalo-pulse">Nhắn Zalo tư vấn</Button></div>
          <div className="hero-meta hero-reveal hero-reveal-meta"><a href={PHONE_LINK}><Phone size={17} />{PHONE}</a><span><Clock3 size={17} />07:30–21:00</span><span><MapPin size={17} />Thủ Dầu Một</span></div>
        </div>
      </div>
      <div className="hero-marquee" aria-label="Dịch vụ Ely Fruit"><div className="hero-marquee-track"><span>Trái cây nhập khẩu</span><span>Giỏ quà cao cấp</span><span>Mâm lễ chỉn chu</span><span>Tráp cưới hỏi</span><span>Giao tận nơi tại Thủ Dầu Một</span><span aria-hidden="true">Trái cây nhập khẩu</span><span aria-hidden="true">Giỏ quà cao cấp</span><span aria-hidden="true">Mâm lễ chỉn chu</span><span aria-hidden="true">Tráp cưới hỏi</span><span aria-hidden="true">Giao tận nơi tại Thủ Dầu Một</span></div></div>
    </section>
  )
}

function WelcomeSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting)
    }, { threshold: .35 })
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section className={isVisible ? 'welcome-section is-visible' : 'welcome-section'} aria-labelledby="welcome-heading" ref={sectionRef}>
      <div className="container welcome-layout">
        <div className="welcome-heading">
          <span className="eyebrow welcome-reveal welcome-reveal-eyebrow">Lời ngỏ từ Ely Fruit</span>
          <h2 id="welcome-heading" className="welcome-reveal welcome-reveal-title">Một món quà tươi lành,<br />một lời chúc được nâng niu.</h2>
        </div>
        <div className="welcome-message welcome-reveal welcome-reveal-copy">
          <span className="welcome-quote" aria-hidden="true">“</span>
          <p>Chào mừng bạn đến với thế giới quà tặng từ thiên nhiên! Tại đây, mỗi giỏ trái cây nhập khẩu đều được chăm chút tỉ mỉ từ nguồn trái cây tươi ngon, chất lượng cao. Kết hợp cùng hoa tươi và các sản phẩm cao cấp, chúng tôi mang đến cho bạn những món quà vừa thiết thực, ý nghĩa, lại vô cùng sang trọng và hiện đại cho mọi dịp đặc biệt.</p>
        </div>
      </div>
    </section>
  )
}

function LocalSection() {
  return (
    <section className="section local-section" aria-labelledby="local-heading">
      <div className="container local-grid">
        <div className="local-content">
          <span className="eyebrow">Ghé vườn quà Ely Fruit</span>
          <h2 id="local-heading">Ghé cửa hàng chọn quà</h2>
          <p>Xem mẫu quà thực tế và nhận tư vấn theo dịp tặng, ngân sách của bạn.</p>
          <div className="contact-lines"><div><MapPin /><span><small>Địa chỉ cửa hàng</small><strong>{ADDRESS}</strong></span></div><div><Clock3 /><span><small>Mở cửa mỗi ngày</small><strong>07:30–21:00</strong></span></div><div><Phone /><span><small>Tư vấn & đặt quà</small><strong>{PHONE}</strong></span></div></div>
          <Button href={MAP_URL}>Chỉ đường đến cửa hàng <ArrowRight size={18} /></Button>
        </div>
        <div className="map-card">
          <div className="map-card-label"><span>Điểm hẹn tại Phú Lợi</span><small>Thủ Dầu Một · Bình Dương</small></div>
          <iframe
            className="real-map"
            src="https://www.google.com/maps?q=S%E1%BB%91+22+%C4%91%C6%B0%E1%BB%9Dng+30%2F4%2C+Ph%C3%BA+L%E1%BB%A3i%2C+Th%E1%BB%A7+D%E1%BA%A7u+M%E1%BB%99t&output=embed"
            title="Bản đồ cửa hàng Ely Fruit tại Thủ Dầu Một"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
          <div className="map-info"><img src="/ely-fruit-logo.png" alt="" /><span><strong>Ely Fruit</strong><small>Giỏ quà & trái cây cao cấp</small></span><a href={MAP_URL} target="_blank" rel="noreferrer" aria-label="Mở chỉ đường đến Ely Fruit trên Google Maps"><ArrowRight /></a></div>
        </div>
      </div>
    </section>
  )
}

function FAQSection() {
  const [open, setOpen] = useState(-1)
  const [showAll, setShowAll] = useState(false)
  return <section className="section faq-section"><div className="container faq-grid"><div className="faq-intro"><span className="eyebrow">Câu hỏi thường gặp</span><h2>Thông tin trước khi đặt quà</h2><p>Mọi món quà đều có thể được tư vấn và điều chỉnh để phù hợp hơn với người nhận.</p><Button href={FACEBOOK_URL} variant="secondary">Gửi câu hỏi cho Ely Fruit</Button></div><div className={`accordion ${showAll ? 'show-all' : ''}`}>{faqs.map(([q, a], i) => <article className={open === i ? 'open' : ''} key={q}><button onClick={() => setOpen(open === i ? -1 : i)}><span>{q}</span><ChevronDown /></button><div><p>{a}</p></div></article>)}<button type="button" className="faq-more-button" onClick={() => setShowAll(isShowingAll => !isShowingAll)} aria-expanded={showAll}>{showAll ? 'Thu gọn câu hỏi' : `Xem thêm ${faqs.length - 3} câu hỏi`}<ChevronDown /></button></div></div></section>
}

interface ContactRequest {
  name: string
  phone: string
  occasion: string
  budget: string
  note: string
}

const INITIAL_CONTACT_REQUEST: ContactRequest = {
  name: '',
  phone: '',
  occasion: '',
  budget: '',
  note: '',
}

function ContactForm({ compact = false }: { compact?: boolean }) {
  const [request, setRequest] = useState<ContactRequest>(INITIAL_CONTACT_REQUEST)

  function updateRequest(field: keyof ContactRequest, value: string): void {
    setRequest(currentRequest => ({ ...currentRequest, [field]: value }))
  }

  function submit(e: FormEvent) {
    e.preventDefault()

    const message = [
      'Chào Ely Fruit,',
      `Tôi là ${request.name}.`,
      `Số điện thoại: ${request.phone}.`,
      `Tôi cần giỏ quà ${request.occasion.toLowerCase()}, ngân sách ${request.budget}.`,
      request.note ? `Ghi chú: ${request.note}.` : '',
    ].filter(Boolean).join('\n')

    window.open(`${ZALO_URL}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <form id={compact ? 'contact-form' : undefined} className={`contact-form ${compact ? 'compact-form' : ''}`} onSubmit={submit}>
      <div className="field-row"><label>Họ và tên<input required value={request.name} onChange={event => updateRequest('name', event.target.value)} placeholder="Nguyễn Anh" /></label><label>Số điện thoại<input required type="tel" value={request.phone} onChange={event => updateRequest('phone', event.target.value)} placeholder="09xx xxx xxx" /></label></div>
      <div className="field-row"><label>Dịp tặng<select required value={request.occasion} onChange={event => updateRequest('occasion', event.target.value)}><option value="" disabled>Chọn dịp tặng</option><option>Sinh nhật</option><option>Biếu đối tác</option><option>Quà doanh nghiệp</option><option>Cưới hỏi</option><option>Khác</option></select></label><label>Ngân sách<select required value={request.budget} onChange={event => updateRequest('budget', event.target.value)}><option value="" disabled>Chọn ngân sách</option><option>Dưới 500.000đ</option><option>500.000đ–1.000.000đ</option><option>Trên 1.000.000đ</option></select></label></div>
      <label>Ghi chú<textarea rows={compact ? 3 : 4} value={request.note} onChange={event => updateRequest('note', event.target.value)} placeholder="Bạn muốn giỏ quà gồm những gì, giao khi nào..." /></label>
      <Button type="submit">Nhắn Zalo nhận tư vấn <Send size={17} /></Button>
      <small className="privacy-note">Zalo sẽ mở với yêu cầu tư vấn đã được soạn sẵn để bạn gửi trực tiếp cho Ely Fruit.</small>
    </form>
  )
}

function ContactSection() {
  return <section className="section contact-section"><div className="container contact-wrap"><div className="contact-copy"><span className="eyebrow">Tư vấn riêng cho bạn</span><h2>Bạn cần tư vấn giỏ quà?</h2><p>Để lại nhu cầu, Ely Fruit sẽ gợi ý mẫu phù hợp với dịp tặng và ngân sách.</p><div className="contact-mini"><a href={PHONE_LINK}><Phone /> <span><small>Gọi trực tiếp</small><strong>{PHONE}</strong></span></a><a href={ZALO_URL} target="_blank" rel="noreferrer"><MessageCircle /> <span><small>Nhắn tin nhanh</small><strong>Zalo Ely Fruit</strong></span></a><a href={FACEBOOK_URL} target="_blank" rel="noreferrer"><MessageCircle /> <span><small>Cộng đồng</small><strong>Facebook Ely Fruit</strong></span></a></div></div><ContactForm compact /></div></section>
}

function DailyFruitCarousel() {
  const railRef = useRef<HTMLDivElement>(null)

  function scrollRail(direction: -1 | 1): void {
    railRef.current?.scrollBy({ left: direction * 320, behavior: getScrollBehavior() })
  }

  return <section className="daily-fruit" aria-labelledby="daily-fruit-heading"><div className="container"><div className="daily-fruit-header"><div><span className="eyebrow">Tuyển chọn theo mùa</span><h2 id="daily-fruit-heading">Trái cây tươi mỗi ngày</h2><p>Chọn nhanh trái cây nhập khẩu tươi ngon, cập nhật theo từng đợt hàng.</p></div><div className="daily-fruit-actions"><a href="/trai-cay">Xem tất cả <ArrowRight size={16} /></a><div><button type="button" onClick={() => scrollRail(-1)} aria-label="Xem trái cây trước"><ChevronLeft /></button><button type="button" onClick={() => scrollRail(1)} aria-label="Xem thêm trái cây"><ChevronRight /></button></div></div></div><div className="daily-fruit-rail" ref={railRef}>{fruitProducts.map(fruit => <article className="daily-fruit-card" key={fruit.slug}><a className="daily-fruit-detail" href="/trai-cay"><img src={fruit.image} alt={fruit.name} loading="lazy" /><span>{fruit.origin}</span><strong>{fruit.name}</strong></a><a className="daily-fruit-order" href={ZALO_URL} target="_blank" rel="noreferrer" aria-label={`Đặt nhanh ${fruit.name} qua Zalo`}>Đặt nhanh <ArrowRight size={14} /></a></article>)}</div></div></section>
}

interface HomePageProps {
  onHeroVisibilityChange: (isVisible: boolean) => void
}

function HomePage({ onHeroVisibilityChange }: HomePageProps) {
  const featuredProductSlugs = ['ely-06', 'ely-07', 'ely-10', 'kh-13', 'ely-12', 'kh-17', 'ely-16', 'ely-18']
  const featuredProducts = products.filter(product => featuredProductSlugs.includes(product.slug))

  return <>
    <Hero onVisibilityChange={onHeroVisibilityChange} />
    <TrustMetrics />
    <WelcomeSection />
    <main>
      <section className="section categories-section"><div className="container"><div className="category-heading"><SectionHeading eyebrow="Danh mục" title="Chọn quà theo nhu cầu" text="Tìm nhanh giỏ quà, trái cây, mâm lễ và quà doanh nghiệp phù hợp." action={<Button href="/catalogue" variant="ghost">Xem catalogue <ArrowRight size={17} /></Button>} /></div><CategoryGrid /></div></section>
      <DailyFruitCarousel />
      <section id="products" className="section products-section landing-anchor"><div className="container"><SectionHeading eyebrow="Sản phẩm" title="Giỏ quà Ely Fruit" text="Giá, mã sản phẩm và thành phần được hiển thị rõ ràng để bạn dễ lựa chọn." action={<Button href="/gio-trai-cay" variant="secondary">Xem tất cả giỏ quà</Button>} /><div className="product-grid mobile-snap-rail">{featuredProducts.map(product => <ProductCard key={product.slug} product={product} />)}</div></div></section>
      <section id="process" className="section order-steps landing-anchor"><div className="container"><div className="process-heading-wrap"><SectionHeading eyebrow="Đặt quà đơn giản" title="Ba bước để gửi một món quà chỉn chu" text="Từ lúc chọn mẫu đến khi người nhận mở quà, Ely Fruit đồng hành cùng bạn." /><span className="process-mark" aria-hidden="true">Từ vườn đến tay người nhận</span></div><div className="process-timeline"><article><span className="process-step">01</span><div className="process-icon"><Gift /></div><h3>Chọn mẫu</h3><p>Xem nhanh các mẫu theo ngân sách, dịp tặng và phong cách bạn muốn.</p><a href="/gio-trai-cay">Khám phá giỏ quà <ArrowRight size={15} /></a></article><article><span className="process-step">02</span><div className="process-icon"><MessageCircle /></div><h3>Xác nhận</h3><p>Nhắn Zalo để thống nhất thành phần, thiệp, ngân sách và thời gian chuẩn bị.</p><a href={ZALO_URL} target="_blank" rel="noreferrer">Nhắn Zalo tư vấn <ArrowRight size={15} /></a></article><article><span className="process-step">03</span><div className="process-icon"><PackageCheck /></div><h3>Giao nhận</h3><p>Xác nhận địa chỉ và khung giờ trước khi hoàn thiện đơn quà chỉn chu.</p><a href={PHONE_LINK}>Gọi xác nhận đơn <ArrowRight size={15} /></a></article></div></div></section>
      <div id="about" className="landing-anchor"><LocalSection /></div>
      <FAQSection />
      <section id="guides" className="section guide-preview landing-anchor"><div className="container"><SectionHeading eyebrow="Cẩm nang" title="Gợi ý chọn quà từ Ely Fruit" text="Một vài hướng dẫn thực tế để chọn giỏ quà đúng dịp và đúng ngân sách." action={<Button href="/guide" variant="ghost">Xem tất cả cẩm nang <ArrowRight size={17} /></Button>} /><div className="guide-grid">{guides.slice(0, 4).map(guide => <article key={guide.slug}><a className="guide-card-image" href={`/guide/${guide.slug}`}><img src={getGuideCardImage(guide)} alt={guide.title} loading="lazy" /></a><div className="guide-card-content"><span className="guide-number">{guide.category}</span><h2><a href={`/guide/${guide.slug}`}>{guide.title}</a></h2><a className="guide-read-link" href={`/guide/${guide.slug}`}>Đọc gợi ý <ArrowRight size={16} /></a></div></article>)}</div></div></section>
      <div id="contact" className="landing-anchor"><ContactSection /></div>
    </main>
  </>
}

function Breadcrumb({ items }: { items: string[] }) {
  return <div className="breadcrumb"><button onClick={() => routeTo('/')}>Trang chủ</button>{items.map(item => <span key={item}><ChevronRight />{item}</span>)}</div>
}

type SortOption = 'featured' | 'newest' | 'price-ascending' | 'price-descending'

const PRICE_LISTING_HEROES: Record<string, { title: string; text: string }> = {
  '399.000đ': {
    title: 'Giỏ trái cây 399K',
    text: 'Các mẫu giỏ trái cây 399.000đ tại Ely Fruit, phù hợp tặng sinh nhật, thăm hỏi, cảm ơn và người thân.',
  },
  '499.000đ': {
    title: 'Giỏ trái cây 499K',
    text: 'Khám phá các mẫu giỏ trái cây 499.000đ được Ely Fruit chuẩn bị chỉn chu, phù hợp sinh nhật, thăm hỏi và biếu tặng.',
  },
  '599.000đ': {
    title: 'Giỏ trái cây 599K',
    text: 'Các mẫu giỏ trái cây 599.000đ với thiết kế đầy đặn, phù hợp tặng gia đình, đối tác, sinh nhật và các dịp chúc mừng.',
  },
}

function GiftsPage({ initialFilter = '' }: { initialFilter?: string }) {
  const [active, setActive] = useState(initialFilter)
  const [sort, setSort] = useState<SortOption>('featured')
  const shown = useMemo(() => {
    let list = [...products]
    if (active.endsWith('đ')) list = list.filter(p => p.price === active)
    else if (['Giỏ trái cây', 'Hộp quà', 'Set quà cao cấp'].includes(active)) list = list.filter(p => p.type === active)
    else if (active) list = list.filter(p => p.occasion === active || p.tag === active)
    if (sort === 'price-ascending') return sortProductsByPrice(list, 'ascending')
    if (sort === 'price-descending') return sortProductsByPrice(list, 'descending')
    return list
  }, [active, sort])
  const hero = PRICE_LISTING_HEROES[initialFilter] ?? {
    title: 'Giỏ Quà Cao Cấp',
    text: 'Các mẫu giỏ quà tại Thủ Dầu Một có giá, mã hàng và thành phần rõ ràng. Lọc nhanh theo ngân sách, dịp tặng hoặc loại sản phẩm.',
  }
  return <>
    <PageHero onHome={() => routeTo('/')} eyebrow="Giỏ quà Ely Fruit" title={hero.title} text={hero.text} image={images.basket} />
    <main className="listing-section container">
      <div className="listing-toolbar"><div><span className="eyebrow">Danh mục giỏ quà</span><strong>{shown.length} sản phẩm</strong><span>Giá, mã hàng và thành phần rõ ràng · Chọn một mẫu để xem chi tiết</span></div><label>Sắp xếp<select value={sort} onChange={e => setSort(e.target.value as SortOption)}><option value="featured">Nổi bật</option><option value="newest">Mới nhất</option><option value="price-ascending">Giá thấp → cao</option><option value="price-descending">Giá cao → thấp</option></select></label></div>
      {active && <div className="active-filters"><span>Đang lọc:</span><button onClick={() => setActive('')}>{active}<X size={14} /></button><button className="clear-filter" onClick={() => setActive('')}>Xóa tất cả</button></div>}
      <div className="listing-layout"><FilterBar active={active} setActive={setActive} /><div>{shown.length ? <div className="product-grid listing-grid">{shown.map(p => <ProductCard key={p.slug} product={p} />)}</div> : <div className="empty-state"><Gift /><h3>Chưa có sản phẩm phù hợp</h3><p>Hãy thử một tiêu chí khác hoặc liên hệ để Ely Fruit thiết kế riêng.</p><Button onClick={() => setActive('')}>Xem tất cả sản phẩm</Button></div>}</div></div>
    </main>
    <ContactSection />
  </>
}

function FruitCard({ fruit }: { fruit: FruitProduct }) {
  return <article className="fruit-card">
    <img src={fruit.image} alt={fruit.name} loading="lazy" />
    <div className="fruit-card-copy">
      <div className="fruit-card-meta"><span>{fruit.origin}</span>{fruit.tag && <strong>{fruit.tag}</strong>}</div>
      <span className="fruit-card-code">{fruit.code} · {fruit.category}</span>
      <h2>{fruit.name}</h2>
      <p>{fruit.description}</p>
      <div className="fruit-card-bottom"><strong>{fruit.price}</strong><a href={ZALO_URL} target="_blank" rel="noreferrer">Đặt nhanh <ArrowRight size={15} /></a></div>
    </div>
  </article>
}

function FruitPage() {
  const categories = ['Tất cả', 'Táo', 'Nho', 'Cam quýt', 'Kiwi', 'Dưa', 'Lê'] as const
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>('Tất cả')
  const shown = activeCategory === 'Tất cả' ? fruitProducts : fruitProducts.filter(fruit => fruit.category === activeCategory)

  return <>
    <PageHero onHome={() => routeTo('/')} eyebrow="Trái cây mỗi ngày" title="Trái cây tươi, tuyển chọn kỹ" text="Những loại trái cây nhập khẩu được Ely Fruit chọn theo mùa, tư vấn theo nhu cầu và cập nhật giá thực tế mỗi ngày." image={fruitProducts[5]!.image} />
    <main className="fruit-page">
      <section className="fruit-assurance"><div className="container fruit-assurance-grid"><div><span>01</span><p><strong>Nguồn gốc rõ ràng</strong>Chọn lọc theo từng lô hàng.</p></div><div><span>02</span><p><strong>Cập nhật mỗi ngày</strong>Giá và độ tươi theo mùa thực tế.</p></div><div><span>03</span><p><strong>Chọn đúng nhu cầu</strong>Tư vấn dùng tại nhà hoặc biếu tặng.</p></div></div></section>
      <section className="section fruit-selection"><div className="container"><SectionHeading eyebrow="Chọn theo sở thích" title="Tươi ngon cho từng ngày" text="Một tuyển chọn gọn gàng để bạn dễ chọn loại trái cây mình yêu thích." /><div className="fruit-category-rail" role="tablist" aria-label="Nhóm trái cây">{categories.map(category => <button className={activeCategory === category ? 'is-active' : ''} key={category} onClick={() => setActiveCategory(category)} role="tab" aria-selected={activeCategory === category}>{category}</button>)}</div><div className="fruit-grid">{shown.map(fruit => <FruitCard key={fruit.slug} fruit={fruit} />)}</div></div></section>
      <section className="fruit-gift-bridge"><div className="container fruit-gift-bridge-content"><div><span className="eyebrow">Từ trái cây đến món quà</span><h2>Muốn làm thành một giỏ quà?</h2><p>Chọn mẫu giỏ quà sẵn có hoặc gửi nhu cầu để Ely Fruit gợi ý cách phối phù hợp với người nhận và ngân sách.</p></div><Button href="/gio-trai-cay" variant="cream">Khám phá giỏ quà <ArrowRight size={18} /></Button></div></section>
    </main>
    <ContactSection />
  </>
}

function ProductPage({ slug }: { slug: string }) {
  const product = products.find(p => p.slug === slug)
  if (!product) return <main className="section container"><h1>404 — Không tìm thấy sản phẩm</h1><p>Sản phẩm bạn tìm không tồn tại hoặc đã được chuyển đi.</p><a className="btn btn-primary" href="/gio-trai-cay">Xem giỏ quà</a></main>
  const gallery = [product.image, product.imageBack]
  const productGuide = getProductGuide(product)
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
          <div className="detail-actions"><Button href={PHONE_LINK}><Phone size={18} /> Gọi đặt nhanh</Button><Button href={ZALO_URL} variant="secondary"><MessageCircle size={18} /> Nhắn Zalo gửi yêu cầu</Button><Button href={FACEBOOK_URL} variant="ghost"><MessageCircle size={18} /> Nhắn Facebook</Button></div><p className="detail-contact-note">Gửi ảnh mẫu, ngân sách, địa chỉ giao và thời gian mong muốn qua Zalo để được tư vấn.</p>
        </div>
      </div>
      <div className="product-copy"><article><span className="eyebrow">Chi tiết sản phẩm</span><h2>Món quà tươi lành, được chuẩn bị bằng sự chỉn chu</h2><p>{product.name} được phối hợp hài hòa giữa hương vị, màu sắc và hình thức. Mỗi loại trái cây đều được kiểm tra trước khi sắp xếp và hoàn thiện tại cửa hàng.</p><h3>Chuẩn bị để trao tặng</h3><p>Hãy gửi Ely Fruit ngân sách, thời gian giao và lời nhắn mong muốn. Đội ngũ sẽ xác nhận mẫu thực tế, thiệp và khung giờ phù hợp trước khi hoàn thiện.</p><h3>Hướng dẫn bảo quản</h3><p>Nên sử dụng sớm để đảm bảo độ tươi ngon. Bảo quản nơi thoáng mát hoặc ngăn mát tủ lạnh tùy loại trái cây.</p><a className="product-guide-link" href={`/guide/${productGuide.slug}`}><span>Chọn theo dịp</span><strong>{productGuide.title}</strong><small>Đọc cẩm nang để cân nhắc món quà phù hợp hơn.</small><ArrowRight size={17} /></a></article><aside><h3>Chính sách giao hàng</h3><ul><li><Check /> Hỗ trợ giao tận nơi</li><li><Check /> Xác nhận mẫu trước khi giao</li><li><Check /> Tư vấn khung giờ phù hợp</li><li><Check /> Hỗ trợ thiệp theo yêu cầu</li></ul></aside></div>
      <section className="related"><SectionHeading eyebrow="Có thể bạn sẽ thích" title="Sản phẩm tương tự" /><div className="product-grid">{products.filter(p => p.slug !== product.slug).slice(0, 4).map(p => <ProductCard key={p.slug} product={p} />)}</div></section>
    </main>
    <FAQSection />
    {zoom && <div className="lightbox"><button onClick={() => setZoom(false)}><X /></button><img src={gallery[activeImage]} alt={product.name} /></div>}
  </>
}

function CataloguePage() {
  return <>
    <PageHero onHome={() => routeTo('/')} eyebrow="Danh mục sản phẩm" title="Catalogue Ely Fruit" text="Xem nhanh giỏ quà, quà doanh nghiệp, mâm lễ, tráp cưới hỏi và trái cây nhập khẩu." image={images.boxes} />
    <main className="section container">
      <div className="catalogue-intro"><span>08 bộ sưu tập</span><p>Mỗi catalogue là một tuyển tập gợi ý được cập nhật theo mùa, giúp bạn chọn quà nhanh hơn mà vẫn giữ dấu ấn riêng.</p></div>
      <div className="catalogue-grid">{catalogues.map(([name, count, image], i) => <article key={name}><div className="catalogue-cover"><img src={image} alt={name} /><span>ELY<br />FRUIT</span><small>ELY FRUIT COLLECTION</small></div><div className="catalogue-info"><span>0{i + 1}</span><div><h2>{name}</h2><p>{count} · Tuyển chọn theo mùa</p><button onClick={() => routeTo('/gio-trai-cay')}>Xem catalogue <ArrowRight /></button></div></div></article>)}</div>
    </main>
    <ContactSection />
  </>
}

function AboutPage() {
  return <>
    <PageHero onHome={() => routeTo('/')} eyebrow="Về thương hiệu" title="Về Ely Fruit" text="Cửa hàng trái cây và quà tặng cao cấp tại Thủ Dầu Một, chú trọng chất lượng thật và cách chuẩn bị chỉn chu." image={images.market} />
    <main>
      <section className="section container about-story"><div><span className="eyebrow">Ely Fruit là ai?</span><h2>Một cửa hàng địa phương với tiêu chuẩn quà tặng chỉn chu</h2></div><div><p>Ely Fruit chuyên trái cây tươi, trái cây nhập khẩu, bánh kẹo nhập khẩu, giỏ quà cao cấp, mâm lễ và tráp cưới hỏi tại Thủ Dầu Một.</p><p>Chúng tôi không chỉ bán một sản phẩm có sẵn. Mỗi nhu cầu đều được tư vấn theo dịp tặng, người nhận, ngân sách và thông điệp bạn muốn gửi trao.</p></div></section>
      <section className="values-section"><div className="container values-grid">{[[ShieldCheck, 'Tuyển chọn kỹ', 'Ưu tiên độ tươi, nguồn gốc và hình thức trước khi gói.'], [Sparkles, 'Hoàn thiện đẹp', 'Phối màu, chất liệu và thiệp thành một tổng thể tinh tế.'], [HeartHandshake, 'Tư vấn thật', 'Đề xuất đúng nhu cầu, không làm phức tạp việc chọn quà.'], [Store, 'Cửa hàng thực tế', 'Dễ dàng ghé xem và trao đổi trực tiếp tại Thủ Dầu Một.']].map(([Icon, title, text]) => { const C = Icon as typeof ShieldCheck; return <article key={title as string}><C /><h3>{title as string}</h3><p>{text as string}</p></article> })}</div></section>
      <section className="section container about-gallery"><div className="wide"><img src={images.store} alt="Không gian cửa hàng Ely Fruit" /></div><div><img src={images.fruit} alt="Trái cây tươi" /></div><div><img src={images.basket} alt="Giỏ quà trái cây" /></div></section>
      <LocalSection />
      <ContactSection />
    </main>
  </>
}

function InfoPage({ title, eyebrow, intro, sections }: { title: string; eyebrow: string; intro: string; sections: Array<{ heading: string; text: string }> }) {
  return <>
    <PageHero onHome={() => routeTo('/')} eyebrow={eyebrow} title={title} text={intro} image={images.fruit} />
    <main className="section container info-page">
      <div className="info-page-copy">
        {sections.map(section => <article key={section.heading}><h2>{section.heading}</h2><p>{section.text}</p></article>)}
      </div>
      <ContactSection />
    </main>
  </>
}

function ContactPage() {
  return <>
    <PageHero onHome={() => routeTo('/')} eyebrow="Kết nối với Ely Fruit" title="Liên hệ" text="Ghé cửa hàng, gọi điện hoặc nhắn tin để được tư vấn giỏ quà phù hợp." image={images.store} />
    <main className="section container">
      <div className="contact-info-grid"><article><MapPin /><h3>Địa chỉ</h3><p>{ADDRESS}</p><a href={MAP_URL} target="_blank" rel="noreferrer">Mở Google Maps <ArrowRight size={15} /></a></article><article><Phone /><h3>Số điện thoại</h3><p>{PHONE}</p><a href={PHONE_LINK}>Gọi ngay <ArrowRight size={15} /></a></article><article><Clock3 /><h3>Giờ mở cửa</h3><p>07:30–21:00 mỗi ngày</p><span>Luôn sẵn sàng tư vấn</span></article><article><MessageCircle /><h3>Mạng xã hội</h3><p>Facebook và TikTok Ely Fruit</p><a href={FACEBOOK_URL} target="_blank" rel="noreferrer">Nhắn tin Facebook <ArrowRight size={15} /></a></article></div>
      <div className="contact-map-card"><div><span className="eyebrow">Cửa hàng thực tế</span><h2>Ghé Ely Fruit để xem quà trực tiếp</h2><p>Đội ngũ tư vấn tại cửa hàng sẽ giúp bạn chọn sản phẩm theo ngân sách, dịp tặng và khu vực giao hàng.</p><Button href={MAP_URL} variant="secondary">Chỉ đường trên Google Maps <MapPin size={16} /></Button></div><img src={images.store} alt="Cửa hàng Ely Fruit tại Thủ Dầu Một" /></div>
      <ContactSection />
    </main>
  </>
}


interface GuideImageProps {
  image: GuideImage
  priority?: boolean
}

function GuideFigure({ image, priority = false }: GuideImageProps) {
  return <figure className="guide-article-figure">
    <img src={image.fallback} alt={image.alt} width={image.width} height={image.height} loading={priority ? 'eager' : 'lazy'} decoding={priority ? 'auto' : 'async'} fetchPriority={priority ? 'high' : 'auto'} />
    <figcaption>{image.caption}</figcaption>
  </figure>
}

interface GuideArticleProps {
  guide: Guide
}

function getGuideCardImage(guide: Guide): string {
  return guide.heroImage?.fallback ?? guide.image
}

function GuideArticle({ guide }: GuideArticleProps) {
  const sections = guide.sections ?? [{ id: 'goi-y', heading: 'Chọn đúng món quà cho đúng người nhận', paragraphs: [`${guide.intro} Tại Ely Fruit, mỗi giỏ quà được tư vấn theo ngân sách, dịp tặng và khu vực giao nhận tại Thủ Dầu Một.`], points: guide.points }]
  const recommendedProducts = (guide.productRecommendations ?? []).flatMap(recommendation => {
    const product = products.find(item => item.slug === recommendation.productSlug)
    return product ? [{ product, suitableFor: recommendation.suitableFor }] : []
  })

  return <main className="guide-article-page">
    <div className="container"><Breadcrumb items={['Cẩm nang', guide.title]} /></div>
    <header className="guide-article-header container">
      <div><span className="eyebrow">{guide.category}</span><h1>{guide.title}</h1><p>{guide.intro}</p><small>Cập nhật ngày {new Date(guide.updatedAt).toLocaleDateString('vi-VN')}</small></div>
      {guide.heroImage ? <GuideFigure image={guide.heroImage} priority /> : <img src={guide.image} alt={guide.title} />}
    </header>
    <article className="guide-article-body container">
      <aside><span>Trong bài viết</span>{sections.map(section => <a href={`#${section.id}`} key={section.id}>{section.heading}</a>)}{recommendedProducts.length > 0 && <a href="#san-pham-goi-y">Mẫu Ely Fruit phù hợp</a>}<a href="#goi-y-ely">Gợi ý từ Ely Fruit</a>{guide.faqs?.length && <a href="#cau-hoi-thuong-gap">Câu hỏi thường gặp</a>}<a href="#tu-van">Tư vấn từ Ely Fruit</a></aside>
      <div className="guide-article-copy">
        <span className="eyebrow">Cẩm nang Ely Fruit</span>
        {sections.map(section => <section className="guide-article-section" id={section.id} key={section.id}><h2>{section.heading}</h2>{section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}{section.points && <ul>{section.points.map(point => <li key={point}>{point}</li>)}</ul>}{section.image && <GuideFigure image={section.image} />}</section>)}
        {recommendedProducts.length > 0 && <section id="san-pham-goi-y" className="article-product-recommendations" aria-labelledby="article-product-recommendations-heading"><span className="eyebrow">Mẫu Ely Fruit phù hợp</span><h2 id="article-product-recommendations-heading">Chọn từ những mẫu có giá và mã rõ ràng</h2><div>{recommendedProducts.map(({ product, suitableFor }) => <a href={`/san-pham/${product.slug}`} key={product.slug}><img src={product.image} alt={product.name} loading="lazy" decoding="async" /><span className="article-product-copy"><small className="article-product-meta"><b>{product.code}</b><b>{product.price}</b></small><strong>{product.name}</strong><em>Phù hợp: {suitableFor}</em></span><span className="article-product-arrow" aria-hidden="true"><ArrowRight size={18} /></span></a>)}</div></section>}
        <section id="goi-y-ely" className="article-recommendations" aria-labelledby="article-recommendations-heading"><span className="eyebrow">Gợi ý từ Ely Fruit</span><h3 id="article-recommendations-heading">Một vài điểm dừng hữu ích khi bạn đã sẵn sàng chọn quà</h3><div>{guide.relatedLinks.map(link => <a href={link.href} key={link.href}><strong>{link.label}</strong><span>{link.description}</span><ArrowRight size={16} /></a>)}</div><a className="article-guide-index" href="/guide">Xem tất cả cẩm nang chọn quà <ArrowRight size={15} /></a></section>
        {guide.faqs?.length ? <section id="cau-hoi-thuong-gap" className="article-faq" aria-labelledby="article-faq-heading"><span className="eyebrow">Giải đáp nhanh</span><h2 id="article-faq-heading">Câu hỏi thường gặp</h2>{guide.faqs.map(faq => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</section> : null}
        <section id="tu-van"><h2>Một món quà chỉn chu bắt đầu từ cuộc trò chuyện</h2><p>Nếu bạn chưa chắc nên chọn mẫu nào, hãy gọi <a href={PHONE_LINK}>{PHONE}</a> hoặc ghé cửa hàng tại {ADDRESS}. Đội ngũ Ely Fruit sẽ tư vấn mẫu thực tế theo dịp tặng và ngân sách.</p></section>
        {guide.source && <p className="article-source">Nguồn tham khảo: <a href={guide.source.url} target="_blank" rel="noreferrer">{guide.source.name} — {guide.source.title} <SquareArrowOutUpRight size={14} /></a></p>}
        <div className="article-actions"><Button href="/gio-trai-cay">Xem giỏ quà phù hợp <ArrowRight size={16} /></Button><Button href="/#contact" variant="secondary">Nhận tư vấn</Button></div>
      </div>
    </article>
  </main>
}

function GuidePage() {
  const [featuredGuide, ...otherGuides] = guides
  return <main className="guide-page"><header className="guide-masthead"><div className="container"><span className="eyebrow">Cẩm nang chọn quà</span><div className="guide-masthead-copy"><h1>Chọn quà có gu,<br /><em>trao lời có ý.</em></h1><p>Những ghi chú thực tế từ Ely Fruit giúp bạn chọn trái cây và giỏ quà đúng ngân sách, đúng dịp và đúng người nhận.</p></div></div></header><section className="section container guide-editorial"><article className="featured-guide"><a className="guide-card-image" href={`/guide/${featuredGuide.slug}`}><img src={getGuideCardImage(featuredGuide)} alt={featuredGuide.title} /></a><div><span className="guide-number">Bài viết nổi bật · {featuredGuide.category}</span><h2><a href={`/guide/${featuredGuide.slug}`}>{featuredGuide.title}</a></h2><p>{featuredGuide.intro}</p><a className="guide-read-link" href={`/guide/${featuredGuide.slug}`}>Đọc bài viết <ArrowRight size={17} /></a></div></article><div className="guide-section-title"><span>Tất cả bài viết</span><strong>{String(otherGuides.length).padStart(2, '0')} bài viết</strong></div><div className="guide-grid guide-grid-editorial">{otherGuides.map((guide, index) => <article key={guide.slug}><a className="guide-card-image" href={`/guide/${guide.slug}`}><img src={getGuideCardImage(guide)} alt={guide.title} loading="lazy" /></a><div className="guide-card-content"><span className="guide-number">0{index + 2} · {guide.category}</span><h2><a href={`/guide/${guide.slug}`}>{guide.title}</a></h2><p>{guide.intro}</p><a className="guide-read-link" href={`/guide/${guide.slug}`}>Xem bài viết <ArrowRight size={16} /></a></div></article>)}</div><section className="guide-sources"><div><span className="eyebrow">Đọc thêm</span><h2>Nguồn tham khảo</h2><p>Các nguồn bên ngoài giúp bạn tìm hiểu sâu hơn về dinh dưỡng và cách lựa chọn trái cây an toàn.</p></div><div>{guideSources.map((source, index) => <a href={source.url} target="_blank" rel="noreferrer" key={source.url}><span>0{index + 1}</span><div><small>{source.name}</small><strong>{source.title}</strong></div><SquareArrowOutUpRight /></a>)}</div></section><section className="guide-cta"><div><span className="eyebrow">Bạn cần chọn nhanh?</span><h2>Ely Fruit tư vấn mẫu quà theo ngân sách</h2><p>Gọi {PHONE} hoặc ghé cửa hàng tại {ADDRESS} để xem mẫu thực tế.</p></div><Button href="/#contact">Liên hệ tư vấn <ArrowRight size={17} /></Button></section></section></main>
}

interface ContactRailProps {
  isVisible: boolean
}

function ContactRail({ isVisible }: ContactRailProps) {
  if (!isVisible) return null

  return <aside className="contact-rail" aria-label="Liên hệ Ely Fruit">
    <span>Liên hệ</span>
    <a className="rail-phone" href={PHONE_LINK} aria-label={`Gọi ${PHONE}`}><Phone /></a>
    <a className="rail-zalo" href={ZALO_URL} target="_blank" rel="noreferrer" aria-label="Nhắn Zalo Ely Fruit"><strong>Zalo</strong></a>
    <a href={FACEBOOK_URL} target="_blank" rel="noreferrer" aria-label="Facebook Ely Fruit"><img src="https://cdn.simpleicons.org/facebook/1877F2" alt="Facebook" /></a>
    <a href={TIKTOK_URL} target="_blank" rel="noreferrer" aria-label="TikTok Ely Fruit"><img src="https://cdn.simpleicons.org/tiktok/111111" alt="TikTok" /></a>
    <a href={MAP_URL} target="_blank" rel="noreferrer" aria-label="Google Maps Ely Fruit"><img src="https://cdn.simpleicons.org/googlemaps/4285F4" alt="Google Maps" /></a>
  </aside>
}

function Footer() {
  return (
    <>
      <footer className="footer"><div className="container footer-grid"><div className="footer-brand"><Logo light /><p>Trái cây, bánh kẹo nhập khẩu · Giỏ quà cao cấp · Mâm lễ, tráp cưới hỏi.</p><div className="footer-social"><a href={FACEBOOK_URL} target="_blank" rel="noreferrer" aria-label="Facebook Ely Fruit"><img src="https://cdn.simpleicons.org/facebook/ffffff" alt="" /></a><a href={TIKTOK_URL} target="_blank" rel="noreferrer" aria-label="TikTok Ely Fruit"><img src="https://cdn.simpleicons.org/tiktok/ffffff" alt="" /></a><a href={MAP_URL} target="_blank" rel="noreferrer" aria-label="Google Maps Ely Fruit"><img src="https://cdn.simpleicons.org/googlemaps/ffffff" alt="" /></a></div></div><nav aria-label="Liên kết chân trang"><h3>Khám phá</h3><a href="/">Trang chủ</a><a href="/trai-cay">Trái cây bán lẻ</a><a href="/gio-trai-cay">Giỏ quà</a><a href="/#products">Sản phẩm</a><a href="/#process">Quy trình</a><a href="/#about">Về Ely Fruit</a><a href="/#guides">Cẩm nang</a><a href="/#contact">Liên hệ</a></nav><div><h3>Liên hệ</h3><a href={PHONE_LINK}>{PHONE}</a><a href="mailto:ctythucphamelyfruit@gmail.com">ctythucphamelyfruit@gmail.com</a><a href={MAP_URL} target="_blank" rel="noreferrer">Địa chỉ cửa hàng</a><p className="responsive-address" aria-label={ADDRESS}><span className="address-full">{ADDRESS}</span><span className="address-compact">{MOBILE_ADDRESS}</span></p><p>07:30–21:00 mỗi ngày</p></div><div className="footer-cta"><span className="eyebrow">Cần tư vấn ngay?</span><h3>Chúng tôi giúp bạn chọn món quà phù hợp.</h3><Button href={PHONE_LINK} variant="cream"><Phone /> Gọi {PHONE}</Button></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} Ely Fruit. All rights reserved.</span><span>Tươi lành trong từng món quà.</span></div></footer>
      <div className="mobile-sticky"><a href={PHONE_LINK}><Phone /> Gọi đặt nhanh</a><a href={ZALO_URL} target="_blank" rel="noreferrer"><MessageCircle /> Nhắn Zalo</a><a href={FACEBOOK_URL} target="_blank" rel="noreferrer"><MessageCircle /> Facebook</a></div>
    </>
  )
}

interface AppProps {
  initialPath?: string
}

export default function App({ initialPath }: AppProps) {
  const [path, setPath] = useState(initialPath ?? (typeof window === 'undefined' ? '/' : window.location.pathname))
  const [isHomeHeroVisible, setIsHomeHeroVisible] = useState(true)
  const handleHeroVisibilityChange = useCallback((isVisible: boolean): void => setIsHomeHeroVisible(isVisible), [])

  useEffect(() => {
    if (path === '/') setIsHomeHeroVisible(true)
  }, [path])

  useEffect(() => {
    const onInternalLink = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      const target = (event.target as Element).closest<HTMLAnchorElement>('a[href]')
      if (!target || target.target === '_blank' || !target.href.startsWith(window.location.origin)) return
      const nextUrl = new URL(target.href)
      const isCurrentPage = nextUrl.pathname === window.location.pathname && !nextUrl.hash
      event.preventDefault()
      window.history.pushState(null, '', `${nextUrl.pathname}${nextUrl.hash}`)
      window.dispatchEvent(new PopStateEvent('popstate'))
      if (nextUrl.hash) scrollToHash(nextUrl.hash)
      else if (isCurrentPage) window.scrollTo({ top: 0, behavior: getScrollBehavior() })
    }
    const onLocationChange = () => {
      const legacyPath = window.location.hash.slice(1)
      if (legacyPath.startsWith('/') && !legacyPath.startsWith('//')) {
        window.history.replaceState(null, '', legacyPath)
      }
      setPath(window.location.pathname)
    }
    onLocationChange()
    document.addEventListener('click', onInternalLink)
    window.addEventListener('hashchange', onLocationChange)
    window.addEventListener('popstate', onLocationChange)
    return () => {
      document.removeEventListener('click', onInternalLink)
      window.removeEventListener('hashchange', onLocationChange)
      window.removeEventListener('popstate', onLocationChange)
    }
  }, [])
  useEffect(() => {
    if (window.location.hash) {
      scrollToHash(window.location.hash)
      return
    }

    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [path])
  useEffect(() => {
    if (typeof document === 'undefined') return

    const route = getRoute(path)
    const canonicalPath = route?.path ?? path
    const canonical = `${SITE_URL}${canonicalPath === '/' ? '/' : canonicalPath}`
    document.title = getPageTitle(path)
    let canonicalLink = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonicalLink) {
      canonicalLink = document.createElement('link')
      canonicalLink.rel = 'canonical'
      document.head.appendChild(canonicalLink)
    }
    canonicalLink.href = canonical
    let ogUrl = document.querySelector<HTMLMetaElement>('meta[property="og:url"]')
    if (!ogUrl) {
      ogUrl = document.createElement('meta')
      ogUrl.setAttribute('property', 'og:url')
      document.head.appendChild(ogUrl)
    }
    ogUrl.content = canonical
    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.name = 'description'
      document.head.appendChild(meta)
    }
    meta.content = route?.description ?? 'Trang bạn tìm không tồn tại tại Ely Fruit.'
    const guide = path.startsWith('/guide/') ? guides.find(item => `/guide/${item.slug}` === path) : undefined
    const routeImage = route?.image ? new URL(route.image, SITE_URL).href : `${SITE_URL}${SOCIAL_IMAGE_PATH}`
    const routeImageAlt = route?.product?.name ?? guide?.heroImage?.alt ?? guide?.title ?? 'Hộp quà trái cây cao cấp Ely Fruit tại Thủ Dầu Một, Bình Dương'
    const metadata = [
      ['meta[property="og:title"]', 'property', 'og:title', route?.title ?? getPageTitle(path)],
      ['meta[property="og:description"]', 'property', 'og:description', meta.content],
      ['meta[property="og:type"]', 'property', 'og:type', route?.type === 'article' ? 'article' : 'website'],
      ['meta[property="og:image"]', 'property', 'og:image', routeImage],
      ['meta[property="og:image:alt"]', 'property', 'og:image:alt', routeImageAlt],
      ['meta[name="twitter:image"]', 'name', 'twitter:image', routeImage],
      ['meta[name="twitter:image:alt"]', 'name', 'twitter:image:alt', routeImageAlt],
    ] as const
    metadata.forEach(([selector, attribute, name, content]) => {
      let element = document.querySelector<HTMLMetaElement>(selector)
      if (!element) {
        element = document.createElement('meta')
        element.setAttribute(attribute, name)
        document.head.appendChild(element)
      }
      element.content = content
    })
    const schema = document.createElement('script')
    schema.type = 'application/ld+json'
    schema.id = 'ely-fruit-local-business'
    const graph: Record<string, unknown>[] = [{
      '@type': 'LocalBusiness',
      '@id': `${SITE_URL}/#business`,
      name: 'Ely Fruit',
      url: SITE_URL,
      telephone: '+84981370970',
      email: EMAIL,
      priceRange: PRICE_RANGE,
      image: `${SITE_URL}${SOCIAL_IMAGE_PATH}`,
      logo: `${SITE_URL}/ely-fruit-logo.png`,
      address: {
        '@type': 'PostalAddress',
        streetAddress: ADDRESS,
        addressLocality: 'Thủ Dầu Một',
        addressRegion: 'Bình Dương',
        addressCountry: 'VN',
      },
      openingHoursSpecification: [{
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: OPENING_HOURS.opens,
        closes: OPENING_HOURS.closes,
      }],
      sameAs: [FACEBOOK_URL, TIKTOK_URL, MAP_URL],
    }, {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'Ely Fruit',
      inLanguage: 'vi-VN',
      publisher: { '@id': `${SITE_URL}/#business` },
    }]
    if (path === '/') {
      graph.push({
        '@type': 'FAQPage',
        '@id': `${SITE_URL}/#faq`,
        mainEntity: faqs.map(([name, text]) => ({
          '@type': 'Question',
          name,
          acceptedAnswer: { '@type': 'Answer', text },
        })),
      })
    }
    const product = route?.product
    if (product) {
      graph.push({
        '@type': 'Product',
        '@id': `${canonical}#product`,
        name: product.name,
        image: [new URL(product.image, SITE_URL).href, new URL(product.imageBack, SITE_URL).href],
        description: product.ingredients,
        sku: product.code,
        brand: { '@type': 'Brand', name: 'Ely Fruit' },
        ...(product.priceValue > 0 ? { offers: {
          '@type': 'Offer',
          url: canonical,
          priceCurrency: 'VND',
          price: product.priceValue,
          availability: 'https://schema.org/InStock',
        } } : {}),
      })
    }
    if (guide) {
      graph.push({
        '@type': 'Article',
        '@id': `${canonical}#article`,
        headline: guide.title,
        description: guide.intro,
        image: routeImage,
        dateModified: guide.updatedAt,
        datePublished: guide.updatedAt,
        inLanguage: 'vi-VN',
        mainEntityOfPage: canonical,
        author: { '@id': `${SITE_URL}/#business` },
        publisher: { '@id': `${SITE_URL}/#business` },
        ...(guide.source ? { citation: guide.source.url } : {}),
      }, {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Trang chủ', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Cẩm nang', item: `${SITE_URL}/guide` },
          { '@type': 'ListItem', position: 3, name: guide.title, item: canonical },
        ],
      })
    }
    schema.text = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })
    document.getElementById(schema.id)?.remove()
    document.head.appendChild(schema)
    return () => schema.remove()
  }, [path])
  let page: React.ReactNode
  if (!getRoute(path)) page = <main className="section container"><h1>404 — Không tìm thấy trang</h1><p>Trang bạn tìm không tồn tại hoặc đã được chuyển đi.</p><a className="btn btn-primary" href="/">Về trang chủ</a></main>
  else if (path === '/gifts' || path === '/gio-trai-cay') page = <GiftsPage />
  else if (path === '/gio-trai-cay/sinh-nhat') page = <GiftsPage initialFilter="Sinh nhật" />
  else if (path === '/gio-trai-cay/khai-truong') page = <GiftsPage initialFilter="Khai trương" />
  else if (path === '/gio-trai-cay/tham-hoi') page = <GiftsPage initialFilter="Thăm bệnh" />
  else if (path === '/gio-trai-cay/399k') page = <GiftsPage initialFilter="399.000đ" />
  else if (path === '/gio-trai-cay/499k') page = <GiftsPage initialFilter="499.000đ" />
  else if (path === '/gio-trai-cay/599k') page = <GiftsPage initialFilter="599.000đ" />
  else if (path === '/trai-cay' || path === '/trai-cay-nhap-khau') page = <FruitPage />
  else if (path.startsWith('/product/') || path.startsWith('/san-pham/')) page = <ProductPage slug={path.split('/').pop() || ''} />
  else if (path === '/catalogue') page = <CataloguePage />
  else if (path === '/about' || path === '/gioi-thieu') page = <AboutPage />
  else if (path === '/contact') page = <ContactPage />
  else if (path === '/faq') page = <InfoPage eyebrow="Giải đáp nhanh" title="Câu hỏi thường gặp" intro="Những thông tin khách hàng thường quan tâm trước khi đặt giỏ quà tại Ely Fruit." sections={faqs.map(([heading, text]) => ({ heading, text }))} />
  else if (path === '/chinh-sach-giao-hang') page = <InfoPage eyebrow="Giao nhận" title="Chính sách giao hàng" intro="Ely Fruit hỗ trợ giao giỏ quà tận nơi tại Thủ Dầu Một và khu vực lân cận." sections={[{ heading: 'Khu vực giao hàng', text: 'Chúng tôi tư vấn phí và thời gian giao theo địa chỉ, khung giờ mong muốn và kích thước món quà.' }, { heading: 'Xác nhận trước khi giao', text: 'Mẫu quà, thiệp và thời gian giao được xác nhận trước khi hoàn thiện để bạn yên tâm gửi tặng.' }, { heading: 'Đặt hàng gấp', text: `Vui lòng gọi ${PHONE} để kiểm tra khả năng thực hiện trong ngày.` }]} />
  else if (path === '/chinh-sach-doi-tra') page = <InfoPage eyebrow="Chăm sóc sau mua" title="Chính sách đổi trả" intro="Ely Fruit ưu tiên trải nghiệm minh bạch và hỗ trợ nhanh khi sản phẩm có vấn đề." sections={[{ heading: 'Kiểm tra khi nhận hàng', text: 'Bạn vui lòng kiểm tra hình thức giỏ quà khi nhận và liên hệ ngay nếu sản phẩm không đúng mẫu đã xác nhận.' }, { heading: 'Trường hợp được hỗ trợ', text: 'Ely Fruit tiếp nhận phản hồi về sản phẩm hư hỏng, thiếu thành phần hoặc sai thông tin đã thống nhất.' }]} />
  else if (path === '/gio-qua-doanh-nghiep') page = <GiftsPage initialFilter="Quà doanh nghiệp" />
  else if (path === '/gio-qua-tet') page = <GiftsPage initialFilter="Tết" />
  else if (path === '/mam-le-trap-cuoi') page = <GiftsPage initialFilter="Cưới hỏi" />
  else if (path === '/guide') page = <GuidePage />
  else if (path.startsWith('/guide/')) page = <GuideArticle guide={guides.find(item => item.slug === path.slice('/guide/'.length))!} />
  else page = <HomePage onHeroVisibilityChange={handleHeroVisibilityChange} />
  const isContactRailVisible = path !== '/' || !isHomeHeroVisible
  return <><Header currentPath={path} /><ContactRail isVisible={isContactRailVisible} />{page}<Footer /></>
}
