import { products, type Product } from '../data/catalog.ts'
import { guides } from '../data/guides.ts'

export interface RouteDefinition {
  path: string
  title: string
  description: string
  image?: string
  type?: 'website' | 'article' | 'product'
  product?: Product
}

export const ROUTES: RouteDefinition[] = [
  { path: '/', title: 'Ely Fruit | Giỏ quà cao cấp tại Thủ Dầu Một', description: 'Ely Fruit cung cấp giỏ quà, giỏ trái cây nhập khẩu, mâm lễ và tráp cưới hỏi tại Thủ Dầu Một.' },
  { path: '/gio-trai-cay', title: 'Giỏ trái cây cao cấp Thủ Dầu Một | Ely Fruit', description: 'Danh mục giỏ trái cây Ely Fruit với giá, mã hàng và thành phần rõ ràng, có thể lọc theo ngân sách và dịp tặng.' },
  { path: '/catalogue', title: 'Catalogue giỏ quà, mâm lễ | Ely Fruit', description: 'Catalogue giỏ quà, quà doanh nghiệp, mâm lễ, tráp cưới hỏi và trái cây nhập khẩu.' },
  { path: '/about', title: 'Về Ely Fruit | Trái cây và quà tặng Thủ Dầu Một', description: 'Tìm hiểu Ely Fruit, cửa hàng trái cây và quà tặng cao cấp tại Thủ Dầu Một.' },
  { path: '/contact', title: 'Liên hệ Ely Fruit | Địa chỉ, điện thoại, Google Maps', description: 'Ghé cửa hàng, gọi điện hoặc nhắn tin để được tư vấn giỏ quà phù hợp.' },
  { path: '/guide', title: 'Tin tức & Cẩm nang chọn quà | Ely Fruit', description: 'Gợi ý thực tế giúp bạn chọn trái cây và giỏ quà đúng ngân sách, đúng dịp tặng.' },
]

const CATEGORY_ROUTES: RouteDefinition[] = [
  ['/gio-trai-cay/sinh-nhat', 'Giỏ trái cây sinh nhật'],
  ['/gio-trai-cay/khai-truong', 'Quà khai trương'],
  ['/gio-trai-cay/tham-hoi', 'Giỏ trái cây thăm hỏi'],
  ['/gio-trai-cay/399k', 'Giỏ trái cây 399K'],
  ['/gio-trai-cay/499k', 'Giỏ trái cây 499K'],
  ['/gio-trai-cay/599k', 'Giỏ trái cây 599K'],
  ['/trai-cay-nhap-khau', 'Trái cây nhập khẩu'],
  ['/gio-qua-doanh-nghiep', 'Giỏ quà doanh nghiệp'],
  ['/gio-qua-tet', 'Giỏ quà Tết'],
  ['/mam-le-trap-cuoi', 'Mâm lễ và tráp cưới hỏi'],
  ['/gioi-thieu', 'Giới thiệu Ely Fruit'],
  ['/faq', 'Câu hỏi thường gặp'],
  ['/chinh-sach-giao-hang', 'Chính sách giao hàng'],
  ['/chinh-sach-doi-tra', 'Chính sách đổi trả'],
].map(([path, name]) => ({ path, title: `${name} | Ely Fruit`, description: `${name} tại Ely Fruit, Thủ Dầu Một. Liên hệ để được tư vấn trực tiếp.` }))

export function getRoute(path: string): RouteDefinition | undefined {
  if (path === '/gifts') return ROUTES.find(route => route.path === '/gio-trai-cay')

  const route = [...ROUTES, ...CATEGORY_ROUTES].find(route => route.path === path)
  if (route) return route

  const productPrefix = path.startsWith('/san-pham/') ? '/san-pham/' : '/product/'
  if (path.startsWith(productPrefix)) {
    const product = products.find(product => product.slug === path.slice(productPrefix.length))
    return product ? { path: `/san-pham/${product.slug}`, title: `${product.name} | Ely Fruit`, description: product.ingredients, image: product.image, type: 'product', product } : undefined
  }

  if (path.startsWith('/guide/')) {
    const guide = guides.find(guide => guide.slug === path.slice('/guide/'.length))
    return guide ? { path, title: `${guide.title} | Ely Fruit`, description: guide.intro, image: guide.image, type: 'article' } : undefined
  }
  return undefined
}

export function getPageTitle(path: string): string {
  return getRoute(path)?.title ?? 'Không tìm thấy trang | Ely Fruit'
}
