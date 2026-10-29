import { renderToString } from 'react-dom/server'
import App from './App'
import { getPageTitle, getRoute } from './app/routing.ts'
import { ADDRESS, FACEBOOK_URL, MAP_URL, SITE_URL, TIKTOK_URL } from './data/site.ts'
import { guides } from './data/guides.ts'
import { staticRoutes } from './app/static-routes.ts'

export { staticRoutes }

export function render(path: string): string {
  return renderToString(<App initialPath={path} />)
}

export function getPageMetadata(path: string): { canonical: string; description: string; title: string } {
  const route = getRoute(path)
  const canonicalPath = route?.path ?? path

  return {
    canonical: `${SITE_URL}${canonicalPath === '/' ? '/' : canonicalPath}`,
    description: route?.description ?? 'Trang bạn tìm không tồn tại tại Ely Fruit.',
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
    address: {
      '@type': 'PostalAddress',
      streetAddress: ADDRESS,
      addressLocality: 'Thủ Dầu Một',
      addressRegion: 'Hồ Chí Minh',
      addressCountry: 'VN',
    },
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
