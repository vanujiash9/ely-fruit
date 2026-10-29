import { ArrowRight } from 'lucide-react'

interface PageHeroProps {
  eyebrow: string
  title: string
  text: string
  image?: string
  onHome?: () => void
}

export function PageHero({ eyebrow, title, text, image }: PageHeroProps) {
  return <section className="page-hero"><div className="container page-hero-grid"><div><div className="breadcrumb"><a href="/">Trang chủ</a><span><ArrowRight />{title}</span></div><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{text}</p></div>{image && <img src={image} alt={title} />}</div></section>
}
