import assert from 'node:assert/strict'
import test from 'node:test'
import { guides } from '../data/guides.ts'
import { getRoute, getPageTitle } from './routing.ts'

test('resolves the canonical basket category instead of the homepage', () => {
  assert.equal(getRoute('/gio-trai-cay')?.path, '/gio-trai-cay')
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
