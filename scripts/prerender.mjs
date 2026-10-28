import { readFile, writeFile, mkdtemp, rm } from "node:fs/promises"
import { tmpdir } from "node:os"
import { join, resolve } from "node:path"
import { pathToFileURL } from "node:url"
import { build } from "vite"
import { createHash } from "node:crypto"

const escapeAttribute = (value) => value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")
const output = resolve("dist/index.html")
const temporaryDirectory = await mkdtemp(join(tmpdir(), "ely-prerender-"))

try {
  await build({
    build: {
      ssr: "src/entry-server.tsx",
      outDir: temporaryDirectory,
      copyPublicDir: false,
      rollupOptions: { output: { entryFileNames: "entry-server.mjs" } },
    },
    ssr: { noExternal: true },
  })
  const { render, business, businessSchema } = await import(pathToFileURL(join(temporaryDirectory, "entry-server.mjs")).href)
  const template = await readFile(output, "utf8")
  if (!template.includes('<div id="root"></div>')) throw new Error("Prerender requires an empty root in the client build")
  const description = escapeAttribute(business.description)
  const title = escapeAttribute(business.title)
  const schemaJson = JSON.stringify(businessSchema).replaceAll("<", "\\u003c")
  const schemaHash = createHash("sha256").update(schemaJson).digest("base64")
  const csp = `default-src 'self'; script-src 'self' 'sha256-${schemaHash}'; style-src 'self' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https://images.unsplash.com; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'none'`
  const metadata = [
    `<meta http-equiv="Content-Security-Policy" content="${csp}" />`,
    `<link rel="canonical" href="${business.url}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:locale" content="vi_VN" />`,
    `<meta property="og:site_name" content="${business.name}" />`,
    `<meta property="og:url" content="${business.url}" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta name="twitter:card" content="summary" />`,
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${description}" />`,
    `<script type="application/ld+json">${schemaJson}</script>`,
  ].join("\n    ")
  const html = template
    .replace(/<title>.*?<\/title>/s, () => `<title>${title}</title>`)
    .replace(/<meta name="description" content="[^"]*"\s*\/>/, () => `<meta name="description" content="${description}" />`)
    .replace("<head>", () => `<head>\n    ${metadata}`)
    .replace('<div id="root"></div>', () => `<div id="root">${render()}</div>`)
  await writeFile(output, html)
} finally {
  await rm(temporaryDirectory, { recursive: true, force: true })
}
