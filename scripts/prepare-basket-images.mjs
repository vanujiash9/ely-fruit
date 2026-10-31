import { execFile } from 'node:child_process'
import { mkdir, readdir, writeFile } from 'node:fs/promises'
import { extname, join } from 'node:path'
import { promisify } from 'node:util'

const execFileAsync = promisify(execFile)
const SOURCE_DIRECTORY = 'public/Giỏ thiết kế-20261031T041747Z-1-001/Giỏ thiết kế'
const OUTPUT_DIRECTORY = 'public/products/optimized'
const MAX_WIDTH = 1600
const QUALITY = 82

const BASKET_CONFIGS = [
  { folder: '1tr200 Ely12', code: 'ELY12', priceValue: 1200000 },
  { folder: '1tr200 KH16', code: 'KH16', priceValue: 1200000 },
  { folder: '1tr200 KH17', code: 'KH17', priceValue: 1200000 },
  { folder: '1tr800 Ely13', code: 'ELY13', priceValue: 1800000 },
  { folder: '1tr800 Ely14', code: 'ELY14', priceValue: 1800000 },
  { folder: '1tr800 Ely15', code: 'ELY15', priceValue: 1800000 },
  { folder: '1tr800 Ely16', code: 'ELY16', priceValue: 1800000 },
  { folder: '2tr Ely18', code: 'ELY18', priceValue: 2000000 },
  { folder: '2tr KH18', code: 'KH18', priceValue: 2000000 },
]

function isImageFile(file) {
  return ['.jpg', '.jpeg', '.png', '.webp'].includes(extname(file).toLowerCase())
}

function isEditedImage(file) {
  return /^(?:[0-9a-f]{8}-[0-9a-f-]{27,}|chatgpt image|ely_fruit_)/i.test(file)
}

async function getConverter() {
  for (const command of ['cwebp', 'magick', 'convert']) {
    try {
      await execFileAsync(command, ['-version'])
      return command
    } catch {
      // Try the next supported converter.
    }
  }

  throw new Error('Không tìm thấy cwebp hoặc ImageMagick. Hãy cài một trong hai công cụ rồi chạy lại.')
}

async function convertImage(converter, input, output) {
  if (converter === 'cwebp') {
    await execFileAsync(converter, ['-quiet', '-q', String(QUALITY), '-resize', String(MAX_WIDTH), '0', input, '-o', output])
    return
  }

  await execFileAsync(converter, [input, '-auto-orient', '-resize', `${MAX_WIDTH}x>`, '-strip', '-quality', String(QUALITY), output])
}

async function getDisplayImage(folder) {
  const files = (await readdir(folder)).filter(isImageFile).sort()
  const editedImage = files.find(isEditedImage)

  if (editedImage) {
    return { file: editedImage, sourceType: 'edited' }
  }

  const namedDisplayImages = files.filter(file => !/^\s*(?:1tr|2tr)/i.test(file))

  if (namedDisplayImages.length === 1) {
    return { file: namedDisplayImages[0], sourceType: 'named-display-fallback' }
  }

  if (files.length === 1) {
    return { file: files[0], sourceType: 'source-fallback' }
  }

  throw new Error(`Không xác định được ảnh hiển thị trong ${folder}. Cần có một ảnh chỉnh hoặc một ảnh tên “Giỏ Thiết Kế”.`)
}

async function main() {
  const converter = await getConverter()
  const manifest = []

  await mkdir(OUTPUT_DIRECTORY, { recursive: true })

  const skipped = []

  for (const basket of BASKET_CONFIGS) {
    const inputDirectory = join(SOURCE_DIRECTORY, basket.folder)
    let displayImage

    try {
      displayImage = await getDisplayImage(inputDirectory)
    } catch (error) {
      skipped.push({ code: basket.code, reason: error instanceof Error ? error.message : 'Không xác định được ảnh hiển thị.' })
      continue
    }

    const filename = `gio-trai-cay-${basket.code.toLowerCase()}-thu-dau-mot.webp`
    const outputPath = join(OUTPUT_DIRECTORY, filename)

    await convertImage(converter, join(inputDirectory, displayImage.file), outputPath)
    manifest.push({
      code: basket.code,
      priceValue: basket.priceValue,
      image: `/products/optimized/${filename}`,
      imageBack: `/products/optimized/${filename}`,
      source: join(inputDirectory, displayImage.file),
      sourceType: displayImage.sourceType,
    })
  }

  await writeFile(join(OUTPUT_DIRECTORY, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`)
  await writeFile(join(OUTPUT_DIRECTORY, 'skipped.json'), `${JSON.stringify(skipped, null, 2)}\n`)
  process.stdout.write(`Đã tạo ${manifest.length} ảnh WebP tối ưu trong ${OUTPUT_DIRECTORY} bằng ${converter}.\n`)
  if (skipped.length) {
    process.stdout.write(`Đã bỏ qua ${skipped.length} mã chưa xác định được ảnh hiển thị: ${skipped.map(item => item.code).join(', ')}. Xem skipped.json để biết chi tiết.\n`)
  }
}

main().catch(error => {
  process.stderr.write(`${error instanceof Error ? error.message : 'Không thể chuẩn bị ảnh giỏ quà.'}\n`)
  process.exitCode = 1
})
