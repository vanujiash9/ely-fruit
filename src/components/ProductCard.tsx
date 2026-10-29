import { ArrowRight } from 'lucide-react'
import type { Product } from '../data/catalog'
import { PHONE_LINK } from '../data/site'
import { ResponsiveImage } from './ResponsiveImage'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="product-card">
      <a className="product-image" href={`/san-pham/${product.slug}`}>
        <ResponsiveImage className="front-image" src={product.image} alt={product.name} sizes="(max-width: 600px) 50vw, (max-width: 1180px) 33vw, 25vw" loading="lazy" />
        <ResponsiveImage className="back-image" src={product.imageBack} alt={`${product.name} mặt sau`} sizes="(max-width: 600px) 50vw, (max-width: 1180px) 33vw, 25vw" loading="lazy" />
        {product.tag && <span className="tag">{product.tag}</span>}
        <span className="photo-count">● ○ <small>2 ảnh</small></span>
      </a>
      <div className="product-info">
        <span className="product-code">{product.code}</span>
        <a className="product-title" href={`/san-pham/${product.slug}`}>{product.name}</a>
        <strong className="price">{product.price}</strong>
        <p>{product.ingredients}</p>
        <div className="product-actions">
          <a className="btn btn-secondary" href={`/san-pham/${product.slug}`}>Xem chi tiết</a>
          <a href={PHONE_LINK}>Liên hệ đặt hàng <ArrowRight size={14} /></a>
        </div>
      </div>
    </article>
  )
}
