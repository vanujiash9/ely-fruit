import assert from 'node:assert/strict'
import test from 'node:test'
import { fruitProducts, products } from '../data/catalog.ts'
import { guides } from '../data/guides.ts'
import { getRoute, getPageTitle } from './routing.ts'
import { staticRoutes } from './static-routes.ts'

test('resolves the canonical basket category instead of the homepage', () => {
  assert.equal(getRoute('/gio-trai-cay')?.path, '/gio-trai-cay')
})

test('resolves the retail fruit category with its own metadata', () => {
  const route = getRoute('/trai-cay')

  assert.equal(route?.path, '/trai-cay')
  assert.match(route?.title ?? '', /Trái cây nhập khẩu/)
})

test('does not resolve an unknown URL to the homepage', () => {
  assert.equal(getRoute('/not-a-real-page'), undefined)
})

test('uses the product name in the product page title', () => {
  assert.match(getPageTitle('/san-pham/ely-06'), /Giỏ Trái Cây Ely 06/)
})

test('uses the guide title rather than the homepage title', () => {
  assert.match(getPageTitle('/guide/gio-trai-cay-500k-nen-chon-gi'), /500k/)
})

test('resolves every guide detail route with article metadata', () => {
  for (const guide of guides) {
    const route = getRoute(`/guide/${guide.slug}`)

    assert.equal(route?.path, `/guide/${guide.slug}`)
    assert.equal(route?.description, guide.intro)
    assert.equal(route?.image, guide.image)
    assert.equal(route?.type, 'article')
  }
})

test('uses complete local image data for image-led guides', () => {
  for (const guide of guides) {
    if (!guide.heroImage) continue

    assert.match(guide.image, /^\/guides\/optimized\/.+-hero\.webp$/)
    assert.match(guide.heroImage.fallback, /^\/guides\/originals\/.+\.(jpg|jpeg|png)$/)
    assert.ok(guide.heroImage.alt.length >= 10)
    assert.ok(guide.heroImage.caption.length >= 10)
    assert.ok(guide.sections?.every(section => section.heading.length > 0 && section.paragraphs.length > 0))
  }
})

test('uses real catalogue products and FAQs for every guide', () => {
  for (const guide of guides) {
    assert.ok((guide.productRecommendations?.length ?? 0) >= 2)
    assert.ok((guide.faqs?.length ?? 0) >= 2)

    for (const recommendation of guide.productRecommendations ?? []) {
      assert.ok(products.some(product => product.slug === recommendation.productSlug))
      assert.ok(recommendation.suitableFor.length >= 10)
    }
  }
})

test('includes every guide detail route in the static route list', () => {
  for (const guide of guides) {
    assert.ok(staticRoutes.includes(`/guide/${guide.slug}`))
  }
})

test('does not fall back to another article for an unknown guide slug', () => {
  assert.equal(getRoute('/guide/khong-ton-tai'), undefined)
})

test('canonicalizes legacy listing and product aliases', () => {
  assert.equal(getRoute('/gifts')?.path, '/gio-trai-cay')
  assert.equal(getRoute('/product/ely-06')?.path, '/san-pham/ely-06')
  assert.equal(getRoute('/gio-trai-cay/499k')?.path, '/gio-trai-cay/499k')
  assert.equal(getPageTitle('/gifts'), getPageTitle('/gio-trai-cay'))
})

test('exposes product data required for structured metadata', () => {
  const route = getRoute('/san-pham/ely-06')

  assert.equal(route?.type, 'product')
  assert.equal(route?.product?.code, 'ELY06')
  assert.equal(route?.product?.priceValue, 800000)
})

test('canonicalizes the imported fruit alias to the retail fruit category', () => {
  assert.equal(getRoute('/trai-cay-nhap-khau')?.path, '/trai-cay')
})

test('gives retail fruit products complete catalogue details', () => {
  for (const fruit of fruitProducts) {
    assert.match(fruit.image, /^\/Giỏ thiết kế-/)
    assert.ok(fruit.origin.length >= 2)
    assert.ok(fruit.description.length >= 20)
    assert.ok(fruit.price.length > 0)
  }
})

test('gives every product an explicit ingredient note', () => {
  const genericIngredients = 'Trái cây tươi tuyển chọn, phối hợp theo mùa và gói quà thủ công.'

  for (const product of products) {
    assert.notEqual(product.ingredients, genericIngredients)
    assert.ok(product.ingredients.length >= 20)
  }
})
