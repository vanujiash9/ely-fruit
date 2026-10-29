import { renderToString } from 'react-dom/server'
import App from './App'
import { getPageTitle, getRoute } from './app/routing.ts'
import { staticRoutes } from './app/static-routes.ts'
import { guides } from './data/guides.ts'
import { localServices } from './data/local-services.ts'
import {
  ADDRESS_COUNTRY,
  ADDRESS_LOCALITY,
  ADDRESS_REGION,
  AREA_SERVED,
  BUSINESS_EMAIL,
  BUSINESS_NAME,
  FACEBOOK_URL,
  MAP_URL,
  PHONE_E164,
  SITE_URL,
  STREET_ADDRESS,
  TIKTOK_URL,
} from './data/site.ts'

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

function getFaqSchema(faqs: Array<{ question: string; answer: string }>): Record<string, unknown> {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  }
}

export function getPageSchema(path: string): string {
  const route = getRoute(path)
  const metadata = getPageMetadata(path)
  const guide = guides.find(item => `/guide/${item.slug}` === path)
  const localService = localServices.find(service => `/${service.slug}` === path)
  const graph: Record<string, unknown>[] = [{
    '@type': ['Store', 'LocalBusiness'],
    '@id': `${SITE_URL}/#business`,
    name: BUSINESS_NAME,
    url: SITE_URL,
    telephone: PHONE_E164,
    email: BUSINESS_EMAIL,
    image: `${SITE_URL}/products/hero-fruit-basket.png`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: STREET_ADDRESS,
      addressLocality: ADDRESS_LOCALITY,
      addressRegion: ADDRESS_REGION,
      addressCountry: ADDRESS_COUNTRY,
    },
    areaServed: AREA_SERVED,
    openingHoursSpecification: [{
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '07:30',
      closes: '21:00',
    }],
    sameAs: [FACEBOOK_URL, TIKTOK_URL, MAP_URL],
  }, {
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: BUSINESS_NAME,
    inLanguage: 'vi-VN',
    publisher: { '@id': `${SITE_URL}/#business` },
  }]

  if (path === '/') {
    graph.push(getFaqSchema([
      { question: 'Ely Fruit có giao giỏ quà tận nơi không?', answer: 'Có. Ely Fruit hỗ trợ giao hàng tại Thủ Dầu Một và các khu vực lân cận. Thời gian, phí giao hàng sẽ được tư vấn theo địa chỉ nhận.' },
      { question: 'Đặt giỏ quà nhanh cần gửi thông tin gì?', answer: 'Bạn có thể gọi trực tiếp để chốt nhanh, hoặc nhắn Zalo kèm ảnh mẫu, ngân sách, địa chỉ giao và thời gian mong muốn để Ely Fruit tư vấn.' },
    ]))
  }

  if (route?.product) {
    graph.push({
      '@type': 'Product',
      name: route.product.name,
      image: [new URL(route.product.image, SITE_URL).href, new URL(route.product.imageBack, SITE_URL).href],
      description: route.product.ingredients,
      sku: route.product.code,
      brand: { '@type': 'Brand', name: BUSINESS_NAME },
      offers: { '@type': 'Offer', url: metadata.canonical, priceCurrency: 'VND', price: route.product.priceValue, availability: 'https://schema.org/InStock' },
    })
  }

  if (guide) {
    graph.push({
      '@type': 'Article',
      headline: guide.title,
      description: guide.intro,
      image: guide.image,
      dateModified: guide.updatedAt,
      datePublished: guide.updatedAt,
      inLanguage: 'vi-VN',
      mainEntityOfPage: metadata.canonical,
      author: { '@id': `${SITE_URL}/#business` },
      publisher: { '@id': `${SITE_URL}/#business` },
      ...(guide.source ? { citation: guide.source.url } : {}),
    }, getFaqSchema(guide.faqs), {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Trang chủ', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Cẩm nang', item: `${SITE_URL}/guide` },
        { '@type': 'ListItem', position: 3, name: guide.title, item: metadata.canonical },
      ],
    })
  }

  if (localService) {
    graph.push(getFaqSchema(localService.faqs))
  }

  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })
}
