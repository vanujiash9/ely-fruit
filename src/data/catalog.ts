export type Product = {
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

export interface FruitProduct {
  slug: string
  name: string
  code: string
  price: string
  origin: string
  description: string
  category: 'Táo' | 'Nho' | 'Cam quýt' | 'Kiwi' | 'Dưa' | 'Lê'
  tag?: string
  image: string
}

export type PriceSortDirection = 'ascending' | 'descending'

export function sortProductsByPrice(items: readonly Product[], direction: PriceSortDirection): Product[] {
  const multiplier = direction === 'ascending' ? 1 : -1

  return [...items].sort((first, second) => (first.priceValue - second.priceValue) * multiplier)
}

const ingredientsByCode: Readonly<Record<string, string>> = {
  ELY01: 'Hoa tươi, quýt Úc, táo Dazzle, táo xanh và táo Nam Phi.',
  ELY02: 'Hoa tươi, lê nâu, cam Nam Phi, táo Dazzle, quýt Úc, nho mẫu đơn và táo Nam Phi.',
  ELY03: 'Hoa tươi, lê sữa, kiwi vàng, táo Envy, táo xanh và quýt Úc.',
  ELY04: 'Hoa tươi, quýt Úc, táo xanh và táo Nam Phi.',
  ELY05: 'Hoa tươi, nho mẫu đơn, táo xanh, quýt Úc và táo Dazzle.',
  ELY08: 'Hoa tươi hai bên, nho mẫu đơn, cam Nam Phi, lê nâu, táo Dazzle, táo Envy, quýt Úc và táo Nam Phi.',
  ELY09: 'Hoa tươi hai bên, cam Nam Phi, quýt Úc, táo Dazzle, táo xanh, lê nâu và táo Nam Phi.',
  HQ01: 'Táo Dazzle, nho mẫu đơn và nho đỏ.',
  HQ02: 'Nho mẫu đơn, táo Dazzle, táo Envy, lê nâu, kiwi vàng, quýt Úc và cam Nam Phi.',
  HQ03: 'Táo Dazzle, kiwi vàng, nho mẫu đơn và quýt Úc.',
  HQ04: 'Táo Envy, lê nâu, kiwi vàng, nho mẫu đơn, cherry và quýt Úc.',
  HQ05: 'Quýt Úc, nho mẫu đơn, nho đỏ và táo Dazzle.',
  K01: 'Quýt Úc, kiwi vàng, táo Envy, cam Úc, lê nâu, táo Dazzle, nho mẫu đơn và táo Nam Phi.',
  K02: 'Quýt Úc, kiwi vàng, táo Envy, cam Úc, lê nâu, táo Dazzle, nho mẫu đơn và táo Nam Phi.',
  KH02: 'Cam Nam Phi, lê nâu, táo xanh, táo Dazzle, quýt Úc, lê đường Hà Giang và táo Nam Phi.',
  KH03: 'Cam Nam Phi, lê nâu, kiwi vàng, táo Dazzle, quýt Úc, lê đường Hà Giang và táo Nam Phi.',
  KH04: 'Cam Nam Phi, lê nâu, táo Dazzle, quýt Úc, lê đường Hà Giang và táo Nam Phi.',
  KH05: 'Lê nâu, dưa lê Hàn, cam Nam Phi, táo xanh, lê đường Hà Giang, táo Dazzle, quýt Úc, kiwi vàng và táo Nam Phi.',
  KH06: 'Lê nâu, cam Nam Phi, táo xanh, lê Nam Phi, táo Dazzle, quýt Úc và táo Nam Phi.',
  KH08: 'Cam Nam Phi, lê nâu, táo Dazzle, quýt Úc, táo Nam Phi, táo xanh, lê Nam Phi và nho mẫu đơn.',
  KH09: 'Lê sữa, lê Nam Phi, táo xanh, quýt Úc, táo Dazzle, táo Golden, kiwi vàng và táo Nam Phi.',
  KH10: 'Lê sữa, cam Nam Phi, táo Dazzle, táo Nam Phi, quýt Úc, táo xanh và nho đỏ.',
  KH12: 'Nho đỏ, lê đường Hà Giang, lê nâu, cam Nam Phi, táo xanh, táo Dazzle và táo Nam Phi.',
  KH14: 'Dưa Đài Queen, cam Úc, lê nâu, táo Envy, táo Dazzle, quýt Úc, nho mẫu đơn và táo Nam Phi.',
  KH15: 'Dưa Đài Queen, cherry, lê nâu, táo xanh, táo Dazzle, quýt Úc, nho mẫu đơn và táo Nam Phi.',
  KH16: 'Dưa Đài Queen, nho mẫu đơn, kiwi vàng, táo Dazzle, quýt Úc, táo Envy và táo Nam Phi.',
  KH53: 'Dưa lưới dài Aladin, lê nâu, dưa lê Hàn, táo Dazzle, cam Nam Phi, quýt Úc, kiwi vàng và táo Nam Phi.',
  KQ02: 'Cam Nam Phi, lê nâu, táo xanh, táo Dazzle, quýt Úc, lê đường Hà Giang và táo Nam Phi.',
  Q01: 'Táo Envy, táo Dazzle và táo cherry.',
  Q02: 'Táo xanh, táo Envy, kiwi vàng và nho mẫu đơn.',
  Q03: 'Kiwi vàng và táo cherry.',
}

export const products: Product[] = [
  { slug: 'ely-06', name: 'Giỏ Trái Cây Ely 06', code: 'ELY06', price: '800.000đ', priceValue: 800000, ingredients: 'Hoa tươi, cam Nam Phi, lê nâu, táo xanh, táo Dazzle, táo Envy, quýt Úc và táo Nam Phi.', tag: 'Bán chạy', image: '/products/ely06-front.png', imageBack: '/products/ely06-back.png', occasion: 'Sinh nhật', type: 'Giỏ trái cây' },
  { slug: 'ely-07', name: 'Giỏ Trái Cây Ely 07', code: 'ELY07', price: '800.000đ', priceValue: 800000, ingredients: 'Hoa tươi, cam Nam Phi, lê nâu, táo xanh, táo Dazzle, kiwi vàng, quýt Úc và táo Nam Phi.', tag: 'Mẫu mới', image: '/products/ely07-front.png', imageBack: '/products/ely07-back.png', occasion: 'Cảm ơn', type: 'Giỏ trái cây' },
  { slug: 'ely-10', name: 'Giỏ Trái Cây Ely 10', code: 'ELY10', price: '1.000.000đ', priceValue: 1000000, ingredients: 'Hoa tươi, cam Nam Phi, lê sữa, táo xanh, táo Dazzle, quýt Úc, kiwi vàng, nho mẫu đơn, lê Hà Giang và táo Nam Phi.', tag: 'Cao cấp', image: '/products/ely10-front.png', imageBack: '/products/ely10-back.png', occasion: 'Biếu đối tác', type: 'Giỏ trái cây' },
  { slug: 'ely-11', name: 'Giỏ Trái Cây Ely 11', code: 'ELY11', price: '1.000.000đ', priceValue: 1000000, ingredients: 'Hoa tươi, cam Nam Phi, lê sữa, táo xanh, táo Dazzle, quýt Úc, kiwi vàng, nho mẫu đơn, lê Hà Giang và táo Nam Phi.', tag: 'Cao cấp', image: '/products/ely11-front.png', imageBack: '/products/ely11-back.png', occasion: 'Quà doanh nghiệp', type: 'Giỏ trái cây' },
  { slug: 'kh-01', name: 'Giỏ Trái Cây KH 01', code: 'KH01', price: '499.000đ', priceValue: 499000, ingredients: 'Cam Nam Phi, lê nâu, táo xanh, táo Dazzle, quýt Úc, kiwi vàng và táo Nam Phi.', tag: 'Giá tốt', image: '/products/kh01-front.png', imageBack: '/products/kh01-back.png', occasion: 'Thăm bệnh', type: 'Giỏ trái cây' },
  { slug: 'kh-07', name: 'Giỏ Trái Cây KH 07', code: 'KH07', price: '599.000đ', priceValue: 599000, ingredients: 'Cam Nam Phi, lê sữa, táo Dazzle, quýt Úc, táo Nam Phi và táo xanh.', image: '/products/kh07-front.png', imageBack: '/products/kh07-back.png', occasion: 'Gia đình', type: 'Giỏ trái cây' },
  { slug: 'kh-11', name: 'Giỏ Trái Cây KH 11', code: 'KH11', price: '699.000đ', priceValue: 699000, ingredients: 'Nho đen, lê sữa, cam Nam Phi, táo xanh, táo Dazzle, quýt Úc, kiwi vàng và táo Nam Phi.', tag: 'Bán chạy', image: '/products/kh11-front.png', imageBack: '/products/kh11-back.png', occasion: 'Sinh nhật', type: 'Giỏ trái cây' },
  { slug: 'kh-13', name: 'Giỏ Trái Cây KH 13', code: 'KH13', price: '800.000đ', priceValue: 800000, ingredients: 'Dưa Đài Queen, lê nâu, cam Nam Phi, táo Dazzle, quýt Úc, nho mẫu đơn và táo Nam Phi.', tag: 'Cao cấp', image: '/products/kh13-front.png', imageBack: '/products/kh13-back.png', occasion: 'Biếu đối tác', type: 'Giỏ trái cây' },
  ...([
    ['ely01', 'ELY01', 'Giỏ Trái Cây Ely 01', 699000], ['ely02', 'ELY02', 'Giỏ Trái Cây Ely 02', 699000], ['ely03', 'ELY03', 'Giỏ Trái Cây Ely 03', 699000],
    ['ely04', 'ELY04', 'Giỏ Trái Cây Ely 04', 699000], ['ely05', 'ELY05', 'Giỏ Trái Cây Ely 05', 800000], ['ely08', 'ELY08', 'Giỏ Trái Cây Ely 08', 1000000], ['ely09', 'ELY09', 'Giỏ Trái Cây Ely 09', 1000000],
    ['hq01', 'HQ01', 'Hộp Quà HQ 01', 399000], ['hq02', 'HQ02', 'Hộp Quà HQ 02', 399000], ['hq03', 'HQ03', 'Hộp Quà HQ 03', 399000], ['hq04', 'HQ04', 'Hộp Quà HQ 04', 399000], ['hq05', 'HQ05', 'Hộp Quà HQ 05', 399000],
    ['k01', 'K01', 'Giỏ Trái Cây K 01', 499000], ['k02', 'K02', 'Giỏ Trái Cây K 02', 499000], ['kh02', 'KH02', 'Giỏ Trái Cây KH 02', 499000], ['kh03', 'KH03', 'Giỏ Trái Cây KH 03', 499000], ['kh04', 'KH04', 'Giỏ Trái Cây KH 04', 499000], ['kh05', 'KH05', 'Giỏ Trái Cây KH 05', 499000], ['kh06', 'KH06', 'Giỏ Trái Cây KH 06', 499000], ['kh08', 'KH08', 'Giỏ Trái Cây KH 08', 599000], ['kh09', 'KH09', 'Giỏ Trái Cây KH 09', 599000], ['kh10', 'KH10', 'Giỏ Trái Cây KH 10', 599000], ['kh12', 'KH12', 'Giỏ Trái Cây KH 12', 699000], ['kh14', 'KH14', 'Giỏ Trái Cây KH 14', 800000], ['kh15', 'KH15', 'Giỏ Trái Cây KH 15', 800000], ['kh16', 'KH16', 'Giỏ Trái Cây KH 16', 1000000], ['kh53', 'KH53', 'Giỏ Trái Cây KH 53', 699000],
    ['kq02', 'KQ02', 'Giỏ Quà Tết KQ 02', 499000], ['q01', 'Q01', 'Quà Tặng Q 01', 399000], ['q02', 'Q02', 'Quà Tặng Q 02', 399000], ['q03', 'Q03', 'Quà Tặng Q 03', 399000],
  ] as Array<[string, string, string, number]>).map(([id, code, name, priceValue], index) => ({
    slug: id,
    name,
    code,
    price: `${priceValue.toLocaleString('vi-VN')}đ`,
    priceValue,
    ingredients: ingredientsByCode[code] ?? 'Trái cây tươi tuyển chọn, phối hợp theo mùa và gói quà thủ công.',
    image: `/products/${id}-front.${id === 'ely03' ? 'jpg' : 'png'}`,
    imageBack: `/products/${id}-back.${id === 'ely03' ? 'jpg' : 'png'}`,
    occasion: code === 'KQ02' ? 'Tết' : index % 2 ? 'Sinh nhật' : 'Biếu đối tác',
    type: id.startsWith('hq') || id.startsWith('q') ? 'Hộp quà' : 'Giỏ trái cây',
  })),
]

const fruitImagePath = '/Giỏ thiết kế-20261031T041747Z-1-001/Giỏ thiết kế/Trái cây'

export const fruitProducts: FruitProduct[] = [
  { slug: 'cam-uc-vitor', name: 'Cam Úc Vitor', code: 'TC01', price: 'Giá theo ngày', origin: 'Úc', description: 'Vị ngọt thanh, mọng nước, phù hợp dùng hằng ngày hoặc làm quà.', category: 'Cam quýt', tag: 'Mới về', image: `${fruitImagePath}/Cam úc vitor.jpg` },
  { slug: 'dua-le-han', name: 'Dưa lê Hàn', code: 'TC02', price: 'Giá theo ngày', origin: 'Hàn Quốc', description: 'Thơm dịu, giòn mát, tuyển chọn theo độ chín phù hợp.', category: 'Dưa', image: `${fruitImagePath}/Dưa lê hàn.jpg` },
  { slug: 'dua-luoi-queen-vip', name: 'Dưa lưới Queen VIP', code: 'TC03', price: 'Giá theo ngày', origin: 'Tuyển chọn', description: 'Ruột cam ngọt đậm, phù hợp biếu tặng và dùng cho gia đình.', category: 'Dưa', tag: 'Được yêu thích', image: `${fruitImagePath}/Dưa Lưới Queen Vip.jpg` },
  { slug: 'kiwi-zepri-vang', name: 'Kiwi Zespri vàng', code: 'TC04', price: 'Giá theo ngày', origin: 'New Zealand', description: 'Vị ngọt tươi, giàu vitamin, sẵn sàng dùng khi đạt độ chín đẹp.', category: 'Kiwi', image: `${fruitImagePath}/Kiwi Zepri vàng.jpg` },
  { slug: 'le-sua-trung', name: 'Lê sữa', code: 'TC05', price: 'Giá theo ngày', origin: 'Tuyển chọn', description: 'Thịt lê giòn, nhiều nước, vị ngọt nhẹ nhàng.', category: 'Lê', image: `${fruitImagePath}/Lê sữa trung.jpg` },
  { slug: 'nho-shine-muscat', name: 'Nho mẫu đơn Shine Muscat', code: 'TC06', price: 'Giá theo ngày', origin: 'Hàn Quốc', description: 'Chùm nho căng mọng, hương thơm đặc trưng, đẹp để biếu tặng.', category: 'Nho', tag: 'Cao cấp', image: `${fruitImagePath}/Nho Mẫu Đơn Shine muscat.jpg` },
  { slug: 'nho-xanh-my-ipg', name: 'Nho xanh Mỹ IPG', code: 'TC07', price: 'Giá theo ngày', origin: 'Hoa Kỳ', description: 'Giòn ngọt, chùm quả tươi sáng, thích hợp cho cả gia đình.', category: 'Nho', image: `${fruitImagePath}/Nho xanh mỹ ipg.jpg` },
  { slug: 'quyt-uc-2ph', name: 'Quýt Úc 2PH', code: 'TC08', price: 'Giá theo ngày', origin: 'Úc', description: 'Vỏ dễ bóc, vị ngọt thanh và hương thơm tươi mới.', category: 'Cam quýt', image: `${fruitImagePath}/Quýt Úc 2PH.jpg` },
  { slug: 'tao-dazzle', name: 'Táo Dazzle', code: 'TC09', price: 'Giá theo ngày', origin: 'New Zealand', description: 'Táo giòn ngọt, sắc vỏ đẹp, tuyển lựa theo từng lô hàng.', category: 'Táo', tag: 'Bán chạy', image: `${fruitImagePath}/Táo Dazzle.jpg` },
  { slug: 'tao-envy-new-zealand', name: 'Táo Envy New Zealand', code: 'TC10', price: 'Giá theo ngày', origin: 'New Zealand', description: 'Thịt táo giòn chắc, vị ngọt đậm và màu sắc sang trọng.', category: 'Táo', image: `${fruitImagePath}/Táo Envy New Zealand.jpg` },
]
