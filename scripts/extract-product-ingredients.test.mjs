import test from 'node:test'
import assert from 'node:assert/strict'
import { parseIngredientFilename } from './extract-product-ingredients.mjs'

test('extracts code and ingredients from a priced ELY filename', () => {
  const result = parseIngredientFilename('699k Ely09_ hoa tươi 2 bên, cam nam phi, quýt úc, táo dazzel, lê nâu.png')

  assert.deepEqual(result, {
    code: 'ELY09',
    ingredients: 'Hoa tươi 2 bên, cam Nam Phi, quýt Úc, táo Dazzle và lê nâu.',
  })
})

test('extracts HQ code and ingredients without a price prefix', () => {
  const result = parseIngredientFilename('HQ03_ Táo dazzel, kiwi vàng, nho mẫu đơn, quýt úc_edited.png')

  assert.deepEqual(result, {
    code: 'HQ03',
    ingredients: 'Táo Dazzle, kiwi vàng, nho mẫu đơn và quýt Úc.',
  })
})

test('ignores filenames without an identifiable product code', () => {
  assert.equal(parseIngredientFilename('7234fc23-5ab9-4c98-b303-4fe36048b858.png'), null)
})

test('ignores filenames that have a product code but no ingredient list', () => {
  assert.equal(parseIngredientFilename('ELY09.png'), null)
})
