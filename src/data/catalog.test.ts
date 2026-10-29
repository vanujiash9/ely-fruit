import assert from 'node:assert/strict'
import test from 'node:test'

import { products, sortProductsByPrice } from './catalog.ts'

const EXPECTED_PRICES = {
  ELY01: 699000,
  HQ01: 399000,
  K01: 499000,
  KH02: 499000,
  KH08: 599000,
  KH12: 699000,
  KH14: 800000,
  KH16: 1000000,
} as const

test('assigns a numeric VND price to every catalog product', () => {
  for (const product of products) {
    assert.ok(product.priceValue > 0, `${product.code} is missing a numeric price`)
    assert.match(product.price, /^\d{1,3}(?:\.\d{3})*đ$/)
  }
})

test('matches image-derived prices for representative product codes', () => {
  for (const [code, expectedPrice] of Object.entries(EXPECTED_PRICES)) {
    const product = products.find(item => item.code === code)

    assert.equal(product?.priceValue, expectedPrice)
  }
})

test('sorts products by price in both directions', () => {
  const ascending = sortProductsByPrice(products, 'ascending')
  const descending = sortProductsByPrice(products, 'descending')

  assert.equal(ascending[0].priceValue, 399000)
  assert.equal(ascending.at(-1)?.priceValue, 1000000)
  assert.equal(descending[0].priceValue, 1000000)
  assert.equal(descending.at(-1)?.priceValue, 399000)
})

test('keeps product identifiers and gallery images unique', () => {
  for (const field of ['slug', 'code', 'name', 'image', 'imageBack'] as const) {
    const values = products.map(product => product[field])

    assert.equal(new Set(values).size, values.length, `duplicate product ${field}`)
  }
})
