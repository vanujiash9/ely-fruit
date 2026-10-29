import { products } from '../data/catalog.ts'
import { guides } from '../data/guides.ts'
import { localServices } from '../data/local-services.ts'

const categoryRoutes = [
  '/',
  '/gio-trai-cay',
  '/gio-trai-cay/sinh-nhat',
  '/gio-trai-cay/khai-truong',
  '/gio-trai-cay/tham-hoi',
  '/gio-trai-cay/399k',
  '/gio-trai-cay/499k',
  '/gio-trai-cay/599k',
  '/trai-cay-nhap-khau',
  '/gio-qua-doanh-nghiep',
  '/gio-qua-tet',
  '/mam-le-trap-cuoi',
  '/catalogue',
  '/gioi-thieu',
  '/contact',
  '/faq',
  '/chinh-sach-giao-hang',
  '/chinh-sach-doi-tra',
  '/guide',
]

export const staticRoutes = [
  ...categoryRoutes,
  ...products.map(product => `/san-pham/${product.slug}`),
  ...guides.map(guide => `/guide/${guide.slug}`),
  ...localServices.map(service => `/${service.slug}`),
]
