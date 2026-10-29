import { promises as fs } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const IMAGE_EXTENSIONS = new Set(['.avif', '.jpeg', '.jpg', '.png', '.webp'])
const PRODUCT_CODE_PATTERN = /(?<![A-Z0-9])(ELY\s*\d{1,2}|HQ\s*\d{1,2}|KH\s*\d{1,2}|KQ\s*\d{1,2}|Q\s*\d{1,2}|K\s*\d{1,2})(?![A-Z0-9])/i
const REPLACEMENTS = [
  [/\bdazzel\b/gi, 'Dazzle'],
  [/\bnam phi\b/gi, 'Nam Phi'],
  [/\bú c\b/gi, 'Úc'],
]

function toTitleCase(value) {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

function normalizeIngredient(value) {
  let normalized = value
    .normalize('NFC')
    .replace(/[_–—-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/\s*,\s*/g, ', ')
    .trim()

  for (const [pattern, replacement] of REPLACEMENTS) {
    normalized = normalized.replace(pattern, replacement)
  }

  const items = normalized
    .split(',')
    .map(item => item.trim())
    .filter(Boolean)

  if (items.length < 2) return null

  const leadingItems = items.slice(0, -1).map(toTitleCase)
  const finalItem = toTitleCase(items[items.length - 1])
  const joined = leadingItems.length === 1
    ? `${leadingItems[0]} và ${finalItem}`
    : `${leadingItems.join(', ')} và ${finalItem}`

  return `${joined}.`
}

export function parseIngredientFilename(filename) {
  const baseName = path.basename(filename, path.extname(filename))
  const codeMatch = baseName.match(PRODUCT_CODE_PATTERN)
  if (!codeMatch) return null

  const code = codeMatch[1].replace(/\s+/g, '').toUpperCase()
  const afterCode = baseName.slice((codeMatch.index ?? 0) + codeMatch[0].length)
  const ingredientCandidate = afterCode
    .replace(/^\s*(?:\((?:MS|MT)\))?\s*[_,-]\s*/i, '')
    .replace(/\s*[_-](?:edited|copy|front|back|ms|mt)\s*$/i, '')
    .trim()
  const ingredients = normalizeIngredient(ingredientCandidate)

  return ingredients ? { code, ingredients } : null
}

async function findImageFiles(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true })
  const paths = await Promise.all(entries.map(async entry => {
    const entryPath = path.join(directory, entry.name)
    if (entry.isDirectory()) return findImageFiles(entryPath)
    return IMAGE_EXTENSIONS.has(path.extname(entry.name).toLowerCase()) ? [entryPath] : []
  }))

  return paths.flat()
}

function formatReport(records, needsReview) {
  const rows = ['DANH SÁCH THÀNH PHẦN TỪ TÊN FILE', 'Chỉ đọc tên file, không OCR hoặc đọc nội dung ảnh.', '']

  for (const record of records) {
    rows.push(`${record.code}: ${record.ingredients}`, `Nguồn: ${record.sources.join(' | ')}`, '')
  }

  rows.push('CẦN RÀ SOÁT', '')
  if (needsReview.length === 0) {
    rows.push('Không có mục cần rà soát.')
  } else {
    for (const item of needsReview) rows.push(`${item.reason}: ${item.source}`)
  }

  return `﻿${rows.join('\n')}\n`
}

async function main() {
  const rootDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
  const imagesDirectory = path.join(rootDirectory, 'images')
  const outputPath = path.join(rootDirectory, 'product-ingredients.txt')
  const files = await findImageFiles(imagesDirectory)
  const byCode = new Map()
  const needsReview = []

  for (const filePath of files) {
    const source = path.relative(rootDirectory, filePath)
    const parsed = parseIngredientFilename(filePath)
    if (!parsed) continue

    const existing = byCode.get(parsed.code)
    if (!existing) {
      byCode.set(parsed.code, { ...parsed, sources: [source] })
      continue
    }

    if (existing.ingredients === parsed.ingredients) {
      byCode.set(parsed.code, { ...existing, sources: [...existing.sources, source] })
      continue
    }

    needsReview.push({ reason: `Nhiều thành phần khác nhau cho ${parsed.code}`, source })
  }

  const records = [...byCode.values()].sort((first, second) => first.code.localeCompare(second.code, 'vi'))
  await fs.writeFile(outputPath, formatReport(records, needsReview), 'utf8')
  console.log(`Đã xuất ${records.length} mã hàng vào ${path.relative(rootDirectory, outputPath)}.`)
}

const isDirectRun = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
if (isDirectRun) {
  main().catch(error => {
    console.error('Không thể tạo danh sách thành phần:', error)
    process.exitCode = 1
  })
}
