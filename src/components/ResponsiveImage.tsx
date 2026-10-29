import type { ImgHTMLAttributes } from 'react'
import { getProductMedia, type DesktopImageVariant } from '../data/product-media'

interface ResponsiveImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src: string
  sizes: string
  mobileSizes?: string
  desktopVariant?: DesktopImageVariant
}

export function ResponsiveImage({ src, sizes, mobileSizes, desktopVariant = 'portrait', width, height, loading, fetchPriority, decoding = 'async', ...props }: ResponsiveImageProps) {
  const media = getProductMedia(src, desktopVariant)
  const imageWidth = width ?? media.width
  const imageHeight = height ?? media.height

  if (!media.isOptimized) {
    return <img src={src} width={imageWidth} height={imageHeight} loading={loading} fetchPriority={fetchPriority} decoding={decoding} {...props} />
  }

  return (
    <picture>
      <source media="(max-width: 600px)" type="image/webp" srcSet={media.mobile} sizes={mobileSizes ?? sizes} />
      <source type="image/webp" srcSet={media.desktop} sizes={sizes} />
      <img src={src} width={imageWidth} height={imageHeight} loading={loading} fetchPriority={fetchPriority} decoding={decoding} {...props} />
    </picture>
  )
}
