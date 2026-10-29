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

export const products: Product[] = [
  { slug: 'ely-06', name: 'Giỏ Trái Cây Ely 06', code: 'ELY06', price: '800.000đ', priceValue: 800000, ingredients: 'Hoa tươi, cam Nam Phi, lê nâu, táo xanh, táo Dazzle, táo Envy, quýt Úc và táo Nam Phi.', tag: 'Bán chạy', image: '/products/ely06-front.png', imageBack: '/products/ely06-back.png', occasion: 'Sinh nhật', type: 'Giỏ trái cây' },
  { slug: 'ely-07', name: 'Giỏ Trái Cây Ely 07', code: 'ELY07', price: '800.000đ', priceValue: 800000, ingredients: 'Hoa tươi, cam Nam Phi, lê nâu, táo xanh, táo Dazzle, kiwi vàng, quýt Úc và táo Nam Phi.', tag: 'Mẫu mới', image: '/products/ely07-front.png', imageBack: '/products/ely07-back.png', occasion: 'Cảm ơn', type: 'Giỏ trái cây' },
  { slug: 'ely-10', name: 'Giỏ Trái Cây Ely 10', code: 'ELY10', price: '1.000.000đ', priceValue: 1000000, ingredients: 'Hoa tươi, cam Nam Phi, lê sữa, táo xanh, táo Dazzle, quýt Úc, kiwi vàng, nho mẫu đơn, lê Hà Giang và táo Nam Phi.', tag: 'Cao cấp', image: '/products/ely10-front.png', imageBack: '/products/ely10-back.png', occasion: 'Biếu đối tác', type: 'Giỏ trái cây' },
  { slug: 'ely-11', name: 'Giỏ Trái Cây Ely 11', code: 'ELY11', price: '1.000.000đ', priceValue: 1000000, ingredients: 'Hoa tươi, cam Nam Phi, lê sữa, táo xanh, táo Dazzle, quýt Úc, kiwi vàng, nho mẫu đơn, lê Hà Giang và táo Nam Phi.', tag: 'Cao cấp', image: '/products/ely11-front.png', imageBack: '/products/ely11-back.png', occasion: 'Quà doanh nghiệp', type: 'Giỏ trái cây' },
  { slug: 'kh-01', name: 'Giỏ Trái Cây KH 01', code: 'KH01', price: '499.000đ', priceValue: 499000, ingredients: 'Cam Nam Phi, lê nâu, táo xanh, táo Dazzle, quýt Úc, kiwi vàng và táo Nam Phi.', tag: 'Giá tốt', image: '/products/kh01-front.png', imageBack: '/products/kh01-back.png', occasion: 'Thăm bệnh', type: 'Giỏ trái cây' },
  { slug: 'kh-07', name: 'Giỏ Trái Cây KH 07', code: 'KH07', price: '599.000đ', priceValue: 599000, ingredients: 'Cam Nam Phi, lê sữa, táo Dazzle, quýt Úc, táo Nam Phi và táo xanh.', image: '/products/kh07-front.png', imageBack: '/products/kh07-back.png', occasion: 'Gia đình', type: 'Giỏ trái cây' },
  { slug: 'kh-11', name: 'Giỏ Trái Cây KH 11', code: 'KH11', price: '699.000đ', priceValue: 699000, ingredients: 'Nho đen, lê sữa, cam Nam Phi, táo xanh, táo Dazzle, quýt Úc, kiwi vàng và táo Nam Phi.', tag: 'Bán chạy', image: '/products/kh11-front.png', imageBack: '/products/kh11-back.png', occasion: 'Sinh nhật', type: 'Giỏ trái cây' },
  { slug: 'kh-13', name: 'Giỏ Trái Cây KH 13', code: 'KH13', price: '800.000đ', priceValue: 800000, ingredients: 'Dưa Đài Queen, lê nâu, cam Nam Phi, táo Dazzle, quýt Úc, nho mẫu đơn và táo Nam Phi.', tag: 'Cao cấp', image: '/products/kh13-front.png', imageBack: '/products/kh13-back.png', occasion: 'Biếu đối tác', type: 'Giỏ trái cây' },
  ...[
    ['ely01', 'ELY01', 'Giỏ Trái Cây Ely 01'], ['ely02', 'ELY02', 'Giỏ Trái Cây Ely 02'], ['ely03', 'ELY03', 'Giỏ Trái Cây Ely 03'],
    ['ely04', 'ELY04', 'Giỏ Trái Cây Ely 04'], ['ely05', 'ELY05', 'Giỏ Trái Cây Ely 05'], ['ely08', 'ELY08', 'Giỏ Trái Cây Ely 08'], ['ely09', 'ELY09', 'Giỏ Trái Cây Ely 09'],
    ['hq01', 'HQ01', 'Hộp Quà HQ 01'], ['hq02', 'HQ02', 'Hộp Quà HQ 02'], ['hq03', 'HQ03', 'Hộp Quà HQ 03'], ['hq04', 'HQ04', 'Hộp Quà HQ 04'], ['hq05', 'HQ05', 'Hộp Quà HQ 05'],
    ['k01', 'K01', 'Giỏ Trái Cây K 01'], ['k02', 'K02', 'Giỏ Trái Cây K 02'], ['kh02', 'KH02', 'Giỏ Trái Cây KH 02'], ['kh03', 'KH03', 'Giỏ Trái Cây KH 03'], ['kh04', 'KH04', 'Giỏ Trái Cây KH 04'], ['kh05', 'KH05', 'Giỏ Trái Cây KH 05'], ['kh06', 'KH06', 'Giỏ Trái Cây KH 06'], ['kh08', 'KH08', 'Giỏ Trái Cây KH 08'], ['kh09', 'KH09', 'Giỏ Trái Cây KH 09'], ['kh10', 'KH10', 'Giỏ Trái Cây KH 10'], ['kh12', 'KH12', 'Giỏ Trái Cây KH 12'], ['kh14', 'KH14', 'Giỏ Trái Cây KH 14'], ['kh15', 'KH15', 'Giỏ Trái Cây KH 15'], ['kh16', 'KH16', 'Giỏ Trái Cây KH 16'], ['kh53', 'KH53', 'Giỏ Trái Cây KH 53'],
    ['kq02', 'KQ02', 'Giỏ Quà Tết KQ 02'], ['q01', 'Q01', 'Quà Tặng Q 01'], ['q02', 'Q02', 'Quà Tặng Q 02'], ['q03', 'Q03', 'Quà Tặng Q 03'],
  ].map(([id, code, name], index) => ({
    slug: id,
    name,
    code,
    price: 'Liên hệ',
    priceValue: 0,
    ingredients: 'Trái cây tươi tuyển chọn, phối hợp theo mùa và gói quà thủ công.',
    image: `/products/${id}-front.${id === 'ely03' ? 'jpg' : 'png'}`,
    imageBack: `/products/${id}-back.${id === 'ely03' ? 'jpg' : 'png'}`,
    occasion: index % 2 ? 'Sinh nhật' : 'Biếu đối tác',
    type: id.startsWith('hq') || id.startsWith('q') ? 'Hộp quà' : 'Giỏ trái cây',
  })),
]
