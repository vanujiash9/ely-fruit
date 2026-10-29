import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import test from "node:test"

const html = await readFile(new URL("../dist/index.html", import.meta.url), "utf8")

test("production HTML includes crawlable catalog and verified contacts", () => {
  assert.match(html, /<h1[^>]*>Giỏ quà trái cây/)
  assert.equal((html.match(/<article\b/g) ?? []).length, 12)
  for (const value of ["tel:0981370970", "0981.370.970", "ctythucphamelyfruit@gmail.com", "facebook.com/share/1DXwAhtZ7R/", "tiktok.com/@ely.fruit.bnh.dng", "maps.app.goo.gl/JwQ1uLf4Ym1GPQWL6", "07:30–21:00", "Số 22 đường 30/4, Phú Lợi, Thủ Dầu Một, TP. Hồ Chí Minh"]) {
    assert.ok(html.includes(value), value)
  }
  assert.doesNotMatch(html, /0900000000|0900 000 000|zalo\.me/)
})

test("metadata uses canonical production domain and matching business schema", () => {
  assert.match(html, /rel="canonical" href="https:\/\/ely-fruit\.vn\/"/)
  assert.match(html, /property="og:locale" content="vi_VN"/)
  assert.match(html, /name="twitter:card" content="summary"/)
  const match = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)
  assert.ok(match)
  const schema = JSON.parse(match[1])
  assert.equal(schema["@type"], "Store")
  assert.equal(schema.url, "https://ely-fruit.vn/")
  assert.equal(schema.telephone, "+84981370970")
  assert.equal(schema.name, "Ely Fruit")
  assert.equal(schema.address.streetAddress, "Số 22 đường 30/4, Phú Lợi")
  assert.equal(schema.address.addressLocality, "Thủ Dầu Một")
  assert.equal(schema.address.addressRegion, "TP. Hồ Chí Minh")
  assert.equal(schema.openingHours, "Mo-Su 07:30-21:00")
  assert.equal(schema.hasMap, "https://maps.app.goo.gl/JwQ1uLf4Ym1GPQWL6?g_st=ic")
  assert.deepEqual(schema.sameAs, [
    "https://www.facebook.com/share/1DXwAhtZ7R/?mibextid=wwXIfr",
    "https://www.tiktok.com/@ely.fruit.bnh.dng?_r=1&_t=ZS-9AvYsctqiqz",
  ])
  assert.doesNotMatch(html, /0981270470|84981270470|Bình Dương|61591696164104/)
  assert.doesNotMatch(html, /localhost|@vite\/client|\/src\/main/)
})

test("footer embeds a lazy-loaded map with an accessible title and directions link", () => {
  const footer = html.match(/<footer\b[^>]*>([\s\S]*?)<\/footer>/)?.[1]
  assert.ok(footer)
  const iframe = footer.match(/<iframe\b[^>]*>/)?.[0]
  assert.ok(iframe)
  assert.match(iframe, /title="Bản đồ cửa hàng Ely Fruit"/)
  assert.match(iframe, /loading="lazy"/)
  assert.match(iframe, /height="280"/)
  const source = iframe.match(/src="([^"]+)"/)?.[1]
  assert.ok(source)
  const mapUrl = new URL(source.replaceAll("&amp;", "&"))
  assert.equal(mapUrl.origin, "https://www.google.com")
  assert.equal(mapUrl.searchParams.get("output"), "embed")
  assert.equal(mapUrl.searchParams.get("q"), "Ely Fruit, Số 22 đường 30/4, Phú Lợi, Thủ Dầu Một, TP. Hồ Chí Minh")
  assert.ok(footer.includes("https://maps.app.goo.gl/JwQ1uLf4Ym1GPQWL6?g_st=ic"))
})

test("discovery files contain production URLs rather than HTML fallbacks", async () => {
  const robots = await readFile(new URL("../dist/robots.txt", import.meta.url), "utf8")
  const sitemap = await readFile(new URL("../dist/sitemap.xml", import.meta.url), "utf8")
  assert.match(robots, /User-agent: \*\nAllow: \/\n/)
  assert.ok(robots.includes("Sitemap: https://ely-fruit.vn/sitemap.xml"))
  const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(([, url]) => url)
  assert.ok(sitemapUrls.length > 0)
  assert.ok(sitemapUrls.every(url => new URL(url).origin === "https://ely-fruit.vn"))
  assert.equal((sitemap.match(/<url>/g) ?? []).length, sitemapUrls.length)
  assert.doesNotMatch(robots + sitemap, /<!doctype html>|elyfruit\.vn|localhost|<lastmod>/i)
})
