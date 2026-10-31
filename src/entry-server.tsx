import { renderToString } from 'react-dom/server'
import App from './App'
import { getPageTitle, getRoute } from './app/routing.ts'
import { ADDRESS, EMAIL, FACEBOOK_URL, MAP_URL, OPENING_HOURS, PRICE_RANGE, SITE_URL, SOCIAL_IMAGE_PATH, TIKTOK_URL } from './data/site.ts'
import { guides } from './data/guides.ts'
import { staticRoutes } from './app/static-routes.ts'

export { staticRoutes }

export function render(path: string): string {
  return renderToString(<App initialPath={path} />)
}

export function getPageMetadata(path: string): { canonical: string; description: string; image: string; imageAlt: string; title: string } {
  const route = getRoute(path)
  const canonicalPath = route?.path ?? path
  const guide = guides.find(item => `/guide/${item.slug}` === canonicalPath)
  const image = route?.product?.image ?? guide?.heroImage?.hero ?? guide?.image ?? SOCIAL_IMAGE_PATH
  const imageAlt = route?.product?.name ?? guide?.heroImage?.alt ?? guide?.title ?? 'Hộp quà trái cây cao cấp Ely Fruit tại Thủ Dầu Một, Bình Dương'

  return {
    canonical: `${SITE_URL}${canonicalPath === '/' ? '/' : canonicalPath}`,
    description: route?.description ?? 'Trang bạn tìm không tồn tại tại Ely Fruit.',
    image: new URL(image, SITE_URL).href,
    imageAlt,
    title: getPageTitle(path),
  }
}

export function getPageSchema(path: string): string {
  const route = getRoute(path)
  const metadata = getPageMetadata(path)
  const graph: Record<string, unknown>[] = [{
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#business`,
    name: 'Ely Fruit',
    url: SITE_URL,
    telephone: '+84981370970',
    email: EMAIL,
    priceRange: PRICE_RANGE,
    image: new URL(SOCIAL_IMAGE_PATH, SITE_URL).href,
    logo: new URL('/ely-fruit-logo.png', SITE_URL).href,
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
  }]

  if (path === '/') {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: [
        ['Ely Fruit có giao giỏ quà tận nơi không?', 'Có. Ely Fruit hỗ trợ giao hàng tại Thủ Dầu Một và các khu vực lân cận. Thời gian, phí giao hàng sẽ được tư vấn theo địa chỉ nhận.'],
        ['Đặt giỏ quà nhanh cần gửi thông tin gì?', 'Bạn có thể gọi trực tiếp để chốt nhanh, hoặc nhắn Zalo kèm ảnh mẫu, ngân sách, địa chỉ giao và thời gian mong muốn để Ely Fruit tư vấn.'],
      ].map(([name, text]) => ({ '@type': 'Question', name, acceptedAnswer: { '@type': 'Answer', text } })),
    })
  }

  if (route?.product) {
    graph.push({
      '@type': 'Product',
      name: route.product.name,
      image: [new URL(route.product.image, SITE_URL).href, new URL(route.product.imageBack, SITE_URL).href],
      description: route.product.ingredients,
      sku: route.product.code,
      brand: { '@type': 'Brand', name: 'Ely Fruit' },
      offers: { '@type': 'Offer', url: metadata.canonical, priceCurrency: 'VND', price: route.product.priceValue, availability: 'https://schema.org/InStock' },
    })
  }

  const guide = guides.find(item => `/guide/${item.slug}` === path)
  if (guide) {
    graph.push({
      '@type': 'Article',
      headline: guide.title,
      description: guide.intro,
      dateModified: guide.updatedAt,
      datePublished: guide.updatedAt,
      mainEntityOfPage: metadata.canonical,
      image: [new URL(guide.heroImage?.hero ?? guide.image, SITE_URL).href],
      author: { '@id': `${SITE_URL}/#business` },
      publisher: { '@id': `${SITE_URL}/#business` },
    })
  }

  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })
}
