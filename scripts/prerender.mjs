import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { createServer } from 'vite'

const SITE_URL = 'https://ely-fruit.vn'
const DIST_DIRECTORY = new URL('../dist/', import.meta.url)
const PUBLIC_DIRECTORY = new URL('../public/', import.meta.url)

function escapeHtmlAttribute(value) {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

const vite = await createServer({ appType: 'custom', server: { middlewareMode: true } })

try {
  const { getPageMetadata, getPageSchema, render, staticRoutes } = await vite.ssrLoadModule('/src/entry-server.tsx')
  const sitemapUrls = [...new Set(staticRoutes)].map(path => `  <url><loc>${SITE_URL}${path === '/' ? '/' : path}</loc></url>`)
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapUrls.join('\n')}\n</urlset>\n`
  const template = await readFile(new URL('index.html', DIST_DIRECTORY), 'utf8')

  console.info(`Prerendering ${staticRoutes.length} routes...`)
  await writeFile(new URL('sitemap.xml', PUBLIC_DIRECTORY), sitemap)
  await writeFile(new URL('sitemap.xml', DIST_DIRECTORY), sitemap)

  for (const route of staticRoutes) {
    try {
      const metadata = getPageMetadata(route)
      const html = template
        .replace(/<title>.*?<\/title>/, `<title>${escapeHtmlAttribute(metadata.title)}</title>`)
        .replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${escapeHtmlAttribute(metadata.description)}" />`)
        .replace(/<link rel="canonical" href=".*?" \/>/, `<link rel="canonical" href="${escapeHtmlAttribute(metadata.canonical)}" />`)
        .replace(/<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${escapeHtmlAttribute(metadata.title)}" />`)
        .replace(/<meta property="og:description" content=".*?" \/>/, `<meta property="og:description" content="${escapeHtmlAttribute(metadata.description)}" />`)
        .replace(/<meta property="og:url" content=".*?" \/>/, `<meta property="og:url" content="${escapeHtmlAttribute(metadata.canonical)}" />`)
        .replace(/<meta property="og:image" content=".*?" \/>/, `<meta property="og:image" content="${escapeHtmlAttribute(metadata.image)}" />`)
        .replace(/<meta property="og:image:alt" content=".*?" \/>/, `<meta property="og:image:alt" content="${escapeHtmlAttribute(metadata.imageAlt)}" />`)
        .replace(/<meta name="twitter:image" content=".*?" \/>/, `<meta name="twitter:image" content="${escapeHtmlAttribute(metadata.image)}" />`)
        .replace(/<meta name="twitter:image:alt" content=".*?" \/>/, `<meta name="twitter:image:alt" content="${escapeHtmlAttribute(metadata.imageAlt)}" />`)
        .replace(/<script id="ely-fruit-local-business" type="application\/ld\+json">[\s\S]*?<\/script>/, `<script id="ely-fruit-local-business" type="application/ld+json">${getPageSchema(route).replace(/</g, '\\u003c')}</script>`)
        .replace('<div id="root"></div>', `<div id="root">${render(route)}</div>`)
      const directory = route === '/' ? DIST_DIRECTORY : new URL(`.${route}/`, DIST_DIRECTORY)

      await mkdir(directory, { recursive: true })
      await writeFile(join(directory.pathname, 'index.html'), html)
    } catch (error) {
      throw new Error(`Prerender failed for ${route}`, { cause: error })
    }
  }

  console.info(`Prerendered ${staticRoutes.length} routes and sitemap.xml.`)
} finally {
  await vite.close()
}
