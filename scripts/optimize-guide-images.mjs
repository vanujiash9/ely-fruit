import { createHash } from 'node:crypto'
import { execFile } from 'node:child_process'
import { mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises'
import { promisify } from 'node:util'
import { basename, extname, join } from 'node:path'

const execFileAsync = promisify(execFile)
const ORIGINALS_DIRECTORY = 'public/guides/originals'
const OPTIMIZED_DIRECTORY = 'public/guides/optimized'
const VARIANTS = [
  { name: 'mobile', width: 640 },
  { name: 'content', width: 960 },
  { name: 'hero', width: 1440 },
]

async function getConverter() {
  for (const command of ['cwebp', 'magick', 'convert']) {
    try {
      await execFileAsync(command, ['-version'])
      return command
    } catch {}
  }

  throw new Error('Không tìm thấy cwebp hoặc ImageMagick. Cài một trong hai công cụ trước khi chạy images:guides.')
}

async function convertImage(converter, input, output, width) {
  if (converter === 'cwebp') {
    await execFileAsync(converter, ['-quiet', '-q', '82', '-resize', String(width), '0', input, '-o', output])
    return
  }

  const args = converter === 'magick'
    ? [input, '-auto-orient', '-resize', `${width}x>`, '-quality', '82', output]
    : [input, '-auto-orient', '-resize', `${width}x>`, '-quality', '82', output]
  await execFileAsync(converter, args)
}

function getImageFiles(files) {
  return files.filter(file => ['.jpg', '.jpeg', '.png'].includes(extname(file).toLowerCase())).sort()
}

async function optimizeTopic(converter, topic) {
  const inputDirectory = join(ORIGINALS_DIRECTORY, topic)
  const outputDirectory = join(OPTIMIZED_DIRECTORY, topic)
  const files = getImageFiles(await readdir(inputDirectory))
  const seenHashes = new Set()
  const manifest = []

  await rm(outputDirectory, { recursive: true, force: true })
  await mkdir(outputDirectory, { recursive: true })

  for (const file of files) {
    const input = join(inputDirectory, file)
    const hash = createHash('sha256').update(await readFile(input)).digest('hex')
    if (seenHashes.has(hash)) continue
    seenHashes.add(hash)

    const index = String(manifest.length + 1).padStart(2, '0')
    const stem = `${topic}-photo-${index}`
    const variants = []
    for (const variant of VARIANTS) {
      const filename = `${stem}-${variant.name}.webp`
      await convertImage(converter, input, join(outputDirectory, filename), variant.width)
      variants.push({ name: variant.name, width: variant.width, path: `/guides/optimized/${topic}/${filename}` })
    }
    manifest.push({ source: basename(file), id: stem, variants })
  }

  await writeFile(join(outputDirectory, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`)
  return manifest.length
}

async function main() {
  const converter = await getConverter()
  const topics = (await readdir(ORIGINALS_DIRECTORY, { withFileTypes: true }))
    .filter(entry => entry.isDirectory())
    .map(entry => entry.name)
    .sort()
  const results = await Promise.all(topics.map(topic => optimizeTopic(converter, topic)))
  process.stdout.write(`Optimized ${results.reduce((total, count) => total + count, 0)} unique guide photos with ${converter}.\n`)
}

main().catch(error => {
  process.stderr.write(`${error instanceof Error ? error.message : 'Image optimization failed.'}\n`)
  process.exitCode = 1
})
