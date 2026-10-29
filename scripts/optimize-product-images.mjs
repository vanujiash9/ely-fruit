import { mkdir, readdir, rm } from 'node:fs/promises'
import { basename, extname, join } from 'node:path'
import sharp from 'sharp'

const INPUT_DIRECTORY = 'public/products'
const OUTPUT_DIRECTORY = join(INPUT_DIRECTORY, 'optimized')
const SOURCE_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg'])
const VARIANTS = [
  { name: 'mobile', width: 640, height: 800 },
  { name: 'desktop-portrait', width: 1200, height: 1500 },
  { name: 'desktop-landscape', width: 1440, height: 1120 },
]

async function getSourceImages() {
  const entries = await readdir(INPUT_DIRECTORY, { withFileTypes: true })

  return entries
    .filter(entry => entry.isFile() && SOURCE_EXTENSIONS.has(extname(entry.name).toLowerCase()))
    .map(entry => join(INPUT_DIRECTORY, entry.name))
    .sort()
}

async function writeVariant(source, variant) {
  const id = basename(source, extname(source))
  const output = join(OUTPUT_DIRECTORY, `${id}-${variant.name}.webp`)

  await sharp(source)
    .rotate()
    .resize(variant.width, variant.height, { fit: 'cover', position: 'attention' })
    .webp({ quality: 82, effort: 5 })
    .toFile(output)
}

const sources = await getSourceImages()

if (sources.length === 0) {
  throw new Error(`No source images found in ${INPUT_DIRECTORY}`)
}

await rm(OUTPUT_DIRECTORY, { recursive: true, force: true })
await mkdir(OUTPUT_DIRECTORY, { recursive: true })

for (const source of sources) {
  await Promise.all(VARIANTS.map(variant => writeVariant(source, variant)))
  console.info(`Optimized ${basename(source)}`)
}

console.info(`Created ${sources.length * VARIANTS.length} WebP files from ${sources.length} source images.`)
