import { ArrowRight } from 'lucide-react'
import { ResponsiveImage } from './ResponsiveImage'

interface PageHeroProps {
  eyebrow: string
  title: string
  text: string
  image?: string
  onHome?: () => void
}

export function PageHero({ eyebrow, title, text, image }: PageHeroProps) {
  return <section className="page-hero"><div className="container page-hero-grid"><div><div className="breadcrumb"><a href="/">Trang chủ</a><span><ArrowRight />{title}</span></div><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{text}</p></div>{image && <ResponsiveImage src={image} alt={title} sizes="(max-width: 900px) 32vw, 420px" mobileSizes="100vw" loading="lazy" />}</div></section>
}
